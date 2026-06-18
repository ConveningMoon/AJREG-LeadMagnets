import { PERKS } from '@/lib/festival-data'

export function FestivalResources() {
  return (
    <section id="recursos" className="relative overflow-hidden bg-[#163a52] px-6 py-[78px] text-white" style={{ scrollMarginTop: 64 }}>
      <div className="absolute right-[8%] top-[30px] text-[34px]" style={{ color: 'rgba(246,181,10,.5)' }} aria-hidden="true">♫</div>
      <div className="absolute bottom-10 left-[6%] text-[28px]" style={{ color: 'rgba(246,181,10,.4)' }} aria-hidden="true">♩</div>

      <div className="relative mx-auto max-w-[1000px] text-center">
        <div className="mb-3 text-[13px] font-bold tracking-[0.3em] text-[#f6b50a]">UN DÍA PARA TODA LA FAMILIA</div>
        <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(32px,5vw,52px)', lineHeight: 1.05 }} className="mb-3.5">
          Recursos <span className="text-[#f6b50a]">sin costo</span> para la comunidad
        </h2>
        <p className="mx-auto mb-12 max-w-[560px] text-[17px] leading-relaxed text-[#cdd9e4]">
          Un día lleno de alegría, música, unión y apoyo. Ven a celebrar nuestra cultura y aprovecha todo lo que tenemos para ti.
        </p>

        <div className="grid grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-4">
          {PERKS.map((p) => (
            <div
              key={p.title}
              className="relative overflow-hidden rounded-[22px] border border-white/10 px-[26px] pb-7 pt-8 transition-transform hover:-translate-y-1.5"
              style={{ background: 'linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.025))' }}
            >
              <div className="absolute left-0 top-0 h-1 w-full" style={{ background: p.color }} />
              <div className="absolute -right-7 -top-7 h-24 w-24 rounded-full" style={{ background: p.color, opacity: 0.13 }} />
              <div className="relative mb-[22px] flex h-[60px] w-[60px] items-center justify-center rounded-[18px] text-[28px] shadow-[0_10px_24px_rgba(0,0,0,0.3)]" style={{ background: p.color }}>
                {p.icon}
              </div>
              <div className="mb-[11px] text-[18px] font-extrabold leading-tight tracking-[-0.01em] text-white">{p.title}</div>
              <div className="mb-3.5 h-[3px] w-[34px] rounded-sm" style={{ background: p.color }} />
              <div className="text-[14.5px] leading-relaxed text-[#c2d0dd]">{p.desc}</div>
            </div>
          ))}
        </div>

        <div
          className="mt-8 inline-flex items-center gap-3 rounded-[14px] px-6 py-4 text-left text-[15px] leading-snug"
          style={{ background: 'rgba(246,181,10,.14)', border: '1px solid rgba(246,181,10,.35)', color: '#fbe7b0' }}
        >
          <span className="text-[24px]">🚑</span>
          <span>La <strong className="text-white">Car-A-Van de Salud de Bon Secours</strong> ofrecerá <strong className="text-white">chequeos médicos gratis</strong> para nuestra comunidad.</span>
        </div>
      </div>
    </section>
  )
}
