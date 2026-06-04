import { useCallback, useState } from 'react'
import './App.css'
import { GlossaryView } from './components/Glossary'
import { LabGuidePicker, LabGuideView } from './components/LabGuide'
import { LearningFlow } from './components/LearningFlow'
import { LearningPathPicker } from './components/LearningPathPicker'
import { MainMenu } from './components/MainMenu'
import { LEARNING_PATHS } from './data/learningPaths'

type AppView =
  | 'main-menu'
  | 'path-picker'
  | 'track'
  | 'glossary'
  | 'lab-picker'
  | 'lab-guide'

export default function App() {
  const [view, setView] = useState<AppView>('main-menu')
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null)
  const [glossaryReturn, setGlossaryReturn] = useState<'main-menu' | 'track'>(
    'main-menu',
  )
  const [labReturn, setLabReturn] = useState<'main-menu' | 'track' | 'lab-picker'>(
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

  const openLabPicker = useCallback(() => {
    setLabReturn('main-menu')
    setView('lab-picker')
  }, [])

  const openLabFromTrack = useCallback((trackId: string) => {
    setActiveTrackId(trackId)
    setLabReturn('track')
    setView('lab-guide')
  }, [])

  const openLabFromPicker = useCallback((trackId: string) => {
    setActiveTrackId(trackId)
    setLabReturn('lab-picker')
    setView('lab-guide')
  }, [])

  const closeLab = useCallback(() => {
    if (labReturn === 'track') setView('track')
    else if (labReturn === 'lab-picker') setView('lab-picker')
    else setView('main-menu')
  }, [labReturn])

  if (view === 'main-menu') {
    return (
      <MainMenu
        onBrowsePaths={() => setView('path-picker')}
        onOpenGlossary={openGlossaryFromMenu}
        onOpenLabGuides={openLabPicker}
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

  if (view === 'lab-picker') {
    return (
      <LabGuidePicker
        onBack={() => setView('main-menu')}
        onSelectTrack={openLabFromPicker}
      />
    )
  }

  if (view === 'lab-guide' && activeTrackId) {
    return (
      <LabGuideView
        key={activeTrackId}
        trackId={activeTrackId}
        onBack={closeLab}
        backLabel={
          labReturn === 'track'
            ? '← Back to path'
            : labReturn === 'lab-picker'
              ? '← Lab guides'
              : '← Main menu'
        }
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
        onOpenLabGuide={
          activeTrackId === 'core-power-user'
            ? () => openLabFromTrack(activeTrackId)
            : undefined
        }
      />
    )
  }

  return (
    <MainMenu
      onBrowsePaths={() => setView('path-picker')}
      onOpenGlossary={openGlossaryFromMenu}
      onOpenLabGuides={openLabPicker}
    />
  )
}
