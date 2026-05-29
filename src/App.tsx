import { useCallback, useState } from 'react'
import './App.css'
import { GlossaryView } from './components/Glossary'
import { LearningFlow } from './components/LearningFlow'
import { LearningPathPicker } from './components/LearningPathPicker'
import { MainMenu } from './components/MainMenu'
import { LEARNING_PATHS } from './data/learningPaths'

type AppView = 'main-menu' | 'path-picker' | 'track' | 'glossary'

export default function App() {
  const [view, setView] = useState<AppView>('main-menu')
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null)
  const [glossaryReturn, setGlossaryReturn] = useState<'main-menu' | 'track'>(
    'main-menu',
  )

  const openTrack = useCallback((trackId: string) => {
    setActiveTrackId(trackId)
    setView('track')
  }, [])

  const openGlossaryFromMenu = useCallback(() => {
    setGlossaryReturn('main-menu')
    setView('glossary')
  }, [])

  const openGlossaryFromTrack = useCallback(() => {
    setGlossaryReturn('track')
    setView('glossary')
  }, [])

  const closeGlossary = useCallback(() => {
    setView(glossaryReturn === 'track' ? 'track' : 'main-menu')
  }, [glossaryReturn])

  if (view === 'main-menu') {
    return (
      <MainMenu
        onBrowsePaths={() => setView('path-picker')}
        onOpenGlossary={openGlossaryFromMenu}
      />
    )
  }

  if (view === 'path-picker') {
    return (
      <LearningPathPicker
        paths={LEARNING_PATHS}
        onSelectTrack={(id) => openTrack(id)}
        onBack={() => setView('main-menu')}
      />
    )
  }

  if (view === 'glossary') {
    return (
      <GlossaryView
        key={
          glossaryReturn === 'track'
            ? (activeTrackId ?? 'track-unknown')
            : 'main-menu-glossary'
        }
        onBack={closeGlossary}
        trackId={glossaryReturn === 'track' ? activeTrackId : null}
      />
    )
  }

  if (view === 'track' && activeTrackId) {
    return (
      <LearningFlow
        trackId={activeTrackId}
        onMainMenu={() => {
          setActiveTrackId(null)
          setView('main-menu')
        }}
        onChangePath={() => setView('path-picker')}
        onOpenGlossary={openGlossaryFromTrack}
      />
    )
  }

  return (
    <MainMenu
      onBrowsePaths={() => setView('path-picker')}
      onOpenGlossary={openGlossaryFromMenu}
    />
  )
}
