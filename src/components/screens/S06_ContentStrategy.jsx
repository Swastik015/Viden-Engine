import { ChevronRight, Plus, Clock } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import AiPip from '../ui/AiPip.jsx'
import Tag   from '../ui/Tag.jsx'

export default function S06_ContentStrategy() {
  const { data, advance } = useApp()
  const d = data.screens.contentStrategy

  return (
    <div>
      {/* ── Screen header ── */}
      <div className="screen-head">
        <div>
          <div className="screen-eyebrow">
            <span className="actor-tag-user">Your action</span>
            <span>Step 06 · Plan</span>
          </div>
          <h1 className="screen-title">Content strategy</h1>
          <p className="screen-subtitle">
            Select channels and assign audience segments. Personalization rules
            control what each HCP sees. GenStudio will generate 30 variants.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn-ghost btn btn-sm">Export strategy</button>
          <button className="btn-primary btn" onClick={advance}>
            Confirm · generate variants
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* ── Channel × Segment matrix ── */}
      <div className="mb-6">
        <div className="sec-head mb-3">
          <span className="sec-head-title">Channel × segment matrix</span>
          <span className="sec-head-meta">6 channels · 30 total variants</span>
        </div>

        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-200 bg-ink-50">
                <th className="text-left px-5 py-3 font-semibold text-ink-600
                               text-xs uppercase tracking-wider w-48">
                  Channel
                </th>
                {['T1 KOL\n~140', 'T2 Neuro\n~580', 'Gen. Neuro\n~15,480', 'High-Rx PCPs\n~2,200'].map(h => (
                  <th key={h} className="text-center px-4 py-3 font-semibold
                                         text-ink-600 text-xs uppercase tracking-wider">
                    {h.split('\n').map((line, i) => (
                      <div key={i} className={i === 1 ? 'text-ink-400 font-normal normal-case' : ''}>
                        {line}
                      </div>
                    ))}
                  </th>
                ))}
                <th className="text-center px-4 py-3 font-semibold text-ink-600
                               text-xs uppercase tracking-wider w-24">
                  Variants
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {d.channelMatrix.map(row => (
                <tr key={row.channel} className="hover:bg-ink-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-semibold text-ink-900 text-sm">
                      {row.channel}
                    </div>
                    <div className="text-xs text-ink-400 mt-0.5">
                      {row.subLabel}
                    </div>
                  </td>
                  {[row.t1, row.t2, row.gen, row.pcp].map((active, i) => (
                    <td key={i} className="text-center px-4 py-3.5">
                      {active ? (
                        <div className="w-8 h-8 bg-teal-600 rounded-md mx-auto
                                        flex items-center justify-center">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-ink-100 rounded-md mx-auto" />
                      )}
                    </td>
                  ))}
                  <td className="text-center px-4 py-3.5 font-mono text-sm
                                 font-semibold text-ink-700">
                    {row.variants}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Bottom row ── */}
      <div className="flex gap-5 items-start">

        {/* ── Personalization rules ── */}
        <div className="flex-[1.4]">
          <div className="sec-head mb-3">
            <span className="sec-head-title">Personalization rules</span>
            <span className="sec-head-meta">
              {d.personalizationRules.length} active · applied per variant
            </span>
          </div>

          <div className="space-y-2">
            {d.personalizationRules.map(rule => (
              <div key={rule.id} className="card card-pad-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs px-2 py-0.5 rounded
                                     bg-brand-100 text-brand-800 font-bold
                                     flex-shrink-0">
                      {rule.id}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-ink-900">
                        {rule.rule}
                      </div>
                      <div className="text-xs text-ink-400 mt-0.5">
                        {rule.pillar}
                      </div>
                    </div>
                  </div>
                  <Tag type="ok" dot={false} size="xs" className="flex-shrink-0 ml-3">
                    {rule.status}
                  </Tag>
                </div>
              </div>
            ))}

            {/* Add rule placeholder */}
            <button className="w-full card card-pad-sm border-dashed
                               text-ink-400 hover:text-brand-700 hover:border-brand-300
                               transition-colors duration-150 text-left">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs px-2 py-0.5 rounded
                                 bg-ink-100 text-ink-500 font-bold">
                  + ADD
                </span>
                <span className="text-sm">Add a personalization rule</span>
              </div>
            </button>
          </div>
        </div>

        {/* ── Generation plan ── */}
        <div className="flex-1">
          <div className="sec-head mb-3">
            <span className="sec-head-title">Generation plan</span>
            <span className="sec-head-meta">Confirmed by GenStudio</span>
          </div>

          <div
            className="card"
            style={{ background: 'linear-gradient(180deg, #ECFDF5 0%, #ffffff 50%)', borderColor: '#D1FAE5' }}
          >
            <div className="card-pad-lg">

              {/* GenStudio badge */}
              <div className="mb-4">
                <AiPip type="gs">GenStudio · Ready</AiPip>
              </div>

              {/* Big number */}
              <div className="font-display text-5xl font-medium text-ink-900
                              tracking-tight leading-none mb-1">
                {d.generationPlan.totalVariants}
              </div>
              <div className="text-sm text-ink-400 mb-5">variants will be generated</div>

              {/* Stats grid */}
              <div className="space-y-2.5">
                {[
                  { label: 'Modular components',     value: d.generationPlan.modularComponents     },
                  { label: 'Channel-specific variants',value: d.generationPlan.totalVariants        },
                  { label: 'Subject lines per email', value: d.generationPlan.subjectLinesPerEmail  },
                  { label: 'Languages',               value: d.generationPlan.languages             },
                ].map(item => (
                  <div key={item.label}
                    className="flex items-center justify-between">
                    <span className="text-xs text-ink-400">{item.label}</span>
                    <span className="font-mono text-sm font-semibold text-ink-900">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Est. time */}
              <div className="mt-5 pt-4 border-t border-dashed border-ink-200">
                <div className="text-xs text-ink-400 mb-1.5">Est. generation time</div>
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-ok-600" />
                  <span className="text-sm font-semibold text-ok-700">
                    ~{Math.floor(d.generationPlan.estTimeSeconds / 60)}m{' '}
                    {d.generationPlan.estTimeSeconds % 60}s
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}