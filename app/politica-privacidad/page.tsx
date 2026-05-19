import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/All/components/header";
import { Footer } from "@/All/components/footer";

export const metadata: Metadata = {
  title: "Política de Privacidad | PecinoGP",
  description:
    "Política de privacidad de PecinoGP conforme al Reglamento General de Protección de Datos (RGPD) y la LOPDGDD.",
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen bg-black text-foreground">
      <Header />
      <main className="pt-32 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-1 bg-red-600 rounded-full" />
            <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px]">
              Protección de datos
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-12">
            POLÍTICA DE <span className="text-red-600">PRIVACIDAD</span>
          </h1>

          <div className="space-y-8 text-white/80 leading-relaxed">
            <section>
              <p>
                En MPC Network SL nos comprometemos con la protección de los datos
                personales de los usuarios del sitio web pecinogp.es, conforme al
                Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección
                de Datos Personales y garantía de los derechos digitales (LOPDGDD).
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tight mb-4">
                1. Responsable del tratamiento
              </h2>
              <ul className="space-y-2 pl-6 list-disc marker:text-red-500">
                <li><strong className="text-white">Denominación social:</strong> MPC Network SL</li>
                <li><strong className="text-white">CIF:</strong> [PENDIENTE DE INDICAR]</li>
                <li><strong className="text-white">Domicilio social:</strong> [PENDIENTE DE INDICAR]</li>
                <li><strong className="text-white">Email de contacto:</strong> rafapecino@gmail.com</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tight mb-4">
                2. Finalidad del tratamiento
              </h2>
              <p>Tratamos los datos personales con las siguientes finalidades:</p>
              <ul className="space-y-2 pl-6 list-disc marker:text-red-500">
                <li>Atender consultas o solicitudes enviadas a través de los formularios o por email.</li>
                <li>Gestionar la participación en encuestas (polls) y preguntas (Q&amp;A) del sitio.</li>
                <li>Elaborar estadísticas anónimas de uso del sitio mediante cookies analíticas (solo con tu consentimiento).</li>
                <li>Mostrar publicidad personalizada a través de Google AdSense (solo con tu consentimiento).</li>
              </ul>
              <p className="mt-3">
                No se realizan decisiones automatizadas ni elaboración de perfiles con efectos
                jurídicos sobre los usuarios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tight mb-4">
                3. Legitimación
              </h2>
              <p>La base jurídica para el tratamiento es:</p>
              <ul className="space-y-2 pl-6 list-disc marker:text-red-500">
                <li><strong className="text-white">Consentimiento expreso</strong> del interesado (art. 6.1.a RGPD) para cookies no necesarias, formularios y suscripciones.</li>
                <li><strong className="text-white">Interés legítimo</strong> (art. 6.1.f RGPD) para mantener la seguridad y el funcionamiento técnico del sitio.</li>
              </ul>
              <p className="mt-3">
                El consentimiento puede revocarse en cualquier momento desde el panel de
                cookies o escribiendo a rafapecino@gmail.com, sin que ello afecte a la
                licitud del tratamiento previo.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tight mb-4">
                4. Destinatarios (cesiones a terceros)
              </h2>
              <p>
                No cedemos tus datos a terceros salvo obligación legal. Para prestar los
                servicios del sitio utilizamos los siguientes proveedores (encargados del
                tratamiento), todos ellos con garantías equivalentes a las del RGPD:
              </p>
              <ul className="space-y-2 pl-6 list-disc marker:text-red-500">
                <li><strong className="text-white">Vercel Inc.</strong> — alojamiento y entrega del sitio.</li>
                <li><strong className="text-white">Google Ireland Ltd.</strong> — YouTube Data API (consulta pública de vídeos del canal) y Google AdSense (publicidad, solo con consentimiento).</li>
                <li><strong className="text-white">Dorna Sports / motogp.com</strong> — datos públicos de clasificación deportiva.</li>
              </ul>
              <p className="mt-3">
                Algunos proveedores (como Google) pueden realizar transferencias internacionales
                a países fuera del EEE, amparadas en cláusulas contractuales tipo aprobadas por
                la Comisión Europea.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tight mb-4">
                5. Conservación de los datos
              </h2>
              <p>
                Los datos se conservarán durante el tiempo necesario para cumplir con la
                finalidad para la que se recabaron y para determinar las posibles
                responsabilidades derivadas. Los datos de las encuestas (votos por IP) se
                conservan únicamente para evitar votos duplicados durante la vida de la
                encuesta.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tight mb-4">
                6. Derechos del usuario
              </h2>
              <p>
                Como interesado, puedes ejercer en cualquier momento los siguientes derechos
                enviando una solicitud a <strong className="text-white">rafapecino@gmail.com</strong>{" "}
                indicando el derecho que deseas ejercer y adjuntando copia de tu DNI o documento
                equivalente:
              </p>
              <ul className="space-y-2 pl-6 list-disc marker:text-red-500">
                <li><strong className="text-white">Acceso</strong> — saber qué datos tuyos tratamos.</li>
                <li><strong className="text-white">Rectificación</strong> — corregir datos inexactos.</li>
                <li><strong className="text-white">Supresión</strong> ("derecho al olvido") — eliminar los datos cuando no sean necesarios.</li>
                <li><strong className="text-white">Oposición</strong> — oponerte a tratamientos basados en interés legítimo.</li>
                <li><strong className="text-white">Limitación</strong> del tratamiento.</li>
                <li><strong className="text-white">Portabilidad</strong> — recibir tus datos en un formato estructurado.</li>
                <li><strong className="text-white">Retirada del consentimiento</strong> en cualquier momento.</li>
              </ul>
              <p className="mt-3">
                Asimismo, tienes derecho a presentar una reclamación ante la{" "}
                <a
                  href="https://www.aepd.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-400 underline"
                >
                  Agencia Española de Protección de Datos (AEPD)
                </a>{" "}
                si consideras que el tratamiento no se ajusta a la normativa.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tight mb-4">
                7. Seguridad
              </h2>
              <p>
                MPC Network SL aplica medidas técnicas y organizativas apropiadas para
                garantizar la seguridad de los datos personales y evitar su alteración,
                pérdida, tratamiento o acceso no autorizado. El sitio funciona íntegramente
                bajo conexión cifrada HTTPS (SSL/TLS).
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tight mb-4">
                8. Cambios en la política de privacidad
              </h2>
              <p>
                MPC Network SL se reserva el derecho de modificar la presente política para
                adaptarla a novedades legislativas o jurisprudenciales. Cualquier cambio se
                publicará en esta página con su correspondiente fecha de actualización.
              </p>
            </section>

            <section className="pt-8 border-t border-white/10">
              <p className="text-sm text-white/60">
                Consulta también nuestro{" "}
                <Link href="/aviso-legal" className="text-red-500 hover:text-red-400 underline">
                  Aviso Legal
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
