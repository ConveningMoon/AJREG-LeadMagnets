/**
 * Channel IDs for ITMANO intake.js
 *
 * Each lead magnet page has a dedicated channel created in the ITMANO CRM
 * under /sources. The channel ID is PUBLIC — it appears in the HTML and
 * is not a secret. Do not put CRM service keys here.
 *
 * HOW TO GET THE CHANNEL ID:
 *   1. Log in to app.itmano.com
 *   2. Go to Sources → find or create the channel for this lead magnet
 *   3. Copy the public_id (format: chn_xxxxxxxxxxxxxxxxxx)
 *   4. Replace the placeholder below
 *   5. Also set NEXT_PUBLIC_ITMANO_CHANNEL_ID in .env.local for local dev
 */

// A&J Real Estate · Guía del Comprador Hispano
// TODO(Dylan): replace with real channel ID from app.itmano.com/sources
export const BUYER_GUIDE_CHANNEL =
  process.env.NEXT_PUBLIC_ITMANO_CHANNEL_ID ?? 'REPLACE_WITH_CHANNEL_ID'
