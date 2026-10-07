"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/verificador", label: "Verificador Web", highlight: true },
  { href: "/pymes", label: "PyMEs & Comercios" },
  { href: "/radar", label: "Radar Comunitario" },
  { href: "/educacion", label: "Educación" },
  { href: "/terminos", label: "Términos & Privacidad" },
];

export default function CitizenNavigation() {
  const pathname = usePathname() || "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white/95 backdrop-blur-md transition shadow-xs">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* LOGO & BRAND */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-lumaBlueSoft p-1.5 transition group-hover:scale-105 shadow-xs">
            <img
              src="/images/luma_shield.png"
              alt="Luma Protect Escudo"
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-lumaText">
              Luma <span className="text-lumaBlue">Protect</span>
            </span>
            <p className="hidden sm:block text-[11px] font-medium text-lumaSubtext">
              Protección Ciudadana Inteligente
            </p>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-3.5 py-2 text-sm font-bold transition ${
                  active
                    ? "bg-lumaBlue text-white shadow-xs"
                    : link.highlight
                    ? "text-lumaBlue hover:bg-lumaBlueSoft"
                    : "text-lumaText hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA BUTTONS & MOBILE TOGGLE */}
        <div className="flex items-center gap-2">
          <a
            href="https://t.me/LumaProtectArgBot"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-[#229ED9] hover:bg-[#1b8ec5] px-3.5 py-2 text-xs font-bold text-white shadow-xs transition"
          >
            <span>🤖</span>
            <span>Consultar Bot Asistente</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-slate-700 hover:bg-slate-100 transition"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 md:hidden space-y-2">
          <div className="grid gap-1">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                    active
                      ? "bg-lumaBlue text-white"
                      : link.highlight
                      ? "bg-blue-50 text-lumaBlue"
                      : "text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 space-y-2">
            <Link
              href="/#descarga"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50/70 px-4 py-3 text-center text-xs font-bold text-lumaBlue hover:bg-blue-100 transition"
            >
              <span>🛡️</span>
              <span>Próximamente en Google Play Store</span>
            </Link>
            <a
              href="https://t.me/LumaProtectArgBot"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#229ED9] hover:bg-[#1b8ec5] px-4 py-2.5 text-center text-xs font-bold text-white shadow-sm transition"
            >
              <span>🤖</span>
              <span>Consultar Bot Asistente</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
