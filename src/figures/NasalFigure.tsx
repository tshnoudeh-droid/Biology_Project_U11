import { useMemo, useRef, useState } from 'react'
import { Arrowheads, C, Callout, Label } from './parts'
import { Figure, Toggle, along } from './Figure'
import { useFrame } from '../lib/useFrame'

type Mode = 'nose' | 'mouth'
type Pt = [number, number]
const NOSE: Pt[][] = [
  [[20, 252], [118, 226], [180, 200], [240, 192], [420, 192], [470, 202], [488, 232], [492, 280], [492, 400]],
  [[20, 256], [128, 234], [300, 240], [440, 240], [478, 262], [492, 400]],
  [[20, 248], [150, 190], [260, 152], [400, 150], [470, 180], [490, 260], [492, 400]],
]
const MOUTH: Pt[] = [[20, 270], [120, 264], [210, 284], [380, 290], [456, 300], [486, 330], [492, 400]]
const mixRGB = (a: number[], b: number[], k: number) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(',')})`

export function NasalFigure() {
  const [mode, setMode] = useState<Mode>('nose')
  const modeRef = useRef(mode)
  modeRef.current = mode
  const parts = useMemo(() => Array.from({ length: 22 }, (_, i) => ({ f: i / 22, lane: i % 3, dust: i % 5 === 0, stick: 0.32 + (i % 3) * 0.12 })), [])
  const els = useRef<(SVGCircleElement | null)[]>([])

  useFrame((dt) => {
    const nose = modeRef.current === 'nose'
    parts.forEach((p, i) => {
      const stuck = nose && p.dust && p.f >= p.stick
      if (!stuck) p.f += dt * (nose ? 0.16 : 0.22)
      if (p.f > 1) p.f = 0
      const [x, y] = nose ? along(NOSE[p.lane], p.f) : along(MOUTH, p.f)
      const el = els.current[i]
      if (!el) return
      el.setAttribute('cx', x.toFixed(1))
      el.setAttribute('cy', (y + (stuck ? 8 : 0)).toFixed(1))
      if (!p.dust) el.setAttribute('fill', nose ? mixRGB([127, 167, 217], [227, 115, 94], Math.min(1, Math.max(0, (p.f - 0.15) / 0.45))) : '#7FA7D9')
    })
  })

  const nose = mode === 'nose'
  return (
    <Figure
      controls={<Toggle label="Breathing route" value={mode} onChange={setMode} options={[{ value: 'nose', label: 'Breathe through the nose' }, { value: 'mouth', label: 'Breathe through the mouth' }]} />}
      caption={nose ? 'The conchae swirl the air: dust sticks to the mucus, and the air is warmed and moistened.' : 'Mouth breathing skips the nasal cavity: the air arrives dusty, cold and dry.'}
    >
      <svg viewBox="0 0 860 450" role="img" aria-labelledby="nasal-t" className="figure-svg">
        <title id="nasal-t">
          Side view of the nasal cavity with the nostril, nasal conchae, mucus lining, smell receptors, sinuses and palate.{' '}
          {nose ? 'Air entering through the nose is warmed and cleaned.' : 'Air entering through the mouth stays cold and dusty.'}
        </title>
        <Arrowheads id="nas" />
        <path d="M175 40 C168 70 165 92 152 118 C134 156 108 184 86 214 C80 224 88 234 106 234 L120 236 C124 250 118 262 122 276 C128 300 136 330 134 420 L560 420 L560 40 Z" fill={C.tissue} stroke={C.euc} strokeWidth="2" />
        <path d="M114 226 C126 210 146 186 176 160 C212 128 252 112 320 110 C380 108 420 116 450 136 L470 246 L148 248 C132 246 120 238 114 226 Z" fill={C.paper} stroke={C.euc} strokeWidth="2" opacity={nose ? 1 : 0.55} />
        <path d="M150 262 L430 262 C450 270 470 290 472 320 L180 310 Z" fill={C.paper} opacity={nose ? 0.35 : 1} />
        <path d="M450 136 C480 150 500 170 506 200 L512 420" fill="none" stroke={C.euc} strokeWidth="2" />
        <path d="M470 246 C480 270 488 290 470 330 L470 420" fill="none" stroke={C.euc} strokeWidth="2" />
        <rect x="471" y="250" width="40" height="170" fill={C.paper} />
        <path d="M148 250 L420 250" stroke={C.euc} strokeWidth="9" strokeLinecap="round" />
        <path d="M420 250 C440 256 456 270 462 292" stroke={C.coralDeep} strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M262 116 C300 110 340 109 380 112" stroke={C.coral} strokeWidth="6" strokeLinecap="round" strokeDasharray="2 7" fill="none" />
        <path d="M392 124 C350 120 320 126 312 138 C330 146 364 144 398 142 Z" fill={C.blush} stroke={C.coralDeep} strokeWidth="1.5" />
        <path d="M424 156 C360 148 280 154 248 174 C254 188 320 186 428 182 Z" fill={C.blush} stroke={C.coralDeep} strokeWidth="1.5" />
        <path d="M450 200 C360 190 250 198 200 220 C208 236 300 236 456 228 Z" fill={C.blush} stroke={C.coralDeep} strokeWidth="1.5" />
        <ellipse cx="214" cy="80" rx="30" ry="20" fill={C.paper} stroke={C.euc} strokeWidth="1.5" strokeDasharray="4 3" />
        <ellipse cx="448" cy="86" rx="34" ry="24" fill={C.paper} stroke={C.euc} strokeWidth="1.5" strokeDasharray="4 3" />
        <path d="M492 330 L492 400" stroke={C.coralDeep} strokeWidth="2.6" markerEnd="url(#nas-coral)" />

        {parts.map((p, i) => (
          <circle key={i} ref={(el) => { els.current[i] = el }} r={p.dust ? 5 : 7} fill={p.dust ? '#5A6B65' : '#7FA7D9'} />
        ))}

        <Callout at={[214, 80]} to={[150, 30]} label="Sinus" anchor="end" />
        <Callout at={[110, 228]} to={[24, 330]} label="Nostril" sub="air enters here" />
        <Callout at={[300, 252]} to={[230, 360]} label="Hard palate" sub="roof of the mouth" />
        <Callout at={[446, 274]} to={[330, 410]} label="Soft palate" />
        <Callout at={[340, 111]} to={[580, 92]} label="Smell receptors" sub="detect odours" />
        <Callout at={[400, 160]} to={[580, 160]} label="Nasal conchae" sub="swirl, warm and moisten the air" />
        <Callout at={[300, 242]} to={[580, 236]} label="Mucus + cilia" sub="trap dust, sweep it to the pharynx" />
        <Callout at={[492, 360]} to={[580, 340]} label="To the pharynx" />
        <g transform="translate(580 400)">
          <circle cx="6" cy="-4" r="7" fill="#7FA7D9" />
          <text x="20" y="1" className="svg-label svg-label--sm">cold air</text>
          <circle cx="100" cy="-4" r="7" fill={C.coral} />
          <text x="114" y="1" className="svg-label svg-label--sm">warm air</text>
          <circle cx="198" cy="-4" r="5" fill="#5A6B65" />
          <text x="210" y="1" className="svg-label svg-label--sm">dust</text>
        </g>
        <Label x={24} y={238} small>{nose ? 'Air in' : ''}</Label>
      </svg>
    </Figure>
  )
}
