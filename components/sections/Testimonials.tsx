'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { SectionWrapper }   from '@/components/ui/SectionWrapper'

// REEMPLAZAR: sustituye este array con testimonios reales
// Estructura: añade tantos objetos como necesites, el grid se adapta solo
const TESTIMONIALS = [
  {
    id:       1,
    name:     'María G.',
    location: 'Virginia Beach · Casa unifamiliar',
    quote:    'REEMPLAZAR — Cita real de la cliente aquí. Ejemplo: "Adriana nos guió paso a paso y nunca nos sentimos solos en el proceso. ¡Gracias a la guía entendimos todo desde el principio!"',
    photo:    '/images/testimonials/1.webp', // REEMPLAZAR con foto real
  },
  {
    id:       2,
    name:     'Carlos & Ana R.',
    location: 'Chesapeake · Townhouse',
    quote:    'REEMPLAZAR — Cita real del cliente aquí. Ejemplo: "No sabíamos nada del proceso de compra aquí. La guía fue nuestra biblia durante meses de búsqueda."',
    photo:    '/images/testimonials/2.webp',
  },
  {
    id:       3,
    name:     'Roberto M.',
    location: 'Norfolk · Condominio',
    quote:    'REEMPLAZAR — Cita real del cliente aquí. Ejemplo: "Gracias al equipo de A&J encontramos el hogar perfecto dentro de nuestro presupuesto. 100% recomendados."',
    photo:    '/images/testimonials/3.webp',
  },
]

export function Testimonials() {
  const pref = useReducedMotion()

  return (
    <div className="bg-cream/30">
      <SectionWrapper>
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-navy text-center mb-12">
          Familias que ya encontraron su hogar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ id, name, location, quote, photo: _photo }, i) => (
            <motion.figure
              key={id}
              className="bg-white rounded-lg p-7 shadow-card border border-cream flex flex-col gap-4"
              initial={pref ? {} : { opacity: 0, y: 24 }}
              whileInView={pref ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={pref ? {} : { duration: 0.4, ease: 'easeOut', delay: i * 0.1 }}
            >
              <blockquote className="font-body text-navy/70 leading-relaxed italic flex-1">
                "{quote}"
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-3 border-t border-cream">
                {/* REEMPLAZAR: cuando las fotos estén disponibles, sustituye ImagePlaceholder
                    por:
                    <Image src={_photo} alt={`Foto de ${name}`} width={48} height={48}
                           className="rounded-full object-cover flex-none" />
                */}
                <ImagePlaceholder width={48} height={48} className="rounded-full flex-none" />
                <div>
                  <p className="font-body font-semibold text-navy text-sm">{name}</p>
                  <p className="font-body text-xs text-navy/50">{location}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </SectionWrapper>
    </div>
  )
}
