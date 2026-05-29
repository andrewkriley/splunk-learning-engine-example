import type { DomainId, DomainMeta } from '../types'

/**
 * Core Advanced Power User topic domains and weights (public Splunk outline).
 * Source: https://www.splunk.com/en_us/pdfs/training/splunk-test-blueprint-advanced-power-user.pdf
 */
export const ADVANCED_POWER_USER_DOMAINS: DomainMeta[] = [
  {
    id: 'apu-statistical-commands',
    blueprintRef: '1.0',
    title: 'Exploring Statistical Commands',
    examWeightPercent: 4,
  },
  {
    id: 'apu-eval-functions',
    blueprintRef: '2.0',
    title: 'Exploring eval Command Functions',
    examWeightPercent: 4,
  },
  {
    id: 'apu-lookups',
    blueprintRef: '3.0',
    title: 'Exploring Lookups',
    examWeightPercent: 4,
  },
  {
    id: 'apu-alerts',
    blueprintRef: '4.0',
    title: 'Exploring Alerts',
    examWeightPercent: 4,
  },
  {
    id: 'apu-advanced-fields',
    blueprintRef: '5.0',
    title: 'Advanced Field Creation and Management',
    examWeightPercent: 4,
  },
  {
    id: 'apu-self-describing-data',
    blueprintRef: '6.0',
    title: 'Working with Self-Describing Data and Files',
    examWeightPercent: 3,
  },
  {
    id: 'apu-advanced-macros',
    blueprintRef: '7.0',
    title: 'Advanced Search Macros',
    examWeightPercent: 3,
  },
  {
    id: 'apu-report-acceleration',
    blueprintRef: '8.0',
    title: 'Acceleration: Reports and Summary Indexing',
    examWeightPercent: 4,
  },
  {
    id: 'apu-datamodel-acceleration',
    blueprintRef: '9.0',
    title: 'Acceleration: Data Models and tsidx',
    examWeightPercent: 4,
  },
  {
    id: 'apu-search-efficiently',
    blueprintRef: '10.0',
    title: 'Using Search Efficiently',
    examWeightPercent: 4,
  },
  {
    id: 'apu-search-tuning',
    blueprintRef: '11.0',
    title: 'More Search Tuning',
    examWeightPercent: 3,
  },
  {
    id: 'apu-manipulating-filtering',
    blueprintRef: '12.0',
    title: 'Manipulating and Filtering Data',
    examWeightPercent: 6,
  },
  {
    id: 'apu-multivalued-fields',
    blueprintRef: '13.0',
    title: 'Working with Multivalued Fields',
    examWeightPercent: 7,
  },
  {
    id: 'apu-advanced-transactions',
    blueprintRef: '14.0',
    title: 'Using Advanced Transactions',
    examWeightPercent: 5,
  },
  {
    id: 'apu-working-with-time',
    blueprintRef: '15.0',
    title: 'Working with Time',
    examWeightPercent: 2,
  },
  {
    id: 'apu-subsearches',
    blueprintRef: '16.0',
    title: 'Using Subsearches',
    examWeightPercent: 6,
  },
  {
    id: 'apu-prototype-xml',
    blueprintRef: '17.0',
    title: 'Creating a Prototype',
    examWeightPercent: 4,
  },
  {
    id: 'apu-dashboard-forms',
    blueprintRef: '18.0',
    title: 'Using Forms',
    examWeightPercent: 5,
  },
  {
    id: 'apu-dashboard-performance',
    blueprintRef: '19.0',
    title: 'Improving Performance',
    examWeightPercent: 6,
  },
  {
    id: 'apu-customizing-dashboards',
    blueprintRef: '20.0',
    title: 'Customizing Dashboards',
    examWeightPercent: 6,
  },
  {
    id: 'apu-drilldowns',
    blueprintRef: '21.0',
    title: 'Adding Drilldowns',
    examWeightPercent: 7,
  },
  {
    id: 'apu-advanced-dashboards',
    blueprintRef: '22.0',
    title: 'Adding Advanced Behaviors and Visualizations',
    examWeightPercent: 5,
  },
]

export const ADVANCED_POWER_USER_DOMAIN_BY_ID: Partial<Record<DomainId, DomainMeta>> =
  Object.fromEntries(ADVANCED_POWER_USER_DOMAINS.map((d) => [d.id, d]))
