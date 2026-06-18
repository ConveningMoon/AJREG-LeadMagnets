interface FestivalProgressProps {
  step:  number
  total: number
}

export function FestivalProgress({ step, total }: FestivalProgressProps) {
  const pct = Math.min(100, Math.round((step / total) * 100))
  return (
    <div className="pt-6 pb-4">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#163a52]/50">
        Paso {Math.min(step + 1, total)} de {total}
      </p>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#163a52]/10">
        <div
          className="h-full rounded-full bg-[#e23b2e] transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
