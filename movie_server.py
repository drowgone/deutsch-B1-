#!/usr/bin/env python3
"""Watch movie/ and serve browser-ready German shadowing tracks on loopback."""
import movie_tracks
import movie_words
import platform_profile
import project_backup
import sqlite3

import argparse
import errno
import hashlib
import json
import math
import mimetypes
import os
import re
import shutil
import subprocess
import sys
import threading
import time
import webbrowser
from concurrent.futures import ThreadPoolExecutor
from contextlib import closing
from http.client import HTTPConnection, HTTPException
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlsplit

ROOT = Path(__file__).resolve().parent
MOVIES = ROOT / "movie"
CACHE = ROOT / ".movie-cache"
PORT = 8743
PROJECT_ID = hashlib.sha256(os.fsencode(ROOT)).hexdigest()
catalog = {}
lock = threading.Lock()


def german(stream):
    tags = stream.get("tags", {})
    return (tags.get("language", "").lower().split("-")[0] in {"de", "deu", "ger"}
            or re.search(r"\b(deutsch|german|allemand)\b", tags.get("title", ""), re.I))


# Indexing and subtitle extraction must stay available during a long conversion.
indexers = ThreadPoolExecutor(max_workers=2)
encoder = ThreadPoolExecutor(max_workers=1)
sources = {}
plans = {}
external = {}
track_locks = [threading.Lock() for _ in range(43)]


def update(key, **fields):
    with lock:
        if key in catalog:
            catalog[key].update(fields)


def convert(key, path, streams, duration):
    video, audio, picture = streams
    dest = CACHE / key
    temp = dest / "working.mp4"
    try:
        update(key, compatible="encoding", percent=0)
        cmd = ["ffmpeg", "-y", "-nostdin", "-loglevel", "error", "-progress", "pipe:1",
               "-nostats", "-copyts", "-start_at_zero", "-i", str(path)]
        if picture:
            overlay = f"[0:{video['index']}][0:{picture['index']}]overlay=eof_action=pass[pictured]"
            cmd += ["-filter_complex", overlay, "-map", "[pictured]"]
        else:
            cmd += ["-map", f"0:{video['index']}"]
        if audio:
            cmd += ["-map", f"0:{audio['index']}"]
            if audio["codec_name"] == "aac" and audio.get("channels", 0) <= 2:
                cmd += ["-c:a", "copy"]
            else:
                cmd += ["-c:a", "aac", "-ac", "2", "-b:a", "160k"]
        if not picture and video["codec_name"] == "h264" and video.get("pix_fmt") == "yuv420p":
            cmd += ["-c:v", "copy"]
        else:
            cmd += ["-c:v", "libx264", "-preset", "veryfast", "-threads", "4", "-pix_fmt", "yuv420p"]
            if not picture:
                cmd += ["-vf", "pad=ceil(iw/2)*2:ceil(ih/2)*2"]
        cmd += ["-map_chapters", "-1", "-movflags", "+faststart", str(temp)]
        with subprocess.Popen(cmd, stdout=subprocess.PIPE, text=True) as proc:
            for line in proc.stdout:
                with lock:
                    removed = key not in catalog
                if removed:
                    proc.terminate()
                    return
                if duration and line.startswith("out_time_us="):
                    value = line.strip().partition("=")[2]
                    if value.lstrip("-").isdigit():
                        percent = max(0, min(99, int(int(value) / (duration * 10000))))
                        update(key, percent=percent)
            if proc.wait():
                raise ValueError("FFmpeg konvertatsiyani tugata olmadi.")
        temp.replace(dest / "video.mp4")
        update(key, compatible="ready", percent=100)
    except Exception as error:
        print(path.name, str(error), flush=True)
        update(key, compatible="error")
    finally:
        temp.unlink(missing_ok=True)


def request_conversion(key):
    with lock:
        entry = catalog.get(key)
        if not entry or key not in plans:
            return False
        if entry.get("compatible") is None:
            entry["compatible"] = "queued"
            encoder.submit(convert, key, *plans[key])
        return True


def index_movie(path, key):
    dest = CACHE / key
    try:
        dest.mkdir(exist_ok=True)
        probe = json.loads(subprocess.check_output(
            ["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", str(path)], timeout=90))
        streams = probe["streams"]
        video = next((s for s in streams if s["codec_type"] == "video" and not s["disposition"].get("attached_pic")), None)
        if not video:
            raise ValueError("Video treki topilmadi.")
        audios = [s for s in streams if s["codec_type"] == "audio"]
        audio = next((s for s in audios if german(s)), audios[0] if audios else None)
        subtitles = [s for s in streams if s["codec_type"] == "subtitle"]
        bitmap = {"hdmv_pgs_subtitle", "dvd_subtitle", "dvb_subtitle", "xsub"}
        def priority(s):
            title = s.get("tags", {}).get("title", "").lower()
            forced = s["disposition"].get("forced") or "forced" in title
            return (bool(forced), "sdh" in title, not s["disposition"].get("default"))
        german_subs = sorted((s for s in subtitles if german(s)), key=priority)
        sub = next((s for s in german_subs if s["codec_name"] not in bitmap), None)
        picture = german_subs[0] if german_subs and not sub else None
        if not sub and not picture:
            text_subs = [s for s in subtitles if s["codec_name"] not in bitmap]
            sub = min(text_subs, key=lambda s: (s.get("tags", {}).get("language") != "eng", priority(s)), default=None)
        sub_lang = ("de" if sub and german(sub) else sub.get("tags", {}).get("language", "und") if sub else "")
        sub_lang = {"eng": "en"}.get(sub_lang, sub_lang)
        preferred_sub = sub or picture
        if picture and picture["codec_name"] == "hdmv_pgs_subtitle":
            picture = None  # PGS is rendered as a selectable overlay, including on direct MKVs.
        # Browsers can pick the first or the default track. Both must be the intended audio.
        direct_audio = not audio or (audio is audios[0] and audio["codec_name"] in {"aac", "opus", "vorbis", "mp3"}
                                     and not any(a["disposition"].get("default") for a in audios[1:]))
        direct = bool(not picture and direct_audio and video["codec_name"] in {"av1", "vp8", "vp9", "h264"})
        cached = (dest / "video.mp4").is_file()
        duration = float(probe["format"].get("duration", 0))
        # Long, incompatible videos can start from any timestamp without a complete MP4.
        streaming = bool(duration > 600 and not picture and not cached and not direct
                         and video["codec_name"] != "h264")
        with lock:
            if key not in catalog:
                return
            plans[key] = (path, (video, audio, picture), duration)
        tracks = [movie_tracks.embedded(s) for s in subtitles]
        cached_sub = bool(sub and (dest / "sub.vtt").is_file())
        update(key, status="indexed", tracks=tracks, defaultTrack=str(preferred_sub["index"]) if preferred_sub else None,
               wordChunk=movie_words.CHUNK if audio and german(audio) and movie_words.available() else 0, direct=direct, streaming=streaming, duration=duration, subLang=sub_lang, compatible="ready" if cached else None,
               audio="Nemischa audio" if audio and german(audio) else ("Asl audio · nemischa trek aniqlanmadi" if audio else "Audio treki yo‘q"),
               sub=cached_sub, note=(("" if cached_sub else "Subtitr ajratilmoqda…") if sub else
               ("Nemischa rasmli subtitr" if picture else "Nemischa subtitr topilmadi.")))
        if not direct and not cached and not streaming:
            request_conversion(key)
        if sub and not cached_sub:
            tmp = dest / "working.vtt"
            try:
                subprocess.run(["ffmpeg", "-y", "-nostdin", "-loglevel", "error", "-copyts", "-start_at_zero",
                                "-i", str(path), "-map", f"0:{sub['index']}", "-c:s", "webvtt", str(tmp)], check=True)
                tmp.replace(dest / "sub.vtt")
                update(key, sub=True, note="")
            except (OSError, subprocess.SubprocessError):
                update(key, note="Subtitrni ajratib bo‘lmadi.")
            finally:
                tmp.unlink(missing_ok=True)
    except Exception as error:
        print(path.name, str(error), flush=True)
        update(key, status="error", note="MKV faylini o‘qib bo‘lmadi.")


def watch():
    previous = set()
    while True:
        seen = set()
        files = list(MOVIES.glob("*"))
        subs = [f for f in files if f.suffix.lower() in {".vtt", ".srt"} and not f.is_symlink() and f.is_file()]
        for path in files:
            if path.suffix.lower() != ".mkv" or path.is_symlink() or not path.is_file():
                continue
            try:
                stat = path.stat()
            except OSError:
                continue
            key = hashlib.sha256(f"{path.name}:{stat.st_size}:{stat.st_mtime_ns}".encode()).hexdigest()[:32]
            seen.add(key)
            sidecars = movie_tracks.sidecars(path, subs)
            with lock:
                entry = catalog.setdefault(key, {"id": key, "name": path.stem, "status": "pending"})
                external[key] = {t["id"]: path for t,path in sidecars}
                entry["files"] = [t for t,_ in sidecars]
                start = key in previous and entry["status"] == "pending"
                if start:
                    sources[key] = path
                    entry["status"] = "probing"
            if start:
                indexers.submit(index_movie, path, key)
        with lock:
            for key in catalog.keys() - seen:
                del catalog[key]
                external.pop(key, None)
                sources.pop(key, None)
                plans.pop(key, None)
        previous = seen
        time.sleep(1)


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.serve(True)

    def do_HEAD(self):
        self.serve(False)

    def do_POST(self):
        self.serve(False)

    def stream_clip(self, key, body):
        with lock:
            entry = catalog.get(key, {})
            if not entry.get("streaming"):
                return self.send_error(404)
            path, (video, audio, _), duration = plans[key]
        try:
            start = float(parse_qs(urlsplit(self.path).query).get("start", ["0"])[0])
            if not math.isfinite(start) or not 0 <= start < duration:
                raise ValueError
        except ValueError:
            return self.send_error(400)
        self.send_response(200)
        self.send_header("Content-Type", "video/mp4")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        if not body:
            return
        cmd = ["ffmpeg", "-nostdin", "-loglevel", "error", "-ss", str(start),
               "-threads", "4", "-i", str(path), "-map", f"0:{video['index']}"]
        if audio:
            cmd += ["-map", f"0:{audio['index']}", "-c:a", "aac", "-ac", "2"]
        cmd += ["-vf", "scale='min(1280,iw)':-2", "-c:v", "libx264", "-pix_fmt", "yuv420p",
                "-preset", "ultrafast", "-threads", "4", "-g", "24", "-map_chapters", "-1",
                "-movflags", "empty_moov+default_base_moof+frag_keyframe", "-f", "mp4", "pipe:1"]
        with subprocess.Popen(cmd, stdout=subprocess.PIPE) as proc:
            try:
                shutil.copyfileobj(proc.stdout, self.wfile, length=65536)
            except (BrokenPipeError, ConnectionResetError):
                pass
            finally:
                proc.stdout.close()
                if proc.poll() is None:
                    proc.terminate()

    def study_profile(self, body):
        host = self.headers["Host"]
        if (self.headers.get("Origin") not in (None, "http://" + host)
                or self.headers.get("Sec-Fetch-Site") not in (None, "none", "same-origin")
                or self.headers.get("X-Deutsch-Profile") != "1"):
            return self.send_error(403)
        try:
            if self.command == "POST":
                if self.headers.get_content_type() != "application/json":
                    return self.send_error(415)
                size = int(self.headers.get("Content-Length", "0"))
                if not 0 < size <= 64 * 1024 * 1024:
                    return self.send_error(413)
                platform_profile.apply_profile(json.loads(self.rfile.read(size)))
                response = b'{"saved":true}'
            else:
                profile = platform_profile.load_profile()
                if urlsplit(self.path).query == "focus-timer":
                    profile = {"focusTimer": profile.get("workspace", {}).get("focusTimer")}
                response = json.dumps(profile, ensure_ascii=False).encode()
        except (KeyError, TypeError, ValueError, RecursionError):
            return self.send_error(400)
        except (OSError, sqlite3.Error) as error:
            print("Study profile:", error, flush=True)
            return self.send_error(503)
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(response)))
        self.end_headers()
        if body or self.command == "POST":
            try:
                self.wfile.write(response)
            except (BrokenPipeError, ConnectionResetError):
                pass

    def serve(self, body):
        if self.headers.get("Host") not in {f"localhost:{PORT}", f"127.0.0.1:{PORT}"}:
            return self.send_error(403)
        origin = self.headers.get("Origin")
        if origin and origin not in {"null", f"http://localhost:{PORT}", f"http://127.0.0.1:{PORT}"}:
            return self.send_error(403)
        path = unquote(urlsplit(self.path).path)
        if path == '/api/project-backup':
            if self.command == 'HEAD':
                self.send_response(200)
                self.send_header('Content-Length', '0')
                self.end_headers()
                return
            if self.command != 'POST' or origin != 'http://' + self.headers['Host']:
                return self.send_error(403)
            if self.headers.get_content_type() != 'application/x-www-form-urlencoded':
                return self.send_error(415)
            try:
                size = int(self.headers.get('Content-Length', '0'))
                if not 0 < size <= 192 * 1024 * 1024:
                    return self.send_error(413)
                profile = json.loads(parse_qs(self.rfile.read(size).decode(), max_num_fields=1)['profile'][0])
                if not isinstance(profile, dict) or set(profile) != platform_profile.SECTIONS or not isinstance(profile['workspace'].get('backupResume'), dict):
                    return self.send_error(400)
            except (ValueError, TypeError, AttributeError, KeyError, RecursionError):
                return self.send_error(400)
            self.send_response(200)
            self.send_header('Content-Type', 'application/x-tar')
            self.send_header('Content-Disposition', 'attachment; filename="Deutsch-B1-' + time.strftime('%Y%m%d-%H%M%S') + '.tar"')
            self.send_header('Cache-Control', 'no-store')
            self.end_headers()
            try:
                project_backup.write_archive(self.wfile, profile)
            except (BrokenPipeError, ConnectionResetError):
                pass
            return
        if path == "/api/study-profile":
            return self.study_profile(body)
        if path == "/api/status" and self.command in {"GET", "HEAD"}:
            self.send_response(200)
            self.send_header("X-Deutsch-Project", PROJECT_ID)
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", "0")
            self.end_headers()
            return
        if self.command == "POST":
            match = re.fullmatch(r"/api/movies/([a-f0-9]{32})/compatible", path)
            if not match or not request_conversion(match[1]):
                return self.send_error(404)
            self.send_response(202)
            self.end_headers()
            return
        if path == "/api/movies":
            with lock:
                data = json.dumps(sorted(catalog.values(), key=lambda m: m["name"].casefold())).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            if body:
                self.wfile.write(data)
            return
        word = re.fullmatch(r"/media/([a-f0-9]{32})/words/(\d{1,6})", path)
        if word:
            key, part = word.groups()
            with lock:
                if not catalog.get(key, {}).get("wordChunk"):
                    return self.send_error(404)
                src, (_, audio, _), duration = plans[key]
            try:
                data = json.dumps(movie_words.words_for(src, CACHE / key, audio, duration, int(part))).encode()
            except ValueError:
                return self.send_error(404)
            except Exception as error:
                print("Subtitr:", error, flush=True)
                return self.send_error(503)
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            if body:
                self.wfile.write(data)
            return
        track_url = re.fullmatch(r"/media/([a-f0-9]{32})/tracks/(s[a-f0-9]{20}|\d+)/(track\.vtt|index\.json|\d+\.png)", path)
        clip = re.fullmatch(r"/media/([a-f0-9]{32})/clip.mp4", path)
        if clip:
            return self.stream_clip(clip[1], body)
        match = re.fullmatch(r"/media/([a-f0-9]{32})/(video\.mp4|sub\.vtt|original\.mkv)", path)
        if track_url:
            key, tid, name = track_url.groups()
            with lock:
                entry = catalog.get(key, {})
                track = next((item for item in entry.get("tracks", []) + entry.get("files", []) if item["id"] == tid), None)
                if not track or key not in plans:
                    return self.send_error(404)
                src = external[key][tid] if track["kind"] == "file" else sources[key]
                preferred = entry.get("defaultTrack") == tid and entry.get("sub")
            dest = CACHE / key / ("track-" + tid)
            try:
                with track_locks[hash(dest) % len(track_locks)]:
                    if track["kind"] == "pgs" and name != "track.vtt":
                        movie_tracks.pgs_index(src, dest, int(tid), entry["duration"])
                    elif name == "track.vtt" and track["kind"] in {"text","file"}:
                        if preferred:
                            dest = CACHE / key
                            name = "sub.vtt"
                        else:
                            dest.mkdir(exist_ok=True)
                            if not (dest / name).exists():
                                temp = dest / "working.vtt"
                                cmd = ["ffmpeg","-nostdin","-y","-v","error","-copyts","-start_at_zero","-i",str(src)]
                                if track["kind"] == "text":
                                    cmd += ["-map","0:" + tid]
                                subprocess.run(cmd + ["-c:s","webvtt",str(temp)], check=True,timeout=180)
                                temp.replace(dest / name)
                    else:
                        return self.send_error(404)
                    file = dest / name
            except Exception as error:
                print("Subtitr:", error, flush=True)
                return self.send_error(503)
        elif match:
            with lock:
                entry = catalog.get(match[1], {})
                if match[2] == "original.mkv" and entry.get("direct"):
                    file = sources[match[1]]
                elif ((match[2] == "video.mp4" and entry.get("compatible") == "ready")
                      or (match[2] == "sub.vtt" and entry.get("sub"))):
                    file = CACHE / match[1] / match[2]
                else:
                    return self.send_error(404)
        elif path in {"/", "/index.html"}:
            file = ROOT / "index.html"
        elif path.startswith("/assets/"):
            file = (ROOT / path[1:]).resolve()
            if not file.is_relative_to(ROOT / "assets"):
                return self.send_error(404)
        else:
            return self.send_error(404)
        if not file.is_file():
            return self.send_error(404)
        with file.open("rb") as source:
            size = os.fstat(source.fileno()).st_size
            start, end = 0, size - 1
            header = self.headers.get("Range")
            if header:
                r = re.fullmatch(r"bytes=(\d*)-(\d*)", header)
                if r and any(r.groups()):
                    if r[1]:
                        start = int(r[1])
                        end = min(end, int(r[2])) if r[2] else end
                    else:
                        start = max(0, size - int(r[2]))
                else:
                    start = size
                if start > end:
                    self.send_response(416)
                    self.send_header("Content-Range", f"bytes */{size}")
                    self.end_headers()
                    return
            self.send_response(206 if header else 200)
            if header:
                self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
            self.send_header("Content-Type", mimetypes.guess_type(file.name)[0] or "application/octet-stream")
            self.send_header("Accept-Ranges", "bytes")
            self.send_header("Content-Length", str(end - start + 1))
            self.end_headers()
            if body:
                source.seek(start)
                left = end - start + 1
                try:
                    while left:
                        block = source.read(min(left, 256 * 1024))
                        if not block:
                            break
                        self.wfile.write(block)
                        left -= len(block)
                except (BrokenPipeError, ConnectionResetError):
                    pass

    def end_headers(self):
        if self.headers.get("Origin") == "null":
            self.send_header("Access-Control-Allow-Origin", "null")
        super().end_headers()

    def log_message(self, *args):
        pass


def same_project_running():
    try:
        with closing(HTTPConnection("127.0.0.1", PORT, timeout=1)) as connection:
            connection.request("HEAD", "/api/status")
            response = connection.getresponse()
            return response.status == 200 and response.getheader("X-Deutsch-Project") == PROJECT_ID
    except (OSError, HTTPException):
        return False


def open_platform(url):
    try:
        opener = shutil.which("xdg-open")
        if opener:
            platform_profile.DATABASE.parent.mkdir(mode=0o700, exist_ok=True)
            with (platform_profile.DATABASE.parent / "browser.log").open("ab") as log:
                subprocess.Popen([opener, url], stdin=subprocess.DEVNULL, stdout=log,
                                 stderr=log, start_new_session=True)
            return
        if webbrowser.open(url):
            return
    except (OSError, webbrowser.Error):
        pass
    print(f"Brauzerda oching: {url}", flush=True)


def launch_background(open_browser):
    url = f"http://127.0.0.1:{PORT}/"
    if not same_project_running():
        directory = platform_profile.DATABASE.parent
        directory.mkdir(mode=0o700, exist_ok=True)
        logfile = directory / "server.log"
        with logfile.open("ab") as log:
            process = subprocess.Popen(
                [sys.executable, "-B", str(ROOT / "movie_server.py"), "--no-open"],
                cwd=ROOT, stdin=subprocess.DEVNULL, stdout=log, stderr=log,
                start_new_session=True)
        deadline = time.monotonic() + 10
        while not same_project_running():
            if process.poll() is not None or time.monotonic() >= deadline:
                raise SystemExit(f"Serverni ishga tushirib bo‘lmadi. Tafsilotlar: {logfile}")
            time.sleep(.15)
    print(f"Deutsch B1: {url}", flush=True)
    if open_browser:
        open_platform(url)


def run_server(open_browser=False):
    url = f"http://127.0.0.1:{PORT}/"
    try:
        server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    except OSError as error:
        if error.errno != errno.EADDRINUSE:
            raise
        if not same_project_running():
            raise SystemExit(f"{PORT} porti band. Shu portni ishlatayotgan dasturni yoping va skriptni qayta ishga tushiring.")
        print(f"Deutsch B1 allaqachon ishlayapti: {url}", flush=True)
        if open_browser:
            open_platform(url)
        return
    with server:
        if not all(shutil.which(tool) for tool in ("ffmpeg", "ffprobe")):
            raise SystemExit("FFmpeg va FFprobe o‘rnatilishi kerak.")
        MOVIES.mkdir(exist_ok=True)
        CACHE.mkdir(exist_ok=True)
        platform_profile.load_profile()
        threading.Thread(target=watch, daemon=True).start()
        print(f"Deutsch B1: {url}", flush=True)
        if open_browser:
            threading.Thread(target=open_platform, args=(url,), daemon=True).start()
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deutsch B1 mahalliy serveri")
    parser.add_argument("--open", action=argparse.BooleanOptionalAction, default=False,
                        help="platformani asosiy brauzerda ochish")
    parser.add_argument("--background", action="store_true",
                        help="serverni terminaldan mustaqil fonda ishga tushirish")
    options = parser.parse_args()
    if options.background:
        launch_background(options.open)
    else:
        run_server(options.open)
