import { createContext, useContext, type ReactNode } from 'react'

/* ---------- camera (set by the player per caption beat) ---------- */
export type Cam = { cx: number; cy: number; z: number }
export const CamContext = createContext<Cam>({ cx: 800, cy: 450, z: 1 })
export const toScreen = (c: Cam, p: [number, number]): [number, number] => [(p[0] - c.cx) * c.z + 800, (p[1] - c.cy) * c.z + 450]

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
  /** perspective: scale multiplier for a given y */
  scaleAt?: (y: number) => number
  /** guests carry suitcases */
  bag?: boolean
  /** highlight the first guest as the one to follow */
  hero?: boolean
}

/** A line of guests walking along a path. */
export function Stream({ pts, t, start = 0, travel, count, gap, kind = 'O2', s = 1, hold = false, spread = 10, scaleAt, bag = false, hero = false }: StreamProps) {
  const out: ReactNode[] = []
  for (let i = 0; i < count; i++) {
    const f = (t - start - i * gap) / travel
    if (f < 0) continue
    if (f > 1 && !hold) continue
    const [x, y] = along(pts, Math.min(1, f))
    const bob = f < 1 ? Math.sin(t * 9 + i * 1.7) * 3 : 0
    const off = (((i * 37) % 7) - 3) * (spread / 3)
    const k = s * (scaleAt ? scaleAt(y) : 1)
    const gx = x + off * 0.4 * k
    const gy = y + (off + bob) * k
    out.push(
      <g key={i}>
        {bag && (
          <g transform={`translate(${gx + (kind === 'O2' ? 30 : 40) * k} ${gy + 10 * k}) scale(${k})`}>
            <rect x="-10" y="-14" width="20" height="26" rx="4" fill={kind === 'O2' ? '#D9B676' : '#C9D6CF'} stroke="#1B2A26" strokeWidth="1.5" />
            <path d="M-5 -14 L-5 -20 L5 -20 L5 -14" stroke="#1B2A26" strokeWidth="2" fill="none" />
          </g>
        )}
        {hero && i === 0 && (
          <g transform={`translate(${gx} ${gy}) scale(${k})`}>
            <circle r={kind === 'O2' ? 34 : 42} fill="none" stroke={kind === 'O2' ? '#E3735E' : '#8FB3A6'} strokeWidth="3" strokeDasharray="5 6" className="film-hero-ring" />
            <circle r={kind === 'O2' ? 40 : 48} fill={kind === 'O2' ? '#E3735E' : '#8FB3A6'} opacity="0.16" />
          </g>
        )}
        {kind === 'O2' ? <O2 x={gx} y={gy} s={k} /> : <CO2 x={gx} y={gy} s={k} />}
      </g>,
    )
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
  /** explicit visibility (otherwise derived from at/t) */
  show?: boolean
  /** scene time when the note pops up */
  at?: number
  t?: number
  anchor?: 'start' | 'middle' | 'end'
  /** optional pointer from the note to a spot in the scene */
  to?: Pt
}

/**
 * Pop-up note: real term first (bold), resort name second, optional detail.
 * Drawn in screen space (not zoomed by the camera) so it stays crisp and on-screen;
 * the pointer still lands on the right spot in the zoomed scene.
 */
export function Sign({ x, y, term, resort, note, show, at, t, anchor = 'start', to }: SignProps) {
  const cam = useContext(CamContext)
  const visible = show ?? (at === undefined || t === undefined ? true : t >= at)
  const fresh = at !== undefined && t !== undefined && t >= at && t - at < 3
  const w = Math.max(term.length * 11.6, (resort?.length ?? 0) * 9.6, (note?.length ?? 0) * 7.6) + 44
  const h = 30 + (resort ? 26 : 0) + (note ? 22 : 0) + 14
  const x0 = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x
  const tp = to ? toScreen(cam, to) : undefined
  // anchor the pointer on the nearest edge of the note
  const sx = tp ? Math.max(x0, Math.min(x0 + w, tp[0])) : 0
  const sy = tp ? (tp[1] > y + h ? y + h : tp[1] < y ? y : y + h / 2) : 0
  return (
    <g transform={`translate(${cam.cx} ${cam.cy}) scale(${1 / cam.z}) translate(-800 -450)`}>
      <g className={`film-sign${visible ? ' is-on' : ''}${fresh ? ' is-fresh' : ''}`}>
        {tp && <path d={`M${sx} ${sy} L${tp[0]} ${tp[1]}`} stroke="#F4D5CC" strokeWidth="2" strokeDasharray="4 5" fill="none" />}
        {tp && <circle cx={tp[0]} cy={tp[1]} r="6" fill="#F4D5CC" className="film-sign__dot" />}
        <rect x={x0} y={y} width={w} height={h} rx="14" fill="#FBFCFB" className="film-sign__bg" />
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
    </g>
  )
}

/** Animated airflow streaks along a path (shows which way air is moving). */
export function Flow({ pts, t, speed = 60, color = '#F3EDE4', width = 3, opacity = 0.45 }: { pts: Pt[]; t: number; speed?: number; color?: string; width?: number; opacity?: number }) {
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ')
  return <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 22" strokeDashoffset={-t * speed} opacity={opacity} />
}

/** Little humidity sparkles (warm, moist air). */
export function Sparkles({ x, y, t, n = 5, spread = 60, color = '#CFE3EE' }: { x: number; y: number; t: number; n?: number; spread?: number; color?: string }) {
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const k = (t * 0.7 + i / n) % 1
        return <path key={i} d={`M${x + ((i * 37) % spread) - spread / 2} ${y - k * 40} q4 6 0 10 q-4 -4 0 -10`} fill={color} opacity={0.8 * (1 - k)} />
      })}
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
