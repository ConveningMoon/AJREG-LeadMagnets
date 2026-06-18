'use client'
import Image from 'next/image'
import { INFO_ROWS } from '@/lib/festival-data'

function scrollToForm() {
  document.getElementById('registro')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function FestivalDetails() {
  return (
    <section id="festival" className="bg-[#fbf7ef] px-6 py-[78px]" style={{ scrollMarginTop: 64 }}>
      <div className="mx-auto grid max-w-[1040px] items-center gap-11" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))' }}>
        <div>
          <div className="mb-3.5 text-[13px] font-bold tracking-[0.3em] text-[#e23b2e]">DETALLES DEL EVENTO</div>
          <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(30px,4.4vw,46px)', lineHeight: 1.05 }} className="mb-7">
            Te esperamos<br />este 20 de junio
          </h2>
          <div className="flex flex-col gap-1">
            {INFO_ROWS.map((r) => (
              <div key={r.label} className="flex items-center gap-4 border-b border-[rgba(22,58,82,0.1)] py-4">
                <span className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-xl border border-[rgba(22,58,82,0.12)] bg-white text-[22px]">{r.icon}</span>
                <div>
                  <div className="text-[12.5px] font-bold tracking-[0.12em] text-[#e23b2e]">{r.label}</div>
                  <div className="text-[17px] font-bold text-[#163a52]">{r.value}</div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={scrollToForm}
            className="mt-[30px] cursor-pointer rounded-full bg-[#e23b2e] px-[34px] py-4 text-[16px] font-extrabold text-white shadow-[0_10px_22px_rgba(226,59,46,0.25)] transition-transform hover:-translate-y-0.5">
            Confirmar mi asistencia
          </button>
        </div>

        <div className="relative">
          <div className="absolute -left-3.5 -top-3.5 z-0 h-20 w-20 rounded-[18px] bg-[#f6b50a]" />
          <div className="absolute -bottom-4 -right-3 z-0 h-16 w-16 rounded-full bg-[#3aa35a]" />
          <Image
            src="/FestivalLatino/Latinos.webp"
            alt="Banderas de los países de la comunidad latina"
            width={600}
            height={338}
            className="relative z-[1] block w-full rounded-[22px] border-[6px] border-white shadow-[0_18px_40px_rgba(22,58,82,0.18)]"
            style={{ aspectRatio: '4/3', objectFit: 'cover' }}
          />
        </div>
      </div>
    </section>
  )
}
