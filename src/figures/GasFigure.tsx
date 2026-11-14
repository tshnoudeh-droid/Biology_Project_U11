import { useMemo, useRef, useState } from 'react'
import { C, Label } from './parts'
import { Figure, Toggle } from './Figure'
import { useFrame } from '../lib/useFrame'

type Show = 'both' | 'o2' | 'co2'
const MEM = 200
const CAP0 = 232
const CAP1 = 330

export function GasFigure() {
  const [show, setShow] = useState<Show>('both')
  const parts = useMemo(
    () => [
      ...Array.from({ length: 14 }, (_, i) => ({ kind: 'O2' as const, x: 120 + i * 50, y: 60 + (i % 4) * 30, stage: 0, s: i })),
      ...Array.from({ length: 9 }, (_, i) => ({ kind: 'CO2' as const, x: 60 + i * 50, y: CAP0 + 20 + (i % 3) * 25, stage: 0, s: i + 30 })),
    ],
    [],
  )
  const els = useRef<(SVGGElement | null)[]>([])
  const rbc = useRef<SVGGElement | null>(null)
  const t = useRef(0)
  useFrame((dt) => {
    t.current += dt
    parts.forEach((p, i) => {
      if (p.kind === 'O2') {
        if (p.stage === 0) {
          p.y += 50 * dt
          if (p.y > CAP0 + 22 + (i % 4) * 18) p.stage = 1
        } else {
          p.x += 70 * dt
          if (p.x > 960) Object.assign(p, { x: 100 + ((i * 97) % 560), y: 50 + (i % 4) * 30, stage: 0 })
        }
      } else if (p.stage === 0) {
        p.x += 40 * dt
        p.y -= 42 * dt
        if (p.y < 70 + (i % 3) * 25) p.stage = 1
      } else {
        p.y -= 8 * dt
        p.x += 6 * dt
        if (p.y < 30) Object.assign(p, { x: 40 + ((i * 53) % 300), y: CAP0 + 20 + (i % 3) * 25, stage: 0 })
      }
      const el = els.current[i]
      if (el) el.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`)
    })
    if (rbc.current) rbc.current.setAttribute('transform', `translate(${((t.current * 70) % 200).toFixed(1)} 0)`)
  })

  return (
    <Figure
      controls={<Toggle label="Show" value={show} onChange={setShow} options={[{ value: 'both', label: 'Both gases' }, { value: 'o2', label: 'Oxygen' }, { value: 'co2', label: 'Carbon dioxide' }]} />}
      caption={
        show === 'o2'
          ? 'There is more O₂ in the alveolus than in the blood, so O₂ diffuses into the blood and is carried by hemoglobin.'
          : show === 'co2'
            ? 'There is more CO₂ in the blood than in the alveolus, so CO₂ diffuses out and is breathed away.'
            : 'Each gas diffuses from high concentration to low: O₂ into the blood, CO₂ out of it. No energy is needed.'
      }
    >
      <svg viewBox="0 0 1000 400" role="img" aria-labelledby="gx-t" className="figure-svg">
        <title id="gx-t">Gas exchange: oxygen diffuses from the alveolus through the thin wall into the capillary, and carbon dioxide diffuses the other way.</title>
        <defs>
          <linearGradient id="gx-b" x1="0" x2="1">
            <stop offset="0" stopColor={C.blue} />
            <stop offset="0.5" stopColor="#B98BA6" />
            <stop offset="0.8" stopColor={C.coral} />
          </linearGradient>
          <clipPath id="gx-c">
            <rect x="20" y={CAP0} width="960" height={CAP1 - CAP0} rx="40" />
          </clipPath>
        </defs>
        <rect x="20" y="20" width="960" height={MEM - 20} rx="30" fill={C.blush} opacity="0.35" />
        <rect x="20" y={MEM} width="960" height={CAP0 - MEM} fill={C.coral} opacity="0.35" />
        <rect x="20" y={CAP0} width="960" height={CAP1 - CAP0} rx="40" fill="url(#gx-b)" opacity="0.55" />
        <g clipPath="url(#gx-c)">
          <g ref={rbc}>
            {Array.from({ length: 7 }).map((_, i) => (
              <ellipse key={i} cx={-160 + i * 200} cy={CAP0 + 52} rx="32" ry="13" fill={C.coralDeep} opacity="0.35" />
            ))}
          </g>
        </g>
        {parts.map((p, i) => {
          const hidden = (show === 'o2' && p.kind === 'CO2') || (show === 'co2' && p.kind === 'O2')
          return (
            <g key={i} ref={(el) => { els.current[i] = el }} opacity={hidden ? 0.12 : 1}>
              <circle r={p.kind === 'O2' ? 12 : 14} fill={p.kind === 'O2' ? C.paper : C.sage} stroke={p.kind === 'O2' ? C.coralDeep : C.euc} strokeWidth="2" />
              <text y="4" textAnchor="middle" className="figure-gas">{p.kind === 'O2' ? 'O₂' : 'CO₂'}</text>
            </g>
          )
        })}
        <Label x={40} y={50} bold>Alveolus (air)</Label>
        <Label x={40} y={70} small>more O₂, less CO₂</Label>
        <Label x={960} y={MEM + 22} anchor="end" small>thin wall: one cell thick</Label>
        <Label x={40} y={CAP1 + 32} bold>Blood in: low O₂</Label>
        <Label x={960} y={CAP1 + 32} anchor="end" bold>Blood out: high O₂ →</Label>
        <Label x={500} y={CAP1 + 54} anchor="middle" small>Capillary · red blood cells carry O₂ on hemoglobin (up to 4 each)</Label>
      </svg>
    </Figure>
  )
}
