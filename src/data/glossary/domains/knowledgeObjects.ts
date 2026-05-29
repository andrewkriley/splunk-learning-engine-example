import type { GlossaryDomain } from '../types'

/** Knowledge objects — reusable analytical assets */
export const knowledgeObjects: GlossaryDomain = {
  id: 'knowledge-objects',
  title: 'Knowledge Objects',
  overview:
    'Knowledge objects persist Splunk expertise: field extractions, aliases, tags, macros, event types, workflows, data models, and saved content. They ship inside apps, inherit permissions from roles, and should follow naming/version hygiene for CI/CD promotion.',
  referenceUrls: [
    {
      label: 'Manage knowledge objects',
      url: 'https://help.splunk.com/en/splunk-enterprise/manage-knowledge-objects/knowledge-management-manual/10.2/get-started-with-knowledge-objects/manage-knowledge-objects-through-settings-pages',
    },
    {
      label: 'About field extractions',
      url: 'https://help.splunk.com/en/splunk-enterprise/manage-knowledge-objects/knowledge-management-manual/10.2/fields-and-field-extractions/about-regular-expressions-with-field-extractions',
    },
    {
      label: 'Macros',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Usesearchmacros',
    },
    {
      label: 'About data models',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Aboutdatamodels',
    },
  ],
  entries: [
    {
      term: 'field extraction',
      kind: 'concept',
      summary:
        'Regex or delimiter rules extracting fields from `_raw`, scoped by sourcetype/host/source.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/manage-knowledge-objects/knowledge-management-manual/10.2/fields-and-field-extractions/about-regular-expressions-with-field-extractions',
    },
    {
      term: 'field alias',
      kind: 'concept',
      summary:
        'Maps multiple underlying field names to a canonical field for CIM compliance or dashboards.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/manage-knowledge-objects/knowledge-management-manual/10.2/field-aliases',
    },
    {
      term: 'calculated field',
      kind: 'concept',
      summary:
        'Eval expression persisted as a field—evaluated at search time like automatic fields.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/manage-knowledge-objects/knowledge-management-manual/10.2/calculated-fields/about-calculated-fields',
    },
    {
      term: 'tag',
      kind: 'concept',
      summary:
        'Labels applied to field=value pairs for simplified pivoting and correlation searches.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Abouttagsandaliases',
    },
    {
      term: 'event type',
      kind: 'concept',
      summary:
        'Saved boolean filter describing notable conditions—often paired with tags or workflows.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Abouteventtypes',
    },
    {
      term: 'macro',
      kind: 'concept',
      summary:
        'Reusable SPL snippet with arguments (`foo(2)`), encouraging consistency across searches.',
      example: '`track_usage(error="$error$")` expands stored SPL.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Usesearchmacros',
    },
    {
      term: 'workflow action',
      kind: 'concept',
      summary:
        'Contextual links from fields/events to external ticketing or drill-down searches.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/manage-knowledge-objects/knowledge-management-manual/10.2/workflow-actions/about-workflow-actions-in-splunk-web',
    },
    {
      term: 'data model',
      kind: 'concept',
      summary:
        'Hierarchical schema describing datasets for Pivot/acceleration—built from searches or constraints.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Aboutdatamodels',
    },
    {
      term: 'saved search / alert / report',
      kind: 'concept',
      summary:
        'Knowledge objects capturing SPL schedules—surface as alerts, CSV exports, panels.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/manage-knowledge-objects/knowledge-management-manual/10.2/get-started-with-knowledge-objects/manage-knowledge-objects-through-settings-pages',
    },
    {
      term: 'lookup definition',
      kind: 'concept',
      summary:
        'Metadata describing lookup tables (fields, types) referenced by `lookup`/`inputlookup`.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/ConfigureCSVlookups',
    },
    {
      term: 'transforms.conf / props.conf',
      kind: 'concept',
      summary:
        'Configuration files defining parsing/extraction—changes often require reload or peer bundle replication.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Admin/Transformsconf',
    },
    {
      term: 'app context',
      kind: 'concept',
      summary:
        'Knowledge objects live inside apps—sharing merges visibility according to roles.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Manageknowledgeobjectpermissions',
    },
  ],
}
