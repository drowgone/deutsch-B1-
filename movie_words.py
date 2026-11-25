"""German word timestamps from the film's original audio, processed locally."""
import hashlib
import json
import math
import os
import subprocess
import sys
import tempfile
import threading
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parent
RUNTIME = ROOT / ".speech-runtime"
MODEL = RUNTIME / "vosk-model-small-de-0.15"
CHUNK = 24
model = None
model_lock = threading.Lock()
workers = threading.BoundedSemaphore(3)
chunk_locks = [threading.Lock() for _ in range(67)]


def available():
    return MODEL.is_dir() and (RUNTIME / "packages" / "vosk").is_dir()


def recognizer():
    global model
    with model_lock:
        if model is None:
            sys.path.insert(0, str(RUNTIME / "packages"))
            from vosk import Model, SetLogLevel
            SetLogLevel(-1)
            model = Model(str(MODEL))
    from vosk import KaldiRecognizer
    rec = KaldiRecognizer(model, 16000)
    rec.SetWords(True)
    return rec


def words_for(path, dest, audio, duration, part):
    if not 0 <= part < math.ceil(duration / CHUNK):
        raise ValueError("Film vaqtidan tashqarida.")
    directory = dest / "words-de-v1"
    directory.mkdir(parents=True, exist_ok=True)
    target = directory / f"{part}.json"
    with chunk_locks[hash(target) % len(chunk_locks)]:
        if target.exists():
            return json.loads(target.read_text())
        with workers:
            start, end = part * CHUNK, min((part + 1) * CHUNK, duration)
            offset = max(0, start - 1.8)
            cmd = ["ffmpeg", "-nostdin", "-loglevel", "error", "-ss", str(offset), "-i", str(path),
                   "-t", str(min(end + 1.8, duration) - offset), "-map", f"0:{audio['index']}"]
            if audio.get("channel_layout") in {"5.1", "5.1(side)", "7.1", "3.0"}:
                cmd += ["-af", "pan=mono|c0=FC"]
            cmd += ["-ac", "1", "-ar", "16000", "-f", "s16le", "pipe:1"]
            pcm = subprocess.check_output(cmd, timeout=90)
            rec = recognizer()
            items = []
            for i in range(0, len(pcm), 8000):
                if rec.AcceptWaveform(pcm[i:i+8000]):
                    items.extend(json.loads(rec.Result()).get("result", []))
            items.extend(json.loads(rec.FinalResult()).get("result", []))
            result = []
            for w in items:
                a = round(max(start, offset + w["start"]), 3)
                b = round(min(end, offset + w["end"]), 3)
                if a < b and w["conf"] >= .55:
                    result.append({"start": a, "end": b, "word": w["word"]})
            with tempfile.NamedTemporaryFile(mode="w", dir=directory, delete=False) as out:
                json.dump(result, out, ensure_ascii=False)
            os.replace(out.name, target)
            return result


def timestamp(t):
    seconds, ms = divmod(round(t * 1000), 1000)
    minutes, sec = divmod(seconds, 60)
    hour, minute = divmod(minutes, 60)
    return f"{hour:02}:{minute:02}:{sec:02},{ms:03}"


def export(path):
    path = path.resolve()
    probe = json.loads(subprocess.check_output(["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", str(path)]))
    audio = next((s for s in probe["streams"] if s["codec_type"] == "audio" and s.get("tags", {}).get("language", "").lower() in {"de", "ger", "deu"}), None)
    if audio is None:
        raise SystemExit("Nemischa audio treki topilmadi.")
    stat = path.stat()
    key = hashlib.sha256(f"{path.name}:{stat.st_size}:{stat.st_mtime_ns}".encode()).hexdigest()[:32]
    duration = float(probe["format"]["duration"])
    dest = ROOT / ".movie-cache" / key
    dest.mkdir(parents=True, exist_ok=True)
    filename = path.with_name(path.stem.rstrip(".") + ".auto.words.de.srt")
    if filename.exists():
        raise FileExistsError(filename)
    with ThreadPoolExecutor(max_workers=3) as pool, tempfile.NamedTemporaryFile(mode="w", dir=dest, delete=False) as out:
        i = 0
        for words in pool.map(lambda n: words_for(path, dest, audio, duration, n), range(math.ceil(duration / CHUNK))):
            for w in words:
                i += 1
                out.write(f"{i}\n{timestamp(w['start'])} --> {timestamp(w['end'])}\n{w['word']}\n\n")
    os.link(out.name, filename)  # Never replace a user-supplied subtitle.
    os.unlink(out.name)
    print(filename, i, flush=True)


if __name__ == "__main__":
    export(Path(sys.argv[1]))
