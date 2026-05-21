import { ChevronRight, GripVertical } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import AiPip from '../ui/AiPip.jsx'
import Tag   from '../ui/Tag.jsx'

const RANK_COLORS = {
  teal:  { badge: 'bg-teal-700',  border: 'border-l-teal-600'  },
  brand: { badge: 'bg-brand-700', border: 'border-l-brand-500' },
  ink:   { badge: 'bg-ink-300',   border: 'border-l-ink-200'   },
}

const MATCH_COLORS = {
  ok:   { bar: 'bg-ok-600',   text: 'text-ok-700'   },
  teal: { bar: 'bg-teal-600', text: 'text-ink-700'  },
  warn: { bar: 'bg-warn-600', text: 'text-warn-700' },
}

export default function S04_AlignAudience() {
  const { data, advance } = useApp()
  const d = data.screens.alignAudience

  return (
    <div>
      {/* ── Screen header ── */}
      <div className="screen-head">
        <div>
          <div className="screen-eyebrow">
            <span className="actor-tag-user">Your action</span>
            <span>Step 04 · Discover</span>
          </div>
          <h1 className="screen-title">Align audience &amp; messaging</h1>
          <p className="screen-subtitle">
            Review Viden's recommendations. Drag to rank messaging themes —
            top 3 will anchor the brief. Each choice carries its evidence with it.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn-ghost btn btn-sm">Export alignment</button>
          <button className="btn-primary btn" onClick={advance}>
            Lock alignment · create brief
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="flex gap-5 items-start">

        {/* ── LEFT: Messaging themes ── */}
        <div className="flex-[1.5] space-y-3">
          <div className="sec-head">
            <span className="sec-head-title">
              Messaging themes
              <AiPip className="ml-2 align-middle">KE-ranked</AiPip>
            </span>
            <span className="sec-head-meta">Drag to reorder · top 3 anchor the brief</span>
          </div>

          {d.themes.map(theme => {
            const colors  = RANK_COLORS[theme.color] ?? RANK_COLORS.ink
            const dimmed  = theme.level === 'low'

            return (
              <div
                key={theme.rank}
                className={`
                  card card-pad
                  border-l-4 ${colors.border}
                  ${dimmed ? 'opacity-60' : ''}
                `}
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <GripVertical
                      size={14}
                      className="text-ink-300 cursor-grab flex-shrink-0"
                    />
                    <span className={`
                      font-mono text-xs px-2 py-0.5 rounded text-white font-bold
                      ${colors.badge}
                    `}>
                      {String(theme.rank).padStart(2, '0')}
                    </span>
                    <span className="font-display text-base font-medium
                                     text-ink-900 tracking-tight leading-tight">
                      {theme.title}
                    </span>
                  </div>

                  {/* Resonance */}
                  <div className="flex items-center gap-1.5 font-mono text-xs
                                  text-ink-600 flex-shrink-0">
                    Resonance
                    <ResonanceBar level={theme.level} score={theme.resonance} />
                    {theme.resonance}%
                  </div>
                </div>

                {/* Description */}
                {!dimmed && (
                  <>
                    <p className="text-sm text-ink-700 leading-relaxed mb-3">
                      {theme.description}
                    </p>

                    {/* Footer tags */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {theme.citations.map(cite => (
                        <Tag key={cite} type="info" dot={false} size="xs">
                          {cite}
                        </Tag>
                      ))}
                      {theme.kolCount > 0 && (
                        <Tag type="teal" dot={false} size="xs">
                          {theme.kolCount} KOL endorsement{theme.kolCount > 1 ? 's' : ''}
                        </Tag>
                      )}
                      {theme.mlrStatus === 'pre-cleared' && (
                        <Tag type="ok" dot={false} size="xs">MLR pre-cleared</Tag>
                      )}
                      {theme.mlrStatus === 'warn' && (
                        <Tag type="warn" dot={false} size="xs">Pair with infusion-site content</Tag>
                      )}
                    </div>
                  </>
                )}

                {/* De-prioritised note */}
                {dimmed && (
                  <p className="text-xs text-ink-500 mt-1">{theme.description}</p>
                )}
              </div>
            )
          })}
        </div>

        {/* ── RIGHT: Audience segments ── */}
        <div className="flex-1 space-y-4">
          <div className="sec-head">
            <span className="sec-head-title">Audience segments</span>
            <span className="sec-head-meta">~18,400 HCPs</span>
          </div>

          {/* Segment list */}
          <div className="card">
            <div className="divide-y divide-ink-100">
              {d.segments.map(seg => {
                const mc = MATCH_COLORS[seg.matchColor] ?? MATCH_COLORS.teal
                return (
                  <div key={seg.label} className="px-4 py-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-ink-900">
                        {seg.label}
                      </span>
                      <span className="font-mono text-xs text-ink-700">
                        ~{seg.count.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-ink-400 mb-2">{seg.desc}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-ink-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${mc.bar} transition-all duration-700`}
                          style={{ width: `${seg.matchPct}%` }}
                        />
                      </div>
                      <span className={`font-mono text-xs font-semibold ${mc.text} min-w-[52px] text-right`}>
                        {seg.matchPct}% match
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* KE insight card */}
          <div
            className="card card-pad"
            style={{ background: '#EEF2FF', borderColor: '#E0E7FF' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <AiPip>KE · Insight</AiPip>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#1E1B4B' }}>
              If you advance the <strong>Day 1 onset</strong> theme as primary,
              prioritize T1 and T2 segments — survey data shows headache specialists
              are <strong>2.4×</strong> more receptive to onset-led messaging than
              general neurologists.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

/* ── Resonance bar ── */
function ResonanceBar({ level, score }) {
  const filled = Math.round((score / 100) * 5)
  const color  =
    level === 'high' ? 'bg-ok-600'   :
    level === 'mid'  ? 'bg-teal-600' : 'bg-warn-600'

  return (
    <div className="flex gap-0.5 mx-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`w-1 h-2.5 rounded-sm ${i < filled ? color : 'bg-ink-200'}`}
        />
      ))}
    </div>
  )
}