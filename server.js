const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PIN = process.env.ADMIN_PIN || 'myriam2026';

const DATA_DIR = path.join(__dirname, 'data');
const EVENTS_FILE = path.join(DATA_DIR, 'events.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function readEvents() {
  try {
    const raw = fs.readFileSync(EVENTS_FILE, 'utf-8');
    const events = JSON.parse(raw);
    return Array.isArray(events) ? events : [];
  } catch (e) {
    return [];
  }
}

function writeEvents(events) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2));
}

function isAdmin(req) {
  return req.headers['x-admin-token'] === ADMIN_PIN;
}

function sanitize(event) {
  const allowed = ['title', 'date', 'time', 'city', 'venue', 'address', 'price', 'ticketUrl', 'description'];
  const clean = {};
  for (const key of allowed) {
    if (typeof event[key] === 'string') clean[key] = event[key].trim();
  }
  if (!clean.title || !clean.date || !clean.city || !clean.venue) return null;
  return clean;
}

app.get('/api/events', (req, res) => {
  const events = readEvents().sort((a, b) => new Date(a.date) - new Date(b.date));
  res.json(events);
});

app.post('/api/events', (req, res) => {
  if (!isAdmin(req)) return res.status(401).json({ error: 'No autorizado' });
  const clean = sanitize(req.body || {});
  if (!clean) return res.status(400).json({ error: 'Faltan datos: title, date, city y venue son obligatorios' });
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const newEvent = { id, ...clean };
  const events = readEvents();
  events.push(newEvent);
  writeEvents(events);
  res.status(201).json(newEvent);
});

app.delete('/api/events/:id', (req, res) => {
  if (!isAdmin(req)) return res.status(401).json({ error: 'No autorizado' });
  const events = readEvents();
  const index = events.findIndex((e) => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Evento no encontrado' });
  const removed = events.splice(index, 1)[0];
  writeEvents(events);
  res.json({ ok: true, removed });
});

app.post('/api/login', (req, res) => {
  if ((req.body || {}).pin === ADMIN_PIN) {
    res.json({ ok: true, token: ADMIN_PIN });
  } else {
    res.status(401).json({ error: 'PIN incorrecto' });
  }
});

app.listen(PORT, () => {
  console.log(`Pau San Martín demo corriendo en http://localhost:${PORT}`);
});
