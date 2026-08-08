import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Calendario MotoGP: todos los Grandes Premios",
  description:
    "Calendario completo de MotoGP con fechas, circuitos y países de cada Gran Premio. Consulta las carreras disputadas y cuál es la próxima cita del mundial.",
  path: "/calendario",
  keywords: [
    "calendario MotoGP",
    "fechas MotoGP",
    "circuitos MotoGP",
    "Grandes Premios MotoGP",
  ],
});

export default function CalendarioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
