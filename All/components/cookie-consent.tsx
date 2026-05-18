"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import Script from "next/script"
import Link from "next/link"

type Consent = {
  functional: boolean
  analytics: boolean
  advertising: boolean
}

type CookieCtxType = {
  consent: Consent | null
  hasDecided: boolean
  saveConsent: (c: Consent) => void
  resetConsent: () => void
}

const defaultConsent: Consent = {
  functional: true,
  analytics: false,
  advertising: false,
}

const CookieCtx = createContext<CookieCtxType>({
  consent: null,
  hasDecided: false,
  saveConsent: () => {},
  resetConsent: () => {},
})

export const useCookieConsent = () => useContext(CookieCtx)

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<Consent | null>(null)
  const [hasDecided, setHasDecided] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem("pecino_cookie_consent")
      if (stored) {
        const parsed = JSON.parse(stored)
        setConsent(parsed.consent)
        setHasDecided(true)
      }
    } catch {
      // storage corrupted, show banner
    }
  }, [])

  const saveConsent = useCallback((c: Consent) => {
    localStorage.setItem(
      "pecino_cookie_consent",
      JSON.stringify({ consent: c, timestamp: new Date().toISOString() })
    )
    setConsent(c)
    setHasDecided(true)
  }, [])

  const resetConsent = useCallback(() => {
    localStorage.removeItem("pecino_cookie_consent")
    setConsent(null)
    setHasDecided(false)
  }, [])

  return (
    <CookieCtx.Provider value={{ consent, hasDecided, saveConsent, resetConsent }}>
      {children}
      {mounted && !hasDecided && <CookieBanner onSave={saveConsent} />}
      {mounted && consent?.advertising && (
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4835675344404063"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}
    </CookieCtx.Provider>
  )
}

function CookieBanner({ onSave }: { onSave: (c: Consent) => void }) {
  const [showConfig, setShowConfig] = useState(false)
  const [local, setLocal] = useState<Consent>({ ...defaultConsent })

  const acceptAll = () => onSave({ functional: true, analytics: true, advertising: true })
  const rejectAll = () => onSave({ ...defaultConsent })

  const btnClass =
    "flex-1 min-w-[130px] px-4 py-2.5 text-sm font-medium rounded-md border border-border bg-background hover:bg-secondary transition-colors text-foreground"

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg">
      <div className="max-w-5xl mx-auto p-4 sm:p-5">
        {!showConfig ? (
          <>
            <p className="text-sm font-semibold mb-1">Este sitio utiliza cookies</p>
            <p className="text-xs text-muted-foreground mb-4">
              Usamos cookies propias y de terceros (Google AdSense) para mejorar tu experiencia.
              Puedes aceptarlas, rechazarlas o configurar tu elección.{" "}
              <Link href="/politica-cookies" className="underline hover:text-foreground transition-colors">
                Política de cookies
              </Link>
              .
            </p>
            <div className="flex gap-2 flex-wrap">
              <button onClick={rejectAll} className={btnClass}>
                Rechazar todas
              </button>
              <button onClick={() => setShowConfig(true)} className={btnClass}>
                Configurar
              </button>
              <button onClick={acceptAll} className={btnClass}>
                Aceptar todas
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold mb-3">Configurar preferencias de cookies</p>
            <div className="space-y-3 mb-4">
              <CookieRow
                title="Cookies funcionales"
                desc="Necesarias para el funcionamiento básico. No se pueden desactivar."
                checked={true}
                disabled
              />
              <CookieRow
                title="Analítica"
                desc="Nos ayudan a entender cómo usas el sitio (Google Analytics)."
                checked={local.analytics}
                onChange={(v) => setLocal((p) => ({ ...p, analytics: v }))}
              />
              <CookieRow
                title="Publicidad"
                desc="Permiten mostrarte anuncios personalizados (Google AdSense)."
                checked={local.advertising}
                onChange={(v) => setLocal((p) => ({ ...p, advertising: v }))}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={rejectAll} className={btnClass}>
                Rechazar todas
              </button>
              <button onClick={() => setShowConfig(false)} className={btnClass}>
                Volver
              </button>
              <button onClick={() => onSave(local)} className={btnClass}>
                Guardar preferencias
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function CookieRow({
  title,
  desc,
  checked,
  disabled = false,
  onChange,
}: {
  title: string
  desc: string
  checked: boolean
  disabled?: boolean
  onChange?: (v: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-1">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      {disabled ? (
        <span className="text-xs text-muted-foreground whitespace-nowrap pt-0.5 italic">
          Siempre activas
        </span>
      ) : (
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-primary flex-shrink-0 cursor-pointer"
        />
      )}
    </div>
  )
}
