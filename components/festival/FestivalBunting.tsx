import { BUNTING_COLORS } from '@/lib/festival-data'

interface FestivalBuntingProps {
  count?:   number
  height?:  number
  opacity?: number
}

export function FestivalBunting({ count = 30, height = 34, opacity = 1 }: FestivalBuntingProps) {
  return (
    <div className="flex w-full items-start bg-[#163a52]" style={{ height }}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height,
            background: BUNTING_COLORS[i % BUNTING_COLORS.length],
            clipPath: 'polygon(0 0,100% 0,50% 100%)',
            opacity,
          }}
        />
      ))}
    </div>
  )
}
