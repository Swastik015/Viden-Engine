import { useState } from 'react'
import {
  Zap, RefreshCw, Users, Calendar, BookOpen,
  ArrowRightLeft, MapPin, Heart, Star, ArrowRight,
  ChevronRight, Sparkles,
} from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'

const ICON_MAP = {
  Zap, RefreshCw, Users, Calendar, BookOpen,
  ArrowRightLeft, MapPin, Heart,
}

export default function S00_Home() {
  const { data, goToPhase, setSelectedTheme } = useApp()
  const [activeTheme, setActiveTheme] = useState(null)

  const themes      = data.campaignThemes
  const recommended = themes.filter(t => t.keRecommended)

  function handleStartNew(theme) {
    setSelectedTheme(theme)
    goToPhase('discover')
  }

  function handleUseTemplate(theme) {
    setSelectedTheme(theme)
    goToPhase('discover')
  }

  return (
    <div className="min-h-full">

      {/* ── Header ── */}
      <div className="mb-8">
        <h1
          className="text-2xl font-semibold text-ink-900 mb-1"
          style={{ fontFamily: 'Geist, sans-serif' }}
        >
          Good morning, Maya 👋
        </h1>
        <p className="text-sm text-ink-400">
          Vyepti Q3 2026 · 18,400 HCPs · Go-live 14 Sep 2026
        </p>
      </div>

      {/* ── KE Recommendation Banner ── */}
      <div
        className="rounded-xl p-5 mb-8 flex items-center justify-between gap-6"
        style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #2D2A6E 100%)' }}
      >
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center
                          justify-center flex-shrink-0 mt-0.5">
            <Sparkles size={18} className="text-teal-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest
                               text-teal-400">
                KE · Recommended for you
              </span>
            </div>
            <p className="text-white font-medium text-sm mb-1">
              Based on Q3 performance data, Viden recommends starting with{' '}
              <strong className="text-teal-300">Onset of Action</strong> or{' '}
              <strong className="text-teal-300">Prior Failure Reset</strong> themes
            </p>
            <p className="text-white/60 text-xs">
              These themes have driven the highest TRx uplift across 7 prior
              Vyepti campaigns · +22% and +18% avg TRx uplift respectively
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {recommended.map(theme => {
            const Icon = ICON_MAP[theme.icon] ?? Zap
            return (
              <button
                key={theme.id}
                onClick={() => setActiveTheme(theme)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg
                           bg-white/10 hover:bg-white/20 transition-colors
                           text-white text-xs font-semibold border border-white/20"
              >
                <Icon size={13} />
                {theme.title}
                <span className="font-mono text-teal-300">
                  {theme.stats.trxUplift}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Section heading ── */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2
            className="text-lg font-semibold text-ink-900"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            {activeTheme ? activeTheme.title : 'Select a campaign theme'}
          </h2>
          <p className="text-xs text-ink-400 mt-0.5">
            {activeTheme
              ? 'Choose a prior campaign as template or start fresh'
              : 'Pick a theme to see prior campaigns or start fresh'
            }
          </p>
        </div>
        {activeTheme && (
          <button
            onClick={() => setActiveTheme(null)}
            className="text-xs text-ink-400 hover:text-ink-700 transition-colors"
          >
            ← Back to all themes
          </button>
        )}
      </div>

      {/* ── Theme grid ── */}
      {!activeTheme && (
        <div className="grid grid-cols-4 gap-4">
          {themes.map(theme => {
            const Icon  = ICON_MAP[theme.icon] ?? Zap
            const isNew = theme.stats.campaignsRun === 0
            return (
              <button
                key={theme.id}
                onClick={() => setActiveTheme(theme)}
                className="card flex flex-col items-start p-5 text-left
                           hover:shadow-md transition-all duration-200
                           hover:-translate-y-0.5 cursor-pointer relative"
              >
                {theme.keRecommended && (
                  <div className="absolute top-3 right-3 flex items-center gap-1
                                  px-1.5 py-0.5 rounded-full bg-teal-50
                                  border border-teal-200">
                    <Star size={9} className="text-teal-600 fill-teal-600" />
                    <span className="text-[9px] font-bold text-teal-700
                                     uppercase tracking-wide">
                      KE Pick
                    </span>
                  </div>
                )}

                <div
                  className="w-10 h-10 rounded-lg flex items-center
                              justify-center mb-3"
                  style={{
                    background: theme.color.bg,
                    border: `1px solid ${theme.color.border}`,
                  }}
                >
                  <Icon
                    size={18}
                    style={{ color: theme.color.icon }}
                    strokeWidth={1.8}
                  />
                </div>

                <h3
                  className="text-sm font-semibold text-ink-900 mb-1"
                  style={{ fontFamily: 'Geist, sans-serif' }}
                >
                  {theme.title}
                </h3>

                <p className="text-xs text-ink-400 leading-relaxed mb-4 flex-1">
                  {theme.description}
                </p>

                {!isNew ? (
                  <div className="w-full space-y-1.5">
                    <StatRow
                      label="Avg TRx uplift"
                      value={theme.stats.trxUplift}
                      color={theme.color.icon}
                      pct={parseInt(theme.stats.trxUplift) ?? 50}
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-ink-400">
                        {theme.stats.campaignsRun} campaigns run
                      </span>
                      <span
                        className="text-[10px] font-mono font-semibold"
                        style={{ color: theme.color.icon }}
                      >
                        {theme.stats.sovLift} SoV
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="text-[10px] font-semibold px-2 py-0.5
                                   rounded-full bg-ink-100 text-ink-500">
                    New theme · no prior data
                  </span>
                )}

                <div
                  className="flex items-center gap-1 mt-3 text-xs font-medium"
                  style={{ color: theme.color.btn }}
                >
                  Select theme
                  <ChevronRight size={12} />
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* ── Theme detail ── */}
      {activeTheme && (
        <ThemeDetail
          theme={activeTheme}
          onStartNew={() => handleStartNew(activeTheme)}
          onUseTemplate={() => handleUseTemplate(activeTheme)}
          onBack={() => setActiveTheme(null)}
        />
      )}

    </div>
  )
}

/* ── Theme detail panel ── */
function ThemeDetail({ theme, onStartNew, onUseTemplate, onBack }) {
  const Icon  = ICON_MAP[theme.icon] ?? Zap
  const isNew = theme.stats.campaignsRun === 0

  return (
    <div className="animate-fadeIn">

      {/* Theme header */}
      <div
        className="rounded-xl p-6 mb-5 flex items-center gap-5"
        style={{
          background: `linear-gradient(135deg, ${theme.color.bg} 0%, #ffffff 60%)`,
          border: `1px solid ${theme.color.border}`,
        }}
      >
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center
                     flex-shrink-0"
          style={{
            background: theme.color.bg,
            border: `1px solid ${theme.color.border}`,
          }}
        >
          <Icon size={26} style={{ color: theme.color.icon }} strokeWidth={1.5} />
        </div>

        <div className="flex-1">
          <h2
            className="text-xl font-semibold text-ink-900 mb-1"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            {theme.title}
          </h2>
          <p className="text-sm text-ink-500">{theme.description}</p>
        </div>

        {!isNew && (
          <div className="flex gap-6 flex-shrink-0">
            {[
              { label: 'Avg TRx uplift', value: theme.stats.trxUplift },
              { label: 'Avg SoV lift',   value: theme.stats.sovLift   },
              { label: 'Campaigns run',  value: `${theme.stats.campaignsRun}` },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-2xl font-semibold tracking-tight"
                  style={{ color: theme.color.btn, fontFamily: 'Geist, sans-serif' }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-ink-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Two options */}
      <div className="grid grid-cols-2 gap-5">

        {/* Option A — Prior campaigns */}
        <div className="card">
          <div className="card-head">
            <div className="card-title">
              Use a prior campaign as template
            </div>
            {!isNew && (
              <span className="text-xs font-mono text-ink-400">
                {theme.priorCampaigns.length} available
              </span>
            )}
          </div>

          {isNew ? (
            <div className="card-body py-10 text-center">
              <p className="text-sm text-ink-400">
                No prior campaigns for this theme yet.
              </p>
              <p className="text-xs text-ink-300 mt-1">
                Be the first to run it.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-ink-100">
              {theme.priorCampaigns.map(camp => (
                <div
                  key={camp.id}
                  onClick={onUseTemplate}
                  className="px-4 py-3 hover:bg-ink-50 cursor-pointer
                             transition-colors group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-ink-900
                                     group-hover:text-brand-800 transition-colors">
                      {camp.name}
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-ink-300 group-hover:text-brand-600
                                 transition-colors"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-ink-400">{camp.date}</span>
                    <span className="text-xs font-mono font-semibold text-ok-700">
                      {camp.lift}
                    </span>
                  </div>
                  <div className="text-xs text-ink-400 mt-0.5">
                    {camp.channels}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Option B — Start new */}
        <div
          className="card flex flex-col items-center justify-center p-8
                     text-center cursor-pointer hover:shadow-md
                     transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: `linear-gradient(135deg, ${theme.color.bg} 0%, #ffffff 60%)`,
            border: `1px solid ${theme.color.border}`,
          }}
          onClick={onStartNew}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: theme.color.btn }}
          >
            <ArrowRight size={24} className="text-white" />
          </div>

          <h3
            className="text-lg font-semibold text-ink-900 mb-2"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            Start a new campaign
          </h3>

          <p className="text-sm text-ink-400 leading-relaxed mb-6 max-w-xs">
            Launch a fresh campaign using the{' '}
            <strong style={{ color: theme.color.btn }}>{theme.title}</strong>{' '}
            theme. Viden will pre-load relevant claims, KOL data and
            prior intelligence.
          </p>

          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg
                       text-sm font-semibold text-white transition-opacity
                       hover:opacity-90"
            style={{ background: theme.color.btn }}
          >
            Start new campaign
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  )
}

/* ── Stat row ── */
function StatRow({ label, value, color, pct }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-0.5">
        <span className="text-[10px] text-ink-400">{label}</span>
        <span className="text-[10px] font-mono font-semibold" style={{ color }}>
          {value}
        </span>
      </div>
      <div className="h-1 bg-ink-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  )
}