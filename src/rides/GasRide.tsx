import { useMemo, useRef, useState } from 'react'
import { useFrame } from '../lib/useFrame'
import { useReducedMotion } from '../lib/useReducedMotion'

const MEM_Y = 200 // respiratory membrane
const CAP_TOP = 236
const CAP_BOT = 340
const BLOOD_V = 70

type P = { kind: 'O2' | 'CO2'; x: number; y: number; stage: number; seed: number }

function spawn(kind: 'O2' | 'CO2', seed: number): P {
  const r = (n: number) => (Math.sin(seed * 91.3 + n * 17.7) + 1) / 2
  if (kind === 'O2') return { kind, x: 120 + r(1) * 520, y: 60 + r(2) * 110, stage: 0, seed }
  return { kind, x: 40 + r(3) * 260, y: CAP_TOP + 14 + r(4) * (CAP_BOT - CAP_TOP - 28), stage: 0, seed }
}

const co2Breakdown = [
  { key: 'bicarb', pct: 70, label: 'As bicarbonate', short: '~70%', color: '#E3735E', text: 'Most CO₂ reacts with water in your red blood cells and travels in the plasma as bicarbonate (HCO₃⁻). In the lungs it turns back into CO₂ and is breathed out.' },
  { key: 'carbamino', pct: 20, label: 'On hemoglobin', short: '~20%', color: '#F4D5CC', text: 'Some CO₂ hitches a ride on hemoglobin, the same protein that carries oxygen.' },
  { key: 'dissolved', pct: 10, label: 'Dissolved', short: '~10%', color: '#8FB3A6', text: 'A little CO₂ simply dissolves in the liquid part of the blood (plasma).' },
]

export function GasRide() {
  const reduced = useReducedMotion()
  const [showPP, setShowPP] = useState(true)
  const [picked, setPicked] = useState('bicarb')
  const parts = useMemo<P[]>(
    () => [...Array.from({ length: 16 }, (_, i) => spawn('O2', i + 1)), ...Array.from({ length: 10 }, (_, i) => spawn('CO2', i + 40))],
    [],
  )
  const refs = useRef<(SVGGElement | null)[]>([])
  const rbcRef = useRef<SVGGElement | null>(null)
  const tRef = useRef(0)

  useFrame((dt) => {
    tRef.current += dt
    parts.forEach((p, i) => {
      p.seed += dt
      const wob = Math.sin(p.seed * 3 + i) * 12 * dt
      if (p.kind === 'O2') {
        if (p.stage === 0) {
          p.y += 46 * dt
          p.x += wob
          if (p.y > CAP_TOP + 18 + (i % 5) * 14) p.stage = 1
        } else {
          p.x += BLOOD_V * dt
          if (p.x > 980) Object.assign(p, spawn('O2', p.seed))
        }
      } else {
        if (p.stage === 0) {
          p.x += BLOOD_V * 0.6 * dt
          p.y -= 40 * dt
          if (p.y < 70 + (i % 4) * 20) p.stage = 1
        } else {
          p.x += wob + 10 * dt
          p.y -= 6 * dt
          if (p.y < 30 || p.x > 900) Object.assign(p, spawn('CO2', p.seed))
        }
      }
      const el = refs.current[i]
      if (el) el.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`)
    })
    if (rbcRef.current) rbcRef.current.setAttribute('transform', `translate(${((tRef.current * BLOOD_V) % 200).toFixed(1)} 0)`)
  }, !reduced)

  const sel = co2Breakdown.find((b) => b.key === picked)!

  return (
    <div className="ride ride--stack">
      <div className="ride__row">
        <div className="ride__stage">
          <svg viewBox="0 0 1000 400" className="ride-svg" role="img" aria-labelledby="gx-t gx-d">
            <title id="gx-t">Gas exchange between an alveolus and a capillary</title>
            <desc id="gx-d">
              Oxygen particles diffuse from the alveolus across the thin respiratory membrane into the capillary blood, where they are carried
              away. Carbon dioxide particles diffuse from the blood up into the alveolus. Blood arrives oxygen-poor on the left (blue) and
              leaves oxygen-rich on the right (red).
              {showPP ? ' The alveolus has more oxygen; the arriving blood has more carbon dioxide.' : ''}
            </desc>
            <defs>
              <linearGradient id="gx-blood" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#7FA7D9" />
                <stop offset="45%" stopColor="#B98BA6" />
                <stop offset="70%" stopColor="#E3735E" />
                <stop offset="100%" stopColor="#E3735E" />
              </linearGradient>
              <clipPath id="gx-cap">
                <rect x="20" y={CAP_TOP} width="960" height={CAP_BOT - CAP_TOP} rx="40" />
              </clipPath>
            </defs>
            {/* alveolus air space */}
            <rect x="20" y="20" width="960" height={MEM_Y - 20} rx="40" fill="rgba(244,213,204,0.12)" stroke="#F4D5CC" strokeOpacity="0.4" />
            <text x="44" y="52" className="svg-label svg-label--on-dark svg-label--bold">Alveolus (air)</text>
            {/* membrane */}
            <rect x="20" y={MEM_Y} width="960" height={CAP_TOP - MEM_Y} fill="#36574F" />
            <text x="980" y={MEM_Y + 23} textAnchor="end" className="svg-label svg-label--sm svg-label--on-dark">thin wall (one cell thick)</text>
            {/* capillary */}
            <rect x="20" y={CAP_TOP} width="960" height={CAP_BOT - CAP_TOP} rx="40" fill="url(#gx-blood)" opacity="0.55" />
            <g clipPath="url(#gx-cap)">
              <g ref={rbcRef}>
                {Array.from({ length: 7 }).map((_, i) => (
                  <ellipse key={i} cx={-160 + i * 200} cy={CAP_TOP + 52 + (i % 2) * 14} rx="34" ry="14" fill="rgba(27,42,38,0.25)" stroke="rgba(251,252,251,0.35)" />
                ))}
              </g>
            </g>
            <text x="44" y={CAP_BOT + 30} className="svg-label svg-label--on-dark svg-label--bold">Blood in: low oxygen</text>
            <text x="956" y={CAP_BOT + 30} textAnchor="end" className="svg-label svg-label--on-dark svg-label--bold">Blood out: full of oxygen →</text>
            <text x="500" y={CAP_BOT + 54} textAnchor="middle" className="svg-label svg-label--sm svg-label--on-dark">Capillary · blue = low oxygen, red = full of oxygen</text>

            {/* particles */}
            {parts.map((p, i) => (
              <g key={i} ref={(el) => { refs.current[i] = el }} transform={`translate(${p.x} ${p.y})`}>
                <circle r={p.kind === 'O2' ? 14 : 17} fill={p.kind === 'O2' ? '#FBFCFB' : '#1B2A26'} stroke={p.kind === 'O2' ? '#E3735E' : '#8FB3A6'} strokeWidth="2.5" />
                <text y="4" textAnchor="middle" className="gx-particle" style={{ fill: p.kind === 'O2' ? '#B84A35' : '#C9D6CF' }}>
                  {p.kind === 'O2' ? 'O₂' : 'CO₂'}
                </text>
              </g>
            ))}

            {showPP && (
              <g className="gx-pp">
                <rect x="690" y="40" width="270" height="140" rx="16" fill="rgba(27,42,38,0.85)" />
                <text x="708" y="66" className="svg-label svg-label--on-dark svg-label--bold">Where is there more?</text>
                <text x="708" y="94" className="svg-label svg-label--sm svg-label--on-dark">Alveolus: lots of O₂, little CO₂</text>
                <text x="708" y="118" className="svg-label svg-label--sm svg-label--on-dark">Blood arriving: little O₂, lots of CO₂</text>
                <text x="708" y="146" className="svg-label svg-label--sm" style={{ fill: '#F4D5CC' }}>O₂ moves down into the blood ↓</text>
                <text x="708" y="168" className="svg-label svg-label--sm" style={{ fill: '#8FB3A6' }}>CO₂ moves up into the alveolus ↑</text>
              </g>
            )}
          </svg>
        </div>
        <div className="ride__controls">
          <button type="button" className="btn btn--ghost-dark btn--sm" aria-pressed={showPP} onClick={() => setShowPP((s) => !s)}>
            {showPP ? 'Hide' : 'Show'} where there’s more
          </button>
          <p className="ride__caption">
            Each gas moves from where there’s <strong>more</strong> to where there’s <strong>less</strong>. That’s{' '}
            <strong>diffusion</strong>, and it needs no energy.
          </p>
          <div className="o2-bar" aria-label="How oxygen is carried: about 98.5 percent bound to hemoglobin, 1.5 percent dissolved">
            <span className="o2-bar__label">How O₂ travels</span>
            <span className="o2-bar__track">
              <span style={{ width: '98.5%' }}>98.5% on hemoglobin</span>
              <span style={{ width: '1.5%' }} />
            </span>
            <span className="o2-bar__note">1.5% dissolved · up to 4 O₂ per hemoglobin</span>
          </div>
        </div>
      </div>

      <div className="co2-breakdown">
        <h3>How CO₂ travels back to the lungs</h3>
        <p className="ride__hint">Select a section to learn more.</p>
        <div className="co2-bar" role="group" aria-label="Carbon dioxide transport">
          {co2Breakdown.map((b) => (
            <button
              key={b.key}
              type="button"
              className="co2-bar__seg"
              style={{ flexGrow: b.pct, background: b.color }}
              aria-pressed={picked === b.key}
              onClick={() => setPicked(b.key)}
            >
              <span className="co2-bar__pct">{b.short}</span>
              <span className="co2-bar__name">{b.label}</span>
            </button>
          ))}
        </div>
        <div className="co2-detail" aria-live="polite">
          <strong>{sel.label} · {sel.short}</strong>
          <p>{sel.text}</p>
        </div>
      </div>
    </div>
  )
}
