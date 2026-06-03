/**
 * CRM vocabulary contracts for lead intake forms.
 *
 * IMPORTANT: the `value` of any fit field in form_answers must match these
 * strings EXACTLY. They map to match_value in the CRM's fit scoring rules.
 * Do not use free-text variants or translated strings for these fields.
 *
 * ── How to build a new form ───────────────────────────────────────────────────
 *
 * 1. Declare the form's intent (one of FormIntent).
 * 2. For each fit field, use the typed values below as option `value`s in your
 *    QuizQuestion definition. Labels can be any user-facing string.
 * 3. Call buildFormAnswers(questions, responses) → FormAnswer[]
 * 4. Call submitLead({ ...contact, intent, form_answers })
 *
 * Free fields (property_type, area, etc.) are not listed here — use any
 * consistent value; the CRM stores them for display only, not for scoring.
 */

// ── Intent ────────────────────────────────────────────────────────────────────

export type FormIntent = 'compra' | 'invierte' | 'vende'

// ── Buyer / Investor fit fields ───────────────────────────────────────────────

/** key: 'timeline' */
export type TimelineValue =
  | 'under_3_months'
  | '3_6_months'
  | '6_12_months'
  | 'over_12_explorando'

/** key: 'financing' */
export type FinancingValue =
  | 'cash'
  | 'preapproved'
  | 'in_process'
  | 'not_started'

/**
 * key: 'budget_tier'
 * Map the market-specific price ranges of each form to one of these tiers.
 * Example (Hampton Roads): <$300k → entry, $300k–$500k → mid, >$500k → premium
 */
export type BudgetTierValue = 'premium' | 'mid' | 'entry' | 'undefined'

/** key: 'agent_status' */
export type AgentStatusValue = 'sin_agente' | 'con_agente'

// ── Seller fit fields ─────────────────────────────────────────────────────────

/**
 * key: 'sell_motivation'
 * alta:  mudanza urgente / herencia / financiero / divorcio
 * media: upsizing / downsizing / retiro
 * baja:  explorando_valor
 */
export type SellMotivationValue = 'alta' | 'media' | 'baja'

/** key: 'listing_status' */
export type ListingStatusValue = 'no_listado_sin_agente' | 'ya_listado_con_agente'
