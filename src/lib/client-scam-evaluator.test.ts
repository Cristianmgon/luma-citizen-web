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

  it("classifies legitimate project team discussions about privacy laws and app security as BAJO", () => {
    const teamDiscussion = "La idea está buenísima, tiene mucho paño para extenderse . Quizás lo más difícil sea adecuarse a las leyes onda la de protección de datos personales, el tema de la privacidad, la seguridad de la aplicación. Pero la idea está muy buena";
    const res = evaluateClientScam(teamDiscussion);
    expect(res.riskLevel).toBe("BAJO");
    expect(res.riskScore).toBeLessThan(30);
  });

  it("detects money mule / fake transfer triangulation fraud as CRITICO/ALTO (LKP-0006)", () => {
    const message = "Hola mi nombre es Cosme Fulanito, te transferi por error a mercado pago, te envie cien mil pesos de mi cuenta, por favor necesito que transfieras el importe a esta otra cuenta de mercado pago el alias es; cuentamercadopago.mp necesito la plata para cubrir un cheque antes de las 15 Hs a lo van a rechazar.";
    const res = evaluateClientScam(message);
    expect(res.riskScore).toBeGreaterThanOrEqual(80);
    expect(["ALTO", "CRÍTICO"]).toContain(res.riskLevel);
    expect(res.threatCategory).toContain("Fraude del Falso Comprador");
    expect(res.techniques).toContain("Triangulación de fondos / Reenvío engañoso a terceros");
  });

  it("classifies SMTP bounce / mail server error 550 5.1.1 as technical log out of scope", () => {
    const bounceMessage = "550 5.1.1 The email account that you tried to reach does not exist. Please try double-checking the recipient's email address for typos or unnecessary spaces.";
    const res = evaluateClientScam(bounceMessage);
    expect(res.isTechnicalLog).toBe(true);
    expect(res.riskScore).toBe(0);
    expect(res.riskLevel).toBe("BAJO");
    expect(res.threatCategory).toContain("Registro Técnico / Error de Servidor");
    expect(res.explanation).toContain("Luma Protect evalúa exclusivamente tácticas de ingeniería social");
  });

  it("detects multi-label combined attacks (LKP-0004 + LKP-0006) and extracts manipulation vectors (ADR-013)", () => {
    const combinedMsg = "Hola má, se me rompió el celular y este es mi nuevo número provisorio. Te transferí plata de más por error a tu cuenta de mercado pago, necesito urgente que transfieras el importe al alias de mi amigo antes de las 15 hs.";
    const res = evaluateClientScam(combinedMsg);
    expect(res.isCombinedAttack).toBe(true);
    expect(res.matchedLkps?.length).toBeGreaterThanOrEqual(2);
    expect(res.threatCategory).toContain("Ataque Combinado");
    expect(res.manipulationVector?.urgencyScarcity).toBeGreaterThanOrEqual(60);
    expect(res.manipulationVector?.assetTransferIntent).toBeGreaterThanOrEqual(60);
    expect(res.engineMode).toBe("MOTOR_HEURISTICO_ONTOLOGICO_ON_DEVICE");
  });

  it("evaluates psychological manipulation principles on virtual kidnapping (LKP-0001)", () => {
    const kidnapMsg = "Tenemos a tu hija secuestrada, la tenemos lastimada acá en una bolsa. No cortes por nada del mundo o la matamos, juntá la plata ya.";
    const res = evaluateClientScam(kidnapMsg);
    expect(res.manipulationVector?.emotionalCoercion).toBeGreaterThanOrEqual(80);
    expect(res.manipulationVector?.isolationTactics).toBeGreaterThanOrEqual(80);
    expect(res.manipulationVector?.primaryPrinciple).toContain("Coerción Emocional & Miedo Extremo");
  });

  it("classifies legitimate bank transactional SMS with OTP and defensive advice as BAJO", () => {
    const bankSms = "Banco Galicia: Tu codigo de seguridad para operar es 941029. Valido por 5 minutos. No lo compartas con nadie, el banco nunca te pedira este codigo.";
    const res = evaluateClientScam(bankSms);
    expect(res.riskLevel).toBe("BAJO");
    expect(res.riskScore).toBeLessThanOrEqual(20);
    expect(res.threatCategory).toContain("Aviso Transaccional Legítimo");
  });

  it("classifies innocent family update without financial request as BAJO", () => {
    const familyUpdate = "Hola mama, cambie el numero del celu porque perdi el chip. Despues te llamo.";
    const res = evaluateClientScam(familyUpdate);
    expect(res.riskLevel).toBe("BAJO");
    expect(res.riskScore).toBeLessThan(40);
  });
});

