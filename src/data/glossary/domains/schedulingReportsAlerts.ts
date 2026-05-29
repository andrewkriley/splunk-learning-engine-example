import type { GlossaryDomain } from '../types'

/** Scheduling: saved searches, cron, alert lifecycle — Reporting & Alerting manuals */
export const schedulingReportsAlerts: GlossaryDomain = {
  id: 'scheduling-reports-alerts',
  title: 'Scheduling Reports & Alerts',
  overview:
    'Saved searches underpin scheduled reports (PDF/email/export) and alerts (monitoring). Splunk schedules use cron-like expressions; Splunk Cloud commonly evaluates schedules in UTC while Enterprise follows search-head timezone settings for analyzer defaults. Learn throttle/suppress patterns to reduce noise.',
  referenceUrls: [
    {
      label: 'Schedule reports',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/Report/Schedulereports',
    },
    {
      label: 'Create alerts',
      url: 'https://help.splunk.com/en/splunk-enterprise/alert-and-respond/alerting-manual/10.0/create-alerts/create-scheduled-alerts',
    },
    {
      label: 'Cron expressions for alerts',
      url: 'https://docs.splunk.com/Documentation/Splunk/latest/Alert/CronExpressions',
    },
    {
      label: 'Throttle alerts',
      url: 'https://help.splunk.com/en/splunk-enterprise/alert-and-respond/alerting-manual/10.0/manage-alert-trigger-conditions-and-throttling/throttle-alerts',
    },
  ],
  entries: [
    {
      term: 'saved search / report',
      kind: 'concept',
      summary:
        'Persisted SPL plus visualization metadata; can be shared, embedded in dashboards, and scheduled.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/create-dashboards-and-reports/simple-xml-dashboards/10.2/create-dashboards-with-simple-xml/searches-power-dashboards-and-forms',
    },
    {
      term: 'schedule (cron)',
      kind: 'concept',
      summary:
        'Time-based trigger using cron fields (minute hour dom month dow); aligns report/alerts to operational cadence.',
      example: 'Run every 5 minutes: */5 * * * *',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Alert/CronExpressions',
    },
    {
      term: 'alert',
      kind: 'concept',
      summary:
        'Saved search plus trigger logic (results count, rolling window, per-result) and actions (email, webhook, script).',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/alert-and-respond/alerting-manual/10.0/create-alerts/create-scheduled-alerts',
    },
    {
      term: 'scheduled report',
      kind: 'concept',
      summary:
        'Runs a saved search on a schedule and can deliver output (for example PDF/email) per Splunk permissions.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Report/Schedulereports',
    },
    {
      term: 'trigger: number of results',
      kind: 'concept',
      summary:
        'Classic alert mode firing when result crossing compares against thresholds (for example > 0 failures).',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/alert-and-respond/alerting-manual/10.0/create-alerts/create-scheduled-alerts',
    },
    {
      term: 'rolling window / per-result',
      kind: 'concept',
      summary:
        'Advanced trigger modes evaluating windows of time or each result row—common in security analytics.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/alert-and-respond/alerting-manual/10.0/create-alerts/create-scheduled-alerts',
    },
    {
      term: 'throttle / suppress',
      kind: 'concept',
      summary:
        'Limits repeated notifications for the same condition within a time window or keyed fields.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/alert-and-respond/alerting-manual/10.0/manage-alert-trigger-conditions-and-throttling/throttle-alerts',
    },
    {
      term: 'alert actions',
      kind: 'concept',
      summary:
        'Configured responses (email, Run Script, webhook via HTTP Event Collector, ticketing integrations).',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/alert-and-respond/alerting-manual/10.0/configure-alert-actions/set-up-alert-actions',
    },
    {
      term: 'permissions / sharing',
      kind: 'concept',
      summary:
        'Scheduled objects obey app scope and role capabilities—sharing determines who can edit or receive outputs.',
      docUrl:
        'https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Manageknowledgeobjectpermissions',
    },
    {
      term: 'dispatch.lookups / workload',
      kind: 'concept',
      summary:
        'Heavy schedules compete for concurrent searches—monitor skipped searches and schedule staggering.',
      docUrl:
        'https://help.splunk.com/en/splunk-enterprise/create-dashboards-and-reports/simple-xml-dashboards/10.2/charts/chart-display-issues',
    },
  ],
}
