import Link from "next/link";
import PublicFooter from "@/components/public-footer";

export const metadata = {
  title: "Radar Comunitario · Luma Inteligencia Ciudadana",
  description:
    "Visibilización comunitaria de estafas y modalidades delictivas. No se puede proteger lo que no se conoce. Rompiendo el silencio y la vergüenza.",
};

const PATRONES_CRITICOS = [
  {
    codigo: "Patrón #01",
    nombre: "Secuestro Virtual y Extorsión Emocional",
    foco: "Madres, padres y adultos mayores",
    entidadesImitadas: ["Falso hijo/a", "Falso comisario", "Servicios de emergencia"],
    modusOperandi:
      "Llamadas en horas de la madrugada simulando llantos y gritos desesperados. La táctica es inducir un shock emocional agudo que anule la capacidad de razonamiento para exigir dinero o joyas antes de corroborar si el familiar está a salvo.",
    accionPreventiva: "Poné la llamada en altavoz, respirá hondo y llamá a tu familiar desde otro teléfono. Definí una palabra clave familiar.",
  },
  {
    codigo: "Patrón #02",
    nombre: "Suplantación Bancaria y Robo de Token OTP",
    foco: "Usuarios de billeteras virtuales y homebanking",
    entidadesImitadas: ["Mercado Pago", "Cuenta DNI", "Bancos tradicionales", "ARCA / AFIP"],
    modusOperandi:
      "Mensajes urgentes advirtiendo sobre un supuesto bloqueo de cuenta o cobro no reconocido. Guían a la víctima a una página clonada idéntica a la original o le solicitan el código de seguridad de 6 dígitos recibido por SMS.",
    accionPreventiva: "Ninguna entidad bancaria ni billetera te pide códigos de seguridad ni claves por WhatsApp o teléfono. Cortá y verificá.",
  },
  {
    codigo: "Patrón #03",
    nombre: "Falsas Ofertas de Empleo y Estafas de Tareas",
    foco: "Jóvenes, estudiantes y personas en búsqueda laboral",
    entidadesImitadas: ["YouTube Partners", "TikTok Marketing", "Empresas internacionales"],
    modusOperandi:
      "Contactan ofreciendo pagos diarios por suscribirse a canales o dar 'likes'. Pagan una suma simbólica inicial ($1.000 a $2.000) para generar confianza, y luego exigen transferencias de 'garantía' para desbloquear tareas que nunca se reintegran.",
    accionPreventiva: "Ningún empleo legítimo te cobra dinero ni te pide depositar garantías para permitirte trabajar.",
  },
  {
    codigo: "Patrón #04",
    nombre: "Falso Familiar por WhatsApp (Reemplazo de Identidad)",
    foco: "Círculo familiar y amigos cercanos",
    entidadesImitadas: ["Hijo/a", "Nieto/a", "Amigo cercano con número nuevo"],
    modusOperandi:
      "Escriben desde una línea desconocida con la foto de perfil de un ser querido diciendo 'agendá mi nuevo número porque se me rompió el celu'. Horas después, fingen una urgencia económica solicitando una transferencia inmediata a un alias ajeno.",
    accionPreventiva: "Llamá por llamada telefónica tradicional (no por WhatsApp) a la persona antes de transferir un solo peso.",
  },
  {
    codigo: "Patrón #05",
    nombre: "Secuestro de Cuenta WhatsApp (Robo de Token SMS)",
    foco: "Comunidad general, profesionales y comerciantes",
    entidadesImitadas: ["Contactos agendados hackeados", "Falso soporte técnico", "Falsos turnos sanitarios"],
    modusOperandi:
      "Llega un mensaje de un conocido diciendo 'te mandé un código de 6 dígitos por error a tu celular, ¿me lo pasás?'. Ese código es el token oficial de registro de WhatsApp que permite al atacante apoderarse de la cuenta.",
    accionPreventiva: "Nunca compartas códigos de 6 dígitos recibidos por SMS. Activá de inmediato la verificación en dos pasos en Ajustes > Cuenta de WhatsApp.",
  },
  {
    codigo: "Patrón #06",
    nombre: "Fraude del Falso Comprador y Triangulación",
    foco: "Vendedores en plataformas digitales, clasificados y emprendedores",
    entidadesImitadas: ["Supuesto comprador", "Falso sector de retenciones bancarias", "Soporte de billeteras"],
    modusOperandi:
      "El supuesto comprador envía un comprobante de transferencia falso con un monto muy superior al pactado (ej: $500.000 en vez de $50.000) y ruega desesperado la devolución inmediata de la diferencia, o hace intervenir a un supuesto asesor bancario para tramitar préstamos no autorizados.",
    accionPreventiva: "Verificá la acreditación real entrando a tu app oficial. El comprobante en captura o PDF no prueba que el dinero haya ingresado.",
  },
];

export default function RadarPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 py-6 sm:py-10">
      {/* 1. HERO Y MANIFIESTO CÍVICO CON LA MASCOTA */}
      <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-lumaBlueSoft via-white to-blue-50/40 p-6 sm:p-10 shadow-sm">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-lumaBlue shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-lumaBlue animate-ping" />
              <span>Radar de Inteligencia Ciudadana</span>
              <span>·</span>
              <span>Observatorio Comunitario</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-lumaText sm:text-5xl">
              &ldquo;No se puede proteger lo que <span className="text-lumaBlue">no se conoce</span>&rdquo;
            </h1>

            <p className="text-sm text-lumaSubtext leading-relaxed sm:text-base max-w-2xl">
              En Argentina y la región, miles de familias sufren engaños digitales y <strong>la gran mayoría no denuncia por vergüenza, resignación o desinformación</strong>. 
              El silencio beneficia a los ciberdelincuentes. El Radar Comunitario de Luma nace para visibilizar los patrones y transformar la experiencia en protección para todos.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/verificador"
                className="rounded-xl bg-lumaBlue px-5 py-3 text-xs font-bold text-white shadow-md shadow-lumaBlue/25 hover:bg-blue-700 transition"
              >
                🔍 Probar Verificador Ciudadano
              </Link>
              <Link
                href="/educacion"
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-lumaText shadow-sm hover:bg-slate-50 transition"
              >
                📚 Programas Educativos Familiares
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center lg:col-span-4">
            <div className="relative mx-auto h-48 w-48 sm:h-56 sm:w-56 drop-shadow-md">
              <img
                src="/images/luma_animada_transparente.webp"
                alt="Luma Protegiendo a la Comunidad"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="mt-2 rounded-2xl border border-blue-200 bg-white p-3 text-center text-xs font-semibold text-lumaText shadow-sm max-w-xs">
              &ldquo;Visibilizar el problema es el primer paso para combatirlo juntos.&rdquo;
            </div>
          </div>
        </div>
      </section>

      {/* 2. LOS 3 PILARES SOCIALES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black text-lumaText">
          ¿Por qué es indispensable visibilizar el cibercrimen?
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 border border-rose-100 text-2xl">
              💔
            </div>
            <h3 className="text-base font-bold text-lumaText">Romper la Culpa y la Vergüenza</h3>
            <p className="text-xs leading-relaxed text-lumaSubtext">
              Caer en una trampa digital <strong>no es ingenuidad ni culpa de la víctima</strong>. Los estafadores usan técnicas de extorsión y manipulación psicológica diseñadas para generar pánico y urgencia.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 text-2xl">
              📊
            </div>
            <h3 className="text-base font-bold text-lumaText">Estadísticas para Asignar Recursos</h3>
            <p className="text-xs leading-relaxed text-lumaSubtext">
              Lo que no se mide no existe para el presupuesto público ni para la justicia. Visibilizar el impacto real del fraude permite canalizar recursos institucionales y leyes efectivas.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100 text-2xl">
              🛡️
            </div>
            <h3 className="text-base font-bold text-lumaText">Inteligencia sin Espionaje (Zero-PII)</h3>
            <p className="text-xs leading-relaxed text-lumaSubtext">
              Bajo la <strong>Ley 25.326</strong>, la inteligencia comunitaria se construye exclusivamente con patrones técnicos anonimizados. Tus mensajes, audios y contactos personales permanecen en tu celular.
            </p>
          </div>
        </div>
      </section>

      {/* 3. TRANSPARENCIA RADICAL (CERO DATOS SIMULADOS) */}
      <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-8 text-white space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-300">
            Transparencia y Calibración Comunitaria
          </span>
        </div>
        <h3 className="text-xl font-bold">Compromiso con la Verdad: Cero Datos Inventados</h3>
        <p className="text-xs sm:text-sm leading-relaxed text-slate-300 max-w-4xl">
          En Luma no publicamos gráficos simulados ni porcentajes falsos. La telemetría comunitaria se nutrirá progresivamente de los eventos anónimos validados por la comunidad. Actualmente compartimos el catálogo oficial de modalidades críticas tipificadas para que aprendas a reconocerlas a tiempo.
        </p>
      </section>

      {/* 4. CATÁLOGO DE MODALIDADES CRÍTICAS */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-lumaText">
            Modalidades y Patrones de Engaño Frecuentes
          </h2>
          <p className="text-xs text-lumaSubtext mt-1">
            Conocé cómo operan las 6 modalidades de engaño más frecuentes en Argentina y cómo defender a tu familia.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {PATRONES_CRITICOS.map((patron) => (
            <article
              key={patron.codigo}
              className="flex flex-col justify-between space-y-4 rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm hover:border-blue-200 transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-xl bg-lumaBlueSoft px-3 py-1 text-xs font-black text-lumaBlue">
                    {patron.codigo}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Foco: {patron.foco}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-lumaText">{patron.nombre}</h3>
                <p className="text-xs leading-relaxed text-lumaSubtext sm:text-sm">{patron.modusOperandi}</p>

                <div className="rounded-2xl bg-slate-50 p-3.5 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-lumaText">Entidades o identidades que imitan: </span>
                  <p className="text-slate-600">{patron.entidadesImitadas.join(", ")}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-lumaBlueSoft/60 p-4 text-xs font-medium text-lumaText">
                <span className="font-bold text-lumaBlue">🛡️ Protocolo de Acción Luma: </span>
                <span>{patron.accionPreventiva}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. FOOTER PÚBLICO UNIFICADO */}
      <PublicFooter />
    </div>
  );
}
