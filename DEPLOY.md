# Deployment

The kiosk is a Vite + React SPA. Recommended host: **Vercel** (auto-detects
Vite, has a free tier, makes custom domains painless). Netlify or Cloudflare
Pages work the same way; Vercel is documented below.

## 1. Push the repo to GitHub

```bash
git push origin main
```

(Or whichever branch you want Vercel to track.)

## 2. Connect the repo to Vercel

1. Go to <https://vercel.com/new>, sign in with GitHub.
2. Import this repo.
3. Vercel auto-detects Vite — leave the framework preset on **Vite**, build
   command `npm run build`, output `dist`.
4. Click **Deploy**. You get a `*.vercel.app` URL right away.

The included `vercel.json` rewrites every request to `/index.html` so the
React Router routes (`/`, `/about`, `/kiosk`, etc.) work on direct visits and
refreshes.

## 3. Add a custom domain

1. In the Vercel project → **Settings → Domains** → add the domain you own
   (e.g. `specuflux.com`).
2. Vercel shows the DNS records to add at your registrar:
   - For an apex domain: an `A` record to `76.76.21.21`.
   - For a subdomain (`www`, `kiosk`, etc.): a `CNAME` to
     `cname.vercel-dns.com`.
3. Save the records at your registrar; Vercel issues a Let's Encrypt cert
   automatically once DNS propagates (usually < 10 minutes).

## 4. Wire up email collection

The sign-up form on the App page POSTs to whatever URL is set in
`VITE_SIGNUP_ENDPOINT`. The simplest end-to-end is **Formspree**:

1. Sign up at <https://formspree.io/>.
2. Create a new form. Copy its endpoint — it looks like
   `https://formspree.io/f/xxxxxxxx`.
3. In Vercel → **Settings → Environment Variables**:
   - Name: `VITE_SIGNUP_ENDPOINT`
   - Value: the Formspree URL
   - Apply to: **Production** (and Preview if you want).
4. Redeploy (Vercel rebuilds with the new env var).

Verify by submitting an email through the kiosk and checking the Formspree
inbox / your email. Replies/notifications go wherever you set them up in
Formspree.

### Other options for `VITE_SIGNUP_ENDPOINT`

Anything that accepts `POST` with `application/json` body
`{ "email": "...", "source": "specuflux-kiosk" }` works:

- **Mailchimp** — use Mailchimp's `/lists/{list_id}/members` endpoint via a
  small proxy (Mailchimp doesn't accept browser CORS directly).
- **ConvertKit** / **Beehiiv** / **Buttondown** — each has a public form
  endpoint that accepts a JSON body.
- **Custom Vercel function** — drop a file at `api/subscribe.js` that writes
  to a database, and point the env var at `/api/subscribe`.

## 5. Local development

```bash
cp .env.example .env.local
# edit .env.local: set VITE_SIGNUP_ENDPOINT to your Formspree URL
npm install
npm run dev
```

If `VITE_SIGNUP_ENDPOINT` is empty, the sign-up form silently closes the
sheet on submit — handy for design work without spamming the form provider.
