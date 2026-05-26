import { createContext, useContext, useState } from 'react'
import data from '../data/data.json'

const AppContext = createContext(null)

export function AppProvider({ children }) {

  const [activePhaseId,   setActivePhaseId]   = useState('discover')
  const [activeScreenId,  setActiveScreenId]  = useState('landing')
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [selectedTheme,   setSelectedTheme]   = useState(null)

  const [filters, setFilters] = useState({
    channel:      'All Channels',
    segment:      'All Segments',
    wave:         'All Waves',
    researchType: 'All',
  })

  const [completedScreens, setCompletedScreens] = useState(new Set())

  const currentPhase  = data.navigation.find(p => p.id === activePhaseId)
  const currentScreen = currentPhase?.screens.find(s => s.id === activeScreenId)

  function goToPhase(phaseId) {
    const phase = data.navigation.find(p => p.id === phaseId)
    if (!phase) return
    setActivePhaseId(phaseId)
    setActiveScreenId(phase.screens[0].id)
  }

  function goToScreen(screenId) {
    setActiveScreenId(screenId)
  }

  function goToHome() {
    setActiveScreenId('home')
  }

  function goToLanding() {
    setActiveScreenId('landing')
  }

  function advance() {
    const screens = currentPhase?.screens ?? []
    const idx     = screens.findIndex(s => s.id === activeScreenId)
    setCompletedScreens(prev => new Set([...prev, activeScreenId]))
    if (idx < screens.length - 1) {
      setActiveScreenId(screens[idx + 1].id)
    } else {
      const phaseIdx = data.navigation.findIndex(p => p.id === activePhaseId)
      if (phaseIdx < data.navigation.length - 1) {
        const nextPhase = data.navigation[phaseIdx + 1]
        setActivePhaseId(nextPhase.id)
        setActiveScreenId(nextPhase.screens[0].id)
      }
    }
  }

  function updateFilter(key, value) {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  function isScreenComplete(screenId) {
    return completedScreens.has(screenId)
  }

  function isPhaseComplete(phaseId) {
    const phase = data.navigation.find(p => p.id === phaseId)
    if (!phase) return false
    return phase.screens.every(s => completedScreens.has(s.id))
  }

  function getFilteredVariants() {
    const variants = data.screens.generateVariants.variants
    return variants.filter(v => {
      const channelMatch =
        filters.channel === 'All Channels' || v.channel === filters.channel
      const segmentMatch =
        filters.segment === 'All Segments' ||
        v.segment === filters.segment ||
        v.segment.includes(filters.segment)
      return channelMatch && segmentMatch
    })
  }

  function getFilteredEngagementData() {
    const all    = data.screens.analytics.engagementChart.allChannels
    const byWave = data.screens.analytics.engagementChart.byWave
    let rows = all
    if (filters.wave !== 'All Waves') {
      const indices = byWave[filters.wave] ?? []
      rows = indices.map(i => all[i]).filter(Boolean)
    }
    const channelKeyMap = {
      'Veeva CLM': 'veevaCLM',
      'Email':     'email',
      'Display':   'display',
    }
    const seriesKey = channelKeyMap[filters.channel]
    if (seriesKey) {
      return rows.map(r => ({
        week: r.week, value: r[seriesKey], label: filters.channel,
      }))
    }
    return rows.map(r => ({
      week: r.week, total: r.total,
      veevaCLM: r.veevaCLM, email: r.email, display: r.display,
    }))
  }

  function getFilteredWinningVariants() {
    const variants = data.screens.analytics.winningVariants
    return variants.filter(v => {
      const channelMatch =
        filters.channel === 'All Channels' || v.channel === filters.channel
      const segmentMatch =
        filters.segment === 'All Segments' ||
        v.segment === filters.segment ||
        v.segment.includes(filters.segment)
      return channelMatch && segmentMatch
    })
  }

  function getFilteredResearch() {
    const screen = data.screens.primaryResearch
    const type   = filters.researchType
    if (type === 'All')            return screen
    if (type === 'KOL Interviews') return { ...screen, showKol: true,  showSurvey: false, showSocial: false, showCompetitive: false }
    if (type === 'HCP Survey')     return { ...screen, showKol: false, showSurvey: true,  showSocial: false, showCompetitive: false }
    if (type === 'Social Signal')  return { ...screen, showKol: false, showSurvey: false, showSocial: true,  showCompetitive: false }
    if (type === 'Competitive')    return { ...screen, showKol: false, showSurvey: false, showSocial: false, showCompetitive: true  }
    return screen
  }

  const value = {
    data,
    activePhaseId,
    activeScreenId,
    currentPhase,
    currentScreen,
    sidebarExpanded,
    setSidebarExpanded,
    selectedTheme,
    setSelectedTheme,
    goToPhase,
    goToScreen,
    goToHome,
    goToLanding,
    advance,
    filters,
    updateFilter,
    completedScreens,
    isScreenComplete,
    isPhaseComplete,
    getFilteredVariants,
    getFilteredEngagementData,
    getFilteredWinningVariants,
    getFilteredResearch,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}