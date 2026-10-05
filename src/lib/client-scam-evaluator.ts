/**
 * Evaluador Semántico Client-Side para el Verificador Ciudadano de Luma.
 * Arquitectura Híbrida Neuro-Simbólica (Fase 2 - ADR-013 / DEC-2026-0005).
 * 
 * Se ejecuta 100% en el dispositivo del usuario (Client-Side / On-Device).
 * Cero costo de inferencia en servidores externos ($0.00). Cero PII (Ley 25.326).
 * 
 * Combina:
 * 1. Capa 1: Filtro Heurístico y Triage Técnico (0ms)
 * 2. Capa 2: Proyección Ontológica LKP Multi-Label (LKP-0001 a LKP-0008)
 * 3. Capa 3: Vector de Manipulación Psicológica (Framework Cialdini & Kahneman)
 */

export interface PsychologicalManipulationVector {
  urgencyScarcity: number;        // 0-100: Presión temporal, vencimiento inminente, ansiedad de pérdida
  authorityImpersonation: number; // 0-100: Suplantación o invocación de bancos, policía, AFIP, soporte
  emotionalCoercion: number;      // 0-100: Miedo, secuestro, culpa, afecto familiar fingido
  assetTransferIntent: number;    // 0-100: Solicitud de transferencias, reintegros a terceros, claves, OTP
  isolationTactics: number;       // 0-100: Silenciamiento, secreto, no cortar, prohibición de avisar
  primaryPrinciple: string;       // Principio rector de persuasión detectado
}

export interface CanonicalLkpMatch {
  code: string;               // "LKP-0001" a "LKP-0008"
  name: string;               // Nombre canónico del paquete
  confidence: number;         // Nivel de afinidad semántica (0-100)
  mitigationStrategy: string; // Instrucción ciudadana de neutralización
}

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

  // Dimensiones ontológicas y de triaje
  manipulationVector?: PsychologicalManipulationVector;
  matchedLkps?: CanonicalLkpMatch[];
  isCombinedAttack?: boolean;
  engineMode?: "MOTOR_HEURISTICO_ONTOLOGICO_ON_DEVICE";
}

export function isSystemOrTechnicalLog(raw: string): boolean {
  const technicalRegex = /(traceback \(most recent call last\)|syntaxerror:|typeerror:|referenceerror:|nullpointerexception|uncaught exception|fatal error|segmentation fault|indexoutofboundsexception|internal server error|502 bad gateway|504 gateway timeout|econnrefused|econnreset|etimedout|enotfound|sqlexception|sqlstate|panic: runtime error|docker: error|npm err!|pip install|exit status \d+|errno \d+|cannot read property|cannot read properties of undefined|undefined is not a function|unhandled rejection|failed to fetch|net::err_|uncaught \(in promise\)|fatal: unable to access|at [a-zA-Z0-9_$.]+\([a-zA-Z0-9_$.]+:\d+\)|at [a-zA-Z0-9_$.]+:[0-9]+:[0-9]+|550[ -]\d\.\d\.\d|554[ -]\d\.\d\.\d|the email account that you tried to reach does not exist|mailer-daemon|undelivered mail|delivery status notification|mail delivery failed|returned to sender|smtp;?\s*[45]\d{2}|relay access denied|mailbox unavailable|address rejected|host .* said: [45]\d{2}|spf validation failed|dkim fail)/i;
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

// -----------------------------------------------------------------------------
// CLUSTERS Y CONCEPTOS SEMÁNTICOS (ONTOLOGÍA MULTI-LABEL)
// -----------------------------------------------------------------------------

const CLUSTERS = {
  PRESSURE: [
    "urgente", "urgencia", "apurate", "apurar", "inmediato", "ya", "ahora", "rapido",
    "plazo", "limite", "vence", "minutos", "bloquea", "bloquearan", "perder", "perdes",
    "suspende", "suspenderan", "ultimas horas", "accion inmediata", "antes de que sea tarde",
    "cubrir un cheque", "van a rechazar", "lo van a rechazar", "antes de las", "antes del cierre", "antes de que venza"
  ],
  AUTHORITY: [
    "banco", "soporte", "seguridad", "ministerio", "policia", "fiscalia", "juzgado",
    "afip", "arca", "anses", "pami", "mercado pago", "mercadopago", "cuenta dni",
    "cuentadni", "galicia", "nacion", "santander", "bbva", "macro", "brubank",
    "oficial", "atencion al cliente", "mesa de ayuda", "area de fraudes", "superintendencia", "correo argentino", "andreani"
  ],
  ISOLATION: [
    "no cortes", "no cuentes", "no hables", "no hables con nadie",
    "nadie se entere", "no llames", "apaga", "mantenelo en reserva", "sin testigos", "no digas nada",
    "no avises", "no avises a nadie", "no le digas a nadie", "no llames a nadie", "no le cuentes a nadie"
  ],
  DEFENSIVE_ADVICE: [
    "no lo compartas", "no compartas este codigo", "el banco nunca te pedira",
    "no compartas tu clave", "no brindes tus claves", "el banco nunca pide",
    "nunca te pediremos", "no compartas tus datos", "no lo compartas con nadie",
    "tu codigo de seguridad es", "tu codigo es", "tu clave token es", "clave de seguridad temporal",
    "valido por", "no compartas este mensaje"
  ],
  EXTRACTION_DEMAND: [
    "pasame", "mandame", "decime", "leeme", "dictame", "ingresa", "ingresar",
    "confirma", "confirmar", "confirme", "valida", "validar", "valide",
    "envia", "enviar", "brindame", "responde", "comparti", "compartir",
    "necesito", "solicito", "pedimos", "requerimos", "pasa", "manda"
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
    "anydesk", "teamviewer", "rustdesk", "quicksupport", "supremo", "ultraviewer",
    "acceso remoto", "control remoto", "soporte remoto", "compartir pantalla",
    "comparti la pantalla", "instalar anydesk", "descargar anydesk", "instalar apk",
    "descargar apk", "soporte a distancia"
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
    "agregue un cero", "acredito de mas",
    "te transferi por error", "transferi por error", "envie por error", "te envie por error",
    "transfieras el importe a esta otra", "a esta otra cuenta", "a otra cuenta", "transferir a otra cuenta",
    "otra cuenta de mercado pago", "otra cuenta bancaria", "mula", "triangulacion", "triangulacion de dinero",
    "mula financiera", "devolucion a otra cuenta", "reintegro a otra cuenta"
  ],
  PRIZE: [
    "premio", "ganaste", "sorteo", "adjudicado", "auto", "0km", "envio gratis",
    "tasa administrativa", "gift card", "crypto", "premio en efectivo",
    "cliente de la semana", "ganador de la semana", "beneficio exclusivo",
    "tenemos que hacerte un deposito", "hacerte un deposito", "deposito de regalo",
    "bonificacion", "reintegro de compra", "premio de temu"
  ],
  LOGISTIC: [
    "correo argentino", "andreani", "paquete retenido", "aduana", "tasa de entrega",
    "fotomulta", "infraccion", "quita de puntos", "reprogramar entrega", "envio demorado"
  ],
  OFFICIAL_BODIES: [
    "afip", "arca", "anses", "pami", "embargo", "deuda fiscal", "bono extraordinario",
    "ingreso de emergencia", "habilitacion bancaria", "ir al cajero", "clave fiscal"
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

// -----------------------------------------------------------------------------
// CAPA 3: CÁLCULO DEL VECTOR DE MANIPULACIÓN PSICOLÓGICA (CIALDINI & KAHNEMAN)
// -----------------------------------------------------------------------------

function calculateManipulationVector(
  norm: string,
  tokens: Set<string>,
  flags: Record<string, boolean>
): PsychologicalManipulationVector {
  let urgency = 0;
  let authority = 0;
  let emotional = 0;
  let asset = 0;
  let isolation = 0;

  // 1. Urgencia y Escasez Artificial (System 1 Trigger)
  if (flags.hasPressure) urgency += 60;
  if (norm.includes("minutos") || norm.includes("ya") || norm.includes("ahora") || norm.includes("inmediato")) urgency += 20;
  if (norm.includes("cubrir un cheque") || norm.includes("van a rechazar") || norm.includes("antes de las")) urgency += 25;
  if (norm.includes("vence") || norm.includes("plazo")) urgency += 15;
  urgency = Math.min(100, urgency);

  // 2. Apelación a la Autoridad o Suplantación Institucional
  if (flags.hasAuthority) authority += 50;
  if (flags.isBankAuthority) authority += 35;
  if (flags.hasOfficialBodies) authority += 40;
  if (norm.includes("oficial") || norm.includes("soporte") || norm.includes("seguridad")) authority += 15;
  authority = Math.min(100, authority);

  // 3. Coerción Emocional / Miedo / Simpatía Familiar
  if (flags.hasFear) emotional += 85;
  if (flags.hasFamilyKinship) emotional += 30;
  if (flags.hasFamilyIdentity) emotional += 40;
  if (norm.includes("lastimada") || norm.includes("accidente") || norm.includes("hospital") || norm.includes("urgente ma")) emotional += 30;
  emotional = Math.min(100, emotional);

  // 4. Intención de Desvío de Activos Críticos (Fondos, Claves, Tokens)
  if (flags.hasSensitive) asset += 60;
  if (flags.hasMoneyDemand) asset += 40;
  if (flags.hasFakeBuyer || norm.includes("alias") || norm.includes("cbu") || norm.includes("transferi")) asset += 40;
  if (flags.hasAccountTakeover) asset += 50;
  if (flags.hasRemote) asset += 40;
  asset = Math.min(100, asset);

  // 5. Tácticas de Aislamiento y Secreto
  if (flags.hasIsolation) isolation += 80;
  if (norm.includes("no cortes") || norm.includes("no avises") || norm.includes("nadie se entere")) isolation += 30;
  isolation = Math.min(100, isolation);

  // Determinar principio rector predominante
  let primaryPrinciple = "Sin coerción psicológica detectada";
  const maxScore = Math.max(urgency, authority, emotional, asset, isolation);
  if (maxScore >= 40) {
    if (maxScore === emotional && emotional >= 60) {
      primaryPrinciple = "Coerción Emocional & Miedo Extremo (Secuestro / Vulnerabilidad Afectiva)";
    } else if (maxScore === asset && flags.hasFakeBuyer) {
      primaryPrinciple = "Manipulación por Falso Reintegro & Triangulación Financiera";
    } else if (maxScore === asset && flags.hasSensitive) {
      primaryPrinciple = "Extracción Directa de Credenciales y Códigos OTP (Phishing Activo)";
    } else if (maxScore === authority) {
      primaryPrinciple = "Apelación a la Falsa Autoridad Institucional (Cialdini)";
    } else if (maxScore === urgency) {
      primaryPrinciple = "Urgencia y Escasez Artificial (Presión sobre el Sistema 1)";
    } else if (maxScore === isolation) {
      primaryPrinciple = "Aislamiento Coercitivo de la Víctima (Supresión de Ayuda Externa)";
    }
  }

  return {
    urgencyScarcity: urgency,
    authorityImpersonation: authority,
    emotionalCoercion: emotional,
    assetTransferIntent: asset,
    isolationTactics: isolation,
    primaryPrinciple,
  };
}

// -----------------------------------------------------------------------------
// CAPA 2: EVALUADOR ONTOLÓGICO LKP MULTI-LABEL
// -----------------------------------------------------------------------------

function evaluateCanonicalLkps(
  norm: string,
  tokens: Set<string>,
  flags: Record<string, boolean>,
  vector: PsychologicalManipulationVector
): CanonicalLkpMatch[] {
  const matches: CanonicalLkpMatch[] = [];

  // LKP-0001: Secuestro Virtual & Extorsión Emocional
  let conf0001 = 0;
  if (flags.hasFear) {
    conf0001 += 60;
    if (flags.hasIsolation || norm.includes("rescate") || norm.includes("plata") || norm.includes("transferi") || norm.includes("dolares") || norm.includes("matar") || norm.includes("fianza")) conf0001 += 35;
    if (vector.emotionalCoercion >= 70) conf0001 += 15;
  }
  if (conf0001 >= 60) {
    matches.push({
      code: "LKP-0001",
      name: "Secuestro Virtual / Extorsión Emocional",
      confidence: Math.min(100, conf0001),
      mitigationStrategy: "Frenar la urgencia ('Hacé una pausa'). Cortar de inmediato y llamar directamente al familiar a su línea habitual."
    });
  }

  // LKP-0002: Suplantación Bancaria & Phishing de Credenciales / OTP
  let conf0002 = 0;
  if (flags.isBankAuthority || flags.hasAuthority) {
    if (flags.hasSensitive || flags.hasRemote || norm.includes("bloque") || norm.includes("suspens") || norm.includes("token") || norm.includes("clave")) conf0002 += 65;
    if (flags.hasPressure || norm.includes("verific") || norm.includes("urgente")) conf0002 += 25;
  }
  if (conf0002 >= 60) {
    matches.push({
      code: "LKP-0002",
      name: "Suplantación Bancaria / Phishing de Credenciales",
      confidence: Math.min(100, conf0002),
      mitigationStrategy: "Nunca ingresar a enlaces provistos ni compartir claves o códigos de 6 dígitos. Consultar la app oficial del banco."
    });
  }

  // LKP-0003: Falsa Oferta de Empleo / Tareas / Ponzi Digital
  let conf0003 = 0;
  if (flags.hasTaskScam) {
    conf0003 += 55;
    if (norm.includes("deposito") || norm.includes("recarga") || norm.includes("comision") || norm.includes("telegram") || norm.includes("dolares") || norm.includes("inversion")) conf0003 += 35;
    if (norm.includes("comercio exterior") || norm.includes("rendimiento garantizado")) conf0003 += 20;
  }
  if (conf0003 >= 60) {
    matches.push({
      code: "LKP-0003",
      name: "Falsa Oferta de Empleo / Estafa de Tareas o Inversiones",
      confidence: Math.min(100, conf0003),
      mitigationStrategy: "Ningún trabajo genuino cobra dinero para pagar salarios. No transferir fondos a supuestas plataformas de desbloqueo."
    });
  }

  // LKP-0004: Falso Familiar por WhatsApp / Reemplazo de Identidad
  let conf0004 = 0;
  const hasEconomicDemand =
    flags.hasMoneyDemand ||
    norm.includes("transfer") ||
    norm.includes("plata") ||
    norm.includes("dinero") ||
    norm.includes("alias") ||
    norm.includes("cbu") ||
    norm.includes("cvu") ||
    norm.includes("prestame") ||
    norm.includes("pagar");

  if (flags.hasFamilyIdentity && hasEconomicDemand) {
    conf0004 += 75;
    if (norm.includes("alias") || norm.includes("cbu") || norm.includes("amigo")) conf0004 += 20;
  } else if (flags.hasFamilyKinship && hasEconomicDemand && (norm.includes("urgente") || norm.includes("numero") || norm.includes("celu"))) {
    conf0004 += 65;
  }
  if (conf0004 >= 60) {
    matches.push({
      code: "LKP-0004",
      name: "Falso Familiar por WhatsApp / Reemplazo de Identidad",
      confidence: Math.min(100, conf0004),
      mitigationStrategy: "No agendar el número nuevo ni transferir. Llamar por llamada tradicional a la persona a su línea de siempre."
    });
  }

  // LKP-0005: Secuestro de Cuenta WhatsApp & Robo de Token 2FA
  let conf0005 = 0;
  if (!flags.isBankAuthority && (flags.hasAccountTakeover || (flags.hasSensitive && (norm.includes("whatsapp") || norm.includes("sms") || norm.includes("error") || norm.includes("turno"))))) {
    conf0005 += 75;
    if (norm.includes("codigo") || norm.includes("seis digitos") || norm.includes("reenviamelo")) conf0005 += 20;
  }
  if (conf0005 >= 60) {
    matches.push({
      code: "LKP-0005",
      name: "Secuestro de Cuenta WhatsApp / Robo de Token",
      confidence: Math.min(100, conf0005),
      mitigationStrategy: "Nunca reenviar códigos de 6 dígitos que lleguen por SMS. Nadie envía códigos 'por error' a tu teléfono."
    });
  }

  // LKP-0006: Fraude del Falso Comprador & Triangulación / Mula Financiera
  let conf0006 = 0;
  const isTriangulationOrMule =
    norm.includes("otra cuenta") ||
    norm.includes("otro alias") ||
    norm.includes("alias es") ||
    norm.includes("alias de") ||
    norm.includes("al alias") ||
    norm.includes("mula") ||
    norm.includes("triangula") ||
    norm.includes("a esta otra") ||
    (norm.includes("alias") && (norm.includes("transferi") || norm.includes("plata") || norm.includes("amigo") || norm.includes("cuenta")));

  const hasMistakenTransfer =
    flags.hasFakeBuyer ||
    (norm.includes("por error") && (norm.includes("transfer") || norm.includes("envie") || norm.includes("mande") || norm.includes("plata") || norm.includes("pago"))) ||
    norm.includes("transferi de mas") ||
    norm.includes("plata de mas");

  if (hasMistakenTransfer || isTriangulationOrMule) {
    conf0006 += 55;
    if (norm.includes("devol") || norm.includes("transf") || norm.includes("error") || norm.includes("comprobante") || isTriangulationOrMule) conf0006 += 25;
    if (vector.urgencyScarcity >= 50 || norm.includes("cheque") || norm.includes("rechazar")) conf0006 += 20;
  }
  if (conf0006 >= 60) {
    matches.push({
      code: "LKP-0006",
      name: "Fraude del Falso Comprador & Triangulación",
      confidence: Math.min(100, conf0006),
      mitigationStrategy: "Nunca reintegrar dinero a un alias o cuenta distinta. Usar exclusivamente la opción 'Devolver' de tu propia app bancaria."
    });
  }

  // LKP-0007: Falsas Multas y Encomiendas (Smishing Logístico)
  let conf0007 = 0;
  if (flags.hasLogistic) {
    conf0007 += 60;
    if (norm.includes("tasa") || norm.includes("enlace") || norm.includes("link") || norm.includes("pago") || norm.includes("puntos")) conf0007 += 30;
  }
  if (conf0007 >= 60) {
    matches.push({
      code: "LKP-0007",
      name: "Falsas Multas y Encomiendas (Smishing Logístico)",
      confidence: Math.min(100, conf0007),
      mitigationStrategy: "No ingresar a enlaces recibidos por SMS. Consultar el tracking oficial en la web del correo o ente vial."
    });
  }

  // LKP-0008: Falsas Intimaciones de Organismos Oficiales (AFIP/ARCA, ANSES, PAMI)
  let conf0008 = 0;
  if (flags.hasOfficialBodies && (flags.hasSensitive || flags.hasMoneyDemand || norm.includes("cajero") || norm.includes("embargo") || norm.includes("deuda"))) {
    conf0008 += 75;
    if (norm.includes("bono") || norm.includes("jubilad") || norm.includes("clave fiscal")) conf0008 += 20;
  }
  if (conf0008 >= 60) {
    matches.push({
      code: "LKP-0008",
      name: "Falsas Intimaciones de Organismos Oficiales",
      confidence: Math.min(100, conf0008),
      mitigationStrategy: "Ningún organismo oficial exige ir al cajero ni pide claves por teléfono. Cortar y consultar en sede oficial."
    });
  }

  return matches;
}

// -----------------------------------------------------------------------------
// FUNCIÓN PRINCIPAL DE EVALUACIÓN HÍBRIDA
// -----------------------------------------------------------------------------

export function evaluateClientScam(text: string): ClientScamResult {
  const norm = normalizeText(text);
  const tokens = tokenize(norm);
  const detectedPatterns: string[] = [];
  const techniques: string[] = [];

  // =========================================================================
  // CAPA 1: FILTRO RÁPIDO & AISLAMIENTO TÉCNICO (0ms)
  // =========================================================================
  const isTechLog = isSystemOrTechnicalLog(text);
  const hasFear = matchesCluster(norm, tokens, CLUSTERS.FEAR_EXTORTION);
  const hasSensitive = matchesCluster(norm, tokens, CLUSTERS.SENSITIVE);
  const hasAccountTakeover = matchesCluster(norm, tokens, CLUSTERS.ACCOUNT_TAKEOVER);

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
      engineMode: "MOTOR_HEURISTICO_ONTOLOGICO_ON_DEVICE",
    };
  }

  // =========================================================================
  // BANDERAS CONCEPTUALES
  // =========================================================================
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
  const hasLogistic = matchesCluster(norm, tokens, CLUSTERS.LOGISTIC);
  const hasOfficialBodies = matchesCluster(norm, tokens, CLUSTERS.OFFICIAL_BODIES);
  const hasDefensiveAdvice = matchesCluster(norm, tokens, CLUSTERS.DEFENSIVE_ADVICE);
  const hasExtractionDemand = matchesCluster(norm, tokens, CLUSTERS.EXTRACTION_DEMAND);

  const isBankAuthority = matchesCluster(norm, tokens, [
    "banco", "galicia", "nacion", "santander", "bbva", "macro", "brubank",
    "mercado pago", "mercadopago", "cuenta dni", "cuentadni", "tarjeta", "homebanking", "bancaria"
  ]);

  // Filtro de precisión defensiva: si el banco o billetera emite un token/OTP
  // con advertencias legítimas de seguridad, SIN vector de extracción activo ni enlace externo.
  const hasExternalLink = norm.includes("http://") || norm.includes("https://") || norm.includes("www.");
  const isLegitimateTransactionalNotice =
    hasDefensiveAdvice &&
    !hasExtractionDemand &&
    !hasExternalLink &&
    !hasFakeBuyer &&
    !hasRemote &&
    !hasFear;

  if (isLegitimateTransactionalNotice) {
    return {
      riskScore: 15,
      riskLevel: "BAJO",
      threatCategory: "Aviso Transaccional Legítimo",
      detectedPatterns: ["Aviso transaccional legítimo con advertencia preventiva de seguridad"],
      techniques: ["Notificación institucional segura (Sin vector de extracción)"],
      targetAsset: "Ninguno (Mensaje informativo seguro)",
      recommendations: [
        "Mensaje seguro. Guardá este código y nunca lo compartas con terceros por llamada o chat.",
        "Si no solicitaste este código, ingresá a la app oficial del banco para verificar tus accesos."
      ],
      explanation: "El mensaje contiene advertencias de seguridad legítimas y no incluye solicitudes para extraer tus datos ni enlaces a sitios no verificados.",
      engineMode: "MOTOR_HEURISTICO_ONTOLOGICO_ON_DEVICE",
    };
  }

  const flags: Record<string, boolean> = {
    hasFear,
    hasSensitive,
    hasAccountTakeover,
    hasPressure,
    hasAuthority,
    hasIsolation,
    hasRemote,
    hasTaskScam,
    hasFamilyIdentity,
    hasFamilyKinship,
    hasMoneyDemand,
    hasFakeBuyer,
    hasPrize,
    hasLogistic,
    hasOfficialBodies,
    isBankAuthority,
    hasDefensiveAdvice,
    hasExtractionDemand,
  };

  // =========================================================================
  // CAPA 3: VECTOR DE MANIPULACIÓN PSICOLÓGICA (CIALDINI & KAHNEMAN)
  // =========================================================================
  const manipulationVector = calculateManipulationVector(norm, tokens, flags);

  // =========================================================================
  // CAPA 2: EVALUACIÓN ONTOLÓGICA LKP MULTI-LABEL
  // =========================================================================
  const matchedLkps = evaluateCanonicalLkps(norm, tokens, flags, manipulationVector);
  const isCombinedAttack = matchedLkps.length >= 2;

  // =========================================================================
  // FUSIÓN DE SEÑALES Y DETERMINACIÓN DE TÉCNICAS Y SCORE
  // =========================================================================
  let score = 0;

  // Si hubo coincidencia ontológica en LKPs
  if (matchedLkps.length > 0) {
    const highestConfidence = Math.max(...matchedLkps.map((m) => m.confidence));
    score = Math.max(score, highestConfidence);

    // Si es ataque combinado, boost por complejidad y superposición de vectores
    if (isCombinedAttack) {
      score = Math.min(100, score + 10);
      detectedPatterns.push(`Ataque de vector compuesto detectado: combinación de ${matchedLkps.map((m) => m.code).join(" + ")}`);
    }

    for (const match of matchedLkps) {
      if (match.code === "LKP-0001") {
        detectedPatterns.push("Extorsión o secuestro virtual con demanda económica y shock psicológico");
        techniques.push("Manipulación mediante miedo extremo (Extorsión)");
      } else if (match.code === "LKP-0002") {
        detectedPatterns.push("Suplantación de entidad bancaria solicitando datos confidenciales o acceso remoto");
        techniques.push("Suplantación de identidad (Phishing)");
      } else if (match.code === "LKP-0003") {
        detectedPatterns.push("Esquema de tareas remuneradas o falsa plataforma de inversión con rendimientos simulados");
        techniques.push("Fraude de inversión / Ponzi digital");
      } else if (match.code === "LKP-0004") {
        detectedPatterns.push("Falso familiar alegando cambio de número y solicitando transferencias urgentes");
        techniques.push("Suplantación afectiva familiar");
      } else if (match.code === "LKP-0005") {
        detectedPatterns.push("Intento de obtención de código de verificación o token SMS para secuestro de cuenta");
        techniques.push("Robo de token de autenticación (Account Takeover)");
      } else if (match.code === "LKP-0006") {
        const isMule = norm.includes("otra cuenta") || norm.includes("alias") || norm.includes("mula") || norm.includes("a esta otra");
        detectedPatterns.push(isMule
          ? "Supuesta transferencia por error solicitando reenviar fondos a otra cuenta o alias (Triangulación / Mula Financiera)"
          : "Reclamo de transferencia excedida por error con comprobante apócrifo para forzar reintegro"
        );
        techniques.push(isMule ? "Triangulación de fondos / Mula financiera" : "Falso comprobante y presión por reintegro");
      } else if (match.code === "LKP-0007") {
        detectedPatterns.push("Smishing logístico simulando envío retenido o fotomulta estatal");
        techniques.push("Smishing logístico / Enlace apócrifo");
        techniques.push("Smishing de Multas y Encomiendas (LKP-0007)");
      } else if (match.code === "LKP-0008") {
        detectedPatterns.push("Suplantación de organismo oficial (AFIP, ANSES, PAMI) para inducción a cajero o entrega de claves");
        techniques.push("Falsa autoridad oficial");
        techniques.push("Suplantación de Organismos Públicos (LKP-0008)");
      }
    }
  }

  // Detección auxiliar de falso premio (Pretexting)
  if (hasPrize && (hasSensitive || hasRemote || isBankAuthority || norm.includes("deposito") || norm.includes("clave") || norm.includes("usuario") || norm.includes("cuenta") || norm.includes("transfer"))) {
    score = Math.max(score, 85);
    detectedPatterns.push("Falso premio o beneficio de cliente de la semana condicionado a entrega de claves o datos bancarios");
    techniques.push("Falso premio con ingeniería social (Pretexting)");
  }

  // Detección auxiliar de control remoto no autorizado
  if (hasRemote) {
    score = Math.max(score, score + 25);
    detectedPatterns.push("Pedido de instalación de software de control remoto (AnyDesk, TeamViewer)");
    techniques.push("Acceso remoto no autorizado");
  }

  // Ponderación del vector de manipulación
  if (manipulationVector.urgencyScarcity >= 60 && score > 0) {
    detectedPatterns.push(`Urgencia artificial detectada (${manipulationVector.urgencyScarcity}/100) para forzar toma de decisiones impulsiva`);
    techniques.push("Urgencia artificial");
  }
  if (manipulationVector.isolationTactics >= 60 && score > 0) {
    detectedPatterns.push(`Intento de aislamiento de la víctima (${manipulationVector.isolationTactics}/100)`);
    techniques.push("Aislamiento de la víctima");
  }

  score = Math.min(100, score);

  let riskLevel: "BAJO" | "MEDIO" | "ALTO" | "CRÍTICO" = "BAJO";
  if (score >= 80) riskLevel = "CRÍTICO";
  else if (score >= 60) riskLevel = "ALTO";
  else if (score >= 40) riskLevel = "MEDIO";

  // =========================================================================
  // CATEGORIZACIÓN TAXONÓMICA (SINGLE O MULTI-LABEL)
  // =========================================================================
  let threatCategory = "Sin patrones sospechosos conocidos (Fase Experimental)";

  if (isCombinedAttack) {
    const lkpNames = matchedLkps.map((m) => `${m.code} (${m.name})`).join(" + ");
    threatCategory = `Ataque Combinado: ${lkpNames}`;
  } else if (matchedLkps.length === 1) {
    threatCategory = `${matchedLkps[0].name} (${matchedLkps[0].code})`;
  } else if (techniques.includes("Falso premio con ingeniería social (Pretexting)")) {
    threatCategory = "Falso Premio / Bono de Compra con Extracción de Claves";
  } else if (detectedPatterns.length > 0) {
    threatCategory = "Actividad sospechosa de ingeniería social";
  }

  // =========================================================================
  // ACTIVO OBJETIVO
  // =========================================================================
  let targetAsset = "Ninguno identificado";
  if (techniques.includes("Robo de token de autenticación (Account Takeover)")) {
    targetAsset = "Código de verificación SMS / Control de cuenta de WhatsApp";
  } else if (techniques.includes("Triangulación de fondos / Mula financiera")) {
    targetAsset = "Fondos transferidos por supuesta devolución de pago / Cuenta bancaria usada como mula";
  } else if (techniques.includes("Falso comprobante y presión por reintegro")) {
    targetAsset = "Fondos monetarios por falso reintegro de compraventa";
  } else if (techniques.includes("Suplantación afectiva familiar")) {
    targetAsset = "Transferencia monetaria inmediata a cuenta de tercero";
  } else if (hasSensitive) {
    targetAsset = "Código SMS / Token OTP / Credenciales bancarias";
  } else if (hasRemote) {
    targetAsset = "Control total del dispositivo mediante software remoto";
  } else if (norm.includes("transferi") || norm.includes("plata") || norm.includes("dinero") || norm.includes("rescate")) {
    targetAsset = "Fondos monetarios directos";
  }

  // =========================================================================
  // RECOMENDACIONES CIUDADANAS
  // =========================================================================
  const recommendations: string[] = [];
  if (riskLevel === "CRÍTICO" || riskLevel === "ALTO") {
    recommendations.push("Cortá la comunicación de inmediato. No respondas ni abras enlaces.");
    recommendations.push("No compartas ningún código SMS ni token de 6 dígitos con nadie.");

    // Recomendaciones específicas de los LKPs identificados
    for (const match of matchedLkps) {
      recommendations.push(`🛡️ ${match.code}: ${match.mitigationStrategy}`);
    }

    if (techniques.includes("Triangulación de fondos / Mula financiera") && !matchedLkps.some((m) => m.code === "LKP-0006")) {
      recommendations.push("⚠️ NUNCA transfieras dinero a una cuenta o alias distinto al originario: es una táctica clásica de triangulación para usar tu cuenta como mula.");
    }
  } else if (riskLevel === "MEDIO") {
    recommendations.push("Pausá antes de actuar. Verificá la autenticidad del mensaje por un canal oficial e independiente.");
    recommendations.push("Nunca transfieras dinero ni instales aplicaciones para cobrar premios o empezar supuestos trabajos.");
  } else {
    recommendations.push("No se identificaron patrones comunes de engaño en esta evaluación.");
    recommendations.push("Recordá: la ausencia de alerta no garantiza autenticidad. Nunca compartas códigos ni tokens.");
    recommendations.push("Los bancos y entidades oficiales nunca te pedirán transferencias urgentes ni datos confidenciales por chat.");
  }

  // =========================================================================
  // EXPLICACIÓN CIUDADANA EXPLICABLE
  // =========================================================================
  let explanation = "No se identificaron patrones de ingeniería social conocidos en esta evaluación del Laboratorio Ciudadano. ⚠️ Advertencia Preventiva: La ausencia de alerta no garantiza autenticidad. Nunca compartas códigos de verificación (SMS/WhatsApp), tokens bancarios ni transfieras dinero ante pedidos imprevistos por chat.";
  if (riskLevel === "CRÍTICO") {
    explanation = isCombinedAttack
      ? `Detectamos un ataque compuesto grave (${matchedLkps.map((m) => m.code).join(" + ")}). Quien te escribe combina múltiples palancas psicológicas (${manipulationVector.primaryPrinciple}) para forzar una transferencia o entrega de accesos.`
      : `Detectamos señales graves de fraude activo o extorsión. Principio rector: ${manipulationVector.primaryPrinciple}. El atacante busca inducir urgencia o pánico para vulnerar tus defensas.`;
  } else if (riskLevel === "ALTO") {
    explanation = `El mensaje presenta indicadores claros de ingeniería social (${manipulationVector.primaryPrinciple}). Se detectaron técnicas activas de coerción o suplantación.`;
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
    manipulationVector,
    matchedLkps,
    isCombinedAttack,
    engineMode: "MOTOR_HEURISTICO_ONTOLOGICO_ON_DEVICE",
  };
}
