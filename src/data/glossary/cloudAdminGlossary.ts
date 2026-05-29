import type { GlossaryDomain } from './types'

/** Cloud Platform administration — topic glossary (public outline sections) */
export const CLOUD_ADMIN_GLOSSARY_DOMAINS: GlossaryDomain[] = [
  {
    id: 'cloud-overview',
    title: 'Splunk Cloud Overview',
    overview:
      'Splunk Cloud is a managed Splunk deployment with SaaS-style operations: Splunk operates the platform (updates, scaling, SLAs), while tenants configure data onboarding, knowledge objects, and security controls within policy guardrails. Concepts include stacks (tenant isolation), experience tiers, hybrid connectivity when connecting on‑prem forwarders or IDPs, and understanding what Splunk manages versus what customers configure.',
    referenceUrls: [
      {
        label: 'Splunk Cloud Platform Admin Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/administer/admin-manual',
      },
      {
        label: 'Splunk Cloud Service Description',
        url: 'https://www.splunk.com/en_us/legal/splunk-cloud-services-description.html',
      },
    ],
    entries: [
      {
        term: 'stack',
        kind: 'concept',
        summary:
          'Logical Splunk Cloud deployment boundary—indexes, settings, and apps scoped per tenant stack.',
      },
      {
        term: 'managed platform',
        kind: 'concept',
        summary:
          'Splunk maintains infrastructure, patching, and core reliability; admins focus on data/config inside allowed surfaces.',
      },
      {
        term: 'hybrid',
        kind: 'concept',
        summary:
          'Architecture combining Splunk Cloud with on‑prem forwarders or identity systems bridged via supported connectors.',
      },
    ],
  },
  {
    id: 'index-management',
    title: 'Index Management',
    overview:
      'Indexes partition incoming data for retention, security, and performance. Admins size retention to compliance needs, understand warm/cold/frozen concepts, and use self‑service index settings where Cloud permits—avoiding unnecessary buckets or tsidx growth through thoughtful source filtering and parsing.',
    referenceUrls: [
      {
        label: 'Manage indexes',
        url: 'https://help.splunk.com/en/data-management/manage-splunk-enterprise-indexers/10.2/manage-indexes',
      },
      {
        label: 'Configuration files and index settings',
        url: 'https://help.splunk.com/en/splunk-enterprise/administer/admin-manual/10.2/configuration-file-reference',
      },
    ],
    entries: [
      {
        term: 'retention',
        kind: 'concept',
        summary:
          'frozenTimePeriodInSecs and volume controls define how long events remain searchable before aging out.',
      },
      {
        term: 'tsidx',
        kind: 'concept',
        summary:
          'Time-series index files speeding search; bucket rebuild/repair affects storage and search performance.',
      },
      {
        term: 'index routing',
        kind: 'concept',
        summary:
          'Sending data to the correct index preserves access controls and retention policies per dataset.',
      },
    ],
  },
  {
    id: 'auth-authorization',
    title: 'User Authentication and Authorization',
    overview:
      'Splunk Cloud integrates with enterprise identity via SAML/OIDC and maps groups to Splunk roles. Authorization combines capabilities (fine‑grained powers) with knowledge object permissions and index access—least privilege reduces blast radius when credentials leak.',
    referenceUrls: [
      {
        label: 'Manage users and security',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/administer/manage-users-and-security',
      },
      {
        label: 'Authentication and SSO (SAML)',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/administer/manage-users-and-security',
      },
    ],
    entries: [
      {
        term: 'SAML/OIDC',
        kind: 'concept',
        summary:
          'Federated SSO lets IdPs enforce MFA and lifecycle; Splunk trusts assertions with mapped roles.',
      },
      {
        term: 'role',
        kind: 'concept',
        summary:
          'Named bundle of capabilities plus default app/index access—prefer multiple narrow roles over one admin role.',
      },
      {
        term: 'capability',
        kind: 'concept',
        summary:
          'Atomic permission such as schedule_search or edit_user—compose roles from minimal capability sets.',
      },
    ],
  },
  {
    id: 'configuration-files',
    title: 'Splunk Configuration Files',
    overview:
      'Splunk persists behavior in layered `.conf` files merged by context (system vs app vs user). Administer through Settings where possible; use `btool` to troubleshoot effective settings after layering. Cloud restricts direct shell access—changes propagate via UI, REST, or approved deployment mechanisms.',
    referenceUrls: [
      {
        label: 'Administer with configuration files',
        url: 'https://help.splunk.com/en/splunk-enterprise/administer/admin-manual/10.2/administer-splunk-enterprise-with-configuration-files',
      },
      {
        label: 'Configuration file reference',
        url: 'https://help.splunk.com/en/splunk-enterprise/administer/admin-manual/10.2/configuration-file-reference',
      },
    ],
    entries: [
      {
        term: 'btool',
        kind: 'command',
        summary:
          'CLI helper listing merged stanza settings—essential when multiple apps override the same stanza.',
        example: 'splunk btool props list --debug',
      },
      {
        term: 'precedence',
        kind: 'concept',
        summary:
          'Later contexts override earlier ones (system → app default → local → user); understanding order explains surprises.',
      },
      {
        term: 'stanza',
        kind: 'concept',
        summary:
          'Named configuration section such as `[source::...]` or `[host::...]` binding settings to data characteristics.',
      },
    ],
  },
  {
    id: 'getting-data-in-cloud',
    title: 'Getting Data In (Cloud)',
    overview:
      'Onboarding spans Universal Forwarders, HTTP Event Collector (HEC), cloud ingest APIs, and app-specific collectors. Plan acknowledgement settings, tokens, TLS, and compression—each choice influences latency, durability, and security posture.',
    referenceUrls: [
      {
        label: 'Get data into Splunk Cloud',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/get-data-in',
      },
      {
        label: 'HTTP Event Collector',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector',
      },
    ],
    entries: [
      {
        term: 'HEC token',
        kind: 'concept',
        summary:
          'Bearer credential routing JSON events to a collector endpoint—rotate tokens and scope indexes/sourcetypes.',
      },
      {
        term: 'Universal Forwarder',
        kind: 'concept',
        summary:
          'Lightweight agent reading logs/files securely with optional acknowledgment when paired with indexer acknowledgment policies.',
      },
      {
        term: 'deployment server / DS',
        kind: 'concept',
        summary:
          'Central management for forwarder apps—bundle inputs and outputs consistently across fleets.',
      },
    ],
  },
  {
    id: 'forwarder-management',
    title: 'Forwarder Management',
    overview:
      'Forwarders require outputs that trust Splunk Cloud endpoints, certificates, and load-balancing strategies. Deployment tiers (DS/CM patterns per platform guidance) push apps; troubleshooting focuses on connectivity, queueing, and parsing boundaries between UF and indexer.',
    referenceUrls: [
      {
        label: 'Universal Forwarder manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/forward-and-process-data/universal-forwarder-manual',
      },
      {
        label: 'Forwarding and receiving data',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/forward-and-process-data/forwarding-and-receiving-data',
      },
    ],
    entries: [
      {
        term: 'outputs.conf',
        kind: 'concept',
        summary:
          'Defines indexers/Cloud gateways, TLS, compression, and load balancing across receiving tiers.',
      },
      {
        term: 'phoneHomeIntervalInSecs',
        kind: 'concept',
        summary:
          'Deployment client polling cadence—too aggressive wastes bandwidth; too slow delays policy rollout.',
      },
      {
        term: 'splunkd mgmt port',
        kind: 'concept',
        summary:
          'Management interface for configuration pushes—must remain reachable for DS-driven bundles.',
      },
    ],
  },
  {
    id: 'monitor-inputs',
    title: 'Monitor Inputs',
    overview:
      '`monitor://` tails files and directories on forwarders or indexers (where permitted). Batch vs rising modes, symlink handling, and sink processors influence throughput and duplication risk—pair monitors with correct sourcetype and timezone hints.',
    referenceUrls: [
      {
        label: 'Monitor files and directories',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/Data/Monitorfilesanddirectories',
      },
      {
        label: 'inputs.conf',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/Admin/Inputsconf',
      },
    ],
    entries: [
      {
        term: 'monitor://',
        kind: 'concept',
        summary:
          'Stanza prefix pointing Splunk to continuously read new bytes appended to files.',
      },
      {
        term: 'crcSalt',
        kind: 'concept',
        summary:
          'Adjusts file fingerprinting when Splunk must treat rotated logs distinctly—misuse causes duplicates or skips.',
      },
      {
        term: 'whitelist / blacklist',
        kind: 'concept',
        summary:
          'Regex filters restricting which files beneath a path actually ingest—critical on noisy directories.',
      },
    ],
  },
  {
    id: 'network-other-inputs',
    title: 'Network and Other Inputs',
    overview:
      'TCP and UDP inputs receive syslog or agent streams; modular inputs wrap APIs/scripts. Firewalls, protocols, and buffering matter—UDP lacks delivery guarantees, while TCP enables session-oriented reliability when configured correctly.',
    referenceUrls: [
      {
        label: 'Get data from network sources',
        url: 'https://help.splunk.com/en/data-management/get-data-in/get-data-into-splunk-enterprise/10.2/get-data-from-network-sources',
      },
      {
        label: 'Syslog and TCP/UDP (same manual)',
        url: 'https://help.splunk.com/en/data-management/get-data-in/get-data-into-splunk-enterprise/10.2/get-data-from-network-sources',
      },
    ],
    entries: [
      {
        term: 'syslog',
        kind: 'concept',
        summary:
          'Standard network logging format—often UDP on port 514; consider RFC variations and timezone stamping.',
      },
      {
        term: 'connection_host',
        kind: 'concept',
        summary:
          'Determines host field resolution for network streams—misconfiguration merges unrelated sources.',
      },
      {
        term: 'sourcetype assignment',
        kind: 'concept',
        summary:
          'Sets parsing defaults—explicit transforms prevent noisy defaults like `too_small`.',
      },
    ],
  },
  {
    id: 'fine-tuning-inputs',
    title: 'Fine-tuning Inputs',
    overview:
      'Fine tuning eliminates duplicates, handles rotated logs, and tunes thruput/parallel ingestion. Examine file hashing behavior, init offset choices, and structured previews when rolling out high-volume paths.',
    referenceUrls: [
      {
        label: 'Improve the data input process',
        url: 'https://help.splunk.com/en/data-management/get-data-in/get-data-into-splunk-enterprise/10.2/improve-the-data-input-process',
      },
    ],
    entries: [
      {
        term: 'duplicate events',
        kind: 'concept',
        summary:
          'Often from mis-set checksum behavior or copying files Splunk already ingested—adjust props or monitor scope.',
      },
      {
        term: 'ignoreOlderThan',
        kind: 'concept',
        summary:
          'Skips stale files during directory crawls—protects against replay storms after downtime.',
      },
      {
        term: 'multiline events',
        kind: 'concept',
        summary:
          'Requires LINE_BREAKER/MUST_BREAK_AFTER settings so stack traces stay unified.',
      },
    ],
  },
  {
    id: 'parsing-data-preview',
    title: 'Parsing Phase and Data Preview',
    overview:
      'Parsing assigns timestamps, line breaking, and field boundaries before indexing. Data Preview exercises props/transforms without committing—validate TIME_FORMAT, MAX_TIMESTAMP_LOOKAHEAD, and transforms before broad rollout.',
    referenceUrls: [
      {
        label: 'Configure event processing',
        url: 'https://help.splunk.com/en/data-management/get-data-in/get-data-into-splunk-enterprise/10.2/configure-event-processing',
      },
      {
        label: 'props.conf',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/Admin/Propsconf',
      },
    ],
    entries: [
      {
        term: 'LINE_BREAKER',
        kind: 'concept',
        summary:
          'Regex describing event boundaries—misconfiguration merges or splits events incorrectly.',
      },
      {
        term: 'TIME_FORMAT',
        kind: 'concept',
        summary:
          'Strptime pattern aligning extracted timestamps—critical when logs lack ISO-8601.',
      },
      {
        term: 'transforms.conf',
        kind: 'concept',
        summary:
          'Hosts regex extractions, routing, and mask rules referenced from props stanzas.',
      },
    ],
  },
  {
    id: 'manipulating-raw-data',
    title: 'Manipulating Raw Data',
    overview:
      'Administrators reshape `_raw` during parsing—SEDCMD anonymization, CHARSET fixes, routing to alternate indexes/sourcetypes, and clone pipelines for forked parsing paths—all before search-time SPL runs.',
    referenceUrls: [
      {
        label: 'Anonymize data',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/Data/Anonymizedata',
      },
      {
        label: 'Routing and filtering',
        url: 'https://docs.splunk.com/Documentation/Splunk/latest/Forwarding/Routeandfilterdatad',
      },
    ],
    entries: [
      {
        term: 'SEDCMD',
        kind: 'concept',
        summary:
          'Stream editor anonymization or cleanup applied during parsing—great for redacting PII at ingest.',
      },
      {
        term: 'TRANSFORMS',
        kind: 'concept',
        summary:
          'Props stanza key referencing transforms for routing, masking, or field extraction.',
      },
      {
        term: 'CLONE_SOURCETYPE',
        kind: 'concept',
        summary:
          'Duplicates events into another sourcetype for alternate parsing without double ingest volume.',
      },
    ],
  },
  {
    id: 'installing-managing-apps',
    title: 'Installing and Managing Apps',
    overview:
      'Apps bundle knowledge objects, dashboards, and inputs—install from Splunkbase or private repositories following Cloud vetting rules. Track dependencies, versioning, and upgrade windows to avoid breaking searches during schema changes.',
    referenceUrls: [
      {
        label: 'Apps and customizations for Splunk Cloud',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/developing-views-and-apps-for-splunk-web',
      },
      {
        label: 'Splunkbase',
        url: 'https://splunkbase.splunk.com/',
      },
    ],
    entries: [
      {
        term: 'Splunkbase',
        kind: 'concept',
        summary:
          'Official marketplace for Splunk-supported and community apps—verify Cloud compatibility badges.',
      },
      {
        term: 'app context',
        kind: 'concept',
        summary:
          'Knowledge objects resolve within namespace/user/app scope—impacts sharing and troubleshooting.',
      },
      {
        term: 'private app',
        kind: 'concept',
        summary:
          'Customer-packaged configuration shipped via deployment mechanisms—follow naming/version discipline.',
      },
    ],
  },
  {
    id: 'splunk-cloud-support',
    title: 'Working with Splunk Cloud Support',
    overview:
      'Operational issues escalate through Splunk support portals with clear severity, impacted stacks, and diagnostics (diag bundles when permitted). Understand entitlement boundaries, scheduled maintenance communications, and compliance artifacts available for regulated industries.',
    referenceUrls: [
      {
        label: 'Contact Splunk support',
        url: 'https://www.splunk.com/en_us/support-and-services.html',
      },
      {
        label: 'Splunk Cloud status',
        url: 'https://status.splunkcloud.com/',
      },
    ],
    entries: [
      {
        term: 'support case',
        kind: 'concept',
        summary:
          'Tracked ticket describing reproduction, urgency, and tenant identifiers—attach logs per Splunk guidance.',
      },
      {
        term: 'diag',
        kind: 'concept',
        summary:
          'Diagnostic bundle collecting logs/configuration snapshots—sanitize before sharing externally.',
      },
      {
        term: 'maintenance window',
        kind: 'concept',
        summary:
          'Scheduled platform updates—monitor notifications for breaking changes to endpoints or TLS roots.',
      },
    ],
  },
]
