import type { Question } from '../../../types'
import { APU_DOCS } from './docs'

/** Domains 1–8 of Advanced Power User blueprint (24 questions). */
export const advancedPowerUserChunk1: Question[] = [
  // --- 1.0 Exploring Statistical Commands (3) ---
  {
    id: 'apu-sc-001',
    domainId: 'apu-statistical-commands',
    stem: 'How does eventstats differ from stats when calculating aggregates?',
    choices: [
      'eventstats collapses results to one row per group like stats',
      'eventstats adds aggregate values to each original event without reducing row count',
      'eventstats only works on summary indexes',
      'eventstats requires a transforming command before it',
    ],
    correctIndex: 1,
    explanation:
      'eventstats performs aggregations but keeps every input event, adding the calculated values as fields on each row; fieldsummary instead summarizes field usage in the result set.',
    docLinks: [
      {
        label: 'Search Manual',
        url: APU_DOCS.searchManual,
      },
    ],
  },
  {
    id: 'apu-sc-002',
    domainId: 'apu-statistical-commands',
    stem: 'Which command computes cumulative or windowed statistics over ordered events, such as a running count?',
    choices: [
      'fieldsummary',
      'streamstats',
      'appendpipe',
      'metadata',
    ],
    correctIndex: 1,
    explanation:
      'streamstats walks events in order and can compute running totals with options like window and reset_on_change; fieldsummary reports metadata about fields in the result set.',
    docLinks: [
      {
        label: 'Search Manual',
        url: APU_DOCS.searchManual,
      },
    ],
  },
  {
    id: 'apu-sc-003',
    domainId: 'apu-statistical-commands',
    stem: 'What is the primary purpose of appendpipe in a search pipeline?',
    choices: [
      'Merge two unrelated indexes at index time',
      'Run a subpipeline on the current results and append its output to the result set',
      'Replace rex extractions with calculated fields',
      'Report distinct counts and numeric ranges for each field',
    ],
    correctIndex: 1,
    explanation:
      'appendpipe applies additional SPL to the current result set and appends the transformed rows, often for totals or summary lines.',
    docLinks: [
      {
        label: 'Search Manual',
        url: APU_DOCS.searchManual,
      },
    ],
  },
  // --- 2.0 Exploring eval Command Functions (3) ---
  {
    id: 'apu-ef-001',
    domainId: 'apu-eval-functions',
    stem: 'Which eval function evaluates multiple conditions in order and returns the value paired with the first true match?',
    choices: [
      'if()',
      'case()',
      'coalesce()',
      'isnotnull()',
    ],
    correctIndex: 1,
    explanation:
      'case(test1, val1, test2, val2, ..., default) supports multi-branch conditional logic; if() handles a single Boolean test.',
    docLinks: [
      {
        label: 'Search Manual',
        url: APU_DOCS.searchManual,
      },
    ],
  },
  {
    id: 'apu-ef-002',
    domainId: 'apu-eval-functions',
    stem: 'What does the makeresults command do?',
    choices: [
      'Summarize fields with distinct counts and numeric ranges',
      'Generate a specified number of synthetic events for testing or scaffolding searches',
      'Convert _raw JSON into multivalue fields automatically',
      'Write alert output to a KV Store collection',
    ],
    correctIndex: 1,
    explanation:
      'makeresults count=N creates N blank result rows so you can build searches without a base index query.',
    docLinks: [
      {
        label: 'Search Manual',
        url: APU_DOCS.searchManual,
      },
    ],
  },
  {
    id: 'apu-ef-003',
    domainId: 'apu-eval-functions',
    stem: 'Which eval expression converts a numeric field to a string for display or concatenation?',
    choices: [
      'tonumber(status_code)',
      'tostring(bytes, "commas")',
      'strptime(_time, "%s")',
      'len(_raw)',
    ],
    correctIndex: 1,
    explanation:
      'tostring converts numbers to strings and supports optional formats; tonumber and strptime perform the opposite or parse timestamps.',
    docLinks: [
      {
        label: 'Search Manual',
        url: APU_DOCS.searchManual,
      },
    ],
  },
  // --- 3.0 Exploring Lookups (3) ---
  {
    id: 'apu-lk-001',
    domainId: 'apu-lookups',
    stem: 'Splunk KV Store lookups are best described as:',
    choices: [
      'Read-only CSV files stored in $SPLUNK_HOME/etc/system/lookups',
      'MongoDB-backed collections used to enrich searches and optionally store output',
      'Geospatial databases bundled with Splunk Enterprise only',
      'Index-time EXTRACT stanzas in props.conf',
    ],
    correctIndex: 1,
    explanation:
      'KV Store provides document collections for lookup tables and applications that need read/write enrichment data.',
    docLinks: [
      {
        label: 'Lookups',
        url: APU_DOCS.lookups,
      },
    ],
  },
  {
    id: 'apu-lk-002',
    domainId: 'apu-lookups',
    stem: 'An external lookup type in Splunk typically:',
    choices: [
      'Requires events to be reindexed',
      'Calls an external command or script to retrieve matching rows at search time',
      'Only works inside summary-index searches',
      'Replaces the need for search-time field extractions entirely',
    ],
    correctIndex: 1,
    explanation:
      'External lookups delegate matching to an external program or script defined in transforms.conf; options like append=t and OUTPUT control enrichment behavior.',
    docLinks: [
      {
        label: 'Lookups',
        url: APU_DOCS.lookups,
      },
    ],
  },
  {
    id: 'apu-lk-003',
    domainId: 'apu-lookups',
    stem: 'When enriching events with geospatial lookup data, which statement is most accurate?',
    choices: [
      'Geospatial lookups require index-time routing in outputs.conf',
      'Geospatial KMZ/KML lookup files can add featureId and geometry fields at search time',
      'Geospatial enrichment permanently alters _raw in the index',
      'Only the iplocation command can perform geospatial enrichment',
    ],
    correctIndex: 1,
    explanation:
      'Geospatial lookups attach feature identifiers and geometry from geospatial lookup files; advanced options such as append=t control how fields merge at search time.',
    docLinks: [
      {
        label: 'Lookups',
        url: APU_DOCS.lookups,
      },
    ],
  },
  // --- 4.0 Exploring Alerts (3) ---
  {
    id: 'apu-al-001',
    domainId: 'apu-alerts',
    stem: 'A webhook alert action in Splunk is used to:',
    choices: [
      'Email raw _raw payloads only through SMTP',
      'Send an HTTP POST with alert payload data to a configured endpoint',
      'Write results directly into a summary index without a scheduled search',
      'Disable trigger conditions after the first firing',
    ],
    correctIndex: 1,
    explanation:
      'Webhook actions POST JSON or form data to a URL so external systems can consume alert results programmatically.',
    docLinks: [
      {
        label: 'Alert Manual',
        url: APU_DOCS.alerts,
      },
    ],
  },
  {
    id: 'apu-al-002',
    domainId: 'apu-alerts',
    stem: 'Which alert action writes triggered search results into a lookup table for later enrichment?',
    choices: [
      'Webhook',
      'Lookup output (outputlookup)',
      'Script only',
      'Index summary',
    ],
    correctIndex: 1,
    explanation:
      'The lookup output action saves alert result fields to a CSV or KV Store lookup so future searches can reference them.',
    docLinks: [
      {
        label: 'Alert Manual',
        url: APU_DOCS.alerts,
      },
    ],
  },
  {
    id: 'apu-al-003',
    domainId: 'apu-alerts',
    stem: 'When alert events are indexed as searchable events, which field commonly identifies alert severity?',
    choices: [
      'alert.severity',
      'index=_internal only',
      'sourcetype=stash exclusively without other fields',
      'action.email.to',
    ],
    correctIndex: 0,
    explanation:
      'Indexed alert events include fields such as alert.severity and alert_type so analysts can search alert history in Splunk.',
    docLinks: [
      {
        label: 'Alert Manual',
        url: APU_DOCS.alerts,
      },
    ],
  },
  // --- 5.0 Advanced Field Creation and Management (3) ---
  {
    id: 'apu-af-001',
    domainId: 'apu-advanced-fields',
    stem: 'The rex command is primarily used to:',
    choices: [
      'Configure index-time host routing',
      'Extract or rename fields from _raw using a regular expression at search time',
      'Accelerate data model summaries',
      'Create nested search macros',
    ],
    correctIndex: 1,
    explanation:
      'rex applies a named capture group regex to _raw or another field; for repeated use, field extractions (FX) defined as REPORT/EXTRACT are more efficient than ad hoc rex.',
    docLinks: [
      {
        label: 'Field extractions',
        url: APU_DOCS.fieldExtractions,
      },
    ],
  },
  {
    id: 'apu-af-002',
    domainId: 'apu-advanced-fields',
    stem: 'How does the erex command differ from rex?',
    choices: [
      'erex only runs at index time',
      'erex learns or suggests a regex from examples you provide rather than requiring a full pattern upfront',
      'erex cannot create multiple fields',
      'erex replaces FIELDALIAS definitions',
    ],
    correctIndex: 1,
    explanation:
      'erex (example regex) helps build extractions interactively by training on sample values instead of hand-writing the full regex.',
    docLinks: [
      {
        label: 'Field extractions',
        url: APU_DOCS.fieldExtractions,
      },
    ],
  },
  {
    id: 'apu-af-003',
    domainId: 'apu-advanced-fields',
    stem: 'Which practice improves regex field extraction performance in Splunk?',
    choices: [
      'Use unanchored greedy patterns that scan the entire _raw repeatedly',
      'Anchor patterns, limit backtracking, and reuse field extractions instead of ad hoc rex everywhere',
      'Always run rex before every search command',
      'Disable the search-time extractions bundle globally',
    ],
    correctIndex: 1,
    explanation:
      'Efficient anchored patterns and knowledge-object field extractions (FX) reduce scan cost compared with overly broad search-time regex.',
    docLinks: [
      {
        label: 'Field extractions',
        url: APU_DOCS.fieldExtractions,
      },
    ],
  },
  // --- 6.0 Working with Self-Describing Data and Files (3) ---
  {
    id: 'apu-sd-001',
    domainId: 'apu-self-describing-data',
    stem: 'The spath command is used to:',
    choices: [
      'Parse multiline key-value logs delimited by blank lines',
      'Extract fields from structured JSON or XML embedded in an event using path expressions',
      'Convert epoch timestamps to human-readable strings',
      'Append geospatial features from KMZ files',
    ],
    correctIndex: 1,
    explanation:
      'spath navigates JSON or XML structures in _raw or a field, pulling values via paths such as path=user.id.',
    docLinks: [
      {
        label: 'Search Manual',
        url: APU_DOCS.searchManual,
      },
    ],
  },
  {
    id: 'apu-sd-002',
    domainId: 'apu-self-describing-data',
    stem: 'When should you use multikv?',
    choices: [
      'When events contain multiple inline key-value sections separated by a configurable delimiter or header row',
      'When every event is a single JSON object with no nested arrays',
      'Only when accelerating reports',
      'To replace the inputlookup command entirely',
    ],
    correctIndex: 0,
    explanation:
      'multikv extracts tabular or repeated key-value blocks from semi-structured text such as command output or status tables.',
    docLinks: [
      {
        label: 'Search Manual',
        url: APU_DOCS.searchManual,
      },
    ],
  },
  {
    id: 'apu-sd-003',
    domainId: 'apu-self-describing-data',
    stem: 'For JSON data in _raw, which approach is most appropriate when you need nested field values at search time?',
    choices: [
      'Use spath or automatic JSON field extraction after ensuring valid JSON in _raw',
      'Configure a TRANSFORMS-routing stanza only',
      'Use transaction to merge JSON keys',
      'Require summary indexing before any field access',
    ],
    correctIndex: 0,
    explanation:
      'Structured JSON can be parsed with spath or JSON field extraction so nested keys become searchable fields.',
    docLinks: [
      {
        label: 'Search Manual',
        url: APU_DOCS.searchManual,
      },
    ],
  },
  // --- 7.0 Advanced Search Macros (3) ---
  {
    id: 'apu-am-001',
    domainId: 'apu-advanced-macros',
    stem: 'Nested search macros in Splunk allow:',
    choices: [
      'One macro definition to invoke another macro within its expansion',
      'Macros to modify indexes.conf at runtime',
      'Only static strings with no arguments',
      'Automatic report acceleration without configuration',
    ],
    correctIndex: 0,
    explanation:
      'Macros can call other macros, enabling reusable building blocks while keeping complex SPL maintainable.',
    docLinks: [
      {
        label: 'Search macros',
        url: APU_DOCS.macros,
      },
    ],
  },
  {
    id: 'apu-am-002',
    domainId: 'apu-advanced-macros',
    stem: 'What does the macro preview feature help administrators verify?',
    choices: [
      'Indexer disk usage only',
      'The fully expanded SPL after substituting macro arguments before saving or sharing',
      'Whether a lookup file is world-readable',
      'Forwarder certificate expiration dates',
    ],
    correctIndex: 1,
    explanation:
      'Preview shows the resolved search string with argument values substituted so you can validate syntax and logic.',
    docLinks: [
      {
        label: 'Search macros',
        url: APU_DOCS.macros,
      },
    ],
  },
  {
    id: 'apu-am-003',
    domainId: 'apu-advanced-macros',
    stem: 'Macro arguments in Splunk are referenced in the definition using which syntax?',
    choices: [
      '$arg1$',
      '$$arg1$$',
      '{arg1}',
      '<arg1>',
    ],
    correctIndex: 0,
    explanation:
      'Macro parameters use dollar-delimited placeholders such as $host$ that Splunk replaces when the macro is invoked.',
    docLinks: [
      {
        label: 'Search macros',
        url: APU_DOCS.macros,
      },
    ],
  },
  // --- 8.0 Acceleration: Reports and Summary Indexing (3) ---
  {
    id: 'apu-ra-001',
    domainId: 'apu-report-acceleration',
    stem: 'Report acceleration in Splunk is designed to:',
    choices: [
      'Replace the need for any scheduled searches',
      'Precompute and cache summaries of qualifying reports to speed repeated runs over large datasets',
      'Encrypt summary data at rest automatically',
      'Disable real-time searches globally',
    ],
    correctIndex: 1,
    explanation:
      'Report acceleration stores intermediate tsidx-like summaries so eligible saved reports return faster on subsequent executions.',
    docLinks: [
      {
        label: 'Reports',
        url: APU_DOCS.reports,
      },
    ],
  },
  {
    id: 'apu-ra-002',
    domainId: 'apu-report-acceleration',
    stem: 'Summary indexing typically involves:',
    choices: [
      'Writing aggregated search results on a schedule into a dedicated summary index for later reuse',
      'Deleting raw events after parsing',
      'Running searches only in real-time mode',
      'Storing macros in MongoDB',
    ],
    correctIndex: 0,
    explanation:
      'Administrators schedule searches that collect summarized metrics or events into a summary index to reduce search cost.',
    docLinks: [
      {
        label: 'Reports',
        url: APU_DOCS.reports,
      },
    ],
  },
  {
    id: 'apu-ra-003',
    domainId: 'apu-report-acceleration',
    stem: 'Which command is commonly used at the end of a summary-indexing search to write results into the summary index?',
    choices: [
      'outputlookup',
      'collect index=<summary_index>',
      'fieldsummary',
      'erex',
    ],
    correctIndex: 1,
    explanation:
      'The collect command sends the current result set to a specified index, which is the standard pattern for populating summary indexes.',
    docLinks: [
      {
        label: 'Reports',
        url: APU_DOCS.reports,
      },
    ],
  },
]
