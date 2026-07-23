import React from "react";
import { BranthiaLogo } from "./Logo.jsx";

// Páginas legales (Aviso legal, Privacidad, Cookies). Un solo motor;
// recibe la prop `doc` = 'aviso' | 'privacidad' | 'cookies'. Reutiliza Logo.jsx.
//
// Los tres documentos están en su versión definitiva v1.0: Aviso legal
// (22/07/2026), Privacidad y Cookies (23/07/2026), con datos registrales
// completos. La declaración de cookies del §5 la genera Cookiebot al vuelo.

const T = {
  bg: "#F1ECE2", fg: "#0A0A0A",
  muted: "rgba(10,10,10,0.55)", line: "rgba(10,10,10,0.18)", chip: "rgba(10,10,10,0.06)",
  accent: "#0A0A0A", display: `"Satoshi", "Inter", system-ui, sans-serif`,
};

const EMPRESA = {
  nombre: "Branthia Origin, S.L.",
  cif: "B93818656",
  forma: "Sociedad de responsabilidad limitada",
  domicilio: "C/ Pere Jacas, 15, 4.º 3.ª, 08800 Vilanova i la Geltrú, Barcelona",
  email: "hola@branthia.com",
  web: "branthia.com",
  registroMercantil: "Barcelona",
  hoja: "660931",
  euid: "ES08005.000752391",
  actualizado: "16 de julio de 2026",
};

// Enlace de correo reutilizable.
const Mail = () => (
  <a href={`mailto:${EMPRESA.email}`} style={{ color: "var(--fg)" }}>{EMPRESA.email}</a>
);

const Mono = ({ children, style }) => (
  <span style={{
    fontFamily: '"JetBrains Mono", ui-monospace, monospace', letterSpacing: "0.04em",
    fontSize: 11, textTransform: "uppercase", ...style,
  }}>{children}</span>
);

function useW() {
  const [w, setW] = React.useState(1280);
  React.useEffect(() => {
    const on = () => setW(window.innerWidth);
    on(); // fija el ancho real ya hidratado
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return w;
}
const BP = { sm: 640, md: 1024 };

const NAV = [
  ["Servicios", "/#territorios"],
  ["IA", "/#ia"],
  ["Estudio", "/estudio"],
  ["Soluciones", "/#hub"],
  ["Clientes", "/#clientes"],
  ["Manifesto", "/#manifesto"],
  ["Contacto", "/#contacto"],
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
        padding: mobile ? "16px 20px" : "22px 28px", color: "var(--fg)", background: "var(--bg)",
        borderBottom: "1px solid var(--line)",
      }}>
        <a href="/" aria-label="Branthia — inicio" style={{ color: "inherit", display: "flex", alignItems: "center" }}>
          <BranthiaLogo height={22} />
        </a>
        {!mobile && (
          <nav style={{ display: "flex", gap: 28 }}>
            {NAV.map(([l, h]) => (
              <a key={l} href={h} style={{ color: "inherit", textDecoration: "none", fontSize: 14, fontWeight: 500, opacity: 0.78 }}>{l}</a>
            ))}
          </nav>
        )}
        {mobile ? (
          <button onClick={() => setMenuOpen(true)} aria-label="Abrir menú" style={{ appearance: "none", border: "none", background: "transparent", color: "inherit", display: "flex", flexDirection: "column", gap: 5, padding: 6, cursor: "pointer" }}>
            <span style={{ width: 24, height: 2, background: "currentColor", display: "block" }} />
            <span style={{ width: 24, height: 2, background: "currentColor", display: "block" }} />
          </button>
        ) : (
          <a href="/#contacto" style={{ color: "var(--bg)", background: "var(--fg)", textDecoration: "none", padding: "10px 18px", borderRadius: 999, fontSize: 14, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 10 }}>
            Empezar<span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--accent)" }} />
          </a>
        )}
      </header>

      {mobile && menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "var(--bg)", color: "var(--fg)", display: "flex", flexDirection: "column", padding: "16px 20px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <BranthiaLogo height={22} />
            <button onClick={() => setMenuOpen(false)} aria-label="Cerrar menú" style={{ appearance: "none", border: "none", background: "transparent", color: "inherit", fontSize: 26, lineHeight: 1, cursor: "pointer", padding: 6 }}>✕</button>
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: 2, margin: "auto 0" }}>
            {NAV.map(([l, h]) => (
              <a key={l} href={h} onClick={() => setMenuOpen(false)} style={{ color: "inherit", textDecoration: "none", fontFamily: "var(--display)", fontWeight: 800, fontSize: "clamp(32px, 8.5vw, 52px)", letterSpacing: "-0.03em", lineHeight: 1.12, padding: "6px 0" }}>{l}<span style={{ color: "var(--accent)" }}>.</span></a>
            ))}
          </nav>
          <a href="/#contacto" onClick={() => setMenuOpen(false)} style={{ color: "var(--bg)", background: "var(--fg)", textDecoration: "none", padding: "16px 22px", borderRadius: 999, fontSize: 16, fontWeight: 600, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
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
      <BranthiaLogo title="Branthia" height="auto" style={{ width: "40%", height: "auto", color: "var(--fg)" }} />
      <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, fontSize: 13, color: "var(--muted)" }}>
        <div>© MMXXVI {EMPRESA.nombre} — Vilanova i la Geltrú · ES</div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <a href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Inicio</a>
          <a href="/privacidad" style={{ color: "var(--muted)", textDecoration: "none" }}>Privacidad</a>
          <a href="/cookies" style={{ color: "var(--muted)", textDecoration: "none" }}>Cookies</a>
          <a href="/legal" style={{ color: "var(--muted)", textDecoration: "none" }}>Aviso legal</a>
        </div>
      </div>
    </footer>
  );
}

// ── Render helpers ───────────────────────────────────────────────────────────
const P = ({ children, style }) => (
  <p style={{ fontSize: 16, lineHeight: 1.65, margin: "0 0 16px", color: "var(--fg)", maxWidth: 760, ...style }}>{children}</p>
);
const UL = ({ items }) => (
  <ul style={{ margin: "0 0 16px", paddingLeft: 20, maxWidth: 760 }}>
    {items.map((it, i) => (
      <li key={i} style={{ fontSize: 16, lineHeight: 1.65, marginBottom: 6, color: "var(--fg)" }}>{it}</li>
    ))}
  </ul>
);
// Subapartado (3.1, 3.2…) y encabezados sin numerar (proveedores).
function Sub({ n, title, children }) {
  return (
    <div style={{ padding: "0 0 22px" }}>
      <h3 style={{
        fontFamily: "var(--display)", fontWeight: 700,
        fontSize: "clamp(17px, 1.5vw, 20px)", letterSpacing: "-0.015em", margin: "0 0 10px",
      }}>
        {n && <span style={{ color: "var(--muted)" }}>{n}. </span>}{title}
      </h3>
      {children}
    </div>
  );
}

// Cookiebot: identificador detectado en el contenedor de GTM en producción.
const CBID = "59741f26-2b70-4244-a9d2-616253e06b14";

// Declaración dinámica de cookies (§5). Cookiebot la genera al vuelo, así que
// hay que inyectar el <script>: React no ejecuta scripts vía JSX.
function CookieDeclaration() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const host = ref.current;
    if (!host || host.querySelector("script")) return;
    const s = document.createElement("script");
    s.id = "CookieDeclaration";
    s.src = `https://consent.cookiebot.com/${CBID}/cd.js`;
    s.type = "text/javascript";
    s.async = true;
    host.appendChild(s);
  }, []);
  return <div ref={ref} style={{ margin: "0 0 16px", maxWidth: 760 }} />;
}

// Reapertura del panel de Cookiebot (§9), para modificar o retirar la elección.
function ConfigurarCookies() {
  return (
    <button
      type="button"
      onClick={() => window.Cookiebot && window.Cookiebot.renew()}
      style={{
        appearance: "none", cursor: "pointer",
        fontFamily: "var(--display)", fontSize: 15, fontWeight: 600,
        color: "var(--bg)", background: "var(--fg)", border: "1px solid var(--fg)",
        padding: "11px 20px", borderRadius: 999, margin: "4px 0 20px",
      }}
    >
      Configurar cookies
    </button>
  );
}

// Párrafo con etiqueta en negrita ("Base jurídica: …").
const PL = ({ label, children }) => (
  <P><strong>{label}:</strong> {children}</P>
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
        <P>En cumplimiento de la normativa aplicable a los servicios de la sociedad de la información, se informa de que el titular del sitio web {EMPRESA.web}, en adelante, el “Sitio Web”, es:</P>
        <UL items={[
          <span><strong>Denominación social:</strong> {EMPRESA.nombre}</span>,
          <span><strong>NIF:</strong> {EMPRESA.cif}.</span>,
          <span><strong>Forma jurídica:</strong> sociedad de responsabilidad limitada.</span>,
          <span><strong>Domicilio social:</strong> {EMPRESA.domicilio}.</span>,
          <span><strong>Correo electrónico:</strong> <Mail />.</span>,
          <span><strong>Registro Mercantil:</strong> {EMPRESA.registroMercantil}.</span>,
          <span><strong>Hoja social:</strong> {EMPRESA.hoja}.</span>,
          <span><strong>EUID:</strong> {EMPRESA.euid}.</span>,
        ]} />
        <P>En adelante, “Branthia”.</P>
      </Section>

      <Section n="2" title="Objeto y alcance">
        <P>Este Aviso Legal regula el acceso, la navegación y el uso del Sitio Web.</P>
        <P>El Sitio Web proporciona información corporativa y profesional sobre Branthia, sus servicios, proyectos, productos e iniciativas vinculadas a la consultoría, la estrategia, el producto digital, el software, la inteligencia artificial, la marca y el negocio digital.</P>
        <P>El Sitio Web también permite contactar con Branthia para formular consultas, solicitar información o plantear posibles proyectos y colaboraciones.</P>
        <P>La información publicada tiene carácter general e informativo. Salvo que se indique expresamente lo contrario, no constituye una oferta contractual vinculante, una garantía de disponibilidad de servicios ni un compromiso de alcanzar resultados concretos.</P>
        <P>El envío de una consulta mediante el formulario de contacto o por correo electrónico no supone por sí mismo la contratación de ningún servicio. Cuando proceda, la relación profesional se regulará mediante la correspondiente propuesta, pedido, contrato o condiciones particulares.</P>
        <P>La mera navegación por el Sitio Web no implica la celebración de un contrato de prestación de servicios con Branthia.</P>
      </Section>

      <Section n="3" title="Acceso y uso del Sitio Web">
        <P>El acceso al Sitio Web es, con carácter general, libre y gratuito, sin perjuicio del coste de conexión que pueda aplicar el proveedor de telecomunicaciones del usuario.</P>
        <P>La persona usuaria se compromete a utilizar el Sitio Web de forma lícita, diligente, responsable y conforme a la buena fe, el orden público, este Aviso Legal y la normativa aplicable.</P>
        <P>No está permitido:</P>
        <UL items={[
          "Utilizar el Sitio Web con fines ilícitos, fraudulentos, abusivos o lesivos.",
          "Intentar acceder sin autorización a sistemas, cuentas, servidores, código, bases de datos o información.",
          "Introducir malware, código dañino o cualquier elemento que pueda afectar a la seguridad o al funcionamiento del Sitio Web.",
          "Interferir, sobrecargar, deteriorar o impedir el funcionamiento normal del Sitio Web.",
          "Utilizar sistemas automatizados para extraer contenidos de forma masiva o abusiva.",
          "Suplantar la identidad de otra persona o facilitar deliberadamente información falsa.",
          "Utilizar el formulario de contacto para enviar comunicaciones automatizadas, fraudulentas, ofensivas o no solicitadas.",
          "Utilizar los contenidos de manera que vulnere derechos de Branthia o de terceros.",
        ]} />
        <P>Branthia podrá adoptar medidas técnicas y organizativas razonables para prevenir, detectar o impedir usos abusivos, fraudulentos o contrarios a estas condiciones.</P>
      </Section>

      <Section n="4" title="Información sobre servicios, proyectos y resultados">
        <P>Branthia procura que la información publicada sea clara, adecuada y esté actualizada. No obstante, los contenidos pueden modificarse como consecuencia de cambios técnicos, comerciales, normativos o relacionados con el desarrollo de sus servicios, productos o iniciativas.</P>
        <P>Las descripciones de servicios, funcionalidades, tecnologías, experiencias, proyectos, sectores, casos o resultados tienen una finalidad informativa y contextual.</P>
        <P>Las cifras, métricas o resultados publicados no implican que todos los proyectos futuros vayan a obtener resultados iguales o equivalentes.</P>
        <P>Los resultados de los servicios de consultoría, estrategia, diseño, software, inteligencia artificial, marketing o desarrollo de producto pueden depender, entre otros factores, de:</P>
        <UL items={[
          "El alcance y las condiciones del proyecto.",
          "La calidad y disponibilidad de los datos.",
          "Los sistemas y recursos del cliente.",
          "Las decisiones adoptadas por el cliente.",
          "La colaboración de terceros.",
          "La implementación efectiva de las recomendaciones.",
          "Las condiciones del mercado o del sector.",
        ]} />
        <P>El contenido general del Sitio Web no sustituye un análisis profesional adaptado a las circunstancias concretas de cada organización, actividad o proyecto.</P>
      </Section>

      <Section n="5" title="Propiedad intelectual e industrial">
        <P>Los contenidos y elementos que integran el Sitio Web, incluidos, entre otros, los textos, diseños, imágenes, gráficos, iconos, vídeos, interfaces, estructura, software, código, marcas, logotipos y nombres comerciales, pueden estar protegidos por la normativa de propiedad intelectual, propiedad industrial y competencia desleal.</P>
        <P>Los derechos sobre estos elementos corresponden a Branthia o a sus respectivos titulares, según resulte aplicable.</P>
        <P>El acceso al Sitio Web no concede a la persona usuaria ningún derecho de propiedad, licencia o explotación sobre dichos elementos, salvo el derecho limitado a utilizarlos para navegar y consultar el Sitio Web conforme a su finalidad.</P>
        <P>No está permitida su reproducción, distribución, comunicación pública, transformación, extracción, reutilización, comercialización o explotación sin autorización previa del titular correspondiente, salvo cuando la actuación esté permitida por la normativa aplicable.</P>
        <P>Las marcas, nombres comerciales, logotipos y contenidos pertenecientes a clientes, colaboradores, proveedores u otros terceros siguen siendo propiedad de sus respectivos titulares.</P>
        <P>La aparición de una marca, empresa o producto de terceros en el Sitio Web no implica necesariamente asociación, patrocinio, aprobación o respaldo más allá de la relación que se indique expresamente.</P>
        <P>Las posibles vulneraciones de derechos de propiedad intelectual o industrial pueden comunicarse a <Mail />, identificando el contenido afectado y aportando información suficiente sobre el derecho invocado.</P>
      </Section>

      <Section n="6" title="Enlaces a otros sitios web">
        <P>El Sitio Web puede contener enlaces a páginas, plataformas, productos o recursos externos, incluidos los sitios web correspondientes a Athria y Cohexia.</P>
        <P>Cada sitio de destino se regirá por sus propios avisos legales, políticas de privacidad, políticas de cookies y, en su caso, condiciones de contratación.</P>
        <P>La persona usuaria deberá revisar la documentación legal aplicable al acceder a cada sitio web.</P>
        <P>Cuando un enlace dirija a un sitio operado por un tercero, Branthia no controla necesariamente:</P>
        <UL items={[
          "Sus contenidos.",
          "Su disponibilidad.",
          "Su seguridad.",
          "Sus funcionalidades.",
          "Sus condiciones de contratación.",
          "Sus prácticas de tratamiento de datos.",
        ]} />
        <P>La inclusión de un enlace no implica la aprobación general de todos los contenidos, productos, servicios o prácticas del sitio enlazado.</P>
        <P>Branthia podrá modificar o retirar enlaces y actuará cuando tenga conocimiento efectivo de que un enlace conduce a contenidos ilícitos o lesivos y resulte legalmente procedente intervenir.</P>
      </Section>

      <Section n="7" title="Disponibilidad y seguridad">
        <P>Branthia adopta medidas razonables para mantener el Sitio Web disponible, funcional y seguro.</P>
        <P>No obstante, el acceso podrá interrumpirse o verse afectado temporalmente por:</P>
        <UL items={[
          "Operaciones de mantenimiento.",
          "Actualizaciones.",
          "Incidencias técnicas.",
          "Fallos de proveedores.",
          "Problemas de conectividad.",
          "Causas de seguridad.",
          "Ataques o actuaciones de terceros.",
          "Circunstancias fuera del control razonable de Branthia.",
        ]} />
        <P>Branthia no garantiza que el Sitio Web esté disponible de forma ininterrumpida ni que todos sus contenidos permanezcan permanentemente libres de errores.</P>
        <P>Cuando tenga conocimiento de una incidencia relevante, Branthia procurará analizarla y corregirla dentro de un plazo razonable, atendiendo a su naturaleza, gravedad y medios disponibles.</P>
        <P>La persona usuaria es responsable de utilizar dispositivos, sistemas, navegadores y medidas de seguridad adecuados para acceder a Internet.</P>
        <P>La responsabilidad de Branthia se determinará conforme a la normativa aplicable y a las circunstancias concretas de cada caso.</P>
        <P>Este Aviso Legal no excluye ni limita responsabilidades que no puedan excluirse o limitarse legalmente.</P>
      </Section>

      <Section n="8" title="Formulario de contacto y comunicaciones">
        <P>El Sitio Web puede incluir un formulario para enviar consultas, solicitar información o plantear posibles proyectos.</P>
        <P>La persona usuaria deberá facilitar información veraz, pertinente y actualizada.</P>
        <P>No deben incluirse en el formulario:</P>
        <UL items={[
          "Contraseñas o credenciales de acceso.",
          "Datos bancarios completos.",
          "Información médica o sanitaria.",
          "Categorías especiales de datos personales.",
          "Documentación confidencial.",
          "Información de terceros que no deba comunicarse.",
          "Cualquier otro dato que no sea necesario para responder a la consulta.",
        ]} />
        <P>Las comunicaciones enviadas a través del formulario o del correo electrónico no generan por sí mismas una relación contractual ni obligan a Branthia a aceptar un proyecto, presentar una propuesta o prestar un servicio.</P>
        <P>Las comunicaciones relacionadas con el Sitio Web pueden dirigirse a <Mail />.</P>
      </Section>

      <Section n="9" title="Protección de datos personales">
        <P>El tratamiento de datos personales realizado a través del Sitio Web se regula en la <a href="/privacidad" style={{ color: "var(--fg)" }}>Política de privacidad</a>.</P>
        <P>La Política de privacidad informa, entre otros aspectos, sobre:</P>
        <UL items={[
          "La identidad del responsable.",
          "Las finalidades del tratamiento.",
          "Las bases jurídicas aplicables.",
          "Los proveedores tecnológicos.",
          "Las posibles transferencias internacionales.",
          "Los periodos o criterios de conservación.",
          "Los derechos de las personas interesadas.",
          "Los canales para ejercer dichos derechos.",
        ]} />
        <P>La Política de privacidad deberá permanecer accesible desde el pie de página del Sitio Web y desde los puntos en los que se recojan datos personales.</P>
      </Section>

      <Section n="10" title="Cookies y tecnologías similares">
        <P>El uso de cookies y tecnologías similares se regula en la <a href="/cookies" style={{ color: "var(--fg)" }}>Política de cookies</a>.</P>
        <P>Cuando resulte necesario solicitar el consentimiento de la persona usuaria, se utilizará un mecanismo de configuración que permita aceptar, rechazar o configurar las tecnologías no necesarias.</P>
        <P>La persona usuaria podrá modificar o retirar posteriormente su elección mediante el mecanismo habilitado en el Sitio Web.</P>
      </Section>

      <Section n="11" title="Contratación de servicios">
        <P>La contratación de servicios profesionales no se regula exclusivamente mediante este Aviso Legal.</P>
        <P>Cuando Branthia y un cliente acuerden colaborar, la relación se documentará mediante la correspondiente propuesta, pedido, contrato, condiciones particulares o documento equivalente.</P>
        <P>Dicha documentación podrá regular, entre otras materias:</P>
        <UL items={[
          "El objeto y alcance del servicio.",
          "Las condiciones económicas.",
          "Los plazos.",
          "Las obligaciones de las partes.",
          "La confidencialidad.",
          "La propiedad intelectual.",
          "El tratamiento de datos.",
          "La responsabilidad.",
          "La duración y terminación.",
          "La legislación y jurisdicción aplicables.",
        ]} />
        <P>En caso de contradicción, la documentación contractual específica prevalecerá respecto de la relación profesional concreta.</P>
      </Section>

      <Section n="12" title="Legislación aplicable y resolución de controversias">
        <P>Este Aviso Legal se rige por la legislación española.</P>
        <P>Las controversias relacionadas con el acceso o uso del Sitio Web se someterán a los juzgados y tribunales que resulten competentes conforme a la normativa aplicable.</P>
        <P>Cuando Branthia y un cliente empresarial formalicen un contrato, podrán acordar en dicho contrato la legislación, jurisdicción o mecanismo de resolución de conflictos aplicable a su relación profesional, dentro de los límites permitidos por la normativa aplicable.</P>
      </Section>

      <Section n="13" title="Modificaciones del Aviso Legal">
        <P>Branthia podrá modificar este Aviso Legal cuando resulte necesario para adaptarlo a:</P>
        <UL items={[
          "Cambios normativos.",
          "Cambios corporativos.",
          "Modificaciones técnicas.",
          "Nuevos contenidos o funcionalidades.",
          "Cambios en el funcionamiento del Sitio Web.",
          "Nuevas modalidades de contratación o prestación de servicios.",
        ]} />
        <P>La versión actualizada será aplicable desde su publicación en el Sitio Web.</P>
        <P>La fecha de actualización y, cuando resulte conveniente, el número de versión se indicarán al comienzo del documento.</P>
      </Section>

      <P style={{ color: "var(--muted)" }}>© 2026 {EMPRESA.nombre} Todos los derechos reservados.</P>
    </>
  );
}

function Privacidad() {
  return (
    <>
      <Section n="1" title="Responsable del tratamiento">
        <P>El responsable del tratamiento de los datos personales recogidos o tratados a través de {EMPRESA.web}, en adelante, el “Sitio Web”, es:</P>
        <UL items={[
          <span><strong>Responsable:</strong> {EMPRESA.nombre}</span>,
          <span><strong>NIF:</strong> {EMPRESA.cif}.</span>,
          <span><strong>Domicilio social:</strong> {EMPRESA.domicilio}.</span>,
          <span><strong>Correo electrónico de privacidad:</strong> <Mail />.</span>,
          <span><strong>Registro Mercantil:</strong> {EMPRESA.registroMercantil}.</span>,
          <span><strong>Hoja social:</strong> {EMPRESA.hoja}.</span>,
          <span><strong>EUID:</strong> {EMPRESA.euid}.</span>,
        ]} />
        <P>En adelante, “Branthia”.</P>
        <P>Esta Política de Privacidad explica cómo trata Branthia los datos personales de las personas que:</P>
        <UL items={[
          "Navegan por el Sitio Web.",
          "Envían una consulta mediante el formulario o por correo electrónico.",
          "Solicitan información o una propuesta.",
          "Actúan como contactos de clientes, clientes potenciales, proveedores o colaboradores.",
          "Se relacionan profesionalmente con Branthia.",
        ]} />
      </Section>

      <Section n="2" title="Principios aplicados al tratamiento">
        <P>Branthia tratará los datos personales de forma lícita, leal y transparente.</P>
        <P>Los datos se limitarán a aquellos que resulten adecuados, pertinentes y necesarios para cada finalidad. Branthia procurará mantenerlos actualizados y los conservará únicamente durante los periodos indicados en esta política o durante los plazos que resulten legalmente aplicables.</P>
        <P>Branthia no utilizará los datos recogidos mediante el formulario para finalidades incompatibles con las descritas en esta política.</P>
      </Section>

      <Section n="3" title="Tratamientos realizados">
        <Sub n="3.1" title="Navegación, funcionamiento y seguridad del Sitio Web">
          <P>Cuando una persona accede al Sitio Web, pueden tratarse determinados datos técnicos necesarios para entregar el contenido, mantener el funcionamiento, prevenir abusos y proteger la seguridad.</P>
          <P><strong>Datos tratados:</strong></P>
          <UL items={[
            "Dirección IP.",
            "Fecha y hora de acceso.",
            "Tipo de navegador y dispositivo.",
            "Sistema operativo.",
            "Página o recurso solicitado.",
            "Identificadores técnicos.",
            "Información sobre errores, rendimiento y seguridad.",
            "Datos incluidos en registros técnicos, cuando se generen.",
          ]} />
          <P><strong>Finalidades:</strong></P>
          <UL items={[
            "Mostrar y entregar correctamente el Sitio Web.",
            "Mantener su disponibilidad y funcionamiento.",
            "Detectar errores técnicos.",
            "Prevenir ataques, fraude, abuso o accesos no autorizados.",
            "Investigar incidentes de seguridad.",
            "Proteger los sistemas, usuarios y activos de Branthia.",
          ]} />
          <PL label="Base jurídica">interés legítimo de Branthia en operar, mantener y proteger su Sitio Web y sus sistemas.</PL>
          <PL label="Conservación">los datos técnicos se conservarán durante el periodo estrictamente necesario para prestar el servicio, diagnosticar incidencias y mantener la seguridad. Branthia evitará registrar deliberadamente en los logs el contenido completo de los formularios.</PL>
          <P>Cuando exista un incidente o una investigación de seguridad, los datos estrictamente necesarios podrán conservarse durante un periodo adicional mientras resulte necesario para documentarlo, investigarlo o atender posibles responsabilidades.</P>
        </Sub>

        <Sub n="3.2" title="Formulario de contacto y consultas">
          <P>Cuando una persona utiliza el formulario de contacto, Branthia puede tratar:</P>
          <UL items={[
            "Nombre.",
            "Dirección de correo electrónico.",
            "Empresa u organización.",
            "Tipo de proyecto o servicio solicitado.",
            "Contenido del mensaje.",
            "Información profesional facilitada por la persona.",
            "Datos técnicos asociados al envío.",
          ]} />
          <P><strong>Finalidades:</strong></P>
          <UL items={[
            "Recibir y gestionar la consulta.",
            "Responder a la persona interesada.",
            "Solicitar información adicional.",
            "Valorar la posible prestación de servicios.",
            "Preparar una propuesta, presupuesto o reunión cuando se solicite.",
            "Mantener las comunicaciones relacionadas con la solicitud.",
          ]} />
          <P><strong>Bases jurídicas:</strong></P>
          <UL items={[
            "Aplicación de medidas precontractuales a petición de la persona interesada, cuando la consulta tenga como finalidad solicitar una propuesta, presupuesto o posible contratación.",
            "Interés legítimo de Branthia en atender y responder consultas relacionadas con su actividad, cuando no exista todavía una solicitud precontractual concreta.",
          ]} />
          <P>El interés legítimo se limita a gestionar la comunicación solicitada por la propia persona y no implica su incorporación automática a campañas comerciales.</P>
          <P><strong>Conservación:</strong></P>
          <UL items={[
            "Las consultas que no den lugar a una propuesta, negociación o relación posterior se conservarán durante un máximo de 12 meses desde la última interacción.",
            "Cuando exista una propuesta o negociación, los datos se conservarán durante un máximo de 24 meses desde la última interacción, salvo que se formalice una relación contractual o exista una razón justificada para conservarlos durante más tiempo.",
            "Cuando la consulta dé lugar a una relación contractual, se aplicarán los plazos indicados en el apartado relativo a clientes y relaciones profesionales.",
          ]} />
        </Sub>

        <Sub n="3.3" title="Solicitudes recibidas por correo electrónico">
          <P>Cuando una persona escribe directamente a una dirección de correo de Branthia, se tratarán:</P>
          <UL items={[
            "Su dirección de correo.",
            "Nombre e información incluida en la firma.",
            "Contenido del mensaje.",
            "Documentos o archivos adjuntos.",
            "Información técnica y metadatos asociados al correo.",
            "Correspondencia posterior.",
          ]} />
          <P>Las finalidades, bases jurídicas y periodos de conservación serán los mismos que correspondan según la naturaleza de la comunicación: consulta general, solicitud precontractual, relación profesional o ejercicio de derechos.</P>
          <P>No deben remitirse por correo datos especialmente sensibles o documentación confidencial que no sea necesaria para la finalidad de la comunicación.</P>
        </Sub>

        <Sub n="3.4" title="Clientes, clientes potenciales y contactos profesionales">
          <P>Cuando Branthia inicia o mantiene una relación comercial o profesional, puede tratar:</P>
          <UL items={[
            "Nombre y apellidos.",
            "Cargo o función.",
            "Empresa u organización.",
            "Correo y teléfono profesionales.",
            "Datos incluidos en propuestas y contratos.",
            "Comunicaciones y reuniones.",
            "Información sobre el proyecto.",
            "Datos de facturación y pagos.",
            "Historial de la relación.",
            "Incidencias, solicitudes y decisiones relacionadas con el servicio.",
          ]} />
          <P><strong>Finalidades:</strong></P>
          <UL items={[
            "Gestionar la relación precontractual y contractual.",
            "Preparar propuestas.",
            "Prestar y administrar los servicios.",
            "Gestionar reuniones, entregables y comunicaciones.",
            "Facturar y cobrar los servicios.",
            "Cumplir obligaciones contables, fiscales y mercantiles.",
            "Gestionar incidencias y posibles reclamaciones.",
            "Mantener la relación con las personas de contacto de la organización cliente.",
          ]} />
          <P><strong>Bases jurídicas:</strong></P>
          <UL items={[
            "Aplicación de medidas precontractuales.",
            "Ejecución de un contrato.",
            "Cumplimiento de obligaciones legales.",
            "Interés legítimo en mantener la comunicación con los representantes y contactos profesionales de clientes, proveedores y organizaciones con las que Branthia mantiene una relación.",
          ]} />
          <P><strong>Conservación:</strong></P>
          <UL items={[
            "Durante la vigencia de la relación profesional.",
            "Las comunicaciones ordinarias que no resulte necesario conservar se revisarán y podrán suprimirse transcurridos 24 meses desde la finalización de la relación.",
            "Los contratos, facturas, justificantes y documentación mercantil se conservarán durante los plazos exigidos por la normativa aplicable.",
            "Cuando sea necesario formular, ejercer o defender reclamaciones, la información pertinente podrá conservarse mientras puedan derivarse responsabilidades.",
          ]} />
          <P>Finalizada la relación, los datos podrán mantenerse bloqueados o con acceso restringido cuando resulte necesario cumplir obligaciones legales o atender posibles responsabilidades.</P>
        </Sub>

        <Sub n="3.5" title="Comunicaciones comerciales">
          <P>El envío de una consulta o solicitud mediante el formulario no suscribe automáticamente a la persona a una newsletter ni autoriza el envío de campañas promocionales.</P>
          <P>Cuando Branthia habilite una opción específica para recibir comunicaciones comerciales, estas solo se enviarán cuando exista una base jurídica válida y, en el caso del formulario web, mediante una casilla opcional, específica y desmarcada por defecto.</P>
          <P><strong>Datos tratados:</strong></P>
          <UL items={[
            "Nombre.",
            "Correo electrónico.",
            "Empresa.",
            "Preferencias o consentimiento registrado.",
            "Información sobre la baja u oposición.",
          ]} />
          <PL label="Finalidad">enviar novedades, contenidos, invitaciones o comunicaciones comerciales sobre los servicios y actividades de Branthia.</PL>
          <PL label="Base jurídica">consentimiento de la persona interesada, salvo que resulte aplicable otro supuesto legal específicamente analizado y documentado.</PL>
          <P><strong>Conservación:</strong></P>
          <UL items={[
            "Hasta que se retire el consentimiento o se solicite la baja.",
            "Branthia podrá revisar y eliminar contactos promocionales después de 24 meses sin interacción.",
            "Se conservará la información mínima necesaria en una lista de oposición para impedir nuevos envíos a quien haya solicitado la baja.",
          ]} />
          <P>La retirada del consentimiento no afectará a la licitud de los tratamientos realizados anteriormente.</P>
        </Sub>

        <Sub n="3.6" title="Ejercicio de derechos y consultas sobre privacidad">
          <P>Cuando una persona ejerza sus derechos o formule una consulta sobre privacidad, Branthia tratará:</P>
          <UL items={[
            "Datos identificativos.",
            "Datos de contacto.",
            "Contenido de la solicitud.",
            "Información necesaria para verificar la identidad.",
            "Comunicaciones y documentación relacionada con la respuesta.",
          ]} />
          <PL label="Finalidad">tramitar la solicitud, verificar la identidad cuando sea necesario, responder y conservar evidencia de su gestión.</PL>
          <PL label="Base jurídica">cumplimiento de las obligaciones legales de Branthia.</PL>
          <PL label="Conservación">durante la tramitación de la solicitud y, posteriormente, durante el periodo necesario para acreditar su correcta gestión y atender posibles responsabilidades.</PL>
        </Sub>
      </Section>

      <Section n="4" title="Datos obligatorios y consecuencias de no facilitarlos">
        <P>Los campos marcados como obligatorios en el formulario son necesarios para recibir y responder la consulta.</P>
        <P>La persona interesada no está obligada a proporcionar datos adicionales que no sean necesarios. Sin embargo, si no facilita un medio de contacto válido o la información mínima sobre su solicitud, Branthia puede no ser capaz de responder o preparar una propuesta.</P>
        <P>La persona que facilite datos garantiza que son correctos y que está autorizada para comunicarlos.</P>
      </Section>

      <Section n="5" title="Datos de terceras personas">
        <P>No deben incluirse datos personales de terceros en el formulario, en mensajes o en archivos adjuntos, salvo que sea necesario y exista una base legítima para comunicarlos.</P>
        <P>Cuando una persona facilite datos de otra, deberá asegurarse de que puede hacerlo y de que la persona afectada recibe la información necesaria sobre el tratamiento.</P>
        <P>Branthia podrá solicitar que se elimine o sustituya cualquier información de terceros que no resulte necesaria.</P>
      </Section>

      <Section n="6" title="Categorías especiales de datos">
        <P>El formulario no está diseñado para recoger:</P>
        <UL items={[
          "Datos de salud.",
          "Información genética o biométrica.",
          "Información sobre origen racial o étnico.",
          "Opiniones políticas.",
          "Convicciones religiosas o filosóficas.",
          "Afiliación sindical.",
          "Información sobre vida u orientación sexual.",
          "Contraseñas.",
          "Datos bancarios completos.",
          "Documentación especialmente confidencial.",
        ]} />
        <P>Las personas usuarias deben abstenerse de incluir esta información en el formulario o en correos iniciales.</P>
        <P>Cuando un proyecto requiera posteriormente tratar datos sensibles, confidenciales o pertenecientes a clientes, Branthia realizará un análisis específico de los roles, finalidades, medidas de seguridad y condiciones contractuales antes de recibirlos.</P>
      </Section>

      <Section n="7" title="Procedencia de los datos">
        <P>Normalmente, los datos son facilitados directamente por la persona interesada mediante:</P>
        <UL items={["El formulario.", "El correo electrónico.", "Reuniones.", "Propuestas.", "Contratos.", "Interacciones profesionales."]} />
        <P>En algunos casos, los datos de contacto profesional pueden proceder de:</P>
        <UL items={[
          "La empresa u organización a la que pertenece la persona.",
          "Otro contacto autorizado de dicha organización.",
          "Una presentación o recomendación profesional.",
          "Fuentes profesionales legítimamente accesibles.",
          "Relaciones o comunicaciones previas.",
        ]} />
        <P>Cuando los datos no se obtengan directamente de la persona y resulte legalmente necesario, Branthia facilitará la información correspondiente dentro del plazo aplicable.</P>
      </Section>

      <Section n="8" title="Proveedores y destinatarios">
        <P>Branthia utiliza proveedores tecnológicos que pueden acceder o tratar datos personales para prestar sus servicios.</P>
        <P>En el flujo actual del formulario intervienen:</P>

        <Sub title="Vercel">
          <P>Branthia utiliza Vercel para alojar el Sitio Web y ejecutar la infraestructura técnica que recibe la solicitud del formulario.</P>
          <P>Vercel puede tratar datos técnicos, direcciones IP y la información transmitida a la función encargada de procesar el formulario.</P>
          <P>Branthia utiliza un plan profesional y aplicará medidas para que el contenido completo de las consultas no se registre deliberadamente en logs técnicos.</P>
        </Sub>

        <Sub title="Resend">
          <P>Branthia utiliza Resend, servicio prestado por Plus Five Five, Inc., para enviar el contenido del formulario al buzón corporativo de Branthia.</P>
          <P>Resend puede tratar:</P>
          <UL items={["Direcciones de correo.", "Datos del remitente y destinatario.", "Asunto.", "Contenido del mensaje.", "Metadatos de entrega."]} />
          <P>Branthia utilizará Resend exclusivamente para gestionar el envío del formulario y mantendrá desactivado el seguimiento de aperturas y enlaces mientras no sea necesario para esta finalidad.</P>
          <P>Según la configuración ordinaria del proveedor, los datos asociados a los correos pueden conservarse en Resend durante 30 días.</P>
        </Sub>

        <Sub title="Microsoft 365">
          <P>Branthia utiliza Microsoft 365 para recibir, almacenar y gestionar el correo corporativo y las comunicaciones posteriores.</P>
          <P>Los mensajes enviados mediante el formulario llegan a un buzón corporativo de Microsoft 365, donde se aplican los periodos de conservación establecidos en esta política.</P>
        </Sub>

        <Sub title="Otros destinatarios">
          <P>Los datos también podrán comunicarse:</P>
          <UL items={[
            "A administraciones públicas, autoridades, juzgados o tribunales cuando exista una obligación legal o un requerimiento válido.",
            "A asesores o profesionales cuando sea necesario para atender obligaciones legales o defender reclamaciones, sujetos a las correspondientes obligaciones de confidencialidad.",
            "A otros proveedores cuando resulte necesario para prestar un servicio solicitado, después de analizar su función y las garantías aplicables.",
          ]} />
          <P>Branthia no vende los datos personales de las personas usuarias.</P>
          <P>Los proveedores que actúen por cuenta de Branthia deberán tratar los datos conforme a sus instrucciones, al contrato aplicable y a las obligaciones de confidencialidad y seguridad correspondientes.</P>
        </Sub>
      </Section>

      <Section n="9" title="Transferencias internacionales">
        <P>Algunos proveedores tecnológicos utilizados por Branthia están establecidos en Estados Unidos o utilizan infraestructuras y subencargados situados fuera del Espacio Económico Europeo.</P>
        <P>En particular:</P>
        <UL items={[
          "Vercel puede realizar tratamientos o transferencias internacionales conforme a su contrato de tratamiento de datos.",
          "Resend almacena datos de clientes en Estados Unidos.",
          "Microsoft 365 está sujeto a los compromisos aplicables a sus servicios europeos, aunque determinados datos técnicos, de soporte o necesarios para operar servicios globales pueden ser tratados fuera de la Unión Europea o del Espacio Económico Europeo.",
        ]} />
        <P>Cuando exista una transferencia internacional, Branthia comprobará que se aplique alguno de los mecanismos legalmente reconocidos, como:</P>
        <UL items={[
          "Una decisión de adecuación.",
          "La adhesión válida del proveedor al Marco de Privacidad de Datos UE-EE. UU., cuando resulte aplicable.",
          "Cláusulas contractuales tipo aprobadas por la Comisión Europea.",
          "Medidas contractuales, técnicas u organizativas adicionales cuando sean necesarias.",
        ]} />
        <P>Las personas interesadas pueden solicitar información adicional sobre las garantías aplicables escribiendo a <Mail />.</P>
      </Section>

      <Section n="10" title="Google Analytics y analítica web">
        <P>En la fecha de esta versión, Google Analytics no forma parte del tratamiento descrito como activo en esta política.</P>
        <P>Antes de activar Google Analytics u otra herramienta de medición no estrictamente necesaria, Branthia deberá:</P>
        <UL items={[
          "Configurar un mecanismo válido de consentimiento.",
          "Bloquear la herramienta hasta que la persona acepte.",
          "Permitir aceptar, rechazar y configurar.",
          "Actualizar la Política de Cookies.",
          "Actualizar esta Política de Privacidad.",
          "Determinar la configuración, datos, conservación, destinatarios y transferencias reales.",
        ]} />
        <P>El uso futuro de herramientas analíticas no se entenderá autorizado por la mera navegación por el Sitio Web.</P>
      </Section>

      <Section n="11" title="Cookies y tecnologías similares">
        <P>La información sobre cookies, almacenamiento local, identificadores y tecnologías similares se encuentra en la <a href="/cookies" style={{ color: "var(--fg)" }}>Política de Cookies</a>.</P>
        <P>Las tecnologías no necesarias solo se activarán cuando exista una base válida y, cuando resulte exigible, después de obtener el consentimiento.</P>
        <P>La persona usuaria podrá retirar o modificar su elección mediante el mecanismo habilitado en el Sitio Web.</P>
      </Section>

      <Section n="12" title="Decisiones automatizadas y elaboración de perfiles">
        <P>Branthia no adopta decisiones automatizadas con efectos jurídicos o efectos significativamente similares sobre las personas a partir de los datos enviados mediante el formulario.</P>
        <P>El formulario no se utiliza para evaluar automáticamente la solvencia, idoneidad, comportamiento o características personales de quienes contactan.</P>
        <P>Si esta situación cambia, Branthia realizará el análisis correspondiente y actualizará esta política antes de iniciar el tratamiento.</P>
      </Section>

      <Section n="13" title="Seguridad">
        <P>Branthia aplicará medidas técnicas y organizativas apropiadas atendiendo a la naturaleza de los datos, el contexto, los sistemas utilizados y los riesgos previsibles.</P>
        <P>Estas medidas incluyen, según corresponda:</P>
        <UL items={[
          "Comunicaciones cifradas mediante HTTPS.",
          "Control de accesos.",
          "Autenticación multifactor en cuentas críticas.",
          "Uso de credenciales individuales.",
          "Restricción de privilegios.",
          "Protección de claves y secretos mediante variables de entorno.",
          "Actualización de sistemas y dependencias.",
          "Copias de seguridad.",
          "Medidas contra abuso del formulario.",
          "Validación de datos en el servidor.",
          "Limitación y revisión de logs.",
          "Procedimientos de gestión de incidentes.",
          "Revisión periódica de proveedores y accesos.",
        ]} />
        <P>Ningún sistema puede garantizar una seguridad absoluta. Branthia revisará las medidas cuando cambien los riesgos, proveedores o funcionalidades.</P>
      </Section>

      <Section n="14" title="Derechos de las personas interesadas">
        <P>Las personas interesadas pueden ejercer, cuando proceda, los siguientes derechos:</P>
        <UL items={[
          <span><strong>Acceso:</strong> conocer qué datos trata Branthia y obtener una copia.</span>,
          <span><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</span>,
          <span><strong>Supresión:</strong> solicitar la eliminación de los datos cuando corresponda.</span>,
          <span><strong>Oposición:</strong> oponerse a tratamientos basados en interés legítimo o al marketing directo.</span>,
          <span><strong>Limitación:</strong> solicitar que se restrinja temporalmente el tratamiento.</span>,
          <span><strong>Portabilidad:</strong> recibir determinados datos en un formato estructurado o solicitar su transmisión a otro responsable cuando resulte aplicable.</span>,
          <span><strong>Retirada del consentimiento:</strong> retirar en cualquier momento un consentimiento previamente otorgado.</span>,
          <span><strong>No ser objeto de decisiones exclusivamente automatizadas:</strong> cuando concurran los requisitos legales.</span>,
        ]} />
        <P>Para ejercer estos derechos puede escribirse a <Mail />.</P>
        <P>La solicitud deberá indicar el derecho que se desea ejercer y aportar información suficiente para identificar a la persona solicitante y localizar sus datos.</P>
        <P>Branthia podrá solicitar información adicional cuando existan dudas razonables sobre la identidad, evitando pedir documentación excesiva.</P>
        <P>La persona interesada también puede presentar una reclamación ante la Agencia Española de Protección de Datos si considera que el tratamiento no se ajusta a la normativa aplicable.</P>
      </Section>

      <Section n="15" title="Menores">
        <P>El Sitio Web y los servicios de Branthia están dirigidos a empresas, profesionales y organizaciones.</P>
        <P>Branthia no pretende recoger deliberadamente datos de menores mediante el formulario. Cuando detecte que se han facilitado datos de un menor sin una justificación adecuada, adoptará medidas razonables para eliminarlos.</P>
      </Section>

      <Section n="16" title="Enlaces a Athria, Cohexia y otros sitios">
        <P>El Sitio Web puede contener enlaces a Athria, Cohexia u otros sitios y plataformas.</P>
        <P>Cuando la persona abandona {EMPRESA.web} y accede a otro dominio, el tratamiento realizado en ese sitio se regirá por su propia política de privacidad.</P>
        <P>La documentación legal de cada producto deberá identificar correctamente al responsable, sus tratamientos, proveedores y condiciones.</P>
        <P>Cuando exista intercambio de datos, inicio de sesión común, seguimiento entre dominios o cualquier integración entre Branthia y esos sitios, deberá analizarse específicamente e informarse antes de activarlo.</P>
      </Section>

      <Section n="17" title="Cambios en esta política">
        <P>Branthia podrá actualizar esta Política de Privacidad cuando se produzcan:</P>
        <UL items={[
          "Cambios normativos.",
          "Nuevas finalidades.",
          "Nuevos formularios.",
          "Cambios de proveedores.",
          "Nuevas herramientas de analítica o marketing.",
          "Cambios en las transferencias internacionales.",
          "Nuevos productos o integraciones.",
          "Modificaciones relevantes en la actividad.",
        ]} />
        <P>La versión actualizada será aplicable desde su publicación. Cuando el cambio afecte materialmente a un tratamiento basado en consentimiento, Branthia solicitará una nueva elección cuando resulte necesario.</P>
      </Section>

      <P style={{ color: "var(--muted)" }}>© 2026 {EMPRESA.nombre}</P>
    </>
  );
}

function Cookies() {
  return (
    <>
      <Section n="1" title="Responsable del sitio web">
        <P>El responsable del uso de cookies y tecnologías similares en {EMPRESA.web}, en adelante, el “Sitio Web”, es:</P>
        <UL items={[
          <span><strong>Responsable:</strong> {EMPRESA.nombre}</span>,
          <span><strong>NIF:</strong> {EMPRESA.cif}.</span>,
          <span><strong>Domicilio social:</strong> {EMPRESA.domicilio}.</span>,
          <span><strong>Correo electrónico:</strong> <Mail />.</span>,
        ]} />
        <P>Esta Política de Cookies debe leerse conjuntamente con el <a href="/legal" style={{ color: "var(--fg)" }}>Aviso Legal</a> y la <a href="/privacidad" style={{ color: "var(--fg)" }}>Política de Privacidad</a> del Sitio Web.</P>
      </Section>

      <Section n="2" title="Qué son las cookies">
        <P>Las cookies son pequeños archivos que un sitio web puede almacenar en el navegador o dispositivo de una persona cuando lo visita.</P>
        <P>Las cookies pueden permitir, entre otras funciones:</P>
        <UL items={[
          "Mantener el funcionamiento técnico del sitio.",
          "Recordar preferencias.",
          "Conservar la elección realizada sobre el uso de cookies.",
          "Obtener estadísticas sobre la navegación.",
          "Medir el rendimiento y uso de las páginas.",
          "Habilitar funcionalidades proporcionadas por terceros.",
        ]} />
        <P>Esta política también se aplica, cuando corresponda, a tecnologías similares que permitan almacenar o acceder a información en el dispositivo, como el almacenamiento local, píxeles, etiquetas, identificadores y otros mecanismos de seguimiento.</P>
      </Section>

      <Section n="3" title="Qué tecnologías utiliza Branthia">
        <P>Branthia utiliza actualmente las siguientes herramientas relacionadas con la gestión de etiquetas, consentimiento y medición:</P>

        <Sub title="Cookiebot">
          <P>Branthia utiliza Cookiebot CMP, servicio de Usercentrics A/S, para:</P>
          <UL items={[
            "Mostrar el aviso de cookies.",
            "Permitir aceptar, rechazar o configurar las categorías no necesarias.",
            "Recordar la elección de la persona usuaria.",
            "Permitir modificar o retirar posteriormente el consentimiento.",
            "Facilitar un inventario actualizado de las cookies y tecnologías detectadas.",
          ]} />
          <P>Cookiebot puede utilizar una cookie estrictamente necesaria para conservar el estado del consentimiento. Esta cookie no se utiliza para medir la navegación ni para enviar publicidad.</P>
        </Sub>

        <Sub title="Google Tag Manager">
          <P>Branthia utiliza Google Tag Manager como sistema de gestión y despliegue de etiquetas.</P>
          <P>Google Tag Manager permite administrar técnicamente otros scripts o herramientas, pero las cookies y tratamientos concretos dependen de las etiquetas que estén configuradas dentro del contenedor.</P>
          <P>La utilización de Google Tag Manager no autoriza por sí sola la activación de Google Analytics u otras herramientas no necesarias.</P>
        </Sub>

        <Sub title="Google Analytics 4">
          <P>Branthia utiliza o tiene previsto utilizar Google Analytics 4, servicio contratado con Google Ireland Limited, para obtener estadísticas agregadas sobre el uso del Sitio Web.</P>
          <P>Google Analytics puede permitir conocer, entre otros datos:</P>
          <UL items={[
            "Páginas visitadas.",
            "Duración aproximada de las sesiones.",
            "Tipo general de dispositivo.",
            "Navegador y sistema operativo.",
            "País o zona geográfica aproximada.",
            "Fuente general desde la que se accede al Sitio Web.",
            "Interacciones realizadas con las páginas.",
            "Errores o problemas de navegación.",
          ]} />
          <P>Google Analytics puede utilizar identificadores y cookies propias, como <code style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace', fontSize: 14 }}>_ga</code> y otras cookies asociadas a la propiedad configurada.</P>
          <P>Las etiquetas de Google Analytics permanecerán condicionadas a la elección de la persona usuaria. Branthia no utilizará la mera navegación, el desplazamiento por la página ni el cierre del banner como formas de consentimiento.</P>
        </Sub>
      </Section>

      <Section n="4" title="Categorías de cookies">
        <P>Las cookies y tecnologías detectadas se clasifican en las siguientes categorías:</P>

        <Sub n="4.1" title="Necesarias">
          <P>Son imprescindibles para el funcionamiento, seguridad y prestación de las funciones expresamente solicitadas por la persona usuaria.</P>
          <P>Pueden utilizarse, por ejemplo, para:</P>
          <UL items={[
            "Cargar correctamente el Sitio Web.",
            "Proteger formularios y sistemas.",
            "Distribuir el tráfico.",
            "Prevenir abusos.",
            "Conservar la elección sobre cookies.",
            "Mantener funciones técnicas esenciales.",
          ]} />
          <P>Estas tecnologías no se utilizan para elaborar perfiles comerciales ni para medir la navegación con fines analíticos.</P>
          <P>Las cookies estrictamente necesarias no pueden desactivarse desde el panel cuando su funcionamiento sea imprescindible. La persona usuaria puede bloquearlas mediante su navegador, aunque algunas partes del Sitio Web podrían dejar de funcionar correctamente.</P>
        </Sub>

        <Sub n="4.2" title="Preferencias">
          <P>Permiten recordar determinadas elecciones o características de la navegación que no son estrictamente necesarias.</P>
          <P>Branthia no activará esta categoría mientras no exista una funcionalidad que la requiera y aparezca correctamente identificada en el inventario de cookies.</P>
        </Sub>

        <Sub n="4.3" title="Estadísticas o analíticas">
          <P>Permiten obtener información sobre cómo se utiliza el Sitio Web con la finalidad de elaborar estadísticas, evaluar su funcionamiento y detectar posibles mejoras.</P>
          <P>En esta categoría puede incluirse Google Analytics.</P>
          <P>Las cookies analíticas permanecerán desactivadas hasta que la persona usuaria otorgue su consentimiento.</P>
        </Sub>

        <Sub n="4.4" title="Marketing">
          <P>Permiten realizar seguimiento de la navegación con fines publicitarios, crear perfiles, medir campañas promocionales o mostrar contenidos personalizados.</P>
          <P>Branthia no utiliza actualmente cookies de publicidad comportamental.</P>
          <P>Si esta situación cambia, estas tecnologías se mantendrán desactivadas hasta obtener el consentimiento correspondiente y se actualizarán previamente esta política, el banner y el inventario de proveedores.</P>
        </Sub>

        <Sub n="4.5" title="No clasificadas">
          <P>Son tecnologías detectadas cuya finalidad todavía no ha podido determinarse.</P>
          <P>Branthia revisará las tecnologías no clasificadas antes de autorizar su uso. Una cookie no debe tratarse como necesaria únicamente porque su finalidad todavía sea desconocida.</P>
        </Sub>
      </Section>

      <Section n="5" title="Inventario actualizado de cookies y tecnologías">
        <P>El siguiente inventario se genera y actualiza mediante el escaneo de Cookiebot.</P>
        <P>La declaración indica, según la información detectada y clasificada:</P>
        <UL items={[
          "Nombre de la cookie o tecnología.",
          "Proveedor.",
          "Finalidad.",
          "Duración.",
          "Tipo de almacenamiento.",
          "Categoría.",
          "Dominio desde el que se instala.",
        ]} />
        <P><strong>Declaración de cookies:</strong></P>
        <CookieDeclaration />
        <P>El inventario automático debe revisarse periódicamente. La clasificación proporcionada por una herramienta técnica no sustituye la comprobación de la finalidad real, la configuración de las etiquetas y el momento en que se activan.</P>
      </Section>

      <Section n="6" title="Base jurídica">
        <P>Las cookies y tecnologías estrictamente necesarias se utilizan para permitir el funcionamiento y la prestación de las funciones solicitadas en el Sitio Web.</P>
        <P>Las cookies de preferencias no necesarias, analíticas y de marketing solo se utilizarán cuando la persona usuaria haya otorgado previamente su consentimiento mediante el mecanismo habilitado.</P>
        <P>Cuando una tecnología permita tratar datos personales, dicho tratamiento se basará en el consentimiento para la finalidad seleccionada, salvo que resulte aplicable otra base jurídica y exista una excepción válida al requisito de consentimiento.</P>
        <P>La persona usuaria puede retirar el consentimiento en cualquier momento sin que ello afecte a la licitud del tratamiento realizado con anterioridad.</P>
      </Section>

      <Section n="7" title="Cómo se solicita el consentimiento">
        <P>En la primera visita, Cookiebot muestra un panel que permite:</P>
        <UL items={[
          "Aceptar las categorías no necesarias.",
          "Rechazar las categorías no necesarias.",
          "Configurar las categorías disponibles.",
        ]} />
        <P>Las opciones de aceptar y rechazar deben presentarse de manera visible y comparable.</P>
        <P>Las categorías no necesarias permanecerán desactivadas por defecto. No se utilizarán casillas previamente marcadas ni se considerará que existe consentimiento por seguir navegando, desplazarse por la página o cerrar el banner.</P>
        <P>La persona usuaria puede elegir de forma separada las categorías disponibles, salvo las cookies estrictamente necesarias.</P>
      </Section>

      <Section n="8" title="Duración de la elección">
        <P>Branthia conservará la elección sobre cookies durante un máximo de 12 meses.</P>
        <P>Transcurrido ese periodo, podrá solicitarse nuevamente el consentimiento.</P>
        <P>También podrá solicitarse una nueva elección antes de ese plazo cuando:</P>
        <UL items={[
          "Cambien las finalidades.",
          "Se incorporen nuevos proveedores.",
          "Se añadan nuevas categorías.",
          "Se modifique sustancialmente la configuración.",
          "No sea posible acreditar la elección anterior.",
          "Lo requiera un cambio normativo o de criterio aplicable.",
        ]} />
        <P>La duración de cada cookie concreta puede ser diferente y figura en la declaración dinámica incluida en esta política.</P>
      </Section>

      <Section n="9" title="Cómo modificar o retirar el consentimiento">
        <P>La persona usuaria puede modificar o retirar su consentimiento en cualquier momento mediante el enlace o botón permanente:</P>
        <ConfigurarCookies />
        <P>Al retirar el consentimiento:</P>
        <UL items={[
          "Las etiquetas afectadas deben dejar de activarse para futuras visitas o interacciones.",
          "Branthia dejará de realizar la medición correspondiente.",
          "Podrán eliminarse las cookies existentes mediante el mecanismo habilitado o desde la configuración del navegador.",
        ]} />
        <P>La retirada debe ser tan sencilla como la aceptación.</P>
      </Section>

      <Section n="10" title="Configuración mediante el navegador">
        <P>La persona usuaria también puede permitir, bloquear o eliminar cookies mediante la configuración de su navegador.</P>
        <P>El procedimiento depende del navegador y dispositivo utilizados. El bloqueo general de cookies puede impedir que algunas funciones técnicas del Sitio Web funcionen correctamente.</P>
        <P>La eliminación manual de cookies en el navegador no sustituye necesariamente la retirada del consentimiento mediante Cookiebot. Para que Branthia conozca y aplique la nueva elección, debe utilizarse preferentemente la opción “Configurar cookies” del Sitio Web.</P>
      </Section>

      <Section n="11" title="Proveedores">
        <Sub title="Usercentrics A/S — Cookiebot">
          <P>Cookiebot es un servicio de gestión del consentimiento proporcionado por Usercentrics A/S, con sede en Dinamarca.</P>
          <P>Su finalidad en el Sitio Web es administrar y conservar técnicamente la elección de la persona usuaria y mantener la declaración de cookies.</P>
        </Sub>
        <Sub title="Google Ireland Limited — Google Tag Manager y Google Analytics">
          <P>Google Tag Manager y Google Analytics son servicios contratados con Google Ireland Limited.</P>
          <P>Google Analytics puede tratar datos técnicos, identificadores online e información sobre la interacción con el Sitio Web cuando la persona usuaria acepta las cookies analíticas.</P>
          <P>Branthia configurará Google Analytics para limitar el tratamiento a la finalidad estadística definida y evitará enviar nombres, direcciones de correo, contenido de formularios u otra información que identifique directamente a una persona.</P>
          <P>La configuración inicial deberá mantener desactivadas las funciones de publicidad, Google Signals, medición multidominio y vinculaciones con productos publicitarios, salvo que se realice una evaluación específica y se actualice la información facilitada.</P>
        </Sub>
      </Section>

      <Section n="12" title="Transferencias internacionales">
        <P>Algunos proveedores pueden tratar datos fuera del Espacio Económico Europeo o permitir accesos desde terceros países.</P>
        <P>Cuando exista una transferencia internacional de datos personales, Branthia comprobará que se utilice un mecanismo reconocido por la normativa aplicable, como:</P>
        <UL items={[
          "Una decisión de adecuación.",
          "La adhesión válida al Marco de Privacidad de Datos UE-EE. UU., cuando corresponda.",
          "Cláusulas contractuales tipo.",
          "Medidas contractuales, técnicas u organizativas adicionales cuando resulten necesarias.",
        ]} />
        <P>La información ampliada sobre proveedores, tratamientos y transferencias se encuentra en la <a href="/privacidad" style={{ color: "var(--fg)" }}>Política de Privacidad</a>.</P>
      </Section>

      <Section n="13" title="Tratamientos entre dominios">
        <P>Los enlaces a Athria, Cohexia u otros dominios no implican por sí mismos que se compartan cookies o identificadores entre esas páginas y {EMPRESA.web}.</P>
        <P>Cada sitio debe disponer de su propia configuración y documentación de cookies cuando opere de forma independiente.</P>
        <P>Branthia no activará medición multidominio, identificadores compartidos ni seguimiento entre {EMPRESA.web}, Athria y Cohexia sin:</P>
        <UL items={[
          "Analizar previamente el flujo.",
          "Configurar correctamente el consentimiento.",
          "Informar de los dominios y finalidades.",
          "Actualizar las políticas correspondientes.",
        ]} />
      </Section>

      <Section n="14" title="Actualizaciones de esta política">
        <P>Branthia revisará esta Política de Cookies cuando:</P>
        <UL items={[
          "Se añadan o eliminen etiquetas en Google Tag Manager.",
          "Cambie la configuración de Cookiebot.",
          "Se incorporen nuevas herramientas.",
          "Cambien las finalidades.",
          "Aparezcan tecnologías no clasificadas.",
          "Cambien los proveedores o las transferencias.",
          "Se modifique la normativa o el criterio aplicable.",
        ]} />
        <P>La fecha y versión se indicarán al comienzo del documento.</P>
      </Section>

      <P style={{ color: "var(--muted)" }}>© 2026 {EMPRESA.nombre}</P>
    </>
  );
}

// `actualizado` y `version` son por documento: cada texto se data cuando se
// revisa de verdad, no cuando se toca cualquier otro.
const DOCS = {
  aviso:      { eyebrow: "Legal", title: "Aviso legal.",            Comp: AvisoLegal, actualizado: "22 de julio de 2026", version: "1.0" },
  privacidad: { eyebrow: "Legal", title: "Política de privacidad.", Comp: Privacidad, actualizado: "23 de julio de 2026", version: "1.0" },
  cookies:    { eyebrow: "Legal", title: "Política de cookies.",    Comp: Cookies,    actualizado: "23 de julio de 2026", version: "1.0" },
};

function LegalPage({ doc: docKey = "aviso" }) {
  const w = useW();
  const doc = DOCS[docKey] || DOCS.aviso;
  const { eyebrow, title, Comp, actualizado, version } = doc;
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
          {version && <>Versión {version} · </>}Última actualización · {actualizado || EMPRESA.actualizado}
        </Mono>
        <Comp />
      </main>
      <Footer />
    </div>
  );
}


export default LegalPage;
