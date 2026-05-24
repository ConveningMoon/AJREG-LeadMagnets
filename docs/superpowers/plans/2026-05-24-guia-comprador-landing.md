# Guía del Comprador Hispano — Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, statically-generated Next.js 15 landing page for A&J Real Estate Group's "Guía del Comprador Hispano" lead magnet that captures leads via a 6-step animated quiz and submits them to the ITMANO CRM via intake.js.

**Architecture:** App Router with no server-side data fetching — all sections render statically, all interactivity is client-side. Framer Motion drives animations with mandatory prefers-reduced-motion support. ITMANO lead capture calls `window.itmano.submit()` (exposed by intake.js loaded via next/script) with a direct fetch fallback.

**Tech Stack:** Next.js 15, TypeScript (strict), Tailwind CSS v4 (@theme tokens), Framer Motion, next/font/google (EB Garamond + Montserrat), next/image, next/script, lucide-react

---

## Pre-existing Assets

Two real image files already exist in `E:\A&J\LM\LM1\`:
- `lead_magnet_mockup_v1.webp` → copy to `public/images/guide-cover.webp`
- `LM_Adriana_Hero_Portrait.webp` → copy to `public/images/adriana.webp`

Handle these in Task 11 (Asset Setup).

---

## File Map

```
LM1/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, intake.js Script
│   ├── page.tsx                # Page: assembles all sections in order
│   └── globals.css             # @import "tailwindcss" + @theme design tokens
├── components/
│   ├── sections/
│   │   ├── Hero.tsx            # Hero: eyebrow, headline, CTA, floating guide cover
│   │   ├── AgentIntro.tsx      # Adriana: photo, name, credential, bio placeholders
│   │   ├── Benefits.tsx        # 6-card "Lo que aprenderás" grid with stagger reveal
│   │   ├── Testimonials.tsx    # 3 testimonial cards (placeholder structure)
│   │   ├── QuizSection.tsx     # Quiz heading wrapper + Quiz component
│   │   └── Footer.tsx          # Nav, contact, social, copyright
│   ├── quiz/
│   │   ├── Quiz.tsx            # Main quiz: step state machine + AnimatePresence
│   │   ├── QuizProgress.tsx    # Animated gold progress bar
│   │   ├── QuizOption.tsx      # Selectable MC option card
│   │   ├── QuizContactForm.tsx # Step 6: contact fields + honeypot
│   │   ├── QuizSuccess.tsx     # Post-submit success state
│   │   └── QuizError.tsx       # Post-submit error state
│   └── ui/
│       ├── Button.tsx          # Reusable button (primary/secondary)
│       ├── SectionWrapper.tsx  # Section padding + whileInView scroll-reveal
│       └── ImagePlaceholder.tsx # Cream bg placeholder for missing assets
├── lib/
│   ├── fonts.ts                # next/font/google config (EB Garamond + Montserrat)
│   ├── quiz-data.ts            # QUIZ_QUESTIONS array + QuizAnswers type
│   └── itmano.ts               # submitLead(): window.itmano + fetch fallback
├── types/
│   └── itmano.d.ts             # Window.itmano global type declaration
├── public/
│   └── images/
│       ├── guide-cover.webp    ← lead_magnet_mockup_v1.webp (rename)
│       ├── adriana.webp        ← LM_Adriana_Hero_Portrait.webp (rename)
│       ├── logo-white.png      (user provides)
│       ├── logo-dark.png       (user provides)
│       ├── og-image.jpg        (user provides — 1200×630)
│       └── testimonials/
│           ├── 1.webp          (user provides)
│           ├── 2.webp          (user provides)
│           └── 3.webp          (user provides)
├── .env.local                  (gitignored)
├── .env.example
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── prettier.config.mjs
└── README.md
```

---

### Task 1: Project Bootstrap

**Files:**
- Create: `package.json` (via create-next-app)
- Create: `postcss.config.mjs`
- Create: `.env.example`, `.env.local`
- Modify: `tsconfig.json` (add noUncheckedIndexedAccess)
- Create: `prettier.config.mjs`

- [ ] **Step 1: Initialize Next.js 15 in current directory**

Run in `E:\A&J\LM\LM1` (the directory has existing .webp files — create-next-app accepts non-empty dirs):
```powershell
npx create-next-app@latest . --typescript --eslint --app --no-src-dir --import-alias "@/*" --no-tailwind
```
When prompted: Yes to all defaults. Skip `--tailwind` — we install v4 manually next.

Expected: app/, public/, next.config.ts, tsconfig.json scaffolded.

- [ ] **Step 2: Install runtime dependencies**

```bash
npm install tailwindcss @tailwindcss/postcss framer-motion lucide-react
```

- [ ] **Step 3: Install dev dependencies**

```bash
npm install -D prettier eslint-config-prettier
```

- [ ] **Step 4: Configure PostCSS for Tailwind v4**

Create `postcss.config.mjs`:
```js
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
export default config
```

- [ ] **Step 5: Harden TypeScript**

Open `tsconfig.json`. In `"compilerOptions"`, add if missing:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

- [ ] **Step 6: Configure Prettier**

Create `prettier.config.mjs`:
```js
/** @type {import('prettier').Config} */
const config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 100,
  tabWidth: 2,
}
export default config
```

- [ ] **Step 7: Create environment files**

Create `.env.example`:
```bash
NEXT_PUBLIC_ITMANO_BASE_URL=https://app.itmano.com
NEXT_PUBLIC_ITMANO_CHANNEL_ID=chn_xxxxx
```

Create `.env.local` (same — user fills in real channel ID):
```bash
NEXT_PUBLIC_ITMANO_BASE_URL=https://app.itmano.com
NEXT_PUBLIC_ITMANO_CHANNEL_ID=chn_xxxxx
```

Verify `.gitignore` already includes `.env.local` (create-next-app adds it).

- [ ] **Step 8: Verify initial compile**

```bash
npx tsc --noEmit
```
Expected: exits 0, no errors.

- [ ] **Step 9: Initial commit**

```bash
git add -A
git commit -m "feat: bootstrap Next.js 15 project with Tailwind v4 and deps"
```

---

### Task 2: Design System — Tokens, Fonts, Global CSS

**Files:**
- Create: `lib/fonts.ts`
- Replace: `app/globals.css`

- [ ] **Step 1: Create fonts module**

Create `lib/fonts.ts`:
```ts
import { EB_Garamond, Montserrat } from 'next/font/google'

export const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-garamond',
  display: 'swap',
})

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
})
```

- [ ] **Step 2: Replace globals.css with Tailwind v4 @theme tokens**

Replace the entire content of `app/globals.css`:
```css
@import "tailwindcss";

@theme {
  /* ── Colors ── */
  --color-navy:       #102037;
  --color-navy-light: #1a3457;
  --color-gold:       #c7a260;
  --color-cream:      #e9d8d0;
  --color-cream-dark: #ddc7bd;
  --color-base:       #faf8f6;

  /* ── Typography ── */
  --font-heading: var(--font-garamond);
  --font-body:    var(--font-montserrat);

  /* ── Border radius ── */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;

  /* ── Shadows ── */
  --shadow-card:       0 2px 16px 0 rgba(16, 32, 55, 0.08);
  --shadow-card-hover: 0 6px 24px 0 rgba(16, 32, 55, 0.14);
}

/* Base resets */
html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-base);
  color: var(--color-navy);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

/* Respect prefers-reduced-motion globally */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

The `--color-*` tokens auto-generate `bg-navy`, `text-gold`, `border-cream`, etc.
The `--font-*` tokens auto-generate `font-heading`, `font-body` utilities.
The `--shadow-*` tokens auto-generate `shadow-card`, `shadow-card-hover` utilities.

- [ ] **Step 3: Smoke-test Tailwind**

```bash
npm run dev
```
Open http://localhost:3000 in browser. Open DevTools → Elements → select `<html>`. In Computed styles, verify `--color-navy: #102037` is present. Stop server.

- [ ] **Step 4: Commit**

```bash
git add lib/fonts.ts app/globals.css
git commit -m "feat: add design system tokens and font variables"
```

---

### Task 3: UI Primitives

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/SectionWrapper.tsx`
- Create: `components/ui/ImagePlaceholder.tsx`

- [ ] **Step 1: Create Button**

Create `components/ui/Button.tsx`:
```tsx
'use client'
import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

export function Button({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md ' +
    'font-body font-medium text-base transition-colors duration-200 cursor-pointer ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ' +
    'disabled:opacity-60 disabled:cursor-not-allowed'

  const variants = {
    primary:   'bg-navy text-white hover:bg-navy-light',
    secondary: 'bg-transparent text-navy border-2 border-navy hover:bg-cream',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.button>
  )
}
```

- [ ] **Step 2: Create SectionWrapper**

Create `components/ui/SectionWrapper.tsx`:
```tsx
'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { type ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
}

export function SectionWrapper({ children, className = '', id }: SectionWrapperProps) {
  const pref = useReducedMotion()

  return (
    <motion.section
      id={id}
      className={`px-4 sm:px-6 lg:px-8 py-20 max-w-6xl mx-auto ${className}`}
      initial={pref ? {} : { opacity: 0, y: 20 }}
      whileInView={pref ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  )
}
```

- [ ] **Step 3: Create ImagePlaceholder**

Create `components/ui/ImagePlaceholder.tsx`:
```tsx
interface ImagePlaceholderProps {
  width: number
  height: number
  label?: string
  className?: string
}

export function ImagePlaceholder({
  width,
  height,
  label = 'Imagen',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center bg-cream rounded-md ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    >
      <span className="font-body text-xs text-cream-dark text-center px-3 leading-snug">
        {label}
      </span>
    </div>
  )
}
```

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: exits 0.

- [ ] **Step 5: Commit**

```bash
git add components/ui/
git commit -m "feat: add Button, SectionWrapper, ImagePlaceholder UI primitives"
```

---

### Task 4: Root Layout + Metadata + intake.js

**Files:**
- Replace: `app/layout.tsx`

- [ ] **Step 1: Write complete layout.tsx**

Replace `app/layout.tsx` entirely:
```tsx
import type { Metadata } from 'next'
import Script from 'next/script'
import { garamond, montserrat } from '@/lib/fonts'
import './globals.css'

const BASE_URL = process.env.NEXT_PUBLIC_ITMANO_BASE_URL ?? 'https://app.itmano.com'
const CHANNEL_ID = process.env.NEXT_PUBLIC_ITMANO_CHANNEL_ID ?? ''

export const metadata: Metadata = {
  title: 'Guía del Comprador Hispano — A&J Real Estate Group',
  description:
    'Descarga gratis nuestra Guía del Comprador Hispano y descubre el proceso paso a paso ' +
    'que han seguido cientos de familias para comprar su casa en Hampton Roads sin sorpresas.',
  keywords: ['comprar casa Hampton Roads', 'guía comprador hispano', 'bienes raíces Virginia'],
  authors: [{ name: 'A&J Real Estate Group' }],
  openGraph: {
    title: 'Guía del Comprador Hispano — A&J Real Estate Group',
    description:
      'El proceso paso a paso para comprar tu casa en Hampton Roads con total confianza.',
    url: 'https://lm.ajrealestateva.com',
    siteName: 'A&J Real Estate Group',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Guía del Comprador Hispano' }],
    locale: 'es_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guía del Comprador Hispano — A&J Real Estate Group',
    description: 'El proceso paso a paso para comprar tu casa en Hampton Roads con total confianza.',
    images: ['/images/og-image.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${garamond.variable} ${montserrat.variable}`}>
      <body className="font-body bg-base text-navy antialiased">
        {children}
        {CHANNEL_ID && (
          <Script
            src={`${BASE_URL}/intake.js`}
            data-channel={CHANNEL_ID}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
```

Note: `strategy="afterInteractive"` means intake.js loads after hydration. This is intentional — the quiz submit uses `window.itmano` which will be available by the time the user completes 6 steps, and the fetch fallback handles the rare case where it hasn't loaded yet.

- [ ] **Step 2: Verify build compiles**

```bash
npm run build
```
Expected: successful build, no errors. Static page generated.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add root layout with SEO metadata and intake.js script"
```

---

### Task 5: Quiz Data, Types, and CRM Submit Logic

**Files:**
- Create: `types/itmano.d.ts`
- Create: `lib/quiz-data.ts`
- Create: `lib/itmano.ts`

- [ ] **Step 1: Declare Window.itmano type**

Create `types/itmano.d.ts`:
```ts
interface ItmlanoInstance {
  submit: (payload: Record<string, unknown>) => Promise<void>
}

declare global {
  interface Window {
    itmano?: ItmlanoInstance
  }
}

export {}
```

- [ ] **Step 2: Define quiz questions and answer types**

Create `lib/quiz-data.ts`:
```ts
export interface QuizQuestion {
  field: string
  question: string
  options: Array<{ label: string; value: string }>
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    field: 'timeline',
    question: '¿Cuándo planeas comprar tu casa?',
    options: [
      { label: 'En los próximos 3 meses',  value: 'less_3_months' },
      { label: 'En 3 a 6 meses',           value: '3_6_months'   },
      { label: 'En 6 a 12 meses',          value: '6_12_months'  },
      { label: 'Solo estoy explorando',    value: 'exploring'    },
    ],
  },
  {
    field: 'budget',
    question: '¿Cuál es tu presupuesto aproximado?',
    options: [
      { label: 'Menos de $250,000',      value: 'under_250k' },
      { label: '$250,000 – $350,000',    value: '250k_350k'  },
      { label: '$350,000 – $500,000',    value: '350k_500k'  },
      { label: 'Más de $500,000',        value: 'over_500k'  },
    ],
  },
  {
    field: 'preapproval',
    question: '¿Tienes pre-aprobación de hipoteca?',
    options: [
      { label: 'Sí, ya tengo mi carta',           value: 'approved'      },
      { label: 'Estoy en proceso',                value: 'in_process'    },
      { label: 'Aún no, pero quiero empezar',     value: 'not_yet'       },
      { label: 'No sé por dónde empezar',         value: 'need_guidance' },
    ],
  },
  {
    field: 'property_type',
    question: '¿Qué tipo de propiedad buscas?',
    options: [
      { label: 'Casa unifamiliar',       value: 'single_family' },
      { label: 'Townhouse',              value: 'townhouse'     },
      { label: 'Condominio',             value: 'condo'         },
      { label: 'No estoy seguro/a aún', value: 'undecided'     },
    ],
  },
  {
    field: 'area',
    question: '¿En qué zona de Hampton Roads te interesa vivir?',
    options: [
      { label: 'Virginia Beach',     value: 'virginia_beach' },
      { label: 'Norfolk',            value: 'norfolk'        },
      { label: 'Chesapeake',         value: 'chesapeake'     },
      { label: 'Suffolk / otra zona', value: 'suffolk_other'  },
    ],
  },
]

export type QuizAnswers = {
  [K in (typeof QUIZ_QUESTIONS)[number]['field']]?: string
}
```

- [ ] **Step 3: Create CRM submit function**

Create `lib/itmano.ts`:
```ts
import type { QuizAnswers } from './quiz-data'

export interface ContactData {
  first_name: string
  last_name:  string
  email:      string
  phone:      string
  language:   string
}

export interface LeadPayload extends ContactData {
  quiz_answers: QuizAnswers
  website?: string // honeypot — never sent to CRM
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  // Silently succeed for bots that fill the honeypot
  if (payload.website) return

  const { website: _honeypot, ...cleanPayload } = payload

  const baseUrl   = process.env.NEXT_PUBLIC_ITMANO_BASE_URL   ?? 'https://app.itmano.com'
  const channelId = process.env.NEXT_PUBLIC_ITMANO_CHANNEL_ID ?? ''

  // Primary: use intake.js SDK (carries visitor_id + UTMs automatically)
  if (typeof window !== 'undefined' && window.itmano?.submit) {
    await window.itmano.submit(cleanPayload as Record<string, unknown>)
    return
  }

  // Fallback: direct POST if intake.js hasn't initialized yet
  const res = await fetch(`${baseUrl}/api/intake/${channelId}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cleanPayload),
  })

  if (!res.ok) {
    throw new Error(`CRM submit failed: ${res.status}`)
  }
}
```

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: exits 0.

- [ ] **Step 5: Commit**

```bash
git add types/ lib/quiz-data.ts lib/itmano.ts
git commit -m "feat: add quiz data, ITMANO types, and CRM submit with fetch fallback"
```

---

### Task 6: Quiz Component System

**Files:**
- Create: `components/quiz/QuizProgress.tsx`
- Create: `components/quiz/QuizOption.tsx`
- Create: `components/quiz/QuizContactForm.tsx`
- Create: `components/quiz/QuizSuccess.tsx`
- Create: `components/quiz/QuizError.tsx`
- Create: `components/quiz/Quiz.tsx`

- [ ] **Step 1: QuizProgress — animated gold bar**

Create `components/quiz/QuizProgress.tsx`:
```tsx
'use client'
import { motion, useReducedMotion } from 'framer-motion'

interface QuizProgressProps {
  step:  number // 0-based current step (0–5)
  total: number // always 6
}

export function QuizProgress({ step, total }: QuizProgressProps) {
  const pref = useReducedMotion()
  const pct  = ((step + 1) / total) * 100

  return (
    <div
      className="w-full"
      role="progressbar"
      aria-valuenow={step + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Paso ${step + 1} de ${total}`}
    >
      <div className="flex justify-between mb-2 font-body text-xs text-navy/50">
        <span>Paso {step + 1} de {total}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="h-1.5 bg-cream rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gold rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={pref ? { duration: 0 } : { duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: QuizOption — selectable card**

Create `components/quiz/QuizOption.tsx`:
```tsx
'use client'
import { motion, useReducedMotion } from 'framer-motion'

interface QuizOptionProps {
  label:    string
  selected: boolean
  onClick:  () => void
}

export function QuizOption({ label, selected, onClick }: QuizOptionProps) {
  const pref = useReducedMotion()

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={[
        'w-full text-left px-5 py-4 rounded-md font-body font-medium text-base',
        'border-2 transition-colors duration-150 cursor-pointer',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
        selected
          ? 'border-gold bg-gold/10 text-navy'
          : 'border-cream bg-cream text-navy hover:border-gold/50 hover:bg-cream-dark',
      ].join(' ')}
      whileTap={pref ? {} : { scale: 0.99 }}
      transition={{ duration: 0.1 }}
    >
      <span className="flex items-center gap-3">
        <span
          className={[
            'w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors',
            selected ? 'border-gold bg-gold' : 'border-navy/30',
          ].join(' ')}
          aria-hidden="true"
        />
        {label}
      </span>
    </motion.button>
  )
}
```

- [ ] **Step 3: QuizContactForm — step 6 fields + honeypot**

Create `components/quiz/QuizContactForm.tsx`:
```tsx
'use client'
import { type ChangeEvent } from 'react'
import type { ContactData } from '@/lib/itmano'

interface QuizContactFormProps {
  data:     ContactData & { website: string }
  onChange: (field: string, value: string) => void
  onBack:   () => void
  onSubmit: () => void
  loading:  boolean
}

const inputCls =
  'w-full px-4 py-3 rounded-md border-2 border-cream bg-white font-body text-navy text-base ' +
  'placeholder:text-navy/40 focus:outline-none focus:border-gold transition-colors'

const labelCls = 'block font-body font-medium text-sm text-navy mb-1.5'

export function QuizContactForm({ data, onChange, onBack, onSubmit, loading }: QuizContactFormProps) {
  function handle(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    onChange(e.target.name, e.target.value)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="quiz_first_name" className={labelCls}>Nombre *</label>
          <input
            id="quiz_first_name" name="first_name" type="text"
            autoComplete="given-name" required
            value={data.first_name} onChange={handle}
            className={inputCls} placeholder="Tu nombre"
          />
        </div>
        <div>
          <label htmlFor="quiz_last_name" className={labelCls}>Apellido *</label>
          <input
            id="quiz_last_name" name="last_name" type="text"
            autoComplete="family-name" required
            value={data.last_name} onChange={handle}
            className={inputCls} placeholder="Tu apellido"
          />
        </div>
      </div>

      <div>
        <label htmlFor="quiz_email" className={labelCls}>Correo electrónico *</label>
        <input
          id="quiz_email" name="email" type="email"
          autoComplete="email" required
          value={data.email} onChange={handle}
          className={inputCls} placeholder="tucorreo@ejemplo.com"
        />
      </div>

      <div>
        <label htmlFor="quiz_phone" className={labelCls}>Teléfono *</label>
        <input
          id="quiz_phone" name="phone" type="tel"
          autoComplete="tel" required
          value={data.phone} onChange={handle}
          className={inputCls} placeholder="(757) 000-0000"
        />
      </div>

      <div>
        <label htmlFor="quiz_language" className={labelCls}>Idioma preferido</label>
        <select
          id="quiz_language" name="language"
          value={data.language} onChange={handle}
          className={inputCls}
        >
          <option value="español">Español</option>
          <option value="english">English</option>
          <option value="both">Ambos</option>
        </select>
      </div>

      {/* Honeypot: hidden from real users, catches bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="quiz_website">Website</label>
        <input
          id="quiz_website" name="website" type="text"
          value={data.website} onChange={handle}
          tabIndex={-1} autoComplete="off"
        />
      </div>

      <p className="font-body text-xs text-navy/50">
        * Campos obligatorios. Tu información está protegida y nunca será compartida.
      </p>

      <div className="flex gap-3 pt-2">
        <button
          type="button" onClick={onBack}
          className="flex-none px-6 py-3 rounded-md border-2 border-navy/20 font-body text-navy hover:border-navy/40 transition-colors cursor-pointer"
        >
          ← Atrás
        </button>
        <button
          type="button" onClick={onSubmit} disabled={loading}
          className="flex-1 px-6 py-3 rounded-md bg-navy text-white font-body font-medium hover:bg-navy-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? 'Enviando...' : 'Recibir mi guía gratis →'}
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: QuizSuccess**

Create `components/quiz/QuizSuccess.tsx`:
```tsx
import { CheckCircle } from 'lucide-react'

export function QuizSuccess() {
  return (
    <div className="text-center py-10 space-y-4">
      <CheckCircle className="w-16 h-16 text-gold mx-auto" strokeWidth={1.5} />
      <h3 className="font-heading text-2xl font-semibold text-navy">
        ¡Tu guía está en camino!
      </h3>
      <p className="font-body text-navy/70 max-w-sm mx-auto leading-relaxed">
        Revisa tu correo electrónico en los próximos minutos. Si no lo ves, revisa
        tu carpeta de spam.
      </p>
      <p className="font-body text-sm text-navy/50">
        ¿Preguntas? Llámanos al{' '}
        <a href="tel:+14077159052" className="text-gold underline hover:text-navy transition-colors">
          (407) 715-9052
        </a>
      </p>
    </div>
  )
}
```

- [ ] **Step 5: QuizError**

Create `components/quiz/QuizError.tsx`:
```tsx
import { AlertCircle } from 'lucide-react'

interface QuizErrorProps {
  onRetry: () => void
}

export function QuizError({ onRetry }: QuizErrorProps) {
  return (
    <div className="text-center py-10 space-y-4">
      <AlertCircle className="w-16 h-16 text-red-400 mx-auto" strokeWidth={1.5} />
      <h3 className="font-heading text-2xl font-semibold text-navy">Algo salió mal</h3>
      <p className="font-body text-navy/70 max-w-sm mx-auto leading-relaxed">
        No pudimos procesar tu solicitud. Intenta de nuevo o escríbenos a{' '}
        <a
          href="mailto:adrysofirealestate@gmail.com"
          className="text-gold underline hover:text-navy transition-colors"
        >
          adrysofirealestate@gmail.com
        </a>
      </p>
      <button
        type="button" onClick={onRetry}
        className="mt-2 px-8 py-3 bg-navy text-white rounded-md font-body font-medium hover:bg-navy-light transition-colors cursor-pointer"
      >
        Intentar de nuevo
      </button>
    </div>
  )
}
```

- [ ] **Step 6: Quiz — main state machine**

Create `components/quiz/Quiz.tsx`:
```tsx
'use client'
import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { QuizProgress }     from './QuizProgress'
import { QuizOption }       from './QuizOption'
import { QuizContactForm }  from './QuizContactForm'
import { QuizSuccess }      from './QuizSuccess'
import { QuizError }        from './QuizError'
import { QUIZ_QUESTIONS, type QuizAnswers } from '@/lib/quiz-data'
import { submitLead, type ContactData }     from '@/lib/itmano'

type Status = 'idle' | 'submitting' | 'success' | 'error'

// Steps 0–4 are the 5 MC questions. Step 5 is the contact form.
const TOTAL_STEPS = QUIZ_QUESTIONS.length + 1

const emptyContact: ContactData & { website: string } = {
  first_name: '',
  last_name:  '',
  email:      '',
  phone:      '',
  language:   'español',
  website:    '',
}

export function Quiz() {
  const pref      = useReducedMotion()
  const [step,    setStep]    = useState(0)
  const [dir,     setDir]     = useState<1 | -1>(1)
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const [contact, setContact] = useState({ ...emptyContact })
  const [status,  setStatus]  = useState<Status>('idle')

  const currentQuestion = QUIZ_QUESTIONS[step]
  const isContactStep   = step === QUIZ_QUESTIONS.length

  function advance() {
    setDir(1)
    setStep((s) => s + 1)
  }

  function goBack() {
    setDir(-1)
    setStep((s) => Math.max(0, s - 1))
  }

  function selectAnswer(field: string, value: string) {
    setAnswers((prev) => ({ ...prev, [field]: value }))
    advance()
  }

  function handleContactChange(field: string, value: string) {
    setContact((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit() {
    setStatus('submitting')
    try {
      await submitLead({ ...contact, quiz_answers: answers })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') return <QuizSuccess />
  if (status === 'error')   return <QuizError onRetry={() => setStatus('idle')} />

  const variants = {
    enter:  (d: number) => ({ x: pref ? 0 : d * 48,  opacity: 0 }),
    center:              ({ x: 0,               opacity: 1 }),
    exit:   (d: number) => ({ x: pref ? 0 : d * -48, opacity: 0 }),
  }

  return (
    <div className="space-y-7">
      <QuizProgress step={step} total={TOTAL_STEPS} />

      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={step}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: pref ? 0 : 0.22, ease: 'easeOut' }}
        >
          {isContactStep ? (
            <>
              <h3 className="font-heading text-xl font-semibold text-navy mb-6">
                ¿A dónde enviamos tu guía?
              </h3>
              <QuizContactForm
                data={contact}
                onChange={handleContactChange}
                onBack={goBack}
                onSubmit={handleSubmit}
                loading={status === 'submitting'}
              />
            </>
          ) : (
            <>
              <h3 className="font-heading text-xl font-semibold text-navy mb-6">
                {currentQuestion?.question}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {currentQuestion?.options.map((opt) => (
                  <QuizOption
                    key={opt.value}
                    label={opt.label}
                    selected={answers[currentQuestion.field as keyof QuizAnswers] === opt.value}
                    onClick={() => selectAnswer(currentQuestion.field, opt.value)}
                  />
                ))}
              </div>
              {step > 0 && (
                <button
                  type="button" onClick={goBack}
                  className="mt-5 text-sm font-body text-navy/50 hover:text-navy transition-colors cursor-pointer"
                >
                  ← Atrás
                </button>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 7: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: exits 0.

- [ ] **Step 8: Commit**

```bash
git add components/quiz/
git commit -m "feat: add 6-step Quiz component with AnimatePresence and ITMANO submit"
```

---

### Task 7: Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Create Hero**

Create `components/sections/Hero.tsx`:
```tsx
'use client'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

function scrollToQuiz() {
  document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })
}

const containerVariants = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden:   { opacity: 0, y: 24 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function Hero() {
  const pref = useReducedMotion()

  return (
    <header className="relative overflow-hidden bg-base">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Text column ── */}
          <motion.div
            variants={pref ? {} : containerVariants}
            initial={pref ? {} : 'hidden'}
            animate={pref ? {} : 'visible'}
            className="space-y-6"
          >
            <motion.p
              variants={pref ? {} : itemVariants}
              className="font-body text-xs font-semibold tracking-[0.16em] uppercase text-gold"
            >
              Guía gratuita para compradores
            </motion.p>

            <motion.h1
              variants={pref ? {} : itemVariants}
              className="font-heading text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold text-navy leading-tight"
            >
              Compra tu próxima casa en Hampton Roads con total confianza
            </motion.h1>

            <motion.p
              variants={pref ? {} : itemVariants}
              className="font-body text-lg text-navy/70 leading-relaxed max-w-lg"
            >
              Descarga gratis nuestra Guía del Comprador Hispano y descubre el proceso
              paso a paso que han seguido cientos de familias para encontrar el hogar
              ideal — sin sorpresas, sin estrés y al mejor precio.
            </motion.p>

            <motion.div
              variants={pref ? {} : itemVariants}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
              <Button onClick={scrollToQuiz} variant="primary">
                Quiero mi guía gratis
              </Button>
              <p className="font-body text-sm text-navy/50">
                100% gratis · Tus datos están protegidos
              </p>
            </motion.div>
          </motion.div>

          {/* ── Guide cover image column ── */}
          <motion.div
            className="flex justify-center lg:justify-end"
            animate={pref ? {} : { y: [0, -8, 0] }}
            transition={pref ? {} : { duration: 3.5, ease: 'easeInOut', repeat: Infinity }}
          >
            <Image
              src="/images/guide-cover.webp"
              alt="Guía del Comprador Hispano — portada"
              width={340}
              height={440}
              priority
              className="rounded-lg shadow-card-hover"
            />
          </motion.div>
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: add Hero section with floating guide cover and animated entrance"
```

---

### Task 8: AgentIntro + Benefits + Testimonials

**Files:**
- Create: `components/sections/AgentIntro.tsx`
- Create: `components/sections/Benefits.tsx`
- Create: `components/sections/Testimonials.tsx`

- [ ] **Step 1: AgentIntro**

Create `components/sections/AgentIntro.tsx`:
```tsx
import Image from 'next/image'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

export function AgentIntro() {
  return (
    <div className="bg-cream/40">
      <SectionWrapper>
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">

          {/* Photo */}
          <div className="flex-none">
            <Image
              src="/images/adriana.webp"
              alt="Adriana Melendez, REALTOR® — Especialista en compradores hispanos"
              width={200}
              height={200}
              className="rounded-full shadow-card object-cover w-[200px] h-[200px]"
            />
          </div>

          {/* Bio */}
          <div className="space-y-3 max-w-xl">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-navy">
                Adriana Melendez
              </h2>
              <p className="font-body text-sm font-semibold text-gold tracking-wide mt-0.5">
                REALTOR® · Especialista en compradores hispanos en Hampton Roads
              </p>
            </div>

            {/* REEMPLAZAR: bio real de Adriana — 2-3 frases sobre su historia, misión y experiencia */}
            <p className="font-body text-navy/70 leading-relaxed">
              Durante más de{' '}
              {/* REEMPLAZAR: número real de años */}[X] años he acompañado a familias
              hispanas en una de las decisiones más importantes de su vida. Mi misión es{' '}
              {/* REEMPLAZAR: frase de misión personal de Adriana */}[tu misión aquí].
              Cada familia merece un proceso claro, transparente y sin sorpresas.
            </p>

            {/* REEMPLAZAR: cita con número real de familias atendidas */}
            <p className="font-body text-sm text-navy/50 italic border-l-2 border-gold pl-4">
              "He tenido el honor de ayudar a [X] familias a encontrar su hogar en Hampton Roads."
            </p>
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}
```

- [ ] **Step 2: Benefits**

Create `components/sections/Benefits.tsx`:
```tsx
'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { Calculator, MapPin, TrendingUp, FileText, ClipboardList, Shield } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

const BENEFITS = [
  {
    Icon: Calculator,
    title: 'Planificación financiera',
    desc:  'Calcula cuánto puedes pagar realmente y qué gastos extras considerar antes de firmar.',
  },
  {
    Icon: MapPin,
    title: 'Cómo elegir la zona ideal',
    desc:  'Criterios para evaluar plusvalía, seguridad, servicios y proyección a 5 y 10 años.',
  },
  {
    Icon: TrendingUp,
    title: 'Estrategias de negociación',
    desc:  'Tácticas reales que usan compradores expertos para conseguir el mejor precio.',
  },
  {
    Icon: FileText,
    title: 'Aspectos legales clave',
    desc:  'Documentos imprescindibles, escrituras y avalúos: lo que sí o sí debes revisar.',
  },
  {
    Icon: ClipboardList,
    title: 'Checklists imprimibles',
    desc:  'Listas paso a paso para visitar propiedades y comparar opciones objetivamente.',
  },
  {
    Icon: Shield,
    title: 'Cierre sin sorpresas',
    desc:  'Qué esperar del proceso de cierre y cómo proteger tu inversión a largo plazo.',
  },
]

export function Benefits() {
  const pref = useReducedMotion()

  return (
    <SectionWrapper>
      <div className="text-center mb-14 space-y-3">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-navy">
          Todo lo que un comprador inteligente necesita saber
        </h2>
        <p className="font-body text-navy/60 max-w-2xl mx-auto">
          Más de 40 páginas de contenido práctico, escrito por nuestro equipo con años
          acompañando familias en su decisión más importante.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {BENEFITS.map(({ Icon, title, desc }, i) => (
          <motion.div
            key={title}
            className="bg-white rounded-lg p-7 shadow-card border border-cream hover:shadow-card-hover transition-shadow duration-300"
            initial={pref ? {} : { opacity: 0, y: 24 }}
            whileInView={pref ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={pref ? {} : { duration: 0.4, ease: 'easeOut', delay: i * 0.08 }}
          >
            <Icon className="w-8 h-8 text-gold mb-4" strokeWidth={1.5} aria-hidden="true" />
            <h3 className="font-heading text-lg font-semibold text-navy mb-2">{title}</h3>
            <p className="font-body text-sm text-navy/60 leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 3: Testimonials**

Create `components/sections/Testimonials.tsx`:
```tsx
'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { SectionWrapper }   from '@/components/ui/SectionWrapper'

// REEMPLAZAR: sustituye este array con testimonios reales
// Estructura: añade tantos objetos como necesites, el grid se adapta solo
const TESTIMONIALS = [
  {
    id:       1,
    name:     'María G.',
    location: 'Virginia Beach · Casa unifamiliar',
    quote:    'REEMPLAZAR — Cita real de la cliente aquí. Ejemplo: "Adriana nos guió paso a paso y nunca nos sentimos solos en el proceso. ¡Gracias a la guía entendimos todo desde el principio!"',
    photo:    '/images/testimonials/1.webp', // REEMPLAZAR con foto real
  },
  {
    id:       2,
    name:     'Carlos & Ana R.',
    location: 'Chesapeake · Townhouse',
    quote:    'REEMPLAZAR — Cita real del cliente aquí. Ejemplo: "No sabíamos nada del proceso de compra aquí. La guía fue nuestra biblia durante meses de búsqueda."',
    photo:    '/images/testimonials/2.webp',
  },
  {
    id:       3,
    name:     'Roberto M.',
    location: 'Norfolk · Condominio',
    quote:    'REEMPLAZAR — Cita real del cliente aquí. Ejemplo: "Gracias al equipo de A&J encontramos el hogar perfecto dentro de nuestro presupuesto. 100% recomendados."',
    photo:    '/images/testimonials/3.webp',
  },
]

export function Testimonials() {
  const pref = useReducedMotion()

  return (
    <div className="bg-cream/30">
      <SectionWrapper>
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-navy text-center mb-12">
          Familias que ya encontraron su hogar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ id, name, location, quote }, i) => (
            <motion.figure
              key={id}
              className="bg-white rounded-lg p-7 shadow-card border border-cream flex flex-col gap-4"
              initial={pref ? {} : { opacity: 0, y: 24 }}
              whileInView={pref ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={pref ? {} : { duration: 0.4, ease: 'easeOut', delay: i * 0.1 }}
            >
              <blockquote className="font-body text-navy/70 leading-relaxed italic flex-1">
                "{quote}"
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-3 border-t border-cream">
                {/* REEMPLAZAR: cuando las fotos estén disponibles, sustituye ImagePlaceholder
                    por:
                    <Image src={photo} alt={`Foto de ${name}`} width={48} height={48}
                           className="rounded-full object-cover flex-none" />
                */}
                <ImagePlaceholder width={48} height={48} className="rounded-full flex-none" />
                <div>
                  <p className="font-body font-semibold text-navy text-sm">{name}</p>
                  <p className="font-body text-xs text-navy/50">{location}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </SectionWrapper>
    </div>
  )
}
```

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: exits 0.

- [ ] **Step 5: Commit**

```bash
git add components/sections/AgentIntro.tsx components/sections/Benefits.tsx components/sections/Testimonials.tsx
git commit -m "feat: add AgentIntro, Benefits (6 cards), and Testimonials sections"
```

---

### Task 9: QuizSection + Footer

**Files:**
- Create: `components/sections/QuizSection.tsx`
- Create: `components/sections/Footer.tsx`

- [ ] **Step 1: QuizSection wrapper**

Create `components/sections/QuizSection.tsx`:
```tsx
import { Quiz } from '@/components/quiz/Quiz'

export function QuizSection() {
  return (
    <section id="quiz" className="bg-base py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 space-y-2">
          <p className="font-body text-xs font-semibold tracking-[0.16em] uppercase text-gold">
            Cuéntanos sobre tu búsqueda
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-navy">
            Recibe tu guía gratis
          </h2>
          <p className="font-body text-navy/60">
            Solo 6 preguntas rápidas para enviarte recursos personalizados
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-card border border-cream p-8">
          <Quiz />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Footer**

Create `components/sections/Footer.tsx`:
```tsx
import { Instagram, Facebook } from 'lucide-react'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'

const NAV_LINKS = [
  { label: 'Home',    href: 'https://ajrealestateva.com' },
  { label: 'Houses',  href: 'https://ajrealestateva.com/houses' },
  { label: 'Contact', href: 'https://ajrealestateva.com/contact' },
]

// REEMPLAZAR: URLs reales de redes sociales de A&J Real Estate
const SOCIAL = [
  { label: 'Instagram', href: 'https://instagram.com/ajrealestateva', Icon: Instagram },
  { label: 'Facebook',  href: 'https://facebook.com/ajrealestateva',  Icon: Facebook  },
]

const WHATSAPP_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Logo + tagline */}
          <div>
            {/* REEMPLAZAR: cuando logo-white.png esté disponible:
                <Image src="/images/logo-white.png" alt="A&J Real Estate Group"
                       width={140} height={48} className="mb-4" />
            */}
            <ImagePlaceholder
              width={140} height={48}
              label="Logo blanco A&J (140×48)"
              className="mb-4"
            />
            <p className="font-body text-sm text-white/60 leading-relaxed">
              Especialistas en compradores hispanos en Hampton Roads, Virginia.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h3 className="font-body font-semibold text-xs uppercase tracking-widest text-gold mb-4">
              Navegación
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="font-body text-sm text-white/70 hover:text-white transition-colors">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact + Social */}
          <div>
            <h3 className="font-body font-semibold text-xs uppercase tracking-widest text-gold mb-4">
              Contacto
            </h3>
            <div className="space-y-2 font-body text-sm text-white/70 mb-5">
              <p>
                <a href="tel:+14077159052" className="hover:text-white transition-colors">
                  (407) 715-9052
                </a>
              </p>
              <p>
                <a href="mailto:adrysofirealestate@gmail.com" className="hover:text-white transition-colors">
                  adrysofirealestate@gmail.com
                </a>
              </p>
            </div>
            <div className="flex gap-4">
              {SOCIAL.map(({ label, href, Icon }) => (
                <a key={label} href={href} aria-label={label}
                   target="_blank" rel="noopener noreferrer"
                   className="text-white/60 hover:text-gold transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
              <a href="https://wa.me/14077159052" aria-label="WhatsApp"
                 target="_blank" rel="noopener noreferrer"
                 className="text-white/60 hover:text-gold transition-colors">
                {WHATSAPP_SVG}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 font-body text-xs text-white/40 text-center">
          © 2026 A&J Real Estate · Diseñado por ITMANO
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add components/sections/QuizSection.tsx components/sections/Footer.tsx
git commit -m "feat: add QuizSection wrapper and Footer with nav, contact, social"
```

---

### Task 10: Page Assembly + Visual QA

**Files:**
- Replace: `app/page.tsx`

- [ ] **Step 1: Assemble page.tsx**

Replace `app/page.tsx`:
```tsx
import { Hero }         from '@/components/sections/Hero'
import { AgentIntro }   from '@/components/sections/AgentIntro'
import { Benefits }     from '@/components/sections/Benefits'
import { Testimonials } from '@/components/sections/Testimonials'
import { QuizSection }  from '@/components/sections/QuizSection'
import { Footer }       from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <AgentIntro />
      <Benefits />
      <Testimonials />
      <QuizSection />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 2: Run dev server and do visual QA**

```bash
npm run dev
```
Open http://localhost:3000. Check each item:

**Hero:**
- [ ] Gold eyebrow text visible
- [ ] EB Garamond headline renders (large, serif font)
- [ ] Guide cover image shows (the real webp)
- [ ] Image floats up and down gently (continuously)
- [ ] "Quiero mi guía gratis" button scrolls to #quiz section smoothly

**AgentIntro:**
- [ ] Adriana's real photo shows, circular
- [ ] Gold credential line visible
- [ ] REEMPLAZAR placeholder text visible (expected for now)

**Benefits:**
- [ ] 6 cards in 3-column grid on desktop, 1-column on mobile
- [ ] Scroll down slowly: cards animate in with stagger
- [ ] Lucide icons visible in gold

**Testimonials:**
- [ ] 3 cards visible, placeholder images show
- [ ] REEMPLAZAR text visible in quotes (expected)

**Quiz:**
- [ ] Gold progress bar visible at top
- [ ] First question shows: "¿Cuándo planeas comprar tu casa?"
- [ ] Clicking an option advances to next question
- [ ] Progress bar animates forward
- [ ] Step 2+: "← Atrás" link appears
- [ ] Clicking back goes to previous question
- [ ] Step 6: contact form shows all fields (Nombre, Apellido, Email, Teléfono, Idioma)
- [ ] Labels are visible and associated with inputs
- [ ] Submit button shows "Recibir mi guía gratis →"
- [ ] (Do NOT submit with real data yet — CRM channel ID is placeholder)

**Footer:**
- [ ] Navy background
- [ ] Logo placeholder visible
- [ ] Nav links clickable
- [ ] Phone and email links have correct href

Stop dev server.

- [ ] **Step 3: Verify TypeScript and lint**

```bash
npx tsc --noEmit && npm run lint
```
Expected: both exit 0.

- [ ] **Step 4: Production build**

```bash
npm run build
```
Expected: `✓ Compiled successfully`. All routes static. Note build output sizes.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble complete landing page — all sections integrated"
```

---

### Task 11: Asset Setup

**Files:**
- Create: `public/images/` structure
- Move existing webp files to correct paths
- Create: `public/images/ASSETS.md`

- [ ] **Step 1: Create directory structure**

```powershell
New-Item -ItemType Directory -Force "public\images\testimonials"
```

- [ ] **Step 2: Copy pre-existing assets to correct paths**

```powershell
Copy-Item "lead_magnet_mockup_v1.webp" "public\images\guide-cover.webp"
Copy-Item "LM_Adriana_Hero_Portrait.webp" "public\images\adriana.webp"
```

The original files at the repo root can stay (they don't affect the build).

- [ ] **Step 3: Create asset documentation**

Create `public/images/ASSETS.md`:
```markdown
# Asset Guide

Replace placeholder images with real files at these exact paths.

| File | Recommended size | Format | Used in |
|------|-----------------|--------|---------|
| `guide-cover.webp` | 340×440 px | WebP | Hero (provided ✓) |
| `adriana.webp` | 400×400 px | WebP | AgentIntro (provided ✓) |
| `logo-white.png` | 280×96 px transparent | PNG | Footer |
| `logo-dark.png` | 280×96 px transparent | PNG | (reserved) |
| `og-image.jpg` | 1200×630 px | JPG | Open Graph / social |
| `testimonials/1.webp` | 200×200 px | WebP | Testimonials card 1 |
| `testimonials/2.webp` | 200×200 px | WebP | Testimonials card 2 |
| `testimonials/3.webp` | 200×200 px | WebP | Testimonials card 3 |

When adding real testimonial photos, also replace the `ImagePlaceholder` in
`components/sections/Testimonials.tsx` with `<Image>` (instructions in comments).

When adding the real logo, replace `ImagePlaceholder` in
`components/sections/Footer.tsx` with `<Image>` (instructions in comments).
```

- [ ] **Step 4: Verify Hero renders with real guide cover**

```bash
npm run dev
```
Confirm guide cover and Adriana's photo display correctly. Stop server.

- [ ] **Step 5: Commit**

```bash
git add public/
git commit -m "feat: add real image assets and public/images directory structure"
```

---

### Task 12: README + Final Verification

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write README**

Create `README.md`:
```markdown
# Guía del Comprador Hispano — Landing Page

Premium lead magnet landing page for A&J Real Estate Group.
Deploys to `lm.ajrealestateva.com`.

## Quick Start

\`\`\`bash
npm install
cp .env.example .env.local   # edit with your real channel ID
npm run dev
\`\`\`

Open http://localhost:3000

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_ITMANO_BASE_URL` | No | ITMANO base URL (default: https://app.itmano.com) |
| `NEXT_PUBLIC_ITMANO_CHANNEL_ID` | **Yes** | Public channel ID from ITMANO → Sources |

### Getting Your Channel ID
1. Log in to ITMANO → **Sources**
2. Find or create the "Guía del Comprador Hispano" lead magnet channel
3. Copy its `public_id` (format: `chn_xxxxx`)
4. Paste into `NEXT_PUBLIC_ITMANO_CHANNEL_ID` in `.env.local`

Without a channel ID, intake.js won't load and the form will use the direct fetch fallback.

## Replacing Content Placeholders

Search the codebase for `REEMPLAZAR` to find all content the client must supply:

| File | What to replace |
|------|----------------|
| `components/sections/AgentIntro.tsx` | Adriana's real bio, years of experience, families served |
| `components/sections/Testimonials.tsx` | Real client testimonials (name, quote, location) |
| `components/sections/Footer.tsx` | Real social media profile URLs |

## Adding Real Images

See `public/images/ASSETS.md` for dimensions and instructions.

When testimonial photos and logo are ready:
1. Drop files at the paths listed in `ASSETS.md`
2. In `Testimonials.tsx`: uncomment the `<Image>` block, remove `<ImagePlaceholder>`
3. In `Footer.tsx`: uncomment the `<Image>` block, remove `<ImagePlaceholder>`

## Deploy to Vercel

\`\`\`bash
# 1. Push to GitHub
git push origin main

# 2. Import project at vercel.com/new
# 3. Set env vars in Vercel dashboard:
#    NEXT_PUBLIC_ITMANO_BASE_URL = https://app.itmano.com
#    NEXT_PUBLIC_ITMANO_CHANNEL_ID = chn_xxxxx

# 4. Add custom domain: lm.ajrealestateva.com
\`\`\`

Framework preset: Next.js (auto-detected). Build command: `npm run build`. Output: `.next`.

## Scripts

\`\`\`bash
npm run dev      # development server
npm run build    # production build
npm run lint     # ESLint
npx tsc --noEmit # type check
\`\`\`
```

- [ ] **Step 2: Run complete verification suite**

```bash
npm run build
```
Expected: exits 0, all routes statically generated.

```bash
npx tsc --noEmit
```
Expected: exits 0.

```bash
npm run lint
```
Expected: exits 0, no warnings.

- [ ] **Step 3: Final commit**

```bash
git add README.md
git commit -m "docs: add README with setup, env vars, asset guide, and Vercel deploy instructions"
```

---

## Self-Review

**Spec coverage check:**

| Requirement | Task |
|-------------|------|
| Next.js App Router, TypeScript strict, Tailwind v4 | Task 1 |
| Framer Motion (float, stagger, AnimatePresence) | Tasks 6, 7, 8 |
| next/font/google (EB Garamond + Montserrat) | Task 2 |
| next/image for all images | Tasks 7, 8, 9 |
| next/script for intake.js | Task 4 |
| All design tokens (Navy, Gold, Cream, Base, hovers, shadows) | Task 2 |
| Hero: eyebrow, headline, subhead, CTA, trust line, float animation | Task 7 |
| AgentIntro: photo, name, credential, placeholder bio | Task 8 |
| Benefits: 6 cards, scroll-reveal stagger | Task 8 |
| Testimonials: placeholder structure, easy to replace | Task 8 |
| 6-step quiz (timeline, budget, preapproval, property_type, area, contact) | Tasks 5, 6 |
| Gold progress bar, animated | Task 6 |
| Honeypot field | Task 6 (QuizContactForm) |
| Success + error states | Task 6 |
| Quiz forward/back navigation | Task 6 (Quiz.tsx) |
| Footer: nav, phone, email, social (IG, FB, WA), copyright | Task 9 |
| CRM: window.itmano.submit + fetch fallback | Task 5 |
| .env.local + .env.example | Task 1 |
| prefers-reduced-motion throughout | Tasks 2, 3, 6, 7, 8 |
| Semantic HTML, a11y labels, focus states, alt text | Tasks 3–9 |
| SEO metadata, OG tags, lang="es" | Task 4 |
| Public assets structure + documentation | Task 11 |
| Pre-existing assets wired up | Task 11 |
| README | Task 12 |
| build/lint/tsc verification | Tasks 1, 10, 12 |

**Placeholder scan:** No TBD/TODO in code steps. All `REEMPLAZAR` markers are intentional client content. All code blocks are complete.

**Type consistency:** `QuizAnswers` defined in `quiz-data.ts`, used identically in `Quiz.tsx` and `itmano.ts`. `ContactData` + `LeadPayload` defined in `itmano.ts`, imported by `QuizContactForm.tsx` and `Quiz.tsx`. `submitLead` signature consistent across all usages.
