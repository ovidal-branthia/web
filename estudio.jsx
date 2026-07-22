/* global React, ReactDOM */
// Página "El estudio" — la experiencia detrás de Branthia, reencuadrada en voz
// de estudio (no un spotlight personal). Reutiliza logo.jsx (window.BranthiaLogo).

const T = {
  bg: "#F1ECE2", fg: "#0A0A0A",
  muted: "rgba(10,10,10,0.55)", line: "rgba(10,10,10,0.18)", chip: "rgba(10,10,10,0.06)",
  accent: "#0A0A0A", display: `"Satoshi", "Inter", system-ui, sans-serif`,
};

const Mono = ({ children, style }) => (
  <span style={{
    fontFamily: '"JetBrains Mono", ui-monospace, monospace', letterSpacing: "0.04em",
    fontSize: 11, textTransform: "uppercase", ...style,
  }}>{children}</span>
);

function useW() {
  const [w, setW] = React.useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  React.useEffect(() => {
    const on = () => setW(window.innerWidth);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return w;
}
const BP = { sm: 640, md: 1024 };

const NAV = [
  ["Servicios", "Home.html#territorios"],
  ["IA", "Home.html#ia"],
  ["Estudio", "Estudio.html"],
  ["Soluciones", "Home.html#hub"],
  ["Clientes", "Home.html#clientes"],
  ["Manifesto", "Home.html#manifesto"],
  ["Contacto", "Home.html#contacto"],
];

const TRAYECTORIA = [
  ["Oracle", "7+ años · CRM Practice Manager · Delivery Head Iberia"],
  ["Accenture", "CRM & ERP System Integration Manager"],
  ["Xygeni · WITRAC · Perspectiv AI", "Dirección en ciberseguridad, IoT, computer vision e IA"],
  ["Rehset · Myopia", "Fundó su consultora de transformación digital y su estudio de marca"],
];

const STATS = [
  ["Años en tecnología, producto y marketing", "25+"],
  ["Enseñando IA aplicada al marketing", "10+"],
  ["Formación", "MIT · IESE · ESERP"],
];

function Nav() {
  const w = useW();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const mobile = w < BP.md;
  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: mobile ? "18px 20px" : "22px 28px", color: "var(--fg)",
        background: "var(--bg)",
      }}>
        <a href="Home.html" aria-label="Branthia — inicio" style={{ color: "inherit", display: "flex", alignItems: "center" }}>
          <window.BranthiaLogo height={24} />
        </a>
        {!mobile && (
          <nav style={{ display: "flex", gap: 28 }}>
            {NAV.map(([l, h]) => (
              <a key={l} href={h} style={{ color: "inherit", textDecoration: "none", fontSize: 14, fontWeight: 500, opacity: l === "Estudio" ? 1 : 0.78 }}>{l}</a>
            ))}
          </nav>
        )}
        {mobile ? (
          <button onClick={() => setMenuOpen(true)} aria-label="Abrir menú" style={{ appearance: "none", border: "none", background: "transparent", color: "inherit", display: "flex", flexDirection: "column", gap: 5, padding: 6, cursor: "pointer" }}>
            <span style={{ width: 24, height: 2, background: "currentColor", display: "block" }} />
            <span style={{ width: 24, height: 2, background: "currentColor", display: "block" }} />
          </button>
        ) : (
          <a href="Home.html#contacto" style={{ color: "var(--bg)", background: "var(--fg)", textDecoration: "none", padding: "10px 18px", borderRadius: 999, fontSize: 14, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 10 }}>
            Empezar<span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--accent)" }} />
          </a>
        )}
      </header>

      {mobile && menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "var(--bg)", color: "var(--fg)", display: "flex", flexDirection: "column", padding: "18px 20px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <window.BranthiaLogo height={24} />
            <button onClick={() => setMenuOpen(false)} aria-label="Cerrar menú" style={{ appearance: "none", border: "none", background: "transparent", color: "inherit", fontSize: 26, lineHeight: 1, cursor: "pointer", padding: 6 }}>✕</button>
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: 2, margin: "auto 0" }}>
            {NAV.map(([l, h]) => (
              <a key={l} href={h} onClick={() => setMenuOpen(false)} style={{ color: "inherit", textDecoration: "none", fontFamily: "var(--display)", fontWeight: 800, fontSize: "clamp(32px, 8.5vw, 52px)", letterSpacing: "-0.03em", lineHeight: 1.12, padding: "6px 0" }}>{l}<span style={{ color: "var(--accent)" }}>.</span></a>
            ))}
          </nav>
          <a href="Home.html#contacto" onClick={() => setMenuOpen(false)} style={{ color: "var(--bg)", background: "var(--fg)", textDecoration: "none", padding: "16px 22px", borderRadius: 999, fontSize: 16, fontWeight: 600, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            Empezar<span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--accent)" }} />
          </a>
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "60px 28px 28px", borderTop: "1px solid var(--line)" }}>
      <window.BranthiaLogo title="Branthia" height="auto" style={{ width: "40%", height: "auto", color: "var(--fg)" }} />
      <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, fontSize: 13, color: "var(--muted)" }}>
        <div>© MMXXVI Branthia Origin, S.L. — Vilanova i la Geltrú · ES</div>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="Home.html" style={{ color: "var(--muted)", textDecoration: "none" }}>Inicio</a>
          <a href="#" style={{ color: "var(--muted)", textDecoration: "none" }}>LinkedIn</a>
          <a href="Privacidad.html" style={{ color: "var(--muted)", textDecoration: "none" }}>Privacidad</a>
          <a href="Cookies.html" style={{ color: "var(--muted)", textDecoration: "none" }}>Cookies</a>
          <a href="Legal.html" style={{ color: "var(--muted)", textDecoration: "none" }}>Aviso legal</a>
        </div>
      </div>
    </footer>
  );
}

function Estudio() {
  const w = useW();
  return (
    <div style={{
      "--bg": T.bg, "--fg": T.fg, "--muted": T.muted, "--line": T.line,
      "--chip": T.chip, "--accent": T.accent, "--display": T.display,
      background: T.bg, color: T.fg, minHeight: "100vh", fontFamily: T.display,
    }}>
      <Nav />

      {/* Intro */}
      <section style={{ padding: "170px 28px 60px" }}>
        <Mono style={{ color: "var(--muted)" }}>El estudio</Mono>
        <h1 style={{
          fontFamily: "var(--display)", fontWeight: 900,
          fontSize: "clamp(44px, 8vw, 132px)", lineHeight: 0.9,
          letterSpacing: "-0.045em", margin: "16px 0 0", maxWidth: "15ch",
        }}>
          Un estudio pequeño, con 25 años dentro<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p style={{
          fontSize: "clamp(17px, 1.8vw, 22px)", lineHeight: 1.5, maxWidth: 640,
          marginTop: 28, color: "var(--muted)",
        }}>
          Branthia no es una agencia grande ni una consultora de mil personas. Es un estudio que concentra dos décadas y media construyendo producto, marca e inteligencia artificial — y que trabaja despacio, con criterio, para que dure.
        </p>
      </section>

      {/* Experiencia */}
      <section style={{ padding: "60px 28px 40px", borderTop: "1px solid var(--line)" }}>
        <div style={{ display: "grid", gridTemplateColumns: w < BP.md ? "1fr" : "120px 1fr 1fr", gap: w < BP.md ? 24 : 32, alignItems: "start" }}>
          <Mono style={{ color: "var(--muted)" }}>Dirección</Mono>
          <div>
            <Mono style={{ color: "var(--muted)" }}>Dirigido por</Mono>
            <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: "clamp(26px, 2.6vw, 40px)", letterSpacing: "-0.03em", lineHeight: 1, marginTop: 8 }}>
              Oshcar Vidal<span style={{ color: "var(--accent)" }}>.</span>
            </div>
            <Mono style={{ color: "var(--muted)", marginTop: 10, display: "inline-block" }}>Estrategia · Producto · IA · Marketing</Mono>
            <p style={{ fontSize: 17, lineHeight: 1.5, marginTop: 18, maxWidth: 460 }}>
              25 años en la intersección de tecnología, producto digital, marketing B2B e inteligencia artificial — en grandes compañías y en sus propias startups.
            </p>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 14, color: "var(--fg)", textDecoration: "none", borderBottom: "1px solid var(--line)", paddingBottom: 3, fontSize: 14, fontWeight: 600 }}>
              LinkedIn <span style={{ color: "var(--muted)" }}>↗</span>
            </a>
          </div>
          <div>
            {TRAYECTORIA.map(([k, v], i) => (
              <div key={k} style={{
                padding: "16px 0",
                borderTop: "1px solid var(--line)",
                borderBottom: i === TRAYECTORIA.length - 1 ? "1px solid var(--line)" : "none",
              }}>
                <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>{k}</div>
                <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 3 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: w < BP.sm ? "1fr" : "120px 1fr", gap: w < BP.sm ? 12 : 32, borderTop: "1px solid var(--line)", paddingTop: 28 }}>
          <Mono style={{ color: "var(--muted)" }}>El modelo</Mono>
          <p style={{ fontSize: 17, lineHeight: 1.5, margin: 0, maxWidth: 620 }}>
            Quien dirige, ejecuta: de principio a fin, sin handoffs ni juniors. Cuando un proyecto pide una especialidad concreta, se suma un especialista de confianza — que refuerza el equipo, no lo sustituye.
          </p>
        </div>

        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: w < BP.sm ? "1fr" : "repeat(3, 1fr)", borderTop: "1px solid var(--line)" }}>
          {STATS.map(([k, v], i) => (
            <div key={k} style={{ padding: "28px 24px", borderRight: i < 2 ? "1px solid var(--line)" : "none" }}>
              <Mono style={{ color: "var(--muted)" }}>{k}</Mono>
              <div style={{
                marginTop: 10, fontFamily: "var(--display)", fontWeight: 800,
                fontSize: "clamp(26px, 2.4vw, 40px)", letterSpacing: "-0.03em", lineHeight: 1.05,
              }}>{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Ponente */}
      <section style={{ padding: "48px 28px 48px", borderTop: "1px solid var(--line)" }}>
        <div style={{ display: "grid", gridTemplateColumns: w < BP.sm ? "1fr" : "120px 1fr", gap: w < BP.sm ? 14 : 32, alignItems: "baseline" }}>
          <Mono style={{ color: "var(--muted)" }}>Ponente en</Mono>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 28px", alignItems: "baseline" }}>
            {["Naturgy", "BBVA", "AXA", "IESE", "Oracle", "BNEW"].map((n) => (
              <span key={n} style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "clamp(20px, 2.2vw, 32px)", letterSpacing: "-0.02em" }}>{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 28px 120px", borderTop: "1px solid var(--line)" }}>
        <h2 style={{
          fontFamily: "var(--display)", fontWeight: 900,
          fontSize: "clamp(48px, 9vw, 150px)", lineHeight: 0.86,
          letterSpacing: "-0.05em", margin: 0,
        }}>
          ¿Hablamos<span style={{ color: "var(--accent)" }}>?</span>
        </h2>
        <a href="Home.html#contacto" style={{
          display: "inline-flex", alignItems: "center", gap: 10, marginTop: 32,
          color: "var(--bg)", background: "var(--fg)", textDecoration: "none",
          padding: "14px 22px", borderRadius: 999, fontSize: 15, fontWeight: 600,
        }}>
          Empezar<span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--accent)" }} />
        </a>
      </section>

      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Estudio />);
