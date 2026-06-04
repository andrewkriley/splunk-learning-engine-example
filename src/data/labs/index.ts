import type { LabGuide, LabScenario } from './types'
import { POWER_USER_LAB_GUIDE } from './powerUserLabs'

const LAB_GUIDES_BY_TRACK: Record<string, LabGuide> = {
  'core-power-user': POWER_USER_LAB_GUIDE,
}

export function getLabGuideForTrack(trackId: string): LabGuide | undefined {
  return LAB_GUIDES_BY_TRACK[trackId]
}

export function getLabTracksWithGuides(): { trackId: string; title: string; scenarioCount: number }[] {
  return Object.values(LAB_GUIDES_BY_TRACK).map((g) => ({
    trackId: g.trackId,
    title: g.title,
    scenarioCount: g.scenarios.length,
  }))
}

export function getLabScenario(
  trackId: string,
  scenarioId: string,
): LabScenario | undefined {
  const guide = LAB_GUIDES_BY_TRACK[trackId]
  return guide?.scenarios.find((s) => s.id === scenarioId)
}

export type { LabGuide, LabScenario, LabStep } from './types'
