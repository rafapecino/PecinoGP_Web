import { promises as fs } from "fs";
import path from "path";
import os from "os";
import crypto from "crypto";

// Usamos el directorio temporal del sistema, que es escribible tanto en local
// como en Vercel (/tmp). process.cwd() (/var/task) es de SOLO LECTURA en las
// funciones serverless de Vercel, por lo que escribir ahí lanzaba ENOENT/EROFS.
const CACHE_DIR = path.join(os.tmpdir(), "pecinogp-api-cache");
const IS_DEV = process.env.NODE_ENV !== "production";

// Si no se puede crear el directorio de caché (FS restringido), degradamos sin
// romper: simplemente no cacheamos y siempre vamos a la fuente.
let cacheUsable = true;
let dirReady: Promise<void> | null = null;

function ensureDir(): Promise<void> {
  if (!dirReady) {
    dirReady = fs
      .mkdir(CACHE_DIR, { recursive: true })
      .then(() => {})
      .catch((err) => {
        cacheUsable = false;
        if (IS_DEV) {
          console.warn(
            `[api-cache] Caché en disco deshabilitado (${err?.code ?? "error"}). Se servirá sin caché.`,
          );
        }
      });
  }
  return dirReady;
}

function safeKey(key: string): string {
  return crypto.createHash("sha1").update(key).digest("hex").slice(0, 24);
}

export interface CacheTtl {
  /** Seconds in development (npm run dev). Use long values to avoid burning external API quotas. */
  dev: number;
  /** Seconds in production. */
  prod: number;
}

/**
 * File-based JSON cache that persists across HMR, dev server restarts,
 * and `.next/` cleanups. Designed to prevent external API quota burn
 * during local development.
 *
 * - In dev (`NODE_ENV !== "production"`), uses `ttl.dev` (long).
 * - In prod, uses `ttl.prod`.
 * - Cache files live in `.api-cache/` (gitignored). Delete that folder
 *   to force a fresh fetch.
 * - Only successful results are cached; if `fetcher()` throws, nothing
 *   is written and the next call retries.
 */
export async function cachedJson<T>(
  key: string,
  ttl: CacheTtl,
  fetcher: () => Promise<T>,
): Promise<T> {
  await ensureDir();

  // FS no escribible: vamos directos a la fuente sin cachear.
  if (!cacheUsable) {
    return fetcher();
  }

  const filePath = path.join(CACHE_DIR, `${safeKey(key)}.json`);
  const ttlSec = IS_DEV ? ttl.dev : ttl.prod;

  // Guardamos la copia anterior (aunque esté caducada) por si el fetch falla:
  // así servimos datos antiguos en vez de dejar la UI en blanco.
  let staleRaw: string | null = null;

  try {
    const stat = await fs.stat(filePath);
    const ageSec = (Date.now() - stat.mtimeMs) / 1000;
    const raw = await fs.readFile(filePath, "utf-8");
    if (ageSec < ttlSec) {
      if (IS_DEV) {
        console.log(
          `[api-cache] HIT  ${key.slice(0, 60)} (age=${Math.floor(ageSec)}s, ttl=${ttlSec}s)`,
        );
      }
      return JSON.parse(raw) as T;
    }
    staleRaw = raw; // caducada, pero válida como fallback
  } catch {
    // miss
  }

  if (IS_DEV) {
    console.log(`[api-cache] MISS ${key.slice(0, 60)} → fetching fresh...`);
  }

  const fresh = await fetcher();

  // Solo cacheamos resultados con contenido. Si el fetch devuelve null/undefined
  // (p. ej. cuota agotada), NO sobrescribimos la caché y, si tenemos copia
  // anterior, la servimos para no vaciar la página.
  if (fresh !== null && fresh !== undefined) {
    fs.writeFile(filePath, JSON.stringify(fresh)).catch(() => {});
    return fresh;
  }

  if (staleRaw !== null) {
    if (IS_DEV) {
      console.warn(
        `[api-cache] Fetch sin datos para ${key.slice(0, 60)} → sirviendo copia anterior (stale).`,
      );
    }
    return JSON.parse(staleRaw) as T;
  }

  return fresh;
}
