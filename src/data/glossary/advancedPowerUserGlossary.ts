import type { GlossaryDomain } from './types'
import { APU_DOCS } from '../questions/advancedPowerUser/docs'

/** Core Advanced Power User — topic glossary (22 domains) */
export const ADVANCED_POWER_USER_GLOSSARY_DOMAINS: GlossaryDomain[] = [
  {
    id: 'apu-statistical-commands',
    title: 'Statistical Commands',
    overview:
      'Beyond basic stats: `eventstats` adds aggregations as fields on each event, `streamstats` computes running/window statistics in arrival order, and `appendpipe` runs a sub-pipeline on current results.',
    referenceUrls: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
    entries: [
      { term: 'eventstats', kind: 'command', summary: 'Per-event aggregates without collapsing rows.' },
      { term: 'streamstats', kind: 'command', summary: 'Ordered window/running statistics on the result set.' },
    ],
  },
  {
    id: 'apu-eval-functions',
    title: 'eval Functions',
    overview:
      'Advanced `eval` covers string, conversion, conditional, and statistical functions plus `makeresults` for synthetic rows in demos or joins.',
    referenceUrls: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
    entries: [
      { term: 'if()', kind: 'function', summary: 'Conditional expressions inside eval.' },
      { term: 'makeresults', kind: 'command', summary: 'Generates dummy events for testing SPL.' },
    ],
  },
  {
    id: 'apu-lookups',
    title: 'Advanced Lookups',
    overview:
      'Lookups can filter events, enrich from KV Store, call external commands, and map geospatial data—always scope outputs and handle null keys deliberately.',
    referenceUrls: [{ label: 'Lookups', url: APU_DOCS.lookups }],
    entries: [
      { term: 'KV Store lookup', kind: 'concept', summary: 'Backed by Splunk KV Store collections.' },
      { term: 'geospatial lookup', kind: 'concept', summary: 'Adds lat/long or region fields from external tables.' },
    ],
  },
  {
    id: 'apu-alerts',
    title: 'Advanced Alerts',
    overview:
      'Alerts can log searchable alert events, write results to lookups, invoke webhooks, or create log events—pair throttling with meaningful trigger conditions.',
    referenceUrls: [{ label: 'Alert Manual', url: APU_DOCS.alerts }],
    entries: [
      { term: 'webhook alert', kind: 'concept', summary: 'HTTP POST to external systems on trigger.' },
      { term: 'alert to lookup', kind: 'concept', summary: 'Persists alert output rows into a lookup table.' },
    ],
  },
  {
    id: 'apu-advanced-fields',
    title: 'Advanced Fields',
    overview:
      'Use `rex`/`erex` at search time for ad hoc extractions; tune regex for performance (anchors, non-greedy groups). Field Extractor still owns persistent extractions.',
    referenceUrls: [{ label: 'Field extractions', url: APU_DOCS.fieldExtractions }],
    entries: [
      { term: 'rex', kind: 'command', summary: 'Search-time regex extraction into fields.' },
      { term: 'erex', kind: 'command', summary: 'Auto-generates regex from examples.' },
    ],
  },
  {
    id: 'apu-self-describing-data',
    title: 'Self-Describing Data',
    overview:
      'JSON/XML and multiline key-value logs benefit from `spath`, `multikv`, and eval+spath for nested paths without fragile manual regex.',
    referenceUrls: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
    entries: [
      { term: 'spath', kind: 'command', summary: 'Extracts values from structured paths in _raw.' },
      { term: 'multikv', kind: 'command', summary: 'Parses multiline key-value formatted events.' },
    ],
  },
  {
    id: 'apu-advanced-macros',
    title: 'Advanced Macros',
    overview:
      'Macros can nest and reference other knowledge objects; preview expansion before scheduling to catch argument mistakes.',
    referenceUrls: [{ label: 'Macros', url: APU_DOCS.macros }],
    entries: [
      { term: 'nested macro', kind: 'concept', summary: 'Macro SPL invoking another macro.' },
    ],
  },
  {
    id: 'apu-report-acceleration',
    title: 'Report Acceleration',
    overview:
      'Accelerated reports pre-compute summaries for faster dashboard loads; summary indexing uses transforming commands (`summary`, `collect`) into dedicated indexes.',
    referenceUrls: [{ label: 'Reports', url: APU_DOCS.reports }],
    entries: [
      { term: 'report acceleration', kind: 'concept', summary: 'Background summaries for qualifying saved reports.' },
      { term: 'summary indexing', kind: 'concept', summary: 'Scheduled searches writing aggregated events to summary indexes.' },
    ],
  },
  {
    id: 'apu-datamodel-acceleration',
    title: 'Data Model Acceleration',
    overview:
      '`tstats` queries tsidx summaries of accelerated data models for high-performance metrics; choose acceleration when Pivot/tstats patterns dominate.',
    referenceUrls: [{ label: 'Data models', url: APU_DOCS.dataModels }],
    entries: [
      { term: 'tstats', kind: 'command', summary: 'Stats on accelerated tsidx without raw events.' },
      { term: 'datamodel', kind: 'command', summary: 'Search against a data model dataset in SPL.' },
    ],
  },
  {
    id: 'apu-search-efficiently',
    title: 'Search Efficiency',
    overview:
      'Understand indexer/search head flow, streaming vs transforming commands, and Job Inspector timing to remove expensive mid-pipeline filters.',
    referenceUrls: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
    entries: [
      { term: 'streaming command', kind: 'concept', summary: 'Processes events per pipe without reshaping row count drastically (e.g. search, eval).' },
      { term: 'Job Inspector', kind: 'concept', summary: 'UI breakdown of search phases and performance.' },
    ],
  },
  {
    id: 'apu-search-tuning',
    title: 'Search Tuning',
    overview:
      'Pre-filter early, use `TERM()` for indexed rare terms, and understand how lispy boolean/wildcard queries map to index-time keywords.',
    referenceUrls: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
    entries: [
      { term: 'TERM()', kind: 'concept', summary: 'Forces indexed term matching for performance.' },
    ],
  },
  {
    id: 'apu-manipulating-filtering',
    title: 'Manipulating Data',
    overview:
      '`bin` discretizes numeric/time fields; `xyseries`/`untable` reshape chart tables; `foreach` applies subsearches per row.',
    referenceUrls: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
    entries: [
      { term: 'bin', kind: 'command', summary: 'Buckets continuous values for grouping.' },
      { term: 'xyseries', kind: 'command', summary: 'Converts stats output into chart-friendly series.' },
    ],
  },
  {
    id: 'apu-multivalued-fields',
    title: 'Multivalued Fields',
    overview:
      'Multivalue fields hold multiple values per event; `makemv`/`mvexpand` and mv* eval functions split or combine values for analysis.',
    referenceUrls: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
    entries: [
      { term: 'makemv', kind: 'command', summary: 'Creates multivalue field from delimiter-separated string.' },
      { term: 'mvexpand', kind: 'command', summary: 'Expands multivalue into separate events.' },
    ],
  },
  {
    id: 'apu-advanced-transactions',
    title: 'Advanced Transactions',
    overview:
      'Transactions group related events with time/field constraints; optimize with `startswith`/`endswith`, avoid overly broad fields, and compare with `stats` when summaries suffice.',
    referenceUrls: [{ label: 'Transactions', url: APU_DOCS.transactions }],
    entries: [
      { term: 'transaction', kind: 'command', summary: 'Correlates events into multi-event transactions.' },
    ],
  },
  {
    id: 'apu-working-with-time',
    title: 'Working with Time',
    overview:
      'Effective time ranges, `_time` vs `_indextime`, and modifiers (`earliest`, `latest`) control what Splunk scans and how charts bucket.',
    referenceUrls: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
    entries: [
      { term: '_indextime', kind: 'concept', summary: 'Time event was indexed—distinct from event timestamp.' },
    ],
  },
  {
    id: 'apu-subsearches',
    title: 'Subsearches',
    overview:
      'Subsearches filter or enrich main searches but can be expensive; use `append`, joins, or lookups when subsearch limits bite.',
    referenceUrls: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
    entries: [
      { term: 'subsearch', kind: 'concept', summary: 'Nested search in [] feeding outer search.' },
      { term: 'append', kind: 'command', summary: 'Appends subsearch result sets to current results.' },
    ],
  },
  {
    id: 'apu-prototype-xml',
    title: 'Simple XML Prototype',
    overview:
      'Dashboards are Simple XML views: `<dashboard>`, `<row>`, `<panel>`, and `<chart>` elements bind searches to visualizations.',
    referenceUrls: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
    entries: [
      { term: 'simple XML', kind: 'concept', summary: 'XML definition format for classic dashboards.' },
    ],
  },
  {
    id: 'apu-dashboard-forms',
    title: 'Dashboard Forms',
    overview:
      'Form inputs drive `$token$` substitution in searches; cascading inputs narrow dependent dropdowns via dynamic tokens.',
    referenceUrls: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
    entries: [
      { term: 'token', kind: 'concept', summary: 'Placeholder expanded from user input in panel searches.' },
    ],
  },
  {
    id: 'apu-dashboard-performance',
    title: 'Dashboard Performance',
    overview:
      'Base searches with post-process panels, `tstats`, and reduced time ranges cut load; avoid identical heavy searches per panel.',
    referenceUrls: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
    entries: [
      { term: 'post-process search', kind: 'concept', summary: 'Panel reuses base search job with additional SPL.' },
    ],
  },
  {
    id: 'apu-customizing-dashboards',
    title: 'Customizing Dashboards',
    overview:
      'Tune chart options, panel refresh intervals, delays, and annotations; disable export features when hardening dashboards.',
    referenceUrls: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
    entries: [
      { term: 'panel refresh', kind: 'concept', summary: 'Automatic re-run interval for panel searches.' },
    ],
  },
  {
    id: 'apu-drilldowns',
    title: 'Drilldowns',
    overview:
      'Drilldowns pass clicked field values into tokens for detail searches—static, dynamic, and all-tokens patterns cover most UX flows.',
    referenceUrls: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
    entries: [
      { term: 'drilldown', kind: 'concept', summary: 'Click action setting token values for linked panels.' },
    ],
  },
  {
    id: 'apu-advanced-dashboards',
    title: 'Advanced Dashboard Behaviors',
    overview:
      'Event handlers (link, setToken, refresh) react to user clicks; extensions add custom visualization behaviors beyond defaults.',
    referenceUrls: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
    entries: [
      { term: 'event handler', kind: 'concept', summary: 'JavaScript/XML hook responding to chart interactions.' },
    ],
  },
]
