import { useCallback, useState } from 'react'

const STORAGE_KEY = 'example-splunk-learning-engine-labs-v1'

/** Per scenario: which step indices are checked off */
export type LabProgressMap = Record<
  string,
  Record<string, { completedSteps: number[] }>
>

function load(): LabProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as LabProgressMap
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function save(data: LabProgressMap): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function useLabProgress(trackId: string) {
  const [progress, setProgress] = useState<LabProgressMap>(() => load())

  const persist = useCallback((next: LabProgressMap) => {
    setProgress(next)
    save(next)
  }, [])

  const getCompletedSteps = useCallback(
    (scenarioId: string): Set<number> => {
      const list = progress[trackId]?.[scenarioId]?.completedSteps ?? []
      return new Set(list)
    },
    [progress, trackId],
  )

  const toggleStep = useCallback(
    (scenarioId: string, stepIndex: number) => {
      const track = progress[trackId] ?? {}
      const scenario = track[scenarioId] ?? { completedSteps: [] }
      const set = new Set(scenario.completedSteps)
      if (set.has(stepIndex)) set.delete(stepIndex)
      else set.add(stepIndex)
      const next: LabProgressMap = {
        ...progress,
        [trackId]: {
          ...track,
          [scenarioId]: { completedSteps: [...set].sort((a, b) => a - b) },
        },
      }
      persist(next)
    },
    [progress, trackId, persist],
  )

  const resetScenario = useCallback(
    (scenarioId: string) => {
      const track = { ...(progress[trackId] ?? {}) }
      delete track[scenarioId]
      persist({ ...progress, [trackId]: track })
    },
    [progress, trackId, persist],
  )

  const resetTrack = useCallback(() => {
    const next = { ...progress }
    delete next[trackId]
    persist(next)
  }, [progress, trackId, persist])

  return {
    getCompletedSteps,
    toggleStep,
    resetScenario,
    resetTrack,
  }
}
