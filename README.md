# PecinoGP — Web

> **PASIÓN AL LÍMITE.** Plataforma de análisis, directos y cobertura de MotoGP de [PecinoGP](https://pecinogp.es).

Web oficial de PecinoGP: análisis técnicos, vídeos post-carrera, calendario, clasificaciones en directo y una zona de comunidad ("El Paddock"). Construida con Next.js (App Router) y un fuerte foco en animación y experiencia de scroll.

🔗 **Producción:** [pecinogp.es](https://pecinogp.es)

---

## ✨ Características

- **Integración con YouTube** — estadísticas del canal, último vídeo, destacados y detección de **directos en tiempo real** vía YouTube Data API v3 (con rotación de varias API keys para no agotar cuota).
- **Calendario y clasificaciones** de MotoGP / Moto2 / Moto3 (temporadas 2025–2026).
- **El Paddock** — encuestas y preguntas/debate de la comunidad, persistidos en base de datos.
- **Animación de alto nivel** — scroll suave con inercia (Lenis), hero cinematográfico con _pin + scrub_ y titulares que se ensamblan letra a letra (GSAP + SplitText), reveals al hacer scroll. Todo respeta `prefers-reduced-motion`.
- **Caché de APIs** propio para reducir el consumo de cuota de las APIs externas.

---

## 🛠️ Stack

| Área               | Tecnología                                                                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework          | [Next.js 16](https://nextjs.org) (App Router) + React 19                                                                                           |
| Lenguaje           | TypeScript                                                                                                                                         |
| Estilos            | Tailwind CSS 4 + componentes [shadcn/ui](https://ui.shadcn.com) (Radix UI)                                                                         |
| Animación          | [GSAP](https://gsap.com) (ScrollTrigger + SplitText), [Framer Motion](https://www.framer.com/motion/), [Lenis](https://lenis.darkroom.engineering) |
| Datos              | YouTube Data API v3, [Neon](https://neon.tech) (Postgres serverless)                                                                               |
| Gestor de paquetes | **pnpm**                                                                                                                                           |
| Despliegue         | [Vercel](https://vercel.com)                                                                                                                       |

---

## 🚀 Puesta en marcha en local

### Requisitos

- [Node.js](https://nodejs.org) 20+
- [pnpm](https://pnpm.io) 10+ (`npm install -g pnpm`)

> ⚠️ **Este proyecto usa pnpm.** No instales dependencias con `npm`/`yarn`: desincronizarías `pnpm-lock.yaml` y el build de Vercel fallaría (`ERR_PNPM_OUTDATED_LOCKFILE`).

### 1. Clonar e instalar

```bash
git clone https://github.com/rafapecino/PecinoGP_Web.git
cd PecinoGP_Web
pnpm install
```

### 2. Variables de entorno

Crea un archivo `.env.local` en la raíz:

```bash
# --- YouTube Data API v3 ---
# Obtén tus claves en https://console.cloud.google.com (YouTube Data API v3)
YOUTUBE_API_KEY=tu_api_key
YOUTUBE_CHANNEL_ID=tu_channel_id

# (Opcional) Claves adicionales para rotación cuando se agota la cuota diaria
YOUTUBE_API_KEY_2=
YOUTUBE_API_KEY_3=

# --- Base de datos (El Paddock: encuestas y preguntas) ---
# Cadena de conexión Postgres de Neon
DATABASE_URL=postgres://usuario:password@host/db?sslmode=require
```

> Las variables también se aceptan con el prefijo `NEXT_PUBLIC_` (p. ej. `NEXT_PUBLIC_YOUTUBE_API_KEY`), pero se recomienda la versión **sin prefijo** para no exponer las claves en el cliente.

### 3. Arrancar

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

---

## 📜 Scripts

| Comando      | Descripción                        |
| ------------ | ---------------------------------- |
| `pnpm dev`   | Servidor de desarrollo (HMR)       |
| `pnpm build` | Build de producción (`next build`) |
| `pnpm start` | Sirve el build de producción       |
| `pnpm lint`  | ESLint                             |

---

## 📁 Estructura

```
PecinoGP_Web/
├── app/                    # Rutas (App Router)
│   ├── page.tsx            # Home (hero cinematográfico, último análisis, destacados)
│   ├── analisis-gp/        # Vídeos GP (archivo)
│   ├── calendario/         # Calendario de la temporada
│   ├── clasificacion/      # Clasificaciones (MotoGP/Moto2/Moto3)
│   ├── el-paddock/         # Comunidad: encuestas y Q&A
│   ├── contacto/           # Formulario de contacto / colaboraciones
│   ├── sobre-nosotros/     # Acerca de
│   └── api/                # Route handlers (youtube, live, polls, questions, vote, standings)
├── All/components/         # Componentes de UI y de animación
│   ├── smooth-scroll.tsx   # Lenis + sincronización con el ticker de GSAP
│   ├── split-headline.tsx  # Titular que se ensambla letra a letra (SplitText)
│   ├── reveal.tsx          # Reveal genérico al hacer scroll (ScrollTrigger)
│   └── ...
├── lib/                    # Lógica de datos y utilidades
│   ├── youtube-service.ts  # Cliente de la YouTube Data API
│   ├── api-cache.ts        # Caché en disco de respuestas de APIs
│   └── ...
└── public/                 # Imágenes y estáticos
```

---

## ☁️ Despliegue (Vercel)

El proyecto se despliega automáticamente en Vercel con cada push a `main`.

Configura las mismas variables de entorno (`YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID`, `DATABASE_URL`, …) en **Vercel → Project → Settings → Environment Variables**.

**Notas para entornos serverless:**

- El sistema de archivos de las funciones de Vercel es de **solo lectura** salvo `/tmp`. La caché de APIs (`lib/api-cache.ts`) escribe en `os.tmpdir()` por ese motivo; si el FS no fuese escribible, degrada sola y sirve sin caché.
- Mantén `pnpm-lock.yaml` sincronizado con `package.json` (instala siempre con `pnpm`).

---

## 📝 Licencia

Proyecto privado. © PecinoGP — MPC Network S.L. Todos los derechos reservados.
