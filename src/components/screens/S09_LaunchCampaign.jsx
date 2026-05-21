import { ChevronRight, CheckCircle, PlayCircle, Zap } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import KpiCard from '../ui/KpiCard.jsx'
import AiPip  from '../ui/AiPip.jsx'
import Tag    from '../ui/Tag.jsx'

export default function S09_LaunchCampaign() {
  const { data, advance } = useApp()
  const d = data.screens.launchCampaign

  return (
    <div>
      {/* ── Screen header ── */}
      <div className="screen-head">
        <div>
          <div className="screen-eyebrow">
            <span className="actor-tag-user">Your action</span>
            <span>Step 09 · Activate</span>
          </div>
          <h1 className="screen-title">Launch campaign</h1>
          <p className="screen-subtitle">
            All 27 approved variants are staged across 6 channels. Confirm
            the activation schedule and go live — Sep 14 target.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn-ghost btn btn-sm">Export launch plan</button>
          <button className="btn-teal btn" onClick={advance}>
            <PlayCircle size={15} />
            Go live · activate all channels
          </button>
        </div>
      </div>

      {/* ── Pre-launch KPIs ── */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {d.summaryKpis.map(kpi => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            sub={kpi.sub}
            type={kpi.type}
          />
        ))}
      </div>

      {/* ── Body ── */}
      <div className="flex gap-5 items-start">

        {/* ── LEFT: Channel schedule ── */}
        <div className="flex-[1.8]">
          <div className="sec-head mb-3">
            <span className="sec-head-title">Activation schedule</span>
            <span className="sec-head-meta">6 channels · sequenced by segment</span>
          </div>

          <div className="card overflow-hidden">
            {/* Table header */}
            <div className="grid gap-3 px-5 py-2.5 bg-ink-50 border-b
                            border-ink-200 text-[10px] font-semibold uppercase
                            tracking-wider text-ink-500"
              style={{ gridTemplateColumns: '160px 1fr 140px 120px 100px' }}
            >
              <div>Channel</div>
              <div>Variants</div>
              <div>Target</div>
              <div>Go-live</div>
              <div>Status</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-ink-100">
              {d.channelSchedule.map(row => (
                <div
                  key={row.channel}
                  className="grid gap-3 px-5 py-3.5 items-center
                             hover:bg-ink-50 transition-colors"
                  style={{ gridTemplateColumns: '160px 1fr 140px 120px 100px' }}
                >
                  {/* Channel */}
                  <div>
                    <div className="text-sm font-semibold text-ink-900">
                      {row.channel}
                    </div>
                    <div className="text-xs text-ink-400 mt-0.5">
                      {row.subLabel}
                    </div>
                  </div>

                  {/* Variant */}
                  <div className="flex items-center gap-2">
                    <AiPip type="gs">{row.topVariant}</AiPip>
                    {row.moreCount > 0 && (
                      <span className="font-mono text-xs text-ink-400">
                        +{row.moreCount} more
                      </span>
                    )}
                  </div>

                  {/* Segment */}
                  <Tag type="info" dot={false} size="xs">
                    {row.segment}
                  </Tag>

                  {/* Go-live date */}
                  <div className="font-mono text-sm font-semibold text-ink-900">
                    {row.goLive}
                  </div>

                  {/* Status */}
                  <Tag
                    type={row.status === 'ready' ? 'ok' : 'teal'}
                    dot={false}
                    size="xs"
                  >
                    {row.status === 'registered'
                      ? `Registered · 412 HCPs`
                      : 'Ready'
                    }
                  </Tag>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Checklist + Monitoring ── */}
        <div className="flex-1 space-y-4">

          {/* Pre-launch checklist */}
          <div>
            <div className="sec-head mb-3">
              <span className="sec-head-title">Pre-launch checklist</span>
              <span className="sec-head-meta">
                {d.checklist.filter(c => c.done).length} / {d.checklist.length} complete
              </span>
            </div>

            <div className="card">
              <div className="divide-y divide-ink-100">
                {d.checklist.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 px-4 py-3">
                    <CheckCircle
                      size={15}
                      className={`flex-shrink-0 mt-0.5 ${
                        item.done ? 'text-ok-600' : 'text-ink-300'
                      }`}
                    />
                    <div>
                      <div className="text-sm text-ink-900">{item.item}</div>
                      <div className="text-xs text-ink-400 mt-0.5">
                        {item.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KE monitoring config */}
          <div
            className="card card-pad"
            style={{
              background: 'linear-gradient(135deg, #ECFEFF 0%, #ffffff 50%)',
              borderColor: '#CFFAFE',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <AiPip>KE · Monitoring armed</AiPip>
            </div>
            <p className="text-sm text-ink-700 leading-relaxed mb-3">
              Viden will begin tracking engagement, CTR, and fatigue signals
              from Day 1. Alerts fire if any channel drops below threshold.
            </p>
            <div className="space-y-2">
              {[
                { label: 'Email fatigue threshold', value: 'CTR < 2.0% · Day 30' },
                { label: 'Display saturation alert', value: 'Freq ≥ 8 impressions' },
                { label: 'SoV check-in',             value: 'Every 14 days'        },
                { label: 'First analytics report',   value: '28 Sep 2026'          },
              ].map(item => (
                <div key={item.label}
                  className="flex items-center justify-between">
                  <span className="text-xs text-ink-400">{item.label}</span>
                  <span className="font-mono text-xs font-semibold text-ink-900">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}