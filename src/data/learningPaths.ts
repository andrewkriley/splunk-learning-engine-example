/**
 * Learning paths — topic scopes informed by publicly available Splunk training
 * outlines and documentation (not an official or affiliated exam prep product).
 */
export interface LearningPath {
  id: string
  name: string
  shortDescription: string
  /** Public Splunk page describing this topic area */
  officialTopicUrl: string
  /** Public outline PDF or page used to structure domains (when available) */
  sourceOutlineUrl?: string
  /** How this path was scoped from public materials */
  scopeNote: string
  /** Practice questions and timed review are available in-app */
  hasInteractiveContent: boolean
  /** Question count for timed review mode (mirrors public outline scale where noted) */
  assessmentQuestionCount?: number
  assessmentDurationMinutes?: number
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'core-user',
    name: 'Splunk Core User',
    shortDescription:
      'Search fundamentals, fields, SPL basics, reports, lookups, and alerts—sourced from Splunk’s public Core User materials.',
    officialTopicUrl:
      'https://www.splunk.com/en_us/training/certification-track/splunk-core-certified-user.html',
    sourceOutlineUrl:
      'https://www.splunk.com/en_us/pdfs/training/splunk-test-blueprint-user.pdf',
    scopeNote:
      'Structured from Splunk’s published Core User topic outline and Splunk Help (search, fields, transforming commands, reports).',
    hasInteractiveContent: true,
    assessmentQuestionCount: 60,
    assessmentDurationMinutes: 60,
  },
  {
    id: 'core-power-user',
    name: 'Splunk Core Power User',
    shortDescription:
      'Knowledge objects, correlation, CIM normalization, and deeper SPL—aligned to public Power User learning objectives.',
    officialTopicUrl:
      'https://www.splunk.com/en_us/training/certification-track/splunk-core-certified-power-user.html',
    sourceOutlineUrl:
      'https://www.splunk.com/en_us/pdfs/training/splunk-test-blueprint-power-user.pdf',
    scopeNote:
      'Domains follow Splunk’s public Power User outline (chart/timechart, macros, data models, CIM, workflow actions).',
    hasInteractiveContent: true,
    assessmentQuestionCount: 65,
    assessmentDurationMinutes: 60,
  },
  {
    id: 'core-advanced-power-user',
    name: 'Splunk Core Advanced Power User',
    shortDescription:
      'Advanced SPL, acceleration, subsearches, multivalue fields, and dynamic dashboards from public Advanced Power User topics.',
    officialTopicUrl:
      'https://www.splunk.com/en_us/training/certification-track/splunk-core-certified-advanced-power-user.html',
    sourceOutlineUrl:
      'https://www.splunk.com/en_us/pdfs/training/splunk-test-blueprint-advanced-power-user.pdf',
    scopeNote:
      'Covers publicly listed Advanced Power User topics including tstats, summary indexing, and Simple XML dashboards.',
    hasInteractiveContent: true,
    assessmentQuestionCount: 70,
    assessmentDurationMinutes: 60,
  },
  {
    id: 'splunk-cloud-admin',
    name: 'Splunk Cloud Platform Administration',
    shortDescription:
      'Cloud onboarding, inputs, forwarders, indexes, auth, apps, and operations—mapped from public Cloud admin outlines.',
    officialTopicUrl:
      'https://www.splunk.com/en_us/training/certification-track/splunk-cloud-certified-admin.html',
    sourceOutlineUrl:
      'https://www.splunk.com/en_us/pdfs/training/splunk-test-blueprint-cloud-admin.pdf',
    scopeNote:
      'Informed by Splunk’s published Cloud Platform administration topic list and Splunk Cloud Help.',
    hasInteractiveContent: true,
    assessmentQuestionCount: 60,
    assessmentDurationMinutes: 75,
  },
  {
    id: 'splunk-enterprise-admin',
    name: 'Splunk Enterprise Administration',
    shortDescription:
      'On-premises administration: clustering, indexing, licensing, and operations (links to public Splunk admin topics).',
    officialTopicUrl:
      'https://www.splunk.com/en_us/training/certification-track/splunk-enterprise-certified-admin.html',
    scopeNote:
      'Reference links only—interactive questions for this path are not built yet.',
    hasInteractiveContent: false,
  },
  {
    id: 'splunk-enterprise-architect',
    name: 'Splunk Enterprise Architecture',
    shortDescription:
      'Large-scale architecture, sizing, and clustering design topics from public Splunk architect materials.',
    officialTopicUrl:
      'https://www.splunk.com/en_us/training/certification-track/splunk-enterprise-certified-architect.html',
    scopeNote: 'Reference links only—content bank planned from public Splunk architect documentation.',
    hasInteractiveContent: false,
  },
  {
    id: 'cyber-defense-analyst',
    name: 'Splunk Security Analytics',
    shortDescription:
      'Security analytics workflows with Splunk Enterprise and Enterprise Security (public defense-analyst topic area).',
    officialTopicUrl:
      'https://www.splunk.com/en_us/training/certification-track/splunk-certified-cybersecurity-defense-analyst.html',
    scopeNote:
      'Reference links only—structured from publicly described security analyst learning objectives.',
    hasInteractiveContent: false,
  },
]

export function getLearningPath(id: string): LearningPath | undefined {
  return LEARNING_PATHS.find((p) => p.id === id)
}
