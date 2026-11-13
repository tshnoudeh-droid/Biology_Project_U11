import { useState } from 'react'
import { C, Callout, Label, PanelTitle } from './parts'
import { useTween } from '../lib/useTween'

export function LarynxDiagram() {
  const [speaking, setSpeaking] = useState(false)
  const angle = useTween(speaking ? 1.2 : 13, 700)
  // superior view geometry
  const ax = 760
  const ay = 140
  const len = 200
  const rad = (deg: number) => (deg * Math.PI) / 180
  const lx = ax - Math.sin(rad(angle)) * len
  const rx = ax + Math.sin(rad(angle)) * len
  const by = ay + Math.cos(rad(angle)) * len

  return (
    <div className="diagram-with-control">
      <div className="diagram-control" role="group" aria-label="Vocal fold position">
        <span className="diagram-control__label">Glottis:</span>
        <div className="toggle">
          <button type="button" aria-pressed={!speaking} onClick={() => setSpeaking(false)}>
            Breathing (open)
          </button>
          <button type="button" aria-pressed={speaking} onClick={() => setSpeaking(true)}>
            Speaking (closed)
          </button>
        </div>
      </div>
      <svg viewBox="0 0 1110 470" role="img" aria-labelledby="lx-t lx-d" className="diagram-svg">
        <title id="lx-t">Labelled diagram of the larynx</title>
        <desc id="lx-d">
          Front view of the larynx showing the hyoid bone, epiglottis, thyroid cartilage with the laryngeal prominence (Adam’s apple),
          cricoid cartilage and the first tracheal rings. A top-down view shows the true vocal cords, the glottis, the vestibular
          folds and the arytenoid cartilages. The vocal folds are currently {speaking ? 'closed together for speaking' : 'open for breathing'}.
        </desc>
        <PanelTitle x={20} y={26}>Front view</PanelTitle>
        {/* epiglottis behind */}
        <path d="M250 40 C222 52 220 100 236 140 L264 140 C280 100 278 52 250 40 Z" fill={C.blush} stroke={C.coralDeep} strokeWidth="1.5" />
        {/* hyoid */}
        <path d="M160 92 Q250 130 340 92" stroke={C.euc} strokeWidth="10" fill="none" strokeLinecap="round" />
        {/* thyroid */}
        <path d="M160 140 L236 140 L250 160 L264 140 L340 140 L326 214 C312 262 284 292 250 302 C216 292 188 262 174 214 Z" fill={C.cartilage} stroke={C.euc} strokeWidth="2.5" />
        <path d="M250 160 L250 300" stroke={C.euc} strokeWidth="1" opacity="0.5" />
        {/* cricothyroid gap + cricoid */}
        <path d="M190 322 L310 322 L304 360 L196 360 Z" fill={C.cartilage} stroke={C.euc} strokeWidth="2.5" />
        {[378, 402, 426, 450].map((y) => (
          <rect key={y} x="196" y={y} width="108" height="14" rx="7" fill={C.cartilage} stroke={C.euc} strokeWidth="1.5" />
        ))}

        <Callout at={[250, 52]} to={[380, 46]} label="Epiglottis" sub="elastic cartilage flap" />
        <Callout at={[300, 106]} to={[380, 104]} label="Hyoid bone" />
        <Callout at={[250, 164]} to={[380, 160]} label="Laryngeal prominence" sub="the Adam’s apple" />
        <Callout at={[318, 220]} to={[380, 232]} label="Thyroid cartilage" />
        <Callout at={[304, 342]} to={[380, 344]} label="Cricoid cartilage" sub="complete ring" />
        <Callout at={[300, 428]} to={[380, 432]} label="Tracheal rings" sub="Stop 4 begins" />
        <Label x={30} y={200} small>Nine cartilages:</Label>
        <Label x={30} y={220} small>thyroid, cricoid,</Label>
        <Label x={30} y={240} small>epiglottis + 3 pairs</Label>
        <Label x={30} y={260} small>(arytenoid,</Label>
        <Label x={30} y={280} small>corniculate,</Label>
        <Label x={30} y={300} small>cuneiform)</Label>

        <PanelTitle x={760} y={26} anchor="middle">Top-down view of the glottis</PanelTitle>
        <Label x={760} y={58} small anchor="middle">Front (anterior)</Label>
        <ellipse cx="760" cy="250" rx="170" ry="170" fill="#EFC2B5" stroke={C.coralDeep} strokeWidth="1.5" />
        {/* epiglottis edge */}
        <path d="M640 140 C690 86 830 86 880 140" stroke={C.coralDeep} strokeWidth="12" fill="none" strokeLinecap="round" />
        {/* vestibular folds (false) */}
        <path d={`M${ax - 8} ${ay} L${lx - 34} ${by}`} stroke="#E8A898" strokeWidth="16" strokeLinecap="round" />
        <path d={`M${ax + 8} ${ay} L${rx + 34} ${by}`} stroke="#E8A898" strokeWidth="16" strokeLinecap="round" />
        {/* glottis opening */}
        <path d={`M${ax} ${ay} L${lx} ${by} L${rx} ${by} Z`} fill={C.deep} />
        {/* true vocal cords */}
        <path d={`M${ax} ${ay} L${lx} ${by}`} stroke={C.paper} strokeWidth="9" strokeLinecap="round" />
        <path d={`M${ax} ${ay} L${rx} ${by}`} stroke={C.paper} strokeWidth="9" strokeLinecap="round" />
        {/* arytenoids */}
        <path d={`M${lx - 26} ${by + 2} L${lx + 4} ${by - 4} L${lx - 6} ${by + 30} Z`} fill={C.cartilage} stroke={C.euc} strokeWidth="1.5" />
        <path d={`M${rx + 26} ${by + 2} L${rx - 4} ${by - 4} L${rx + 6} ${by + 30} Z`} fill={C.cartilage} stroke={C.euc} strokeWidth="1.5" />
        <Label x={760} y={446} small anchor="middle">Back (posterior)</Label>

        <Callout at={[(ax + rx) / 2 + 4, (ay + by) / 2]} to={[950, 230]} label="True vocal cord" sub="vibrates to make sound" />
        <Callout at={[ax, by - 30]} to={[950, 296]} label="Glottis" sub={speaking ? 'closed: folds vibrate' : 'open: air flows freely'} />
        <Callout at={[(ax + rx) / 2 + 30, (ay + by) / 2 - 10]} to={[950, 176]} label="Vestibular fold" sub="“false” vocal cord" />
        <Callout at={[rx + 8, by + 12]} to={[950, 380]} label="Arytenoid cartilage" />
        <Callout at={[810, 104]} to={[950, 110]} label="Epiglottis" />
      </svg>
    </div>
  )
}
