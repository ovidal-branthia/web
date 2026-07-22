// Endpoint de contacto — se renderiza bajo demanda (función serverless en Vercel).
// Envía la notificación y la autorespuesta vía Resend, sin dependencias externas.
//
// Variables de entorno (Vercel → Settings → Environments → Production):
//   RESEND_API_KEY   → API key de resend.com  (obligatoria)
//   CONTACT_TO       → destino; por defecto hola@branthia.com
//   CONTACT_FROM     → remitente en el dominio verificado;
//                      por defecto "Branthia <hola@branthia.com>"
export const prerender = false;

const esc = (s) =>
  String(s == null ? '' : s).replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });

const env = (k) => import.meta.env?.[k] ?? process.env?.[k];

export async function POST({ request }) {
  try {
    const body = await request.json().catch(() => ({}));
    const { nombre, email, empresa, tipo, mensaje, consent, website } = body;

    // Honeypot: si el campo oculto viene relleno, es un bot → acepta en silencio.
    if (website) return json({ ok: true });

    if (!nombre || !email || !mensaje) return json({ error: 'Faltan campos obligatorios.' }, 400);
    if (!consent) return json({ error: 'Falta el consentimiento.' }, 400);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) return json({ error: 'Email no válido.' }, 400);

    const apiKey = env('RESEND_API_KEY');
    if (!apiKey) return json({ error: 'Servicio de email no configurado.' }, 500);

    const to = env('CONTACT_TO') || 'hola@branthia.com';
    const from = env('CONTACT_FROM') || 'Branthia <hola@branthia.com>';

    const html = `
      <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#0A0A0A">
        <h2 style="margin:0 0 16px">Nuevo contacto — Branthia</h2>
        <p><strong>Nombre:</strong> ${esc(nombre)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Empresa:</strong> ${esc(empresa) || '—'}</p>
        <p><strong>Tipo de proyecto:</strong> ${esc(tipo) || '—'}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="white-space:pre-wrap;border-left:3px solid #eee;padding-left:12px">${esc(mensaje)}</p>
      </div>`;

    const send = (payload) =>
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

    const r = await send({
      from,
      to: [to],
      reply_to: String(email),
      subject: `Contacto web — ${nombre}${empresa ? ' · ' + empresa : ''}`,
      html,
    });

    if (!r.ok) {
      console.error('Resend error', r.status, await r.text().catch(() => ''));
      return json({ error: 'No se pudo enviar el mensaje.' }, 502);
    }

    // Autorespuesta al visitante (no bloqueante: la consulta ya se ha entregado).
    try {
      const firstName = String(nombre).trim().split(/\s+/)[0];
      const auto = await send({
        from,
        to: [String(email)],
        reply_to: to,
        subject: 'Hemos recibido tu mensaje — Branthia',
        html: `
          <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#0A0A0A;max-width:520px">
            <p style="font-size:22px;font-weight:700;letter-spacing:-0.02em;margin:0 0 16px">Gracias, ${esc(firstName)}.</p>
            <p style="margin:0 0 14px">Hemos recibido tu mensaje y te respondemos en <strong>24–48&nbsp;h</strong> laborables.</p>
            <p style="margin:0 0 14px">Si es urgente, puedes contestar directamente a este correo.</p>
            <p style="margin:24px 0 0;color:#6b6b6b">— Branthia · Consultora de IA &amp; estudio de producto</p>
          </div>`,
      });
      if (!auto.ok) console.error('Resend autoreply error', auto.status, await auto.text().catch(() => ''));
    } catch (e) {
      console.error('autoreply exception', e);
    }

    return json({ ok: true });
  } catch (e) {
    console.error('contact handler error', e);
    return json({ error: 'Error inesperado.' }, 500);
  }
}
