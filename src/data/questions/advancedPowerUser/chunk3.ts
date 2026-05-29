import type { Question } from '../../../types'
import { APU_DOCS } from './docs'

/** Domains 16–22 of Advanced Power User blueprint (36 questions). */
export const advancedPowerUserChunk3: Question[] = [
  // --- 16.0 Using Subsearches (6) ---
  {
    id: 'apu-ss-001',
    domainId: 'apu-subsearches',
    stem: 'What does the append command do when used with a subsearch?',
    choices: [
      'Replaces the main search results with the subsearch output',
      'Runs the subsearch first and adds its result rows to the current result set',
      'Joins two indexes on a shared key field',
      'Writes subsearch results to a summary index',
    ],
    correctIndex: 1,
    explanation:
      'append executes a subsearch and concatenates its events onto the existing pipeline results, preserving both sets unless further filtered.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },
  {
    id: 'apu-ss-002',
    domainId: 'apu-subsearches',
    stem: 'Which syntax correctly appends a subsearch that returns host values to the current results?',
    choices: [
      '| append [ search index=security | stats count by host ]',
      '| join host [ search index=security ]',
      '| appendcols host=[ search index=security ]',
      '| subsearch index=security | stats count by host',
    ],
    correctIndex: 0,
    explanation:
      'append wraps a full subsearch in square brackets; the subsearch runs independently and its rows are appended to the outer result set.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },
  {
    id: 'apu-ss-003',
    domainId: 'apu-subsearches',
    stem: 'A common caveat of subsearches in Splunk is that they:',
    choices: [
      'Cannot run on remote indexers',
      'Are limited by default to returning at most 10,000 results and a finite runtime',
      'Always execute faster than the main search',
      'Require admin role to define',
    ],
    correctIndex: 1,
    explanation:
      'Subsearches inherit limits (maxout, maxtime, ttl) that can truncate large result sets or cause incomplete filters when the subsearch returns too many rows.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },
  {
    id: 'apu-ss-004',
    domainId: 'apu-subsearches',
    stem: 'When is a subsearch a good choice for filtering the main search?',
    choices: [
      'When the filter set is small and derived from a separate qualifying search',
      'When you need to correlate millions of rows from two large indexes',
      'When the subsearch must return more than 50,000 values',
      'When you want to avoid any search-time field extraction',
    ],
    correctIndex: 0,
    explanation:
      'Subsearches work well when the inner search returns a modest set of values (for example top offenders) used to constrain the outer search via IN or similar patterns.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },
  {
    id: 'apu-ss-005',
    domainId: 'apu-subsearches',
    stem: 'When should you avoid a subsearch in favor of a lookup or join?',
    choices: [
      'When the inner result set is tiny',
      'When the inner search returns a large or unbounded set of values repeatedly',
      'When both searches use the same index',
      'When you only need a single field from the inner search',
    ],
    correctIndex: 1,
    explanation:
      'Large subsearch outputs hit maxout limits, increase search cost, and often perform worse than a lookup table or explicit join for high-cardinality correlation.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },
  {
    id: 'apu-ss-006',
    domainId: 'apu-subsearches',
    stem: 'In the search `index=web status=404 [ search index=web | top limit=20 clientip | table clientip ]`, what happens if the subsearch exceeds its result limit?',
    choices: [
      'Splunk automatically switches to a join',
      'The filter may be incomplete, potentially missing client IPs that should match',
      'The main search is cancelled with an error',
      'Splunk retries the subsearch with a longer time range',
    ],
    correctIndex: 1,
    explanation:
      'When a subsearch is truncated by limits, the outer search only filters on the subset returned—an important caveat when designing subsearch-driven filters.',
    docLinks: [{ label: 'Search Manual', url: APU_DOCS.searchManual }],
  },
  // --- 17.0 Creating a Prototype (3) ---
  {
    id: 'apu-px-001',
    domainId: 'apu-prototype-xml',
    stem: 'In Simple XML, which root element defines a dashboard that includes user-selectable form inputs?',
    choices: [
      '<form>',
      '<dashboard>',
      '<view>',
      '<report>',
    ],
    correctIndex: 0,
    explanation:
      'A form dashboard uses the `<form>` root element; a read-only dashboard without inputs uses `<dashboard>`.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  {
    id: 'apu-px-002',
    domainId: 'apu-prototype-xml',
    stem: 'Which Simple XML structure correctly nests a single chart panel inside a row?',
    choices: [
      '<row><panel><chart>...</chart></panel></row>',
      '<panel><row><chart>...</chart></row></panel>',
      '<chart><row><panel>...</panel></row></chart>',
      '<dashboard><chart><row>...</row></chart></dashboard>',
    ],
    correctIndex: 0,
    explanation:
      'Classic Simple XML layout is dashboard or form → row → panel → visualization element (chart, table, single, etc.).',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  {
    id: 'apu-px-003',
    domainId: 'apu-prototype-xml',
    stem: 'Where is the SPL for a Simple XML chart panel typically defined?',
    choices: [
      'Inside a `<search>` element within the panel, often with `<query>` and optional `<earliest>` / `<latest>`',
      'Only in savedsearches.conf; panels cannot embed inline SPL',
      'In inputs.conf under a dashboard stanza',
      'In the `<row>` element title attribute',
    ],
    correctIndex: 0,
    explanation:
      'Each panel contains a `<search>` block with the query and time bounds; panels may also reference a saved report by name.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  // --- 18.0 Using Forms (4) ---
  {
    id: 'apu-df-001',
    domainId: 'apu-dashboard-forms',
    stem: 'In a form dashboard, how does a text input value reach a panel search?',
    choices: [
      'The input sets a token that is substituted into the search where `$token$` appears',
      'The input rewrites indexes.conf at runtime',
      'The input replaces the `<query>` element entirely in the XML file on disk',
      'The input only affects export filenames',
    ],
    correctIndex: 0,
    explanation:
      'Form inputs declare `<token>` stanzas; when the user submits or changes the input, Splunk replaces `$token$` placeholders in dependent searches.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  {
    id: 'apu-df-002',
    domainId: 'apu-dashboard-forms',
    stem: 'What is the purpose of a `<change>` or `<select>` event on a form input?',
    choices: [
      'To restart splunkd when the value changes',
      'To set or unset tokens when the user picks a new value, enabling cascading inputs',
      'To delete the dashboard XML file',
      'To disable drilldown on all panels',
    ],
    correctIndex: 1,
    explanation:
      'Input change handlers update token values (and can unset dependent tokens) so downstream dropdowns and searches react to upstream selections.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  {
    id: 'apu-df-003',
    domainId: 'apu-dashboard-forms',
    stem: 'A cascading dropdown for `region` depends on `$country$`. What must the child input search include?',
    choices: [
      'A static list of all regions hard-coded in XML',
      'A dynamic search that filters on `$country$` so options reflect the parent selection',
      'An index-time EXTRACT for region',
      'A macro with no arguments',
    ],
    correctIndex: 1,
    explanation:
      'Cascading inputs pass parent token values into the child input\'s populating search, narrowing choices based on the current parent value.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  {
    id: 'apu-df-004',
    domainId: 'apu-dashboard-forms',
    stem: 'Which pattern applies a form input as an optional search filter only when the user provides a value?',
    choices: [
      'Always hard-code the value in every panel',
      'Use a token with a `<condition>` or default empty prefix/suffix so blank input adds no constraint',
      'Remove the `<search>` element when the input is empty',
      'Set `required="true"` on every chart panel',
    ],
    correctIndex: 1,
    explanation:
      'Conditional token prefixes/suffixes (or `<condition>` blocks) let searches include `host=$host$` only when the token is non-empty, avoiding invalid SPL.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  // --- 19.0 Improving Performance (5) ---
  {
    id: 'apu-dp-001',
    domainId: 'apu-dashboard-performance',
    stem: 'Why use a base search with post-process searches on a dashboard?',
    choices: [
      'To run the heaviest search once and let panels reuse the same job with lighter downstream SPL',
      'To bypass role-based search limits',
      'To store results permanently in the index',
      'To disable real-time searches entirely',
    ],
    correctIndex: 0,
    explanation:
      'A shared base search executes one expensive retrieval; post-process panels pipe additional commands onto that job, reducing duplicate scan work.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  {
    id: 'apu-dp-002',
    domainId: 'apu-dashboard-performance',
    stem: 'In Simple XML, how does a panel indicate it post-processes a base search?',
    choices: [
      'The panel `<search>` uses `<query>` starting with `| ` and references `<done>` or `<parent>` base search id',
      'The panel sets `postprocess="true"` on the `<dashboard>` root only',
      'Post-process is configured in outputs.conf',
      'Panels cannot post-process; only reports can',
    ],
    correctIndex: 0,
    explanation:
      'Post-process panels reference a base search (by id) and supply a leading-pipe query that transforms the base job results without re-running the initial retrieval.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  {
    id: 'apu-dp-003',
    domainId: 'apu-dashboard-performance',
    stem: 'When is `tstats` preferred over a raw `index=` search on a dashboard?',
    choices: [
      'When you need every _raw event for a small time window',
      'When aggregating pre-indexed numeric or metadata fields from tsidx without scanning _raw',
      'When creating transaction commands',
      'When exporting to PDF only',
    ],
    correctIndex: 1,
    explanation:
      'tstats reads tsidx bucket metadata for supported fields, enabling fast aggregations on large datasets compared to full _raw scans.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  {
    id: 'apu-dp-004',
    domainId: 'apu-dashboard-performance',
    stem: 'Which dashboard design choice most often causes unnecessary search load?',
    choices: [
      'Sharing one base search across related panels',
      'Running the same heavy `index=` search independently in every panel',
      'Using shorter default time ranges on form inputs',
      'Using tstats against accelerated data models',
    ],
    correctIndex: 1,
    explanation:
      'Duplicate full searches per panel multiply indexer work; consolidating retrieval into a base search or accelerated dataset is a primary performance tactic.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  {
    id: 'apu-dp-005',
    domainId: 'apu-dashboard-performance',
    stem: 'How can panel-level `<refresh>` and `<refreshType>` settings affect performance?',
    choices: [
      'They have no effect on search scheduling',
      'Automatic refresh re-runs panel searches on an interval, which can add sustained load if set too aggressively',
      'They force searches to run only on the deployer',
      'They disable post-process searches',
    ],
    correctIndex: 1,
    explanation:
      'Shorter refresh intervals cause repeated search execution; balance freshness against cluster capacity, especially for heavy panels.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  // --- 20.0 Customizing Dashboards (5) ---
  {
    id: 'apu-cd-001',
    domainId: 'apu-customizing-dashboards',
    stem: 'What does the `<refresh>` element on a panel control?',
    choices: [
      'How often the panel search automatically re-runs while the dashboard is open',
      'The Splunk Web session timeout',
      'Index retention for dashboard data',
      'Whether drilldown is enabled',
    ],
    correctIndex: 0,
    explanation:
      'Panel refresh sets an interval (for example 30s or 5m) for automatic search replay; `<refreshType>` can distinguish delayed vs periodic behavior.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  {
    id: 'apu-cd-002',
    domainId: 'apu-customizing-dashboards',
    stem: 'Chart properties such as axis labels, legend placement, and drilldown behavior in Simple XML are commonly set in:',
    choices: [
      'The `<option name="charting.*">` settings inside the chart panel',
      'server.conf only',
      'The `<form>` title attribute',
      'inputs.conf',
    ],
    correctIndex: 0,
    explanation:
      'Simple XML charts expose visualization options via `<option>` elements (charting.chart.stackMode, charting.axisTitleX.text, drilldown, etc.).',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  {
    id: 'apu-cd-003',
    domainId: 'apu-customizing-dashboards',
    stem: 'How are annotations typically added to a time-series chart in Simple XML?',
    choices: [
      'With `<chart>` `<annotation>` or overlay searches that supply label/time fields',
      'By editing _raw events in the index',
      'Through a `transaction` command in props.conf',
      'Annotations are not supported in Simple XML',
    ],
    correctIndex: 0,
    explanation:
      'Annotation overlays bind a search whose results include time and label fields, marking events or ranges on the chart timeline.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  {
    id: 'apu-cd-004',
    domainId: 'apu-customizing-dashboards',
    stem: 'Setting `<option name="charting.drilldown">none</option>` on a chart panel:',
    choices: [
      'Disables click-through behavior on that visualization',
      'Deletes underlying events from the index',
      'Forces a base search rebuild',
      'Enables export to CSV only',
    ],
    correctIndex: 0,
    explanation:
      'The drilldown option controls whether clicks pass values to tokens or searches; `none` turns off interactive drilldown for that panel.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  {
    id: 'apu-cd-005',
    domainId: 'apu-customizing-dashboards',
    stem: 'Which customization helps reduce visual clutter on a multi-series line chart?',
    choices: [
      'Setting charting.legend.placement and limiting series via search or `<fields>`',
      'Removing the `<search>` element',
      'Disabling the time picker globally in web.conf',
      'Using `<dashboard>` instead of `<form>`',
    ],
    correctIndex: 0,
    explanation:
      'Legend placement, field selection, and charting.chart.nullValueMode options tune readability without changing underlying data retrieval.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  // --- 21.0 Adding Drilldowns (7) ---
  {
    id: 'apu-dd-001',
    domainId: 'apu-drilldowns',
    stem: 'What is the primary purpose of a drilldown on a dashboard panel?',
    choices: [
      'To pass clicked field values into tokens or a detail search for deeper analysis',
      'To accelerate the panel search automatically',
      'To change index-time field extractions',
      'To schedule the panel search',
    ],
    correctIndex: 0,
    explanation:
      'Drilldown captures interaction context (for example clicked `host` or `_time`) and sets tokens or runs linked searches/panels with that context.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  {
    id: 'apu-dd-002',
    domainId: 'apu-drilldowns',
    stem: 'In a dynamic drilldown, clicked values are typically passed using:',
    choices: [
      'Static strings hard-coded in the XML with no token substitution',
      'Token names mapped from `$click.name$` and `$click.value$` (or field-specific `$row.field$`)',
      'A macro defined in indexes.conf',
      'The `outputlookup` command only',
    ],
    correctIndex: 1,
    explanation:
      'Dynamic drilldown sets tokens from the clicked element; `$click.name$` and `$click.value$` (and row context variables) populate downstream searches.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  {
    id: 'apu-dd-003',
    domainId: 'apu-drilldowns',
    stem: 'A drilldown `<link>` element that opens another dashboard should pass context by:',
    choices: [
      'Embedding passwords in the URL',
      'Appending token query parameters such as `?form.host=$row.host$` in the target URI',
      'Writing to summary index first',
      'Disabling tokens on the target dashboard',
    ],
    correctIndex: 1,
    explanation:
      'Cross-dashboard drilldown links encode token values in the URL so the destination form pre-fills filters from the click context.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  {
    id: 'apu-dd-004',
    domainId: 'apu-drilldowns',
    stem: 'What does `<drilldown target="blank">` affect?',
    choices: [
      'It opens the drilldown destination in a new browser tab or window',
      'It clears all dashboard tokens',
      'It runs the search in the background without displaying results',
      'It disables the time picker',
    ],
    correctIndex: 0,
    explanation:
      'The target attribute on drilldown links controls whether navigation replaces the current view or opens a new tab (`blank`).',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  {
    id: 'apu-dd-005',
    domainId: 'apu-drilldowns',
    stem: 'When configuring drilldown on a table panel, `$row.fieldname$` represents:',
    choices: [
      'The value in the clicked row for the given column field',
      'The total row count of the dataset',
      'The scheduled cron expression',
      'The name of the index only',
    ],
    correctIndex: 0,
    explanation:
      'Table drilldown tokens expose cell values from the selected row, enabling detail searches filtered on that row\'s fields.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  {
    id: 'apu-dd-006',
    domainId: 'apu-drilldowns',
    stem: 'An "all tokens" drilldown pattern is used when:',
    choices: [
      'You want to pass every field from the clicked context into downstream tokens at once',
      'You disable all form inputs',
      'You run tstats without group-by',
      'You export only PDF',
    ],
    correctIndex: 0,
    explanation:
      'All-tokens drilldown maps multiple clicked fields to corresponding tokens so a detail panel can inherit the full interaction context without naming each field manually.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  {
    id: 'apu-dd-007',
    domainId: 'apu-drilldowns',
    stem: 'If a drilldown sets `$host$` but the detail panel search never references `$host$`, what is the likely outcome?',
    choices: [
      'The detail panel shows unfiltered results unrelated to the click',
      'Splunk automatically adds `host=` to every search',
      'The dashboard fails to load',
      'The token is written to indexes.conf',
    ],
    correctIndex: 0,
    explanation:
      'Tokens only affect searches that reference them; drilldown must set tokens that downstream panel queries actually consume in their SPL or conditions.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  // --- 22.0 Adding Advanced Behaviors and Visualizations (6) ---
  {
    id: 'apu-ad-001',
    domainId: 'apu-advanced-dashboards',
    stem: 'In Simple XML, an `<event>` handler with `<condition>` on a chart might be used to:',
    choices: [
      'React to user clicks by running `<set token>`, `<link>`, or `<unset token>` actions',
      'Configure forwarder inputs',
      'Set index-time transforms',
      'Compile JavaScript into indexes.conf',
    ],
    correctIndex: 0,
    explanation:
      'Event handlers declaratively respond to interactions (click, change) by manipulating tokens or navigating, enabling contextual dashboard behavior.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  {
    id: 'apu-ad-002',
    domainId: 'apu-advanced-dashboards',
    stem: 'What does a `<set token>` action inside a drilldown `<event>` do?',
    choices: [
      'Assigns a token name to a value derived from the click context for use by other searches',
      'Creates a new Splunk user account',
      'Writes a saved search to disk immediately',
      'Changes the default app namespace permanently',
    ],
    correctIndex: 0,
    explanation:
      'set token stores a name/value pair in dashboard token space so dependent panels or inputs pick up the clicked context on refresh.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  {
    id: 'apu-ad-003',
    domainId: 'apu-advanced-dashboards',
    stem: 'Contextual drilldown differs from a generic drilldown because it:',
    choices: [
      'Uses interaction metadata to set multiple relevant tokens before opening a detail view',
      'Never uses tokens',
      'Only works on real-time searches',
      'Requires Dashboard Studio exclusively',
    ],
    correctIndex: 0,
    explanation:
      'Contextual drilldown captures the specific slice the user clicked (time, series, row fields) and propagates that context to targeted detail content.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  {
    id: 'apu-ad-004',
    domainId: 'apu-advanced-dashboards',
    stem: 'Simple XML dashboard extensions (for example via custom JavaScript modules) are typically used to:',
    choices: [
      'Add visualization behaviors or custom views beyond built-in Simple XML options',
      'Replace Splunk\'s license server',
      'Modify index bucket paths on indexers',
      'Disable authentication',
    ],
    correctIndex: 0,
    explanation:
      'Extensions let developers register custom views or behaviors while still hosting dashboards in Splunk Web, bridging Simple XML and custom visualization logic.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  {
    id: 'apu-ad-005',
    domainId: 'apu-advanced-dashboards',
    stem: 'An `<event>` with `<refresh>` in a panel can:',
    choices: [
      'Trigger specified panels or the whole dashboard to reload after a token change',
      'Restart splunkd on search heads',
      'Delete events from the index',
      'Convert a form dashboard into a report',
    ],
    correctIndex: 0,
    explanation:
      'Refresh actions re-run dependent searches when tokens change, keeping detail panels synchronized with user selections without a full page reload.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
  {
    id: 'apu-ad-006',
    domainId: 'apu-advanced-dashboards',
    stem: 'When combining event handlers with hidden tokens, a common pattern is to:',
    choices: [
      'Set hidden tokens on chart click and reveal a detail row whose searches reference those tokens',
      'Store tokens only in localStorage outside Splunk',
      'Hard-code all values in the XML and never unset tokens',
      'Remove all `<search>` elements from the dashboard',
    ],
    correctIndex: 0,
    explanation:
      'Hidden tokens carry drilldown context invisibly; paired panels or rows listen for those tokens and display detail when values are set by event handlers.',
    docLinks: [{ label: 'Dashboards', url: APU_DOCS.dashboards }],
  },
]
