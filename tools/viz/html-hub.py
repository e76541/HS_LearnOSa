#!/usr/bin/env python3
"""HS LearnOS HTML Hub: build a file:// index or serve a live directory view."""

from __future__ import annotations

import argparse
import html
import json
import re
import sys
from datetime import datetime, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


REPO_ROOT = Path(__file__).resolve().parents[2]
DOCS_ROOT = REPO_ROOT / "docs"
HUB_PATH = DOCS_ROOT / "html-hub.html"
TITLE_RE = re.compile(r"<title[^>]*>(.*?)</title>", re.IGNORECASE | re.DOTALL)
GENERATOR_RE = re.compile(
    r'<meta\s+[^>]*name=["\']generator["\'][^>]*content=["\']([^"\']+)["\']',
    re.IGNORECASE,
)
STATIC_RE = re.compile(
    r"<!-- HTML_HUB_DATA_START -->.*?<!-- HTML_HUB_DATA_END -->",
    re.DOTALL,
)


def normalize_title(raw: str, fallback: str) -> str:
    value = html.unescape(re.sub(r"\s+", " ", raw)).strip()
    return value or fallback


def scan_directory(docs_root: Path, hub_name: str = "html-hub.html") -> list[dict[str, object]]:
    items: list[dict[str, object]] = []
    if not docs_root.exists():
        return items

    for path in docs_root.rglob("*.html"):
        relative = path.relative_to(docs_root)
        if path.name == hub_name or "archive" in relative.parts or any(
            part.startswith(".") for part in relative.parts
        ):
            continue

        try:
            stat = path.stat()
            head = path.read_text(encoding="utf-8", errors="replace")[:131072]
        except OSError:
            continue

        title_match = TITLE_RE.search(head)
        generator_match = GENERATOR_RE.search(head)
        category = relative.parts[0] if len(relative.parts) > 1 else "docs"
        items.append(
            {
                "path": relative.as_posix(),
                "title": normalize_title(
                    title_match.group(1) if title_match else "", path.stem
                ),
                "category": category,
                "generator": generator_match.group(1).strip()
                if generator_match
                else "HTML",
                "size": stat.st_size,
                "modified": datetime.fromtimestamp(
                    stat.st_mtime, tz=timezone.utc
                ).isoformat(),
            }
        )

    items.sort(key=lambda item: (str(item["modified"]), str(item["path"])), reverse=True)
    return items


def payload() -> dict[str, object]:
    return {
        "generatedAt": datetime.now(tz=timezone.utc).isoformat(),
        "items": scan_directory(DOCS_ROOT),
    }


def build_static() -> int:
    if not HUB_PATH.exists():
        print(f"找不到管理中心: {HUB_PATH}", file=sys.stderr)
        return 1

    source = HUB_PATH.read_text(encoding="utf-8")
    current_payload = payload()
    data = json.dumps(current_payload, ensure_ascii=False, separators=(",", ":")).replace(
        "</", "<\\/"
    )
    replacement = (
        "<!-- HTML_HUB_DATA_START -->\n"
        f"<script>window.__HTML_HUB_STATIC__={data};</script>\n"
        "<!-- HTML_HUB_DATA_END -->"
    )
    updated, count = STATIC_RE.subn(replacement, source, count=1)
    if count != 1:
        print("管理中心缺少靜態資料標記", file=sys.stderr)
        return 1
    HUB_PATH.write_text(updated, encoding="utf-8")
    print(
        f"已更新 {HUB_PATH.relative_to(REPO_ROOT)} "
        f"({len(current_payload['items'])} 份 HTML)"
    )
    return 0


class HubHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args: object, **kwargs: object) -> None:
        super().__init__(*args, directory=str(REPO_ROOT), **kwargs)

    def do_GET(self) -> None:  # noqa: N802
        parsed = urlparse(self.path)
        if parsed.path == "/api/html-manifest":
            body = json.dumps(payload(), ensure_ascii=False).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        if parsed.path == "/":
            self.send_response(302)
            self.send_header("Location", "/docs/html-hub.html")
            self.end_headers()
            return
        super().do_GET()

    def end_headers(self) -> None:
        self.send_header("X-Content-Type-Options", "nosniff")
        super().end_headers()

    def log_message(self, fmt: str, *args: object) -> None:
        if self.path.startswith("/api/"):
            return
        super().log_message(fmt, *args)


def serve(host: str, port: int) -> int:
    server = ThreadingHTTPServer((host, port), HubHandler)
    print(f"HTML 管理中心: http://{host}:{port}/docs/html-hub.html")
    print("每 2 秒自動檢查新 HTML；按 Ctrl+C 停止。")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
    return 0


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="大量 HTML 輸出的統一管理中心")
    subparsers = parser.add_subparsers(dest="command")
    subparsers.add_parser("build", help="把目前索引寫入 HTML，供 file:// 直接開啟")
    serve_parser = subparsers.add_parser("serve", help="啟動會自動更新的本機管理中心")
    serve_parser.add_argument("--host", default="127.0.0.1")
    serve_parser.add_argument("--port", type=int, default=8765)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    if args.command == "build":
        return build_static()
    return serve(getattr(args, "host", "127.0.0.1"), getattr(args, "port", 8765))


if __name__ == "__main__":
    raise SystemExit(main())
