import { ImageResponse } from "next/og";

/**
 * Generador de imágenes sociales (OpenGraph / Twitter Card).
 *
 * Next las genera como rutas propias a partir de los ficheros
 * `opengraph-image.tsx` / `twitter-image.tsx`, así que aquí solo vive el
 * diseño, compartido por todas ellas.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type OgImageInput = {
  /** Línea pequeña superior, en rojo (ej. "Membresía del canal"). */
  eyebrow: string;
  /** Titular principal. */
  title: string;
  /** Línea de apoyo bajo el titular. */
  subtitle: string;
};

export function renderOgImage({ eyebrow, title, subtitle }: OgImageInput) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#000000",
        padding: "72px",
        position: "relative",
      }}
    >
      {/* Halo rojo de marca en la esquina superior derecha */}
      <div
        style={{
          position: "absolute",
          top: -260,
          right: -160,
          width: 640,
          height: 640,
          borderRadius: 9999,
          background:
            "radial-gradient(circle, rgba(220,38,38,0.55) 0%, rgba(220,38,38,0) 70%)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 8,
              borderRadius: 9999,
              background: "#dc2626",
            }}
          />
          <div
            style={{
              color: "#ef4444",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div
          style={{
            marginTop: 40,
            color: "#ffffff",
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: -3,
            maxWidth: 980,
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: 28,
            color: "rgba(255,255,255,0.62)",
            fontSize: 32,
            lineHeight: 1.35,
            maxWidth: 900,
          }}
        >
          {subtitle}
        </div>
      </div>

      {/* Pie: marca + racing line */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Satori exige display:flex explícito en cualquier div con más de
            un hijo; de ahí el contenedor con dos <span>. */}
        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize: 40,
            fontWeight: 800,
            letterSpacing: -1,
          }}
        >
          <span>Pecino</span>
          <span style={{ color: "#dc2626" }}>GP</span>
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: 26,
            fontWeight: 600,
          }}
        >
          pecinogp.es
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 10,
          background: "linear-gradient(90deg, #dc2626 0%, #7f1d1d 100%)",
        }}
      />
    </div>,
    ogSize,
  );
}
