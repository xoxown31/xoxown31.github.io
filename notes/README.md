# Notes

One notebook per note. Each notebook here becomes a page on the site and a row on the index.

## File name

```
YYYY-MM-DD-short-slug.ipynb
```

Lowercase, words joined by hyphens. The date in the name is the date shown on the index,
and the index is sorted by it (newest first).

## First cell

The first cell is markdown and starts with the title. The index uses this heading.

```markdown
# Why x + 1 is not a linear map
*2026-11-04 · linear algebra*
```

Second line: date and one or two tags.

## Shape of a note

Not a fixed template, but most notes look like this:

| Section | Who writes it | What goes there |
|---|---|---|
| **Question** | me | What I wanted to know, in one or two sentences. |
| **What I first thought** | me | My first (often wrong) guess. Keep it even if it was wrong. |
| Definition / setup | me or AI | The minimum needed to follow the rest. |
| Code | me or AI | Checks the claim. Outputs are the evidence. |
| **Why** | me or AI | The derivation or reason behind what the code showed. |
| **Aha** | me | What clicked, in my own words. |

The bold sections are mine. Never let AI write them.

Start from `templates/note-template.ipynb`.

## Rules for the build

The site re-runs every notebook from a fresh kernel on each push.

- **Must run top to bottom.** If "Restart & Run All" fails locally, the deploy fails.
- **Only packages in `requirements.txt`.** Add a package there if a note needs it.
- **Under 10 minutes, CPU only.** No GPU, no large downloads.
- **Seed every random generator** (`np.random.default_rng(0)`) so the page is the same every build.
- **Make figures in the notebook** with matplotlib. No separate image files.
- Committing with outputs cleared is fine; they are regenerated.
- Write in English.
