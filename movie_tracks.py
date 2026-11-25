"""Discover external captions and decode selectable Blu-ray subtitle pictures."""
import hashlib
import json
import re
import sys
import tempfile
from pathlib import Path

LANGS = {"ger":"de", "deu":"de", "eng":"en", "cze":"cs", "dut":"nl", "fin":"fi", "nor":"no"}
BITMAP = {"hdmv_pgs_subtitle", "dvd_subtitle", "dvb_subtitle", "xsub"}


def embedded(stream):
    tags = stream.get("tags", {})
    raw = tags.get("language", "und")
    lang = LANGS.get(raw, raw)
    kind = "pgs" if stream["codec_name"] == "hdmv_pgs_subtitle" else "bitmap" if stream["codec_name"] in BITMAP else "text"
    return {"id":str(stream["index"]), "lang":lang, "label":tags.get("title") or lang.upper(), "kind":kind}


def sidecars(movie, files):
    stem = movie.stem.rstrip(".").casefold()
    tracks = []
    for path in sorted(files):
        name = path.stem.casefold()
        if name != stem and not any(name.startswith(stem + sep) for sep in (".", " ", "_", "-")):
            continue
        try:
            stat = path.stat()
        except OSError:
            continue
        tag = hashlib.sha256(f"{path.name}:{stat.st_mtime_ns}:{stat.st_size}".encode()).hexdigest()[:20]
        suffix = name[len(stem):]
        lang = "de" if re.search(r"\b(de|ger|deu|german|deutsch)\b", suffix) else "en" if re.search(r"\b(en|eng|english)\b", suffix) else "und"
        tracks.append(({"id":"s"+tag, "lang":lang, "label":path.name, "kind":"file"},path))
    return tracks


def pgs_index(path, dest, index, duration):
    if (dest / "index.json").exists():
        return
    sys.path.insert(0, str(Path(__file__).resolve().parent / ".speech-runtime" / "packages"))
    import av
    from PIL import Image
    palettes = {}
    cues = []
    with tempfile.TemporaryDirectory(dir=dest.parent) as temp, av.open(str(path)) as container:
        out = Path(temp)
        stream = container.streams[index]
        palette_id = 0
        for packet in container.demux(stream):
            if packet.pts is None:
                continue
            time = float(packet.pts * packet.time_base) - (container.start_time or 0) / 1000000
            data = bytes(packet)
            i = 0
            while i + 3 <= len(data):
                typ, size = data[i], int.from_bytes(data[i+1:i+3], "big")
                seg = data[i+3:i+3+size]
                i += 3 + size
                if typ == 0x16 and len(seg) > 9:
                    palette_id = seg[9]
                if typ == 0x14 and len(seg) >= 2:
                    colors = palettes.setdefault(seg[0], [(0,0,0,0)] * 256)
                    for k in range(2,len(seg)-4,5):
                        idx,y,cr,cb,alpha = seg[k:k+5]
                        y = 1.164 * (y-16)
                        rgb = (y+1.793*(cr-128), y-.213*(cb-128)-.533*(cr-128), y+2.112*(cb-128))
                        colors[idx] = (*[max(0,min(255,round(v))) for v in rgb],alpha)
            display = stream.codec_context.decode2(packet)
            if display is None:
                continue
            if cues:
                cues[-1]["end"] = min(cues[-1]["end"], time)
            rects = display.rects
            if not rects or palette_id not in palettes:
                continue
            left, top = min(r.x for r in rects), min(r.y for r in rects)
            img = Image.new("RGBA", (max(r.x+r.width for r in rects)-left, max(r.y+r.height for r in rects)-top))
            colors = palettes[palette_id]
            for r in rects:
                part = Image.frombytes("P",(r.width,r.height),bytes(r.planes[0]))
                part.putpalette(bytes(v for color in colors for v in color[:3]))
                part.info["transparency"] = bytes(color[3] for color in colors)
                img.alpha_composite(part.convert("RGBA"), (r.x-left,r.y-top))
            name = f"{len(cues)}.png"
            img.save(out/name,compress_level=1)
            cues.append({"start":round(time,3),"end":duration,"image":name})
        (out/"index.json").write_text(json.dumps(cues))
        out.rename(dest)
