import React from "react";
import { BranthiaLogo } from "./Logo.jsx";

// Páginas legales (Aviso legal, Privacidad, Cookies). Un solo motor;
// recibe la prop `doc` = 'aviso' | 'privacidad' | 'cookies'. Reutiliza Logo.jsx.
//
// Aviso legal: texto definitivo v1.0 (22/07/2026), con datos registrales completos.
// ⚠ Privacidad y Cookies: siguen siendo plantilla; pendientes de redacción/revisión
//   legal al mismo nivel que el Aviso legal.

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
        <UL items={[
          <span><strong>Responsable:</strong> {EMPRESA.nombre}</span>,
          <span><strong>NIF/CIF:</strong> {EMPRESA.cif}</span>,
          <span><strong>Domicilio:</strong> {EMPRESA.domicilio}</span>,
          <span><strong>Correo electrónico:</strong> {EMPRESA.email}</span>,
        ]} />
      </Section>
      <Section n="2" title="Datos que tratamos">
        <P>Tratamos los datos que nos facilitas a través del formulario de contacto o al comunicarte con nosotros por correo electrónico: nombre, dirección de correo electrónico, empresa y el contenido de tu mensaje. Asimismo, tratamos datos de navegación mediante cookies, según se detalla en la <a href="/cookies" style={{ color: "var(--fg)" }}>Política de Cookies</a>.</P>
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

// `actualizado` y `version` son por documento: cada texto se data cuando se
// revisa de verdad, no cuando se toca cualquier otro.
const DOCS = {
  aviso:      { eyebrow: "Legal", title: "Aviso legal.",            Comp: AvisoLegal, actualizado: "22 de julio de 2026", version: "1.0" },
  privacidad: { eyebrow: "Legal", title: "Política de privacidad.", Comp: Privacidad, actualizado: "16 de julio de 2026" },
  cookies:    { eyebrow: "Legal", title: "Política de cookies.",    Comp: Cookies,    actualizado: "16 de julio de 2026" },
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
