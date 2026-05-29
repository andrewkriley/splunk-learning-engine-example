import type { Question } from '../../../types'
import { APU_DOCS } from './docs'

/** Domains 9–15 of Advanced Power User blueprint (28 questions). */
export const advancedPowerUserChunk2: Question[] = [
  // --- 9.0 Acceleration: Data Models and tsidx (3) ---
  {
    id: 'apu-da-001',
    domainId: 'apu-datamodel-acceleration',
    stem: 'What is the primary advantage of using tstats against an accelerated data model instead of a raw-event search?',
    choices: [
      'tstats reads _raw from every matching event on indexers',
      'tstats queries pre-built tsidx summaries and avoids retrieving full raw events',
      'tstats only works on summary indexes, not data models',
      'tstats automatically creates field extractions at index time',
    ],
    correctIndex: 1,
    explanation:
      'Accelerated data models maintain tsidx summary files; tstats aggregates directly from those summaries for much faster metrics at scale.',
    docLinks: [{ label: 'Data models', url: APU_DOCS.dataModels }],
  },
  {
    id: 'apu-da-002',
    domainId: 'apu-datamodel-acceleration',
    stem: 'Which SPL syntax searches events within a specific dataset of a data model named Web?',
    choices: [
      '| pivot Web All',
      '| datamodel Web Authentication search',
      '| tstats count from datamodel=Web',
      '| lookup Web Authentication',
    ],
    correctIndex: 1,
    explanation:
      'The datamodel command targets a data model and dataset in SPL (for example | datamodel Web Authentication search) before further processing.',
    docLinks: [{ label: 'Data models', url: APU_DOCS.dataModels }],
  },
  {
    id: 'apu-da-003',
    domainId: 'apu-datamodel-acceleration',
    stem: 'When a data model is accelerated, Splunk creates tsidx files that:',
    choices: [
      'Replace the original index and delete raw events',
      'Store time-series and field summary data used by tstats and Pivot',
      'Only cache dashboard XML definitions',
      'Encrypt multivalue fields at search time',
    ],
    correctIndex: 1,
    explanation:
      'Acceleration builds tsidx summaries containing indexed field values and time information so tstats and Pivot can query without scanning _raw.',
    docLinks: [{ label: 'Data models', url: APU_DOCS.dataModels }],
  },

  // --- 10.0 Using Search Efficiently (3) ---
  {
    id: 'apu-se-001',
    domainId: 'apu-search-efficiently',
    stem: 'Which command category best describes eval in the search pipeline?',
    choices: [
      'Transforming — always collapses events to one row',
      'Streaming — adds or modifies fields on each event as it passes through',
      'Generating — creates events without reading an index',
      'Orchestrating — only runs on the search head after stats',
    ],
    correctIndex: 1,
    explanation:
      'eval is a streaming command: it processes events one at a time, adding or changing field values without reducing the event count.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },
  {
    id: 'apu-se-002',
    domainId: 'apu-search-efficiently',
    stem: 'In Job Inspector, which detail is most useful for finding a slow search phase?',
    choices: [
      'The dashboard panel refresh interval',
      'Per-phase execution time and event counts at each pipeline stage',
      'The sourcetype rename map in props.conf',
      'The number of tags applied to fields',
    ],
    correctIndex: 1,
    explanation:
      'Job Inspector breaks the search into phases (dispatch, indexers, search head) and shows duration and events processed so you can spot bottlenecks.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },
  {
    id: 'apu-se-003',
    domainId: 'apu-search-efficiently',
    stem: 'Why should restrictive filtering terms appear as early as possible in SPL?',
    choices: [
      'Transforming commands must always precede the search command',
      'Early filters reduce data retrieved and processed by later pipeline stages',
      'Splunk ignores terms after the first pipe',
      'Job Inspector requires at least three commands before filtering',
    ],
    correctIndex: 1,
    explanation:
      'Placing selective keywords and field filters in the initial search clause limits events fetched from indexers before expensive transforming commands run.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },

  // --- 11.0 More Search Tuning (3) ---
  {
    id: 'apu-tu-001',
    domainId: 'apu-search-tuning',
    stem: 'When should you consider using TERM() in a search?',
    choices: [
      'To force a match on a rare indexed term in a large index for better performance',
      'To disable index-time field extraction',
      'To convert a multivalue field into a single string',
      'To run stats without touching tsidx files',
    ],
    correctIndex: 0,
    explanation:
      'TERM() tells Splunk to match an exact indexed term, which can be faster than implicit term resolution for rare tokens in high-volume indexes.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },
  {
    id: 'apu-tu-002',
    domainId: 'apu-search-tuning',
    stem: 'In Splunk search optimization, "lispy" refers to:',
    choices: [
      'A dashboard skin for Simple XML',
      'The internal representation Splunk uses to evaluate boolean and wildcard search expressions',
      'A macro language for nested lookups',
      'The JSON schema for HEC payloads',
    ],
    correctIndex: 1,
    explanation:
      'Lispy is Splunk\'s internal query form; understanding how AND/OR/NOT and wildcards compile helps tune searches for selective index access.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },
  {
    id: 'apu-tu-003',
    domainId: 'apu-search-tuning',
    stem: 'Which practice best describes effective pre-filtering?',
    choices: [
      'Apply all eval expressions before any index keywords',
      'Use the most selective indexed terms and time bounds before broad wildcards or post-pipe filters',
      'Always run dedup before the search command',
      'Replace field filters with transaction at the start of SPL',
    ],
    correctIndex: 1,
    explanation:
      'Pre-filtering means narrowing the search at the index with selective terms, fields, and time ranges so Splunk scans fewer events downstream.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },

  // --- 12.0 Manipulating and Filtering Data (5) ---
  {
    id: 'apu-mf-001',
    domainId: 'apu-manipulating-filtering',
    stem: 'What does the bin command do to a numeric or time field?',
    choices: [
      'Removes null values from the field',
      'Discretizes continuous values into fixed-width buckets for grouping',
      'Expands multivalue fields into separate events',
      'Converts _time to _indextime',
    ],
    correctIndex: 1,
    explanation:
      'bin groups continuous values (such as response_time or _time) into ranges so stats and chart can aggregate by bucket.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },
  {
    id: 'apu-mf-002',
    domainId: 'apu-manipulating-filtering',
    stem: 'The xyseries command is typically used to:',
    choices: [
      'Convert stats output with a row field and column field into a chart-friendly series table',
      'Parse XML paths from _raw',
      'Join two lookup tables on a shared key',
      'Accelerate a saved report in the background',
    ],
    correctIndex: 0,
    explanation:
      'xyseries reshapes tabular stats results (row/column/value layout) into the format expected by timechart-style visualizations.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },
  {
    id: 'apu-mf-003',
    domainId: 'apu-manipulating-filtering',
    stem: 'Which command reverses the xyseries/chart table shape back into a standard multi-column table?',
    choices: [
      'untable',
      'mvexpand',
      'reverse',
      'transpose only',
    ],
    correctIndex: 0,
    explanation:
      'untable converts wide chart-oriented tables (with _time or row field plus dynamic columns) back into normalized rows and columns.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },
  {
    id: 'apu-mf-004',
    domainId: 'apu-manipulating-filtering',
    stem: 'The foreach command is designed to:',
    choices: [
      'Run a subsearch or templated SPL fragment for each row (and optionally each field) in the current result set',
      'Sort multivalue fields alphabetically',
      'Create a transaction from related events',
      'Write results to a summary index',
    ],
    correctIndex: 0,
    explanation:
      'foreach iterates over result rows and can apply a subsearch or eval template per field, useful for dynamic per-row processing.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },
  {
    id: 'apu-mf-005',
    domainId: 'apu-manipulating-filtering',
    stem: 'You have stats output with host as rows and status codes as columns. Which pair of commands helps prepare this for a line chart?',
    choices: [
      'mvexpand then transaction',
      'xyseries then timechart or chart as appropriate',
      'untable then inputlookup',
      'spath then multikv',
    ],
    correctIndex: 1,
    explanation:
      'xyseries converts cross-tab stats into series columns; combined with chart/timechart you can visualize metrics by series over a dimension.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },

  // --- 13.0 Working with Multivalued Fields (7) ---
  {
    id: 'apu-mv-001',
    domainId: 'apu-multivalued-fields',
    stem: 'Which command creates a multivalue field from a single-value string delimited by commas?',
    choices: [
      'makemv delim=","',
      'mvexpand',
      'mvjoin',
      'split only in rex',
    ],
    correctIndex: 0,
    explanation:
      'makemv splits a string on a delimiter (for example delim="," ) and stores the parts as a multivalue field on the same event.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },
  {
    id: 'apu-mv-002',
    domainId: 'apu-multivalued-fields',
    stem: 'What does mvexpand do to an event with a multivalue field?',
    choices: [
      'Joins multiple events into one transaction',
      'Creates one event per value in the multivalue field',
      'Removes duplicate values within the multivalue field',
      'Converts _time to multiple timestamps',
    ],
    correctIndex: 1,
    explanation:
      'mvexpand duplicates the event once for each value in the specified multivalue field so each value can be analyzed on its own row.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },
  {
    id: 'apu-mv-003',
    domainId: 'apu-multivalued-fields',
    stem: 'In eval, which function returns the number of values in a multivalue field?',
    choices: [
      'mvcount()',
      'mvindex()',
      'mvdedup()',
      'coalesce()',
    ],
    correctIndex: 0,
    explanation:
      'mvcount(field) returns how many values the multivalue field contains on that event.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },
  {
    id: 'apu-mv-004',
    domainId: 'apu-multivalued-fields',
    stem: 'Which eval function retrieves the third value (zero-based index 2) from multivalue field tags?',
    choices: [
      'mvindex(tags,2)',
      'mvjoin(tags,2)',
      'mvfilter(tags,2)',
      'mvsort(tags,2)',
    ],
    correctIndex: 0,
    explanation:
      'mvindex(field,index) returns the value at the given zero-based position in a multivalue field.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },
  {
    id: 'apu-mv-005',
    domainId: 'apu-multivalued-fields',
    stem: 'Which eval function concatenates all values of multivalue field ip into a single string separated by semicolons?',
    choices: [
      'mvjoin(ip,";")',
      'makemv(ip,";")',
      'mvexpand(ip,";")',
      'mvcount(ip,";")',
    ],
    correctIndex: 0,
    explanation:
      'mvjoin(field,delimiter) flattens multivalue entries into one delimited string for display or export.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },
  {
    id: 'apu-mv-006',
    domainId: 'apu-multivalued-fields',
    stem: 'You need to keep only multivalue user values that match *@example.com. Which eval expression is appropriate?',
    choices: [
      'mvfilter(user, match(user,".*@example\\.com"))',
      'mvdedup(user, match(user,".*@example\\.com"))',
      'makemv(user, match(user,".*@example\\.com"))',
      'mvsort(user, match(user,".*@example\\.com"))',
    ],
    correctIndex: 0,
    explanation:
      'mvfilter(field, predicate) returns a new multivalue field containing only values where the predicate is true.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },
  {
    id: 'apu-mv-007',
    domainId: 'apu-multivalued-fields',
    stem: 'Which eval function sorts the values within a multivalue field alphabetically?',
    choices: [
      'mvsort(field)',
      'mvzip(field)',
      'mvappend(field)',
      'mvcount(field)',
    ],
    correctIndex: 0,
    explanation:
      'mvsort(field) orders the individual values inside a multivalue field, which helps consistent display and comparison.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },

  // --- 14.0 Using Advanced Transactions (5) ---
  {
    id: 'apu-at-001',
    domainId: 'apu-advanced-transactions',
    stem: 'Which practice improves transaction command performance?',
    choices: [
      'Use the broadest possible field list so every event matches',
      'Constrain with selective fields, startswith/endswith, and reasonable maxspan or maxpause',
      'Always run transaction before any index-time filter',
      'Disable time order so Splunk can parallelize freely',
    ],
    correctIndex: 1,
    explanation:
      'Transactions are memory-intensive; narrow correlation fields and time bounds (maxspan, maxpause, startswith, endswith) reduce open transaction state.',
    docLinks: [{ label: 'Transactions', url: APU_DOCS.transactions }],
  },
  {
    id: 'apu-at-002',
    domainId: 'apu-advanced-transactions',
    stem: 'In a transaction workflow, eval coalesce(session_id, cookie, ip) is useful because it:',
    choices: [
      'Deletes events missing all three fields',
      'Fills a single field with the first non-null value among the arguments for correlation',
      'Expands multivalue session identifiers',
      'Writes the result to a lookup table automatically',
    ],
    correctIndex: 1,
    explanation:
      'coalesce returns the first non-null argument, letting you build a consistent correlation key when some events lack certain identifiers.',
    docLinks: [{ label: 'Transactions', url: APU_DOCS.transactions }],
  },
  {
    id: 'apu-at-003',
    domainId: 'apu-advanced-transactions',
    stem: 'A transaction search ends at maxspan=5m. Events arriving 6 minutes after the first event in the group will:',
    choices: [
      'Always merge into the same transaction regardless of time',
      'Start a new transaction or remain ungrouped because the span limit was exceeded',
      'Be dropped from search results entirely',
      'Convert automatically to a subsearch',
    ],
    correctIndex: 1,
    explanation:
      'maxspan caps how long a transaction can grow; events outside that window cannot extend the same transaction and form new groups or stay separate.',
    docLinks: [{ label: 'Transactions', url: APU_DOCS.transactions }],
  },
  {
    id: 'apu-at-004',
    domainId: 'apu-advanced-transactions',
    stem: 'What is an incomplete transaction in Splunk?',
    choices: [
      'A transaction that never received a closing event before maxspan, maxpause, or maxevents forced it closed',
      'Any transaction with fewer than two fields',
      'A transaction created only by stats',
      'An accelerated data model dataset',
    ],
    correctIndex: 0,
    explanation:
      'Incomplete transactions occur when grouping limits or missing end markers (endswith) close a transaction before the logical session finished.',
    docLinks: [{ label: 'Transactions', url: APU_DOCS.transactions }],
  },
  {
    id: 'apu-at-005',
    domainId: 'apu-advanced-transactions',
    stem: 'The transaction option keepevicted=true is used to:',
    choices: [
      'Include events that were evicted from a transaction due to limits in the output',
      'Prevent any time-based grouping',
      'Force all events into exactly one transaction',
      'Disable field correlation entirely',
    ],
    correctIndex: 0,
    explanation:
      'When transaction limits evict events, keepevicted=true adds those evicted events back to the result set so they are not silently dropped.',
    docLinks: [{ label: 'Transactions', url: APU_DOCS.transactions }],
  },

  // --- 15.0 Working with Time (2) ---
  {
    id: 'apu-wt-001',
    domainId: 'apu-working-with-time',
    stem: 'Which search modifier restricts results to events from the last 15 minutes ending now?',
    choices: [
      'earliest=-15m latest=now',
      'index_earliest=-15m index_latest=now only in inputs.conf',
      'span=15m on the search command',
      '_indextime>-15m without earliest/latest',
    ],
    correctIndex: 0,
    explanation:
      'Time modifiers earliest and latest bound the window Splunk searches on the default _time field; earliest=-15m latest=now means the past 15 minutes.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },
  {
    id: 'apu-wt-002',
    domainId: 'apu-working-with-time',
    stem: 'Which statement about Splunk time fields is correct?',
    choices: [
      '_indextime is the default field used for chart time axes and time pickers',
      '_time is the timestamp parsed from the event; _indextime is when Splunk indexed the event',
      '_time and _indextime always contain identical values',
      'Time modifiers apply to _indextime unless you specify _time in every command',
    ],
    correctIndex: 1,
    explanation:
      'By default searches and visualizations use _time (event timestamp). _indextime reflects indexing latency and is used only when explicitly searched.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },
]
