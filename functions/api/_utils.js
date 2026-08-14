const ALLOWED = ['title', 'date', 'time', 'city', 'venue', 'address', 'price', 'ticketUrl', 'poster', 'description'];

export function sanitizeEvent(event) {
  const clean = {};
  for (const key of ALLOWED) {
    if (typeof event[key] === 'string') clean[key] = event[key].trim();
  }
  if (!clean.title || !clean.date || !clean.city || !clean.venue) return null;
  return clean;
}

export const EVENT_FIELDS = ['id', 'title', 'date', 'time', 'city', 'venue', 'address', 'price', 'ticketUrl', 'poster', 'description'];
