import { useMemo, useRef, useState } from 'react'
import { C, Callout, Label } from './parts'
import { Figure, Toggle, along } from './Figure'
import { useFrame } from '../lib/useFrame'
import { useTween } from '../lib/useTween'

type Mode = 'breathe' | 'swallow'
type Pt = [number, number]
const AIR: Pt[] = [[20, 252], [118, 226], [240, 192], [420, 192], [480, 215], [496, 300], [492, 400], [470, 440], [454, 480], [454, 590]]
const FOOD: Pt[] = [[70, 286], [160, 284], [300, 284], [430, 298], [480, 332], [500, 400], [505, 470], [505, 590]]
const regions = [
  { y1: 136, y2: 262, name: 'Nasopharynx', sub: 'air only' },
  { y1: 262, y2: 390, name: 'Oropharynx', sub: 'air + food' },
  { y1: 390, y2: 470, name: 'Laryngopharynx', sub: 'air and food split' },
]

export function PharynxFigure() {
  const [mode, setMode] = useState<Mode>('breathe')
  const k = useTween(mode === 'swallow' ? 1 : 0, 650)
  const modeRef = useRef(mode)
  modeRef.current = mode
  const air = useMemo(() => Array.from({ length: 12 }, (_, i) => ({ f: i / 12 })), [])
  const airEls = useRef<(SVGCircleElement | null)[]>([])
  const food = useRef(0)
  const foodEl = useRef<SVGGElement | null>(null)

  useFrame((dt) => {
    const sw = modeRef.current === 'swallow'
    air.forEach((p, i) => {
      if (!sw) p.f = (p.f + dt * 0.14) % 1
      const [x, y] = along(AIR, p.f)
      const el = airEls.current[i]
      if (el) {
        el.setAttribute('cx', x.toFixed(1))
        el.setAttribute('cy', y.toFixed(1))
      }
    })
    food.current = sw ? (food.current + dt * 0.32) % 1.25 : 0
    const [fx, fy] = along(FOOD, Math.min(1, food.current))
    if (foodEl.current) {
      foodEl.current.setAttribute('transform', `translate(${fx.toFixed(1)} ${fy.toFixed(1)})`)
      foodEl.current.setAttribute('opacity', sw && food.current < 1 ? '1' : '0')
    }
  })

  // soft palate lifts; epiglottis folds down over the larynx
  const sp = `M420 250 C${440 + 8 * k} ${256 - 14 * k} ${456 + 14 * k} ${270 - 40 * k} ${462 + 30 * k} ${292 - 84 * k}`
  const ang = ((-62 + 172 * k) * Math.PI) / 180
  const tip: Pt = [470 + Math.cos(ang) * 50, 452 + Math.sin(ang) * 50]
  const swallow = mode === 'swallow'

  return (
    <Figure
      controls={<Toggle label="Breathe or swallow" value={mode} onChange={setMode} options={[{ value: 'breathe', label: 'Breathe' }, { value: 'swallow', label: 'Swallow' }]} />}
      caption={
        swallow
          ? 'Swallowing: the soft palate seals off the nasal cavity and the epiglottis covers the larynx, so food goes down the esophagus. Breathing pauses.'
          : 'Breathing: air flows from the nasal cavity, down the pharynx and into the larynx.'
      }
    >
      <svg viewBox="0 0 860 600" role="img" aria-labelledby="ph-t" className="figure-svg">
        <title id="ph-t">
          Side view of the head and neck showing the nasopharynx, oropharynx and laryngopharynx, the tonsils, soft palate, epiglottis, larynx and esophagus.{' '}
          {swallow ? 'Swallowing: food moves to the esophagus while the epiglottis covers the larynx.' : 'Breathing: air flows into the larynx.'}
        </title>
        <path d="M175 40 C168 70 165 92 152 118 C134 156 108 184 86 214 C80 224 88 234 106 234 L120 236 C124 250 118 262 122 276 C126 290 120 300 126 314 C140 340 170 350 210 356 C222 400 230 480 232 600 L540 600 L540 40 Z" fill={C.tissue} stroke={C.euc} strokeWidth="2" />
        <path d="M114 226 C126 210 146 186 176 160 C212 128 252 112 320 110 C380 108 420 116 450 136 L470 246 L148 248 C132 246 120 238 114 226 Z" fill={C.paper} stroke={C.euc} strokeWidth="2" />
        {[
          'M392 124 C350 120 320 126 312 138 C330 146 364 144 398 142 Z',
          'M424 156 C360 148 280 154 248 174 C254 188 320 186 428 182 Z',
          'M450 200 C360 190 250 198 200 220 C208 236 300 236 456 228 Z',
        ].map((d) => (
          <path key={d} d={d} fill={C.blush} stroke={C.coralDeep} strokeWidth="1.2" opacity="0.7" />
        ))}
        {/* oral cavity + tongue */}
        <path d="M150 262 L420 262 C440 272 448 290 446 300 L190 312 Z" fill={C.paper} />
        <path d="M170 320 C220 282 340 272 420 292 C452 302 462 340 452 380 L436 412 L200 352 Z" fill="#EFC2B5" stroke={C.coralDeep} strokeWidth="1.5" />
        {/* pharynx */}
        <path d="M450 136 C480 146 504 168 508 200 L512 472 L470 472 L452 384 L462 300 L470 246 Z" fill={C.paper} stroke={C.euc} strokeWidth="2" />
        {/* larynx + trachea (front) and esophagus (back) */}
        <rect x="430" y="462" width="48" height="138" fill={C.paper} stroke={C.euc} strokeWidth="2" />
        {[492, 516, 540, 564, 588].map((y) => (
          <rect key={y} x="432" y={y} width="44" height="10" rx="5" fill={C.cartilage} stroke={C.euc} />
        ))}
        <rect x="486" y="472" width="40" height="128" fill={C.blush} stroke={C.coralDeep} strokeWidth="1.5" />
        {/* hard + soft palate */}
        <path d="M148 250 L420 250" stroke={C.euc} strokeWidth="9" strokeLinecap="round" />
        <path d={sp} stroke={C.coralDeep} strokeWidth="9" strokeLinecap="round" fill="none" />
        {/* tonsils */}
        <ellipse cx="504" cy="178" rx="7" ry="18" fill={C.coralDeep} opacity="0.85" />
        <ellipse cx="462" cy="324" rx="8" ry="14" fill={C.coralDeep} opacity="0.85" />
        <ellipse cx="448" cy="372" rx="7" ry="9" fill={C.coralDeep} opacity="0.85" />
        {/* epiglottis */}
        <path d={`M470 452 L${tip[0].toFixed(1)} ${tip[1].toFixed(1)}`} stroke={C.euc} strokeWidth="9" strokeLinecap="round" />
        {/* region brackets */}
        {regions.map((r) => (
          <path key={r.name} d={`M528 ${r.y1 + 4} L540 ${r.y1 + 4} L540 ${r.y2 - 4} L528 ${r.y2 - 4}`} fill="none" stroke={C.deep} strokeWidth="1.5" />
        ))}
        {/* moving air + food */}
        {air.map((_p, i) => (
          <circle key={i} ref={(el) => { airEls.current[i] = el }} r="7" fill={C.coral} opacity={swallow ? 0.3 : 0.95} />
        ))}
        <g ref={foodEl} opacity="0">
          <ellipse rx="18" ry="13" fill="#E9C46A" stroke={C.deep} strokeWidth="1.5" />
        </g>

        <Label x={300} y={150} anchor="middle" small>Nasal cavity</Label>
        <Label x={250} y={300} anchor="middle" small>Oral cavity</Label>
        <Label x={320} y={326} anchor="middle" small>Tongue</Label>
        {regions.map((r) => (
          <g key={r.name}>
            <text x="556" y={(r.y1 + r.y2) / 2 - 2} className="svg-label svg-label--bold">{r.name}</text>
            <text x="556" y={(r.y1 + r.y2) / 2 + 16} className="svg-label svg-label--sm">{r.sub}</text>
          </g>
        ))}
        <Callout at={[480, 226]} to={[700, 70]} label="Soft palate" sub="seals the nasal cavity" />
        <Callout at={[504, 170]} to={[700, 150]} label="Pharyngeal tonsil" sub="(adenoid)" />
        <Callout at={[466, 324]} to={[700, 250]} label="Palatine + lingual" sub="tonsils: trap pathogens" />
        <Callout at={[tip[0], tip[1]]} to={[330, 476]} label="Epiglottis" sub={swallow ? 'covers the larynx' : 'open: air gets in'} anchor="end" />
        <Callout at={[454, 560]} to={[330, 560]} label="Larynx → trachea" sub="air" anchor="end" />
        <Callout at={[506, 560]} to={[600, 560]} label="Esophagus" sub="food" />
        {swallow && (
          <text x="250" y="420" textAnchor="middle" className="svg-label svg-label--bold" style={{ fill: C.coralDeep }}>
            Breathing paused
          </text>
        )}
      </svg>
    </Figure>
  )
}
