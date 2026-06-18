import type { QuizQuestion } from './quiz-data'
import type { FormIntent }   from './form-contracts'

// ── Event facts ───────────────────────────────────────────────────────────────
export const FESTIVAL_EVENT = {
  timeShort:   '12:00 – 4:00 pm',
  addressCity: 'VA Beach, VA',
  addressLine: '4092 Foxwood Drive',
  phoneLabel:  '(407) 715-9052',
  phoneHref:   'tel:+14077159052',
} as const

// ── Bunting (papel picado) palette ────────────────────────────────────────────
export const BUNTING_COLORS = ['#e23b2e', '#f6b50a', '#2b7fd4', '#3aa35a', '#f08a24', '#e85d9c']

// ── Sponsor logos (intrinsic w/h for next/image) ──────────────────────────────
export const SPONSORS = [
  { name: 'Hands of Grace',           src: '/FestivalLatino/HoG.png', w: 605,  h: 412 },
  { name: 'Williams DeLoatche, P.C.', src: '/FestivalLatino/WD.png',  w: 2560, h: 845 },
  { name: 'A&J Group Real Estate',    src: '/FestivalLatino/A&J.PNG', w: 576,  h: 340 },
] as const

// ── Nav links (requested change #1) ───────────────────────────────────────────
export const FESTIVAL_NAV_LINKS = [
  { label: 'Home',       href: 'https://www.ajrealestateva.com/' },
  { label: 'Houses',     href: 'https://www.ajrealestateva.com/houses' },
  { label: 'Contact Us', href: 'https://www.ajrealestateva.com/contact-us' },
] as const

// ── Resource perks (4 cards) ──────────────────────────────────────────────────
export const PERKS = [
  { icon: '🎁', color: '#e23b2e', title: 'Recursos gratuitos',         desc: 'Información y servicios sin costo para toda la comunidad.' },
  { icon: '🩺', color: '#3aa35a', title: 'Chequeos médicos GRATIS',    desc: 'La Car-A-Van de Salud de Bon Secours estará presente.' },
  { icon: '🎵', color: '#2b7fd4', title: 'Música y ambiente familiar', desc: 'Un día de alegría, cultura y diversión para todos.' },
  { icon: '🤝', color: '#f08a24', title: 'Información y apoyo',         desc: 'Orientación y respaldo para nuestra comunidad latina.' },
] as const

// ── Event detail rows ─────────────────────────────────────────────────────────
export const INFO_ROWS = [
  { icon: '📅', label: 'FECHA',   value: 'Viernes 20 de junio' },
  { icon: '⏰', label: 'HORARIO', value: '12:00 pm a 4:00 pm' },
  { icon: '📍', label: 'LUGAR',   value: '4092 Foxwood Drive, VA Beach, VA 23462' },
] as const

// ── Registration questions (multi-step form) ──────────────────────────────────
export const FESTIVAL_QUESTIONS: QuizQuestion[] = [
  {
    field: 'housing_topic',
    question: 'Además del festival, ¿te gustaría orientación sobre algún tema de vivienda?',
    options: [
      { label: 'Quiero comprar mi primera casa',        value: 'first_buy'   },
      { label: 'Quiero comprar (ya tengo casa)',        value: 'owner_buy'   },
      { label: 'Quiero vender',                         value: 'sell'        },
      { label: 'Rento y me gustaría comprar algún día', value: 'rent_future' },
      { label: 'Solo vengo a disfrutar el evento',      value: 'event_only'  },
    ],
  },
  {
    field: 'timeline',
    question: '¿Cuándo te gustaría dar ese paso?',
    options: [
      { label: 'En los próximos 3 meses', value: 'under_3_months'  },
      { label: 'En 3 a 6 meses',          value: '3_6_months'      },
      { label: 'En 6 a 12 meses',         value: '6_12_months'     },
      { label: 'Más de un año',           value: 'over_1_year'     },
      { label: 'Solo estoy explorando',   value: 'solo_explorando' },
    ],
  },
]

export type FestivalAnswers = { housing_topic?: string; timeline?: string }

// ── Intent mapping (English: buy / sell / event) ──────────────────────────────
export function festivalIntent(housingTopic?: string): FormIntent {
  switch (housingTopic) {
    case 'first_buy':
    case 'owner_buy':
    case 'rent_future': return 'buy'
    case 'sell':        return 'sell'
    default:            return 'event' // event_only or unanswered
  }
}

// ── Split a single "Nombre y apellido" field into first/last for the CRM ───────
export function splitName(full: string): { first_name: string; last_name: string } {
  const [first = '', ...rest] = full.trim().split(/\s+/).filter(Boolean)
  return { first_name: first, last_name: rest.join(' ') }
}
