import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/All/components/header";
import { Footer } from "@/All/components/footer";

export const metadata: Metadata = {
  title: "Aviso Legal | PecinoGP",
  description:
    "Información legal y datos identificativos del titular del sitio web PecinoGP conforme a la LSSI-CE.",
};

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-black text-foreground">
      <Header />
      <main className="pt-32 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-1 bg-red-600 rounded-full" />
            <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px]">
              Información legal
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-12">
            AVISO <span className="text-red-600">LEGAL</span>
          </h1>

          <div className="prose prose-invert max-w-none space-y-8 text-white/80">
            <section>
              <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tight mb-4">
                1. Datos identificativos del titular
              </h2>
              <p>
                En cumplimiento de lo establecido en el artículo 10 de la Ley 34/2002,
                de 11 de julio, de Servicios de la Sociedad de la Información y de
                Comercio Electrónico (LSSI-CE), se informa a los usuarios de los
                siguientes datos identificativos del titular del sitio web{" "}
                <strong className="text-white">pecinogp.es</strong>:
              </p>
              <ul className="space-y-2 pl-6 list-disc marker:text-red-500">
                <li><strong className="text-white">Denominación social:</strong> MPC Network SL</li>
                <li><strong className="text-white">CIF:</strong> [PENDIENTE DE INDICAR]</li>
                <li><strong className="text-white">Domicilio social:</strong> [PENDIENTE DE INDICAR]</li>
                <li><strong className="text-white">Email de contacto:</strong> rafapecino@gmail.com</li>
                <li>
                  <strong className="text-white">Datos de inscripción registral:</strong>{" "}
                  Inscrita en el Registro Mercantil — Tomo [—], Libro [—], Folio [—], Hoja [—].
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tight mb-4">
                2. Objeto
              </h2>
              <p>
                El presente aviso legal regula el uso del sitio web pecinogp.es (en adelante,
                "el sitio web"), del que es titular MPC Network SL. La navegación por el sitio
                web atribuye la condición de Usuario e implica la aceptación plena y sin reservas
                de todas y cada una de las disposiciones incluidas en este aviso legal, que
                pueden sufrir modificaciones.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tight mb-4">
                3. Condiciones de uso
              </h2>
              <p>
                El Usuario se compromete a hacer un uso adecuado de los contenidos y servicios
                que MPC Network SL ofrece a través de su sitio web y a no emplearlos para
                incurrir en actividades ilícitas o contrarias a la buena fe y al ordenamiento
                legal; difundir contenidos o propaganda de carácter racista, xenófobo,
                pornográfico, de apología del terrorismo o atentatorio contra los derechos
                humanos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tight mb-4">
                4. Propiedad intelectual e industrial
              </h2>
              <p>
                Todos los contenidos del sitio web, entendiendo por estos a título meramente
                enunciativo los textos, fotografías, gráficos, imágenes, iconos, tecnología,
                software, links y demás contenidos audiovisuales o sonoros, así como su diseño
                gráfico y códigos fuente, son propiedad intelectual de MPC Network SL o de
                terceros, sin que puedan entenderse cedidos al Usuario ninguno de los derechos
                de explotación reconocidos por la normativa vigente.
              </p>
              <p>
                Las marcas comerciales, nombres comerciales o signos distintivos son
                titularidad de MPC Network SL o de terceros, sin que pueda entenderse que el
                acceso al sitio web atribuye derecho alguno sobre los mismos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tight mb-4">
                5. Exclusión de garantías y responsabilidad
              </h2>
              <p>
                MPC Network SL no se hace responsable, en ningún caso, de los daños y perjuicios
                de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u
                omisiones en los contenidos, falta de disponibilidad del portal o la
                transmisión de virus o programas maliciosos o lesivos en los contenidos, pese
                a haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tight mb-4">
                6. Enlaces a terceros
              </h2>
              <p>
                El sitio web puede contener enlaces (links) a otros sitios web. MPC Network SL
                no ejerce ningún control sobre dichos sitios y contenidos, y en ningún caso
                asume responsabilidad alguna por los contenidos de algún enlace perteneciente
                a un sitio web ajeno.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tight mb-4">
                7. Derecho de exclusión
              </h2>
              <p>
                MPC Network SL se reserva el derecho a denegar o retirar el acceso al portal
                y/o los servicios ofrecidos, sin necesidad de preaviso, a instancia propia o de
                un tercero, a aquellos usuarios que incumplan las presentes condiciones
                generales de uso.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tight mb-4">
                8. Legislación aplicable y jurisdicción
              </h2>
              <p>
                La relación entre MPC Network SL y el Usuario se regirá por la normativa
                española vigente. Todas las disputas y reclamaciones derivadas de este aviso
                legal se resolverán por los Juzgados y Tribunales competentes conforme a
                derecho.
              </p>
            </section>

            <section className="pt-8 border-t border-white/10">
              <p className="text-sm text-white/60">
                Consulta también nuestra{" "}
                <Link href="/politica-privacidad" className="text-red-500 hover:text-red-400 underline">
                  Política de Privacidad
                </Link>{" "}
                y nuestra{" "}
                <Link href="/politica-cookies" className="text-red-500 hover:text-red-400 underline">
                  Política de Cookies
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
