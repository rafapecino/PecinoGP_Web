/**
 * Capa fina sobre Google Analytics 4 (gtag).
 *
 * El script de GA solo se inyecta desde <AnalyticsSuite /> cuando el usuario
 * ha aceptado la categoría "analíticas" en el banner de cookies, así que
 * cualquier llamada a trackEvent() antes de ese momento es un no-op silencioso.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** true si hay ID configurado; sin él no se carga nada. */
export const analyticsEnabled = Boolean(GA_MEASUREMENT_ID);

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Nombres de evento que usamos en la web. Añade aquí los nuevos. */
export type AnalyticsEvent =
  "membership_cta_click" | "poll_vote" | "question_submit" | "youtube_click";

type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Envía un evento a GA4. Seguro de llamar en cualquier sitio: si no hay
 * consentimiento, no hay ID o estamos en servidor, no hace nada.
 */
export function trackEvent(name: AnalyticsEvent, params: EventParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function")
    return;
  window.gtag("event", name, params);
}

/**
 * Page view manual. Desactivamos el envío automático de GA
 * (`send_page_view: false`) porque con el App Router la navegación es
 * client-side y el page_view por defecto solo se dispararía en la carga inicial.
 */
export function trackPageView(url: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function")
    return;
  if (!GA_MEASUREMENT_ID) return;
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
    send_page_view: false,
  });
  window.gtag("event", "page_view", {
    page_path: url,
    page_location: window.location.href,
  });
}
