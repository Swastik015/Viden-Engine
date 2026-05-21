import { Plus, Download, Package, Globe, Layers, Shield } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import KpiCard from '../ui/KpiCard.jsx'
import AiPip  from '../ui/AiPip.jsx'
import Tag    from '../ui/Tag.jsx'

export default function S12_StoreLearnings() {
  const { data, goToPhase } = useApp()
  const d = data.screens.storeLearnings

  return (
    <div>
      {/* ── Screen header ── */}
      <div className="screen-head">
        <div>
          <div className="screen-eyebrow">
            <span className="actor-tag-ke">Knowledge Engine</span>
            <span>Step 12 · Activate · Campaign close</span>
          </div>
          <h1 className="screen-title">Store learnings in the Knowledge Engine</h1>
          <p className="screen-subtitle">
            Campaign Day 78 of 78. Performance summary captured, new audience
            insights extracted, every artifact and decision provenance written
            back to Viden for the next campaign.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn-ghost btn btn-sm">
            <Download size={13} />
            Export campaign report
          </button>
          <button
            className="btn-teal btn"
            onClick={() => goToPhase('discover')}
          >
            <Plus size={14} />
            Start next campaign
          </button>
        </div>
      </div>

      {/* ── Hero results banner ── */}
      <div
        className="card mb-6"
        style={{
          background: 'linear-gradient(135deg, #ECFDF5 0%, #ffffff 60%)',
          borderColor: '#D1FAE5',
        }}
      >
        <div className="card-pad-lg">
          <div className="flex items-center gap-3 mb-4">
            <Tag type="ok" dot={false}>
              Campaign closed · KPI targets met
            </Tag>
            <span className="text-xs font-mono text-ink-400">
              14 Sep 2026 — 30 Nov 2026
            </span>
          </div>

          <p className="font-display text-xl font-medium text-ink-900
                         tracking-tight leading-snug max-w-3xl mb-6">
            {d.heroBanner}
          </p>

          <div className="grid grid-cols-4 gap-5 pt-4 border-t border-ok-100">
            {d.finalKpis.map(kpi => (
              <div key={kpi.label}>
                <div className="text-[10px] font-semibold uppercase tracking-wider
                                text-ink-400 mb-1.5">
                  {kpi.label}
                </div>
                <div className={`font-display text-2xl font-medium tracking-tight
                                 leading-none ${
                  kpi.type === 'ok' ? 'text-ok-700' : 'text-ink-900'
                }`}>
                  {kpi.value}
                </div>
                <div className="font-mono text-xs text-ok-600 mt-1">
                  {kpi.target}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex gap-5 items-start">

        {/* ── LEFT: KE write-back ── */}
        <div className="flex-[1.5]">
          <div className="sec-head mb-3">
            <span className="sec-head-title">
              Written back to the Knowledge Engine
            </span>
            <span className="sec-head-meta">
              47 new entities · 412 evidence links
            </span>
          </div>

          <div className="space-y-4">
            {d.keWriteBack.map((item, i) => (
              <KeWriteBackCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* ── RIGHT: Next campaign + Time saved ── */}
        <div className="flex-1 space-y-4">

          {/* Next campaign card */}
          <div
            className="card overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1A1747, #1E1B4B)',
              border: 'none',
            }}
          >
            <div className="p-6">
              {/* Badge */}
              <div className="mb-4">
                <span
                  className="inline-flex items-center gap-1.5 px-2 py-0.5
                             rounded-full text-[10px] font-semibold"
                  style={{
                    background:   'rgba(255,255,255,0.1)',
                    color:        '#67E8F9',
                    border:       '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  <span className="w-1 h-1 rounded-full bg-teal-400" />
                  KE · Suggested next campaign
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-medium text-white
                             tracking-tight leading-tight mb-3">
                {d.nextCampaign.title}
              </h3>

              {/* Detail */}
              <p className="text-sm text-white/75 leading-relaxed mb-5">
                {d.nextCampaign.detail}
              </p>

              {/* Pre-warmed list */}
              <div
                className="pt-4 mb-5"
                style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}
              >
                <div className="text-[10px] font-semibold uppercase tracking-widest
                                text-white/50 mb-2">
                  Pre-warmed by KE
                </div>
                <ul className="space-y-1">
                  {d.nextCampaign.preWarmed.map(item => (
                    <li key={item}
                      className="text-xs text-white/80 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <button
                className="btn btn-sm font-semibold"
                style={{ background: 'white', color: '#1E1B4B' }}
                onClick={() => goToPhase('discover')}
              >
                Start campaign brief
                <Plus size={13} />
              </button>
            </div>
          </div>

          {/* Time saved card */}
          <div className="card card-pad">
            <div className="text-[10px] font-semibold uppercase tracking-wider
                            text-ink-400 mb-2">
              Time saved this cycle
            </div>
            <div className="font-display text-4xl font-medium text-ink-900
                            tracking-tight leading-none mb-2">
              {d.timeSaved.weeks} wks
            </div>
            <p className="text-sm text-ink-500 leading-relaxed">
              {d.timeSaved.detail}
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

/* ── KE write-back card ── */
function KeWriteBackCard({ item, index }) {
  const icons = [Layers, Globe, Shield]
  const Icon  = icons[index] ?? Package

  return (
    <div className="card card-pad">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Icon size={15} className="text-teal-700 flex-shrink-0" />
        <h4 className="font-display text-base font-medium text-ink-900 tracking-tight">
          {item.title}
        </h4>
        <AiPip className="ml-auto">KE · indexed</AiPip>
      </div>

      {/* Detail text */}
      {item.detail && (
        <p className="text-sm text-ink-700 leading-relaxed mb-2">
          {item.detail}
        </p>
      )}

      {/* Insight bullets */}
      {item.insights && (
        <ul className="space-y-1.5">
          {item.insights.map(insight => (
            <li key={insight}
              className="flex items-start gap-2 text-sm text-ink-700">
              <span className="font-mono text-xs text-teal-700 font-bold
                               flex-shrink-0 mt-0.5">
                →
              </span>
              <span className="leading-relaxed">{insight}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Tags */}
      {item.tags && (
        <div className="flex gap-1.5 flex-wrap mt-2">
          {item.tags.map(tag => (
            <Tag key={tag} type="teal" dot={false} size="xs">{tag}</Tag>
          ))}
        </div>
      )}

      {/* Action buttons (for provenance card) */}
      {index === 2 && (
        <div className="flex gap-2 mt-3">
          <button className="btn-secondary btn btn-sm">
            View KE library entry
          </button>
          <button className="btn-ghost btn btn-sm">
            Download audit bundle (.zip)
          </button>
        </div>
      )}
    </div>
  )
}