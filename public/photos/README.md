# Photos needed

Drop files into this folder with these exact names. The site already points at
these paths — nothing else needs to change once the files are here.

| Filename | Used in | Aspect ratio | Notes |
|---|---|---|---|
| `hero.jpg` | Hero, under your name | 16:9 (wide) | Action shot works best — this is the first image people see, with a headline overlaid on the bottom third. |
| `gallery.jpg` | Content Portfolio grid | 4:5 (tall/portrait) | Sits next to the LinkedIn and FavorIt video cards. |
| `closing.jpg` | Full-bleed statement near the bottom | 21:9 (ultra-wide) | "Keep Failing Forward." is overlaid on the bottom third — pick something with open space low in the frame so the text stays legible. |

Save each as `.jpg` with that exact name. If you'd rather use `.png` or
`.webp`, just tell me and I'll update the matching `src` path in
`src/App.jsx` — the three lines are easy to find (search for `/photos/`).

If a file is missing or fails to load, that section falls back to the
striped placeholder automatically, so it's safe to add these one at a time
rather than all at once.
