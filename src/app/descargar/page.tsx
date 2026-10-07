"use client";

import { useState } from "react";
import Link from "next/link";
import PublicFooter from "@/components/public-footer";
import LumaCuidadoraAvatar from "@/components/luma-cuidadora-avatar";

const APK_VERSION = "v0.4.5 · Preview RC6";
const APK_SIZE = "70.0 MB";
const APK_SHA256 = "9B443BC92BADF2065CED13E2D3D20D7223ABE5B643AA41B1C3768BED14230025";
const APK_URL = "/downloads/luma-protect.apk";

export default function DescargarApkPage() {
  const [copiedHash, setCopiedHash] = useState(false);

  const handleCopyHash = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(APK_SHA256);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2500);
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 py-2 sm:py-6 w-full max-w-full overflow-hidden">
      {/* 1. HERO DE DESCARGA */}
      <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-slate-950 via-[#0D254C] to-slate-900 px-4 py-10 text-white shadow-2xl sm:px-12 sm:py-16 w-full max-w-full">
        <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-lumaBlue/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-emerald-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-6xl w-full">
          <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-12">
            <div className="space-y-5 sm:space-y-6 text-center lg:col-span-7 lg:text-left min-w-0">
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 rounded-full border border-blue-400/30 bg-blue-950/70 px-4 py-1.5 text-xs font-bold text-blue-300 backdrop-blur-md">
                <span>🤖 Android 8.0 a 15</span>
                <span>·</span>
                <span>Distribución Oficial</span>
                <span>·</span>
                <span className="text-emerald-400">Verificado Zero-PII</span>
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl break-words">
                Descargar <span className="text-blue-400">Luma Protect</span>
              </h1>

              <p className="text-base sm:text-xl font-bold text-blue-200 break-words">
                Instalá la app de protección activa en tu celular Android sin intermediarios.
              </p>

              <p className="text-xs sm:text-sm leading-relaxed text-slate-300 break-words">
                Binario oficial de investigación aplicada para la comunidad ciudadana y familias. 
                Protegé a tus seres queridos contra <strong>secuestros virtuales, estafas por WhatsApp y enlaces bancarios falsos</strong> con procesamiento 100% On-Device y cero consumo de batería.
              </p>

              {/* Botón Principal de Descarga */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href={APK_URL}
                  download="luma-protect.apk"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 px-7 py-4 text-base font-extrabold text-white shadow-xl shadow-emerald-500/25 transition transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span className="text-xl">📥</span>
                  <span>Descargar APK ({APK_SIZE})</span>
                </a>

                <a
                  href="#instrucciones"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-4 text-sm font-bold text-blue-100 transition"
                >
                  <span>📋</span>
                  <span>¿Cómo instalar?</span>
                </a>
              </div>

              {/* Ficha técnica compacta */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 text-xs text-slate-400">
                <span className="bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60 font-mono">
                  {APK_VERSION}
                </span>
                <span>·</span>
                <span>Peso: {APK_SIZE}</span>
                <span>·</span>
                <span>Android 8.0+</span>
                <span>·</span>
                <span className="text-emerald-400">✓ 100% Gratuito</span>
              </div>
            </div>

            {/* Avatar interactivo */}
            <div className="flex flex-col items-center justify-center lg:col-span-5 min-w-0">
              <div className="relative flex items-center justify-center w-full max-w-[260px] sm:max-w-[320px]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-lumaBlue/20 to-emerald-400/20 blur-2xl" />
                <LumaCuidadoraAvatar
                  alt="Luma Cuidadora - Personaje Guardián Protector"
                  className="relative z-10 w-full h-auto drop-shadow-2xl transition hover:scale-105 duration-300"
                  loopIntervalSeconds={14}
                />
              </div>
              <p className="mt-3 text-center text-xs font-semibold text-blue-300/80">
                ✨ Luma te acompañará durante la instalación
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VERIFICACIÓN CRIPTOGRÁFICA Y SEGURIDAD */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
              Seguridad de la Descarga · Transparencia Pericial
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-lumaText">
              Integridad Criptográfica del Paquete APK
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-800">
            <span>🛡️</span>
            <span>Sin Malware ni Adware</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Checksum SHA-256 */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Checksum Oficial (SHA-256)
              </span>
              <button
                onClick={handleCopyHash}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-300 px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-100 transition shadow-xs"
              >
                {copiedHash ? (
                  <>
                    <span className="text-emerald-600">✓</span>
                    <span className="text-emerald-700">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <span>📋</span>
                    <span>Copiar SHA-256</span>
                  </>
                )}
              </button>
            </div>
            <p className="font-mono text-[11px] sm:text-xs text-slate-800 break-all bg-white p-3 rounded-xl border border-slate-200/80 select-all">
              {APK_SHA256}
            </p>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Podés corroborar este hash en tu computadora con el comando <code className="bg-slate-200 px-1 py-0.5 rounded text-[10px]">certutil -hashfile luma-protect.apk SHA256</code> o subiéndolo a VirusTotal antes de instalarlo.
            </p>
          </div>

          {/* Garantías de Privacidad */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5 space-y-3">
            <span className="text-xs font-bold text-lumaBlue uppercase tracking-wider">
              Doctrina Zero-PII & Ley 25.326
            </span>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Sin recolección de datos personales:</strong> No almacena ni transmite chats, fotos, contraseñas ni números telefónicos.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Procesamiento On-Device:</strong> Toda la heurística determinista se ejecuta en el procesador de tu propio teléfono.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>No requiere tarjeta de crédito ni suscripción:</strong> Es 100% libre y gratuito para toda la comunidad.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. GUÍA PASO A PASO PARA INSTALAR APK EN ANDROID */}
      <section id="instrucciones" className="space-y-8 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
            Guía Fácil para Familias
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-lumaText">
            Cómo instalar el APK en 3 pasos sencillos
          </h2>
          <p className="text-xs sm:text-sm text-lumaSubtext">
            Al no estar aún en Google Play Store, Android te mostrará avisos preventivos habituales. Seguí estos pasos seguros:
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Paso 1 */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 text-xl font-black">
                1
              </div>
              <h3 className="text-lg font-bold text-lumaText">Descargá el archivo</h3>
              <p className="text-xs leading-relaxed text-lumaSubtext">
                Tocá el botón verde de descarga. Si el navegador (Chrome, Samsung Internet o Firefox) te muestra la advertencia <em>&quot;El archivo puede ser dañino&quot;</em>, seleccioná <strong>&quot;Descargar de todos modos&quot;</strong>. Es el aviso estándar de Android para cualquier archivo descargado fuera de la tienda.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-[11px] font-medium text-slate-600 border border-slate-200">
              💡 El archivo pesa 70 MB y finaliza en <span className="font-mono font-bold">.apk</span>.
            </div>
          </div>

          {/* Paso 2 */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 text-xl font-black">
                2
              </div>
              <h3 className="text-lg font-bold text-lumaText">Habilitá la instalación</h3>
              <p className="text-xs leading-relaxed text-lumaSubtext">
                Abrí la notificación de descarga o buscala en la carpeta <strong>Descargas</strong> de tu celular. Si Android te solicita permiso para <em>&quot;Instalar apps desconocidas&quot;</em>, tocá en <strong>Ajustes</strong> y activá la casilla <strong>&quot;Permitir desde esta fuente&quot;</strong>.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-[11px] font-medium text-slate-600 border border-slate-200">
              🔒 Podés revocar este permiso inmediatamente tras la instalación.
            </div>
          </div>

          {/* Paso 3 */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 text-xl font-black">
                3
              </div>
              <h3 className="text-lg font-bold text-lumaText">Activá la Protección</h3>
              <p className="text-xs leading-relaxed text-lumaSubtext">
                Tocá en <strong>&quot;Instalar&quot;</strong> y luego en <strong>&quot;Abrir&quot;</strong>. La app te guiará para activar el <strong>Escudo DNS On-Device</strong> y la <strong>Fricción Positiva en Portapapeles</strong>. Podés ingresar el contacto de confianza familiar para protegerte.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-[11px] font-medium text-slate-600 border border-slate-200">
              ✨ ¡Listo! Tu teléfono ya está resguardado ante fraudes.
            </div>
          </div>
        </div>
      </section>

      {/* 4. ALTERNATIVAS SIN INSTALACIÓN ($0 BARRERAS) */}
      <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-10 text-white space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-300 border border-blue-400/30">
            ¿Preferís no instalar nada?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            Protección disponible al instante sin descargar apps
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Si tenés un iPhone (iOS), una computadora o preferís verificar mensajes sospechosos puntuales, tenés dos alternativas inmediatas:
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-2xl">🤖</span>
              <h3 className="text-base font-bold text-white">Bot Asistente en Telegram</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Reenviá cualquier mensaje, audio o captura sospechosa al bot oficial en Telegram (@LumaProtectArgBot) y recibí un diagnóstico inmediato de ingeniería social en lenguaje claro.
              </p>
            </div>
            <a
              href="https://t.me/LumaProtectArgBot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#229ED9] hover:bg-[#1b8ec5] px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-[#229ED9]/20 transition"
            >
              <span>🤖</span>
              <span>Consultar Bot Asistente (@LumaProtectArgBot) →</span>
            </a>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-2xl">🔍</span>
              <h3 className="text-base font-bold text-white">Verificador Web en el Navegador</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pegá el texto de un SMS o enlace dudoso en nuestro verificador web. Funciona 100% en tu navegador con costo cero de backend.
              </p>
            </div>
            <Link
              href="/verificador"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-lumaBlue hover:bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition"
            >
              <span>Ir al Verificador Web →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER PÚBLICO */}
      <PublicFooter />
    </div>
  );
}
