export type DomainId =
  | 'splunk-basics'
  | 'basic-searching'
  | 'fields-in-searches'
  | 'search-language-fundamentals'
  | 'transforming-commands'
  | 'reports-dashboards'
  | 'lookups'
  | 'scheduled-alerts'
  /** Cloud Platform administration — public topic outline */
  | 'cloud-overview'
  | 'index-management'
  | 'auth-authorization'
  | 'configuration-files'
  | 'getting-data-in-cloud'
  | 'forwarder-management'
  | 'monitor-inputs'
  | 'network-other-inputs'
  | 'fine-tuning-inputs'
  | 'parsing-data-preview'
  | 'manipulating-raw-data'
  | 'installing-managing-apps'
  | 'splunk-cloud-support'
  /** Core Power User — public topic outline */
  | 'pu-transforming-viz'
  | 'pu-filtering-formatting'
  | 'pu-correlating-events'
  | 'pu-managing-fields'
  | 'pu-aliases-calculated'
  | 'pu-tags-event-types'
  | 'pu-macros'
  | 'pu-workflow-actions'
  | 'pu-data-models'
  | 'pu-cim-addon'
  /** Core Advanced Power User — public topic outline */
  | 'apu-statistical-commands'
  | 'apu-eval-functions'
  | 'apu-lookups'
  | 'apu-alerts'
  | 'apu-advanced-fields'
  | 'apu-self-describing-data'
  | 'apu-advanced-macros'
  | 'apu-report-acceleration'
  | 'apu-datamodel-acceleration'
  | 'apu-search-efficiently'
  | 'apu-search-tuning'
  | 'apu-manipulating-filtering'
  | 'apu-multivalued-fields'
  | 'apu-advanced-transactions'
  | 'apu-working-with-time'
  | 'apu-subsearches'
  | 'apu-prototype-xml'
  | 'apu-dashboard-forms'
  | 'apu-dashboard-performance'
  | 'apu-customizing-dashboards'
  | 'apu-drilldowns'
  | 'apu-advanced-dashboards'

export interface DomainMeta {
  id: DomainId
  blueprintRef: string
  title: string
  /** Topic weight (percent) from public outline; used for timed review assembly */
  examWeightPercent: number
}

export interface Question {
  id: string
  domainId: DomainId
  stem: string
  choices: [string, string, string, string]
  correctIndex: 0 | 1 | 2 | 3
  explanation: string
  docLinks?: { label: string; url: string }[]
}

export interface QuestionStats {
  correctCount: number
  wrongCount: number
}

export type QuestionStatsMap = Record<string, QuestionStats>

export interface Track {
  id: string
  name: string
  description: string
  sourceOutlineUrl: string
  officialTopicUrl: string
}

export const MASTERY_CORRECT_THRESHOLD = 5

/** Maintenance weight vs unmastered questions in practice mode (relative) */
export const MASTERED_PRACTICE_WEIGHT = 0.12
