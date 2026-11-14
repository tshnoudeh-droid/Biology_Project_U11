import { useState } from 'react'
import { useTween } from '../lib/useTween'

type Cond = 'asthma' | 'emphysema' | 'premature'
const info: Record<Cond, { label: string; healthy: string; sick: string }> = {
  asthma: { label: 'Asthma', healthy: 'Relaxed muscle, wide-open airway.', sick: 'Muscle squeezes and mucus builds up. The airway gets narrow.' },
  emphysema: { label: 'Emphysema', healthy: 'Lots of small alveoli = lots of surface area.', sick: 'Walls break down into a few big sacs. Much less surface area.' },
  premature: { label: 'Premature babies', healthy: 'Enough surfactant: the alveolus stays open.', sick: 'Not enough surfactant: the alveolus collapses.' },
}

/** Compare healthy vs affected for each condition. */
export function AdvisoryRide() {
  const [cond, setCond] = useState<Cond>('asthma')
  const [sick, setSick] = useState(false)
  const k = useTween(sick ? 1 : 0, 1100)

  const asthma = (
    <g>
      <circle cx="400" cy="200" r="150" fill="#36574F" />
      <circle cx="400" cy="200" r={110 - 30 * k} fill="none" stroke="#B84A35" strokeWidth={14 + 34 * k} strokeDasharray="14 6" />
      <circle cx="400" cy="200" r={92 - 52 * k} fill="#DCE6B8" opacity={k} />
      <circle cx="400" cy="200" r={92 - 64 * k} fill="#1B2A26" />
    </g>
  )
  const cluster = (
    <g>
      {[[0, 0, 40], [-60, -30, 34], [60, -30, 34], [-40, 50, 32], [40, 50, 32], [0, -80, 30], [-90, 40, 26], [90, 40, 26], [0, 90, 26]].map(([x, y, r], i) => (
        <circle key={i} cx={400 + x * (1 - 0.25 * k) + (i === 0 ? 0 : 0)} cy={200 + y} r={i < 3 ? r + 40 * k : r * (1 - 0.6 * k)} fill="#F4D5CC" stroke="#B84A35" strokeWidth="3" opacity={i < 3 ? 1 : 1 - 0.7 * k} />
      ))}
    </g>
  )
  const alveolus = (() => {
    const pts: string[] = []
    for (let i = 0; i <= 60; i++) {
      const a = (i / 60) * Math.PI * 2
      const r = (140 - 70 * k) * (1 + k * (0.18 * Math.sin(5 * a) + 0.1 * Math.sin(9 * a)))
      pts.push(`${i ? 'L' : 'M'}${(400 + r * Math.cos(a)).toFixed(1)} ${(200 + r * Math.sin(a)).toFixed(1)}`)
    }
    return (
      <g>
        <path d={pts.join(' ') + 'Z'} fill="rgba(244,213,204,0.2)" stroke="#E3735E" strokeWidth="7" />
        <circle cx="400" cy="200" r={128} fill="none" stroke="#E9C46A" strokeWidth="4" strokeDasharray="2 10" opacity={1 - k} />
      </g>
    )
  })()

  return (
    <div className="ride">
      <div className="ride__stage">
        <svg viewBox="0 0 800 400" className="ride-svg" role="img" aria-label={`${info[cond].label}: ${sick ? info[cond].sick : info[cond].healthy}`}>
          {cond === 'asthma' ? asthma : cond === 'emphysema' ? cluster : alveolus}
          <text x="400" y="385" textAnchor="middle" className="svg-label svg-label--on-dark svg-label--bold">
            {sick ? info[cond].label : 'Healthy'}
          </text>
        </svg>
      </div>
      <div className="ride__controls">
        <div className="tabs" role="group" aria-label="Condition">
          {(Object.keys(info) as Cond[]).map((c) => (
            <button key={c} type="button" aria-pressed={cond === c} onClick={() => { setCond(c); setSick(false) }}>
              {info[c].label}
            </button>
          ))}
        </div>
        <div className="toggle" role="group" aria-label="Healthy or affected">
          <button type="button" aria-pressed={!sick} onClick={() => setSick(false)}>
            Healthy
          </button>
          <button type="button" aria-pressed={sick} onClick={() => setSick(true)}>
            {info[cond].label}
          </button>
        </div>
        <p className="ride__caption" aria-live="polite">{sick ? info[cond].sick : info[cond].healthy}</p>
      </div>
    </div>
  )
}
