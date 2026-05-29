import {
  ADVANCED_POWER_USER_DOMAIN_BY_ID,
  ADVANCED_POWER_USER_DOMAINS,
} from './advancedPowerUserDomains'
import { CLOUD_ADMIN_DOMAIN_BY_ID, CLOUD_ADMIN_DOMAINS } from './cloudAdminDomains'
import { USER_DOMAIN_BY_ID, USER_DOMAINS } from './domains'
import { POWER_USER_DOMAIN_BY_ID, POWER_USER_DOMAINS } from './powerUserDomains'
import type { LearningPath } from './learningPaths'
import { getLearningPath } from './learningPaths'
import {
  advancedPowerUserQuestions,
  cloudAdminQuestions,
  coreUserQuestions,
  powerUserQuestions,
} from './questions'
import type { DomainMeta, Question } from '../types'

export interface ResolvedLearningTrack {
  path: LearningPath
  questions: Question[]
  domains: DomainMeta[]
  domainById: Partial<Record<string, DomainMeta>>
  assessmentQuestionCount: number
  assessmentDurationMs: number
}

/**
 * Maps a learning path to in-app questions and topic domains.
 * Paths without banks still resolve so the UI can show public reference links.
 */
export function resolveLearningTrack(trackId: string): ResolvedLearningTrack | null {
  const path = getLearningPath(trackId)
  if (!path) return null

  if (path.id === 'core-user') {
    return {
      path,
      questions: coreUserQuestions,
      domains: USER_DOMAINS,
      domainById: USER_DOMAIN_BY_ID,
      assessmentQuestionCount: path.assessmentQuestionCount ?? 60,
      assessmentDurationMs: (path.assessmentDurationMinutes ?? 60) * 60 * 1000,
    }
  }

  if (path.id === 'splunk-cloud-admin') {
    return {
      path,
      questions: cloudAdminQuestions,
      domains: CLOUD_ADMIN_DOMAINS,
      domainById: CLOUD_ADMIN_DOMAIN_BY_ID,
      assessmentQuestionCount: path.assessmentQuestionCount ?? 60,
      assessmentDurationMs: (path.assessmentDurationMinutes ?? 75) * 60 * 1000,
    }
  }

  if (path.id === 'core-power-user') {
    return {
      path,
      questions: powerUserQuestions,
      domains: POWER_USER_DOMAINS,
      domainById: POWER_USER_DOMAIN_BY_ID,
      assessmentQuestionCount: path.assessmentQuestionCount ?? 65,
      assessmentDurationMs: (path.assessmentDurationMinutes ?? 60) * 60 * 1000,
    }
  }

  if (path.id === 'core-advanced-power-user') {
    return {
      path,
      questions: advancedPowerUserQuestions,
      domains: ADVANCED_POWER_USER_DOMAINS,
      domainById: ADVANCED_POWER_USER_DOMAIN_BY_ID,
      assessmentQuestionCount: path.assessmentQuestionCount ?? 70,
      assessmentDurationMs: (path.assessmentDurationMinutes ?? 60) * 60 * 1000,
    }
  }

  return {
    path,
    questions: [],
    domains: [],
    domainById: {},
    assessmentQuestionCount: path.assessmentQuestionCount ?? 60,
    assessmentDurationMs: (path.assessmentDurationMinutes ?? 60) * 60 * 1000,
  }
}
