'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { BENEFIT_ICONS } from '@/lib/lm-content'
import type { LMContent } from '@/lib/lm-content'

type BenefitsProps = LMContent['benefits']

export function Benefits({ label, title, subtitle, cards }: BenefitsProps) {
  const pref = useReducedMotion()

  return (
    <section className="py-20" style={{ backgroundColor: 'rgba(16,32,55,0.05)' }}>
      <div className="max-w-[940px] mx-auto px-6">

        {/* Header */}
        <div className="text-center space-y-3">
          <p className="font-body text-[11px] font-semibold tracking-[0.18em] uppercase text-opaque">
            {label}
          </p>
          <h2
            className="font-heading font-semibold text-navy"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.05' }}
          >
            {title}
          </h2>
          <p className="font-body text-navy/60 text-base leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {cards.map(({ icon, title: cardTitle, desc }, i) => {
            const Icon = BENEFIT_ICONS[icon]
            return (
              <motion.div
                key={cardTitle}
                initial={pref ? {} : { opacity: 0, y: 20 }}
                whileInView={pref ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.08 }}
                className="bg-white rounded-[20px] p-5"
                style={{ boxShadow: '5px 5px 15px 1px rgba(16,32,55,0.10)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gold rounded-[10px] p-1.5 flex-none">
                    <Icon className="w-[22px] h-[22px] text-white" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3 className="font-heading font-semibold text-navy" style={{ fontSize: '1.2rem' }}>
                    {cardTitle}
                  </h3>
                </div>
                <p className="font-body text-sm text-navy/70 leading-relaxed">{desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
