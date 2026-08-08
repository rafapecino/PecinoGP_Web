import { buildMetadata } from "@/lib/seo";

// La página es un Client Component y no puede exportar metadata:
// se define aquí, en el layout de la ruta.
export const metadata = buildMetadata({
  title: "Campeonato MotoGP: clasificación y próximo GP",
  description:
    "Sigue el Mundial de MotoGP: clasificación de pilotos actualizada carrera a carrera, próximo Gran Premio, circuito y fechas, todo en un vistazo.",
  path: "/campeonato",
  keywords: [
    "campeonato MotoGP",
    "mundial MotoGP",
    "clasificación MotoGP",
    "próximo GP MotoGP",
  ],
});

export default function CampeonatoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
