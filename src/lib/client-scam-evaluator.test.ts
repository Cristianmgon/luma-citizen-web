import { describe, it, expect } from "vitest";
import { evaluateClientScam, normalizeText } from "./client-scam-evaluator";

describe("ClientScamEvaluator On-Browser", () => {
  it("normalizes text and strips leetspeak", () => {
    const raw = "¡¡URGENTE!! B@nco G@lici@: confirme su t0k3n ya.";
    const norm = normalizeText(raw);
    expect(norm).toContain("urgente");
    expect(norm).toContain("banco galicia");
    expect(norm).toContain("token");
  });

  it("detects bank phishing with OTP request as CRITICO/ALTO", () => {
    const message = "Aviso de Banco Galicia: transferencia sospechosa detectada. Ingrese a https://seguridad-galicia.com y confirme su token de seguridad de 6 digitos urgente.";
    const res = evaluateClientScam(message);
    expect(res.riskScore).toBeGreaterThanOrEqual(60);
    expect(["ALTO", "CRÍTICO"]).toContain(res.riskLevel);
    expect(res.techniques).toContain("Suplantación de identidad (Phishing)");
  });

  it("detects virtual kidnapping and extortion with high risk", () => {
    const message = "Tenemos a tu hija secuestrada, transferi la plata ya a este CBU o no la ves mas. No cortes.";
    const res = evaluateClientScam(message);
    expect(res.riskScore).toBeGreaterThanOrEqual(60);
    expect(res.threatCategory).toContain("Secuestro Virtual");
  });

  it("classifies benign everyday messages as BAJO with neutral warning", () => {
    const benign = "¿Hola, nos vemos hoy a las cinco para tomar mate?";
    const res = evaluateClientScam(benign);
    expect(res.riskLevel).toBe("BAJO");
    expect(res.riskScore).toBeLessThan(30);
    expect(res.threatCategory).toContain("Sin patrones sospechosos conocidos");
    expect(res.explanation).toContain("Advertencia Preventiva");
  });

  it("recognizes server error logs and stack traces as technical out-of-scope", () => {
    const trace = `Traceback (most recent call last):
  File "app/server.py", line 42, in handle_request
    raise ConnectionRefusedError("ECONNREFUSED 127.0.0.1:5432")
Internal Server Error 500`;
    const res = evaluateClientScam(trace);
    expect(res.isTechnicalLog).toBe(true);
    expect(res.riskScore).toBe(0);
    expect(res.riskLevel).toBe("BAJO");
    expect(res.threatCategory).toContain("Registro Técnico / Error de Servidor");
    expect(res.explanation).toContain("Luma Protect evalúa exclusivamente tácticas de ingeniería social");
  });

  it("recognizes java and node stack traces as technical logs", () => {
    const javaErr = "java.lang.NullPointerException: Cannot invoke method on null object\n at com.example.service.AuthService.validate(AuthService.java:124)";
    const res = evaluateClientScam(javaErr);
    expect(res.isTechnicalLog).toBe(true);
    expect(res.threatCategory).toContain("Registro Técnico");
  });

  it("detects post-purchase fake prize phone call requesting credentials (Jorge Martínez case)", () => {
    const callText = "Hola Jorge, te llamamos porque fuiste elegido cliente de la semana en Temu y tenemos que hacerte un deposito de 500000 pesos. Por favor pasame tu usuario y clave del banco para acreditarlo.";
    const res = evaluateClientScam(callText);
    expect(res.riskScore).toBeGreaterThanOrEqual(80);
    expect(["ALTO", "CRÍTICO"]).toContain(res.riskLevel);
    expect(res.techniques).toContain("Falso premio con ingeniería social (Pretexting)");
  });

  it("detects fake investment platform with artificial earnings and foreign trade excuse (Jorge Martínez case)", () => {
    const investText = "Ingresá a la plataforma de inversiones donde va girando el dinero con rendimientos garantizados. Para retirar tus ganancias acumuladas de 1200 dolares debes pedir un permiso a Comercio Exterior.";
    const res = evaluateClientScam(investText);
    expect(res.riskScore).toBeGreaterThanOrEqual(70);
    expect(["ALTO", "CRÍTICO"]).toContain(res.riskLevel);
    expect(res.techniques).toContain("Fraude de inversión / Ponzi digital");
  });
});
