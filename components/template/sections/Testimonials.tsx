'use client'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const TESTIMONIALS = [
  {
    id:       1,
    image:    '/testimonials/T_1.webp',
    name:     'Maduro Family',
    location: 'Virginia Beach · Casa unifamiliar',
    quote:    'Teníamos miedo de que nuestro presupuesto no alcanzara. Adriana nos explicó los programas de ayuda de Virginia y encontramos dinero para el enganche que ni sabíamos que existía. En menos de dos meses, nuestros hijos ya tenían su cuarto.',
  },
  {
    id:       2,
    image:    '/testimonials/T_2.webp',
    name:     'Flores Family',
    location: 'North Carolina · Townhouse',
    quote:    'Lo que más nos importaba era el barrio y las escuelas. Adriana conoce Hampton Roads como nadie — nos mostró exactamente dónde buscar y por qué. Encontramos la casa con patio que queríamos, en la zona perfecta.',
  },
  {
    id:       3,
    image:    '/testimonials/T_3.webp',
    name:     'Roberto M.',
    location: 'Virginia Beach · Townhouse',
    quote:    'Como militar, mis horarios cambian constantemente. Adriana se movió a mi ritmo, me explicó el préstamo VA paso a paso y manejó todo. Cerré sin estrés y sin sorpresas.',
  },
]

export function Testimonials() {
  const pref = useReducedMotion()

  return (
    <section className="py-20" style={{ backgroundColor: 'rgba(16,32,55,0.03)' }}>
      <div className="max-w-[940px] mx-auto px-6">

        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <p className="font-body text-[11px] font-semibold tracking-[0.18em] uppercase text-opaque">
            Familias que ya tienen sus llaves
          </p>
          <h2
            className="font-heading font-semibold text-navy"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.05' }}
          >
            Ellos también pensaban que comprar era complicado
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map(({ id, image, name, location, quote }, i) => (
            <motion.figure
              key={id}
              initial={pref ? {} : { opacity: 0, y: 20 }}
              whileInView={pref ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.1 }}
              className="bg-white rounded-[20px] overflow-hidden flex flex-col"
              style={{ boxShadow: '5px 5px 15px 1px rgba(16,32,55,0.08)' }}
            >
              {/* Photo — prominent top block */}
              <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 313px"
                />
                {/* Gold gradient overlay at bottom for smooth transition */}
                <div
                  className="absolute inset-x-0 bottom-0 h-16"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.95))' }}
                />
              </div>

              {/* Content */}
              <div className="px-6 pb-6 pt-3 flex flex-col gap-3 flex-1">
                {/* Decorative quote mark */}
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
