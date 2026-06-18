import { notFound }     from 'next/navigation'
import type { Metadata } from 'next'
import Script            from 'next/script'
import { LM_REGISTRY }  from '@/lib/lm-registry'
import { Hero }         from '@/components/pages/guia/sections/Hero'
import { Benefits }     from '@/components/pages/guia/sections/Benefits'
import { QuizSection }  from '@/components/pages/guia/sections/QuizSection'
import { Testimonials } from '@/components/pages/guia/sections/Testimonials'
import { Footer }       from '@/components/pages/guia/sections/Footer'

const BASE_URL = process.env.NEXT_PUBLIC_ITMANO_BASE_URL ?? 'https://app.itmano.com'

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return Object.keys(LM_REGISTRY).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const config = LM_REGISTRY[slug]
  if (!config) return {}
  const { meta } = config
  return {
    title:       meta.title,
    description: meta.description,
    keywords:    meta.keywords,
    authors:     [{ name: 'A&J Real Estate Group' }],
    openGraph: {
      title:       meta.title,
      description: meta.description,
      url:         `https://lm.ajrealestateva.com/${slug}`,
      siteName:    'A&J Real Estate Group',
      images:      [{ url: meta.ogImage, width: 1200, height: 630, alt: meta.title }],
      locale:      meta.locale,
      type:        'website',
    },
    twitter: {
      card:        'summary_large_image',
      title:       meta.title,
      description: meta.description,
      images:      [meta.ogImage],
    },
    robots: { index: true, follow: true },
  }
}

export default async function LMPage({ params }: PageProps) {
  const { slug } = await params
  const config = LM_REGISTRY[slug]
  if (!config) notFound()

  return (
    <>
      <Script
        src={`${BASE_URL}/intake.js`}
        data-channel={config.channelPublicId}
        strategy="afterInteractive"
      />
      <main>
        <Hero />
        <Benefits />
        <QuizSection channelPublicId={config.channelPublicId} intent={config.intent} />
        <Testimonials />
        <Footer />
      </main>
    </>
  )
}
