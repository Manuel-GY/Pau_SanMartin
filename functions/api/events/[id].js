export async function onRequestDelete(context) {
  const { request, env, params } = context;

  if (request.headers.get('x-admin-token') !== env.ADMIN_PIN) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  const found = await env.DB.prepare('SELECT * FROM events WHERE id = ?').bind(params.id).first();
  if (!found) {
    return Response.json({ error: 'Evento no encontrado' }, { status: 404 });
  }

  await env.DB.prepare('DELETE FROM events WHERE id = ?').bind(params.id).run();

  return Response.json({ ok: true, removed: found });
}
