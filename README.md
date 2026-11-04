# xoxown31.github.io

Personal page and study notes.

## Writing a note

1. Add a notebook to `notes/` named `YYYY-MM-DD-slug.ipynb`.
2. Its first markdown cell starts with `# Title` (used on the index).
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
