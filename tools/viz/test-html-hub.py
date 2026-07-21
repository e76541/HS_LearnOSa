#!/usr/bin/env python3

from __future__ import annotations

import importlib.util
import tempfile
import time
import unittest
from pathlib import Path


SCRIPT = Path(__file__).with_name("html-hub.py")
SPEC = importlib.util.spec_from_file_location("html_hub", SCRIPT)
assert SPEC and SPEC.loader
HTML_HUB = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(HTML_HUB)


class HtmlHubTests(unittest.TestCase):
    def test_scans_300_files_without_reading_archive(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = Path(temp)
            for index in range(300):
                category = docs / f"group-{index % 6}"
                category.mkdir(exist_ok=True)
                (category / f"page-{index}.html").write_text(
                    f"<!doctype html><title>頁面 {index}</title><p>{index}</p>",
                    encoding="utf-8",
                )
            archive = docs / "archive"
            archive.mkdir()
            (archive / "old.html").write_text("<title>舊檔</title>", encoding="utf-8")

            started = time.perf_counter()
            items = HTML_HUB.scan_directory(docs)
            elapsed = time.perf_counter() - started

            self.assertEqual(len(items), 300)
            self.assertTrue(all(Path(str(item["path"])).suffix == ".html" for item in items))
            self.assertLess(elapsed, 2.0)

    def test_title_and_generator_are_extracted(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = Path(temp)
            page = docs / "management" / "diagram.html"
            page.parent.mkdir()
            page.write_text(
                '<meta name="generator" content="archify 2.11.0"><title>A &amp; B</title>',
                encoding="utf-8",
            )
            [item] = HTML_HUB.scan_directory(docs)
            self.assertEqual(item["title"], "A & B")
            self.assertEqual(item["generator"], "archify 2.11.0")
            self.assertEqual(item["category"], "management")

    def test_new_file_appears_on_next_scan(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = Path(temp)
            self.assertEqual(HTML_HUB.scan_directory(docs), [])
            (docs / "new.html").write_text("<title>剛輸出</title>", encoding="utf-8")
            items = HTML_HUB.scan_directory(docs)
            self.assertEqual(len(items), 1)
            self.assertEqual(items[0]["title"], "剛輸出")

    def test_hub_supports_five_parallel_previews(self) -> None:
        source = HTML_HUB.HUB_PATH.read_text(encoding="utf-8")
        self.assertIn('selectedPaths: []', source)
        self.assertIn('state.selectedPaths.length < 5', source)
        self.assertIn('previewGrid.dataset.count', source)
        self.assertIn('grid-template-columns: repeat(6, minmax(0, 1fr))', source)


if __name__ == "__main__":
    unittest.main()
