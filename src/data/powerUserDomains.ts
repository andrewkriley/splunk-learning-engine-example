import type { DomainId, DomainMeta } from '../types'

/**
 * Core Power User topic domains and weights (public Splunk outline).
 * Source: https://www.splunk.com/en_us/pdfs/training/splunk-test-blueprint-power-user.pdf
 */
export const POWER_USER_DOMAINS: DomainMeta[] = [
  {
    id: 'pu-transforming-viz',
    blueprintRef: '1.0',
    title: 'Using Transforming Commands for Visualizations',
    examWeightPercent: 5,
  },
  {
    id: 'pu-filtering-formatting',
    blueprintRef: '2.0',
    title: 'Filtering and Formatting Results',
    examWeightPercent: 10,
  },
  {
    id: 'pu-correlating-events',
    blueprintRef: '3.0',
    title: 'Correlating Events',
    examWeightPercent: 15,
  },
  {
    id: 'pu-managing-fields',
    blueprintRef: '4.0',
    title: 'Creating and Managing Fields',
    examWeightPercent: 10,
  },
  {
    id: 'pu-aliases-calculated',
    blueprintRef: '5.0',
    title: 'Creating Field Aliases and Calculated Fields',
    examWeightPercent: 10,
  },
  {
    id: 'pu-tags-event-types',
    blueprintRef: '6.0',
    title: 'Creating Tags and Event Types',
    examWeightPercent: 10,
  },
  {
    id: 'pu-macros',
    blueprintRef: '7.0',
    title: 'Creating and Using Macros',
    examWeightPercent: 10,
  },
  {
    id: 'pu-workflow-actions',
    blueprintRef: '8.0',
    title: 'Creating and Using Workflow Actions',
    examWeightPercent: 10,
  },
  {
    id: 'pu-data-models',
    blueprintRef: '9.0',
    title: 'Creating Data Models',
    examWeightPercent: 10,
  },
  {
    id: 'pu-cim-addon',
    blueprintRef: '10.0',
    title: 'Using the Common Information Model (CIM) Add-On',
    examWeightPercent: 10,
  },
]

export const POWER_USER_DOMAIN_BY_ID: Partial<Record<DomainId, DomainMeta>> =
  Object.fromEntries(POWER_USER_DOMAINS.map((d) => [d.id, d]))
