import type { Question } from '../../../types'

/** Domains 1–6 of Cloud Admin blueprint (40 questions). */
export const cloudAdminChunk1: Question[] = [
  // --- 1.0 Splunk Cloud Overview (5) ---
  {
    id: 'ca-co-001',
    domainId: 'cloud-overview',
    stem: 'Which statement best describes Splunk Cloud Platform administration versus Enterprise on-premises?',
    choices: [
      'You maintain OS-level Splunk binaries and kernel tuning on indexers Splunk hosts for you',
      'Splunk operates the service infrastructure; you configure tenant settings within cloud policies',
      'Splunk Cloud cannot use universal forwarders',
      'All configuration is limited to search heads only',
    ],
    correctIndex: 1,
    explanation:
      'Splunk Cloud is SaaS: Splunk runs the platform while customers administer apps, inputs, security, and data policies within allowed interfaces.',
    docLinks: [
      {
        label: 'Splunk Cloud Platform help',
        url: 'https://help.splunk.com/en/splunk-cloud-platform',
      },
    ],
  },
  {
    id: 'ca-co-002',
    domainId: 'cloud-overview',
    stem: 'Where do Splunk Cloud customers typically review service limits, maintenance, and region details?',
    choices: [
      'Only in outputs.conf on forwarders',
      'Splunk Cloud administration UI, release notes, and published service descriptions',
      'Exclusively in indexes.conf',
      'Universal forwarder internal logs only',
    ],
    correctIndex: 1,
    explanation:
      'Operational boundaries and features for Splunk Cloud are communicated via Splunk docs, release notes, Admin Manual, and in-product guidance.',
    docLinks: [
      {
        label: 'Admin Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/administer/admin-manual',
      },
    ],
  },
  {
    id: 'ca-co-003',
    domainId: 'cloud-overview',
    stem: 'Which connectivity pattern is common for sending data into Splunk Cloud?',
    choices: [
      'Only syslog without TLS',
      'Universal/heavy forwarders, HTTP Event Collector, and integrated agents per documented patterns',
      'SSH copy of buckets into /opt/splunk',
      'FTP uploads to search heads',
    ],
    correctIndex: 1,
    explanation:
      'Forwarders and HEC are standard ingestion paths to Splunk Cloud; specifics depend on deployment topology and security requirements.',
    docLinks: [
      {
        label: 'Forward and process data',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/forward-and-process-data/forwarding-and-receiving-data',
      },
    ],
  },
  {
    id: 'ca-co-004',
    domainId: 'cloud-overview',
    stem: 'Why might certain configuration files or settings be restricted or managed differently in Splunk Cloud?',
    choices: [
      'Splunk Cloud hides all logs from administrators',
      'Splunk operates the stack and constrains changes that affect stability, security, or multi-tenant isolation',
      'Cloud deployments never use indexes',
      'Apps cannot be installed in Splunk Cloud',
    ],
    correctIndex: 1,
    explanation:
      'Splunk manages the underlying OS and core services; customer-visible configuration aligns with safe operations and platform guarantees.',
    docLinks: [
      {
        label: 'Admin Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/administer/admin-manual',
      },
    ],
  },
  {
    id: 'ca-co-005',
    domainId: 'cloud-overview',
    stem: 'Which resource is the primary landing page for Splunk Cloud Platform documentation topics?',
    choices: [
      'help.splunk.com Splunk Cloud Platform section',
      'Only GitHub community forks',
      'Microsoft Docs',
      'RFC 5424 exclusively',
    ],
    correctIndex: 0,
    explanation:
      'Official Splunk Cloud Platform documentation is organized under Splunk Help for Cloud Platform.',
    docLinks: [
      {
        label: 'Splunk Cloud Platform',
        url: 'https://help.splunk.com/en/splunk-cloud-platform',
      },
    ],
  },
  // --- 2.0 Index Management (5) ---
  {
    id: 'ca-im-001',
    domainId: 'index-management',
    stem: 'What is the primary purpose of an index in Splunk?',
    choices: [
      'Store user passwords only',
      'Store and organize raw and indexed event data for search',
      'Replace forwarders entirely',
      'Compile SPL to Java bytecode',
    ],
    correctIndex: 1,
    explanation:
      'Indexes hold Splunk-processed data (rawdata journal, tsidx, metadata) so searches can retrieve events efficiently.',
    docLinks: [
      {
        label: 'Manage indexes (data management)',
        url: 'https://help.splunk.com/en/data-management/manage-splunk-enterprise-indexers/10.2/manage-indexes',
      },
    ],
  },
  {
    id: 'ca-im-002',
    domainId: 'index-management',
    stem: 'Which statement about default indexes such as main is most accurate?',
    choices: [
      'main cannot be searched',
      'main commonly exists as a general-purpose index unless policies dictate otherwise',
      'Only metrics data may enter main',
      'main is exclusively for internal Splunk logs',
    ],
    correctIndex: 1,
    explanation:
      'Many deployments send general operational data to main unless routing targets other indexes.',
    docLinks: [
      {
        label: 'Manage indexes',
        url: 'https://help.splunk.com/en/data-management/manage-splunk-enterprise-indexers/10.2/manage-indexes',
      },
    ],
  },
  {
    id: 'ca-im-003',
    domainId: 'index-management',
    stem: 'Retention of indexed data is primarily influenced by which factors?',
    choices: [
      'Only the forwarder hostname',
      'Frozen path policy, index volume settings, and lifecycle configuration',
      'Search head timezone only',
      'Number of concurrent dashboards',
    ],
    correctIndex: 1,
    explanation:
      'Retention ties to index configuration and storage policies such as frozen aging and size controls.',
    docLinks: [
      {
        label: 'How the indexer stores indexes',
        url: 'https://help.splunk.com/en/data-management/manage-splunk-enterprise-indexers/10.2/manage-index-storage/how-the-indexer-stores-indexes',
      },
    ],
  },
  {
    id: 'ca-im-004',
    domainId: 'index-management',
    stem: 'Why might administrators create separate indexes for different data classes?',
    choices: [
      'Indexes cannot coexist on one indexer',
      'To apply retention, access controls, and performance tuning per workload',
      'Separate indexes disable parsing',
      'Splunk mandates one index per forwarder',
    ],
    correctIndex: 1,
    explanation:
      'Dedicated indexes help isolate sensitive data, tune retention, and scope roles or searches.',
    docLinks: [
      {
        label: 'Create custom indexes',
        url: 'https://help.splunk.com/en/data-management/manage-splunk-enterprise-indexers/10.2/manage-indexes/create-custom-indexes',
      },
    ],
  },
  {
    id: 'ca-im-005',
    domainId: 'index-management',
    stem: 'Which role concept ties to whether a user can view data in a particular index?',
    choices: [
      'Only license pool assignment',
      'Search filters associated with roles that reference allowed indexes',
      'KV Store collections only',
      'Dashboard Studio theme',
    ],
    correctIndex: 1,
    explanation:
      'Roles commonly restrict searchable indexes via authorize.conf/search filters as part of RBAC.',
    docLinks: [
      {
        label: 'Manage users and security',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/administer/manage-users-and-security',
      },
    ],
  },
  // --- 3.0 Auth (5) ---
  {
    id: 'ca-aa-001',
    domainId: 'auth-authorization',
    stem: 'Splunk native authentication stores credentials where?',
    choices: [
      'Plaintext in props.conf',
      'Splunk’s internal authentication database on the instance',
      'Only on universal forwarders',
      'Exclusively in LDAP exclusively without Splunk involvement',
    ],
    correctIndex: 1,
    explanation:
      'Splunk maintains local user entries unless external authentication is configured.',
    docLinks: [
      {
        label: 'Manage users and security',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/administer/manage-users-and-security',
      },
    ],
  },
  {
    id: 'ca-aa-002',
    domainId: 'auth-authorization',
    stem: 'Which mechanism commonly maps enterprise identities into Splunk roles?',
    choices: [
      'props.conf transforms',
      'LDAP/SAML/OIDC integrations configured for Splunk authentication',
      'inputs.conf alone',
      'metrics.log parsing',
    ],
    correctIndex: 1,
    explanation:
      'Directory services or SSO integrations authenticate users and often assign Splunk roles via groups.',
    docLinks: [
      {
        label: 'Manage users and security',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/administer/manage-users-and-security',
      },
    ],
  },
  {
    id: 'ca-aa-003',
    domainId: 'auth-authorization',
    stem: 'Capabilities in Splunk primarily control what?',
    choices: [
      'Indexer disk RPM',
      'Which administrative or feature-level actions a role may perform',
      'Forwarder version numbering',
      'DNS TTL values',
    ],
    correctIndex: 1,
    explanation:
      'Capabilities authorize Splunk Web and CLI actions beyond data access (for example edit_users).',
    docLinks: [
      {
        label: 'Manage users and security',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/administer/manage-users-and-security',
      },
    ],
  },
  {
    id: 'ca-aa-004',
    domainId: 'auth-authorization',
    stem: 'Which practice reduces privilege sprawl for Splunk administrators?',
    choices: [
      'Grant admin to every analyst',
      'Use least-privilege roles mapped to job duties',
      'Share the splunk.secret file broadly',
      'Disable audit logs',
    ],
    correctIndex: 1,
    explanation:
      'Least privilege via curated roles and scoped indexes lowers risk of accidental or malicious changes.',
    docLinks: [
      {
        label: 'Manage users and security',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/administer/manage-users-and-security',
      },
    ],
  },
  {
    id: 'ca-aa-005',
    domainId: 'auth-authorization',
    stem: 'Multifactor or SSO requirements for Splunk Cloud are typically enforced by:',
    choices: [
      'props.conf STANZA only',
      'Identity provider integration and Splunk authentication settings aligned with org policy',
      'Deleting all roles',
      'Using only scripted inputs',
    ],
    correctIndex: 1,
    explanation:
      'Enterprise SSO/MFA policies integrate through SAML/OIDC providers configured alongside Splunk.',
    docLinks: [
      {
        label: 'Manage users and security',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/administer/manage-users-and-security',
      },
    ],
  },
  // --- 4.0 Configuration files (5) ---
  {
    id: 'ca-cf-001',
    domainId: 'configuration-files',
    stem: 'Which file commonly defines TCP/UDP inputs on a forwarder or indexer?',
    choices: [
      'indexes.conf',
      'inputs.conf',
      'savedsearches.conf',
      'visualizations.conf',
    ],
    correctIndex: 1,
    explanation:
      'inputs.conf declares listening ports, files, scripts, and remote ingestion endpoints.',
    docLinks: [
      {
        label: 'Get started with getting data in',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/get-data-in/get-started-with-getting-data-in',
      },
    ],
  },
  {
    id: 'ca-cf-002',
    domainId: 'configuration-files',
    stem: 'props.conf is primarily associated with which concerns?',
    choices: [
      'Defining license pools',
      'Parsing, line breaking, timestamps, transforms at parse time',
      'KV store replication factor',
      'Dashboard XML palette',
    ],
    correctIndex: 1,
    explanation:
      'props.conf controls host/source/sourcetype parsing rules and related transformations.',
    docLinks: [
      {
        label: 'Knowledge Management Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/manage-knowledge-objects/knowledge-management-manual',
      },
    ],
  },
  {
    id: 'ca-cf-003',
    domainId: 'configuration-files',
    stem: 'transforms.conf pairs with which configuration when routing or masking events?',
    choices: [
      'inputs.conf only without props',
      'props.conf references to transforms for routing, sed, extraction',
      'indexes.conf exclusively',
      'alert_actions.conf only',
    ],
    correctIndex: 1,
    explanation:
      'Transforms definitions are invoked from props via TRANSFORMS-* or related directives.',
    docLinks: [
      {
        label: 'Knowledge Management Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/manage-knowledge-objects/knowledge-management-manual',
      },
    ],
  },
  {
    id: 'ca-cf-004',
    domainId: 'configuration-files',
    stem: 'server.conf commonly controls which class of settings?',
    choices: [
      'Chart color palettes only',
      'Server-wide networking, clustering, and node roles',
      'Only KV permissions',
      'Only dashboard drilldown tokens',
    ],
    correctIndex: 1,
    explanation:
      'server.conf carries deployment-wide Splunk daemon configuration beyond single-app scope.',
    docLinks: [
      {
        label: 'Admin Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/administer/admin-manual',
      },
    ],
  },
  {
    id: 'ca-cf-005',
    domainId: 'configuration-files',
    stem: 'Configuration layering (system vs app vs user) affects:',
    choices: [
      'Nothing; Splunk ignores precedence',
      'Which definition wins when duplicate stanzas exist',
      'Only forwarders, never search heads',
      'License violations only',
    ],
    correctIndex: 1,
    explanation:
      'Splunk merges configuration with precedence: user > app > system defaults.',
    docLinks: [
      {
        label: 'Admin Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/administer/admin-manual',
      },
    ],
  },
  // --- 5.0 Getting Data in Cloud (15) ---
  {
    id: 'ca-gd-001',
    domainId: 'getting-data-in-cloud',
    stem: 'Universal Forwarders sending to Splunk Cloud typically require which credential artifact?',
    choices: [
      'outputs.conf password fields matching deployment server policies',
      'Authentication between forwarder and indexer tiers via certificates/credentials distributed during setup',
      'Only syslog broadcast',
      'Manual bucket copying nightly',
    ],
    correctIndex: 1,
    explanation:
      'Forwarders authenticate and encrypt data to receiving tiers using Splunk-managed certificates/tokens per onboarding guides.',
    docLinks: [
      {
        label: 'Universal Forwarder Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/forward-and-process-data/universal-forwarder-manual',
      },
    ],
  },
  {
    id: 'ca-gd-002',
    domainId: 'getting-data-in-cloud',
    stem: 'HTTP Event Collector (HEC) is best described as:',
    choices: [
      'A batch FTP daemon',
      'Token-authenticated HTTP(S) endpoint that accepts structured/unstructured events',
      'An indexer clustering protocol',
      'A visualization studio',
    ],
    correctIndex: 1,
    explanation:
      'HEC exposes REST endpoints for agents and applications to POST events securely.',
    docLinks: [
      {
        label: 'Get started with getting data in',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/get-data-in/get-started-with-getting-data-in',
      },
    ],
  },
  {
    id: 'ca-gd-003',
    domainId: 'getting-data-in-cloud',
    stem: 'Why classify sourcetype during onboarding?',
    choices: [
      'It replaces indexes entirely',
      'It drives parsing rules, field extraction, and data model compatibility',
      'It disables TLS',
      'It removes timestamps',
    ],
    correctIndex: 1,
    explanation:
      'Sourcetype ties events to parsing configurations and knowledge objects.',
    docLinks: [
      {
        label: 'Get started with getting data in',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/get-data-in/get-started-with-getting-data-in',
      },
    ],
  },
  {
    id: 'ca-gd-004',
    domainId: 'getting-data-in-cloud',
    stem: 'Deployment Server / Forwarder Management helps administrators:',
    choices: [
      'Replace search peers',
      'Distribute apps and configuration bundles to forwarder fleets',
      'Compile SPL2-only pipelines without Splunk Cloud',
      'Resize AWS VMs automatically without APIs',
    ],
    correctIndex: 1,
    explanation:
      'Apps and TA bundles propagate via deployment methodology appropriate to Splunk Cloud + forwarder topology.',
    docLinks: [
      {
        label: 'Universal Forwarder Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/forward-and-process-data/universal-forwarder-manual',
      },
    ],
  },
  {
    id: 'ca-gd-005',
    domainId: 'getting-data-in-cloud',
    stem: 'When onboarding cloud SaaS APIs (for example via supported add-ons), administrators should:',
    choices: [
      'Disable TLS verification universally',
      'Follow Splunk-supported integration docs for credentials, scopes, and polling intervals',
      'Paste API secrets into dashboards',
      'Use anonymous SNMP only',
    ],
    correctIndex: 1,
    explanation:
      'Vendor integrations rely on documented credential stores, modular inputs, and secure polling.',
    docLinks: [
      {
        label: 'Splunk-supported add-ons',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/get-data-in/splunk-supported-add-ons',
      },
    ],
  },
  {
    id: 'ca-gd-006',
    domainId: 'getting-data-in-cloud',
    stem: 'Heavy Forwarders might be used when:',
    choices: [
      'Parsing must occur before forwarding and intermediate filtering is required',
      'Only when replacing indexers entirely',
      'Never; Splunk forbids heavy forwarders',
      'Only for GPU metrics',
    ],
    correctIndex: 0,
    explanation:
      'Heavy forwarders parse/transform prior to sending onward when architecture demands it.',
    docLinks: [
      {
        label: 'Forwarding and receiving data',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/forward-and-process-data/forwarding-and-receiving-data',
      },
    ],
  },
  {
    id: 'ca-gd-007',
    domainId: 'getting-data-in-cloud',
    stem: 'Which concern is most relevant when sizing forwarder pipelines for Splunk Cloud?',
    choices: [
      'Dashboard font selection',
      'Throughput, compression, ACK behavior, and network latency to ingest endpoints',
      'Browser cookie size',
      'Search head vCPU for pivot tables only',
    ],
    correctIndex: 1,
    explanation:
      'Steady-state EPS, payload sizes, and reliable forwarding settings influence performance.',
    docLinks: [
      {
        label: 'Forwarding and receiving data',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/forward-and-process-data/forwarding-and-receiving-data',
      },
    ],
  },
  {
    id: 'ca-gd-008',
    domainId: 'getting-data-in-cloud',
    stem: 'Data onboarding runbooks often require validating:',
    choices: [
      'Only CPU brand on laptops',
      'Host, source, sourcetype, index, and timestamp correctness on sample events',
      'Only KV store scope',
      'Only chart titles',
    ],
    correctIndex: 1,
    explanation:
      'Check fields and _time to ensure routing/parsing meet expectations before wide rollout.',
    docLinks: [
      {
        label: 'Get started with getting data in',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/get-data-in/get-started-with-getting-data-in',
      },
    ],
  },
  {
    id: 'ca-gd-009',
    domainId: 'getting-data-in-cloud',
    stem: 'When using indexer acknowledgement with forwarders, what risk is reduced?',
    choices: [
      'Dashboard licensing',
      'Silent data loss when downstream acknowledgement fails',
      'Need for DNS',
      'Requirement for sourcetypes',
    ],
    correctIndex: 1,
    explanation:
      'Indexer ACK helps confirm events persisted before forwarders discard local queues.',
    docLinks: [
      {
        label: 'Forwarding and receiving data',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/forward-and-process-data/forwarding-and-receiving-data',
      },
    ],
  },
  {
    id: 'ca-gd-010',
    domainId: 'getting-data-in-cloud',
    stem: 'Apps and add-ons for onboarding commonly ship:',
    choices: [
      'Only GPU drivers',
      'Inputs, props/transforms, lookups, and dashboards tuned to a vendor product',
      'Replacement kernels',
      'Anti-virus signatures',
    ],
    correctIndex: 1,
    explanation:
      'Technology add-ons bundle knowledge objects that normalize vendor logs.',
    docLinks: [
      {
        label: 'Splunk-supported add-ons',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/get-data-in/splunk-supported-add-ons',
      },
    ],
  },
  {
    id: 'ca-gd-011',
    domainId: 'getting-data-in-cloud',
    stem: 'Metrics pipelines differ from event pipelines primarily because:',
    choices: [
      'Metrics cannot be searched',
      'Metrics often leverage dedicated metrics indexes and structured measurements',
      'Metrics skip authentication',
      'Metrics always bypass forwarders',
    ],
    correctIndex: 1,
    explanation:
      'Metrics workflows emphasize numeric time series and may use metrics indexes.',
    docLinks: [
      {
        label: 'Metrics',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/get-data-in/metrics',
      },
    ],
  },
  {
    id: 'ca-gd-012',
    domainId: 'getting-data-in-cloud',
    stem: 'Which setting family controls listening ports for syslog reception?',
    choices: [
      'indexes.conf',
      'inputs.conf [udp/tcp] stanzas',
      'savedsearches.conf',
      'transactiontypes.conf',
    ],
    correctIndex: 1,
    explanation:
      'Syslog receivers are declared via network inputs in inputs.conf.',
    docLinks: [
      {
        label: 'Get started with getting data in',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/get-data-in/get-started-with-getting-data-in',
      },
    ],
  },
  {
    id: 'ca-gd-013',
    domainId: 'getting-data-in-cloud',
    stem: 'Why use intermediate forwarding tiers (heavy/intermediate forwarders)?',
    choices: [
      'To eliminate indexes entirely',
      'To preprocess, filter, or route data closer to the edge',
      'To replace KV Store',
      'To host Splunk Web UI',
    ],
    correctIndex: 1,
    explanation:
      'Intermediate tiers aggregate or parse before sending onward to Splunk Cloud ingest endpoints.',
    docLinks: [
      {
        label: 'Forwarding and receiving data',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/forward-and-process-data/forwarding-and-receiving-data',
      },
    ],
  },
  {
    id: 'ca-gd-014',
    domainId: 'getting-data-in-cloud',
    stem: 'Credential storage for modular inputs should leverage:',
    choices: [
      'Plaintext in dashboards',
      'Splunk-supported secret storage / credential endpoints per integration guidance',
      'Public GitHub gists',
      'Sticky notes on monitors',
    ],
    correctIndex: 1,
    explanation:
      'Use Splunk secret mechanisms rather than embedding secrets in clear text.',
    docLinks: [
      {
        label: 'Splunk-supported add-ons',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/get-data-in/splunk-supported-add-ons',
      },
    ],
  },
  {
    id: 'ca-gd-015',
    domainId: 'getting-data-in-cloud',
    stem: 'After configuring new inputs, validation commonly includes:',
    choices: [
      'Deleting all indexes',
      'Searching recent events, verifying fields, and monitoring pipeline metrics',
      'Removing props.conf',
      'Disabling TLS on forwarders',
    ],
    correctIndex: 1,
    explanation:
      'Operational acceptance verifies volumes, latency, and parsing accuracy.',
    docLinks: [
      {
        label: 'Get started with getting data in',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/get-data-in/get-started-with-getting-data-in',
      },
    ],
  },
  // --- 6.0 Forwarder Management (5) ---
  {
    id: 'ca-fm-001',
    domainId: 'forwarder-management',
    stem: 'Which component is responsible for collecting host logs and forwarding to Splunk Cloud?',
    choices: [
      'Search head deployer only',
      'Universal Forwarder or other Splunk forwarders configured with outputs',
      'KV Store',
      'Dashboard Studio exclusively',
    ],
    correctIndex: 1,
    explanation:
      'Forwarders gather data locally and send to indexers or ingest endpoints.',
    docLinks: [
      {
        label: 'Universal Forwarder Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/forward-and-process-data/universal-forwarder-manual',
      },
    ],
  },
  {
    id: 'ca-fm-002',
    domainId: 'forwarder-management',
    stem: 'Deployment server functionality primarily:',
    choices: [
      'Hosts Splunk Web for users',
      'Centralizes distribution of apps/config to qualifying clients',
      'Runs searches only',
      'Stores frozen buckets exclusively',
    ],
    correctIndex: 1,
    explanation:
      'Deployment servers push apps and serverclasses to forwarders/heavy clients per policies.',
    docLinks: [
      {
        label: 'Universal Forwarder Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/forward-and-process-data/universal-forwarder-manual',
      },
    ],
  },
  {
    id: 'ca-fm-003',
    domainId: 'forwarder-management',
    stem: 'Forwarder logs such as splunkd.log help troubleshoot:',
    choices: [
      'Browser CSS issues',
      'Connection failures, acknowledgement errors, and parsing warnings',
      'Chart legends',
      'GPU fan speeds',
    ],
    correctIndex: 1,
    explanation:
      'splunkd.log on forwarders surfaces ingestion and connectivity errors.',
    docLinks: [
      {
        label: 'Universal Forwarder Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/forward-and-process-data/universal-forwarder-manual',
      },
    ],
  },
  {
    id: 'ca-fm-004',
    domainId: 'forwarder-management',
    stem: 'Which statement about UF versus HF is accurate?',
    choices: [
      'UF cannot forward logs',
      'HF can parse/filter locally; UF is lightweight with minimal parsing',
      'HF cannot send to Splunk Cloud',
      'UF requires GPU acceleration',
    ],
    correctIndex: 1,
    explanation:
      'Heavy forwarders support parsing pipelines; universal forwarders remain slim collectors.',
    docLinks: [
      {
        label: 'Forwarding and receiving data',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/forward-and-process-data/forwarding-and-receiving-data',
      },
    ],
  },
  {
    id: 'ca-fm-005',
    domainId: 'forwarder-management',
    stem: 'Managing forwarder versions across fleets benefits from:',
    choices: [
      'Random upgrades without testing',
      'Standard images, deployment tiers, and compatibility checks with Splunk Cloud stack',
      'Deleting deployment server',
      'Removing TLS',
    ],
    correctIndex: 1,
    explanation:
      'Operational hygiene ensures compatibility with Splunk Cloud ingest endpoints.',
    docLinks: [
      {
        label: 'Universal Forwarder Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/forward-and-process-data/universal-forwarder-manual',
      },
    ],
  },
]
