/* global React, ReactDOM */
// Páginas legales (Aviso legal, Privacidad, Cookies). Un solo motor; cada HTML
// fija window.__LEGAL = 'aviso' | 'privacidad' | 'cookies'. Reutiliza logo.jsx.
//
// ⚠ Textos: plantilla sólida pero conviene una revisión legal antes de publicar.
// ⚠ Datos de inscripción en el Registro Mercantil pendientes (sociedad en constitución).

const T = {
  bg: "#F1ECE2", fg: "#0A0A0A",
  muted: "rgba(10,10,10,0.55)", line: "rgba(10,10,10,0.18)", chip: "rgba(10,10,10,0.06)",
  accent: "#0A0A0A", display: `"Satoshi", "Inter", system-ui, sans-serif`,
};

const EMPRESA = {
  nombre: "Branthia Origin, S.L.",
  cif: "B-93818656",
  domicilio: "Pere Jacas, 15, 08800 Vilanova i la Geltrú, Barcelona",
  email: "hola@branthia.com",
  web: "branthia.com",
  registro: "Registro Mercantil de Barcelona (datos de inscripción pendientes de constitución)",
  actualizado: "16 de julio de 2026",
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

function Nav() {
  const w = useW();
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: w < BP.sm ? "16px 20px" : "22px 28px", color: "var(--fg)", background: "var(--bg)",
      borderBottom: "1px solid var(--line)",
    }}>
      <a href="Home.html" aria-label="Branthia — inicio" style={{ color: "inherit", display: "flex", alignItems: "center" }}>
        <window.BranthiaLogo height={22} />
      </a>
      {w >= BP.md && (
        <nav style={{ display: "flex", gap: 28 }}>
          {NAV.map(([l, h]) => (
            <a key={l} href={h} style={{ color: "inherit", textDecoration: "none", fontSize: 14, fontWeight: 500, opacity: 0.78 }}>{l}</a>
          ))}
        </nav>
      )}
      <a href="Home.html#contacto" style={{
        color: "var(--bg)", background: "var(--fg)", textDecoration: "none",
        padding: "10px 18px", borderRadius: 999, fontSize: 14, fontWeight: 600,
        display: "inline-flex", alignItems: "center", gap: 10,
      }}>
        Empezar<span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--accent)" }} />
      </a>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "60px 28px 28px", borderTop: "1px solid var(--line)" }}>
      <window.BranthiaLogo title="Branthia" height="auto" style={{ width: "40%", height: "auto", color: "var(--fg)" }} />
      <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, fontSize: 13, color: "var(--muted)" }}>
        <div>© MMXXVI {EMPRESA.nombre} — Vilanova i la Geltrú · ES</div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <a href="Home.html" style={{ color: "var(--muted)", textDecoration: "none" }}>Inicio</a>
          <a href="Privacidad.html" style={{ color: "var(--muted)", textDecoration: "none" }}>Privacidad</a>
          <a href="Cookies.html" style={{ color: "var(--muted)", textDecoration: "none" }}>Cookies</a>
          <a href="Legal.html" style={{ color: "var(--muted)", textDecoration: "none" }}>Aviso legal</a>
        </div>
      </div>
    </footer>
  );
}

// ── Render helpers ───────────────────────────────────────────────────────────
const P = ({ children }) => (
  <p style={{ fontSize: 16, lineHeight: 1.65, margin: "0 0 16px", color: "var(--fg)", maxWidth: 760 }}>{children}</p>
);
const UL = ({ items }) => (
  <ul style={{ margin: "0 0 16px", paddingLeft: 20, maxWidth: 760 }}>
    {items.map((it, i) => (
      <li key={i} style={{ fontSize: 16, lineHeight: 1.65, marginBottom: 6, color: "var(--fg)" }}>{it}</li>
    ))}
  </ul>
);
function Section({ n, title, children }) {
  return (
    <section style={{ padding: "0 0 34px" }}>
      <h2 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: "clamp(21px, 2.1vw, 28px)", letterSpacing: "-0.02em", margin: "0 0 14px" }}>
        <span style={{ color: "var(--muted)" }}>{n}. </span>{title}
      </h2>
      {children}
    </section>
  );
}

// ── Documentos ───────────────────────────────────────────────────────────────
function AvisoLegal() {
  return (
    <>
      <Section n="1" title="Titular del sitio web">
        <P>En cumplimiento del deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de que la titularidad de este sitio web corresponde a:</P>
        <UL items={[
          <span><strong>Denominación:</strong> {EMPRESA.nombre}</span>,
          <span><strong>NIF/CIF:</strong> {EMPRESA.cif}</span>,
          <span><strong>Domicilio:</strong> {EMPRESA.domicilio}</span>,
          <span><strong>Correo electrónico:</strong> {EMPRESA.email}</span>,
          <span><strong>Datos registrales:</strong> {EMPRESA.registro}</span>,
        ]} />
      </Section>
      <Section n="2" title="Objeto">
        <P>El presente Aviso Legal regula el acceso, la navegación y el uso del sitio web {EMPRESA.web} (en adelante, el «Sitio Web»). El acceso y la navegación por el Sitio Web implican la aceptación sin reservas del presente Aviso Legal.</P>
      </Section>
      <Section n="3" title="Condiciones de acceso y uso">
        <P>El usuario se compromete a hacer un uso adecuado y lícito del Sitio Web y de sus contenidos, de conformidad con la legislación aplicable, el presente Aviso Legal, la buena fe y el orden público. Queda prohibido el uso del Sitio Web con fines ilícitos o lesivos, o que de cualquier forma puedan dañar, inutilizar o deteriorar el Sitio Web o impedir su normal utilización.</P>
      </Section>
      <Section n="4" title="Propiedad intelectual e industrial">
        <P>Todos los contenidos del Sitio Web —a título enunciativo, textos, fotografías, gráficos, imágenes, tipografías, iconos, tecnología, software, diseño gráfico y códigos fuente— así como las marcas «Branthia», «Athria», «Cohexia» y los signos distintivos que aparecen, son titularidad de {EMPRESA.nombre} o de terceros que han autorizado su uso, y están protegidos por los derechos de propiedad intelectual e industrial.</P>
        <P>Queda prohibida su reproducción, distribución, comunicación pública, transformación o cualquier otra forma de explotación sin la autorización expresa y por escrito del titular.</P>
      </Section>
      <Section n="5" title="Exención de responsabilidad">
        <P>{EMPRESA.nombre} no se hace responsable de los daños o perjuicios que pudieran derivarse de la falta de disponibilidad o continuidad del Sitio Web, ni de errores en sus contenidos. El Sitio Web puede incluir enlaces a sitios de terceros; {EMPRESA.nombre} no asume responsabilidad alguna sobre sus contenidos ni sobre las prácticas de privacidad de dichos sitios.</P>
      </Section>
      <Section n="6" title="Protección de datos">
        <P>El tratamiento de los datos de carácter personal que se realicen a través del Sitio Web se rige por lo dispuesto en la <a href="Privacidad.html" style={{ color: "var(--fg)" }}>Política de Privacidad</a> y en la <a href="Cookies.html" style={{ color: "var(--fg)" }}>Política de Cookies</a>.</P>
      </Section>
      <Section n="7" title="Legislación aplicable y jurisdicción">
        <P>El presente Aviso Legal se rige por la legislación española. Para la resolución de cualquier controversia que pudiera derivarse del acceso o uso del Sitio Web, las partes se someten a los Juzgados y Tribunales del domicilio del titular, salvo que resulte de aplicación una normativa imperativa distinta, en particular en materia de consumidores y usuarios.</P>
      </Section>
      <Section n="8" title="Modificaciones">
        <P>{EMPRESA.nombre} se reserva el derecho a modificar el presente Aviso Legal en cualquier momento. Los cambios entrarán en vigor desde su publicación en el Sitio Web.</P>
      </Section>
    </>
  );
}

function Privacidad() {
  return (
    <>
      <Section n="1" title="Responsable del tratamiento">
        <UL items={[
          <span><strong>Responsable:</strong> {EMPRESA.nombre}</span>,
          <span><strong>NIF/CIF:</strong> {EMPRESA.cif}</span>,
          <span><strong>Domicilio:</strong> {EMPRESA.domicilio}</span>,
          <span><strong>Correo electrónico:</strong> {EMPRESA.email}</span>,
        ]} />
      </Section>
      <Section n="2" title="Datos que tratamos">
        <P>Tratamos los datos que nos facilitas a través del formulario de contacto o al comunicarte con nosotros por correo electrónico: nombre, dirección de correo electrónico, empresa y el contenido de tu mensaje. Asimismo, tratamos datos de navegación mediante cookies, según se detalla en la <a href="Cookies.html" style={{ color: "var(--fg)" }}>Política de Cookies</a>.</P>
      </Section>
      <Section n="3" title="Finalidad del tratamiento">
        <UL items={[
          "Atender tus solicitudes, consultas o peticiones de información.",
          "Gestionar la relación comercial y, en su caso, la prestación de servicios.",
          "Enviarte comunicaciones sobre nuestros servicios, únicamente si nos has dado tu consentimiento.",
        ]} />
      </Section>
      <Section n="4" title="Base jurídica">
        <P>La base legal para el tratamiento es tu consentimiento (art. 6.1.a RGPD), la ejecución de un contrato o la aplicación de medidas precontractuales a petición tuya (art. 6.1.b RGPD) y el interés legítimo del responsable en responder a tus comunicaciones (art. 6.1.f RGPD).</P>
      </Section>
      <Section n="5" title="Plazo de conservación">
        <P>Conservaremos tus datos mientras se mantenga la relación y, una vez finalizada, durante los plazos legalmente exigidos para atender posibles responsabilidades. Puedes solicitar su supresión en cualquier momento.</P>
      </Section>
      <Section n="6" title="Destinatarios">
        <P>No se cederán datos a terceros salvo obligación legal. Podrán acceder a tus datos los proveedores que prestan servicios a {EMPRESA.nombre} como encargados del tratamiento (por ejemplo, alojamiento, correo electrónico o herramientas de gestión), con los que se han suscrito los correspondientes contratos y garantías.</P>
      </Section>
      <Section n="7" title="Transferencias internacionales">
        <P>Si alguno de nuestros proveedores estuviera ubicado fuera del Espacio Económico Europeo, cualquier transferencia se realizará con las garantías adecuadas previstas en el RGPD (por ejemplo, cláusulas contractuales tipo aprobadas por la Comisión Europea).</P>
      </Section>
      <Section n="8" title="Tus derechos">
        <P>Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de tus datos dirigiéndote a {EMPRESA.email}, indicando el derecho que deseas ejercer. Si consideras que el tratamiento no se ajusta a la normativa, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).</P>
      </Section>
      <Section n="9" title="Seguridad">
        <P>{EMPRESA.nombre} aplica las medidas técnicas y organizativas apropiadas para garantizar un nivel de seguridad adecuado al riesgo y proteger tus datos frente a su pérdida, alteración o acceso no autorizado.</P>
      </Section>
    </>
  );
}

function Cookies() {
  return (
    <>
      <Section n="1" title="¿Qué son las cookies?">
        <P>Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo cuando los visitas. Sirven, entre otras cosas, para que el sitio funcione correctamente, recordar tus preferencias o analizar el uso que se hace de él.</P>
      </Section>
      <Section n="2" title="Tipos de cookies que utilizamos">
        <UL items={[
          <span><strong>Técnicas o necesarias:</strong> imprescindibles para el funcionamiento del Sitio Web. No requieren consentimiento.</span>,
          <span><strong>Analíticas o de medición:</strong> permiten analizar de forma agregada el uso del Sitio Web para mejorarlo. Requieren tu consentimiento.</span>,
          <span><strong>De terceros:</strong> en su caso, servicios externos (por ejemplo, fuentes tipográficas). Requieren tu consentimiento cuando no sean estrictamente necesarias.</span>,
        ]} />
        <P>Actualmente {EMPRESA.web} utiliza únicamente cookies técnicas necesarias. Si en el futuro se incorporan cookies analíticas o de terceros, se solicitará tu consentimiento previo y se detallarán en esta política.</P>
      </Section>
      <Section n="3" title="Relación de cookies">
        <P>Se detallará el listado concreto de cookies (nombre, titular, finalidad y duración) cuando se incorporen servicios de medición o de terceros que las requieran.</P>
      </Section>
      <Section n="4" title="Gestión y desactivación">
        <P>Puedes permitir, bloquear o eliminar las cookies instaladas en tu dispositivo desde la configuración de tu navegador (Chrome, Firefox, Safari, Edge, entre otros). Ten en cuenta que la desactivación de algunas cookies puede afectar al correcto funcionamiento del Sitio Web. Cuando esté disponible, también podrás gestionar tus preferencias desde el panel de configuración de cookies del propio sitio.</P>
      </Section>
      <Section n="5" title="Cambios en la Política de Cookies">
        <P>{EMPRESA.nombre} se reserva el derecho a modificar esta Política de Cookies para adaptarla a nuevos requisitos legales o técnicos. Te recomendamos revisarla periódicamente.</P>
      </Section>
    </>
  );
}

const DOCS = {
  aviso:      { eyebrow: "Legal", title: "Aviso legal.",           Comp: AvisoLegal },
  privacidad: { eyebrow: "Legal", title: "Política de privacidad.", Comp: Privacidad },
  cookies:    { eyebrow: "Legal", title: "Política de cookies.",    Comp: Cookies },
};

function LegalPage() {
  const w = useW();
  const doc = DOCS[window.__LEGAL] || DOCS.aviso;
  const { eyebrow, title, Comp } = doc;
  return (
    <div style={{
      "--bg": T.bg, "--fg": T.fg, "--muted": T.muted, "--line": T.line,
      "--chip": T.chip, "--accent": T.accent, "--display": T.display,
      background: T.bg, color: T.fg, minHeight: "100vh", fontFamily: T.display,
    }}>
      <Nav />
      <main style={{ padding: w < BP.sm ? "120px 20px 40px" : "150px 28px 40px", maxWidth: 900, margin: "0 auto" }}>
        <Mono style={{ color: "var(--muted)" }}>{eyebrow}</Mono>
        <h1 style={{
          fontFamily: "var(--display)", fontWeight: 900,
          fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 0.92,
          letterSpacing: "-0.04em", margin: "14px 0 10px",
        }}>{title}</h1>
        <Mono style={{ color: "var(--muted)", display: "inline-block", marginBottom: 44 }}>
          Última actualización · {EMPRESA.actualizado}
        </Mono>
        <Comp />
      </main>
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<LegalPage />);
