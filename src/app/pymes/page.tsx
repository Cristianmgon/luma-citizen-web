"use client";

import { useState } from "react";
import Link from "next/link";
import PublicFooter from "@/components/public-footer";

interface DiagnosticQuestion {
  id: number;
  question: string;
  category: "REDES" | "COBROS" | "REGULATORIO" | "CCTV" | "BACKUPS";
  riskIfYes: boolean; // if true, answering yes indicates risk
  options: { label: string; isRisk: boolean }[];
  explanation: string;
  legalNorm: string;
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 1,
    category: "REDES",
    question: "¿Los clientes de tu local se conectan a la misma red Wi-Fi donde tenés enchufada la computadora de facturación o las cámaras?",
    riskIfYes: true,
    options: [
      { label: "Sí, compartimos la misma contraseña de Wi-Fi con los clientes.", isRisk: true },
      { label: "No, tenemos una red separada y aislada para clientes (Red de Invitados).", isRisk: false },
      { label: "No ofrecemos Wi-Fi a los clientes.", isRisk: false },
    ],
    explanation: "Si clientes o terceros navegan en la misma red local que tus terminales de cobro, un atacante puede interceptar tráfico de ventas o acceder a grabaciones privadas.",
    legalNorm: "Resolución AAIP 47/2018 (Control de Acceso y Medidas Técnicas de Red)",
  },
  {
    id: 2,
    category: "COBROS",
    question: "¿Verificás periódicamente que los carteles con códigos QR de cobro en el mostrador no hayan sido adulterados ni pegados encima?",
    riskIfYes: false,
    options: [
      { label: "Sí, el personal corrobora a diario que el cartel sea el original y revisa la acreditación en la app.", isRisk: false },
      { label: "No solemos revisarlo; el cliente escanea y nos muestra la pantalla.", isRisk: true },
    ],
    explanation: "Una de las modalidades crecientes es el pegado de stickers QR falsos sobre mostradores comerciales para desviar los pagos de los clientes a cuentas de estafadores.",
    legalNorm: "Estándar de Buenas Prácticas contra Triangulación y Spoofing de Cobro",
  },
  {
    id: 3,
    category: "REGULATORIO",
    question: "¿Tenés registradas tus bases de datos (clientes, empleados, proveedores o grabaciones de CCTV) ante la AAIP?",
    riskIfYes: false,
    options: [
      { label: "Sí, contamos con número de registro en el Registro Nacional de Bases de Datos de la AAIP.", isRisk: false },
      { label: "No lo sabíamos o aún no iniciamos el trámite de inscripción.", isRisk: true },
      { label: "Creíamos que solo aplicaba a bancos y grandes empresas.", isRisk: true },
    ],
    explanation: "La Ley 25.326 obliga a toda empresa, comercio o persona que almacene datos de terceros a registrar formalmente sus bases de datos ante el ente de control nacional.",
    legalNorm: "Ley 25.326 (Artículo 21: Registro Nacional de Bases de Datos / AAIP)",
  },
  {
    id: 4,
    category: "CCTV",
    question: "Si tenés cámaras de seguridad, ¿exhibís el cartel homologado con Razón Social, CUIT y domicilio legal para Habeas Data?",
    riskIfYes: false,
    options: [
      { label: "Sí, cartel oficial con nuestros datos fiscales y de contacto para ejercicio de derechos.", isRisk: false },
      { label: "Tenemos un cartel genérico de librería ('Sonría, lo estamos filmando').", isRisk: true },
      { label: "No tenemos cartel colocado en el acceso al local.", isRisk: true },
      { label: "No tenemos cámaras de videovigilancia.", isRisk: false },
    ],
    explanation: "El cartel genérico de librería no tiene validez legal. Ante una inspección de la AAIP o ante un juicio laboral o penal, un video sin cartel reglamentario puede ser impugnado.",
    legalNorm: "Disposición AAIP 10/2008 (Condiciones de Legalidad en Captación de Imágenes)",
  },
  {
    id: 5,
    category: "BACKUPS",
    question: "¿Realizás copias de seguridad (backups) periódicas de tu sistema de facturación y las guardás desconectadas de internet?",
    riskIfYes: false,
    options: [
      { label: "Sí, tenemos backups automáticos o discos externos desconectados fuera de la red.", isRisk: false },
      { label: "Solo guardamos en el mismo disco de la computadora de caja.", isRisk: true },
      { label: "No realizamos copias de respaldo regulares.", isRisk: true },
    ],
    explanation: "Los ataques de ransomware contra comercios secuestran los archivos de caja y facturación exigiendo rescates. Un backup aislado es la única garantía de recuperación.",
    legalNorm: "Res. AAIP 47/2018 (Seguridad en Almacenamiento y Recuperación ante Desastres)",
  },
];

export default function PymesCommercePage() {
  // Test State
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [testCompleted, setTestCompleted] = useState(false);

  // Form State
  const [formCommerceName, setFormCommerceName] = useState("");
  const [formContact, setFormContact] = useState("");
  const [formCategory, setFormCategory] = useState("Gastronomía / Local a la calle");
  const [formInterest, setFormInterest] = useState("Auditoría Integral y Registro AAIP");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleCalculateScore = () => {
    if (Object.keys(answers).length < DIAGNOSTIC_QUESTIONS.length) {
      alert("Por favor respondé las 5 preguntas para obtener tu diagnóstico personalizado.");
      return;
    }
    setTestCompleted(true);
  };

  const totalRisks = Object.entries(answers).reduce((acc, [qId, optIdx]) => {
    const question = DIAGNOSTIC_QUESTIONS.find((q) => q.id === Number(qId));
    if (!question) return acc;
    return acc + (question.options[optIdx].isRisk ? 1 : 0);
  }, 0);

  const riskLevel = totalRisks >= 3 ? "ALTO" : totalRisks >= 1 ? "MEDIO" : "BAJO";

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-12 py-6 sm:py-10">
      {/* 1. HERO INSTITUCIONAL CON LUMA EMPRESARIA */}
      <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-6 sm:p-10 text-white shadow-xl">
        {/* Glow de fondo */}
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-12">
          {/* Texto y Propuesta de Valor */}
          <div className="space-y-5 lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-900/60 px-3.5 py-1.5 text-xs font-bold text-cyan-300 backdrop-blur-md shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Ciberseguridad Comercial & Cumplimiento Normativo</span>
              <span>·</span>
              <span>Ley 25.326</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight text-white">
              Blindá la tecnología y los datos de tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">comercio o PyME</span>
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed sm:text-base max-w-2xl">
              Terminales de cobro POS, códigos QR, Wi-Fi de clientes, computadoras de facturación y cámaras de seguridad. Asesoramiento técnico y adecuación legal desarrollado por <strong>estudiantes de la Licenciatura en Ciberseguridad de la Universidad Nacional Raúl Scalabrini Ortiz (UNSO)</strong> para proteger la rentabilidad y la reputación de tu negocio.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#diagnostico"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-md hover:from-blue-600 hover:to-cyan-600 transition"
              >
                <span>📊 Hacer Autodiagnóstico Gratuito</span>
              </a>
              <a
                href="#asesoramiento"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-3 text-sm font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition"
              >
                <span>💼 Solicitar Consultoría Técnica</span>
              </a>
            </div>
          </div>

          {/* Luma Empresaria Avatar */}
          <div className="flex flex-col items-center justify-center lg:col-span-4">
            <div className="relative group">
              <div className="relative mx-auto h-52 w-52 sm:h-64 sm:w-64 overflow-hidden rounded-3xl border-2 border-cyan-400/40 shadow-2xl shadow-cyan-500/20 bg-slate-800">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/images/luma_empresaria.jpg"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  aria-label="Luma Empresaria - Especialista en Ciberseguridad PyME"
                >
                  <source src="/videos/luma_empresaria.mp4" type="video/mp4" />
                  <img
                    src="/images/luma_empresaria.jpg"
                    alt="Luma Empresaria - Especialista en Ciberseguridad PyME"
                    className="h-full w-full object-cover"
                  />
                </video>
              </div>

              {/* Speech bubble flotante */}
              <div className="mt-3 rounded-2xl border border-blue-400/30 bg-slate-900/95 p-3 text-center text-xs font-medium text-slate-200 shadow-lg backdrop-blur-md max-w-xs mx-auto">
                <p>
                  <span className="font-bold text-cyan-400">Luma Empresaria:</span> &ldquo;El 80% de los comercios tiene su Wi-Fi y sus cámaras vulnerables o sin registrar ante la AAIP. Evaluemos tu local juntos.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LOS 4 PILARES DEL BLINDAJE TECNOLÓGICO */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-wider text-lumaBlue">Cobertura Integral</span>
          <h2 className="text-2xl font-black text-lumaText sm:text-3xl">
            Todo lo tecnológico que utiliza tu negocio, bajo control
          </h2>
          <p className="text-sm text-lumaSubtext">
            No se trata solo de instalar un antivirus o un cartel. Auditamos la infraestructura real con la que operás todos los días.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl text-lumaBlue">
              📶
            </div>
            <h3 className="font-bold text-base text-lumaText">Segmentación de Redes Wi-Fi</h3>
            <p className="text-xs text-lumaSubtext leading-relaxed">
              Aislamos la red pública que le das a tus clientes de la red interna donde operan tu caja de facturación, computadoras contables y cámaras.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl text-emerald-600">
              💳
            </div>
            <h3 className="font-bold text-base text-lumaText">Seguridad POS & Cobros QR</h3>
            <p className="text-xs text-lumaSubtext leading-relaxed">
              Verificación física y digital para evitar estafas por sustitución de QR, manipulación de comprobantes falsos y skimmers de tarjetas.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-2xl text-amber-600">
              🏛️
            </div>
            <h3 className="font-bold text-base text-lumaText">Registro ante Ente Regulador (AAIP)</h3>
            <p className="text-xs text-lumaSubtext leading-relaxed">
              Gestión formal de inscripción obligatoria de bases de datos de clientes, personal y grabaciones de CCTV bajo la Ley 25.326.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-2xl text-purple-600">
              📹
            </div>
            <h3 className="font-bold text-base text-lumaText">CCTV & Cadena de Custodia</h3>
            <p className="text-xs text-lumaSubtext leading-relaxed">
              Cartelería homologada reglamentaria con CUIT del comercio y resguardo seguro para que los videos sirvan como prueba penal ante la fiscalía.
            </p>
          </div>
        </div>
      </section>

      {/* 3. TEST DE AUTODIAGNÓSTICO EN 5 PREGUNTAS */}
      <section id="diagnostico" className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm space-y-8">
        <div className="border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-lg">
              📋
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-lumaText">
                Autodiagnóstico Rápido de Riesgo Tecnológico
              </h2>
              <p className="text-xs sm:text-sm text-lumaSubtext">
                Completá este relevamiento de 5 puntos clave para conocer la exposición de tu comercio.
              </p>
            </div>
          </div>
        </div>

        {/* Listado de Preguntas */}
        <div className="space-y-6">
          {DIAGNOSTIC_QUESTIONS.map((q, idx) => {
            const selectedOptIdx = answers[q.id];
            return (
              <div key={q.id} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lumaBlue text-xs font-black text-white">
                      {idx + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-lumaText">
                      {q.question}
                    </h3>
                  </div>
                  <span className="hidden sm:inline-block rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-lumaBlue">
                    {q.category}
                  </span>
                </div>

                <div className="grid gap-2 sm:grid-cols-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOptIdx === optIdx;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`rounded-xl border p-3 text-left text-xs font-medium transition flex items-center justify-between ${
                          isSelected
                            ? "border-lumaBlue bg-lumaBlueSoft font-bold text-lumaBlue ring-1 ring-lumaBlue"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isSelected && <span>✓</span>}
                      </button>
                    );
                  })}
                </div>

                {selectedOptIdx !== undefined && (
                  <div className="mt-2 rounded-xl bg-white p-3 text-xs border border-slate-100 space-y-1">
                    <p className="text-slate-600">
                      💡 <strong>Impacto:</strong> {q.explanation}
                    </p>
                    <p className="text-[11px] text-lumaSubtext font-mono">
                      ⚖️ Marco: {q.legalNorm}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Botón Calcular */}
        {!testCompleted ? (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={handleCalculateScore}
              className="inline-flex items-center gap-2 rounded-2xl bg-lumaBlue px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-blue-700 transition"
            >
              <span>🔍 Calcular Diagnóstico de Mi Comercio</span>
            </button>
          </div>
        ) : (
          <div className={`rounded-2xl border p-6 text-center space-y-4 ${
            riskLevel === "ALTO"
              ? "border-rose-200 bg-rose-50/60"
              : riskLevel === "MEDIO"
              ? "border-amber-200 bg-amber-50/60"
              : "border-emerald-200 bg-emerald-50/60"
          }`}>
            <div className="space-y-1">
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider ${
                riskLevel === "ALTO"
                  ? "bg-rose-600 text-white"
                  : riskLevel === "MEDIO"
                  ? "bg-amber-600 text-white"
                  : "bg-emerald-600 text-white"
              }`}>
                Nivel de Riesgo Detectado: {riskLevel}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-lumaText pt-2">
                {riskLevel === "ALTO" && "Tu comercio presenta vulnerabilidades críticas operativas y normativas"}
                {riskLevel === "MEDIO" && "Tenés buenas prácticas pero existen brechas legales y de red a corregir"}
                {riskLevel === "BAJO" && "¡Excelente! Tu local cuenta con una buena base de ciberhigiene"}
              </h3>
              <p className="text-xs sm:text-sm text-lumaSubtext max-w-xl mx-auto">
                Detectamos <strong>{totalRisks} puntos de atención</strong> en tus respuestas sobre redes, registros ante la AAIP o procedimientos de cobro.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="#asesoramiento"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-slate-800 transition"
              >
                <span>Solicitar Adecuación y Consultoría con el Equipo</span>
                <span>➔</span>
              </a>
            </div>
          </div>
        )}
      </section>

      {/* 4. FORMULARIO DE CONTACTO / SOLICITUD DE ASESORAMIENTO */}
      <section id="asesoramiento" className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/50 via-white to-slate-50 p-6 sm:p-10 shadow-sm space-y-8">
        <div className="grid gap-8 lg:grid-cols-12 items-center">
          <div className="space-y-4 lg:col-span-5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-lumaBlue">
              Consultoría Especializada
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-lumaText">
              Adecuá la tecnología de tu empresa con nuestro equipo
            </h2>
            <p className="text-sm text-lumaSubtext leading-relaxed">
              Brindamos acompañamiento técnico y regulatorio para comercios de proximidad y PyMEs. Realizamos el relevamiento, configuramos tu red, generamos tu cartelería con CUIT y gestionamos la inscripción de tus bases ante el Estado.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold">✓</span>
                <span>Auditoría de routers Wi-Fi y aislamiento de cajas</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold">✓</span>
                <span>Registro oficial de bases de datos ante la AAIP (DNPDP)</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold">✓</span>
                <span>Cartelería CCTV homologada con CUIT y cadena de custodia</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold">✓</span>
                <span>Capacitación práctica a empleados contra ingeniería social</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/60">
              <p className="text-[11px] text-slate-500 italic">
                Marco Institucional: Iniciativa desarrollada por estudiantes regulares de la Licenciatura en Ciberseguridad de la Universidad Nacional Raúl Scalabrini Ortiz (UNSO).
              </p>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-md">
              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <h3 className="text-base sm:text-lg font-bold text-lumaText border-b border-slate-100 pb-3">
                    Solicitar Relevamiento o Consulta Técnica
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nombre del Comercio o Empresa
                      </label>
                      <input
                        type="text"
                        required
                        value={formCommerceName}
                        onChange={(e) => setFormCommerceName(e.target.value)}
                        placeholder="Ej: Farmacia Central / Almacén Don Pedro"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-lumaBlue focus:outline-none focus:ring-1 focus:ring-lumaBlue"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Rubro o Actividad
                      </label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-lumaBlue focus:outline-none focus:ring-1 focus:ring-lumaBlue"
                      >
                        <option>Gastronomía / Local a la calle</option>
                        <option>Comercio Minorista / Mayorista</option>
                        <option>Salud / Farmacia / Clínica</option>
                        <option>Servicios Profesionales / Oficinas</option>
                        <option>Gimnasio / Espacio Recreativo</option>
                        <option>Otro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Contacto (WhatsApp / Email del titular o encargado)
                    </label>
                    <input
                      type="text"
                      required
                      value={formContact}
                      onChange={(e) => setFormContact(e.target.value)}
                      placeholder="Ej: 11 4928-2417 o contacto@negocio.com"
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-lumaBlue focus:outline-none focus:ring-1 focus:ring-lumaBlue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Servicio de Mayor Interés
                    </label>
                    <select
                      value={formInterest}
                      onChange={(e) => setFormInterest(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-lumaBlue focus:outline-none focus:ring-1 focus:ring-lumaBlue"
                    >
                      <option>Auditoría Integral y Registro AAIP</option>
                      <option>Segmentación de Red Wi-Fi y Seguridad POS</option>
                      <option>Cartelería y Legalización de Cámaras CCTV</option>
                      <option>Capacitación Anti-Estafas para Empleados</option>
                      <option>Diagnóstico General de Ciberseguridad</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-lumaBlue py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    >
                      <span>📨 Enviar Solicitud de Asesoramiento</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-center text-slate-400">
                    Nos pondremos en contacto dentro de las 24 horas hábiles sin costo de diagnóstico inicial.
                  </p>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-3xl">
                    ✅
                  </div>
                  <h3 className="text-xl font-black text-lumaText">
                    ¡Solicitud enviada correctamente!
                  </h3>
                  <p className="text-xs sm:text-sm text-lumaSubtext max-w-md mx-auto">
                    Gracias por confiar en el equipo de Luma Protect. Un consultor especializado se contactará por WhatsApp o email a <strong>{formContact}</strong> para coordinar el diagnóstico de tu local.
                  </p>
                  <div className="pt-2">
                    <a
                      href={`mailto:LumaProtect@proton.me?subject=Asesoramiento%20Ciberseguridad%20PyME%20-%20${encodeURIComponent(formCommerceName)}&body=Hola%20equipo%20Luma%2C%0A%0ASolicito%20asesoramiento%20para%3A%20${encodeURIComponent(formCommerceName)}%0ARubro%3A%20${encodeURIComponent(formCategory)}%0AInter%C3%A9s%3A%20${encodeURIComponent(formInterest)}%0AContacto%3A%20${encodeURIComponent(formContact)}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-lumaBlue underline hover:text-blue-800"
                    >
                      <span>¿Preferís enviar un correo directo ahora? Hacé clic aquí</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <PublicFooter />
    </div>
  );
}
