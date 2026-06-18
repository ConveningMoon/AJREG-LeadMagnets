import type { FormIntent } from './form-contracts'

export interface LMConfig {
  slug:            string
  channelPublicId: string
  intent:          FormIntent
  meta: {
    title:       string
    description: string
    keywords:    string[]
    ogImage:     string
    locale:      string
  }
}

/**
 * To add a new LM: add one entry here with its slug, channelPublicId,
 * intent, and metadata. No other file needs to change.
 *
 * channel IDs are PUBLIC — they appear in the HTML and are not secrets.
 * See app.itmano.com/sources to find or create a channel.
 */
export const LM_REGISTRY: Record<string, LMConfig> = {
  'guia-para-familias-hispanas': {
    slug: 'guia-para-familias-hispanas',
    channelPublicId:
      process.env.NEXT_PUBLIC_BUYER_GUIDE_CHANNEL_ID ??
      process.env.NEXT_PUBLIC_ITMANO_CHANNEL_ID ??  // deprecated name — update Vercel env var
      'REPLACE_WITH_CHANNEL_ID',
    intent: 'compra',
    meta: {
      title:       'Tu Primera Casa en Estados Unidos — Guía Gratuita para Familias Hispanas | Hampton Roads, VA',
      description:
        'Descarga gratis la guía completa en español para comprar tu primera casa en Hampton Roads, Virginia. ' +
        'Préstamos ITIN, programas de ayuda de Virginia Housing y el proceso paso a paso. ' +
        'Preparada por Adriana Meléndez, A&J Real Estate Group.',
      keywords: [
        'comprar casa Hampton Roads',
        'primera casa Virginia',
        'préstamo ITIN Virginia',
        'guía comprador hispano',
        'bienes raíces Virginia español',
        'comprar casa sin seguro social',
        'Virginia Beach',
        'Chesapeake',
        'Suffolk',
      ],
      ogImage: '/images/og-image.jpg',
      locale:  'es_US',
    },
  },

  // Example: add future LMs like this (no other file changes needed):
  // 'guia-para-vendedores': {
  //   slug: 'guia-para-vendedores',
  //   channelPublicId: process.env.NEXT_PUBLIC_SELLER_GUIDE_CHANNEL_ID ?? 'REPLACE_WITH_CHANNEL_ID',
  //   intent: 'vende',
  //   meta: { title: '...', description: '...', keywords: [...], ogImage: '/images/og-seller.jpg', locale: 'es_US' },
  // },
}
