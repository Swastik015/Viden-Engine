import { SlidersHorizontal, X } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'

export default function FilterBar({
  showChannel      = true,
  showSegment      = true,
  showWave         = false,
  showResearchType = false,
  className        = '',
}) {
  const { data, filters, updateFilter } = useApp()

  const hasActiveFilters =
    (showChannel      && filters.channel      !== 'All Channels')  ||
    (showSegment      && filters.segment      !== 'All Segments')  ||
    (showWave         && filters.wave         !== 'All Waves')     ||
    (showResearchType && filters.researchType !== 'All')

  function clearAll() {
    if (showChannel)      updateFilter('channel',      'All Channels')
    if (showSegment)      updateFilter('segment',      'All Segments')
    if (showWave)         updateFilter('wave',         'All Waves')
    if (showResearchType) updateFilter('researchType', 'All')
  }

  return (
    <div className={`
      flex items-center gap-3 flex-wrap
      bg-white border border-ink-200 rounded-lg
      px-4 py-2.5 shadow-xs
      ${className}
    `}>

      {/* Icon + label */}
      <div className="flex items-center gap-1.5 text-ink-500 flex-shrink-0">
        <SlidersHorizontal size={14} strokeWidth={2} />
        <span className="text-xs font-semibold uppercase tracking-wider">
          Filter
        </span>
      </div>

      <div className="w-px h-4 bg-ink-200 flex-shrink-0" />

      {/* Channel filter */}
      {showChannel && (
        <div className="flex items-center gap-1.5">
          <label className="text-xs text-ink-500 font-medium whitespace-nowrap">
            Channel
          </label>
          <select
            value={filters.channel}
            onChange={e => updateFilter('channel', e.target.value)}
            className="h-7 px-2 pr-6 text-xs bg-ink-50 border border-ink-200
                       rounded-md text-ink-800 font-medium
                       focus:outline-none focus:border-brand-400 focus:bg-white
                       cursor-pointer transition-all duration-150
                       appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23777E94' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>")`,
              backgroundRepeat:   'no-repeat',
              backgroundPosition: 'right 6px center',
            }}
          >
            {data.filters.channels.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      )}

      {/* Segment filter */}
      {showSegment && (
        <div className="flex items-center gap-1.5">
          <label className="text-xs text-ink-500 font-medium whitespace-nowrap">
            Segment
          </label>
          <select
            value={filters.segment}
            onChange={e => updateFilter('segment', e.target.value)}
            className="h-7 px-2 pr-6 text-xs bg-ink-50 border border-ink-200
                       rounded-md text-ink-800 font-medium
                       focus:outline-none focus:border-brand-400 focus:bg-white
                       cursor-pointer transition-all duration-150
                       appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23777E94' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>")`,
              backgroundRepeat:   'no-repeat',
              backgroundPosition: 'right 6px center',
            }}
          >
            {data.filters.segments.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}

      {/* Wave filter */}
      {showWave && (
        <div className="flex items-center gap-1.5">
          <label className="text-xs text-ink-500 font-medium whitespace-nowrap">
            Wave
          </label>
          <select
            value={filters.wave}
            onChange={e => updateFilter('wave', e.target.value)}
            className="h-7 px-2 pr-6 text-xs bg-ink-50 border border-ink-200
                       rounded-md text-ink-800 font-medium
                       focus:outline-none focus:border-brand-400 focus:bg-white
                       cursor-pointer transition-all duration-150
                       appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23777E94' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>")`,
              backgroundRepeat:   'no-repeat',
              backgroundPosition: 'right 6px center',
            }}
          >
            {data.filters.waves.map(w => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>
      )}

      {/* Research type filter */}
      {showResearchType && (
        <div className="flex items-center gap-1.5">
          <label className="text-xs text-ink-500 font-medium whitespace-nowrap">
            Type
          </label>
          <select
            value={filters.researchType}
            onChange={e => updateFilter('researchType', e.target.value)}
            className="h-7 px-2 pr-6 text-xs bg-ink-50 border border-ink-200
                       rounded-md text-ink-800 font-medium
                       focus:outline-none focus:border-brand-400 focus:bg-white
                       cursor-pointer transition-all duration-150
                       appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23777E94' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>")`,
              backgroundRepeat:   'no-repeat',
              backgroundPosition: 'right 6px center',
            }}
          >
            {data.filters.researchTypes.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      )}

      {/* Active filter chips */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {showChannel && filters.channel !== 'All Channels' && (
          <ActiveChip
            label={filters.channel}
            onRemove={() => updateFilter('channel', 'All Channels')}
          />
        )}
        {showSegment && filters.segment !== 'All Segments' && (
          <ActiveChip
            label={filters.segment}
            onRemove={() => updateFilter('segment', 'All Segments')}
          />
        )}
        {showWave && filters.wave !== 'All Waves' && (
          <ActiveChip
            label={filters.wave}
            onRemove={() => updateFilter('wave', 'All Waves')}
          />
        )}
        {showResearchType && filters.researchType !== 'All' && (
          <ActiveChip
            label={filters.researchType}
            onRemove={() => updateFilter('researchType', 'All')}
          />
        )}
      </div>

      {/* Clear all */}
      {hasActiveFilters && (
        <>
          <div className="w-px h-4 bg-ink-200 flex-shrink-0" />
          <button
            onClick={clearAll}
            className="text-xs text-ink-400 hover:text-risk-600
                       font-medium transition-colors duration-150
                       flex items-center gap-1"
          >
            <X size={11} />
            Clear all
          </button>
        </>
      )}

      {/* Result count slot */}
      <div className="ml-auto text-xs font-mono text-ink-400 whitespace-nowrap">
        {/* Populated by parent if needed */}
      </div>

    </div>
  )
}

function ActiveChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 pl-2 pr-1 py-0.5
                     bg-brand-50 border border-brand-200 rounded-full
                     text-[10px] font-semibold text-brand-700">
      {label}
      <button
        onClick={onRemove}
        className="w-3.5 h-3.5 rounded-full flex items-center justify-center
                   hover:bg-brand-200 transition-colors"
      >
        <X size={8} strokeWidth={2.5} />
      </button>
    </span>
  )
}