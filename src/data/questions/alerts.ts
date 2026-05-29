import type { Question } from '../../types'

export const alertsQuestions: Question[] = [
  {
    id: 'sa-001',
    domainId: 'scheduled-alerts',
    stem: 'A scheduled report runs:',
    choices: [
      'Only when the indexer reboots',
      'On a time-based cadence you configure',
      'Only inside a KV store transaction',
      'When SAML assertions refresh',
    ],
    correctIndex: 1,
    explanation:
      'Scheduled reports materialize results periodically for email, dashboards, or export.',
    docLinks: [
      {
        label: 'Schedule reports',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/Report/Schedulereports',
      },
    ],
  },
  {
    id: 'sa-002',
    domainId: 'scheduled-alerts',
    stem: 'An alert is triggered when:',
    choices: [
      'The UI theme changes',
      'Configured trigger conditions on search results are met',
      'A forwarder connects over HEC',
      'The cluster label changes',
    ],
    correctIndex: 1,
    explanation:
      'Alerts evaluate result conditions (count thresholds, etc.) on a schedule or in real time.',
    docLinks: [
      {
        label: 'Create alerts',
        url: 'https://help.splunk.com/en/splunk-enterprise/alert-and-respond/alerting-manual/10.0/create-alerts/create-scheduled-alerts',
      },
    ],
  },
  {
    id: 'sa-003',
    domainId: 'scheduled-alerts',
    stem: 'Alert actions may include:',
    choices: [
      'Only deleting indexes',
      'Email, scripts, webhooks, and other modular alert actions (as enabled)',
      'Reformatting hardware RAID',
      'Compiling C++ on search heads',
    ],
    correctIndex: 1,
    explanation:
      'Actions extend alerting into ticketing, email, and custom automation.',
    docLinks: [
      {
        label: 'Configure alert actions',
        url: 'https://help.splunk.com/en/splunk-enterprise/alert-and-respond/alerting-manual/10.0/create-alerts/create-scheduled-alerts',
      },
    ],
  },
  {
    id: 'sa-004',
    domainId: 'scheduled-alerts',
    stem: 'The Alerting workflow UI helps you:',
    choices: [
      'Edit server.pem',
      'Review fired alerts and triage notable conditions',
      'Install deployment apps',
      'Resize index buckets manually',
    ],
    correctIndex: 1,
    explanation:
      'Operators use alerting views to see what fired and investigate.',
    docLinks: [
      {
        label: 'Monitor alerts',
        url: 'https://help.splunk.com/en/splunk-enterprise/alert-and-respond/alerting-manual/10.0/view-and-update-alerts/alerts-page',
      },
    ],
  },
  {
    id: 'sa-005',
    domainId: 'scheduled-alerts',
    stem: 'Throttle on an alert is used to:',
    choices: [
      'Increase ingestion permanently',
      'Suppress repeated notifications for the same condition within a window',
      'Disable all searches',
      'Convert events to metrics',
    ],
    correctIndex: 1,
    explanation:
      'Throttling reduces noise when a condition remains true across runs.',
    docLinks: [
      {
        label: 'Throttle alerts',
        url: 'https://help.splunk.com/en/splunk-enterprise/alert-and-respond/alerting-manual/10.0/manage-alert-trigger-conditions-and-throttling/throttle-alerts',
      },
    ],
  },
]
