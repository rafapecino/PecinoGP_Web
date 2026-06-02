import { NextResponse } from 'next/server';
import { cachedJson } from '@/lib/api-cache';

const API_KEYS = [
  process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  process.env.YOUTUBE_API_KEY_2 || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY_2,
  process.env.YOUTUBE_API_KEY_3 || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY_3,
].filter((key): key is string => typeof key === 'string' && key.length > 0);

const CHANNEL_ID =
  process.env.YOUTUBE_CHANNEL_ID || process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

// Caché persistente en disco (dev sobrevive a HMR / restart).
// dev: 6h; prod: 5 min (300s).
const LIVE_TTL = { dev: 6 * 3600, prod: 300 };

// TTL del caché interno de Next.js sobre la respuesta de YouTube (en segundos).
const NEXT_FETCH_TTL = 300;

/**
 * --- ESTRATEGIA EFICIENTE EN CUOTA ---
 *
 * En lugar de usar `search?eventType=live` (cuesta **100 unidades**),
 * comprobamos el último vídeo subido y leemos su `liveBroadcastContent` +
 * `liveStreamingDetails`:
 *   - playlistItems (1 unidad) → último vídeo
 *   - videos (1 unidad) → estado de directo
 * Total: **2 unidades** por comprobación (50× más barato).
 *
 * Combinado con caché de 5 min (prod) y polling cada 5 min en el header,
 * el consumo es ~24 unidades/hora (vs 6.000 unidades/hora con search@60s).
 */
async function fetchWithRotation(baseUrl: string): Promise<any> {
  if (API_KEYS.length === 0) {
    throw new Error('No se han proporcionado claves de API de YouTube en el servidor.');
  }

  for (let i = 0; i < API_KEYS.length; i++) {
    const apiKey = API_KEYS[i];
    const url = `${baseUrl}&key=${apiKey}`;

    try {
      const res = await fetch(url, { next: { revalidate: NEXT_FETCH_TTL } });

      if (res.ok) {
        return await res.json();
      }

      if (res.status === 403) {
        console.warn(`[YouTube API/live] Clave #${i + 1} (403). Probando siguiente.`);
        continue;
      }

      throw new Error(`Error HTTP ${res.status}`);
    } catch (err) {
      console.warn(`[YouTube API/live] Error con Clave #${i + 1}.`, err);
      continue;
    }
  }

  throw new Error('Todas las claves de API de YouTube fallaron.');
}

export async function GET() {
  if (API_KEYS.length === 0 || !CHANNEL_ID) {
    console.warn(
      'ADVERTENCIA: YOUTUBE_API_KEY(s) o YOUTUBE_CHANNEL_ID no configuradas. Estado "en vivo" deshabilitado.',
    );
    return NextResponse.json({ isLive: false });
  }

  try {
    const result = await cachedJson(
      `live:${CHANNEL_ID}`,
      LIVE_TTL,
      async () => {
        // 1) Último vídeo de la playlist de subidas (1 unidad)
        const playlistId = CHANNEL_ID.startsWith('UC')
          ? `UU${CHANNEL_ID.substring(2)}`
          : CHANNEL_ID;
        const latestUrl = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&part=snippet&maxResults=1`;

        const latestData = await fetchWithRotation(latestUrl);
        const videoId = latestData?.items?.[0]?.snippet?.resourceId?.videoId;
        if (!videoId) return { isLive: false };

        // 2) Estado de directo del vídeo (1 unidad)
        const statusUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,liveStreamingDetails`;
        const videoData = await fetchWithRotation(statusUrl);
        const item = videoData?.items?.[0];
        if (!item) return { isLive: false };

        const broadcast = item.snippet?.liveBroadcastContent;
        const details = item.liveStreamingDetails;
        const isActuallyLive =
          broadcast === 'live' ||
          (!!details?.actualStartTime && !details?.actualEndTime);

        return isActuallyLive ? { isLive: true, videoId } : { isLive: false };
      },
    );

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': `public, s-maxage=${NEXT_FETCH_TTL}, stale-while-revalidate=86400`,
      },
    });
  } catch (error) {
    console.error('Error final al obtener el estado en vivo de YouTube:', error);
    return NextResponse.json({ isLive: false });
  }
}
