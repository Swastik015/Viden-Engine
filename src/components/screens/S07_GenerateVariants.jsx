import { useState } from 'react'
import { ChevronRight, RefreshCw, Download, Mail, Monitor, Newspaper, Presentation, Tv, Video } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import FilterBar from '../ui/FilterBar.jsx'
import AiPip    from '../ui/AiPip.jsx'
import Tag      from '../ui/Tag.jsx'

export default function S07_GenerateVariants() {
  const { data, advance, getFilteredVariants, selectedTheme } = useApp()
  const d        = data.screens.generateVariants
  const variants = getFilteredVariants()

  const [generating, setGenerating] = useState(false)
  const [generated,  setGenerated]  = useState(true)

  function handleRegenerate() {
    setGenerating(true)
    setGenerated(false)
    setTimeout(() => {
      setGenerating(false)
      setGenerated(true)
    }, 2000)
  }

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
          <button
            className="btn-ghost btn btn-sm"
            onClick={handleRegenerate}
          >
            <RefreshCw size={13} className={generating ? 'animate-spin' : ''} />
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

      {/* ── GenStudio config banner ── */}
      <div
        className="card card-pad mb-5 flex items-center justify-between gap-4"
        style={{ background: '#F0FDF4', borderColor: '#BBF7D0' }}
      >
        <div className="flex items-center gap-3">
          <AiPip type="gs">GenStudio · Generated from your config</AiPip>
          <div className="flex items-center gap-4 flex-wrap">
            {[
              { label: 'Theme',    value: selectedTheme?.title ?? 'Onset of Action' },
              { label: 'Brand',    value: data.campaign.brand                        },
              { label: 'Channels', value: '6'                                        },
              { label: 'Segments', value: '4'                                        },
              { label: 'Pillars',  value: 'P1 · P2 · P3'                            },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span className="text-xs text-ink-400">{item.label}:</span>
                <span className="text-xs font-semibold text-ink-900">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <span className="text-xs font-mono text-ink-400 flex-shrink-0">
          Generated in 2m 38s · GenStudio v2.4
        </span>
      </div>

      {/* ── Filter bar ── */}
      <FilterBar
        showChannel
        showSegment
        showWave={false}
        showResearchType={false}
        className="mb-4"
      />

      {/* ── Variant count ── */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-ink-600">
          Showing{' '}
          <strong className="text-ink-900">{variants.length}</strong> of{' '}
          <strong className="text-ink-900">{d.total}</strong> variants
        </p>
        <span className="text-xs text-ink-400">Most relevant first</span>
      </div>

      {/* ── Generating state ── */}
      {generating && (
        <div className="grid grid-cols-3 gap-5">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="card overflow-hidden animate-pulse">
              <div className="h-56 bg-ink-100" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-ink-100 rounded w-3/4" />
                <div className="h-3 bg-ink-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Variant grid ── */}
      {!generating && generated && (
        <div className="grid grid-cols-3 gap-5">
          {variants.map(variant => (
            <VariantCard key={variant.id} variant={variant} />
          ))}
        </div>
      )}

      {/* ── Load all footer ── */}
      {!generating && (
        <div className="mt-6 flex items-center justify-between">
          <button className="text-sm text-brand-700 font-semibold
                             hover:text-brand-900 transition-colors">
            Showing {variants.length} of {d.total} variants ·{' '}
            <span className="underline">Load all</span>
          </button>
          <span className="text-xs text-ink-400">Most relevant first</span>
        </div>
      )}
    </div>
  )
}

/* ── Variant card — renders differently per channel ── */
function VariantCard({ variant }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="card overflow-hidden hover:shadow-md transition-all
                 duration-200 hover:-translate-y-0.5 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top meta bar */}
      <div className="flex items-center justify-between px-3 py-2
                      border-b border-ink-100">
        <div className="flex items-center gap-2">
          <AiPip type="gs">{variant.id}</AiPip>
          <Tag type="info" dot={false} size="xs">{variant.channel}</Tag>
        </div>
        <span className="text-xs font-semibold text-ink-500">
          {variant.segment}
        </span>
      </div>

      {/* ── Realistic content preview ── */}
      <ContentPreview variant={variant} />

      {/* Bottom meta */}
      <div className="px-4 py-3 border-t border-ink-100">
        <div className="text-[10px] font-bold uppercase tracking-wider
                        text-ink-400 mb-1">
          {variant.type}
        </div>
        <div className="text-sm font-semibold text-ink-900 mb-2 leading-snug">
          "{variant.headline}"
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-ink-400">Quality</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-sm ${
                    i < variant.quality ? 'bg-ok-600' : 'bg-ink-200'
                  }`}
                />
              ))}
            </div>
            {variant.citation && (
              <span className="cite ml-1">{variant.citation}</span>
            )}
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            variant.pillar === 'P1' ? 'bg-teal-50 text-teal-700'  :
            variant.pillar === 'P2' ? 'bg-brand-50 text-brand-700':
                                      'bg-ink-100 text-ink-600'
          }`}>
            Pillar {variant.pillar}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ── Content preview — different per channel ── */
function ContentPreview({ variant }) {
  const channel = variant.channel

  if (channel === 'Email') {
    return (
      <div className="bg-white border-b border-ink-100" style={{ minHeight: 200 }}>
        {/* Email header */}
        <div className="px-4 py-3 bg-ink-50 border-b border-ink-100">
          <div className="text-[10px] text-ink-400 mb-0.5">
            From: <span className="text-ink-700">Vyepti Medical Affairs</span>
          </div>
          <div className="text-[10px] text-ink-400 mb-0.5">
            To: <span className="text-ink-700">Dr. [First Name] [Last Name]</span>
          </div>
          <div className="text-xs font-semibold text-ink-900">
            Subject: {variant.headline}
          </div>
        </div>
        {/* Email body */}
        <div className="px-4 py-3">
          <p className="text-xs text-ink-700 leading-relaxed mb-3">
            Dear Dr. [Last Name],
          </p>
          <p className="text-xs text-ink-600 leading-relaxed mb-3">
            For patients who have tried multiple preventive therapies without
            success, there is a different option — one that works from Day 1.
          </p>
          <p className="text-xs text-ink-600 leading-relaxed mb-4">
            Vyepti (eptinezumab-jjmr) demonstrated preventive effect as early
            as 24 hours post-infusion in PROMISE-1 trials.
          </p>
          <button
            className="px-4 py-1.5 rounded text-xs font-bold text-white"
            style={{ background: '#1E1B4B' }}
          >
            Learn more →
          </button>
        </div>
        <div className="px-4 py-2 border-t border-ink-100">
          <p className="text-[9px] text-ink-300">
            VYEPTI® (eptinezumab-jjmr) · For HCP use only · See full Prescribing Information
          </p>
        </div>
      </div>
    )
  }

  if (channel === 'Veeva CLM') {
    return (
      <div
        className="relative overflow-hidden"
        style={{
          minHeight: 200,
          background: 'linear-gradient(135deg, #1E1B4B 0%, #2D2A6E 100%)',
        }}
      >
        {/* Decorative elements */}
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
          style={{ background: '#67E8F9', transform: 'translate(30%, -30%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10"
          style={{ background: '#818CF8', transform: 'translate(-30%, 30%)' }}
        />

        <div className="relative p-5">
          {/* Vyepti logo area */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded bg-teal-400/20 flex items-center
                            justify-center">
              <span className="text-teal-300 font-bold text-[10px]">V</span>
            </div>
            <span className="text-teal-300 text-xs font-semibold tracking-wide">
              VYEPTI®
            </span>
          </div>

          {/* Headline */}
          <h3 className="text-white font-bold text-base leading-snug mb-3"
            style={{ fontFamily: 'Geist, sans-serif' }}>
            {variant.headline}
          </h3>

          {/* Data visual placeholder */}
          <div className="bg-white/10 rounded-lg p-3 mb-3">
            <div className="text-[10px] text-white/60 mb-2 uppercase tracking-wider">
              PROMISE-1 · Day 1 onset data
            </div>
            <div className="flex items-end gap-1 h-10">
              {[30, 55, 75, 85, 90, 88, 92].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background: i < 3
                      ? 'rgba(255,255,255,0.2)'
                      : '#67E8F9',
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[8px] text-white/40">Baseline</span>
              <span className="text-[8px] text-teal-300 font-bold">Day 1+</span>
            </div>
          </div>

          <div className="text-[9px] text-white/40">
            VYEPTI® (eptinezumab-jjmr) · For HCP use only
          </div>
        </div>
      </div>
    )
  }

  if (channel === 'Display') {
    return (
      <div
        className="flex flex-col items-center justify-between p-5"
        style={{
          minHeight: 200,
          background: 'linear-gradient(180deg, #EEF2FF 0%, #E0E7FF 100%)',
        }}
      >
        <div className="text-center flex-1 flex flex-col items-center
                        justify-center">
          <div className="text-[10px] font-bold text-brand-700 uppercase
                          tracking-widest mb-2">
            VYEPTI® (eptinezumab-jjmr)
          </div>
          <h3
            className="text-2xl font-bold text-brand-900 leading-tight mb-3"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            {variant.headline}
          </h3>
          <div className="w-12 h-px bg-brand-300 mb-3" />
          <p className="text-xs text-brand-700 mb-4">
            Quarterly IV preventive therapy
          </p>
          <button
            className="px-4 py-1.5 rounded-full text-xs font-bold
                       text-white"
            style={{ background: '#1E1B4B' }}
          >
            Learn more
          </button>
        </div>
        <div className="text-[8px] text-brand-400 mt-3 text-center">
          300×250 · For HCP use only
        </div>
      </div>
    )
  }

  if (channel === 'HCP Portal') {
    return (
      <div className="bg-white" style={{ minHeight: 200 }}>
        {/* Article hero */}
        <div
          className="h-16 flex items-end px-4 pb-2"
          style={{ background: 'linear-gradient(135deg, #ECFEFF, #EEF2FF)' }}
        >
          <Tag type="info" dot={false} size="xs">Clinical Review</Tag>
        </div>
        <div className="px-4 py-3">
          <h3
            className="text-sm font-bold text-ink-900 leading-snug mb-2"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            {variant.headline}
          </h3>
          <p className="text-xs text-ink-500 leading-relaxed mb-3">
            A review of DELIVER trial data demonstrating clinically meaningful
            response in patients with 2–4 prior preventive failures.
            Evidence summary for neurologists and headache specialists.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-brand-200
                            flex items-center justify-center">
              <span className="text-[8px] font-bold text-brand-800">V</span>
            </div>
            <span className="text-[10px] text-ink-400">
              Vyepti Medical Affairs · 5 min read
            </span>
          </div>
        </div>
        <div className="px-4 pb-3">
          <div className="text-[9px] text-ink-300">
            VYEPTI® (eptinezumab-jjmr) · For HCP use only
          </div>
        </div>
      </div>
    )
  }

  if (channel === 'Congress') {
    return (
      <div
        className="relative overflow-hidden"
        style={{
          minHeight: 200,
          background: 'linear-gradient(135deg, #0E7490 0%, #0E4F4F 100%)',
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative p-5">
          <div className="text-teal-300 text-[10px] font-bold uppercase
                          tracking-widest mb-3">
            AHS Annual Scientific Meeting 2026
          </div>
          <h3
            className="text-white font-bold text-lg leading-snug mb-4"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            {variant.headline}
          </h3>
          <div className="space-y-1.5 mb-4">
            {['Dr. R.B. — Northeast AMC', 'Dr. M.S. — Midwest Headache'].map(speaker => (
              <div key={speaker} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-teal-400/30
                                flex items-center justify-center">
                  <span className="text-[8px] text-teal-200">●</span>
                </div>
                <span className="text-xs text-white/80">{speaker}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-[10px] text-teal-300">
              Sep 21, 2026 · Booth 412
            </div>
          </div>
          <div className="mt-3 text-[9px] text-white/30">
            VYEPTI® (eptinezumab-jjmr) · For HCP use only
          </div>
        </div>
      </div>
    )
  }

  if (channel === 'P2P') {
    return (
      <div
        className="relative overflow-hidden"
        style={{
          minHeight: 200,
          background: '#0B0E1A',
        }}
      >
        <div className="p-5">
          {/* Webinar badge */}
          <div className="inline-flex items-center gap-1.5 px-2 py-1
                          rounded-full bg-white/10 border border-white/20 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500
                            animate-pulse" />
            <span className="text-[10px] font-bold text-white/80 uppercase
                             tracking-wide">
              Live Webinar
            </span>
          </div>

          <h3
            className="text-white font-bold text-base leading-snug mb-4"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            {variant.headline}
          </h3>

          {/* Speakers */}
          <div className="flex gap-2 mb-4">
            {['RB', 'MS', 'JP'].map(initials => (
              <div
                key={initials}
                className="w-8 h-8 rounded-full bg-gradient-to-br
                           from-teal-500 to-brand-600 flex items-center
                           justify-center"
              >
                <span className="text-[10px] font-bold text-white">
                  {initials}
                </span>
              </div>
            ))}
            <div className="flex flex-col justify-center ml-1">
              <span className="text-[10px] text-white/60">
                3 KOL speakers
              </span>
              <span className="text-[10px] text-white/40">60 min</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/50">
              Oct 14, 2026 · 12:00 PM ET
            </span>
            <button
              className="px-3 py-1 rounded-full text-[10px] font-bold
                         text-white"
              style={{ background: '#0E7490' }}
            >
              Register →
            </button>
          </div>

          <div className="mt-3 text-[9px] text-white/20">
            VYEPTI® (eptinezumab-jjmr) · For HCP use only
          </div>
        </div>
      </div>
    )
  }

  // Fallback
  return (
    <div
      className="flex items-center justify-center p-6"
      style={{ minHeight: 200, background: '#F6F7FA' }}
    >
      <p className="text-sm text-ink-400 text-center">{variant.headline}</p>
    </div>
  )
}