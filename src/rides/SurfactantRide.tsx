import { useState } from 'react'
import { useTween } from '../lib/useTween'

function alveolusPath(cx: number, cy: number, c: number) {
  const R = 130 * (1 - 0.58 * c)
  const pts: string[] = []
  for (let i = 0; i <= 72; i++) {
    const a = (i / 72) * Math.PI * 2
    const r = R * (1 + c * (0.2 * Math.sin(5 * a + 0.7) + 0.12 * Math.sin(9 * a)))
    pts.push(`${i ? 'L' : 'M'}${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a) * 0.92).toFixed(1)}`)
  }
  return pts.join(' ') + ' Z'
}

export function SurfactantRide() {
  const [on, setOn] = useState(true)
  const c = useTween(on ? 0 : 1, 1600)
  const cx = 380
  const cy = 190
  const arrows = [0, 60, 120, 180, 240, 300]
  const R = 130 * (1 - 0.58 * c)

  return (
    <div className="ride">
      <div className="ride__stage">
        <svg viewBox="0 0 1000 400" className="ride-svg" role="img" aria-labelledby="sf-t sf-d">
          <title id="sf-t">Surfactant switch: an alveolus with and without surfactant</title>
          <desc id="sf-d">
            {on
              ? 'Surfactant is on. A thin film lines the alveolus, surface tension is low and the alveolus stays round and open.'
              : 'Surfactant is off. Strong surface tension pulls the wet alveolar wall inward and the alveolus collapses.'}
          </desc>
          {/* capillary */}
          <path d="M60 360 C220 330 540 330 720 360" stroke="#E3735E" strokeWidth="26" fill="none" opacity="0.45" strokeLinecap="round" />
          <text x="740" y="366" className="svg-label svg-label--sm svg-label--on-dark">capillary</text>
          {/* bronchiole */}
          <path d={`M${cx} 20 L${cx} ${cy - R * 0.92 + 4}`} stroke="#F4D5CC" strokeWidth="18" strokeLinecap="round" />
          {/* alveolus */}
          <path className="sf-alv" d={alveolusPath(cx, cy, c)} fill="rgba(244,213,204,0.18)" stroke="#E3735E" strokeWidth="6" strokeLinejoin="round" />
          {/* surfactant film */}
          <path d={alveolusPath(cx, cy, c)} transform={`translate(${cx} ${cy}) scale(0.93) translate(${-cx} ${-cy})`} fill="none" stroke="#E9C46A" strokeWidth="4" strokeDasharray="2 7" strokeLinecap="round" opacity={1 - c} />
          {/* surface tension arrows */}
          {arrows.map((a) => {
            const rad = (a * Math.PI) / 180
            const r1 = R + 52
            const len = 18 + 34 * c
            const x1 = cx + Math.cos(rad) * r1
            const y1 = cy + Math.sin(rad) * r1 * 0.92
            const x2 = cx + Math.cos(rad) * (r1 - len)
            const y2 = cy + Math.sin(rad) * (r1 - len) * 0.92
            return (
              <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F4D5CC" strokeWidth={2 + 2 * c} markerEnd="url(#sf-arrow)" opacity={0.45 + 0.55 * c} />
            )
          })}
          <defs>
            <marker id="sf-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="#F4D5CC" />
            </marker>
          </defs>
          {/* legend */}
          <g transform="translate(640 70)">
            <text className="svg-label svg-label--on-dark svg-label--bold">Surface tension</text>
            <text y="22" className="svg-label svg-label--sm svg-label--on-dark">arrows = inward pull of the water film</text>
            <rect y="44" width="240" height="14" rx="7" fill="rgba(255,255,255,0.12)" />
            <rect y="44" width={60 + 180 * c} height="14" rx="7" fill="#E3735E" />
            <text y="84" className="svg-label svg-label--on-dark svg-label--bold">Alveolus size</text>
            <rect y="96" width="240" height="14" rx="7" fill="rgba(255,255,255,0.12)" />
            <rect y="96" width={240 * (1 - 0.6 * c)} height="14" rx="7" fill="#F4D5CC" />
            <g opacity={1 - c}>
              <line x1="0" y1="148" x2="30" y2="148" stroke="#E9C46A" strokeWidth="4" strokeDasharray="2 7" strokeLinecap="round" />
              <text x="40" y="153" className="svg-label svg-label--sm svg-label--on-dark">surfactant</text>
            </g>
          </g>
        </svg>
      </div>
      <div className="ride__controls">
        <div className="toggle" role="group" aria-label="Surfactant">
          <button type="button" aria-pressed={on} onClick={() => setOn(true)}>
            Surfactant on
          </button>
          <button type="button" aria-pressed={!on} onClick={() => setOn(false)}>
            Surfactant off
          </button>
        </div>
        <p className="ride__caption" aria-live="polite">
          {on
            ? 'Surfactant coats the inside of the alveolus. It stops the water lining from pulling the walls together, so the alveolus stays open.'
            : 'Without surfactant, the water lining pulls the walls inward (surface tension) and the alveolus collapses. Premature babies can have this problem.'}
        </p>
      </div>
    </div>
  )
}
