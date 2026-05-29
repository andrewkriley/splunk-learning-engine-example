import type { Question } from '../../types'

export const searchingQuestions: Question[] = [
  {
    id: 'bs-001',
    domainId: 'basic-searching',
    stem: 'In Splunk Web, what does the time-range picker control?',
    choices: [
      'Which users can log in',
      'The earliest and latest bounds applied to the search',
      'The number of indexers in the cluster',
      'Forwarder compression settings',
    ],
    correctIndex: 1,
    explanation:
      'The time range constrains _time for the search, affecting which events are retrieved.',
    docLinks: [
      {
        label: 'Specify time ranges',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/specify-time-ranges/about-searching-with-time',
      },
    ],
  },
  {
    id: 'bs-002',
    domainId: 'basic-searching',
    stem: 'What does the search pipeline generally do first for a simple keyword search?',
    choices: [
      'Runs transforming commands on summarized data',
      'Retrieves raw events matching the search from indexes',
      'Creates a lookup file',
      'Schedules an alert email',
    ],
    correctIndex: 1,
    explanation:
      'At a high level, Splunk retrieves matching events, then applies commands in order through the pipeline.',
    docLinks: [
      {
        label: 'Search pipeline',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/Search/Aboutthesearchlanguage',
      },
    ],
  },
  {
    id: 'bs-003',
    domainId: 'basic-searching',
    stem: 'The event timeline in the UI primarily helps you:',
    choices: [
      'Edit props.conf',
      'See event density over time and drill into spikes',
      'Configure KV store collections',
      'Assign roles to LDAP groups',
    ],
    correctIndex: 1,
    explanation:
      'The timeline visualizes how many events fall into time buckets, useful for spotting bursts.',
    docLinks: [
      {
        label: 'Search results timeline',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/retrieve-events/preview-events',
      },
    ],
  },
  {
    id: 'bs-004',
    domainId: 'basic-searching',
    stem: 'Which action typically refines a noisy search without changing the underlying data on disk?',
    choices: [
      'Deleting the index',
      'Adding more specific keywords or filters to the search string',
      'Rebooting the search head',
      'Removing the license',
    ],
    correctIndex: 1,
    explanation:
      'Refinement is done in the search language (narrower terms, fields, time bounds), not by deleting indexed data.',
    docLinks: [
      {
        label: 'Search basics',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/search-primer/search-command-primer',
      },
    ],
  },
  {
    id: 'bs-005',
    domainId: 'basic-searching',
    stem: 'What is a search job?',
    choices: [
      'A scheduled backup of etc/system',
      'A server-side execution of a search with a job ID and lifecycle',
      'A type of forwarder protocol',
      'A KV store migration task',
    ],
    correctIndex: 1,
    explanation:
      'When you run a search, Splunk creates a job you can inspect, pause, finalize, or cancel.',
    docLinks: [
      {
        label: 'Manage search jobs',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/manage-jobs/manage-search-jobs',
      },
    ],
  },
  {
    id: 'bs-006',
    domainId: 'basic-searching',
    stem: 'Saving search results to a CSV from the UI is an example of:',
    choices: [
      'Indexing new sourcetypes automatically',
      'Exporting a snapshot of result rows for offline use',
      'Creating a new indexer peer',
      'Enabling SmartStore',
    ],
    correctIndex: 1,
    explanation:
      'Export saves the current result set (for example CSV) without changing how future searches run.',
    docLinks: [
      {
        label: 'Export data',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/export-search-results/export-search-results',
      },
    ],
  },
  {
    id: 'bs-007',
    domainId: 'basic-searching',
    stem: 'Which default field is commonly used as the internal timestamp for events?',
    choices: ['host', '_time', 'source', 'splunk_server'],
    correctIndex: 1,
    explanation:
      '_time is Splunk’s parsed timestamp used for time charts and time-range filtering.',
    docLinks: [
      {
        label: 'Default fields',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Usedefaultfields',
      },
    ],
  },
  {
    id: 'bs-008',
    domainId: 'basic-searching',
    stem: 'Wildcards in simple search terms can help you:',
    choices: [
      'Rotate TLS certificates',
      'Match multiple similar tokens (for example error*)',
      'Change indexer server classes',
      'Define SAML attribute maps',
    ],
    correctIndex: 1,
    explanation:
      'Wildcards broaden matching in the initial search retrieval phase (with performance caveats).',
    docLinks: [
      {
        label: 'Wildcards',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/Search/Wildcards',
      },
    ],
  },
  {
    id: 'bs-009',
    domainId: 'basic-searching',
    stem: 'If a search is still running, which UI concept lets you inspect progress and artifacts?',
    choices: [
      'The Jobs manager / Activity > Jobs',
      'The Indexes page only',
      'The Deployment server',
      'The HTTP Event Collector token list',
    ],
    correctIndex: 0,
    explanation:
      'Job controls expose status, completion, and options like cancel or export for running searches.',
    docLinks: [
      {
        label: 'Manage search jobs',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/manage-jobs/manage-search-jobs',
      },
    ],
  },
  {
    id: 'bs-010',
    domainId: 'basic-searching',
    stem: 'Which pair are common default metadata fields describing where an event originated?',
    choices: [
      'index and _cd',
      'host and source',
      '_kv and _sig',
      'role and capability',
    ],
    correctIndex: 1,
    explanation:
      'host and source (and sourcetype) are core default fields for event provenance.',
    docLinks: [
      {
        label: 'About default fields',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Usedefaultfields',
      },
    ],
  },
  {
    id: 'bs-011',
    domainId: 'basic-searching',
    stem: 'Running the same search again may return different counts if:',
    choices: [
      'The UI theme changes',
      'New data arrived in the index or the time range differs',
      'You resized the browser window',
      'You viewed the Fields sidebar',
    ],
    correctIndex: 1,
    explanation:
      'Results depend on indexed data and constraints like time range; new ingestion changes outcomes.',
    docLinks: [
      {
        label: 'Search primer',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/search-primer',
      },
    ],
  },
  {
    id: 'bs-012',
    domainId: 'basic-searching',
    stem: 'In Splunk Web, pausing a long-running search generally:',
    choices: [
      'Deletes the index',
      'Stops retrieving/processing further while keeping the job',
      'Creates a new app',
      'Removes all knowledge objects',
    ],
    correctIndex: 1,
    explanation:
      'Pause is a job control to halt progress without necessarily discarding partial results.',
    docLinks: [
      {
        label: 'Manage search jobs',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/manage-jobs/manage-search-jobs',
      },
    ],
  },
  {
    id: 'bs-013',
    domainId: 'basic-searching',
    stem: 'Which statement about the search assistant is most accurate?',
    choices: [
      'It replaces the need to understand SPL',
      'It can suggest commands and help you build searches interactively',
      'It only works for metrics queries',
      'It configures forwarders on Windows only',
    ],
    correctIndex: 1,
    explanation:
      'The search assistant helps discover commands and syntax while you type in the Search bar.',
    docLinks: [
      {
        label: 'Search assistant',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/use-the-search-app/help-building-searches/use-the-search-assistant-to-build-searches',
      },
    ],
  },
  {
    id: 'bs-014',
    domainId: 'basic-searching',
    stem: 'Event segmentation in the UI (expanding an event) helps you:',
    choices: [
      'Change cluster replication factor',
      'Inspect raw _raw text and extracted fields for one event',
      'Rotate data model acceleration',
      'Edit authorize.conf',
    ],
    correctIndex: 1,
    explanation:
      'Expanding events is fundamental review work for parsing issues and field coverage.',
    docLinks: [
      {
        label: 'Interact with events',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/retrieve-events/preview-events',
      },
    ],
  },
  {
    id: 'bs-015',
    domainId: 'basic-searching',
    stem: 'Fast mode vs smart mode in search behavior is mainly about:',
    choices: [
      'Whether logs are UTF-8',
      'Tradeoffs in field discovery and search performance',
      'Which browser you use',
      'Whether the deployment is on-prem',
    ],
    correctIndex: 1,
    explanation:
      'Search modes affect how aggressively Splunk discovers fields and related performance characteristics.',
    docLinks: [
      {
        label: 'Set search mode',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/use-the-search-app/search-modes',
      },
    ],
  },
]
