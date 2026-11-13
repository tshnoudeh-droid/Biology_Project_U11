import { useMemo, useRef, useState } from 'react'
import { useFrame } from '../lib/useFrame'
import { useTween } from '../lib/useTween'
import { useReducedMotion } from '../lib/useReducedMotion'

const N = 34
const CY = 180
const X0 = 60
const X1 = 940

type Mode = 'normal' | 'asthma'

export function AsthmaRide() {
  const [mode, setMode] = useState<Mode>('normal')
  const [relieved, setRelieved] = useState(false)
  const reduced = useReducedMotion()
  const constricted = mode === 'asthma'
  const c = useTween(constricted ? 1 : 0, 1400)
  const half = 72 - 46 * c // lumen half-height
  const muscle = 14 + 22 * c
  const speed = 210 * Math.pow(half / 72, 2) // slower when narrow

  const parts = useMemo(
    () => Array.from({ length: N }, (_, i) => ({ x: X0 + ((X1 - X0) * i) / N, o: Math.sin(i * 12.9898) * 0.85 })),
    [],
  )
  const refs = useRef<(SVGCircleElement | null)[]>([])
  const halfRef = useRef(half)
  halfRef.current = half
  const speedRef = useRef(speed)
  speedRef.current = speed

  useFrame((dt) => {
    parts.forEach((p, i) => {
      p.x += speedRef.current * dt * (0.8 + 0.4 * Math.abs(p.o))
      if (p.x > X1) p.x = X0
      const el = refs.current[i]
      if (el) {
        el.setAttribute('cx', p.x.toFixed(1))
        el.setAttribute('cy', (CY + p.o * (halfRef.current - 8)).toFixed(1))
      }
    })
  }, !reduced)

  const bands = Array.from({ length: 9 }, (_, i) => 110 + i * 92)

  const caption = constricted
    ? 'Bronchoconstriction: the smooth muscle contracts, the airway wall swells and extra mucus is made. The bronchiole narrows, so resistance rises sharply and less air gets through.'
    : relieved
      ? 'Reliever inhaler used: the bronchodilator relaxes the smooth muscle and the trail reopens. Airflow returns to normal.'
      : 'Normal bronchiole: the smooth muscle is relaxed and air flows freely toward the alveoli.'

  return (
    <div className="ride">
      <div className="ride__stage">
        <svg viewBox="0 0 1000 360" className="ride-svg" role="img" aria-labelledby="asth-t asth-d">
          <title id="asth-t">Asthma Mode: bronchiole cross-section along its length</title>
          <desc id="asth-d">
            {constricted
              ? 'The bronchiole is constricted: thick contracted smooth muscle bands, a mucus layer and a narrow opening. Air particles move slowly.'
              : 'The bronchiole is open: thin relaxed smooth muscle bands and a wide opening. Air particles move quickly.'}
          </desc>
          {/* wall tissue */}
          <rect x="30" y={CY - half - muscle - 26} width="940" height={26} rx="10" fill="#36574F" />
          <rect x="30" y={CY + half + muscle} width="940" height={26} rx="10" fill="#36574F" />
          {/* smooth muscle bands */}
          {bands.map((x) => (
            <g key={x}>
              <rect x={x - 30} y={CY - half - muscle} width="60" height={muscle} rx="6" fill="#B84A35" />
              <rect x={x - 30} y={CY + half} width="60" height={muscle} rx="6" fill="#B84A35" />
            </g>
          ))}
          {/* epithelium */}
          <rect x="30" y={CY - half - 6} width="940" height="6" fill="#F4D5CC" />
          <rect x="30" y={CY + half} width="940" height="6" fill="#F4D5CC" />
          {/* mucus */}
          <rect x="30" y={CY - half} width="940" height={10 * c} fill="#DCE6B8" opacity={c} />
          <rect x="30" y={CY + half - 10 * c} width="940" height={10 * c} fill="#DCE6B8" opacity={c} />
          {/* lumen */}
          <rect x="30" y={CY - half + 10 * c} width="940" height={Math.max(4, 2 * half - 20 * c)} fill="rgba(251,252,251,0.06)" />
          {/* air particles */}
          {parts.map((p, i) => (
            <circle key={i} ref={(el) => { refs.current[i] = el }} cx={p.x} cy={CY + p.o * (half - 8)} r="6" fill="#FBFCFB" opacity="0.9" />
          ))}
          <text x="40" y="30" className="svg-label svg-label--on-dark">Air flow →</text>
          <text x="960" y="30" textAnchor="end" className="svg-label svg-label--on-dark">toward the alveoli</text>
          <text x="40" y="350" className="svg-label svg-label--sm svg-label--on-dark">Red bands = smooth muscle · white dots = air · pale green = mucus</text>
        </svg>
      </div>
      <div className="ride__controls">
        <div className="toggle" role="group" aria-label="Bronchiole state">
          <button type="button" aria-pressed={!constricted} onClick={() => setMode('normal')}>
            Normal
          </button>
          <button type="button" aria-pressed={constricted} onClick={() => { setMode('asthma'); setRelieved(false) }}>
            Asthma mode
          </button>
        </div>
        <button
          type="button"
          className="btn btn--ghost-dark btn--sm"
          disabled={!constricted}
          onClick={() => { setMode('normal'); setRelieved(true) }}
        >
          Use reliever inhaler
        </button>
        <dl className="readout">
          <div>
            <dt>Airway opening</dt>
            <dd>{Math.round((half / 72) * 100)}%</dd>
          </div>
          <div>
            <dt>Airflow</dt>
            <dd>
              <span className="meter"><span style={{ width: `${Math.round(Math.pow(half / 72, 2) * 100)}%` }} /></span>
            </dd>
          </div>
        </dl>
        <p className="ride__caption" aria-live="polite">{caption}</p>
      </div>
    </div>
  )
}
