// Vercel Serverless Function — recibe el formulario de contacto y envía el
// email vía Resend (sin dependencias: fetch directo a la API de Resend).
//
// Variables de entorno necesarias en Vercel (Project → Settings → Environment Variables):
//   RESEND_API_KEY   → API key de resend.com
//   CONTACT_TO       → (opcional) destino; por defecto hola@branthia.com
//   CONTACT_FROM     → (opcional) remitente en el dominio verificado; por defecto
//                      "Branthia <hola@branthia.com>". Sirve cualquier dirección
//                      @branthia.com sin crear buzón (basta el dominio verificado).

const esc = (s) =>
  String(s == null ? "" : s).replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const { nombre, email, empresa, tipo, mensaje, consent, website } = body;

    // Honeypot: si el campo oculto viene relleno, es un bot → acepta en silencio.
    if (website) return res.status(200).json({ ok: true });

    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ error: "Faltan campos obligatorios." });
    }
    if (!consent) {
      return res.status(400).json({ error: "Falta el consentimiento." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return res.status(400).json({ error: "Email no válido." });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Servicio de email no configurado." });
    }

    const to = process.env.CONTACT_TO || "hola@branthia.com";
    const from = process.env.CONTACT_FROM || "Branthia <hola@branthia.com>";

    const html = `
      <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#0A0A0A">
        <h2 style="margin:0 0 16px">Nuevo contacto — Branthia</h2>
        <p><strong>Nombre:</strong> ${esc(nombre)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Empresa:</strong> ${esc(empresa) || "—"}</p>
        <p><strong>Tipo de proyecto:</strong> ${esc(tipo) || "—"}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="white-space:pre-wrap;border-left:3px solid #eee;padding-left:12px">${esc(mensaje)}</p>
      </div>`;

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: String(email),
        subject: `Contacto web — ${nombre}${empresa ? " · " + empresa : ""}`,
        html,
      }),
    });

    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      console.error("Resend error", r.status, detail);
      return res.status(502).json({ error: "No se pudo enviar el mensaje." });
    }

    // Autorespuesta al visitante (no bloqueante: si falla, la consulta ya se
    // ha entregado, así que no devolvemos error al usuario).
    try {
      const firstName = String(nombre).trim().split(/\s+/)[0];
      const autoHtml = `
        <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#0A0A0A;max-width:520px">
          <p style="font-size:22px;font-weight:700;letter-spacing:-0.02em;margin:0 0 16px">Gracias, ${esc(firstName)}.</p>
          <p style="margin:0 0 14px">Hemos recibido tu mensaje y te respondemos en <strong>24–48&nbsp;h</strong> laborables.</p>
          <p style="margin:0 0 14px">Si es urgente, puedes contestar directamente a este correo.</p>
          <p style="margin:24px 0 0;color:#6b6b6b">— Branthia · Consultora de IA &amp; estudio de producto</p>
        </div>`;

      const auto = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: [String(email)],
          reply_to: to,
          subject: "Hemos recibido tu mensaje — Branthia",
          html: autoHtml,
        }),
      });
      if (!auto.ok) {
        console.error("Resend autoreply error", auto.status, await auto.text().catch(() => ""));
      }
    } catch (e) {
      console.error("autoreply exception", e);
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("contact handler error", e);
    return res.status(500).json({ error: "Error inesperado." });
  }
}
