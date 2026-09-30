/**
 * Sanitizador estricto Zero-PII (Cumplimiento Ley 25.326 de Protección de Datos Personales)
 * Erradica teléfonos, correos, números de tarjeta, DNI, CBU/CVU y credenciales antes de
 * persistir o compartir cualquier telemetría comunitaria.
 */
export function sanitizeZeroPii(raw: string): string {
  if (!raw) return "";

  let cleaned = raw;

  // 1. Tarjetas de crédito/débito (16 dígitos o grupos de 4)
  cleaned = cleaned.replace(/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, "[TARJETA-REDACTADA]");

  // 2. CBU / CVU (22 dígitos bancarios/fintech)
  cleaned = cleaned.replace(/\b\d{22}\b/g, "[CBU-REDACTADO]");

  // 3. Emails
  cleaned = cleaned.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[EMAIL-REDACTADO]");

  // 4. Teléfonos móviles / fijos (Argentina: +54, prefijos 11 / 2xx / 3xx / etc., 6 a 10 dígitos con guiones/espacios)
  cleaned = cleaned.replace(/(?:\+?54[\s-]*(?:9[\s-]*)?)?(?:0?(?:11|[2368]\d{1,3}))[\s-]?(?:\d{3,5}[\s-]?\d{4}|\d{6,8})\b/g, "[TELÉFONO-REDACTADO]");

  // 5. DNI (7 u 8 dígitos antecedidos o aislados con etiquetas comunes)
  cleaned = cleaned.replace(/\b(?:dni|documento)?\s*[:#]?\s*(\d{7,8})\b/gi, "[DNI-REDACTADO]");

  return cleaned.trim();
}
