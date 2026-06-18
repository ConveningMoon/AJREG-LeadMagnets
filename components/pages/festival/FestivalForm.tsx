import { FestivalBunting } from './FestivalBunting'
import { FestivalQuiz }    from './quiz/FestivalQuiz'

export function FestivalForm({ channelPublicId }: { channelPublicId: string }) {
  return (
    <section id="registro" className="relative overflow-hidden bg-[#163a52] px-6 py-[78px]" style={{ scrollMarginTop: 64 }}>
      <div className="absolute left-0 top-0 w-full">
        <FestivalBunting count={24} height={24} opacity={0.85} />
      </div>
      <div className="relative mx-auto max-w-[560px]">
        <div className="mb-8 text-center">
          <div className="mb-3 text-[13px] font-bold tracking-[0.3em] text-[#f6b50a]">ASEGURA TU LUGAR</div>
          <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(30px,5vw,44px)', lineHeight: 1.05 }} className="mb-3 text-white">
            Reserva tu participación
          </h2>
          <p className="mx-auto max-w-[420px] text-[16px] leading-relaxed text-[#cdd9e4]">
            Déjanos tus datos y te confirmamos tu lugar. La entrada es completamente gratis.
          </p>
        </div>
        <div className="rounded-[24px] bg-white px-8 pb-8 pt-2 shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
          <FestivalQuiz channelPublicId={channelPublicId} />
        </div>
      </div>
    </section>
  )
}
