# xoxown31.github.io

Personal page and study notes.

## Writing a note

1. Copy `templates/note-template.ipynb` to `notes/YYYY-MM-DD-slug.ipynb`.
2. Fill it in. Format and rules: [`notes/README.md`](notes/README.md).
3. Push to `main`.

GitHub Actions re-executes every notebook from scratch, renders it with
nbconvert's classic template, rebuilds the index, and deploys to Pages.
Cell numbers on the page always run `In [1]`, `In [2]`, ...; every output is real.

## Building locally

```
pip install -r requirements.txt
python build.py        # writes _site/
```

The index page lives in `templates/index.html`.
