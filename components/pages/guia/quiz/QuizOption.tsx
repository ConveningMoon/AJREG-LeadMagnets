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
        'w-full text-left px-4 py-4 rounded-[10px] font-body text-navy text-base',
        'flex items-center justify-between gap-3 transition-colors duration-150 cursor-pointer',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
        selected
          ? 'border border-gold bg-gold/10'
          : 'border border-[rgba(16,32,55,0.10)] bg-[rgba(199,162,96,0.05)] hover:border-gold/40 hover:bg-gold/[0.07]',
      ].join(' ')}
      whileTap={pref ? {} : { scale: 0.99 }}
      transition={{ duration: 0.1 }}
    >
      <span className="flex-1 font-body text-navy text-[15px]">{label}</span>

      {/* Arrow icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        viewBox="0 0 1024 1024"
        className="text-gold flex-none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"
        />
      </svg>
    </motion.button>
  )
}
