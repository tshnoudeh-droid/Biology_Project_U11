import { useRef, useState } from 'react'
import { C, Callout, Label } from './parts'
import { Figure, Toggle } from './Figure'
import { useFrame } from '../lib/useFrame'

type Level = 'low' | 'normal' | 'high'
const RATE: Record<Level, number> = { low: 10, normal: 15, high: 26 }

export function ControlFigure() {
  const [level, setLevel] = useState<Level>('normal')
  const rate = RATE[level]
  const rateRef = useRef(rate)
  rateRef.current = rate
  const t = useRef(0)
  const pulses = useRef<(SVGCircleElement | null)[]>([])
  const dome = useRef<SVGPathElement | null>(null)
  useFrame((dt) => {
    t.current += dt
    const hz = rateRef.current / 60
    pulses.current.forEach((el, i) => {
      if (!el) return
      const k = (t.current * hz * 1.6 + i / 3) % 1
      el.setAttribute('cy', (330 + k * 140).toFixed(1))
      el.setAttribute('opacity', (1 - k * 0.6).toFixed(2))
    })
    const b = (Math.sin(t.current * hz * Math.PI * 2) + 1) / 2
    if (dome.current) dome.current.setAttribute('d', `M300 ${505 - 6 * b} C360 ${440 + 40 * b} 520 ${440 + 40 * b} 580 ${505 - 6 * b}`)
  })

  return (
    <Figure
      controls={<Toggle label="Blood CO₂ level" value={level} onChange={setLevel} options={[{ value: 'low', label: 'Low CO₂' }, { value: 'normal', label: 'Normal CO₂' }, { value: 'high', label: 'High CO₂ (exercise)' }]} />}
      caption={
        level === 'high'
          ? 'Chemoreceptors detect the extra CO₂, so the medulla oblongata sends faster signals: breathing speeds up and gets deeper.'
          : level === 'low'
            ? 'CO₂ is low, so the medulla sends signals less often and breathing slows down.'
            : 'The medulla oblongata sends steady signals to the diaphragm and intercostal muscles: calm breathing.'
      }
    >
      <svg viewBox="0 0 1000 540" role="img" aria-labelledby="ct-t" className="figure-svg">
        <title id="ct-t">The medulla oblongata in the brainstem sends nerve signals to the diaphragm. Chemoreceptors sense CO₂. Breathing rate: {rate} per minute.</title>
        {/* head + brain */}
        <path d="M300 40 C420 30 520 80 540 190 C552 250 530 300 500 330 L500 400 L330 400 L320 360 C280 360 250 340 246 310 C220 300 226 280 236 266 C214 254 224 236 238 228 C212 210 200 160 220 120 C240 70 270 46 300 40 Z" fill={C.tissue} stroke={C.euc} strokeWidth="2" />
        <path d="M270 120 C290 70 380 50 450 80 C510 110 524 170 500 210 C470 236 420 230 380 226 C330 222 280 200 270 170 Z" fill={C.blush} fillOpacity="0.55" stroke={C.coralDeep} strokeWidth="1.5" />
        <path d="M440 236 C470 222 510 230 512 258 C512 282 480 292 452 282 C436 272 430 250 440 236 Z" fill={C.sage} fillOpacity="0.7" stroke={C.euc} strokeWidth="1.5" />
        <path d="M392 224 C400 230 416 236 424 234 L430 268 C440 290 438 320 428 340 L420 400 L404 400 L400 340 C388 320 384 290 392 268 Z" fill={C.coral} fillOpacity="0.75" stroke={C.coralDeep} strokeWidth="1.5" />
        {/* nerve to diaphragm */}
        <path d="M412 330 L412 470" stroke={C.coralDeep} strokeWidth="5" />
        {[0, 1, 2].map((i) => (
          <circle key={i} ref={(el) => { pulses.current[i] = el }} cx="412" cy="330" r="9" fill={C.coral} />
        ))}
        <path ref={dome} d="M300 505 C360 460 520 460 580 505" stroke={C.coral} strokeWidth="12" fill="none" strokeLinecap="round" />
        {/* CO₂ sensors in neck + chest */}
        <path d="M352 540 C350 480 352 430 360 380" stroke={C.coral} strokeWidth="8" fill="none" opacity="0.6" />
        <circle cx="358" cy="400" r="9" fill={C.euc} />
        <circle cx="404" cy="306" r="7" fill={C.euc} />

        <Label x={380} y={150} anchor="middle" small>Cerebrum</Label>
        <Callout at={[410, 250]} to={[620, 140]} label="Pons" sub="helps adjust breathing" />
        <Callout at={[410, 300]} to={[620, 220]} label="Medulla oblongata" sub="breathing control centre" />
        <Callout at={[404, 306]} to={[620, 300]} label="Chemoreceptors" sub="sense CO₂ (in the brainstem," />
        <Label x={620} y={336} small>neck and chest)</Label>
        <Callout at={[412, 420]} to={[620, 410]} label="Nerve signals" sub="to the diaphragm + intercostals" />
        <Callout at={[540, 488]} to={[620, 490]} label="Diaphragm" />
        <g transform="translate(830 60)">
          <rect width="150" height="120" rx="16" fill={C.paper} stroke={C.line} />
          <text x="75" y="64" textAnchor="middle" className="figure-big">{rate}</text>
          <text x="75" y="94" textAnchor="middle" className="svg-label svg-label--sm">breaths / minute</text>
        </g>
      </svg>
    </Figure>
  )
}
