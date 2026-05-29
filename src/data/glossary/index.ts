import type { GlossaryDomain, GlossaryDomainId, LearningPathSection } from './types'
import { CLOUD_ADMIN_GLOSSARY_DOMAINS } from './cloudAdminGlossary'
import { ADVANCED_POWER_USER_GLOSSARY_DOMAINS } from './advancedPowerUserGlossary'
import { CORE_USER_GLOSSARY_DOMAINS } from './coreUserGlossary'
import { POWER_USER_GLOSSARY_DOMAINS } from './powerUserGlossary'
import { knowledgeObjects } from './domains/knowledgeObjects'
import { lookupsSubsearches } from './domains/lookupsSubsearches'
import { schedulingReportsAlerts } from './domains/schedulingReportsAlerts'
import { searchOptimization } from './domains/searchOptimization'
import { statisticalProcessing } from './domains/statisticalProcessing'
import { usingFields } from './domains/usingFields'
import { visualizations } from './domains/visualizations'
import { workingWithTime } from './domains/workingWithTime'

/** Legacy learning-path modules (kept for lookup compatibility) */
export const GLOSSARY_DOMAINS: GlossaryDomain[] = [
  usingFields,
  schedulingReportsAlerts,
  visualizations,
  workingWithTime,
  statisticalProcessing,
  lookupsSubsearches,
  knowledgeObjects,
  searchOptimization,
]

function withPathSection(
  domains: GlossaryDomain[],
  section: LearningPathSection,
): GlossaryDomain[] {
  return domains.map((d) => ({ ...d, pathSection: section }))
}

/** Combined SPL reference: Core, Power, and Advanced Power User topic domains */
export const USER_SPL_REFERENCE_DOMAINS: GlossaryDomain[] = [
  ...withPathSection(CORE_USER_GLOSSARY_DOMAINS, 'Core User'),
  ...withPathSection(POWER_USER_GLOSSARY_DOMAINS, 'Core Power User'),
  ...withPathSection(ADVANCED_POWER_USER_GLOSSARY_DOMAINS, 'Core Advanced Power User'),
]

/** Domains shown in SPL reference for a given entry point */
export function getGlossaryDomainsForTrack(
  trackId: string | null | undefined,
): GlossaryDomain[] {
  if (trackId === 'splunk-cloud-admin') return CLOUD_ADMIN_GLOSSARY_DOMAINS
  if (trackId === 'core-user') return CORE_USER_GLOSSARY_DOMAINS
  if (trackId === 'core-power-user') return POWER_USER_GLOSSARY_DOMAINS
  if (trackId === 'core-advanced-power-user')
    return ADVANCED_POWER_USER_GLOSSARY_DOMAINS
  return USER_SPL_REFERENCE_DOMAINS
}

export function getGlossaryDomain(id: GlossaryDomainId): GlossaryDomain | undefined {
  return [
    ...GLOSSARY_DOMAINS,
    ...USER_SPL_REFERENCE_DOMAINS,
    ...CLOUD_ADMIN_GLOSSARY_DOMAINS,
  ].find((d) => d.id === id)
}

export type {
  GlossaryDomain,
  GlossaryDomainId,
  GlossaryEntry,
  LearningPathSection,
} from './types'
