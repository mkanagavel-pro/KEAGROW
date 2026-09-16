<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/4bd15484-6b85-4d92-a48b-fd1a23ac0638

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

---

## Admin panel — projects & inquiries (V3, MongoDB Atlas)

This project ships with a small Express backend, backed by **MongoDB
Atlas**, so projects and contact-form inquiries ("orders") can be
managed without touching code — and the data survives restarts,
redeploys, everything.

### 1. Create a MongoDB Atlas database (free tier is enough)

1. Sign up / log in at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free **M0** cluster.
3. **Database Access** → add a database user (username + password).
4. **Network Access** → add an IP address. For local dev, "Add My
   Current IP" is enough. For a cloud deploy (Render/Railway/etc.),
   add `0.0.0.0/0` (allow from anywhere) since those hosts don't have
   a fixed IP — the connection is still protected by your DB
   username/password.
5. **Database → Connect → Drivers** → copy the connection string. It
   looks like:
   `mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority`

### 2. Configure the project

```bash
npm install
cp .env.example .env
```

Edit `.env`:

```
MONGODB_URI="mongodb+srv://yourUser:yourPassword@cluster0.xxxxx.mongodb.net/keagrow?retryWrites=true&w=majority"
ADMIN_PASSWORD="something only you know"
ADMIN_TOKEN_SECRET="a long random string"
```

(Note the `/keagrow` before the `?` — that's the database name; add it
if your copied string doesn't already have one.)

### 3. Seed the existing projects

Run this **once**, after `MONGODB_URI` is set:

```bash
npm run seed
```

This loads Royal Snacks, Namma Ooru Workers, and the showcase
placeholders from `server/data/projects.json` into Atlas. It's safe
to re-run later — it skips anything already in the database instead
of duplicating it.

### 4. Run it locally

Two terminals:

```bash
# Terminal 1 — backend (API + MongoDB)
npm run server

# Terminal 2 — frontend (Vite dev server)
npm run dev
```

Then open:

- Main site: the URL Vite prints (e.g. `http://localhost:3000`)
- Admin panel: `http://localhost:3000/admin`

The Vite dev server proxies `/api/*` requests to the backend on port
`4000`, so both need to be running at the same time.

Without a `.env` file, the server falls back to a default admin
password (`keagrow-admin`) and prints a warning — fine for a first
test, **not for going live**. It will refuse to start at all without
`MONGODB_URI` set.

### What the admin panel does

- **Projects tab** — add, edit, and delete portfolio projects (title,
  category, description, live URL, technologies, status badge). The
  public "Selected Work" section fetches from this same data, so
  changes show up on the live site immediately.
- **Inquiries tab** — every contact-form submission is saved here in
  real time, newest first. Mark as read/unread, or delete.

### 5. Deploying

This needs a Node process running (not just static file hosting),
because the admin panel and contact form both talk to `server/index.js`.

```bash
npm run build      # builds the frontend into dist/
npm start          # serves the built frontend AND the API on one port
```

Point your host (Render, Railway, a VPS, etc.) at `npm start`, and set
these environment variables there:

- `MONGODB_URI`
- `ADMIN_PASSWORD`
- `ADMIN_TOKEN_SECRET`
- `PORT` (many hosts set this automatically — check their docs)

Run `npm run seed` once against the **same** `MONGODB_URI` you deploy
with (either locally before deploying, or as a one-off command on the
host) so the live database starts with the existing projects instead
of empty.

If you ever deploy the frontend separately as a static site instead,
you'll need a rewrite rule sending unknown paths (including `/admin`)
to `index.html`, and the backend reachable at `/api/*` from that same
domain.

### Email confirmations ("Confirm & Email")

In the admin → Inquiries tab, each inquiry has a **Confirm & Email**
button. Clicking it sends the customer a confirmation email and marks
the inquiry as confirmed.

To enable it, add to `.env`:

```
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="youraddress@gmail.com"
SMTP_PASS="your-16-char-app-password"
```

**Using Gmail:** you can't use your normal Gmail password here — Gmail
blocks that for outside apps. Instead:

1. Turn on 2-Step Verification on the Google account (Google Account →
   Security).
2. Google Account → Security → **App Passwords** → create one for
   "Mail" → copy the 16-character password it gives you.
3. Use that as `SMTP_PASS`, and the Gmail address as `SMTP_USER`.

Any other SMTP provider (Zoho Mail, Outlook, a transactional email
service, etc.) works the same way — just change `SMTP_HOST`/`SMTP_PORT`
and use that provider's credentials.

Restart `npm run server` after editing `.env`. Without SMTP configured,
clicking "Confirm & Email" shows a clear error instead of silently
failing — everything else in the admin panel keeps working.
