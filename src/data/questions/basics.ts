import type { Question } from '../../types'

export const basicsQuestions: Question[] = [
  {
    id: 'ub-001',
    domainId: 'splunk-basics',
    stem: 'Which Splunk tier is primarily responsible for indexing raw data and storing buckets?',
    choices: [
      'Search head',
      'Indexer',
      'Universal forwarder',
      'License master',
    ],
    correctIndex: 1,
    explanation:
      'Indexers parse, index, and store searchable data. Search heads coordinate searches; forwarders collect and forward.',
    docLinks: [
      {
        label: 'Splunk Enterprise components',
        url: 'https://help.splunk.com/en/splunk-enterprise/administer/admin-manual/10.2',
      },
    ],
  },
  {
    id: 'ub-002',
    domainId: 'splunk-basics',
    stem: 'What is a Splunk app primarily used for?',
    choices: [
      'Replacing the Splunk kernel',
      'Packaging knowledge objects, dashboards, and configurations for a use case',
      'Encrypting all indexed data at rest',
      'Managing only license pools',
    ],
    correctIndex: 1,
    explanation:
      'Apps bundle dashboards, saved searches, field extractions, and other knowledge for a domain or product.',
    docLinks: [
      {
        label: 'What Splunk apps can do',
        url: 'https://help.splunk.com/en/splunk-enterprise/administer/admin-manual/10.2/meet-splunk-apps/app-architecture-and-object-ownership',
      },
    ],
  },
  {
    id: 'ub-003',
    domainId: 'splunk-basics',
    stem: 'Where can a user commonly adjust personal preferences such as time zone in Splunk Web?',
    choices: [
      'server.conf on the indexer',
      'Account / user settings in Splunk Web',
      'inputs.conf on the forwarder',
      'indexes.conf only',
    ],
    correctIndex: 1,
    explanation:
      'End users typically change personal settings (for example time zone) from their account preferences in the UI.',
    docLinks: [
      {
        label: 'Splunk Web overview',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/search-overview/navigating-splunk-web',
      },
    ],
  },
  {
    id: 'ub-004',
    domainId: 'splunk-basics',
    stem: 'Which statement best describes the Search & Reporting app?',
    choices: [
      'It is optional and cannot run ad hoc searches',
      'It is the default app for running searches and viewing results in many deployments',
      'It only displays metrics indexes',
      'It replaces the need for indexers',
    ],
    correctIndex: 1,
    explanation:
      'Search & Reporting is the standard app for interactive search, reports, and many knowledge workflows.',
    docLinks: [
      {
        label: 'Search app',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/use-the-search-app/about-the-search-app',
      },
    ],
  },
  {
    id: 'ub-005',
    domainId: 'splunk-basics',
    stem: 'What is a common reason organizations deploy Splunk?',
    choices: [
      'To replace DNS resolution',
      'To collect, search, and analyze machine data for visibility and troubleshooting',
      'To compile mobile applications',
      'To host relational OLTP databases only',
    ],
    correctIndex: 1,
    explanation:
      'Splunk is built for machine data: security, IT operations, observability, and analytics use cases.',
    docLinks: [
      {
        label: 'Get started with Splunk platform',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/search-overview/get-started-with-search',
      },
    ],
  },
]
