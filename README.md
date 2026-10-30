# Winter sublets, Berlin

A small static website for privately sharing two furnished apartment sublets
(December 2026 – January 2027). Plain HTML and CSS, plus one small script.
There is no framework, no build step and nothing to install.

Live URL (once GitHub Pages is enabled):
https://statspoet.github.io/26-apartment-sublet/

## Privacy model

- The site is **public**: anyone who has the link can open it. It is only
  meant to be shared directly with interested people.
- Every page has `<meta name="robots" content="noindex, nofollow">` and there
  is a `robots.txt`. These ask search engines not to list the site, but they
  are **not** access control.
- No analytics, no tracking, no external requests. The font is stored in this
  repository.
- The repository is public, so **every file and the full Git history are
  public too**. Only sanitized publication material belongs here.
- `PROJECT_INPUT.md` (private notes, phone numbers) is listed in `.gitignore`
  and must never be committed. Original photos stay outside the repository.

## Structure

```text
index.html                  overview with both apartments
apartment-1/index.html      Reinickendorfer Str.
apartment-2/index.html      Ostender Str.
assets/css/style.css        all styles; design tokens at the top
assets/js/main.js           keeps dates and totals current (see below)
assets/fonts/               Instrument Serif (SIL Open Font License, OFL.txt)
assets/images/              sanitized photos, one folder per apartment
robots.txt
.nojekyll                   tells GitHub Pages to serve the files as they are
```

All links are relative, so the site works under the `/26-apartment-sublet/`
project path as well as locally.

## Changing content

All apartment text lives directly in the two apartment pages. Search the file
for the text you want to change. The overview cards in `index.html` repeat a
few facts (title, monthly rent, dates, length of stay, total, size), so
update them there as well.

Inside sentences, "S-Bahn" and "Wi-Fi" are wrapped in
`<span class="nowrap">…</span>` so they never break at the hyphen. Keep the
wrapper when you edit those sentences.

### Dates and prices

Each apartment has a fixed price for its whole listed stay (currently €2,000
each). The monthly rent is the headline; the total for the stay is shown
next to the dates. The price block appears in two forms:

1. the visible text, for example `€2,000`, `6 Dec 2026` and `40 nights`;
2. data attributes the script reads:
   `data-stay-start="2026-12-06" data-stay-end="2027-01-15" data-stay-price="2000"`.

When dates or price change, update **both**, on the apartment page and on its
overview card. The monthly rent and the deposit note are written by hand;
the script only changes the dates and the total.

`assets/js/main.js` handles the start date roll-forward: once the listed start
date has passed, the page shows today as the start date, the remaining
nights, and the price for those nights (same price per night as the full
stay, rounded to the nearest euro). After the end date it shows
"No longer available".

Without JavaScript, the dates and totals written in the HTML are shown.

### When an apartment is booked

The site cannot know this by itself. Either remove the apartment (delete its
folder, its overview card and its navigation links) or replace its
availability with a "Booked" note.

### Changing the look

Edit the design tokens at the top of `assets/css/style.css` (font sizes,
spacing, colours, radius, gallery settings) rather than styling individual
elements. The phone/desktop breakpoint is `48em` (about 768px).

## Photos

Photos must be prepared before they enter the repository:

1. keep the originals outside the repository (their folder and file names
   can contain private details such as house numbers, so never copy them in);
2. create copies that are rotated upright, converted to sRGB, stripped of all
   metadata (EXIF, GPS, camera data, colour profile, XMP) and, where needed,
   blurred over private details;
3. save each photo twice as JPEG: `apartment-1-01.jpg` (1600 px long edge,
   opened full size) and `apartment-1-01-small.jpg` (800 px, used in the
   gallery), in `assets/images/apartment-1/` or `assets/images/apartment-2/`;
4. check every image by eye for private details (documents, mail, names,
   screens, reflections, house numbers, recognisable views).

In each apartment page, a photo is one `<li>` in the `<ul class="gallery">`
list: a link to the large file around an `<img>` with both sizes in
`srcset` and a short `alt` description. The first photo is shown large on
desktop and is also the cover on the overview page and in link previews
(`og:image`). The desktop grid fills evenly when the number of photos is a
multiple of 3 (currently 15 and 9).

The Signal QR codes are `apartment-1-signal-qr.png` and
`apartment-2-signal-qr.png`, cropped to the code itself.

## Local preview

The site has to be previewed through a local web server so the subpath
behaves like GitHub Pages. From the folder that contains this repository:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/<this-folder-name>/`.

## Deploying to GitHub Pages

1. Commit and push to `main`.
2. On GitHub, open the repository, then **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, branch
   `main`, folder `/ (root)`, then **Save**.
4. Wait until GitHub shows the deployment as finished, then open
   https://statspoet.github.io/26-apartment-sublet/ and check the overview,
   both apartment pages (including opening them directly by URL), photos
   and contact links, on a phone and a desktop.

Every later push to `main` redeploys automatically.

## Taking the site down (by 1 February 2027)

1. **Settings → Pages**: unpublish the site.
2. Optionally make the repository private, archive it or delete it.
3. Keep local source material only where still needed.

## Credits

Headings use [Instrument Serif](https://github.com/Instrument/instrument-serif),
licensed under the SIL Open Font License 1.1 (see `assets/fonts/OFL.txt`).
