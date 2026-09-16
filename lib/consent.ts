/**
 * Consentimiento de cookies a través de la CMP de Google.
 *
 * El aviso de cookies de la web ya no es propio: lo pinta la plataforma de
 * gestión del consentimiento (CMP) certificada de Google, configurada en
 * AdSense → Privacidad y mensajes. Google exige una CMP certificada para servir
 * anuncios en el EEE, Reino Unido y Suiza, y un banner casero no lo es.
 *
 * La CMP publica el consentimiento con la API estándar del marco TCF de IAB
 * (`window.__tcfapi`). AdSense la lee por su cuenta; este módulo la expone al
 * resto de la web para que la analítica dependa de la misma decisión y nadie
 * tenga que aceptar dos veces.
 *
 * Todo aquí es solo de cliente.
 */

/** Datos de consentimiento que entrega la API TCF (solo lo que usamos). */
export type TcfData = {
  gdprApplies?: boolean;
  eventStatus?: "tcloaded" | "cmpuishown" | "useractioncomplete";
  listenerId?: number;
  purpose?: { consents?: Record<string, boolean> };
};

type TcfApi = (
  command: string,
  version: number,
  callback: (data: TcfData, success: boolean) => void,
  parameter?: unknown,
) => void;

type GoogleFc = {
  callbackQueue?: Array<(() => void) | Record<string, () => void>>;
  showRevocationMessage?: () => void;
};

declare global {
  interface Window {
    __tcfapi?: TcfApi;
    googlefc?: GoogleFc;
  }
}

/**
 * Propósitos del TCF que tiene que aceptar el visitante para cargar la
 * analítica:
 *
 * - 1 · Almacenar o acceder a información en el dispositivo (las cookies).
 * - 8 · Medir el rendimiento del contenido (para qué las usa la analítica).
 *
 * Con «Consentir» o «No consentir» van todos a la vez; esto solo discrimina
 * cuando alguien afina a mano en «Gestionar opciones».
 */
const ANALYTICS_PURPOSES = [1, 8] as const;

/** Clave del banner propio anterior, que ya no se usa. */
const LEGACY_CONSENT_KEY = "pecinogp_cookie_consent_v1";

/** Encola una llamada para cuando la CMP de Google haya terminado de cargar. */
function whenGoogleFcReady(
  entry: (() => void) | Record<string, () => void>,
): void {
  window.googlefc = window.googlefc || {};
  window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
  window.googlefc.callbackQueue.push(entry);
}

/**
 * ¿Autoriza este consentimiento a cargar la analítica?
 *
 * Si el RGPD no aplica (`gdprApplies: false`, visitas de fuera del EEE), la
 * CMP no muestra aviso y no hay decisión que leer. Se trata como «no», a
 * propósito: la web es de un prestador español y la LSSI-CE pide
 * consentimiento para las cookies no técnicas venga de donde venga la visita.
 * Es tráfico residual en un canal de MotoGP en español.
 */
export function allowsAnalytics(data: TcfData | null | undefined): boolean {
  if (!data || data.gdprApplies !== true) return false;
  const consents = data.purpose?.consents ?? {};
  return ANALYTICS_PURPOSES.every((purpose) => consents[purpose] === true);
}

/**
 * Se suscribe a las decisiones de consentimiento: avisa al cargar la página si
 * ya había una decisión guardada y cada vez que el visitante la cambia.
 * Devuelve la función para darse de baja.
 */
export function subscribeToConsent(
  onChange: (data: TcfData) => void,
): () => void {
  let listenerId: number | undefined;
  let cancelled = false;

  const handle = (data: TcfData, success: boolean) => {
    if (!success || cancelled) return;
    if (typeof data.listenerId === "number") listenerId = data.listenerId;
    // "cmpuishown" solo indica que se está enseñando el aviso: todavía no hay
    // decisión, así que no se comunica.
    if (
      data.eventStatus === "tcloaded" ||
      data.eventStatus === "useractioncomplete"
    ) {
      onChange(data);
    }
  };

  whenGoogleFcReady({
    CONSENT_API_READY: () => {
      if (cancelled) return;
      window.__tcfapi?.("addEventListener", 2, handle);
    },
  });

  return () => {
    cancelled = true;
    if (listenerId !== undefined) {
      window.__tcfapi?.("removeEventListener", 2, () => {}, listenerId);
    }
  };
}

/** Reabre el panel de Google para que el visitante cambie su decisión. */
export function openConsentPreferences(): void {
  if (typeof window === "undefined") return;
  whenGoogleFcReady(() => window.googlefc?.showRevocationMessage?.());
}

/**
 * Borra la decisión del banner propio anterior. Ya no la lee nadie, y dejarla
 * en el navegador sería guardar un dato que no sirve para nada.
 */
export function clearLegacyConsent(): void {
  try {
    localStorage.removeItem(LEGACY_CONSENT_KEY);
  } catch {
    // Navegadores con el almacenamiento bloqueado: no hay nada que limpiar.
  }
}
