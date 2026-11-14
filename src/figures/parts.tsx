import type { ReactNode } from 'react'

export const C = {
  euc: '#2F5D50',
  deep: '#1B2A26',
  mist: '#EEF3EF',
  mist2: '#E3EBE6',
  line: '#CFDCD5',
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
