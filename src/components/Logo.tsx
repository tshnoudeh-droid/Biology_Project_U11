type LogoMarkProps = {
  /** 'dark' = for dark backgrounds (blush stems); 'light' = for light backgrounds (eucalyptus stems) */
  tone?: 'dark' | 'light'
  className?: string
  title?: string
}

export function LogoMark({ tone = 'dark', className, title = 'Alvea logo' }: LogoMarkProps) {
  const soft = tone === 'dark' ? '#F4D5CC' : '#2F5D50'
  return (
    <svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label={title}>
      <path d="M60 136 C60 112 56 96 60 74" fill="none" stroke={soft} strokeWidth="4" strokeLinecap="round" />
      <path d="M60 92 C50 86 42 80 38 70" fill="none" stroke={soft} strokeWidth="3" strokeLinecap="round" />
      <path d="M60 92 C70 86 78 80 82 70" fill="none" stroke={soft} strokeWidth="3" strokeLinecap="round" />
      <circle cx="60" cy="52" r="15" fill="#E3735E" />
      <circle cx="40" cy="42" r="12" fill={soft} />
      <circle cx="80" cy="42" r="12" fill={soft} />
      <circle cx="47" cy="22" r="10" fill="#E3735E" />
      <circle cx="73" cy="22" r="10" fill="#E3735E" />
      <circle cx="60" cy="8" r="7" fill={soft} />
      <circle cx="34" cy="64" r="8" fill="#E3735E" />
      <circle cx="86" cy="64" r="8" fill="#E3735E" />
    </svg>
  )
}

type LockupProps = {
  tone?: 'dark' | 'light'
  size?: 'sm' | 'lg'
  stacked?: boolean
}

export function LogoLockup({ tone = 'dark', size = 'sm', stacked = false }: LockupProps) {
  return (
    <span className={`lockup lockup--${tone} lockup--${size}${stacked ? ' lockup--stacked' : ''}`}>
      <LogoMark tone={tone} className="lockup__mark" title="" />
      <span className="lockup__words">
        <span className="lockup__name">Alvea</span>
        <span className="lockup__sub">Wellness Retreat</span>
      </span>
    </span>
  )
}
