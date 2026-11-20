# Emstene Couture website

Static multi-page site for Vercel (no build step) plus one serverless function for order requests.

## Structure
- `index.html`, `styles.html`, `services.html`, `about.html`, `contact.html`, `404.html`
- `assets/style.css`, `assets/site.js` shared styling and behaviour
- `data/styles.json` the styles gallery (edit this, no code needed)
- `images/` put photos here
- `api/inquiry.js` emails the owner when the contact form is sent
- `vercel.json`, `sitemap.xml`, `robots.txt`

## Everyday edits
- **Add real photos:** upload to `images/`, then set `"image": "/images/your-photo.jpg"` on an item in `data/styles.json`. Use portrait photos (4:5), under 300 KB each.
- **Change phone or WhatsApp number:** search for `254738447566` and `0738 447 566` across files and replace. Run `npm test` after.
- **After you get a domain:** replace `https://emstene-couture.vercel.app` in all `.html` files and `sitemap.xml`/`robots.txt`.

## Order requests by email
In Vercel: Project, Settings, Environment Variables, then add:
- `RESEND_API_KEY` (free key from resend.com)
- `OWNER_EMAIL` (where requests should arrive)
- `FROM_EMAIL` (optional, a sender verified in Resend)

Without these, the form opens WhatsApp with the request pre-written, so no order is lost.

## Deploy checklist
- [ ] `npm test` passes
- [ ] Phone number and services confirmed by the owner
- [ ] Real photos added to `data/styles.json`
- [ ] Environment variables set, then submit a test request on `/contact` and confirm the email arrives
- [ ] Check every page on a phone (menu, WhatsApp bar, form)
- [ ] Domain set and URLs updated in canonical tags and sitemap
- [ ] Rollback: in Vercel Deployments, promote the previous deployment

## Design decisions
- Static HTML: loads fast on mobile data, cheap to host, nothing to patch.
- Gallery from JSON: the owner updates it without touching HTML.
- Form falls back to WhatsApp: the customer's main channel is the safety net.
- Revisit when: they want online payments, a product catalogue with stock, or more than ~30 styles. A CMS or Shopify would then make sense.
