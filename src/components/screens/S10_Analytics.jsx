import { ChevronRight, TrendingUp, AlertTriangle, Users, FileText, ArrowRight } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import KpiCard         from '../ui/KpiCard.jsx'
import FilterBar       from '../ui/FilterBar.jsx'
import AiPip           from '../ui/AiPip.jsx'
import Tag             from '../ui/Tag.jsx'
import EngagementChart from '../ui/EngagementChart.jsx'

export default function S10_Analytics() {
  const { data, advance, getFilteredWinningVariants, filters } = useApp()
  const d        = data.screens.analytics
  const variants = getFilteredWinningVariants()

  return (
    <div>
      {/* ── Screen header ── */}
      <div className="screen-head">
        <div>
          <div className="screen-eyebrow">
            <span className="actor-tag-ke">Knowledge Engine</span>
            <span>Step 10 · Activate</span>
          </div>
          <h1 className="screen-title">Performance analytics</h1>
          <p className="screen-subtitle">
            Day {d.dayInFlight} of {d.totalDays}. Live tracking across all six
            channels with real-time fatigue and saturation signals.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn-ghost btn btn-sm">Export PDF</button>
          <button className="btn-secondary btn btn-sm">
            View full dashboard
          </button>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <FilterBar
        showChannel
        showSegment
        showWave
        showResearchType={false}
        className="mb-5"
      />

      {/* ── Campaign Health Diagnostic ── */}
      <div className="card overflow-hidden mb-6">

        {/* Diagnostic header */}
        <div
          className="px-5 py-3 border-b border-ink-100 flex items-center
                     justify-between"
          style={{ background: 'linear-gradient(135deg, #1E1B4B, #2D2A6E)' }}
        >
          <div className="flex items-center gap-2">
            <AiPip>KE · Diagnostic</AiPip>
            <span className="text-xs font-bold text-white">
              Campaign Health Diagnostic
            </span>
          </div>
          <span className="text-[10px] font-mono text-white/60">
            Day {d.dayInFlight} of {d.totalDays} · auto-updated
          </span>
        </div>

        <div className="grid grid-cols-3 divide-x divide-ink-100">

          {/* Audience health */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-ok-50 flex items-center
                              justify-center flex-shrink-0">
                <Users size={14} className="text-ok-700" />
              </div>
              <div>
                <div className="text-xs font-bold text-ink-900">Audience</div>
                <div className="text-[10px] text-ok-700 font-semibold">
                  ✓ Working
                </div>
              </div>
            </div>
            <div className="space-y-2.5">
              {[
                { label: 'HCPs reached',  value: '7,200',  note: '76% of target',   ok: true  },
                { label: 'T1/T2 engaged', value: '92%',    note: 'Above benchmark',  ok: true  },
                { label: 'Segment fit',   value: 'Strong', note: 'T1+T2 resonating', ok: true  },
              ].map(item => (
                <div key={item.label}
                  className="flex items-center justify-between">
                  <span className="text-xs text-ink-500">{item.label}</span>
                  <div className="text-right">
                    <span className="text-xs font-bold text-ink-900">
                      {item.value}
                    </span>
                    <span className={`text-[10px] ml-1.5 ${
                      item.ok ? 'text-ok-600' : 'text-warn-600'
                    }`}>
                      {item.note}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content health */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-warn-50 flex items-center
                              justify-center flex-shrink-0">
                <FileText size={14} className="text-warn-700" />
              </div>
              <div>
                <div className="text-xs font-bold text-ink-900">Content</div>
                <div className="text-[10px] text-warn-700 font-semibold">
                  ⚠ Needs attention
                </div>
              </div>
            </div>
            <div className="space-y-2.5">
              {[
                { label: 'Engagement rate', value: '4.1x', note: 'Above baseline', ok: true  },
                { label: 'Conversion',      value: '+14%', note: 'vs +18% target', ok: false },
                { label: 'PCP email CTR',   value: '2.1%', note: 'Down from 3.8%', ok: false },
              ].map(item => (
                <div key={item.label}
                  className="flex items-center justify-between">
                  <span className="text-xs text-ink-500">{item.label}</span>
                  <div className="text-right">
                    <span className="text-xs font-bold text-ink-900">
                      {item.value}
                    </span>
                    <span className={`text-[10px] ml-1.5 ${
                      item.ok ? 'text-ok-600' : 'text-warn-600'
                    }`}>
                      {item.note}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnosis */}
          <div className="p-5"
            style={{ background: 'linear-gradient(135deg, #FFFBEB, #ffffff)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-warn-100 flex items-center
                              justify-center flex-shrink-0">
                <AlertTriangle size={14} className="text-warn-700" />
              </div>
              <div>
                <div className="text-xs font-bold text-ink-900">Diagnosis</div>
                <div className="text-[10px] text-warn-700 font-semibold">
                  Content problem
                </div>
              </div>
            </div>
            <p className="text-xs text-ink-700 leading-relaxed mb-3">
              Audience is correctly targeted — T1/T2 engaging at 92%.
              Conversion shortfall is a{' '}
              <strong className="text-warn-800">content issue</strong> —
              PCP email creative showing fatigue. CTR dropped 45% since launch.
            </p>
            <div
              className="px-3 py-2 rounded-lg text-xs font-semibold
                         text-warn-800 flex items-center gap-2"
              style={{ background: '#FEF3C7', border: '1px solid #FDE68A' }}
            >
              <ArrowRight size={12} className="text-warn-700 flex-shrink-0" />
              Refresh PCP email creative
            </div>
          </div>

        </div>
      </div>

      {/* ── KPI band ── */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {d.kpis.map(kpi => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            unit={kpi.unit}
            delta={kpi.target}
            type={
              kpi.status === 'exceeding' ? 'ok' : 'default'
            }
          />
        ))}
      </div>

      {/* ── Main body ── */}
      <div className="flex gap-5 items-start">

        {/* ── LEFT: Chart + Winning variants ── */}
        <div className="flex-[2] space-y-5">

          {/* Engagement chart */}
          <div className="card">
            <div className="card-head">
              <div className="card-title">
                Engagement over time
                <AiPip>KE · Live</AiPip>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono
                              text-ink-400">
                {filters.wave === 'All Waves'
                  ? ['W1 · Launch', 'W2 · AHS peak', 'W3 · Sustain'].map(w => (
                      <span key={w}>{w}</span>
                    ))
                  : (
                    <span className="text-brand-700 font-semibold">
                      {filters.wave}
                    </span>
                  )
                }
              </div>
            </div>
            <div className="px-4 pt-3 pb-2">
              <EngagementChart height={220} />
            </div>
          </div>

          {/* Winning variants table */}
          <div className="card">
            <div className="card-head">
              <div className="card-title">
                Winning variants
                <AiPip>KE · Ranked</AiPip>
              </div>
              <span className="text-xs font-mono text-ink-400">
                By engagement-to-target ratio
                {(filters.channel !== 'All Channels' ||
                  filters.segment !== 'All Segments') && (
                  <span className="ml-2 text-brand-600">· filtered</span>
                )}
              </span>
            </div>

            {variants.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-ink-400">
                No variants match current filters
              </div>
            ) : (
              <div>
                <div
                  className="grid gap-3 px-5 py-2 bg-ink-50 border-b
                             border-ink-200 text-[10px] font-semibold
                             uppercase tracking-wider text-ink-500"
                  style={{ gridTemplateColumns: '28px 1fr 80px 80px 90px' }}
                >
                  <div>#</div>
                  <div>Variant</div>
                  <div className="text-right">Engagement</div>
                  <div className="text-right">CTR</div>
                  <div className="text-right">vs avg</div>
                </div>

                <div className="divide-y divide-ink-100">
                  {variants.map(v => (
                    <div
                      key={v.id}
                      className="grid gap-3 px-5 py-3 items-center
                                 hover:bg-ink-50 transition-colors"
                      style={{ gridTemplateColumns: '28px 1fr 80px 80px 90px' }}
                    >
                      <div className={`
                        w-6 h-6 rounded flex items-center justify-center
                        font-mono text-[10px] font-bold text-white
                        ${v.flagged
                          ? 'bg-risk-500'
                          : v.rank <= 3 ? 'bg-ok-600' : 'bg-ink-300'
                        }
                      `}>
                        {v.flagged ? '↓' : v.rank}
                      </div>

                      <div>
                        <div className="text-sm font-semibold text-ink-900">
                          {v.id} · {v.name}
                        </div>
                        <div className="text-xs text-ink-400 mt-0.5">
                          {v.channel} · {v.segment}
                        </div>
                      </div>

                      <div className="text-right font-mono text-sm text-ink-900">
                        {typeof v.engagement === 'number'
                          ? v.engagement.toLocaleString()
                          : v.engagement
                        }
                      </div>

                      <div className="text-right font-mono text-sm text-ink-900">
                        {v.ctr}
                      </div>

                      <div className={`
                        text-right font-mono text-sm font-semibold
                        ${v.vsAvg.startsWith('+') ? 'text-ok-700'   :
                          v.vsAvg.startsWith('-') ? 'text-risk-700' : 'text-ink-600'
                        }
                      `}>
                        {v.vsAvg}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: Segment heat + Fatigue + Recommendation ── */}
        <div className="flex-1 space-y-4">

          {/* Segment heat map */}
          <div className="card">
            <div className="card-head">
              <div className="card-title">
                Segment heat map
                <AiPip>KE</AiPip>
              </div>
            </div>
            <div className="card-body space-y-3">
              {d.segmentHeat.map(seg => (
                <SegmentBar key={seg.segment} seg={seg} />
              ))}
              <p className="text-[10px] text-ink-400 pt-2 border-t
                            border-dashed border-ink-200">
                % of segment with ≥1 meaningful engagement · Day 1–
                {d.dayInFlight}
              </p>
            </div>
          </div>

          {/* Fatigue signal */}
          <div
            className="card card-pad"
            style={{ background: '#FFFBEB', borderColor: '#FEF3C7' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={14} className="text-warn-700 flex-shrink-0" />
              <span className="text-sm font-semibold text-warn-700">
                Fatigue signal · {d.fatigueSignal.channel}
              </span>
            </div>
            <p className="text-sm text-ink-700 leading-relaxed mb-2">
              CTR declined from{' '}
              <strong>{d.fatigueSignal.ctrStart}%</strong> in Week 1 to{' '}
              <strong>{d.fatigueSignal.ctrCurrent}%</strong> in Week 6 —
              fatigue threshold breached.
            </p>
            <p className="text-xs text-ink-400">
              PCP open rate also dropped {d.fatigueSignal.openRateDrop}% MoM.
              Confidence in fatigue signal: {d.fatigueSignal.confidence}%.
            </p>
          </div>

          {/* KE recommendation */}
          <div
            className="card card-pad"
            style={{ background: '#EEF2FF', borderColor: '#E0E7FF' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <AiPip>KE · Recommendation</AiPip>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#1E1B4B' }}>
              Refresh PCP email creative with a different anchor — suggest{' '}
              <strong>Pillar P3</strong> (quarterly cadence + infusion-site
              availability). Expand winning Veeva IVA variant to General Neuro
              segment.
            </p>
          </div>

          {/* Optimization gate */}
          <div className="gate">
            <div>
              <div className="gate-q">Optimization needed?</div>
              <div className="gate-sub">
                Email PCP fatigue signal is real. Refreshing now would protect
                the +1.8 pts SoV trajectory.
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0 flex-col">
              <button className="btn-teal btn btn-sm" onClick={advance}>
                Yes · refresh &amp; re-target
                <ChevronRight size={13} />
              </button>
              <button className="btn-secondary btn btn-sm">
                No · keep current
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

/* ── Segment bar ── */
function SegmentBar({ seg }) {
  const colors = {
    ok:   { bar: 'bg-ok-600',   text: 'text-ok-700'  },
    teal: { bar: 'bg-teal-600', text: 'text-ink-700' },
    warn: { bar: 'bg-warn-600', text: 'text-warn-700'},
  }
  const c = colors[seg.color] ?? colors.teal

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-ink-900 w-28 flex-shrink-0">
        {seg.segment}
      </span>
      <div className="flex-1 h-2 bg-ink-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${c.bar}`}
          style={{ width: `${seg.pct}%` }}
        />
      </div>
      <span className={`font-mono text-xs font-semibold w-10 text-right
                        flex-shrink-0 ${c.text}`}>
        {seg.pct}%
      </span>
    </div>
  )
}