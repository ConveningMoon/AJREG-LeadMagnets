import type { Metadata } from 'next'
import Script from 'next/script'
import { montserrat, ebGaramond } from '@/lib/fonts'
import './globals.css'

const BASE_URL = process.env.NEXT_PUBLIC_ITMANO_BASE_URL ?? 'https://app.itmano.com'
const CHANNEL_ID = process.env.NEXT_PUBLIC_ITMANO_CHANNEL_ID ?? ''

export const metadata: Metadata = {
  metadataBase: new URL('https://lm.ajrealestateva.com'),
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
    <html lang="es" className={`${montserrat.variable} ${ebGaramond.variable}`}>
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
