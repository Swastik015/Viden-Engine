import {
  Search,
  FileText,
  Layers,
  PlayCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  LayoutGrid,
} from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'

const ICON_MAP = {
  Search:     Search,
  FileText:   FileText,
  Layers:     Layers,
  PlayCircle: PlayCircle,
}

export default function Sidebar() {
  const {
    data,
    activePhaseId,
    activeScreenId,
    sidebarExpanded,
    setSidebarExpanded,
    goToPhase,
    goToScreen,
    goToHome,
    isPhaseComplete,
  } = useApp()

  return (
    <aside
      className={`
        relative flex flex-col h-full bg-white border-r border-ink-200
        transition-all duration-300 ease-in-out flex-shrink-0
        ${sidebarExpanded ? 'w-56' : 'w-16'}
      `}
    >

      {/* ── Toggle button ── */}
      <div
        className={`
          flex items-center h-[52px] border-b border-ink-100 px-3
          ${sidebarExpanded ? 'justify-between' : 'justify-center'}
        `}
      >
        {sidebarExpanded && (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-800 rounded-md flex items-center
                            justify-center flex-shrink-0">
              <Zap size={12} className="text-teal-400" />
            </div>
            <span
              className="font-semibold text-sm text-ink-900 tracking-tight"
              style={{ fontFamily: 'Geist, sans-serif' }}
            >
              Viden <span className="text-teal-700 font-medium">Engine</span>
            </span>
          </div>
        )}

        <button
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
          className="w-7 h-7 rounded-md flex items-center justify-center
                     text-ink-400 hover:text-ink-700 hover:bg-ink-50
                     transition-colors duration-150"
          title={sidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {sidebarExpanded
            ? <ChevronLeft  size={16} />
            : <ChevronRight size={16} />
          }
        </button>
      </div>

      {/* ── Campaign context chip ── */}
      {sidebarExpanded && (
        <div className="px-3 py-2.5 border-b border-ink-100">
          <div className="flex items-center gap-2 px-2.5 py-2 bg-brand-50
                          border border-brand-100 rounded-lg cursor-pointer
                          hover:bg-brand-100 transition-colors duration-150">
            <div className="w-6 h-6 bg-brand-800 rounded flex items-center
                            justify-center flex-shrink-0">
              <PlayCircle size={11} className="text-teal-400" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-brand-900 truncate">
                Vyepti Q3 2026
              </div>
              <div className="text-[10px] text-brand-700 mt-0.5">
                HCP Launch · Sep 14
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Campaigns button ── */}
      <div className="px-2 pt-2">
        <button
          onClick={() => goToHome()}
          title={!sidebarExpanded ? 'Campaigns' : undefined}
          className={`
            w-full flex items-center rounded-lg
            transition-all duration-150 cursor-pointer
            ${sidebarExpanded ? 'gap-3 px-3 py-2.5' : 'justify-center p-3'}
            ${activeScreenId === 'home'
              ? 'bg-brand-50 text-brand-800 shadow-[inset_3px_0_0_#1E1B4B]'
              : 'text-ink-500 hover:bg-ink-50 hover:text-ink-900'
            }
          `}
        >
          <LayoutGrid size={18} className="flex-shrink-0" strokeWidth={1.8} />
          {sidebarExpanded && (
            <span className="flex-1 text-sm text-left font-medium">
              Campaigns
            </span>
          )}
        </button>
      </div>

      {/* ── Section label ── */}
      {sidebarExpanded && (
        <div className="px-4 pt-3 pb-1">
          <span className="text-[10px] font-bold uppercase tracking-widest
                           text-ink-400">
            Campaign
          </span>
        </div>
      )}

      {/* ── Phase nav items ── */}
      <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto
                      scrollbar-thin">
        {data.navigation.map((phase) => {
          const Icon     = ICON_MAP[phase.icon] ?? Search
          const isActive = phase.id === activePhaseId
                        && activeScreenId !== 'home'
                        && activeScreenId !== 'landing'
          const isDone   = isPhaseComplete(phase.id)

          return (
            <button
              key={phase.id}
              onClick={() => goToPhase(phase.id)}
              title={!sidebarExpanded ? phase.label : undefined}
              className={`
                w-full flex items-center rounded-lg
                transition-all duration-150 cursor-pointer
                ${sidebarExpanded ? 'gap-3 px-3 py-2.5' : 'justify-center p-3'}
                ${isActive
                  ? 'bg-brand-50 text-brand-800 shadow-[inset_3px_0_0_#1E1B4B]'
                  : isDone
                    ? 'text-ok-700 hover:bg-ok-50'
                    : 'text-ink-500 hover:bg-ink-50 hover:text-ink-900'
                }
              `}
            >
              <Icon
                size={18}
                className="flex-shrink-0"
                strokeWidth={isActive ? 2.2 : 1.8}
              />

              {sidebarExpanded && (
                <>
                  <span className={`
                    flex-1 text-sm text-left
                    ${isActive ? 'font-semibold' : 'font-medium'}
                  `}>
                    {phase.label}
                  </span>
                  <span className={`
                    text-[10px] font-mono px-1.5 py-0.5 rounded-full
                    ${isActive
                      ? 'bg-brand-100 text-brand-700'
                      : isDone
                        ? 'bg-ok-100 text-ok-700'
                        : 'bg-ink-100 text-ink-500'
                    }
                  `}>
                    {phase.screens.length}
                  </span>
                </>
              )}
            </button>
          )
        })}
      </nav>

      {/* ── Current step indicator ── */}
      {sidebarExpanded && activeScreenId !== 'home' && activeScreenId !== 'landing' && (
        <div className="px-3 py-2 border-t border-ink-100">
          <div className="px-3 py-2 bg-ink-50 rounded-lg">
            <div className="text-[10px] font-semibold uppercase tracking-wider
                            text-ink-400 mb-1">
              Current step
            </div>
            {data.navigation.map(phase =>
              phase.screens.map(screen => {
                if (screen.id !== activeScreenId) return null
                return (
                  <div key={screen.id} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-600
                                     flex-shrink-0" />
                    <span className="text-xs font-medium text-ink-700 truncate">
                      {screen.label}
                    </span>
                    <span className="ml-auto font-mono text-[10px] text-ink-400">
                      {String(screen.step).padStart(2, '0')}
                    </span>
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}

      {/* ── Settings ── */}
      <div className="px-2 pb-3 pt-2 border-t border-ink-100">
        <button
          className={`
            w-full flex items-center rounded-lg text-ink-500
            hover:bg-ink-50 hover:text-ink-900
            transition-colors duration-150
            ${sidebarExpanded ? 'gap-3 px-3 py-2.5' : 'justify-center p-3'}
          `}
          title={!sidebarExpanded ? 'Settings' : undefined}
        >
          <Settings size={18} strokeWidth={1.8} className="flex-shrink-0" />
          {sidebarExpanded && (
            <span className="text-sm font-medium">Settings</span>
          )}
        </button>
      </div>

    </aside>
  )
}