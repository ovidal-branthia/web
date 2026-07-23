import { useState, useEffect } from "react";

// Banner de consentimiento + Google Consent Mode v2.
//
// Los valores por defecto (todo denegado) se fijan en Base.astro ANTES de que
// cargue GTM. Este componente solo recoge la elección, la persiste y emite el
// `consent update`. Vive fuera de los <div> raíz de la app, así que no hereda
// las variables CSS: usa los colores del sistema directamente.

const STORE = "branthia.consent.v1";

const T = {
  bg: "#F1ECE2",
  fg: "#0A0A0A",
  muted: "rgba(10,10,10,0.55)",
  line: "rgba(10,10,10,0.18)",
  chip: "rgba(10,10,10,0.05)",
};
const DISPLAY = `"Satoshi", "Inter", system-ui, sans-serif`;
const MONO = `"JetBrains Mono", ui-monospace, monospace`;

const CATS = [
  {
    key: "necesarias",
    nombre: "Necesarias",
    fija: true,
    desc: "Imprescindibles para servir la web, recordar tu elección sobre cookies y mantener la seguridad. No se pueden desactivar.",
  },
  {
    key: "analytics",
    nombre: "Analíticas",
    desc: "Nos permiten medir de forma agregada cómo se usa la web para mejorarla. No se activan sin tu permiso.",
  },
  {
    key: "marketing",
    nombre: "Marketing",
    desc: "Permiten medir campañas y mostrar contenido publicitario relevante. No se activan sin tu permiso.",
  },
];

function applyConsent({ analytics, marketing }) {
  const a = analytics ? "granted" : "denied";
  const m = marketing ? "granted" : "denied";
  window.dataLayer = window.dataLayer || [];
  const gtag = function () { window.dataLayer.push(arguments); };
  gtag("consent", "update", {
    analytics_storage: a,
    ad_storage: m,
    ad_user_data: m,
    ad_personalization: m,
    personalization_storage: m,
  });
  window.dataLayer.push({
    event: "branthia_consent_update",
    consent_analytics: analytics,
    consent_marketing: marketing,
  });
}

function save(choice) {
  try {
    localStorage.setItem(STORE, JSON.stringify({ ...choice, version: 1, ts: Date.now() }));
  } catch (e) { /* almacenamiento no disponible: la elección solo dura esta sesión */ }
  applyConsent(choice);
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);      // banner visible
  const [config, setConfig] = useState(false);  // panel de configuración
  const [sel, setSel] = useState({ analytics: false, marketing: false });
  const [w, setW] = useState(1280);

  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);

    let stored = null;
    try { stored = JSON.parse(localStorage.getItem(STORE)); } catch (e) {}
    if (stored) setSel({ analytics: !!stored.analytics, marketing: !!stored.marketing });
    else setOpen(true); // sin elección previa → pedir consentimiento

    // Mecanismo para volver a abrir la elección (enlace del pie).
    const reopen = () => { setConfig(true); setOpen(true); };
    window.__branthiaOpenCookies = reopen;
    window.addEventListener("branthia:open-cookies", reopen);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("branthia:open-cookies", reopen);
    };
  }, []);

  if (!open) return null;

  const sm = w < 640;
  const decide = (choice) => { save(choice); setSel(choice); setOpen(false); setConfig(false); };

  const btn = (variant) => ({
    fontFamily: DISPLAY, fontSize: 14, fontWeight: 600,
    padding: sm ? "13px 18px" : "11px 20px",
    borderRadius: 999, cursor: "pointer",
    width: sm ? "100%" : "auto",
    border: `1px solid ${T.fg}`,
    background: variant === "solid" ? T.fg : "transparent",
    color: variant === "solid" ? T.bg : T.fg,
    transition: "opacity .18s",
  });

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Preferencias de cookies"
      style={{
        position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 200,
        background: T.bg, borderTop: `1px solid ${T.line}`,
        boxShadow: "0 -14px 40px rgba(10,10,10,0.07)",
        padding: sm ? "20px 20px 22px" : "26px 28px",
        maxHeight: "85vh", overflowY: "auto",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{
          fontFamily: MONO, fontSize: 11, letterSpacing: "0.04em",
          textTransform: "uppercase", color: T.muted, marginBottom: 10,
        }}>
          Cookies
        </div>

        <div style={{
          display: "flex", gap: sm ? 18 : 40,
          flexDirection: sm ? "column" : "row",
          alignItems: sm ? "stretch" : "flex-end",
          justifyContent: "space-between",
        }}>
          <p style={{
            margin: 0, fontFamily: DISPLAY, fontSize: sm ? 15 : 16,
            lineHeight: 1.55, color: T.fg, maxWidth: 640,
          }}>
            Usamos cookies necesarias para que la web funcione. Las analíticas y de marketing
            solo se activan si nos das permiso.{" "}
            <a href="/cookies" style={{ color: T.fg }}>Política de cookies</a>{" · "}
            <a href="/privacidad" style={{ color: T.fg }}>Privacidad</a>.
          </p>

          <div style={{
            display: "flex", gap: 10, flexShrink: 0,
            flexDirection: sm ? "column" : "row", alignItems: "center",
          }}>
            <button type="button" style={btn("ghost")}
              onClick={() => decide({ analytics: false, marketing: false })}>
              Rechazar
            </button>
            <button type="button" style={{ ...btn("ghost"), borderColor: T.line }}
              onClick={() => setConfig((c) => !c)}
              aria-expanded={config}>
              {config ? "Ocultar opciones" : "Configurar"}
            </button>
            <button type="button" style={btn("solid")}
              onClick={() => decide({ analytics: true, marketing: true })}>
              Aceptar
            </button>
          </div>
        </div>

        {config && (
          <div style={{ marginTop: 24, borderTop: `1px solid ${T.line}`, paddingTop: 20 }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: sm ? "1fr" : "repeat(3, 1fr)",
              gap: sm ? 16 : 28,
            }}>
              {CATS.map((c) => {
                const on = c.fija ? true : sel[c.key];
                return (
                  <div key={c.key} style={{ background: T.chip, padding: 16, borderRadius: 4 }}>
                    <label style={{
                      display: "flex", alignItems: "center", gap: 10,
                      cursor: c.fija ? "default" : "pointer",
                      fontFamily: DISPLAY, fontWeight: 700, fontSize: 15, color: T.fg,
                    }}>
                      <input
                        type="checkbox"
                        checked={on}
                        disabled={c.fija}
                        onChange={(e) => setSel((s) => ({ ...s, [c.key]: e.target.checked }))}
                        style={{ width: 16, height: 16, accentColor: T.fg, flexShrink: 0 }}
                      />
                      {c.nombre}
                      {c.fija && (
                        <span style={{
                          fontFamily: MONO, fontSize: 10, textTransform: "uppercase",
                          letterSpacing: "0.04em", color: T.muted, fontWeight: 400,
                        }}>
                          siempre
                        </span>
                      )}
                    </label>
                    <p style={{ margin: "8px 0 0", fontSize: 13, lineHeight: 1.5, color: T.muted }}>
                      {c.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 18, display: "flex", justifyContent: sm ? "stretch" : "flex-end" }}>
              <button type="button" style={btn("solid")}
                onClick={() => decide({ analytics: !!sel.analytics, marketing: !!sel.marketing })}>
                Guardar selección
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
