/**
 * One-off rewriter: replaces legacy docs.splunk.com URLs that redirect to broken
 * help.splunk.com?resourceId=… chains with verified help.splunk.com paths (Enterprise 10.2).
 * Run: node scripts/rewrite-splunk-docs-urls.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..', 'src')

/** Longest keys first so we never partially replace a prefix of another URL */
const REPLACEMENTS = [
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Indexer/Searchdistributedindexes',
    'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/retrieve-events/search-across-one-or-more-distributed-search-peers',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Indexer/Aboutindexedfields',
    'https://help.splunk.com/en/data-management/get-data-in/get-data-into-splunk-enterprise/10.2/configure-indexed-field-extraction',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Indexer/Aboutindexes',
    'https://help.splunk.com/en/data-management/manage-splunk-enterprise-indexers/10.2/manage-indexes',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Usefieldlookupstoaddfieldstoyoursearches',
    'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/evaluate-and-manipulate-fields/use-lookup-to-add-fields-from-lookup-tables',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/DefineautomaticlookupsinSplunkWeb',
    'https://help.splunk.com/en/splunk-enterprise/manage-knowledge-objects/knowledge-management-manual/10.2/use-lookups-in-splunk-web/define-an-automatic-lookup-in-splunk-web',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/SelectfieldsinFieldsSidebar',
    'https://help.splunk.com/en/splunk-enterprise/manage-knowledge-objects/knowledge-management-manual/10.2/fields-and-field-extractions/use-default-fields',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Specifyfieldsforsearch',
    'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/retrieve-events/use-fields-to-retrieve-events',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Manageknowledgeobjects',
    'https://help.splunk.com/en/splunk-enterprise/manage-knowledge-objects/knowledge-management-manual/10.2/get-started-with-knowledge-objects/manage-knowledge-objects-through-settings-pages',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Configureextractions',
    'https://help.splunk.com/en/splunk-enterprise/manage-knowledge-objects/knowledge-management-manual/10.2/use-the-configuration-files-to-configure-field-extractions',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Aboutworkflowactions',
    'https://help.splunk.com/en/splunk-enterprise/manage-knowledge-objects/knowledge-management-manual/10.2/workflow-actions/about-workflow-actions-in-splunk-web',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Aboutfieldextractions',
    'https://help.splunk.com/en/splunk-enterprise/manage-knowledge-objects/knowledge-management-manual/10.2/fields-and-field-extractions/about-regular-expressions-with-field-extractions',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Aboutfieldaliases',
    'https://help.splunk.com/en/splunk-enterprise/manage-knowledge-objects/knowledge-management-manual/10.2/field-aliases',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Aboutcalculatedfields',
    'https://help.splunk.com/en/splunk-enterprise/manage-knowledge-objects/knowledge-management-manual/10.2/calculated-fields/about-calculated-fields',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/AboutKVstore',
    'https://help.splunk.com/en/splunk-enterprise/administer/admin-manual/10.2/administer-the-app-key-value-store',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Optimizelookups',
    'https://help.splunk.com/en/splunk-enterprise/manage-knowledge-objects/knowledge-management-manual/10.2/use-the-configuration-files-to-configure-lookups',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Report/Troubleshootscheduledreports',
    'https://help.splunk.com/en/splunk-enterprise/create-dashboards-and-reports/simple-xml-dashboards/10.2/charts/chart-display-issues',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Report/Savesearchesandreports',
    'https://help.splunk.com/en/splunk-enterprise/create-dashboards-and-reports/simple-xml-dashboards/10.2/create-dashboards-with-simple-xml/searches-power-dashboards-and-forms',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Report/Managereports',
    'https://help.splunk.com/en/splunk-enterprise/create-dashboards-and-reports/simple-xml-dashboards/10.2/create-dashboards-with-simple-xml/dashboards-and-forms',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Alert/Configurealertactions',
    'https://help.splunk.com/en/splunk-enterprise/alert-and-respond/alerting-manual/10.0/configure-alert-actions/set-up-alert-actions',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Alert/Throttlealerts',
    'https://help.splunk.com/en/splunk-enterprise/alert-and-respond/alerting-manual/10.0/manage-alert-trigger-conditions-and-throttling/throttle-alerts',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Alert/Monitoralerts',
    'https://help.splunk.com/en/splunk-enterprise/alert-and-respond/alerting-manual/10.0/view-and-update-alerts/alerts-page',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Alert/Configurealerts',
    'https://help.splunk.com/en/splunk-enterprise/alert-and-respond/alerting-manual/10.0/create-alerts/create-scheduled-alerts',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Alert/Createalerts',
    'https://help.splunk.com/en/splunk-enterprise/alert-and-respond/alerting-manual/10.0/create-alerts/create-scheduled-alerts',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Data/UseSplunkWeb',
    'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/search-overview/navigating-splunk-web',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Admin/AppArchitecture',
    'https://help.splunk.com/en/splunk-enterprise/administer/admin-manual/10.2/meet-splunk-apps/app-architecture-and-object-ownership',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Admin/Introduction',
    'https://help.splunk.com/en/splunk-enterprise/administer/admin-manual/10.2',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Search/Viewsearchjobproperties',
    'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/manage-jobs/view-search-job-properties',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Search/Viewandinteractwithsearchresults',
    'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/retrieve-events/preview-events',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Search/Usesearchassistant',
    'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/use-the-search-app/help-building-searches/use-the-search-assistant-to-build-searches',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Search/Specifytimewindows',
    'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/specify-time-ranges/about-searching-with-time',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Search/Specifyrelativetime',
    'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/specify-time-ranges/specify-time-modifiers-in-your-search',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Search/Setsearchmode',
    'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/use-the-search-app/search-modes',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Search/Selecttimeranges',
    'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/specify-time-ranges/select-time-ranges-to-apply-to-your-search',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Search/Searchprimer',
    'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/search-primer',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Search/Searchbestpractices',
    'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/optimize-searches/write-better-searches',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Search/Searchbasics',
    'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/search-primer/search-command-primer',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Search/Parallelreduce',
    'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/retrieve-events/search-across-one-or-more-distributed-search-peers',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Search/Manipulatemultivaluefields',
    'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/evaluate-and-manipulate-fields/evaluate-and-manipulate-fields-with-multiple-values',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Search/Managejobs',
    'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/manage-jobs/manage-search-jobs',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Search/Getstarted',
    'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/search-overview/get-started-with-search',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Search/Formatsubsearches',
    'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/subsearches/change-the-format-of-subsearch-results',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Search/Exportdata',
    'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/export-search-results/export-search-results',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Search/Explainreal-timesearches',
    'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/search-and-report-in-real-time/about-real-time-searches-and-reports',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Search/Aboutthesearchapp',
    'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/use-the-search-app/about-the-search-app',
  ],
  [
    'https://docs.splunk.com/Documentation/Splunk/latest/Search/Typesofsearches',
    'https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.2/search-overview/types-of-searches',
  ],
]

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, files)
    else if (/\.(ts|tsx)$/.test(name)) files.push(p)
  }
  return files
}

let hits = 0
for (const file of walk(root)) {
  let s = readFileSync(file, 'utf8')
  const orig = s
  for (const [from, to] of REPLACEMENTS) {
    const n = s.split(from).length - 1
    if (n > 0) {
      s = s.split(from).join(to)
      hits += n
    }
  }
  if (s !== orig) writeFileSync(file, s)
}

console.error(`Applied ${hits} URL replacements across src/.`)
