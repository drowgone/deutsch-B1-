#!/bin/sh
set -eu

project_dir=$(CDPATH='' cd -- "$(dirname -- "$0")" && pwd)
if ! command -v python3 >/dev/null 2>&1; then
    printf '%s\n' 'Deutsch B1 uchun Python 3 kerak.' >&2
    exit 1
fi
cd -- "$project_dir"
case "${1:-}" in
    --backup) shift; exec python3 -B "$project_dir/project_backup.py" save "$@" ;;
    --verify-backup) shift; exec python3 -B "$project_dir/project_backup.py" verify "$@" ;;
esac
exec python3 -B "$project_dir/movie_server.py" --open "$@"
