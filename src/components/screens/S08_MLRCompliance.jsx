import { ChevronRight, AlertCircle, AlertTriangle, CheckCircle, Download, MessageSquare } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import KpiCard from '../ui/KpiCard.jsx'
import AiPip  from '../ui/AiPip.jsx'
import Tag    from '../ui/Tag.jsx'

export default function S08_MLRCompliance() {
  const { data, advance } = useApp()
  const d = data.screens.mlrCompliance

  return (
    <div>
      {/* ── Screen header ── */}
      <div className="screen-head">
        <div>
          <div className="screen-eyebrow">
            <span className="actor-tag-user">Your action · MLR</span>
            <span>Step 08 · Create</span>
          </div>
          <h1 className="screen-title">MLR compliance review</h1>
          <p className="screen-subtitle">
            Viden has pre-checked all 30 variants against the approved claims
            library, ISI rules and fair-balance requirements.{' '}
            <strong>{d.flaggedVariants.length} variants</strong> flagged for
            your attention.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn-ghost btn btn-sm">
            <Download size={13} />
            Export audit trail
          </button>
          <button className="btn-secondary btn btn-sm">
            <MessageSquare size={13} />
            Notify S. Kowalski
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
            sub={kpi.sub}
            type={kpi.type}
          />
        ))}
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-0.5 border-b border-ink-200 mb-5">
        {[
          { label: 'Flagged',     count: d.flaggedVariants.length, active: true  },
          { label: 'Cleared',     count: 27,                       active: false },
          { label: 'All variants',count: 30,                       active: false },
          { label: 'Audit trail', count: null,                     active: false },
        ].map(tab => (
          <button
            key={tab.label}
            className={`
              flex items-center gap-2 px-4 h-10 text-sm font-medium
              border-b-2 mb-[-1px] transition-colors duration-150
              ${tab.active
                ? 'border-brand-800 text-ink-900 font-semibold'
                : 'border-transparent text-ink-400 hover:text-ink-700'
              }
            `}
          >
            {tab.label}
            {tab.count !== null && (
              <span className={`
                text-[10px] font-mono px-1.5 py-0.5 rounded-full
                ${tab.active
                  ? 'bg-brand-100 text-brand-700'
                  : 'bg-ink-100 text-ink-500'
                }
              `}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Flagged variants ── */}
      <div className="space-y-4 mb-6">
        {d.flaggedVariants.map(variant => (
          <FlaggedVariantCard key={variant.id} variant={variant} onAdvance={advance} />
        ))}
      </div>

      {/* ── Approval sign-off ── */}
      <div className="card">
        <div className="card-head">
          <div className="card-title">
            <CheckCircle size={15} className="text-ok-600" />
            Approval sign-off
          </div>
          <Tag type="ok" dot={false} size="xs">All approved</Tag>
        </div>
        <div className="divide-y divide-ink-100">
          {d.approvals.map(person => (
            <div key={person.name}
              className="flex items-center gap-3 px-5 py-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br
                              from-brand-700 to-brand-500 flex items-center
                              justify-center text-white text-[10px] font-bold
                              flex-shrink-0">
                {person.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-ink-900">
                  {person.name}
                </div>
                <div className="text-xs text-ink-400">{person.role}</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold text-ok-700">
                  ✓ Approved
                </div>
                <div className="text-[10px] font-mono text-ink-400 mt-0.5">
                  {person.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Proceed button */}
        <div className="px-5 py-4 border-t border-ink-100 flex justify-end">
          <button className="btn-primary btn" onClick={advance}>
            MLR approved · proceed to launch
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Flagged variant card ── */
function FlaggedVariantCard({ variant }) {
  return (
    <div className="card overflow-hidden border-risk-100">

      {/* Card header */}
      <div className="px-5 py-3 bg-risk-50 border-b border-risk-100
                      flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AiPip type="gs">{variant.id}</AiPip>
          <Tag type="info"  dot={false}>{variant.channel}</Tag>
          <Tag type="warn"  dot={false}>{variant.segment}</Tag>
          <Tag type="risk"  dot={false}>{variant.severity} severity</Tag>
        </div>
        <span className="text-xs font-mono text-ink-400">
          Flagged · auto-detected
        </span>
      </div>

      {/* Card body */}
      <div className="p-5">
        <div className="grid grid-cols-2 gap-5 mb-5">

          {/* Issues */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider
                            text-ink-400 mb-2">
              Issues detected
            </div>
            <div className="space-y-2.5">
              {variant.issues.map((issue, i) => (
                <IssueBox key={i} issue={issue} />
              ))}
            </div>
          </div>

          {/* Preview placeholder */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider
                            text-ink-400 mb-2">
              As generated
            </div>
            <div className="h-full min-h-[100px] bg-ink-50 border border-dashed
                            border-ink-300 rounded-lg flex items-center
                            justify-center">
              <span className="text-xs text-ink-400 font-mono">{variant.id}</span>
            </div>
          </div>
        </div>

        {/* Suggested fix */}
        <div className="border-t border-dashed border-ink-200 pt-4">
          <div className="flex items-center gap-2 mb-2">
            <AiPip type="gs">GS · Suggested revision</AiPip>
          </div>
          <div className="bg-ok-50 border border-ok-100 rounded-lg p-3.5">
            <p className="text-sm text-ink-700 leading-relaxed mb-3">
              <strong className="text-ok-700">Add to the asset:</strong>{' '}
              {variant.suggestedFix}
            </p>
            <div className="flex items-center gap-2">
              <button className="btn btn-sm text-white"
                style={{ background: '#059669' }}>
                Accept revision
              </button>
              <button className="btn-secondary btn btn-sm">
                Edit manually
              </button>
              <button className="btn-ghost btn btn-sm text-risk-600">
                Reject &amp; remove variant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Issue box ── */
function IssueBox({ issue }) {
  const isRisk = issue.type === 'risk'

  return (
    <div className={`
      p-3 rounded-md border-l-[3px]
      ${isRisk
        ? 'bg-risk-50 border-l-risk-600'
        : 'bg-warn-50 border-l-warn-600'
      }
    `}>
      <div className="flex items-center gap-2 mb-1">
        {isRisk
          ? <AlertCircle   size={13} className="text-risk-700 flex-shrink-0" />
          : <AlertTriangle size={13} className="text-warn-700 flex-shrink-0" />
        }
        <span className={`text-sm font-semibold
          ${isRisk ? 'text-risk-700' : 'text-warn-700'}`}>
          {issue.title}
        </span>
      </div>
      <p className="text-xs text-ink-700 leading-relaxed mb-1">
        {issue.detail}
      </p>
      {issue.rule && (
        <span className="text-[10px] font-mono text-ink-400">{issue.rule}</span>
      )}
    </div>
  )
}