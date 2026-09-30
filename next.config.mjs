/**
 * Cabeceras de seguridad aplicadas a todas las respuestas.
 *
 * Antes la web solo enviaba HSTS (que lo pone Vercel). Sin estas cabeceras el
 * sitio se podía incrustar en un iframe ajeno para engañar a los visitantes
 * (clickjacking) y el navegador no tenía ninguna instrucción sobre de dónde
 * puede cargar scripts.
 *
 * Nota sobre la CSP: Next y GSAP necesitan 'unsafe-inline' y 'unsafe-eval'
 * para hidratar y animar, así que la política no es todo lo estricta que
 * podría ser. Aun así acota los dominios permitidos, que es lo que corta la
 * inyección de scripts de terceros.
 */
/**
 * Dominios que necesita Google AdSense para servir los anuncios automáticos.
 *
 * Se listan aparte porque son muchos y porque conviene ver de un vistazo qué
 * se ha abierto por publicidad y qué estaba abierto de antes. Con una CSP que
 * solo dejase pasar `pagead2` los anuncios no llegan a pintarse: el script
 * carga, pero luego pide las creatividades a `tpc.googlesyndication.com`,
 * abre los iframes en `doubleclick.net` y manda las señales antifraude a
 * `adtrafficquality.google`. Si falta cualquiera de los tres, el hueco se
 * queda en blanco.
 */
/**
 * Puntos de entrada del antifraude de Google (sodar). AdSense los usa desde
 * cuatro sitios a la vez: carga el script, lo enmarca, le abre una conexión y
 * remata con una imagen de seguimiento. Si falta en cualquiera de las cuatro
 * directivas, la consola se llena de errores de CSP.
 */
const adTrafficQuality = [
  "https://ep1.adtrafficquality.google",
  "https://ep2.adtrafficquality.google",
];

const adsense = {
  script: [
    "https://pagead2.googlesyndication.com",
    "https://tpc.googlesyndication.com",
    "https://partner.googleadservices.com",
    "https://adservice.google.com",
    "https://www.googletagservices.com",
    // Mensajes de consentimiento y verificación de propiedad de AdSense.
    "https://fundingchoicesmessages.google.com",
    ...adTrafficQuality,
  ],
  img: [
    "https://pagead2.googlesyndication.com",
    "https://tpc.googlesyndication.com",
    "https://googleads.g.doubleclick.net",
    "https://www.google.com",
    "https://www.gstatic.com",
    ...adTrafficQuality,
  ],
  connect: [
    "https://pagead2.googlesyndication.com",
    "https://googleads.g.doubleclick.net",
    "https://tpc.googlesyndication.com",
    "https://csi.gstatic.com",
    ...adTrafficQuality,
  ],
  frame: [
    // AdSense se enmarca a sí mismo aquí antes de pasar a doubleclick.
    "https://pagead2.googlesyndication.com",
    "https://googleads.g.doubleclick.net",
    "https://tpc.googlesyndication.com",
    "https://www.google.com",
    ...adTrafficQuality,
  ],
};

/** Une fuentes quitando duplicados, para que la cabecera no crezca sola. */
const sources = (...groups) => [...new Set(groups.flat())].join(" ");

const csp = [
  "default-src 'self'",
  // Google Analytics, AdSense y el reproductor de YouTube.
  `script-src ${sources(
    ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    ["https://www.googletagmanager.com", "https://www.google-analytics.com"],
    ["https://www.youtube.com", "https://s.ytimg.com"],
    ["https://vercel.live", "https://va.vercel-scripts.com"],
    adsense.script,
  )}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  `img-src ${sources(
    ["'self'", "data:", "blob:"],
    ["https://i.ytimg.com", "https://yt3.ggpht.com", "https://flagcdn.com"],
    ["https://*.googleusercontent.com", "https://www.google-analytics.com"],
    adsense.img,
  )}`,
  `connect-src ${sources(
    ["'self'"],
    ["https://www.google-analytics.com", "https://*.google-analytics.com"],
    ["https://vitals.vercel-insights.com", "https://va.vercel-scripts.com"],
    adsense.connect,
  )}`,
  `frame-src ${sources(
    ["https://www.youtube.com", "https://www.youtube-nocookie.com"],
    ["https://vercel.live"],
    adsense.frame,
  )}`,
  // Nadie puede meter esta web dentro de un iframe suyo.
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // No anunciamos la versión del framework: es información gratis para quien
  // busca objetivos con una vulnerabilidad concreta.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
