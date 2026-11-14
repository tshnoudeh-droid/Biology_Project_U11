import { useState } from 'react'
import { useFrame } from '../lib/useFrame'

/** Drop a peanut: it falls into the right bronchus (wider and straighter). Also: count the lobes. */
export function PeanutRide() {
  const [dropAt, setDropAt] = useState(0)
  const [f, setF] = useState(0)
  const [lobes, setLobes] = useState(false)
  const dropped = dropAt > 0
  useFrame(() => {
    const raw = Math.min(1, (performance.now() - dropAt) / 1800)
    setF(raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2)
  }, dropped && f < 1)
  // path: down the trachea, then into the RIGHT bronchus (shown on the viewer's left)
  const pts: [number, number][] = [[400, 20], [400, 200], [330, 290], [292, 340]]
  const seg = pts.length - 1
  const s = Math.min(seg - 1e-6, f * seg)
  const i = Math.floor(s)
  const k = s - i
  const px = pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k
  const py = pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k
  const landed = f > 0.98

  const lobe = (d: string, _n: number, color: string) => (
    <g>
      <path d={d} fill={lobes ? color : 'rgba(244,213,204,0.18)'} stroke="#F4D5CC" strokeWidth="2" style={{ transition: 'fill .5s' }} />
    </g>
  )

  return (
    <div className="ride">
      <div className="ride__stage">
        <svg viewBox="0 0 800 520" className="ride-svg" role="img" aria-label={landed ? 'The peanut fell into the right bronchus.' : 'The trachea splitting into the right and left bronchi.'}>
          {/* lungs + lobes (your right lung is on the left of the picture) */}
          {lobe('M300 160 C220 170 150 260 140 360 L310 300 Z', 1, 'rgba(227,115,94,0.55)')}
          {lobe('M140 360 L310 300 L360 380 L250 430 Z', 2, 'rgba(244,213,204,0.55)')}
          {lobe('M140 360 L250 430 L360 380 L370 500 C280 505 180 500 150 490 C130 450 132 400 140 360 Z', 3, 'rgba(143,179,166,0.65)')}
          {lobe('M500 160 C580 170 650 260 660 340 L470 360 Z', 1, 'rgba(227,115,94,0.55)')}
          {lobe('M660 340 L470 360 L460 470 C520 470 560 480 600 500 C640 495 668 440 660 340 Z', 2, 'rgba(143,179,166,0.65)')}
          {lobes && (
            <g>
              <text x="250" y="250" className="peanut-num">1</text>
              <text x="240" y="400" className="peanut-num">2</text>
              <text x="260" y="475" className="peanut-num">3</text>
              <text x="570" y="270" className="peanut-num">1</text>
              <text x="560" y="440" className="peanut-num">2</text>
            </g>
          )}
          {/* trachea + bronchi */}
          <path d="M400 0 L400 200 L292 340" stroke="#C9D6CF" strokeWidth="44" fill="none" strokeLinejoin="round" strokeLinecap="round" />
          <path d="M400 200 L520 300" stroke="#C9D6CF" strokeWidth="32" fill="none" strokeLinecap="round" />
          <path d="M400 0 L400 200 L292 340" stroke="#24403A" strokeWidth="32" fill="none" strokeLinejoin="round" strokeLinecap="round" />
          <path d="M400 200 L520 300" stroke="#24403A" strokeWidth="20" fill="none" strokeLinecap="round" />
          {/* peanut */}
          {dropped && (
            <g transform={`translate(${px} ${py}) rotate(${f * 200})`}>
              <path d="M-10 -14 C-18 -6 -18 6 -10 14 C-4 18 4 18 10 14 C18 6 18 -6 10 -14 C4 -18 -4 -18 -10 -14 Z" fill="#D9B676" stroke="#1B2A26" strokeWidth="2" />
            </g>
          )}
          {landed && <circle cx={px} cy={py} r="30" fill="none" stroke="#E3735E" strokeWidth="3" strokeDasharray="5 5" />}
          <text x="200" y="40" textAnchor="middle" className="svg-label svg-label--on-dark svg-label--bold">Your RIGHT lung</text>
          <text x="600" y="40" textAnchor="middle" className="svg-label svg-label--on-dark svg-label--bold">Your LEFT lung</text>
          <text x="200" y="62" textAnchor="middle" className="svg-label svg-label--sm svg-label--on-dark">wider, straighter bronchus</text>
          <text x="600" y="62" textAnchor="middle" className="svg-label svg-label--sm svg-label--on-dark">narrower, angled bronchus</text>
          <path d="M520 400 C540 380 580 400 560 430 L520 470 L480 430 C460 400 500 380 520 400 Z" fill="#E3735E" opacity={lobes ? 0.9 : 0.35} />
          {lobes && <text x="520" y="500" textAnchor="middle" className="svg-label svg-label--sm svg-label--on-dark">heart</text>}
        </svg>
      </div>
      <div className="ride__controls">
        <div className="ride__btns">
          <button type="button" className="btn btn--blush" onClick={() => { setF(0); setDropAt(performance.now()) }} disabled={dropped && !landed}>
            {dropped ? 'Drop again' : 'Drop a peanut'}
          </button>
          <button type="button" className="btn btn--ghost-dark" aria-pressed={lobes} onClick={() => setLobes((v) => !v)}>
            {lobes ? 'Hide lobes' : 'Count the lobes'}
          </button>
        </div>
        <p className="ride__caption" aria-live="polite">
          {landed
            ? 'It went into the RIGHT bronchus. The right one is wider and straighter, so that’s where swallowed objects usually end up.'
            : lobes
              ? 'Right lung: 3 lobes. Left lung: 2 lobes, leaving room for the heart.'
              : 'Oops, a peanut went down the wrong pipe. Which lung will it end up in?'}
        </p>
      </div>
    </div>
  )
}
