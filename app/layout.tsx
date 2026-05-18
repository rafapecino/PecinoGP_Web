import type { Metadata } from "next"
import { CookieConsentProvider } from "@/All/components/cookie-consent"
import "./globals.css"

export const metadata: Metadata = {
  title: "PecinoGP - Análisis de MotoGP",
  description: "Tu comunidad de análisis técnicos, directos y cobertura exclusiva del campeonato mundial de MotoGP.",
  icons: {
    icon: "/favicon.png",
  },
  other: {
    "google-adsense-account": "ca-pub-4835675344404063",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased" suppressHydrationWarning>
        <CookieConsentProvider>
          {children}
        </CookieConsentProvider>
      </body>
    </html>
  )
}
