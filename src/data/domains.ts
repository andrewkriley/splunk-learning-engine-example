import type { DomainId, DomainMeta } from '../types'

/** Core User topic domain weights (source: public Splunk topic outline PDF) */
export const USER_DOMAINS: DomainMeta[] = [
  {
    id: 'splunk-basics',
    blueprintRef: '1.0',
    title: 'Splunk Basics',
    examWeightPercent: 5,
  },
  {
    id: 'basic-searching',
    blueprintRef: '2.0',
    title: 'Basic Searching',
    examWeightPercent: 22,
  },
  {
    id: 'fields-in-searches',
    blueprintRef: '3.0',
    title: 'Using Fields in Searches',
    examWeightPercent: 20,
  },
  {
    id: 'search-language-fundamentals',
    blueprintRef: '4.0',
    title: 'Search Language Fundamentals',
    examWeightPercent: 15,
  },
  {
    id: 'transforming-commands',
    blueprintRef: '5.0',
    title: 'Basic Transforming Commands',
    examWeightPercent: 15,
  },
  {
    id: 'reports-dashboards',
    blueprintRef: '6.0',
    title: 'Reports and Dashboards',
    examWeightPercent: 12,
  },
  {
    id: 'lookups',
    blueprintRef: '7.0',
    title: 'Creating and Using Lookups',
    examWeightPercent: 6,
  },
  {
    id: 'scheduled-alerts',
    blueprintRef: '8.0',
    title: 'Scheduled Reports and Alerts',
    examWeightPercent: 5,
  },
]

export const USER_DOMAIN_BY_ID: Record<DomainId, DomainMeta> = Object.fromEntries(
  USER_DOMAINS.map((d) => [d.id, d]),
) as Record<DomainId, DomainMeta>

export const CORE_USER_TRACK = {
  id: 'core-user',
  name: 'Splunk Core User',
  description:
    'Entry-level Splunk Enterprise and Splunk Cloud search fundamentals from public learning materials.',
  sourceOutlineUrl:
    'https://www.splunk.com/en_us/pdfs/training/splunk-test-blueprint-user.pdf',
  officialTopicUrl:
    'https://www.splunk.com/en_us/training/certification-track/splunk-core-certified-user.html',
} as const
