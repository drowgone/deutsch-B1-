"""Portable, streaming backup of the platform and its project-owned data."""
import argparse
import hashlib
import io
import json
import os
from pathlib import Path
import sqlite3
import tarfile
import tempfile
import time

import platform_profile

ROOT = Path(__file__).resolve().parent
PREFIX = 'Deutsch-B1-Platforma/'
MANIFEST = PREFIX + '.platform-data/backup-manifest.json'


class DigestReader:
    def __init__(self, stream):
        self.stream = stream
        self.digest = hashlib.sha256()

    def read(self, size):
        data = self.stream.read(size)
        self.digest.update(data)
        return data


def write_archive(output, profile):
    with tempfile.TemporaryDirectory() as temp, tarfile.open(fileobj=output, mode='w|', dereference=True, bufsize=256 * 1024) as archive:
        dbpath = Path(temp) / 'profile.sqlite3'
        with sqlite3.connect(dbpath) as db:
            db.execute('CREATE TABLE profile (id INTEGER PRIMARY KEY, data TEXT NOT NULL)')
            db.execute('INSERT INTO profile VALUES (1, ?)', (json.dumps(profile, ensure_ascii=False),))
        db.close()
        dbpath.chmod(0o600)
        entries = {}

        def add(path, name):
            if path.is_symlink():
                raise ValueError(f'Simvolik havolani oddiy fayl yoki papkaga almashtiring: {name}')
            info = archive.gettarinfo(str(path), arcname=PREFIX + name)
            if info.isdir():
                archive.addfile(info)
                for child in sorted(path.iterdir()):
                    if child.name != '__pycache__' and not child.name.endswith('.pyc'):
                        add(child, name + '/' + child.name)
            elif info.isreg():
                with path.open('rb') as src:
                    st = os.fstat(src.fileno())
                    info.pax_headers['mtime'] = f'{st.st_mtime_ns // 10**9}.{st.st_mtime_ns % 10**9:09}'
                    reader = DigestReader(src)
                    archive.addfile(info, reader)
                    if (st.st_size, st.st_mtime_ns) != (path.stat().st_size, path.stat().st_mtime_ns):
                        raise ValueError('Zaxiralash paytida fayl o‘zgardi: ' + name)
                    entries[info.name] = reader.digest.hexdigest()
            else:
                raise ValueError('Oddiy fayl emas: ' + name)

        for name in ('index.html', 'start.sh', 'movie_server.py', 'movie_tracks.py', 'movie_words.py', 'platform_profile.py', 'project_backup.py', 'Movie-qollanma.txt', 'Zaxira-qollanma.txt', 'assets', 'movie', '.speech-runtime'):
            if name in ('movie', '.speech-runtime') and not (ROOT / name).exists():
                continue
            add(ROOT / name, name)
        add(dbpath, '.platform-data/profile.sqlite3')
        manifest = json.dumps(entries, ensure_ascii=False).encode()
        info = tarfile.TarInfo(MANIFEST)
        info.size = len(manifest)
        archive.addfile(info, io.BytesIO(manifest))


def verify(path):
    entries = {}
    expected = None
    with tarfile.open(path, 'r|*') as archive:
        for info in archive:
            if expected is not None:
                raise ValueError('Manifest arxivning oxirida emas.')
            if info.name == MANIFEST:
                expected = json.load(archive.extractfile(info))
            elif info.isfile():
                reader = DigestReader(archive.extractfile(info))
                while reader.read(1024 * 1024):
                    pass
                entries[info.name] = reader.digest.hexdigest()
    if expected != entries or PREFIX + '.platform-data/profile.sqlite3' not in entries:
        raise ValueError('Arxiv chala yoki fayllar o‘zgargan.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('operation', choices=['save', 'verify'])
    parser.add_argument('path', nargs='?')
    args = parser.parse_args()
    if args.operation == 'verify':
        if not args.path:
            parser.error('Arxiv yo‘lini kiriting.')
        verify(args.path)
        print('Arxivdagi barcha fayllar tekshirildi.')
    else:
        target = Path(args.path or ROOT.parent / time.strftime('Deutsch-B1-%Y%m%d-%H%M%S.tar')).expanduser().resolve()
        if ROOT in target.parents or target.exists():
            parser.error('Loyihadan tashqarida yangi fayl nomini tanlang.')
        profile = platform_profile.load_profile()
        ws = profile.setdefault('workspace', {'positions': {}})
        ws.setdefault('backupResume', {'at': time.time_ns() // 10**6, 'media': ws.get('mediaMode')})
        with tempfile.NamedTemporaryFile(dir=target.parent) as out:
            write_archive(out, profile)
            out.flush()
            os.fsync(out.fileno())
            os.link(out.name, target)
        print(target)
