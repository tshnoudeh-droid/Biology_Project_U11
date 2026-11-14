import { useMemo, useRef, useState } from 'react'
import { C, Callout, Label } from './parts'
import { Figure, Toggle } from './Figure'
import { useFrame } from '../lib/useFrame'
import { useTween } from '../lib/useTween'

const CY = 210
const X0 = 50
const X1 = 660

export function BronchiolesFigure() {
  const [asthma, setAsthma] = useState(false)
  const [relieved, setRelieved] = useState(false)
  const c = useTween(asthma ? 1 : 0, 1300)
  const half = 66 - 40 * c
  const muscle = 12 + 20 * c
  const speedRef = useRef(1)
  speedRef.current = Math.pow(half / 66, 2)
  const halfRef = useRef(half)
  halfRef.current = half
  const parts = useMemo(() => Array.from({ length: 26 }, (_, i) => ({ x: X0 + ((X1 - X0) * i) / 26, o: Math.sin(i * 12.99) * 0.8 })), [])
  const els = useRef<(SVGCircleElement | null)[]>([])
  useFrame((dt) => {
    parts.forEach((p, i) => {
      p.x += 200 * speedRef.current * dt * (0.8 + 0.4 * Math.abs(p.o))
      if (p.x > X1 + 60) p.x = X0
      const el = els.current[i]
      if (el) {
        el.setAttribute('cx', p.x.toFixed(1))
        el.setAttribute('cy', (CY + p.o * (halfRef.current - 8)).toFixed(1))
      }
    })
  })
  const bands = Array.from({ length: 7 }, (_, i) => 100 + i * 82)
  const caption = asthma
    ? 'Asthma attack: the smooth muscle contracts and extra mucus is made. The airway narrows, so much less air reaches the alveoli.'
    : relieved
      ? 'An inhaler relaxes the smooth muscle, so the bronchiole opens back up.'
      : 'Normal: the smooth muscle is relaxed and air flows freely toward the alveoli.'

  return (
    <Figure
      controls={
        <>
          <Toggle label="Bronchiole" value={asthma ? 'asthma' : 'normal'} onChange={(v) => { setAsthma(v === 'asthma'); setRelieved(false) }} options={[{ value: 'normal', label: 'Normal' }, { value: 'asthma', label: 'Asthma attack' }]} />
          <button type="button" className="btn btn--ghost btn--sm" disabled={!asthma} onClick={() => { setAsthma(false); setRelieved(true) }}>
            Use inhaler
          </button>
        </>
      }
      caption={caption}
    >
      <svg viewBox="0 0 1000 420" role="img" aria-labelledby="bl-t" className="figure-svg">
        <title id="bl-t">
          A bronchiole with smooth muscle in its wall leading to alveoli, and a cross-section. {asthma ? 'During an asthma attack the muscle squeezes and mucus narrows the airway.' : 'The airway is open.'}
        </title>
        {/* wall */}
        <rect x={X0 - 10} y={CY - half - muscle - 20} width={X1 - X0 + 20} height="20" rx="8" fill={C.tissue} stroke={C.euc} />
        <rect x={X0 - 10} y={CY + half + muscle} width={X1 - X0 + 20} height="20" rx="8" fill={C.tissue} stroke={C.euc} />
        {bands.map((x) => (
          <g key={x}>
            <rect x={x - 26} y={CY - half - muscle} width="52" height={muscle} rx="5" fill={C.coralDeep} />
            <rect x={x - 26} y={CY + half} width="52" height={muscle} rx="5" fill={C.coralDeep} />
          </g>
        ))}
        <rect x={X0 - 10} y={CY - half} width={X1 - X0 + 20} height={8 * c + 0.01} fill="#DCE6B8" />
        <rect x={X0 - 10} y={CY + half - 8 * c} width={X1 - X0 + 20} height={8 * c + 0.01} fill="#DCE6B8" />
        {/* alveoli at the end */}
        {[[720, 210, 34], [760, 168, 28], [760, 252, 28], [800, 210, 26], [712, 150, 20], [712, 270, 20]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={C.blush} stroke={C.coralDeep} strokeWidth="1.5" />
        ))}
        {parts.map((_p, i) => (
          <circle key={i} ref={(el) => { els.current[i] = el }} r="6" fill={C.coral} />
        ))}
        {/* cross-section */}
        <g transform="translate(910 210)">
          <circle r="76" fill={C.tissue} stroke={C.euc} />
          <circle r={58 - 20 * c} fill="none" stroke={C.coralDeep} strokeWidth={12 + 22 * c} strokeDasharray="10 4" />
          <circle r={48 - 30 * c} fill="#DCE6B8" opacity={c} />
          <circle r={48 - 36 * c} fill={C.paper} stroke={C.blush} strokeWidth="3" />
        </g>
        <Label x={910} y={312} anchor="middle" bold>Cross-section</Label>
        <Label x={X0} y={36} small>Air flow →</Label>
        <Callout at={[182, CY - half - muscle / 2]} to={[240, 40]} label="Smooth muscle" sub={asthma ? 'contracted' : 'relaxed'} />
        <Callout at={[420, CY]} to={[440, 380]} label="Airway" sub={asthma ? 'narrow: less air' : 'wide open'} anchor="middle" />
        <Callout at={[760, 252]} to={[700, 380]} label="Alveoli" anchor="middle" />
        {asthma && <Callout at={[560, CY + half - 4]} to={[600, 40]} label="Extra mucus" />}
      </svg>
    </Figure>
  )
}
