import { useEffect, useMemo, useState } from 'react'
import { getLabGuideForTrack, getLabTracksWithGuides } from '../data/labs'
import type { LabScenario } from '../data/labs'
import { POWER_USER_DOMAIN_BY_ID } from '../data/powerUserDomains'
import { useLabProgress } from '../hooks/useLabProgress'

function scenarioProgress(
  scenario: LabScenario,
  completed: Set<number>,
): { done: number; total: number; percent: number } {
  const total = scenario.steps.length
  const done = scenario.steps.filter((_, i) => completed.has(i)).length
  return {
    done,
    total,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
  }
}

function LabScenarioDetail(props: {
  scenario: LabScenario
  completed: Set<number>
  onToggleStep: (index: number) => void
  onResetScenario: () => void
}) {
  const { scenario, completed, onToggleStep, onResetScenario } = props
  const prog = scenarioProgress(scenario, completed)

  return (
    <>
      <div className="lab-scenario-meta row spread" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
        <span className="badge">{scenario.difficulty}</span>
        <span className="muted">~{scenario.estimatedMinutes} min</span>
        <span className="muted">
          Steps {prog.done}/{prog.total}
          {prog.percent === 100 ? ' · complete' : ''}
        </span>
      </div>

      <p>{scenario.summary}</p>

      <h3>Objectives</h3>
      <ul className="links">
        {scenario.objectives.map((o) => (
          <li key={o}>{o}</li>
        ))}
      </ul>

      <h3>Prerequisites</h3>
      <ul className="links">
        {scenario.prerequisites.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      {scenario.environmentNotes.length > 0 && (
        <>
          <h3>Environment notes</h3>
          <ul className="links">
            {scenario.environmentNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </>
      )}

      <h3>Procedure</h3>
      <ol className="lab-steps">
        {scenario.steps.map((step, i) => {
          const checked = completed.has(i)
          return (
            <li
              key={step.title}
              className={checked ? 'lab-step lab-step-done' : 'lab-step'}
            >
              <label className="lab-step-check">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleStep(i)}
                />
                <span className="lab-step-title">{step.title}</span>
              </label>
              <p className="lab-step-body">{step.body}</p>
              {step.spl && (
                <pre className="glossary-example lab-spl">
                  <code>{step.spl}</code>
                </pre>
              )}
              {step.hint && (
                <p className="muted lab-hint">
                  <strong>Hint:</strong> {step.hint}
                </p>
              )}
              <p className="lab-checkpoint">
                <strong>Checkpoint:</strong> {step.checkpoint}
              </p>
            </li>
          )
        })}
      </ol>

      <h3>Verification</h3>
      <ul className="links">
        {scenario.verification.map((v) => (
          <li key={v}>{v}</li>
        ))}
      </ul>

      {scenario.troubleshooting && scenario.troubleshooting.length > 0 && (
        <>
          <h3>Troubleshooting</h3>
          <dl className="lab-troubleshoot">
            {scenario.troubleshooting.map((t) => (
              <div key={t.problem}>
                <dt>{t.problem}</dt>
                <dd>{t.suggestion}</dd>
              </div>
            ))}
          </dl>
        </>
      )}

      <h3>Official references</h3>
      <ul className="links">
        {scenario.docLinks.map((d) => (
          <li key={d.url}>
            <a href={d.url} target="_blank" rel="noreferrer">
              {d.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="row" style={{ marginTop: '1rem' }}>
        <button type="button" className="btn" onClick={onResetScenario}>
          Reset step checkboxes
        </button>
      </div>
    </>
  )
}

export function LabGuidePicker(props: {
  onBack: () => void
  onSelectTrack: (trackId: string) => void
}) {
  const tracks = getLabTracksWithGuides()

  return (
    <div className="app">
      <header className="row spread">
        <div>
          <h1 style={{ margin: 0 }}>Lab guides</h1>
          <p className="muted" style={{ margin: '0.25rem 0 0' }}>
            Hands-on scenarios in your Splunk environment. Validate every step against
            official Splunk Help for your version and deployment.
          </p>
        </div>
        <button type="button" className="btn" onClick={props.onBack}>
          ← Main menu
        </button>
      </header>

      <ul className="path-picker-list" style={{ marginTop: '1rem' }}>
        {tracks.map((t) => (
          <li key={t.trackId}>
            <button
              type="button"
              className="card path-picker-card"
              onClick={() => props.onSelectTrack(t.trackId)}
            >
              <div className="path-picker-card-head row spread">
                <h2 style={{ margin: 0 }}>{t.title}</h2>
                <span className="badge path-badge-ready">
                  {t.scenarioCount} labs
                </span>
              </div>
              <p className="muted path-picker-scope">
                Step-by-step exercises with SPL samples and checkpoints.
              </p>
            </button>
          </li>
        ))}
      </ul>

      <p className="footer-note">
        Labs require your own Splunk instance. This tool does not provision infrastructure.
      </p>
    </div>
  )
}

export function LabGuideView(props: {
  trackId: string
  onBack: () => void
  backLabel?: string
}) {
  const guide = useMemo(() => getLabGuideForTrack(props.trackId), [props.trackId])
  const { getCompletedSteps, toggleStep, resetScenario, resetTrack } = useLabProgress(
    props.trackId,
  )

  const [activeId, setActiveId] = useState<string>(() => guide?.scenarios[0]?.id ?? '')

  useEffect(() => {
    if (!guide || guide.scenarios.length === 0) return
    if (!guide.scenarios.some((s) => s.id === activeId)) {
      setActiveId(guide.scenarios[0].id)
    }
  }, [guide, activeId])

  const scenario = useMemo(
    () => guide?.scenarios.find((s) => s.id === activeId),
    [guide, activeId],
  )

  const completed = useMemo(
    () => (scenario ? getCompletedSteps(scenario.id) : new Set<number>()),
    [scenario, getCompletedSteps],
  )

  if (!guide) {
    return (
      <div className="app">
        <p>No lab guide for this path yet.</p>
        <button type="button" className="btn" onClick={props.onBack}>
          {props.backLabel ?? '← Back'}
        </button>
      </div>
    )
  }

  return (
    <div className="glossary-layout lab-layout">
      <header className="glossary-header row spread">
        <div>
          <h1 style={{ margin: 0 }}>{guide.title}</h1>
          <p className="muted" style={{ margin: '0.25rem 0 0' }}>
            {guide.intro}
          </p>
        </div>
        <button type="button" className="btn" onClick={props.onBack}>
          {props.backLabel ?? '← Back'}
        </button>
      </header>

      <div className="card lab-setup">
        <h2 style={{ marginTop: 0 }}>Environment setup</h2>
        <ul className="links">
          {guide.environmentSetup.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button type="button" className="btn danger" onClick={resetTrack}>
          Reset all lab progress (this path)
        </button>
      </div>

      <div className="glossary-body">
        <nav className="glossary-nav card" aria-label="Lab scenarios">
          <h2 className="glossary-nav-title">Scenarios</h2>
          <ul className="glossary-nav-list">
            {guide.scenarios.map((s) => {
              const prog = scenarioProgress(s, getCompletedSteps(s.id))
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    className={
                      s.id === activeId
                        ? 'glossary-nav-btn active'
                        : 'glossary-nav-btn'
                    }
                    onClick={() => setActiveId(s.id)}
                  >
                    <span className="lab-nav-title">{s.title}</span>
                    <span className="lab-nav-progress muted">
                      {prog.done}/{prog.total}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <article className="glossary-main card">
          {scenario ? (
            <>
              <h2 style={{ marginTop: 0 }}>{scenario.title}</h2>
              {scenario.domainIds.length > 0 && (
                <p className="muted lab-domains">
                  Topics:{' '}
                  {scenario.domainIds
                    .map((id) => POWER_USER_DOMAIN_BY_ID[id]?.title ?? id)
                    .join(' · ')}
                </p>
              )}
              <LabScenarioDetail
                scenario={scenario}
                completed={completed}
                onToggleStep={(i) => toggleStep(scenario.id, i)}
                onResetScenario={() => resetScenario(scenario.id)}
              />
            </>
          ) : null}
        </article>
      </div>

      <p className="footer-note">
        Lab steps are illustrative—confirm commands and UI paths in Splunk Help for your
        product version. You are responsible for changes in shared environments.
      </p>
    </div>
  )
}
