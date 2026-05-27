'use client'
import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface ButtonProps {
  children:  ReactNode
  variant?:  'primary' | 'secondary'
  onClick?:  () => void
  type?:     'button' | 'submit'
  disabled?: boolean
  className?: string
}

export function Button({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl ' +
    'font-body font-semibold text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ' +
    'disabled:opacity-60 disabled:cursor-not-allowed'

  const variants = {
    primary:   'bg-gold text-navy hover:bg-gold-dark',
    secondary: 'bg-transparent text-navy border border-navy/25 hover:border-navy/50 hover:bg-cream',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.button>
  )
}
