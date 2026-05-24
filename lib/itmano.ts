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
