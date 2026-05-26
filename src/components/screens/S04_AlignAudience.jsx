import { useState } from 'react'
import { ChevronRight, Check, Plus, X, SlidersHorizontal, Star, Users } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import AiPip from '../ui/AiPip.jsx'
import Tag   from '../ui/Tag.jsx'

const ALL_SEGMENTS = [
  {
    id:         'tier1-kol',
    label:      'Tier 1 KOLs',
    desc:       'UCNS-certified headache specialists at AMCs',
    count:      140,
    matchPct:   92,
    matchColor: 'ok',
    recommended: true,
    filters: [
      { key: 'Specialty',   value: 'Headache neurology' },
      { key: 'Certification', value: 'UCNS-certified'   },
      { key: 'Geography',   value: 'United States'      },
      { key: 'Institution', value: 'Academic Medical Center' },
    ],
  },
  {
    id:         'tier2-neuro',
    label:      'Tier 2 — High-vol. Neuros',
    desc:       'Migraine Rx volume top decile, multi-physician',
    count:      580,
    matchPct:   81,
    matchColor: 'ok',
    recommended: true,
    filters: [
      { key: 'Specialty',   value: 'Neurology'          },
      { key: 'Rx volume',   value: 'Top decile'         },
      { key: 'Geography',   value: 'United States'      },
      { key: 'Practice',    value: 'Multi-physician'    },
    ],
  },
  {
    id:         'gen-neuro',
    label:      'General Neurologists',
    desc:       'All US-licensed neurologists outside T1/T2',
    count:      15480,
    matchPct:   62,
    matchColor: 'teal',
    recommended: false,
    filters: [
      { key: 'Specialty',   value: 'Neurology'          },
      { key: 'Geography',   value: 'United States'      },
      { key: 'Rx volume',   value: 'Any'                },
    ],
  },
  {
    id:         'high-rx-pcp',
    label:      'High-prescribing PCPs',
    desc:       '30+ preventive Rx in trailing 12 months',
    count:      2200,
    matchPct:   47,
    matchColor: 'warn',
    recommended: false,
    filters: [
      { key: 'Specialty',   value: 'Primary Care'       },
      { key: 'Rx volume',   value: '30+ preventive Rx'  },
      { key: 'Timeframe',   value: 'Trailing 12 months' },
      { key: 'Geography',   value: 'United States'      },
    ],
  },
  {
    id:         'infusion-dir',
    label:      'Infusion Suite Directors',
    desc:       'Directors of infusion suites and oncology centers',
    count:      820,
    matchPct:   38,
    matchColor: 'warn',
    recommended: false,
    filters: [
      { key: 'Role',        value: 'Director / Manager' },
      { key: 'Setting',     value: 'Infusion suite'     },
      { key: 'Geography',   value: 'United States'      },
    ],
  },
]

const FILTER_OPTIONS = {
  Specialty:     ['Headache neurology', 'Neurology', 'Primary Care', 'Pain medicine', 'Psychiatry'],
  Certification: ['UCNS-certified', 'Board-certified', 'Any'],
  Geography:     ['United States', 'Northeast', 'Southeast', 'Midwest', 'West'],
  Institution:   ['Academic Medical Center', 'Community hospital', 'Private practice', 'Any'],
  'Rx volume':   ['Top decile', '30+ preventive Rx', 'Any'],
  Practice:      ['Multi-physician', 'Solo practice', 'Any'],
  Timeframe:     ['Trailing 12 months', 'Trailing 6 months', 'Any'],
  Role:          ['Director / Manager', 'Clinician', 'Any'],
  Setting:       ['Infusion suite', 'Hospital', 'Outpatient clinic', 'Any'],
}

export default function S04_AlignAudience() {
  const { data, advance, selectedTheme } = useApp()

  const [selected,     setSelected]     = useState(new Set(['tier1-kol', 'tier2-neuro']))
  const [editingId,    setEditingId]    = useState(null)
  const [segmentFilters, setSegmentFilters] = useState(
    Object.fromEntries(ALL_SEGMENTS.map(s => [s.id, [...s.filters]]))
  )
  const [showAddMore,  setShowAddMore]  = useState(false)

  function toggleSelect(id) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function updateFilter(segId, filterKey, newValue) {
    setSegmentFilters(prev => ({
      ...prev,
      [segId]: prev[segId].map(f =>
        f.key === filterKey ? { ...f, value: newValue } : f
      ),
    }))
  }

  function removeFilter(segId, filterKey) {
    setSegmentFilters(prev => ({
      ...prev,
      [segId]: prev[segId].filter(f => f.key !== filterKey),
    }))
  }

  function addFilter(segId) {
    const existing = segmentFilters[segId].map(f => f.key)
    const available = Object.keys(FILTER_OPTIONS).find(k => !existing.includes(k))
    if (!available) return
    setSegmentFilters(prev => ({
      ...prev,
      [segId]: [...prev[segId], { key: available, value: FILTER_OPTIONS[available][0] }],
    }))
  }

  const totalSelected = ALL_SEGMENTS
    .filter(s => selected.has(s.id))
    .reduce((sum, s) => sum + s.count, 0)

  const shownSegments = showAddMore
    ? ALL_SEGMENTS
    : ALL_SEGMENTS.filter(s => s.recommended || selected.has(s.id) || s.matchPct >= 60)

  return (
    <div>
      {/* ── Screen header ── */}
      <div className="screen-head">
        <div>
          <div className="screen-eyebrow">
            <span className="actor-tag-user">Your action</span>
            <span>Step 04 · Discover</span>
          </div>
          <h1 className="screen-title">Align audience</h1>
          <p className="screen-subtitle">
            Select the audience segments for this campaign. KE has recommended
            the best-fit segments based on your theme and objectives.
            Edit filters to refine each segment.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn-secondary btn btn-sm">Reset to KE defaults</button>
          <button className="btn-primary btn" onClick={advance}>
            Next · Campaign brief
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* ── KE Recommendation banner ── */}
      <div
        className="card card-pad mb-6 flex items-center justify-between gap-6"
        style={{
          background: 'linear-gradient(135deg, #1E1B4B 0%, #2D2A6E 100%)',
          border: 'none',
        }}
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center
                          justify-center flex-shrink-0">
            <Star size={15} className="text-teal-400 fill-teal-400" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest
                            text-teal-400 mb-1">
              KE · Recommended segments
            </div>
            <p className="text-sm text-white font-medium">
              For the{' '}
              <strong className="text-teal-300">
                {selectedTheme?.title ?? 'Onset of Action'}
              </strong>{' '}
              theme, Viden recommends{' '}
              <strong className="text-white">Tier 1 KOLs</strong> and{' '}
              <strong className="text-white">T2 High-vol. Neurologists</strong>{' '}
              as primary segments
            </p>
            <p className="text-xs text-white/60 mt-0.5">
              92% and 81% match scores based on prior campaign performance
              and KOL interview alignment
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 text-right">
          <div className="text-2xl font-bold text-white"
            style={{ fontFamily: 'Geist, sans-serif' }}>
            {totalSelected.toLocaleString()}
          </div>
          <div className="text-xs text-white/60">HCPs selected</div>
        </div>
      </div>

      {/* ── Segment cards ── */}
      <div className="space-y-4">
        {shownSegments.map(seg => {
          const isSelected = selected.has(seg.id)
          const isEditing  = editingId === seg.id
          const filters    = segmentFilters[seg.id] ?? seg.filters

          const matchColor =
            seg.matchPct >= 80 ? '#059669' :
            seg.matchPct >= 60 ? '#0E7490' :
            seg.matchPct >= 40 ? '#D97706' : '#E11D48'

          return (
            <div
              key={seg.id}
              className={`
                card transition-all duration-200
                ${isSelected ? 'ring-2 ring-brand-300' : ''}
              `}
              style={{
                borderLeft: `4px solid ${isSelected ? '#1E1B4B' : '#E2E4EC'}`,
              }}
            >
              {/* ── Card top row ── */}
              <div className="p-4">
                <div className="flex items-start gap-4">

                  {/* Select checkbox */}
                  <button
                    onClick={() => toggleSelect(seg.id)}
                    className={`
                      w-6 h-6 rounded-md flex items-center justify-center
                      flex-shrink-0 mt-0.5 border-2 transition-all duration-150
                      ${isSelected
                        ? 'bg-brand-800 border-brand-800'
                        : 'border-ink-300 hover:border-brand-400'
                      }
                    `}
                  >
                    {isSelected && <Check size={13} className="text-white" />}
                  </button>

                  {/* Segment info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3
                        className="text-base font-semibold text-ink-900"
                        style={{ fontFamily: 'Geist, sans-serif' }}
                      >
                        {seg.label}
                      </h3>
                      {seg.recommended && (
                        <span className="flex items-center gap-1 text-[9px]
                                         font-bold uppercase tracking-wide
                                         px-1.5 py-0.5 rounded-full bg-teal-50
                                         border border-teal-200 text-teal-700">
                          <Star size={8} className="fill-teal-600 text-teal-600" />
                          KE Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-ink-500">{seg.desc}</p>
                  </div>

                  {/* HCP count */}
                  <div className="flex-shrink-0 text-center">
                    <div
                      className="text-xl font-bold text-ink-900"
                      style={{ fontFamily: 'Geist, sans-serif' }}
                    >
                      {seg.count.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-ink-400">HCPs</div>
                  </div>

                  {/* Match score */}
                  <div className="flex-shrink-0 text-center w-16">
                    <div
                      className="text-xl font-bold"
                      style={{ color: matchColor, fontFamily: 'Geist, sans-serif' }}
                    >
                      {seg.matchPct}%
                    </div>
                    <div className="text-[10px] text-ink-400">match</div>
                    <div className="mt-1 h-1 bg-ink-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${seg.matchPct}%`, background: matchColor }}
                      />
                    </div>
                  </div>

                  {/* Edit button */}
                  <button
                    onClick={() => setEditingId(isEditing ? null : seg.id)}
                    className={`
                      flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                      text-xs font-semibold transition-colors flex-shrink-0
                      ${isEditing
                        ? 'bg-brand-100 text-brand-800'
                        : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
                      }
                    `}
                  >
                    <SlidersHorizontal size={12} />
                    {isEditing ? 'Done' : 'Edit filters'}
                  </button>

                </div>
              </div>

              {/* ── Filter editor (expanded) ── */}
              {isEditing && (
                <div
                  className="border-t border-ink-100 p-4"
                  style={{ background: '#F8F8FF' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-ink-700 uppercase
                                     tracking-wider">
                      Segment filters
                    </span>
                    <span className="text-xs text-ink-400">
                      {filters.length} filters applied
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {filters.map(filter => (
                      <div
                        key={filter.key}
                        className="flex items-center gap-1 bg-white border
                                   border-ink-200 rounded-lg overflow-hidden
                                   shadow-xs"
                      >
                        <span className="text-[10px] font-bold text-ink-500
                                         uppercase tracking-wide px-2 py-1.5
                                         bg-ink-50 border-r border-ink-200">
                          {filter.key}
                        </span>
                        <select
                          value={filter.value}
                          onChange={e =>
                            updateFilter(seg.id, filter.key, e.target.value)
                          }
                          className="text-xs text-ink-800 px-2 py-1.5 bg-white
                                     focus:outline-none cursor-pointer"
                        >
                          {(FILTER_OPTIONS[filter.key] ?? [filter.value]).map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => removeFilter(seg.id, filter.key)}
                          className="px-1.5 py-1.5 text-ink-300
                                     hover:text-risk-600 transition-colors"
                        >
                          <X size={11} />
                        </button>
                      </div>
                    ))}

                    {/* Add filter button */}
                    <button
                      onClick={() => addFilter(seg.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg
                                 border border-dashed border-ink-300 text-xs
                                 text-ink-500 hover:border-brand-400
                                 hover:text-brand-700 transition-colors"
                    >
                      <Plus size={11} />
                      Add filter
                    </button>
                  </div>

                  {/* Updated HCP count after filter changes */}
                  <div className="flex items-center gap-2">
                    <Users size={13} className="text-ink-400" />
                    <span className="text-xs text-ink-500">
                      Estimated reach after filters:
                    </span>
                    <span className="text-xs font-bold text-ink-900">
                      {Math.round(seg.count * (filters.length > seg.filters.length ? 0.7 : 1)).toLocaleString()} HCPs
                    </span>
                  </div>
                </div>
              )}

            </div>
          )
        })}
      </div>

      {/* ── Add more segments ── */}
      <div className="mt-4">
        {!showAddMore ? (
          <button
            onClick={() => setShowAddMore(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg
                       border border-dashed border-ink-300 text-sm
                       text-ink-500 hover:border-brand-400 hover:text-brand-700
                       transition-colors w-full justify-center"
          >
            <Plus size={14} />
            Show more segments
          </button>
        ) : (
          <button
            onClick={() => setShowAddMore(false)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg
                       border border-ink-200 text-sm text-ink-500
                       hover:border-ink-300 transition-colors w-full
                       justify-center"
          >
            <X size={14} />
            Show fewer segments
          </button>
        )}
      </div>

      {/* ── Selection summary ── */}
      {selected.size > 0 && (
        <div
          className="mt-6 card card-pad"
          style={{ background: '#EEF2FF', borderColor: '#C7D2FE' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-ink-900">
              Selected audience
            </span>
            <span className="font-mono text-sm font-bold text-brand-800">
              {totalSelected.toLocaleString()} HCPs total
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {ALL_SEGMENTS.filter(s => selected.has(s.id)).map(seg => (
              <div
                key={seg.id}
                className="flex items-center gap-2 px-3 py-1.5 bg-white
                           border border-brand-200 rounded-lg"
              >
                <span className="text-xs font-semibold text-brand-900">
                  {seg.label}
                </span>
                <span className="text-xs font-mono text-brand-700">
                  {seg.count.toLocaleString()}
                </span>
                <button
                  onClick={() => toggleSelect(seg.id)}
                  className="text-ink-300 hover:text-risk-600
                             transition-colors"
                >
                  <X size={11} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}