'use client'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FestivalProgress }    from './FestivalProgress'
import { FestivalOption }      from './FestivalOption'
import { FestivalContactForm, type FestivalContact } from './FestivalContactForm'
import { FestivalSuccess }     from './FestivalSuccess'
import { FestivalError }       from './FestivalError'
import { FESTIVAL_QUESTIONS, festivalIntent, splitName, type FestivalAnswers } from '@/lib/festival-data'
import { buildFormAnswers } from '@/lib/quiz-data'
import { submitLead }       from '@/lib/itmano'

type Status   = 'idle' | 'submitting' | 'success' | 'error'
type StepKey  = 'housing_topic' | 'timeline' | 'contact'

const HOUSING  = FESTIVAL_QUESTIONS[0]
const TIMELINE = FESTIVAL_QUESTIONS[1]

export function FestivalQuiz({ channelPublicId }: { channelPublicId: string }) {
  const pref = useReducedMotion()
  const [step,    setStep]    = useState(0)
  const [dir,     setDir]     = useState<1 | -1>(1)
  const [answers, setAnswers] = useState<FestivalAnswers>({})
  const [contact, setContact] = useState<FestivalContact>({ name: '', phone: '', email: '', website: '' })
  const [status,  setStatus]  = useState<Status>('idle')

  // Skip the timeline step when they only came for the event.
  const stepKeys = useMemo<StepKey[]>(() => {
    const showTimeline = !!answers.housing_topic && answers.housing_topic !== 'event_only'
    return showTimeline ? ['housing_topic', 'timeline', 'contact'] : ['housing_topic', 'contact']
  }, [answers.housing_topic])

  const total   = stepKeys.length
  const current = stepKeys[Math.min(step, total - 1)]

  function advance() { setDir(1);  setStep((s) => s + 1) }
  function goBack()  { setDir(-1); setStep((s) => Math.max(0, s - 1)) }

  function selectAnswer(field: 'housing_topic' | 'timeline', value: string) {
    setAnswers((prev) => ({ ...prev, [field]: value }))
    advance()
  }

  function handleContactChange(field: keyof FestivalContact, value: string) {
    setContact((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit() {
    setStatus('submitting')
    try {
      const { first_name, last_name } = splitName(contact.name)
      await submitLead(channelPublicId, {
        first_name,
        last_name,
        email:        contact.email,
        phone:        contact.phone,
        language:     'es',
        intent:       festivalIntent(answers.housing_topic),
        form_answers: buildFormAnswers(FESTIVAL_QUESTIONS, answers),
        website:      contact.website,
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') return <FestivalSuccess name={contact.name} />
  if (status === 'error')   return <FestivalError onRetry={() => setStatus('idle')} />

  const variants = {
    enter:  (d: number) => ({ x: pref ? 0 : d * 40,  opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: pref ? 0 : d * -40, opacity: 0 }),
  }

  const question = current === 'housing_topic' ? HOUSING : current === 'timeline' ? TIMELINE : null

  return (
    <div>
      <FestivalProgress step={step} total={total} />
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={current}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: pref ? 0 : 0.22, ease: 'easeOut' }}
        >
          {current === 'contact' ? (
            <>
              <h3 style={{ fontFamily: 'var(--font-dm-serif)' }} className="mb-1.5 text-[26px] text-[#163a52]">
                Asegura tu lugar
              </h3>
              <p className="mb-6 text-[14px] text-[#163a52]/60">Déjanos tus datos y te confirmamos tu participación.</p>
              <FestivalContactForm
                data={contact}
                onChange={handleContactChange}
                onBack={goBack}
                onSubmit={handleSubmit}
                loading={status === 'submitting'}
                showBack={step > 0}
              />
            </>
          ) : question ? (
            <>
              <h3 style={{ fontFamily: 'var(--font-dm-serif)' }} className="mb-1.5 text-[24px] leading-tight text-[#163a52]">
                {question.question}
              </h3>
              <p className="mb-5 text-[13px] text-[#163a52]/55">
                {current === 'housing_topic' ? 'Opcional — elige lo que más te describa' : '¿En qué momento estás?'}
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {question.options.map((opt) => (
                  <FestivalOption
                    key={opt.value}
                    label={opt.label}
                    selected={answers[question.field as keyof FestivalAnswers] === opt.value}
                    onClick={() => selectAnswer(question.field as 'housing_topic' | 'timeline', opt.value)}
                  />
                ))}
              </div>
              {step > 0 && (
                <button type="button" onClick={goBack}
                  className="mt-6 cursor-pointer text-[14px] text-[#163a52]/50 transition-colors hover:text-[#163a52]">
                  ← Atrás
                </button>
              )}
            </>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
