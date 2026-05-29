import type { Question } from '../../types'

export const searchLangQuestions: Question[] = [
  {
    id: 'sl-001',
    domainId: 'search-language-fundamentals',
    stem: 'SPL commands in a search are generally applied:',
    choices: [
      'In random order chosen by the browser',
      'Left-to-right through a pipeline, with each command consuming prior results',
      'Only on the license master',
      'Backwards from the last command',
    ],
    correctIndex: 1,
    explanation:
      'The search pipeline passes a stream of results through successive commands.',
    docLinks: [
      {
        label: 'Search language syntax',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.2/introduction/understanding-spl-syntax',
      },
    ],
  },
  {
    id: 'sl-002',
    domainId: 'search-language-fundamentals',
    stem: 'Which command is commonly used to keep only specific fields in results?',
    choices: ['dedup', 'fields', 'outputlookup', 'multisearch'],
    correctIndex: 1,
    explanation:
      'fields removes fields from results or can keep only listed fields depending on usage.',
    docLinks: [
      {
        label: 'fields command',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Fields',
      },
    ],
  },
  {
    id: 'sl-003',
    domainId: 'search-language-fundamentals',
    stem: 'The table command is best described as:',
    choices: [
      'A clustering configuration directive',
      'A transforming command that builds a tabular projection of fields',
      'A forwarder handshake',
      'An alert throttle policy',
    ],
    correctIndex: 1,
    explanation:
      'table selects and orders fields similarly to a projected relational table.',
    docLinks: [
      {
        label: 'table command',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Table',
      },
    ],
  },
  {
    id: 'sl-004',
    domainId: 'search-language-fundamentals',
    stem: 'rename is used to:',
    choices: [
      'Change disk paths on indexers',
      'Change the name of a field in results',
      'Rotate TLS session keys only',
      'Delete an index',
    ],
    correctIndex: 1,
    explanation:
      'rename maps old field names to new names for reporting or downstream commands.',
    docLinks: [
      {
        label: 'rename command',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Rename',
      },
    ],
  },
  {
    id: 'sl-005',
    domainId: 'search-language-fundamentals',
    stem: 'dedup is typically used to:',
    choices: [
      'Encrypt results',
      'Remove adjacent or matching duplicate events based on field(s)',
      'Create a KV store',
      'Assign user roles',
    ],
    correctIndex: 1,
    explanation:
      'dedup collapses duplicates according to its arguments and options.',
    docLinks: [
      {
        label: 'dedup command',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Dedup',
      },
    ],
  },
  {
    id: 'sl-006',
    domainId: 'search-language-fundamentals',
    stem: 'sort orders rows by:',
    choices: [
      'Indexer bucket ID only',
      'Field values you specify (for example sort - count)',
      'License pool priority',
      'User email domain',
    ],
    correctIndex: 1,
    explanation:
      'sort arranges result rows ascending or descending on one or more fields.',
    docLinks: [
      {
        label: 'sort command',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Sort',
      },
    ],
  },
  {
    id: 'sl-007',
    domainId: 'search-language-fundamentals',
    stem: 'Restricting a search to a specific index is commonly done with:',
    choices: [
      'index=name in the search string',
      'server.conf only',
      'Deleting other indexes',
      'Using join without a subsearch',
    ],
    correctIndex: 0,
    explanation:
      'index= is the basic SPL constraint for selecting an index (permissions permitting).',
    docLinks: [
      {
        label: 'Search across one or more distributed indexes',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/retrieve-events/search-across-one-or-more-distributed-search-peers',
      },
    ],
  },
  {
    id: 'sl-008',
    domainId: 'search-language-fundamentals',
    stem: 'A subsearch is often used to:',
    choices: [
      'Format a dashboard background image',
      'Provide a dynamic set of constraints or values to an outer search',
      'Configure SmartStore',
      'Install a SHC captain',
    ],
    correctIndex: 1,
    explanation:
      'Subsearches run inner searches whose results parameterize outer searches.',
    docLinks: [
      {
        label: 'Subsearch',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/Search/Aboutsubsearches',
      },
    ],
  },
  {
    id: 'sl-009',
    domainId: 'search-language-fundamentals',
    stem: 'Which term describes the initial part of a search before the first pipe?',
    choices: [
      'Transforming clause',
      'Base search',
      'Acceleration window',
      'KV protocol',
    ],
    correctIndex: 1,
    explanation:
      'The base search retrieves events; subsequent piped commands transform results.',
    docLinks: [
      {
        label: 'Types of searches',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/search-overview/types-of-searches',
      },
    ],
  },
  {
    id: 'sl-010',
    domainId: 'search-language-fundamentals',
    stem: 'Which practice generally improves readability of long SPL?',
    choices: [
      'Avoiding pipes entirely',
      'Breaking lines at pipes and indenting logical stages',
      'Using only GUI clicks, never typing',
      'Removing all field names',
    ],
    correctIndex: 1,
    explanation:
      'Multi-line formatting with pipes is standard for maintainable searches.',
    docLinks: [
      {
        label: 'Search best practices',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/optimize-searches/write-better-searches',
      },
    ],
  },
  {
    id: 'sl-011',
    domainId: 'search-language-fundamentals',
    stem: 'head limits:',
    choices: [
      'The number of indexers',
      'The number of results returned from the prior pipeline stage',
      'KV store replication factor',
      'Forwarder parallel ingestion pipelines',
    ],
    correctIndex: 1,
    explanation:
      'head truncates to the first N results (useful for sampling and quick checks).',
    docLinks: [
      {
        label: 'head command',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Head',
      },
    ],
  },
]
