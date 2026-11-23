# present-time composition (PTC) website

Static website published with GitHub Pages from the `docs/` folder,
currently at https://present-time-composition.github.io/ptc-website/
(moving to https://present-time-composition.eu later, see below).

- Pages: `docs/*/index.html`
- Design: `docs/assets/style.css`
- Menu: `docs/assets/menu.js`, contact form: `docs/assets/contact.js`

## Maintenance notes

- After changing `docs/assets/style.css` or any `docs/assets/*.js`, raise the
  `?v=...` number in the page links so browsers fetch the new files.
- Page descriptions, share images and icons: `perl tools/meta.pl`
  (descriptions are listed at the top of that file).

## Deep-dive page (unpublished for now)

The deep-dive page is taken off the site while its contents are reviewed. It is kept
on this computer in `unpublished/deep-dive/` (index.html plus four PDFs), which is not
uploaded to GitHub. Ilana Reynolds' lab notes (`ptc-music-dance-lab-notes-2017.pdf`) are
also hidden from the PTC Dance page; the page code marks where their Texts section was.
To publish it again:

1. Move `unpublished/deep-dive/index.html` back to `docs/deep-dive/index.html`, and the
   PDFs back into `docs/deep-dive/files/`.
2. Put the `deep-dive` link back into the about menu on every page (after "testimonies").
3. Remove the `#` in front of the deep-dive line in `tools/meta.pl` and run it.

## Moving to present-time-composition.eu

1. Put `present-time-composition.eu` back into `docs/CNAME`.
2. In `tools/meta.pl` set `$BASE` to `https://present-time-composition.eu/` and run it.
3. Commit, push, then tick "Enforce HTTPS" in GitHub → Settings → Pages.
