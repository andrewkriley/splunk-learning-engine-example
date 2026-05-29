import type { Question } from '../../types'

export const fieldsQuestions: Question[] = [
  {
    id: 'fi-001',
    domainId: 'fields-in-searches',
    stem: 'What is a field in Splunk search results?',
    choices: [
      'A physical disk partition',
      'A named attribute extracted or associated with events (for example host, action)',
      'A license entitlement',
      'A Python virtual environment',
    ],
    correctIndex: 1,
    explanation:
      'Fields are name/value pairs used for filtering, reporting, and transformations.',
    docLinks: [
      {
        label: 'About fields',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Aboutfields',
      },
    ],
  },
  {
    id: 'fi-002',
    domainId: 'fields-in-searches',
    stem: 'Which syntax typically filters to events where field status has value 500?',
    choices: [
      'where status=500',
      'status=500',
      'filter status 500',
      'grep status 500',
    ],
    correctIndex: 1,
    explanation:
      'Equality constraints in the initial search use field=value style matching.',
    docLinks: [
      {
        label: 'Specify fields for search',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/retrieve-events/use-fields-to-retrieve-events',
      },
    ],
  },
  {
    id: 'fi-003',
    domainId: 'fields-in-searches',
    stem: 'The Fields sidebar in Search & Reporting is used to:',
    choices: [
      'Edit serverclass.conf',
      'Discover prominent fields and quickly add them to the search or table',
      'Configure HEC tokens',
      'Manage index clustering',
    ],
    correctIndex: 1,
    explanation:
      'The sidebar surfaces interesting fields and supports pivoting your investigation.',
    docLinks: [
      {
        label: 'Select fields in the Fields sidebar',
        url: 'https://help.splunk.com/en/splunk-enterprise/manage-knowledge-objects/knowledge-management-manual/10.2/fields-and-field-extractions/use-default-fields',
      },
    ],
  },
  {
    id: 'fi-004',
    domainId: 'fields-in-searches',
    stem: 'Multivalue fields are most associated with:',
    choices: [
      'Indexes that store only metrics',
      'A single field containing multiple values on one event',
      'Forwarders without outputs.conf',
      'Dashboard PDF delivery',
    ],
    correctIndex: 1,
    explanation:
      'Some fields can hold multiple values; SPL has multivalue evaluation and formatting commands.',
    docLinks: [
      {
        label: 'Manipulate multivalue fields',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/evaluate-and-manipulate-fields/evaluate-and-manipulate-fields-with-multiple-values',
      },
    ],
  },
  {
    id: 'fi-005',
    domainId: 'fields-in-searches',
    stem: 'Which field commonly identifies the logical container for data?',
    choices: ['sourcetype', 'index', 'partition', 'bucket_id'],
    correctIndex: 1,
    explanation:
      'The index field identifies which index events came from (subject to permissions).',
    docLinks: [
      {
        label: 'About managing indexes',
        url: 'https://help.splunk.com/en/data-management/manage-splunk-enterprise-indexers/10.2/manage-indexes',
      },
    ],
  },
  {
    id: 'fi-006',
    domainId: 'fields-in-searches',
    stem: 'If a field is not present on most events at search time, a likely next step is:',
    choices: [
      'Delete the index',
      'Review parsing (props/transforms) or extraction configuration',
      'Disable the search head',
      'Remove all users',
    ],
    correctIndex: 1,
    explanation:
      'Missing fields often trace back to sourcetype parsing, extractions, or source format.',
    docLinks: [
      {
        label: 'Configure field extractions',
        url: 'https://help.splunk.com/en/splunk-enterprise/manage-knowledge-objects/knowledge-management-manual/10.2/use-the-configuration-files-to-configure-field-extractions',
      },
    ],
  },
  {
    id: 'fi-007',
    domainId: 'fields-in-searches',
    stem: 'Field names in SPL are typically referenced:',
    choices: [
      'Only inside macros.conf',
      'Directly in commands and predicates (for example by status)',
      'Only on the license master',
      'Via SQL JOIN syntax exclusively',
    ],
    correctIndex: 1,
    explanation:
      'SPL uses field names throughout stats, eval, where, chart, and many other commands.',
    docLinks: [
      {
        label: 'Search reference',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference',
      },
    ],
  },
  {
    id: 'fi-008',
    domainId: 'fields-in-searches',
    stem: 'The sourcetype field generally represents:',
    choices: [
      'The OS kernel version',
      'A parsing category Splunk uses to apply processing rules to similar streams',
      'The number of CPUs on the indexer',
      'A KV store collection name',
    ],
    correctIndex: 1,
    explanation:
      'Sourcetype drives field extraction, line breaking, and timestamp rules.',
    docLinks: [
      {
        label: 'Why source types matter',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/Data/Whysourcetypesmatter',
      },
    ],
  },
  {
    id: 'fi-009',
    domainId: 'fields-in-searches',
    stem: 'Using the Fields dialog to hide fields affects:',
    choices: [
      'What is stored on disk permanently',
      'Presentation of columns in the current results view',
      'Cluster master election',
      'Forwarder certificate trust',
    ],
    correctIndex: 1,
    explanation:
      'Hiding fields is a UI convenience for readability, not deletion of underlying data.',
    docLinks: [
      {
        label: 'View and interact with search results',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/retrieve-events/preview-events',
      },
    ],
  },
  {
    id: 'fi-010',
    domainId: 'fields-in-searches',
    stem: 'Which statement about indexed fields vs search-time fields is most accurate for study purposes?',
    choices: [
      'They are identical in every deployment',
      'Some fields can be indexed for faster filtering; many extractions happen at search time',
      'Splunk never indexes fields',
      'Only metrics indexes support fields',
    ],
    correctIndex: 1,
    explanation:
      'Splunk has both index-time and search-time field concepts; many extractions are search-time.',
    docLinks: [
      {
        label: 'About fields',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Aboutfields',
      },
    ],
  },
  {
    id: 'fi-011',
    domainId: 'fields-in-searches',
    stem: 'In a table view, reordering columns helps analysts:',
    choices: [
      'Change replication factor',
      'Compare key dimensions side-by-side for triage',
      'Compile Splunk binaries',
      'Rotate DMKs',
    ],
    correctIndex: 1,
    explanation:
      'Column order is a presentation aid for reviewing the most important fields first.',
    docLinks: [
      {
        label: 'Build a table',
        url: 'https://help.splunk.com/en/splunk-enterprise/create-dashboards-and-reports/simple-xml-dashboards/10.2/table-visualizations/format-table-visualizations',
      },
    ],
  },
  {
    id: 'fi-012',
    domainId: 'fields-in-searches',
    stem: 'Field coverage in the UI (selected vs interesting fields) hints at:',
    choices: [
      'License violations only',
      'How commonly a field appears in the current result set',
      'Whether SAML is enabled',
      'Indexer disk encryption state',
    ],
    correctIndex: 1,
    explanation:
      'Coverage helps you spot sparse fields that may need better extraction or filtering.',
    docLinks: [
      {
        label: 'Select fields in the Fields sidebar',
        url: 'https://help.splunk.com/en/splunk-enterprise/manage-knowledge-objects/knowledge-management-manual/10.2/fields-and-field-extractions/use-default-fields',
      },
    ],
  },
  {
    id: 'fi-013',
    domainId: 'fields-in-searches',
    stem: 'Which default field often reflects the path or name of the log file or stream?',
    choices: ['host', 'source', 'user', '_indextime'],
    correctIndex: 1,
    explanation:
      'source commonly identifies the file, API, or network origin of the event.',
    docLinks: [
      {
        label: 'Default fields',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Usedefaultfields',
      },
    ],
  },
  {
    id: 'fi-014',
    domainId: 'fields-in-searches',
    stem: 'Adding field filters early in a search can:',
    choices: [
      'Guarantee zero CPU use',
      'Reduce scanned events and improve focus when used appropriately',
      'Remove the need for time ranges',
      'Disable RBAC',
    ],
    correctIndex: 1,
    explanation:
      'Narrowing with fields and keywords is a core performance and accuracy habit.',
    docLinks: [
      {
        label: 'Quick tips for optimization',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/Search/Quicktipsforoptimization',
      },
    ],
  },
]
