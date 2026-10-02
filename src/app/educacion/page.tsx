"use client";

import { useState } from "react";
import PublicFooter from "@/components/public-footer";

const PERFILES = [
  {
    id: "adulto-mayor",
    nombre: "Adulto Mayor",
    icono: "👴👵",
    subtitulo: "Protección tranquila, sin tecnicismos y con apoyo familiar",
    amenazaPrincipal: "El Cuento del Tío telefónico, falsas llamadas de ANSES/PAMI y suplantación de nietos.",
    reglaOro: "Nadie que te quiera o que trabaje de verdad te va a pedir claves ni plata apurado. Ante la duda, cortá y llamá a tu persona de confianza.",
    simulador: {
      escenario:
        "Te llaman por teléfono diciendo que son de ANSES y que tenés una devolución histórica de tu jubilación pendiente. Para cobrarla hoy mismo, te piden que vayas ya a un cajero automático o que les leas el número que figura al dorso de tu tarjeta de débito.",
      opciones: [
        {
          texto: "Ir rápido al cajero antes de que se venza el plazo de pago.",
          correcta: false,
          feedback:
            "❌ ¡Cuidado! ANSES nunca te va a citar a un cajero ni te va a pedir claves para cobrar haberes. Es un intento clásico de fraude.",
        },
        {
          texto: "Cortar la llamada inmediatamente y llamar a un hijo, nieto o familiar de confianza.",
          correcta: true,
          feedback:
            "✅ ¡Excelente! Cortar la comunicación desarma la presión del estafador y te da tiempo para verificar con quienes de verdad te cuidan.",
        },
      ],
    },
    consejos: [
      "No anotes claves ni números de tarjeta en papeles pegados al teléfono o en la heladera.",
      "Si alguien te dice que tu nieto o hijo tuvo un accidente o está secuestrado, cortá y llamá directamente al número que tenés agendado de esa persona.",
      "Activá Luma Protect en tu teléfono con botones grandes y contacto visible.",
    ],
  },
  {
    id: "nino",
    nombre: "Niño / Niña",
    icono: "🧒👧",
    subtitulo: "Avisos claros y amigables orientados a pedir ayuda a un adulto",
    amenazaPrincipal: "Regalos truchos de monedas en videojuegos (Robux, Diamantes Free Fire) y pedidos de fotos o datos de la casa.",
    reglaOro: "Si en un juego o chat alguien te pide contraseñas, secretos o te hace sentir incómodo, dejá el celu y avisale a mamá, papá o a un adulto de tu casa.",
    simulador: {
      escenario:
        "Estás jugando a tu juego favorito y un jugador que no conocés en la vida real te manda un mensaje privado: 'Tengo un truco secreto para darte 10.000 monedas gratis ya. Pasame el número de celular de tu mamá y la clave de tu cuenta'.",
      opciones: [
        {
          texto: "Pasarle los datos para tener las monedas antes que mis amigos.",
          correcta: false,
          feedback:
            "❌ ¡Peligro! Nadie regala monedas por chat. Quieren entrar a la cuenta de tu familia o pedir plata sin que te des cuenta.",
        },
        {
          texto: "Dejar de chatear, no responder nada y mostrarle el celular a un adulto de confianza.",
          correcta: true,
          feedback:
            "✅ ¡Súper bien! Los adultos de tu casa saben cómo bloquear a personas tramposas para que puedas seguir jugando tranquilo.",
        },
      ],
    },
    consejos: [
      "Nunca compartas fotos de tu uniforme escolar, de tu casa ni de tu familia con desconocidos en internet.",
      "Jugá siempre en salas públicas y con la supervisión de un adulto.",
      "Si algo te asusta o te parece raro, recordá que vos no tenés la culpa: pedí ayuda.",
    ],
  },
  {
    id: "adolescente",
    nombre: "Adolescente",
    icono: "🎒📱",
    subtitulo: "Explicaciones directas sobre manipulación digital, ofertas falsas y redes",
    amenazaPrincipal: "Estafas de tareas pagas en Telegram/TikTok, apuestas clandestinas y extorsión por fotos íntimas.",
    reglaOro: "Ningún trabajo real te pide plata para empezar a trabajar o retirar tus ganancias. Si parece magia, es una estafa piramidal.",
    simulador: {
      escenario:
        "Te llega un WhatsApp de una supuesta reclutadora de TikTok o Amazon ofreciéndote ganar $30.000 diarios por dar 'Me Gusta' a videos. Hacés las dos primeras tareas y te pagan $1.500 reales a tu Mercado Pago. Luego te dicen: 'Para pasar al nivel VIP y retirar $80.000, tenés que transferir $10.000 de garantía'.",
      opciones: [
        {
          texto: "Transferir los $10.000 porque ya demostraron que pagan de verdad.",
          correcta: false,
          feedback:
            "❌ ¡Caíste en la trampa! El primer pago chico es un anzuelo. Esos $10.000 no los vas a recuperar nunca y te van a pedir más plata para 'desbloquear el saldo'.",
        },
        {
          texto: "No transferir nada, bloquear al contacto y salirte del grupo de Telegram.",
          correcta: true,
          feedback:
            "✅ ¡Exacto! Identificaste la clásica estafa de tareas. Ganaste la batalla no entregando tu dinero a un esquema de fraude.",
        },
      ],
    },
    consejos: [
      "Nunca compartas fotos íntimas ni en chats efímeros: pueden ser usadas para extorsionarte económicamente.",
      "Activá la verificación en dos pasos (2FA) en tu WhatsApp, Instagram y correo electrónico.",
      "Desconfiá de los 'gurús' de finanzas que te prometen duplicar criptomonedas o ganancias sin riesgo.",
    ],
  },
  {
    id: "general",
    nombre: "Uso General",
    icono: "🛡️💼",
    subtitulo: "Equilibrio entre prevención ágil, seguridad bancaria y comercio digital",
    amenazaPrincipal: "Toma de control de WhatsApp vía buzón de voz, comprobantes falsos en Marketplaces y sitios de phishing bancario.",
    reglaOro: "El saldo y los cobros se verifican adentro de tu propia app bancaria, nunca a través de comprobantes enviados por chat.",
    simulador: {
      escenario:
        "Publicaste una bicicleta usada en Facebook Marketplace por $120.000. Un comprador interesado te dice que te hizo la transferencia pero te manda una captura por $1.200.000 diciendo que 'se equivocó en un cero' y que lo ayudes porque lo van a despedir del trabajo. Minutos después te llama un supuesto 'gerente del banco' para que vayas al cajero o transfieras la diferencia de vuelta.",
      opciones: [
        {
          texto: "Entrar a mi app bancaria por mi cuenta para ver si el dinero realmente impactó en mis movimientos.",
          correcta: true,
          feedback:
            "✅ ¡Impecable! Descubrirás que nunca hubo ninguna transferencia real o que fue un depósito con cheque sin fondos que rebotará. El comprobante era falso.",
        },
        {
          texto: "Hacerle caso al comprador desesperado y devolverle la plata para que no lo echen.",
          correcta: false,
          feedback:
            "❌ ¡Grave error! Es la famosa estafa del 'comprobante trucho'. Si le enviás tu dinero, se lo estás sacando de tu bolsillo a un delincuente.",
        },
      ],
    },
    consejos: [
      "Activá un PIN de seguridad en tu buzón de voz de telefonía móvil (llamá al *86 o a tu operadora) para evitar que te clonen WhatsApp.",
      "Nunca ingreses a tu banco desde enlaces recibidos por SMS o correo electrónico.",
      "Verificá que el dominio web termine exactamente en el sitio oficial de la entidad.",
    ],
  },
];

export default function EducacionPage() {
  const [perfilActivo, setPerfilActivo] = useState(PERFILES[0].id);
  const [eleccionSimulador, setEleccionSimulador] = useState<number | null>(null);

  const perfil = PERFILES.find((p) => p.id === perfilActivo)!;

  const handleCambiarPerfil = (id: string) => {
    setPerfilActivo(id);
    setEleccionSimulador(null);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-12 py-6 sm:py-10">
      {/* 1. HERO INSTITUCIONAL CON LUMA GUÍA */}
      <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-lumaBlueSoft via-white to-blue-50/40 p-6 sm:p-10 shadow-sm">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-lumaBlue shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-lumaGreen animate-pulse" />
              <span>Luma Educación · Centro Pedagógico</span>
              <span>·</span>
              <span>4 Perfiles Canónicos</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-lumaText sm:text-5xl">
              Cuidar a tu familia en <span className="text-lumaBlue">cada etapa digital</span>
            </h1>

            <p className="text-sm text-lumaSubtext leading-relaxed sm:text-base max-w-2xl">
              La tecnología nos conecta, pero las trampas cambian según la edad y los hábitos. Seleccioná el perfil de la persona que querés proteger para ver sus mayores riesgos, la regla de oro y un simulador de casos reales.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center lg:col-span-4">
            <div className="relative group">
              <div className="relative mx-auto h-48 w-48 sm:h-56 sm:w-56 overflow-hidden rounded-3xl border-2 border-blue-200/80 shadow-lg shadow-blue-500/10 bg-white">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/images/luma_profesora.jpg"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  aria-label="Luma Profesora - Centro Pedagógico y Academia"
                >
                  <source src="/videos/luma_profesora.mp4" type="video/mp4" />
                  <img
                    src="/images/luma_profesora.jpg"
                    alt="Luma Profesora - Centro Pedagógico y Academia"
                    className="h-full w-full object-cover"
                  />
                </video>
              </div>
              <div className="mt-3 rounded-2xl border border-blue-200 bg-white p-3 text-center text-xs font-semibold text-lumaText shadow-sm max-w-xs mx-auto">
                <p>
                  <span className="font-bold text-lumaBlue">Luma Profesora:</span> &ldquo;Aprender a cuidarse no tiene por qué ser aburrido ni difícil.&rdquo; 🎓
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SELECTOR DE PERFILES (4 PERFILES CANÓNICOS) */}
      <nav aria-label="Perfiles de usuario" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {PERFILES.map((p) => {
          const activo = p.id === perfilActivo;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => handleCambiarPerfil(p.id)}
              className={`flex flex-col items-center justify-center rounded-3xl border p-5 text-center transition shadow-sm ${
                activo
                  ? "border-lumaBlue bg-lumaBlueSoft ring-2 ring-lumaBlue/20 shadow-md"
                  : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
              }`}
            >
              <span className="text-3xl sm:text-4xl">{p.icono}</span>
              <span className={`mt-2 font-bold text-sm ${activo ? "text-lumaBlue font-extrabold" : "text-lumaText"}`}>
                {p.nombre}
              </span>
            </button>
          );
        })}
      </nav>

      {/* 3. DETALLE DEL PERFIL ACTIVO */}
      <section className="space-y-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          <span className="text-4xl sm:text-5xl">{perfil.icono}</span>
          <div>
            <h2 className="text-2xl font-black text-lumaText sm:text-3xl">{perfil.nombre}</h2>
            <p className="text-xs sm:text-sm text-lumaSubtext">{perfil.subtitulo}</p>
          </div>
        </div>

        {/* Amenaza Principal y Regla de Oro */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-rose-100 bg-rose-50/40 p-6 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800">
              ⚠️ Mayor riesgo para este perfil
            </h3>
            <p className="text-sm font-semibold text-rose-950 leading-relaxed">{perfil.amenazaPrincipal}</p>
          </div>
          <div className="rounded-3xl border border-blue-100 bg-lumaBlueSoft/60 p-6 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-lumaBlue">
              🛡️ Regla de Oro (&ldquo;Luma Cuidadora&rdquo;)
            </h3>
            <p className="text-sm font-semibold text-lumaText leading-relaxed">{perfil.reglaOro}</p>
          </div>
        </div>

        {/* Simulador Interactivo */}
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-lumaText flex items-center gap-2">
              <span>🎮</span> Simulador de Decisión: ¿Qué harías en este caso?
            </h3>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-lumaBlue">
              Caso Real
            </span>
          </div>

          <div className="rounded-2xl bg-white p-5 text-sm font-medium leading-relaxed text-lumaText shadow-sm border border-slate-200/80">
            &ldquo;{perfil.simulador.escenario}&rdquo;
          </div>

          <div className="space-y-3 pt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-lumaSubtext">
              Elegí la opción más segura:
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {perfil.simulador.opciones.map((opcion, idx) => {
                const seleccionada = eleccionSimulador === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setEleccionSimulador(idx)}
                    className={`rounded-2xl border p-4 text-left text-xs sm:text-sm font-semibold transition ${
                      seleccionada
                        ? opcion.correcta
                          ? "border-emerald-500 bg-emerald-50 text-emerald-950 shadow-sm"
                          : "border-rose-500 bg-rose-50 text-rose-950 shadow-sm"
                        : "border-slate-200 bg-white text-lumaText hover:border-blue-200 hover:bg-slate-50"
                    }`}
                  >
                    <span className="mr-2 font-black text-lumaBlue">{idx === 0 ? "A)" : "B)"}</span>
                    {opcion.texto}
                  </button>
                );
              })}
            </div>
          </div>

          {eleccionSimulador !== null && (
            <div
              className={`rounded-2xl border p-5 text-xs sm:text-sm font-medium leading-relaxed ${
                perfil.simulador.opciones[eleccionSimulador].correcta
                  ? "border-emerald-200 bg-emerald-50 text-emerald-950"
                  : "border-rose-200 bg-rose-50 text-rose-950"
              }`}
            >
              {perfil.simulador.opciones[eleccionSimulador].feedback}
            </div>
          )}
        </div>

        {/* 3 Recomendaciones */}
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-lumaText">3 Recomendaciones esenciales para el día a día:</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {perfil.consejos.map((consejo, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 text-xs text-lumaSubtext leading-relaxed space-y-2">
                <span className="block font-black text-lumaBlue text-sm">0{idx + 1}.</span>
                <p className="text-lumaText font-medium">{consejo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. KITS COMUNITARIOS */}
      <section className="space-y-4 rounded-3xl bg-slate-950 p-8 sm:p-10 text-white">
        <h2 className="text-2xl font-bold">Materiales Comunitarios Gratuitos</h2>
        <p className="max-w-2xl text-xs sm:text-sm text-slate-300">
          Plantillas e infografías preparadas en lenguaje accesible para imprimir o compartir en grupos de WhatsApp de familias, centros de jubilados y escuelas.
        </p>
        <div className="grid gap-5 pt-3 sm:grid-cols-3">
          {/* Folleto Adulto Mayor */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">👴👵</span>
                <span className="inline-block rounded-full bg-blue-500/20 px-2.5 py-1 text-[11px] font-bold text-blue-300">Formato A4</span>
              </div>
              <h3 className="font-bold text-white text-base">Folleto Adulto Mayor</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Guía de 1 página con letras gigantes para dejar pegada junto al teléfono fijo o en la heladera.
              </p>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="/materiales/folleto-adultos-mayores-luma.pdf"
                download="folleto-adultos-mayores-luma.pdf"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-lumaBlue px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-600 transition shadow-sm"
              >
                <span>📥</span> Descargar PDF Imprimible
              </a>
              <a
                href="/materiales/folleto-adultos-mayores.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition"
              >
                <span>👁️</span> Ver en Navegador
              </a>
            </div>
          </div>

          {/* Taller Escolar */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🎒🏫</span>
                <span className="inline-block rounded-full bg-purple-500/20 px-2.5 py-1 text-[11px] font-bold text-purple-300">Guion 30 min</span>
              </div>
              <h3 className="font-bold text-white text-base">Taller Escolar y Familias</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dinámica de 30 minutos para docentes y familias sobre trampas en juegos, grooming y apuestas.
              </p>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="/materiales/guia-taller-escolar-luma.pdf"
                download="guia-taller-escolar-luma.pdf"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-purple-500 transition shadow-sm"
              >
                <span>📥</span> Descargar Guía PDF
              </a>
              <a
                href="/materiales/guia-taller-escolar.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition"
              >
                <span>👁️</span> Ver en Navegador
              </a>
            </div>
          </div>

          {/* Seguridad en Comercios */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🏪🧾</span>
                <span className="inline-block rounded-full bg-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-300">Afiche Mostrador</span>
              </div>
              <h3 className="font-bold text-white text-base">Seguridad en Comercios</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Protocolo de cobro seguro contra la estafa del comprobante de transferencia y QR adulterado.
              </p>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="/materiales/afiche-seguridad-comercios-luma.pdf"
                download="afiche-seguridad-comercios-luma.pdf"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition shadow-sm"
              >
                <span>📥</span> Descargar Afiche PDF
              </a>
              <a
                href="/materiales/afiche-seguridad-comercios.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition"
              >
                <span>👁️</span> Ver en Navegador
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER PÚBLICO UNIFICADO */}
      <PublicFooter />
    </div>
  );
}
