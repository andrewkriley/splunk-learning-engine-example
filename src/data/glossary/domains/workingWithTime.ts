import type { GlossaryDomain } from '../types'

/** Time ranges & modifiers — Search Manual time chapters */
export const workingWithTime: GlossaryDomain = {
  id: 'working-with-time',
  title: 'Working with Time',
  overview:
    'Every search is constrained by `_time` via UI picker or SPL modifiers (`earliest`, `latest`). Relative expressions (`-24h`, `@d`) snap to boundaries; absolute ISO timestamps pin forensic windows. Narrowing time is the highest-impact optimization for raw searches.',
  referenceUrls: [
    {
      label: 'Specify time ranges',
      url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/specify-time-ranges/about-searching-with-time',
    },
    {
      label: 'Time modifiers',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/Search/Specifytimemodifiersinyoursearch',
    },
    {
      label: 'Relative time',
      url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/specify-time-ranges/specify-time-modifiers-in-your-search',
    },
    {
      label: '_time field',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/Data/HowSplunkextractstimestamps',
    },
  ],
  entries: [
    {
      term: '_time',
      kind: 'concept',
      summary:
        'Internal epoch field representing event time; drives timeline, bucketing, and chronological sorting.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Usedefaultfields',
    },
    {
      term: 'earliest / latest',
      kind: 'concept',
      summary:
        'Search-level modifiers accepting ISO times or relative expressions to bound retrieval.',
      example: 'index=web earliest=-7d@d latest=@d',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Search/Specifytimemodifiersinyoursearch',
    },
    {
      term: 'relative time snap (@)',
      kind: 'concept',
      summary:
        'Snaps boundaries to unit edges (`@h`, `@d`, `@w`)—for example `earliest=@w1` for week start.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/specify-time-ranges/specify-time-modifiers-in-your-search',
    },
    {
      term: 'subseconds',
      kind: 'concept',
      summary:
        'Modifiers can include fractional seconds for precision timing in investigations.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Search/Specifytimemodifiersinyoursearch',
    },
    {
      term: 'time-range picker',
      kind: 'concept',
      summary:
        'UI control translating presets (`Last 24 hours`) into earliest/latest behind the scenes.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/specify-time-ranges/select-time-ranges-to-apply-to-your-search',
    },
    {
      term: 'real-time search',
      kind: 'concept',
      summary:
        'Continuous window (`rt-5m`, `rt`), higher resource cost—use sparingly with tight filters.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/search-and-report-in-real-time/about-real-time-searches-and-reports',
    },
    {
      term: '_indextime',
      kind: 'concept',
      summary:
        'When Splunk wrote the event—can deviate from `_time` during backfill or clock skew analysis.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Usedefaultfields',
    },
    {
      term: 'bin / bucket',
      kind: 'command',
      summary:
        'Explicitly buckets `_time` or numeric fields—often implicit inside `timechart`/`chart`.',
      example: '... | bin span=5m _time | stats count by _time',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Bin',
    },
    {
      term: 'strftime / strptime',
      kind: 'function',
      summary:
        '`eval` functions formatting (`strftime`) or parsing (`strptime`) timestamps for human reporting.',
      example:
        '... | eval day=strftime(_time, "%Y-%m-%d")',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.2/evaluation-functions/date-and-time-functions',
    },
    {
      term: 'tz (timezone)',
      kind: 'concept',
      summary:
        'User/session timezone impacts displayed timestamps; schedules may follow UTC on Splunk Cloud.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Alert/CronExpressions',
    },
  ],
}
