# NEXUS Dev — Sitio web corporativo

Sitio institucional de **NEXUS Dev**, construido con Next.js 15 (App Router),
TypeScript, Tailwind CSS y Framer Motion. Dark mode premium, cursor
personalizado, animaciones al scroll, trilingüe (ES/EN/PT) y una demo
interactiva en el Hero que simula el motor de automatización de la empresa
en tiempo real.

## Estructura de marca

El sitio refleja una estructura de "casa de marcas":

```
NEXUS
├── Nexus Webs   → diseño y desarrollo web para clientes (ej. Yasí Travel)
├── Nexus Gym    → producto propio, SaaS de gestión para gimnasios
└── Nexus Secure → producto propio, videovigilancia con IA
```

- **Productos propios** (`t.products` en `lib/i18n/translations.ts`):
  sistemas que NEXUS Dev desarrolla y mantiene — hoy Nexus Gym y Nexus Secure.
- **Nexus Webs** (`t.nexusWebs`): proyectos de desarrollo web hechos para
  clientes. Hoy solo tiene a Yasí Travel — es el array donde agregar futuros
  clientes (por ejemplo, si sumás "Bricars Customlook" con datos reales del
  proyecto — todavía no tengo el detalle de ese proyecto para incluirlo).

Para agregar un nuevo cliente de Nexus Webs: sumá un objeto en el array
`nexusWebs.items` de cada idioma en `lib/i18n/translations.ts`, y su
metadata visual (ícono, color, link) en `WEBS_META` dentro de
`components/Projects.tsx`.

## Estructura del proyecto

```
nexus-dev/
├── app/
│   ├── layout.tsx           # Layout raíz, fuentes, SEO, JSON-LD, hreflang
│   ├── page.tsx              # Ensambla todas las secciones
│   ├── globals.css           # Estilos base, cursor, marquee, skip-link
│   ├── robots.ts             # robots.txt generado
│   ├── sitemap.ts            # sitemap.xml generado
│   └── api/
│       └── contact/route.ts  # Envío real de emails (Resend) + anti-spam
├── components/
│   ├── Navbar.tsx / Footer.tsx
│   ├── Hero.tsx / About.tsx / Services.tsx / Process.tsx / Team.tsx
│   ├── Projects.tsx           # Productos propios + Nexus Webs
│   ├── BrandTree.tsx          # Diagrama NEXUS → Webs/Gym/Secure
│   ├── ProjectModal.tsx       # Caso de estudio al hacer click
│   ├── TechStack.tsx / FAQ.tsx / Contact.tsx
│   ├── InteractiveDemo.tsx    # Pipeline animado + chat simulado
│   ├── LoadingScreen.tsx      # Splash inicial con la marca
│   ├── LanguageSwitcher.tsx   # Selector ES/EN/PT
│   ├── CustomCursor.tsx / ParticleField.tsx / TiltCard.tsx / MagneticButton.tsx
│   └── ScrollProgress.tsx / SectionTag.tsx / Counter.tsx
├── lib/
│   ├── constants.ts           # WhatsApp, email, GitHub, ubicación
│   └── i18n/
│       ├── translations.ts    # Diccionario completo ES/EN/PT
│       └── LanguageContext.tsx
├── public/
│   ├── logo-full.png / logo-full-dark.png   # Wordmark (claro/oscuro)
│   ├── favicon.png / apple-touch-icon.png / icon-192.png / icon-512.png
│   └── manifest.json
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## 1. Instalación

Requisitos: **Node.js 18.18+** (recomendado 20 LTS) y npm.

```bash
cd nexus-dev
npm install
```

### Variables de entorno

El formulario de contacto envía el email real a través de [Resend](https://resend.com)
(tiene plan gratuito). Creá un archivo `.env.local` en la raíz con:

```
RESEND_API_KEY=tu_api_key_de_resend
```

Sin esta variable, el formulario responde con un error controlado en vez de
fallar en silencio — no vas a perder ningún mensaje sin darte cuenta.

## 2. Desarrollo local

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## 3. Build de producción

```bash
npm run build
npm run start
```

## 4. Deploy en Vercel

**Opción A — CLI:**

```bash
npm i -g vercel
vercel
```

**Opción B — Dashboard:**

1. Subí el proyecto a un repositorio de GitHub/GitLab/Bitbucket.
2. Entrá a [vercel.com/new](https://vercel.com/new) e importá el repo.
3. Agregá la variable de entorno `RESEND_API_KEY` en **Project Settings →
   Environment Variables**.
4. Deploy. Vercel detecta Next.js automáticamente.

## Idiomas (ES / EN / PT)

Todo el contenido visible vive en `lib/i18n/translations.ts`, un diccionario
por idioma. El selector en el navbar guarda la preferencia en
`localStorage` y detecta el idioma del navegador la primera vez. Para
editar un texto, buscá la clave correspondiente en las tres secciones
(`es`, `en`, `pt`) del archivo.

**Lo que NO está traducido todavía** (queda en español, ya que son datos
reales/demo, no contenido de marketing): los mensajes de ejemplo dentro del
chat interactivo del Hero para los rubros no cubiertos por sus 5 categorías
de palabras clave, y los nombres propios de proyectos y tecnologías (Yasí
Travel, PHP, n8n, etc. — no se traducen, son nombres propios).

## Anti-spam del formulario de contacto

`app/api/contact/route.ts` incluye tres capas básicas:
- **Honeypot**: un campo oculto (`company_website`) que solo un bot llenaría.
- **Time-trap**: rechaza envíos hechos en menos de 2 segundos desde que se
  renderizó el formulario.
- **Rate limit**: máximo 5 envíos por minuto por IP (en memoria — se resetea
  si la función serverless se reinicia; para un límite más estricto en alto
  tráfico, migrar a Upstash Redis o Vercel KV).

## Personalización rápida

- **WhatsApp / email de contacto:** editar `lib/constants.ts`.
- **Colores:** editar los tokens `nexus.*` en `tailwind.config.ts`.
- **Dominio en metadata/SEO:** reemplazar `https://nexusdev.com.ar` en
  `app/layout.tsx`, `app/robots.ts` y `app/sitemap.ts` por el dominio real.
- **Textos y traducciones:** todo vive en `lib/i18n/translations.ts`.
- **Productos y proyectos:** editar `t.products` / `t.nexusWebs` en
  `translations.ts`, y su metadata visual en `components/Projects.tsx`.

## Notas de diseño

- Paleta: negro profundo `#07080a`, superficie `#0c0e11`, acento primario
  verde neón `#00ff9d` (tomado del isotipo), cian `#00d9ff` y púrpura
  `#a855f7` como acentos secundarios en glows y gradientes de botones.
- Tipografía: **Space Grotesk** (títulos), **Inter** (cuerpo), **JetBrains
  Mono** (labels, datos, terminal).
- El divisor con la franja diagonal (`.slash-divider` en `globals.css`)
  reutiliza el lenguaje visual del isotipo de NEXUS en vez de separadores
  genéricos.
- El marquee de tecnologías usa clases CSS dedicadas (no `style` inline)
  para que la pausa en hover y el modo "reducir movimiento" del sistema
  operativo no lo dejen congelado.
- Cursor personalizado, partículas y animaciones respetan
  `prefers-reduced-motion` (con la excepción intencional del marquee) y se
  desactivan automáticamente en dispositivos táctiles.
- Accesibilidad: skip-link al contenido principal, `aria-live` en el estado
  del formulario, contraste de texto ajustado a AA, `lang` del documento
  sincronizado con el idioma elegido.
