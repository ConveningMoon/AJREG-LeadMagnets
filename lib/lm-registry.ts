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
    // TODO(Dylan): replace with real channel ID from app.itmano.com/sources
    channelPublicId: process.env.NEXT_PUBLIC_BUYER_GUIDE_CHANNEL_ID ?? 'REPLACE_WITH_CHANNEL_ID',
    intent: 'compra',
    meta: {
      title:       'Guía del Comprador Hispano — A&J Real Estate Group',
      description:
        'Descarga gratis nuestra Guía del Comprador Hispano y descubre el proceso paso a paso ' +
        'que han seguido cientos de familias para comprar su casa en Hampton Roads sin sorpresas.',
      keywords:    ['comprar casa Hampton Roads', 'guía comprador hispano', 'bienes raíces Virginia'],
      ogImage:     '/images/og-image.jpg',
      locale:      'es_US',
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
