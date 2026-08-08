import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "PecinoGP — Análisis y actualidad de MotoGP en español";
export const size = ogSize;
export const contentType = ogContentType;

export default function TwitterImage() {
  return renderOgImage({
    eyebrow: "Análisis de MotoGP",
    title: "Pasión al límite por el MotoGP",
    subtitle:
      "Análisis técnico, directos y cobertura del mundial con Manuel Pecino.",
  });
}
