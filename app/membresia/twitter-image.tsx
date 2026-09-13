import { renderOgImage, ogSize, ogContentType } from "@/lib/og";
import { MEMBERSHIP_LIVE } from "@/lib/seo";

export const alt = MEMBERSHIP_LIVE
  ? "Membresía del canal PecinoGP desde 3,99 € al mes"
  : "La membresía del canal PecinoGP llega muy pronto";
export const size = ogSize;
export const contentType = ogContentType;

export default function MembresiaTwitterImage() {
  return renderOgImage(
    MEMBERSHIP_LIVE
      ? {
          eyebrow: "Membresía del canal",
          title: "Hazte miembro de PecinoGP",
          subtitle:
            "Directos cerrados del Club, vídeos que no ve nadie más y el chat de miembros. Desde 3,99 €/mes.",
        }
      : {
          eyebrow: "Membresía del canal · Muy pronto",
          title: "Algo se está preparando en el box",
          subtitle:
            "Directos cerrados del Club, vídeos que no ve nadie más y el chat de miembros. Dos niveles, muy pronto.",
        },
  );
}
