import Link from "next/link";
import PublicFooter from "@/components/public-footer";

export const metadata = {
  title: "Luma Protect · Ciberseguridad Ciudadana e Investigación Estudiantil (UNSO)",
  description:
    "Iniciativa independiente de investigación aplicada impulsada por estudiantes de la Licenciatura en Ciberseguridad de la UNSO. Protección familiar activa contra secuestros virtuales, hackeo de WhatsApp y fraudes bancarios sin enviar datos privados a servidores.",
};

export default function LumaProtectHomePage() {
  return (
    <div className="space-y-16 sm:space-y-20 py-2 sm:py-6 w-full max-w-full overflow-hidden">
      {/* 1. HERO SECTION CON EL PERSONAJE ANIMADO Y COLORES OFICIALES */}
      <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-slate-950 via-[#0D254C] to-slate-900 px-4 py-10 text-white shadow-2xl sm:px-12 sm:py-20 w-full max-w-full">
        {/* Glow azul y esmeralda de fondo */}
        <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-lumaBlue/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-emerald-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-6xl w-full">
          <div className="grid items-center gap-8 lg:gap-10 lg:grid-cols-12">
            {/* Columna de Texto e Impacto */}
            <div className="space-y-5 sm:space-y-6 text-center lg:col-span-7 lg:text-left min-w-0">
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 rounded-2xl sm:rounded-full border border-blue-400/30 bg-blue-950/70 px-3.5 py-1.5 text-[11px] sm:text-xs font-bold text-blue-300 backdrop-blur-md max-w-full leading-relaxed">
                <span>🛡️ Ciberseguridad Ciudadana</span>
                <span className="hidden sm:inline">·</span>
                <span>Investigación Estudiantil Independiente</span>
                <span className="hidden sm:inline">·</span>
                <span>Argentina & Latinoamérica</span>
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-6xl lg:text-7xl break-words">
                Luma <span className="text-blue-400">Protect</span>
              </h1>

              <p className="text-lg font-bold text-blue-200 sm:text-2xl break-words">
                La plataforma inteligente que protege personas, no solo dispositivos.
              </p>

              <p className="text-xs sm:text-base leading-relaxed text-slate-300 break-words">
                Una iniciativa independiente de investigación aplicada y desarrollo tecnológico impulsada por <strong>estudiantes universitarios de la Licenciatura en Ciberseguridad de la Universidad Nacional Raúl Scalabrini Ortiz (UNSO)</strong> en preparación de su trabajo de grado. <em>Este proyecto es de carácter autónomo y no cuenta a la fecha con patrocinio, aval o representación institucional formal de la UNSO.</em>{" "}
                Ecosistema de defensa integral frente a <strong>estafas por WhatsApp, ingeniería social coercitiva, vaciamiento de cuentas y enlaces maliciosos</strong>. Operamos mediante un <strong>Doble Anillo Defensivo</strong>: un <strong>Escudo en Tiempo Real en tu Celular</strong> (App Android con Bloqueo DNS local y Fricción Positiva determinista) y un <strong>Bot Asistente en WhatsApp con Inteligencia Artificial</strong> para consultas inmediatas sin necesidad de instalar nada. Todo bajo privacidad estricta (Ley 25.326 Zero-PII).
              </p>

              {/* Botones de Acción */}
              <div className="flex flex-col items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2 sm:flex-row sm:justify-start">
                <a
                  href="https://t.me/LumaProtectArgBot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-2xl bg-emerald-600 px-6 py-3.5 text-center text-sm sm:text-base font-extrabold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-500 transition sm:w-auto flex items-center justify-center gap-2"
                >
                  <span>💬</span>
                  <span>Consultar Bot Asistente</span>
                </a>
                <a
                  href="#tiempo-real"
                  className="w-full rounded-2xl bg-lumaBlue px-6 py-3.5 text-center text-sm sm:text-base font-extrabold text-white shadow-lg shadow-lumaBlue/30 hover:bg-blue-600 transition sm:w-auto flex items-center justify-center gap-2"
                >
                  <span>🛡️</span>
                  <span>Protección en Tiempo Real</span>
                </a>
                <Link
                  href="/verificador"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-800/80 px-6 py-3.5 text-center text-sm sm:text-base font-bold text-white hover:bg-slate-700 transition sm:w-auto flex items-center justify-center gap-2"
                >
                  <span>🔍</span>
                  <span>Verificador Web</span>
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 pt-2 text-[11px] sm:text-xs text-slate-400 lg:justify-start">
                <span>🛡️ Escudo On-Device</span>
                <span>·</span>
                <span>🔒 Cero almacenamiento</span>
                <span>·</span>
                <span>Ley 25.326 Zero-PII</span>
                <span>·</span>
                <span>100% Gratuito</span>
              </div>
            </div>

            {/* Columna con el Personaje Animado Oficial */}
            <div className="flex flex-col items-center justify-center lg:col-span-5 min-w-0">
              <div className="relative flex items-center justify-center w-full max-w-[280px] sm:max-w-[340px]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-lumaBlue/20 to-emerald-400/20 blur-2xl" />
                <img
                  src="/images/luma_animada_transparente.webp"
                  alt="Luma - Personaje Guardián Protector"
                  className="relative z-10 w-full h-auto drop-shadow-2xl transition hover:scale-105 duration-300"
                />
              </div>
              <p className="mt-3 text-center text-xs font-semibold text-blue-300/80">
                ✨ Luma Cuidadora · Asistencia empática para toda la familia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CIFRAS Y DATOS REALES DE LA PROBLEMÁTICA (UFECI / BCRA / CIBERSEGURIDAD) */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800">
            La Realidad en Números
          </span>
          <h2 className="text-3xl font-black text-lumaText sm:text-4xl">
            Una epidemia silenciosa que destruye familias
          </h2>
          <p className="text-sm text-lumaSubtext sm:text-base">
            Información respaldada por informes de la <strong>Unidad Fiscal Especializada en Ciberdelincuencia (UFECI)</strong> y organismos de seguridad informática:
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-3xl font-black text-rose-600 sm:text-4xl">+300%</span>
              <h3 className="text-lg font-bold text-lumaText">Aumento en Denuncias Formales</h3>
              <p className="text-xs leading-relaxed text-lumaSubtext">
                Según estadísticas de la <strong>UFECI (Ministerio Público Fiscal de la Nación)</strong>, las denuncias por fraudes electrónicos crecieron exponencialmente, encabezadas por el vaciamiento de cuentas bancarias y robo de identidad digital.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500">Fuente Oficial:</span>
              <a
                href="https://www.mpf.gob.ar/ufeci/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-lumaBlue hover:underline"
              >
                <span>UFECI / MPF</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-3xl font-black text-amber-500 sm:text-4xl">80% a 85%</span>
              <h3 className="text-lg font-bold text-lumaText">La Cifra Negra: No Denuncian</h3>
              <p className="text-xs leading-relaxed text-lumaSubtext">
                La inmensa mayoría de las víctimas <strong>no radica la denuncia por vergüenza, culpa o resignación</strong>. Esto genera una invisibilidad estadística que impide la asignación oportuna de presupuestos y fuerzas policiales.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500">Relevamiento:</span>
              <span className="text-[11px] font-bold text-slate-600">Criminología Digital PGN</span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-3xl font-black text-lumaBlue sm:text-4xl">7 de cada 10</span>
              <h3 className="text-lg font-bold text-lumaText">Ataques Vía WhatsApp y Llamadas</h3>
              <p className="text-xs leading-relaxed text-lumaSubtext">
                Los estafadores ya no atacan servidores de alta seguridad: atacan el teléfono familiar mediante manipulación psicológica (falsos secuestros nocturnos, ofertas de trabajo piramidales y enlaces clonados).
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500">Vector de Ataque:</span>
              <a
                href="https://www.mpf.gob.ar/ufeci/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-lumaBlue hover:underline"
              >
                <span>Reportes UFECI</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Banner de Veracidad y Enlace Primario */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">🏛️</span>
            <span>
              <strong>Compromiso de Veracidad:</strong> Luma fundamenta sus patrones en informes públicos de la <strong>Unidad Fiscal Especializada en Ciberdelincuencia (UFECI)</strong> y la <strong>Agencia de Acceso a la Información Pública (AAIP)</strong>.
            </span>
          </div>
          <a
            href="https://www.mpf.gob.ar/ufeci/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs font-bold text-lumaBlue hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Canal Oficial de la UFECI</span>
            <span>↗</span>
          </a>
        </div>
      </section>

      {/* 3. MANIFIESTO: PROTEGER PERSONAS, NO SOLO DISPOSITIVOS */}
      <section className="mx-auto max-w-4xl space-y-6 rounded-3xl border border-blue-100 bg-gradient-to-br from-lumaBlueSoft/40 via-white to-slate-50 p-5 sm:p-10 shadow-sm overflow-hidden w-full max-w-full">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lumaBlue text-white font-black text-xl shadow-md shadow-lumaBlue/25">
            L
          </div>
          <div>
            <h2 className="text-xl font-bold text-lumaText">El Origen y Manifiesto del Proyecto</h2>
            <p className="text-xs text-lumaSubtext">
              Iniciativa de investigación aplicada desarrollada por estudiantes de la Licenciatura en Ciberseguridad (UNSO)
            </p>
          </div>
        </div>

        <blockquote className="border-l-4 border-lumaBlue pl-4 text-lg font-bold italic text-lumaText sm:text-xl">
          &ldquo;A diferencia de las soluciones tradicionales de ciberseguridad, enfocadas principalmente en la protección de dispositivos, redes o servidores, Luma propone un enfoque centrado en la protección de las personas: asistir y advertir al usuario en el momento exacto del engaño antes de que se produzca el daño.&rdquo;
        </blockquote>

        <div className="space-y-3 text-sm leading-relaxed text-lumaText sm:text-base">
          <p>
            Luma Protect no nace de una multinacional tecnológica buscando lucrar con tus contactos ni vender suscripciones o publicidad invasiva. 
            Nace en las aulas universitarias frente a una realidad innegable: <strong>los ciberdelincuentes ya no atacan sistemas informáticos complejos, sino la vulnerabilidad psicológica, el miedo y la confianza de las personas comunes</strong>.
          </p>
          <div className="rounded-2xl border border-blue-200 bg-white p-4 text-xs sm:text-sm text-slate-800 space-y-2 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-lumaBlue">
              <span className="text-base">⚖️</span>
              <span>Acompañamiento en la Denuncia y Preservación de Evidencia Pericial</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              La protección no termina cuando se evita el pago. Cuando un intento de fraude ocurre, la víctima suele quedar desorientada y desamparada ante tecnicismos legales y bancarios. Luma asiste activamente en la <strong>estructuración ordenada de la denuncia penal</strong> y la <strong>preservación técnica de la evidencia</strong> (números de origen, enlaces, billeteras de destino y capturas con sellado criptográfico de integridad SHA-256). Esto genera un reporte pericial preliminar claro y comprensible, listo para ser presentado ante la <strong>UFECI (Unidad Fiscal Especializada en Ciberdelincuencia)</strong>, fiscalías provinciales o comisarías, impidiendo la revictimización y facilitando la labor judicial.
            </p>
          </div>
          <p className="text-xs text-lumaSubtext sm:text-sm">
            Frente a esto, nuestro compromiso es ético y de transferencia social comunitaria: una herramienta abierta, de acceso libre y construida bajo el principio de <strong>privacidad estricta Zero-PII (Ley 25.326)</strong>. Tu intimidad no se negocia: lo que ocurre en tu teléfono, se procesa en tu chip y se queda en tu teléfono.
          </p>
        </div>
      </section>

      {/* 4. VISIÓN INTERDISCIPLINARIA: LA CIBERSEGURIDAD COMO PUENTE ENTRE DISCIPLINAS */}
      <section id="interdisciplinario" className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="rounded-full bg-purple-100 px-3.5 py-1 text-xs font-bold text-purple-900 border border-purple-200">
            Proyección Futura & Ecosistema de Investigación
          </span>
          <h2 className="text-3xl font-black text-lumaText sm:text-4xl">
            La Ciberseguridad como Punto de Encuentro Interdisciplinario
          </h2>
          <p className="text-sm text-lumaSubtext sm:text-base leading-relaxed">
            La protección integral de las personas frente a la manipulación digital no se agota en el código informático. 
            Luma fue concebida como un proyecto de investigación aplicada que delimita con total claridad lo que <strong>hace hoy</strong> de las <strong>líneas de articulación y estudio futuro</strong> proyectadas junto a estudiantes y profesionales de diversas disciplinas:
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Disciplina 1: Ciberseguridad e Ingeniería de Software */}
          <div className="rounded-3xl border border-blue-200 bg-white p-6 shadow-sm space-y-3 hover:border-lumaBlue transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-lumaBlue text-2xl font-bold">
                  🛡️
                </div>
                <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-bold text-blue-800">
                  ✓ Operativo en Android
                </span>
              </div>
              <h3 className="text-lg font-bold text-lumaText">Ciberseguridad y Detección Local</h3>
              <p className="text-xs leading-relaxed text-lumaSubtext">
                El núcleo actual de Luma: motor heurístico y ontológico local contra tácticas de manipulación psicológica, correlación contextual de eventos telefónicos/VoIP y OTP, inspección de SMS y notificaciones, análisis forense de QR/enlaces maliciosos y despliegue de avisos preventivos.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-semibold text-blue-700">
              Implementado y probado en el cliente Android (158 tests unitarios)
            </div>
          </div>

          {/* Disciplina 2: Psicopedagogía y Alfabetización Digital */}
          <div className="rounded-3xl border border-rose-200 bg-white p-6 shadow-sm space-y-3 hover:border-rose-400 transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 text-2xl font-bold">
                  📚
                </div>
                <span className="rounded-full bg-rose-100 px-2.5 py-1 text-[11px] font-bold text-rose-800">
                  ⚡ Divulgación Activa
                </span>
              </div>
              <h3 className="text-lg font-bold text-lumaText">Psicopedagogía y Educación Preventiva</h3>
              <p className="text-xs leading-relaxed text-lumaSubtext">
                Pedagogía ciudadana bajo el personaje de <strong>&ldquo;Luma Cuidadora&rdquo;</strong>: micro-contenidos educativos en redes sociales y materiales para escuelas y familias en Lenguaje Claro, orientados a prevenir el grooming, fraudes en videojuegos y manipulación emocional.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-semibold text-rose-700">
              Campaña de concientización comunitaria en marcha
            </div>
          </div>

          {/* Disciplina 3: Salud y Cuidados (Enfermería) */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm space-y-3 hover:border-emerald-300 transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 text-2xl font-bold">
                  🩺
                </div>
                <span className="rounded-full bg-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                  🌱 Proyección Futura (En Estudio)
                </span>
              </div>
              <h3 className="text-lg font-bold text-lumaText">Salud y Cuidados (Enfermería)</h3>
              <p className="text-xs leading-relaxed text-lumaSubtext">
                Línea de investigación proyectada: articulación a futuro con especialistas en enfermería y cuidados gerontológicos para estudiar protocolos de contención ante situaciones de pánico o confusión extrema en personas mayores, evaluando a futuro la factibilidad de asistencia en dispositivos de apoyo.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-semibold text-slate-500">
              Línea teórica de investigación interfacultades
            </div>
          </div>

          {/* Disciplina 4: Inteligencia Artificial Ética */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm space-y-3 hover:border-purple-300 transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 text-2xl font-bold">
                  🧠
                </div>
                <span className="rounded-full bg-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                  🔬 I+D Futura
                </span>
              </div>
              <h3 className="text-lg font-bold text-lumaText">Modelos de IA Compactos en el Dispositivo</h3>
              <p className="text-xs leading-relaxed text-lumaSubtext">
                Horizonte de I+D: investigar modelos de clasificación semántica extremadamente livianos capaces de ejecutarse dentro del procesador del teléfono sin conexión a internet, complementando las heurísticas basadas en reglas para elevar la precisión sin comprometer la privacidad.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-semibold text-slate-500">
              Propuesta temática para Trabajos Finales Integradores (TFI)
            </div>
          </div>

          {/* Disciplina 5: Criminalística y Derecho Digital */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm space-y-3 hover:border-amber-300 transition flex flex-col justify-between lg:col-span-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-900 text-2xl font-bold">
                  ⚖️
                </div>
                <span className="rounded-full bg-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                  ⚖️ Articulación Pericial Proyectada
                </span>
              </div>
              <h3 className="text-lg font-bold text-lumaText">Criminalística y Asistencia Pericial</h3>
              <p className="text-xs leading-relaxed text-lumaSubtext">
                Investigación pericial aplicada: diseño de plantillas de reporte estructuradas para que la víctima pueda documentar ordenadamente fechas, remitentes y enlaces sospechosos, facilitando la recepción y comprensión técnica de la denuncia ante fiscalías (UFECI) y peritos judiciales sin requerir conocimientos técnicos avanzados.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-semibold text-slate-500">
              Diseño de formato documental en consulta con estándares periciales
            </div>
          </div>
        </div>
      </section>

      {/* 5. PANTALLAS REALES DE LA APP Y PROTECCIÓN EN ACCIÓN (TIEMPO REAL) */}
      <section id="tiempo-real" className="space-y-10 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
            Escudo en Tiempo Real On-Device · Cero Falsos Positivos
          </span>
          <h2 className="text-3xl font-black text-lumaText sm:text-4xl">
            Protección Activa en tu Celular: Bloqueo DNS Local y Fricción Positiva
          </h2>
          <p className="text-sm text-lumaSubtext sm:text-base max-w-2xl mx-auto">
            A diferencia de los antivirus obsoletos que intentaban espiar tus mensajes privados generando falsas alarmas, 
            la aplicación de Luma Protect actúa en el momento exacto del peligro mediante <strong>reglas estructurales deterministas en tu propio procesador</strong>: neutraliza enlaces clonados a nivel de red y activa pausas conscientes antes de que entregues dinero o claves.
          </p>
        </div>

        <div className="grid items-start gap-8 md:grid-cols-3">
          {/* Pantalla 1: Home y Herramientas Preventivas */}
          <div className="flex flex-col items-center rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="w-full max-w-[260px] rounded-[2.2rem] border-[5px] border-slate-800 bg-slate-900 p-1.5 shadow-xl">
              <div className="overflow-hidden rounded-[1.8rem] bg-white">
                <img
                  src="/images/luma_real_home.png"
                  alt="Centro de Protección y Herramientas Preventivas de Luma Protect"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="mt-5 space-y-2 text-center">
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold text-blue-800">
                1. Escudo de Red Silencioso
              </span>
              <h3 className="text-lg font-bold text-lumaText">Bloqueo DNS On-Device</h3>
              <p className="text-xs text-lumaSubtext max-w-xs">
                Servicio DNS local (VPN loopback en el teléfono) que bloquea dominios de phishing y typosquatting en cualquier app o navegador sin enviar tu tráfico a servidores externos.
              </p>
            </div>
          </div>

          {/* Pantalla 2: Alerta Real de Mensaje Sospechoso */}
          <div className="flex flex-col items-center rounded-3xl border border-rose-200 bg-rose-50/30 p-6 shadow-sm">
            <div className="w-full max-w-[260px] rounded-[2.2rem] border-[5px] border-rose-900 bg-rose-950 p-1.5 shadow-xl">
              <div className="overflow-hidden rounded-[1.8rem] bg-slate-900">
                <img
                  src="/images/luma_real_alert_warning.jpg"
                  alt="Alerta en Pantalla ante Mensaje Sospechoso y Suplantación Bancaria"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="mt-5 space-y-2 text-center">
              <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[11px] font-bold text-rose-800">
                2. Fricción Positiva en Portapapeles
              </span>
              <h3 className="text-lg font-bold text-rose-950">Aviso Inmediato al Copiar</h3>
              <p className="text-xs text-rose-800/90 max-w-xs">
                Si copiás un link falso que imita a un banco o un alias sospechoso, Luma despliega una alerta flotante pedagógica de 3 segundos para que frenes antes de pegar o transferir.
              </p>
            </div>
          </div>

          {/* Pantalla 3: Acciones Inmediatas y Contacto de Confianza */}
          <div className="flex flex-col items-center rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="w-full max-w-[260px] rounded-[2.2rem] border-[5px] border-slate-800 bg-slate-900 p-1.5 shadow-xl">
              <div className="overflow-hidden rounded-[1.8rem] bg-slate-900">
                <img
                  src="/images/luma_real_alert_actions.jpg"
                  alt="Acciones Inmediatas y Llamada a la Persona de Confianza"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="mt-5 space-y-2 text-center">
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                3. Red de Guardianes Familiares
              </span>
              <h3 className="text-lg font-bold text-lumaText">Contención y Alerta a Hijos</h3>
              <p className="text-xs text-lumaSubtext max-w-xs">
                Acceso directo en 1 toque para llamar al contacto de confianza y notificación automática a los familiares a cargo cuando un adulto mayor interactúa con una amenaza confirmada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. QUÉ Y CÓMO PROTEGE LUMA PROTECT (EVOLUCIÓN EN TIEMPO REAL) */}
      <section className="rounded-3xl border border-slate-800 bg-slate-950 p-5 sm:p-12 text-white space-y-8 sm:space-y-10 shadow-xl overflow-hidden w-full max-w-full">
        <div className="max-w-3xl space-y-3 min-w-0">
          <span className="rounded-full bg-blue-500/20 px-3.5 py-1.5 text-xs font-bold text-blue-300 border border-blue-400/30 inline-flex flex-wrap max-w-full">
            Evolución de la Ciberseguridad · Arquitectura de Doble Anillo
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white break-words">
            ¿Cómo evolucionó la protección en tiempo real y cómo te defiende?
          </h2>
          <p className="text-xs sm:text-base text-slate-300 leading-relaxed break-words">
            Frente al fracaso de los antivirus tradicionales (que exigían espiar tus mensajes privados, devoraban la batería y arrojaban falsos positivos constantes), Luma Protect transformó la protección en tiempo real en un <strong>sistema determinista, no invasivo y centrado en la persona</strong>:
          </p>
        </div>

        {/* MATRIZ QUÉ PROTEGE VS CÓMO PROTEGE */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* QUÉ PROTEGE */}
          <div className="rounded-2xl border border-blue-900/60 bg-blue-950/40 p-6 space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/30 text-xl font-bold text-blue-300">
                🛡️
              </span>
              <h3 className="text-xl font-bold text-white">¿Qué amenazas neutraliza?</h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Enlaces Clonados y Phishing Bancario:</strong> Sitios fraudulentos con typosquatting que imitan a bancos, fintechs y organismos públicos (ANSES, AFIP/ARCA, Correo).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Estafas por WhatsApp y Manipulación Psicológica:</strong> Falsos secuestros nocturnos, ofertas de empleo engañosas y urgencias financieras simuladas.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Robo de Códigos de Verificación (OTP):</strong> Intentos de apoderamiento de cuentas de WhatsApp y homebanking mediante ardides de 6 dígitos.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Suplantación Familiar (&quot;Hola ma, cambié de número&quot;):</strong> Maniobras coercitivas para forzar transferencias antes de que puedas comunicarte.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Cuentas Mula y Falsos Comprobantes:</strong> Solicitudes de devolución de supuestos pagos por error que derivan en lavado y estafas piramidales.</span>
              </li>
            </ul>
          </div>

          {/* CÓMO PROTEGE */}
          <div className="rounded-2xl border border-emerald-900/60 bg-emerald-950/30 p-6 space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/30 text-xl font-bold text-emerald-300">
                ⚙️
              </span>
              <h3 className="text-xl font-bold text-white">¿Cómo opera la defensa activa?</h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-blue-400 font-bold">1.</span>
                <span><strong>Escudo DNS On-Device (0 ms):</strong> La App móvil bloquea la resolución de dominios maliciosos en todo el teléfono antes de que carguen en el navegador.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-blue-400 font-bold">2.</span>
                <span><strong>Fricción Positiva en Portapapeles:</strong> Alerta inmediata al copiar enlaces clonados o alias de riesgo, desarmando la urgencia antes de pagar o entregar claves.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-blue-400 font-bold">3.</span>
                <span><strong>Red de Guardianes Familiares:</strong> Notificación automática y remota a los hijos o allegados cuando un adulto mayor entra en contacto con una amenaza grave.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-blue-400 font-bold">4.</span>
                <span><strong>Bot Asistente en WhatsApp con IA:</strong> Canal de consulta ágil para verificar audios, mensajes o capturas reenviadas en segundos sin instalar aplicaciones.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-blue-400 font-bold">5.</span>
                <span><strong>Preservación Pericial SHA-256:</strong> Fijación inmutable de la evidencia para estructurar la denuncia formal ante la UFECI sin violar la Ley 25.326.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 4 PILARES TÉCNICOS DEL ECOSISTEMA */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2.5 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-3xl">📱</span>
            <h4 className="font-bold text-white text-base">App Móvil (Tiempo Real)</h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Escudo permanente y silencioso: Bloqueo DNS local (VPN loopback), guardián de portapapeles y alertas de Fricción Positiva con 0 falsos positivos y 0 impacto en batería.
            </p>
          </div>

          <div className="space-y-2.5 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-3xl">💬</span>
            <h4 className="font-bold text-white text-base">Bot en WhatsApp con IA</h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Asistencia abierta y masiva: Reenviá cualquier audio, texto o imagen dudosa para obtener una auditoría explicativa al instante sin necesidad de instalar nada.
            </p>
          </div>

          <div className="space-y-2.5 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-3xl">👥</span>
            <h4 className="font-bold text-white text-base">Guardian Network</h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Escudo intergeneracional: Notificación automática a contactos de confianza designados para contener a familiares vulnerables y evitar la soledad en el engaño.
            </p>
          </div>

          <div className="space-y-2.5 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-3xl">⚖️</span>
            <h4 className="font-bold text-white text-base">Peritaje Forense SHA-256</h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Acompañamiento a la justicia: Generación de reportes estructurados con hash de integridad inmutable para radicar denuncias penales eficaces ante la UFECI.
            </p>
          </div>
        </div>

        {/* Declaración de Privacidad y Delimitación */}
        <aside className="rounded-2xl border border-blue-500/30 bg-blue-950/40 p-5 text-xs text-blue-200 space-y-1.5">
          <p className="font-bold text-blue-100 flex items-center gap-2">
            🔒 Compromiso de Privacidad Absoluta (Ley 25.326 Zero-PII):
          </p>
          <p className="leading-relaxed">
            Luma Protect no almacena conversaciones privadas, números personales ni historiales de mensajes. El análisis se realiza de forma efímera para emitir el veredicto preventivo, respetando de manera irrestricta la intimidad familiar y el marco legal argentino.
          </p>
        </aside>
      </section>

      {/* 7. COMPROMISO HUMANO, FORMULARIO DE DENUNCIA Y ASISTENCIA FORENSE */}
      <section className="space-y-10 sm:space-y-12 rounded-3xl border border-blue-200 bg-gradient-to-b from-blue-50/50 via-white to-slate-50 p-5 sm:p-12 shadow-sm overflow-hidden w-full max-w-full">
        <div className="max-w-3xl space-y-3 min-w-0">
          <span className="rounded-full bg-blue-100 px-3.5 py-1.5 text-xs font-bold text-lumaBlue border border-blue-200 inline-flex flex-wrap max-w-full">
            Compromiso Social, Acompañamiento & Justicia
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-lumaText break-words">
            No estás solo: Acompañamiento a la víctima y asistencia a la justicia
          </h2>
          <p className="text-sm leading-relaxed text-lumaSubtext sm:text-base">
            La protección no termina cuando se bloquea una llamada o se detecta un mensaje trucho. El verdadero compromiso de Luma Protect es <strong>acompañar a la persona en el momento de mayor vulnerabilidad</strong>, facilitando que denuncie sin trabas burocráticas y aportando a las fiscalías y peritos forenses evidencia digital jurídicamente sólida.
          </p>
        </div>

        {/* 3 Pilares del Acompañamiento Integral */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Pilar 1: Acompañamiento Humano y Contención */}
          <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm space-y-5">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 text-2xl font-bold">
                🤝
              </div>
              <h3 className="text-xl font-bold text-lumaText">1. Contención Inmediata y Empatía</h3>
              <p className="text-xs leading-relaxed text-lumaSubtext">
                Frente a una llamada extorsiva o un engaño bancario, la víctima experimenta confusión, angustia y vergüenza. Muchas personas se culpan a sí mismas y ocultan lo ocurrido.
              </p>
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 space-y-2 text-xs">
                <span className="font-bold text-slate-800">El Principio de Luma Cuidadora:</span>
                <ul className="space-y-1.5 text-slate-600 list-disc pl-4">
                  <li><strong>Desculpabilización:</strong> Los ciberdelincuentes aplican ingeniería social coercitiva profesional; la víctima jamás tiene la culpa.</li>
                  <li><strong>Pausa Guiada:</strong> Mensajes de audio y texto calmantes que impiden la toma de decisiones impulsivas bajo amenaza.</li>
                  <li><strong>Red de Confianza:</strong> Botón directo para conectar en 1 toque con un familiar o allegado asignado.</li>
                </ul>
              </div>
            </div>
            <div className="rounded-xl bg-blue-50 border border-blue-100 p-3 text-[11px] font-medium text-blue-900">
              💡 <em>&ldquo;El primer escudo contra el cibercrimen no es un algoritmo, es no sentirse solo.&rdquo;</em>
            </div>
          </div>

          {/* Pilar 2: Formulario de Acompañamiento de Denuncia */}
          <div className="flex flex-col justify-between rounded-3xl border border-blue-200 bg-white p-7 shadow-sm space-y-5">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-lumaBlue text-2xl font-bold">
                📋
              </div>
              <h3 className="text-xl font-bold text-lumaText">2. Formulario de Información para Denuncias</h3>
              <p className="text-xs leading-relaxed text-lumaSubtext">
                Muchas denuncias se archivan o desestiman porque la víctima llega a la comisaría o fiscalía sin los datos clave organizados, o porque los delincuentes borran los chats.
              </p>
              <div className="rounded-2xl bg-blue-50/50 border border-blue-100 p-4 space-y-2 text-xs">
                <span className="font-bold text-blue-950">Estructurado en Lenguaje Claro:</span>
                <ul className="space-y-1.5 text-slate-700 list-disc pl-4">
                  <li><strong>Paso a Paso Asistido:</strong> Sin tecnicismos legales confusos, la app ayuda a ordenar el relato cronológico del hecho.</li>
                  <li><strong>Preservación de Datos Clave:</strong> Teléfonos de origen, alias de WhatsApp, CBU/CVU receptor, links y comprobantes recibidos.</li>
                  <li><strong>Dossier Listo para Presentar:</strong> Genera una ficha estructurada descargable para imprimir o radicar ante comisarías y fiscalías.</li>
                </ul>
              </div>
            </div>
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3 text-[11px] font-medium text-emerald-900">
              ✓ Facilita el trámite ante la policía o el Ministerio Público Fiscal en minutos.
            </div>
          </div>

          {/* Pilar 3: Organización de Datos y Apoyo Pericial */}
          <div className="flex flex-col justify-between rounded-3xl border border-purple-200 bg-white p-7 shadow-sm space-y-5">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 text-2xl font-bold">
                🔬
              </div>
              <h3 className="text-xl font-bold text-lumaText">3. Organización de Datos y Apoyo Pericial</h3>
              <p className="text-xs leading-relaxed text-lumaSubtext">
                Para que una investigación penal avance y la fiscalía pueda actuar con rapidez, los peritos judiciales requieren datos concretos, cronológicos y no alterados.
              </p>
              <div className="rounded-2xl bg-purple-50/50 border border-purple-100 p-4 space-y-2 text-xs">
                <span className="font-bold text-purple-950">Reporte Estructurado con Hash SHA-256:</span>
                <ul className="space-y-1.5 text-slate-700 list-disc pl-4">
                  <li><strong>Integridad Criptográfica del Informe:</strong> Luma genera un informe de texto que incluye su propio hash SHA-256 para demostrar que el documento no fue adulterado tras su generación.</li>
                  <li><strong>Registro Temporal del Evento:</strong> Fecha, hora y tipo de alerta registrada por la aplicación en el momento exacto de la advertencia.</li>
                  <li><strong>Extracción Automática de Indicadores:</strong> Recopila números de origen, enlaces o cuentas sospechosas para que la persona no tenga que deducirlos a mano.</li>
                  <li><strong>Privacidad Estricta (Ley 25.326 Zero-PII):</strong> Aporta los datos del intento de engaño sin almacenar ni exponer la intimidad ni conversaciones privadas de la víctima.</li>
                </ul>
              </div>
            </div>
            <div className="rounded-xl bg-purple-50 border border-purple-100 p-3 text-[11px] font-medium text-purple-900">
              ⚖️ Auxilio orientativo para facilitar la labor de fiscalías y peritos, sin sustituir el peritaje judicial oficial.
            </div>
          </div>
        </div>

        {/* Banner Institucional con Canales de Denuncia Oficiales */}
        <div className="rounded-2xl border border-slate-300 bg-slate-900 p-6 text-white sm:p-8">
          <div className="grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8 space-y-2">
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400">
                Canales Oficiales en la República Argentina
              </span>
              <h4 className="text-xl font-bold text-white">¿Sufriste un fraude o intento de extorsión?</h4>
              <p className="text-xs text-slate-300 leading-relaxed sm:text-sm">
                Podés radicar tu denuncia formal ante la <strong>Unidad Fiscal Especializada en Ciberdelincuencia (UFECI)</strong> enviando un correo a <code className="bg-slate-800 px-2 py-0.5 rounded text-blue-300 font-mono break-all inline-block max-w-full">denunciasufeci@mpf.gov.ar</code> o acudiendo a la comisaría o fiscalía más cercana con la información estructurada por Luma.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2 justify-center">
              <a
                href="https://www.mpf.gob.ar/ufeci/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-white px-5 py-3 text-center text-xs font-bold text-slate-900 hover:bg-slate-100 transition shadow-sm"
              >
                🏛️ Portal Oficial UFECI
              </a>
              <Link
                href="/educacion"
                className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-center text-xs font-bold text-slate-200 hover:bg-slate-700 transition"
              >
                📖 Guías Ciudadanas de Prevención
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TRES CAMINOS DE PARTICIPACIÓN EN EL ECOSISTEMA */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-lumaBlue border border-blue-200">
            Comunidad & Ecosistema Abierto
          </span>
          <h2 className="text-3xl font-black text-lumaText sm:text-4xl">
            Tres Caminos para Formar Parte de Luma
          </h2>
          <p className="text-sm text-lumaSubtext sm:text-base leading-relaxed">
            Luma es un bien público digital en constante evolución. Encontrá tu espacio de participación según tu rol:
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Camino 1: Familias */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-3xl">👨‍👩‍👧</span>
              <h3 className="text-xl font-bold text-lumaText">Para Familias y Personas</h3>
              <p className="text-xs leading-relaxed text-lumaSubtext">
                Descargá la aplicación, configurá el perfil adecuado para tu ser querido (Adulto Mayor, Niños, Adolescentes o Uso General) y accedé a nuestras guías de prevención ciudadana.
              </p>
            </div>
            <a
              href="#descarga"
              className="inline-flex items-center justify-center rounded-xl bg-lumaBlue px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-600 transition"
            >
              Ver Estado de Despliegue 🛡️
            </a>
          </div>

          {/* Camino 2: Comercios y PyMEs */}
          <div className="rounded-3xl border border-cyan-200 bg-cyan-50/30 p-7 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-3xl">🏪</span>
              <h3 className="text-xl font-bold text-slate-900">Comercios y PyMEs</h3>
              <p className="text-xs leading-relaxed text-slate-700">
                Auditá tu red Wi-Fi, terminales POS, QR de cobro y cámaras de seguridad bajo la Ley 25.326 y normativas AAIP con la asistencia de Luma Empresaria.
              </p>
            </div>
            <Link
              href="/pymes"
              className="inline-flex items-center justify-center rounded-xl bg-cyan-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-cyan-700 transition"
            >
              Portal PyMEs & Comercios 💼
            </Link>
          </div>

          {/* Camino 3: Universidad y Estudiantes */}
          <div className="rounded-3xl border border-purple-200 bg-purple-50/30 p-7 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-3xl">🎓</span>
              <h3 className="text-xl font-bold text-purple-950">Comunidad Universitaria</h3>
              <p className="text-xs leading-relaxed text-slate-700">
                ¿Sos estudiante o docente de la Licenciatura en Ciberseguridad o carreras afines? Luma es un espacio abierto para investigar, proponer casos de estudio, realizar Trabajos Finales Integradores (TFI) y prácticas profesionales.
              </p>
            </div>
            <a
              href="mailto:LumaProtect@proton.me?subject=Vinculaci%C3%B3n%20Universitaria%20y%20TFI"
              className="inline-flex items-center justify-center rounded-xl bg-purple-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-purple-800 transition"
            >
              Vincularse con el Proyecto ✉️
            </a>
          </div>

          {/* Camino 4: Organismos e Instituciones */}
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/30 p-7 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-3xl">🏛️</span>
              <h3 className="text-xl font-bold text-emerald-950">Justicia, Banca y Organismos</h3>
              <p className="text-xs leading-relaxed text-slate-700">
                Colaborá con el Observatorio de Fraude, homologá el formato de evidencia forense para causas penales o coordiná capacitaciones institucionales para tu equipo de prevención de delitos.
              </p>
            </div>
            <a
              href="mailto:LumaProtect@proton.me?subject=Contacto%20Institucional%20Luma%20Protect"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-800 transition"
            >
              Contacto Institucional ✉️
            </a>
          </div>
        </div>
      </section>

      {/* 9. COMUNIDAD OFICIAL Y CANALES DE DIFUSIÓN */}
      <section className="rounded-3xl border border-blue-200 bg-white p-8 shadow-sm space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-lumaBlue">
            Comunidad Oficial · Prevención y Difusión Ciudadana
          </span>
          <h2 className="text-2xl font-black text-lumaText sm:text-3xl">
            Sumate a los Canales Oficiales de Luma Protect
          </h2>
          <p className="text-xs text-lumaSubtext sm:text-sm">
            Alertas comunitarias inmediatas, guías en video y educación familiar sin tecnicismos.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
          {/* TELEGRAM CANAL */}
          <a
            href="https://t.me/LumaProtectArg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 p-4 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition bg-slate-50/50 group"
          >
            <span className="text-3xl group-hover:scale-110 transition">📢</span>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Canal de Telegram</h3>
              <p className="text-[11px] text-slate-500">Alertas comunitarias en vivo</p>
            </div>
          </a>

          {/* TELEGRAM BOT */}
          <a
            href="https://t.me/LumaProtectArgBot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 p-4 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition bg-slate-50/50 group"
          >
            <span className="text-3xl group-hover:scale-110 transition">🤖</span>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Bot Asistente Guardián</h3>
              <p className="text-[11px] text-slate-500">@LumaProtectArgBot</p>
            </div>
          </a>

          {/* TIKTOK */}
          <a
            href="https://www.tiktok.com/@lumaprotect"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 p-4 rounded-2xl border border-slate-200 hover:border-slate-800 hover:shadow-md transition bg-slate-50/50 group"
          >
            <span className="text-3xl group-hover:scale-110 transition">📱</span>
            <div>
              <h3 className="font-bold text-sm text-slate-900">TikTok Oficial</h3>
              <p className="text-[11px] text-slate-500">Guías ágiles de 45 segundos</p>
            </div>
          </a>

          {/* META / FACEBOOK */}
          <a
            href="https://www.facebook.com/LumaProtect/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 p-4 rounded-2xl border border-slate-200 hover:border-blue-600 hover:shadow-md transition bg-slate-50/50 group"
          >
            <span className="text-3xl group-hover:scale-110 transition">📘</span>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Comunidad Facebook</h3>
              <p className="text-[11px] text-slate-500">@LumaProtect Oficial</p>
            </div>
          </a>
        </div>
      </section>

      {/* 10. ACCESO AL ECOSISTEMA: APP EN TIEMPO REAL Y BOT ASISTENTE */}
      <section id="descarga" className="rounded-3xl border border-blue-200 bg-gradient-to-r from-lumaBlue to-[#0A47A3] p-5 sm:p-10 text-white shadow-xl overflow-hidden w-full max-w-full">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4 min-w-0">
            <span className="rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 px-3.5 py-1.5 text-xs font-bold inline-flex items-center gap-1.5 max-w-full">
              <span>🛡️</span>
              <span>Doble Anillo Defensivo · Protección a tu Medida</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold break-words">
              Protegé a tu familia hoy mismo con Luma Protect
            </h2>
            <p className="text-xs sm:text-base leading-relaxed text-blue-100 break-words">
              Luma Protect te ofrece la combinación defensiva perfecta: la <strong>App Móvil para protección pasiva permanente en tiempo real</strong> (bloqueo DNS local on-device y Fricción Positiva en el portapapeles) y el <strong>Bot Asistente en WhatsApp con Inteligencia Artificial</strong> para resolver cualquier duda al instante sin necesidad de instalar nada.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
              <a
                href="https://t.me/LumaProtectArgBot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-extrabold text-lumaBlue shadow-lg hover:bg-slate-100 transition"
              >
                <span>💬</span>
                <span>Iniciar Consulta con el Bot</span>
              </a>
              <a
                href="#tiempo-real"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/40 bg-white/10 px-5 py-3.5 text-sm font-bold text-white hover:bg-white/20 transition"
              >
                <span>📱</span>
                <span>Ver Escudo en Tiempo Real</span>
              </a>
              <Link
                href="/verificador"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-blue-950/40 px-5 py-3.5 text-sm font-bold text-blue-200 hover:bg-blue-950/60 transition"
              >
                <span>🔍</span>
                <span>Verificador Web</span>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-blue-950/40 p-6 space-y-4 text-xs text-blue-100 backdrop-blur-sm">
            <p className="font-bold text-white text-sm">¿Por qué esta arquitectura es superadora?</p>
            <ol className="list-decimal space-y-2.5 pl-4">
              <li>
                <strong>Cero Falsos Positivos y Sin Espionaje:</strong> El teléfono no juzga conversaciones privadas; valida matemáticamente dominios y URLs antes de que carguen en el navegador.
              </li>
              <li>
                <strong>Bloqueo DNS Local On-Device:</strong> Protección silenciosa 24/7 en segundo plano sin consumo apreciable de batería y sin enviar tu tráfico a servidores de terceros.
              </li>
              <li>
                <strong>Consulta Inmediata sin Fricción:</strong> Quien no tenga la aplicación puede verificar mensajes, audios y enlaces con solo reenviarlos al bot de WhatsApp.
              </li>
              <li>
                <strong>Alerta Temprana a la Red de Guardianes:</strong> La familia está conectada para proteger a los adultos mayores ante intentos graves de vaciamiento de cuentas.
              </li>
            </ol>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <Link href="/terminos" className="text-blue-200 underline font-semibold hover:text-white">
                Términos y Privacidad Zero-PII →
              </Link>
              <span className="text-[11px] text-blue-300">Iniciativa Estudiantil UNSO</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER PÚBLICO UNIFICADO */}
      <PublicFooter />
    </div>
  );
}
