export type GlossaryDomainId =
  /** Legacy learning-path module ids (still resolvable in getGlossaryDomain) */
  | 'using-fields'
  | 'scheduling-reports-alerts'
  | 'visualizations'
  | 'working-with-time'
  | 'statistical-processing'
  | 'lookups-subsearches'
  | 'knowledge-objects'
  | 'search-optimization'
  /** Core User — topic glossary domains */
  | 'splunk-basics'
  | 'basic-searching'
  | 'fields-in-searches'
  | 'search-language-fundamentals'
  | 'transforming-commands'
  | 'reports-dashboards'
  | 'lookups'
  | 'scheduled-alerts'
  /** Cloud Platform administration — topic glossary domains */
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
  /** Core Power User — topic glossary domains */
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
  /** Core Advanced Power User — topic glossary domains */
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

export type GlossaryEntryKind = 'command' | 'function' | 'concept'

export interface GlossaryEntry {
  term: string
  kind: GlossaryEntryKind
  /** Short plain-language definition */
  summary: string
  /** Optional SPL snippet illustrating typical usage */
  example?: string
  /** Canonical Splunk docs URL when available */
  docUrl?: string
}

export type LearningPathSection =
  | 'Core User'
  | 'Core Power User'
  | 'Core Advanced Power User'

export interface GlossaryDomain {
  id: GlossaryDomainId
  /** Topic title aligned with public learning outlines */
  title: string
  /** Groups domains in the combined Core/Power/Advanced SPL reference nav */
  pathSection?: LearningPathSection
  /** One paragraph: scope + how Splunk treats this topic (research-backed overview). */
  overview: string
  /** Primary documentation landing pages for deeper reading */
  referenceUrls: { label: string; url: string }[]
  entries: GlossaryEntry[]
}
