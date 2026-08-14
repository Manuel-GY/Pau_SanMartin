import { sanitizeEvent, EVENT_FIELDS } from './_utils.js';

export async function onRequestGet(context) {
  const { env } = context;
  const { results } = await env.DB.prepare('SELECT * FROM events ORDER BY date ASC').all();
  return Response.json(results);
}

export async function onRequestPost(context) {
  const { request, env } = context;

  if (request.headers.get('x-admin-token') !== env.ADMIN_PIN) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const clean = sanitizeEvent(body);
  if (!clean) {
    return Response.json(
      { error: 'Faltan datos: title, date, city y venue son obligatorios' },
      { status: 400 }
    );
  }

  const id = crypto.randomUUID();
  const values = EVENT_FIELDS.map((f) => (f === 'id' ? id : clean[f] ?? null));

  await env.DB.prepare(
    `INSERT INTO events (id, title, date, time, city, venue, address, price, ticketUrl, poster, description)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(...values)
    .run();

  const event = { id, ...clean };
  return Response.json(event, { status: 201 });
}
