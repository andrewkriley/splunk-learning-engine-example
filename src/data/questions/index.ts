import type { Question } from '../../types'
import { alertsQuestions } from './alerts'
import { basicsQuestions } from './basics'
import { fieldsQuestions } from './fields'
import { lookupsQuestions } from './lookups'
import { reportsQuestions } from './reports'
import { searchLangQuestions } from './searchLang'
import { searchingQuestions } from './searching'
import { transformQuestions } from './transform'

export { cloudAdminQuestions } from './cloudAdmin'
export { powerUserQuestions } from './powerUser'
export { advancedPowerUserQuestions } from './advancedPowerUser'

export const coreUserQuestions: Question[] = [
  ...basicsQuestions,
  ...searchingQuestions,
  ...fieldsQuestions,
  ...searchLangQuestions,
  ...transformQuestions,
  ...reportsQuestions,
  ...lookupsQuestions,
  ...alertsQuestions,
]

export function assertQuestionBankCoversAssessment(
  questions: Question[],
  targets: Record<string, number>,
): { ok: true } | { ok: false; domainId: string; have: number; need: number } {
  const byDomain: Record<string, number> = {}
  for (const q of questions) {
    byDomain[q.domainId] = (byDomain[q.domainId] ?? 0) + 1
  }
  for (const [domainId, need] of Object.entries(targets)) {
    const have = byDomain[domainId] ?? 0
    if (have < need) {
      return { ok: false, domainId, have, need }
    }
  }
  return { ok: true }
}
