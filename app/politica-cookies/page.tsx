import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/All/components/header"
import { Footer } from "@/All/components/footer"
import { ManageCookiesButton } from "./manage-cookies-button"

export const metadata: Metadata = {
  title: "Política de Cookies | PecinoGP",
  description: "Política de cookies de PecinoGP. Información sobre las cookies utilizadas y cómo gestionarlas.",
}

export default function PoliticaCookiesPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Política de Cookies</h1>
        <p className="text-sm text-muted-foreground mb-10">
          En cumplimiento del artículo 22.2 de la LSSI-CE y las directrices de la AEPD sobre el uso de cookies.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. ¿Qué son las cookies?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo cuando los visitas. Permiten que el sitio recuerde tus preferencias y acciones durante un tiempo determinado, para que no tengas que volver a introducirlas cada vez que visites el sitio o navegues de una página a otra.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. Cookies que utilizamos</h2>

          <h3 className="text-base font-semibold mt-4 mb-2">2.1 Cookies funcionales (necesarias)</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Son imprescindibles para que el sitio funcione correctamente. No requieren consentimiento previo.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-border rounded-md">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Cookie</th>
                  <th className="px-3 py-2 text-left font-medium">Finalidad</th>
                  <th className="px-3 py-2 text-left font-medium">Duración</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                <tr>
                  <td className="px-3 py-2 font-mono">pecino_cookie_consent</td>
                  <td className="px-3 py-2">Almacena tus preferencias de cookies (localStorage)</td>
                  <td className="px-3 py-2">Hasta que la elimines</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">sidebar_state</td>
                  <td className="px-3 py-2">Recuerda el estado del menú lateral</td>
                  <td className="px-3 py-2">7 días</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-base font-semibold mt-6 mb-2">2.2 Cookies analíticas (opcionales)</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Solo se activan si aceptas las cookies analíticas. Nos permiten conocer cómo interactúan los usuarios con el sitio de forma agregada y anónima.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-border rounded-md">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Cookie</th>
                  <th className="px-3 py-2 text-left font-medium">Proveedor</th>
                  <th className="px-3 py-2 text-left font-medium">Finalidad</th>
                  <th className="px-3 py-2 text-left font-medium">Duración</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                <tr>
                  <td className="px-3 py-2 font-mono">_ga, _ga_*</td>
                  <td className="px-3 py-2">Google Analytics</td>
                  <td className="px-3 py-2">Distingue usuarios, estadísticas de visitas</td>
                  <td className="px-3 py-2">2 años</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-base font-semibold mt-6 mb-2">2.3 Cookies publicitarias (opcionales)</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Solo se activan si aceptas las cookies de publicidad. Son gestionadas por Google AdSense y pueden usarse para mostrarte anuncios relevantes en función de tu navegación.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-border rounded-md">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Cookie</th>
                  <th className="px-3 py-2 text-left font-medium">Proveedor</th>
                  <th className="px-3 py-2 text-left font-medium">Finalidad</th>
                  <th className="px-3 py-2 text-left font-medium">Duración</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                <tr>
                  <td className="px-3 py-2 font-mono">IDE, DSID</td>
                  <td className="px-3 py-2">Google AdSense</td>
                  <td className="px-3 py-2">Publicidad personalizada</td>
                  <td className="px-3 py-2">1-2 años</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">NID, CONSENT</td>
                  <td className="px-3 py-2">Google</td>
                  <td className="px-3 py-2">Preferencias de usuario, publicidad</td>
                  <td className="px-3 py-2">6 meses — 2 años</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Para más información sobre las cookies de Google, visita{" "}
            <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
              policies.google.com/technologies/cookies
            </a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Cómo gestionar tus preferencias</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Puedes modificar tus preferencias de cookies en cualquier momento. Haz clic en el botón de abajo para volver a ver el panel de configuración:
          </p>
          <ManageCookiesButton />
          <p className="text-sm text-muted-foreground leading-relaxed mt-4">
            También puedes gestionar las cookies directamente desde la configuración de tu navegador. Ten en cuenta que desactivar ciertas cookies puede afectar al funcionamiento del sitio.
          </p>
          <ul className="mt-3 space-y-1 text-xs text-muted-foreground list-disc list-inside">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Safari</a></li>
            <li><a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Microsoft Edge</a></li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Actualización de esta política</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Podemos actualizar esta Política de Cookies cuando sea necesario, por ejemplo, si añadimos nuevos servicios. Te recomendamos revisarla periódicamente. La fecha de la última actualización aparece al pie de esta página.
          </p>
          <p className="text-xs text-muted-foreground mt-3">Última actualización: mayo de 2026</p>
        </section>

        <div className="mt-10 pt-6 border-t border-border flex flex-wrap gap-4 text-xs text-muted-foreground">
          <Link href="/aviso-legal" className="underline hover:text-foreground transition-colors">Aviso Legal</Link>
          <Link href="/politica-privacidad" className="underline hover:text-foreground transition-colors">Política de Privacidad</Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
