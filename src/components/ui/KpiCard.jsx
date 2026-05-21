const TYPE_STYLES = {
  default: {
    wrapper: 'bg-white border-ink-200',
    label:   'text-ink-500',
    value:   'text-ink-900',
    delta:   'text-ink-500',
  },
  ok: {
    wrapper: 'bg-ok-50 border-ok-100',
    label:   'text-ok-700',
    value:   'text-ok-700',
    delta:   'text-ok-600',
  },
  warn: {
    wrapper: 'bg-warn-50 border-warn-100',
    label:   'text-warn-700',
    value:   'text-warn-700',
    delta:   'text-warn-600',
  },
  risk: {
    wrapper: 'bg-risk-50 border-risk-100',
    label:   'text-risk-700',
    value:   'text-risk-700',
    delta:   'text-risk-600',
  },
  brand: {
    wrapper: 'bg-brand-50 border-brand-100',
    label:   'text-brand-700',
    value:   'text-brand-800',
    delta:   'text-brand-600',
  },
}

export default function KpiCard({
  label,
  value,
  unit   = '',
  delta  = '',
  sub    = '',
  type   = 'default',
  className = '',
}) {
  const styles = TYPE_STYLES[type] ?? TYPE_STYLES.default

  return (
    <div className={`
      ${styles.wrapper}
      border rounded-md p-4 shadow-xs
      ${className}
    `}>
      {/* Label */}
      <div className={`
        text-[10px] font-semibold uppercase tracking-wider mb-2
        ${styles.label}
      `}>
        {label}
      </div>

      {/* Value */}
      <div className={`
        font-display text-3xl font-medium tracking-tight leading-none
        ${styles.value}
      `}>
        {value}
        {unit && (
          <span className="text-sm font-sans font-normal ml-1 opacity-60">
            {unit}
          </span>
        )}
      </div>

      {/* Delta */}
      {delta && (
        <div className={`mt-1.5 font-mono text-xs ${styles.delta}`}>
          {delta}
        </div>
      )}

      {/* Sub text */}
      {sub && !delta && (
        <div className={`mt-1.5 text-xs ${styles.delta}`}>
          {sub}
        </div>
      )}
    </div>
  )
}