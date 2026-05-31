'use client'
import { type ChangeEvent, type FormEvent } from 'react'
import type { ContactData } from '@/lib/itmano'

interface QuizContactFormProps {
  data:     ContactData & { website: string }
  onChange: (field: string, value: string) => void
  onBack:   () => void
  onSubmit: () => void
  loading:  boolean
}

const inputCls =
  'w-full px-4 py-3 rounded-[10px] border border-[rgba(16,32,55,0.15)] bg-[rgba(199,162,96,0.04)] ' +
  'font-body text-navy text-base placeholder:text-navy/35 ' +
  'focus:outline-none focus:border-gold transition-colors'

const labelCls = 'block font-body font-medium text-sm text-navy mb-1.5'

export function QuizContactForm({ data, onChange, onBack, onSubmit, loading }: QuizContactFormProps) {
  function handle(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    onChange(e.target.name, e.target.value)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form data-itmano-form onSubmit={handleSubmit} noValidate className="space-y-4">
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
        <label htmlFor="quiz_language" className={labelCls}>Prefiero comunicarme en</label>
        <select
          id="quiz_language" name="language"
          value={data.language} onChange={handle}
          className={inputCls}
        >
          <option value="es">Español</option>
          <option value="en">English</option>
          <option value="pt">Português</option>
        </select>
      </div>

      {/* Honeypot — hidden from real users, bots fill it */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="quiz_website">Website</label>
        <input
          id="quiz_website" name="website" type="text"
          value={data.website} onChange={handle}
          tabIndex={-1} autoComplete="off"
        />
      </div>

      <p className="font-body text-xs text-navy/45">
        * Campos obligatorios. Tu información está protegida y nunca será compartida.
      </p>

      <div className="flex gap-3 pt-2">
        <button
          type="button" onClick={onBack}
          className="flex-none px-6 py-3 rounded-[10px] border border-[rgba(16,32,55,0.15)] font-body text-navy/70 hover:border-navy/40 hover:text-navy transition-colors cursor-pointer"
        >
          ← Atrás
        </button>
        <button
          type="submit" disabled={loading}
          className="flex-1 px-6 py-3 rounded-[10px] bg-gold text-navy font-body font-semibold text-sm uppercase tracking-wider hover:scale-[1.02] transition-transform duration-150 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? 'Enviando...' : 'Recibir mi guía gratis →'}
        </button>
      </div>
    </form>
  )
}
