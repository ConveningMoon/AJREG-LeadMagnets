'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { type ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
}

export function SectionWrapper({ children, className = '', id }: SectionWrapperProps) {
  const pref = useReducedMotion()

  return (
    <motion.section
      id={id}
      className={`px-4 sm:px-6 lg:px-8 py-20 max-w-6xl mx-auto ${className}`}
      initial={pref ? {} : { opacity: 0, y: 20 }}
      whileInView={pref ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  )
}
