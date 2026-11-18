# present-time composition (PTC) website

Static website published with GitHub Pages from the `docs/` folder,
at https://present-time-composition.eu

- Pages: `docs/*/index.html`
- Design: `docs/assets/style.css`
- Menu: `docs/assets/menu.js`, contact form: `docs/assets/contact.js`

## Maintenance notes

- After changing `docs/assets/style.css` or any `docs/assets/*.js`, raise the
  `?v=...` number in the page links so browsers fetch the new files.
- Page descriptions, share images and icons: `perl tools/meta.pl`
  (descriptions are listed at the top of that file).

## Moving to present-time-composition.eu

1. Put `present-time-composition.eu` back into `docs/CNAME`.
2. In `tools/meta.pl` set `$BASE` to `https://present-time-composition.eu/` and run it.
3. Commit, push, then tick "Enforce HTTPS" in GitHub → Settings → Pages.
