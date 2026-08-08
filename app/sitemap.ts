import type { MetadataRoute } from "next";
import { SITE, SITEMAP_ROUTES } from "@/lib/seo";

/**
 * sitemap.xml generado a partir de SITEMAP_ROUTES (lib/seo.ts).
 * Al crear una página nueva basta con registrarla allí.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return SITEMAP_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
