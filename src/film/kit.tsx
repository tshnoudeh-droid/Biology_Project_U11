import type { ReactNode } from 'react'

/* ---------- timing helpers ---------- */
export const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
export const ease = (v: number) => {
  const t = clamp01(v)
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}
/** 0→1 between seconds a and b (eased) */
export const ramp = (t: number, a: number, b: number) => ease((t - a) / (b - a))
/** 0→1→0: rises a→b, holds, falls c→d */
export const window4 = (t: number, a: number, b: number, c: number, d: number) => Math.min(ramp(t, a, b), 1 - ramp(t, c, d))
export const mix = (a: number, b: number, k: number) => a + (b - a) * k

/* ---------- path following ---------- */
export type Pt = [number, number]
export function along(pts: Pt[], f: number): Pt {
  const lens = [0]
  for (let i = 1; i < pts.length; i++) lens.push(lens[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]))
  const total = lens[lens.length - 1]
  const d = clamp01(f) * total
  let i = 1
  while (i < lens.length - 1 && lens[i] < d) i++
  const k = (d - lens[i - 1]) / (lens[i] - lens[i - 1] || 1)
  return [mix(pts[i - 1][0], pts[i][0], k), mix(pts[i - 1][1], pts[i][1], k)]
}

/* ---------- guests ---------- */
export function O2({ x, y, s = 1, label = false }: { x: number; y: number; s?: number; label?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="-10" cy="0" r="15" fill="#E3735E" stroke="#FBFCFB" strokeWidth="2.5" />
      <circle cx="10" cy="0" r="15" fill="#E3735E" stroke="#FBFCFB" strokeWidth="2.5" />
      <circle cx="-5" cy="-3" r="2.4" fill="#1B2A26" />
      <circle cx="5" cy="-3" r="2.4" fill="#1B2A26" />
      <path d="M-4 4 Q0 8 4 4" stroke="#1B2A26" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {label && (
        <text y="36" textAnchor="middle" className="film-tag">
          O₂
        </text>
      )}
    </g>
  )
}

export function CO2({ x, y, s = 1, label = false }: { x: number; y: number; s?: number; label?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="-22" cy="0" r="12" fill="#8FB3A6" stroke="#FBFCFB" strokeWidth="2" />
      <circle cx="22" cy="0" r="12" fill="#8FB3A6" stroke="#FBFCFB" strokeWidth="2" />
      <circle cx="0" cy="0" r="15" fill="#4E6A62" stroke="#FBFCFB" strokeWidth="2.5" />
      <circle cx="-5" cy="-3" r="2.4" fill="#FBFCFB" />
      <circle cx="5" cy="-3" r="2.4" fill="#FBFCFB" />
      <path d="M-4 4 Q0 8 4 4" stroke="#FBFCFB" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {label && (
        <text y="36" textAnchor="middle" className="film-tag">
          CO₂
        </text>
      )}
    </g>
  )
}

type StreamProps = {
  pts: Pt[]
  t: number
  start?: number
  travel: number
  count: number
  gap: number
  kind?: 'O2' | 'CO2'
  s?: number
  /** keep guests visible at the end of the path */
  hold?: boolean
  /** small sideways spread so a crowd doesn't look like a single file */
  spread?: number
}

/** A line of guests walking along a path. */
export function Stream({ pts, t, start = 0, travel, count, gap, kind = 'O2', s = 1, hold = false, spread = 10 }: StreamProps) {
  const out: ReactNode[] = []
  for (let i = 0; i < count; i++) {
    const f = (t - start - i * gap) / travel
    if (f < 0) continue
    if (f > 1 && !hold) continue
    const [x, y] = along(pts, Math.min(1, f))
    const bob = f < 1 ? Math.sin(t * 9 + i * 1.7) * 3 : 0
    const off = (((i * 37) % 7) - 3) * (spread / 3)
    out.push(kind === 'O2' ? <O2 key={i} x={x + off * 0.4} y={y + off + bob} s={s} /> : <CO2 key={i} x={x + off * 0.4} y={y + off + bob} s={s} />)
  }
  return <g>{out}</g>
}

/* ---------- signage: real term first (bold), resort name second ---------- */
type SignProps = {
  x: number
  y: number
  term: string
  resort?: string
  note?: string
  show?: boolean
  anchor?: 'start' | 'middle' | 'end'
  /** optional pointer line from the sign to a spot */
  to?: Pt
}

export function Sign({ x, y, term, resort, note, show = true, anchor = 'start', to }: SignProps) {
  const w = Math.max(term.length * 11.6, (resort?.length ?? 0) * 9.6, (note?.length ?? 0) * 7.6) + 44
  const h = 30 + (resort ? 26 : 0) + (note ? 22 : 0) + 14
  const x0 = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x
  return (
    <g className="film-sign" style={{ opacity: show ? 1 : 0 }}>
      {to && <path d={`M${x0 + w / 2} ${y + h / 2} L${to[0]} ${to[1]}`} stroke="#F4D5CC" strokeWidth="2" strokeDasharray="4 5" fill="none" />}
      {to && <circle cx={to[0]} cy={to[1]} r="5" fill="#F4D5CC" />}
      <rect x={x0} y={y} width={w} height={h} rx="14" fill="#FBFCFB" />
      <rect x={x0} y={y} width="7" height={h} rx="3.5" fill="#E3735E" />
      <text x={x0 + 22} y={y + 30} className="film-sign__term">
        {term}
      </text>
      {resort && (
        <text x={x0 + 22} y={y + 56} className="film-sign__resort">
          {resort}
        </text>
      )}
      {note && (
        <text x={x0 + 22} y={y + (resort ? 79 : 53)} className="film-sign__note">
          {note}
        </text>
      )}
    </g>
  )
}

/** Simple staff character (type II cell masseuse, concierge, guards). */
export function Staff({ x, y, s = 1, body = '#F4D5CC', accent = '#E3735E', children }: { x: number; y: number; s?: number; body?: string; accent?: string; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-26 60 C-26 20 -18 6 0 6 C18 6 26 20 26 60 Z" fill={body} stroke="#1B2A26" strokeWidth="2" />
      <path d="M-14 30 L14 30 L10 58 L-10 58 Z" fill={accent} />
      <circle cx="0" cy="-12" r="17" fill={body} stroke="#1B2A26" strokeWidth="2" />
      <circle cx="-6" cy="-14" r="2.4" fill="#1B2A26" />
      <circle cx="6" cy="-14" r="2.4" fill="#1B2A26" />
      <path d="M-5 -5 Q0 -1 5 -5" stroke="#1B2A26" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {children}
    </g>
  )
}
