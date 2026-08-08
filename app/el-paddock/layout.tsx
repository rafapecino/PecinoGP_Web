import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "El Paddock: encuestas y preguntas de la comunidad",
  description:
    "Vota en las encuestas, lanza tus preguntas y decide de qué hablamos en el canal. El espacio de participación de la comunidad MotoGP de PecinoGP.",
  path: "/el-paddock",
  keywords: [
    "comunidad MotoGP",
    "encuestas MotoGP",
    "preguntas MotoGP",
    "El Paddock PecinoGP",
  ],
});

export default function ElPaddockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
