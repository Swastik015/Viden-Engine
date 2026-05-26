import { useState } from 'react'
import { ChevronRight, Zap, AlertCircle } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import AiPip from '../ui/AiPip.jsx'
import Tag   from '../ui/Tag.jsx'

export default function S01_StartCampaign() {
  const { data, advance, selectedTheme } = useApp()
  const d = data.screens.startCampaign

  const [objectives, setObjectives] = useState(d.objectives)
  const [audiences,  setAudiences]  = useState(d.audiences)

  function toggleObjective(id) {
    setObjectives(prev =>
      prev.map(o => o.id === id ? { ...o, selected: !o.selected } : o)
    )
  }

  function toggleAudience(id) {
    setAudiences(prev =>
      prev.map(a => a.id === id ? { ...a, selected: !a.selected } : a)
    )
  }

  return (
    <div>
      {/* ── Screen header ── */}
      <div className="screen-head">
        <div>
          <div className="screen-eyebrow">
            <span className="actor-tag-user">Your action</span>
            <span>Step 01 · Discover</span>
          </div>
          <h1
            className="text-2xl font-semibold text-ink-900 tracking-tight"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            Start a new campaign
          </h1>
          <p className="screen-subtitle">
            Define the objective, target audience and goals. Viden will
            surface relevant prior intelligence as you type.
          </p>

          {/* Theme pre-load banner */}
          {selectedTheme && (
            <div
              className="mt-3 flex items-center gap-3 px-4 py-2.5 rounded-lg"
              style={{
                background: selectedTheme.color.bg,
                border: `1px solid ${selectedTheme.color.border}`,
              }}
            >
              <span
                className="text-xs font-bold uppercase tracking-wider
                           flex-shrink-0"
                style={{ color: selectedTheme.color.icon }}
              >
                Theme pre-loaded
              </span>
              <span
                className="font-semibold text-sm"
                style={{ color: selectedTheme.color.btn }}
              >
                {selectedTheme.title}
              </span>
              <span className="text-ink-400 text-xs">
                · Viden has pre-loaded relevant claims, KOL data and
                prior intelligence for this theme
              </span>
            </div>
          )}
        </div>

        <div className="screen-actions">
          <button className="btn-ghost btn-sm btn">Save draft</button>
          <button className="btn-primary btn" onClick={advance}>
            Continue · Discover intelligence
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex gap-5 items-start">

        {/* ── LEFT: Form ── */}
        <div className="card flex-[1.6]">
          <div className="card-pad-lg space-y-4">

            {/* Campaign name */}
            <div className="field">
              <label className="field-label">Campaign name</label>
              <input
                className="field-input"
                defaultValue={
                  selectedTheme
                    ? `Vyepti Q3 2026 — ${selectedTheme.title}`
                    : d.formDefaults.campaignName
                }
              />
            </div>

            {/* Brand + Therapeutic area */}
            <div className="grid grid-cols-2 gap-4">
              <div className="field mb-0">
                <label className="field-label">Brand</label>
                <select className="field-select">
                  <option>{d.formDefaults.brand}</option>
                  <option>Trintellix</option>
                  <option>Rexulti</option>
                </select>
              </div>
              <div className="field mb-0">
                <label className="field-label">Therapeutic area</label>
                <select className="field-select">
                  <option>{d.formDefaults.therapeuticArea}</option>
                  <option>Major Depressive Disorder</option>
                  <option>Schizophrenia</option>
                </select>
              </div>
            </div>

            {/* Primary objective */}
            <div className="field mb-0">
              <label className="field-label">
                Primary objective
                <span className="field-hint">
                  Drives Viden's evidence retrieval strategy
                </span>
              </label>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {objectives.map(obj => (
                  <button
                    key={obj.id}
                    onClick={() => toggleObjective(obj.id)}
                    className={`chip ${obj.selected ? 'chip-selected' : ''}`}
                  >
                    {obj.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Target audience */}
            <div className="field mb-0">
              <label className="field-label">
                Target audience
                <span className="field-hint">
                  {audiences.filter(a => a.selected).length} segments selected
                </span>
              </label>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {audiences.map(aud => (
                  <button
                    key={aud.id}
                    onClick={() => toggleAudience(aud.id)}
                    className={`chip ${aud.selected ? 'chip-selected' : ''}`}
                  >
                    {aud.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Geography + Launch window */}
            <div className="grid grid-cols-2 gap-4">
              <div className="field mb-0">
                <label className="field-label">Geography</label>
                <select className="field-select">
                  <option>{d.formDefaults.geography}</option>
                </select>
              </div>
              <div className="field mb-0">
                <label className="field-label">Launch window</label>
                <select className="field-select">
                  <option>{d.formDefaults.launchWindow}</option>
                </select>
              </div>
            </div>

            {/* KPIs */}
            <div className="field mb-0">
              <label className="field-label">Strategic goals (KPIs)</label>
              <div className="grid grid-cols-3 gap-2.5 mt-1.5">
                {d.kpis.map(kpi => (
                  <div
                    key={kpi.label}
                    className="card card-pad-sm bg-ink-50 border-dashed"
                  >
                    <div className="text-[10px] text-ink-500 mb-1">
                      {kpi.label}
                    </div>
                    <div className="font-mono font-semibold text-ink-900 text-base">
                      {kpi.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── RIGHT: AI Sidekick ── */}
        <div
          className="card flex-1"
          style={{
            background: 'linear-gradient(180deg, #ECFEFF 0%, #ffffff 40%)',
          }}
        >
          <div className="card-head border-teal-100">
            <div className="card-title">
              <AiPip>KE · Live</AiPip>
              Viden is already learning
            </div>
          </div>

          <div className="card-body space-y-4">
            <p className="text-sm text-ink-700 leading-relaxed">
              As you define this campaign, Viden has matched it against{' '}
              <strong>
                {d.aiSidekick.priorCampaigns} prior Vyepti campaigns
              </strong>
              , the{' '}
              <strong>
                {d.aiSidekick.evidenceBases.join(' and ')}
              </strong>{' '}
              evidence base, and current competitive intelligence.
            </p>

            {/* Suggested segments */}
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider
                              text-ink-400 mb-2">
                Suggested adjacent segments
              </div>
              <div className="flex flex-wrap gap-1.5">
                {d.aiSidekick.suggestedSegments.map(seg => (
                  <button
                    key={seg.label}
                    className="chip chip-teal-selected text-xs"
                  >
                    + {seg.label}
                    <span className="font-mono opacity-70 ml-1">
                      +{seg.addCount.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Best match */}
            <div className="p-3 bg-white border border-ink-200 rounded-lg">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-ink-900">
                  Most similar prior campaign
                </span>
                <div className="flex items-center gap-1 font-mono text-xs
                                text-ink-600">
                  Match
                  <MatchBar score={d.aiSidekick.bestMatch.matchScore} />
                  {d.aiSidekick.bestMatch.matchScore}%
                </div>
              </div>
              <div className="text-sm font-medium text-ink-800 mb-1">
                {d.aiSidekick.bestMatch.name}
              </div>
              <div className="text-xs text-ink-500">
                Targeted 2-4 prior preventive failures.{' '}
                <span className="font-mono text-ok-700">
                  {d.aiSidekick.bestMatch.lift}
                </span>
                , infusion referrals{' '}
                <span className="font-mono text-ok-700">
                  {d.aiSidekick.bestMatch.infusionReferrals}
                </span>
              </div>
            </div>

            {/* Heads up */}
            <div className="p-3 bg-brand-50 border border-brand-100 rounded-lg">
              <div className="flex items-center gap-1.5 mb-1">
                <AlertCircle size={12} className="text-brand-700" />
                <span className="text-xs font-semibold text-brand-800">
                  Heads up
                </span>
              </div>
              <p className="text-xs text-brand-800 leading-relaxed">
                {d.aiSidekick.headsUp}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

/* ── Match bar ── */
function MatchBar({ score }) {
  const filled = Math.round((score / 100) * 5)
  return (
    <div className="flex gap-0.5 mx-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`w-1 h-2.5 rounded-sm ${
            i < filled ? 'bg-ok-600' : 'bg-ink-200'
          }`}
        />
      ))}
    </div>
  )
}