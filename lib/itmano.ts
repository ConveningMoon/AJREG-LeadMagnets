import type { FormAnswer }  from './quiz-data'
import type { FormIntent }  from './form-contracts'

export type { FormIntent }

export interface ContactData {
  first_name: string
  last_name:  string
  email:      string
  phone:      string
  language:   string
}

export interface LeadPayload extends ContactData {
  intent:       FormIntent
  form_answers: FormAnswer[]
  website?:     string // honeypot — never sent to CRM
}

export interface SubmitResult {
  status:       'created' | 'already_submitted'
  channel_type: string
}

export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  // Silently succeed for bots that fill the honeypot
  if (payload.website) return { status: 'created', channel_type: 'lead_magnet' }

  const { website: _honeypot, ...cleanPayload } = payload

  const baseUrl   = process.env.NEXT_PUBLIC_ITMANO_BASE_URL   ?? 'https://app.itmano.com'
  const channelId = process.env.NEXT_PUBLIC_ITMANO_CHANNEL_ID ?? ''

  // Primary: use intake.js SDK (carries visitor_id + UTMs automatically)
  if (typeof window !== 'undefined' && window.itmano?.submit) {
    const raw = await window.itmano.submit(cleanPayload as Record<string, unknown>)
    // intake.js proxies the CRM response — parse if available, fall back to 'created'
    if (raw && typeof raw === 'object' && 'status' in raw) {
      return raw as SubmitResult
    }
    return { status: 'created', channel_type: 'lead_magnet' }
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

  return res.json() as Promise<SubmitResult>
}
