# NewKairo landing page · Omar Naggar, G Developments

Static site, no build step. English at `/`, Arabic at `/ar`.

- Meta Pixel: paste the Pixel ID in `tracking.js` (`META_PIXEL_ID`). Every WhatsApp button then fires a `Contact` event.
- Images are the .webp files (WebP, compressed for mobile).
- Deploy: import this repo in Vercel, Framework Preset "Other", no build command, output directory = root.
