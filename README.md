# NEXUS Dev — Sitio web corporativo

Sitio institucional de **NEXUS Dev**, construido con Next.js 15 (App Router),
TypeScript, Tailwind CSS y Framer Motion. Dark mode premium, cursor
personalizado, animaciones al scroll y una terminal animada en el Hero que
simula el motor de automatización de la empresa en tiempo real.

## Estructura del proyecto

```
nexus-dev/
├── app/
│   ├── layout.tsx        # Layout raíz, fuentes, SEO y JSON-LD
│   ├── page.tsx           # Ensambla todas las secciones
│   ├── globals.css        # Estilos base, cursor, divisores de firma
│   ├── robots.ts          # robots.txt generado
│   └── sitemap.ts         # sitemap.xml generado
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Projects.tsx
│   ├── Team.tsx
│   ├── TechStack.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── WhatsAppFloat.tsx
│   ├── CustomCursor.tsx
│   └── SectionTag.tsx
├── lib/
│   └── constants.ts        # Número de WhatsApp, email, etc.
├── public/
│   ├── logo-icon.png        # Isotipo (X)
│   └── logo-full.png        # Logo completo (NEXUS wordmark)
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
3. Vercel detecta Next.js automáticamente — no hace falta configurar nada.
4. Deploy.

No requiere variables de entorno para funcionar tal como está. Si conectás
el formulario de contacto a un servicio real (Resend, SendGrid, una API
propia, etc.), agregá esas claves en **Project Settings → Environment
Variables** en Vercel.

## Personalización rápida

- **WhatsApp / email de contacto:** editar `lib/constants.ts`.
- **Colores:** editar los tokens `nexus.*` en `tailwind.config.ts`.
- **Dominio en metadata/SEO:** reemplazar `https://nexusdev.com.ar` en
  `app/layout.tsx`, `app/robots.ts` y `app/sitemap.ts` por el dominio real.
- **Formulario de contacto:** `components/Contact.tsx` simula el envío;
  conectalo a una API route (`app/api/contact/route.ts`) o a un servicio de
  email cuando tengas el proveedor definido.
- **Proyectos:** editar el array `PROJECTS` en `components/Projects.tsx`.

## Notas de diseño

- Paleta: negro profundo `#050505`, superficie `#0a0c0a`, acento primario
  verde neón `#00ff9d` (tomado del isotipo), cian `#00d9ff` y púrpura
  `#a855f7` como acentos secundarios en glows.
- Tipografía: **Space Grotesk** (títulos), **Inter** (cuerpo), **JetBrains
  Mono** (labels, datos, terminal).
- El divisor con la franja diagonal (`.slash-divider` en `globals.css`)
  reutiliza el lenguaje visual del isotipo de NEXUS en vez de separadores
  genéricos.
- Cursor personalizado y animaciones respetan `prefers-reduced-motion` y
  se desactivan automáticamente en dispositivos táctiles.
