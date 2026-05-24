export interface QuizQuestion {
  field: string
  question: string
  options: Array<{ label: string; value: string }>
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    field: 'timeline',
    question: '¿Cuándo planeas comprar tu casa?',
    options: [
      { label: 'En los próximos 3 meses',  value: 'less_3_months' },
      { label: 'En 3 a 6 meses',           value: '3_6_months'   },
      { label: 'En 6 a 12 meses',          value: '6_12_months'  },
      { label: 'Solo estoy explorando',    value: 'exploring'    },
    ],
  },
  {
    field: 'budget',
    question: '¿Cuál es tu presupuesto aproximado?',
    options: [
      { label: 'Menos de $250,000',      value: 'under_250k' },
      { label: '$250,000 – $350,000',    value: '250k_350k'  },
      { label: '$350,000 – $500,000',    value: '350k_500k'  },
      { label: 'Más de $500,000',        value: 'over_500k'  },
    ],
  },
  {
    field: 'preapproval',
    question: '¿Tienes pre-aprobación de hipoteca?',
    options: [
      { label: 'Sí, ya tengo mi carta',           value: 'approved'      },
      { label: 'Estoy en proceso',                value: 'in_process'    },
      { label: 'Aún no, pero quiero empezar',     value: 'not_yet'       },
      { label: 'No sé por dónde empezar',         value: 'need_guidance' },
    ],
  },
  {
    field: 'property_type',
    question: '¿Qué tipo de propiedad buscas?',
    options: [
      { label: 'Casa unifamiliar',       value: 'single_family' },
      { label: 'Townhouse',              value: 'townhouse'     },
      { label: 'Condominio',             value: 'condo'         },
      { label: 'No estoy seguro/a aún', value: 'undecided'     },
    ],
  },
  {
    field: 'area',
    question: '¿En qué zona de Hampton Roads te interesa vivir?',
    options: [
      { label: 'Virginia Beach',      value: 'virginia_beach' },
      { label: 'Norfolk',             value: 'norfolk'        },
      { label: 'Chesapeake',          value: 'chesapeake'     },
      { label: 'Suffolk / otra zona', value: 'suffolk_other'  },
    ],
  },
]

export type QuizAnswers = {
  [K in (typeof QUIZ_QUESTIONS)[number]['field']]?: string
}
