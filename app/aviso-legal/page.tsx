import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/All/components/header"
import { Footer } from "@/All/components/footer"

export const metadata: Metadata = {
  title: "Aviso Legal | PecinoGP",
  description: "Aviso legal de PecinoGP. Información sobre el titular del sitio web.",
}

export default function AvisoLegalPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Aviso Legal</h1>
        <p className="text-sm text-muted-foreground mb-10">
          En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Datos identificativos del titular</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><span className="font-medium text-foreground">Denominación social:</span> MPC Network SL</p>
            <p>
              <span className="font-medium text-foreground">CIF:</span>{" "}
              <span className="bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded text-yellow-800 dark:text-yellow-200">
                [PENDIENTE — introduce el CIF de la sociedad]
              </span>
            </p>
            <p>
              <span className="font-medium text-foreground">Domicilio social:</span>{" "}
              <span className="bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded text-yellow-800 dark:text-yellow-200">
                [PENDIENTE — introduce la dirección completa]
              </span>
            </p>
            <p>
              <span className="font-medium text-foreground">Correo electrónico de contacto:</span>{" "}
              <a href="mailto:rafapecino@gmail.com" className="underline hover:text-foreground">
                rafapecino@gmail.com
              </a>
            </p>
            <p>
              <span className="font-medium text-foreground">Sitio web:</span>{" "}
              <a href="https://pecinogp.es" className="underline hover:text-foreground">
                https://pecinogp.es
              </a>
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. Datos de inscripción en el Registro Mercantil</h2>
          <div className="space-y-2 text-sm text-muted-foreground bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-md">
            <p className="text-yellow-800 dark:text-yellow-200 font-medium">
              PENDIENTE — introduce los datos del Registro Mercantil:
            </p>
            <p className="text-yellow-700 dark:text-yellow-300">Tomo: [____] · Libro: [____] · Folio: [____] · Hoja: [____]</p>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Una vez inscritos en el Registro Mercantil, sustituye los campos anteriores por los datos reales de inscripción.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Objeto y actividad</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            PecinoGP (<strong>pecinogp.es</strong>) es un sitio web de análisis, información y entretenimiento sobre el campeonato mundial de MotoGP. Ofrece cobertura de carreras, clasificaciones, análisis técnicos y contenido audiovisual relacionado con el motociclismo deportivo. El acceso y uso de este sitio web implica la aceptación plena de las condiciones recogidas en este Aviso Legal.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Propiedad intelectual e industrial</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Todos los contenidos del sitio web — textos, imágenes, logotipos, diseño gráfico, código fuente y demás elementos — son propiedad de MPC Network SL o de terceros que han autorizado su uso, y están protegidos por la legislación española e internacional sobre propiedad intelectual e industrial. Queda expresamente prohibida su reproducción, distribución, comunicación pública o transformación sin autorización expresa por escrito del titular.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mt-3">
            Las marcas, nombres comerciales y signos distintivos relacionados con el campeonato de MotoGP son propiedad de Dorna Sports S.L. o sus licenciatarios. PecinoGP no mantiene ninguna relación comercial ni afiliación oficial con Dorna Sports S.L.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. Condiciones de uso</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            El usuario se compromete a hacer un uso adecuado de los contenidos y servicios ofrecidos en el sitio web, y a no emplearlos para actividades ilícitas, contrarias a la buena fe o al orden público. MPC Network SL se reserva el derecho a denegar o retirar el acceso al sitio web a usuarios que incumplan estas condiciones.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">6. Exclusión de responsabilidad</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            MPC Network SL no se hace responsable de los daños o perjuicios derivados del uso del sitio web, de la falta de disponibilidad del mismo o de la existencia de virus u otros elementos lesivos en los contenidos. Los enlaces a sitios externos son informativos y no implican recomendación ni responsabilidad sobre su contenido.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">7. Legislación aplicable y jurisdicción</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier controversia, las partes se someten a los Juzgados y Tribunales del domicilio del titular, salvo que la normativa de consumidores establezca otra jurisdicción.
          </p>
        </section>

        <div className="mt-10 pt-6 border-t border-border flex flex-wrap gap-4 text-xs text-muted-foreground">
          <Link href="/politica-privacidad" className="underline hover:text-foreground transition-colors">Política de Privacidad</Link>
          <Link href="/politica-cookies" className="underline hover:text-foreground transition-colors">Política de Cookies</Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
