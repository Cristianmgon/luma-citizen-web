import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { sanitizeZeroPii } from "@/lib/zero-pii";

export const dynamic = "force-dynamic";

// Directorio y archivo para telemetría protegida del Laboratorio Ciudadano
// En entornos serverless como Vercel, usamos /tmp para evitar errores de sistema de archivos de solo lectura
const DATA_DIR = process.env.VERCEL ? path.join("/tmp", "data") : path.join(process.cwd(), "data");
const FEEDBACK_FILE = path.join(DATA_DIR, "laboratorio_feedback.jsonl");

// En-memoria: limitador básico anti-flooding (máx 15 reportes por minuto por IP/UA)
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function cleanExpiredRateLimits() {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (value.expiresAt <= now) {
      rateLimitMap.delete(key);
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    cleanExpiredRateLimits();

    const clientIp = req.headers.get("x-forwarded-for") || "anonymous-client";
    const userAgent = req.headers.get("user-agent") || "unknown-ua";
    const clientKey = crypto.createHash("sha256").update(`${clientIp}-${userAgent}`).digest("hex");

    const currentRate = rateLimitMap.get(clientKey);
    const now = Date.now();

    if (currentRate && currentRate.expiresAt > now) {
      if (currentRate.count >= 20) {
        return NextResponse.json(
          { error: "Límite de solicitudes alcanzado. Por favor, reintente en un minuto." },
          { status: 429 }
        );
      }
      currentRate.count += 1;
    } else {
      rateLimitMap.set(clientKey, { count: 1, expiresAt: now + 60_000 });
    }

    const body = await req.json();
    const { text, riskScore, riskLevel, threatCategory, feedbackType, notes, isTechnicalLog } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Texto requerido para el reporte" }, { status: 400 });
    }

    // Validación básica anti-troleo inmediato
    const trimmed = text.trim();
    if (trimmed.length < 5) {
      return NextResponse.json({ error: "Texto demasiado breve para análisis" }, { status: 400 });
    }

    // Sanitización Zero-PII estricta antes del almacenamiento
    const sanitizedText = sanitizeZeroPii(trimmed);
    const sanitizedNotes = notes ? sanitizeZeroPii(String(notes)) : "";

    const entryId = crypto.randomUUID();
    const record = {
      id: entryId,
      timestamp: new Date().toISOString(),
      feedbackType: feedbackType || "ACERTADO",
      riskScore: typeof riskScore === "number" ? riskScore : 0,
      riskLevel: riskLevel || "BAJO",
      threatCategory: threatCategory || "Sin clasificar",
      isTechnicalLog: Boolean(isTechnicalLog),
      sanitizedText,
      notes: sanitizedNotes,
      clientHash: clientKey.substring(0, 16), // Hash truncado para telemetría anti-abuso sin rastrear identidad
      triageStatus: "PENDIENTE_CURADOR",
    };

    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.appendFileSync(FEEDBACK_FILE, JSON.stringify(record) + "\n", "utf8");
    } catch (fsErr) {
      console.warn("Advertencia: No se pudo persistir en disco (entorno serverless efímero):", fsErr);
    }

    return NextResponse.json({
      success: true,
      message: "Reporte registrado y enviado al equipo de investigación",
      id: entryId,
      triageStatus: "PENDIENTE_CURADOR",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Error al procesar feedback del Laboratorio:", errorMsg);
    return NextResponse.json(
      { error: "Error interno al registrar el feedback", details: errorMsg },
      { status: 500 }
    );
  }
}
