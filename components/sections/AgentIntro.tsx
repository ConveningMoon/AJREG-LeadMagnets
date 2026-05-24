import Image from 'next/image'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

export function AgentIntro() {
  return (
    <div className="bg-cream/40">
      <SectionWrapper>
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">

          {/* Photo */}
          <div className="flex-none">
            <Image
              src="/images/adriana.webp"
              alt="Adriana Melendez, REALTOR® — Especialista en compradores hispanos"
              width={200}
              height={200}
              className="rounded-full shadow-card object-cover w-[200px] h-[200px]"
            />
          </div>

          {/* Bio */}
          <div className="space-y-3 max-w-xl">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-navy">
                Adriana Melendez
              </h2>
              <p className="font-body text-sm font-semibold text-gold tracking-wide mt-0.5">
                REALTOR® · Especialista en compradores hispanos en Hampton Roads
              </p>
            </div>

            {/* REEMPLAZAR: bio real de Adriana — 2-3 frases sobre su historia, misión y experiencia */}
            <p className="font-body text-navy/70 leading-relaxed">
              Durante más de{' '}
              {/* REEMPLAZAR: número real de años */}[X] años he acompañado a familias
              hispanas en una de las decisiones más importantes de su vida. Mi misión es{' '}
              {/* REEMPLAZAR: frase de misión personal de Adriana */}[tu misión aquí].
              Cada familia merece un proceso claro, transparente y sin sorpresas.
            </p>

            {/* REEMPLAZAR: cita con número real de familias atendidas */}
            <p className="font-body text-sm text-navy/50 italic border-l-2 border-gold pl-4">
              "He tenido el honor de ayudar a [X] familias a encontrar su hogar en Hampton Roads."
            </p>
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}
