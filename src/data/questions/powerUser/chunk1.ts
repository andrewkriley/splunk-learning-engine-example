import type { Question } from '../../../types'
import { PU_DOCS } from './docs'

/** Domains 1–5 of Power User blueprint (35 questions). */
export const powerUserChunk1: Question[] = [
  // --- 1.0 Using Transforming Commands for Visualizations (4) ---
  {
    id: 'pu-tv-001',
    domainId: 'pu-transforming-viz',
    stem: 'Which transforming command is designed to produce time-series results with _time on the X-axis for line or area charts?',
    choices: [
      'chart',
      'timechart',
      'transaction',
      'dedup',
    ],
    correctIndex: 1,
    explanation:
      'timechart aggregates events into time buckets and is the standard command for time-series visualizations.',
    docLinks: [
      {
        label: 'Search Manual',
        url: PU_DOCS.searchManual,
      },
    ],
  },
  {
    id: 'pu-tv-002',
    domainId: 'pu-transforming-viz',
    stem: 'In timechart, what does the span argument control?',
    choices: [
      'Maximum number of series shown in the legend',
      'Width of each time bucket used for aggregation',
      'The earliest _time allowed in the chart',
      'How many sourcetypes are indexed per minute',
    ],
    correctIndex: 1,
    explanation:
      'span sets bucket size (for example span=5m or span=1h); Splunk aggregates events within each bucket before charting.',
    docLinks: [
      {
        label: 'Search Manual',
        url: PU_DOCS.searchManual,
      },
    ],
  },
  {
    id: 'pu-tv-003',
    domainId: 'pu-transforming-viz',
    stem: 'Which command creates a table suited for column or bar charts when you need arbitrary fields on the X and Y axes rather than a strict time axis?',
    choices: [
      'timechart',
      'chart',
      'inputlookup',
      'metadata',
    ],
    correctIndex: 1,
    explanation:
      'chart builds a two-dimensional table from aggregations and is used when the X dimension is not limited to _time.',
    docLinks: [
      {
        label: 'Search Manual',
        url: PU_DOCS.searchManual,
      },
    ],
  },
  {
    id: 'pu-tv-004',
    domainId: 'pu-transforming-viz',
    stem: 'A search ends with "| timechart count by status". Which visualization is most appropriate for comparing status counts over time?',
    choices: [
      'Single value',
      'Line or stacked area chart',
      'Choropleth map without geostats',
      'Raw event list',
    ],
    correctIndex: 1,
    explanation:
      'timechart output includes _time buckets and split-by series, which maps directly to line, area, or column charts over time.',
    docLinks: [
      {
        label: 'Search Manual',
        url: PU_DOCS.searchManual,
      },
    ],
  },
  // --- 2.0 Filtering and Formatting Results (7) ---
  {
    id: 'pu-ff-001',
    domainId: 'pu-filtering-formatting',
    stem: 'What is the primary purpose of the eval command?',
    choices: [
      'Delete events from the index permanently',
      'Calculate, reformat, or assign values to fields in the search pipeline',
      'Configure forwarder outputs.conf',
      'Create index-time EXTRACT stanzas',
    ],
    correctIndex: 1,
    explanation:
      'eval evaluates an expression and writes the result into a new or existing field for each result row.',
    docLinks: [
      {
        label: 'Search Manual',
        url: PU_DOCS.searchManual,
      },
    ],
  },
  {
    id: 'pu-ff-002',
    domainId: 'pu-filtering-formatting',
    stem: 'The where command filters results by:',
    choices: [
      'Evaluating a Boolean expression and keeping rows where it is true',
      'Replacing null values with a default string',
      'Parsing _raw with a regular expression',
      'Grouping events into transactions',
    ],
    correctIndex: 0,
    explanation:
      'where acts like a row filter on the current result set, commonly after transforming commands such as stats.',
    docLinks: [
      {
        label: 'Search Manual',
        url: PU_DOCS.searchManual,
      },
    ],
  },
  {
    id: 'pu-ff-003',
    domainId: 'pu-filtering-formatting',
    stem: 'Why is it a best practice to place restrictive search terms as early as possible in SPL?',
    choices: [
      'Early filtering reduces data processed by later commands and improves performance',
      'Later commands cannot use indexed fields',
      'eval must always be the first command',
      'timechart requires keywords before pipes',
    ],
    correctIndex: 0,
    explanation:
      'Filtering at the beginning of a search (or in the initial search string) limits events retrieved before expensive commands run.',
    docLinks: [
      {
        label: 'Search Manual',
        url: PU_DOCS.searchManual,
      },
    ],
  },
  {
    id: 'pu-ff-004',
    domainId: 'pu-filtering-formatting',
    stem: 'What does fillnull do?',
    choices: [
      'Removes all events with null fields from the index',
      'Replaces null values in specified fields with a given replacement value',
      'Creates a field alias for null-named fields',
      'Converts _time to human-readable format',
    ],
    correctIndex: 1,
    explanation:
      'fillnull is a streaming command that substitutes a default value wherever a field is null in the current results.',
    docLinks: [
      {
        label: 'Search Manual',
        url: PU_DOCS.searchManual,
      },
    ],
  },
  {
    id: 'pu-ff-005',
    domainId: 'pu-filtering-formatting',
    stem: 'Which eval function converts a string field to uppercase?',
    choices: [
      'toupper()',
      'upper()',
      'strupper()',
      'capitalize()',
    ],
    correctIndex: 1,
    explanation:
      'upper() is the standard eval function for case conversion on string values.',
    docLinks: [
      {
        label: 'Search Manual',
        url: PU_DOCS.searchManual,
      },
    ],
  },
  {
    id: 'pu-ff-006',
    domainId: 'pu-filtering-formatting',
    stem: 'After "| stats count by host", which command keeps only hosts with more than 100 events?',
    choices: [
      'search count>100',
      'where count > 100',
      'transaction maxevents=100',
      'dedup count',
    ],
    correctIndex: 1,
    explanation:
      'where filters aggregated rows from stats; search alone does not reference the stats output field count in the same way after the pipe.',
    docLinks: [
      {
        label: 'Search Manual',
        url: PU_DOCS.searchManual,
      },
    ],
  },
  {
    id: 'pu-ff-007',
    domainId: 'pu-filtering-formatting',
    stem: 'Which command applies display formatting (such as units or number format) without changing the underlying numeric value used by later commands?',
    choices: [
      'fieldformat',
      'fillnull',
      'convert timeformat',
      'outputtext',
    ],
    correctIndex: 0,
    explanation:
      'fieldformat changes how field values appear in results and visualizations while leaving stored values unchanged for downstream SPL.',
    docLinks: [
      {
        label: 'Search Manual',
        url: PU_DOCS.searchManual,
      },
    ],
  },
  // --- 3.0 Correlating Events (10) ---
  {
    id: 'pu-ce-001',
    domainId: 'pu-correlating-events',
    stem: 'The transaction command groups events that:',
    choices: [
      'Share specified field values and fall within defined time constraints',
      'Must have identical _raw text',
      'Are always from a single index only',
      'Cannot include multivalue fields',
    ],
    correctIndex: 0,
    explanation:
      'transaction correlates related events—often a session or flow—based on shared fields plus maxpause, maxspan, and related options.',
    docLinks: [
      {
        label: 'About transactions',
        url: PU_DOCS.transactions,
      },
    ],
  },
  {
    id: 'pu-ce-002',
    domainId: 'pu-correlating-events',
    stem: 'In transaction, maxpause defines:',
    choices: [
      'Maximum total duration of the entire transaction',
      'Maximum time gap allowed between consecutive events in the same transaction',
      'Maximum number of fields that can be correlated',
      'Maximum search window in days',
    ],
    correctIndex: 1,
    explanation:
      'maxpause closes a transaction when no new matching event arrives within the specified pause interval.',
    docLinks: [
      {
        label: 'About transactions',
        url: PU_DOCS.transactions,
      },
    ],
  },
  {
    id: 'pu-ce-003',
    domainId: 'pu-correlating-events',
    stem: 'When should you prefer stats over transaction?',
    choices: [
      'When you need summary metrics and do not need to retain grouped raw events as multivalue rows',
      'When each session must keep all _raw values in one result row',
      'When matching startswith and endswith delimiters',
      'When maxpause and maxspan are required',
    ],
    correctIndex: 0,
    explanation:
      'stats aggregates and discards individual event groupings; transaction preserves correlated events as multivalue fields in fewer rows.',
    docLinks: [
      {
        label: 'About transactions',
        url: PU_DOCS.transactions,
      },
    ],
  },
  {
    id: 'pu-ce-004',
    domainId: 'pu-correlating-events',
    stem: 'transaction user session_id groups events when:',
    choices: [
      'Events share the same user and session_id field values (subject to time limits)',
      'Only _time values are identical',
      'sourcetype differs between events',
      '_raw must match exactly',
    ],
    correctIndex: 0,
    explanation:
      'Listing fields after transaction requires matching values on those fields for events to belong to the same group.',
    docLinks: [
      {
        label: 'About transactions',
        url: PU_DOCS.transactions,
      },
    ],
  },
  {
    id: 'pu-ce-005',
    domainId: 'pu-correlating-events',
    stem: 'startswith and endswith options in transaction are used to:',
    choices: [
      'Identify events that open or close a transaction group',
      'Sort results alphabetically by _raw',
      'Define chart split-by fields',
      'Configure regex field extractions',
    ],
    correctIndex: 0,
    explanation:
      'startswith and endswith let you mark boundary events (for example login and logout) when defining transaction groups.',
    docLinks: [
      {
        label: 'About transactions',
        url: PU_DOCS.transactions,
      },
    ],
  },
  {
    id: 'pu-ce-006',
    domainId: 'pu-correlating-events',
    stem: 'After transaction creates multivalue fields, mvjoin is commonly used to:',
    choices: [
      'Combine multivalue entries into a single delimited string',
      'Merge two separate indexes',
      'Create a calculated field in settings',
      'Split _raw by a delimiter at index time',
    ],
    correctIndex: 0,
    explanation:
      'mvjoin concatenates values in a multivalue field with a delimiter, which is useful for displaying transaction members.',
    docLinks: [
      {
        label: 'Search Manual',
        url: PU_DOCS.searchManual,
      },
    ],
  },
  {
    id: 'pu-ce-007',
    domainId: 'pu-correlating-events',
    stem: 'maxspan in transaction limits:',
    choices: [
      'Total elapsed time from the first to the last event in a transaction',
      'Number of CPU cores used by the search',
      'Maximum size of an index bucket',
      'Forwarder queue depth',
    ],
    correctIndex: 0,
    explanation:
      'maxspan caps how long a single transaction may span from its earliest to latest event.',
    docLinks: [
      {
        label: 'About transactions',
        url: PU_DOCS.transactions,
      },
    ],
  },
  {
    id: 'pu-ce-008',
    domainId: 'pu-correlating-events',
    stem: 'transaction keeporphans=true causes:',
    choices: [
      'Events that do not fit a transaction to be retained as separate transaction rows',
      'All orphan events to be dropped from results',
      'Null fields to be replaced automatically',
      'Indexes to be merged on the fly',
    ],
    correctIndex: 0,
    explanation:
      'With keeporphans=true, events that cannot be grouped still appear in the output rather than being discarded.',
    docLinks: [
      {
        label: 'About transactions',
        url: PU_DOCS.transactions,
      },
    ],
  },
  {
    id: 'pu-ce-009',
    domainId: 'pu-correlating-events',
    stem: 'Which approach groups event counts into fixed five-minute intervals for trend analysis?',
    choices: [
      'timechart span=5m count',
      'transaction span=5m',
      'fillnull span=5m',
      'alias span=5m',
    ],
    correctIndex: 0,
    explanation:
      'timechart with span buckets _time into intervals; transaction does not accept span for time bucketing.',
    docLinks: [
      {
        label: 'Search Manual',
        url: PU_DOCS.searchManual,
      },
    ],
  },
  {
    id: 'pu-ce-010',
    domainId: 'pu-correlating-events',
    stem: 'The correlate command helps you:',
    choices: [
      'Find field values that tend to appear together and how strongly they co-occur',
      'Rotate internal log files on forwarders',
      'Configure HEC tokens',
      'Accelerate data model summaries only',
    ],
    correctIndex: 0,
    explanation:
      'correlate analyzes co-occurrence patterns among field values, complementing transaction for relationship discovery.',
    docLinks: [
      {
        label: 'Search Manual',
        url: PU_DOCS.searchManual,
      },
    ],
  },
  // --- 4.0 Creating and Managing Fields (7) ---
  {
    id: 'pu-mf-001',
    domainId: 'pu-managing-fields',
    stem: 'The Field Extractor in Splunk Web is used to:',
    choices: [
      'Build and validate search-time field extractions from sample events',
      'Configure index-time routing to cold storage',
      'Manage forwarder deployment server classes',
      'Create workflow actions for external URLs',
    ],
    correctIndex: 0,
    explanation:
      'The Field Extractor guides creation of EXTRACT or REPORT stanzas from representative events without hand-editing conf files first.',
    docLinks: [
      {
        label: 'Fields and field extractions',
        url: PU_DOCS.fieldExtractions,
      },
    ],
  },
  {
    id: 'pu-mf-002',
    domainId: 'pu-managing-fields',
    stem: 'Regex-based field extractions in Splunk typically rely on:',
    choices: [
      'Named capture groups that map matched text to field names',
      'MD5 hashing of _raw',
      'SQL-style SELECT statements',
      'Wildcard-only patterns without groups',
    ],
    correctIndex: 0,
    explanation:
      'Named groups (?<field>...) or numbered groups referenced in EXTRACT/REPORT definitions assign captured text to fields.',
    docLinks: [
      {
        label: 'Fields and field extractions',
        url: PU_DOCS.fieldExtractions,
      },
    ],
  },
  {
    id: 'pu-mf-003',
    domainId: 'pu-managing-fields',
    stem: 'Delimiter-based extractions are best when:',
    choices: [
      'Fields appear in a consistent order separated by a known delimiter such as a comma or pipe',
      'Events are unstructured binary blobs',
      'No _raw field exists',
      'Only index-time parsing is permitted',
    ],
    correctIndex: 0,
    explanation:
      'DELIMS/FIELDS-style extractions split _raw on delimiters when positions are stable across events.',
    docLinks: [
      {
        label: 'Fields and field extractions',
        url: PU_DOCS.fieldExtractions,
      },
    ],
  },
  {
    id: 'pu-mf-004',
    domainId: 'pu-managing-fields',
    stem: 'Search-time field extractions are primarily configured in:',
    choices: [
      'props.conf and transforms.conf (EXTRACT, REPORT, or TRANSFORMS)',
      'indexes.conf only',
      'serverclass.conf',
      'authorize.conf exclusively',
    ],
    correctIndex: 0,
    explanation:
      'props.conf references transforms or inline EXTRACT stanzas; transforms.conf holds regex and delimiter extraction details.',
    docLinks: [
      {
        label: 'Fields and field extractions',
        url: PU_DOCS.fieldExtractions,
      },
    ],
  },
  {
    id: 'pu-mf-005',
    domainId: 'pu-managing-fields',
    stem: 'The rex command at search time:',
    choices: [
      'Extracts field values from _raw or another field using a regular expression',
      'Replicates buckets across indexers',
      'Creates permanent field aliases in aliases.conf',
      'Sends results to a lookup file automatically',
    ],
    correctIndex: 0,
    explanation:
      'rex is an ad hoc search-time extraction command useful for prototyping patterns before saving them as knowledge objects.',
    docLinks: [
      {
        label: 'Search Manual',
        url: PU_DOCS.searchManual,
      },
    ],
  },
  {
    id: 'pu-mf-006',
    domainId: 'pu-managing-fields',
    stem: 'Index-time field extractions differ from search-time extractions because they:',
    choices: [
      'Are applied when events are indexed and affect stored field values and index size',
      'Run only in the Field Extractor UI wizard',
      'Cannot use regular expressions',
      'Require the transaction command',
    ],
    correctIndex: 0,
    explanation:
      'Index-time extractions parse at ingest; search-time extractions apply when searches run and are generally preferred for flexibility.',
    docLinks: [
      {
        label: 'Fields and field extractions',
        url: PU_DOCS.fieldExtractions,
      },
    ],
  },
  {
    id: 'pu-mf-007',
    domainId: 'pu-managing-fields',
    stem: 'In the Field Extractor, choosing Regular expression mode allows you to:',
    choices: [
      'Define a pattern with capturing groups mapped to new field names',
      'Only split on fixed delimiters with FIELDS',
      'Disable all search-time extractions globally',
      'Automatically publish macros to all apps',
    ],
    correctIndex: 0,
    explanation:
      'Regular expression mode in the Field Extractor builds EXTRACT or REPORT definitions from regex capture groups.',
    docLinks: [
      {
        label: 'Fields and field extractions',
        url: PU_DOCS.fieldExtractions,
      },
    ],
  },
  // --- 5.0 Creating Field Aliases and Calculated Fields (7) ---
  {
    id: 'pu-ac-001',
    domainId: 'pu-aliases-calculated',
    stem: 'A field alias lets you:',
    choices: [
      'Refer to an existing field by an alternate name at search time without duplicating stored event data',
      'Permanently delete the original field from all events',
      'Force re-indexing of historical data',
      'Replace props.conf parsing entirely',
    ],
    correctIndex: 0,
    explanation:
      'Field aliases map one field name to another for searches and reports; the underlying indexed data is unchanged.',
    docLinks: [
      {
        label: 'Field aliases',
        url: PU_DOCS.fieldAliases,
      },
    ],
  },
  {
    id: 'pu-ac-002',
    domainId: 'pu-aliases-calculated',
    stem: 'Field aliases are defined in:',
    choices: [
      'aliases.conf',
      'inputs.conf',
      'limits.conf',
      'outputs.conf',
    ],
    correctIndex: 0,
    explanation:
      'aliases.conf stanzas specify ALIAS-fieldname and the source field to mirror at search time.',
    docLinks: [
      {
        label: 'Field aliases',
        url: PU_DOCS.fieldAliases,
      },
    ],
  },
  {
    id: 'pu-ac-003',
    domainId: 'pu-aliases-calculated',
    stem: 'Calculated fields are knowledge objects that:',
    choices: [
      'Apply an eval expression to populate a field for matching events at search time',
      'Parse _raw only at index time',
      'Replace the need for any stats command',
      'Require installation of the CIM add-on',
    ],
    correctIndex: 0,
    explanation:
      'Calculated fields store an eval expression and scope (host, sourcetype, etc.) so the field appears automatically in qualifying searches.',
    docLinks: [
      {
        label: 'About calculated fields',
        url: PU_DOCS.calculatedFields,
      },
    ],
  },
  {
    id: 'pu-ac-004',
    domainId: 'pu-aliases-calculated',
    stem: 'Two sourcetypes use different field names for the same concept (client_ip vs ip_addr). Which object normalizes reporting without re-indexing?',
    choices: [
      'Field alias',
      'Workflow action',
      'Index-time EXTRACT only',
      'outputs.conf stanza',
    ],
    correctIndex: 0,
    explanation:
      'Field aliases let multiple source field names appear under one consistent alias for dashboards and searches.',
    docLinks: [
      {
        label: 'Field aliases',
        url: PU_DOCS.fieldAliases,
      },
    ],
  },
  {
    id: 'pu-ac-005',
    domainId: 'pu-aliases-calculated',
    stem: 'When creating a calculated field, you must specify:',
    choices: [
      'An eval expression and matching constraints such as host or sourcetype',
      'Only a transaction maxpause value',
      'A forwarder server class name',
      'An HEC token and endpoint URL',
    ],
    correctIndex: 0,
    explanation:
      'Calculated fields combine an eval expression with metadata filters so the derivation applies to the intended data set.',
    docLinks: [
      {
        label: 'About calculated fields',
        url: PU_DOCS.calculatedFields,
      },
    ],
  },
  {
    id: 'pu-ac-006',
    domainId: 'pu-aliases-calculated',
    stem: 'In aliases.conf, OVERWRITE=true means:',
    choices: [
      'The alias may replace an existing destination field name if both are present',
      'All historical buckets are rebuilt immediately',
      'Index-time extractions are disabled',
      'The alias applies only on forwarders',
    ],
    correctIndex: 0,
    explanation:
      'OVERWRITE controls whether the alias field supersedes an existing field of the same name in search results.',
    docLinks: [
      {
        label: 'Field aliases',
        url: PU_DOCS.fieldAliases,
      },
    ],
  },
  {
    id: 'pu-ac-007',
    domainId: 'pu-aliases-calculated',
    stem: 'Field aliases and calculated fields both take effect at:',
    choices: [
      'Search time for events matching their configured scope',
      'Index time only for all events globally',
      'Forwarder installation time exclusively',
      'License master negotiation only',
    ],
    correctIndex: 0,
    explanation:
      'Both are search-time knowledge objects applied when qualifying events are retrieved, not when data is first indexed.',
    docLinks: [
      {
        label: 'Knowledge Management Manual',
        url: PU_DOCS.knowledgeManual,
      },
    ],
  },
]
