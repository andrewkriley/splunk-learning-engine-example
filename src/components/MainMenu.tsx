export function MainMenu(props: {
  onBrowsePaths: () => void
  onOpenGlossary: () => void
  onOpenLabGuides: () => void
}) {
  const { onBrowsePaths, onOpenGlossary, onOpenLabGuides } = props

  return (
    <div className="app main-menu">
      <header className="main-menu-hero">
        <h1>example-splunk-learning-engine</h1>
        <p className="muted main-menu-lead">
          A concept demo: AI read publicly available Splunk documentation and training
          outlines to draft topics, questions, and glossary entries. Content may be
          incorrect or outdated—always validate answers against official Splunk sources.
        </p>
      </header>

      <div className="main-menu-grid">
        <button
          type="button"
          className="main-menu-tile card"
          onClick={onBrowsePaths}
        >
          <h2>Browse learning paths</h2>
          <p>
            Pick a topic area (Core User, Power User, Cloud admin, and more). Practice
            with feedback or run a timed review where activities are ready.
          </p>
          <span className="main-menu-tile-cta">Choose a path →</span>
        </button>

        <button
          type="button"
          className="main-menu-tile card"
          onClick={onOpenGlossary}
        >
          <h2>SPL reference</h2>
          <p>
            Commands and concepts grouped by learning path topics, with links into Splunk
            Help and public documentation.
          </p>
          <span className="main-menu-tile-cta">Open reference →</span>
        </button>

        <button
          type="button"
          className="main-menu-tile card"
          onClick={onOpenLabGuides}
        >
          <h2>Lab guides</h2>
          <p>
            Step-by-step hands-on scenarios in your Splunk environment—starting with Core
            Power User (charts, fields, macros, data models, and more).
          </p>
          <span className="main-menu-tile-cta">Open lab guides →</span>
        </button>
      </div>

      <p className="footer-note">
        Concept tool—not affiliated with Splunk. AI-sourced from public docs; you must
        verify answers on{' '}
        <a href="https://help.splunk.com" target="_blank" rel="noreferrer">
          Splunk Help
        </a>
        .
      </p>
    </div>
  )
}
