import Link from "next/link";
import PublicFooter from "@/components/public-footer";

export const metadata = {
  title: "Luma Protect · Ciberseguridad Ciudadana e Investigación Estudiantil (UNSO)",
  description:
    "Iniciativa independiente de investigación aplicada impulsada por estudiantes de la Licenciatura en Ciberseguridad de la UNSO. Protección familiar activa contra secuestros virtuales, hackeo de WhatsApp y fraudes bancarios sin enviar datos privados a servidores.",
};

export default function LumaProtectHomePage() {
  return (
    <div className="space-y-20 py-4 sm:py-8">
      {/* 1. HERO SECTION CON EL PERSONAJE ANIMADO Y COLORES OFICIALES */}
      <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-slate-950 via-[#0D254C] to-slate-900 px-6 py-16 text-white shadow-2xl sm:px-12 sm:py-20">
        {/* Glow azul y esmeralda de fondo */}
        <div className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-lumaBlue/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Columna de Texto e Impacto */}
            <div className="space-y-6 text-center lg:col-span-7 lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-950/60 px-4 py-1.5 text-xs font-bold text-blue-300 backdrop-blur-md">
                <span>🛡️ Ciberseguridad Ciudadana</span>
                <span>·</span>
                <span>Investigación Estudiantil Independiente</span>
                <span>·</span>
                <span>Argentina & Latinoamérica</span>
              </div>

              <h1 className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                Luma <span className="text-blue-400">Protect</span>
              </h1>

              <p className="text-xl font-bold text-blue-200 sm:text-2xl">
                La plataforma inteligente que protege personas, no solo dispositivos.
              </p>

              <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                Una iniciativa independiente de investigación aplicada y desarrollo tecnológico impulsada por <strong>estudiantes universitarios de la Licenciatura en Ciberseguridad de la Universidad Nacional Raúl Scalabrini Ortiz (UNSO)</strong> en preparación de su trabajo de grado. <em>Este proyecto es de carácter autónomo y no cuenta a la fecha con patrocinio, aval o representación institucional formal de la UNSO.</em>{" "}
                Herramienta asistencial de análisis y verificación preventiva On-Device frente a <strong>intentos de extorsión, transferencias bancarias fraudulentas, vinculación no autorizada de WhatsApp y engaños telefónicos</strong> mediante correlación de contexto e inspección heurística.
                Tecnología procesada localmente en tu teléfono (privacidad estricta Zero-PII), sin publicidad, sin costo y sin enviar tus notificaciones, mensajes ni datos personales a ningún servidor.
              </p>

              {/* Botones de Acción */}
              <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-start">
                <Link
                  href="/verificador"
                  className="w-full rounded-2xl bg-lumaBlue px-8 py-4 text-center text-base font-extrabold text-white shadow-lg shadow-lumaBlue/30 hover:bg-blue-600 transition sm:w-auto"
                >
                  🔍 Probar Verificador Gratuito
                </Link>
                <Link
                  href="/radar"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-800/80 px-8 py-4 text-center text-base font-bold text-white hover:bg-slate-700 transition sm:w-auto"
                >
                  📡 Radar Comunitario
                </Link>
              </div>

              <div className="flex items-center justify-center gap-4 pt-2 text-xs text-slate-400 lg:justify-start">
                <span>🔒 Cero almacenamiento de datos</span>
                <span>·</span>
                <span>Ley 25.326 Zero-PII</span>
                <span>·</span>
                <span>100% Gratuito y Libre</span>
              </div>
            </div>

            {/* Columna con el Personaje Animado Oficial */}
            <div className="flex flex-col items-center justify-center lg:col-span-5">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-lumaBlue/20 to-emerald-400/20 blur-2xl" />
                <img
                  src="/images/luma_animada_transparente.webp"
                  alt="Luma - Personaje Guardián Protector"
                  className="relative z-10 w-full max-w-[340px] drop-shadow-2xl transition hover:scale-105 duration-300"
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
      <section className="mx-auto max-w-4xl space-y-6 rounded-3xl border border-blue-100 bg-gradient-to-br from-lumaBlueSoft/40 via-white to-slate-50 p-6 sm:p-10 shadow-sm">
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

      {/* 5. PANTALLAS REALES DE LA APP Y PROTECCIÓN EN ACCIÓN */}
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
            Tecnología en Tu Teléfono
          </span>
          <h2 className="text-3xl font-black text-lumaText sm:text-4xl">
            Mirá cómo te cuida Luma Protect en vivo
          </h2>
          <p className="text-sm text-lumaSubtext sm:text-base">
            Diseñada especialmente para no requerir conocimientos técnicos y actuar en el segundo exacto donde se produce el engaño:
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
                1. Centro de Control
              </span>
              <h3 className="text-lg font-bold text-lumaText">Herramientas Preventivas</h3>
              <p className="text-xs text-lumaSubtext max-w-xs">
                Monitoreo local adaptado al usuario (ej. Adulto Mayor): análisis preventivo de notificaciones en el dispositivo, escáner QR y verificación segura de mensajes dudosos.
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
                2. Alerta Preventiva en Pantalla
              </span>
              <h3 className="text-lg font-bold text-rose-950">Alerta de Riesgo Detectado</h3>
              <p className="text-xs text-rose-800/90 max-w-xs">
                Ante notificaciones o mensajes con patrones de extracción bancaria o robo de claves, Luma despliega una alerta clara recomendando no responder ni entregar tokens o dinero.
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
                3. Respuesta y Contención
              </span>
              <h3 className="text-lg font-bold text-lumaText">Persona de Confianza y Salida</h3>
              <p className="text-xs text-lumaSubtext max-w-xs">
                Acceso directo de un toque para llamar a tu persona de confianza, salir de forma segura marcando &quot;No responder&quot; y registrar el evento sin guardar datos privados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CÓMO PROTEGE Y SALVAGUARDA DE INFORMACIÓN CRÍTICA */}
      <section className="rounded-3xl border border-slate-800 bg-slate-950 p-8 text-white sm:p-12 space-y-8">
        <div className="max-w-3xl space-y-3">
          <span className="rounded-full bg-blue-500/20 px-3.5 py-1.5 text-xs font-bold text-blue-300">
            Arquitectura de Defensa y Seguridad
          </span>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Cómo funciona el motor de protección de Luma
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed sm:text-base">
            El motor de Luma Protect opera mediante un analizador heurístico y ontológico determinístico directamente en el procesador de tu móvil. Actúa en tres ejes preventivos clave:
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-2xl">🧠</span>
            <h4 className="font-bold text-white text-base">Evaluación Heurística On-Device</h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Inspecciona el texto de SMS y notificaciones en busca de vectores de manipulación (urgencia, coerción, solicitud de extracción o códigos OTP), normalizando caracteres engañosos (*leetspeak*).
            </p>
          </div>

          <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-2xl">📞</span>
            <h4 className="font-bold text-white text-base">Asistencia y Contención Telefónica</h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Detecta el estado de llamada o eventos VoIP para desplegar una guía visual rápida de contención, pausas reflexivas y acceso en un toque a la persona de confianza (sin interceptar ni grabar audio).
            </p>
          </div>

          <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-2xl">🔗</span>
            <h4 className="font-bold text-white text-base">Análisis Forense de Enlaces y QR</h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Evalúa dominios sospechosos mediante entropía de Shannon, distancia Levenshtein y detección de suplantación compuesta (*brand spoofing*) antes de que ingreses a sitios clonados.
            </p>
          </div>
        </div>

        {/* Declaración de Contrainteligencia / Salvaguarda */}
        <aside className="rounded-2xl border border-blue-500/30 bg-blue-950/40 p-5 text-xs text-blue-200 space-y-1.5">
          <p className="font-bold text-blue-100 flex items-center gap-2">
            🛡️ Salvaguarda de Seguridad Operacional y Anti-Evasión:
          </p>
          <p className="leading-relaxed">
            Por estrictas razones de seguridad ciudadana, las expresiones regulares exactas, ponderaciones algorítmicas internas y firmas completas del paquete LKP permanecen <strong>protegidas y encapsuladas</strong> dentro del motor. Esto impide que organizaciones delictivas analicen los mecanismos de detección para diseñar tácticas de evasión o elusión técnica.
          </p>
        </aside>
      </section>

      {/* 7. COMPROMISO HUMANO, FORMULARIO DE DENUNCIA Y ASISTENCIA FORENSE */}
      <section className="space-y-12 rounded-3xl border border-blue-200 bg-gradient-to-b from-blue-50/50 via-white to-slate-50 p-6 sm:p-12 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <span className="rounded-full bg-blue-100 px-3.5 py-1.5 text-xs font-bold text-lumaBlue border border-blue-200">
            Compromiso Social, Acompañamiento & Justicia
          </span>
          <h2 className="text-3xl font-black text-lumaText sm:text-4xl">
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
                Podés radicar tu denuncia formal ante la <strong>Unidad Fiscal Especializada en Ciberdelincuencia (UFECI)</strong> enviando un correo a <code className="bg-slate-800 px-2 py-0.5 rounded text-blue-300 font-mono">denunciasufeci@mpf.gov.ar</code> o acudiendo a la comisaría o fiscalía más cercana con la información estructurada por Luma.
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

      {/* 10. PRÓXIMO LANZAMIENTO EN GOOGLE PLAY STORE */}
      <section id="descarga" className="rounded-3xl border border-blue-200 bg-gradient-to-r from-lumaBlue to-[#0A47A3] p-8 text-white sm:p-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <span className="rounded-full bg-white/20 px-3.5 py-1.5 text-xs font-bold text-white">
              🛡️ Próximamente en Google Play Store · Compilación Oficial Firmada
            </span>
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Luma Protect en tu celular
            </h2>
            <p className="text-sm leading-relaxed text-blue-100 sm:text-base">
              Por tu seguridad y la de tu familia, Luma Protect se distribuirá de forma oficial y directa a través de Google Play Store. No te pediremos descargar archivos APK externos ni habilitar &quot;fuentes desconocidas&quot; en tu dispositivo. Muy pronto disponible de forma libre y gratuita para toda la comunidad.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="mailto:LumaProtect@proton.me?subject=Postulaci%C3%B3n%20Closed%20Testing%20Google%20Play"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-extrabold text-lumaBlue shadow-lg hover:bg-slate-100 transition"
              >
                <span>🧪</span>
                <span>Postularse a la Cohorte de Pruebas</span>
              </a>
              <a
                href="https://t.me/LumaProtectArg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-5 py-3.5 text-sm font-bold text-white hover:bg-white/20 transition"
              >
                <span>📢</span>
                <span>Avisarme del Lanzamiento</span>
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-blue-950/40 p-6 space-y-4 text-xs text-blue-100 backdrop-blur-sm">
            <p className="font-bold text-white text-sm">Garantías de la Compilación Oficial:</p>
            <ol className="list-decimal space-y-2.5 pl-4">
              <li>
                <strong>Firma Criptográfica Oficial:</strong> Distribuida exclusivamente con validación de Google Play Protect, sin alterar configuraciones de seguridad del usuario.
              </li>
              <li>
                <strong>Privacidad Radical Zero-PII (Ley 25.326):</strong> Procesamiento local en el dispositivo. Tus llamadas y mensajes nunca se envían a servidores externos.
              </li>
              <li>
                <strong>Validación Comunitaria:</strong> Evaluada en entornos de prueba cerrados con la participación voluntaria de estudiantes y colaboradores del ámbito académico antes de su apertura general.
              </li>
            </ol>
            <div className="pt-2 border-t border-white/10">
              <Link href="/terminos" className="text-blue-200 underline font-semibold hover:text-white">
                Conocé nuestros Términos de Uso y Privacidad →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER PÚBLICO UNIFICADO */}
      <PublicFooter />
    </div>
  );
}
