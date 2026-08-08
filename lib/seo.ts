import type { Metadata } from "next";

/**
 * Configuración central de SEO.
 *
 * Todo el metadata del sitio (títulos, descripciones, canonical, OpenGraph,
 * sitemap y datos estructurados) sale de aquí para que no se dupliquen ni se
 * desincronicen entre páginas.
 */

export const SITE = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://pecinogp.es").replace(
    /\/$/,
    "",
  ),
  name: "PecinoGP",
  legalName: "MPC Network SL",
  locale: "es_ES",
  /** Título por defecto de la home (el resto usa la plantilla "%s | PecinoGP"). */
  defaultTitle: "PecinoGP | Análisis y actualidad de MotoGP en español",
  defaultDescription:
    "Análisis técnico de MotoGP, directos post-carrera, clasificación del mundial y calendario de Grandes Premios. La comunidad de MotoGP en español de Manuel Pecino.",
  twitterHandle: "@pecinogp",
  social: {
    youtube: "https://www.youtube.com/@pecinogp",
    instagram: "https://www.instagram.com/pecinogp/",
    spotify: "https://open.spotify.com/show/4asUu5yNVnBAyAnmfq1xDz",
  },
  /** Enlace de alta a la membresía nativa de YouTube. */
  membershipUrl: "https://www.youtube.com/@pecinogp/join",
  email: "contacto@pecinogp.es",
} as const;

/**
 * Interruptor del lanzamiento de la membresía.
 *
 * En `false`, /membresia se muestra en modo «muy pronto»: enseña los niveles
 * pero no enlaza al alta, y no publica precios como oferta activa en los datos
 * estructurados (afirmar que algo está a la venta cuando no lo está es motivo
 * de penalización en Google).
 *
 * EL DÍA DEL LANZAMIENTO: poner `true`. Con eso se activan los botones de
 * «Unirse», el schema de precios y los textos definitivos. No hay que tocar
 * nada más.
 */
export const MEMBERSHIP_LIVE = false;

type BuildMetadataInput = {
  /** Título sin el sufijo de marca; la plantilla del layout añade "| PecinoGP". */
  title: string;
  description: string;
  /** Ruta relativa, empezando por "/". */
  path: string;
  keywords?: string[];
  /**
   * Ruta de la imagen social propia de la página, si tiene su propio
   * `opengraph-image.tsx` (ej. "/membresia/opengraph-image").
   */
  image?: string;
  /** Excluir de la indexación (páginas duplicadas o sin valor de búsqueda). */
  noindex?: boolean;
};

/** Imagen social por defecto, generada por app/opengraph-image.tsx. */
const DEFAULT_OG_IMAGE = "/opengraph-image";

/**
 * Construye el objeto Metadata de una página con canonical, OpenGraph y
 * Twitter Card coherentes. Evita repetir el mismo bloque en 15 ficheros.
 *
 * Nota sobre la imagen social: los ficheros `opengraph-image.tsx` solo
 * aplican a su propio segmento, no a las rutas hijas, así que por defecto
 * se apunta a la imagen raíz. Si una ruta genera la suya, hay que indicarla
 * con `image` (definirla aquí gana sobre la convención de ficheros).
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE,
  noindex = false,
}: BuildMetadataInput): Metadata {
  const url = `${SITE.url}${path}`;
  const fullTitle =
    path === "/" ? SITE.defaultTitle : `${title} | ${SITE.name}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      siteName: SITE.name,
      url,
      title: fullTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.twitterHandle,
      creator: SITE.twitterHandle,
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

/**
 * Rutas indexables del sitio con su prioridad para el sitemap.
 * Al añadir una página nueva, basta con registrarla aquí.
 */
export const SITEMAP_ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency:
    "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
}> = [
  { path: "/", priority: 1.0, changeFrequency: "daily" },
  { path: "/membresia", priority: 0.9, changeFrequency: "weekly" },
  { path: "/campeonato", priority: 0.9, changeFrequency: "daily" },
  { path: "/clasificacion", priority: 0.8, changeFrequency: "daily" },
  { path: "/calendario", priority: 0.8, changeFrequency: "weekly" },
  { path: "/analisis-gp", priority: 0.8, changeFrequency: "daily" },
  { path: "/el-paddock", priority: 0.7, changeFrequency: "weekly" },
  { path: "/pecinogp", priority: 0.7, changeFrequency: "weekly" },
  { path: "/videos", priority: 0.7, changeFrequency: "daily" },
  { path: "/estadisticas", priority: 0.5, changeFrequency: "weekly" },
  { path: "/sobre-nosotros", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contacto", priority: 0.5, changeFrequency: "monthly" },
  { path: "/aviso-legal", priority: 0.2, changeFrequency: "yearly" },
  { path: "/politica-privacidad", priority: 0.2, changeFrequency: "yearly" },
  { path: "/politica-cookies", priority: 0.2, changeFrequency: "yearly" },
];
