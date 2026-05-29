import type { Question } from '../../types'

export const reportsQuestions: Question[] = [
  {
    id: 'rd-001',
    domainId: 'reports-dashboards',
    stem: 'Saving a search as a report typically allows you to:',
    choices: [
      'Delete the underlying index',
      'Reuse the SPL and visualization configuration without retyping it',
      'Disable RBAC globally',
      'Remove forwarders from deployment server',
    ],
    correctIndex: 1,
    explanation:
      'Reports persist search definitions and presentation for sharing and scheduling.',
    docLinks: [
      {
        label: 'Save searches and reports',
        url: 'https://help.splunk.com/en/splunk-enterprise/create-dashboards-and-reports/simple-xml-dashboards/10.2/create-dashboards-with-simple-xml/searches-power-dashboards-and-forms',
      },
    ],
  },
  {
    id: 'rd-002',
    domainId: 'reports-dashboards',
    stem: 'A statistics table visualization is appropriate when:',
    choices: [
      'You need only a background image',
      'You want precise rows and columns of numeric summaries',
      'You must store secrets',
      'You are configuring index clustering',
    ],
    correctIndex: 1,
    explanation:
      'Tables are ideal for exact values from transforming searches.',
    docLinks: [
      {
        label: 'Table visualization',
        url: 'https://help.splunk.com/en/splunk-enterprise/create-dashboards-and-reports/simple-xml-dashboards/10.2/table-visualizations/format-table-visualizations',
      },
    ],
  },
  {
    id: 'rd-003',
    domainId: 'reports-dashboards',
    stem: 'Charts (bar, line, pie) in Splunk generally visualize:',
    choices: [
      'Indexer bucket paths',
      'Transformed statistical results rather than raw event text',
      'KV store encryption keys',
      'Forwarder version strings only',
    ],
    correctIndex: 1,
    explanation:
      'Visualizations bind to fields produced by reporting commands.',
    docLinks: [
      {
        label: 'Visualization reference',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/Viz/Visualizationreference',
      },
    ],
  },
  {
    id: 'rd-004',
    domainId: 'reports-dashboards',
    stem: 'A dashboard is best described as:',
    choices: [
      'A single raw event',
      'A layout of panels (reports, charts, inputs) on one page',
      'A type of forwarder',
      'A license stack',
    ],
    correctIndex: 1,
    explanation:
      'Dashboards compose multiple panels for operational visibility.',
    docLinks: [
      {
        label: 'Dashboards and forms',
        url: 'https://help.splunk.com/en/splunk-enterprise/create-dashboards-and-reports/simple-xml-dashboards/10.2/introduction/getting-started',
      },
    ],
  },
  {
    id: 'rd-005',
    domainId: 'reports-dashboards',
    stem: 'Adding a saved report to a dashboard panel typically:',
    choices: [
      'Removes the saved report object',
      'Embeds that report’s search and visualization in the panel',
      'Deletes all tokens',
      'Converts the index to metrics',
    ],
    correctIndex: 1,
    explanation:
      'Panels reference saved content or inline searches depending on design.',
    docLinks: [
      {
        label: 'Build dashboards in simple XML',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/Viz/BuildandeditdashboardswithSimplifiedXML',
      },
    ],
  },
  {
    id: 'rd-006',
    domainId: 'reports-dashboards',
    stem: 'Editing a report after creation may change:',
    choices: [
      'Historical raw data bytes',
      'SPL, time range, chart type, and formatting',
      'Indexer server.pem automatically',
      'The number of CPUs in AWS',
    ],
    correctIndex: 1,
    explanation:
      'Reports are knowledge objects you can iterate on without reindexing.',
    docLinks: [
      {
        label: 'Manage reports',
        url: 'https://help.splunk.com/en/splunk-enterprise/create-dashboards-and-reports/simple-xml-dashboards/10.2/create-dashboards-with-simple-xml/dashboards-and-forms',
      },
    ],
  },
  {
    id: 'rd-007',
    domainId: 'reports-dashboards',
    stem: 'Dashboard inputs (for example time pickers) can:',
    choices: [
      'Never affect searches',
      'Drive tokens that modify searches in multiple panels',
      'Only work in the Monitoring Console',
      'Replace indexers',
    ],
    correctIndex: 1,
    explanation:
      'Forms and tokens connect UI controls to SPL in dashboards.',
    docLinks: [
      {
        label: 'Create forms',
        url: 'https://help.splunk.com/en/splunk-enterprise/create-dashboards-and-reports/simple-xml-dashboards/10.2/build-and-edit-dashboards-in-splunk-web/create-and-edit-forms',
      },
    ],
  },
  {
    id: 'rd-008',
    domainId: 'reports-dashboards',
    stem: 'When a visualization shows “No results found”, a sensible first check is:',
    choices: [
      'Rebuild the SHC',
      'Whether the underlying search returns rows in the Search app',
      'Delete props.conf',
      'Purge all KV stores',
    ],
    correctIndex: 1,
    explanation:
      'Validate the SPL and time range in Search before troubleshooting the panel.',
    docLinks: [
      {
        label: 'Troubleshoot dashboards and forms',
        url: 'https://help.splunk.com/en/splunk-enterprise/create-dashboards-and-reports/simple-xml-dashboards/10.2/charts/chart-display-issues',
      },
    ],
  },
  {
    id: 'rd-009',
    domainId: 'reports-dashboards',
    stem: 'Permissions on reports and dashboards are commonly managed via:',
    choices: [
      'Deleting indexes',
      'App permissions and role sharing settings',
      'Editing inputs.conf on forwarders only',
      'Changing CPU governor',
    ],
    correctIndex: 1,
    explanation:
      'Knowledge object sharing follows app context and role capabilities.',
    docLinks: [
      {
        label: 'Manage knowledge object permissions',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Manageknowledgeobjectpermissions',
      },
    ],
  },
]
