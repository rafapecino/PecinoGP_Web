import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/All/components/header";
import { Footer } from "@/All/components/footer";
import { ManageCookiesButton } from "./manage-cookies-button";

export const metadata: Metadata = {
  title: "Política de Cookies | PecinoGP",
  description:
    "Información sobre el uso de cookies en PecinoGP conforme a la LSSI-CE y la guía de cookies de la AEPD.",
};

export default function PoliticaCookiesPage() {
  return (
    <div className="min-h-screen bg-black text-foreground">
      <Header />
      <main className="pt-32 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-1 bg-red-600 rounded-full" />
            <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px]">
              Transparencia
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-8">
            POLÍTICA DE <span className="text-red-600">COOKIES</span>
          </h1>

          <div className="mb-12">
            <ManageCookiesButton />
          </div>

          <div className="space-y-8 text-white/80 leading-relaxed">
            <section>
              <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tight mb-4">
                1. ¿Qué son las cookies?
              </h2>
              <p>
                Las cookies son pequeños archivos de texto que los sitios web instalan en
                el navegador del usuario para almacenar y recuperar información sobre la
                navegación. Permiten reconocer al usuario, recordar sus preferencias y
                ofrecer una experiencia más adecuada.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tight mb-4">
                2. Tipos de cookies que usamos
              </h2>

              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-white font-black italic uppercase text-base tracking-wider mb-2">
                    Cookies técnicas o necesarias
                  </h3>
                  <p className="text-white/70">
                    Imprescindibles para el funcionamiento del sitio (por ejemplo, almacenar
                    tu decisión sobre el consentimiento de cookies). No requieren
                    consentimiento previo y no pueden desactivarse.
                  </p>
                  <p className="text-white/50 text-sm mt-2">
                    Propias · Duración: hasta 12 meses · Finalidad: técnica.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-white font-black italic uppercase text-base tracking-wider mb-2">
                    Cookies analíticas
                  </h3>
                  <p className="text-white/70">
                    Nos permiten medir el uso del sitio (páginas visitadas, errores, dispositivos)
                    para mejorar el servicio. Solo se activan tras tu consentimiento.
                  </p>
                  <p className="text-white/50 text-sm mt-2">
                    De terceros · Proveedor: Google · Duración: hasta 24 meses · Finalidad: estadística.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-white font-black italic uppercase text-base tracking-wider mb-2">
                    Cookies publicitarias
                  </h3>
                  <p className="text-white/70">
                    Permiten mostrar anuncios de Google AdSense y medir su rendimiento.
                    Solo se cargan después de que aceptes esta categoría — antes de tu
                    consentimiento <strong className="text-white">no se inyecta</strong> el script de AdSense
                    ni se envía información al servidor de anuncios.
                  </p>
                  <p className="text-white/50 text-sm mt-2">
                    De terceros · Proveedor: Google AdSense · Duración: hasta 24 meses · Finalidad: publicidad.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tight mb-4">
                3. Bloqueo previo (opt-in estricto)
              </h2>
              <p>
                Hasta que el usuario otorgue su consentimiento expreso a las cookies
                analíticas o publicitarias, PecinoGP{" "}
                <strong className="text-white">no carga ningún script de rastreo</strong>{" "}
                (incluido Google AdSense). Las casillas de configuración aparecen
                desmarcadas por defecto, conforme a las directrices de la AEPD y al
                artículo 22 de la LSSI-CE.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tight mb-4">
                4. Cómo gestionar tus cookies
              </h2>
              <p>
                Puedes aceptar, rechazar o personalizar tu elección en cualquier momento
                pulsando el botón <strong className="text-white">"Gestionar mis cookies"</strong>{" "}
                situado en la parte superior de esta página o en el enlace del pie de
                página. Tu decisión queda guardada localmente en tu navegador hasta que
                decidas modificarla.
              </p>
              <p className="mt-3">
                Adicionalmente, puedes configurar tu navegador para bloquear o eliminar
                cookies desde sus preferencias:
              </p>
              <ul className="space-y-1 pl-6 list-disc marker:text-red-500">
                <li>
                  <a className="text-red-500 hover:text-red-400 underline" href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a>
                </li>
                <li>
                  <a className="text-red-500 hover:text-red-400 underline" href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a>
                </li>
                <li>
                  <a className="text-red-500 hover:text-red-400 underline" href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a>
                </li>
                <li>
                  <a className="text-red-500 hover:text-red-400 underline" href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer">Microsoft Edge</a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tight mb-4">
                5. Cambios en la política de cookies
              </h2>
              <p>
                MPC Network SL puede modificar esta política para adaptarla a cambios
                normativos o técnicos. Te recomendamos revisarla periódicamente. Si los
                cambios son sustanciales, te volveremos a solicitar tu consentimiento.
              </p>
            </section>

            <section className="pt-8 border-t border-white/10">
              <p className="text-sm text-white/60">
                Consulta también nuestro{" "}
                <Link href="/aviso-legal" className="text-red-500 hover:text-red-400 underline">
                  Aviso Legal
                </Link>{" "}
                y nuestra{" "}
                <Link href="/politica-privacidad" className="text-red-500 hover:text-red-400 underline">
                  Política de Privacidad
                </Link>
                .
              </p>
              <p className="text-xs text-white/40 mt-2">
                Última actualización: mayo de 2026.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
