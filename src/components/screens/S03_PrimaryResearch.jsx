import { useState } from 'react'
import { ChevronRight, Send, Bot, User, CheckSquare, Square, FileCheck, X, MessageCircle } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import AiPip from '../ui/AiPip.jsx'
import Tag   from '../ui/Tag.jsx'

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    text: 'I have pulled 412 evidence units relevant to your Vyepti Onset of Action campaign. What would you like to explore? You can ask me about KOL sentiment, competitive landscape, HCP unmet needs, or specific trial data.',
  },
]

const SUGGESTED_QUESTIONS = [
  'What are KOLs saying about Day 1 onset?',
  'How does Vyepti compare to oral CGRPs in prior failure patients?',
  'What is the biggest barrier for PCPs?',
  'Summarise the DELIVER trial findings',
]

export default function S03_PrimaryResearch() {
  const { data, advance, getFilteredResearch, selectedTheme } = useApp()
  const d = getFilteredResearch()

  const [activeFilter,  setActiveFilter]  = useState('All')
  const [messages,      setMessages]      = useState(INITIAL_MESSAGES)
  const [inputText,     setInputText]     = useState('')
  const [isTyping,      setIsTyping]      = useState(false)
  const [selectedItems, setSelectedItems] = useState(new Set())
  const [submitted,     setSubmitted]     = useState(false)
  const [chatOpen,      setChatOpen]      = useState(false)

  const FILTER_TABS = ['All', 'KOL Interviews', 'HCP Survey', 'Social Signal', 'Competitive']

  function toggleSelect(id) {
    setSelectedItems(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function handleSend(text) {
    const msg = text || inputText
    if (!msg.trim()) return
    setMessages(prev => [...prev, { role: 'user', text: msg }])
    setInputText('')
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, { role: 'assistant', text: getAutoReply(msg) }])
    }, 1200)
  }

  function handleRequestApproval() {
    setSubmitted(true)
  }

  const showKol         = activeFilter === 'All' || activeFilter === 'KOL Interviews'
  const showSurvey      = activeFilter === 'All' || activeFilter === 'HCP Survey'
  const showSocial      = activeFilter === 'All' || activeFilter === 'Social Signal'
  const showCompetitive = activeFilter === 'All' || activeFilter === 'Competitive'

  return (
    <div className="relative">

      {/* ── Screen header ── */}
      <div className="screen-head">
        <div>
          <div className="screen-eyebrow">
            <span className="actor-tag-ke">Knowledge Engine</span>
            <span>Step 03 · Discover</span>
          </div>
          <h1 className="screen-title">Primary market research</h1>
          <p className="screen-subtitle">
            Synthesised from {d.evidenceUnits} evidence units across KOL
            interviews, HCP surveys, social signals and competitive data.
            Select findings to request claim approval.
          </p>
        </div>
        <div className="screen-actions">
          {selectedItems.size > 0 && !submitted && (
            <button
              className="btn-teal btn"
              onClick={handleRequestApproval}
            >
              <FileCheck size={14} />
              Request claim approval · {selectedItems.size} selected
            </button>
          )}
          {submitted && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                            bg-ok-50 border border-ok-200">
              <div className="w-2 h-2 rounded-full bg-ok-600" />
              <span className="text-xs font-semibold text-ok-700">
                {selectedItems.size} findings submitted for MLR review
              </span>
            </div>
          )}
          <button className="btn-primary btn" onClick={advance}>
            Next · Align audience
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* ── Campaign config banner (carried from S01) ── */}
      <div
        className="card card-pad mb-5"
        style={{ background: '#F8F8FF', borderColor: '#C7D2FE' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest
                           text-brand-700">
            Campaign config · carried from Step 01
          </span>
        </div>
        <div className="flex items-center gap-6 flex-wrap">
          {[
            { label: 'Brand',      value: data.campaign.brand              },
            { label: 'Objective',  value: 'HCP education and awareness'    },
            { label: 'Audience',   value: 'Neurologists · Headache · PCPs' },
            { label: 'Geography',  value: data.campaign.geography          },
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

      {/* ── Filter tabs ── */}
      <div className="flex items-center gap-1 mb-5 p-1 bg-ink-100
                      rounded-lg w-fit">
        {FILTER_TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`
              px-3 py-1.5 rounded-md text-xs font-semibold transition-all
              duration-150
              ${activeFilter === tab
                ? 'bg-white text-ink-900 shadow-xs'
                : 'text-ink-500 hover:text-ink-700'
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Synthesis banner ── */}
      <div
        className="card card-pad mb-6"
        style={{ background: '#F8F6FF', borderColor: '#E9D5FF' }}
      >
        <div className="flex items-center gap-2 mb-1">
          <AiPip type="ke">KE · Synthesis</AiPip>
          <span className="font-mono text-xs text-ink-400">
            Confidence {d.synthesisConfidence}% · {d.evidenceUnits} units
          </span>
        </div>
        <p className="text-sm text-ink-800 leading-relaxed">{d.synthesis}</p>
      </div>

      {/* ── Research findings ── */}
      <div className="space-y-6">

        {/* KOL Interviews */}
        {showKol && (
          <Section
            title="KOL interviews"
            meta={`${d.kolInterviews.length} interviews · T1 and T2`}
          >
            <div className="space-y-3">
              {d.kolInterviews.map((kol, i) => {
                const itemId    = `kol-${i}`
                const isSelected = selectedItems.has(itemId)
                return (
                  <div
                    key={i}
                    onClick={() => toggleSelect(itemId)}
                    className={`
                      card card-pad cursor-pointer transition-all duration-150
                      ${isSelected
                        ? 'border-brand-400 bg-brand-50'
                        : 'hover:border-ink-300'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {isSelected
                          ? <CheckSquare size={16} className="text-brand-700" />
                          : <Square      size={16} className="text-ink-300"   />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Tag type="info" dot={false} size="xs">{kol.tier}</Tag>
                          <span className="text-xs font-semibold text-ink-900">
                            {kol.name}
                          </span>
                          <span className="text-xs text-ink-400">{kol.org}</span>
                        </div>
                        <p className="text-sm text-ink-800 italic leading-relaxed mb-2">
                          "{kol.quote}"
                        </p>
                        <div className="flex gap-1.5 flex-wrap">
                          {kol.themes.map(t => (
                            <span
                              key={t}
                              className="text-[10px] px-2 py-0.5 bg-ink-100
                                         text-ink-600 rounded-full font-medium"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Section>
        )}

        {/* HCP Survey */}
        {showSurvey && (
          <Section
            title="HCP survey"
            meta={`n=${d.hcpSurvey.n} · fielded ${d.hcpSurvey.fielded}`}
          >
            <div className="card card-pad">
              <div className="text-xs font-semibold text-ink-700 mb-3">
                Top unmet needs
              </div>
              <div className="space-y-3 mb-4">
                {d.hcpSurvey.topUnmetNeeds.map(need => (
                  <div key={need.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-ink-800">{need.label}</span>
                      <span className="font-mono text-sm font-semibold text-ink-900">
                        {need.pct}%
                      </span>
                    </div>
                    <div className="h-2 bg-ink-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${need.pct}%`,
                          background:
                            need.color === 'teal'  ? '#0E7490' :
                            need.color === 'brand' ? '#4338CA' : '#777E94',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div
                onClick={() => toggleSelect('survey-awareness')}
                className={`
                  card card-pad cursor-pointer transition-all duration-150
                  ${selectedItems.has('survey-awareness')
                    ? 'border-brand-400 bg-brand-50'
                    : 'hover:border-ink-300'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {selectedItems.has('survey-awareness')
                      ? <CheckSquare size={16} className="text-brand-700" />
                      : <Square      size={16} className="text-ink-300"   />
                    }
                  </div>
                  <div>
                    <p className="text-sm text-ink-800 font-medium mb-0.5">
                      Only {d.hcpSurvey.awarenessOfOnset}% of surveyed HCPs
                      are aware of Vyepti's Day 1 onset of effect
                    </p>
                    <p className="text-xs text-ink-400">
                      Significant education gap — potential claim territory
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        )}

        {/* Social Signal */}
        {showSocial && (
          <Section title="Social signal" meta="Twitter/X · AHS · Sermo">
            <div className="space-y-3">
              {d.socialSignal.map((sig, i) => {
                const itemId    = `social-${i}`
                const isSelected = selectedItems.has(itemId)
                return (
                  <div
                    key={i}
                    onClick={() => toggleSelect(itemId)}
                    className={`
                      card card-pad cursor-pointer transition-all duration-150
                      ${isSelected
                        ? 'border-brand-400 bg-brand-50'
                        : 'hover:border-ink-300'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {isSelected
                          ? <CheckSquare size={16} className="text-brand-700" />
                          : <Square      size={16} className="text-ink-300"   />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xs font-semibold text-ink-700">
                            {sig.source}
                          </span>
                          <Tag
                            type={
                              sig.trendType === 'ok'   ? 'ok'   :
                              sig.trendType === 'warn' ? 'warn' : 'info'
                            }
                            dot={false}
                            size="xs"
                          >
                            {sig.trend}
                          </Tag>
                        </div>
                        <p className="text-sm text-ink-700 leading-relaxed">
                          {sig.insight}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Section>
        )}

        {/* Competitive */}
        {showCompetitive && (
          <Section
            title="Competitive landscape"
            meta="CGRP class · US market share"
          >
            <div className="card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-100 bg-ink-50">
                    {['Brand', 'Generic', 'Share', 'Trend'].map(h => (
                      <th
                        key={h}
                        className="px-4 py-2.5 text-left text-[10px] font-bold
                                   uppercase tracking-wider text-ink-500"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {d.competitive.map(row => (
                    <tr
                      key={row.brand}
                      className={row.highlight ? 'bg-brand-50' : 'hover:bg-ink-50'}
                    >
                      <td className="px-4 py-3 font-semibold text-ink-900">
                        {row.brand}
                        {row.highlight && (
                          <span className="ml-2 text-[9px] font-bold text-brand-700
                                           bg-brand-100 px-1.5 py-0.5 rounded-full
                                           uppercase tracking-wide">
                            Us
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-ink-500 font-mono text-xs">
                        {row.generic}
                      </td>
                      <td className="px-4 py-3 font-mono font-semibold text-ink-900">
                        {row.share}%
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-mono text-xs font-semibold ${
                          row.trend > 0 ? 'text-ok-700'   :
                          row.trend < 0 ? 'text-risk-700' : 'text-ink-400'
                        }`}>
                          {row.trend > 0 ? '+' : ''}{row.trend}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* Selected items summary */}
        {selectedItems.size > 0 && (
          <div
            className="card card-pad"
            style={{
              background:   submitted ? '#ECFDF5' : '#EEF2FF',
              borderColor:  submitted ? '#D1FAE5' : '#C7D2FE',
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-ink-900">
                {submitted
                  ? 'Submitted for MLR review'
                  : 'Selected for claim approval'
                }
              </span>
              <span
                className="font-mono text-xs font-semibold"
                style={{ color: submitted ? '#047857' : '#4338CA' }}
              >
                {selectedItems.size} items
              </span>
            </div>
            <p className="text-xs text-ink-500 mb-2">
              {submitted
                ? 'These findings have been sent to MLR for statistical significance review.'
                : 'These findings will be checked for statistical significance and sent to MLR if sufficient evidence exists.'
              }
            </p>
            {!submitted && (
              <button
                onClick={handleRequestApproval}
                className="btn-primary btn btn-sm"
              >
                <FileCheck size={12} />
                Request claim approval
              </button>
            )}
          </div>
        )}

      </div>

      {/* ── Floating chat button ── */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full
                     flex items-center justify-center shadow-lg
                     transition-all duration-200 hover:scale-110 z-50"
          style={{ background: 'linear-gradient(135deg, #1E1B4B, #2D2A6E)' }}
        >
          <MessageCircle size={22} className="text-teal-400" />
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full
                       bg-teal-500 flex items-center justify-center
                       text-[9px] font-bold text-white"
          >
            KE
          </span>
        </button>
      )}

      {/* ── Floating chat panel ── */}
      {chatOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 flex flex-col
                     rounded-2xl overflow-hidden shadow-lg"
          style={{ width: 380, height: 560 }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center gap-3 flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #1E1B4B, #2D2A6E)' }}
          >
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center
                            justify-center flex-shrink-0">
              <Bot size={15} className="text-teal-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white">
                Research assistant
              </div>
              <div className="text-[10px] text-white/60">
                KE · {d.evidenceUnits} evidence units loaded
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400
                                animate-pulse" />
                <span className="text-[10px] text-teal-400 font-semibold">
                  Live
                </span>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="w-6 h-6 rounded-full bg-white/10 flex items-center
                           justify-center hover:bg-white/20 transition-colors"
              >
                <X size={12} className="text-white" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin"
            style={{ background: '#ffffff' }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-brand-100
                                  flex items-center justify-center
                                  flex-shrink-0 mt-0.5">
                    <Bot size={12} className="text-brand-700" />
                  </div>
                )}
                <div
                  className={`
                    max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed
                    ${msg.role === 'user'
                      ? 'bg-brand-800 text-white rounded-tr-none'
                      : 'bg-ink-50  text-ink-800 rounded-tl-none'
                    }
                  `}
                >
                  {msg.text}
                </div>
                {msg.role === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-brand-800
                                  flex items-center justify-center
                                  flex-shrink-0 mt-0.5">
                    <User size={12} className="text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 rounded-full bg-brand-100
                                flex items-center justify-center flex-shrink-0">
                  <Bot size={12} className="text-brand-700" />
                </div>
                <div className="bg-ink-50 rounded-2xl rounded-tl-none px-3 py-2">
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-ink-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggested questions */}
          {messages.length <= 2 && (
            <div
              className="px-4 pt-2 pb-1"
              style={{ background: '#ffffff' }}
            >
              <div className="text-[10px] font-semibold uppercase tracking-wider
                              text-ink-400 mb-1.5">
                Suggested
              </div>
              <div className="flex flex-col gap-1">
                {SUGGESTED_QUESTIONS.map(q => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-left text-xs px-3 py-1.5 rounded-lg
                               bg-ink-50 text-ink-700 hover:bg-brand-50
                               hover:text-brand-800 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div
            className="p-3 border-t border-ink-100 flex-shrink-0"
            style={{ background: '#ffffff' }}
          >
            <div className="flex gap-2">
              <input
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask about KOLs, evidence, competitors..."
                className="flex-1 px-3 py-2 text-xs bg-ink-50 border
                           border-ink-200 rounded-xl text-ink-900
                           focus:outline-none focus:border-brand-400
                           transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputText.trim()}
                className="w-8 h-8 flex items-center justify-center
                           rounded-xl bg-brand-800 text-white
                           disabled:opacity-40 disabled:cursor-not-allowed
                           hover:opacity-90 transition-opacity flex-shrink-0"
              >
                <Send size={13} />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

/* ── Section wrapper ── */
function Section({ title, meta, children }) {
  return (
    <div>
      <div className="sec-head">
        <span className="sec-head-title">{title}</span>
        <span className="sec-head-meta">{meta}</span>
      </div>
      {children}
    </div>
  )
}

/* ── Auto reply ── */
function getAutoReply(question) {
  const q = question.toLowerCase()
  if (q.includes('day 1') || q.includes('onset')) {
    return 'KOL interviews strongly validate the Day 1 onset story. Dr. R.B. described it as giving patients something that feels different, while Dr. M.S. framed it as a clinical reset. This aligns with PROMISE-1 data showing preventive effect within 24 hours — a unique differentiator vs oral CGRPs which typically take 4-12 weeks.'
  }
  if (q.includes('prior fail') || q.includes('deliver')) {
    return 'The DELIVER trial is your strongest asset in the prior-failure space. It specifically enrolled patients with 2-4 prior preventive failures. Dr. M.S. explicitly mentioned this as a clinical reset framing. Recommend pairing DELIVER data with real-world patient case formats for maximum HCP resonance.'
  }
  if (q.includes('pcp') || q.includes('barrier') || q.includes('infusion')) {
    return 'The #1 PCP barrier is not efficacy — it is access. Dr. J.P. said the biggest blocker is logistics: where do I send them? Our survey confirms 42% of PCPs are unaware of in-office infusion options. Recommendation: pair every PCP-facing asset with territory-specific infusion site mapping.'
  }
  if (q.includes('compare') || q.includes('oral') || q.includes('cgrp')) {
    return 'Vyepti holds 14.2% market share with a +0.8 trend vs declining Aimovig and flat Ajovy. The key competitive angle is modality differentiation — IV vs subcutaneous vs oral. Social signal data shows +34% MoM spike in HCP discussions about preventive failure fatigue, which directly sets up the Vyepti switch narrative.'
  }
  return 'Based on the evidence base loaded for this campaign, I see strong signals around onset-of-action differentiation and prior-failure positioning. Would you like me to dive deeper into KOL sentiment, trial data, competitive dynamics, or the PCP access barrier?'
}