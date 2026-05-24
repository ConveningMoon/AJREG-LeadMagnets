import { Quiz } from '@/components/quiz/Quiz'

export function QuizSection() {
  return (
    <section id="quiz" className="bg-base py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 space-y-2">
          <p className="font-body text-xs font-semibold tracking-[0.16em] uppercase text-gold">
            Cuéntanos sobre tu búsqueda
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-navy">
            Recibe tu guía gratis
          </h2>
          <p className="font-body text-navy/60">
            Solo 6 preguntas rápidas para enviarte recursos personalizados
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-card border border-cream p-8">
          <Quiz />
        </div>
      </div>
    </section>
  )
}
