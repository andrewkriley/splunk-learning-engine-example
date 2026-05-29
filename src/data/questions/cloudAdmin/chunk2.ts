import type { Question } from '../../../types'

/** Domains 7–13 of Cloud Admin blueprint (36 questions). */
export const cloudAdminChunk2: Question[] = [
  // --- 7.0 Monitor inputs (9) ---
  {
    id: 'ca-mi-001',
    domainId: 'monitor-inputs',
    stem: 'A monitor:// input ingests data by:',
    choices: [
      'Polling REST endpoints exclusively',
      'Watching files/directories for new content and tracking read positions',
      'SSH interactive shells',
      'Rendering dashboards',
    ],
    correctIndex: 1,
    explanation:
      'Monitor inputs tail files, rotating logs as configured, recording checkpoints.',
    docLinks: [
      {
        label: 'Get started with getting data in',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/get-data-in/get-started-with-getting-data-in',
      },
    ],
  },
  {
    id: 'ca-mi-002',
    domainId: 'monitor-inputs',
    stem: 'Which concern is common when monitoring rolling log files?',
    choices: [
      'Ignoring file rotation completely',
      'Handling rename/truncate rotation without duplicating or skipping events',
      'Disabling checksums intentionally',
      'Removing sourcetypes',
    ],
    correctIndex: 1,
    explanation:
      'Rotation schemes require Splunk to follow inode/name changes properly.',
    docLinks: [
      {
        label: 'Get started with getting data in',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/get-data-in/get-started-with-getting-data-in',
      },
    ],
  },
  {
    id: 'ca-mi-003',
    domainId: 'monitor-inputs',
    stem: 'Blacklist/whitelist settings help administrators:',
    choices: [
      'Tune chart colors',
      'Include or exclude file patterns under monitored paths',
      'Resize index buckets manually',
      'Compile SPL2 macros',
    ],
    correctIndex: 1,
    explanation:
      'Pattern filters reduce noise or scope ingestion to relevant filenames.',
    docLinks: [
      {
        label: 'Get started with getting data in',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/get-data-in/get-started-with-getting-data-in',
      },
    ],
  },
  {
    id: 'ca-mi-004',
    domainId: 'monitor-inputs',
    stem: 'Why set correct ignoreOlderThan or similar controls?',
    choices: [
      'To ingest historical files accidentally copied into monitored folders',
      'To avoid flooding with stale backlog files unless intentional',
      'To disable TLS',
      'To merge indexes automatically',
    ],
    correctIndex: 1,
    explanation:
      'Administrators limit accidental ingestion of huge historical dumps.',
    docLinks: [
      {
        label: 'Get started with getting data in',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/get-data-in/get-started-with-getting-data-in',
      },
    ],
  },
  {
    id: 'ca-mi-005',
    domainId: 'monitor-inputs',
    stem: 'Which statement about permissions on monitored paths is accurate?',
    choices: [
      'Splunk never needs read access',
      'Forwarder/OS accounts must read files under surveillance',
      'Only root may forward logs',
      'ACLs are irrelevant',
    ],
    correctIndex: 1,
    explanation:
      'Forwarders run as service accounts needing filesystem ACL rights.',
    docLinks: [
      {
        label: 'Universal Forwarder Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/forward-and-process-data/universal-forwarder-manual',
      },
    ],
  },
  {
    id: 'ca-mi-006',
    domainId: 'monitor-inputs',
    stem: 'batch vs monitor semantics differ in that batch:',
    choices: [
      'Streams forever',
      'One-shot read (often for static dumps) versus continuous monitoring',
      'Always deletes OS files',
      'Cannot specify sourcetype',
    ],
    correctIndex: 1,
    explanation:
      'Batch inputs ingest once from files while monitor tails continuously.',
    docLinks: [
      {
        label: 'Get started with getting data in',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/get-data-in/get-started-with-getting-data-in',
      },
    ],
  },
  {
    id: 'ca-mi-007',
    domainId: 'monitor-inputs',
    stem: 'Windows vs Linux monitor paths require:',
    choices: [
      'Identical forwarder binaries only',
      'Platform-appropriate path notation and service accounts',
      'Disabling Splunk Cloud entirely',
      'Same hostname everywhere',
    ],
    correctIndex: 1,
    explanation:
      'Administrators adapt paths, permissions, and optional WMI perf inputs.',
    docLinks: [
      {
        label: 'Universal Forwarder Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/forward-and-process-data/universal-forwarder-manual',
      },
    ],
  },
  {
    id: 'ca-mi-008',
    domainId: 'monitor-inputs',
    stem: 'When monitoring Docker/Kubernetes logs, best practice includes:',
    choices: [
      'Disable metadata tagging',
      'Collect stdout/stderr paths or logging agents aligned with orchestrator docs',
      'Disable indexes entirely',
      'Random sourcetypes',
    ],
    correctIndex: 1,
    explanation:
      'Container logs often flow via journal paths or sidecars following Splunk guidance.',
    docLinks: [
      {
        label: 'Get started with getting data in',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/get-data-in/get-started-with-getting-data-in',
      },
    ],
  },
  {
    id: 'ca-mi-009',
    domainId: 'monitor-inputs',
    stem: 'If monitored files show zero events, first checks often include:',
    choices: [
      'Deleting inputs.conf',
      'Permissions, wrong path, ignoreOlderThan, or wrong host forwarding outputs',
      'Changing chart themes',
      'Removing KV Store',
    ],
    correctIndex: 1,
    explanation:
      'Validate UF settings, outputs, and filesystem readability before deep debugging.',
    docLinks: [
      {
        label: 'Universal Forwarder Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/forward-and-process-data/universal-forwarder-manual',
      },
    ],
  },
  // --- 8.0 Network & other inputs (6) ---
  {
    id: 'ca-ni-001',
    domainId: 'network-other-inputs',
    stem: 'TCP/UDP inputs often require defining:',
    choices: [
      'Only dashboards',
      'Host restriction, connection_host values, and sourcetype/index routing',
      'KV Store collections',
      'Machine learning models',
    ],
    correctIndex: 1,
    explanation:
      'Network receivers specify ports, protocols, and metadata for inbound syslog/custom streams.',
    docLinks: [
      {
        label: 'Get started with getting data in',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/get-data-in/get-started-with-getting-data-in',
      },
    ],
  },
  {
    id: 'ca-ni-002',
    domainId: 'network-other-inputs',
    stem: 'Syslog-ng/rsyslog forwarding to Splunk commonly uses:',
    choices: [
      'FTP passive ports',
      'UDP/TCP syslog receivers or Splunk Connect for Syslog architectures',
      'SMTP exclusively',
      'RDP',
    ],
    correctIndex: 1,
    explanation:
      'Enterprise syslog architectures terminate at Splunk network inputs or SC4S.',
    docLinks: [
      {
        label: 'Collect stream data',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/collect-stream-data/install-and-configure-splunk-stream',
      },
    ],
  },
  {
    id: 'ca-ni-003',
    domainId: 'network-other-inputs',
    stem: 'Splunk Connect for Syslog (SC4S) primarily:',
    choices: [
      'Runs Splunk Web UI',
      'Provides scalable syslog ingestion with metadata enrichment patterns',
      'Compiles Android APKs',
      'Stores frozen buckets',
    ],
    correctIndex: 1,
    explanation:
      'SC4S is a reference architecture for high-volume syslog ingest.',
    docLinks: [
      {
        label: 'Get started with getting data in',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/get-data-in/get-started-with-getting-data-in',
      },
    ],
  },
  {
    id: 'ca-ni-004',
    domainId: 'network-other-inputs',
    stem: 'Windows perfmon inputs gather:',
    choices: [
      'Linux iptables',
      'Operating system performance counters via scripted/perfmon mechanisms',
      'Only firewall syslog',
      'Router NetFlow exclusively without Stream',
    ],
    correctIndex: 1,
    explanation:
      'Perfmon inputs capture CPU, memory, disk, and app counters on Windows endpoints.',
    docLinks: [
      {
        label: 'Universal Forwarder Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/forward-and-process-data/universal-forwarder-manual',
      },
    ],
  },
  {
    id: 'ca-ni-005',
    domainId: 'network-other-inputs',
    stem: 'NetFlow/IPFIX ingestion commonly relies on:',
    choices: [
      'KV Store',
      'Splunk Stream or specialized network capture apps plus heavy UF sizing',
      'Dashboard Studio tokens',
      'props.conf only without inputs',
    ],
    correctIndex: 1,
    explanation:
      'Flow protocols usually require Stream TA or partner collectors feeding Splunk.',
    docLinks: [
      {
        label: 'Collect stream data',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/collect-stream-data/install-and-configure-splunk-stream',
      },
    ],
  },
  {
    id: 'ca-ni-006',
    domainId: 'network-other-inputs',
    stem: 'When exposing UDP syslog receivers, administrators should:',
    choices: [
      'Never document firewall rules',
      'Apply least-access firewall zones and monitor for amplification abuse',
      'Disable authentication everywhere',
      'Bind to public Internet without ACLs',
    ],
    correctIndex: 1,
    explanation:
      'UDP syslog must be defended against spoofed flood sources via network ACLs.',
    docLinks: [
      {
        label: 'Get started with getting data in',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/get-data-in/get-started-with-getting-data-in',
      },
    ],
  },
  // --- 9.0 Fine-tuning inputs (3) ---
  {
    id: 'ca-ft-001',
    domainId: 'fine-tuning-inputs',
    stem: 'Props.conf TIME_PREFIX/TIME_FORMAT help with:',
    choices: [
      'Dashboard branding',
      'Accurate timestamp extraction from heterogeneous log formats',
      'KV replication',
      'Search peer replication ports',
    ],
    correctIndex: 1,
    explanation:
      'Explicit timestamp rules reduce incorrect _time assignments.',
    docLinks: [
      {
        label: 'Knowledge Management Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/manage-knowledge-objects/knowledge-management-manual',
      },
    ],
  },
  {
    id: 'ca-ft-002',
    domainId: 'fine-tuning-inputs',
    stem: 'LINE_BREAKER / TRUNCATE settings primarily tune:',
    choices: [
      'License pools',
      'How Multiline events assemble and maximum event sizes',
      'Search macros',
      'Alert throttle schedules',
    ],
    correctIndex: 1,
    explanation:
      'Multiline regex defines event boundaries for stack traces and XML payloads.',
    docLinks: [
      {
        label: 'Knowledge Management Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/manage-knowledge-objects/knowledge-management-manual',
      },
    ],
  },
  {
    id: 'ca-ft-003',
    domainId: 'fine-tuning-inputs',
    stem: 'Which scenario warrants raising max_events or related parsing limits?',
    choices: [
      'Always, regardless of size',
      'Very large single events such as JSON blobs exceeding defaults',
      'Never; Splunk forbids tuning',
      'Only for dashboards',
    ],
    correctIndex: 1,
    explanation:
      'Administrators cautiously raise limits when legitimate events exceed parser defaults.',
    docLinks: [
      {
        label: 'Knowledge Management Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/manage-knowledge-objects/knowledge-management-manual',
      },
    ],
  },
  // --- 10.0 Parsing / data preview (6) ---
  {
    id: 'ca-pp-001',
    domainId: 'parsing-data-preview',
    stem: 'Interactive Data Preview (field extractor) helps validate:',
    choices: [
      'GPU shaders',
      'Regex extractions and preview parsed fields before deployment',
      'License master elections',
      'KV lease durations exclusively',
    ],
    correctIndex: 1,
    explanation:
      'Preview ensures extractions capture groups without breaking performance.',
    docLinks: [
      {
        label: 'Knowledge Management Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/manage-knowledge-objects/knowledge-management-manual',
      },
    ],
  },
  {
    id: 'ca-pp-002',
    domainId: 'parsing-data-preview',
    stem: 'FIELDALIAS versus EXTRACT differs because FIELDALIAS:',
    choices: [
      'Deletes raw data',
      'Creates alternate names for existing extracted fields without regex capture',
      'Always runs on indexers only',
      'Cannot reference sourcetype',
    ],
    correctIndex: 1,
    explanation:
      'Aliases map fields while extractions define how to pull values.',
    docLinks: [
      {
        label: 'Knowledge Management Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/manage-knowledge-objects/knowledge-management-manual',
      },
    ],
  },
  {
    id: 'ca-pp-003',
    domainId: 'parsing-data-preview',
    stem: 'SEDCMD in props can:',
    choices: [
      'Rotate buckets manually',
      'Mask or rewrite sensitive substrings at ingest parse time',
      'Compile SPL2 queries',
      'Replace license master',
    ],
    correctIndex: 1,
    explanation:
      'Streaming sed commands scrub PII before storage.',
    docLinks: [
      {
        label: 'Knowledge Management Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/manage-knowledge-objects/knowledge-management-manual',
      },
    ],
  },
  {
    id: 'ca-pp-004',
    domainId: 'parsing-data-preview',
    stem: 'Structured data inputs such as CSV might use:',
    choices: [
      'INDEXED_EXTRACTIONS settings for header-based field extraction',
      'Only raw TCP without parsing',
      'KV Store alone',
      'transactiontypes.conf exclusively',
    ],
    correctIndex: 0,
    explanation:
      'Indexed extractions enable field discovery at parse time for structured files.',
    docLinks: [
      {
        label: 'Configure indexed field extraction',
        url: 'https://help.splunk.com/en/data-management/get-data-in/get-data-into-splunk-enterprise/10.2/configure-indexed-field-extraction',
      },
    ],
  },
  {
    id: 'ca-pp-005',
    domainId: 'parsing-data-preview',
    stem: 'Why test parsing changes on sample events before production rollout?',
    choices: [
      'To increase licensing randomly',
      'To avoid breaking _time, destroying fields, or causing search-time mismatches',
      'Because Splunk forbids testing',
      'To delete archives',
    ],
    correctIndex: 1,
    explanation:
      'Validate regex cost, field cardinality, and correctness on representative samples.',
    docLinks: [
      {
        label: 'Knowledge Management Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/manage-knowledge-objects/knowledge-management-manual',
      },
    ],
  },
  {
    id: 'ca-pp-006',
    domainId: 'parsing-data-preview',
    stem: 'Breaking master regex into smaller transforms can:',
    choices: [
      'Always hurt performance',
      'Improve maintainability and targeted routing for complex pipelines',
      'Disable parsing entirely',
      'Remove sourcetypes',
    ],
    correctIndex: 1,
    explanation:
      'Modular transforms simplify troubleshooting complex event flows.',
    docLinks: [
      {
        label: 'Knowledge Management Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/manage-knowledge-objects/knowledge-management-manual',
      },
    ],
  },
  // --- 11.0 Manipulating raw data (6) ---
  {
    id: 'ca-mr-001',
    domainId: 'manipulating-raw-data',
    stem: 'Routing data to different indexes often uses:',
    choices: [
      'props transforms with DEST_KEY _MetaData:Index',
      'savedsearches.conf only',
      'Dashboard XML',
      'outputs.conf Server settings',
    ],
    correctIndex: 0,
    explanation:
      'Transforms can set metadata keys during parsing to change index routing.',
    docLinks: [
      {
        label: 'Knowledge Management Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/manage-knowledge-objects/knowledge-management-manual',
      },
    ],
  },
  {
    id: 'ca-mr-002',
    domainId: 'manipulating-raw-data',
    stem: 'Anonymizing sensitive fields before indexing typically leverages:',
    choices: [
      'Only chart legends',
      'SEDCMD or transforms that replace patterns at parse time',
      'Deleting props.conf entirely',
      'KV replication factor',
    ],
    correctIndex: 1,
    explanation:
      'Regex replacements scrub secrets before storage while preserving analytics usefulness.',
    docLinks: [
      {
        label: 'Knowledge Management Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/manage-knowledge-objects/knowledge-management-manual',
      },
    ],
  },
  {
    id: 'ca-mr-003',
    domainId: 'manipulating-raw-data',
    stem: 'If source logs use an unexpected character encoding, administrators often correct parsing by:',
    choices: [
      'Deleting the index mid-search',
      'Aligning CHARSET / structured parsing settings in props with the actual encoding',
      'Removing sourcetype definitions entirely',
      'Disabling all forwarders globally',
    ],
    correctIndex: 1,
    explanation:
      'Character-set mismatches garble fields; props CHARSET and vendor guidance restore readable raw text.',
    docLinks: [
      {
        label: 'Knowledge Management Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/manage-knowledge-objects/knowledge-management-manual',
      },
    ],
  },
  {
    id: 'ca-mr-004',
    domainId: 'manipulating-raw-data',
    stem: 'Event breaking issues after ingestion often trace back to:',
    choices: [
      'Dashboard CSS',
      'Incorrect LINE_BREAKER or mis-set SHOULD_LINEMERGE',
      'KV Store alone',
      'Only alert emails',
    ],
    correctIndex: 1,
    explanation:
      'Multiline regex mistakes merge/split events improperly.',
    docLinks: [
      {
        label: 'Knowledge Management Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/manage-knowledge-objects/knowledge-management-manual',
      },
    ],
  },
  {
    id: 'ca-mr-005',
    domainId: 'manipulating-raw-data',
    stem: 'Using CLONE_SOURCETYPE transforms helps when:',
    choices: [
      'You need identical events parsed differently downstream',
      'You delete indexes',
      'You replace TLS certificates manually each hour',
      'You disable apps',
    ],
    correctIndex: 0,
    explanation:
      'Cloning feeds alternate parsing pipelines while preserving raw capture once.',
    docLinks: [
      {
        label: 'Knowledge Management Manual',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/manage-knowledge-objects/knowledge-management-manual',
      },
    ],
  },
  {
    id: 'ca-mr-006',
    domainId: 'manipulating-raw-data',
    stem: 'Ingest actions (cloud feature area) may allow:',
    choices: [
      'Routing/filtering events closer to ingestion according to product capabilities',
      'Removing forwarders entirely',
      'Disabling all indexes',
      'Writing searches without SPL',
    ],
    correctIndex: 0,
    explanation:
      'Ingest actions apply SPL2-like processing during ingestion for Splunk Cloud Platform.',
    docLinks: [
      {
        label: 'Ingest actions',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/forward-and-process-data/ingest-actions',
      },
    ],
  },
  // --- 12.0 Apps (3) ---
  {
    id: 'ca-ap-001',
    domainId: 'installing-managing-apps',
    stem: 'Splunk apps are primarily packaged as:',
    choices: [
      'Docker images only',
      'Directories under $SPLUNK_HOME/etc/apps with metadata and components',
      'ISO installers exclusively',
      'Binary ELF patches',
    ],
    correctIndex: 1,
    explanation:
      'Apps bundle conf, dashboards, and binaries within Splunk conventions.',
    docLinks: [
      {
        label: 'Developing views and apps',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/developing-views-and-apps-for-splunk-web',
      },
    ],
  },
  {
    id: 'ca-ap-002',
    domainId: 'installing-managing-apps',
    stem: 'Which file declares app dependencies and visibility?',
    choices: [
      'indexes.conf',
      'app.conf [install] stanza and related metadata',
      'alert_actions.conf',
      'outputs.conf',
    ],
    correctIndex: 1,
    explanation:
      'app.conf describes label, version, dependencies, and UI visibility.',
    docLinks: [
      {
        label: 'Developing views and apps',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/developing-views-and-apps-for-splunk-web',
      },
    ],
  },
  {
    id: 'ca-ap-003',
    domainId: 'installing-managing-apps',
    stem: 'Private apps versus Splunkbase-published apps differ in:',
    choices: [
      'Apps cannot be private',
      'Distribution method and vetting; Splunkbase apps follow publishing workflow',
      'Private apps lack dashboards',
      'Splunkbase forbids TAs',
    ],
    correctIndex: 1,
    explanation:
      'Customers install private apps via packaging while Splunkbase apps undergo listing processes.',
    docLinks: [
      {
        label: 'Splunkbase',
        url: 'https://splunkbase.splunk.com/',
      },
    ],
  },
  // --- 13.0 Splunk Cloud Support (3) ---
  {
    id: 'ca-su-001',
    domainId: 'splunk-cloud-support',
    stem: 'When opening Splunk Cloud support cases, most effective detail includes:',
    choices: [
      'Only “it is broken”',
      'Search heads impacted, correlation IDs, timeframe, and reproduction searches',
      'Random screenshots without context',
      'Passwords in plaintext',
    ],
    correctIndex: 1,
    explanation:
      'Support engineers need scope, correlation IDs, and reproduction data.',
    docLinks: [
      {
        label: 'Splunk Support',
        url: 'https://www.splunk.com/en_us/support-and-services.html',
      },
    ],
  },
  {
    id: 'ca-su-002',
    domainId: 'splunk-cloud-support',
    stem: 'Maintenance windows and upgrades for Splunk Cloud are typically:',
    choices: [
      'Never communicated',
      'Announced via Splunk communications and visible in admin interfaces/release notes',
      'Chosen solely by analysts',
      'Performed without testing',
    ],
    correctIndex: 1,
    explanation:
      'Splunk coordinates SaaS maintenance; customers monitor notices and release notes.',
    docLinks: [
      {
        label: 'Release notes',
        url: 'https://help.splunk.com/en/splunk-cloud-platform/release-notes',
      },
    ],
  },
  {
    id: 'ca-su-003',
    domainId: 'splunk-cloud-support',
    stem: 'Escalating performance issues often requires:',
    choices: [
      'Deleting indexes without backups',
      'Diagnostic bundles, search job inspector exports, and deployment topology diagrams',
      'Disabling authentication',
      'Ignoring Splunk guidance',
    ],
    correctIndex: 1,
    explanation:
      'Support bundles (diag) and reproducible searches accelerate root cause analysis.',
    docLinks: [
      {
        label: 'Splunk Support',
        url: 'https://www.splunk.com/en_us/support-and-services.html',
      },
    ],
  },
]
