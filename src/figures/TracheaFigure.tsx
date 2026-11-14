import { useMemo, useRef, useState } from 'react'
import { Arrowheads, C, Callout, Label, PanelTitle } from './parts'
import { Figure, Toggle } from './Figure'
import { useFrame } from '../lib/useFrame'
import { useTween } from '../lib/useTween'

/** Animated close-up of the lining: cilia sweep mucus toward the pharynx (healthy) or lie flat (smoker). */
function CiliaPanel({ smoker }: { smoker: boolean }) {
  const k = useTween(smoker ? 1 : 0, 900)
  const smokerRef = useRef(smoker)
  smokerRef.current = smoker
  const cells = 7
  const w = 240
  const cw = w / cells
  const cil = useRef<(SVGPathElement | null)[]>([])
  const dust = useMemo(() => [20, 80, 140, 200].map((x) => ({ x })), [])
  const dustEls = useRef<(SVGCircleElement | null)[]>([])
  const t = useRef(0)
  useFrame((dt) => {
    t.current += dt
    const sm = smokerRef.current
    cil.current.forEach((el, i) => {
      if (!el) return
      const x = 6 + (i * (w - 12)) / 29
      const a = sm ? 70 : Math.sin(t.current * 8 - i * 0.45) * 30
      el.setAttribute('transform', `rotate(${a.toFixed(1)} ${x.toFixed(1)} 74)`)
    })
    dust.forEach((d, i) => {
      if (!sm) d.x -= 40 * dt
      if (d.x < 4) d.x = w - 6
      const el = dustEls.current[i]
      if (el) el.setAttribute('cx', d.x.toFixed(1))
    })
  })
  return (
    <g transform="translate(830 110)">
      <PanelTitle x={0} y={0}>Lining close-up</PanelTitle>
      <path d={`M${w - 20} 16 L20 16`} stroke={C.coralDeep} strokeWidth="2.2" markerEnd="url(#tr-coral)" fill="none" opacity={1 - k} />
      <rect x="0" y={44 - 14 * k} width={w} height={26 + 14 * k} rx="8" fill="#EAF0D8" stroke="#B5C48F" />
      {dust.map((d, i) => (
        <circle key={i} ref={(el) => { dustEls.current[i] = el }} cx={d.x} cy={56 - 6 * k} r={4 + 2 * k} fill={C.muted} />
      ))}
      {Array.from({ length: 30 }).map((_, i) => {
        const x = 6 + (i * (w - 12)) / 29
        const goblet = Math.floor(i / (30 / cells)) === 3
        return goblet ? null : (
          <path key={i} ref={(el) => { cil.current[i] = el }} d={`M${x} 74 l0 ${-14 + 6 * k}`} stroke={smoker ? '#9AA59F' : C.euc} strokeWidth="2.2" strokeLinecap="round" />
        )
      })}
      {Array.from({ length: cells }).map((_, i) => (
        <g key={i}>
          <rect x={i * cw + 1} y="74" width={cw - 2} height="92" rx="6" fill={i === 3 ? '#F7E7E1' : C.tissue} stroke={C.euc} strokeWidth="1.2" />
          {i === 3 && <ellipse cx={i * cw + cw / 2} cy="102" rx={cw / 2 - 7} ry="22" fill="#EAF0D8" stroke="#B5C48F" />}
          <ellipse cx={i * cw + cw / 2} cy={i === 3 ? 145 : 128 + (i % 2) * 14} rx="7" ry="10" fill={C.euc} opacity="0.75" />
        </g>
      ))}
      <text x={w / 2} y={196} textAnchor="middle" className="svg-label svg-label--sm">
        {smoker ? 'cilia flattened: mucus builds up' : 'mucus swept up toward the pharynx'}
      </text>
      <Callout at={[3.5 * cw, 100]} to={[w + 16, 112]} label="Goblet cell" sub="makes mucus" />
      <Callout at={[w - 14, 66]} to={[w + 16, 64]} label="Cilia" />
      <Callout at={[w - 30, 52]} to={[w + 16, 22]} label="Mucus" />
    </g>
  )
}


export function TracheaFigure() {
  const [smoker, setSmoker] = useState(false)
  const rings = Array.from({ length: 12 }, (_, i) => 70 + i * 24)
  // C ring geometry (cross-section)
  const cx = 500
  const cy = 210
  const r = 84
  const a1 = (120 * Math.PI) / 180
  const a2 = (60 * Math.PI) / 180
  const p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)]
  const p2 = [cx + r * Math.cos(a2), cy + r * Math.sin(a2)]
  const arc = `M${p1[0]} ${p1[1]} A${r} ${r} 0 1 1 ${p2[0]} ${p2[1]}`
  return (
    <Figure
      controls={<Toggle label="Airway" value={smoker ? 'smoker' : 'healthy'} onChange={(v) => setSmoker(v === 'smoker')} options={[{ value: 'healthy', label: 'Healthy' }, { value: 'smoker', label: 'Smoker' }]} />}
      caption={smoker ? 'Smoke paralyzes the cilia. Mucus builds up, so it has to be coughed out (“smoker’s cough”).' : 'Cilia beat in waves, sweeping mucus and trapped dust up toward the pharynx.'}
    >
    <svg viewBox="0 0 1250 470" role="img" aria-labelledby="tr-t tr-d" className="figure-svg">
      <title id="tr-t">Labelled diagram of the trachea</title>
      <desc id="tr-d">
        Front view of the trachea with C-shaped cartilage rings, splitting into the two bronchi at the bottom. A cross-section shows the
        ring open at the back next to the esophagus. A close-up shows cilia and goblet cells moving mucus up toward the pharynx.
      </desc>
      <Arrowheads id="tr" />
      <PanelTitle x={20} y={26}>Front view</PanelTitle>
      {/* larynx stub */}
      <path d="M130 40 L250 40 L240 64 L140 64 Z" fill={C.cartilage} stroke={C.euc} strokeWidth="2" />
      {/* tube */}
      <path d="M150 64 L150 360 C150 384 130 396 100 420 L126 440 C160 410 180 400 190 392 C200 400 220 410 254 440 L280 420 C250 396 230 384 230 360 L230 64 Z" fill={C.paper} stroke={C.euc} strokeWidth="2" />
      {rings.map((y) => (
        <rect key={y} x="146" y={y} width="88" height="15" rx="7.5" fill={C.cartilage} stroke={C.euc} strokeWidth="1.5" />
      ))}
      {/* carina */}
      <path d="M176 384 L190 368 L204 384" stroke={C.coralDeep} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M190 120 L190 330" stroke={C.coralDeep} strokeWidth="2.4" markerStart="url(#tr-coral)" markerEnd="url(#tr-coral)" opacity="0" />
      <Callout at={[200, 52]} to={[270, 44]} label="Larynx" />
      <Callout at={[234, 150]} to={[270, 146]} label="C-shaped ring" sub="made of cartilage" />
      <Label x={270} y={202} small>16–20 rings</Label>
      <Label x={270} y={220} small>keep it open</Label>
      <Label x={270} y={250} small>About 10–12 cm</Label>
      <Callout at={[190, 372]} to={[270, 340]} label="Splits into bronchi" />
      <Label x={24} y={458} small>Right bronchus</Label>
      <Label x={270} y={458} small anchor="start">Left bronchus</Label>

      <PanelTitle x={500} y={26} anchor="middle">Cross-section</PanelTitle>
      <Label x={500} y={60} small anchor="middle">Front (anterior)</Label>
      <path d={arc} fill="none" stroke={C.euc} strokeWidth="26" strokeLinecap="round" />
      <path d={arc} fill="none" stroke={C.cartilage} strokeWidth="21" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="64" fill={C.paper} stroke={C.blush} strokeWidth="10" />
      <path d={`M${p1[0] + 4} ${p1[1]} C${cx - 20} ${p1[1] + 14} ${cx + 20} ${p1[1] + 14} ${p2[0] - 4} ${p2[1]}`} stroke={C.coralDeep} strokeWidth="9" fill="none" strokeLinecap="round" strokeDasharray="3 3" />
      <ellipse cx={cx} cy={cy + 150} rx="64" ry="26" fill={C.blush} stroke={C.coralDeep} strokeWidth="1.5" />
      <path d={`M${cx - 30} ${cy + 150} L${cx + 30} ${cy + 150}`} stroke={C.coralDeep} strokeWidth="2" />
      <Label x={cx} y={cy + 5} anchor="middle" small>Lumen (air)</Label>
      <Callout at={[cx + 74, cy - 40]} to={[620, 110]} label="Cartilage" />
      <Callout at={[cx + 50, cy + 30]} to={[620, 170]} label="Ciliated lining" sub="mucus + cilia" />
      <Callout at={[cx + 22, p1[1] + 11]} to={[620, 280]} label="Smooth muscle" sub="bridges the gap" />
      <Callout at={[cx + 50, cy + 154]} to={[620, 362]} label="Esophagus" sub="behind the open side" />
      <Label x={500} y={420} small anchor="middle">Back (posterior)</Label>

      <CiliaPanel smoker={smoker} />
    </svg>
    </Figure>
  )
}
