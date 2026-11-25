"""Shared study profile for the loopback server."""
import json
import os
import sqlite3
from contextlib import closing
from pathlib import Path

DATABASE = Path(__file__).resolve().parent / ".platform-data" / "profile.sqlite3"
SECTIONS = {"state", "workspace", "movie", "captions", "subtitles"}
ID_LISTS = {"completedLessons", "masteredWords", "favoriteWords", "customLessons",
            "customWords", "customReadingTexts", "customGoetheTasks"}
MISSING = object()


def connect():
    DATABASE.parent.mkdir(mode=0o700, exist_ok=True)
    with os.fdopen(os.open(DATABASE, os.O_CREAT | os.O_WRONLY, 0o600), "wb"):
        pass
    db = sqlite3.connect(DATABASE)
    db.execute("CREATE TABLE IF NOT EXISTS profile (id INTEGER PRIMARY KEY, data TEXT NOT NULL)")
    db.execute("CREATE TABLE IF NOT EXISTS applied (stamp INTEGER PRIMARY KEY, token TEXT UNIQUE NOT NULL)")
    return db


def read(db):
    row = db.execute("SELECT data FROM profile WHERE id = 1").fetchone()
    return json.loads(row[0]) if row else {}


def load_profile():
    with closing(connect()) as db:
        return read(db)


def keyed(items):
    return {str(item["id"]) if isinstance(item, dict) and "id" in item
            else json.dumps(item, sort_keys=True, ensure_ascii=False): item for item in items}


def merge(before, value, current, path, initial):
    if value is MISSING:
        return MISSING if current == before else current
    if before == value:
        return current
    if current is MISSING or current == before:
        return value

    counter = path[:2] in (["state", "studyStats"], ["state", "activityLog"])
    if counter and path[-1] in {"ms", "correct", "wrong", "done", "words", "exercises"}:
        if type(current) in (int, float) and type(value) in (int, float):
            if initial:
                return max(current, value)
            return max(0, current + value - (before if type(before) in (int, float) else 0))
    if path == ["state", "bestStreak"] or path == ["state", "articleBestStreak"]:
        if type(current) is int and type(value) is int:
            return max(current, value)

    if path == ["workspace", "focusTimer"]:
        return current
    if len(path) == 2 and path[0] == "workspace" and path[1] in {"ui", "avatarRoute"}:
        return current if initial else value
    if len(path) == 2 and path[0] == "subtitles":
        return current if initial else value

    if isinstance(value, dict) and isinstance(current, dict):
        old = before if isinstance(before, dict) else {}
        result = current.copy()
        for key in dict.fromkeys([*old, *value]):
            resolved = merge(old.get(key, MISSING), value.get(key, MISSING),
                             current.get(key, MISSING), [*path, key], initial)
            if resolved is MISSING:
                result.pop(key, None)
            else:
                result[key] = resolved
        return result

    if len(path) == 2 and path[0] == "state" and path[1] in ID_LISTS:
        if isinstance(value, list) and isinstance(current, list):
            old = keyed(before) if isinstance(before, list) else {}
            edited, result = keyed(value), keyed(current)
            for key in dict.fromkeys([*old, *edited]):
                resolved = merge(old.get(key, MISSING), edited.get(key, MISSING),
                                 result.get(key, MISSING), [*path, key], initial)
                if resolved is MISSING:
                    result.pop(key, None)
                else:
                    result[key] = resolved
            return list(result.values())

    return current if initial else value


def apply_profile(payload):
    token, changes = payload["token"], payload["changes"]
    if not isinstance(token, str) or not 1 <= len(token) <= 100 or not isinstance(changes, list):
        raise ValueError("Invalid profile update")
    for change in changes:
        path = change["path"]
        if not isinstance(path, list) or not 1 <= len(path) <= 16 or not all(isinstance(k, str) for k in path):
            raise ValueError("Invalid profile path")
        if path[0] not in SECTIONS or any(k in {"__proto__", "constructor", "prototype"} for k in path):
            raise ValueError("Invalid profile section")
    with closing(connect()) as db, db:
        db.execute("BEGIN IMMEDIATE")
        if db.execute("SELECT 1 FROM applied WHERE token = ?", (token,)).fetchone():
            return
        profile = read(db)
        for change in changes:
            path = change["path"]
            parent = profile
            for key in path[:-1]:
                if not isinstance(parent.get(key), dict):
                    parent[key] = {}
                parent = parent[key]
            key = path[-1]
            value = merge(change.get("before", MISSING), change.get("value", MISSING),
                          parent.get(key, MISSING), path, payload.get("initial") is True)
            if value is MISSING:
                parent.pop(key, None)
            else:
                parent[key] = value
        db.execute("INSERT OR REPLACE INTO profile (id, data) VALUES (1, ?)",
                   (json.dumps(profile, ensure_ascii=False, allow_nan=False),))
        db.execute("INSERT INTO applied (token) VALUES (?)", (token,))
        db.execute("DELETE FROM applied WHERE stamp <= (SELECT max(stamp) - 512 FROM applied)")
