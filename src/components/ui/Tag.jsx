const TAG_STYLES = {
  default: 'bg-ink-100    text-ink-700',
  ok:      'bg-ok-50      text-ok-700',
  warn:    'bg-warn-50    text-warn-700',
  risk:    'bg-risk-50    text-risk-700',
  info:    'bg-brand-50   text-brand-700',
  teal:    'bg-teal-50    text-teal-900',
  brand:   'bg-brand-50   text-brand-700',
  purple:  'bg-purple-50  text-purple-700',
  gs:      'bg-lane-gs    text-lane-gsInk',
  ke:      'bg-lane-ke    text-lane-keInk',
  user:    'bg-lane-user  text-lane-userInk',
}

export default function Tag({
  children,
  type    = 'default',
  dot     = true,
  size    = 'sm',
  className = '',
}) {
  const colorClass = TAG_STYLES[type] ?? TAG_STYLES.default
  const sizeClass  = size === 'xs' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5'

  return (
    <span className={`
      inline-flex items-center gap-1.5 rounded-full font-medium
      ${colorClass}
      ${sizeClass}
      ${className}
    `}>
      {dot && (
        <span className="w-1 h-1 rounded-full bg-current flex-shrink-0" />
      )}
      {children}
    </span>
  )
}