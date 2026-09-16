import { ADSENSE_PUBLISHER_ID } from "@/lib/ads";

/**
 * `/ads.txt` — declara qué cuentas están autorizadas a vender el inventario de
 * este dominio. Sin este archivo, AdSense marca la web como "ingresos en
 * riesgo" y muchos compradores no pujan, así que deja dinero encima de la mesa.
 *
 * Va como ruta y no como archivo estático en `public/` para que salga siempre
 * del mismo sitio que el script y la metaetiqueta: si se cambia la cuenta desde
 * `NEXT_PUBLIC_ADSENSE_CLIENT`, este archivo la sigue sin que nadie se acuerde
 * de editarlo. Un `ads.txt` que apunta a la cuenta antigua es peor que no
 * tenerlo.
 *
 * `f08c47fec0942fa0` es el identificador TAG de Google, igual para todos los
 * editores de AdSense.
 */
export const dynamic = "force-static";

export function GET() {
  const body = `google.com, ${ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
