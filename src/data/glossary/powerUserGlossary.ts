import type { GlossaryDomain } from './types'
import { PU_DOCS } from '../questions/powerUser/docs'

/** Core Power User — topic glossary aligned with public learning outline */
export const POWER_USER_GLOSSARY_DOMAINS: GlossaryDomain[] = [
  {
    id: 'pu-transforming-viz',
    title: 'Transforming Commands for Visualizations',
    overview:
      'Power User visualizations lean on transforming commands—especially `chart` and `timechart`—to shape statistics before rendering. `timechart` buckets by `_time` for trend lines; `chart` generalizes over arbitrary dimensions with `over` and `by` clauses.',
    referenceUrls: [
      { label: 'Search Manual', url: PU_DOCS.searchManual },
    ],
    entries: [
      {
        term: 'chart',
        kind: 'command',
        summary: 'Aggregates results for charting with `over` / `by` dimensions.',
        example: '... | chart count by status',
      },
      {
        term: 'timechart',
        kind: 'command',
        summary: 'Time-bucketed aggregations—default x-axis is `_time`.',
        example: '... | timechart avg(duration) by host',
      },
    ],
  },
  {
    id: 'pu-filtering-formatting',
    title: 'Filtering and Formatting Results',
    overview:
      'Use `eval` to compute or reformat fields, `where` to filter after transforming commands, and `fillnull` to make empty cells dashboard-friendly. Combine with `search` for additional constraints on transformed datasets.',
    referenceUrls: [
      { label: 'Search Manual', url: PU_DOCS.searchManual },
    ],
    entries: [
      { term: 'eval', kind: 'command', summary: 'Expression language for new or overwritten fields at search time.' },
      { term: 'where', kind: 'command', summary: 'Filters rows after stats/chart—like SQL WHERE on result rows.' },
      { term: 'fillnull', kind: 'command', summary: 'Replaces null values in specified fields for cleaner reports.' },
    ],
  },
  {
    id: 'pu-correlating-events',
    title: 'Correlating Events',
    overview:
      'Correlate multi-event sessions with `transaction` (ordered groups with optional time/field constraints) or with `stats` when you only need summaries. Choose `transaction` for raw event lists per session; `stats` when counts/durations per key suffice.',
    referenceUrls: [
      { label: 'About transactions', url: PU_DOCS.transactions },
    ],
    entries: [
      { term: 'transaction', kind: 'command', summary: 'Groups related events into multi-event transactions.' },
      { term: 'stats vs transaction', kind: 'concept', summary: 'stats summarizes; transaction preserves member events for drilldown.' },
    ],
  },
  {
    id: 'pu-managing-fields',
    title: 'Creating and Managing Fields',
    overview:
      'Field Extractor (FX) builds regex or delimiter extractions scoped by sourcetype/host/source. Extractions at index time vs search time depend on configuration; validate with Data Preview and sample searches.',
    referenceUrls: [
      { label: 'Field extractions', url: PU_DOCS.fieldExtractions },
    ],
    entries: [
      { term: 'Field Extractor', kind: 'concept', summary: 'UI wizard for regex/delimiter field extractions.' },
      { term: 'REGEX extraction', kind: 'concept', summary: 'Named groups in props/transforms pull fields from `_raw`.' },
    ],
  },
  {
    id: 'pu-aliases-calculated',
    title: 'Field Aliases and Calculated Fields',
    overview:
      'Aliases normalize disparate field names to one canonical name at search time. Calculated fields apply eval expressions automatically whenever the host/sourcetype scope matches.',
    referenceUrls: [
      { label: 'Field aliases', url: PU_DOCS.fieldAliases },
      { label: 'Calculated fields', url: PU_DOCS.calculatedFields },
    ],
    entries: [
      { term: 'field alias', kind: 'concept', summary: 'Maps alternate field names to a single alias.' },
      { term: 'calculated field', kind: 'concept', summary: 'Persistent eval expression applied as a field.' },
    ],
  },
  {
    id: 'pu-tags-event-types',
    title: 'Tags and Event Types',
    overview:
      'Tags label `field=value` pairs for simpler searching (`tag=authentication`). Event types are saved searches that classify matching events—often paired with tags and CIM datamodels.',
    referenceUrls: [
      { label: 'Tags', url: PU_DOCS.tags },
      { label: 'Event types', url: PU_DOCS.eventTypes },
    ],
    entries: [
      { term: 'tag', kind: 'concept', summary: 'Knowledge object labeling field=value pairs.' },
      { term: 'event type', kind: 'concept', summary: 'Saved search definition categorizing events.' },
    ],
  },
  {
    id: 'pu-macros',
    title: 'Macros',
    overview:
      'Search macros encapsulate reusable SPL with optional arguments—use backtick invocation `` `macro_name(arg)` ``. Arguments reduce copy/paste and enforce consistent logic across teams.',
    referenceUrls: [{ label: 'Search macros', url: PU_DOCS.macros }],
    entries: [
      { term: 'search macro', kind: 'concept', summary: 'Parameterized SPL snippet invoked with backticks.' },
      { term: 'macro argument', kind: 'concept', summary: 'Variables passed into macro expansion at search time.' },
    ],
  },
  {
    id: 'pu-workflow-actions',
    title: 'Workflow Actions',
    overview:
      'Workflow actions launch external links or searches from field values in the UI: GET opens URLs, POST submits forms, Search runs contextual SPL with field substitutions.',
    referenceUrls: [{ label: 'Workflow actions', url: PU_DOCS.workflowActions }],
    entries: [
      { term: 'GET workflow action', kind: 'concept', summary: 'Opens a URL built from field values.' },
      { term: 'Search workflow action', kind: 'concept', summary: 'Runs a parameterized search from the event viewer.' },
    ],
  },
  {
    id: 'pu-data-models',
    title: 'Data Models',
    overview:
      'Data models hierarchically organize datasets and fields for Pivot and accelerated searches. Child datasets inherit constraints; attributes map to fields or searches.',
    referenceUrls: [{ label: 'Data models', url: PU_DOCS.dataModels }],
    entries: [
      { term: 'data model', kind: 'concept', summary: 'Structured knowledge hierarchy for Pivot and reporting.' },
      { term: 'Pivot', kind: 'concept', summary: 'UI that builds searches from data model objects without SPL.' },
    ],
  },
  {
    id: 'pu-cim-addon',
    title: 'CIM Add-On',
    overview:
      'The Common Information Model standardizes field names and event types across security and IT data sources. The CIM Add-on ships datamodels, tags, and field aliases to accelerate normalization.',
    referenceUrls: [{ label: 'CIM manual', url: PU_DOCS.cimManual }],
    entries: [
      { term: 'CIM', kind: 'concept', summary: 'Splunk schema for normalized security/IT events.' },
      { term: 'CIM Add-on', kind: 'concept', summary: 'App providing models/tags/aliases for CIM compliance.' },
    ],
  },
]
