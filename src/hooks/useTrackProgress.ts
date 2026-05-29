import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  getStatsForTrack,
  loadProgress,
  resetTrackProgress,
  saveProgress,
  updateQuestionStat,
  type PersistedProgress,
} from '../lib/storage'

export function useTrackProgress(trackId: string) {
  const [progress, setProgress] = useState<PersistedProgress>(() => loadProgress())

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const stats = useMemo(
    () => getStatsForTrack(progress, trackId),
    [progress, trackId],
  )

  const record = useCallback(
    (questionId: string, outcome: 'correct' | 'wrong') => {
      setProgress((p) => updateQuestionStat(p, trackId, questionId, outcome))
    },
    [trackId],
  )

  const reset = useCallback(() => {
    if (
      window.confirm(
        'Clear all saved progress and stats for this learning path on this browser?',
      )
    ) {
      setProgress((p) => resetTrackProgress(p, trackId))
    }
  }, [trackId])

  return { stats, record, reset }
}
