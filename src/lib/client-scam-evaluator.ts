/**
 * Evaluador Semántico Client-Side para el Verificador Ciudadano de Luma.
 * Se ejecuta 100% en el navegador del usuario.
 * Cero envío de datos a servidores externos. Cero PII.
 * 
 * Taxonomía Canónica de 6 Paquetes de Conocimiento (LKP-0001 a LKP-0006):
 * LKP-0001: Secuestro Virtual & Extorsión Emocional
 * LKP-0002: Suplantación Bancaria & Phishing de Credenciales / OTP
 * LKP-0003: Falsas Ofertas de Empleo & Estafas de Tareas / Ponzi
 * LKP-0004: Falso Familiar por WhatsApp & Reemplazo de Identidad
 * LKP-0005: Secuestro de Cuenta WhatsApp & Robo de Token
 * LKP-0006: Fraude del Falso Comprador & Triangulación
 */

export interface ClientScamResult {
  riskScore: number;
  riskLevel: "BAJO" | "MEDIO" | "ALTO" | "CRÍTICO";
  threatCategory: string;
  detectedPatterns: string[];
  techniques: string[];
  targetAsset: string;
  recommendations: string[];
  explanation: string;
  isTechnicalLog?: boolean;
}

export function isSystemOrTechnicalLog(raw: string): boolean {
  const technicalRegex = /(traceback \(most recent call last\)|syntaxerror:|typeerror:|referenceerror:|nullpointerexception|uncaught exception|fatal error|segmentation fault|indexoutofboundsexception|internal server error|502 bad gateway|504 gateway timeout|econnrefused|econnreset|etimedout|enotfound|sqlexception|sqlstate|panic: runtime error|docker: error|npm err!|pip install|exit status \d+|errno \d+|cannot read property|cannot read properties of undefined|undefined is not a function|unhandled rejection|failed to fetch|net::err_|uncaught \(in promise\)|fatal: unable to access|at [a-zA-Z0-9_$.]+\([a-zA-Z0-9_$.]+:\d+\)|at [a-zA-Z0-9_$.]+:[0-9]+:[0-9]+)/i;
  return technicalRegex.test(raw);
}

export function normalizeText(raw: string): string {
  let lower = raw.toLowerCase();
  lower = lower
    .replace(/@/g, "a")
    .replace(/\$/g, "s")
    .replace(/0/g, "o")
    .replace(/3/g, "e")
    .replace(/1/g, "i");

  // Quitar acentos y diacríticos
  const normalized = lower.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalized.replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

export function tokenize(text: string): Set<string> {
  const words = text.split(" ").map((w) => w.trim()).filter((w) => w.length >= 3);
  return new Set(words);
}

const CLUSTERS = {
  PRESSURE: [
    "urgente", "urgencia", "apurate", "apurar", "inmediato", "ya", "ahora", "rapido",
    "plazo", "limite", "vence", "minutos", "bloquea", "bloquearan", "perder", "perdes",
    "suspende", "suspenderan", "ultimas horas", "accion inmediata", "antes de que sea tarde"
  ],
  AUTHORITY: [
    "banco", "soporte", "seguridad", "ministerio", "policia", "fiscalia", "juzgado",
    "afip", "arca", "anses", "pami", "mercado pago", "mercadopago", "cuenta dni",
    "cuentadni", "galicia", "nacion", "santander", "bbva", "macro", "brubank",
    "oficial", "atencion al cliente", "mesa de ayuda", "area de fraudes"
  ],
  ISOLATION: [
    "no cortes", "no cuentes", "no hables", "secreto", "confidencial",
    "nadie se entere", "no llames", "apaga", "mantenelo en reserva", "sin testigos", "no digas nada",
    "no avises", "no avises a nadie", "no le digas a nadie", "no llames a nadie", "no le cuentes a nadie"
  ],
  FEAR_EXTORTION: [
    "secuestro", "secuestrado", "secuestrada", "lo tenemos", "la tenemos", "los tenemos",
    "accidente", "herido", "herida", "hospital", "preso", "comisaria", "allanamiento",
    "rescate", "matar", "matamos", "lastimar", "le va a pasar algo", "hijo", "hija", "nieto",
    "fianza", "detenido", "choque"
  ],
  SENSITIVE: [
    "codigo", "clave", "token", "password", "contrasena", "cvv", "cvc",
    "tres numeros", "seis digitos", "sms", "leeme", "pasame", "mandame",
    "coordenadas", "pin", "autenticacion", "credenciales", "usuario",
    "usuario y clave", "datos de tu cuenta", "datos de la cuenta",
    "datos bancarios", "claves bancarias", "homebanking", "home banking", "acceso bancario"
  ],
  REMOTE: [
    "anydesk", "teamviewer", "rustdesk", "quicksupport", "remoto", "pantalla",
    "compartir pantalla", "instalar", "aplicacion", "apk", "descargar"
  ],
  TASK_SCAM: [
    "tarea", "tareas", "ganar dinero", "ganar plata", "videos", "likes", "suscribir",
    "comision", "deposito", "recarga", "telegram", "desbloquear saldo", "retiro bloqueado",
    "ingresos diarios", "plataforma de tareas", "youtube partners", "dando likes", "reclutadores",
    "plataforma de inversiones", "plataforma de inversion", "va girando el dinero", "rendimiento garantizado",
    "rendimientos garantizados", "comercio exterior", "permiso a comercio exterior", "ganancias acumuladas",
    "inversion con inteligencia artificial", "inversion en dolares", "rentabilidad diaria"
  ],
  FAMILY_IDENTITY: [
    "cambie de numero", "cambie el numero", "nuevo numero", "agendame", "agenda este numero",
    "se me rompio el celular", "rompi el celular", "se rompio el celu", "perdi mi celular",
    "este es mi nuevo numero", "este es mi nuevo whatsapp", "agendame este nuevo"
  ],
  FAMILY_KINSHIP: [
    "mama", "papa", "abuela", "abuelo", "hijo", "hija", "sobrino", "sobrina", "tio", "tia", "primo", "prima"
  ],
  MONEY_DEMAND: [
    "transferi", "transferime", "transferencia urgente", "necesito plata", "necesito dinero",
    "pagar una factura", "pagar una cuenta", "pasame al alias", "mandame al cbu", "prestame plata",
    "alias", "cbu", "cvu"
  ],
  ACCOUNT_TAKEOVER: [
    "codigo por error", "te mande un codigo", "seis digitos", "codigo de 6 digitos",
    "codigo de verificacion", "codigo de vinculacion", "reenviamelo", "pasame el codigo",
    "llego un mensaje por error", "codigo de whatsapp", "sms por error", "token por error",
    "te llego un codigo", "pasame los 6 numeros", "mensaje con numeros"
  ],
  FAKE_BUYER: [
    "transferi de mas", "pague de mas", "te transferi de mas", "comprobante de transferencia",
    "te pase de mas", "me equivoque en la transferencia", "devolveme la plata",
    "devolver la diferencia", "anulacion de transferencia", "retencion", "foto del comprobante",
    "ticket de pago", "transferencia por error", "devolveme", "comprobante falso",
    "agregue un cero", "acredito de mas"
  ],
  PRIZE: [
    "premio", "ganaste", "sorteo", "adjudicado", "auto", "0km", "envio gratis",
    "tasa administrativa", "gift card", "crypto", "premio en efectivo",
    "cliente de la semana", "ganador de la semana", "beneficio exclusivo",
    "tenemos que hacerte un deposito", "hacerte un deposito", "deposito de regalo",
    "bonificacion", "reintegro de compra", "premio de temu"
  ]
};

function matchesCluster(normalized: string, tokens: Set<string>, cluster: string[]): boolean {
  for (const item of cluster) {
    if (item.includes(" ")) {
      if (normalized.includes(item)) return true;
    } else {
      if (tokens.has(item)) return true;
    }
  }
  return false;
}

export function evaluateClientScam(text: string): ClientScamResult {
  const norm = normalizeText(text);
  const tokens = tokenize(norm);
  const detectedPatterns: string[] = [];
  const techniques: string[] = [];
  let score = 0;

  const isTechLog = isSystemOrTechnicalLog(text);
  const hasFear = matchesCluster(norm, tokens, CLUSTERS.FEAR_EXTORTION);
  const hasSensitive = matchesCluster(norm, tokens, CLUSTERS.SENSITIVE);
  const hasAccountTakeover = matchesCluster(norm, tokens, CLUSTERS.ACCOUNT_TAKEOVER);

  // Detección temprana: Registro de servidor / Error técnico de programación (Frecuente en consultas IT / Universitarias)
  if (isTechLog && !hasFear && !hasSensitive && !hasAccountTakeover) {
    return {
      riskScore: 0,
      riskLevel: "BAJO",
      threatCategory: "Registro Técnico / Error de Servidor o Código (Fuera de Alcance)",
      detectedPatterns: ["Patrón de error de depuración o log de consola de programación / servidor"],
      techniques: ["Registro de depuración / Log de sistema (No es ingeniería social)"],
      targetAsset: "Ninguno (Consulta técnica de desarrollo o infraestructura)",
      recommendations: [
        "Consultá la documentación oficial del framework o servicio correspondiente.",
        "Revisá la consola de depuración o terminal en tu entorno local.",
        "Este mensaje no contiene tácticas de extorsión ni requiere medidas preventivas ciudadanas."
      ],
      explanation: "Este texto corresponde a un error de programación, log de servidor o excepción de depuración técnica (frecuente en consultas de la carrera y soporte IT). Luma Protect evalúa exclusivamente tácticas de ingeniería social y engaño contra personas (phishing, extorsión, suplantación). Este mensaje no representa una amenaza ciudadana.",
      isTechnicalLog: true,
    };
  }

  const hasPressure = matchesCluster(norm, tokens, CLUSTERS.PRESSURE);
  const hasAuthority = matchesCluster(norm, tokens, CLUSTERS.AUTHORITY);
  const hasIsolation = matchesCluster(norm, tokens, CLUSTERS.ISOLATION);
  const hasRemote = matchesCluster(norm, tokens, CLUSTERS.REMOTE);
  const hasTaskScam = matchesCluster(norm, tokens, CLUSTERS.TASK_SCAM);
  const hasFamilyIdentity = matchesCluster(norm, tokens, CLUSTERS.FAMILY_IDENTITY);
  const hasFamilyKinship = matchesCluster(norm, tokens, CLUSTERS.FAMILY_KINSHIP);
  const hasMoneyDemand = matchesCluster(norm, tokens, CLUSTERS.MONEY_DEMAND);
  const hasFakeBuyer = matchesCluster(norm, tokens, CLUSTERS.FAKE_BUYER);
  const hasPrize = matchesCluster(norm, tokens, CLUSTERS.PRIZE);

  const isBankAuthority = matchesCluster(norm, tokens, [
    "banco", "galicia", "nacion", "santander", "bbva", "macro", "brubank",
    "mercado pago", "mercadopago", "cuenta dni", "cuentadni", "afip", "arca",
    "anses", "tarjeta", "homebanking", "bancaria"
  ]);

  // 1. LKP-0002: Suplantación Bancaria & Phishing de Credenciales / OTP
  if (isBankAuthority && (hasSensitive || hasRemote || norm.includes("bloque") || norm.includes("suspens") || norm.includes("verific")) && (hasSensitive || hasPressure || hasRemote)) {
    score += 85;
    detectedPatterns.push("Suplantación de entidad bancaria solicitando datos confidenciales o acceso remoto");
    techniques.push("Suplantación de identidad (Phishing)");
  }

  // 2. LKP-0005: Secuestro de Cuenta WhatsApp & Robo de Token (cuando no es entidad bancaria)
  if (!isBankAuthority && (hasAccountTakeover || (hasSensitive && (norm.includes("whatsapp") || norm.includes("sms") || norm.includes("error") || norm.includes("turno") || norm.includes("equivoc") || norm.includes("vinculacion"))))) {
    score += 85;
    detectedPatterns.push("Intento de obtención de código de verificación o token SMS para secuestro de cuenta");
    techniques.push("Robo de token de autenticación (Account Takeover)");
  }

  // 3. LKP-0004: Falso Familiar por WhatsApp & Reemplazo de Identidad
  if ((hasFamilyIdentity && (hasMoneyDemand || hasPressure || hasFamilyKinship)) ||
      (hasFamilyKinship && hasMoneyDemand && (norm.includes("urgente") || norm.includes("numero") || norm.includes("celu") || norm.includes("alias") || norm.includes("cbu")))) {
    score += 80;
    detectedPatterns.push("Falso familiar alegando cambio de número y solicitando transferencias urgentes");
    techniques.push("Suplantación afectiva familiar");
  }

  // 4. LKP-0006: Fraude del Falso Comprador & Triangulación
  if (hasFakeBuyer && (norm.includes("devol") || norm.includes("transf") || norm.includes("error") || norm.includes("banco") || norm.includes("llam") || norm.includes("comprobante") || norm.includes("plata") || norm.includes("diferencia"))) {
    score += 80;
    detectedPatterns.push("Reclamo de transferencia excedida por error con comprobante apócrifo para forzar reintegro");
    techniques.push("Falso comprobante y presión por reintegro");
  }

  // 5. LKP-0001: Secuestro Virtual & Extorsión Emocional
  if (hasFear && (hasIsolation || norm.includes("rescate") || norm.includes("plata") || norm.includes("transferi") || norm.includes("dolares") || norm.includes("matar") || norm.includes("bolsa") || norm.includes("efectivo") || norm.includes("fianza") || norm.includes("dinero") || norm.includes("terapia"))) {
    score += 85;
    detectedPatterns.push("Extorsión o secuestro virtual con demanda económica y shock psicológico");
    techniques.push("Manipulación mediante miedo extremo (Extorsión)");
  }

  // 6. LKP-0003: Falsas Ofertas de Empleo & Estafas de Tareas / Inversiones Ponzi con IA
  if (hasTaskScam && (norm.includes("deposito") || norm.includes("recarga") || norm.includes("comision") || norm.includes("gana") || norm.includes("pesos") || norm.includes("transferi") || norm.includes("saldo") || norm.includes("telegram") || norm.includes("dolares") || norm.includes("comercio exterior") || norm.includes("inversion"))) {
    score += 80;
    detectedPatterns.push("Esquema de tareas remuneradas o falsa plataforma de inversión con rendimientos simulados");
    techniques.push("Fraude de inversión / Ponzi digital");
  }

  // 7. Falso Premio / Beneficio con Extracción de Datos Bancarios (ej. Caso Temu / Cliente de la Semana)
  if (hasPrize && (hasSensitive || hasRemote || isBankAuthority || norm.includes("deposito") || norm.includes("clave") || norm.includes("usuario") || norm.includes("cuenta") || norm.includes("transfer"))) {
    score += 85;
    detectedPatterns.push("Falso premio o beneficio de cliente de la semana condicionado a entrega de claves o datos bancarios");
    techniques.push("Falso premio con ingeniería social (Pretexting)");
  }

  // Detección auxiliar: Control Remoto no autorizado
  if (hasRemote) {
    score += 45;
    detectedPatterns.push("Pedido de instalación de software de control remoto (AnyDesk, TeamViewer)");
    techniques.push("Acceso remoto no autorizado");
  }

  // Detección auxiliar: Premio falso con pago por adelantado
  if (hasPrize && (norm.includes("paga") || norm.includes("envio") || norm.includes("transferir") || norm.includes("tasa"))) {
    score += 45;
    detectedPatterns.push("Premio falso condicionado a un pago previo o tasa de liberación");
    techniques.push("Falso premio / Pago por adelantado");
  }

  // Detección auxiliar: Presión u Aislamiento genéricos
  if (hasPressure && score > 0) {
    score += 10;
    detectedPatterns.push("Presión psicológica o urgencia artificial inducida");
    techniques.push("Urgencia artificial");
  }

  if (hasIsolation && score > 0) {
    score += 15;
    detectedPatterns.push("Aislamiento forzado (pedido de reserva o no hablar con terceros)");
    techniques.push("Aislamiento de la víctima");
  }

  score = Math.min(100, score);

  let riskLevel: "BAJO" | "MEDIO" | "ALTO" | "CRÍTICO" = "BAJO";
  if (score >= 80) riskLevel = "CRÍTICO";
  else if (score >= 60) riskLevel = "ALTO";
  else if (score >= 40) riskLevel = "MEDIO";

  // Asignación Taxonómica Canónica (LKP-0001 a LKP-0006)
  let threatCategory = "Sin patrones sospechosos conocidos (Fase Experimental)";
  if (techniques.includes("Manipulación mediante miedo extremo (Extorsión)")) {
    threatCategory = "Secuestro Virtual / Extorsión Emocional (LKP-0001)";
  } else if (techniques.includes("Suplantación de identidad (Phishing)")) {
    threatCategory = "Suplantación Bancaria / Phishing de Credenciales (LKP-0002)";
  } else if (techniques.includes("Falso premio con ingeniería social (Pretexting)")) {
    threatCategory = "Falso Premio / Bono de Compra con Extracción de Claves";
  } else if (techniques.includes("Robo de token de autenticación (Account Takeover)")) {
    threatCategory = "Secuestro de Cuenta WhatsApp / Robo de Token (LKP-0005)";
  } else if (techniques.includes("Falso comprobante y presión por reintegro")) {
    threatCategory = "Fraude del Falso Comprador & Triangulación (LKP-0006)";
  } else if (techniques.includes("Suplantación afectiva familiar")) {
    threatCategory = "Falso Familiar por WhatsApp / Reemplazo de Identidad (LKP-0004)";
  } else if (techniques.includes("Fraude de inversión / Ponzi digital")) {
    threatCategory = "Falsa Oferta de Empleo / Estafa de Tareas o Inversiones (LKP-0003)";
  } else if (detectedPatterns.length > 0) {
    threatCategory = "Actividad sospechosa de ingeniería social";
  }

  let targetAsset = "Ninguno identificado";
  if (techniques.includes("Robo de token de autenticación (Account Takeover)")) {
    targetAsset = "Código de verificación SMS / Control de cuenta de WhatsApp";
  } else if (techniques.includes("Falso comprobante y presión por reintegro")) {
    targetAsset = "Fondos transferidos por supuesta devolución de pago";
  } else if (techniques.includes("Suplantación afectiva familiar")) {
    targetAsset = "Transferencia monetaria inmediata a cuenta de tercero";
  } else if (hasSensitive) {
    targetAsset = "Código SMS / Token OTP / Credenciales bancarias";
  } else if (hasRemote) {
    targetAsset = "Control total del dispositivo mediante software remoto";
  } else if (norm.includes("transferi") || norm.includes("plata") || norm.includes("dinero") || norm.includes("rescate")) {
    targetAsset = "Fondos monetarios directos";
  }

  const recommendations: string[] = [];
  if (riskLevel === "CRÍTICO" || riskLevel === "ALTO") {
    recommendations.push("Cortá la comunicación de inmediato. No respondas ni abras enlaces.");
    recommendations.push("No compartas ningún código SMS ni token de 6 dígitos con nadie.");
    recommendations.push("Si dicen ser tu familiar, llamalo a su número habitual de siempre antes de transferir.");
    recommendations.push("Si afirman haberte pagado de más, revisá tu homebanking oficial: nunca devuelvas sin ver acreditación real.");
  } else if (riskLevel === "MEDIO") {
    recommendations.push("Pausá antes de actuar. Verificá la autenticidad del mensaje por un canal oficial e independiente.");
    recommendations.push("Nunca transfieras dinero ni instales aplicaciones para cobrar premios o empezar supuestos trabajos.");
  } else {
    recommendations.push("No se identificaron patrones comunes de engaño en esta versión preliminar del Laboratorio.");
    recommendations.push("Recordá: la ausencia de alerta no garantiza autenticidad. Nunca compartas códigos ni tokens.");
    recommendations.push("Los bancos y entidades oficiales nunca te pedirán transferencias urgentes ni datos confidenciales por chat.");
  }

  let explanation = "No se identificaron patrones de ingeniería social conocidos en esta versión preliminar del Laboratorio Ciudadano. ⚠️ Advertencia Preventiva: La ausencia de alerta no garantiza autenticidad. Nunca compartas códigos de verificación (SMS/WhatsApp), tokens bancarios ni transfieras dinero ante pedidos imprevistos por chat.";
  if (riskLevel === "CRÍTICO") {
    explanation = "Detectamos señales graves de fraude activo o extorsión. Quien te escribe busca inducir pánico, confianza o urgencia para obtener dinero o control de tus cuentas.";
  } else if (riskLevel === "ALTO") {
    explanation = "El mensaje presenta indicadores claros de ingeniería social (suplantación, urgencia inducida o pedido de datos reservados).";
  } else if (riskLevel === "MEDIO") {
    explanation = "Existen indicios que requieren prudencia. Podría tratarse de un primer contacto para ganar confianza.";
  }

  return {
    riskScore: score,
    riskLevel,
    threatCategory,
    detectedPatterns,
    techniques: Array.from(new Set(techniques)),
    targetAsset,
    recommendations,
    explanation,
    isTechnicalLog: false,
  };
}
