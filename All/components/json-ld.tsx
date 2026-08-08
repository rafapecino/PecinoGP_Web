import { SITE } from "@/lib/seo";

/**
 * Inserta un bloque de datos estructurados (schema.org) en la página.
 * Google los usa para entender qué es el sitio y mostrar resultados
 * enriquecidos (sitelinks, FAQ desplegables, panel de marca).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // El JSON lo generamos nosotros, no viene de entrada de usuario.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Identidad de marca: alimenta el Knowledge Panel de Google. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: {
    "@type": "ImageObject",
    url: `${SITE.url}/logo-pecinogp.png`,
    width: 714,
    height: 166,
  },
  description: SITE.defaultDescription,
  email: SITE.email,
  founder: {
    "@type": "Person",
    name: "Manuel Pecino",
  },
  sameAs: [SITE.social.youtube, SITE.social.instagram, SITE.social.spotify],
  areaServed: "ES",
  knowsAbout: [
    "MotoGP",
    "Moto2",
    "Moto3",
    "Campeonato del Mundo de Motociclismo",
    "Análisis técnico de motociclismo",
  ],
};

/** Declara el sitio y habilita la caja de búsqueda de sitelinks. */
export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  description: SITE.defaultDescription,
  inLanguage: "es-ES",
  publisher: { "@id": `${SITE.url}/#organization` },
};

/** Migas de pan para que Google muestre la jerarquía en los resultados. */
export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}
