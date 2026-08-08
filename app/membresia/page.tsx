import Image from "next/image";
import Link from "next/link";
import Header from "@/All/components/header";
import { Footer } from "@/All/components/footer";
import { SplitHeadline } from "@/All/components/split-headline";
import { HeroUnderline } from "@/All/components/hero-underline";
import { Reveal } from "@/All/components/reveal";
import { Magnetic } from "@/All/components/magnetic";
import { GlowCard } from "@/All/components/motion/glow-card";
import { MaskReveal } from "@/All/components/motion/mask-reveal";
import { JsonLd, breadcrumbSchema } from "@/All/components/json-ld";
import { TrackedLink } from "@/All/components/tracked-link";
import { buildMetadata, SITE, MEMBERSHIP_LIVE } from "@/lib/seo";
import {
  Check,
  Youtube,
  ArrowUpRight,
  Trophy,
  Radio,
  Users,
  Bell,
} from "lucide-react";

export const metadata = buildMetadata({
  title: MEMBERSHIP_LIVE
    ? "Membresía PecinoGP: hazte miembro del canal"
    : "Membresía PecinoGP: muy pronto",
  description: MEMBERSHIP_LIVE
    ? "Únete a la membresía de PecinoGP desde 3,99 €/mes: directos exclusivos post-carrera, acceso anticipado a vídeos, porra de MotoGP por GP y comunidad privada."
    : "La membresía de PecinoGP llega muy pronto: directos exclusivos post-carrera, acceso anticipado a los vídeos, porra por Gran Premio y comunidad privada. Tres niveles desde 3,99 €/mes.",
  path: "/membresia",
  // Tarjeta social propia (app/membresia/opengraph-image.tsx).
  image: "/membresia/opengraph-image",
  keywords: [
    "membresía PecinoGP",
    "hazte miembro PecinoGP",
    "miembro canal MotoGP",
    "comunidad MotoGP",
    "directos exclusivos MotoGP",
    "porra MotoGP",
  ],
});

/**
 * Niveles de la membresía nativa de YouTube.
 * Las ventajas son acumulativas: cada nivel incluye las del anterior.
 * Si cambian los precios o las ventajas en YouTube Studio, actualizar aquí:
 * esta lista alimenta también los datos estructurados de la página.
 */
const TIERS = [
  {
    name: "Box",
    price: "3,99",
    icon: Trophy,
    tagline: "El primer paso dentro del box",
    featured: false,
    benefits: [
      "Insignia de fidelidad junto a tu nombre",
      "Emojis exclusivos en chats y directos",
      "Encuestas para votar los temas de los vídeos",
      "Porra de resultados por GP con clasificación anual",
    ],
  },
  {
    name: "Paddock",
    price: "9,99",
    icon: Radio,
    tagline: "Donde se comenta la carrera de verdad",
    featured: true,
    benefits: [
      "Directo exclusivo post-carrera tras cada Gran Premio",
      "Acceso anticipado a los vídeos (24–48 h antes)",
      "Tus preguntas respondidas con prioridad en los directos",
      "Todo lo incluido en el nivel Box",
    ],
  },
  {
    name: "Hospitality",
    price: "24,99",
    icon: Users,
    tagline: "El círculo más cercano del canal",
    featured: false,
    benefits: [
      "Grupo privado de la comunidad (Discord/Telegram)",
      "Tu nombre en los agradecimientos de los vídeos",
      "Videollamada grupal trimestral con Manuel Pecino",
      "Voto en las decisiones del canal",
      "Todo lo incluido en los niveles Box y Paddock",
    ],
  },
] as const;

/**
 * Preguntas frecuentes. El texto se renderiza en la página y, en paralelo,
 * se publica como FAQPage para que Google y los buscadores con IA puedan
 * responder directamente con este contenido.
 */
const FAQ = MEMBERSHIP_LIVE
  ? ([
      {
        question: "¿Cuánto cuesta la membresía de PecinoGP?",
        answer:
          "Hay tres niveles: Box por 3,99 €/mes, Paddock por 9,99 €/mes y Hospitality por 24,99 €/mes. Las ventajas son acumulativas, así que cada nivel incluye todo lo del anterior. El cobro lo gestiona YouTube directamente.",
      },
      {
        question: "¿Cómo me hago miembro del canal?",
        answer:
          "Entra en el canal de PecinoGP en YouTube y pulsa el botón «Unirse» que aparece junto al de suscribirse. Elige el nivel que quieras y completa el pago desde tu cuenta de Google. El acceso a las ventajas es inmediato.",
      },
      {
        question: "¿Qué incluye el directo exclusivo post-carrera?",
        answer:
          "Tras cada Gran Premio de MotoGP, Manuel Pecino hace un directo solo para miembros de los niveles Paddock y Hospitality, donde se analiza la carrera en caliente y se responden las preguntas de la comunidad. Son unos 22 directos a lo largo de la temporada.",
      },
      {
        question: "¿Puedo cancelar la membresía cuando quiera?",
        answer:
          "Sí. La membresía se gestiona desde tu cuenta de YouTube y puedes cancelarla en cualquier momento sin permanencia. Mantendrás las ventajas hasta que termine el periodo de facturación que ya has pagado.",
      },
      {
        question: "¿Puedo cambiar de nivel más adelante?",
        answer:
          "Sí, puedes subir o bajar de nivel cuando quieras desde la propia página de la membresía en YouTube. Al subir de nivel accedes de inmediato a las ventajas adicionales.",
      },
      {
        question: "¿Necesito ser miembro para ver los vídeos del canal?",
        answer:
          "No. Todos los análisis públicos de MotoGP seguirán siendo gratuitos en YouTube. La membresía añade contenido y ventajas extra: directos exclusivos, acceso anticipado, porra por GP y comunidad privada.",
      },
    ] as const)
  : ([
      {
        question: "¿Cuándo se abre la membresía de PecinoGP?",
        answer:
          "Muy pronto. Estamos terminando de preparar el contenido exclusivo para que, desde el primer día, haya algo dentro y no solo una promesa. La apertura se anunciará en el canal de YouTube: suscríbete y activa la campana para enterarte el mismo día.",
      },
      {
        question: "¿Cuánto va a costar la membresía?",
        answer:
          "Está previsto que haya tres niveles: Box por 3,99 €/mes, Paddock por 9,99 €/mes y Hospitality por 24,99 €/mes. Las ventajas son acumulativas, así que cada nivel incluirá todo lo del anterior. El cobro lo gestionará YouTube directamente.",
      },
      {
        question: "¿Qué incluirá el directo exclusivo post-carrera?",
        answer:
          "Tras cada Gran Premio de MotoGP, Manuel Pecino hará un directo solo para miembros de los niveles Paddock y Hospitality, donde se analizará la carrera en caliente y se responderán las preguntas de la comunidad. Serán unos 22 directos a lo largo de la temporada.",
      },
      {
        question: "¿Cómo podré hacerme miembro cuando esté disponible?",
        answer:
          "Desde el canal de PecinoGP en YouTube, con el botón «Unirse» que aparecerá junto al de suscribirse. Se elige el nivel y se completa el pago desde tu cuenta de Google, sin salir de YouTube.",
      },
      {
        question: "¿Habrá permanencia?",
        answer:
          "No. La membresía se gestiona desde tu cuenta de YouTube y se podrá cancelar en cualquier momento, manteniendo las ventajas hasta el final del periodo ya pagado.",
      },
      {
        question: "¿Hará falta ser miembro para ver los vídeos del canal?",
        answer:
          "No. Todos los análisis públicos de MotoGP seguirán siendo gratuitos en YouTube. La membresía añadirá contenido y ventajas extra: directos exclusivos, acceso anticipado, porra por GP y comunidad privada.",
      },
    ] as const);

/** Cómo funciona, en tres pasos. */
const STEPS = [
  {
    title: "Elige tu nivel",
    description:
      "Box, Paddock u Hospitality. Se puede empezar por el más básico y subir cuando quieras.",
  },
  {
    title: "Pulsa «Unirse» en YouTube",
    description:
      "El alta y el pago se gestionan desde tu cuenta de Google, con la seguridad de YouTube.",
  },
  {
    title: "Entra en la comunidad",
    description:
      "Insignia, emojis, encuestas y, según el nivel, directos exclusivos y grupo privado.",
  },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const membershipSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE.url}/membresia#service`,
  name: "Membresía del canal PecinoGP",
  serviceType: "Membresía de canal de YouTube",
  description:
    "Membresía de pago del canal de MotoGP PecinoGP, con directos exclusivos post-carrera, acceso anticipado a vídeos, porra por Gran Premio y comunidad privada.",
  url: `${SITE.url}/membresia`,
  provider: { "@id": `${SITE.url}/#organization` },
  areaServed: "ES",
  // Mientras no esté abierta no se declaran ofertas: anunciar precios como
  // disponibles cuando no se pueden comprar es una afirmación falsa en los
  // datos estructurados y Google penaliza esa discrepancia.
  ...(MEMBERSHIP_LIVE
    ? {
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          lowPrice: "3.99",
          highPrice: "24.99",
          offerCount: TIERS.length,
          offers: TIERS.map((tier) => ({
            "@type": "Offer",
            name: `Nivel ${tier.name}`,
            description: tier.benefits.join(". "),
            price: tier.price.replace(",", "."),
            priceCurrency: "EUR",
            url: SITE.membershipUrl,
            availability: "https://schema.org/InStock",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: tier.price.replace(",", "."),
              priceCurrency: "EUR",
              unitText: "MES",
              billingDuration: 1,
              billingIncrement: 1,
            },
          })),
        },
      }
    : {}),
};

/** Antes de abrir, el aviso lleva al canal para activar la campana. */
const NOTIFY_URL = SITE.social.youtube;

export default function MembresiaPage() {
  return (
    <div className="min-h-screen bg-black text-foreground overflow-x-hidden selection:bg-red-600 selection:text-white">
      <JsonLd data={faqSchema} />
      <JsonLd data={membershipSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Membresía", path: "/membresia" },
        ])}
      />

      <Header />

      <main>
        {/* --- HERO --- */}
        <section className="relative py-20 md:py-40 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 scale-110">
            <Image
              src="/hero-stats-bg.png"
              alt="Aficionados de MotoGP siguiendo un Gran Premio"
              fill
              className="object-cover opacity-25 grayscale saturate-0"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent" />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-8 h-1 bg-red-600 rounded-full" />
              <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px]">
                {MEMBERSHIP_LIVE ? "Membresía del canal" : "Muy pronto"}
              </span>
            </div>

            <SplitHeadline
              className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white italic tracking-tighter leading-[0.85] mb-8"
              style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.8))" }}
            >
              MEMBRESÍA <br />
              <span className="text-red-600">PECINOGP</span>
            </SplitHeadline>

            <HeroUnderline />

            <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-medium italic mb-10">
              {MEMBERSHIP_LIVE
                ? "Directos exclusivos tras cada carrera, acceso anticipado a los vídeos y una comunidad de MotoGP que decide contigo. Desde 3,99 € al mes."
                : "Directos exclusivos tras cada carrera, acceso anticipado a los vídeos y una comunidad de MotoGP que decide contigo. Estamos ultimando los detalles."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Magnetic className="w-full sm:w-auto">
                <TrackedLink
                  event="membership_cta_click"
                  eventParams={{
                    location: "hero",
                    variant: MEMBERSHIP_LIVE ? "join" : "notify",
                  }}
                  href={MEMBERSHIP_LIVE ? SITE.membershipUrl : NOTIFY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex w-full items-center justify-center bg-gradient-to-r from-red-600 to-red-700 text-white font-black py-4 md:py-5 px-10 rounded-2xl text-lg overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_60px_rgba(220,38,38,0.6)] border border-white/10"
                >
                  <span className="relative z-10 flex items-center gap-3 italic tracking-tighter uppercase">
                    {MEMBERSHIP_LIVE ? (
                      <>
                        <Youtube size={22} /> Hazte miembro
                      </>
                    ) : (
                      <>
                        <Bell size={20} /> Avísame cuando abra
                      </>
                    )}
                  </span>
                </TrackedLink>
              </Magnetic>

              <Link
                href="#niveles"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white font-bold italic uppercase tracking-widest text-sm transition-colors"
              >
                Ver los niveles <ArrowUpRight size={16} />
              </Link>
            </div>

            {!MEMBERSHIP_LIVE && (
              <p className="mt-6 text-xs text-white/40 max-w-md mx-auto leading-relaxed">
                Suscríbete al canal y activa la campana: la apertura se anuncia
                allí primero.
              </p>
            )}
          </div>
        </section>

        {/* --- QUÉ ES --- */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />

          <div className="max-w-3xl mx-auto">
            <Reveal y={40} className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter leading-tight">
                Qué es la membresía de{" "}
                <span className="text-red-600">PecinoGP</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                La membresía es la forma de apoyar directamente el canal de
                MotoGP de <strong className="text-white">Manuel Pecino</strong>{" "}
                y, a cambio, entrar en la parte del proyecto que no es pública:
                los directos que se hacen justo después de cada Gran Premio, los
                vídeos antes de que salgan y el grupo donde se decide qué se
                analiza a continuación.
              </p>
              <p className="text-white/70 text-lg leading-relaxed">
                Se gestiona desde el propio canal de YouTube, con tres niveles
                de precio y ventajas acumulativas. Los análisis públicos de cada
                carrera seguirán siendo gratuitos: la membresía añade acceso,
                cercanía y comunidad.
              </p>
              {!MEMBERSHIP_LIVE && (
                <p className="text-white/50 text-base leading-relaxed border-l-2 border-red-600/50 pl-5">
                  Todavía no está abierta. Preferimos estrenarla con el
                  contenido exclusivo ya grabado, para que quien entre el primer
                  día se encuentre algo dentro y no una promesa.
                </p>
              )}
            </Reveal>
          </div>
        </section>

        {/* --- NIVELES --- */}
        <section
          id="niveles"
          className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative scroll-mt-32"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-8 h-1 bg-red-600 rounded-full" />
                <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px]">
                  Tres niveles
                </span>
              </div>
              <MaskReveal className="text-4xl md:text-6xl font-black text-white italic tracking-tighter">
                {MEMBERSHIP_LIVE ? (
                  <>
                    ELIGE TU <span className="text-red-600">NIVEL</span>
                  </>
                ) : (
                  <>
                    ESTO ES LO QUE <span className="text-red-600">VIENE</span>
                  </>
                )}
              </MaskReveal>
            </div>

            <Reveal
              stagger={0.12}
              y={50}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"
            >
              {TIERS.map((tier) => {
                const Icon = tier.icon;
                return (
                  /* Borde de gradiente cónico giratorio + foco que sigue al
                     ratón: el nivel destacado gira más rápido y más brillante. */
                  <GlowCard
                    key={tier.name}
                    intensity={tier.featured ? "strong" : "soft"}
                    className="h-full"
                  >
                    <article
                      className={`relative flex flex-col h-full rounded-[28px] p-8 backdrop-blur-xl transition-colors ${
                        tier.featured
                          ? "bg-gradient-to-b from-red-600/10 to-white/[0.02] shadow-[0_0_50px_rgba(220,38,38,0.15)]"
                          : "bg-white/[0.03]"
                      }`}
                    >
                      {tier.featured && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-red-600 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                          El nivel principal
                        </span>
                      )}

                      <div className="mb-6 inline-flex w-fit rounded-2xl border border-red-600/20 bg-red-600/10 p-3 text-red-500">
                        <Icon size={24} />
                      </div>

                      <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">
                        {tier.name}
                      </h3>
                      <p className="mt-1 text-sm italic text-white/50">
                        {tier.tagline}
                      </p>

                      <p className="mt-6 flex items-baseline gap-1">
                        <span className="text-5xl font-black italic tracking-tighter text-white">
                          {tier.price}
                          <span className="text-2xl"> €</span>
                        </span>
                        <span className="text-sm font-bold text-white/40">
                          /mes
                        </span>
                      </p>

                      <ul className="mt-8 flex-1 space-y-3">
                        {tier.benefits.map((benefit) => (
                          <li
                            key={benefit}
                            className="flex items-start gap-3 text-sm leading-relaxed text-white/70"
                          >
                            <Check
                              size={16}
                              className="mt-0.5 shrink-0 text-red-500"
                              aria-hidden
                            />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>

                      {MEMBERSHIP_LIVE ? (
                        <TrackedLink
                          event="membership_cta_click"
                          eventParams={{ location: "pricing", tier: tier.name }}
                          href={SITE.membershipUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-black uppercase italic tracking-widest transition-all duration-300 active:scale-95 ${
                            tier.featured
                              ? "bg-red-600 text-white hover:bg-red-500"
                              : "border border-white/15 bg-white/5 text-white hover:border-red-600/50 hover:bg-red-600/10"
                          }`}
                        >
                          Unirme a {tier.name} <ArrowUpRight size={16} />
                        </TrackedLink>
                      ) : (
                        /* Sin alta todavía: se marca el estado en vez de dejar un
                         botón que no lleva a ninguna parte. */
                        <p
                          className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed px-6 py-4 text-sm font-black uppercase italic tracking-widest ${
                            tier.featured
                              ? "border-red-600/50 text-red-400"
                              : "border-white/15 text-white/40"
                          }`}
                        >
                          Disponible muy pronto
                        </p>
                      )}
                    </article>
                  </GlowCard>
                );
              })}
            </Reveal>

            <p className="mt-10 text-center text-xs text-white/40">
              {MEMBERSHIP_LIVE
                ? "El alta, el cobro y la cancelación se gestionan desde YouTube. Sin permanencia: puedes cancelar cuando quieras."
                : "Niveles y precios previstos, pendientes de la aprobación de YouTube. El alta, el cobro y la cancelación se gestionarán desde YouTube, sin permanencia."}
            </p>
          </div>
        </section>

        {/* --- CÓMO FUNCIONA --- */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />

          <div className="max-w-5xl mx-auto">
            <h2 className="mb-12 text-center text-4xl md:text-5xl font-black text-white italic tracking-tighter">
              CÓMO <span className="text-red-600">FUNCIONARÁ</span>
            </h2>

            <Reveal
              stagger={0.12}
              y={40}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {STEPS.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <span className="text-5xl font-black italic tracking-tighter text-red-600/40">
                    0{index + 1}
                  </span>
                  <h3 className="mt-3 text-lg font-black uppercase italic tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {step.description}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* --- FAQ --- */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />

          <div className="max-w-3xl mx-auto">
            <h2 className="mb-12 text-center text-4xl md:text-5xl font-black text-white italic tracking-tighter">
              PREGUNTAS <span className="text-red-600">FRECUENTES</span>
            </h2>

            {/* <details> nativo: el texto de las respuestas está siempre en el
                HTML (lo lee Google aunque el bloque esté plegado) y funciona
                sin JavaScript. */}
            <div className="space-y-3">
              {FAQ.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 transition-colors open:border-red-600/30 hover:border-white/20"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-white marker:hidden">
                    <h3 className="text-base font-bold">{item.question}</h3>
                    <span className="shrink-0 text-red-500 transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-white/65">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA FINAL --- */}
        <section className="px-4 sm:px-6 lg:px-8 pb-24 pt-8">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-10 md:p-16 text-center">
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-red-600/20 blur-[120px]" />

              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-[0.9] mb-6">
                  {MEMBERSHIP_LIVE ? (
                    <>
                      NOS VEMOS <span className="text-red-600">DENTRO</span>
                    </>
                  ) : (
                    <>
                      NO TE LO <span className="text-red-600">PIERDAS</span>
                    </>
                  )}
                </h2>
                <p className="mx-auto mb-10 max-w-xl text-white/60 text-base md:text-lg leading-relaxed">
                  {MEMBERSHIP_LIVE
                    ? "El próximo directo post-carrera es solo para miembros. Únete antes del siguiente Gran Premio y no te lo pierdas."
                    : "La apertura se anuncia primero en el canal. Suscríbete y activa la campana para enterarte el mismo día, antes del primer directo post-carrera."}
                </p>

                <Magnetic className="inline-block">
                  <TrackedLink
                    event="membership_cta_click"
                    eventParams={{
                      location: "footer_cta",
                      variant: MEMBERSHIP_LIVE ? "join" : "notify",
                    }}
                    href={MEMBERSHIP_LIVE ? SITE.membershipUrl : NOTIFY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-r from-red-600 to-red-700 px-10 py-5 text-lg font-black uppercase italic tracking-tighter text-white shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(220,38,38,0.6)] active:scale-95"
                  >
                    <Youtube size={22} />
                    {MEMBERSHIP_LIVE
                      ? "Hazte miembro en YouTube"
                      : "Ir al canal y activar la campana"}
                  </TrackedLink>
                </Magnetic>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
