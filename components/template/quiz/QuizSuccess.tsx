import { CheckCircle, MailCheck } from 'lucide-react'
import type { LMContent } from '@/lib/lm-content'

type QuizSuccessContent = LMContent['quizSuccess']

interface QuizSuccessProps extends QuizSuccessContent {
  alreadySubmitted?: boolean
}

export function QuizSuccess({
  alreadySubmitted = false,
  createdHeading,
  createdBody,
  createdWhatsappUrl,
  createdWhatsappLabel,
  alreadyHeading,
  alreadyBody,
  alreadyPhone,
  alreadyPhoneLabel,
}: QuizSuccessProps) {
  if (alreadySubmitted) {
    return (
      <div className="text-center py-10 space-y-4">
        <MailCheck className="w-16 h-16 text-gold mx-auto" strokeWidth={1.5} />
        <h3 className="font-heading text-2xl font-semibold text-navy">{alreadyHeading}</h3>
        <p className="font-body text-navy/70 max-w-sm mx-auto leading-relaxed">{alreadyBody}</p>
        <p className="font-body text-sm text-navy/50">
          ¿Necesitas ayuda? Llámanos al{' '}
          <a href={`tel:${alreadyPhone}`} className="text-gold underline hover:text-navy transition-colors">
            {alreadyPhoneLabel}
          </a>
        </p>
      </div>
    )
  }

  return (
    <div className="text-center py-10 space-y-4">
      <CheckCircle className="w-16 h-16 text-gold mx-auto" strokeWidth={1.5} />
      <h3 className="font-heading text-2xl font-semibold text-navy">{createdHeading}</h3>
      <p className="font-body text-navy/70 max-w-sm mx-auto leading-relaxed">
        {createdBody}{' '}
        <a
          href={createdWhatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold underline hover:text-navy transition-colors"
        >
          {createdWhatsappLabel}
        </a>
        .
      </p>
    </div>
  )
}
