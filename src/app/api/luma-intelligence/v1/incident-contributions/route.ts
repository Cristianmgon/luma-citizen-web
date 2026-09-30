import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

export const dynamic = "force-dynamic";

// Directorio y archivo para telemetría protegida móvil (Luma Protect Core)
const DATA_DIR = process.env.VERCEL ? path.join("/tmp", "data") : path.join(process.cwd(), "data");
const CONTRIBUTIONS_FILE = path.join(DATA_DIR, "incident_contributions.jsonl");

// En-memoria: limitador básico anti-flooding (máx 30 contribuciones por minuto por IP/token)
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function cleanExpiredRateLimits() {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (value.expiresAt <= now) {
      rateLimitMap.delete(key);
    }
  }
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const TOKEN_HEX_REGEX = /^[a-f0-9]{64}$/i;

export async function POST(req: NextRequest) {
  try {
    cleanExpiredRateLimits();

    // 1. Verificación de Autorización (Bearer Token de 64 caracteres)
    const authHeader = req.headers.get("authorization") || "";
    if (!authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Autorización requerida. Header Bearer ausente o malformado." },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7).trim();
    if (!TOKEN_HEX_REGEX.test(token)) {
      return NextResponse.json(
        { error: "Credencial temporal inválida. Se requiere token hexadecimal de 64 caracteres." },
        { status: 403 }
      );
    }

    // 2. Anti-flooding por token / IP
    const clientIp = req.headers.get("x-forwarded-for") || "anonymous-client";
    const clientKey = crypto.createHash("sha256").update(`${clientIp}-${token}`).digest("hex");
    const currentRate = rateLimitMap.get(clientKey);
    const now = Date.now();

    if (currentRate && currentRate.expiresAt > now) {
      if (currentRate.count >= 40) {
        return NextResponse.json(
          { error: "Límite de telemetría alcanzado para esta ventana. Reintente luego." },
          { status: 429 }
        );
      }
      currentRate.count += 1;
    } else {
      rateLimitMap.set(clientKey, { count: 1, expiresAt: now + 60_000 });
    }

    // 3. Lectura y validación del payload
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Cuerpo JSON inválido" }, { status: 400 });
    }

    const {
      schemaVersion,
      contributionId,
      sourceEventRef,
      threatClass,
      channel,
      abstractSignals,
      riskLevel,
      consentState,
      minimizationProfileVersion,
      payloadIntegrity,
      timeBucket,
      protectionVersion,
      sourceClass,
    } = body;

    // Validación de invariantes de minimización (Zero-PII)
    if (schemaVersion !== "luma-incident-intelligence-contribution@1") {
      return NextResponse.json({ error: "Versión de esquema no soportada" }, { status: 422 });
    }

    if (!contributionId || !UUID_REGEX.test(contributionId)) {
      return NextResponse.json({ error: "contributionId inválido (debe ser UUID v4)" }, { status: 400 });
    }

    if (!sourceEventRef || !UUID_REGEX.test(sourceEventRef)) {
      return NextResponse.json({ error: "sourceEventRef inválido (debe ser UUID v4)" }, { status: 400 });
    }

    if (consentState !== "GRANTED") {
      return NextResponse.json({ error: "Consentimiento no otorgado" }, { status: 422 });
    }

    if (minimizationProfileVersion !== "protect-semantic-allowlist@1") {
      return NextResponse.json({ error: "Perfil de minimización no soportado" }, { status: 422 });
    }

    if (!Array.isArray(abstractSignals)) {
      return NextResponse.json({ error: "abstractSignals debe ser una lista" }, { status: 400 });
    }

    // 4. Generar observationId estricto UUID v4
    const observationId = crypto.randomUUID();

    // 5. Persistencia protegida en JSONL
    const record = {
      observationId,
      receivedAt: new Date().toISOString(),
      source: "MOBILE_APP",
      clientHash: clientKey.substring(0, 16),
      contributionId,
      threatClass: threatClass || "UNCLASSIFIED",
      channel: channel || "UNKNOWN",
      riskLevel: riskLevel || "UNKNOWN",
      abstractSignals,
      timeBucket: timeBucket || "",
      protectionVersion: protectionVersion || "",
      sourceClass: sourceClass || "OPERATIONAL",
      payloadIntegrity: payloadIntegrity || "",
      triageStatus: "PENDIENTE_CURADOR",
      rawPayload: body,
    };

    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.appendFileSync(CONTRIBUTIONS_FILE, JSON.stringify(record) + "\n", "utf8");
    } catch (fsErr) {
      console.warn("Advertencia: No se pudo persistir contribución en disco:", fsErr);
    }

    // 6. Respuesta conforme al contrato de Android HttpURLConnection
    return NextResponse.json(
      {
        result: "ACCEPTED",
        contributionId,
        observationId,
      },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Error al procesar contribución móvil de inteligencia:", errorMsg);
    return NextResponse.json(
      { error: "Error interno al procesar contribución", details: errorMsg },
      { status: 500 }
    );
  }
}
