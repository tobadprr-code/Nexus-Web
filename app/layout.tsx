import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://nexusdev.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NEXUS Dev — Sistemas Inteligentes para Negocios que Crecen",
    template: "%s | NEXUS Dev",
  },
  description:
    "Desarrollamos sistemas de gestión personalizados y automatizaciones inteligentes con WhatsApp e IA para PyMEs y negocios locales en Argentina: gimnasios, remiserías, kioscos, lavaderos y más.",
  keywords: [
    "desarrollo de software Argentina",
    "sistemas de gestión personalizados",
    "automatización WhatsApp",
    "IA para negocios",
    "software para gimnasios",
    "software para PyMEs",
    "NEXUS Dev",
    "Tobias Britez",
  ],
  authors: [{ name: "Tobias Britez" }],
  creator: "NEXUS Dev",
  manifest: "/manifest.json",
  alternates: {
    canonical: siteUrl,
    languages: {
      "es-AR": siteUrl,
      en: siteUrl,
      "pt-BR": siteUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "NEXUS Dev",
    title: "NEXUS Dev — Sistemas Inteligentes para Negocios que Crecen",
    description:
      "Sistemas de gestión a medida y automatizaciones con WhatsApp e IA para PyMEs argentinas.",
    images: [{ url: "/logo-full.png", width: 1512, height: 907, alt: "NEXUS Dev" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXUS Dev — Sistemas Inteligentes para Negocios que Crecen",
    description:
      "Sistemas de gestión a medida y automatizaciones con WhatsApp e IA para PyMEs argentinas.",
    images: ["/logo-full.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#07080a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "NEXUS Dev",
  description:
    "Desarrollo de sistemas de gestión personalizados y automatizaciones inteligentes con WhatsApp e IA para PyMEs y negocios locales en Argentina.",
  url: siteUrl,
  image: `${siteUrl}/logo-full.png`,
  founder: {
    "@type": "Person",
    name: "Tobias Britez",
  },
  areaServed: "AR",
  telephone: "+5493757644169",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body bg-void text-ink antialiased selection:bg-nexus-green selection:text-void">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          <CustomCursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
