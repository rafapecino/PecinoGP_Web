import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

/**
 * robots.txt generado por Next. Solo bloquea la API interna y apunta al
 * sitemap.
 *
 * Las páginas duplicadas (/privacy-policy, /terms, /proximo-gp) NO se
 * bloquean aquí a propósito: llevan `noindex` en su metadata y Google
 * necesita poder rastrearlas para leer esa etiqueta. Bloquearlas por
 * robots.txt impediría que viera el noindex y podrían seguir indexadas.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
