'use client'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import type { LMContent } from '@/lib/lm-content'

type TestimonialsProps = LMContent['testimonials']

export function Testimonials({ label, title, items }: TestimonialsProps) {
  const pref = useReducedMotion()

  return (
    <section className="py-20" style={{ backgroundColor: 'rgba(16,32,55,0.03)' }}>
      <div className="max-w-[940px] mx-auto px-6">

        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <p className="font-body text-[11px] font-semibold tracking-[0.18em] uppercase text-opaque">
            {label}
          </p>
          <h2
            className="font-heading font-semibold text-navy"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.05' }}
          >
            {title}
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map(({ image, name, location, quote }, i) => (
            <motion.figure
              key={name}
              initial={pref ? {} : { opacity: 0, y: 20 }}
              whileInView={pref ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.1 }}
              className="bg-white rounded-[20px] overflow-hidden flex flex-col"
              style={{ boxShadow: '5px 5px 15px 1px rgba(16,32,55,0.08)' }}
            >
              {/* Photo */}
              <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 313px"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-16"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.95))' }}
                />
              </div>

              {/* Content */}
              <div className="px-6 pb-6 pt-3 flex flex-col gap-3 flex-1">
                <div
                  className="font-heading text-gold leading-none select-none"
                  style={{ fontSize: '3rem', lineHeight: 1 }}
                  aria-hidden="true"
                >
                  &ldquo;
                </div>
                <blockquote
                  className="font-body italic text-navy/75 leading-relaxed flex-1"
                  style={{ fontSize: '0.95rem', marginTop: '-18px' }}
                >
                  {quote}
                </blockquote>
                <figcaption className="pt-3 border-t border-[rgba(16,32,55,0.08)]">
                  <p className="font-body font-semibold text-navy text-sm">{name}</p>
                  <p className="font-body text-xs text-opaque mt-0.5">{location}</p>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
