import { useState } from 'react'
import { ChevronRight, Download, Share2, CheckCircle } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import AiPip from '../ui/AiPip.jsx'
import Tag   from '../ui/Tag.jsx'

export default function S05_CampaignBrief() {
  const { data, advance, selectedTheme } = useApp()
  const d = data.screens.campaignBrief

  const [approved, setApproved] = useState(false)

  function handleApprove() {
    setApproved(true)
    setTimeout(() => advance(), 800)
  }

  return (
    <div>
      {/* ── Screen header ── */}
      <div className="screen-head">
        <div>
          <div className="screen-eyebrow">
            <span className="actor-tag-user">Your action</span>
            <span className="actor-tag-ke">KE Auto-populated</span>
            <span>Step 05 · Plan</span>
          </div>
          <h1 className="screen-title">Campaign brief</h1>
          <p className="screen-subtitle">
            Auto-drafted from your alignment decisions. Every claim carries
            its source. Edit any section — Viden re-checks consistency.
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
          {!approved ? (
            <button
              className="btn-primary btn"
              onClick={handleApprove}
            >
              <CheckCircle size={14} />
              Approve · Configure content
              <ChevronRight size={14} />
            </button>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                            bg-ok-50 border border-ok-200">
              <CheckCircle size={14} className="text-ok-600" />
              <span className="text-xs font-semibold text-ok-700">
                Brief approved
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Main body ── */}
      <div className="flex gap-5 items-start">

        {/* ── Brief document ── */}
        <div className="flex-[1.6] card overflow-hidden">

          {/* Doc header */}
          <div className="px-6 py-4 border-b border-ink-100 bg-ink-50">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest
                                text-ink-400 mb-0.5">
                  Campaign Brief · {d.version}
                </div>
                <h2
                  className="text-lg font-semibold text-ink-900"
                  style={{ fontFamily: 'Geist, sans-serif' }}
                >
                  {data.campaign.name}
                </h2>
                <div className="text-xs text-ink-400 mt-0.5">
                  {data.campaign.subtitle}
                </div>
              </div>
              <div className="text-right text-xs text-ink-400 space-y-0.5">
                <div>Version: <strong className="text-ink-700">{d.version}</strong></div>
                <div>Author: <strong className="text-ink-700">{d.author}</strong></div>
                <div>Date: <strong className="text-ink-700">{d.date}</strong></div>
                <div>Brand: <strong className="text-ink-700">{data.campaign.brand}</strong></div>
                <div>Go-live: <strong className="text-ink-700">{data.campaign.goLive}</strong></div>
              </div>
            </div>

            {/* Theme badge */}
            {selectedTheme && (
              <div
                className="mt-3 inline-flex items-center gap-2 px-3 py-1.5
                           rounded-lg text-xs"
                style={{
                  background: selectedTheme.color.bg,
                  border:     `1px solid ${selectedTheme.color.border}`,
                }}
              >
                <span className="font-bold uppercase tracking-wider"
                  style={{ color: selectedTheme.color.icon }}>
                  Theme
                </span>
                <span className="font-semibold"
                  style={{ color: selectedTheme.color.btn }}>
                  {selectedTheme.title}
                </span>
              </div>
            )}
          </div>

          {/* Sections */}
          <div className="divide-y divide-ink-100">
            {d.sections.map(section => (
              <div key={section.num} className="px-6 py-5">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-mono text-xs font-bold text-ink-400">
                    {section.num}
                  </span>
                  <h3
                    className="text-sm font-bold text-ink-900 uppercase
                               tracking-wider"
                    style={{ fontFamily: 'Geist, sans-serif' }}
                  >
                    {section.heading}
                  </h3>
                </div>

                {section.content && (
                  <p className="text-sm text-ink-700 leading-relaxed ml-7">
                    {section.content}
                  </p>
                )}

                {section.pillars && (
                  <div className="ml-7 flex flex-col gap-2">
                    {section.pillars.map(pillar => (
                      <div
                        key={pillar.id}
                        className={`
                          flex items-center gap-3 px-4 py-2.5 rounded-lg border
                          ${pillar.color === 'teal'
                            ? 'bg-teal-50 border-teal-200'
                            : 'bg-brand-50 border-brand-200'
                          }
                        `}
                      >
                        <span className={`
                          font-mono text-xs font-bold px-2 py-0.5 rounded
                          ${pillar.color === 'teal'
                            ? 'bg-teal-700 text-white'
                            : 'bg-brand-600 text-white'
                          }
                        `}>
                          {pillar.id}
                        </span>
                        <span className="text-sm font-medium text-ink-800">
                          {pillar.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* KPIs replaced with historical + projected table */}
                {section.kpis && (
                  <div className="ml-7 space-y-4">
                    <div className="overflow-hidden rounded-lg border border-ink-200">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-ink-50 border-b border-ink-200">
                            <th className="px-4 py-2.5 text-left text-[10px]
                                           font-bold uppercase tracking-wider
                                           text-ink-500 w-1/3">
                              Metric
                            </th>
                            <th className="px-4 py-2.5 text-left text-[10px]
                                           font-bold uppercase tracking-wider
                                           text-ink-500">
                              Target
                            </th>
                            <th className="px-4 py-2.5 text-left text-[10px]
                                           font-bold uppercase tracking-wider
                                           text-ink-400">
                              Historical avg
                              <span className="font-normal ml-1">(14 campaigns)</span>
                            </th>
                            <th className="px-4 py-2.5 text-left text-[10px]
                                           font-bold uppercase tracking-wider
                                           text-ok-600">
                              Expected uplift
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-ink-100">
                          {[
                            { label: 'SoV lift',           target: '+2.4 pts', historical: '+1.9 pts', uplift: '+26%',  by: '30 Nov 2026' },
                            { label: 'HCPs reached',       target: '9,500',    historical: '7,200',    uplift: '+32%',  by: '30 Nov 2026' },
                            { label: 'Infusion referrals', target: '+18%',     historical: '+12%',     uplift: '+50%',  by: 'Q3 close'    },
                            { label: 'Engagement rate',    target: '3x+',      historical: '2.8x',     uplift: '+21%',  by: 'vs baseline' },
                            { label: 'Time to launch',     target: '6 wks',    historical: '9 wks',    uplift: '-33%',  by: 'vs prior avg'},
                          ].map(row => (
                            <tr key={row.label} className="hover:bg-ink-50">
                              <td className="px-4 py-3">
                                <div className="text-xs font-semibold text-ink-900">
                                  {row.label}
                                </div>
                                <div className="text-[10px] text-ink-400">
                                  {row.by}
                                </div>
                              </td>
                              <td className="px-4 py-3 font-mono font-bold
                                             text-ink-900 text-sm">
                                {row.target}
                              </td>
                              <td className="px-4 py-3 font-mono text-sm
                                             text-ink-500">
                                {row.historical}
                              </td>
                              <td className="px-4 py-3">
                                <span className="font-mono text-xs font-bold
                                                 px-2 py-0.5 rounded-full
                                                 bg-ok-50 text-ok-700">
                                  {row.uplift}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* KE projection note */}
                    <div
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg"
                      style={{ background: '#ECFDF5', border: '1px solid #D1FAE5' }}
                    >
                      <AiPip>KE · Projection</AiPip>
                      <p className="text-xs text-ok-800 leading-relaxed">
                        Projections based on 14 prior Vyepti campaigns.
                        Onset of Action theme historically outperforms
                        class average by 26% on SoV lift. Confidence: 82%.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Consistency check + doc info ── */}
        <div className="flex-1 space-y-4">

          {/* Consistency check */}
          <div className="card">
            <div className="card-head">
              <div className="card-title">
                <AiPip>KE</AiPip>
                Consistency check
              </div>
              <Tag type="ok" dot={false} size="xs">All clear</Tag>
            </div>
            <div className="p-4 space-y-2">
              {[
                'All claims sourced to approved evidence',
                'Messaging pillars align with research findings',
                'KPIs consistent with historical benchmarks',
                'No expired claims referenced',
                'Audience segments match objective',
              ].map(check => (
                <div key={check}
                  className="flex items-center gap-2 text-xs text-ink-700">
                  <CheckCircle size={13} className="text-ok-600 flex-shrink-0" />
                  {check}
                </div>
              ))}
            </div>
          </div>

          {/* Document info */}
          <div className="card">
            <div className="card-head">
              <div className="card-title">Document info</div>
            </div>
            <div className="divide-y divide-ink-100">
              {[
                { label: 'Version', value: d.version           },
                { label: 'Author',  value: d.author            },
                { label: 'Created', value: d.date              },
                { label: 'Brand',   value: data.campaign.brand },
                { label: 'Go-live', value: data.campaign.goLive},
              ].map(row => (
                <div key={row.label}
                  className="px-4 py-2.5 flex items-center justify-between">
                  <span className="text-xs text-ink-400">{row.label}</span>
                  <span className="text-xs font-semibold text-ink-800
                                   text-right max-w-[60%]">
                    {row.value}
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