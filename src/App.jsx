import { useApp } from './context/AppContext.jsx'
import Sidebar  from './components/layout/Sidebar.jsx'
import Topbar   from './components/layout/Topbar.jsx'
import TabBar   from './components/layout/TabBar.jsx'

import S01_StartCampaign     from './components/screens/S01_StartCampaign.jsx'
import S02_PriorIntelligence from './components/screens/S02_PriorIntelligence.jsx'
import S03_PrimaryResearch   from './components/screens/S03_PrimaryResearch.jsx'
import S04_AlignAudience     from './components/screens/S04_AlignAudience.jsx'
import S05_CampaignBrief     from './components/screens/S05_CampaignBrief.jsx'
import S06_ContentStrategy   from './components/screens/S06_ContentStrategy.jsx'
import S07_GenerateVariants  from './components/screens/S07_GenerateVariants.jsx'
import S08_MLRCompliance     from './components/screens/S08_MLRCompliance.jsx'
import S09_LaunchCampaign    from './components/screens/S09_LaunchCampaign.jsx'
import S10_Analytics         from './components/screens/S10_Analytics.jsx'
import S11_RefreshContent    from './components/screens/S11_RefreshContent.jsx'
import S12_StoreLearnings    from './components/screens/S12_StoreLearnings.jsx'

// ── Screen registry ───────────────────────────────────────────────────────────
const SCREEN_MAP = {
  'start-campaign':     <S01_StartCampaign />,
  'prior-intelligence': <S02_PriorIntelligence />,
  'primary-research':   <S03_PrimaryResearch />,
  'align-audience':     <S04_AlignAudience />,
  'campaign-brief':     <S05_CampaignBrief />,
  'content-strategy':   <S06_ContentStrategy />,
  'generate-variants':  <S07_GenerateVariants />,
  'mlr-compliance':     <S08_MLRCompliance />,
  'launch-campaign':    <S09_LaunchCampaign />,
  'analytics':          <S10_Analytics />,
  'refresh-content':    <S11_RefreshContent />,
  'store-learnings':    <S12_StoreLearnings />,
}

export default function App() {
  const { activeScreenId, sidebarExpanded } = useApp()

  const currentScreen = SCREEN_MAP[activeScreenId] ?? (
    <div className="flex items-center justify-center h-full text-ink-400">
      Screen not found: {activeScreenId}
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F3EE]">

      {/* ── Left Sidebar ── */}
      <Sidebar />

      {/* ── Right side: topbar + tabs + content ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* Top bar */}
        <Topbar />

        {/* Phase tab bar */}
        <TabBar />

        {/* Screen content */}
        <main
          key={activeScreenId}
          className="flex-1 overflow-y-auto scrollbar-thin animate-fadeIn"
        >
          <div className="p-8 max-w-[1400px]">
            {currentScreen}
          </div>
        </main>

      </div>
    </div>
  )
}