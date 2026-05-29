import { useMemo } from 'react'
import type { LearningPath } from '../data/learningPaths'

export function LearningPathPicker(props: {
  paths: LearningPath[]
  onSelectTrack: (id: string) => void
  onBack: () => void
}) {
  const { paths, onSelectTrack, onBack } = props

  const sortedPaths = useMemo(() => {
    return [...paths]
      .map((p, order) => ({ p, order }))
      .sort((x, y) => {
        if (x.p.hasInteractiveContent !== y.p.hasInteractiveContent) {
          return x.p.hasInteractiveContent ? -1 : 1
        }
        return x.order - y.order
      })
      .map(({ p }) => p)
  }, [paths])

  return (
    <div className="app path-picker">
      <div className="row spread" style={{ marginBottom: '1rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.25rem' }}>Choose a learning path</h1>
          <p className="muted" style={{ margin: 0 }}>
            Each path groups topics researched from public Splunk documentation and training
            outlines.{' '}
            <span className="badge path-badge-ready">Activities ready</span> means practice
            and timed review are available;{' '}
            <span className="badge">Links only</span> lists public references for now.
          </p>
        </div>
        <button type="button" className="btn" onClick={onBack}>
          ← Home
        </button>
      </div>

      <ul className="path-picker-list">
        {sortedPaths.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              className="path-picker-card card"
              onClick={() => onSelectTrack(p.id)}
            >
              <div className="row spread path-picker-card-head">
                <h2 style={{ margin: 0 }}>{p.name}</h2>
                {p.hasInteractiveContent ? (
                  <span className="badge path-badge-ready">Activities ready</span>
                ) : (
                  <span className="badge">Links only</span>
                )}
              </div>
              <p className="muted" style={{ margin: '0.5rem 0 0' }}>
                {p.shortDescription}
              </p>
              <p className="muted path-picker-scope" style={{ margin: '0.5rem 0 0' }}>
                <strong>Scope:</strong> {p.scopeNote}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
