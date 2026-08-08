import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contacto y colaboraciones",
  description:
    "¿Una colaboración, un patrocinio o una idea para un vídeo de MotoGP? Escribe al equipo de PecinoGP: leemos y respondemos todos los mensajes.",
  path: "/contacto",
  keywords: [
    "contacto PecinoGP",
    "colaboraciones MotoGP",
    "patrocinio canal MotoGP",
  ],
});

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
