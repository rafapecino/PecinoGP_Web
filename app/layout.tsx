import type { Metadata, Viewport } from "next";
import "./globals.css";
import "lenis/dist/lenis.css";
import { CookieConsentBanner } from "@/All/components/cookie-consent";
import { AnalyticsSuite } from "@/All/components/analytics";
import { SmoothScroll } from "@/All/components/smooth-scroll";
import { RaceProgressBar } from "@/All/components/race-progress-bar";
import { CursorFollower } from "@/All/components/motion/cursor-follower";
import {
  JsonLd,
  organizationSchema,
  webSiteSchema,
} from "@/All/components/json-ld";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  // Base para resolver todas las URLs relativas (canonical, OG, sitemap).
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.defaultTitle,
    // Cada página aporta su título y aquí se le añade la marca.
    template: `%s | ${SITE.name}`,
  },
  description: SITE.defaultDescription,
  applicationName: SITE.name,
  authors: [{ name: "Manuel Pecino", url: SITE.social.youtube }],
  creator: "Manuel Pecino",
  publisher: SITE.legalName,
  category: "Sports",
  keywords: [
    "MotoGP",
    "análisis MotoGP",
    "MotoGP en español",
    "PecinoGP",
    "Manuel Pecino",
    "clasificación MotoGP",
    "calendario MotoGP",
    "mundial de motociclismo",
    "Moto2",
    "Moto3",
  ],
  alternates: {
    canonical: "/",
  },
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
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitterHandle,
    creator: SITE.twitterHandle,
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png",
  },
  other: {
    "google-adsense-account": "ca-pub-4835675344404063",
  },
  // Para verificar la propiedad en Search Console, define
  // NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION con el código que da Google.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Conexión anticipada con los dominios de terceros que usa la web:
            adelanta el DNS/TLS y mejora el LCP. */}
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://flagcdn.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <JsonLd data={organizationSchema} />
        <JsonLd data={webSiteSchema} />
      </head>
      <body
        className="bg-background text-foreground antialiased"
        suppressHydrationWarning
      >
        <RaceProgressBar />
        <CursorFollower />
        <SmoothScroll>{children}</SmoothScroll>
        <CookieConsentBanner />
        <AnalyticsSuite />
      </body>
    </html>
  );
}
