import Image from 'next/image'
import { SPONSORS, FESTIVAL_EVENT } from '@/lib/festival-data'

const FOOTER_LOGO_HEIGHTS = ['h-[52px]', 'h-[30px]', 'h-[58px]'] as const

export function FestivalFooter() {
  return (
    <footer id="contacto" className="bg-[#0f2740] px-6 py-14 text-center text-[#cdd9e4]" style={{ scrollMarginTop: 64 }}>
      <div className="mx-auto max-w-[840px]">
        <div style={{ fontFamily: 'var(--font-dm-serif)' }} className="mb-1.5 text-[24px] text-white">Festival para la Comunidad Latina</div>
        <div className="mb-3.5 text-[14px]">20 de junio · 12:00–4:00 pm · 4092 Foxwood Drive, VA Beach, VA 23462</div>
        <a href={FESTIVAL_EVENT.phoneHref} className="mb-[34px] inline-flex items-center gap-2 text-[15px] font-bold text-[#f6b50a]">
          📞 {FESTIVAL_EVENT.phoneLabel}
        </a>

        <div className="mb-[18px] mt-[34px] border-t border-white/10 pt-[30px] text-[11.5px] font-bold tracking-[0.22em] text-[#7e93a8]">UNA INICIATIVA DE</div>
        <div className="flex flex-wrap items-center justify-center gap-11">
          {SPONSORS.map((s, i) => (
            <Image
              key={s.name}
              src={s.src}
              alt={s.name}
              width={s.w}
              height={s.h}
              className={`${FOOTER_LOGO_HEIGHTS[i]} w-auto opacity-90`}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          ))}
        </div>
      </div>
    </footer>
  )
}
