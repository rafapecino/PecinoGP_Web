import { cachedJson } from "./api-cache";

/**
 * Estadísticas de Instagram vía Graph API de Meta.
 *
 * Requiere (variables de entorno):
 *  - INSTAGRAM_BUSINESS_ID  → ID de la cuenta de Instagram Business/Creator
 *  - INSTAGRAM_GRAPH_TOKEN  → token de acceso de larga duración con permisos
 *    instagram_basic + instagram_manage_insights + pages_read_engagement
 *
 * Si faltan las variables o la API falla, se devuelven los últimos datos
 * conocidos (FALLBACK) para que la web no quede en blanco.
 */

const GRAPH = "https://graph.facebook.com/v21.0";
const IG_ID = process.env.INSTAGRAM_BUSINESS_ID;
const TOKEN = process.env.INSTAGRAM_GRAPH_TOKEN;

export interface InstagramStats {
  followers: number;
  mediaCount: number;
  /** Cuentas únicas alcanzadas (últimos 28 días). */
  reach: number;
  /** Visualizaciones / impresiones (últimos 28 días). */
  views: number;
  /** Interacciones totales (últimos 28 días). */
  interactions: number;
  /** % de engagement = interacciones / visualizaciones. */
  engagement: number;
  /** true si los datos vienen en vivo de la Graph API. */
  live: boolean;
}

// Últimos datos reales conocidos (de tus Insights). Se usan como respaldo.
const FALLBACK: InstagramStats = {
  followers: 4345,
  mediaCount: 340,
  reach: 49983,
  views: 140665,
  interactions: 6622,
  engagement: 4.7,
  live: false,
};

async function fetchJson(url: string): Promise<any | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Pide una métrica de insights a nivel de cuenta. La Graph API cambia a menudo
 * los parámetros aceptados, así que cada métrica se pide por separado y se
 * ignora en silencio si falla (devuelve 0).
 */
async function fetchInsight(
  metric: string,
  period: "day" | "week" | "days_28",
): Promise<number> {
  const url = `${GRAPH}/${IG_ID}/insights?metric=${metric}&period=${period}&metric_type=total_value&access_token=${TOKEN}`;
  const data = await fetchJson(url);
  const val = data?.data?.[0]?.total_value?.value;
  return typeof val === "number" ? val : 0;
}

export async function getInstagramStats(): Promise<InstagramStats> {
  if (!IG_ID || !TOKEN) {
    return FALLBACK;
  }

  return cachedJson<InstagramStats>(
    "instagram-stats",
    // En dev cacheamos 6h para no gastar llamadas; en prod 1h.
    { dev: 6 * 60 * 60, prod: 60 * 60 },
    async () => {
      // Datos de perfil (seguidores + nº de publicaciones)
      const profile = await fetchJson(
        `${GRAPH}/${IG_ID}?fields=followers_count,media_count&access_token=${TOKEN}`,
      );

      if (!profile) {
        console.warn("[instagram] Perfil no disponible; usando fallback.");
        return FALLBACK;
      }

      // Insights de los últimos 28 días (cada uno tolerante a fallos)
      const [reach, views, interactions] = await Promise.all([
        fetchInsight("reach", "days_28"),
        fetchInsight("views", "days_28"),
        fetchInsight("total_interactions", "days_28"),
      ]);

      const stats: InstagramStats = {
        followers: profile.followers_count ?? FALLBACK.followers,
        mediaCount: profile.media_count ?? FALLBACK.mediaCount,
        reach: reach || FALLBACK.reach,
        views: views || FALLBACK.views,
        interactions: interactions || FALLBACK.interactions,
        engagement:
          views > 0
            ? Number(((interactions / views) * 100).toFixed(1))
            : FALLBACK.engagement,
        live: true,
      };

      return stats;
    },
  );
}
