import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { assertQuestionBankCoversAssessment } from '../data/questions'
import { resolveLearningTrack } from '../data/trackResources'
import { examDomainQuotas, buildPracticeSession, selectExamQuestions } from '../lib/selection'
import type { Question } from '../types'
import { MASTERY_CORRECT_THRESHOLD } from '../types'
import { useTrackProgress } from '../hooks/useTrackProgress'
import type { PersistedProgress } from '../lib/storage'

function formatRemaining(ms: number): string {
  const s = Math.max(0, Math.ceil(ms / 1000))
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${r.toString().padStart(2, '0')}`
}

function summaryStats(
  questions: Question[],
  stats: PersistedProgress['tracks'][string],
) {
  let attempted = 0
  let mastered = 0
  for (const q of questions) {
    const s = stats?.[q.id]
    if (s && (s.correctCount > 0 || s.wrongCount > 0)) attempted++
    if (s && s.correctCount >= MASTERY_CORRECT_THRESHOLD) mastered++
  }
  return { attempted, mastered, total: questions.length }
}

export function LearningFlow(props: {
  trackId: string
  onMainMenu: () => void
  onChangePath: () => void
  onOpenGlossary: () => void
}) {
  const { trackId, onMainMenu, onChangePath, onOpenGlossary } = props

  const track = useMemo(() => resolveLearningTrack(trackId), [trackId])
  const { stats, record, reset } = useTrackProgress(trackId)

  const [route, setRoute] = useState<
    'dashboard' | 'practice' | 'timed-review' | 'timed-review-results'
  >('dashboard')

  const [practiceSession, setPracticeSession] = useState<Question[] | null>(null)
  const [pIdx, setPIdx] = useState(0)
  const [pChoice, setPChoice] = useState<number | null>(null)

  const [examQs, setExamQs] = useState<Question[] | null>(null)
  const [eIdx, setEIdx] = useState(0)
  const [eAnswers, setEAnswers] = useState<(number | null)[]>([])
  const [examStartedAt, setExamStartedAt] = useState<number | null>(null)
  const [nowTick, setNowTick] = useState(() => Date.now())
  const examFinalizingRef = useRef(false)

  const [resultBundle, setResultBundle] = useState<{
    questions: Question[]
    answers: (number | null)[]
    timeUp: boolean
  } | null>(null)

  const assessmentDurationMs = track?.assessmentDurationMs ?? 60 * 60 * 1000
  const assessmentQuestionCount = track?.assessmentQuestionCount ?? 60
  const questions = useMemo(() => track?.questions ?? [], [track])
  const domains = track?.domains ?? []
  const domainById = track?.domainById ?? {}
  const path = track?.path

  useEffect(() => {
    if (route !== 'timed-review' || examStartedAt === null) return
    const t = window.setInterval(() => setNowTick(Date.now()), 500)
    return () => window.clearInterval(t)
  }, [route, examStartedAt])

  const finalizeExam = useCallback(
    (qlist: Question[], answers: (number | null)[], timeUp: boolean) => {
      if (examFinalizingRef.current) return
      examFinalizingRef.current = true
      setResultBundle({
        questions: qlist,
        answers: [...answers],
        timeUp,
      })
      setRoute('timed-review-results')
      setExamQs(null)
      setExamStartedAt(null)
      qlist.forEach((q, i) => {
        const a = answers[i]
        if (a === null) return
        record(q.id, a === q.correctIndex ? 'correct' : 'wrong')
      })
    },
    [record],
  )

  useEffect(() => {
    if (route !== 'timed-review' || examStartedAt === null || !examQs) return
    if (nowTick - examStartedAt >= assessmentDurationMs) {
      finalizeExam(examQs, eAnswers, true)
    }
  }, [nowTick, route, examStartedAt, examQs, eAnswers, finalizeExam, assessmentDurationMs])

  useEffect(() => {
    if (!import.meta.env.DEV || !track || track.path.hasInteractiveContent !== true) return
    const q = track.questions
    const dom = track.domains
    if (q.length === 0 || dom.length === 0) return
    const quotas = examDomainQuotas(assessmentQuestionCount, dom)
    const targets = Object.fromEntries(quotas) as Record<string, number>
    const check = assertQuestionBankCoversAssessment(q, targets)
    if (!check.ok) {
      console.warn(
        `[example-splunk-learning-engine] Question bank cannot fill timed review: need ${check.need} in ${check.domainId}, have ${check.have}.`,
      )
    }
  }, [track, assessmentQuestionCount])

  const sum = useMemo(() => summaryStats(questions, stats), [questions, stats])

  const hasBank = path?.hasInteractiveContent === true && questions.length > 0

  function startPractice(size: number) {
    if (!hasBank) return
    const session = buildPracticeSession(
      questions,
      stats,
      Math.min(size, questions.length),
    )
    setPracticeSession(session)
    setPIdx(0)
    setPChoice(null)
    setRoute('practice')
  }

  function startExam() {
    if (!hasBank) return
    examFinalizingRef.current = false
    const qs = selectExamQuestions(questions, assessmentQuestionCount, domains)
    setExamQs(qs)
    setEIdx(0)
    setEAnswers(Array(qs.length).fill(null))
    setExamStartedAt(Date.now())
    setNowTick(Date.now())
    setRoute('timed-review')
  }

  function domainLabel(q: Question): string {
    const d = domainById[q.domainId]
    if (d) return `${d.blueprintRef} ${d.title}`
    return q.domainId
  }

  const currentPractice = practiceSession?.[pIdx]
  const practiceLocked = pChoice !== null

  function onPracticePick(idx: number) {
    if (!currentPractice || practiceLocked) return
    setPChoice(idx)
    record(
      currentPractice.id,
      idx === currentPractice.correctIndex ? 'correct' : 'wrong',
    )
  }

  function nextPractice() {
    if (!practiceSession) return
    if (pIdx + 1 >= practiceSession.length) {
      setPracticeSession(null)
      setRoute('dashboard')
      return
    }
    setPIdx((i) => i + 1)
    setPChoice(null)
  }

  const currentExam = examQs?.[eIdx]
  const examRemainingMs =
    examStartedAt === null
      ? assessmentDurationMs
      : assessmentDurationMs - (nowTick - examStartedAt)

  function setExamAnswer(choice: number) {
    if (!examQs) return
    setEAnswers((prev) => {
      const next = [...prev]
      next[eIdx] = choice
      return next
    })
  }

  if (!track || !path) {
    return (
      <div className="app">
        <p>Unknown learning path.</p>
        <button type="button" className="btn" onClick={onChangePath}>
          Back
        </button>
      </div>
    )
  }

  if (route === 'practice' && practiceSession && currentPractice) {
    const correct = pChoice === currentPractice.correctIndex
    return (
      <div className="app">
        <div className="row spread">
          <span className="badge">
            {path.name} · Practice · {pIdx + 1}/{practiceSession.length}
          </span>
          <button type="button" className="btn" onClick={() => setRoute('dashboard')}>
            Exit
          </button>
        </div>
        <div className="card" style={{ marginTop: '0.75rem' }}>
          <p className="muted">{domainLabel(currentPractice)}</p>
          <h2 style={{ marginTop: '0.35rem' }}>{currentPractice.stem}</h2>
          {currentPractice.choices.map((c, i) => {
            let cls = 'choice'
            if (practiceLocked) {
              if (i === currentPractice.correctIndex) cls += ' correct'
              else if (i === pChoice && pChoice !== currentPractice.correctIndex)
                cls += ' wrong'
            }
            return (
              <button
                key={i}
                type="button"
                className={cls}
                disabled={practiceLocked}
                onClick={() => onPracticePick(i)}
              >
                {c}
              </button>
            )
          })}
          {practiceLocked && (
            <>
              <div
                className={`feedback ${correct ? 'ok' : 'bad'}`}
                role="status"
              >
                <strong>{correct ? 'Correct' : 'Incorrect'}</strong>
                <p style={{ margin: '0.5rem 0 0' }}>{currentPractice.explanation}</p>
                {currentPractice.docLinks && currentPractice.docLinks.length > 0 && (
                  <ul className="links">
                    {currentPractice.docLinks.map((l) => (
                      <li key={l.url}>
                        <a href={l.url} target="_blank" rel="noreferrer">
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                <button type="button" className="btn primary" onClick={nextPractice}>
                  {pIdx + 1 >= practiceSession.length ? 'Done' : 'Next question'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  if (route === 'timed-review' && examQs && currentExam) {
    const timerClass =
      examRemainingMs < 60_000
        ? 'timer critical'
        : examRemainingMs < 5 * 60_000
          ? 'timer warn'
          : 'timer'
    const answeredCount = eAnswers.filter((a) => a !== null).length

    return (
      <div className="app">
        <div className="row spread">
          <span className={timerClass}>{formatRemaining(examRemainingMs)}</span>
          <span className="badge">
            {path.name} · Timed review · {eIdx + 1}/{examQs.length} · {answeredCount} answered
          </span>
        </div>
        <div className="card" style={{ marginTop: '0.75rem' }}>
          <p className="muted">{domainLabel(currentExam)}</p>
          <h2 style={{ marginTop: '0.35rem' }}>{currentExam.stem}</h2>
          {currentExam.choices.map((c, i) => (
            <button
              key={i}
              type="button"
              className={`choice${eAnswers[eIdx] === i ? ' selected' : ''}`}
              onClick={() => setExamAnswer(i)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="row" style={{ marginTop: '0.75rem' }}>
          <button
            type="button"
            className="btn"
            disabled={eIdx === 0}
            onClick={() => setEIdx((i) => i - 1)}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn"
            disabled={eIdx + 1 >= examQs.length}
            onClick={() => setEIdx((i) => i + 1)}
          >
            Next
          </button>
          <button
            type="button"
            className="btn primary"
            onClick={() => {
              if (
                examQs &&
                window.confirm(
                  'Submit timed review? Unanswered questions count as incorrect.',
                )
              ) {
                finalizeExam(examQs, eAnswers, false)
              }
            }}
          >
            Submit review
          </button>
        </div>
      </div>
    )
  }

  if (route === 'timed-review-results' && resultBundle) {
    const { questions: rq, answers, timeUp } = resultBundle
    let correctN = 0
    const byDomainWrong: Record<string, number> = {}
    for (const d of domains) byDomainWrong[d.id] = 0

    rq.forEach((q, i) => {
      const a = answers[i]
      if (a === q.correctIndex) correctN++
      else {
        byDomainWrong[q.domainId] = (byDomainWrong[q.domainId] ?? 0) + 1
      }
    })

    return (
      <div className="app">
        <h1>Timed review results</h1>
        <p className="muted">
          {path.name} · Score: {correctN}/{rq.length} correct
          {timeUp ? ' · Time expired (auto-submitted)' : ''}
        </p>
        {domains.length > 0 ? (
          <div className="card">
            <h2>Misses by topic domain</h2>
            <table className="results">
              <thead>
                <tr>
                  <th>Domain</th>
                  <th>Wrong / unanswered</th>
                </tr>
              </thead>
              <tbody>
                {domains.map((d) => (
                  <tr key={d.id}>
                    <td>
                      {d.blueprintRef} {d.title}
                    </td>
                    <td>{byDomainWrong[d.id] ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="card">
            <p className="muted">Domain breakdown is unavailable for this track.</p>
          </div>
        )}
        <div className="card">
          <h2>Review</h2>
          {rq.map((q, i) => {
            const a = answers[i]
            if (a === q.correctIndex) return null
            return (
              <div key={q.id} style={{ marginBottom: '1rem' }}>
                <p className="muted">{q.stem}</p>
                <p>
                  <strong>Your answer:</strong>{' '}
                  {a === null ? '(unanswered)' : q.choices[a]}
                </p>
                <p>
                  <strong>Correct:</strong> {q.choices[q.correctIndex]}
                </p>
              </div>
            )
          })}
        </div>
        <button type="button" className="btn primary" onClick={() => setRoute('dashboard')}>
          Back to track
        </button>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="row spread" style={{ marginBottom: '0.75rem' }}>
        <div>
          <p className="muted" style={{ margin: 0 }}>
            <button type="button" className="btn linkish" onClick={onMainMenu}>
              Main menu
            </button>
            <span aria-hidden="true"> · </span>
            <button type="button" className="btn linkish" onClick={onChangePath}>
              Change path
            </button>
          </p>
          <h1 style={{ margin: '0.35rem 0 0.25rem' }}>{path.name}</h1>
          <p className="muted" style={{ margin: 0 }}>
            {hasBank
              ? `Practice favors items you have not answered correctly ${MASTERY_CORRECT_THRESHOLD} times yet; timed review uses up to ${assessmentQuestionCount} questions with a ${formatRemaining(assessmentDurationMs)} timer.`
              : path.shortDescription}
          </p>
        </div>
        <div className="row">
          <button type="button" className="btn primary" onClick={onOpenGlossary}>
            SPL reference
          </button>
        </div>
      </div>

      {!hasBank && (
        <div className="card">
          <h2>Activities coming soon</h2>
          <p>
            Practice questions and timed review for this path are not in the app yet. Use
            the public Splunk links below while content is expanded from open documentation.
          </p>
          <ul className="links">
            <li>
              <a href={path.officialTopicUrl} target="_blank" rel="noreferrer">
                Splunk topic overview (public)
              </a>
            </li>
            {path.sourceOutlineUrl && (
              <li>
                <a href={path.sourceOutlineUrl} target="_blank" rel="noreferrer">
                  Public topic outline (PDF)
                </a>
              </li>
            )}
            <li>
              <a href="https://help.splunk.com" target="_blank" rel="noreferrer">
                Splunk Help
              </a>
            </li>
            <li>
              <a href="https://docs.splunk.com" target="_blank" rel="noreferrer">
                Splunk Documentation
              </a>
            </li>
          </ul>
        </div>
      )}

      <div className="card">
        <h2>Public sources used for research</h2>
        <ul className="links">
          <li>
            <a href={path.officialTopicUrl} target="_blank" rel="noreferrer">
              Splunk topic overview (public)
            </a>
          </li>
          {path.sourceOutlineUrl && (
            <li>
              <a href={path.sourceOutlineUrl} target="_blank" rel="noreferrer">
                Public topic outline (PDF)
              </a>
            </li>
          )}
          <li>
            <a href="https://help.splunk.com" target="_blank" rel="noreferrer">
              Splunk Help
            </a>
          </li>
          <li>
            <a href="https://docs.splunk.com" target="_blank" rel="noreferrer">
              Splunk Documentation
            </a>
          </li>
        </ul>
      </div>

      {hasBank && (
        <>
          <div className="card">
            <h2>Your progress (this browser)</h2>
            <p>
              Questions touched: {sum.attempted}/{sum.total} · Mastered (
              {MASTERY_CORRECT_THRESHOLD}+ correct): {sum.mastered}
            </p>
            <button type="button" className="btn danger" onClick={reset}>
              Reset track stats
            </button>
          </div>

          <div className="card">
            <h2>Practice</h2>
            <p className="muted">
              Immediate feedback after each question. Selection weights toward items with
              fewer than {MASTERY_CORRECT_THRESHOLD} lifetime correct answers; mastered
              items still appear occasionally.
            </p>
            <div className="row">
              <button type="button" className="btn primary" onClick={() => startPractice(10)}>
                10 questions
              </button>
              <button type="button" className="btn primary" onClick={() => startPractice(20)}>
                20 questions
              </button>
              <button type="button" className="btn primary" onClick={() => startPractice(30)}>
                30 questions
              </button>
            </div>
          </div>

          <div className="card">
            <h2>Timed review</h2>
            <p className="muted">
              {assessmentQuestionCount} questions weighted by public topic outline
              percentages, {formatRemaining(assessmentDurationMs)} timer. No per-question
              feedback until you submit or time expires.
            </p>
            <button type="button" className="btn primary" onClick={startExam}>
              Start timed review
            </button>
          </div>
        </>
      )}

      <p className="footer-note">
        Concept tool: questions and explanations were AI-drafted from public Splunk
        documentation and training outlines—not affiliated with Splunk. Validate every
        answer against official Splunk Help before you rely on it.
      </p>
    </div>
  )
}
