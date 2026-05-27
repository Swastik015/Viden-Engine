import { useState } from 'react'
import { ChevronRight, TrendingDown, RefreshCw, CheckCircle } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import FilterBar from '../ui/FilterBar.jsx'
import AiPip    from '../ui/AiPip.jsx'
import Tag      from '../ui/Tag.jsx'

export default function S11_RefreshContent() {
  const { data, goToScreen } = useApp()
  const d = data.screens.refreshContent

  return (
    <div>
      {/* ── Screen header ── */}
      <div className="screen-head">
        <div>
          <div className="screen-eyebrow">
            <span className="actor-tag-gs">GenStudio</span>
            <span>Step 11 · Activate</span>
          </div>
          <h1 className="screen-title">Refresh &amp; re-target</h1>
          <p className="screen-subtitle">
            Acting on the fatigue signal. New PCP email creative anchored on
            Pillar P3 + winning IVA expanded to General Neuro.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn-ghost btn btn-sm">Schedule wave</button>
          <button
            className="btn-primary btn"
            onClick={() => goToScreen('analytics')}
          >
            Approve refresh · back to analytics
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <FilterBar
        showChannel
        showSegment={false}
        showWave={false}
        showResearchType={false}
        className="mb-5"
      />

      {/* ── Main content ── */}
      <div className="flex gap-5 items-start mb-6">

        {/* ── LEFT: Fatigued variants ── */}
        <div className="flex-1">
          <div className="sec-head mb-3">
            <span className="sec-head-title">Variants showing fatigue</span>
            <span className="sec-head-meta">
              {d.fatiguedVariants.length} detected
            </span>
          </div>

          <div className="space-y-3">
            {d.fatiguedVariants.map(v => (
              <FatiguedCard key={v.id} variant={v} />
            ))}
          </div>
        </div>

        {/* ── MIDDLE: Proposed moves ── */}
        <div className="flex-[1.4]">
          <div className="sec-head mb-3">
            <span className="sec-head-title">Proposed re-targeting moves</span>
            <span className="sec-head-meta">GenStudio · KE-informed</span>
          </div>

          <div className="space-y-3">
            {d.proposedMoves.map(move => (
              <MoveCard key={move.moveId} move={move} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Generation queue ── */}
      <div className="card" style={{ background: '#F6F7FA' }}>
        <div className="card-head border-ink-200">
          <div className="card-title">
            <RefreshCw size={14} className="text-teal-700" />
            New variant generation queue
          </div>
          <span className="text-xs font-mono text-ink-400">
            {d.generationQueue.reduce((sum, q) => {
              const n = parseInt(q.count) || 0
              return sum + n
            }, 0)} new variants · ETA ~2 min
          </span>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-4 gap-3">
            {d.generationQueue.map(item => (
              <div key={item.label} className="card card-pad-sm">
                <div className="text-xs text-ink-400 mb-1.5">{item.label}</div>
                <div className="text-sm font-semibold text-ink-900 mb-2">
                  {item.count}
                </div>
                <div className="h-1 bg-ink-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width:      `${item.pct}%`,
                      background: item.pct >= 80 ? '#059669' : '#06B6D4',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── KE loop-back indicator ── */}
      <div
        className="mt-6 card card-pad flex items-center gap-4"
        style={{ background: '#ECFDF5', borderColor: '#D1FAE5' }}
      >
        <div className="w-8 h-8 rounded-lg bg-ok-100 flex items-center
                        justify-center flex-shrink-0">
          <RefreshCw size={15} className="text-ok-700" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-bold text-ok-800 mb-0.5">
            Learnings looped back to Knowledge Engine
          </div>
          <p className="text-xs text-ok-700 leading-relaxed">
            All performance data, fatigue signals and refresh decisions from
            this cycle are automatically written back to the KE — ready for
            the next campaign.
          </p>
        </div>
      </div>

    </div>
  )
}

/* ── Fatigued variant card ── */
function FatiguedCard({ variant }) {
  const isSevere = variant.severity === 'warn'

  return (
    <div
      className="card card-pad"
      style={{
        borderLeft: `3px solid ${isSevere ? '#D97706' : '#C8CCD8'}`,
        opacity: isSevere ? 1 : 0.7,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <AiPip type="gs">{variant.id}</AiPip>
        <Tag
          type={isSevere ? 'warn' : 'default'}
          dot={false}
          size="xs"
        >
          {variant.metric}
        </Tag>
      </div>

      {/* Headline */}
      <div className="text-sm font-semibold text-ink-900 mb-1 leading-snug">
        "{variant.headline}"
      </div>

      {/* Meta */}
      <div className="text-xs text-ink-400">
        {variant.type} · in-market {variant.daysInMarket} days
      </div>

      {/* Mini sparkline */}
      {isSevere && (
        <div className="mt-2.5 h-8 bg-ink-50 rounded overflow-hidden relative">
          <svg
            viewBox="0 0 240 32"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <polyline
              points="0,4 40,6 80,10 120,14 160,19 200,24 240,28"
              fill="none"
              stroke="#D97706"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  )
}

/* ── Move card ── */
function MoveCard({ move }) {
  const styles = {
    ok:    { badge: 'bg-ok-600',    wrapper: 'from-ok-50 to-white',    border: '#D1FAE5' },
    brand: { badge: 'bg-brand-700', wrapper: 'from-brand-50 to-white', border: '#E0E7FF' },
    ink:   { badge: 'bg-ink-400',   wrapper: 'from-ink-50 to-white',   border: '#E2E4EC' },
  }
  const s = styles[move.type] ?? styles.ink

  return (
    <div
      className={`card card-pad bg-gradient-to-br ${s.wrapper}`}
      style={{ borderColor: s.border }}
    >
      {/* Move header */}
      <div className="flex items-center gap-2 mb-2">
        <span className={`
          font-mono text-xs px-2 py-0.5 rounded text-white font-bold
          ${s.badge}
        `}>
          {move.moveId}
        </span>
        {move.impact && (
          <Tag
            type={move.type === 'ok' ? 'ok' : move.type === 'brand' ? 'info' : 'default'}
            dot={false}
            size="xs"
          >
            {move.impact}
          </Tag>
        )}
      </div>

      {/* Title */}
      <h4 className="text-base font-medium text-ink-900 tracking-tight mb-1.5"
        style={{ fontFamily: 'Geist, sans-serif' }}>
        {move.title}
      </h4>

      {/* Detail */}
      <p className="text-sm text-ink-700 leading-relaxed mb-3">
        {move.detail}
      </p>

      {/* Subject lines */}
      {move.newSubjectLines && (
        <div className="bg-white border border-ink-200 rounded-lg p-3 mb-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider
                          text-ink-400 mb-2">
            Proposed subject lines ({move.newSubjectLines.length} variants)
          </div>
          <ul className="space-y-1">
            {move.newSubjectLines.map(line => (
              <li
                key={line}
                className="text-xs text-ink-700 flex items-start gap-1.5"
              >
                <span className="text-ink-300 flex-shrink-0 mt-0.5">·</span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Confidence */}
      {move.confidence && (
        <div className="flex items-center gap-1.5 mb-3">
          <Tag type="ok" dot={false} size="xs">
            Confidence {move.confidence}%
          </Tag>
        </div>
      )}

      {/* Action buttons */}
      <MoveActions moveId={move.moveId} />
    </div>
  )
}

/* ── Move action buttons ── */
function MoveActions({ moveId }) {
  const [applied,   setApplied]   = useState(false)
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return (
    <div className="text-xs text-ink-400 mt-1">Move dismissed</div>
  )

  if (applied) return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                    bg-ok-50 border border-ok-200 w-fit mt-1">
      <CheckCircle size={13} className="text-ok-600" />
      <span className="text-xs font-semibold text-ok-700">
        Move applied · queued for generation
      </span>
    </div>
  )

  return (
    <div className="flex items-center gap-2 mt-1">
      <button
        onClick={() => setApplied(true)}
        className="btn-teal btn btn-sm"
      >
        <CheckCircle size={12} />
        Apply move
      </button>
      <button
        onClick={() => setDismissed(true)}
        className="btn-ghost btn btn-sm"
      >
        Dismiss
      </button>
    </div>
  )
}
