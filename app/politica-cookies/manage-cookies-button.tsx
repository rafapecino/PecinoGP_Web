"use client"

import { useCookieConsent } from "@/All/components/cookie-consent"

export function ManageCookiesButton() {
  const { resetConsent } = useCookieConsent()

  return (
    <button
      onClick={resetConsent}
      className="px-4 py-2.5 text-sm font-medium rounded-md border border-border bg-background hover:bg-secondary transition-colors text-foreground"
    >
      Gestionar preferencias de cookies
    </button>
  )
}
