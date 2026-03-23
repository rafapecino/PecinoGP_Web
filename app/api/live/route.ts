import { NextResponse } from 'next/server';

// Lee las claves de API desde las variables de entorno del servidor.
// No es necesario el prefijo NEXT_PUBLIC_ ya que esto se ejecuta en el servidor.
const API_KEYS = [
  process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  process.env.YOUTUBE_API_KEY_2 || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY_2,
  process.env.YOUTUBE_API_KEY_3 || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY_3
].filter((key): key is string => typeof key === 'string' && key.length > 0);

const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

/**
 * README:
 * Este endpoint comprueba si un canal de YouTube está en directo de forma optimizada.
 *
 * --- REQUISITOS DE CONFIGURACIÓN ---
 * Para que este endpoint funcione, necesitas añadir las siguientes variables
 * de entorno a tu archivo `.env.local` en la raíz del proyecto:
 *
 * 1. YOUTUBE_API_KEY: Tu clave de API de Google Cloud para la API de YouTube Data v3.
 *    (Opcional) YOUTUBE_API_KEY_2, YOUTUBE_API_KEY_3, etc. para rotación de claves.
 *
 * 2. YOUTUBE_CHANNEL_ID: El ID del canal de YouTube que quieres monitorizar.
 * 
 * --- FUNCIONAMIENTO ---
 * - **Caché Inteligente**: Esta ruta utiliza el sistema de caché de datos de Next.js.
 *   La respuesta de la API de YouTube se cachea durante 60 segundos (`revalidate: 60`).
 *   Esto significa que, sin importar cuántos usuarios visiten la página, solo se
 *   realizará una llamada a la API de YouTube como máximo cada minuto.
 *
 * - **Rotación de API Keys**: Si se proporcionan múltiples `YOUTUBE_API_KEY_...`,
 *   el sistema intentará con la siguiente clave si la actual falla por cuota (error 403).
 *   Esto aumenta la robustez del sistema.
 * 
 * - **Manejo de Errores**: Si todas las claves fallan o hay otro error, se devuelve
 *   un estado `{ isLive: false }` para no interrumpir al cliente.
 */
async function fetchWithRotation(baseUrl: string): Promise<any> {
  if (API_KEYS.length === 0) {
    throw new Error("No se han proporcionado claves de API de YouTube en el servidor.");
  }

  for (let i = 0; i < API_KEYS.length; i++) {
    const apiKey = API_KEYS[i];
    const url = `${baseUrl}&key=${apiKey}`;

    try {
      // Usamos el caché de Next.js con revalidación de 60 segundos.
      const res = await fetch(url, { next: { revalidate: 60 } });

      if (res.ok) {
        return await res.json();
      }

      if (res.status === 403) {
        console.warn(`[YouTube API] Clave #${i + 1} falló (403). Probando la siguiente.`);
        // No cacheamos el error 403 para poder reintentar con otra clave en la siguiente petición.
        // Pero para esta petición, continuamos al siguiente loop.
        continue;
      }
      
      // Para otros errores HTTP, no reintentamos y lanzamos excepción.
      throw new Error(`Error HTTP ${res.status}`);

    } catch (err) {
      console.warn(`[YouTube API] Error con la Clave #${i + 1}.`, err);
      // Continuamos al siguiente bucle para probar con la siguiente clave.
      continue;
    }
  }

  throw new Error("Todas las claves de API de YouTube fallaron.");
}

export async function GET() {
  if (API_KEYS.length === 0 || !CHANNEL_ID) {
    console.warn('ADVERTENCIA: YOUTUBE_API_KEY(s) o YOUTUBE_CHANNEL_ID no están configuradas. El estado "en vivo" no funcionará.');
    return NextResponse.json({ isLive: false });
  }

  const baseUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video`;

  try {
    const data = await fetchWithRotation(baseUrl);

    if (data.items && data.items.length > 0) {
      return NextResponse.json({
        isLive: true,
        videoId: data.items[0].id.videoId,
      });
    }

    // --- FALLBACK: Check latest video status ---
    // Sometimes search API is delayed. We check the latest video directly.
    const playlistId = CHANNEL_ID.startsWith("UC") ? `UU${CHANNEL_ID.substring(2)}` : CHANNEL_ID;
    const latestVideoUrl = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&part=snippet&maxResults=1`;
    
    try {
      const latestData = await fetchWithRotation(latestVideoUrl);
      if (latestData.items && latestData.items.length > 0) {
        const videoId = latestData.items[0].snippet.resourceId.videoId;
        const videoStatusUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,liveStreamingDetails`;
        const videoData = await fetchWithRotation(videoStatusUrl);
        
        if (videoData.items && videoData.items.length > 0) {
          const item = videoData.items[0];
          const isActuallyLive = item.snippet.liveBroadcastContent === 'live' || !!item.liveStreamingDetails?.actualStartTime && !item.liveStreamingDetails?.actualEndTime;
          
          if (isActuallyLive) {
            return NextResponse.json({
              isLive: true,
              videoId: videoId,
            });
          }
        }
      }
    } catch (fallbackError) {
      console.warn("Fallback check failed:", fallbackError);
    }

    return NextResponse.json({ isLive: false });
  } catch (error) {
    console.error("Error final al obtener el estado en vivo de YouTube:", error);
    return NextResponse.json({ isLive: false });
  }
}