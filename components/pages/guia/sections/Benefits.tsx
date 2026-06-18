'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { Calculator, MapPin, TrendingUp, FileText, ClipboardList, Shield } from 'lucide-react'

const BENEFITS = [
  {
    Icon: Calculator,
    title: 'Planificación financiera',
    desc:  'Calcula cuánto puedes pagar realmente y qué gastos extras debes considerar antes de firmar.',
  },
  {
    Icon: MapPin,
    title: 'Cómo elegir la zona ideal',
    desc:  'Criterios para evaluar plusvalía, seguridad, servicios y proyección a 5 y 10 años.',
  },
  {
    Icon: TrendingUp,
    title: 'Estrategias de negociación',
    desc:  'Tácticas reales que usan compradores expertos para conseguir el mejor precio.',
  },
  {
    Icon: FileText,
    title: 'Aspectos legales clave',
    desc:  'Documentos imprescindibles, escrituras y avalúos: lo que sí o sí debes revisar.',
  },
  {
    Icon: ClipboardList,
    title: 'Checklists imprimibles',
    desc:  'Listas paso a paso para visitar propiedades y comparar opciones objetivamente.',
  },
  {
    Icon: Shield,
    title: 'Cierre sin sorpresas',
    desc:  'Qué esperar del proceso de cierre y cómo proteger tu inversión a largo plazo.',
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
            Lo que aprenderás
          </p>
          <h2
            className="font-heading font-semibold text-navy"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.05' }}
          >
            Toda la información que un comprador inteligente necesita
          </h2>
          <p className="font-body text-opaque text-base leading-6 max-w-lg mx-auto pt-1">
            Más de 40 páginas de contenido práctico, escrito por nuestro equipo de asesores
            con +15 años acompañando familias en su decisión más importante
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
