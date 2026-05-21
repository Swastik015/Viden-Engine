import { ChevronRight, RefreshCw, Download } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import FilterBar from '../ui/FilterBar.jsx'
import AiPip    from '../ui/AiPip.jsx'
import Tag      from '../ui/Tag.jsx'

const QUALITY_MAX = 5

const BG_STYLES = {
  brand: {
    wrapper: 'bg-gradient-to-br from-brand-900 to-brand-700',
    text:    'text-white',
    sub:     'text-white/70',
  },
  teal: {
    wrapper: 'bg-gradient-to-br from-teal-900 to-teal-700',
    text:    'text-white',
    sub:     'text-white/70',
  },
  dark: {
    wrapper: 'bg-ink-900',
    text:    'text-white',
    sub:     'text-white/60',
  },
  white: {
    wrapper: 'bg-white border border-ink-200',
    text:    'text-ink-900',
    sub:     'text-ink-400',
  },
  ink: {
    wrapper: 'bg-ink-50 border border-ink-200',
    text:    'text-ink-900',
    sub:     'text-ink-400',
  },
  'brand-light': {
    wrapper: 'bg-gradient-to-br from-brand-100 to-white border border-brand-200',
    text:    'text-brand-900',
    sub:     'text-brand-600',
  },
}

export default function S07_GenerateVariants() {
  const { data, advance, getFilteredVariants, filters } = useApp()
  const d = data.screens.generateVariants

  const filtered  = getFilteredVariants()
  const isEmpty   = filtered.length === 0

  return (
    <div>
      {/* ── Screen header ── */}
      <div className="screen-head">
        <div>
          <div className="screen-eyebrow">
            <span className="actor-tag-gs">GenStudio</span>
            <span>Step 07 · Create</span>
          </div>
          <h1 className="screen-title">Generated content variants</h1>
          <p className="screen-subtitle">
            {d.total} variants across 6 channels and 4 audience segments.
            Every claim is citation-linked. Filter, preview, edit — or send
            the slate to MLR.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn-ghost btn btn-sm">
            <RefreshCw size={13} />
            Regenerate
          </button>
          <button className="btn-ghost btn btn-sm">
            <Download size={13} />
            Export DAM
          </button>
          <button className="btn-primary btn" onClick={advance}>
            Send to MLR · {d.total} variants
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <FilterBar
        showChannel
        showSegment
        showWave={false}
        showResearchType={false}
        className="mb-5"
      />

      {/* ── Results count ── */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-ink-500">
          Showing{' '}
          <span className="font-semibold text-ink-900">{filtered.length}</span>
          {' '}of{' '}
          <span className="font-semibold text-ink-900">{d.total}</span>
          {' '}variants
          {filters.channel !== 'All Channels' && (
            <span> · filtered by <strong>{filters.channel}</strong></span>
          )}
          {filters.segment !== 'All Segments' && (
            <span> · <strong>{filters.segment}</strong></span>
          )}
        </p>
        <span className="text-xs font-mono text-ink-400">
          Generated in 2m 38s · GenStudio v2.4
        </span>
      </div>

      {/* ── Empty state ── */}
      {isEmpty && (
        <div className="card flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 rounded-full bg-ink-100 flex items-center
                          justify-center mb-4">
            <RefreshCw size={20} className="text-ink-400" />
          </div>
          <h3 className="font-display text-base font-medium text-ink-900 mb-1">
            No variants match these filters
          </h3>
          <p className="text-sm text-ink-400 mb-4">
            Try selecting "All Channels" or "All Segments"
          </p>
        </div>
      )}

      {/* ── Variant grid ── */}
      {!isEmpty && (
        <div className="grid grid-cols-3 gap-4">
          {filtered.map(variant => (
            <VariantCard key={variant.id} variant={variant} />
          ))}
        </div>
      )}

      {/* ── Footer ── */}
      {!isEmpty && filtered.length < d.total && (
        <div className="flex items-center justify-between mt-5 pt-4
                        border-t border-ink-200">
          <span className="text-sm text-ink-400">
            Showing {filtered.length} of {d.total} variants ·{' '}
            <button className="text-brand-700 font-semibold hover:underline">
              Load all
            </button>
          </span>
          <span className="text-xs font-mono text-ink-400">
            Most relevant first
          </span>
        </div>
      )}
    </div>
  )
}

/* ── Variant card ── */
function VariantCard({ variant }) {
  const bg = BG_STYLES[variant.bgColor] ?? BG_STYLES.white

  return (
    <div className="card overflow-hidden">

      {/* Card header */}
      <div className="px-3 py-2.5 border-b border-ink-200 flex items-center
                      justify-between">
        <div className="flex items-center gap-2">
          <AiPip type="gs">{variant.id}</AiPip>
          <Tag type="info" dot={false} size="xs">{variant.channel}</Tag>
        </div>
        <Tag
          type={
            variant.segment.includes('KOL')  ? 'teal' :
            variant.segment.includes('PCPs') ? 'warn' : 'info'
          }
          dot={false}
          size="xs"
        >
          {variant.segment}
        </Tag>
      </div>

      {/* Preview area */}
      <div
        className={`
          aspect-[4/3] p-4 relative overflow-hidden
          ${bg.wrapper}
        `}
      >
        {/* Preview label */}
        <div className={`font-mono text-[9px] uppercase tracking-widest
                         mb-2 ${bg.sub}`}>
          {variant.preview}
        </div>

        {/* Headline */}
        <div className={`font-display text-base font-medium leading-snug
                         tracking-tight ${bg.text}`}>
          {variant.headline}
        </div>

        {/* Bottom bar */}
        <div className={`absolute bottom-3 left-4 right-4 flex justify-between
                         text-[8px] font-mono ${bg.sub}`}>
          <span>VYEPTI® (eptinezumab-jjmr)</span>
          <span>For HCP use only</span>
        </div>
      </div>

      {/* Card footer */}
      <div className="px-3 py-3">
        {/* Headline label */}
        <div className="text-[10px] text-ink-400 uppercase tracking-wider mb-1">
          {variant.type}
        </div>

        {/* Headline text */}
        <div className="text-sm text-ink-900 leading-snug mb-2.5">
          "{variant.headline}"
          {variant.citation && (
            <span className="cite ml-1">{variant.citation}</span>
          )}
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <QualityBar score={variant.quality} max={QUALITY_MAX} />
          <Tag
            type={variant.pillar === 'P1' ? 'ok' : variant.pillar === 'P2' ? 'ok' : 'warn'}
            dot={false}
            size="xs"
          >
            Pillar {variant.pillar}
          </Tag>
        </div>
      </div>
    </div>
  )
}

/* ── Quality bar ── */
function QualityBar({ score, max }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] text-ink-400">Quality</span>
      <div className="flex gap-0.5">
        {Array.from({ length: max }).map((_, i) => (
          <span
            key={i}
            className={`w-1 h-2.5 rounded-sm ${
              i < score ? 'bg-ok-600' : 'bg-ink-200'
            }`}
          />
        ))}
      </div>
    </div>
  )
}