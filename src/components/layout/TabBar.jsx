import { Check } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'

const ACTOR_STYLES = {
  user: { dot: 'bg-blue-400',    label: 'You'        },
  ke:   { dot: 'bg-purple-400',  label: 'KE'         },
  gs:   { dot: 'bg-emerald-400', label: 'GenStudio'  },
}

export default function TabBar() {
  const {
    data,
    activePhaseId,
    activeScreenId,
    goToScreen,
    isScreenComplete,
  } = useApp()

  const activePhase = data.navigation.find(p => p.id === activePhaseId)
  if (!activePhase) return null

  return (
    <div className="flex-shrink-0 bg-white border-b border-ink-200
                    overflow-x-auto scrollbar-thin">
      <div className="flex items-stretch px-6 gap-0.5 min-w-max">
        {activePhase.screens
          .filter(screen => screen.id !== 'store-learnings')
          .map((screen) => {
            const isActive   = screen.id === activeScreenId
            const isDone     = isScreenComplete(screen.id)
            const actor      = ACTOR_STYLES[screen.actor] ?? ACTOR_STYLES.user
            const stepLabel  = String(screen.step).padStart(2, '0')

            return (
              <button
                key={screen.id}
                onClick={() => goToScreen(screen.id)}
                className={`
                  relative flex items-center gap-2 px-4 h-11
                  text-sm font-medium whitespace-nowrap
                  border-b-2 transition-all duration-150 cursor-pointer
                  focus:outline-none
                  ${isActive
                    ? 'border-brand-800 text-ink-900 font-semibold'
                    : isDone
                      ? 'border-transparent text-ink-500 hover:text-ink-700 hover:border-ink-200'
                      : 'border-transparent text-ink-400 hover:text-ink-700 hover:border-ink-200'
                  }
                `}
              >
                {/* Step number / check */}
                <span className={`
                  w-5 h-5 rounded-full flex items-center justify-center
                  text-[9px] font-bold flex-shrink-0
                  transition-all duration-150
                  ${isActive
                    ? 'bg-brand-800 text-white'
                    : isDone
                      ? 'bg-ok-600 text-white'
                      : 'bg-ink-100 text-ink-500'
                  }
                `}>
                  {isDone && !isActive
                    ? <Check size={9} strokeWidth={3} />
                    : stepLabel
                  }
                </span>

                {/* Label */}
                <span>{screen.label}</span>

                {/* Actor dot */}
                <span
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${actor.dot}`}
                  title={actor.label}
                />
              </button>
            )
          })}
      </div>
    </div>
  )
}