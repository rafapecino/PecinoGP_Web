import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Clasificación MotoGP del mundial de pilotos",
  description:
    "Clasificación del Mundial de MotoGP actualizada tras cada carrera: puntos, posiciones y equipos de todos los pilotos de la parrilla.",
  path: "/clasificacion",
  keywords: [
    "clasificación MotoGP",
    "mundial de pilotos MotoGP",
    "puntos MotoGP",
    "tabla MotoGP",
  ],
});

export default function ClasificacionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
