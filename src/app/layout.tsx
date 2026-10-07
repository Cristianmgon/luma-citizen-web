import "./globals.css";
import type { Metadata, Viewport } from "next";
import CitizenNavigation from "@/components/citizen-navigation";

export const viewport: Viewport = {
  themeColor: "#1565D8",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://lumaprotect.com.ar"),
  title: {
    default: "Luma Protect · Seguridad Ciudadana e Inteligencia Familiar",
    template: "%s | Luma Protect",
  },
  description:
    "Iniciativa independiente de investigación aplicada impulsada por estudiantes de la Licenciatura en Ciberseguridad de la UNSO. Protección familiar activa contra secuestros virtuales, hackeo de WhatsApp y fraudes bancarios sin enviar datos privados a servidores.",
  keywords: [
    "ciberseguridad ciudadana",
    "estafas virtuales",
    "seguridad whatsapp",
    "fraude bancario",
    "secuestro virtual",
    "verificador de estafas",
    "UNSO",
    "ciberseguridad argentina",
    "privacidad zero-pii",
  ],
  authors: [{ name: "Equipo de Investigación Aplicada Luma · UNSO" }],
  creator: "Luma Protect Research Team",
  publisher: "Luma Protect",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/icon.png?v=2", type: "image/png", sizes: "512x512" },
      { url: "/icon-192.png?v=2", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-icon.png?v=2", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://lumaprotect.com.ar",
    title: "Luma Protect · Seguridad Ciudadana e Inteligencia Familiar",
    description:
      "Protección activa contra secuestros virtuales, estafas bancarias y hackeo de WhatsApp. Verificador web local e investigación ciudadana UNSO.",
    siteName: "Luma Protect",
    images: [
      {
        url: "/images/luma_home.png",
        width: 1200,
        height: 630,
        alt: "Luma Protect · Plataforma de Ciberseguridad Ciudadana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luma Protect · Seguridad Ciudadana e Inteligencia Familiar",
    description:
      "Protección activa y gratuita frente a fraudes digitales. Procesamiento 100% local en tu dispositivo.",
    images: ["/images/luma_home.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-[#F7F9FC] text-[#102A43] antialiased selection:bg-blue-100 selection:text-lumaBlue w-full max-w-full overflow-x-hidden">
        <CitizenNavigation />
        <main className="flex-1 mx-auto w-full max-w-6xl px-3 py-6 sm:px-6 sm:py-10 min-w-0 overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
