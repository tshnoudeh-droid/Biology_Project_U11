import { useState } from 'react'
import { BloodKey, C, Callout, Label } from './parts'
import { Figure, Toggle } from './Figure'
import { useTween } from '../lib/useTween'

function alveolusPath(cx: number, cy: number, R: number, c: number) {
  const pts: string[] = []
  for (let i = 0; i <= 72; i++) {
    const a = (i / 72) * Math.PI * 2
    const r = R * (1 - 0.55 * c) * (1 + c * (0.18 * Math.sin(5 * a + 0.7) + 0.1 * Math.sin(9 * a)))
    pts.push(`${i ? 'L' : 'M'}${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a) * 0.9).toFixed(1)}`)
  }
  return pts.join(' ') + ' Z'
}

export function AlveoliFigure() {
  const [on, setOn] = useState(true)
  const c = useTween(on ? 0 : 1, 1500)
  const cx = 640
  const cy = 210
  const R = 160
  const r = R * (1 - 0.55 * c)
  return (
    <Figure
      controls={<Toggle label="Surfactant" value={on ? 'on' : 'off'} onChange={(v) => setOn(v === 'on')} options={[{ value: 'on', label: 'Surfactant on' }, { value: 'off', label: 'Surfactant off' }]} />}
      caption={
        on
          ? 'Surfactant coats the inside of each alveolus, so it stays open even after you breathe out.'
          : 'Without surfactant, the water lining pulls the walls inward (surface tension) and the alveolus collapses.'
      }
    >
      <svg viewBox="0 0 1000 460" role="img" aria-labelledby="al-t" className="figure-svg">
        <title id="al-t">
          A cluster of alveoli, and a close-up of one alveolus with its thin wall, surfactant lining and a capillary carrying red blood cells.{' '}
          {on ? 'With surfactant the alveolus stays open.' : 'Without surfactant the alveolus collapses.'}
        </title>
        {/* context: bronchiole + cluster */}
        <path d="M150 440 C150 380 156 320 160 270" stroke={C.coralDeep} strokeWidth="18" strokeLinecap="round" fill="none" />
        <path d="M150 440 C150 380 156 320 160 270" stroke={C.blush} strokeWidth="12" strokeLinecap="round" fill="none" />
        {[[160, 230, 36], [118, 196, 30], [204, 192, 32], [160, 160, 26], [112, 246, 24], [210, 244, 26]].map(([x, y, rr], i) => (
          <circle key={i} cx={x} cy={y} r={rr} fill={C.blush} stroke={C.coralDeep} strokeWidth="1.4" />
        ))}
        <path d="M70 280 C110 260 140 280 170 250" stroke={C.blue} strokeWidth="3" fill="none" />
        <path d="M150 250 C190 270 220 260 260 290" stroke={C.coral} strokeWidth="3" fill="none" />
        <path d="M236 200 L470 90" stroke={C.muted} strokeDasharray="4 4" />
        <path d="M236 230 L470 330" stroke={C.muted} strokeDasharray="4 4" />
        <Label x={160} y={110} anchor="middle" bold>Alveoli</Label>
        <Label x={160} y={128} anchor="middle" small>~480 million</Label>

        {/* capillary under the alveolus */}
        <path d={`M440 ${cy + 170} C560 ${cy + 150} 720 ${cy + 150} 860 ${cy + 175}`} stroke={C.coral} strokeWidth="34" fill="none" strokeLinecap="round" opacity="0.4" />
        {[520, 620, 720].map((x) => (
          <ellipse key={x} cx={x} cy={cy + 160} rx="20" ry="9" fill={C.coral} />
        ))}
        {/* alveolus */}
        <path d={alveolusPath(cx, cy, R, c)} fill={C.paper} stroke={C.coralDeep} strokeWidth="5" />
        <path d={alveolusPath(cx, cy, R * 0.93, c)} fill="none" stroke="#E9C46A" strokeWidth="4" strokeDasharray="2 9" strokeLinecap="round" opacity={1 - c} />
        {!on &&
          [0, 60, 120, 180, 240, 300].map((a) => {
            const rad = (a * Math.PI) / 180
            const x1 = cx + Math.cos(rad) * (r + 44)
            const y1 = cy + Math.sin(rad) * (r + 44) * 0.9
            const x2 = cx + Math.cos(rad) * (r + 12)
            const y2 = cy + Math.sin(rad) * (r + 12) * 0.9
            return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.coralDeep} strokeWidth="3" markerEnd="url(#al-arrow)" opacity={c} />
          })}
        <defs>
          <marker id="al-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill={C.coralDeep} />
          </marker>
        </defs>
        <Label x={cx} y={cy + 6} anchor="middle" small>air</Label>
        <Callout at={[cx - r * 0.7, cy - r * 0.64]} to={[460, 40]} label="Thin wall" sub="one cell thick" anchor="end" />
        <Callout at={[cx + r * 0.66, cy - r * 0.6]} to={[870, 60]} label="Surfactant" sub={on ? 'keeps it open' : 'missing!'} />
        <Callout at={[cx + 120, cy + 168]} to={[870, 330]} label="Capillary" sub="red blood cells" />
        <Callout at={[cx + r * 0.95, cy + 10]} to={[870, 200]} label="Alveolus" sub={on ? 'open' : 'collapsed'} />
        <BloodKey x={440} y={430} />
      </svg>
    </Figure>
  )
}
