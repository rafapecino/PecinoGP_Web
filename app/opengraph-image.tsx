import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

// Imagen social por defecto de todo el sitio: las rutas hijas la heredan
// salvo que definan su propio opengraph-image.
export const alt = "PecinoGP — Análisis y actualidad de MotoGP en español";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Análisis de MotoGP",
    title: "Pasión al límite por el MotoGP",
    subtitle:
      "Análisis técnico, directos y cobertura del mundial con Manuel Pecino.",
  });
}
