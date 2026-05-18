import type { Metadata } from "next"
import Script from "next/script"
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
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4835675344404063"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-background text-foreground antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
