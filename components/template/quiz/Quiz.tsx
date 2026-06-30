'use client'
import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { QuizProgress }     from './QuizProgress'
import { QuizOption }       from './QuizOption'
import { QuizContactForm }  from './QuizContactForm'
import { QuizSuccess }      from './QuizSuccess'
import { QuizError }        from './QuizError'
import { QUIZ_QUESTIONS, buildFormAnswers, type QuizAnswers } from '@/lib/quiz-data'
import { submitLead, type ContactData, type SubmitResult }     from '@/lib/itmano'
import type { FormIntent } from '@/lib/form-contracts'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const TOTAL_STEPS = QUIZ_QUESTIONS.length + 1

const emptyContact: ContactData & { website: string } = {
  first_name: '',
  last_name:  '',
  email:      '',
  phone:      '',
  language:   'es',
  website:    '',
}

interface QuizProps {
  channelPublicId: string
  intent:          FormIntent
}

export function Quiz({ channelPublicId, intent }: QuizProps) {
  const pref      = useReducedMotion()
  const [step,    setStep]    = useState(0)
  const [dir,     setDir]     = useState<1 | -1>(1)
  const [answers,      setAnswers]      = useState<QuizAnswers>({})
  const [contact,      setContact]      = useState({ ...emptyContact })
  const [status,       setStatus]       = useState<Status>('idle')
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null)

  const currentQuestion = QUIZ_QUESTIONS[step]
  const isContactStep   = step === QUIZ_QUESTIONS.length

  function advance() {
    setDir(1)
    setStep((s) => s + 1)
  }

  function goBack() {
    setDir(-1)
    setStep((s) => Math.max(0, s - 1))
  }

  function selectAnswer(field: string, value: string) {
    setAnswers((prev) => ({ ...prev, [field]: value }))
    advance()
  }

  function handleContactChange(field: string, value: string) {
    setContact((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit() {
    setStatus('submitting')
    try {
      const result = await submitLead(channelPublicId, { ...contact, intent, form_answers: buildFormAnswers(QUIZ_QUESTIONS, answers) })
      setSubmitResult(result)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  // LM form: show duplicate message when already_submitted.
  // Future event forms: pass alreadySubmitted={false} always to ignore status.
  if (status === 'success') return <QuizSuccess alreadySubmitted={submitResult?.status === 'already_submitted'} />
  if (status === 'error')   return <QuizError onRetry={() => setStatus('idle')} />

  const variants = {
    enter:  (d: number) => ({ x: pref ? 0 : d * 40,  opacity: 0 }),
    center:              ({ x: 0,                      opacity: 1 }),
    exit:   (d: number) => ({ x: pref ? 0 : d * -40,  opacity: 0 }),
  }

  return (
    <div>
      <QuizProgress step={step} total={TOTAL_STEPS} />

      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={step}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: pref ? 0 : 0.22, ease: 'easeOut' }}
        >
          {isContactStep ? (
            <>
              <h3
                className="font-heading font-bold text-navy mb-6"
                style={{ fontSize: '1.9rem', lineHeight: '1.1' }}
              >
                ¿A dónde enviamos tu guía?
              </h3>
              <QuizContactForm
                data={contact}
                onChange={handleContactChange}
                onBack={goBack}
                onSubmit={handleSubmit}
                loading={status === 'submitting'}
              />
            </>
          ) : (
            <>
              <p className="font-body text-opaque text-sm mb-1">
                {currentQuestion?.question && 'Cuéntanos un poco...'}
              </p>
              <h3
                className="font-heading font-bold text-navy mb-2"
                style={{ fontSize: '1.9rem', lineHeight: '1.1' }}
              >
                {currentQuestion?.question}
              </h3>
              <p className="font-body text-navy/60 text-sm mb-6">
                Esto nos ayuda a enviarte los recursos más relevantes para ti
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQuestion?.options.map((opt) => (
                  <QuizOption
                    key={opt.value}
                    label={opt.label}
                    selected={answers[currentQuestion.field as keyof QuizAnswers] === opt.value}
                    onClick={() => selectAnswer(currentQuestion.field, opt.value)}
                  />
                ))}
              </div>
              {step > 0 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="mt-6 text-sm font-body text-opaque hover:text-navy transition-colors cursor-pointer"
                >
                  ← Atrás
                </button>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
