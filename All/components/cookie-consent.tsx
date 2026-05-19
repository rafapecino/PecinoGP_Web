"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie, ChevronRight } from "lucide-react";

const CONSENT_KEY = "pecinogp_cookie_consent_v1";
const CONSENT_UPDATED_EVENT = "pecinogp:cookie-consent-updated";

export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
};

export function getStoredConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookieConsent;
  } catch {
    return null;
  }
}

export function openCookiePreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("pecinogp:open-cookie-preferences"));
}

export function CookieConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [consent, setConsent] = useState<CookieConsent | null>(null);

  // Panel state (defaults: ALL UNCHECKED — LSSI-CE opt-in)
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredConsent();
    if (stored) {
      setConsent(stored);
      setAnalytics(stored.analytics);
      setMarketing(stored.marketing);
    } else {
      setShowBanner(true);
    }

    const handleOpenPrefs = () => {
      const current = getStoredConsent();
      if (current) {
        setAnalytics(current.analytics);
        setMarketing(current.marketing);
      } else {
        setAnalytics(false);
        setMarketing(false);
      }
      setShowPanel(true);
      setShowBanner(false);
    };
    window.addEventListener("pecinogp:open-cookie-preferences", handleOpenPrefs);
    return () => window.removeEventListener("pecinogp:open-cookie-preferences", handleOpenPrefs);
  }, []);

  const persist = (next: CookieConsent) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(next));
    setConsent(next);
    setShowBanner(false);
    setShowPanel(false);
    window.dispatchEvent(new CustomEvent(CONSENT_UPDATED_EVENT, { detail: next }));
  };

  const acceptAll = () =>
    persist({ necessary: true, analytics: true, marketing: true, timestamp: Date.now() });

  const rejectAll = () =>
    persist({ necessary: true, analytics: false, marketing: false, timestamp: Date.now() });

  const saveCustom = () =>
    persist({ necessary: true, analytics, marketing, timestamp: Date.now() });

  if (!mounted) return null;

  const loadAdSense = consent?.marketing === true;

  return (
    <>
      {loadAdSense && (
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4835675344404063"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}

      <AnimatePresence>
        {showBanner && !showPanel && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 inset-x-0 z-[100] p-4 md:p-6"
            role="dialog"
            aria-labelledby="cookie-banner-title"
            aria-describedby="cookie-banner-desc"
          >
            <div className="max-w-5xl mx-auto bg-black/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.6)] p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Cookie className="text-red-500" size={20} />
                    <h2 id="cookie-banner-title" className="text-white font-black italic uppercase tracking-tighter text-lg md:text-xl">
                      Cookies en PecinoGP
                    </h2>
                  </div>
                  <p id="cookie-banner-desc" className="text-white/70 text-sm md:text-base leading-relaxed">
                    Usamos cookies propias y de terceros para fines técnicos, analíticos y publicitarios.
                    Puedes aceptar todas, rechazarlas o configurarlas. Hasta entonces, no se activará ningún
                    rastreo no esencial. Más información en nuestra{" "}
                    <Link href="/politica-cookies" className="text-red-500 hover:text-red-400 underline">
                      Política de Cookies
                    </Link>
                    .
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:flex-col md:w-56">
                  <button
                    type="button"
                    onClick={acceptAll}
                    className="flex-1 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black uppercase italic text-xs tracking-widest transition-colors"
                  >
                    Aceptar todas
                  </button>
                  <button
                    type="button"
                    onClick={rejectAll}
                    className="flex-1 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black uppercase italic text-xs tracking-widest transition-colors"
                  >
                    Rechazar todas
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPanel(true)}
                    className="flex-1 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black uppercase italic text-xs tracking-widest transition-colors"
                  >
                    Configurar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-end md:items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-panel-title"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl p-6 md:p-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-1 bg-red-600 rounded-full" />
                    <span className="text-red-500 font-black uppercase tracking-[0.3em] text-[10px]">Preferencias</span>
                  </div>
                  <h2 id="cookie-panel-title" className="text-white font-black italic uppercase tracking-tighter text-2xl md:text-3xl">
                    Configura tus cookies
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (consent) setShowPanel(false);
                    else { setShowPanel(false); setShowBanner(true); }
                  }}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white"
                  aria-label="Cerrar panel"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-white font-black italic uppercase text-sm tracking-wider">Necesarias</h3>
                      <p className="text-white/60 text-sm mt-1">
                        Imprescindibles para el funcionamiento del sitio. No se pueden desactivar.
                      </p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-widest">
                      Siempre activas
                    </div>
                  </div>
                </div>

                <label className="flex items-start justify-between gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/[0.07]">
                  <div className="flex-1">
                    <h3 className="text-white font-black italic uppercase text-sm tracking-wider">Analíticas</h3>
                    <p className="text-white/60 text-sm mt-1">
                      Nos ayudan a entender cómo se usa la web (páginas más visitadas, errores, etc.).
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="mt-1 h-5 w-5 accent-red-600 cursor-pointer"
                  />
                </label>

                <label className="flex items-start justify-between gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/[0.07]">
                  <div className="flex-1">
                    <h3 className="text-white font-black italic uppercase text-sm tracking-wider">Publicitarias</h3>
                    <p className="text-white/60 text-sm mt-1">
                      Permiten mostrar anuncios de Google AdSense y medir su rendimiento.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="mt-1 h-5 w-5 accent-red-600 cursor-pointer"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
                <button
                  type="button"
                  onClick={acceptAll}
                  className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black uppercase italic text-xs tracking-widest transition-colors"
                >
                  Aceptar todas
                </button>
                <button
                  type="button"
                  onClick={rejectAll}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black uppercase italic text-xs tracking-widest transition-colors"
                >
                  Rechazar todas
                </button>
                <button
                  type="button"
                  onClick={saveCustom}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black uppercase italic text-xs tracking-widest transition-colors"
                >
                  Guardar selección
                </button>
              </div>

              <p className="text-white/40 text-xs mt-6 leading-relaxed">
                Puedes cambiar tu decisión en cualquier momento desde el enlace{" "}
                <span className="text-white/60 font-bold">"Gestionar cookies"</span> en el pie de página o desde la{" "}
                <Link href="/politica-cookies" className="text-red-500 hover:text-red-400 underline">
                  Política de Cookies
                </Link>
                .
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function ManageCookiesLink({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className={className}
    >
      Gestionar cookies
    </button>
  );
}
