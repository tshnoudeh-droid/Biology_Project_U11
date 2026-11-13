import { Arrowheads, C, PanelTitle } from './parts'

const route = [
  { term: 'Alveoli', note: 'CO₂ joins in' },
  { term: 'Bronchioles', note: 'narrow trails' },
  { term: 'Bronchi', note: 'two lines merge' },
  { term: 'Trachea', note: 'express tunnel' },
  { term: 'Larynx', note: 'voice made here' },
  { term: 'Pharynx', note: 'shared plaza' },
  { term: 'Nasal cavity', note: 'water recaptured' },
  { term: 'Out!', note: 'see you soon' },
]

export function CheckoutDiagram() {
  const x0 = 70
  const step = 136
  return (
    <svg viewBox="0 0 1100 300" role="img" aria-labelledby="co-t co-d" className="diagram-svg">
      <title id="co-t">Diagram of the exhalation route</title>
      <desc id="co-d">
        The route air takes out of the body, in order: {route.map((r) => r.term).join(', ')}.
      </desc>
      <Arrowheads id="co" />
      <PanelTitle x={20} y={30}>Your route home</PanelTitle>
      <path d={`M${x0} 140 L${x0 + step * 7} 140`} stroke={C.sage} strokeWidth="6" strokeLinecap="round" />
      <path d={`M${x0} 140 L${x0 + step * 7 + 40} 140`} stroke={C.coralDeep} strokeWidth="2.4" strokeDasharray="10 8" markerEnd="url(#co-coral)" fill="none" className="checkout-flow" />
      {route.map((r, i) => {
        const x = x0 + step * i
        const last = i === route.length - 1
        return (
          <g key={r.term}>
            <circle cx={x} cy={140} r="26" fill={last ? C.euc : i === 0 ? C.coral : C.paper} stroke={C.euc} strokeWidth="2.5" />
            <text x={x} y={146} textAnchor="middle" className="svg-label svg-label--bold" style={{ fill: last ? C.mist : C.deep }}>
              {i + 1}
            </text>
            <text x={x} y={200} textAnchor="middle" className="svg-label svg-label--bold">{r.term}</text>
            <text x={x} y={220} textAnchor="middle" className="svg-label svg-label--sm">{r.note}</text>
          </g>
        )
      })}
      <text x={x0} y={92} className="svg-label svg-label--sm">Deepest point</text>
      <text x={x0 + step * 7} y={92} textAnchor="middle" className="svg-label svg-label--sm">Exit</text>
      <text x="550" y="272" textAnchor="middle" className="svg-label svg-label--sm">
        Quiet exhalation is passive: the diaphragm relaxes and the lungs recoil, raising the pressure so air flows out.
      </text>
    </svg>
  )
}
