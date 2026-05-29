import type { Question } from '../../types'

export const lookupsQuestions: Question[] = [
  {
    id: 'lk-001',
    domainId: 'lookups',
    stem: 'A CSV lookup table is often used to:',
    choices: [
      'Replace indexers',
      'Enrich events with reference data at search time',
      'Store compressed rawdata',
      'Configure SAML IdP metadata only',
    ],
    correctIndex: 1,
    explanation:
      'Lookups join external tables (for example CSV) to events for context.',
    docLinks: [
      {
        label: 'About lookups',
        url: 'https://help.splunk.com/en/splunk-enterprise/manage-knowledge-objects/knowledge-management-manual/10.2/use-lookups-in-splunk-web/about-lookups',
      },
    ],
  },
  {
    id: 'lk-002',
    domainId: 'lookups',
    stem: 'A lookup definition in Splunk generally:',
    choices: [
      'Deletes the CSV from disk',
      'Describes how Splunk interprets a lookup table (fields, types, location)',
      'Compiles the Splunk binary',
      'Disables the search head',
    ],
    correctIndex: 1,
    explanation:
      'Definitions map files or external stores into usable lookup names.',
    docLinks: [
      {
        label: 'Configure CSV lookups',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/ConfigureCSVlookups',
      },
    ],
  },
  {
    id: 'lk-003',
    domainId: 'lookups',
    stem: 'An automatic lookup typically:',
    choices: [
      'Runs only on the license master',
      'Adds fields from a lookup without requiring explicit lookup command in SPL',
      'Cannot be used with CSV files',
      'Requires deleting sourcetypes',
    ],
    correctIndex: 1,
    explanation:
      'Automatic lookups apply at search time based on configuration.',
    docLinks: [
      {
        label: 'Define automatic lookups',
        url: 'https://help.splunk.com/en/splunk-enterprise/manage-knowledge-objects/knowledge-management-manual/10.2/use-lookups-in-splunk-web/define-an-automatic-lookup-in-splunk-web',
      },
    ],
  },
  {
    id: 'lk-004',
    domainId: 'lookups',
    stem: 'The lookup command in SPL is used to:',
    choices: [
      'Remove all fields',
      'Explicitly invoke a configured lookup to add fields to results',
      'Install a universal forwarder',
      'Rotate cluster secrets',
    ],
    correctIndex: 1,
    explanation:
      'lookup applies a named lookup to the result set in the pipeline.',
    docLinks: [
      {
        label: 'lookup command',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Lookup',
      },
    ],
  },
  {
    id: 'lk-005',
    domainId: 'lookups',
    stem: 'Lookup files are commonly stored under:',
    choices: [
      '$SPLUNK_HOME/var/lib/splunk',
      'An app’s lookups/ directory (for example etc/apps/search/lookups)',
      'Only on forwarders in /opt',
      'Inside indexes.conf',
    ],
    correctIndex: 1,
    explanation:
      'CSV lookups typically live in app lookups directories and ship with the app.',
    docLinks: [
      {
        label: 'Lookups example walkthrough',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/evaluate-and-manipulate-fields/use-lookup-to-add-fields-from-lookup-tables',
      },
    ],
  },
  {
    id: 'lk-006',
    domainId: 'lookups',
    stem: 'Which risk should you keep in mind with large lookup tables?',
    choices: [
      'They always shrink disk usage',
      'Search-time cost and memory if the table is very large or poorly filtered',
      'They disable TLS',
      'They remove _time',
    ],
    correctIndex: 1,
    explanation:
      'Lookups are powerful but can impact performance if abused.',
    docLinks: [
      {
        label: 'Lookup optimization tips',
        url: 'https://help.splunk.com/en/splunk-enterprise/manage-knowledge-objects/knowledge-management-manual/10.2/use-the-configuration-files-to-configure-lookups',
      },
    ],
  },
]
