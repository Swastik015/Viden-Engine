const STYLES = {
  ke: {
    wrapper: 'bg-teal-50 border-teal-100 text-teal-900',
    dot:     'bg-teal-600',
  },
  gs: {
    wrapper: 'bg-lane-gs border-lane-gs text-lane-gsInk',
    dot:     'bg-lane-gsInk',
  },
  default: {
    wrapper: 'bg-teal-50 border-teal-100 text-teal-900',
    dot:     'bg-teal-600',
  },
}

export default function AiPip({ children, type = 'default', className = '' }) {
  const s = STYLES[type] ?? STYLES.default

  return (
    <span className={`
      inline-flex items-center gap-1.5
      px-2 py-0.5 rounded-full
      border text-[10px] font-semibold tracking-wide
      whitespace-nowrap
      ${s.wrapper}
      ${className}
    `}>
      <span className={`w-1 h-1 rounded-full flex-shrink-0 ${s.dot}`} />
      {children}
    </span>
  )
}