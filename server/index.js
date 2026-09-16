// KEAGROW backend.
//
// Storage: MongoDB Atlas via Mongoose (see server/db.js and
// server/models/). Run `npm run seed` once after connecting a fresh
// database to load the original project list in server/data/projects.json.
//
// Auth: a single shared admin password (ADMIN_PASSWORD in .env).
// Successful login returns a signed, expiring token (HMAC over an
// expiry timestamp — no session store, no JWT library needed).
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import { Project } from './models/Project.js';
import { Inquiry } from './models/Inquiry.js';
import { sendInquiryConfirmationEmail } from './mailer.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, '..', 'dist');

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'keagrow-admin';
const TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || 'change-this-secret-in-.env';
const TOKEN_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours
const PORT = process.env.PORT || 4000;

if (ADMIN_PASSWORD === 'keagrow-admin' || TOKEN_SECRET === 'change-this-secret-in-.env') {
  console.warn(
    '[keagrow] Using default admin credentials. Set ADMIN_PASSWORD and ADMIN_TOKEN_SECRET in your .env before going live.'
  );
}

const app = express();
app.use(express.json());

// ---------------------------------------------------------------------
// admin auth — signed token, no extra dependencies
// ---------------------------------------------------------------------
function issueToken() {
  const expires = String(Date.now() + TOKEN_TTL_MS);
  const signature = crypto.createHmac('sha256', TOKEN_SECRET).update(expires).digest('hex');
  return Buffer.from(`${expires}.${signature}`).toString('base64url');
}

function verifyToken(token) {
  try {
    const [expires, signature] = Buffer.from(token, 'base64url').toString('utf-8').split('.');
    const expected = crypto.createHmac('sha256', TOKEN_SECRET).update(expires).digest('hex');
    const sigMatches = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
    return sigMatches && Number(expires) > Date.now();
  } catch {
    return false;
  }
}

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!verifyToken(token)) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// ---------------------------------------------------------------------
// routes
// ---------------------------------------------------------------------
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body || {};
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Incorrect password' });
  }
  res.json({ token: issueToken() });
});

// Projects — public read, admin write
app.get('/api/projects', async (_req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

app.post('/api/projects', requireAdmin, async (req, res) => {
  const project = new Project({ ...req.body, _id: req.body.id || crypto.randomUUID() });
  await project.save();
  res.status(201).json(project);
});

app.put('/api/projects/:id', requireAdmin, async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

app.delete('/api/projects/:id', requireAdmin, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

// Inquiries ("orders") — public create, admin read/manage
app.post('/api/inquiries', async (req, res) => {
  const inquiry = new Inquiry({
    name: req.body.name || '',
    company: req.body.company || '',
    email: req.body.email || '',
    phone: req.body.phone || '',
    projectType: req.body.projectType || '',
    message: req.body.message || '',
  });
  await inquiry.save();
  res.status(201).json(inquiry);
});

app.get('/api/inquiries', requireAdmin, async (_req, res) => {
  const inquiries = await Inquiry.find().sort({ receivedAt: -1 });
  res.json(inquiries);
});

app.patch('/api/inquiries/:id', requireAdmin, async (req, res) => {
  const updated = await Inquiry.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

// Sends a confirmation email to the customer and marks the inquiry
// as confirmed + read. Fails loudly with a clear message if SMTP
// isn't configured yet, instead of silently pretending it worked.
app.post('/api/inquiries/:id/confirm', requireAdmin, async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);
  if (!inquiry) return res.status(404).json({ error: 'Not found' });

  try {
    await sendInquiryConfirmationEmail(inquiry);
  } catch (err) {
    return res.status(502).json({ error: err.message });
  }

  inquiry.confirmed = true;
  inquiry.confirmedAt = new Date();
  inquiry.read = true;
  await inquiry.save();
  res.json(inquiry);
});

app.delete('/api/inquiries/:id', requireAdmin, async (req, res) => {
  await Inquiry.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

// ---------------------------------------------------------------------
// serve the built frontend (production) — run `npm run build` first
// ---------------------------------------------------------------------
app.use(express.static(DIST_DIR));
app.get(/^(?!\/api\/).*/, (_req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'), (err) => {
    if (err) res.status(404).send('Run "npm run build" first, then restart the server.');
  });
});

try {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`KEAGROW server running on http://localhost:${PORT}`);
  });
} catch (err) {
  console.error('[keagrow] Failed to start:', err.message);
  process.exit(1);
}
