import type { QuestionStatsMap } from '../types'

const STORAGE_KEY = 'example-splunk-learning-engine-progress-v1'
const LEGACY_STORAGE_KEY = 'splunk-certs-progress-v1'

export interface PersistedProgress {
  version: 1
  /** trackId -> questionId -> stats */
  tracks: Record<string, QuestionStatsMap>
}

function emptyProgress(): PersistedProgress {
  return { version: 1, tracks: {} }
}

export function loadProgress(): PersistedProgress {
  try {
    let raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      raw = localStorage.getItem(LEGACY_STORAGE_KEY)
      if (raw) {
        localStorage.setItem(STORAGE_KEY, raw)
        localStorage.removeItem(LEGACY_STORAGE_KEY)
      }
    }
    if (!raw) return emptyProgress()
    const parsed = JSON.parse(raw) as PersistedProgress
    if (parsed?.version !== 1 || typeof parsed.tracks !== 'object') {
      return emptyProgress()
    }
    return parsed
  } catch {
    return emptyProgress()
  }
}

export function saveProgress(data: PersistedProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function getStatsForTrack(
  progress: PersistedProgress,
  trackId: string,
): QuestionStatsMap {
  return progress.tracks[trackId] ?? {}
}

export function updateQuestionStat(
  progress: PersistedProgress,
  trackId: string,
  questionId: string,
  outcome: 'correct' | 'wrong',
): PersistedProgress {
  const next = { ...progress, tracks: { ...progress.tracks } }
  const prevMap = next.tracks[trackId] ? { ...next.tracks[trackId] } : {}
  const prev = prevMap[questionId] ?? { correctCount: 0, wrongCount: 0 }
  prevMap[questionId] =
    outcome === 'correct'
      ? {
          correctCount: prev.correctCount + 1,
          wrongCount: prev.wrongCount,
        }
      : {
          correctCount: prev.correctCount,
          wrongCount: prev.wrongCount + 1,
        }
  next.tracks[trackId] = prevMap
  return next
}

export function resetTrackProgress(
  progress: PersistedProgress,
  trackId: string,
): PersistedProgress {
  const next = { ...progress, tracks: { ...progress.tracks } }
  delete next.tracks[trackId]
  return next
}
