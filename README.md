# present-time composition (PTC) website

Static website published with GitHub Pages from the `docs/` folder,
at https://present-time-composition.eu (domain and email at all-inkl, KAS account w0145429).

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

## Impressum and Datenschutz

- **Impressum:** every "Impressum" link goes to OMA's page, https://othermusicacademy.eu/kontakt/.
  `docs/impressum/` only forwards there. Our own Impressum draft is kept locally in
  `unpublished/impressum/`; to use it again, move it back into `docs/`, point the footer links
  back to `impressum/` and remove the `#` in front of its line in `tools/meta.pl`.
- **Datenschutz:** our own page, `docs/datenschutz/` (GitHub hosting, Web3Forms contact form,
  Tally application form, Vimeo/YouTube). Not yet checked by a lawyer.

## Domain setup (present-time-composition.eu)

- `docs/CNAME` tells GitHub Pages the site's address; `$BASE` in `tools/meta.pl` is used
  for the share links.
- DNS in KAS → Tools → DNS-Einstellungen: four A records for the domain itself
  (185.199.108.153, .109.153, .110.153, .111.153) and `www` as a CNAME to
  `present-time-composition.github.io`. The MX and SPF (TXT) records stay at all-inkl,
  so email keeps working.
- "Enforce HTTPS" is ticked in GitHub → Settings → Pages.
