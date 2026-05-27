import { useState } from 'react'
import { ChevronRight, SlidersHorizontal, TrendingUp } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import KpiCard from '../ui/KpiCard.jsx'
import Tag     from '../ui/Tag.jsx'
import AiPip   from '../ui/AiPip.jsx'

const SCORE_COLORS = {
  high:    { text: 'text-ok-700',   bg: 'bg-ok-50',   border: 'border-ok-100'   },
  medium:  { text: 'text-teal-700', bg: 'bg-teal-50',  border: 'border-teal-100' },
  caution: { text: 'text-warn-700', bg: 'bg-warn-50',  border: 'border-warn-100' },
}

export default function S02_PriorIntelligence() {
  const { data, advance, selectedTheme } = useApp()
  const d = data.screens.priorIntelligence

  const [claimFilters, setClaimFilters] = useState({
    brand:                'Vyepti',
    audience:             'All Audiences',
    channel:              'All Channels',
    theme:                selectedTheme?.title ?? 'All Themes',
    approvedWithin:       'Last 18 months',
    substantiationStatus: 'No challenges in 12 months',
    mlrScoreMin:          '>= 0.70',
    sortBy:               'friendly score · desc',
  })

  function updateClaimFilter(key, value) {
    setClaimFilters(prev => ({ ...prev, [key]: value }))
  }

  // Filter claims based on mlrScoreMin
  const filteredClaims = d.claimsLibrary.filter(c => {
    const minScore = parseFloat(claimFilters.mlrScoreMin.replace('>= ', '')) || 0
    if (claimFilters.mlrScoreMin === 'Any') return true
    return c.mlrScore >= minScore
  })

  return (
    <div>
      {/* ── Screen header ── */}
      <div className="screen-head">
        <div>
          <div className="screen-eyebrow">
            <span className="actor-tag-ke">Knowledge Engine</span>
            <span>Step 02 · Discover</span>
          </div>
          <h1 className="screen-title">What we already know</h1>
          <p className="screen-subtitle">
            Surfacing prior Vyepti campaigns, claims library, audience
            insights and performance benchmarks relevant to this brief.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn-secondary btn btn-sm">Refine query</button>
          <button className="btn-primary btn" onClick={advance}>
            Next · Pull primary research
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* ── 1. Campaign config banner ── */}
      <div className="card card-pad mb-6"
        style={{ background: '#F8F8FF', borderColor: '#C7D2FE' }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest
                           text-brand-700">
            Campaign config · carried from Step 01
          </span>
        </div>
        <div className="flex items-center gap-6 flex-wrap">
          {[
            { label: 'Brand',      value: data.campaign.brand             },
            { label: 'Objective',  value: 'HCP education and awareness'   },
            { label: 'Audience',   value: 'Neurologists · Headache · PCPs'},
            { label: 'Geography',  value: data.campaign.geography         },
            { label: 'Theme',      value: selectedTheme?.title ?? 'Not set'},
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="text-xs text-ink-400">{item.label}:</span>
              <span className="text-xs font-semibold text-ink-900">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. KPI band ── */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {d.kpis.map(kpi => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            delta={kpi.delta}
          />
        ))}
      </div>

      {/* ── 3. Prior campaigns (full width) ── */}
      <div className="mb-8">
        <div className="sec-head">
          <span className="sec-head-title">
            Most relevant prior campaigns
          </span>
          <span className="sec-head-meta">Ranked by semantic match</span>
        </div>

        <div className="space-y-4">
          {d.campaigns.map(camp => (
            <div
              key={camp.id}
              className="card card-pad"
              style={{ borderLeft: `4px solid ${
                camp.matchScore > 80 ? '#4338CA' :
                camp.matchScore > 70 ? '#6366F1' : '#C8CCD8'
              }`}}
            >
              {/* Top row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <AiPip>KE · Match {camp.matchScore}%</AiPip>
                  <Tag type={camp.tagType} dot={false}>{camp.tag}</Tag>
                </div>
                <span className="font-mono text-xs text-ink-400">
                  {camp.id}
                </span>
              </div>

              {/* Campaign name */}
              <h3
                className="text-base font-semibold text-ink-900 mb-1"
                style={{ fontFamily: 'Geist, sans-serif' }}
              >
                {camp.name}
              </h3>

              {/* One-line performance summary */}
              <p className="text-sm text-ink-600 mb-3 leading-relaxed">
                {camp.summary}
              </p>

              {/* Meta grid */}
              <div className="grid grid-cols-3 gap-4 pt-3
                              border-t border-ink-100">
                <div>
                  <div className="text-[10px] text-ink-400 mb-0.5 uppercase
                                  tracking-wider">
                    Channels
                  </div>
                  <div className="text-xs text-ink-700">{camp.channels}</div>
                </div>
                <div>
                  <div className="text-[10px] text-ink-400 mb-0.5 uppercase
                                  tracking-wider">
                    Lift
                  </div>
                  <div className={`text-xs font-semibold ${
                    camp.liftType === 'ok'   ? 'text-ok-700'   :
                    camp.liftType === 'warn' ? 'text-warn-700' :
                    'text-ink-700'
                  }`}>
                    {camp.lift}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-ink-400 mb-0.5 uppercase
                                  tracking-wider">
                    {camp.liftType === 'warn' ? 'Lesson learned' : 'What worked'}
                  </div>
                  <div className="text-xs text-ink-700">{camp.whatWorked}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. Claims Library ── */}
      <div className="mb-8">
        <div className="sec-head">
          <span className="sec-head-title">Claims library</span>
          <span className="sec-head-meta">
            {filteredClaims.length} of {d.claimsLibrary.length} claims
          </span>
        </div>

        <div className="flex gap-5 items-start">

          {/* Left: Filters */}
          <div
            className="card flex-shrink-0 overflow-hidden"
            style={{ width: 240 }}
          >
            <div className="px-4 py-3 border-b border-ink-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={13} className="text-ink-500" />
                <span className="text-xs font-bold uppercase tracking-wider
                                 text-ink-600">
                  Strategist filters
                </span>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {[
                {
                  key:     'brand',
                  label:   'Brand',
                  options: d.claimsFilters.brands,
                },
                {
                  key:     'audience',
                  label:   'Audience',
                  options: d.claimsFilters.audiences,
                },
                {
                  key:     'channel',
                  label:   'Channel',
                  options: d.claimsFilters.channels,
                },
                {
                  key:     'theme',
                  label:   'Theme',
                  options: d.claimsFilters.themes,
                },
                {
                  key:     'approvedWithin',
                  label:   'Approved within',
                  options: d.claimsFilters.approvedWithin,
                },
                {
                  key:     'substantiationStatus',
                  label:   'Substantiation status',
                  options: d.claimsFilters.substantiationStatus,
                },
                {
                  key:     'mlrScoreMin',
                  label:   'MLR-friendly score',
                  options: d.claimsFilters.mlrScoreMin,
                },
                {
                  key:     'sortBy',
                  label:   'Sort by',
                  options: d.claimsFilters.sortBy,
                },
              ].map(filter => (
                <div key={filter.key}>
                  <div className="text-[10px] font-bold uppercase tracking-wider
                                  text-ink-500 mb-1.5">
                    {filter.label}
                  </div>
                  <select
                    value={claimFilters[filter.key]}
                    onChange={e =>
                      updateClaimFilter(filter.key, e.target.value)
                    }
                    className="w-full px-2.5 py-1.5 text-xs bg-ink-50
                               border border-ink-200 rounded-md text-ink-800
                               focus:outline-none focus:border-brand-400
                               cursor-pointer"
                  >
                    {filter.options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Results */}
          <div className="flex-1 card overflow-hidden">
            {/* Results header */}
            <div
              className="px-5 py-3 flex items-center justify-between"
              style={{ background: '#1E1B4B' }}
            >
              <span className="text-xs font-bold uppercase tracking-wider
                               text-white">
                Results · Approved claims matching filter
              </span>
              <span className="font-mono text-xs text-white/60">
                {filteredClaims.length} of {d.claimsLibrary.length} claims
              </span>
            </div>

            {/* Claim rows */}
            <div className="divide-y divide-ink-100">
              {filteredClaims.map(claim => {
                const sc = SCORE_COLORS[claim.mlrLevel] ?? SCORE_COLORS.medium
                return (
                  <div
                    key={claim.id}
                    className="flex items-center gap-4 px-5 py-4
                               hover:bg-ink-50 transition-colors"
                  >
                    {/* Claim ID */}
                    <span className="font-mono text-xs text-ink-400
                                     flex-shrink-0 w-12">
                      {claim.id}
                    </span>

                    {/* Claim text */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-ink-900 font-medium mb-0.5">
                        "{claim.text}"
                      </p>
                      <p className="text-xs text-ink-400">{claim.support}</p>
                    </div>

                    {/* Meta */}
                    <div className="flex-shrink-0 text-right space-y-0.5">
                      <div className="text-[10px] font-mono text-ink-400">
                        approved {claim.approved}
                      </div>
                      <div className="text-[10px] text-ink-400">
                        {claim.priorUses} prior uses
                      </div>
                      <div className="text-[10px] text-ink-400">
                        {claim.rejections} rejections
                      </div>
                    </div>

                    {/* MLR score */}
                    <div className={`
                      flex-shrink-0 w-16 text-center px-2 py-2
                      rounded-lg border ${sc.bg} ${sc.border}
                    `}>
                      <div className={`text-lg font-bold ${sc.text}`}
                        style={{ fontFamily: 'Geist, sans-serif' }}>
                        {claim.mlrScore.toFixed(2)}
                      </div>
                      <div className={`text-[9px] font-semibold uppercase
                                       tracking-wide ${sc.text}`}>
                        {claim.mlrLevel}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>



      {/* ── 6. Performance Summary ── */}
      <div>
        <div className="sec-head">
          <span className="sec-head-title">Performance summary</span>
          <AiPip>KE · From CRM and Veeva CLM</AiPip>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {d.audienceInsights.map((insight, i) => (
            <div key={i} className="card card-pad">
              <div
                className="text-3xl font-bold text-ink-900 mb-2 tracking-tight"
                style={{ fontFamily: 'Geist, sans-serif' }}
              >
                {insight.stat}
              </div>
              <p className="text-sm text-ink-700 leading-relaxed mb-2">
                {insight.text}
              </p>
              <span className="cite">{insight.cite}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}