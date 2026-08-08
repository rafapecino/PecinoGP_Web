import { renderOgImage, ogSize, ogContentType } from "@/lib/og";
import { MEMBERSHIP_LIVE } from "@/lib/seo";

// Tarjeta propia para cuando se comparta el enlace de la membresía en
// WhatsApp, X, Telegram o Instagram.
export const alt = MEMBERSHIP_LIVE
  ? "Membresía del canal PecinoGP desde 3,99 € al mes"
  : "La membresía del canal PecinoGP llega muy pronto";
export const size = ogSize;
export const contentType = ogContentType;

export default function MembresiaOpengraphImage() {
  return renderOgImage(
    MEMBERSHIP_LIVE
      ? {
          eyebrow: "Membresía del canal",
          title: "Hazte miembro de PecinoGP",
          subtitle:
            "Directos exclusivos post-carrera, acceso anticipado y comunidad privada. Desde 3,99 €/mes.",
        }
      : {
          eyebrow: "Membresía del canal · Muy pronto",
          title: "Algo se está preparando en el box",
          subtitle:
            "Directos exclusivos post-carrera, acceso anticipado y comunidad privada. Tres niveles, muy pronto.",
        },
  );
}
