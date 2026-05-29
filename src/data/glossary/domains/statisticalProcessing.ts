import type { GlossaryDomain } from '../types'

/** Aggregations — stats/timechart/chart + Common Stats Functions */
export const statisticalProcessing: GlossaryDomain = {
  id: 'statistical-processing',
  title: 'Statistical Processing',
  overview:
    'Transforming commands (`chart`, `timechart`, `top`, `rare`, `stats`, …) collapse raw events into metrics for tables and charts. Pair them with statistical & charting functions (`count`, `perc`, …). Use `eval` for derived fields before or after aggregation; `rename` and `sort` shape result columns and row order. See Splunk’s transforming-command and reporting-command overviews for pipeline placement.',
  referenceUrls: [
    {
      label: 'About reporting commands (transforming overview)',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/Search/Aboutreportingcommands',
    },
    {
      label: 'chart command',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Chart',
    },
    {
      label: 'timechart command',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Timechart',
    },
    {
      label: 'top command',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Top',
    },
    {
      label: 'rare command',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Rare',
    },
    {
      label: 'stats command',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Stats',
    },
    {
      label: 'Statistical & charting functions',
      url: 'https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.2/statistical-and-charting-functions',
    },
    {
      label: 'eval command',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Eval',
    },
    {
      label: 'Evaluation functions',
      url: 'https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.2/evaluation-functions/evaluation-functions',
    },
    {
      label: 'Use the eval command & functions (categories)',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/Search/Usetheevalcommandandfunctions',
    },
    {
      label: 'rename command',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Rename',
    },
    {
      label: 'sort command',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Sort',
    },
    {
      label: 'eventstats',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Eventstats',
    },
    {
      label: 'streamstats',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Streamstats',
    },
  ],
  entries: [
    {
      term: 'Transforming commands summary',
      kind: 'concept',
      summary:
        'Transforming commands change result shape (often many events → fewer rows). Reporting commands like `stats`, `chart`, and `timechart` are transforming; place them after retrieving raw events and use commands such as `eval`, `rename`, and `sort` to prepare or polish statistical output.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Search/Aboutreportingcommands',
    },
    {
      term: 'stats',
      kind: 'command',
      summary:
        'Core aggregation command (`stats <funcs> by <fields>`) replacing the event stream with statistical rows.',
      example: '... | stats count avg(bytes) max(_time) by host',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Stats',
    },
    {
      term: 'eventstats',
      kind: 'command',
      summary:
        'Adds aggregate columns while preserving underlying events—useful for per-event comparisons.',
      example: '... | eventstats avg(bytes) AS avg_bytes by host',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Eventstats',
    },
    {
      term: 'streamstats',
      kind: 'command',
      summary:
        'Stateful aggregates in arrival order (running totals, moving counts) without collapsing events.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Streamstats',
    },
    {
      term: 'chart',
      kind: 'command',
      summary:
        'Transforming command that builds statistical aggregates for charting: use `over` for the x-axis field and `by` for series splits. Pairs with column, bar, line, and area visualizations.',
      example: '... | chart sum(bytes) over host',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Chart',
    },
    {
      term: 'timechart',
      kind: 'command',
      summary:
        'Transforming command that buckets `_time` (`span`, `bins`) and computes aggregates—primary command for trend charts.',
      example: '... | timechart span=15m count by status',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Timechart',
    },
    {
      term: 'top',
      kind: 'command',
      summary:
        'Shows the most common values of a field (frequency counts/percentages). Supports limits, `by` clauses, and field lists.',
      example: '... | top limit=10 uri by host',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Top',
    },
    {
      term: 'rare',
      kind: 'command',
      summary:
        'Inverse of `top`: surfaces the least frequent field values—useful for spotting outliers or noise.',
      example: '... | rare user limit=5',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Rare',
    },
    {
      term: 'Statistical and charting functions',
      kind: 'concept',
      summary:
        'Function library used inside `stats`, `chart`, `timechart`, `eventstats`, etc. (`count`, `dc`, `avg`, `perc`, `stdev`, …). Arguments and defaults vary by command—always check the function reference for the command you use.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.2/statistical-and-charting-functions',
    },
    {
      term: 'count / dc',
      kind: 'function',
      summary:
        '`count()` totals rows; `dc(field)` estimates distinct values—mind memory on high cardinality.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.2/statistical-and-charting-functions',
    },
    {
      term: 'avg / sum / min / max / range',
      kind: 'function',
      summary:
        'Basic numeric summaries; `range` reports max-min within groups.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.2/statistical-and-charting-functions',
    },
    {
      term: 'median / mode',
      kind: 'function',
      summary:
        'Central tendency metrics—`median` uses order statistics; `mode` picks most frequent value.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.2/statistical-and-charting-functions',
    },
    {
      term: 'perc / pXX',
      kind: 'function',
      summary:
        'Percentiles (`perc95 latency`) summarize tails—critical for SLAs.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.2/statistical-and-charting-functions',
    },
    {
      term: 'stdev / var',
      kind: 'function',
      summary:
        'Variance and standard deviation quantify spread around the mean.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.2/statistical-and-charting-functions',
    },
    {
      term: 'values / list',
      kind: 'function',
      summary:
        'Collect multivalue arrays of field tokens—`values` dedupes; `list` preserves order/repeats.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.2/statistical-and-charting-functions',
    },
    {
      term: 'eval',
      kind: 'command',
      summary:
        'Creates or overwrites fields using expressions (math, conditionals, string ops). Often used before/after stats to normalize units, bucket values, or compute ratios on aggregated rows.',
      example: '... | stats sum(bytes) AS b by host | eval mb=round(b/1024/1024,2)',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Eval',
    },
    {
      term: 'Evaluation functions',
      kind: 'concept',
      summary:
        'Functions callable inside `eval` expressions: text (`len`, `substr`, …), date/time, cryptography, comparison, multivalue, and more. Follow argument ordering and type expectations from the reference.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.2/evaluation-functions/evaluation-functions',
    },
    {
      term: 'Conversion functions',
      kind: 'concept',
      summary:
        'Subset of `eval` functions that cast or normalize types (`tostring`, `tonumber`, case conversions, duration helpers). Listed under eval function categories alongside informational and math functions—use so numeric stats operate on real numbers, not strings.',
      example: '... | eval kb=tostring(round(bytes/1024,1))+" KB"',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Search/Usetheevalcommandandfunctions',
    },
    {
      term: 'rename',
      kind: 'command',
      summary:
        'Renames result columns (`rename old AS new`). Typical before presenting stats tables or feeding dashboards where field names must match panel expectations.',
      example: '... | stats count AS hits by host | rename hits AS requests',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Rename',
    },
    {
      term: 'sort',
      kind: 'command',
      summary:
        'Orders rows by field values (`sort - count`, `sort host, -_time`). Often final polish after `stats` or `top` so reports rank by magnitude.',
      example: '... | stats count by user | sort - count | head 20',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Sort',
    },
    {
      term: 'global=true',
      kind: 'concept',
      summary:
        '`stats` option computing partition-wide aggregates alongside grouped metrics.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Stats',
    },
    {
      term: 'by clause',
      kind: 'concept',
      summary:
        'Defines grouping dimensions (`by host status`)—cardinality impacts memory/time.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Stats',
    },
  ],
}
