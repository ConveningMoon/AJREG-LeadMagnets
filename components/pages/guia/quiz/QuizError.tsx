import { AlertCircle } from 'lucide-react'

interface QuizErrorProps {
  onRetry: () => void
}

export function QuizError({ onRetry }: QuizErrorProps) {
  return (
    <div className="text-center py-10 space-y-4">
      <AlertCircle className="w-16 h-16 text-red-400 mx-auto" strokeWidth={1.5} />
      <h3 className="font-heading text-2xl font-semibold text-navy">Algo salió mal</h3>
      <p className="font-body text-navy/70 max-w-sm mx-auto leading-relaxed">
        No pudimos procesar tu solicitud. Intenta de nuevo o escríbenos a{' '}
        <a
          href="mailto:adrysofirealestate@gmail.com"
          className="text-gold underline hover:text-navy transition-colors"
        >
          adrysofirealestate@gmail.com
        </a>
      </p>
      <button
        type="button" onClick={onRetry}
        className="mt-2 px-8 py-3 bg-navy text-white rounded-md font-body font-medium hover:bg-navy-light transition-colors cursor-pointer"
      >
        Intentar de nuevo
      </button>
    </div>
  )
}
