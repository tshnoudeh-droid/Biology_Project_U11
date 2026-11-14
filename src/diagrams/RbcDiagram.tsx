import { Arrowheads, C, Label, PanelTitle } from './parts'

function Cell({ x, y, o2, co2 }: { x: number; y: number; o2: number; co2: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse rx="120" ry="62" fill="#F2B5A6" stroke={C.coralDeep} strokeWidth="3" />
      <ellipse rx="80" ry="30" fill="#E89A87" />
      {[-54, -18, 18, 54].map((sx, i) => (
        <g key={i}>
          <circle cx={sx} cy="-4" r="15" fill="#FBFCFB" stroke={C.coralDeep} strokeWidth="1.5" />
          {i < o2 && <text x={sx} y="1" textAnchor="middle" className="svg-label svg-label--bold" style={{ fontSize: 13, fill: C.coralDeep }}>O₂</text>}
        </g>
      ))}
      {Array.from({ length: co2 }).map((_, i) => (
        <text key={i} x={-40 + i * 40} y="46" textAnchor="middle" className="svg-label svg-label--bold" style={{ fontSize: 13, fill: '#3E6359' }}>
          CO₂
        </text>
      ))}
    </g>
  )
}

/** Simple picture of what a red blood cell does in the lungs vs in the body. */
export function RbcDiagram() {
  return (
    <svg viewBox="0 0 1000 400" role="img" aria-labelledby="rbc-t rbc-d" className="diagram-svg">
      <title id="rbc-t">How a red blood cell carries gases</title>
      <desc id="rbc-d">
        In the lungs, a red blood cell picks up oxygen: its hemoglobin fills up to four oxygen seats, and carbon dioxide leaves the blood
        to be breathed out. In the body, the red blood cell drops off oxygen to a working cell and picks up carbon dioxide to bring back.
      </desc>
      <Arrowheads id="rb" />
      <PanelTitle x={40} y={36}>In the lungs</PanelTitle>
      <rect x="30" y="56" width="420" height="90" rx="20" fill="#F4D5CC" opacity="0.5" />
      <Label x={240} y={92} anchor="middle" bold>Alveolus: lots of oxygen</Label>
      <path d="M180 116 L180 186" stroke={C.coralDeep} strokeWidth="3" markerEnd="url(#rb-coral)" />
      <Label x={190} y={160} small>O₂ diffuses in</Label>
      <path d="M320 186 L320 116" stroke={C.euc} strokeWidth="3" markerEnd="url(#rb-euc)" />
      <Label x={330} y={160} small>CO₂ diffuses out</Label>
      <Cell x={240} y={270} o2={4} co2={0} />
      <Label x={240} y={370} anchor="middle" bold>Hemoglobin seats: full (4 O₂)</Label>

      <path d="M470 270 C540 250 600 250 660 270" stroke={C.coralDeep} strokeWidth="4" fill="none" markerEnd="url(#rb-coral)" />
      <Label x={565} y={236} anchor="middle" small>pumped by the heart</Label>

      <PanelTitle x={560} y={36}>In the body</PanelTitle>
      <rect x="550" y="56" width="420" height="90" rx="20" fill={C.tissue} />
      <Label x={760} y={92} anchor="middle" bold>Working cell: needs oxygen</Label>
      <path d="M700 186 L700 116" stroke={C.coralDeep} strokeWidth="3" markerEnd="url(#rb-coral)" />
      <Label x={710} y={160} small>O₂ dropped off</Label>
      <path d="M840 116 L840 186" stroke={C.euc} strokeWidth="3" markerEnd="url(#rb-euc)" />
      <Label x={850} y={160} small>CO₂ picked up</Label>
      <Cell x={770} y={270} o2={1} co2={3} />
      <Label x={770} y={370} anchor="middle" bold>Brings CO₂ back to the lungs</Label>
    </svg>
  )
}
