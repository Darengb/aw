#!/usr/bin/env node
// One-shot image compression via Tinify API.
// Usage: TINIFY_KEY=... node scripts/compress-images.mjs
// Compresses in-place. Originals are recoverable via git.

import { readFile, writeFile, stat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const KEY = process.env.TINIFY_KEY;
if (!KEY) {
  console.error('Missing TINIFY_KEY env var');
  process.exit(1);
}

const AUTH = 'Basic ' + Buffer.from(`api:${KEY}`).toString('base64');

const FILES = [
  'public/images/aw-logo-simple.png',
  'public/images/business-career-and-placement.jpg',
  'public/images/DR.LEE-BOWES.jpg',
  'public/images/PETER-COVE.jpg',
  'public/images/hero-bg-poster.jpg',
  'public/images/jobseekers-poster.jpg',
  'public/images/young-professional-working.jpg',
  'public/images/photoshoot/DSC2745.jpg',
  'public/images/photoshoot/DSC2753.jpg',
  'public/images/photoshoot/DSC2829.jpg',
  'public/images/photoshoot/DSC3109.jpg',
  'public/images/photoshoot/DSC3513.jpg',
  'public/images/photoshoot/DSC3556.jpg',
  'public/images/photoshoot/DSC3998.jpg',
  'public/images/photoshoot/DSC4238.jpg',
  'public/images/photoshoot/DSC4287.jpg',
  'public/images/photoshoot/DSC4334.jpg',
  'public/images/photoshoot/_DSC4145.jpg',
  'public/images/photoshoot/_DSC4442.jpg',
  'public/images/photoshoot/_DSC4490.jpg',
];

const fmt = (bytes) => {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)}MB`;
};

async function compressOne(relPath) {
  const abs = resolve(ROOT, relPath);
  const before = (await stat(abs)).size;
  const body = await readFile(abs);

  const shrinkRes = await fetch('https://api.tinify.com/shrink', {
    method: 'POST',
    headers: { Authorization: AUTH },
    body,
  });

  if (!shrinkRes.ok) {
    const text = await shrinkRes.text();
    throw new Error(`shrink ${shrinkRes.status}: ${text}`);
  }

  const location = shrinkRes.headers.get('location');
  const count = shrinkRes.headers.get('compression-count');
  if (!location) throw new Error('no Location header in shrink response');

  const outRes = await fetch(location, { headers: { Authorization: AUTH } });
  if (!outRes.ok) {
    const text = await outRes.text();
    throw new Error(`output ${outRes.status}: ${text}`);
  }

  const buf = Buffer.from(await outRes.arrayBuffer());
  await writeFile(abs, buf);
  const after = buf.length;
  const pct = ((1 - after / before) * 100).toFixed(1);
  return { before, after, pct, count };
}

let totalBefore = 0;
let totalAfter = 0;
let finalCount = null;
const failures = [];

for (const rel of FILES) {
  process.stdout.write(`${rel} ... `);
  try {
    const { before, after, pct, count } = await compressOne(rel);
    totalBefore += before;
    totalAfter += after;
    finalCount = count ?? finalCount;
    console.log(`${fmt(before)} -> ${fmt(after)} (-${pct}%)  [count: ${count ?? '?'}]`);
  } catch (err) {
    console.log(`FAILED: ${err.message}`);
    failures.push({ rel, err: err.message });
  }
}

console.log('---');
console.log(`Total: ${fmt(totalBefore)} -> ${fmt(totalAfter)}  (-${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`);
console.log(`Monthly compression count: ${finalCount ?? 'unknown'}`);
if (failures.length) {
  console.log(`Failures (${failures.length}):`);
  for (const f of failures) console.log(`  ${f.rel}: ${f.err}`);
  process.exit(1);
}
