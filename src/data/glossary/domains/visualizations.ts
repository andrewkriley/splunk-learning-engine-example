import type { GlossaryDomain } from '../types'

/** Charts & dashboards — Visualization Manual + chart/timechart references */
export const visualizations: GlossaryDomain = {
  id: 'visualizations',
  title: 'Visualizations',
  overview:
    'Splunk visualizations bind to tabular/transformed results: `chart`/`timechart` produce statistics suitable for line, area, column charts; `stats`+`table` drives tables and single value panels. Choose axes, splits (`by`), stacking, null handling, and formatting to communicate KPIs clearly.',
  referenceUrls: [
    {
      label: 'Visualization reference',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/Viz/Visualizationreference',
    },
    {
      label: 'Dashboards & forms',
      url: 'https://help.splunk.com/en/splunk-enterprise/create-dashboards-and-reports/simple-xml-dashboards/10.2/introduction/getting-started',
    },
    {
      label: 'chart command',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Chart',
    },
    {
      label: 'timechart command',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Timechart',
    },
  ],
  entries: [
    {
      term: 'chart',
      kind: 'command',
      summary:
        'Transforming command producing statistical aggregates suitable for charts (non-time x-axis unless using `_time`).',
      example: '... | chart sum(bytes) over host',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Chart',
    },
    {
      term: 'timechart',
      kind: 'command',
      summary:
        'Bucketizes `_time` into spans (`span=5m`, `span=1h`) and plots aggregates—default visualization is often line/area.',
      example: '... | timechart span=15m count by status',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Timechart',
    },
    {
      term: 'span vs bins',
      kind: 'concept',
      summary:
        '`timechart` accepts either `span` (fixed bucket width) or `bins` (approximate bucket count)—avoid specifying both; `span` wins.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Timechart',
    },
    {
      term: 'split-by',
      kind: 'concept',
      summary:
        '`by host` or `by status` creates separate series/columns—mind cardinality for readability.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Search/Createtimebasedcharts',
    },
    {
      term: 'xyseries / untable',
      kind: 'command',
      summary:
        'Pivot between wide metrics columns vs long format—useful when reshaping for custom viz or `geom`.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Xyseries',
    },
    {
      term: 'table visualization',
      kind: 'concept',
      summary:
        'Best for precise numeric review; pair with `stats`/`timechart` output and formatting commands.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/create-dashboards-and-reports/simple-xml-dashboards/10.2/table-visualizations/format-table-visualizations',
    },
    {
      term: 'single value / gauge',
      kind: 'concept',
      summary:
        'Highlights KPIs—often fed by `stats` returning one row or `timechart` tail.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/create-dashboards-and-reports/simple-xml-dashboards/10.2/single-value',
    },
    {
      term: 'charting.axisLabels* / legend placement',
      kind: 'concept',
      summary:
        'Chart configuration options (legend position, axis titles, stacking) live in visualization formatting UI or Simple XML.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/create-dashboards-and-reports/simple-xml-dashboards/10.2/charts/chart-overview',
    },
    {
      term: 'nullformat / useother',
      kind: 'concept',
      summary:
        '`chart`/`timechart` arguments controlling null bucketing and grouping of low-frequency series.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Chart',
    },
    {
      term: 'geom',
      kind: 'command',
      summary:
        'Maps latitude/longitude fields to choropleth maps when paired with geography lookups.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Geom',
    },
    {
      term: 'dashboard panel',
      kind: 'concept',
      summary:
        'Container referencing inline SPL or saved reports; tokens/time inputs drive inputs.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/create-dashboards-and-reports/simple-xml-dashboards/10.2/introduction/getting-started',
    },
  ],
}
