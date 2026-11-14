import { useMemo, useRef, useState } from 'react'
import { useFrame } from '../lib/useFrame'
import { useTween } from '../lib/useTween'
import { useReducedMotion } from '../lib/useReducedMotion'

const AIR: [number, number][] = [[120, 120], [330, 120], [460, 160], [470, 300], [430, 380], [430, 470]]
function along(pts: [number, number][], f: number): [number, number] {
  const seg = pts.length - 1
  const s = Math.min(seg - 1e-6, Math.max(0, f * seg))
  const i = Math.floor(s)
  const k = s - i
  return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k]
}

/** Breathe vs swallow: the epiglottis covers the larynx and breathing pauses. */
export function SwallowRide() {
  const [swallow, setSwallow] = useState(false)
  const reduced = useReducedMotion()
  const k = useTween(swallow ? 1 : 0, 700)
  const parts = useMemo(() => Array.from({ length: 10 }, (_, i) => ({ f: i / 10 })), [])
  const dots = useRef<(SVGCircleElement | null)[]>([])
  const bolus = useRef<SVGGElement | null>(null)
  const swallowRef = useRef(swallow)
  swallowRef.current = swallow
  const food = useRef(0)

  useFrame((dt) => {
    const sw = swallowRef.current
    parts.forEach((p, i) => {
      if (!sw) p.f = (p.f + dt * 0.28) % 1
      const [x, y] = along(AIR, p.f)
      const el = dots.current[i]
      if (el) {
        el.setAttribute('cx', x.toFixed(1))
        el.setAttribute('cy', y.toFixed(1))
      }
    })
    food.current = sw ? Math.min(1, food.current + dt * 0.45) : 0
    const f = food.current
    const FOOD: [number, number][] = [[250, 250], [400, 250], [500, 300], [530, 400], [530, 480]]
    const [fx, fy] = along(FOOD, f)
    if (bolus.current) {
      bolus.current.setAttribute('transform', `translate(${fx} ${fy})`)
      bolus.current.setAttribute('opacity', sw && f < 1 ? '1' : '0')
    }
  }, !reduced)

  const epi = -70 + 70 * k // degrees: up when breathing, down over the larynx when swallowing
  return (
    <div className="ride">
      <div className="ride__stage">
        <svg viewBox="0 0 700 520" className="ride-svg" role="img" aria-label={swallow ? 'Swallowing: the epiglottis covers the larynx, food goes to the esophagus and breathing pauses.' : 'Breathing: the epiglottis is up and air flows into the larynx.'}>
          {/* head outline */}
          <path d="M60 40 L420 40 C520 40 560 120 560 200 L560 520 L380 520 L380 330 C330 320 280 300 250 270 L60 270 Z" fill="#24403A" />
          {/* nose + mouth cavities */}
          <rect x="80" y="95" width="360" height="55" rx="27" fill="#36574F" />
          <rect x="120" y="225" width="300" height="50" rx="25" fill="#36574F" />
          {/* throat */}
          <path d="M440 95 L500 95 L500 300 L560 420 L560 520 L500 520 L500 420 L460 420 L460 520 L400 520 L400 380 L440 300 Z" fill="#36574F" />
          {/* windpipe + esophagus labels */}
          <text x="430" y="510" textAnchor="middle" className="svg-label svg-label--sm svg-label--on-dark">to lungs</text>
          <text x="530" y="510" textAnchor="middle" className="svg-label svg-label--sm svg-label--on-dark">to stomach</text>
          {/* soft palate lifts when swallowing */}
          <path d={`M420 ${150 - 10 * k} Q450 ${175 - 30 * k} 470 ${200 - 50 * k}`} stroke="#E3735E" strokeWidth="10" strokeLinecap="round" fill="none" />
          {/* epiglottis */}
          <g transform={`rotate(${epi} 470 360)`}>
            <path d="M470 360 L470 300" stroke="#F4D5CC" strokeWidth="14" strokeLinecap="round" />
          </g>
          {/* air */}
          {parts.map((_p, i) => (
            <circle key={i} ref={(el) => { dots.current[i] = el }} r="9" fill="#FBFCFB" opacity={swallow ? 0.35 : 0.95} />
          ))}
          {/* food */}
          <g ref={bolus} opacity="0">
            <ellipse rx="22" ry="16" fill="#E9C46A" stroke="#1B2A26" strokeWidth="2" />
          </g>
          <text x="440" y="340" textAnchor="end" className="svg-label svg-label--on-dark svg-label--bold">Epiglottis</text>
          <text x="80" y="80" className="svg-label svg-label--sm svg-label--on-dark">nose</text>
          <text x="120" y="215" className="svg-label svg-label--sm svg-label--on-dark">mouth</text>
          {swallow && (
            <text x="70" y="330" className="svg-label svg-label--on-dark svg-label--bold" style={{ fill: '#E3735E' }}>
              Breathing paused
            </text>
          )}
        </svg>
      </div>
      <div className="ride__controls">
        <div className="toggle" role="group" aria-label="Breathe or swallow">
          <button type="button" aria-pressed={!swallow} onClick={() => setSwallow(false)}>
            Breathe
          </button>
          <button type="button" aria-pressed={swallow} onClick={() => setSwallow(true)}>
            Swallow
          </button>
        </div>
        <p className="ride__caption" aria-live="polite">
          {swallow ? 'The epiglottis flips down over the larynx. Food slides into the esophagus, and breathing pauses for a moment.' : 'The epiglottis is up. Air flows down the throat into the larynx.'}
        </p>
      </div>
    </div>
  )
}
