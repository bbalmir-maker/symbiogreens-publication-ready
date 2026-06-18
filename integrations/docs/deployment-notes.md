# Deployment Notes

This package is a static website. It can be hosted on GitHub Pages, Netlify, Vercel static hosting, cPanel, Hostinger, GoDaddy hosting, or another static host.

## Basic Deployment

1. Upload the contents of `symbiogreens-publication-ready/`.
2. Set `index.html` as the entry file.
3. Confirm these routes load:
   - `#home`
   - `#products`
   - `#farms-projects`
   - `#team`
   - `#about`
   - `#investors`
   - `#contact`
   - `#privacy`
   - `#terms`
   - `#disclaimer`

## Domain Setup

1. Add the custom domain in the hosting dashboard.
2. Update DNS records.
3. Enable HTTPS.
4. Test root and `www` versions.
5. Refresh deep hash routes to confirm the static shell loads correctly.

## Production Warning

The public website can be published as a static site. Buyer accounts, manager tools, survey storage, and investor access remain prototype features until a backend is connected.
