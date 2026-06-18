import Image from 'next/image'
import { FESTIVAL_NAV_LINKS, FESTIVAL_EVENT } from '@/lib/festival-data'

export function FestivalNav() {
  return (
    <nav className="sticky top-0 z-[60] border-b border-white/10 bg-[#163a52] shadow-[0_2px_16px_rgba(0,0,0,0.22)]">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-5 px-6 py-2.5">
        <a href="#inicio" className="flex flex-none items-center">
          <Image
            src="/FestivalLatino/A&J.PNG"
            alt="A&J Group Real Estate"
            width={576}
            height={340}
            priority
            className="h-12 w-auto"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </a>

        <div className="hidden items-center gap-8 min-[1040px]:flex">
          {FESTIVAL_NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href}
              className="text-[15.5px] font-semibold text-white transition-colors hover:text-[#f6b50a]">
              {label}
            </a>
          ))}
        </div>

        <a href={FESTIVAL_EVENT.phoneHref}
          className="inline-flex flex-none items-center gap-2.5 rounded-full bg-[#f6b50a] px-[22px] py-[11px] text-[15px] font-extrabold text-[#163a52] shadow-[0_6px_18px_rgba(246,181,10,0.3)] transition-transform hover:-translate-y-0.5">
          <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[rgba(22,58,82,0.18)] text-[13px]">📞</span>
          {FESTIVAL_EVENT.phoneLabel}
        </a>
      </div>
    </nav>
  )
}
