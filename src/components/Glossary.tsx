import { useEffect, useMemo, useState } from 'react'
import {
  getGlossaryDomain,
  getGlossaryDomainsForTrack,
  type GlossaryDomain,
  type GlossaryDomainId,
  type LearningPathSection,
} from '../data/glossary'

function groupDomainsBySection(
  domains: GlossaryDomain[],
): { section: LearningPathSection | null; domains: GlossaryDomain[] }[] {
  if (!domains[0]?.pathSection) {
    return [{ section: null, domains }]
  }
  const order: LearningPathSection[] = [
    'Core User',
    'Core Power User',
    'Core Advanced Power User',
  ]
  const buckets = new Map<LearningPathSection, GlossaryDomain[]>()
  for (const d of domains) {
    if (!d.pathSection) continue
    const list = buckets.get(d.pathSection) ?? []
    list.push(d)
    buckets.set(d.pathSection, list)
  }
  return order
    .filter((s) => buckets.has(s))
    .map((s) => ({ section: s, domains: buckets.get(s)! }))
}

function glossarySubtitle(trackId: string | null | undefined): string {
  if (!trackId) {
    return 'Commands and concepts across Core, Power, and Advanced Power User topics researched from public Splunk materials (with docs links).'
  }
  if (trackId === 'splunk-cloud-admin') {
    return 'Concepts by Cloud Platform administration topic domain (with docs links).'
  }
  if (trackId === 'core-power-user') {
    return 'Concepts by Core Power User topic outline (with docs links).'
  }
  if (trackId === 'core-advanced-power-user') {
    return 'Concepts by Advanced Power User topic outline (with docs links).'
  }
  if (trackId === 'core-user') {
    return 'Concepts by Core User topic outline (with docs links).'
  }
  return 'Commands and concepts with links into Splunk documentation.'
}

function glossaryTitle(trackId: string | null | undefined): string {
  if (trackId === 'splunk-cloud-admin') return 'Splunk Cloud administration reference'
  if (trackId === 'core-power-user') return 'Splunk Core Power User reference'
  if (trackId === 'core-advanced-power-user') return 'Splunk Advanced Power User reference'
  if (trackId === 'core-user') return 'Splunk Core User reference'
  return 'SPL reference'
}

export function GlossaryView({
  onBack,
  trackId,
}: {
  onBack: () => void
  trackId?: string | null
}) {
  const domains = useMemo(() => getGlossaryDomainsForTrack(trackId), [trackId])
  const navGroups = useMemo(() => groupDomainsBySection(domains), [domains])
  const [activeId, setActiveId] = useState<GlossaryDomainId>(() => domains[0].id)

  useEffect(() => {
    if (domains.length === 0) return
    if (!domains.some((d) => d.id === activeId)) {
      setActiveId(domains[0].id)
    }
  }, [domains, activeId])

  const domain = useMemo(() => getGlossaryDomain(activeId), [activeId])

  return (
    <div className="glossary-layout">
      <header className="glossary-header row spread">
        <div>
          <h1 style={{ margin: 0 }}>{glossaryTitle(trackId)}</h1>
          <p className="muted" style={{ margin: '0.25rem 0 0' }}>
            {glossarySubtitle(trackId)}
          </p>
        </div>
        <button type="button" className="btn" onClick={onBack}>
          ← Home
        </button>
      </header>

      <div className="glossary-body">
        <nav className="glossary-nav card" aria-label="Topic domains">
          <h2 className="glossary-nav-title">Topics</h2>
          {navGroups.map((group) => (
            <div key={group.section ?? 'all'} className="glossary-nav-group">
              {group.section && (
                <h3 className="glossary-nav-section">{group.section}</h3>
              )}
              <ul className="glossary-nav-list">
                {group.domains.map((d) => (
                  <li key={d.id}>
                    <button
                      type="button"
                      className={
                        d.id === activeId
                          ? 'glossary-nav-btn active'
                          : 'glossary-nav-btn'
                      }
                      onClick={() => setActiveId(d.id)}
                    >
                      {d.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <article className="glossary-main card">
          {domain ? (
            <>
              {domain.pathSection && (
                <p className="glossary-track-label muted">{domain.pathSection}</p>
              )}
              <h2 style={{ marginTop: 0 }}>{domain.title}</h2>
              <p>{domain.overview}</p>

              <h3>Official references</h3>
              <ul className="links">
                {domain.referenceUrls.map((r) => (
                  <li key={r.url}>
                    <a href={r.url} target="_blank" rel="noreferrer">
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>

              <h3>Glossary</h3>
              <dl className="glossary-dl">
                {domain.entries.map((e) => (
                  <div key={e.term} className="glossary-entry">
                    <dt>
                      <span className="glossary-term">{e.term}</span>{' '}
                      <span className="badge">{e.kind}</span>
                    </dt>
                    <dd>
                      <p>{e.summary}</p>
                      {e.example && (
                        <pre className="glossary-example">
                          <code>{e.example}</code>
                        </pre>
                      )}
                      {e.docUrl && (
                        <p className="muted">
                          <a href={e.docUrl} target="_blank" rel="noreferrer">
                            Splunk docs →
                          </a>
                        </p>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          ) : null}
        </article>
      </div>

      <p className="footer-note">
        Summaries are study aids derived from public Splunk documentation themes—not
        verbatim excerpts. Always refer to Splunk Help for authoritative syntax.
      </p>
    </div>
  )
}
