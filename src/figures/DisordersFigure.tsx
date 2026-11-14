import { useState } from 'react'
import { C, Label } from './parts'
import { Figure, Toggle } from './Figure'
import { useTween } from '../lib/useTween'

type Cond = 'asthma' | 'emphysema' | 'nrds'
const info: Record<Cond, { label: string; part: string; healthy: string; sick: string }> = {
  asthma: { label: 'Asthma', part: 'Bronchiole (cross-section)', healthy: 'Healthy bronchiole: relaxed smooth muscle, wide airway.', sick: 'Asthma: the smooth muscle contracts and mucus builds up, so the airway narrows.' },
  emphysema: { label: 'Emphysema', part: 'Alveoli', healthy: 'Healthy alveoli: many small sacs give a huge surface area.', sick: 'Emphysema: alveolar walls break down into a few large sacs, so there is much less surface area for gas exchange.' },
  nrds: { label: 'Premature babies', part: 'One alveolus', healthy: 'Enough surfactant: the alveolus stays open.', sick: 'Not enough surfactant yet: the alveolus collapses after each breath.' },
}

export function DisordersFigure() {
  const [cond, setCond] = useState<Cond>('asthma')
  const [sick, setSick] = useState(false)
  const k = useTween(sick ? 1 : 0, 1100)
  let art
  if (cond === 'asthma')
    art = (
      <g>
        <circle cx="500" cy="210" r="150" fill={C.tissue} stroke={C.euc} />
        <circle cx="500" cy="210" r={112 - 30 * k} fill="none" stroke={C.coralDeep} strokeWidth={14 + 34 * k} strokeDasharray="14 6" />
        <circle cx="500" cy="210" r={94 - 52 * k} fill="#DCE6B8" opacity={k} />
        <circle cx="500" cy="210" r={94 - 64 * k} fill={C.paper} stroke={C.blush} strokeWidth="3" />
      </g>
    )
  else if (cond === 'emphysema')
    art = (
      <g>
        {[[0, 0, 40], [-62, -32, 34], [62, -32, 34], [-40, 52, 32], [40, 52, 32], [0, -84, 30], [-92, 40, 26], [92, 40, 26], [0, 92, 26]].map(([x, y, r], i) => (
          <circle key={i} cx={500 + x} cy={210 + y} r={i < 3 ? r + 44 * k : r * (1 - 0.65 * k)} fill={C.blush} stroke={C.coralDeep} strokeWidth="3" opacity={i < 3 ? 1 : 1 - 0.7 * k} />
        ))}
      </g>
    )
  else {
    const pts: string[] = []
    for (let i = 0; i <= 60; i++) {
      const a = (i / 60) * Math.PI * 2
      const r = (140 - 70 * k) * (1 + k * (0.18 * Math.sin(5 * a) + 0.1 * Math.sin(9 * a)))
      pts.push(`${i ? 'L' : 'M'}${(500 + r * Math.cos(a)).toFixed(1)} ${(210 + r * Math.sin(a)).toFixed(1)}`)
    }
    art = (
      <g>
        <path d={pts.join(' ') + 'Z'} fill={C.paper} stroke={C.coralDeep} strokeWidth="6" />
        <circle cx="500" cy="210" r="128" fill="none" stroke="#E9C46A" strokeWidth="4" strokeDasharray="2 10" opacity={1 - k} />
      </g>
    )
  }
  return (
    <Figure
      controls={
        <>
          <Toggle label="Disorder" value={cond} onChange={(v) => { setCond(v); setSick(false) }} options={(Object.keys(info) as Cond[]).map((c) => ({ value: c, label: info[c].label }))} />
          <Toggle label="Healthy or affected" value={sick ? 'sick' : 'healthy'} onChange={(v) => setSick(v === 'sick')} options={[{ value: 'healthy', label: 'Healthy' }, { value: 'sick', label: 'Affected' }]} />
        </>
      }
      caption={sick ? info[cond].sick : info[cond].healthy}
    >
      <svg viewBox="0 0 1000 420" role="img" aria-labelledby="ds-t" className="figure-svg">
        <title id="ds-t">{`${info[cond].label}: ${sick ? info[cond].sick : info[cond].healthy}`}</title>
        {art}
        <Label x={500} y={404} anchor="middle" bold>
          {info[cond].part} · {sick ? info[cond].label : 'Healthy'}
        </Label>
      </svg>
    </Figure>
  )
}
