"""Build the site: execute every notebook in notes/, render it, and write the index.

notes/YYYY-MM-DD-slug.ipynb  ->  _site/notes/YYYY-MM-DD-slug.html
templates/index.html         ->  _site/index.html  ({{NOTES}}, {{UPDATED}} filled in)

The note title is the first "# ..." heading in the notebook's first markdown cell.
Notebooks are re-executed from scratch on every build, so cell numbers are always
In [1], In [2], ... and every output on the page is real.
"""
import datetime
import html
import pathlib
import re

import nbformat
from nbclient import NotebookClient
from nbconvert import HTMLExporter

ROOT = pathlib.Path(__file__).parent
OUT = ROOT / "_site"
NOTES_DIR = ROOT / "notes"

BACK_LINK = (
    '<div style="max-width:940px;margin:1.2em auto 0;padding:0 15px;'
    'font-family:\'Times New Roman\',Times,serif;font-size:16px;">'
    '<a href="../index.html">&larr; Taejoo Park</a></div>'
)


def note_title(nb, fallback):
    for cell in nb.cells:
        if cell.cell_type == "markdown":
            m = re.search(r"^#\s+(.+)$", cell.source, re.M)
            return m.group(1).strip() if m else fallback
    return fallback


def build_note(path, exporter):
    nb = nbformat.read(path, as_version=4)
    NotebookClient(
        nb, timeout=600, kernel_name="python3",
        resources={"metadata": {"path": str(path.parent)}},
    ).execute()
    body, _ = exporter.from_notebook_node(nb)
    title = note_title(nb, path.stem)
    body = re.sub(r"<title>.*?</title>", f"<title>{html.escape(title)}</title>", body, count=1, flags=re.S)
    body = re.sub(r"(<body[^>]*>)", r"\1" + BACK_LINK, body, count=1)
    (OUT / "notes" / f"{path.stem}.html").write_text(body, encoding="utf-8")
    return path.stem[:10], title, f"notes/{path.stem}.html"


def main():
    (OUT / "notes").mkdir(parents=True, exist_ok=True)
    exporter = HTMLExporter(template_name="classic")

    rows = []
    for path in sorted(NOTES_DIR.glob("*.ipynb"), reverse=True):
        date, title, href = build_note(path, exporter)
        rows.append(f'<tr><td>{date}</td><td><a href="{href}">{html.escape(title)}</a></td></tr>')
        print("built", href)

    index = (ROOT / "templates" / "index.html").read_text(encoding="utf-8")
    index = index.replace("{{NOTES}}", "\n".join(rows))
    index = index.replace("{{UPDATED}}", datetime.date.today().isoformat())
    (OUT / "index.html").write_text(index, encoding="utf-8")
    (OUT / ".nojekyll").write_text("")
    print("built index.html")


if __name__ == "__main__":
    main()
