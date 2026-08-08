import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "El canal PecinoGP de MotoGP en cifras",
  description:
    "Suscriptores, visualizaciones y alcance del canal de MotoGP de Manuel Pecino, con datos reales de YouTube e Instagram actualizados cada mes.",
  path: "/pecinogp",
  keywords: [
    "PecinoGP",
    "Manuel Pecino",
    "canal MotoGP",
    "canal de MotoGP en español",
  ],
});

export default function PecinoGpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
