import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white/50 pt-8 pb-12 text-xs text-lumaSubtext">
      <div className="mx-auto max-w-6xl flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-0">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <img
              src="/images/luma_shield.png"
              alt="Escudo Luma Protect"
              className="h-5 w-5 object-contain"
            />
            <p className="font-bold text-lumaText text-sm">
              Luma Protect · Ecosistema de Seguridad Ciudadana
            </p>
          </div>
          <p className="text-slate-500">
            Iniciativa comunitaria de protección familiar e inteligencia civil · República Argentina 🇦🇷
          </p>
          <p className="text-[11px] text-slate-400">
            Iniciativa independiente de estudiantes de la Licenciatura en Ciberseguridad (UNSO) · Contacto:{" "}
            <a
              href="mailto:LumaProtect@proton.me"
              className="text-lumaBlue underline hover:text-blue-800"
            >
              LumaProtect@proton.me
            </a>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
          <Link href="/" className="hover:text-lumaBlue hover:underline">
            Inicio
          </Link>
          <Link href="/verificador" className="hover:text-lumaBlue hover:underline">
            Verificador Web
          </Link>
          <Link href="/pymes" className="hover:text-lumaBlue hover:underline">
            PyMEs & Comercios
          </Link>
          <Link href="/radar" className="hover:text-lumaBlue hover:underline">
            Radar
          </Link>
          <Link href="/educacion" className="hover:text-lumaBlue hover:underline">
            Educación
          </Link>
          <Link href="/terminos" className="font-semibold text-lumaBlue hover:underline">
            Términos y Privacidad
          </Link>
          <a
            href="https://t.me/LumaProtectArgBot"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-600 hover:underline flex items-center gap-1 font-semibold text-sky-700"
          >
            <span>🤖</span> Bot Telegram
          </a>
          <a
            href="https://t.me/LumaProtectArg"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>📢</span> Canal Telegram
          </a>
          <a
            href="https://www.tiktok.com/@lumaprotect"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 hover:underline flex items-center gap-1"
          >
            <span>📱</span> TikTok
          </a>
          <a
            href="https://www.facebook.com/LumaProtect/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>📘</span> Facebook
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl mt-6 border-t border-slate-200/60 pt-4 px-4 sm:px-0 text-[11px] leading-relaxed text-slate-400">
        <p>
          <strong>Aviso de Delimitación Institucional:</strong> Luma Protect es un proyecto de investigación y desarrollo tecnológico autónomo e independiente desarrollado por estudiantes de la Licenciatura en Ciberseguridad de la Universidad Nacional Raúl Scalabrini Ortiz (UNSO) como parte preparatoria de su Trabajo Final Integrador (TFI). La Universidad Nacional Raúl Scalabrini Ortiz (UNSO) no forma parte societaria, no administra, no financia, no patrocina ni ha emitido a la fecha aval o aprobación institucional formal sobre este software, sus herramientas o sus opiniones.
        </p>
      </div>
    </footer>
  );
}
