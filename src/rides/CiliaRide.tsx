import { useMemo, useRef, useState } from 'react'
import { useFrame } from '../lib/useFrame'
import { useReducedMotion } from '../lib/useReducedMotion'
import { useTween } from '../lib/useTween'

/** Healthy vs smoker: cilia sweep mucus up and out; smoke stops them. */
export function CiliaRide() {
  const [smoker, setSmoker] = useState(false)
  const [cough, setCough] = useState(0)
  const reduced = useReducedMotion()
  const k = useTween(smoker ? 1 : 0, 1200)
  const t = useRef(0)
  const cilia = useRef<(SVGPathElement | null)[]>([])
  const dust = useMemo(() => Array.from({ length: 12 }, (_, i) => ({ x: 60 + i * 80, y: 120 + (i % 3) * 12 })), [])
  const dustEls = useRef<(SVGCircleElement | null)[]>([])
  const smokerRef = useRef(smoker)
  smokerRef.current = smoker
  const coughRef = useRef(0)
  coughRef.current = cough

  useFrame((dt) => {
    t.current += dt
    const sm = smokerRef.current
    cilia.current.forEach((el, i) => {
      if (!el) return
      const beat = sm ? 0 : Math.sin(t.current * 8 - i * 0.5) * 28
      const len = sm ? 14 : 34
      el.setAttribute('transform', `rotate(${beat} ${30 + i * 26} 200)`)
      el.setAttribute('d', `M${30 + i * 26} 200 q4 ${-len / 2} 0 ${-len}`)
    })
    const coughing = performance.now() - coughRef.current < 900
    dust.forEach((d, i) => {
      if (coughing) d.x -= 900 * dt
      else if (!sm) d.x -= 70 * dt
      if (d.x < -20) d.x = 980 + (i % 3) * 20
      const el = dustEls.current[i]
      if (el) el.setAttribute('cx', d.x.toFixed(1))
    })
  }, !reduced)

  return (
    <div className="ride">
      <div className="ride__stage">
        <svg viewBox="0 0 1000 340" className="ride-svg" role="img" aria-label={smoker ? 'Smoker: the cilia are flattened and stop moving, so mucus and dust build up.' : 'Healthy: the cilia beat and sweep mucus and dust toward the throat.'}>
          <text x="20" y="40" className="svg-label svg-label--on-dark svg-label--bold">← toward the throat</text>
          {/* mucus layer, thicker for a smoker */}
          <rect x="0" y={150 - 40 * k} width="1000" height={36 + 40 * k} rx="10" fill="#DCE6B8" opacity="0.75" />
          {dust.map((d, i) => (
            <circle key={i} ref={(el) => { dustEls.current[i] = el }} cx={d.x} cy={d.y - 20 * k} r={6 + 4 * k} fill="#5A6B65" />
          ))}
          {/* cilia */}
          {Array.from({ length: 37 }).map((_, i) => (
            <path key={i} ref={(el) => { cilia.current[i] = el }} d={`M${30 + i * 26} 200 q4 -17 0 -34`} stroke={smoker ? '#8A958F' : '#8FB3A6'} strokeWidth="5" strokeLinecap="round" fill="none" />
          ))}
          {/* cells */}
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={i}>
              <rect x={10 + i * 98} y="200" width="94" height="110" rx="10" fill={i === 4 ? '#F7E7E1' : '#36574F'} />
              {i === 4 ? <ellipse cx={57 + i * 98} cy="240" rx="26" ry="26" fill="#DCE6B8" /> : <ellipse cx={57 + i * 98} cy="262" rx="11" ry="15" fill="#8FB3A6" />}
            </g>
          ))}
          <text x={57 + 4 * 98} y="300" textAnchor="middle" className="svg-label svg-label--sm" style={{ fill: '#1B2A26' }}>goblet cell</text>
          <text x="980" y="120" textAnchor="end" className="svg-label svg-label--on-dark">mucus + dust</text>
          <text x="980" y="226" textAnchor="end" className="svg-label svg-label--on-dark">cilia</text>
        </svg>
      </div>
      <div className="ride__controls">
        <div className="toggle" role="group" aria-label="Airway type">
          <button type="button" aria-pressed={!smoker} onClick={() => setSmoker(false)}>
            Healthy
          </button>
          <button type="button" aria-pressed={smoker} onClick={() => setSmoker(true)}>
            Smoker
          </button>
        </div>
        {smoker && (
          <button type="button" className="btn btn--ghost-dark btn--sm" onClick={() => setCough(performance.now())}>
            Cough!
          </button>
        )}
        <p className="ride__caption" aria-live="polite">
          {smoker ? 'Smoke flattens the cilia. Mucus piles up, so the only way to clear it is to cough.' : 'Cilia beat in waves, sweeping mucus and dust up toward the throat.'}
        </p>
      </div>
    </div>
  )
}
