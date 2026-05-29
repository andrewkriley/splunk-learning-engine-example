import type { Question } from '../../../types'
import { PU_DOCS } from './docs'

/** Domains 6–10 of Power User blueprint (35 questions). */
export const powerUserChunk2: Question[] = [
  // --- 6.0 Creating Tags and Event Types (7) ---
  {
    id: 'pu-te-001',
    domainId: 'pu-tags-event-types',
    stem: 'In Splunk, a tag is best described as:',
    choices: [
      'A scheduled search that emails results',
      'A knowledge object that labels field=value pairs for easier discovery and filtering',
      'An index-time extraction rule',
      'A type of forwarder input',
    ],
    correctIndex: 1,
    explanation:
      'Tags associate descriptive labels with specific field values so analysts can filter with tag=value syntax.',
    docLinks: [{ label: 'About tags', url: PU_DOCS.tags }],
  },
  {
    id: 'pu-te-002',
    domainId: 'pu-tags-event-types',
    stem: 'Which search syntax finds events tagged as web_error?',
    choices: [
      'tag::web_error',
      'tag=web_error',
      'eventtype=web_error',
      'lookup=web_error',
    ],
    correctIndex: 1,
    explanation:
      'Use tag=<tagname> in SPL to return events carrying that tag knowledge object.',
    docLinks: [{ label: 'About tags', url: PU_DOCS.tags }],
  },
  {
    id: 'pu-te-003',
    domainId: 'pu-tags-event-types',
    stem: 'An event type in Splunk is:',
    choices: [
      'A named search that categorizes matching events for reuse in searches and knowledge objects',
      'The sourcetype assigned at index time only',
      'A macro argument placeholder',
      'A bucket storage class',
    ],
    correctIndex: 0,
    explanation:
      'Event types encapsulate search criteria so users can reference eventtype=<name> instead of repeating complex SPL.',
    docLinks: [{ label: 'About event types', url: PU_DOCS.eventTypes }],
  },
  {
    id: 'pu-te-004',
    domainId: 'pu-tags-event-types',
    stem: 'Which statement about event types versus tags is most accurate?',
    choices: [
      'Tags replace the need for sourcetypes',
      'Event types categorize events via saved search logic; tags label specific field values',
      'Event types can only be created at index time',
      'Tags require admin-only permissions while event types do not',
    ],
    correctIndex: 1,
    explanation:
      'Event types define categories of events; tags annotate particular field=value combinations—both are knowledge objects with different roles.',
    docLinks: [
      { label: 'About event types', url: PU_DOCS.eventTypes },
      { label: 'About tags', url: PU_DOCS.tags },
    ],
  },
  {
    id: 'pu-te-005',
    domainId: 'pu-tags-event-types',
    stem: 'When defining an event type, Splunk typically prompts you to base it on:',
    choices: [
      'An existing search whose results represent the events you want to classify',
      'A transforms.conf stanza only',
      'An HEC token',
      'A serverclass name',
    ],
    correctIndex: 0,
    explanation:
      'Event types are usually created from a representative search; Splunk stores that criteria as the event type definition.',
    docLinks: [{ label: 'About event types', url: PU_DOCS.eventTypes }],
  },
  {
    id: 'pu-te-006',
    domainId: 'pu-tags-event-types',
    stem: 'Why might an administrator tag the field/value pair status=404 on web access events?',
    choices: [
      'To change the index routing permanently',
      'To let users quickly filter or report on HTTP 404 responses using tag=status404 (or similar)',
      'To disable field extraction for status',
      'To encrypt the status field',
    ],
    correctIndex: 1,
    explanation:
      'Tags make recurring value filters discoverable and reusable across searches, dashboards, and reports.',
    docLinks: [{ label: 'About tags', url: PU_DOCS.tags }],
  },
  {
    id: 'pu-te-007',
    domainId: 'pu-tags-event-types',
    stem: 'Event types and tags, like other knowledge objects, support:',
    choices: [
      'Only global visibility with no ownership',
      'App scope, permissions, and sharing controls per role',
      'Automatic deletion after 24 hours',
      'Compilation into indexed raw data',
    ],
    correctIndex: 1,
    explanation:
      'Knowledge object permissions determine who can view or edit tags and event types within apps or globally.',
    docLinks: [
      { label: 'Knowledge Management Manual', url: PU_DOCS.knowledgeManual },
      { label: 'About event types', url: PU_DOCS.eventTypes },
    ],
  },

  // --- 7.0 Creating and Using Macros (7) ---
  {
    id: 'pu-ma-001',
    domainId: 'pu-macros',
    stem: 'A search macro is primarily used to:',
    choices: [
      'Store reusable SPL fragments that expand when invoked in searches',
      'Compress index buckets',
      'Schedule forwarder upgrades',
      'Replace data models in Pivot',
    ],
    correctIndex: 0,
    explanation:
      'Macros encapsulate common search logic so teams share consistent, maintainable SPL.',
    docLinks: [{ label: 'About search macros', url: PU_DOCS.macros }],
  },
  {
    id: 'pu-ma-002',
    domainId: 'pu-macros',
    stem: 'In macro definition syntax, how are arguments represented?',
    choices: [
      'With $argument_name$ placeholders in the macro body',
      'With ${env:VAR} shell variables',
      'With angle brackets <arg>',
      'With double hash marks ##arg##',
    ],
    correctIndex: 0,
    explanation:
      'Macro arguments use dollar-delimited names such as $host$ that callers supply when invoking the macro.',
    docLinks: [{ label: 'About search macros', url: PU_DOCS.macros }],
  },
  {
    id: 'pu-ma-003',
    domainId: 'pu-macros',
    stem: 'Which invocation correctly calls a macro named failed_login with argument user=admin?',
    choices: [
      'macro failed_login(user=admin)',
      '`failed_login(admin)`',
      'eventtype=failed_login(admin)',
      'lookup failed_login admin',
    ],
    correctIndex: 1,
    explanation:
      'Macros are invoked with backticks: `macro_name(arg1)` or `` `macro_name` `` when no arguments are required.',
    docLinks: [{ label: 'About search macros', url: PU_DOCS.macros }],
  },
  {
    id: 'pu-ma-004',
    domainId: 'pu-macros',
    stem: 'Argument validation on a search macro helps administrators:',
    choices: [
      'Increase index retention automatically',
      'Restrict accepted argument values and reduce risky SPL injection via macro parameters',
      'Disable real-time searches',
      'Convert macros into event types',
    ],
    correctIndex: 1,
    explanation:
      'Validation expressions (often regular expressions) ensure macro arguments match expected patterns before expansion.',
    docLinks: [{ label: 'About search macros', url: PU_DOCS.macros }],
  },
  {
    id: 'pu-ma-005',
    domainId: 'pu-macros',
    stem: 'If a macro definition must include a literal dollar sign in SPL, you should:',
    choices: [
      'Remove the dollar sign entirely',
      'Escape it per macro escaping rules (for example using $$ where required)',
      'Wrap the macro in quotes only at search time',
      'Use eventtype instead of a macro',
    ],
    correctIndex: 1,
    explanation:
      'Splunk macro syntax treats $ specially; escaping rules let authors include literal dollar signs in macro text.',
    docLinks: [{ label: 'About search macros', url: PU_DOCS.macros }],
  },
  {
    id: 'pu-ma-006',
    domainId: 'pu-macros',
    stem: 'Which macro type expands to a complete search versus a partial SPL fragment?',
    choices: [
      'Splunk distinguishes macros that define full searches from those that define search fragments or snippets',
      'All macros must always be full searches ending with a transforming command',
      'Macros cannot contain pipe characters',
      'Only admin macros may include WHERE clauses',
    ],
    correctIndex: 0,
    explanation:
      'Macros may represent entire searches or inline fragments, depending how authors define and invoke them.',
    docLinks: [{ label: 'About search macros', url: PU_DOCS.macros }],
  },
  {
    id: 'pu-ma-007',
    domainId: 'pu-macros',
    stem: 'Search macros are scoped and shared similarly to other knowledge objects, meaning:',
    choices: [
      'They are always private to the creating user',
      'They live in apps, respect role capabilities, and can be exported or shared globally',
      'They bypass all permission checks at runtime',
      'They are stored only in indexes.conf',
    ],
    correctIndex: 1,
    explanation:
      'Macro visibility follows app context and ACLs like saved searches, tags, and event types.',
    docLinks: [
      { label: 'About search macros', url: PU_DOCS.macros },
      { label: 'Knowledge Management Manual', url: PU_DOCS.knowledgeManual },
    ],
  },

  // --- 8.0 Creating and Using Workflow Actions (7) ---
  {
    id: 'pu-wa-001',
    domainId: 'pu-workflow-actions',
    stem: 'A GET-type workflow action typically:',
    choices: [
      'Runs a Splunk generating search in the background',
      'Opens a URL in a browser, substituting field values from the selected event into the link',
      'Posts form data to an internal index',
      'Creates a new data model dataset',
    ],
    correctIndex: 1,
    explanation:
      'GET workflow actions launch external resources (tickets, CMDB pages) with event field values embedded in the URL.',
    docLinks: [{ label: 'About workflow actions', url: PU_DOCS.workflowActions }],
  },
  {
    id: 'pu-wa-002',
    domainId: 'pu-workflow-actions',
    stem: 'POST workflow actions differ from GET actions because they:',
    choices: [
      'Cannot use field substitution',
      'Submit HTTP POST parameters (often form fields) to a target URL instead of only opening a link',
      'Always require Splunk admin role',
      'Only work on summary indexes',
    ],
    correctIndex: 1,
    explanation:
      'POST actions send structured parameters to external systems—useful when a simple URL query string is insufficient.',
    docLinks: [{ label: 'About workflow actions', url: PU_DOCS.workflowActions }],
  },
  {
    id: 'pu-wa-003',
    domainId: 'pu-workflow-actions',
    stem: 'A Search workflow action is used to:',
    choices: [
      'Launch a predefined Splunk search populated with values from the selected event',
      'Delete the selected event from the index',
      'Modify props.conf on the search head',
      'Register a new universal forwarder',
    ],
    correctIndex: 0,
    explanation:
      'Search actions run contextual SPL—often opened in a new search view—with field placeholders replaced by event data.',
    docLinks: [{ label: 'About workflow actions', url: PU_DOCS.workflowActions }],
  },
  {
    id: 'pu-wa-004',
    domainId: 'pu-workflow-actions',
    stem: 'In workflow action URLs or search templates, field values are commonly inserted using:',
    choices: [
      '$field_name$ placeholder syntax',
      'Brackets [field_name] only',
      'SQL bind variables',
      'Forward slash /field/ paths exclusively',
    ],
    correctIndex: 0,
    explanation:
      'Workflow actions substitute event field values for tokens like $ip$ or $user$ when the action executes.',
    docLinks: [{ label: 'About workflow actions', url: PU_DOCS.workflowActions }],
  },
  {
    id: 'pu-wa-005',
    domainId: 'pu-workflow-actions',
    stem: 'Where do users most often access workflow actions while investigating events?',
    choices: [
      'The Event Actions menu on search results (for example under Events)',
      'The indexes.conf editor',
      'The forwarder deployment server only',
      'License usage report',
    ],
    correctIndex: 0,
    explanation:
      'Configured workflow actions appear in event workflows so analysts can pivot from an event to external or internal tools.',
    docLinks: [{ label: 'About workflow actions', url: PU_DOCS.workflowActions }],
  },
  {
    id: 'pu-wa-006',
    domainId: 'pu-workflow-actions',
    stem: 'Restricting a workflow action to certain fields or event types helps you:',
    choices: [
      'Show the action only when relevant events are selected',
      'Increase bucket rebuild frequency',
      'Disable field aliases globally',
      'Force POST instead of GET for all actions',
    ],
    correctIndex: 0,
    explanation:
      'Field and event type restrictions prevent clutter and avoid offering irrelevant actions on unrelated events.',
    docLinks: [{ label: 'About workflow actions', url: PU_DOCS.workflowActions }],
  },
  {
    id: 'pu-wa-007',
    domainId: 'pu-workflow-actions',
    stem: 'When configuring a link-style workflow action, opening in a new window versus the same window is:',
    choices: [
      'Not configurable in Splunk',
      'A display option chosen when defining the action (for example target=_blank behavior)',
      'Determined solely by the user browser with no Splunk setting',
      'Available only for POST actions',
    ],
    correctIndex: 1,
    explanation:
      'Administrators choose how the action opens so external lookups can appear in a new tab or replace the current view.',
    docLinks: [{ label: 'About workflow actions', url: PU_DOCS.workflowActions }],
  },

  // --- 9.0 Creating Data Models (7) ---
  {
    id: 'pu-dm-001',
    domainId: 'pu-data-models',
    stem: 'A Splunk data model is:',
    choices: [
      'A hierarchical collection of datasets with fields and constraints that describe a domain of events',
      'A type of index bucket compression',
      'A forwarder configuration bundle',
      'A replacement for props.conf only',
    ],
    correctIndex: 0,
    explanation:
      'Data models organize event data into datasets and fields so Pivot and accelerated searches can consume structured views.',
    docLinks: [{ label: 'About data models', url: PU_DOCS.dataModels }],
  },
  {
    id: 'pu-dm-002',
    domainId: 'pu-data-models',
    stem: 'In a data model, a root event dataset constraint typically:',
    choices: [
      'Defines the initial SPL filter that selects which events belong at the top of the hierarchy',
      'Configures SSL on forwarders',
      'Sets retention for frozen buckets',
      'Creates a lookup file automatically',
    ],
    correctIndex: 0,
    explanation:
      'Root constraints (often a base search) limit which indexed events enter the model before child datasets refine them.',
    docLinks: [{ label: 'About data models', url: PU_DOCS.dataModels }],
  },
  {
    id: 'pu-dm-003',
    domainId: 'pu-data-models',
    stem: 'Pivot relies on data models to:',
    choices: [
      'Let users build reports and charts from model fields without writing SPL manually',
      'Edit serverclass.conf',
      'Manage license pools',
      'Configure HEC tokens',
    ],
    correctIndex: 0,
    explanation:
      'Pivot exposes data model datasets and attributes through a UI for drag-and-drop analysis.',
    docLinks: [{ label: 'About data models', url: PU_DOCS.dataModels }],
  },
  {
    id: 'pu-dm-004',
    domainId: 'pu-data-models',
    stem: 'Child datasets in a data model usually:',
    choices: [
      'Further filter or split events from a parent dataset using additional constraints',
      'Exist only on forwarders',
      'Cannot inherit fields from parents',
      'Require a separate index per child',
    ],
    correctIndex: 0,
    explanation:
      'Child datasets refine parent event sets—modeling subsets such as failed logins under an Authentication hierarchy.',
    docLinks: [{ label: 'About data models', url: PU_DOCS.dataModels }],
  },
  {
    id: 'pu-dm-005',
    domainId: 'pu-data-models',
    stem: 'Attributes (fields) defined on a data model dataset can be populated by:',
    choices: [
      'Automatic field extraction, eval expressions, aliases, or other model field settings',
      'Only index-time tokenization',
      'Deleting the _raw field',
      'Forwarder input names exclusively',
    ],
    correctIndex: 0,
    explanation:
      'Model attributes map to underlying event fields or calculated values so Pivot and tstats/datamodel searches use consistent names.',
    docLinks: [{ label: 'About data models', url: PU_DOCS.dataModels }],
  },
  {
    id: 'pu-dm-006',
    domainId: 'pu-data-models',
    stem: 'Accelerating a data model can:',
    choices: [
      'Precompute summaries to speed searches and Pivot against large event volumes',
      'Disable all role-based access controls',
      'Move buckets to cold storage automatically',
      'Remove the need for sourcetypes',
    ],
    correctIndex: 0,
    explanation:
      'Acceleration builds summaries for eligible model datasets, trading disk for faster analytic response times.',
    docLinks: [{ label: 'About data models', url: PU_DOCS.dataModels }],
  },
  {
    id: 'pu-dm-007',
    domainId: 'pu-data-models',
    stem: 'Which dataset type models groups of related events as a single unit (for example a multi-event session)?',
    choices: [
      'Transaction dataset',
      'Root-only dataset',
      'Lookup dataset exclusively',
      'Metrics index dataset only',
    ],
    correctIndex: 0,
    explanation:
      'Transaction datasets represent correlated event sequences, aligning with transaction search concepts in the model hierarchy.',
    docLinks: [
      { label: 'About data models', url: PU_DOCS.dataModels },
      { label: 'About transactions', url: PU_DOCS.transactions },
    ],
  },

  // --- 10.0 Using the CIM Add-On (7) ---
  {
    id: 'pu-cim-001',
    domainId: 'pu-cim-addon',
    stem: 'The Splunk Common Information Model (CIM) primarily provides:',
    choices: [
      'A shared schema of field names and data models so disparate sources report consistent analytics',
      'A cloud-only billing dashboard',
      'Universal forwarder installation scripts only',
      'Automatic index compression policies',
    ],
    correctIndex: 0,
    explanation:
      'CIM normalizes field naming and structures so searches, reports, and apps work across heterogeneous sources.',
    docLinks: [{ label: 'CIM Manual', url: PU_DOCS.cimManual }],
  },
  {
    id: 'pu-cim-002',
    domainId: 'pu-cim-addon',
    stem: 'The Splunk Add-on for Splunk CIM ships knowledge objects such as:',
    choices: [
      'Data models, tags, event types, and field aliases aligned to CIM domains',
      'Only serverclass.conf templates',
      'Exclusive forwarder binary patches',
      'Default indexes.conf stanzas for every vendor',
    ],
    correctIndex: 0,
    explanation:
      'The CIM add-on includes prebuilt models and supporting knowledge objects mapped to domains like Authentication and Network Traffic.',
    docLinks: [{ label: 'CIM Manual', url: PU_DOCS.cimManual }],
  },
  {
    id: 'pu-cim-003',
    domainId: 'pu-cim-addon',
    stem: 'Normalization in the CIM context means:',
    choices: [
      'Mapping vendor-specific fields and sourcetypes to standard CIM field names and categories',
      'Deleting all raw events after parsing',
      'Disabling search-time extractions',
      'Converting indexes to metric stores only',
    ],
    correctIndex: 0,
    explanation:
      'Normalization aligns diverse logs to common fields (for example action, dest, user) so cross-source reporting is possible.',
    docLinks: [{ label: 'CIM Manual', url: PU_DOCS.cimManual }],
  },
  {
    id: 'pu-cim-004',
    domainId: 'pu-cim-addon',
    stem: 'Which CIM data model domain would authentication logs (logins, logoffs, failures) most commonly map to?',
    choices: [
      'Authentication',
      'Performance',
      'Endpoint',
      'Change',
    ],
    correctIndex: 0,
    explanation:
      'The Authentication data model covers logon activity, failures, and related identity events across sources.',
    docLinks: [{ label: 'CIM Manual', url: PU_DOCS.cimManual }],
  },
  {
    id: 'pu-cim-005',
    domainId: 'pu-cim-addon',
    stem: 'Field aliases in CIM-compatible add-ons are often used to:',
    choices: [
      'Rename extracted vendor fields to CIM-compliant field names at search time',
      'Replace TLS certificates on forwarders',
      'Set bucket rotation schedules',
      'Create HEC tokens automatically',
    ],
    correctIndex: 0,
    explanation:
      'Aliases map source-specific field names to CIM standard names without re-indexing raw data.',
    docLinks: [
      { label: 'CIM Manual', url: PU_DOCS.cimManual },
      { label: 'Field aliases', url: PU_DOCS.fieldAliases },
    ],
  },
  {
    id: 'pu-cim-006',
    domainId: 'pu-cim-addon',
    stem: 'CIM validation (for example via the CIM Validator) helps administrators:',
    choices: [
      'Assess whether data populates expected CIM fields and tags for a given sourcetype or source',
      'Rebuild all indexes nightly',
      'Assign license stacks',
      'Disable event types globally',
    ],
    correctIndex: 0,
    explanation:
      'Validation tooling checks compliance with CIM expectations so gaps in normalization can be corrected before relying on CIM-based content.',
    docLinks: [{ label: 'CIM Manual', url: PU_DOCS.cimManual }],
  },
  {
    id: 'pu-cim-007',
    domainId: 'pu-cim-addon',
    stem: 'Why do many Splunk security and IT operations apps require CIM-normalized data?',
    choices: [
      'They depend on consistent fields and data models to drive dashboards, correlations, and reports across sources',
      'CIM is mandatory for any forwarder to start',
      'Non-CIM data cannot be indexed',
      'CIM removes the need for knowledge object permissions',
    ],
    correctIndex: 0,
    explanation:
      'Apps such as Enterprise Security expect CIM-aligned models so content works regardless of underlying vendor log formats.',
    docLinks: [{ label: 'CIM Manual', url: PU_DOCS.cimManual }],
  },
]
