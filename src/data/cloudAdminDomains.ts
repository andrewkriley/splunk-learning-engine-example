import type { DomainId, DomainMeta } from '../types'

/**
 * Cloud Platform administration topic domains and weights (public Splunk outline).
 * Source: https://www.splunk.com/en_us/pdfs/training/splunk-test-blueprint-cloud-admin.pdf
 */
export const CLOUD_ADMIN_DOMAINS: DomainMeta[] = [
  {
    id: 'cloud-overview',
    blueprintRef: '1.0',
    title: 'Splunk Cloud Overview',
    examWeightPercent: 5,
  },
  {
    id: 'index-management',
    blueprintRef: '2.0',
    title: 'Index Management',
    examWeightPercent: 5,
  },
  {
    id: 'auth-authorization',
    blueprintRef: '3.0',
    title: 'User Authentication and Authorization',
    examWeightPercent: 5,
  },
  {
    id: 'configuration-files',
    blueprintRef: '4.0',
    title: 'Splunk Configuration Files',
    examWeightPercent: 5,
  },
  {
    id: 'getting-data-in-cloud',
    blueprintRef: '5.0',
    title: 'Getting Data in Cloud',
    examWeightPercent: 15,
  },
  {
    id: 'forwarder-management',
    blueprintRef: '6.0',
    title: 'Forwarder Management',
    examWeightPercent: 5,
  },
  {
    id: 'monitor-inputs',
    blueprintRef: '7.0',
    title: 'Monitor Inputs',
    examWeightPercent: 15,
  },
  {
    id: 'network-other-inputs',
    blueprintRef: '8.0',
    title: 'Network and Other Inputs',
    examWeightPercent: 10,
  },
  {
    id: 'fine-tuning-inputs',
    blueprintRef: '9.0',
    title: 'Fine-tuning Inputs',
    examWeightPercent: 5,
  },
  {
    id: 'parsing-data-preview',
    blueprintRef: '10.0',
    title: 'Parsing Phase and Data Preview',
    examWeightPercent: 10,
  },
  {
    id: 'manipulating-raw-data',
    blueprintRef: '11.0',
    title: 'Manipulating Raw Data',
    examWeightPercent: 10,
  },
  {
    id: 'installing-managing-apps',
    blueprintRef: '12.0',
    title: 'Installing and Managing Apps',
    examWeightPercent: 5,
  },
  {
    id: 'splunk-cloud-support',
    blueprintRef: '13.0',
    title: 'Working with Splunk Cloud Support',
    examWeightPercent: 5,
  },
]

export const CLOUD_ADMIN_DOMAIN_BY_ID: Partial<Record<DomainId, DomainMeta>> =
  Object.fromEntries(CLOUD_ADMIN_DOMAINS.map((d) => [d.id, d]))
