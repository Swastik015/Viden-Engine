import { Search, Bell, HelpCircle } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'

export default function Topbar() {
  const { data, activePhaseId, currentScreen } = useApp()

  const activePhase = data.navigation.find(p => p.id === activePhaseId)

  return (
    <header className="h-[52px] bg-white border-b border-ink-200 flex items-center
                       px-5 gap-4 flex-shrink-0 z-10">

      {/* ── Breadcrumb ── */}
      <nav className="flex items-center gap-2 text-xs text-ink-500">
        <span>Lundbeck US</span>
        <span className="text-ink-300">/</span>
        <span>Vyepti</span>
        <span className="text-ink-300">/</span>
        <span className="text-ink-700 font-medium">
          {activePhase?.label}
        </span>
        {currentScreen && (
          <>
            <span className="text-ink-300">·</span>
            <span className="text-ink-900 font-semibold">
              {currentScreen.label}
            </span>
          </>
        )}
      </nav>

      {/* ── Spacer ── */}
      <div className="flex-1" />

      {/* ── Search ── */}
      <div className="relative">
        <Search
          size={13}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-400"
        />
        <input
          type="text"
          placeholder="Search claims, KOLs, assets…"
          className="w-56 h-8 pl-8 pr-3 bg-ink-50 border border-ink-200
                     rounded-lg text-xs text-ink-800 placeholder-ink-400
                     focus:outline-none focus:border-brand-400 focus:bg-white
                     transition-all duration-150"
        />
      </div>

      {/* ── Notifications ── */}
      <button className="relative w-8 h-8 rounded-lg flex items-center justify-center
                         text-ink-500 hover:text-ink-900 hover:bg-ink-100
                         transition-colors duration-150">
        <Bell size={16} strokeWidth={1.8} />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-teal-500
                         rounded-full border border-white" />
      </button>

      {/* ── Help ── */}
      <button className="w-8 h-8 rounded-lg flex items-center justify-center
                         text-ink-500 hover:text-ink-900 hover:bg-ink-100
                         transition-colors duration-150">
        <HelpCircle size={16} strokeWidth={1.8} />
      </button>

      {/* ── Avatar ── */}
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-700
                      to-brand-500 flex items-center justify-center
                      text-white text-[10px] font-bold tracking-wide
                      cursor-pointer">
        MC
      </div>

    </header>
  )
}