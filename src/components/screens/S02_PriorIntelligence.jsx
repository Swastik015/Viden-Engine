import { ChevronRight } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import KpiCard from '../ui/KpiCard.jsx'
import Tag     from '../ui/Tag.jsx'
import AiPip   from '../ui/AiPip.jsx'

export default function S02_PriorIntelligence() {
  const { data, advance } = useApp()
  const d = data.screens.priorIntelligence

  return (
    <div>
      {/* ── Screen header ── */}
      <div className="screen-head">
        <div>
          <div className="screen-eyebrow">
            <span className="actor-tag-ke">Knowledge Engine</span>
            <span>Step 02 · Discover</span>
          </div>
          <h1 className="screen-title">What we already know</h1>
          <p className="screen-subtitle">
            Surfacing prior Vyepti campaigns, claims library, audience insights
            and performance benchmarks relevant to this brief.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn-secondary btn btn-sm">Refine query</button>
          <button className="btn-primary btn" onClick={advance}>
            Next · Pull primary research
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* ── KPI band ── */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {d.kpis.map(kpi => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            delta={kpi.delta}
          />
        ))}
      </div>

      {/* ── Body ── */}
      <div className="flex gap-5 items-start">

        {/* ── LEFT: Prior campaigns ── */}
        <div className="flex-[2.2] space-y-4">
          <div className="sec-head">
            <span className="sec-head-title">Most relevant prior campaigns</span>
            <span className="sec-head-meta">Ranked by semantic match</span>
          </div>

          {d.campaigns.map(camp => (
            <div
              key={camp.id}
              className="card card-pad"
              style={{ borderLeft: `3px solid ${
                camp.matchScore > 80 ? '#4338CA' :
                camp.matchScore > 70 ? '#6366F1' : '#C8CCD8'
              }`}}
            >
              {/* Top row */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AiPip>KE · Match {camp.matchScore}%</AiPip>
                  <Tag type={camp.tagType} dot={false}>{camp.tag}</Tag>
                </div>
                <span className="font-mono text-xs text-ink-400">{camp.id}</span>
              </div>

              {/* Campaign name */}
              <h3 className="font-display text-base font-medium text-ink-900
                             tracking-tight mb-1">
                {camp.name}
              </h3>

              {/* Meta grid */}
              <div className="grid grid-cols-3 gap-3 mt-3">
                <div>
                  <div className="text-[10px] text-ink-400 mb-0.5">Channels</div>
                  <div className="text-xs text-ink-700">{camp.channels}</div>
                </div>
                <div>
                  <div className="text-[10px] text-ink-400 mb-0.5">Lift</div>
                  <div className={`text-xs font-semibold ${
                    camp.liftType === 'ok'   ? 'text-ok-700'   :
                    camp.liftType === 'warn' ? 'text-warn-700' : 'text-ink-700'
                  }`}>
                    {camp.lift}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-ink-400 mb-0.5">
                    {camp.liftType === 'warn' ? '⚠ Lesson' : 'What worked'}
                  </div>
                  <div className="text-xs text-ink-700">{camp.whatWorked}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── RIGHT: Claims + Insights ── */}
        <div className="flex-1 space-y-4">

          {/* Claims */}
          <div className="card">
            <div className="card-head">
              <div className="card-title">
                Top claims surfaced
                <AiPip>KE</AiPip>
              </div>
            </div>
            <div className="divide-y divide-ink-100">
              {d.claims.map((claim, i) => (
                <div key={i} className="px-4 py-3">
                  <div className="text-sm text-ink-900 mb-1.5">
                    {claim.text}{' '}
                    <span className="cite">{claim.citation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {claim.status === 'approved' ? (
                      <Tag type="ok" dot={false} size="xs">
                        MLR approved
                        {claim.expires && ` · expires ${claim.expires}`}
                      </Tag>
                    ) : (
                      <Tag type="warn" dot={false} size="xs">
                        Needs fair balance pairing
                      </Tag>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audience insights */}
          <div className="card">
            <div className="card-head">
              <div className="card-title">
                Audience insights
                <AiPip>KE</AiPip>
              </div>
            </div>
            <div className="card-body space-y-3">
              {d.audienceInsights.map((insight, i) => (
                <div key={i} className="text-sm text-ink-700 leading-relaxed">
                  <strong className="text-ink-900">{insight.stat}</strong>{' '}
                  {insight.text}{' '}
                  <span className="cite">{insight.cite}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}