import { useState, useEffect } from "react";
import { BranthiaLogo } from "./Logo.jsx";
import { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle } from "./Tweaks.jsx";

// ---------------------------------------------------------------------------
// Tweakable defaults
// ---------------------------------------------------------------------------
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "paper",
  "accent": "ink",
  "marquee": true,
  "heroMode": "wordmark",
  "iaThread": "rotador",
  "density": "editorial",
  "displayFont": "satoshi"
}/*EDITMODE-END*/;

// ---------------------------------------------------------------------------
// Tokens
// ---------------------------------------------------------------------------
const THEMES = {
  paper: { bg: "#F1ECE2", fg: "#0A0A0A", muted: "rgba(10,10,10,0.55)", line: "rgba(10,10,10,0.18)", chip: "rgba(10,10,10,0.06)" },
  ink:   { bg: "#0A0A0A", fg: "#F1ECE2", muted: "rgba(241,236,226,0.55)", line: "rgba(241,236,226,0.22)", chip: "rgba(241,236,226,0.08)" },
  bone:  { bg: "#FAFAF7", fg: "#0A0A0A", muted: "rgba(10,10,10,0.52)", line: "rgba(10,10,10,0.14)", chip: "rgba(10,10,10,0.05)" },
};

const ACCENTS = {
  ink:    { c: "#0A0A0A", label: "Ink" },
  acid:   { c: "#D6FF3D", label: "Acid" },
  signal: { c: "#FF4A1C", label: "Signal" },
  cobalt: { c: "#2B4BFF", label: "Cobalt" },
};

const FONT_STACKS = {
  satoshi: `"Satoshi", "Inter", system-ui, sans-serif`,
  general: `"General Sans", "Satoshi", system-ui, sans-serif`,
};

// ---------------------------------------------------------------------------
// Small primitives
// ---------------------------------------------------------------------------
const Mono = ({ children, style }) => (
  <span style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace', fontFeatureSettings: '"ss01"', letterSpacing: "0.04em", fontSize: 11, textTransform: "uppercase", ...style }}>{children}</span>
);

const Rule = ({ style }) => (
  <div style={{ height: 1, background: "var(--line)", width: "100%", ...style }} />
);

// Viewport width hook + breakpoints for responsive layouts (inline styles → no
// CSS media queries, so we branch grid templates on width).
function useW() {
  const [w, setW] = useState(1280);
  useEffect(() => {
    const on = () => setW(window.innerWidth);
    on(); // fija el ancho real ya hidratado
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return w;
}
const BP = { sm: 640, md: 1024 };   // < sm = móvil · < md = tablet · ≥ md = escritorio

// ---------------------------------------------------------------------------
// Nav
// ---------------------------------------------------------------------------
const NAV_LINKS = [
  ["Servicios", "#territorios"],
  ["IA", "#ia"],
  ["Estudio", "/estudio"],
  ["Soluciones", "#hub"],
  ["Clientes", "#clientes"],
  ["Manifesto", "#manifesto"],
  ["Contacto", "#contacto"],
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const w = useW();
  const mobile = w < BP.md;
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: scrolled ? (mobile ? "12px 20px" : "14px 28px") : (mobile ? "18px 20px" : "22px 28px"),
        color: scrolled ? "var(--bg)" : "var(--fg)",
        background: scrolled ? "var(--fg)" : "transparent",
        backdropFilter: scrolled ? "blur(12px) saturate(140%)" : "none",
        transition: "all .3s ease",
      }}>
        <a href="#top" style={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center" }} aria-label="Branthia — inicio">
          <BranthiaLogo height={scrolled ? 20 : 24} />
        </a>
        {!mobile && (
          <nav style={{ display: "flex", gap: 28 }}>
            {NAV_LINKS.map(([l, h]) => (
              <a key={l} href={h} style={{ color: "inherit", textDecoration: "none", fontSize: 14, fontWeight: 500, opacity: 0.78 }}>{l}</a>
            ))}
          </nav>
        )}
        {mobile ? (
          <button onClick={() => setMenuOpen(true)} aria-label="Abrir menú" style={{
            appearance: "none", border: "none", background: "transparent", color: "inherit",
            display: "flex", flexDirection: "column", gap: 5, padding: 6, cursor: "pointer",
          }}>
            <span style={{ width: 24, height: 2, background: "currentColor", display: "block" }} />
            <span style={{ width: 24, height: 2, background: "currentColor", display: "block" }} />
          </button>
        ) : (
          <a href="#contacto" style={{
            color: scrolled ? "var(--fg)" : "var(--bg)", background: scrolled ? "var(--bg)" : "var(--fg)", textDecoration: "none",
            padding: "10px 18px", borderRadius: 999, fontSize: 14, fontWeight: 600,
            display: "inline-flex", alignItems: "center", gap: 10, transition: "all .3s ease",
          }}>
            Empezar<span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--accent)" }} />
          </a>
        )}
      </header>

      {mobile && menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100, background: "var(--bg)", color: "var(--fg)",
          display: "flex", flexDirection: "column", padding: "18px 20px 32px",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <BranthiaLogo height={24} />
            <button onClick={() => setMenuOpen(false)} aria-label="Cerrar menú" style={{
              appearance: "none", border: "none", background: "transparent", color: "inherit",
              fontSize: 26, lineHeight: 1, cursor: "pointer", padding: 6,
            }}>✕</button>
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: 2, margin: "auto 0" }}>
            {NAV_LINKS.map(([l, h]) => (
              <a key={l} href={h} onClick={() => setMenuOpen(false)} style={{
                color: "inherit", textDecoration: "none",
                fontFamily: "var(--display)", fontWeight: 800, fontSize: "clamp(32px, 8.5vw, 52px)",
                letterSpacing: "-0.03em", lineHeight: 1.12, padding: "6px 0",
              }}>{l}<span style={{ color: "var(--accent)" }}>.</span></a>
            ))}
          </nav>
          <a href="#contacto" onClick={() => setMenuOpen(false)} style={{
            color: "var(--bg)", background: "var(--fg)", textDecoration: "none",
            padding: "16px 22px", borderRadius: 999, fontSize: 16, fontWeight: 600,
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
          }}>
            Empezar<span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--accent)" }} />
          </a>
        </div>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Hero — gigantic wordmark
// ---------------------------------------------------------------------------
function Hero({ heroMode, iaThread }) {
  const [t, setT] = useState(0);
  const w = useW();
  useEffect(() => {
    // Only the "split" hero animates on `t` (sine wobble). Running a per-frame
    // setState in the other modes re-renders the whole app ~60fps for nothing.
    if (heroMode !== "split") return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [heroMode]);

  return (
    <section id="top" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: w < BP.sm ? "116px 20px 48px" : "132px 28px 56px", position: "relative" }}>
      {/* Top meta strip */}
      <div style={{ display: "grid", gridTemplateColumns: w < BP.sm ? "1fr 1fr" : "repeat(4, 1fr)", gap: 24 }}>
        <div>
          <Mono style={{ color: "var(--muted)" }}>01 — Indice</Mono>
          <div style={{ marginTop: 10, fontSize: 14, lineHeight: 1.4 }}>
            Consultoría de IA. Producto.<br />Marca. <span style={{ color: "var(--accent)" }}>IA</span> en todo.
          </div>
        </div>
        <div>
          <Mono style={{ color: "var(--muted)" }}>02 — Hub</Mono>
          <div style={{ marginTop: 10, fontSize: 14, lineHeight: 1.4 }}>
            Athria · Cohexia<br /><span style={{ opacity: 0.5 }}>+ próximamente</span>
          </div>
        </div>
        <div>
          <Mono style={{ color: "var(--muted)" }}>03 — Sede</Mono>
          <div style={{ marginTop: 10, fontSize: 14, lineHeight: 1.4 }}>
            Barcelona · Remote<br />41.2237° N, 1.7256° E
          </div>
        </div>
        <div style={{ textAlign: w < BP.sm ? "left" : "right" }}>
          <Mono style={{ color: "var(--muted)" }}>MMXXVI — V.01</Mono>
          <div style={{ marginTop: 10, fontSize: 14, lineHeight: 1.4 }}>
            Consultora de IA.<br />Y estudio de producto.
          </div>
        </div>
      </div>

      {/* Centered block: wordmark + IA thread + intro (meta strip stays pinned top) */}
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      {/* The wordmark */}
      <div style={{ position: "relative", margin: "clamp(24px, 3vh, 48px) 0 24px" }}>
        {heroMode === "wordmark" && <HeroWordmark t={t} />}
        {heroMode === "manifesto" && <HeroManifesto />}
        {heroMode === "split" && <HeroSplit t={t} />}
      </div>

      {/* IA thread — discipline meets IA */}
      {iaThread === "rotador" && <HeroIAThread />}
      {iaThread === "espina" && <HeroIASpine />}
      {iaThread === "sello" && <HeroIASeal />}
      {iaThread === "ecuacion" && <HeroIAEquation />}
      {iaThread === "blend" && <HeroIABlend />}

      {/* Bottom meta */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "clamp(28px, 4vh, 56px)", paddingTop: 24, borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 480, fontSize: 16, lineHeight: 1.4 }}>
          Somos la consultora de IA aplicada que se sienta con el comité de dirección — y el estudio que construye su propio SaaS para demostrarlo. La misma IA, del comité a producción.
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
          <Mono style={{ color: "var(--muted)" }}>Scroll ↓</Mono>
          <div style={{ width: 1, height: 36, background: "var(--fg)" }} />
        </div>
      </div>
      </div>
    </section>
  );
}

function HeroIABlend() {
  const line = "Producto · Consultoría · Marca · ";
  const run = line.repeat(4);
  return (
    <div style={{ margin: "6px 0 4px" }}>
      <div style={{
        position: "relative", height: "clamp(120px, 16vw, 210px)",
        overflow: "hidden",
        borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)",
      }}>
        {/* Colossal IA backdrop */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{
            fontFamily: "var(--display)", fontWeight: 900,
            fontSize: "clamp(150px, 26vw, 400px)", lineHeight: 1,
            letterSpacing: "-0.07em", color: "var(--accent)", whiteSpace: "nowrap",
          }}>IA</span>
        </div>
        {/* Disciplines marching through, inverting on overlap */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", mixBlendMode: "difference" }}>
          <div style={{ display: "flex", whiteSpace: "nowrap", animation: "scrollX 26s linear infinite" }}>
            {[0, 1].map(i => (
              <span key={i} style={{
                fontFamily: "var(--display)", fontWeight: 800,
                fontSize: "clamp(40px, 6vw, 92px)", lineHeight: 1,
                letterSpacing: "-0.04em", color: "#fff", paddingRight: 0,
              }}>{run}</span>
            ))}
          </div>
        </div>
      </div>
      <Mono style={{ color: "var(--muted)", marginTop: 14, display: "inline-block" }}>
        Donde la disciplina cruza la IA, algo nuevo aparece.
      </Mono>
    </div>
  );
}

function HeroIAEquation() {
  const brack = {
    fontFamily: "var(--display)", fontWeight: 300,
    fontSize: "clamp(40px, 4.4vw, 76px)", lineHeight: 1,
    color: "var(--muted)", transform: "translateY(-0.02em)",
  };
  return (
    <div style={{ margin: "8px 0 4px" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "clamp(10px, 1.2vw, 18px)",
        flexWrap: "wrap",
      }}>
        <span style={brack}>[</span>
        <span style={{
          fontFamily: "var(--display)", fontWeight: 800,
          fontSize: "clamp(28px, 3.2vw, 56px)", lineHeight: 1,
          letterSpacing: "-0.035em",
        }}>
          Producto <span style={{ color: "var(--muted)", fontWeight: 400 }}>·</span> Consultoría <span style={{ color: "var(--muted)", fontWeight: 400 }}>·</span> Marca
        </span>
        <span style={brack}>]</span>
        <span style={{
          fontFamily: "var(--display)", fontWeight: 500,
          fontSize: "clamp(24px, 2.6vw, 44px)", color: "var(--muted)",
          letterSpacing: "-0.02em",
        }}>×</span>
        <span style={{
          fontFamily: "var(--display)", fontWeight: 900,
          fontSize: "clamp(36px, 4vw, 72px)", lineHeight: 1,
          letterSpacing: "-0.04em", color: "var(--accent)",
        }}>IA</span>
      </div>
      <Mono style={{ color: "var(--muted)", marginTop: 16, display: "inline-block" }}>
        La IA multiplica los tres territorios — no los sustituye.
      </Mono>
    </div>
  );
}

function HeroIASeal() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 28, margin: "6px 0" }}>
      <div style={{ position: "relative", width: 168, height: 168, flexShrink: 0 }}>
        {/* Rotating orbital text */}
        <svg viewBox="0 0 200 200" style={{
          width: "100%", height: "100%",
          animation: "spinSeal 22s linear infinite",
        }}>
          <defs>
            <path id="sealPath" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
          </defs>
          <text style={{
            fontFamily: "var(--display)", fontWeight: 700,
            fontSize: 15, letterSpacing: "0.18em",
            textTransform: "uppercase", fill: "var(--fg)",
          }}>
            <textPath href="#sealPath" startOffset="0">
              Producto · Consultoría · Marca ·&nbsp;
            </textPath>
          </text>
        </svg>
        {/* Static core */}
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            fontFamily: "var(--display)", fontWeight: 900,
            fontSize: 48, letterSpacing: "-0.04em", lineHeight: 1,
            color: "var(--accent)",
          }}>
            IA
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 280 }}>
        <div style={{
          fontFamily: "var(--display)", fontWeight: 800,
          fontSize: "clamp(22px, 2.4vw, 34px)", lineHeight: 1.08,
          letterSpacing: "-0.03em",
        }}>
          La IA en el núcleo<span style={{ color: "var(--accent)" }}>.</span>
        </div>
        <Mono style={{ color: "var(--muted)", marginTop: 12, display: "inline-block", lineHeight: 1.5 }}>
          Todo lo demás orbita a su alrededor.
        </Mono>
      </div>
    </div>
  );
}

function HeroIASpine() {
  const DISCIPLINAS = ["Producto", "Consultoría", "Marca"];
  return (
    <div style={{ display: "flex", alignItems: "stretch", gap: 22, margin: "8px 0 6px" }}>
      {/* Vertical IA spine */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1, width: 2, background: "var(--accent)" }} />
        <div style={{
          fontFamily: "var(--display)", fontWeight: 900,
          fontSize: "clamp(22px, 2.4vw, 34px)", letterSpacing: "0.04em",
          color: "var(--accent)", writingMode: "vertical-rl", transform: "rotate(180deg)",
          padding: "2px 0",
        }}>
          IA
        </div>
        <div style={{ flex: 1, width: 2, background: "var(--accent)" }} />
      </div>

      {/* Stacked disciplines */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 2 }}>
        {DISCIPLINAS.map((d) => (
          <div key={d} style={{
            fontFamily: "var(--display)", fontWeight: 800,
            fontSize: "clamp(24px, 3vw, 46px)", lineHeight: 1.06,
            letterSpacing: "-0.035em",
          }}>
            {d}
          </div>
        ))}
      </div>

      <Mono style={{ color: "var(--muted)", alignSelf: "flex-end", paddingBottom: 6 }}>
        Un solo hilo<br />cose los tres.
      </Mono>
    </div>
  );
}

function HeroIAThread() {
  const DISCIPLINAS = ["Consultoría", "Producto", "Marca"];
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const swap = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setI(p => (p + 1) % DISCIPLINAS.length);
        setShow(true);
      }, 320);
    }, 2200);
    return () => clearInterval(swap);
  }, []);
  return (
    <div style={{
      display: "flex", alignItems: "baseline", gap: 18, flexWrap: "wrap",
      margin: "4px 0 8px",
    }}>
      <div style={{
        fontFamily: "var(--display)", fontWeight: 800,
        fontSize: "clamp(28px, 4vw, 64px)", letterSpacing: "-0.035em",
        lineHeight: 1, display: "flex", alignItems: "baseline", gap: "0.3em",
      }}>
        <span style={{
          display: "inline-block", minWidth: "5.4ch",
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(0.35em)",
          transition: "opacity .32s ease, transform .32s cubic-bezier(.2,.7,.2,1)",
        }}>
          {DISCIPLINAS[i]}
        </span>
        <span style={{ color: "var(--muted)", fontWeight: 500 }}>×</span>
        <span style={{ color: "var(--accent)" }}>IA</span>
      </div>
      <Mono style={{ color: "var(--muted)", alignSelf: "flex-end", paddingBottom: "0.5em" }}>
        La disciplina cambia. La IA es la constante.
      </Mono>
    </div>
  );
}

function HeroWordmark({ t }) {
  const w = useW();
  return (
    <div style={{ position: "relative" }}>
      <BranthiaLogo
        title="Branthia"
        height="auto"
        style={{ width: w < BP.md ? "100%" : "70%", height: "auto", color: "var(--fg)" }}
      />
      {w >= BP.md && (
        <div style={{ position: "absolute", right: 0, top: 6, textAlign: "right", display: "flex", flexDirection: "column", gap: 4 }}>
          <Mono style={{ color: "var(--muted)" }}>/ˈbɹæn.θi.ə/</Mono>
          <Mono style={{ color: "var(--muted)" }}>n. fem. — hub</Mono>
        </div>
      )}
    </div>
  );
}

function HeroManifesto() {
  return (
    <h1 style={{
      fontFamily: "var(--display)",
      fontWeight: 900,
      fontSize: "clamp(56px, 9vw, 156px)",
      lineHeight: 0.92,
      letterSpacing: "-0.045em",
      margin: 0,
    }}>
      Construimos<br />
      <span style={{ fontStyle: "italic", fontWeight: 500, opacity: 0.55 }}>las marcas que</span><br />
      vienen después<span style={{ color: "var(--accent)" }}>.</span>
    </h1>
  );
}

function HeroSplit({ t }) {
  return (
    <div>
      <h1 style={{
        fontFamily: "var(--display)",
        fontWeight: 900,
        fontSize: "clamp(96px, 16vw, 260px)",
        lineHeight: 0.86,
        letterSpacing: "-0.055em",
        margin: 0,
      }}>
        Bran<span style={{ display: "inline-block", transform: `translateY(${Math.sin(t * 1.1) * 4}px)` }}>·</span>thia<span style={{ color: "var(--accent)" }}>.</span>
      </h1>
      <div style={{ display: "flex", gap: 36, marginTop: 20, flexWrap: "wrap" }}>
        <Etymon label="Brand" body="Marca. Lo que se reconoce a kilómetros." />
        <Etymon label="Anthos" body="Florecer (gr.). Lo que se vuelve evidente." />
        <Etymon label="-ia" body="Pertenencia, territorio, casa común." />
      </div>
    </div>
  );
}
function Etymon({ label, body }) {
  return (
    <div style={{ maxWidth: 220, borderTop: "1px solid var(--line)", paddingTop: 10 }}>
      <Mono style={{ color: "var(--muted)" }}>{label}</Mono>
      <div style={{ marginTop: 6, fontSize: 14, lineHeight: 1.35 }}>{body}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Marquee
// ---------------------------------------------------------------------------
function Marquee() {
  const w = useW();
  const sm = w < BP.sm;
  const words = ["Automatización con IA", "Sistemas agénticos", "Evals & fiabilidad", "RAG sobre tu dato", "Diagnóstico IA", "Producto digital", "UX/UI", "Sistemas de diseño", "Go-to-market", "Generación de demanda", "Marketing automation", "Naming & identidad", "Contenido a escala"];
  const line = words.join("   ·   ");
  return (
    <section style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", overflow: "hidden", padding: sm ? "11px 0" : "20px 0", background: "var(--bg)" }}>
      <div style={{ display: "flex", gap: 0, whiteSpace: "nowrap", animation: sm ? "scrollX 15s linear infinite" : "scrollX 30s linear infinite" }}>
        {[0,1].map(i => (
          <span key={i} style={{
            fontFamily: "var(--display)",
            fontWeight: sm ? 600 : 900,
            fontSize: sm ? 15 : "clamp(30px, 4.4vw, 64px)",
            lineHeight: 1,
            letterSpacing: sm ? "0" : "-0.045em",
            paddingRight: sm ? 24 : 60,
          }}>
            {line}   <span style={{ color: "var(--accent)" }}>·</span>&nbsp;
          </span>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Territorios — the three pillars
// ---------------------------------------------------------------------------
const TERRITORIOS = [
  {
    n: "01",
    head: "Consultoría",
    sub: "IA aplicada — de la estrategia a producción",
    body: "Diseñamos e implantamos IA que trabaja: flujos automatizados, agentes y sistemas inteligentes conectados a tus procesos, datos y herramientas. De la estrategia al sistema en producción — no un informe, algo que funciona.",
    tags: ["Diagnóstico & casos de uso (ROI)", "Automatización de procesos", "Agentes & sistemas agénticos", "Evals, guardrails & fiabilidad", "Integración de datos (RAG)", "Gobernanza & EU AI Act"],
    ia: "Agentes que llegan a producción",
    accent: "Consultoría.",
  },
  {
    n: "02",
    head: "Producto",
    sub: "Digital · vanguardia · alta tecnología",
    body: "Diseñamos y construimos producto digital moderno: del primer wireframe al equipo de ingeniería en producción. Stack actual, IA aplicada con criterio, y obsesión por la artesanía.",
    tags: ["Discovery & definición", "Diseño UX/UI", "Ingeniería a producción", "Copilots & features IA", "Sistemas de diseño"],
    ia: "Copilots y agentes dentro del producto",
    accent: "Producto.",
  },
  {
    n: "03",
    head: "Marca",
    sub: "Marca, marketing y crecimiento con IA",
    body: "Identidad, naming y narrativa — y el motor que las pone a trabajar: go-to-market, generación de demanda, marketing automation y contenido a escala con IA. El branding estructura la decisión; el marketing la convierte en pipeline.",
    tags: ["Naming & identidad", "Go-to-market", "Generación de demanda", "Marketing automation", "Contenido a escala IA"],
    ia: "Contenido y demanda a escala, sin perder la voz",
    accent: "Marca.",
  },
];

function Territorios() {
  const w = useW();
  return (
    <section id="territorios" style={{ padding: w < BP.sm ? "60px 20px 44px" : "140px 28px 80px" }}>
      <SectionHeader index="§ I" eyebrow="Tres territorios · un motor de IA" title="Una sola disciplina, tres acentos." />
      <div style={{ display: "grid", gridTemplateColumns: w < BP.sm ? "1fr" : "120px 1fr", gap: 32, marginTop: 28 }}>
        <div />
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, maxWidth: 560, color: "var(--muted)" }}>
          Consultoría, producto y marca son los tres acentos. La <span style={{ color: "var(--fg)", fontWeight: 600 }}>IA es el motor</span> que los mueve a los tres — no un servicio aparte, sino la forma en que hoy hacemos cada uno.
        </p>
      </div>
      <div style={{ display: "grid", gap: 0, marginTop: w < BP.sm ? 32 : 56 }}>
        {TERRITORIOS.map((t, i) => <TerritorioRow key={t.n} t={t} idx={i} />)}
      </div>
    </section>
  );
}

function TerritorioRow({ t, idx }) {
  const [hover, setHover] = useState(false);
  const w = useW();
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "grid",
        gridTemplateColumns: w < BP.md ? "1fr" : "120px 1fr 1fr 280px",
        gap: w < BP.md ? 18 : 32,
        alignItems: "start",
        padding: w < BP.sm ? "32px 0" : "44px 0",
        borderTop: "1px solid var(--line)",
        borderBottom: idx === TERRITORIOS.length - 1 ? "1px solid var(--line)" : "none",
        position: "relative",
        cursor: "default",
      }}
    >
      <div style={{
        fontFamily: "var(--display)", fontWeight: 900, fontSize: w < BP.sm ? 52 : 88,
        lineHeight: 0.9, letterSpacing: "-0.04em",
        color: hover ? "var(--accent)" : "var(--fg)", transition: "color .3s",
      }}>{t.n}</div>

      <div>
        <h3 style={{
          fontFamily: "var(--display)", fontWeight: 900,
          fontSize: "clamp(40px, 5vw, 84px)", lineHeight: 0.9,
          letterSpacing: "-0.045em", margin: 0,
        }}>
          {t.head}<span style={{ color: "var(--accent)" }}>.</span>
        </h3>
        <Mono style={{ color: "var(--muted)", marginTop: 14, display: "inline-block" }}>{t.sub}</Mono>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16 }}>
          <span style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 10, fontWeight: 500, letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--bg)", background: "var(--accent)",
            padding: "4px 8px", borderRadius: 999, whiteSpace: "nowrap",
          }}>IA</span>
          <span style={{ fontSize: 13.5, fontWeight: 600, letterSpacing: "-0.01em" }}>{t.ia}</span>
        </div>
      </div>

      <div style={{ paddingTop: 8 }}>
        <p style={{ fontSize: 17, lineHeight: 1.5, margin: 0, maxWidth: 440 }}>{t.body}</p>
        <Mono style={{ color: "var(--muted)", marginTop: 20, display: "inline-block" }}>Servicios</Mono>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
          {t.tags.map(tag => (
            <span key={tag} style={{
              fontSize: 12, padding: "5px 11px",
              border: "1px solid var(--line)", borderRadius: 999,
              fontWeight: 500,
            }}>{tag}</span>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: w < BP.md ? "flex-start" : "flex-end", gap: 12, paddingTop: 8, width: "100%" }}>
        <Mono style={{ color: "var(--muted)" }}>Capability</Mono>
        <div style={{
          width: "100%", height: 6, background: "var(--chip)", borderRadius: 99, overflow: "hidden",
        }}>
          <div style={{ width: hover ? "100%" : `${70 + idx * 8}%`, height: "100%", background: "var(--accent)", transition: "width .6s cubic-bezier(.2,.7,.2,1)" }} />
        </div>
        <a href="#contacto" style={{
          marginTop: "auto", border: "1px solid var(--fg)", background: hover ? "var(--fg)" : "transparent",
          color: hover ? "var(--bg)" : "var(--fg)",
          padding: "11px 16px", borderRadius: 999, fontSize: 13, fontWeight: 600,
          cursor: "pointer", transition: "all .2s", textDecoration: "none",
          display: "inline-block", textAlign: "center",
        }}>
          Hablemos →
        </a>
      </div>
    </div>
  );
}

function SectionHeader({ index, eyebrow, title }) {
  const w = useW();
  return (
    <div style={{ display: "grid", gridTemplateColumns: w < BP.sm ? "1fr" : "120px 1fr", gap: w < BP.sm ? 10 : 32 }}>
      <Mono style={{ color: "var(--muted)", fontSize: 14 }}>{index}</Mono>
      <div>
        <Mono style={{ color: "var(--muted)", fontSize: 14 }}>{eyebrow}</Mono>
        <h2 style={{
          fontFamily: "var(--display)", fontWeight: 900,
          fontSize: "clamp(42px, 6vw, 96px)", lineHeight: 0.92,
          letterSpacing: "-0.045em", margin: "12px 0 0", maxWidth: "16ch",
        }}>{title}</h2>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// IA aplicada — la columna vertebral
// ---------------------------------------------------------------------------
const IA_COLUMNAS = [
  {
    pilar: "Consultoría",
    head: "Implantar la IA",
    body: "Del piloto a producción: casos de uso priorizados por ROI, diseño de flujos, agentes y sistemas agénticos, y evaluación continua (evals & guardrails) para que aguanten de verdad. Con gobernanza y EU AI Act — no una demo.",
    items: ["Automatización", "Sistemas agénticos", "Orquestación", "Evals & fiabilidad", "Gobernanza & EU AI Act"],
  },
  {
    pilar: "Producto",
    head: "Construir con IA",
    body: "Copilots, agentes y features con IA dentro del producto. Modelos propios o de terceros, RAG sobre tu conocimiento, evaluación continua y MLOps para que aguante producción.",
    items: ["Copilots & agentes", "RAG sobre dominio", "Multimodal", "Evals & guardrails", "MLOps"],
  },
  {
    pilar: "Marca",
    head: "Crecer con IA",
    body: "Marketing y contenido a escala sin perder voz: pipelines editoriales asistidos, campañas y nurturing automatizados, personalización 1:1 y agentes que generan demanda cualificada.",
    items: ["Contenido a escala", "Demand gen", "Marketing automation", "Personalización", "Naming asistido"],
  },
];

function IAAplicada() {
  const w = useW();
  return (
    <section id="ia" style={{ padding: w < BP.sm ? "60px 20px 44px" : "140px 28px 80px", position: "relative", overflow: "hidden" }}>
      <SectionHeader index="§ II" eyebrow="Inteligencia aplicada" title="El hilo que cose los tres territorios." />

      {/* Stat block */}
      <div style={{
        marginTop: w < BP.sm ? 40 : 72,
        display: "grid",
        gridTemplateColumns: w < BP.md ? "1fr" : "minmax(320px, 1.1fr) 1fr",
        gap: w < BP.md ? 28 : 64,
        alignItems: "end",
      }}>
        <div>
          <div style={{
            fontFamily: "var(--display)",
            fontWeight: 900,
            fontSize: "clamp(140px, 22vw, 360px)",
            lineHeight: 0.82,
            letterSpacing: "-0.06em",
            margin: 0,
            display: "flex",
            alignItems: "flex-start",
            gap: 8,
          }}>
            <span>15</span>
            <span style={{ color: "var(--accent)", fontSize: "0.5em", lineHeight: 1 }}>+</span>
          </div>
          <Mono style={{ color: "var(--muted)", marginTop: 8, display: "inline-block" }}>
            Años aplicando IA &nbsp;·&nbsp; antes de que se llamara IA
          </Mono>
        </div>
        <div style={{ paddingBottom: 28 }}>
          <p style={{
            margin: 0,
            fontFamily: "var(--display)",
            fontWeight: 500,
            fontSize: "clamp(22px, 2.4vw, 36px)",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            textWrap: "pretty",
            maxWidth: "24ch",
          }}>
            <span style={{ color: "var(--muted)" }}>Empezamos con modelos cuando todavía se llamaban</span> sistemas expertos, NLP y machine learning<span style={{ color: "var(--muted)" }}>. Hoy implantamos </span>ecosistemas de IA<span style={{ color: "var(--muted)" }}> de extremo a extremo</span><span style={{ color: "var(--accent)" }}>.</span>
          </p>
        </div>
      </div>

      {/* Three columns mapped to the trinity */}
      <div style={{
        marginTop: w < BP.sm ? 48 : 96,
        display: "grid",
        gridTemplateColumns: w < BP.sm ? "1fr" : w < BP.md ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
        borderTop: "1px solid var(--line)",
      }}>
        {IA_COLUMNAS.map((c, i) => (
          <div key={c.pilar} style={{
            padding: w < BP.sm ? "26px 20px 24px" : "36px 28px 32px",
            borderRight: w >= BP.sm && i < 2 ? "1px solid var(--line)" : "none",
            borderBottom: "1px solid var(--line)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            minHeight: w < BP.sm ? 0 : 360,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <Mono style={{ color: "var(--muted)" }}>{`IA × ${c.pilar}`}</Mono>
              <Mono style={{ color: "var(--muted)" }}>{`0${i + 1}`}</Mono>
            </div>
            <h3 style={{
              fontFamily: "var(--display)",
              fontWeight: 900,
              fontSize: "clamp(28px, 2.6vw, 40px)",
              lineHeight: 1,
              letterSpacing: "-0.035em",
              margin: 0,
            }}>
              {c.head}<span style={{ color: "var(--accent)" }}>.</span>
            </h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.5, margin: 0, color: "var(--fg)", opacity: 0.86 }}>{c.body}</p>
            <div style={{ marginTop: "auto", display: "flex", flexWrap: "wrap", gap: 6 }}>
              {c.items.map(it => (
                <span key={it} style={{
                  fontSize: 11.5,
                  padding: "5px 10px",
                  border: "1px solid var(--line)",
                  borderRadius: 999,
                  fontWeight: 500,
                }}>{it}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Closing chip-strip / proof points */}
      <div style={{ display: "grid", gridTemplateColumns: w < BP.md ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 0 }}>
        {[
          ["Modelos en producción", "50+"],
          ["Proyectos IA entregados", "40+"],
          ["Sectores tocados", "9"],
          ["Stack", "OpenAI · Anthropic · open-source"],
        ].map(([k, v], i) => (
          <div key={k} style={{
            padding: w < BP.sm ? "20px 18px" : "28px 24px",
            borderRight: (w < BP.md ? i % 2 === 0 : i < 3) ? "1px solid var(--line)" : "none",
            borderBottom: "1px solid var(--line)",
          }}>
            <Mono style={{ color: "var(--muted)" }}>{k}</Mono>
            <div style={{
              marginTop: 10,
              fontFamily: "var(--display)",
              fontWeight: 800,
              fontSize: "clamp(26px, 2.4vw, 36px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}>{v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// El hub — constelación de marcas
// ---------------------------------------------------------------------------
const BRANDS = [
  {
    key: "athria",
    name: "Athria",
    domain: "Gestión de clubes de atletismo",
    status: "Live · 2026",
    body: "Software vertical para clubes y federaciones de atletismo: licencias, cuotas, entrenos, marcas personales y comunicación con socios. Hecho por y para gente que entrena.",
    meta: [["Sector", "Sport-tech"], ["Modelo", "B2B SaaS"], ["Mercado", "ES · EU"]],
    glyph: "A",
  },
  {
    key: "cohexia",
    name: "Cohexia",
    domain: "Partner Relationship Management",
    status: "Beta privada · 2026",
    body: "PRM moderno para empresas con red de partners, distribuidores o resellers. Onboarding, deal registration, MDF, comisiones y co-marketing en una sola plataforma.",
    meta: [["Sector", "Sales-tech"], ["Modelo", "B2B SaaS"], ["Mercado", "Global"]],
    glyph: "N",
  },
  {
    key: "next",
    name: "•••",
    domain: "Próxima marca del hub",
    status: "In Studio",
    body: "Branthia incuba marcas cuando detectamos un nicho con margen para una solución mejor. Si tu sector necesita la suya, hablemos antes de que lo haga otro.",
    meta: [["Sector", "—"], ["Modelo", "—"], ["Mercado", "—"]],
    glyph: "?",
    placeholder: true,
  },
];

function Hub() {
  const w = useW();
  return (
    <section id="hub" style={{ padding: w < BP.sm ? "60px 20px 44px" : "140px 28px 80px", background: "var(--bg)" }}>
      <SectionHeader index="§ III" eyebrow="El hub" title="Una constelación de marcas verticales." />
      <div style={{ marginTop: w < BP.sm ? 32 : 56, display: "grid", gridTemplateColumns: w < BP.sm ? "1fr" : w < BP.md ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: 20 }}>
        {BRANDS.map(b => <BrandCard key={b.key} b={b} />)}
      </div>

      <div style={{ marginTop: w < BP.sm ? 36 : 56, padding: "28px 0", borderTop: "1px solid var(--line)", display: "grid", gridTemplateColumns: w < BP.md ? "1fr" : "120px 1fr 1fr", gap: 32 }}>
        <Mono style={{ color: "var(--muted)" }}>Modelo</Mono>
        <div style={{ fontSize: 18, lineHeight: 1.45, maxWidth: 540 }}>
          Branthia es el estudio. Athria, Cohexia y las marcas que vendrán son los productos.
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.5, color: "var(--muted)", maxWidth: 460 }}>
          Cada marca tiene identidad y modelo propios, y se apoya en una red de colaboradores. Comparten infraestructura, criterio de diseño y la disciplina de construir despacio para que dure.
        </div>
      </div>
    </section>
  );
}

// Señal de producto de Athria como pieza editorial (no screenshot): tipografía
// grande + etiquetas mono + línea de datos a trazo fino, en la paleta de la web.
function AthriaPreview() {
  return (
    <div style={{ margin: "auto 0", width: "100%" }}>
      <Mono style={{ opacity: 0.55 }}>Athria · rendimiento</Mono>

      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 14 }}>
        <span style={{ fontFamily: "var(--display)", fontWeight: 900, fontSize: "clamp(52px, 7vw, 92px)", lineHeight: 0.82, letterSpacing: "-0.05em" }}>P93</span>
        <span style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "clamp(16px, 1.8vw, 24px)", opacity: 0.5, letterSpacing: "-0.02em" }}>top 7%</span>
      </div>
      <Mono style={{ opacity: 0.55, marginTop: 10, display: "inline-block" }}>Percentil · Sub-12 · 358 atletas</Mono>

      <div style={{ marginTop: 22 }}>
        <svg viewBox="0 0 320 88" style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
          <line x1="0" y1="16" x2="320" y2="16" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 5" />
          <polyline points="0,58 40,54 80,56 132,64 176,64 216,62 258,66 288,32 320,10"
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          <circle cx="320" cy="10" r="4" fill="currentColor" />
        </svg>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 10 }}>
        <Mono style={{ opacity: 0.55 }}>Evolución · longitud</Mono>
        <Mono>+17% temporada</Mono>
      </div>
    </div>
  );
}

// Señal de producto de Cohexia (Partnerhub) como pieza editorial: mapa de riesgo
// de la red en monocromo + métrica IA. Datos demo, adaptativo al color de la tarjeta.
function CohexiaPreview() {
  const risk = [
    0.08, 0.08, 0.2, 0.08, 0.5, 0.3, 0.08, 0.08, 0.22, 0.08, 0.08, 0.35,
    0.08, 0.08, 0.08, 0.25, 0.32, 0.08, 0.08, 0.3, 0.08, 0.08, 0.08, 0.24,
    0.08, 0.18, 0.08, 0.08, 0.08, 0.28, 0.08, 0.08, 0.26, 0.08, 0.08, 0.08,
  ];
  return (
    <div style={{ margin: "auto 0", width: "100%" }}>
      <Mono style={{ opacity: 0.55 }}>Cohexia · Partnerhub</Mono>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 14 }}>
        <span style={{ fontFamily: "var(--display)", fontWeight: 900, fontSize: "clamp(48px, 6.4vw, 84px)", lineHeight: 0.82, letterSpacing: "-0.05em" }}>€612K</span>
        <span style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "clamp(15px, 1.7vw, 22px)", opacity: 0.5, letterSpacing: "-0.02em" }}>en riesgo</span>
      </div>
      <Mono style={{ opacity: 0.55, marginTop: 10, display: "inline-block" }}>Churn detectado por IA · 3 partners a priorizar</Mono>
      <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 4 }}>
        {risk.map((v, i) => (
          <div key={i} style={{ aspectRatio: "1 / 1", borderRadius: 3, background: "currentColor", opacity: v }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 10 }}>
        <Mono style={{ opacity: 0.55 }}>Mapa de riesgo · red</Mono>
        <Mono>142 partners</Mono>
      </div>
    </div>
  );
}

function BrandCard({ b }) {
  const [hover, setHover] = useState(false);
  const w = useW();
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative", aspectRatio: w < BP.md ? "auto" : "3/4",
        background: hover && !b.placeholder ? "var(--fg)" : "var(--chip)",
        color: hover && !b.placeholder ? "var(--bg)" : "var(--fg)",
        padding: w < BP.sm ? 20 : 24, borderRadius: 6,
        display: "flex", flexDirection: "column", gap: w < BP.sm ? 18 : 0,
        transition: "all .35s cubic-bezier(.2,.7,.2,1)",
        overflow: "hidden",
        border: b.placeholder ? "1px dashed var(--line)" : "1px solid transparent",
        cursor: b.placeholder ? "default" : "pointer",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Mono style={{ opacity: 0.7 }}>{b.status}</Mono>
        <Mono style={{ opacity: 0.7 }}>{b.placeholder ? "TBD" : "↗"}</Mono>
      </div>

      {(() => {
        const preview = b.key === "athria" ? <AthriaPreview /> : b.key === "cohexia" ? <CohexiaPreview /> : null;
        if (!preview) {
          return (
            <div style={{
              fontFamily: "var(--display)", fontWeight: 900,
              fontSize: "clamp(120px, 16vw, 220px)", lineHeight: 0.85,
              letterSpacing: "-0.06em",
              margin: "auto 0", transition: "transform .4s",
              transform: hover ? "translateX(-4px)" : "translateX(0)",
            }}>
              {b.glyph}<span style={{ color: hover && !b.placeholder ? "var(--accent)" : "var(--accent)" }}>.</span>
            </div>
          );
        }
        if (w < BP.md) return (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={{ fontFamily: "var(--display)", fontWeight: 900, fontSize: "clamp(40px, 12vw, 60px)", lineHeight: 0.85, letterSpacing: "-0.05em" }}>
              {b.name}<span style={{ color: "var(--accent)" }}>.</span>
            </span>
            {preview}
          </div>
        );
        return (
          <div style={{ position: "relative", margin: "auto 0", width: "100%", minHeight: 200 }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", opacity: hover ? 0 : 1, transition: "opacity .3s ease" }}>
              <span style={{ fontFamily: "var(--display)", fontWeight: 900, fontSize: "clamp(42px, 5.6vw, 76px)", lineHeight: 0.85, letterSpacing: "-0.05em" }}>
                {b.name}<span style={{ color: "var(--accent)" }}>.</span>
              </span>
            </div>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", opacity: hover ? 1 : 0, transition: "opacity .3s ease", pointerEvents: "none" }}>
              {preview}
            </div>
          </div>
        );
      })()}

      <div>
        {!(w < BP.md && (b.key === "athria" || b.key === "cohexia")) && (
          <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 28, letterSpacing: "-0.025em" }}>
            {b.name}
          </div>
        )}
        <div style={{ fontSize: 14, opacity: 0.78, marginTop: 4 }}>{b.domain}</div>
        <p style={{ fontSize: 13, lineHeight: 1.45, marginTop: 14, opacity: 0.86 }}>{b.body}</p>
        <div style={{ display: "flex", gap: 14, marginTop: 14, paddingTop: 14, borderTop: `1px solid ${hover && !b.placeholder ? "rgba(241,236,226,0.22)" : "var(--line)"}` }}>
          {b.meta.map(([k, v]) => (
            <div key={k} style={{ flex: 1 }}>
              <Mono style={{ opacity: 0.55 }}>{k}</Mono>
              <div style={{ fontSize: 12, marginTop: 2, fontWeight: 600 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Clientes — marcas con las que el equipo ha trabajado
// ---------------------------------------------------------------------------
// NOTA: marcas placeholder. Swap por los clientes reales del CEO; cada item
// llevará después un enlace a su caso de éxito (href).
// Trayectoria del fundador (proyectos reales). Renombre + IA, con scope honesto.
// El cliente de energía va anonimizado ("Confidencial") por NDA.
const CLIENTES = [
  { name: "Foxconn",         sector: "Electrónica",         scope: "Automatización de supply chain planning", year: "" },
  { name: "Yamaha",          sector: "Industria",           scope: "Implementación CRM",                      year: "" },
  { name: "Toyota Seguros",  sector: "Seguros",             scope: "CRM · marketing automation · analytics",  year: "" },
  { name: "La Caixa",        sector: "Banca",               scope: "Marketing automation",                    year: "" },
  { name: "Lafarge-Holcim",  sector: "Construcción",        scope: "Ideación & startup internacional",        year: "" },
  { name: "Freixenet",       sector: "Gran consumo",        scope: "Modelo estratégico digital",              year: "" },
  { name: "Fatro",           sector: "Pharma veterinaria",  scope: "Automatización comercial & dato (IA/ML)", year: "" },
  { name: "Confidencial",    sector: "Energía",             scope: "Lanzamiento IA & IoT",                    year: "" },
  { name: "Martínez Comín",  sector: "Asesoría financiera", scope: "Automatización & IA",                     year: "" },
  { name: "Eyme",            sector: "Salud · VR",          scope: "Plataforma inmersiva + Machine Learning", year: "" },
  { name: "Fira de Lleida",  sector: "Ferias & eventos",    scope: "Transformación digital & IA",             year: "" },
  { name: "IMQ",             sector: "Salud · seguros",     scope: "Estrategia de marketing & CRM",           year: "" },
];

function Clientes() {
  const w = useW();
  return (
    <section id="clientes" style={{ padding: w < BP.sm ? "60px 20px 44px" : "140px 28px 80px", borderTop: "1px solid var(--line)" }}>
      <SectionHeader index="§ IV" eyebrow="Clientes" title="Trayectoria detrás de Branthia." />

      <div style={{ display: "grid", gridTemplateColumns: w < BP.sm ? "1fr" : "120px 1fr", gap: 32, marginTop: 32 }}>
        <div />
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, maxWidth: 560, color: "var(--muted)" }}>
          Detrás de Branthia hay 25 años dentro del dato, los sistemas y el marketing de grandes marcas — de la automatización comercial y el CRM a la IA en producción. La base sobre la que hoy construimos.
        </p>
      </div>

      <ClientesGrid />
    </section>
  );
}

function ClientesGrid() {
  const w = useW();
  // Móvil → índice editorial en lista. Desktop → grid de tarjetas (original).
  if (w < BP.md) {
    return (
      <div style={{ marginTop: 44, borderTop: "1px solid var(--line)" }}>
        {CLIENTES.map((c, i) => <ClienteRow key={c.name} c={c} idx={i} />)}
      </div>
    );
  }
  return (
    <div style={{
      marginTop: 72,
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      borderTop: "1px solid var(--line)",
      borderLeft: "1px solid var(--line)",
    }}>
      {CLIENTES.map((c, i) => <ClienteCell key={c.name} c={c} idx={i} />)}
    </div>
  );
}

// Móvil: fila de índice editorial (créditos), sin el punto de acento (reservado
// a las marcas propias).
function ClienteRow({ c, idx }) {
  const num = String(idx + 1).padStart(2, "0");
  return (
    <div style={{ padding: "20px 2px", borderBottom: "1px solid var(--line)" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <Mono style={{ color: "var(--muted)", opacity: 0.55, flexShrink: 0 }}>{num}</Mono>
        <span style={{
          fontFamily: "var(--display)", fontWeight: 600,
          fontSize: 22, letterSpacing: "-0.025em", lineHeight: 1,
        }}>
          {c.name}
        </span>
      </div>
      <div style={{ marginTop: 9, marginLeft: 34, fontSize: 13, lineHeight: 1.45, color: "var(--muted)" }}>
        <span style={{ color: "var(--fg)" }}>{c.sector}</span>{c.scope ? ` — ${c.scope}` : ""}
      </div>
    </div>
  );
}

// Desktop: tarjeta original (wordmark grande con punto de acento).
function ClienteCell({ c, idx }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative", display: "block",
        padding: "40px 28px 28px",
        borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)",
        textDecoration: "none", color: "var(--fg)",
        background: hover ? "var(--fg)" : "transparent",
        transition: "background .3s ease",
        minHeight: 220, overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 14, left: 14, color: hover ? "var(--bg)" : "var(--muted)", opacity: 0.6 }}>
        <Mono>{String(idx + 1).padStart(2, "0")}</Mono>
      </div>
      <div style={{
        fontFamily: "var(--display)", fontWeight: 900,
        fontSize: "clamp(40px, 4.4vw, 64px)", lineHeight: 1.02, letterSpacing: "-0.03em",
        marginTop: 16, color: hover ? "var(--bg)" : "var(--fg)",
        transition: "color .25s, transform .35s cubic-bezier(.2,.7,.2,1)",
        transform: hover ? "translateX(-2px)" : "translateX(0)",
      }}>
        {c.name}<span style={{ color: "var(--accent)" }}>.</span>
      </div>
      <div style={{ marginTop: 12, fontSize: 13, lineHeight: 1.4, color: hover ? "rgba(241,236,226,0.7)" : "var(--muted)" }}>
        {c.scope ? `${c.sector} — ${c.scope}` : c.sector}
      </div>
      <div style={{
        position: "absolute", left: 28, right: 28, bottom: 18,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        color: hover ? "var(--bg)" : "var(--fg)",
        opacity: hover ? 1 : 0, transform: hover ? "translateY(0)" : "translateY(6px)",
        transition: "opacity .25s, transform .25s", pointerEvents: "none",
      }}>
        <Mono>Caso de éxito</Mono>
        <span style={{ fontSize: 14, fontWeight: 600 }}>Próximamente →</span>
      </div>
    </a>
  );
}

// ---------------------------------------------------------------------------
// Manifesto
// ---------------------------------------------------------------------------
function Manifesto() {
  const w = useW();
  return (
    <section id="manifesto" style={{ padding: w < BP.sm ? "60px 20px 48px" : "140px 28px", position: "relative" }}>
      <SectionHeader index="§ V" eyebrow="Manifesto" title="Cómo trabajamos, en voz alta." />
      <div style={{ marginTop: w < BP.sm ? 36 : 64, display: "grid", gridTemplateColumns: w < BP.sm ? "1fr" : "120px 1fr", gap: 32 }}>
        <div />
        <div style={{
          fontFamily: "var(--display)", fontWeight: 600,
          fontSize: "clamp(28px, 3.4vw, 48px)", lineHeight: 1.12,
          letterSpacing: "-0.025em", maxWidth: "22ch",
          textWrap: "pretty",
        }}>
          <span style={{ color: "var(--muted)" }}>No vendemos servicios sueltos. </span>
          Diseñamos producto, asesoramos al comité y construimos marca <em style={{ fontWeight: 500 }}>desde la misma mesa</em>, con el mismo idioma y la misma obsesión por el detalle. <span style={{ color: "var(--accent)" }}>Branthia es el hub</span> donde esas tres conversaciones por fin se sientan juntas.
        </div>
      </div>

      <div style={{ marginTop: w < BP.sm ? 40 : 80, display: "grid", gridTemplateColumns: w < BP.sm ? "1fr" : w < BP.md ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: w < BP.sm ? 28 : 20, borderTop: "1px solid var(--line)", paddingTop: w < BP.sm ? 28 : 32 }}>
        {[
          ["Despacio", "Construimos cimientos que sobreviven al modelo de turno, no al hype de este trimestre."],
          ["Vertical", "Nicho profundo antes que mercado ancho. Athria y Cohexia hablan el idioma de su gente."],
          ["Tipográfico", "El sistema antes que la decoración. Si la tipografía no aguanta, nada aguanta."],
          ["Compuesto", "Un solo equipo, tres acentos. Producto, consultoría y marca, sin handoffs."],
        ].map(([h, b]) => (
          <div key={h}>
            <div style={{ fontFamily: "var(--display)", fontWeight: 900, fontSize: 32, letterSpacing: "-0.03em" }}>
              {h}<span style={{ color: "var(--accent)" }}>.</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.5, marginTop: 10, color: "var(--muted)" }}>{b}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// CTA / Contact
// ---------------------------------------------------------------------------
const TIPOS_PROYECTO = ["Consultoría IA", "Producto", "Marca", "Otro"];

function Contact() {
  const w = useW();
  const sm = w < BP.sm;
  const [f, setF] = useState({ nombre: "", email: "", empresa: "", tipo: "", mensaje: "", consent: false, website: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error
  const [err, setErr] = useState("");

  const set = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setF((s) => ({ ...s, [k]: v }));
  };

  async function submit(e) {
    e.preventDefault();
    setErr("");
    if (!f.nombre.trim() || !f.email.trim() || !f.mensaje.trim()) { setErr("Completa nombre, email y mensaje."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) { setErr("Revisa el email."); return; }
    if (!f.consent) { setErr("Necesitamos tu consentimiento para responderte."); return; }
    setStatus("sending");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      if (!r.ok) throw new Error("bad");
      setStatus("ok");
    } catch (_) {
      setStatus("error");
      setErr("No se pudo enviar. Escríbenos a hola@branthia.com.");
    }
  }

  const inputBase = {
    width: "100%", background: "transparent", border: "none",
    borderBottom: "1px solid var(--line)", padding: "10px 0",
    fontFamily: "var(--display)", fontSize: 18, color: "var(--fg)",
    outline: "none", transition: "border-color .2s", borderRadius: 0,
  };
  const focusOn = (e) => { e.target.style.borderBottomColor = "var(--fg)"; };
  const focusOff = (e) => { e.target.style.borderBottomColor = "var(--line)"; };

  // Helpers que devuelven <input>/<textarea> directamente (no subcomponentes),
  // para no remontar el campo en cada tecla y perder el foco.
  const field = (k, { type = "text", placeholder = "" } = {}) => (
    <input type={type} value={f[k]} onChange={set(k)} placeholder={placeholder}
      autoComplete={k === "email" ? "email" : k === "nombre" ? "name" : k === "empresa" ? "organization" : "off"}
      onFocus={focusOn} onBlur={focusOff} style={inputBase} />
  );
  const label = (t) => <Mono style={{ color: "var(--muted)", display: "block", marginBottom: 6 }}>{t}</Mono>;

  return (
    <section id="contacto" style={{ padding: sm ? "60px 20px 48px" : "140px 28px 72px", borderTop: "1px solid var(--line)" }}>
      <div style={{ display: "grid", gridTemplateColumns: sm ? "1fr" : "120px 1fr", gap: sm ? 10 : 32 }}>
        <Mono style={{ color: "var(--muted)" }}>§ VI — Contacto</Mono>
        <div>
          <h2 style={{
            fontFamily: "var(--display)", fontWeight: 900,
            fontSize: "clamp(56px, 11vw, 200px)", lineHeight: 0.86,
            letterSpacing: "-0.055em", margin: 0,
          }}>
            Hablemos<span style={{ color: "var(--accent)" }}>.</span>
          </h2>
          <p style={{ marginTop: sm ? 18 : 24, fontSize: 16, lineHeight: 1.5, color: "var(--muted)", maxWidth: 520 }}>
            Cuéntanos qué quieres construir. Leemos todo y respondemos en <span style={{ color: "var(--fg)" }}>24–48 h</span>.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: w < BP.md ? "1fr" : "1.15fr 0.85fr", gap: sm ? 44 : 64, marginTop: sm ? 40 : 64 }}>
            {/* ---- Formulario ---- */}
            <div>
              <Mono style={{ color: "var(--muted)", fontSize: 14, display: "block", marginBottom: sm ? 22 : 28 }}>Escríbenos</Mono>
              {status === "ok" ? (
                <div style={{ borderTop: "1px solid var(--line)", paddingTop: 32 }}>
                  <div style={{ fontFamily: "var(--display)", fontWeight: 900, fontSize: "clamp(32px, 4vw, 52px)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                    Gracias<span style={{ color: "var(--accent)" }}>.</span>
                  </div>
                  <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.5, color: "var(--muted)", maxWidth: 420 }}>
                    Mensaje recibido. Te respondemos a <span style={{ color: "var(--fg)" }}>{f.email}</span> en 24–48 h.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  {/* honeypot anti-spam (oculto) */}
                  <input type="text" name="website" value={f.website} onChange={set("website")}
                    tabIndex={-1} autoComplete="off" aria-hidden="true"
                    style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />

                  <div style={{ display: "grid", gridTemplateColumns: sm ? "1fr" : "1fr 1fr", gap: sm ? 24 : 24 }}>
                    <div>{label("Nombre *")}{field("nombre", { placeholder: "Tu nombre" })}</div>
                    <div>{label("Email *")}{field("email", { type: "email", placeholder: "tu@empresa.com" })}</div>
                  </div>

                  <div style={{ marginTop: 24 }}>{label("Empresa")}{field("empresa", { placeholder: "Opcional" })}</div>

                  <div style={{ marginTop: 28 }}>
                    {label("Tipo de proyecto")}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                      {TIPOS_PROYECTO.map((t) => {
                        const on = f.tipo === t;
                        return (
                          <button type="button" key={t} onClick={() => setF((s) => ({ ...s, tipo: on ? "" : t }))}
                            style={{
                              fontFamily: "var(--display)", fontSize: 14, fontWeight: 600,
                              padding: "8px 14px", borderRadius: 999, cursor: "pointer",
                              border: `1px solid ${on ? "var(--fg)" : "var(--line)"}`,
                              background: on ? "var(--fg)" : "transparent",
                              color: on ? "var(--bg)" : "var(--fg)",
                              transition: "all .18s",
                            }}>
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ marginTop: 28 }}>
                    {label("Mensaje *")}
                    <textarea value={f.mensaje} onChange={set("mensaje")} rows={sm ? 4 : 3}
                      placeholder="Qué quieres resolver, en qué plazo…"
                      onFocus={focusOn} onBlur={focusOff}
                      style={{ ...inputBase, fontFamily: "var(--display)", fontSize: 18, resize: "vertical", lineHeight: 1.4 }} />
                  </div>

                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: 24, cursor: "pointer", fontSize: 13, lineHeight: 1.5, color: "var(--muted)" }}>
                    <input type="checkbox" checked={f.consent} onChange={set("consent")}
                      style={{ marginTop: 2, width: 16, height: 16, accentColor: "var(--fg)", flexShrink: 0 }} />
                    <span>Acepto que Branthia trate mis datos para responder a esta consulta. Ver la <a href="/privacidad" style={{ color: "var(--fg)" }}>política de privacidad</a>.</span>
                  </label>

                  {err && <div style={{ marginTop: 18, fontSize: 13, color: "var(--accent)", fontWeight: 600 }}>{err}</div>}

                  <button type="submit" disabled={status === "sending"}
                    style={{
                      marginTop: 28, width: sm ? "100%" : "auto",
                      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                      border: "1px solid var(--fg)", background: "var(--fg)", color: "var(--bg)",
                      padding: "14px 28px", borderRadius: 999, cursor: status === "sending" ? "default" : "pointer",
                      fontFamily: "var(--display)", fontSize: 16, fontWeight: 600,
                      opacity: status === "sending" ? 0.6 : 1, transition: "opacity .2s",
                    }}>
                    {status === "sending" ? "Enviando…" : "Enviar mensaje"} <span style={{ color: "var(--accent)" }}>→</span>
                  </button>
                </form>
              )}
            </div>

            {/* ---- Directo ---- */}
            <div style={{
              borderTop: w < BP.md ? "1px solid var(--line)" : "none",
              borderLeft: w < BP.md ? "none" : "1px solid var(--line)",
              paddingTop: w < BP.md ? 36 : 2,
              paddingLeft: w < BP.md ? 0 : 40,
            }}>
              <Mono style={{ color: "var(--muted)", fontSize: 14, display: "block" }}>Directo</Mono>
              <a href="mailto:hola@branthia.com" style={{
                display: "inline-block", marginTop: 8,
                fontFamily: "var(--display)", fontWeight: 700,
                fontSize: "clamp(22px, 2.4vw, 30px)", letterSpacing: "-0.02em",
                color: "var(--fg)", textDecoration: "none",
                borderBottom: "2px solid var(--line)", paddingBottom: 4,
              }}>
                hola@branthia.com
              </a>
              <div style={{ marginTop: 14, fontSize: 14, color: "var(--muted)", maxWidth: 360 }}>
                Para nuevos proyectos, prensa o conversaciones que aún no tienen nombre.
              </div>

              <div style={{ marginTop: 32 }}>
                {label("Marcas")}
                <div style={{ marginTop: 6, display: "flex", flexDirection: "column" }}>
                  {[
                    ["Athria", "athria.com", "Clubes de atletismo"],
                    ["Cohexia", "cohexia.com", "PRM moderno"],
                  ].map(([name, url, sub]) => (
                    <a key={name} href={`https://${url}`} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "14px 0", borderTop: "1px solid var(--line)",
                      color: "var(--fg)", textDecoration: "none",
                    }}>
                      <div>
                        <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 22, letterSpacing: "-0.025em" }}>{name}<span style={{ color: "var(--accent)" }}>.</span></div>
                        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{sub}</div>
                      </div>
                      <Mono style={{ color: "var(--muted)" }}>↗</Mono>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
function Footer() {
  return (
    <footer style={{ padding: "60px 28px 28px", borderTop: "1px solid var(--line)" }}>
      <BranthiaLogo
        title="Branthia"
        height="auto"
        style={{ width: "40%", height: "auto", color: "var(--fg)" }}
      />
      <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, fontSize: 13, color: "var(--muted)" }}>
        <div>© MMXXVI Branthia Origin, S.L. — Vilanova i la Geltrú · ES</div>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="#" style={{ color: "var(--muted)", textDecoration: "none" }}>LinkedIn</a>
          <a href="#" style={{ color: "var(--muted)", textDecoration: "none" }}>Instagram</a>
          <a href="/privacidad" style={{ color: "var(--muted)", textDecoration: "none" }}>Privacidad</a>
          <a href="/cookies" style={{ color: "var(--muted)", textDecoration: "none" }}>Cookies</a>
          <a href="/legal" style={{ color: "var(--muted)", textDecoration: "none" }}>Aviso legal</a>
        </div>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const theme = THEMES[t.theme] || THEMES.paper;
  const accent = ACCENTS[t.accent] || ACCENTS.ink;
  const display = FONT_STACKS[t.displayFont] || FONT_STACKS.satoshi;

  return (
    <div style={{
      "--bg": theme.bg,
      "--fg": theme.fg,
      "--muted": theme.muted,
      "--line": theme.line,
      "--chip": theme.chip,
      "--accent": accent.c === "#0A0A0A" && t.theme === "ink" ? "#F1ECE2" : accent.c,
      "--display": display,
      background: theme.bg,
      color: theme.fg,
      fontFamily: `"Satoshi", "Inter", system-ui, sans-serif`,
      minHeight: "100vh",
    }}>
      <Nav />
      <Hero heroMode={t.heroMode} iaThread={t.iaThread} />
      {t.marquee && <Marquee />}
      <Territorios />
      <IAAplicada />
      <Hub />
      <Clientes />
      <Manifesto />
      <Contact />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Tema">
          <TweakRadio
            label="Fondo"
            value={t.theme}
            options={[
              { value: "paper", label: "Paper" },
              { value: "ink", label: "Ink" },
              { value: "bone", label: "Bone" },
            ]}
            onChange={(v) => setTweak("theme", v)}
          />
          <TweakColor
            label="Acento"
            value={ACCENTS[t.accent]?.c}
            options={Object.values(ACCENTS).map(a => a.c)}
            onChange={(hex) => {
              const k = Object.keys(ACCENTS).find(k => ACCENTS[k].c === hex) || "ink";
              setTweak("accent", k);
            }}
          />
        </TweakSection>

        <TweakSection label="Hero">
          <TweakRadio
            label="Modo"
            value={t.heroMode}
            options={[
              { value: "wordmark", label: "Wordmark" },
              { value: "manifesto", label: "Manifesto" },
              { value: "split", label: "Split" },
            ]}
            onChange={(v) => setTweak("heroMode", v)}
          />
          <TweakRadio
            label="Hilo IA"
            value={t.iaThread}
            options={[
              { value: "rotador", label: "Rotador" },
              { value: "espina", label: "Espina" },
              { value: "sello", label: "Sello" },
              { value: "ecuacion", label: "Ecuación" },
              { value: "blend", label: "Interferencia" },
            ]}
            onChange={(v) => setTweak("iaThread", v)}
          />
          <TweakToggle label="Marquee" value={t.marquee} onChange={(v) => setTweak("marquee", v)} />
        </TweakSection>

        <TweakSection label="Tipografía">
          <TweakRadio
            label="Display"
            value={t.displayFont}
            options={[
              { value: "satoshi", label: "Satoshi" },
              { value: "general", label: "General" },
            ]}
            onChange={(v) => setTweak("displayFont", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}


export default App;
