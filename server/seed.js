// Run once after connecting a fresh database: `npm run seed`
// Loads the original KEAGROW project list (Royal Snacks, Namma Ooru
// Workers, and the showcase placeholders) into MongoDB so the site
// isn't empty on first deploy. Safe to re-run — existing projects
// (matched by id) are skipped, never overwritten.
import dotenv from 'dotenv';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';
import { connectDB } from './db.js';
import { Project } from './models/Project.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function seed() {
  await connectDB();

  const raw = await readFile(path.join(__dirname, 'data', 'projects.json'), 'utf-8');
  const seedProjects = JSON.parse(raw);

  let created = 0;
  let skipped = 0;

  for (const p of seedProjects) {
    const exists = await Project.findById(p.id);
    if (exists) {
      skipped += 1;
      continue;
    }
    await Project.create({ ...p, _id: p.id });
    created += 1;
  }

  console.log(`[keagrow] Seed complete — ${created} project(s) added, ${skipped} already existed.`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('[keagrow] Seed failed:', err.message);
  process.exit(1);
});
