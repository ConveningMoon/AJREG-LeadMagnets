import { Quiz } from '@/components/quiz/Quiz'

export function QuizSection() {
  return (
    <section
      id="quiz"
      className="py-20"
      style={{ backgroundColor: 'rgba(199,162,96,0.05)' }}
    >
      <div className="max-w-[940px] mx-auto px-6">

        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <p className="font-body text-[11px] font-semibold tracking-[0.18em] uppercase text-opaque">
            Acceso a la guía
          </p>
          <h2
            className="font-heading font-bold text-navy"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.05' }}
          >
            Cuéntanos sobre tu búsqueda y recibe tu guía gratis
          </h2>
          <p className="font-body text-navy/60 text-base">
            Solo 6 preguntas rápidas para enviarte recursos personalizados
          </p>
        </div>

        {/* Quiz card */}
        <div
          className="bg-white rounded-[20px] px-8 sm:px-10 pb-10 pt-3"
          style={{ boxShadow: '7px 6px 20px rgba(16,32,55,0.20)' }}
        >
          <Quiz />
        </div>
      </div>
    </section>
  )
}
