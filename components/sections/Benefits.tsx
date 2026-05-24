'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { Calculator, MapPin, TrendingUp, FileText, ClipboardList, Shield } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

const BENEFITS = [
  {
    Icon: Calculator,
    title: 'Planificación financiera',
    desc:  'Calcula cuánto puedes pagar realmente y qué gastos extras considerar antes de firmar.',
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
    <SectionWrapper>
      <div className="text-center mb-14 space-y-3">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-navy">
          Todo lo que un comprador inteligente necesita saber
        </h2>
        <p className="font-body text-navy/60 max-w-2xl mx-auto">
          Más de 40 páginas de contenido práctico, escrito por nuestro equipo con años
          acompañando familias en su decisión más importante.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {BENEFITS.map(({ Icon, title, desc }, i) => (
          <motion.div
            key={title}
            className="bg-white rounded-lg p-7 shadow-card border border-cream hover:shadow-card-hover transition-shadow duration-300"
            initial={pref ? {} : { opacity: 0, y: 24 }}
            whileInView={pref ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={pref ? {} : { duration: 0.4, ease: 'easeOut', delay: i * 0.08 }}
          >
            <Icon className="w-8 h-8 text-gold mb-4" strokeWidth={1.5} aria-hidden="true" />
            <h3 className="font-heading text-lg font-semibold text-navy mb-2">{title}</h3>
            <p className="font-body text-sm text-navy/60 leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
