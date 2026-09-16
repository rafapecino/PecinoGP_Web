"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { ADSENSE_CLIENT, ADSENSE_PUBLISHER_ID, pathAllowsAds } from "@/lib/ads";
import { clearLegacyConsent, openConsentPreferences } from "@/lib/consent";

/**
 * Aviso de cookies y publicidad.
 *
 * La web ya no tiene banner propio: el aviso lo muestra la CMP certificada de
 * Google (AdSense → Privacidad y mensajes), con las opciones Consentir, No
 * consentir y Gestionar opciones. Aquí solo se cargan los dos scripts de Google
 * que hacen falta, y cada uno por un motivo distinto:
 *
 * 1. **La CMP** (`fundingchoicesmessages`) va en todas las páginas, también en
 *    las que no llevan anuncios. Es la que pinta el aviso y la que guarda la
 *    decisión; sin ella, quien entra directo a /membresia no vería aviso ni
 *    podría cambiar de opinión desde la política de cookies.
 * 2. **AdSense** (`adsbygoogle.js`) solo va en las rutas que admiten anuncios.
 *    Ya no espera al consentimiento: con una CMP certificada es AdSense quien
 *    lee la decisión y actúa en consecuencia. Sin consentimiento sirve solo
 *    anuncios limitados, sin cookies publicitarias ni personalización.
 *
 * La analítica escucha la misma decisión desde `AnalyticsSuite`.
 */
export function ConsentAndAds() {
  const pathname = usePathname();

  useEffect(() => {
    clearLegacyConsent();
  }, []);

  return (
    <>
      <Script
        id="google-cmp"
        src={`https://fundingchoicesmessages.google.com/i/${ADSENSE_PUBLISHER_ID}?ers=1`}
        strategy="afterInteractive"
      />
      {/* Señal estándar de Google: marca que la CMP está presente para que
          AdSense no intente cargar su propia copia. */}
      <Script id="google-cmp-present" strategy="afterInteractive">
        {`(function () {
  function signalGooglefcPresent() {
    if (window.frames["googlefcPresent"]) return;
    if (!document.body) return setTimeout(signalGooglefcPresent, 0);
    var iframe = document.createElement("iframe");
    iframe.style.cssText = "width:0;height:0;border:none;z-index:-1000;left:-1000px;top:-1000px;display:none";
    iframe.name = "googlefcPresent";
    document.body.appendChild(iframe);
  }
  signalGooglefcPresent();
})();`}
      </Script>

      {pathAllowsAds(pathname) && (
        <Script
          id="adsense-script"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}

/** Reabre el panel de consentimiento de Google. */
export const openCookiePreferences = openConsentPreferences;

export function ManageCookiesLink({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openCookiePreferences} className={className}>
      Gestionar cookies
    </button>
  );
}
