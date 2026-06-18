'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { Calculator, CreditCard, Gift, MapPin, ClipboardList, Shield } from 'lucide-react'

const BENEFITS = [
  {
    Icon:  Calculator,
    title: '¿Cuánto puedes pagar de verdad?',
    desc:  'Entiende el pago mensual real — con impuestos, seguro y todos los gastos — antes de enamorarte de una propiedad.',
  },
  {
    Icon:  CreditCard,
    title: 'Comprar sin número de seguro social',
    desc:  'Sí, es posible y es legal. Cómo funcionan los préstamos ITIN en Virginia y qué documentos necesitas.',
  },
  {
    Icon:  Gift,
    title: 'Programas de ayuda en Virginia',
    desc:  'Virginia Housing tiene hasta ~$10,000 en ayuda para el enganche que no tienes que devolver. Te explicamos cómo calificar.',
  },
  {
    Icon:  MapPin,
    title: 'Las zonas ideales en Hampton Roads',
    desc:  'Virginia Beach, Chesapeake, Suffolk, Norfolk y más — cuál encaja mejor con tu familia según escuelas, precio y comunidad.',
  },
  {
    Icon:  ClipboardList,
    title: 'El proceso completo, paso a paso',
    desc:  'Desde la pre-aprobación hasta el día que recibes las llaves, sin sorpresas en ninguna etapa.',
  },
  {
    Icon:  Shield,
    title: 'Protégete de las trampas',
    desc:  'Las estafas más comunes contra familias hispanas en el proceso de compra — y cómo identificarlas a tiempo.',
  },
]

export function Benefits() {
  const pref = useReducedMotion()

  return (
    <section className="py-20" style={{ backgroundColor: 'rgba(16,32,55,0.05)' }}>
      <div className="max-w-[940px] mx-auto px-6">

        {/* Header */}
        <div className="text-center space-y-3">
          <p className="font-body text-[11px] font-semibold tracking-[0.18em] uppercase text-opaque">
            Lo que contiene esta guía
          </p>
          <h2
            className="font-heading font-semibold text-navy"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.05' }}
          >
            Todo lo que nadie te explica, ahora en español y paso a paso
          </h2>
          <p className="font-body text-navy/60 text-base leading-relaxed max-w-2xl mx-auto">
            Adriana Meléndez preparó esta guía basada en años acompañando a familias hispanas en
            Hampton Roads — incluyendo familias que compraron con ITIN, familias militares y
            compradores primerizos que pensaban que comprar no era para ellos.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {BENEFITS.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={pref ? {} : { opacity: 0, y: 20 }}
              whileInView={pref ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.08 }}
              className="bg-white rounded-[20px] p-5"
              style={{ boxShadow: '5px 5px 15px 1px rgba(16,32,55,0.10)' }}
            >
              {/* Icon + title row */}
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gold rounded-[10px] p-1.5 flex-none">
                  <Icon
                    className="w-[22px] h-[22px] text-white"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <h3
                  className="font-heading font-semibold text-navy"
                  style={{ fontSize: '1.2rem' }}
                >
                  {title}
                </h3>
              </div>

              {/* Description */}
              <p className="font-body text-sm text-navy/70 leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
