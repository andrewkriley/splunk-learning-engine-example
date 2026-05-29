import type { GlossaryDomain } from './types'
import { CU_DOCS } from '../questions/coreUser/docs'

/** Core User — topic glossary aligned with public learning outline */
export const CORE_USER_GLOSSARY_DOMAINS: GlossaryDomain[] = [
  {
    id: 'splunk-basics',
    title: 'Splunk Basics',
    overview:
      'Core User fundamentals: indexes store events, the Search app runs SPL, and roles control what users can see. Understand the data pipeline from input → parsing → indexing → search.',
    referenceUrls: [
      { label: 'Search Manual', url: CU_DOCS.searchManual },
    ],
    entries: [
      {
        term: 'index',
        kind: 'concept',
        summary: 'Logical container for events; searches target one or more indexes.',
      },
      {
        term: 'sourcetype',
        kind: 'concept',
        summary: 'Label that drives parsing rules and knowledge object scope.',
      },
      {
        term: 'SPL',
        kind: 'concept',
        summary: 'Splunk Processing Language—pipe-delimited commands that transform result sets.',
      },
    ],
  },
  {
    id: 'basic-searching',
    title: 'Basic Searching',
    overview:
      'Start with keywords and field=value predicates, time modifiers, and the timeline. Use the search bar, wildcards, and Boolean operators to narrow events before reporting commands.',
    referenceUrls: [
      { label: 'Search Manual', url: CU_DOCS.searchManual },
      { label: 'Use fields in searches', url: CU_DOCS.useFields },
    ],
    entries: [
      {
        term: 'index-time vs search-time',
        kind: 'concept',
        summary: 'Parsing/indexing happens at ingest; SPL filters and transforms at search time.',
      },
      {
        term: 'wildcard',
        kind: 'concept',
        summary: '`*` in keywords matches characters; can be expensive on leading wildcards.',
      },
      {
        term: 'time modifier',
        kind: 'concept',
        summary: 'Restricts `_time` window (e.g. earliest=-24h@h).',
        example: 'index=main earliest=-7d',
      },
    ],
  },
  {
    id: 'fields-in-searches',
    title: 'Using Fields in Searches',
    overview:
      'Fields power filtering (`status=404`), comparisons, and charts. Use the Fields sidebar, `fieldname=value`, and commands like `eval` and `rex` to work with extracted and default fields.',
    referenceUrls: [
      { label: 'Use fields in searches', url: CU_DOCS.useFields },
    ],
    entries: [
      {
        term: 'default field',
        kind: 'concept',
        summary: 'Built-in metadata: host, source, sourcetype, index, _time.',
      },
      {
        term: 'rex',
        kind: 'command',
        summary: 'Search-time regex extraction into named fields.',
        example: '... | rex field=_raw "(?<status>\\d{3})"',
      },
      {
        term: 'eval',
        kind: 'command',
        summary: 'Creates or overwrites fields with expressions.',
        example: '... | eval kb=bytes/1024',
      },
    ],
  },
  {
    id: 'search-language-fundamentals',
    title: 'Search Language Fundamentals',
    overview:
      'SPL chains commands with `|`. Understand implicit AND, OR/NOT grouping, parentheses, and command order—retrieving commands first, then transforming, then formatting output.',
    referenceUrls: [{ label: 'Search Manual', url: CU_DOCS.searchManual }],
    entries: [
      {
        term: 'pipe',
        kind: 'concept',
        summary: 'Passes output of one command as input to the next.',
      },
      {
        term: 'Boolean operators',
        kind: 'concept',
        summary: 'AND is implicit between terms; use OR and NOT with parentheses for clarity.',
        example: 'error OR failure NOT debug',
      },
      {
        term: 'head / tail',
        kind: 'command',
        summary: 'Limits rows returned after retrieval or transformation.',
      },
    ],
  },
  {
    id: 'transforming-commands',
    title: 'Basic Transforming Commands',
    overview:
      'Transforming commands aggregate or reshape events: `stats`, `chart`, `timechart`, `top`, and `rare` reduce many events to summary rows for tables and visualizations.',
    referenceUrls: [{ label: 'Search Manual', url: CU_DOCS.searchManual }],
    entries: [
      {
        term: 'stats',
        kind: 'command',
        summary: 'Aggregates metrics grouped by fields.',
        example: '... | stats count by host',
      },
      {
        term: 'timechart',
        kind: 'command',
        summary: 'Time-bucketed stats for trend charts.',
      },
      {
        term: 'top / rare',
        kind: 'command',
        summary: 'Shows most or least common field values.',
      },
    ],
  },
  {
    id: 'reports-dashboards',
    title: 'Reports and Dashboards',
    overview:
      'Save searches as reports, schedule them, and pin results to dashboards. Reports can feed panels; dashboards combine visualizations for operational visibility.',
    referenceUrls: [
      { label: 'Dashboards intro', url: CU_DOCS.dashboards },
    ],
    entries: [
      {
        term: 'saved search / report',
        kind: 'concept',
        summary: 'Persisted SPL with optional schedule and permissions.',
      },
      {
        term: 'dashboard panel',
        kind: 'concept',
        summary: 'Visualization bound to a search (chart, table, single value).',
      },
    ],
  },
  {
    id: 'lookups',
    title: 'Creating and Using Lookups',
    overview:
      'Lookup tables enrich events with external context—CSV, KV Store, or outputs from searches. Use `lookup`, `inputlookup`, and `outputlookup` to join and maintain tables.',
    referenceUrls: [{ label: 'Lookups', url: CU_DOCS.lookups }],
    entries: [
      {
        term: 'lookup',
        kind: 'command',
        summary: 'Adds fields from a lookup table to matching events.',
      },
      {
        term: 'inputlookup',
        kind: 'command',
        summary: 'Retrieves rows from a lookup as result set.',
      },
      {
        term: 'outputlookup',
        kind: 'command',
        summary: 'Writes current results into a lookup table.',
      },
    ],
  },
  {
    id: 'scheduled-alerts',
    title: 'Scheduled Reports and Alerts',
    overview:
      'Schedule reports for recurring delivery; alerts trigger when search conditions are met (real-time or scheduled). Configure throttling, actions, and permissions per use case.',
    referenceUrls: [{ label: 'Alert Manual', url: CU_DOCS.alerts }],
    entries: [
      {
        term: 'scheduled report',
        kind: 'concept',
        summary: 'Runs saved search on cron and emails or saves results.',
      },
      {
        term: 'alert',
        kind: 'concept',
        summary: 'Fires actions when results meet trigger criteria.',
      },
      {
        term: 'throttle',
        kind: 'concept',
        summary: 'Suppresses repeated alert actions for a cooldown period.',
      },
    ],
  },
]
