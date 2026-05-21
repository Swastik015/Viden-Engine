import { ChevronRight, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import FilterBar from '../ui/FilterBar.jsx'
import AiPip    from '../ui/AiPip.jsx'
import Tag      from '../ui/Tag.jsx'

export default function S03_PrimaryResearch() {
  const { data, advance, filters } = useApp()
  const d = data.screens.primaryResearch

  const type = filters.researchType

  const showKol         = type === 'All' || type === 'KOL Interviews'
  const showSurvey      = type === 'All' || type === 'HCP Survey'
  const showSocial      = type === 'All' || type === 'Social Signal'
  const showCompetitive = type === 'All' || type === 'Competitive'

  return (
    <div>
      {/* ── Screen header ── */}
      <div className="screen-head">
        <div>
          <div className="screen-eyebrow">
            <span className="actor-tag-ke">Knowledge Engine</span>
            <span>Step 03 · Discover</span>
          </div>
          <h1 className="screen-title">Primary &amp; secondary research</h1>
          <p className="screen-subtitle">
            New evidence pulled from KOL interviews, HCP surveys, social
            listening, market signals and competitive intelligence — synthesized
            for this brief.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn-secondary btn btn-sm">Refine query</button>
          <button className="btn-primary btn" onClick={advance}>
            Next · Align audience &amp; messaging
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <FilterBar showResearchType showChannel={false} showSegment={false} className="mb-5" />

      {/* ── KE synthesis banner ── */}
      <div
        className="card mb-6"
        style={{ background: 'linear-gradient(135deg, #ECFEFF 0%, #ffffff 40%)', borderColor: '#CFFAFE' }}
      >
        <div className="card-pad-lg">
          <div className="flex items-center gap-3 mb-3">
            <AiPip>KE · Synthesized</AiPip>
            <span className="text-xs text-ink-400">
              {d.evidenceUnits} evidence units · refreshed 14 min ago
            </span>
            <div className="flex items-center gap-1.5 font-mono text-xs text-ink-600 ml-auto">
              Confidence
              <ConfidenceBar score={d.synthesisConfidence} />
              {d.synthesisConfidence}%
            </div>
          </div>
          <p className="font-display text-lg font-medium text-ink-900
                         tracking-tight leading-snug max-w-4xl">
            {d.synthesis}
          </p>
        </div>
      </div>

      {/* ── Main content grid ── */}
      <div className="flex gap-5 items-start">

        {/* ── LEFT column ── */}
        <div className="flex-[2.2] space-y-5">

          {/* KOL Interviews */}
          {showKol && (
            <div className="card">
              <div className="card-head">
                <div className="card-title">
                  KOL interviews
                  <AiPip>KE</AiPip>
                </div>
                <span className="text-xs font-mono text-ink-400">
                  14 transcripts · Q2 2026
                </span>
              </div>
              <div className="divide-y divide-ink-100">
                {d.kolInterviews.map((kol, i) => (
                  <div key={i} className="px-5 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Tag type="info" dot={false} size="xs">{kol.tier}</Tag>
                        <span className="text-sm font-semibold text-ink-900">
                          {kol.name} · {kol.org}
                        </span>
                      </div>
                      <span className="text-xs text-ink-400">
                        {kol.quotes} quotes
                      </span>
                    </div>
                    <blockquote className="text-sm text-ink-700 italic leading-relaxed
                                           pl-3 border-l-2 border-brand-200 mb-2">
                      "{kol.quote}"
                    </blockquote>
                    <div className="flex gap-1.5 flex-wrap">
                      {kol.themes.map(theme => (
                        <Tag key={theme} type="teal" dot={false} size="xs">
                          {theme}
                        </Tag>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HCP Survey */}
          {showSurvey && (
            <div className="card">
              <div className="card-head">
                <div className="card-title">
                  HCP survey · n={d.hcpSurvey.n}
                  <AiPip>KE</AiPip>
                </div>
                <span className="text-xs font-mono text-ink-400">
                  Fielded {d.hcpSurvey.fielded}
                </span>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-2 gap-6">

                  {/* Bar chart: top unmet needs */}
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider
                                    text-ink-400 mb-3">
                      Top unmet need when switching
                    </div>
                    <div className="space-y-3">
                      {d.hcpSurvey.topUnmetNeeds.map(need => (
                        <div key={need.label}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-ink-700">{need.label}</span>
                            <span className="font-mono font-semibold text-ink-900">
                              {need.pct}%
                            </span>
                          </div>
                          <div className="h-1.5 bg-ink-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${need.pct}%`,
                                background:
                                  need.color === 'teal'  ? '#06B6D4' :
                                  need.color === 'brand' ? '#4338CA' : '#A0A6B8',
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Donut: awareness of onset */}
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider
                                    text-ink-400 mb-3">
                      Awareness of Vyepti onset evidence
                    </div>
                    <div className="flex items-center gap-4">
                      <DonutChart pct={d.hcpSurvey.awarenessOfOnset} />
                      <div>
                        <p className="text-sm text-ink-700 leading-relaxed mb-1">
                          <strong className="text-ink-900">
                            {100 - d.hcpSurvey.awarenessOfOnset}%
                          </strong>{' '}
                          of T1/T2 neurologists are{' '}
                          <span className="text-warn-700 font-semibold">unaware</span>{' '}
                          of Vyepti's Day 1 onset evidence
                        </p>
                        <p className="text-xs text-ink-400">
                          Significant uplift opportunity for KOL-led education.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

        </div>

        {/* ── RIGHT column ── */}
        <div className="flex-1 space-y-4">

          {/* Social signal */}
          {showSocial && (
            <div className="card">
              <div className="card-head">
                <div className="card-title">
                  Social &amp; congress signal
                  <AiPip>KE</AiPip>
                </div>
              </div>
              <div className="divide-y divide-ink-100">
                {d.socialSignal.map((sig, i) => (
                  <div key={i} className="px-4 py-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-ink-400">{sig.source}</span>
                      <TrendBadge type={sig.trendType} label={sig.trend} />
                    </div>
                    <p className="text-sm text-ink-700 leading-relaxed">
                      {sig.insight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Competitive landscape */}
          {showCompetitive && (
            <div className="card">
              <div className="card-head">
                <div className="card-title">
                  Competitive landscape
                  <AiPip>KE</AiPip>
                </div>
              </div>
              <div className="px-4 py-3">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-ink-200">
                      <th className="text-left pb-2 font-semibold text-ink-600 uppercase tracking-wider text-[10px]">Brand</th>
                      <th className="text-right pb-2 font-semibold text-ink-600 uppercase tracking-wider text-[10px]">Share</th>
                      <th className="text-right pb-2 font-semibold text-ink-600 uppercase tracking-wider text-[10px]">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100">
                    {d.competitive.map(comp => (
                      <tr key={comp.brand} className={comp.highlight ? 'bg-brand-50' : ''}>
                        <td className="py-2.5">
                          <span className={`font-semibold ${comp.highlight ? 'text-brand-900' : 'text-ink-800'}`}>
                            {comp.brand}
                          </span>{' '}
                          <span className="text-ink-400 font-normal">({comp.generic})</span>
                        </td>
                        <td className="py-2.5 text-right font-mono text-ink-900">
                          {comp.share}%
                        </td>
                        <td className={`py-2.5 text-right font-mono font-semibold ${
                          comp.trend > 0 ? 'text-ok-700' :
                          comp.trend < 0 ? 'text-risk-700' : 'text-ink-400'
                        }`}>
                          {comp.trend > 0 ? '+' : ''}{comp.trend}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[10px] text-ink-400 mt-3 pt-2 border-t border-dashed border-ink-200">
                  Source: IQVIA NPA · MAT Apr 2026
                </p>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── Decision gate ── */}
      <div className="gate mt-6">
        <div>
          <div className="gate-q">Enough context to proceed?</div>
          <div className="gate-sub">
            Viden estimates the evidence base is sufficient to draft the campaign
            brief. Refine if you'd like more KOL coverage or competitive depth.
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button className="btn-secondary btn btn-sm">
            No · refine search
          </button>
          <button className="btn-primary btn" onClick={advance}>
            Yes · proceed to align messaging
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

    </div>
  )
}

/* ── Confidence bar ── */
function ConfidenceBar({ score }) {
  const filled = Math.round((score / 100) * 5)
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`w-1 h-2.5 rounded-sm ${i < filled ? 'bg-ok-600' : 'bg-ink-200'}`}
        />
      ))}
    </div>
  )
}

/* ── Trend badge ── */
function TrendBadge({ type, label }) {
  const styles = {
    ok:    'text-ok-700',
    warn:  'text-warn-700',
    brand: 'text-brand-700',
  }
  return (
    <span className={`text-xs font-mono font-semibold ${styles[type] ?? 'text-ink-500'}`}>
      {label}
    </span>
  )
}

/* ── Donut chart (SVG) ── */
function DonutChart({ pct }) {
  const r           = 40
  const circumference = 2 * Math.PI * r
  const filled      = (pct / 100) * circumference

  return (
    <svg width="96" height="96" viewBox="0 0 96 96" className="flex-shrink-0">
      {/* Track */}
      <circle cx="48" cy="48" r={r} fill="none" stroke="#EEEFF4" strokeWidth="12" />
      {/* Fill */}
      <circle
        cx="48" cy="48" r={r}
        fill="none"
        stroke="#06B6D4"
        strokeWidth="12"
        strokeDasharray={`${filled} ${circumference}`}
        strokeDashoffset={circumference * 0.25}
        strokeLinecap="round"
        transform="rotate(-90 48 48)"
      />
      {/* Centre text */}
      <text x="48" y="44" textAnchor="middle"
        fontFamily="Fraunces, serif" fontSize="18" fontWeight="500" fill="#0B0E1A">
        {pct}%
      </text>
      <text x="48" y="58" textAnchor="middle"
        fontFamily="Geist, sans-serif" fontSize="9" fill="#777E94">
        aware
      </text>
    </svg>
  )
}