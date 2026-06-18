'use client'
import Image from 'next/image'
import { SPONSORS, FESTIVAL_EVENT } from '@/lib/festival-data'

function scrollToForm() {
  document.getElementById('registro')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function FestivalHero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden px-6 pb-[76px] pt-[62px] text-center"
      style={{
        scrollMarginTop: 72,
        background:
          'radial-gradient(circle at 12% 18%, rgba(246,181,10,.07), transparent 38%),' +
          'radial-gradient(circle at 88% 30%, rgba(43,127,212,.06), transparent 40%), #fbf7ef',
      }}
    >
      <div className="relative mx-auto max-w-[880px]">
        {/* Presented by */}
        <div className="mb-[34px] flex flex-wrap items-center justify-center gap-[26px]">
          <span className="text-[11.5px] font-bold tracking-[0.22em] text-[#446] opacity-55">PRESENTADO POR</span>
          <Image src={SPONSORS[0].src} alt={SPONSORS[0].name} width={SPONSORS[0].w} height={SPONSORS[0].h} className="h-14 w-auto" />
          <span className="h-[34px] w-px bg-[#163a52] opacity-[0.18]" />
          <Image src={SPONSORS[1].src} alt={SPONSORS[1].name} width={SPONSORS[1].w} height={SPONSORS[1].h} className="h-[34px] w-auto" />
          <span className="h-[34px] w-px bg-[#163a52] opacity-[0.18]" />
          <Image src={SPONSORS[2].src} alt={SPONSORS[2].name} width={SPONSORS[2].w} height={SPONSORS[2].h} className="h-[52px] w-auto" />
        </div>

        <div className="mb-3.5 text-[13px] font-bold tracking-[0.32em] text-[#e23b2e]">☼ CELEBRA CON NOSOTROS</div>

        <h1 className="text-[#163a52] tracking-[-0.01em]" style={{ fontFamily: 'var(--font-dm-serif)', lineHeight: 0.92 }}>
          <span className="block" style={{ fontSize: 'clamp(46px,9vw,108px)' }}>FESTIVAL</span>
          <span className="block" style={{ fontSize: 'clamp(20px,3.4vw,38px)', letterSpacing: '.06em', margin: '6px 0 2px' }}>PARA LA COMUNIDAD</span>
          <span className="relative block" style={{ fontSize: 'clamp(56px,11vw,132px)' }}>
            LATINA
            <span className="mx-auto block" style={{ height: 5, width: 'min(420px,70%)', marginTop: 14, background: 'linear-gradient(90deg,#e23b2e,#f6b50a,#3aa35a)' }} />
          </span>
        </h1>

        <p className="mx-auto mt-[26px] max-w-[560px] text-[#163a52]" style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontSize: 'clamp(20px,3vw,30px)' }}>
          Celebra con nosotros la <span className="not-italic text-[#e23b2e]">cultura hispana</span>.
        </p>

        <div className="mt-7 inline-block">
          <div style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontSize: 'clamp(30px,5vw,56px)', color: '#e23b2e', lineHeight: 1, letterSpacing: '-.01em' }}>
            ¡Te esperamos!
          </div>
          <div className="mt-1.5 flex items-center justify-center gap-1.5">
            <span className="h-0.5 flex-1" style={{ background: 'linear-gradient(90deg,transparent,#f6b50a)' }} />
            <span className="text-[18px]">🎉</span>
            <span className="h-0.5 flex-1" style={{ background: 'linear-gradient(90deg,#f6b50a,transparent)' }} />
          </div>
        </div>

        {/* Quick facts */}
        <div className="mt-10 flex flex-wrap justify-center gap-3.5">
          <div className="flex items-center gap-3 rounded-2xl border border-[rgba(22,58,82,0.1)] bg-white px-[22px] py-4 shadow-[0_4px_14px_rgba(22,58,82,0.05)]">
            <span style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 34, lineHeight: 1, color: '#e23b2e' }}>20</span>
            <div className="text-left leading-tight">
              <div className="text-[16px] font-extrabold">Junio</div>
              <div className="text-[13px] text-[#446] opacity-70">Viernes</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-[rgba(22,58,82,0.1)] bg-white px-[22px] py-4 shadow-[0_4px_14px_rgba(22,58,82,0.05)]">
            <span className="text-[26px]">🕐</span>
            <div className="text-left leading-tight">
              <div className="text-[16px] font-extrabold">{FESTIVAL_EVENT.timeShort}</div>
              <div className="text-[13px] text-[#446] opacity-70">Horario</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-[rgba(22,58,82,0.1)] bg-white px-[22px] py-4 shadow-[0_4px_14px_rgba(22,58,82,0.05)]">
            <span className="text-[24px]">📍</span>
            <div className="text-left leading-tight">
              <div className="text-[16px] font-extrabold">{FESTIVAL_EVENT.addressCity}</div>
              <div className="text-[13px] text-[#446] opacity-70">{FESTIVAL_EVENT.addressLine}</div>
            </div>
          </div>
        </div>

        <button onClick={scrollToForm}
          className="mt-9 cursor-pointer rounded-full bg-[#e23b2e] px-10 py-[18px] text-[17px] font-extrabold text-white shadow-[0_12px_26px_rgba(22,58,82,0.25)] transition-transform hover:-translate-y-0.5">
          Reserva tu lugar →
        </button>
        <div className="mt-3 text-[13px] text-[#446] opacity-70">Entrada gratuita · Toda la familia es bienvenida</div>
      </div>
    </section>
  )
}
