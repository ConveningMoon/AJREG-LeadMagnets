// Values for fit fields must match lib/form-contracts.ts exactly.

export interface QuizQuestion {
  field: string
  question: string
  options: Array<{ label: string; value: string }>
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ── Fit fields (CRM match_value rules apply to these keys/values) ─────────

  {
    field: 'timeline',
    question: '¿Cuándo planeas comprar tu casa?',
    options: [
      { label: 'En los próximos 3 meses', value: 'under_3_months'    },
      { label: 'En 3 a 6 meses',          value: '3_6_months'        },
      { label: 'En 6 a 12 meses',         value: '6_12_months'       },
      { label: 'Aún estoy explorando',    value: 'over_12_explorando' },
    ],
  },

  {
    field: 'financing',
    question: '¿En qué etapa estás con el financiamiento?',
    options: [
      { label: 'Pagamos al contado (cash)',             value: 'cash'        },
      { label: 'Ya tengo carta de pre-aprobación',     value: 'preapproved' },
      { label: 'Estoy en proceso con un prestamista',  value: 'in_process'  },
      { label: 'Aún no he empezado a buscarlo',        value: 'not_started' },
    ],
  },

  {
    // Hampton Roads market tiers: <$300k → entry, $300k–$500k → mid, >$500k → premium
    field: 'budget_tier',
    question: '¿Cuál es tu presupuesto aproximado?',
    options: [
      { label: 'Hasta $300,000',             value: 'entry'     },
      { label: '$300,000 – $500,000',        value: 'mid'       },
      { label: 'Más de $500,000',            value: 'premium'   },
      { label: 'Aún no lo tengo definido',   value: 'undefined' },
    ],
  },

  {
    field: 'agent_status',
    question: '¿Ya tienes un agente de bienes raíces?',
    options: [
      { label: 'No, estoy buscando',  value: 'sin_agente' },
      { label: 'Sí, ya tengo uno',    value: 'con_agente' },
    ],
  },

  // ── Free fields (stored for display; no CRM scoring rules apply) ──────────

  {
    field: 'property_type',
    question: '¿Qué tipo de propiedad buscas?',
    options: [
      { label: 'Casa unifamiliar',        value: 'single_family' },
      { label: 'Townhouse',               value: 'townhouse'     },
      { label: 'Condominio',              value: 'condo'         },
      { label: 'No estoy seguro/a aún',   value: 'undecided'     },
    ],
  },

  {
    field: 'area',
    question: '¿En qué zona de Hampton Roads te interesa vivir?',
    options: [
      { label: 'Virginia Beach',       value: 'virginia_beach' },
      { label: 'Norfolk',              value: 'norfolk'        },
      { label: 'Chesapeake',           value: 'chesapeake'     },
      { label: 'Suffolk / otra zona',  value: 'suffolk_other'  },
    ],
  },
]

export type QuizAnswers = {
  [K in (typeof QUIZ_QUESTIONS)[number]['field']]?: string
}

// ── Rich answer snapshot ──────────────────────────────────────────────────────

export interface FormAnswer {
  key:      string
  question: string
  value:    string
  label:    string
}

/**
 * Converts raw quiz responses into a self-contained snapshot that the CRM
 * can store and display without needing access to the form definition.
 *
 * Reusable for any future lead-magnet or event LP:
 *   form_answers = buildFormAnswers(MY_QUESTIONS, collectedResponses)
 *
 * For free-text fields (no option list), label === value.
 */
export function buildFormAnswers(
  questions: QuizQuestion[],
  responses: QuizAnswers,
): FormAnswer[] {
  return questions
    .filter(q => responses[q.field as keyof QuizAnswers] !== undefined)
    .map(q => {
      const value  = responses[q.field as keyof QuizAnswers] as string
      const option = q.options.find(o => o.value === value)
      return {
        key:      q.field,
        question: q.question,
        value,
        label:    option?.label ?? value,
      }
    })
}
