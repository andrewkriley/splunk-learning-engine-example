import type { DomainId } from '../../types'

export type LabDifficulty = 'intro' | 'intermediate'

export interface LabDocLink {
  label: string
  url: string
}

export interface LabStep {
  title: string
  /** What to do in Splunk (Search, Settings, etc.) */
  body: string
  /** Optional SPL to run or adapt */
  spl?: string
  /** What each search segment or pipe command contributes to the output */
  splBreakdown?: { segment: string; role: string }[]
  /** Optional nudge without giving away the answer */
  hint?: string
  /** Confirm this before advancing—hands-on checkpoint */
  checkpoint: string
}

export interface LabTroubleshooting {
  problem: string
  suggestion: string
}

export interface LabScenario {
  id: string
  /** Learning path id (e.g. core-power-user) */
  trackId: string
  title: string
  summary: string
  /** Outline domains this lab reinforces */
  domainIds: DomainId[]
  estimatedMinutes: number
  difficulty: LabDifficulty
  objectives: string[]
  prerequisites: string[]
  /** Splunk instance / data assumptions */
  environmentNotes: string[]
  steps: LabStep[]
  /** Final “you should see / know” checks */
  verification: string[]
  troubleshooting?: LabTroubleshooting[]
  docLinks: LabDocLink[]
}

export interface LabGuide {
  trackId: string
  title: string
  intro: string
  /** Shared setup before any scenario */
  environmentSetup: string[]
  scenarios: LabScenario[]
}
