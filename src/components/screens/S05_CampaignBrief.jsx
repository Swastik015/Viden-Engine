import { ChevronRight, Download, Share2, CheckCircle } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import AiPip from '../ui/AiPip.jsx'
import Tag   from '../ui/Tag.jsx'

export default function S05_CampaignBrief() {
  const { data, advance } = useApp()
  const d = data.screens.campaignBrief

  return (
    <div>
      {/* ── Screen header ── */}
      <div className="screen-head">
        <div>
          <div className="screen-eyebrow">
            <span className="actor-tag-user">Your action</span>
            <AiPip className="ml-1">KE auto-populated</AiPip>
            <span>Step 05 · Plan</span>
          </div>
          <h1 className="screen-title">Campaign brief</h1>
          <p className="screen-subtitle">
            Auto-drafted from your alignment decisions. Every claim carries its
            source. Edit any section — Viden re-checks consistency.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn-ghost btn btn-sm">
            <Download size={13} />
            Download .docx
          </button>
          <button className="btn-ghost btn btn-sm">
            <Share2 size={13} />
            Share for review
          </button>
          <button className="btn-primary btn" onClick={advance}>
            Approve · configure content
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="flex gap-5 items-start">

        {/* ── LEFT: Brief document ── */}
        <div className="card flex-[1.7]">
          <div className="px-10 py-8">

            {/* Document header */}
            <div className="flex items-start justify-between mb-6 pb-5
                            border-b border-ink-200">
              <div>
                <div className="text-xs text-ink-400 font-semibold uppercase
                                tracking-widest mb-1.5">
                  Campaign brief · {d.version}
                </div>
                <h2 className="font-display text-xl font-medium text-ink-900
                               tracking-tight leading-tight mb-1">
                  {data.campaign.name}
                </h2>
                <p className="text-sm text-ink-500">{data.campaign.subtitle}</p>
              </div>
              <div className="text-right text-xs text-ink-400 flex-shrink-0">
                <div>{d.author}</div>
                <div className="mt-0.5">{d.date}</div>
              </div>
            </div>

            {/* Brief sections */}
            <div className="space-y-6">
              {d.sections.map(section => (
                <BriefSection key={section.num} section={section} />
              ))}
            </div>

          </div>
        </div>

        {/* ── RIGHT: Meta panel ── */}
        <div className="flex-1 space-y-4">

          {/* Brief metadata */}
          <div className="card card-pad">
            <div className="text-xs font-semibold uppercase tracking-wider
                            text-ink-400 mb-3">
              Document info
            </div>
            <div className="space-y-2">
              {[
                { label: 'Version',   value: d.version      },
                { label: 'Author',    value: 'Maya Chen'    },
                { label: 'Created',   value: d.date         },
                { label: 'Brand',     value: data.campaign.brand },
                { label: 'Go-live',   value: data.campaign.goLive },
              ].map(item => (
                <div key={item.label} className="flex items-baseline justify-between">
                  <span className="text-xs text-ink-400">{item.label}</span>
                  <span className="text-xs font-medium text-ink-800 text-right max-w-[160px] truncate">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Consistency check */}
          <div
            className="card card-pad"
            style={{ background: '#ECFDF5', borderColor: '#D1FAE5' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={14} className="text-ok-600" />
              <span className="text-xs font-semibold text-ok-700 uppercase tracking-wider">
                Consistency check
              </span>
            </div>
            <div className="space-y-2">
              {[
                'All claims sourced to approved evidence',
                'Messaging pillars align with research findings',
                'KPI targets consistent with segment size',
                'No expired claims referenced',
              ].map(check => (
                <div key={check} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-ok-600 mt-1.5 flex-shrink-0" />
                  <span className="text-xs text-ok-700 leading-relaxed">{check}</span>
                </div>
              ))}
            </div>
          </div>

          {/* KE note */}
          <div
            className="card card-pad"
            style={{ background: '#EEF2FF', borderColor: '#E0E7FF' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <AiPip>KE · Note</AiPip>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: '#1E1B4B' }}>
              Section 03 pillar order matches your ranked themes from the
              alignment step. Reorder themes in Step 04 to update automatically.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

/* ── Individual brief section ── */
function BriefSection({ section }) {
  return (
    <div>
      {/* Section heading */}
      <div className="text-xs font-bold uppercase tracking-widest
                      text-brand-700 mb-2">
        {section.num} · {section.heading}
      </div>

      {/* Plain text content */}
      {section.content && (
        <p
          className="text-sm text-ink-700 leading-relaxed"
          contentEditable
          suppressContentEditableWarning
        >
          {section.content}
        </p>
      )}

      {/* Messaging pillars */}
      {section.pillars && (
        <div className="space-y-2 mt-1">
          {section.pillars.map(pillar => (
            <div
              key={pillar.id}
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{
                background:
                  pillar.color === 'teal'  ? '#ECFEFF' :
                  pillar.color === 'brand' ? '#EEF2FF' : '#F6F7FA',
                borderLeft: `3px solid ${
                  pillar.color === 'teal'  ? '#06B6D4' :
                  pillar.color === 'brand' ? '#4338CA' : '#C8CCD8'
                }`,
              }}
            >
              <span
                className="font-mono text-xs font-bold px-2 py-0.5 rounded text-white flex-shrink-0"
                style={{
                  background:
                    pillar.color === 'teal'  ? '#0E7490' :
                    pillar.color === 'brand' ? '#1E1B4B' : '#777E94',
                }}
              >
                {pillar.id}
              </span>
              <span className="text-sm font-medium text-ink-900">
                {pillar.title}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* KPI table */}
      {section.kpis && (
        <div className="mt-2 overflow-hidden rounded-lg border border-ink-200">
          <table className="w-full text-xs">
            <thead className="bg-ink-50">
              <tr>
                <th className="text-left px-4 py-2 font-semibold text-ink-600
                               uppercase tracking-wider text-[10px]">
                  Metric
                </th>
                <th className="text-center px-4 py-2 font-semibold text-ink-600
                               uppercase tracking-wider text-[10px]">
                  Target
                </th>
                <th className="text-right px-4 py-2 font-semibold text-ink-600
                               uppercase tracking-wider text-[10px]">
                  By
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {section.kpis.map(kpi => (
                <tr key={kpi.label}>
                  <td className="px-4 py-2.5 font-medium text-ink-800">
                    {kpi.label}
                  </td>
                  <td className="px-4 py-2.5 text-center font-mono font-semibold text-brand-800">
                    {kpi.target}
                  </td>
                  <td className="px-4 py-2.5 text-right text-ink-400">
                    {kpi.by}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}