import { NextRequest, NextResponse } from "next/server";
import { sanitizeZeroPii } from "@/lib/zero-pii";

export const dynamic = "force-dynamic";

const LUMA_VERIFIER_URL = "https://www.lumaprotect.com.ar/verificador";
const CONTEXT_TTL_MS = 5 * 60 * 1000; // 5 minutos en RAM volátil
const DEFAULT_GEMINI_MODEL = "gemini-3.8-flash";

interface UserVolatileContext {
  text?: string;
  fileId?: string;
  mimeType?: string;
  mediaKind?: string;
  timestamp: number;
}

const volatileContextMap = new Map<string, UserVolatileContext>();

function evictExpiredContext() {
  const now = Date.now();
  for (const [k, v] of volatileContextMap.entries()) {
    if (now - v.timestamp > CONTEXT_TTL_MS) {
      volatileContextMap.delete(k);
    }
  }
}

function isMetaScamQuestion(text: string): boolean {
  const clean = text.trim();
  if (!clean || clean.length > 110 || clean.includes("\n") || /https?:\/\//i.test(clean)) {
    return false;
  }
  const metaRegex =
    /^\s*(?:hola\s*(?:luma)?[,.\s]*)?(?:(?:me\s+)?(?:pod[eé]s\s+|puedes\s+)?(?:decir|confirmar|analizar|fijarte|chequear|ver|avisar)\s+|(?:dime|decime|contame|fijate|cheque[aá]|analiz[aá]|mir[aá]|evalu[aá])\s+)?(?:si\s+(?:esto\s+|este\s+mensaje\s+|este\s+audio\s+|este\s+correo\s+|este\s+link\s+)?)?(?:es\s+|ser[aá]\s+|puede\s+ser\s+|parece\s+)?(?:una?\s+)?(?:posible\s+|intento\s+de\s+|probable\s+)?(?:estafa|fraude|enga[nñ]o|trampa|cuento\s+del\s+t[ií]o|phishing|falso|verdadero|real|seguro|confiable|leg[ií]timo)[\s\?!.]*$/i;
  return metaRegex.test(clean);
}

const THREAT_CATALOG: Record<string, { name: string; description: string; rules: string[] }> = {
  "LKP-0001": {
    name: "Secuestro Virtual / Extorsión Emocional",
    description: "Intentan asustarte fingiendo un accidente o secuestro de un familiar para que entregues dinero sin pensar.",
    rules: [
      "Cortá la llamada de inmediato.",
      "Llamá vos directamente a tu familiar a su número de siempre.",
      "Nunca des nombres ni datos de tu familia por teléfono."
    ]
  },
  "LKP-0002": {
    name: "Suplantación Bancaria / Robo de Credenciales",
    description: "Fingen ser tu banco o billetera alertando un supuesto bloqueo o compra para robarte claves o códigos.",
    rules: [
      "No toques ningún enlace ni descargues aplicaciones como AnyDesk o TeamViewer.",
      "Tu banco jamás te pide claves ni códigos de 6 dígitos por mensaje o llamada.",
      "Entrá manualmente desde la app oficial de tu banco."
    ]
  },
  "LKP-0003": {
    name: "Falsa Oferta Laboral / Estafa de Tareas",
    description: "Prometen dinero rápido por dar 'Me gusta' en TikTok/YouTube y luego te exigen depositar plata para destrabar comisiones.",
    rules: [
      "Ningún trabajo legítimo te pide transferir dinero para poder cobrar tu sueldo.",
      "No deposites en cuentas desconocidas ni plataformas cripto dudosas.",
      "Bloqueá y reportá al remitente."
    ]
  },
  "LKP-0004": {
    name: "Falso Familiar por WhatsApp ('Hola má, cambié el número')",
    description: "Se hacen pasar por un hijo o familiar diciendo que cambiaron el teléfono y piden una transferencia urgente a una cuenta de un tercero.",
    rules: [
      "No transfieras dinero a cuentas con nombres de desconocidos.",
      "Llamá por teléfono o videollamada al número viejo de tu familiar para verificar.",
      "Hacé una pregunta personal que solo tu familiar real pueda responder."
    ]
  },
  "LKP-0005": {
    name: "Secuestro de Cuenta de WhatsApp / Robo de Código SMS",
    description: "Con la excusa de un turno médico, vacuna o paquete, te piden los 6 números que te llegan por SMS para robarte tu WhatsApp.",
    rules: [
      "Jamás compartas el código de 6 dígitos que llega por SMS.",
      "Activá la verificación en dos pasos en tu WhatsApp.",
      "Cortá la llamada inmediatamente."
    ]
  },
  "LKP-0006": {
    name: "Fraude de Transferencia por Error / DEBIN o Falso Comprobante",
    description: "Envían un comprobante falso diciendo que te transfirieron por error y te presionan para devolver plata o aceptar un DEBIN.",
    rules: [
      "Verificá el saldo real adentro de tu home banking; una foto de comprobante no es dinero acreditado.",
      "Recordá que aceptar un DEBIN debita dinero de tu cuenta, no te acredita plata.",
      "No devuelvas dinero a cuentas distintas sin hablar antes con tu banco."
    ]
  }
};

function classifyThreatHeuristic(text: string): string | null {
  const lower = text.toLowerCase();
  if (/(tenemos a tu|secuestr|no cortes|lo matamos|accidente grave.*plata)/.test(lower)) return "LKP-0001";
  if (/(cuenta (bloqueada|suspendida)|validar cuenta|anydesk|teamviewer|homebanking bloqueado)/.test(lower)) return "LKP-0002";
  if (/(gan[aá] .* por d[ií]a|dar likes?|me gusta.*youtube|tiktok.*tarea|comisi[oó]n vip)/.test(lower)) return "LKP-0003";
  if (/(hola m[aá]|hola p[aá]|cambi[eé] el (celu|n[uú]mero)|agend[aá] este n[uú]mero|transferime .* alias)/.test(lower)) return "LKP-0004";
  if (/(c[oó]digo.*por error|reenvi[aá]melo|c[oó]digo.*6 d[ií]gitos|turno de vacunaci[oó]n.*sms)/.test(lower)) return "LKP-0005";
  if (/(te transfer[ií].*(de m[aá]s|por error)|devolveme la diferencia|debin)/.test(lower)) return "LKP-0006";
  return null;
}

const SYSTEM_PROMPT = `Sos Luma, el asistente de ciberseguridad ciudadana de Luma Protect en Argentina (impulsado por estudiantes de la Licenciatura en Ciberseguridad de la UNSO).
Tu misión es ayudar a adultos mayores, familias y ciudadanos a detectar si un mensaje de texto, audio de WhatsApp o captura de pantalla es una estafa (ingeniería social, phishing, cuento del tío, falso soporte, falso familiar, secuestro de WhatsApp, estafa laboral o comprobante falso).

Reglas estrictas de respuesta:
1. Hablá en español rioplatense (Argentina), con tono cálido, claro, empático, paciente y directo (Cero tecnicismos difíciles).
2. Dá un VEREDICTO CLARO al principio:
   - 🚨 RIESGO ALTO DE ESTAFA
   - ⚠️ PRECAUCIÓN / SOSPECHOSO
   - ✅ PARECE SEGURO (pero siempre verificá por canal oficial)
3. Si es un audio o imagen, resumí brevemente en 1 oración qué dice o muestra y por qué es peligroso (ej. urgencia artificial, pedido de claves/códigos de 6 dígitos, transferencia a cuenta de tercero, instalación de AnyDesk/TeamViewer/APK).
4. Dá 3 pasos concretos de acción inmediata (qué NO hacer y cómo verificar).
5. Nunca pidas datos personales (DNI, claves, CBU). Mantené la respuesta concisa (máximo 160 palabras) usando formato HTML compatible con Telegram (<b>negrita</b>, <i>cursiva</i>). No uses etiquetas Markdown como ** ni bloques \`\`\`.`;

async function telegramApiCall(method: string, payload: Record<string, unknown>) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;
  await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

async function downloadTelegramMediaBase64(fileId: string): Promise<string | null> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return null;
  try {
    const infoRes = await fetch(`https://api.telegram.org/bot${token}/getFile?file_id=${encodeURIComponent(fileId)}`);
    const infoData = await infoRes.json();
    const filePath = infoData?.result?.file_path;
    if (!filePath) return null;
    const fileRes = await fetch(`https://api.telegram.org/file/bot${token}/${filePath}`);
    const arrayBuffer = await fileRes.arrayBuffer();
    if (arrayBuffer.byteLength > 15 * 1024 * 1024) return null;
    return Buffer.from(arrayBuffer).toString("base64");
  } catch {
    return null;
  }
}

async function analyzeWithGemini(opts: {
  cleanText?: string;
  userQuestion?: string;
  mediaBase64?: string | null;
  mimeType?: string;
}): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  const model = process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL;

  const parts: Array<Record<string, unknown>> = [];
  if (opts.mediaBase64 && opts.mimeType) {
    parts.push({
      inline_data: {
        mime_type: opts.mimeType,
        data: opts.mediaBase64
      }
    });
  }

  const promptSegments: string[] = [];
  if (opts.cleanText) {
    promptSegments.push(`Contenido recibido para analizar (sanitizado Zero-PII):\n"${opts.cleanText}"`);
  }
  if (opts.userQuestion) {
    promptSegments.push(`Consulta del usuario:\n"${opts.userQuestion}"`);
  }
  if (promptSegments.length === 0 && opts.mediaBase64) {
    promptSegments.push("Analizá este archivo multimedia (audio de WhatsApp o captura) y determiná si se trata de una posible estafa.");
  }
  if (promptSegments.length === 0) return null;

  parts.push({ text: promptSegments.join("\n\n") });

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ role: "user", parts }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 700 }
        })
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const candParts: Array<{ text?: string; thought?: boolean }> =
      data?.candidates?.[0]?.content?.parts || [];
    const textChunks = candParts
      .filter((p) => !p.thought && typeof p.text === "string")
      .map((p) => p.text as string);
    let reply = textChunks.join("\n").trim();
    if (!reply && candParts.length > 0 && candParts[candParts.length - 1].text) {
      reply = String(candParts[candParts.length - 1].text).trim();
    }
    return reply ? reply.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>") : null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    evictExpiredContext();
    const upd = await req.json();

    if (upd.message) {
      const msg = upd.message;
      const userId = String(msg.chat?.id || "");
      const firstName = msg.from?.first_name || "";
      const rawText: string = msg.text || msg.caption || "";
      const cleanText = sanitizeZeroPii(rawText);

      if (!userId) return NextResponse.json({ ok: true });

      // Detectar audio / nota de voz / foto adjunta
      let mediaFileId: string | undefined;
      let mediaMime: string | undefined;
      let mediaKind: string | undefined;

      if (msg.voice?.file_id) {
        mediaFileId = msg.voice.file_id;
        mediaMime = msg.voice.mime_type || "audio/ogg";
        mediaKind = "audio";
      } else if (msg.audio?.file_id) {
        mediaFileId = msg.audio.file_id;
        mediaMime = msg.audio.mime_type || "audio/mpeg";
        mediaKind = "audio";
      } else if (Array.isArray(msg.photo) && msg.photo.length > 0) {
        mediaFileId = msg.photo[msg.photo.length - 1].file_id;
        mediaMime = "image/jpeg";
        mediaKind = "image";
      }

      if (mediaFileId) {
        volatileContextMap.set(userId, {
          text: cleanText,
          fileId: mediaFileId,
          mimeType: mediaMime,
          mediaKind,
          timestamp: Date.now()
        });

        const mediaBase64 = await downloadTelegramMediaBase64(mediaFileId);
        const aiVerdict = await analyzeWithGemini({
          cleanText,
          userQuestion: "Analizá este archivo reenviado y decime si es una estafa.",
          mediaBase64,
          mimeType: mediaMime
        });

        if (aiVerdict) {
          await telegramApiCall("sendMessage", {
            chat_id: userId,
            parse_mode: "HTML",
            text:
              `🤖 <b>ANÁLISIS INTELIGENTE LUMA PROTECT</b>\n\n` +
              `${aiVerdict}\n\n` +
              `🔒 <i>Análisis privado Zero-PII (sin guardar tus datos personales).</i>\n` +
              `🔍 <a href="${LUMA_VERIFIER_URL}">${LUMA_VERIFIER_URL}</a>`
          });
          return NextResponse.json({ ok: true });
        }
      }

      // Consulta en 2 pasos ("¿es una posible estafa?")
      if (isMetaScamQuestion(rawText)) {
        const ctx = volatileContextMap.get(userId);
        if (ctx && (ctx.text || ctx.fileId)) {
          const mediaBase64 = ctx.fileId ? await downloadTelegramMediaBase64(ctx.fileId) : null;
          const aiVerdict = await analyzeWithGemini({
            cleanText: ctx.text,
            userQuestion: cleanText,
            mediaBase64,
            mimeType: ctx.mimeType
          });
          if (aiVerdict) {
            await telegramApiCall("sendMessage", {
              chat_id: userId,
              parse_mode: "HTML",
              text:
                `🤖 <b>ANÁLISIS INTELIGENTE LUMA PROTECT</b>\n\n` +
                `${aiVerdict}\n\n` +
                `🔒 <i>Análisis privado Zero-PII (sin guardar tus datos personales).</i>\n` +
                `🔍 <a href="${LUMA_VERIFIER_URL}">${LUMA_VERIFIER_URL}</a>`
            });
            return NextResponse.json({ ok: true });
          }

          if (ctx.text) {
            const code = classifyThreatHeuristic(ctx.text);
            if (code && THREAT_CATALOG[code]) {
              const t = THREAT_CATALOG[code];
              await telegramApiCall("sendMessage", {
                chat_id: userId,
                parse_mode: "HTML",
                text:
                  `🚨 <b>DIAGNÓSTICO PREVENTIVO LUMA PROTECT</b> 🚨\n\n` +
                  `⚠️ El mensaje que me enviaste coincide con:\n👉 <b>${t.name}</b> (<code>${code}</code>)\n\n` +
                  `🔎 <b>Cómo operan:</b> ${t.description}\n\n` +
                  `🛑 <b>Qué hacer ahora:</b>\n` +
                  t.rules.map((r) => `• <b>${r}</b>`).join("\n") +
                  `\n\n🔍 <a href="${LUMA_VERIFIER_URL}">${LUMA_VERIFIER_URL}</a>`
              });
              return NextResponse.json({ ok: true });
            }
          }
        }
      }

      if (cleanText.length >= 6) {
        volatileContextMap.set(userId, { text: cleanText, timestamp: Date.now() });
      }

      // Análisis con Gemini o fallback heurístico
      if (cleanText.length >= 8 && !cleanText.startsWith("/")) {
        const aiVerdict = await analyzeWithGemini({
          cleanText,
          userQuestion: "Evaluá si este mensaje o consulta describe una estafa y orientá a la persona."
        });
        if (aiVerdict) {
          await telegramApiCall("sendMessage", {
            chat_id: userId,
            parse_mode: "HTML",
            text:
              `🤖 <b>ANÁLISIS INTELIGENTE LUMA PROTECT</b>\n\n` +
              `${aiVerdict}\n\n` +
              `🔒 <i>Análisis privado Zero-PII (sin guardar tus datos personales).</i>\n` +
              `🔍 <a href="${LUMA_VERIFIER_URL}">${LUMA_VERIFIER_URL}</a>`
          });
          return NextResponse.json({ ok: true });
        }
      }

      const code = classifyThreatHeuristic(cleanText);
      if (code && THREAT_CATALOG[code]) {
        const t = THREAT_CATALOG[code];
        await telegramApiCall("sendMessage", {
          chat_id: userId,
          parse_mode: "HTML",
          text:
            `🚨 <b>DIAGNÓSTICO PREVENTIVO LUMA PROTECT</b> 🚨\n\n` +
            `⚠️ Este mensaje coincide con:\n👉 <b>${t.name}</b> (<code>${code}</code>)\n\n` +
            `🔎 <b>Cómo operan:</b> ${t.description}\n\n` +
            `🛑 <b>Qué tenés que hacer ahora mismo:</b>\n` +
            t.rules.map((r) => `• <b>${r}</b>`).join("\n") +
            `\n\n🔍 <a href="${LUMA_VERIFIER_URL}">${LUMA_VERIFIER_URL}</a>`
        });
      } else {
        await telegramApiCall("sendMessage", {
          chat_id: userId,
          parse_mode: "HTML",
          text:
            `🛡️ <b>Luma Protect — Asistente Ciudadano</b>\n\n` +
            `Hola ${firstName}, recibí tu consulta. Si tenés un mensaje, enlace o audio de WhatsApp sospechoso, reenviámelo acá mismo para analizarlo.\n\n` +
            `🔍 <b>Verificador Web:</b> <a href="${LUMA_VERIFIER_URL}">${LUMA_VERIFIER_URL}</a>`
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 200 });
  }
}
