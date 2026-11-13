/**
 * Interior-design kit for the tour film: perspective rooms, materials and furniture.
 * Stage is 1600×900. All rooms use one-point perspective toward the back wall.
 */
import type { ReactNode } from 'react'
import { mix, clamp01, type Pt } from './kit'

export const M = {
  wallA: '#2B4A42',
  wallB: '#1F352F',
  panel: '#33554C',
  wood: '#8E6F5C',
  woodDark: '#6E5444',
  woodLight: '#A88671',
  marble: '#E7E2DA',
  marbleVein: '#CBC3B8',
  brass: '#D9B676',
  brassDark: '#A9864C',
  velvet: '#B84A35',
  blush: '#F4D5CC',
  coral: '#E3735E',
  cream: '#F3EDE4',
  glow: '#FFE2B0',
  leaf: '#8FB3A6',
  leafDark: '#5E8679',
  ink: '#1B2A26',
}

/** Shared gradients. Rendered once at the root of the stage svg. */
export function InteriorDefs() {
  return (
    <defs>
      <linearGradient id="g-wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2F5248" />
        <stop offset="1" stopColor="#213A33" />
      </linearGradient>
      <linearGradient id="g-wall-side" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#1A2D28" />
        <stop offset="1" stopColor="#27443C" />
      </linearGradient>
      <linearGradient id="g-wall-side-r" x1="1" y1="0" x2="0" y2="0">
        <stop offset="0" stopColor="#1A2D28" />
        <stop offset="1" stopColor="#27443C" />
      </linearGradient>
      <linearGradient id="g-ceiling" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#14221F" />
        <stop offset="1" stopColor="#22392F" />
      </linearGradient>
      <linearGradient id="g-wood" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7A5E4D" />
        <stop offset="1" stopColor="#A2806A" />
      </linearGradient>
      <linearGradient id="g-marble" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#C9C2B8" />
        <stop offset="1" stopColor="#EFEBE4" />
      </linearGradient>
      <linearGradient id="g-carpet" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8F3B2B" />
        <stop offset="1" stopColor="#B84A35" />
      </linearGradient>
      <linearGradient id="g-brass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#EBD29B" />
        <stop offset="0.5" stopColor="#C9A45F" />
        <stop offset="1" stopColor="#A9864C" />
      </linearGradient>
      <radialGradient id="g-glow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#FFE2B0" stopOpacity="0.55" />
        <stop offset="1" stopColor="#FFE2B0" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="g-glow-coral" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#E3735E" stopOpacity="0.5" />
        <stop offset="1" stopColor="#E3735E" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="g-velvet" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#8F3426" />
        <stop offset="0.5" stopColor="#C2553F" />
        <stop offset="1" stopColor="#8F3426" />
      </linearGradient>
      <linearGradient id="g-glass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#C9E3DA" stopOpacity="0.28" />
        <stop offset="1" stopColor="#C9E3DA" stopOpacity="0.08" />
      </linearGradient>
      <linearGradient id="g-night" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0F1A17" />
        <stop offset="1" stopColor="#24403A" />
      </linearGradient>
      <linearGradient id="g-blood" x1="0" x2="1">
        <stop offset="0" stopColor="#7FA7D9" />
        <stop offset="0.45" stopColor="#A98CB0" />
        <stop offset="0.75" stopColor="#E3735E" />
        <stop offset="1" stopColor="#E3735E" />
      </linearGradient>
    </defs>
  )
}

/* ---------------- perspective room ---------------- */
export type Box = { x0: number; y0: number; x1: number; y1: number }
const SW = 1600
const SH = 900

/** point on the floor: u across (0 left → 1 right), d depth (0 back wall → 1 viewer) */
export function floorPt(B: Box, u: number, d: number): Pt {
  const bx = mix(B.x0, B.x1, u)
  const fx = mix(0, SW, u)
  return [mix(bx, fx, d), mix(B.y1, SH, d)]
}
/** scale of an object standing at depth d */
export function depthScale(B: Box, d: number) {
  return mix((B.x1 - B.x0) / SW, 1, clamp01(d))
}
/** depth for a floor y (inverse of floorPt) */
export function depthAtY(B: Box, y: number) {
  return clamp01((y - B.y1) / (SH - B.y1))
}
/** point on a side wall: side -1 left / 1 right, v height (0 top → 1 floor), d depth */
export function wallPt(B: Box, side: -1 | 1, v: number, d: number): Pt {
  const bx = side < 0 ? B.x0 : B.x1
  const fx = side < 0 ? 0 : SW
  return [mix(bx, fx, d), mix(mix(B.y0, B.y1, v), mix(0, SH, v), d)]
}
/** point on the ceiling: u across, d depth */
export function ceilPt(B: Box, u: number, d: number): Pt {
  return [mix(mix(B.x0, B.x1, u), u * SW, d), mix(B.y0, 0, d)]
}
export const P = (pts: Pt[]) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ') + ' Z'

type RoomProps = {
  B: Box
  floor?: 'wood' | 'marble' | 'carpet' | 'stone'
  wainscot?: boolean
  ceilingLights?: number
  backWall?: ReactNode
  hideCeiling?: boolean
  /** exterior: only floor + back content, no walls/ceiling */
  exterior?: boolean
}

/** Room shell: back wall, side walls, ceiling, floor with material pattern. */
export function Room({ B, floor = 'wood', wainscot = true, ceilingLights = 0, backWall, hideCeiling, exterior }: RoomProps) {
  const floorPoly: Pt[] = [[B.x0, B.y1], [B.x1, B.y1], [SW, SH], [0, SH]]
  const leftPoly: Pt[] = [[0, 0], [B.x0, B.y0], [B.x0, B.y1], [0, SH]]
  const rightPoly: Pt[] = [[SW, 0], [SW, SH], [B.x1, B.y1], [B.x1, B.y0]]
  const ceilPoly: Pt[] = [[0, 0], [SW, 0], [B.x1, B.y0], [B.x0, B.y0]]
  const rows = 14
  const lines: ReactNode[] = []
  const fill = floor === 'wood' ? 'url(#g-wood)' : floor === 'marble' ? 'url(#g-marble)' : floor === 'carpet' ? 'url(#g-carpet)' : '#5D6B66'
  if (floor === 'wood') {
    // herringbone-ish boards: converging seams + staggered cross joints
    for (let i = 0; i <= 16; i++) {
      const a = floorPt(B, i / 16, 0)
      const b = floorPt(B, i / 16, 1)
      lines.push(<line key={`s${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={M.woodDark} strokeWidth="1.2" opacity="0.7" />)
    }
    for (let r = 1; r < rows; r++) {
      const d = Math.pow(r / rows, 1.6)
      for (let i = 0; i < 16; i++) {
        if ((i + r) % 2) continue
        const a = floorPt(B, i / 16, d)
        const b = floorPt(B, (i + 1) / 16, d)
        lines.push(<line key={`c${r}-${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={M.woodDark} strokeWidth="1" opacity="0.55" />)
      }
    }
  } else if (floor === 'marble') {
    // checkerboard tiles
    const n = 10
    for (let r = 0; r < rows; r++) {
      const d0 = Math.pow(r / rows, 1.6)
      const d1 = Math.pow((r + 1) / rows, 1.6)
      for (let i = 0; i < n; i++) {
        if ((i + r) % 2) continue
        lines.push(
          <path key={`t${r}-${i}`} d={P([floorPt(B, i / n, d0), floorPt(B, (i + 1) / n, d0), floorPt(B, (i + 1) / n, d1), floorPt(B, i / n, d1)])} fill={M.ink} opacity="0.22" />,
        )
      }
    }
  } else if (floor === 'stone') {
    for (let r = 1; r < rows; r++) {
      const d = Math.pow(r / rows, 1.6)
      const a = floorPt(B, 0, d)
      const b = floorPt(B, 1, d)
      lines.push(<line key={`h${r}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#4A5753" strokeWidth="1.5" />)
    }
    for (let i = 0; i <= 10; i++) {
      const a = floorPt(B, i / 10, 0)
      const b = floorPt(B, i / 10, 1)
      lines.push(<line key={`v${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#4A5753" strokeWidth="1.5" />)
    }
  }
  // wainscot panels on side walls
  const wains: ReactNode[] = []
  if (wainscot) {
    for (const side of [-1, 1] as const) {
      const rail = [wallPt(B, side, 0.6, 0), wallPt(B, side, 0.6, 1)]
      wains.push(<line key={`r${side}`} x1={rail[0][0]} y1={rail[0][1]} x2={rail[1][0]} y2={rail[1][1]} stroke={M.brass} strokeWidth="2.5" opacity="0.7" />)
      for (let k = 0; k < 5; k++) {
        const d0 = Math.pow(k / 5, 1.5) + 0.02
        const d1 = Math.pow((k + 1) / 5, 1.5) - 0.02
        wains.push(
          <path key={`p${side}${k}`} d={P([wallPt(B, side, 0.66, d0), wallPt(B, side, 0.66, d1), wallPt(B, side, 0.94, d1), wallPt(B, side, 0.94, d0)])} fill="none" stroke="#3E6359" strokeWidth="2" />,
        )
      }
    }
  }
  const lights: ReactNode[] = []
  for (let i = 0; i < ceilingLights; i++) {
    const d = (i + 0.5) / ceilingLights
    const [x, y] = [mix(800, 800, d), mix(B.y0, 0, d)]
    lights.push(<Pendant key={i} x={x} y={y} len={40 + 50 * d} s={depthScale(B, d) * 1.2} />)
  }
  if (exterior)
    return (
      <g>
        <path d={P(floorPoly)} fill={fill} />
        {lines}
        {backWall}
      </g>
    )
  return (
    <g>
      <path d={P(ceilPoly)} fill="url(#g-ceiling)" opacity={hideCeiling ? 0 : 1} />
      <path d={P(leftPoly)} fill="url(#g-wall-side)" />
      <path d={P(rightPoly)} fill="url(#g-wall-side-r)" />
      <rect x={B.x0} y={B.y0} width={B.x1 - B.x0} height={B.y1 - B.y0} fill="url(#g-wall)" />
      {/* crown moulding + skirting on back wall */}
      <rect x={B.x0} y={B.y0} width={B.x1 - B.x0} height="6" fill={M.brass} opacity="0.6" />
      <rect x={B.x0} y={B.y1 - 10} width={B.x1 - B.x0} height="10" fill="#18292A" />
      <path d={P(floorPoly)} fill={fill} />
      {lines}
      {wains}
      {backWall}
      {lights}
    </g>
  )
}

/* ---------------- furniture & decor ---------------- */
export function Pendant({ x, y, len = 60, s = 1, on = true }: { x: number; y: number; len?: number; s?: number; on?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <line x1="0" y1="0" x2="0" y2={len} stroke={M.brassDark} strokeWidth="2" />
      {on && <ellipse cx="0" cy={len + 30} rx="90" ry="70" fill="url(#g-glow)" />}
      <path d={`M-28 ${len + 26} Q0 ${len - 8} 28 ${len + 26} Z`} fill="url(#g-brass)" />
      <ellipse cx="0" cy={len + 26} rx="16" ry="5" fill={M.glow} />
    </g>
  )
}

export function Chandelier({ x, y, s = 1, color = M.glow }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="40" rx="150" ry="110" fill="url(#g-glow)" />
      <line x1="0" y1="-60" x2="0" y2="10" stroke={M.brassDark} strokeWidth="3" />
      <path d="M-70 20 Q0 70 70 20" stroke="url(#g-brass)" strokeWidth="5" fill="none" />
      <path d="M-40 10 Q0 50 40 10" stroke="url(#g-brass)" strokeWidth="4" fill="none" />
      {[-70, -40, -14, 14, 40, 70].map((dx, i) => (
        <g key={i}>
          <line x1={dx} y1={i % 2 ? 22 : 18} x2={dx} y2={i % 2 ? 46 : 40} stroke={M.brassDark} strokeWidth="1.5" />
          <path d={`M${dx - 6} ${i % 2 ? 46 : 40} q6 -16 12 0 q-6 14 -12 0`} fill={color} />
        </g>
      ))}
    </g>
  )
}

export function Sconce({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="-10" rx="50" ry="60" fill="url(#g-glow)" />
      <rect x="-5" y="0" width="10" height="26" rx="3" fill="url(#g-brass)" />
      <path d="M-16 -2 L16 -2 L10 -30 L-10 -30 Z" fill={M.cream} opacity="0.9" />
    </g>
  )
}

export function Plant({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* eucalyptus stems */}
      {[-30, -12, 8, 26].map((a, i) => (
        <g key={i} transform={`rotate(${a})`}>
          <line x1="0" y1="0" x2="0" y2="-120" stroke={M.leafDark} strokeWidth="2" />
          {[0, 1, 2, 3, 4].map((k) => (
            <g key={k}>
              <ellipse cx="-9" cy={-24 - k * 22} rx="9" ry="7" fill={k % 2 ? M.leaf : M.leafDark} />
              <ellipse cx="9" cy={-34 - k * 22} rx="9" ry="7" fill={k % 2 ? M.leafDark : M.leaf} />
            </g>
          ))}
        </g>
      ))}
      <path d="M-30 0 L30 0 L22 56 L-22 56 Z" fill={M.cream} />
      <rect x="-32" y="-4" width="64" height="10" rx="4" fill={M.brass} />
    </g>
  )
}

export function Armchair({ x, y, s = 1, color = M.blush }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-50 -70 Q-50 -100 -20 -100 L20 -100 Q50 -100 50 -70 L50 -20 L-50 -20 Z" fill={color} />
      <rect x="-62" y="-50" width="24" height="44" rx="10" fill={color} />
      <rect x="38" y="-50" width="24" height="44" rx="10" fill={color} />
      <rect x="-50" y="-34" width="100" height="26" rx="8" fill={color} opacity="0.85" />
      <line x1="-44" y1="-8" x2="-48" y2="10" stroke={M.brassDark} strokeWidth="4" />
      <line x1="44" y1="-8" x2="48" y2="10" stroke={M.brassDark} strokeWidth="4" />
    </g>
  )
}

export function Sofa({ x, y, s = 1, color = M.blush }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-130" y="-90" width="260" height="60" rx="26" fill={color} />
      <rect x="-150" y="-60" width="40" height="56" rx="14" fill={color} opacity="0.92" />
      <rect x="110" y="-60" width="40" height="56" rx="14" fill={color} opacity="0.92" />
      <rect x="-112" y="-46" width="224" height="34" rx="10" fill={color} opacity="0.8" />
      <rect x="-60" y="-80" width="36" height="30" rx="8" fill={M.coral} />
      <rect x="24" y="-80" width="36" height="30" rx="8" fill={M.leaf} />
      <line x1="-120" y1="-4" x2="-124" y2="12" stroke={M.brassDark} strokeWidth="5" />
      <line x1="120" y1="-4" x2="124" y2="12" stroke={M.brassDark} strokeWidth="5" />
    </g>
  )
}

export function SideTable({ x, y, s = 1, lamp = true }: { x: number; y: number; s?: number; lamp?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {lamp && (
        <g>
          <ellipse cx="0" cy="-90" rx="60" ry="60" fill="url(#g-glow)" />
          <line x1="0" y1="-50" x2="0" y2="-80" stroke={M.brassDark} strokeWidth="3" />
          <path d="M-20 -80 L20 -80 L14 -108 L-14 -108 Z" fill={M.cream} />
        </g>
      )}
      <ellipse cx="0" cy="-50" rx="34" ry="8" fill={M.marble} />
      <line x1="0" y1="-48" x2="0" y2="0" stroke="url(#g-brass)" strokeWidth="5" />
      <ellipse cx="0" cy="0" rx="18" ry="4" fill={M.brassDark} />
    </g>
  )
}

export function Rug({ cx, cy, rx, ry, color = M.velvet }: { cx: number; cy: number; rx: number; ry: number; color?: string }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={color} opacity="0.85" />
      <ellipse cx={cx} cy={cy} rx={rx * 0.86} ry={ry * 0.8} fill="none" stroke={M.blush} strokeWidth="3" opacity="0.6" />
      <ellipse cx={cx} cy={cy} rx={rx * 0.6} ry={ry * 0.55} fill="none" stroke={M.brass} strokeWidth="2" opacity="0.5" />
    </g>
  )
}

/** Framed art on a wall. */
export function Frame({ x, y, w, h, children }: { x: number; y: number; w: number; h: number; children?: ReactNode }) {
  return (
    <g>
      <rect x={x - 6} y={y - 6} width={w + 12} height={h + 12} rx="4" fill="url(#g-brass)" />
      <rect x={x} y={y} width={w} height={h} fill={M.cream} />
      <svg x={x} y={y} width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        {children}
      </svg>
    </g>
  )
}

/** Arched doorway on a back wall. */
export function ArchDoor({ x, y, w, h, glow = true, label }: { x: number; y: number; w: number; h: number; glow?: boolean; label?: string }) {
  const r = w / 2
  const d = `M${x} ${y + h} L${x} ${y + r} A${r} ${r} 0 0 1 ${x + w} ${y + r} L${x + w} ${y + h} Z`
  return (
    <g>
      {glow && <ellipse cx={x + r} cy={y + h * 0.55} rx={w * 0.9} ry={h * 0.6} fill="url(#g-glow)" />}
      <path d={d} fill="#0F1A17" />
      <path d={d} fill="none" stroke="url(#g-brass)" strokeWidth="6" />
      {label && (
        <text x={x + r} y={y + r - 8} textAnchor="middle" className="film-plaque">
          {label}
        </text>
      )}
    </g>
  )
}

export function Stanchion({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-4" y="-80" width="8" height="80" fill="url(#g-brass)" />
      <circle cx="0" cy="-84" r="9" fill="url(#g-brass)" />
      <ellipse cx="0" cy="0" rx="20" ry="6" fill={M.brassDark} />
    </g>
  )
}

/** Velvet rope between two stanchion tops. */
export function Rope({ a, b }: { a: Pt; b: Pt }) {
  const mx = (a[0] + b[0]) / 2
  const my = Math.max(a[1], b[1]) + 30
  return <path d={`M${a[0]} ${a[1]} Q${mx} ${my} ${b[0]} ${b[1]}`} stroke="url(#g-velvet)" strokeWidth="7" fill="none" />
}

/** Reception/concierge desk (front view). */
export function Desk({ x, y, w, h = 120 }: { x: number; y: number; w: number; h?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" fill="#3A2E28" />
      {Array.from({ length: Math.floor(w / 40) }).map((_, i) => (
        <rect key={i} x={x + 10 + i * 40} y={y + 22} width="30" height={h - 32} rx="4" fill="#4A3B33" />
      ))}
      <rect x={x - 12} y={y - 14} width={w + 24} height="20" rx="6" fill={M.marble} />
      <rect x={x - 12} y={y + 4} width={w + 24} height="4" fill={M.brass} />
    </g>
  )
}

/** Suitcase carried next to a guest. */
export function Suitcase({ x, y, s = 1, color = M.brass }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-10" y="-14" width="20" height="26" rx="4" fill={color} stroke={M.ink} strokeWidth="1.5" />
      <path d="M-5 -14 L-5 -20 L5 -20 L5 -14" stroke={M.ink} strokeWidth="2" fill="none" />
    </g>
  )
}

/** Steam wisp rising, animated by t. */
export function Steam({ x, y, t, i = 0, s = 1 }: { x: number; y: number; t: number; i?: number; s?: number }) {
  const k = (t * 0.55 + i * 0.29) % 1
  return (
    <path
      d={`M${x} ${y} q${8 * s} ${-12 * s} 0 ${-24 * s} q${-8 * s} ${-12 * s} 0 ${-24 * s}`}
      stroke={M.cream}
      strokeWidth={2 * s}
      fill="none"
      opacity={0.55 * (1 - k)}
      transform={`translate(0 ${-k * 30 * s})`}
    />
  )
}
