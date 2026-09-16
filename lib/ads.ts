/**
 * Publicidad (Google AdSense).
 *
 * La web usa **anuncios automáticos**: no hay bloques `<ins>` colocados a mano.
 * Basta con cargar `adsbygoogle.js` y es Google quien decide qué formatos
 * inserta y dónde, incluido el ancla fija de la parte de abajo. Qué formatos se
 * permiten se configura en el panel de AdSense, no aquí.
 *
 * Dos cosas que este archivo sí controla:
 *
 * 1. Qué cuenta de AdSense monetiza la web. Va en una variable de entorno
 *    porque la web y el canal de YouTube pueden acabar en cuentas distintas;
 *    cambiarla no debería obligar a tocar código ni a desplegar a mano.
 * 2. Que haya rutas sin publicidad. Como los anuncios automáticos no se pueden
 *    filtrar por página desde el marcado, la única forma segura de dejar una
 *    ruta limpia es no cargarle el script.
 *
 * El consentimiento no se decide aquí: lo gestiona la CMP de Google, que
 * AdSense lee por su cuenta (ver `lib/consent.ts` y `ConsentAndAds`).
 */

/**
 * ID de editor de AdSense, en formato `ca-pub-…`.
 *
 * La web monetiza con la cuenta propia del sitio, distinta de la que monetiza
 * el canal de YouTube (antes aquí estaba `ca-pub-4835675344404063`).
 *
 * De este valor salen las tres cosas que Google mira para dar por verificada
 * la propiedad: la metaetiqueta, la línea de `/ads.txt` y el `client` del
 * script. Si vuelve a cambiar de cuenta, define `NEXT_PUBLIC_ADSENSE_CLIENT`
 * en Vercel y las tres se actualizan solas, sin desplegar código.
 */
export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() || "ca-pub-1498670240878358";

/**
 * El mismo ID sin el prefijo `ca-`, que es como lo quiere `ads.txt`.
 * `ca-pub-123` → `pub-123`.
 */
export const ADSENSE_PUBLISHER_ID = ADSENSE_CLIENT.replace(/^ca-/, "");

/**
 * Rutas donde no se carga AdSense.
 *
 * - `/membresia` vende la membresía de pago: un anuncio de un tercero al lado
 *   de las tarjetas de 3,99 y 14,99 € compite con lo que de verdad interesa
 *   que hagan ahí.
 * - Las páginas legales tienen que poder leerse sin nada encima, y además son
 *   las que el visitante abre precisamente cuando le preocupa la publicidad.
 */
const AD_FREE_PREFIXES = [
  "/membresia",
  "/aviso-legal",
  "/politica-cookies",
  "/politica-privacidad",
  "/privacy-policy",
  "/terms",
] as const;

/** ¿Se puede mostrar publicidad en esta ruta? */
export function pathAllowsAds(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return !AD_FREE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
