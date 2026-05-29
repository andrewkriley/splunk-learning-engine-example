import type { GlossaryDomain } from '../types'

/** Lookups & subsearches — enriching and correlating datasets */
export const lookupsSubsearches: GlossaryDomain = {
  id: 'lookups-subsearches',
  title: 'Leveraging Lookups and Subsearches',
  overview:
    'Lookups join CSV/KV store tables (`lookup`, `inputlookup`, `outputlookup`) for enrichment. Subsearches `[ ... ]` supply dynamic filters or lists to outer searches. `join`, `append`, and `appendcols` correlate heterogeneous datasets—mind resource limits (`subsearch`, `join` maxresultrows).',
  referenceUrls: [
    {
      label: 'About lookups',
      url: 'https://help.splunk.com/en/splunk-enterprise/manage-knowledge-objects/knowledge-management-manual/10.2/use-lookups-in-splunk-web/about-lookups',
    },
    {
      label: 'lookup command',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Lookup',
    },
    {
      label: 'Subsearches',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/Search/Aboutsubsearches',
    },
    {
      label: 'join command',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Join',
    },
  ],
  entries: [
    {
      term: 'lookup',
      kind: 'command',
      summary:
        'Applies a Splunk-defined lookup (CSV/KV/external) to enrich events with reference columns.',
      example:
        '... | lookup geo_ip_lookup clientip OUTPUT country AS geo_country',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Lookup',
    },
    {
      term: 'inputlookup',
      kind: 'command',
      summary:
        'Reads lookup contents directly as search results—baseline for maintenance schedules or asset lists.',
      example: '| inputlookup asset_inventory.csv',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Inputlookup',
    },
    {
      term: 'outputlookup',
      kind: 'command',
      summary:
        'Writes tabular results back to CSV/KV lookups (permissions permitting)—careful with overwrite.',
      example: '... | outputlookup my_lookup.csv',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Outputlookup',
    },
    {
      term: 'automatic lookup',
      kind: 'concept',
      summary:
        'Configured enrichment applied implicitly at search time—declared in transforms/lookup configs.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/manage-knowledge-objects/knowledge-management-manual/10.2/use-lookups-in-splunk-web/define-an-automatic-lookup-in-splunk-web',
    },
    {
      term: 'subsearch',
      kind: 'concept',
      summary:
        'Bracketed inner search whose results parameterize outer searches (`index=* [ search ... ]`).',
      example:
        'index=proxy [ search index=dhcp src_ip=* | fields src_ip ]',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Search/Aboutsubsearches',
    },
    {
      term: 'format / return',
      kind: 'concept',
      summary:
        '`format` controls how subsearch results serialize into SPL fragments; `return` caps rows for splunk-server limits.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/subsearches/change-the-format-of-subsearch-results',
    },
    {
      term: 'join',
      kind: 'command',
      summary:
        'SQL-like inner join between main results and subsearch/subquery dataset—expensive if unconstrained.',
      example:
        'index=a | join type=inner host [ search index=b | stats latest(patch) by host ]',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Join',
    },
    {
      term: 'append',
      kind: 'command',
      summary:
        'Stacks two result sets vertically—good when schemas align.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Append',
    },
    {
      term: 'appendcols',
      kind: 'command',
      summary:
        'Adds columns from a parallel search—requires aligned row counts/order (use cautiously).',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Appendcols',
    },
    {
      term: 'lookup vs KV Store',
      kind: 'concept',
      summary:
        'CSV lookups are simple files; KV collections scale structured enrichment but need collections.conf.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/administer/admin-manual/10.2/administer-the-app-key-value-store',
    },
    {
      term: 'iplocation',
      kind: 'command',
      summary:
        'Looks up IP addresses against a bundled MaxMind database and adds geographic fields.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Iplocation',
    },
  ],
}
