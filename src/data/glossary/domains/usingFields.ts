import type { GlossaryDomain } from '../types'

/** Fields: extraction, typing, reshaping — Splunk Knowledge & SPL Search Reference */
export const usingFields: GlossaryDomain = {
  id: 'using-fields',
  title: 'Using Fields',
  overview:
    'Fields are name/value pairs Splunk attaches to events so you can filter, chart, and correlate. Search-time discovery (Sidebar), extraction (`rex`, `extract`), and reshaping (`eval`, `rename`) are core user skills. Official docs distinguish default fields (`host`, `source`, `sourcetype`, `_time`), extracted fields, and multivalue fields.',
  referenceUrls: [
    {
      label: 'About fields',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Aboutfields',
    },
    {
      label: 'Use fields in searches',
      url: 'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/retrieve-events/use-fields-to-retrieve-events',
    },
    {
      label: 'eval command',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Eval',
    },
    {
      label: 'rex command',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Rex',
    },
  ],
  entries: [
    {
      term: 'field',
      kind: 'concept',
      summary:
        'A named attribute on an event (built-in or extracted) used in predicates like `status=500` and in reporting.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Aboutfields',
    },
    {
      term: 'default fields',
      kind: 'concept',
      summary:
        'Common metadata such as `host`, `source`, `sourcetype`, `index`, and `_time` that Splunk assigns or parses for every event.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Usedefaultfields',
    },
    {
      term: '_raw',
      kind: 'concept',
      summary:
        'The original event text before extraction; often the source for `rex`/`extract` field discovery.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Usedefaultfields',
    },
    {
      term: 'fields',
      kind: 'command',
      summary:
        'Keeps or removes fields from search results to simplify downstream commands and tables.',
      example: '... | fields host status bytes',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Fields',
    },
    {
      term: 'fieldsummary',
      kind: 'command',
      summary:
        'Summarizes field cardinality, coverage, and numeric ranges—useful when auditing unfamiliar data.',
      example: '... | fieldsummary maxvals=50',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Fieldsummary',
    },
    {
      term: 'rename',
      kind: 'command',
      summary:
        'Renames fields for clearer reports (`rename total_bytes AS bytes`).',
      example: '... | rename clientip AS ip',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Rename',
    },
    {
      term: 'eval',
      kind: 'command',
      summary:
        'Creates or overwrites fields using expressions and a large library of functions (string, math, time, conditional).',
      example: '... | eval error=if(status>=400, "yes", "no")',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Eval',
    },
    {
      term: 'rex',
      kind: 'command',
      summary:
        'Extracts fields using regular expressions (often mode=sed or named capture groups).',
      example:
        '... | rex field=_raw "(?<session_id>[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12})"',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Rex',
    },
    {
      term: 'extract / kv',
      kind: 'command',
      summary:
        '`extract` pulls fields using extraction rules; `kv` extracts key=value pairs from raw text.',
      example: '... | kv maxpairs=50',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.2/search-commands/kvform',
    },
    {
      term: 'spath',
      kind: 'command',
      summary:
        'Extracts fields from structured XML/JSON paths—common for nested logs.',
      example: '... | spath path=orders{}.id output=id',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Spath',
    },
    {
      term: 'multikv',
      kind: 'command',
      summary:
        'Splits multi-line tabular events (for example `top` output captured as one event) into separate rows.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Multikv',
    },
    {
      term: 'fillnull',
      kind: 'command',
      summary:
        'Replaces null/missing field values so charts and stats behave consistently.',
      example: '... | fillnull value=0 bytes',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Fillnull',
    },
    {
      term: 'coalesce',
      kind: 'function',
      summary:
        '`eval` function returning the first non-null argument—handy when several candidate fields represent the same concept.',
      example: '... | eval user=coalesce(username, user_id, "unknown")',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.2/evaluation-functions/evaluation-functions',
    },
    {
      term: 'multivalue fields',
      kind: 'concept',
      summary:
        'Fields that hold multiple values per event; manipulate with `mvexpand`, `mvcombine`, `mvdedup`, etc.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/evaluate-and-manipulate-fields/evaluate-and-manipulate-fields-with-multiple-values',
    },
    {
      term: 'table',
      kind: 'command',
      summary:
        'Projects a tabular view of fields—often the last presentation command before visualizations.',
      example: '... | table _time host status uri',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Table',
    },
  ],
}
