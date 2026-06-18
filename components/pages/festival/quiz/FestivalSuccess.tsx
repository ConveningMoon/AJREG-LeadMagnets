export function FestivalSuccess({ name }: { name?: string }) {
  const suffix = name?.trim() ? `, ${name.trim().split(/\s+/)[0]}` : ''
  return (
    <div className="py-6 text-center" style={{ animation: 'pop .35s ease' }}>
      <div className="mx-auto mb-[22px] flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#3aa35a] text-[36px] text-white">✓</div>
      <h3 style={{ fontFamily: 'var(--font-dm-serif)' }} className="mb-3 text-[30px] text-[#163a52]">¡Listo{suffix}!</h3>
      <p className="mx-auto mb-6 max-w-[420px] text-[16px] leading-relaxed text-[#446]">
        Tu lugar está reservado. Te esperamos el <strong className="text-[#163a52]">20 de junio de 12:00 a 4:00 pm</strong> en 4092 Foxwood Drive, VA Beach.
      </p>
      <div className="inline-flex items-center gap-2.5 rounded-full bg-[#fdeceb] px-6 py-3 text-[15px] font-bold text-[#e23b2e]">
        🎉 ¡Nos vemos en el festival!
      </div>
    </div>
  )
}
