import { CheckCircle, MailCheck } from 'lucide-react'

interface QuizSuccessProps {
  /** True when the CRM responded with status: 'already_submitted' */
  alreadySubmitted?: boolean
}

export function QuizSuccess({ alreadySubmitted = false }: QuizSuccessProps) {
  if (alreadySubmitted) {
    return (
      <div className="text-center py-10 space-y-4">
        <MailCheck className="w-16 h-16 text-gold mx-auto" strokeWidth={1.5} />
        <h3 className="font-heading text-2xl font-semibold text-navy">
          Ya te enviamos el material
        </h3>
        <p className="font-body text-navy/70 max-w-sm mx-auto leading-relaxed">
          Revisamos nuestros registros y ya te enviamos la guía a este correo.
          Si no la encuentras, revisa tu carpeta de spam o correo no deseado.
        </p>
        <p className="font-body text-sm text-navy/50">
          ¿Necesitas ayuda? Llámanos al{' '}
          <a href="tel:+14077159052" className="text-gold underline hover:text-navy transition-colors">
            (407) 715-9052
          </a>
        </p>
      </div>
    )
  }

  return (
    <div className="text-center py-10 space-y-4">
      <CheckCircle className="w-16 h-16 text-gold mx-auto" strokeWidth={1.5} />
      <h3 className="font-heading text-2xl font-semibold text-navy">
        ¡Tu guía está en camino!
      </h3>
      <p className="font-body text-navy/70 max-w-sm mx-auto leading-relaxed">
        Revisa tu correo electrónico en los próximos minutos. Si no lo ves, revisa
        tu carpeta de spam.
      </p>
      <p className="font-body text-sm text-navy/50">
        ¿Preguntas? Llámanos al{' '}
        <a href="tel:+14077159052" className="text-gold underline hover:text-navy transition-colors">
          (407) 715-9052
        </a>
      </p>
    </div>
  )
}
