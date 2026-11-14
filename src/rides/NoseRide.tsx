import { useMemo, useRef, useState } from 'react'
import { useFrame } from '../lib/useFrame'
import { useReducedMotion } from '../lib/useReducedMotion'

type Route = 'nose' | 'mouth'
type P = { x: number; y: number; dust: boolean; stuck: number | null; seed: number }

const X0 = 70
const X1 = 900
const lerpColor = (a: number[], b: number[], k: number) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(',')})`
const COLD = [127, 167, 217]
const WARM = [227, 115, 94]

/** Nose vs mouth breathing: the nose cleans, warms and moistens the air; the mouth doesn’t. */
export function NoseRide() {
  const [route, setRoute] = useState<Route>('nose')
  const reduced = useReducedMotion()
  const parts = useMemo<P[]>(() => Array.from({ length: 26 }, (_, i) => ({ x: X0 + (i * (X1 - X0)) / 26, y: 0, dust: i % 4 === 0, stuck: null, seed: i * 1.7 })), [])
  const dots = useRef<(SVGCircleElement | null)[]>([])
  const routeRef = useRef(route)
  routeRef.current = route

  useFrame((dt, t) => {
    const nose = routeRef.current === 'nose'
    const cy = nose ? 150 : 290
    parts.forEach((p, i) => {
      if (p.stuck !== null && nose) {
        // dust caught in the mucus on the conchae
      } else {
        p.stuck = null
        p.x += (nose ? 150 : 190) * dt
        if (nose && p.dust && p.x > 300 + (i % 3) * 120) p.stuck = p.x
        if (p.x > X1) {
          p.x = X0
          p.stuck = null
        }
      }
      const wobble = nose ? Math.sin(p.x / 40 + p.seed) * 34 : Math.sin(p.seed + t) * 10
      const y = p.stuck !== null ? cy + (i % 2 ? -52 : 52) : cy + wobble
      const el = dots.current[i]
      if (!el) return
      el.setAttribute('cx', (p.stuck ?? p.x).toFixed(1))
      el.setAttribute('cy', y.toFixed(1))
      const k = nose ? Math.min(1, Math.max(0, (p.x - 250) / 450)) : 0
      el.setAttribute('fill', p.dust ? '#5A6B65' : lerpColor(COLD, WARM, k))
    })
  }, !reduced)

  const nose = route === 'nose'
  const checks = [
    ['Cleaned', nose],
    ['Warmed', nose],
    ['Moistened', nose],
  ] as const

  return (
    <div className="ride">
      <div className="ride__stage">
        <svg viewBox="0 0 1000 380" className="ride-svg" role="img" aria-label={nose ? 'Air going through the nose: dust gets trapped and the air turns warm.' : 'Air going through the mouth: dust gets through and the air stays cold.'}>
          {/* nose route */}
          <g opacity={nose ? 1 : 0.3}>
            <rect x="60" y="90" width="850" height="120" rx="60" fill="#36574F" />
            {[260, 440, 620].map((x, i) => (
              <path key={x} d={`M${x} 90 q60 ${i % 2 ? 50 : 40} 120 0`} fill="#F4D5CC" />
            ))}
            {[350, 530].map((x) => (
              <path key={x} d={`M${x} 210 q60 -44 120 0`} fill="#F4D5CC" />
            ))}
            <text x="60" y="70" className="svg-label svg-label--on-dark svg-label--bold">Through the nose</text>
          </g>
          {/* mouth route */}
          <g opacity={nose ? 0.3 : 1}>
            <rect x="60" y="250" width="850" height="80" rx="40" fill="#36574F" />
            <text x="60" y="366" className="svg-label svg-label--on-dark svg-label--bold">Through the mouth</text>
          </g>
          {parts.map((p, i) => (
            <circle key={i} ref={(el) => { dots.current[i] = el }} cx={p.x} cy={nose ? 150 : 290} r={p.dust ? 6 : 9} fill={p.dust ? '#5A6B65' : '#7FA7D9'} />
          ))}
          <g className="ride-legend">
            <circle cx="640" cy="30" r="8" fill="#7FA7D9" />
            <text x="654" y="35" className="svg-label svg-label--sm svg-label--on-dark">cold air</text>
            <circle cx="744" cy="30" r="8" fill="#E3735E" />
            <text x="758" y="35" className="svg-label svg-label--sm svg-label--on-dark">warm air</text>
            <circle cx="850" cy="30" r="6" fill="#5A6B65" stroke="#C9D6CF" />
            <text x="862" y="35" className="svg-label svg-label--sm svg-label--on-dark">dust</text>
          </g>
        </svg>
      </div>
      <div className="ride__controls">
        <div className="toggle" role="group" aria-label="Breathing route">
          <button type="button" aria-pressed={nose} onClick={() => setRoute('nose')}>
            Nose
          </button>
          <button type="button" aria-pressed={!nose} onClick={() => setRoute('mouth')}>
            Mouth
          </button>
        </div>
        <ul className="checklist" aria-live="polite">
          {checks.map(([label, ok]) => (
            <li key={label} className={ok ? 'is-yes' : 'is-no'}>
              <span aria-hidden="true">{ok ? '✓' : '✕'}</span> {label}
            </li>
          ))}
        </ul>
        <p className="ride__caption">{nose ? 'The conchae swirl the air: dust sticks to mucus, and the air warms up.' : 'Air rushes straight in: dusty, cold and dry.'}</p>
      </div>
    </div>
  )
}
