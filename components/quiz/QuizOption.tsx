'use client'
import { motion, useReducedMotion } from 'framer-motion'

interface QuizOptionProps {
  label:    string
  selected: boolean
  onClick:  () => void
}

export function QuizOption({ label, selected, onClick }: QuizOptionProps) {
  const pref = useReducedMotion()

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={[
        'w-full text-left px-5 py-4 rounded-md font-body font-medium text-base',
        'border-2 transition-colors duration-150 cursor-pointer',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
        selected
          ? 'border-gold bg-gold/10 text-navy'
          : 'border-cream bg-cream text-navy hover:border-gold/50 hover:bg-cream-dark',
      ].join(' ')}
      whileTap={pref ? {} : { scale: 0.99 }}
      transition={{ duration: 0.1 }}
    >
      <span className="flex items-center gap-3">
        <span
          className={[
            'w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors',
            selected ? 'border-gold bg-gold' : 'border-navy/30',
          ].join(' ')}
          aria-hidden="true"
        />
        {label}
      </span>
    </motion.button>
  )
}
