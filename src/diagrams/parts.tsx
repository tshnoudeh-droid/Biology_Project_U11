import type { ReactNode } from 'react'

export const C = {
  euc: '#2F5D50',
  deep: '#1B2A26',
  mist: '#EEF3EF',
  mist2: '#E3EBE6',
  paper: '#FBFCFB',
  coral: '#E3735E',
  coralDeep: '#B84A35',
  blush: '#F4D5CC',
  body: '#3B4A45',
  muted: '#5A6B65',
  blue: '#7FA7D9',
  sage: '#8FB3A6',
  cartilage: '#DCE8E2',
  tissue: '#E7EEEA',
}

type CalloutProps = {
  /** point on the structure */
  at: [number, number]
  /** where the label sits */
  to: [number, number]
  label: string
  sub?: string
  anchor?: 'start' | 'end' | 'middle'
  /** optional elbow: horizontal run first */
  elbow?: boolean
  dark?: boolean
}

/** Leader line + dot + real-text label. */
export function Callout({ at, to, label, sub, anchor = 'start', elbow = false, dark = false }: CalloutProps) {
  const [x, y] = at
  const [lx, ly] = to
  const gap = anchor === 'start' ? -8 : anchor === 'end' ? 8 : 0
  const endX = lx + gap
  const endY = anchor === 'middle' ? (ly > y ? ly - 18 : ly + 10) : ly - 5
  const d = elbow ? `M${x} ${y} L${x} ${endY} L${endX} ${endY}` : `M${x} ${y} L${endX} ${endY}`
  return (
    <g>
      <path d={d} className={`svg-leader${dark ? ' svg-leader--dark' : ''}`} />
      <circle cx={x} cy={y} r={3.2} fill={dark ? C.blush : C.deep} />
      <text x={lx} y={ly} textAnchor={anchor} className={`svg-label svg-label--bold${dark ? ' svg-label--on-dark' : ''}`}>
        {label}
      </text>
      {sub && (
        <text x={lx} y={ly + 18} textAnchor={anchor} className={`svg-label svg-label--sm${dark ? ' svg-label--on-dark' : ''}`}>
          {sub}
        </text>
      )}
    </g>
  )
}

/** Plain text label, no leader. */
export function Label({
  x,
  y,
  children,
  anchor = 'start',
  bold = false,
  small = false,
  fill,
}: {
  x: number
  y: number
  children: ReactNode
  anchor?: 'start' | 'end' | 'middle'
  bold?: boolean
  small?: boolean
  fill?: string
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className={`svg-label${bold ? ' svg-label--bold' : ''}${small ? ' svg-label--sm' : ''}`}
      style={fill ? { fill } : undefined}
    >
      {children}
    </text>
  )
}

/** Section title inside a diagram. */
export function PanelTitle({ x, y, children, anchor = 'start' }: { x: number; y: number; children: ReactNode; anchor?: 'start' | 'middle' | 'end' }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className="svg-panel-title">
      {children}
    </text>
  )
}

/** Arrowhead markers. Include once per SVG (ids are prefixed). */
export function Arrowheads({ id }: { id: string }) {
  return (
    <defs>
      <marker id={`${id}-coral`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill={C.coralDeep} />
      </marker>
      <marker id={`${id}-euc`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill={C.euc} />
      </marker>
      <marker id={`${id}-blue`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill="#4F79AE" />
      </marker>
      <marker id={`${id}-blush`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill={C.blush} />
      </marker>
    </defs>
  )
}

/** Small "oxygen-rich / oxygen-poor" key, always in words as well as colour. */
export function BloodKey({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="-11" width="22" height="12" rx="6" fill={C.coral} />
      <text x="30" y="0" className="svg-label svg-label--sm">Oxygen-rich blood</text>
      <rect x="0" y="9" width="22" height="12" rx="6" fill={C.blue} />
      <text x="30" y="20" className="svg-label svg-label--sm">Oxygen-poor blood</text>
    </g>
  )
}

/** Pseudostratified ciliated columnar epithelium close-up (used at Stops 1 and 4). */
export function CiliaInset({ x, y, w = 260, title = 'Close-up: ciliated lining', arrowLabel = 'Mucus swept toward the pharynx', id }: { x: number; y: number; w?: number; title?: string; arrowLabel?: string; id: string }) {
  const cells = 7
  const cw = w / cells
  return (
    <g transform={`translate(${x} ${y})`}>
      <PanelTitle x={0} y={0}>{title}</PanelTitle>
      {/* mucus layer */}
      <rect x="0" y="22" width={w} height="34" rx="8" fill="#EAF0D8" stroke="#B5C48F" />
      {[30, 80, 150, 205].map((px, i) => (
        <circle key={i} cx={px} cy={36 + (i % 2) * 8} r={4} fill={C.muted} />
      ))}
      {/* cilia */}
      <g stroke={C.euc} strokeWidth="1.4" strokeLinecap="round">
        {Array.from({ length: cells * 5 }).map((_, i) => {
          const cx = 6 + i * (w - 12) / (cells * 5 - 1)
          const isGoblet = Math.floor(i / 5) === 3
          return isGoblet ? null : <path key={i} d={`M${cx} 74 q4 -8 2 -16`} fill="none" />
        })}
      </g>
      {/* cells */}
      {Array.from({ length: cells }).map((_, i) => {
        const goblet = i === 3
        return (
          <g key={i}>
            <rect x={i * cw + 1} y="74" width={cw - 2} height="92" rx="6" fill={goblet ? '#F7E7E1' : C.tissue} stroke={C.euc} strokeWidth="1.2" />
            {goblet ? (
              <ellipse cx={i * cw + cw / 2} cy="102" rx={cw / 2 - 7} ry="22" fill="#EAF0D8" stroke="#B5C48F" />
            ) : null}
            <ellipse cx={i * cw + cw / 2} cy={goblet ? 145 : 128 + (i % 2) * 14} rx="7" ry="10" fill={C.euc} opacity="0.75" />
          </g>
        )
      })}
      <path d={`M${w - 20} 14 L20 14`} stroke={C.coralDeep} strokeWidth="2.2" markerEnd={`url(#${id}-coral)`} fill="none" />
      <text x={w / 2} y={196} textAnchor="middle" className="svg-label svg-label--sm">{arrowLabel}</text>
      <Callout at={[3.5 * cw, 96]} to={[w + 18, 104]} label="Goblet cell" sub="makes mucus" />
      <Callout at={[w - 14, 62]} to={[w + 18, 52]} label="Cilia" sub="beat in waves" />
      <Callout at={[w - 30, 34]} to={[w + 18, 8]} label="Mucus" sub="traps dust and microbes" />
    </g>
  )
}
