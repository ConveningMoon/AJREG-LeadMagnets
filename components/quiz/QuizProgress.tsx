'use client'
import { motion, useReducedMotion } from 'framer-motion'

interface QuizProgressProps {
  step:  number // 0-based current step (0–5)
  total: number // always 6
}

export function QuizProgress({ step, total }: QuizProgressProps) {
  const pref = useReducedMotion()
  const pct  = ((step + 1) / total) * 100

  return (
    <div
      className="w-full"
      role="progressbar"
      aria-valuenow={step + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Paso ${step + 1} de ${total}`}
    >
      <div className="flex justify-between mb-2 font-body text-xs text-navy/50">
        <span>Paso {step + 1} de {total}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="h-1.5 bg-cream rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gold rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={pref ? { duration: 0 } : { duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
