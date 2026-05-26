import { useState, useRef } from 'react'
import { ChevronRight, Search, GripVertical, Plus, X } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import AiPip from '../ui/AiPip.jsx'
import Tag   from '../ui/Tag.jsx'

const SEARCH_SUGGESTIONS = [
  { id: 'onset-iv',    title: 'IV onset advantage vs subcutaneous',         resonance: 71 },
  { id: 'cost-access', title: 'Cost and reimbursement clarity',             resonance: 58 },
  { id: 'nurse-edu',   title: 'Nurse educator support for infusion visits', resonance: 64 },
  { id: 'patient-exp', title: 'Patient-reported experience after infusion', resonance: 67 },
  { id: 'real-world',  title: 'Real-world evidence beyond pivotal trials',  resonance: 73 },
]

export default function S04_AlignAudience() {
  const { data, advance } = useApp()
  const d = data.screens.alignAudience

  const [themes,      setThemes]      = useState(d.themes)
  const [searchQuery, setSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [dragIndex,   setDragIndex]   = useState(null)
  const [dragOver,    setDragOver]    = useState(null)
  const dragNode                      = useRef(null)

  // ── Search filtering ──────────────────────────────────────────────
  const filteredSuggestions = SEARCH_SUGGESTIONS.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !themes.find(t => t.id === s.id)
  )

  function addTheme(suggestion) {
    const newTheme = {
      id:          suggestion.id,
      rank:        themes.length + 1,
      title:       suggestion.title,
      resonance:   suggestion.resonance,
      level:       suggestion.resonance >= 70 ? 'high' : 'mid',
      description: 'Added from search. Viden will pull supporting evidence from the knowledge engine.',
      citations:   [],
      kolCount:    0,
      mlrStatus:   null,
      color:       'brand',
    }
    setThemes(prev => [...prev, newTheme])
    setSearchQuery('')
    setShowResults(false)
  }

  function removeTheme(id) {
    setThemes(prev => {
      const updated = prev.filter(t => t.id !== id)
      return updated.map((t, i) => ({ ...t, rank: i + 1 }))
    })
  }

  // ── Drag and drop ─────────────────────────────────────────────────
  function handleDragStart(e, index) {
    setDragIndex(index)
    dragNode.current = e.currentTarget
    dragNode.current.addEventListener('dragend', handleDragEnd)
    setTimeout(() => {
      if (dragNode.current) {
        dragNode.current.style.opacity = '0.4'
      }
    }, 0)
  }

  function handleDragEnter(e, index) {
    e.preventDefault()
    if (index !== dragIndex) {
      setDragOver(index)
    }
  }

  function handleDragOver(e) {
    e.preventDefault()
  }

  function handleDrop(e, index) {
    e.preventDefault()
    if (dragIndex === null || dragIndex === index) return

    setThemes(prev => {
      const updated = [...prev]
      const [moved] = updated.splice(dragIndex, 1)
      updated.splice(index, 0, moved)
      // Recalculate ranks and resonance based on new order
      return updated.map((t, i) => ({
        ...t,
        rank:      i + 1,
        resonance: Math.max(30, t.resonance - (i * 4)),
      }))
    })

    setDragIndex(null)
    setDragOver(null)
  }

  function handleDragEnd() {
    if (dragNode.current) {
      dragNode.current.style.opacity = '1'
      dragNode.current.removeEventListener('dragend', handleDragEnd)
    }
    dragNode.current = null
    setDragIndex(null)
    setDragOver(null)
  }

  // ── Compute segment resonance based on top theme ──────────────────
  function getSegmentResonance(seg) {
    const topTheme = themes[0]
    if (!topTheme) return seg.matchPct
    const boost =
      topTheme.color === 'teal'  ? { ok: 5,   teal: 8,  warn: -4 } :
      topTheme.color === 'brand' ? { ok: 2,   teal: 3,  warn: 0  } :
                                   { ok: -2,  teal: 0,  warn: 2  }
    return Math.min(99, Math.max(20, seg.matchPct + (boost[seg.matchColor] ?? 0)))
  }

  return (
    <div>
      {/* ── Screen header ── */}
      <div className="screen-head">
        <div>
          <div className="screen-eyebrow">
            <span className="actor-tag-user">Your action</span>
            <span>Step 04 · Discover</span>
          </div>
          <h1 className="screen-title">Align audience and messaging</h1>
          <p className="screen-subtitle">
            Drag themes to reorder by priority. The top theme drives which
            audience segments resonate most. Search to add new themes from
            the knowledge engine.
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

      {/* ── Main layout ── */}
      <div className="flex gap-5 items-start">

        {/* ── LEFT: Messaging themes ── */}
        <div className="flex-[1.5]">

          {/* Search bar */}
          <div className="relative mb-4">
            <div className="flex items-center gap-2 px-3 py-2.5 bg-white
                            border border-ink-200 rounded-lg shadow-xs">
              <Search size={15} className="text-ink-400 flex-shrink-0" />
              <input
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value)
                  setShowResults(e.target.value.length > 0)
                }}
                onFocus={() => setShowResults(searchQuery.length > 0)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                placeholder="Search for additional themes and claims..."
                className="flex-1 text-sm text-ink-900 bg-transparent
                           outline-none placeholder-ink-400"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); setShowResults(false) }}
                  className="text-ink-400 hover:text-ink-700 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Search results dropdown */}
            {showResults && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white
                              border border-ink-200 rounded-lg shadow-md z-20
                              overflow-hidden">
                {filteredSuggestions.length > 0 ? (
                  <div className="divide-y divide-ink-100">
                    {filteredSuggestions.map(s => (
                      <button
                        key={s.id}
                        onClick={() => addTheme(s)}
                        className="w-full flex items-center justify-between
                                   px-4 py-3 hover:bg-ink-50 transition-colors
                                   text-left"
                      >
                        <div className="flex items-center gap-2">
                          <Plus size={13} className="text-brand-600
                                                      flex-shrink-0" />
                          <span className="text-sm text-ink-800">{s.title}</span>
                        </div>
                        <span className="text-xs font-mono text-ink-400">
                          {s.resonance}% resonance
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-3 text-sm text-ink-400">
                    No themes found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Section header */}
          <div className="sec-head mb-3">
            <span className="sec-head-title">Messaging themes</span>
            <AiPip>KE · drag to reprioritise</AiPip>
          </div>

          {/* Draggable themes */}
          <div className="space-y-3">
            {themes.map((theme, index) => {
              const colorMap = {
                teal:  { bg: '#ECFEFF', border: '#A5F3FC', icon: '#0E7490', bar: '#0E7490' },
                brand: { bg: '#EEF2FF', border: '#C7D2FE', icon: '#4338CA', bar: '#4338CA' },
                ink:   { bg: '#F6F7FA', border: '#E2E4EC', icon: '#777E94', bar: '#A0A6B8' },
              }
              const c     = colorMap[theme.color] ?? colorMap.ink
              const isTop = index === 0

              return (
                <div
                  key={theme.id}
                  draggable
                  onDragStart={e => handleDragStart(e, index)}
                  onDragEnter={e => handleDragEnter(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={e => handleDrop(e, index)}
                  className={`
                    card transition-all duration-200 select-none
                    ${dragOver === index ? 'border-brand-400 shadow-md' : ''}
                    ${isTop ? 'ring-2 ring-brand-200' : ''}
                  `}
                  style={{
                    borderLeft: `4px solid ${c.bar}`,
                    cursor: 'grab',
                  }}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">

                      {/* Drag handle */}
                      <div className="flex-shrink-0 mt-1 text-ink-300
                                      hover:text-ink-600 transition-colors">
                        <GripVertical size={16} />
                      </div>

                      {/* Rank badge */}
                      <div
                        className="w-7 h-7 rounded-full flex items-center
                                   justify-center flex-shrink-0 font-bold
                                   text-xs text-white mt-0.5"
                        style={{ background: c.bar }}
                      >
                        {theme.rank}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className="text-sm font-semibold text-ink-900
                                       leading-snug"
                            style={{ fontFamily: 'Geist, sans-serif' }}
                          >
                            {theme.title}
                          </h3>
                          {isTop && (
                            <span className="text-[9px] font-bold uppercase
                                             tracking-wider px-1.5 py-0.5
                                             rounded-full bg-brand-100
                                             text-brand-700 flex-shrink-0">
                              Lead theme
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-ink-500 leading-relaxed mb-2">
                          {theme.description}
                        </p>

                        <div className="flex items-center gap-2 flex-wrap">
                          {theme.citations.map(c => (
                            <span key={c} className="cite">{c}</span>
                          ))}
                          {theme.kolCount > 0 && (
                            <Tag type="info" dot={false} size="xs">
                              {theme.kolCount} KOLs
                            </Tag>
                          )}
                          {theme.mlrStatus === 'pre-cleared' && (
                            <Tag type="ok" dot={false} size="xs">
                              MLR pre-cleared
                            </Tag>
                          )}
                          {theme.mlrStatus === 'warn' && (
                            <Tag type="warn" dot={false} size="xs">
                              Needs fair balance
                            </Tag>
                          )}
                        </div>
                      </div>

                      {/* Resonance score */}
                      <div className="flex-shrink-0 text-center w-16">
                        <div
                          className="text-2xl font-bold tracking-tight"
                          style={{
                            color: c.bar,
                            fontFamily: 'Geist, sans-serif',
                          }}
                        >
                          {theme.resonance}
                        </div>
                        <div className="text-[9px] text-ink-400 uppercase
                                        tracking-wide">
                          resonance
                        </div>
                        <div className="mt-1 h-1 bg-ink-100 rounded-full
                                        overflow-hidden w-full">
                          <div
                            className="h-full rounded-full transition-all
                                       duration-500"
                            style={{
                              width:      `${theme.resonance}%`,
                              background: c.bar,
                            }}
                          />
                        </div>
                      </div>

                      {/* Remove button (only for added themes) */}
                      {!['1','2','3','4'].includes(String(theme.rank)) &&
                       theme.citations.length === 0 && (
                        <button
                          onClick={() => removeTheme(theme.id)}
                          className="flex-shrink-0 w-6 h-6 rounded-full
                                     bg-ink-100 flex items-center justify-center
                                     hover:bg-risk-100 hover:text-risk-700
                                     transition-colors text-ink-400"
                        >
                          <X size={11} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Instruction hint */}
          <div className="mt-3 flex items-center gap-2 text-xs text-ink-400">
            <GripVertical size={13} />
            <span>Drag cards up or down to reorder theme priority</span>
          </div>

        </div>

        {/* ── RIGHT: Audience resonance ── */}
        <div className="flex-1 space-y-4">

          {/* Dynamic resonance card */}
          <div className="card">
            <div className="card-head">
              <div className="card-title">
                Audience resonance
              </div>
              <AiPip>Updates as you reorder</AiPip>
            </div>

            <div className="p-4 space-y-4">
              {d.segments.map(seg => {
                const dynamicPct = getSegmentResonance(seg)
                const changed    = dynamicPct !== seg.matchPct
                const color =
                  dynamicPct >= 80 ? '#059669' :
                  dynamicPct >= 60 ? '#0E7490' :
                  dynamicPct >= 40 ? '#D97706' : '#E11D48'

                return (
                  <div key={seg.label}>
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <div className="text-sm font-semibold text-ink-900">
                          {seg.label}
                        </div>
                        <div className="text-xs text-ink-400">{seg.desc}</div>
                      </div>
                      <div className="text-right">
                        <div
                          className="text-xl font-bold tracking-tight"
                          style={{
                            color,
                            fontFamily: 'Geist, sans-serif',
                          }}
                        >
                          {dynamicPct}%
                        </div>
                        {changed && (
                          <div className={`text-[10px] font-mono font-semibold ${
                            dynamicPct > seg.matchPct
                              ? 'text-ok-700'
                              : 'text-risk-700'
                          }`}>
                            {dynamicPct > seg.matchPct ? '+' : ''}
                            {dynamicPct - seg.matchPct} vs default
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="h-2 bg-ink-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${dynamicPct}%`, background: color }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Top theme insight card */}
          {themes[0] && (
            <div
              className="card card-pad"
              style={{ background: '#F8F6FF', borderColor: '#E9D5FF' }}
            >
              <AiPip className="mb-2">KE · Lead theme insight</AiPip>
              <p className="text-sm text-ink-800 leading-relaxed">
                With{' '}
                <strong className="text-brand-800">{themes[0].title}</strong>{' '}
                as your lead theme, T1 KOLs and T2 high-volume neurologists
                are your highest-resonance segments. Consider sequencing
                KOL-led peer panels before broader channel activation.
              </p>
            </div>
          )}

          {/* Segment count summary */}
          <div className="card card-pad">
            <div className="text-[10px] font-bold uppercase tracking-wider
                            text-ink-400 mb-3">
              Total addressable HCPs
            </div>
            <div className="space-y-2">
              {d.segments.map(seg => (
                <div key={seg.label}
                  className="flex items-center justify-between">
                  <span className="text-xs text-ink-700">{seg.label}</span>
                  <span className="font-mono text-xs font-semibold text-ink-900">
                    {seg.count.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-ink-100 flex items-center
                              justify-between">
                <span className="text-xs font-semibold text-ink-900">Total</span>
                <span className="font-mono text-sm font-bold text-brand-800">
                  {d.segments
                    .reduce((sum, s) => sum + s.count, 0)
                    .toLocaleString()}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}