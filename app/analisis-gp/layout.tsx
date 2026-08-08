import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Análisis de MotoGP en vídeo, GP a GP",
  description:
    "Análisis técnico en vídeo de cada Gran Premio de MotoGP: claves de carrera, estrategia, reglajes y valoración post-carrera de Manuel Pecino.",
  path: "/analisis-gp",
  keywords: [
    "análisis MotoGP",
    "vídeos MotoGP",
    "análisis técnico MotoGP",
    "post-carrera MotoGP",
  ],
});

export default function AnalisisGpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
