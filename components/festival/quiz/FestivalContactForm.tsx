'use client'
import { type ChangeEvent, type FormEvent } from 'react'

export interface FestivalContact {
  name:    string
  phone:   string
  email:   string
  website: string // honeypot
}

interface FestivalContactFormProps {
  data:     FestivalContact
  onChange: (field: keyof FestivalContact, value: string) => void
  onBack:   () => void
  onSubmit: () => void
  loading:  boolean
  showBack: boolean
}

const inputCls =
  'w-full rounded-xl border-[1.5px] border-[#d8dde3] bg-[#fbfcfd] px-4 py-3.5 text-[16px] text-[#163a52] ' +
  'placeholder:text-[#163a52]/35 focus:border-[#f6b50a] focus:bg-white focus:outline-none transition-colors'
const labelCls = 'mb-1.5 block text-[14px] font-bold text-[#163a52]'

export function FestivalContactForm({ data, onChange, onBack, onSubmit, loading, showBack }: FestivalContactFormProps) {
  function handle(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.name as keyof FestivalContact, e.target.value)
  }
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form data-itmano-form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="fest_name" className={labelCls}>Nombre y apellido *</label>
        <input id="fest_name" name="name" type="text" autoComplete="name" required
          value={data.name} onChange={handle} className={inputCls} placeholder="Tu nombre y apellido" />
      </div>
      <div>
        <label htmlFor="fest_phone" className={labelCls}>WhatsApp / teléfono *</label>
        <input id="fest_phone" name="phone" type="tel" autoComplete="tel" required
          value={data.phone} onChange={handle} className={inputCls} placeholder="(757) 000-0000" />
      </div>
      <div>
        <label htmlFor="fest_email" className={labelCls}>Correo electrónico *</label>
        <input id="fest_email" name="email" type="email" autoComplete="email" required
          value={data.email} onChange={handle} className={inputCls} placeholder="tucorreo@ejemplo.com" />
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="fest_website">Website</label>
        <input id="fest_website" name="website" type="text" tabIndex={-1} autoComplete="off"
          value={data.website} onChange={handle} />
      </div>

      <div className="flex gap-3 pt-1">
        {showBack && (
          <button type="button" onClick={onBack}
            className="flex-none cursor-pointer rounded-xl border border-[#163a52]/15 px-6 py-3.5 text-[#163a52]/70 transition-colors hover:border-[#163a52]/40 hover:text-[#163a52]">
            ← Atrás
          </button>
        )}
        <button type="submit" disabled={loading}
          className="flex-1 cursor-pointer rounded-full bg-[#e23b2e] px-6 py-3.5 text-[16px] font-extrabold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? 'Enviando...' : '🎉 Confirmar mi asistencia'}
        </button>
      </div>
      <p className="text-center text-[12.5px] leading-snug text-[#7a8694]">
        Usaremos tus datos solo para confirmar tu participación en el festival.
      </p>
    </form>
  )
}
