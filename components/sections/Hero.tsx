'use client'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

function scrollToQuiz() {
  document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })
}

const containerVariants = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden:   { opacity: 0, y: 24 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function Hero() {
  const pref = useReducedMotion()

  return (
    <header className="relative overflow-hidden bg-base">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Text column ── */}
          <motion.div
            variants={pref ? {} : containerVariants}
            initial={pref ? {} : 'hidden'}
            animate={pref ? {} : 'visible'}
            className="space-y-6"
          >
            <motion.p
              variants={pref ? {} : itemVariants}
              className="font-body text-xs font-semibold tracking-[0.16em] uppercase text-gold"
            >
              Guía gratuita para compradores
            </motion.p>

            <motion.h1
              variants={pref ? {} : itemVariants}
              className="font-heading text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold text-navy leading-tight"
            >
              Compra tu próxima casa en Hampton Roads con total confianza
            </motion.h1>

            <motion.p
              variants={pref ? {} : itemVariants}
              className="font-body text-lg text-navy/70 leading-relaxed max-w-lg"
            >
              Descarga gratis nuestra Guía del Comprador Hispano y descubre el proceso
              paso a paso que han seguido cientos de familias para encontrar el hogar
              ideal — sin sorpresas, sin estrés y al mejor precio.
            </motion.p>

            <motion.div
              variants={pref ? {} : itemVariants}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
              <Button onClick={scrollToQuiz} variant="primary">
                Quiero mi guía gratis
              </Button>
              <p className="font-body text-sm text-navy/50">
                100% gratis · Tus datos están protegidos
              </p>
            </motion.div>
          </motion.div>

          {/* ── Guide cover image column ── */}
          <motion.div
            className="flex justify-center lg:justify-end"
            animate={pref ? {} : { y: [0, -8, 0] }}
            transition={pref ? {} : { duration: 3.5, ease: 'easeInOut', repeat: Infinity }}
          >
            <Image
              src="/images/guide-cover.webp"
              alt="Guía del Comprador Hispano — portada"
              width={340}
              height={440}
              priority
              className="rounded-lg shadow-card-hover"
            />
          </motion.div>
        </div>
      </div>
    </header>
  )
}
