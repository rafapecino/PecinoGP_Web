"use client";

import { Suspense, useEffect, useState } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GA_MEASUREMENT_ID, trackPageView } from "@/lib/analytics";
import { allowsAnalytics, subscribeToConsent } from "@/lib/consent";

/**
 * true cuando el visitante ha dado consentimiento para la analítica en el
 * aviso de Google. Reacciona sin recargar tanto a la primera decisión como a
 * los cambios posteriores desde «Gestionar cookies».
 */
function useAnalyticsConsent() {
  const [granted, setGranted] = useState(false);

  useEffect(
    () =>
      subscribeToConsent((data) => {
        const allowed = allowsAnalytics(data);
        setGranted(allowed);

        // Desmontar <AnalyticsSuite /> no descarga un gtag que ya estaba en
        // la página: si alguien retira el consentimiento, hay que decirle a GA
        // explícitamente que deje de guardar cookies.
        if (!allowed && typeof window.gtag === "function") {
          window.gtag("consent", "update", { analytics_storage: "denied" });
        }
      }),
    [],
  );

  return granted;
}

/**
 * Page views manuales en cada navegación del App Router.
 * Va en su propio componente porque useSearchParams() obliga a un <Suspense>.
 */
function GaPageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    trackPageView(query ? `${pathname}?${query}` : pathname);
  }, [pathname, searchParams]);

  return null;
}

/**
 * Analítica del sitio, toda condicionada al consentimiento:
 *
 * - Google Analytics 4 — métricas de audiencia, fuentes de tráfico y eventos.
 * - Vercel Analytics + Speed Insights — tráfico y Core Web Vitals reales.
 *
 * Se cargan solo cuando el visitante consiente en el aviso de Google (ver
 * `lib/consent.ts`). Si algún día quieres medir a todo el mundo con Vercel (es
 * cookieless y no usa datos personales), saca <VercelAnalytics /> y
 * <SpeedInsights /> fuera del `if (!granted)`.
 */
export function AnalyticsSuite() {
  const granted = useAnalyticsConsent();

  if (!granted) return null;

  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />

      {GA_MEASUREMENT_ID && (
        <>
          <Script
            id="ga-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              // Consent Mode v2: el usuario ya ha aceptado analítica al llegar
              // aquí; publicidad la sigue gestionando el script de AdSense.
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'granted',
              });
              gtag('config', '${GA_MEASUREMENT_ID}', {
                send_page_view: false,
                anonymize_ip: true,
              });
            `}
          </Script>
          <Suspense fallback={null}>
            <GaPageViews />
          </Suspense>
        </>
      )}
    </>
  );
}
