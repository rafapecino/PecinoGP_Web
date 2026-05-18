import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/All/components/header"
import { Footer } from "@/All/components/footer"

export const metadata: Metadata = {
  title: "Política de Privacidad | PecinoGP",
  description: "Política de privacidad de PecinoGP. Información sobre el tratamiento de datos personales conforme al RGPD.",
}

export default function PoliticaPrivacidadPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Política de Privacidad</h1>
        <p className="text-sm text-muted-foreground mb-10">
          En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).
        </p>

        {/* Bloque 1 — Responsable */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Responsable del tratamiento</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><span className="font-medium text-foreground">Identidad:</span> MPC Network SL</p>
            <p>
              <span className="font-medium text-foreground">CIF:</span>{" "}
              <span className="bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded text-yellow-800 dark:text-yellow-200">
                [PENDIENTE]
              </span>
            </p>
            <p>
              <span className="font-medium text-foreground">Dirección:</span>{" "}
              <span className="bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded text-yellow-800 dark:text-yellow-200">
                [PENDIENTE]
              </span>
            </p>
            <p>
              <span className="font-medium text-foreground">Correo electrónico:</span>{" "}
              <a href="mailto:rafapecino@gmail.com" className="underline hover:text-foreground">
                rafapecino@gmail.com
              </a>
            </p>
          </div>
        </section>

        {/* Bloque 2 — Finalidad */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. Finalidad del tratamiento</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Tratamos los datos personales que nos facilitas o que se generan durante tu navegación para las siguientes finalidades:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li>
              <span className="font-medium text-foreground">Participación en encuestas y preguntas:</span> registramos tu dirección IP de forma anonimizada para evitar votos duplicados. Este dato se almacena en nuestros servidores y se elimina de forma periódica.
            </li>
            <li>
              <span className="font-medium text-foreground">Estadísticas de uso (solo con tu consentimiento):</span> si aceptas las cookies analíticas, utilizamos Google Analytics para obtener métricas agregadas de visitas y comportamiento en el sitio.
            </li>
            <li>
              <span className="font-medium text-foreground">Publicidad (solo con tu consentimiento):</span> si aceptas las cookies de publicidad, mostramos anuncios a través de Google AdSense, que puede recopilar datos para personalizar la publicidad.
            </li>
          </ul>
        </section>

        {/* Bloque 3 — Legitimación */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Base legitimadora</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li>
              <span className="font-medium text-foreground">Interés legítimo</span> (art. 6.1.f RGPD): para el control antispam de encuestas mediante IP anonimizada.
            </li>
            <li>
              <span className="font-medium text-foreground">Consentimiento explícito</span> (art. 6.1.a RGPD): para el uso de cookies analíticas y publicitarias. Puedes retirar tu consentimiento en cualquier momento desde la{" "}
              <Link href="/politica-cookies" className="underline hover:text-foreground">
                Política de Cookies
              </Link>.
            </li>
          </ul>
        </section>

        {/* Bloque 4 — Destinatarios */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Destinatarios y transferencias internacionales</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            No cedemos tus datos a terceros salvo obligación legal. No obstante, el sitio emplea servicios de terceros que pueden tratar datos por cuenta propia:
          </p>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">Google LLC (AdSense / Analytics)</p>
              <p>Proveedor de servicios de publicidad y analítica. Puede realizar transferencias internacionales amparadas en las Cláusulas Contractuales Tipo de la UE. Consulta su política en{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                  policies.google.com/privacy
                </a>.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground">Infraestructura de alojamiento (Vercel)</p>
              <p>El sitio web está alojado en servidores de Vercel Inc., que pueden procesar datos técnicos de acceso.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">YouTube Data API (Google LLC)</p>
              <p>Utilizamos la API de YouTube para mostrar vídeos. No se transmiten datos de identificación del usuario a través de esta integración.</p>
            </div>
          </div>
        </section>

        {/* Bloque 5 — Conservación */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. Plazo de conservación</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Los datos de IP anonimizados vinculados a encuestas se conservan durante un máximo de 30 días, tras los cuales se eliminan automáticamente. Las preferencias de cookies se almacenan en tu dispositivo y se respetan mientras no las modifiques o elimines.
          </p>
        </section>

        {/* Bloque 6 — Derechos */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">6. Tus derechos</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Puedes ejercer en cualquier momento los siguientes derechos enviando un correo a{" "}
            <a href="mailto:rafapecino@gmail.com" className="underline hover:text-foreground">
              rafapecino@gmail.com
            </a>{" "}
            con el asunto <em>"Protección de Datos"</em> e indicando el derecho que deseas ejercer:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
            <li><span className="font-medium text-foreground">Acceso:</span> conocer qué datos tuyos tratamos.</li>
            <li><span className="font-medium text-foreground">Rectificación:</span> corregir datos inexactos.</li>
            <li><span className="font-medium text-foreground">Supresión:</span> solicitar que eliminemos tus datos.</li>
            <li><span className="font-medium text-foreground">Oposición:</span> oponerte al tratamiento en determinadas circunstancias.</li>
            <li><span className="font-medium text-foreground">Limitación del tratamiento:</span> solicitar que restrinjamos el uso de tus datos.</li>
            <li><span className="font-medium text-foreground">Portabilidad:</span> recibir tus datos en un formato estructurado.</li>
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed mt-3">
            Si consideras que el tratamiento de tus datos no es adecuado, puedes presentar una reclamación ante la{" "}
            <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
              Agencia Española de Protección de Datos (AEPD)
            </a>.
          </p>
        </section>

        {/* Bloque 7 — Menores */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">7. Menores de edad</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Este sitio web no está dirigido a menores de 14 años ni recopila conscientemente datos de menores. Si detectamos que hemos recibido datos de un menor, los eliminaremos de inmediato.
          </p>
        </section>

        <div className="mt-10 pt-6 border-t border-border flex flex-wrap gap-4 text-xs text-muted-foreground">
          <Link href="/aviso-legal" className="underline hover:text-foreground transition-colors">Aviso Legal</Link>
          <Link href="/politica-cookies" className="underline hover:text-foreground transition-colors">Política de Cookies</Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
