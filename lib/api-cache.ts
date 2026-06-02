import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const CACHE_DIR = path.join(process.cwd(), ".api-cache");
const IS_DEV = process.env.NODE_ENV !== "production";

let dirReady: Promise<void> | null = null;

function ensureDir(): Promise<void> {
  if (!dirReady) {
    dirReady = fs.mkdir(CACHE_DIR, { recursive: true }).then(() => {});
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
  const filePath = path.join(CACHE_DIR, `${safeKey(key)}.json`);
  const ttlSec = IS_DEV ? ttl.dev : ttl.prod;

  try {
    const stat = await fs.stat(filePath);
    const ageSec = (Date.now() - stat.mtimeMs) / 1000;
    if (ageSec < ttlSec) {
      const raw = await fs.readFile(filePath, "utf-8");
      if (IS_DEV) {
        console.log(
          `[api-cache] HIT  ${key.slice(0, 60)} (age=${Math.floor(ageSec)}s, ttl=${ttlSec}s)`,
        );
      }
      return JSON.parse(raw) as T;
    }
  } catch {
    // miss
  }

  if (IS_DEV) {
    console.log(`[api-cache] MISS ${key.slice(0, 60)} → fetching fresh...`);
  }

  const fresh = await fetcher();
  // Write asynchronously without blocking response.
  fs.writeFile(filePath, JSON.stringify(fresh)).catch(() => {});
  return fresh;
}
