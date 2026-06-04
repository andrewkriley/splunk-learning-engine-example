import { PU_DOCS } from '../questions/powerUser/docs'
import type { LabGuide } from './types'

/**
 * Hands-on lab scenarios for Core Power User topics.
 * Requires a Splunk environment with search access (trial Enterprise, Cloud, or class lab).
 */
export const POWER_USER_LAB_GUIDE: LabGuide = {
  trackId: 'core-power-user',
  title: 'Core Power User lab guide',
  intro:
    'Work through these scenarios in your own Splunk instance. Each lab maps to public Power User learning objectives: transforming commands, knowledge objects, correlation, and normalization. Steps use common tutorial-style data where possible; adapt index and sourcetype names to your environment.',
  environmentSetup: [
    'Splunk Enterprise or Splunk Cloud with permission to run searches and create knowledge objects (macros, tags, field aliases, etc.).',
    'Ability to open Search & Reporting and Settings → Knowledge.',
    'Sample data in this repo: see `sample-data/README.md`. Upload `web_access.log` and `legacy_web.log` into index `splunk_learning_engine` (recommended), then use time range All time or 22–29 May 2026 UTC.',
    'A dedicated app context is optional but recommended (e.g. Search app or a personal dev app) so knowledge objects are easy to find later.',
  ],
  scenarios: [
    {
      id: 'pu-lab-01-timechart',
      trackId: 'core-power-user',
      title: 'Lab 1 — Time-series and categorical charts',
      summary:
        'Build line and column views with timechart and chart, control bucket size, and compare counts across dimensions.',
      domainIds: ['pu-transforming-viz'],
      estimatedMinutes: 25,
      difficulty: 'intro',
      objectives: [
        'Run timechart for events over time with a split-by field.',
        'Use chart when the X axis is not _time.',
        'Adjust span and interpret bucketed results.',
      ],
      prerequisites: [
        'Comfort with basic search (index/sourcetype, time range).',
      ],
      environmentNotes: [
        'After loading repo sample data, use `index=splunk_learning_engine`. Or change `index=splunk_learning_engine` in SPL to your own index name.',
      ],
      steps: [
        {
          title: 'Baseline event volume over time',
          body: 'Open Search & Reporting. Set a 24-hour window. Run a search that returns events in your chosen index, then pipe to timechart to count events per hour.',
          spl: 'index=splunk_learning_engine | timechart count',
          splBreakdown: [
            {
              segment: 'index=splunk_learning_engine',
              role: 'Retrieves all events from the lab index—the starting result set every later command works on.',
            },
            {
              segment: '| timechart count',
              role: 'Buckets events by _time (default span based on time range) and counts events per bucket. Output is a table/chart with _time on the X-axis and count on the Y-axis—not individual raw events.',
            },
          ],
          hint: 'If the chart is empty, widen the time range or pick a busier index.',
          checkpoint:
            'You see a time-series chart with _time on the X-axis and a count series.',
        },
        {
          title: 'Split a metric by a field',
          body: 'Add a split-by field common in your data (e.g. status, action, or sourcetype). Limit series if the legend is crowded.',
          spl: 'index=splunk_learning_engine | timechart count by status',
          splBreakdown: [
            {
              segment: 'index=splunk_learning_engine',
              role: 'Selects lab events as the input stream.',
            },
            {
              segment: '| timechart count by status',
              role: 'Counts events per time bucket and splits the series by status values (200, 404, 500, etc.). Each status becomes its own line or column in the chart legend.',
            },
          ],
          checkpoint:
            'Multiple series appear (or one series if the field has a single value)—legend matches field values.',
        },
        {
          title: 'Control bucket width',
          body: 'Repeat with an explicit span (e.g. 15 minutes or 1 hour) and note how granularity changes.',
          spl: 'index=splunk_learning_engine | timechart span=15m count by status',
          splBreakdown: [
            {
              segment: 'index=splunk_learning_engine',
              role: 'Base event set from the lab index.',
            },
            {
              segment: '| timechart span=15m count by status',
              role: 'Buckets events into 15-minute intervals (span=15m), counts them per bucket, and splits series by status. More buckets than a coarser span; legend still driven by status.',
            },
          ],
          checkpoint: 'Changing span visibly changes the number of time buckets.',
        },
        {
          title: 'Non-time chart',
          body: 'Use chart to compare categories without _time on the X axis—for example top values of a field by count.',
          spl: 'index=splunk_learning_engine | chart count by status',
          splBreakdown: [
            {
              segment: 'index=splunk_learning_engine',
              role: 'Pulls events to aggregate.',
            },
            {
              segment: '| chart count by status',
              role: 'Aggregates without requiring _time on an axis—here, total count grouped by status. Output is a categorical table/chart (bar/column friendly), not a time series.',
            },
          ],
          checkpoint:
            'You have a tabular/chart result where rows or columns represent field values, not time buckets.',
        },
      ],
      verification: [
        'You can explain when to use timechart vs chart.',
        'You know what span controls in timechart.',
      ],
      troubleshooting: [
        {
          problem: 'No results in timechart',
          suggestion:
            'Verify index name, time range, and that events exist in that range (run a plain search first).',
        },
      ],
      docLinks: [
        { label: 'Search Manual', url: PU_DOCS.searchManual },
      ],
    },
    {
      id: 'pu-lab-02-eval-filter',
      trackId: 'core-power-user',
      title: 'Lab 2 — Filter, evaluate, and format results',
      summary:
        'Use where and eval to narrow and enrich events, then present a clean table for reporting.',
      domainIds: ['pu-filtering-formatting'],
      estimatedMinutes: 30,
      difficulty: 'intro',
      objectives: [
        'Filter with where on numeric and string fields.',
        'Create derived fields with eval.',
        'Use table/fields to shape output for a report.',
      ],
      prerequisites: ['Completed Lab 1 or equivalent search experience.'],
      environmentNotes: [
        'Pick a numeric field in your data (e.g. bytes, duration) or use `linecount` as a stand-in.',
      ],
      steps: [
        {
          title: 'Filter events',
          body: 'Start from a broad search. Add where to keep only events matching a condition (status code, log level, or numeric threshold).',
          spl: 'index=splunk_learning_engine | where status>=400',
          splBreakdown: [
            {
              segment: 'index=splunk_learning_engine',
              role: 'Returns matching events as rows (streaming command—one row per event at this stage).',
            },
            {
              segment: '| where status>=400',
              role: 'Filters the stream: keeps only rows where status is 400 or higher (client/server errors in HTTP-style data). Rows that fail the test are dropped from the pipeline.',
            },
          ],
          hint: 'If status does not exist, use another field or `where linecount>1`.',
          checkpoint: 'Event count drops compared to the search without where.',
        },
        {
          title: 'Derive a field with eval',
          body: 'Use eval to compute a new field (category label, rounded number, or concatenation).',
          spl: 'index=splunk_learning_engine | eval size_bucket=if(bytes<1000,"small","large") | table _time, bytes, size_bucket',
          splBreakdown: [
            {
              segment: 'index=splunk_learning_engine',
              role: 'Event-level rows with all extracted fields.',
            },
            {
              segment: '| eval size_bucket=if(bytes<1000,"small","large")',
              role: 'Adds a new field size_bucket on each row: "small" when bytes under 1000, otherwise "large". Original fields are unchanged.',
            },
            {
              segment: '| table _time, bytes, size_bucket',
              role: 'Projects only the listed columns—drops other fields from the displayed result for a clean report view.',
            },
          ],
          checkpoint: 'The new field appears in results with expected values.',
        },
        {
          title: 'Conditional values',
          body: 'Use case() or if() in eval to map ranges to labels (e.g. HTTP status families).',
          spl: 'index=splunk_learning_engine | eval status_family=case(status<200,"1xx",status<300,"2xx",status<400,"3xx",status<500,"4xx",1=1,"5xx") | stats count by status_family',
          splBreakdown: [
            {
              segment: 'index=splunk_learning_engine',
              role: 'Starting events with numeric status.',
            },
            {
              segment: '| eval status_family=case(...)',
              role: 'Maps each status code into a label (1xx–5xx). case() evaluates conditions top-to-bottom and assigns the first match.',
            },
            {
              segment: '| stats count by status_family',
              role: 'Collapses events into summary rows: one row per status_family with count of events in that bucket. Individual events are no longer visible.',
            },
          ],
          checkpoint: 'stats shows buckets that match your eval logic.',
        },
        {
          title: 'Format for presentation',
          body: 'Use table or fields to show only columns needed for a report; optionally rename with eval before table.',
          spl: 'index=splunk_learning_engine | eval KB=round(bytes/1024,2) | table _time, host, status, KB',
          splBreakdown: [
            {
              segment: 'index=splunk_learning_engine',
              role: 'Raw events with bytes and host fields.',
            },
            {
              segment: '| eval KB=round(bytes/1024,2)',
              role: 'Creates KB by dividing bytes by 1024 and rounding to two decimals—a derived numeric field for reporting.',
            },
            {
              segment: '| table _time, host, status, KB',
              role: 'Shows only the four columns stakeholders need; hides _raw and other noise.',
            },
          ],
          checkpoint: 'Output is a concise table suitable for export or a report.',
        },
      ],
      verification: [
        'where runs after retrieving events (or after commands that preserve fields you filter on).',
        'eval fields persist down the pipeline until removed or renamed.',
      ],
      docLinks: [
        { label: 'Search Manual', url: PU_DOCS.searchManual },
      ],
    },
    {
      id: 'pu-lab-03-transaction',
      trackId: 'core-power-user',
      title: 'Lab 3 — Correlate events with transaction',
      summary:
        'Group related events into transactions using keys and time constraints, then compare to stats.',
      domainIds: ['pu-correlating-events'],
      estimatedMinutes: 35,
      difficulty: 'intermediate',
      objectives: [
        'Build a transaction on a session or ID field.',
        'Set maxspan or maxpause appropriately.',
        'Contrast transaction output with stats for session counts.',
      ],
      prerequisites: ['A field that repeats across related events (sessionid, JSESSIONID, trace_id, etc.).'],
      environmentNotes: [
        'If no session field exists, use `host` + `user` with a short maxspan only for practice—not production pattern.',
      ],
      steps: [
        {
          title: 'Find a correlation field',
          body: 'Run a search and identify a field that ties related events (web session, transaction ID). Use stats to see cardinality.',
          spl: 'index=splunk_learning_engine | stats dc(sessionid) AS sessions, count by sessionid | sort - count | head 10',
          splBreakdown: [
            {
              segment: 'index=splunk_learning_engine',
              role: 'All lab web events.',
            },
            {
              segment: '| stats dc(sessionid) AS sessions, count by sessionid',
              role: 'Groups by sessionid: count = events per session; dc(sessionid) = distinct sessions (one per row, so equals 1 per group—useful pattern when grouping by other fields later).',
            },
            {
              segment: '| sort - count',
              role: 'Orders rows by count descending so the busiest sessions appear first.',
            },
            {
              segment: '| head 10',
              role: 'Keeps only the top 10 rows—limits output for inspection.',
            },
          ],
          hint: 'Swap sessionid for a field present in your data.',
          checkpoint: 'You have a field with multiple events per value suitable for grouping.',
        },
        {
          title: 'Create transactions',
          body: 'Pipe to transaction with that field. Inspect eventcount and duration fields on each transaction row.',
          spl: 'index=splunk_learning_engine | transaction sessionid maxspan=30m | table _time, sessionid, eventcount, duration',
          splBreakdown: [
            {
              segment: 'index=splunk_learning_engine',
              role: 'Chronological events (transaction expects time-ordered input).',
            },
            {
              segment: '| transaction sessionid maxspan=30m',
              role: 'Merges consecutive events sharing the same sessionid into one transaction row if they fall within 30 minutes of each other. Adds fields like eventcount and duration.',
            },
            {
              segment: '| table _time, sessionid, eventcount, duration',
              role: 'Displays transaction summary columns—each row is a session group, not a single log line.',
            },
          ],
          checkpoint:
            'Each row represents a group of events; eventcount > 1 for at least some rows.',
        },
        {
          title: 'Tune time bounds',
          body: 'Adjust maxspan or maxpause and observe how transaction count changes.',
          spl: 'index=splunk_learning_engine | transaction sessionid maxspan=5m | stats count AS txn_count, avg(eventcount) AS avg_events',
          splBreakdown: [
            {
              segment: 'index=splunk_learning_engine',
              role: 'Event stream to correlate.',
            },
            {
              segment: '| transaction sessionid maxspan=5m',
              role: 'Stricter 5-minute window creates more, shorter transactions than 30m—events farther apart start a new transaction.',
            },
            {
              segment: '| stats count AS txn_count, avg(eventcount) AS avg_events',
              role: 'Summarizes all transactions into one result row: txn_count = number of transactions; avg_events = mean events per transaction.',
            },
          ],
          checkpoint:
            'You can explain why stricter bounds yield more, shorter transactions.',
        },
        {
          title: 'Compare to stats',
          body: 'Answer the same business question with stats instead of transaction (e.g. events per session). Note when you lose per-event detail.',
          spl: 'index=splunk_learning_engine | stats count AS events by sessionid | stats avg(events) AS avg_events_per_session',
          splBreakdown: [
            {
              segment: 'index=splunk_learning_engine',
              role: 'Individual events.',
            },
            {
              segment: '| stats count AS events by sessionid',
              role: 'One row per sessionid with events = number of log lines in that session—no merged transaction object.',
            },
            {
              segment: '| stats avg(events) AS avg_events_per_session',
              role: 'Second aggregation: single number across all sessions—the average session length in events. You lose drilldown to member events.',
            },
          ],
          checkpoint:
            'You can state one use case for transaction (drilldown to member events) vs stats alone.',
        },
      ],
      verification: [
        'transaction preserves member events for drilldown in the UI.',
        'maxspan limits how far apart events can be and still group.',
      ],
      docLinks: [
        { label: 'About transactions', url: PU_DOCS.transactions },
      ],
    },
    {
      id: 'pu-lab-04-fields',
      trackId: 'core-power-user',
      title: 'Lab 4 — Create and manage fields',
      summary:
        'Extract fields from _raw with rex and optionally use the Field Extractor UI for a sourcetype.',
      domainIds: ['pu-managing-fields'],
      estimatedMinutes: 35,
      difficulty: 'intermediate',
      objectives: [
        'Extract a field at search time with rex.',
        'Understand sourcetype-scoped field extractions.',
        'Validate extractions on sample events.',
      ],
      prerequisites: ['Events with structured or semi-structured _raw (logs with key=value or patterns).'],
      environmentNotes: [
        'Field Extractor requires appropriate role; on Cloud, confirm knowledge object permissions.',
      ],
      steps: [
        {
          title: 'Inspect _raw',
          body: 'Run a search that shows _raw. Pick a repeating pattern (IP, status code, key=value).',
          spl: 'index=splunk_learning_engine | head 5 | table _raw',
          splBreakdown: [
            {
              segment: 'index=splunk_learning_engine',
              role: 'All matching events (potentially thousands).',
            },
            {
              segment: '| head 5',
              role: 'Limits to the first 5 events in time order—cheap way to sample _raw for pattern spotting.',
            },
            {
              segment: '| table _raw',
              role: 'Shows only the raw log line text so you can design regex extractions.',
            },
          ],
          checkpoint: 'You identified a substring to capture as a field.',
        },
        {
          title: 'Extract with rex',
          body: 'Use rex with a named group to populate a field at search time.',
          spl: 'index=splunk_learning_engine | rex field=_raw "(?<http_status>\\d{3})" | stats count by http_status',
          splBreakdown: [
            {
              segment: 'index=splunk_learning_engine',
              role: 'Events with _raw containing status codes embedded in text.',
            },
            {
              segment: '| rex field=_raw "(?<http_status>\\d{3})"',
              role: 'Search-time extraction: named group http_status captures the first three-digit number matched in _raw (adjust regex if your format uses status=500).',
            },
            {
              segment: '| stats count by http_status',
              role: 'Aggregates by the new field—proves extraction worked and shows distribution.',
            },
          ],
          hint: 'Adjust the regex to match your log format.',
          checkpoint: 'http_status (or your field) is populated for matching events.',
        },
        {
          title: 'Field Extractor (UI)',
          body: 'Settings → Fields → Field extractions → New. Choose EXTRACT via template or regex for a sourcetype. Save and re-run a search without rex in SPL.',
          checkpoint:
            'The field appears automatically for that sourcetype in a new search (search-time extraction).',
        },
        {
          title: 'Verify scope',
          body: 'Confirm the extraction does not apply to unrelated sourcetypes (check a different sourcetype in the same index).',
          checkpoint:
            'Extraction is scoped correctly (sourcetype or source as intended).',
        },
      ],
      verification: [
        'You can describe search-time vs index-time extraction at a high level.',
        'You know where field extractions are listed in Settings.',
      ],
      docLinks: [
        { label: 'Fields and field extractions', url: PU_DOCS.fieldExtractions },
      ],
    },
    {
      id: 'pu-lab-05-aliases-calculated',
      trackId: 'core-power-user',
      title: 'Lab 5 — Field aliases and calculated fields',
      summary:
        'Normalize heterogeneous field names and add persistent eval-based fields at search time.',
      domainIds: ['pu-aliases-calculated'],
      estimatedMinutes: 30,
      difficulty: 'intermediate',
      objectives: [
        'Create a field alias mapping two source field names to one alias.',
        'Create a calculated field with eval expression.',
        'Confirm both apply in searches without inline rex/eval.',
      ],
      prerequisites: ['Two different field names for the same concept OR one field to transform globally.'],
      environmentNotes: [
        'Aliases apply to sourcetype or global scope—document which you chose.',
      ],
      steps: [
        {
          title: 'Plan normalization',
          body: 'Identify two fields (e.g. client_ip and ip_addr) or one field to expose under a friendlier name (client_ip → ip).',
          checkpoint: 'You wrote down original field name(s) and desired alias name.',
        },
        {
          title: 'Create field alias',
          body: 'Settings → Fields → Field aliases → New. Map original field to alias for a sourcetype or all contexts you control.',
          checkpoint:
            'Search `| table ip` (or your alias) returns values whether events used the original name A or B.',
        },
        {
          title: 'Create calculated field',
          body: 'Settings → Fields → Calculated fields → New. Define eval expression (e.g. uppercase, unit conversion).',
          spl: '/* Example expression in UI: upper(status) or round(bytes/1024,2) */',
          splBreakdown: [
            {
              segment: 'upper(status)',
              role: 'Example calculated-field expression: adds/transforms status to uppercase at search time for matching sourcetype—entered in Settings, not run as SPL.',
            },
            {
              segment: 'round(bytes/1024,2)',
              role: 'Alternative expression: derives a numeric KB field from bytes. Splunk applies this automatically on every search for that sourcetype after you save the calculated field.',
            },
          ],
          checkpoint: 'New field appears on events for the configured sourcetype without adding eval to every search.',
        },
        {
          title: 'Search without inline SPL',
          body: 'Run a simple reporting search using only the alias and calculated field names.',
          spl: 'index=splunk_learning_engine | stats count by ip, size_kb',
          splBreakdown: [
            {
              segment: 'index=splunk_learning_engine',
              role: 'Events where field alias (ip) and calculated field (size_kb) are injected by knowledge objects—no inline eval needed.',
            },
            {
              segment: '| stats count by ip, size_kb',
              role: 'Reports event counts broken down by normalized IP and derived size—validates aliases and calculated fields work in aggregations.',
            },
          ],
          hint: 'Rename fields to match what you configured.',
          checkpoint: 'Report works with knowledge objects applied automatically.',
        },
      ],
      verification: [
        'Aliases do not remove original fields—they add a searchable alias.',
        'Calculated fields run at search time per Splunk documentation for your version.',
      ],
      docLinks: [
        { label: 'Field aliases', url: PU_DOCS.fieldAliases },
        { label: 'Calculated fields', url: PU_DOCS.calculatedFields },
      ],
    },
    {
      id: 'pu-lab-06-tags-macros',
      trackId: 'core-power-user',
      title: 'Lab 6 — Tags, event types, and macros',
      summary:
        'Label events for faster search, define event types, and encapsulate SPL in a reusable macro.',
      domainIds: ['pu-tags-event-types', 'pu-macros'],
      estimatedMinutes: 40,
      difficulty: 'intermediate',
      objectives: [
        'Apply a tag to a field=value pair.',
        'Save an event type from a search predicate.',
        'Create and invoke a search macro with arguments.',
      ],
      prerequisites: ['Permission to create tags, event types, and macros.'],
      environmentNotes: [],
      steps: [
        {
          title: 'Create a tag',
          body: 'From a search result or Settings → Tags, tag a field=value (e.g. status=404) with a memorable tag name (e.g. error404).',
          checkpoint: 'Search `tag=error404` returns the expected subset of events.',
        },
        {
          title: 'Create an event type',
          body: 'Save a search that defines a class of events (e.g. failed login pattern) as an event type. Run `eventtype=<name>`.',
          checkpoint: 'eventtype search matches the same events as your saved predicate.',
        },
        {
          title: 'Define a macro',
          body: 'Settings → Advanced Search → Search macros → New. Example: name `summ_errors`, definition `stats count by status` (adjust to your data).',
          checkpoint: 'Macro appears in macro listing with correct definition.',
        },
        {
          title: 'Use the macro',
          body: 'Invoke with backticks in a search. If you added arguments, pass them per macro syntax for your version.',
          spl: 'index=splunk_learning_engine | `summ_errors`',
          splBreakdown: [
            {
              segment: 'index=splunk_learning_engine',
              role: 'Base events passed into the macro pipeline.',
            },
            {
              segment: '| `summ_errors`',
              role: 'Expands the saved macro definition (e.g. stats count by status) at this position—same as typing that SPL yourself, but reusable and centrally maintained.',
            },
          ],
          hint: 'Macro name must match exactly; use Settings to copy invocation syntax.',
          checkpoint: 'Search runs and returns the same shape as the macro definition piped after your base search.',
        },
        {
          title: 'Parameterized macro (optional)',
          body: 'Create a macro that accepts a field name or threshold via $field$ or documented argument slots. Test two invocations.',
          checkpoint: 'Different arguments change macro expansion as expected.',
        },
      ],
      verification: [
        'Tags are efficient filters for common field=value pairs.',
        'Event types are saved search fragments, not full pipelines with leading pipes.',
        'Macros promote consistent SPL across teams.',
      ],
      docLinks: [
        { label: 'Tags', url: PU_DOCS.tags },
        { label: 'Event types', url: PU_DOCS.eventTypes },
        { label: 'Macros', url: PU_DOCS.macros },
      ],
    },
    {
      id: 'pu-lab-07-workflow-datamodel',
      trackId: 'core-power-user',
      title: 'Lab 7 — Workflow actions and data model orientation',
      summary:
        'Add a GET workflow action from an event field and explore building a simple data model dataset.',
      domainIds: ['pu-workflow-actions', 'pu-data-models', 'pu-cim-addon'],
      estimatedMinutes: 45,
      difficulty: 'intermediate',
      objectives: [
        'Configure a GET workflow action that opens an external URL from field values.',
        'Create a minimal data model with one dataset.',
        'Describe how CIM relates to normalized security analytics.',
      ],
      prerequisites: ['Labs 4–6 helpful but not required.'],
      environmentNotes: [
        'Use a safe test URL (e.g. internal wiki or https://help.splunk.com with a static path) for workflow actions—avoid exposing secrets in URLs.',
      ],
      steps: [
        {
          title: 'GET workflow action',
          body: 'Settings → Knowledge → Workflow actions → New. Type GET. Build URL from fields (e.g. `https://help.splunk.com/Documentation/$host$`). Associate with sourcetype or app.',
          checkpoint:
            'From Event details, the workflow link appears and opens a URL with substituted field values.',
        },
        {
          title: 'Create a data model',
          body: 'Settings → Data models → New data model. Add a child dataset (event-based or transaction-based) rooted in a search that matches your practice data.',
          checkpoint: 'Model validates and shows event counts in the model editor preview.',
        },
        {
          title: 'Pivot preview (optional)',
          body: 'Open Pivot from the model dataset and build a simple cell—note how it maps to SPL under the hood.',
          checkpoint: 'You see how datasets constrain Pivot without writing SPL manually.',
        },
        {
          title: 'CIM orientation',
          body: 'Browse the Common Information Model add-on documentation (or installed CIM app). Identify one datamodel (e.g. Authentication) and one tagged field CIM expects.',
          checkpoint:
            'You can explain in one sentence why CIM helps correlate data from different sources.',
        },
      ],
      verification: [
        'Workflow actions can be search-linked or URL-based; you built a URL action.',
        'Data models structure knowledge for Pivot and accelerated reporting.',
        'CIM provides normalized field and model names for security use cases.',
      ],
      docLinks: [
        { label: 'Workflow actions', url: PU_DOCS.workflowActions },
        { label: 'Data models', url: PU_DOCS.dataModels },
        { label: 'CIM manual', url: PU_DOCS.cimManual },
      ],
    },
  ],
}
