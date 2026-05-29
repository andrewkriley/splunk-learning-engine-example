import type { Question } from '../../types'

export const transformQuestions: Question[] = [
  {
    id: 'tc-001',
    domainId: 'transforming-commands',
    stem: 'The stats command is primarily used to:',
    choices: [
      'Rotate logs on forwarders',
      'Compute aggregations (counts, sums, etc.) grouped by fields',
      'Create PDF reports automatically',
      'Assign SAML groups',
    ],
    correctIndex: 1,
    explanation:
      'stats is a core transforming command for summaries like count by host.',
    docLinks: [
      {
        label: 'stats command',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Stats',
      },
    ],
  },
  {
    id: 'tc-002',
    domainId: 'transforming-commands',
    stem: 'top shows:',
    choices: [
      'The lowest disk volume on indexers',
      'The most common values of a field (with optional count and percent)',
      'Only multivalue fields',
      'KV store schemas',
    ],
    correctIndex: 1,
    explanation:
      'top ranks frequent field values, commonly used for quick frequency analysis.',
    docLinks: [
      {
        label: 'top command',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Top',
      },
    ],
  },
  {
    id: 'tc-003',
    domainId: 'transforming-commands',
    stem: 'rare is most similar to top except it emphasizes:',
    choices: [
      'Median values',
      'The least common field values',
      'Only metrics indexes',
      'License usage',
    ],
    correctIndex: 1,
    explanation:
      'rare surfaces infrequent values, useful for spotting outliers or noise.',
    docLinks: [
      {
        label: 'rare command',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Rare',
      },
    ],
  },
  {
    id: 'tc-004',
    domainId: 'transforming-commands',
    stem: 'Which clause in stats defines the grouping dimensions?',
    choices: ['by', 'where', 'over', 'into'],
    correctIndex: 0,
    explanation:
      'stats func by field_list groups aggregations per distinct field values.',
    docLinks: [
      {
        label: 'stats command',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Stats',
      },
    ],
  },
  {
    id: 'tc-005',
    domainId: 'transforming-commands',
    stem: 'count in stats typically means:',
    choices: [
      'Number of indexer buckets',
      'Number of events in each group',
      'Number of forwarders',
      'Number of CPU cores',
    ],
    correctIndex: 1,
    explanation:
      'count() aggregates how many events fall into each stats grouping bucket.',
    docLinks: [
      {
        label: 'Statistical and charting functions',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.2/statistical-and-charting-functions',
      },
    ],
  },
  {
    id: 'tc-006',
    domainId: 'transforming-commands',
    stem: 'Transforming commands generally:',
    choices: [
      'Only run on the deployment server',
      'Change the shape of results (for example from events to rows of statistics)',
      'Cannot be used after a base search',
      'Always require real-time mode',
    ],
    correctIndex: 1,
    explanation:
      'Transforming commands produce structured summaries charts and reports consume.',
    docLinks: [
      {
        label: 'About reporting commands',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/Search/Aboutreportingcommands',
      },
    ],
  },
  {
    id: 'tc-007',
    domainId: 'transforming-commands',
    stem: 'Using top with limit=10 returns roughly:',
    choices: [
      'Ten indexers',
      'Up to ten of the highest-ranked values for the analyzed field',
      'Ten years of data',
      'Ten KV collections',
    ],
    correctIndex: 1,
    explanation:
      'limit controls how many ranked values top displays.',
    docLinks: [
      {
        label: 'top command',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Top',
      },
    ],
  },
  {
    id: 'tc-008',
    domainId: 'transforming-commands',
    stem: 'Which stats function computes the arithmetic mean for a numeric field?',
    choices: ['dc', 'avg', 'values', 'mode'],
    correctIndex: 1,
    explanation:
      'avg(field) computes the mean within each group.',
    docLinks: [
      {
        label: 'Statistical and charting functions',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.2/statistical-and-charting-functions',
      },
    ],
  },
  {
    id: 'tc-009',
    domainId: 'transforming-commands',
    stem: 'dc (distinct count) is useful when you need:',
    choices: [
      'To delete a collection',
      'The number of unique values of a field per group',
      'To sort lexicographically only',
      'To configure LDAP',
    ],
    correctIndex: 1,
    explanation:
      'dc estimates or computes cardinality depending on options and data.',
    docLinks: [
      {
        label: 'Statistical and charting functions',
        url: 'https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.2/statistical-and-charting-functions',
      },
    ],
  },
  {
    id: 'tc-010',
    domainId: 'transforming-commands',
    stem: 'After stats, results are typically:',
    choices: [
      'Raw events only',
      'Tabular rows of aggregate metrics',
      'Binary protobuf streams',
      'Always exactly one row regardless of search',
    ],
    correctIndex: 1,
    explanation:
      'stats replaces the event stream with summarized rows.',
    docLinks: [
      {
        label: 'stats command',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Stats',
      },
    ],
  },
  {
    id: 'tc-011',
    domainId: 'transforming-commands',
    stem: 'Which pair are transforming commands emphasized on the Core User blueprint?',
    choices: [
      'inputlookup and outputcsv',
      'top, rare, and stats',
      'btool and reload',
      'cluster-config and rolling-restart',
    ],
    correctIndex: 1,
    explanation:
      'The blueprint calls out top, rare, and stats as foundational transforming commands.',
    docLinks: [
      {
        label: 'Splunk Core User topic outline',
        url: 'https://www.splunk.com/en_us/pdfs/training/splunk-test-blueprint-user.pdf',
      },
    ],
  },
]
