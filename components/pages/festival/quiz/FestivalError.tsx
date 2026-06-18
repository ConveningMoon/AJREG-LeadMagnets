export function FestivalError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="py-8 text-center">
      <div className="mx-auto mb-5 flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#e23b2e]/10 text-[32px]">⚠️</div>
      <h3 style={{ fontFamily: 'var(--font-dm-serif)' }} className="mb-2 text-[24px] text-[#163a52]">Algo salió mal</h3>
      <p className="mx-auto mb-6 max-w-[360px] text-[15px] text-[#446]">No pudimos guardar tu registro. Por favor inténtalo de nuevo.</p>
      <button onClick={onRetry}
        className="cursor-pointer rounded-full bg-[#e23b2e] px-6 py-3 font-bold text-white transition-transform hover:-translate-y-0.5">
        Intentar de nuevo
      </button>
    </div>
  )
}
