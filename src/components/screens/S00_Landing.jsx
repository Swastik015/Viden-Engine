import { Search, FileText, Layers, PlayCircle, ArrowRight, LayoutGrid } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'

const PHASE_CARDS = [
  {
    id:          'campaigns',
    icon:        LayoutGrid,
    label:       'Campaigns',
    description: 'Browse campaign themes, view prior campaigns and start a new campaign from a recommended template.',
    color:       { bg: '#1E1B4B', border: '#2D2A6E', icon: '#67E8F9', btn: '#1E1B4B' },
    route:       'home',
  },
  {
    id:          'discover',
    icon:        Search,
    label:       'Discover',
    description: 'Surface prior intelligence, run primary research and align audience messaging themes.',
    color:       { bg: '#EEF2FF', border: '#C7D2FE', icon: '#4338CA', btn: '#1E1B4B' },
    route:       'discover',
  },
  {
    id:          'plan',
    icon:        FileText,
    label:       'Plan',
    description: 'Review the AI-generated campaign brief and configure your content strategy.',
    color:       { bg: '#ECFEFF', border: '#A5F3FC', icon: '#0E7490', btn: '#0E7490' },
    route:       'plan',
  },
  {
    id:          'create',
    icon:        Layers,
    label:       'Create',
    description: 'Generate channel-specific content variants and pass them through MLR compliance.',
    color:       { bg: '#F0FDF4', border: '#BBF7D0', icon: '#166534', btn: '#166634' },
    route:       'create',
  },
  {
    id:          'activate',
    icon:        PlayCircle,
    label:       'Activate',
    description: 'Launch across all channels, track performance and detect content fatigue.',
    color:       { bg: '#FFF7ED', border: '#FED7AA', icon: '#C2410C', btn: '#C2410C' },
    route:       'activate',
  },
]

export default function S00_Landing() {
  const { goToHome, goToPhase, goToScreen } = useApp()

  function handleCardClick(card) {
    if (card.route === 'home') {
      goToHome()
    } else {
      goToPhase(card.route)
    }
  }

  return (
    <div className="min-h-full flex flex-col items-center justify-center py-16">

      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 bg-brand-800 rounded-xl flex items-center
                          justify-center">
            <span className="font-bold text-teal-400 text-lg">V</span>
          </div>
          <h1
            className="text-3xl font-semibold text-ink-900 tracking-tight"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            Viden Engine
          </h1>
        </div>
        <p className="text-ink-400 text-sm">
          Where do you want to start?
        </p>
      </div>

      {/* 5 Cards */}
      <div className="grid grid-cols-5 gap-4 w-full max-w-6xl">
        {PHASE_CARDS.map(card => {
          const Icon     = card.icon
          const isDark   = card.id === 'campaigns'

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              className="card flex flex-col items-start p-6 text-left
                         hover:shadow-md transition-all duration-200
                         hover:-translate-y-0.5 cursor-pointer overflow-hidden
                         relative"
              style={isDark ? {
                background: 'linear-gradient(135deg, #1E1B4B, #2D2A6E)',
                border: 'none',
              } : {}}
            >
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center
                            justify-center mb-4"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.1)' : card.color.bg,
                  border:     isDark ? '1px solid rgba(255,255,255,0.2)'
                                     : `1px solid ${card.color.border}`,
                }}
              >
                <Icon
                  size={20}
                  style={{ color: card.color.icon }}
                  strokeWidth={1.8}
                />
              </div>

              {/* Label */}
              <h2
                className="text-lg font-semibold mb-2"
                style={{
                  fontFamily: 'Geist, sans-serif',
                  color: isDark ? '#ffffff' : '#1F2433',
                }}
              >
                {card.label}
              </h2>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-5 flex-1"
                style={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#777E94' }}
              >
                {card.description}
              </p>

              {/* Arrow */}
              <div
                className="flex items-center gap-1.5 text-xs font-semibold"
                style={{ color: isDark ? '#67E8F9' : card.color.btn }}
              >
                Get started
                <ArrowRight size={13} />
              </div>

            </button>
          )
        })}
      </div>

    </div>
  )
}