export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await request.json().catch(() => ({}));

  if (body.pin === env.ADMIN_PIN) {
    return Response.json({ ok: true, token: env.ADMIN_PIN });
  }
  return Response.json({ error: 'PIN incorrecto' }, { status: 401 });
}
