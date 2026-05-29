import type { GlossaryDomain } from '../types'

/** Performance habits — modes, filters, summaries */
export const searchOptimization: GlossaryDomain = {
  id: 'search-optimization',
  title: 'Search Optimization',
  overview:
    'Fast searches begin with selective indexes/sourcetypes, tight time bounds, and pushing filters left. Use Fast/Smart/Verbose modes intentionally. For massive datasets prefer `tstats`/`datamodel` summaries, accelerated data models, or summary indexing patterns rather than scanning raw events repeatedly.',
  referenceUrls: [
    {
      label: 'Quick optimization tips',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/Search/Quicktipsforoptimization',
    },
    {
      label: 'Write better searches',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/Search/Writebettersearches',
    },
    {
      label: 'Search modes',
      url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/use-the-search-app/search-modes',
    },
    {
      label: 'tstats command',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Tstats',
    },
    {
      label: 'Accelerate data models',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Acceleratedatamodels',
    },
  ],
  entries: [
    {
      term: 'search mode (fast/smart/verbose)',
      kind: 'concept',
      summary:
        'Controls field discovery depth vs speed—Fast minimizes discovery; Verbose exposes more fields at higher cost.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/use-the-search-app/search-modes',
    },
    {
      term: 'filter early',
      kind: 'concept',
      summary:
        'Place indexes, sourcetypes, hosts, and keywords before expensive pipes to shrink scanned events.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Search/Quicktipsforoptimization',
    },
    {
      term: 'indexed fields / bloom filters',
      kind: 'concept',
      summary:
        'Indexer-level structures prune buckets—misconfigured extractions can reduce pruning effectiveness.',
      docUrl:
        'https://help.splunk.com/en/data-management/get-data-in/get-data-into-splunk-enterprise/10.2/configure-indexed-field-extraction',
    },
    {
      term: 'subsearch limits',
      kind: 'concept',
      summary:
        'Defaults cap rows/time for `[search ...]`—override carefully or refactor joins/lookups.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Search/Aboutsubsearches',
    },
    {
      term: 'join limits',
      kind: 'concept',
      summary:
        '`join` can explode runtime—prefer lookups when tables fit memory or precompute aggregates.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Join',
    },
    {
      term: 'summary indexing / metric rollup',
      kind: 'concept',
      summary:
        'Periodic searches writing aggregates to summary indexes reduce repeated heavy scans.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Usesummaryindexing',
    },
    {
      term: 'data model acceleration',
      kind: 'concept',
      summary:
        'Generates TSIDX summaries for Pivot/`tstats`, dramatically speeding compliant datasets.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Acceleratedatamodels',
    },
    {
      term: 'tstats',
      kind: 'command',
      summary:
        'Queries tsidx summaries (including accelerated models) for aggregated metrics without raw scan.',
      example:
        '| tstats count WHERE index=web BY sourcetype',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Tstats',
    },
    {
      term: 'summariesonly',
      kind: 'concept',
      summary:
        '`tstats summariesonly=true` forces pure summary reads—fails if summaries incomplete.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Tstats',
    },
    {
      term: 'datamodel command',
      kind: 'command',
      summary:
        'Materializes data model datasets—often slower than `tstats` unless tuned with acceleration.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Datamodel',
    },
    {
      term: 'parallel reduce',
      kind: 'concept',
      summary:
        'Large distributed searches may use reduce/map phases—requires architecture awareness.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/retrieve-events/search-across-one-or-more-distributed-search-peers',
    },
    {
      term: 'job inspector',
      kind: 'concept',
      summary:
        'Inspect scan counts, remote peers, and command costs to pinpoint bottlenecks.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/manage-jobs/view-search-job-properties',
    },
  ],
}
