"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { evaluateClientScam, ClientScamResult } from "@/lib/client-scam-evaluator";
import PublicFooter from "@/components/public-footer";

const EJEMPLOS = [
  {
    titulo: "💳 Suplantación Bancaria",
    texto: "Aviso de Banco Galicia: Detectamos una transferencia sospechosa desde un nuevo dispositivo. Para cancelarla ingrese urgente a https://seguridad-galicia-alerta.net y confirme su token de seguridad de 6 dígitos.",
  },
  {
    titulo: "🚨 Falso Secuestro",
    texto: "Tenemos a tu hija, la tenemos acá conmigo y está lastimada. Si no transferís toda la plata a este CBU en 10 minutos no la ves más. No cortes ni llames a la policía.",
  },
  {
    titulo: "💸 Mula Financiera / Triangulación",
    texto: "Hola mi nombre es Cosme Fulanito, te transferi por error a mercado pago, te envie cien mil pesos de mi cuenta, por favor necesito que transfieras el importe a esta otra cuenta de mercado pago el alias es; cuentamercadopago.mp necesito la plata para cubrir un cheque antes de las 15 Hs a lo van a rechazar.",
  },
  {
    titulo: "💼 Estafa de Tareas Telegram",
    texto: "¡Hola! Somos de la agencia de marketing de YouTube. Podés ganar entre $15.000 y $50.000 diarios simplemente mirando videos y dando 'Me Gusta'. Unite a nuestro canal de Telegram para empezar con tu primera misión remunerada.",
  },
  {
    titulo: "📱 Falso Familiar por WhatsApp",
    texto: "Hola má, se me rompió el celu y este es mi nuevo número provisorio. Agendame porfa. Necesito pedirte un favor urgente, ¿me podrás transferir al alias de un amigo que tengo que pagar algo y no me anda la app?",
  },
  {
    titulo: "📉 Falsa Inversión / Premio Temu",
    texto: "¡Felicitaciones! Por tu compra en Temu ganaste un premio de $500.000. Para cobrarlo o invertirlo en nuestra plataforma petrolera con retiro inmediato, verificá tu cuenta bancaria con el asesor en línea.",
  },
  {
    titulo: "💻 Error Técnico Python/Django",
    texto: "Traceback (most recent call last):\n  File 'manage.py', line 12, in <module>\n    from django.core.management import execute_from_command_line\nOperationalError: (2002, \"Can't connect to MySQL server on '127.0.0.1' (111)\")\nInternal Server Error 500",
  },
  {
    titulo: "📧 Rebote Servidor SMTP (550 5.1.1)",
    texto: "550 5.1.1 The email account that you tried to reach does not exist. Please try double-checking the recipient's email address for typos or unnecessary spaces.",
  },
];

export default function VerificadorPage() {
  const [input, setInput] = useState("");
  const [analyzedText, setAnalyzedText] = useState("");
  const [resultado, setResultado] = useState<ClientScamResult | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Estados de Telemetría y Feedback del Laboratorio
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackType, setFeedbackType] = useState<
    "ACERTADO" | "FALSO_POSITIVO" | "FALSO_NEGATIVO" | "REGISTRO_TECNICO" | "OTRO"
  >("FALSO_POSITIVO");
  const [feedbackNotes, setFeedbackNotes] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState<"IDLE" | "SENDING" | "SENT" | "ERROR">("IDLE");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  // Desplazamiento automático suave hacia la sección de diagnóstico cuando se genera o cambia el resultado
  useEffect(() => {
    if (resultado) {
      const timer = setTimeout(() => {
        const el = document.getElementById("diagnostico-laboratorio");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [resultado]);

  const handleEjecutarAnalisis = (texto: string) => {
    const clean = texto.trim();
    if (!clean) return;

    setAcceptedTerms(true);
    setAnalyzedText(clean);
    setInput(""); // Borrado inmediato del texto ingresado según directiva de usabilidad
    setFeedbackStatus("IDLE");
    setShowFeedbackModal(false);

    const res = evaluateClientScam(clean);
    setResultado(res);
  };

  const handleSendFeedback = async (directType?: "ACERTADO" | "FALSO_POSITIVO" | "FALSO_NEGATIVO" | "REGISTRO_TECNICO" | "OTRO") => {
    const textToSend = analyzedText.trim() || input.trim();
    if (!textToSend || !resultado) return;

    setFeedbackStatus("SENDING");
    const chosenType = directType || feedbackType;

    try {
      const res = await fetch("/api/laboratorio/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToSend, // Sanitizado con Zero-PII en backend
          riskScore: resultado.riskScore,
          riskLevel: resultado.riskLevel,
          threatCategory: resultado.threatCategory,
          isTechnicalLog: Boolean(resultado.isTechnicalLog),
          feedbackType: chosenType,
          notes: feedbackNotes,
          canonicalMatches: resultado.matchedLkps || [],
          isCombinedAttack: Boolean(resultado.isCombinedAttack),
          primaryPrinciple: resultado.manipulationVector?.primaryPrinciple || null,
          psychologicalVector: resultado.manipulationVector || null,
        }),
      });

      if (!res.ok) {
        throw new Error("No se pudo enviar el reporte");
      }

      setFeedbackStatus("SENT");
      setFeedbackMsg(
        chosenType === "ACERTADO"
          ? "¡Gracias por confirmar! Tu validación fortalece las métricas de acierto del Laboratorio."
          : "¡Reporte registrado con éxito! El equipo de investigación procesará este caso para la calibración del sistema."
      );
      if (directType === "ACERTADO") {
        setShowFeedbackModal(false);
      }
    } catch {
      setFeedbackStatus("ERROR");
      setFeedbackMsg("Hubo un problema al registrar el reporte. Por favor, reintentá en unos momentos.");
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-10 py-6 sm:py-10">
      {/* 1. HERO INSTITUCIONAL: LABORATORIO CIUDADANO UNSO */}
      <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-lumaBlueSoft via-white to-blue-50/40 p-6 sm:p-10 shadow-sm">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          {/* Columna Texto */}
          <div className="space-y-4 lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-lumaBlue shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
                <span>🧪 Motor Heurístico y Ontológico On-Device (ADR-013)</span>
                <span>·</span>
                <span>Privacidad Radical (Zero-PII)</span>
                <span>·</span>
                <span>Doctrina $0.00 (Fase 1)</span>
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-lumaText sm:text-5xl">
              Laboratorio Ciudadano de <span className="text-lumaBlue">Detección de Ingeniería Social</span>
            </h1>

            <p className="text-sm text-lumaSubtext leading-relaxed sm:text-base max-w-2xl">
              Iniciativa independiente de investigación aplicada y desarrollo tecnológico impulsada por <strong>estudiantes de la Licenciatura en Ciberseguridad de la Universidad Nacional Raúl Scalabrini Ortiz (UNSO)</strong> en el marco de sus prácticas de grado. Probá mensajes sospechosos con ejecución y análisis 100% local en tu navegador. <strong>Tu feedback colabora directamente con el equipo de investigación para calibrar el motor que protegerá a la ciudadanía en la app móvil.</strong>
            </p>
          </div>

          {/* Columna Luma Investigadora */}
          <div className="flex flex-col items-center justify-center lg:col-span-4">
            <div className="relative group w-full max-w-xs sm:max-w-sm">
              <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-3xl border-2 border-cyan-400/40 shadow-xl shadow-cyan-500/10 bg-slate-900">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/images/luma_investigadora.jpg"
                  className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
                  aria-label="Luma Investigadora - Laboratorio de Análisis Forense"
                >
                  <source src="/videos/luma_investigadora.mp4" type="video/mp4" />
                  <img
                    src="/images/luma_investigadora.jpg"
                    alt="Luma Investigadora - Laboratorio de Análisis Forense"
                    className="h-full w-full object-cover object-[center_60%]"
                  />
                </video>
              </div>

              {/* Globo de Diálogo de Luma */}
              <div className="mt-3 rounded-2xl border border-blue-200 bg-white p-3.5 text-center text-xs font-medium text-lumaText shadow-sm max-w-xs mx-auto">
                <p>
                  <span className="font-bold text-lumaBlue">Luma Investigadora:</span> &ldquo;Pegá un mensaje sospechoso para inspeccionar sus vectores de ataque de forma instantánea.&rdquo; 🔬
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1.1 AVISO DE DELIMITACIÓN INSTITUCIONAL */}
      <aside className="rounded-2xl border border-slate-200 bg-slate-50/90 p-4 text-[11px] text-slate-600 flex items-start gap-3 shadow-xs">
        <span className="text-base shrink-0">🏛️</span>
        <p className="leading-relaxed">
          <strong>Aviso de Delimitación Institucional:</strong> Este desarrollo es un proyecto de investigación tecnológica autónomo e independiente llevado a cabo por estudiantes de la Licenciatura en Ciberseguridad de la Universidad Nacional Raúl Scalabrini Ortiz (UNSO) como parte preparatoria de su Trabajo Final Integrador (TFI). La Universidad Nacional Raúl Scalabrini Ortiz (UNSO) no forma parte societaria, no administra, no financia ni ha emitido a la fecha aval institucional formal ni homologación sobre este software o sus diagnósticos.
        </p>
      </aside>

      {/* 2. BANNER DE FASE EXPERIMENTAL Y PROTOCOLO DE TESTEO */}
      <aside className="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-4 text-xs text-indigo-950 flex flex-col sm:flex-row items-start gap-3 shadow-sm">
        <span className="text-xl shrink-0">🔬</span>
        <div className="space-y-1">
          <p className="font-bold text-indigo-900">
            Aviso de Fase Experimental y Protocolo de Calibración Comunitaria:
          </p>
          <p className="leading-relaxed text-indigo-900/90">
            Este evaluador es un modelo experimental en entrenamiento continuo por el equipo de ciberseguridad. <strong>Puede arrojar falsos positivos o no identificar variantes delictivas novedosas</strong>. Si en el marco de consultas académicas o de soporte pegás <strong>mensajes de error de servidores o código</strong>, el sistema los identificará como <em>&quot;Registro Técnico (Fuera de Alcance)&quot;</em> para no confundirlos con estafas ciudadanas.
          </p>
        </div>
      </aside>

      {/* 2.1 CONSEJO DE SEGURIDAD ANTE TRANSFERENCIAS */}
      <aside className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-950 flex flex-col sm:flex-row items-start gap-3 shadow-sm">
        <span className="text-xl shrink-0">💡</span>
        <div className="space-y-1">
          <p className="font-bold text-amber-900">
            Consejo importante ante transferencias o dinero inesperado:
          </p>
          <p className="leading-relaxed text-amber-900/90">
            Si recibiste una transferencia por error, la única vía segura y legal para reintegrarla es utilizar la opción oficial <strong>&quot;Devolver&quot;</strong> dentro de la aplicación de tu propio banco o billetera virtual. Nunca hagas transferencias manuales a cuentas o alias provistos por chat para evitar maniobras de triangulación o compromisos patrimoniales.
          </p>
        </div>
      </aside>

      {/* 2.2 GARANTÍA DE PRIVACIDAD LEY 25.326 */}
      <aside className="rounded-2xl border border-blue-200/80 bg-lumaBlueSoft/60 p-5 text-xs text-lumaText sm:text-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-blue-100 shadow-sm p-1.5">
          <img
            src="/images/luma_shield.png"
            alt="Escudo Oficial Luma"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="space-y-0.5">
          <p className="font-bold text-lumaBlue">
            Compromiso de Privacidad Total (Ley Nacional 25.326):
          </p>
          <p className="text-lumaSubtext text-xs leading-relaxed">
            El texto analizado se procesa exclusivamente en la memoria local de tu navegador vía JavaScript. <strong>No guardamos registros de tus consultas ni transmitimos tus conversaciones a internet</strong>. Solo si decidís enviar feedback voluntario, el sistema sanitiza automáticamente cualquier dato sensible antes de remitirlo al equipo de investigación.
          </p>
        </div>
      </aside>

      {/* 3. ÁREA DE ANÁLISIS */}
      <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="space-y-1">
          <label htmlFor="mensaje-input" className="block text-base font-extrabold text-lumaText">
            Pegá o escribí el mensaje que querés evaluar:
          </label>
          <p className="text-xs text-lumaSubtext">
            Puede ser un audio transcripto, un SMS bancario, un supuesto reclamo de compra, una oferta de trabajo o un chat de WhatsApp.
          </p>
        </div>

        <textarea
          id="mensaje-input"
          rows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              handleEjecutarAnalisis(input);
            }
          }}
          placeholder="Ej: 'Aviso del Banco: Detectamos una transferencia extraña. Para frenarla urgente entrá al enlace y poné tu clave de 6 dígitos...'"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-lumaText placeholder:text-slate-400 focus:border-lumaBlue focus:bg-white focus:outline-none focus:ring-4 focus:ring-lumaBlue/10 transition"
        />

        {/* Checkbox de Términos Preventivos */}
        <div className="space-y-1 pt-1">
          <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => {
                const checked = e.target.checked;
                setAcceptedTerms(checked);
                if (checked && input.trim()) {
                  handleEjecutarAnalisis(input);
                } else if (!checked) {
                  setResultado(null);
                }
              }}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-lumaBlue focus:ring-lumaBlue shrink-0 cursor-pointer"
            />
            <span className="leading-relaxed">
              Acepto participar del{" "}
              <Link href="/terminos" target="_blank" className="font-semibold text-lumaBlue underline hover:text-blue-800">
                Laboratorio Experimental de Calibración
              </Link>
              . Comprendo que este asistente ofrece una orientación pedagógica y de investigación comunitaria, sin reemplazar la consulta oficial con la entidad bancaria ni la denuncia formal.
            </span>
          </label>
        </div>

        {/* Botón Principal de Verificación y Limpiar */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => handleEjecutarAnalisis(input)}
            disabled={!input.trim()}
            className="inline-flex items-center gap-2 rounded-2xl bg-lumaBlue px-6 py-3.5 text-sm font-extrabold text-white shadow-md shadow-lumaBlue/25 hover:bg-blue-700 transition disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            <span>🔍</span>
            <span>Verificar Mensaje Ahora</span>
          </button>
          {input && (
            <button
              type="button"
              onClick={() => {
                setInput("");
              }}
              className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-bold text-rose-700 hover:bg-rose-100 transition cursor-pointer"
            >
              ✕ Limpiar texto
            </button>
          )}
        </div>

        {/* Ejemplos Frecuentes */}
        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          <p className="text-xs font-bold uppercase tracking-wider text-lumaSubtext">
            O probá con estos casos de prueba frecuentes:
          </p>
          <div className="flex flex-wrap gap-2">
            {EJEMPLOS.map((ej) => (
              <button
                key={ej.titulo}
                type="button"
                onClick={() => handleEjecutarAnalisis(ej.texto)}
                className="rounded-xl border border-blue-100 bg-lumaBlueSoft/60 px-3.5 py-2 text-xs font-bold text-lumaBlue hover:bg-lumaBlue hover:text-white transition shadow-sm cursor-pointer"
              >
                {ej.titulo}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RESULTADO DE LA EVALUACIÓN */}
      {resultado && (
        <section
          id="diagnostico-laboratorio"
          aria-live="polite"
          className={`scroll-mt-8 space-y-6 rounded-3xl border p-6 sm:p-8 shadow-sm transition ${
            resultado.isTechnicalLog
              ? "border-indigo-200 bg-indigo-50/40"
              : resultado.riskLevel === "CRÍTICO"
              ? "border-rose-200 bg-rose-50/40"
              : resultado.riskLevel === "ALTO"
              ? "border-amber-200 bg-amber-50/40"
              : resultado.riskLevel === "MEDIO"
              ? "border-yellow-200 bg-yellow-50/40"
              : "border-slate-300 bg-slate-50/70"
          }`}
        >
          {/* Header del Diagnóstico */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-lumaSubtext">
                Diagnóstico del Laboratorio Ciudadano
              </p>
              <h2 className="text-2xl font-black text-lumaText sm:text-3xl">
                {resultado.threatCategory}
              </h2>
            </div>
            <div>
              <span
                className={`inline-block rounded-full px-5 py-2 text-xs font-black tracking-wider uppercase shadow-sm ${
                  resultado.isTechnicalLog
                    ? "bg-indigo-700 text-white"
                    : resultado.riskLevel === "CRÍTICO"
                    ? "bg-rose-600 text-white"
                    : resultado.riskLevel === "ALTO"
                    ? "bg-amber-600 text-white"
                    : resultado.riskLevel === "MEDIO"
                    ? "bg-yellow-600 text-white"
                    : "bg-slate-700 text-white"
                }`}
              >
                Nivel {resultado.riskLevel} · Score {resultado.riskScore}/100
              </span>
            </div>
          </div>

          {/* Mensaje Analizado con opción de recuperación / re-edición */}
          {analyzedText && (
            <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-sm space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <span>💬</span>
                  <span>Mensaje analizado:</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setInput(analyzedText);
                    const el = document.getElementById("mensaje-input");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "center" });
                      el.focus();
                    }
                  }}
                  className="text-xs font-bold text-lumaBlue hover:underline flex items-center gap-1 cursor-pointer"
                  title="Volver a cargar este texto en el área de escritura"
                >
                  <span>✏️</span>
                  <span>Volver a cargar en el cuadro de texto ↑</span>
                </button>
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed whitespace-pre-wrap bg-slate-50 rounded-xl p-3 border border-slate-100 font-mono">
                "{analyzedText}"
              </p>
            </div>
          )}

          {/* Ontología Canónica LKP Identificada (Multi-Label) */}
          {resultado.matchedLkps && resultado.matchedLkps.length > 0 && (
            <div className="space-y-3 rounded-2xl border border-blue-200 bg-white/95 p-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-lumaBlue flex items-center gap-1.5">
                  <span>🛡️</span>
                  <span>Ontología Canónica LKP {resultado.isCombinedAttack ? "· ¡Ataque Compuesto Multi-Vector!" : "Identificada"}</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  Fase 2: Motor Heurístico y Ontológico
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {resultado.matchedLkps.map((lkp) => (
                  <div key={lkp.code} className="flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50/70 px-3 py-1.5 text-xs">
                    <span className="font-extrabold text-blue-900">{lkp.code}</span>
                    <span className="text-slate-700 font-medium">{lkp.name}</span>
                    <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-black text-white">
                      {lkp.confidence}%
                    </span>
                  </div>
                ))}
              </div>
              {resultado.isCombinedAttack && (
                <p className="text-xs text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200 leading-relaxed">
                  ⚠️ <strong>Ataque Multivectorial:</strong> Los atacantes combinan múltiples estrategias ({resultado.matchedLkps.map((m) => m.code).join(" + ")}) simultáneamente para desorientar a la víctima y aumentar la tasa de éxito del engaño.
                </p>
              )}
            </div>
          )}

          {/* Vector de Manipulación Psicológica (Framework Cialdini & Kahneman) */}
          {resultado.manipulationVector && !resultado.isTechnicalLog && (
            <div className="space-y-4 rounded-2xl border border-purple-200/90 bg-gradient-to-br from-purple-50/50 via-white to-slate-50 p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-purple-100 pb-3">
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                    <span>🧠</span>
                    <span>Vector de Manipulación Psicológica (Framework Cialdini / Kahneman)</span>
                  </h3>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Medición continua de palancas coercitivas sobre el pensamiento impulsivo (Sistema 1)
                  </p>
                </div>
                <span className="text-[11px] font-bold text-purple-700 bg-purple-100 border border-purple-200 px-2.5 py-1 rounded-full">
                  {resultado.manipulationVector.primaryPrinciple}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
                {/* 1. Urgencia */}
                <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1">⚡ Urgencia</span>
                    <span className={resultado.manipulationVector.urgencyScarcity >= 60 ? "text-rose-600" : "text-slate-500"}>
                      {resultado.manipulationVector.urgencyScarcity}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        resultado.manipulationVector.urgencyScarcity >= 60 ? "bg-rose-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${resultado.manipulationVector.urgencyScarcity}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500">Presión temporal y escasez</p>
                </div>

                {/* 2. Autoridad */}
                <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1">🏛️ Autoridad</span>
                    <span className={resultado.manipulationVector.authorityImpersonation >= 60 ? "text-rose-600" : "text-slate-500"}>
                      {resultado.manipulationVector.authorityImpersonation}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        resultado.manipulationVector.authorityImpersonation >= 60 ? "bg-rose-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${resultado.manipulationVector.authorityImpersonation}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500">Suplantación institucional</p>
                </div>

                {/* 3. Coerción Emocional */}
                <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1">💔 Miedo / Afecto</span>
                    <span className={resultado.manipulationVector.emotionalCoercion >= 60 ? "text-rose-600" : "text-slate-500"}>
                      {resultado.manipulationVector.emotionalCoercion}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        resultado.manipulationVector.emotionalCoercion >= 60 ? "bg-rose-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${resultado.manipulationVector.emotionalCoercion}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500">Shock o afecto fingido</p>
                </div>

                {/* 4. Desvío de Activos */}
                <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1">💸 Desvío Fondos</span>
                    <span className={resultado.manipulationVector.assetTransferIntent >= 60 ? "text-rose-600" : "text-slate-500"}>
                      {resultado.manipulationVector.assetTransferIntent}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        resultado.manipulationVector.assetTransferIntent >= 60 ? "bg-rose-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${resultado.manipulationVector.assetTransferIntent}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500">Transferencias, OTP, claves</p>
                </div>

                {/* 5. Aislamiento */}
                <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1">🤫 Aislamiento</span>
                    <span className={resultado.manipulationVector.isolationTactics >= 60 ? "text-rose-600" : "text-slate-500"}>
                      {resultado.manipulationVector.isolationTactics}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        resultado.manipulationVector.isolationTactics >= 60 ? "bg-rose-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${resultado.manipulationVector.isolationTactics}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500">Secreto y no consultar</p>
                </div>
              </div>
            </div>
          )}

          {/* Explicación en lenguaje claro */}
          <div className="space-y-1.5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-lumaText">
              Explicación clara:
            </h3>
            <p className="text-sm leading-relaxed text-lumaText/90 sm:text-base">
              {resultado.explanation}
            </p>
          </div>

          {/* Patrones de Alarma */}
          {resultado.detectedPatterns.length > 0 && (
            <div className="space-y-2 rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-lumaText">
                Señales de alarma detectadas en el texto:
              </h3>
              <ul className="space-y-1.5 text-xs text-rose-900">
                {resultado.detectedPatterns.map((pat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-rose-600">⚠️</span>
                    <span>{pat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Activo Buscado */}
          {resultado.targetAsset !== "Ninguno identificado" && (
            <div className="rounded-2xl border border-blue-100 bg-white/80 p-4 text-xs">
              <span className="font-bold text-lumaText">Qué intentaban obtener: </span>
              <span className="font-semibold text-lumaBlue">{resultado.targetAsset}</span>
            </div>
          )}

          {/* Recomendaciones Inmediatas */}
          <div className="space-y-3 rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
            <h3 className="text-base font-extrabold text-lumaText flex items-center gap-2">
              <span>💡</span> Acciones recomendadas:
            </h3>
            <ul className="space-y-2.5 text-xs text-lumaText sm:text-sm">
              {resultado.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lumaBlue font-bold text-xs">
                    ✓
                  </span>
                  <span className="leading-snug">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* MÓDULO DE FEEDBACK Y CALIBRACIÓN COMUNITARIA */}
          <div className="space-y-4 rounded-2xl border border-blue-200/80 bg-white p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-sm font-extrabold text-lumaText flex items-center gap-2">
                  <span>🤝</span> Ayudanos a calibrar el motor (Laboratorio Comunitario de Calibración)
                </h4>
                <p className="text-xs text-lumaSubtext">
                  ¿Fue acertado este diagnóstico para el texto que pegaste?
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleSendFeedback("ACERTADO")}
                  disabled={feedbackStatus === "SENDING" || feedbackStatus === "SENT"}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition disabled:opacity-50"
                >
                  <span>👍</span>
                  <span>Acertado</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(!showFeedbackModal)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-100 transition"
                >
                  <span>👎</span>
                  <span>Reportar Discrepancia</span>
                </button>
              </div>
            </div>

            {/* Mensajes de Estado del Feedback */}
            {feedbackStatus === "SENDING" && (
              <p className="text-xs text-lumaBlue font-medium animate-pulse">
                Enviando reporte al laboratorio con protección Zero-PII...
              </p>
            )}
            {feedbackStatus === "SENT" && (
              <p className="text-xs text-emerald-700 font-bold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                {feedbackMsg}
              </p>
            )}
            {feedbackStatus === "ERROR" && (
              <p className="text-xs text-rose-700 font-bold bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                {feedbackMsg}
              </p>
            )}

            {/* Formulario Desplegable de Reporte */}
            {showFeedbackModal && feedbackStatus !== "SENT" && (
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold text-slate-700">
                  Seleccioná el tipo de discrepancia observada:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setFeedbackType("FALSO_POSITIVO")}
                    className={`p-2.5 rounded-xl border text-left transition ${
                      feedbackType === "FALSO_POSITIVO"
                        ? "border-amber-400 bg-amber-50/80 font-bold text-amber-900"
                        : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    ⚠️ Falso Positivo (Era legítimo y lo marcó riesgoso)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedbackType("FALSO_NEGATIVO")}
                    className={`p-2.5 rounded-xl border text-left transition ${
                      feedbackType === "FALSO_NEGATIVO"
                        ? "border-rose-400 bg-rose-50/80 font-bold text-rose-900"
                        : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    🚨 Falso Negativo (Era estafa y no la detectó)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedbackType("REGISTRO_TECNICO")}
                    className={`p-2.5 rounded-xl border text-left transition ${
                      feedbackType === "REGISTRO_TECNICO"
                        ? "border-indigo-400 bg-indigo-50/80 font-bold text-indigo-900"
                        : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    💻 Error Técnico / Consulta de Código o Servidor
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedbackType("OTRO")}
                    className={`p-2.5 rounded-xl border text-left transition ${
                      feedbackType === "OTRO"
                        ? "border-blue-400 bg-blue-50/80 font-bold text-blue-900"
                        : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    💬 Otra observación o sugerencia
                  </button>
                </div>

                <textarea
                  rows={2}
                  value={feedbackNotes}
                  onChange={(e) => setFeedbackNotes(e.target.value)}
                  placeholder="Detalle opcional (ej: 'Es una promo real de mi banco', 'Me pidieron plata simulando ser mi jefe')..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-lumaBlue focus:outline-none"
                />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-1">
                  <p className="text-[11px] text-slate-500">
                    🛡️ Cumplimiento Ley 25.326: El servidor sanitiza automáticamente datos sensibles antes de guardar.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleSendFeedback()}
                    disabled={feedbackStatus === "SENDING"}
                    className="rounded-xl bg-lumaBlue px-4 py-2 text-xs font-bold text-white hover:bg-blue-800 transition disabled:opacity-50 shrink-0"
                  >
                    Enviar Reporte al Laboratorio
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Recordatorio Preventivo */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 text-center text-[11px] text-slate-500">
            🛡️ <strong>Orientación Preventiva:</strong> Este análisis fue procesado de forma privada en tu dispositivo conforme a la Ley Nacional 25.326. No constituye dictamen pericial ni asesoramiento financiero formal.
          </div>
        </section>
      )}

      {/* 5. FOOTER PÚBLICO UNIFICADO */}
      <PublicFooter />
    </div>
  );
}
