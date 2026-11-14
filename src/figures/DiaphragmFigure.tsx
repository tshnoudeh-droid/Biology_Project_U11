import { useEffect, useState } from 'react'
import { Arrowheads, C, Callout, Label } from './parts'
import { Figure, Toggle } from './Figure'
import { useTween } from '../lib/useTween'

type Phase = 'in' | 'out'

export function DiaphragmFigure() {
  const [phase, setPhase] = useState<Phase>('out')
  const [auto, setAuto] = useState(false)
  const t = useTween(phase === 'in' ? 1 : 0, 1600)
  useEffect(() => {
    if (!auto) return
    const id = window.setInterval(() => setPhase((p) => (p === 'in' ? 'out' : 'in')), 2600)
    return () => window.clearInterval(id)
  }, [auto])
  const moving = Math.abs(t - (phase === 'in' ? 1 : 0)) > 0.04
  const flowIn = phase === 'in' && moving
  const flowOut = phase === 'out' && moving
  const domeY = 380 + 50 * t
  const lungSx = 1 + 0.08 * t
  const lungSy = 1 + 0.13 * t
  const ribLift = -14 * t
  const vol = 0.45 + 0.4 * t

  return (
    <Figure
      controls={
        <>
          <Toggle label="Breath" value={phase} onChange={(v) => { setAuto(false); setPhase(v) }} options={[{ value: 'out', label: 'Exhale' }, { value: 'in', label: 'Inhale' }]} />
          <button type="button" className="btn btn--ghost btn--sm" aria-pressed={auto} onClick={() => setAuto((a) => !a)}>
            {auto ? 'Stop auto-breathing' : 'Auto-breathe'}
          </button>
        </>
      }
      caption={
        phase === 'in'
          ? 'Inhalation: the diaphragm contracts and flattens and the intercostal muscles lift the ribs. Chest volume goes up, so pressure goes down and air flows in (Boyle’s law).'
          : 'Exhalation: the muscles relax. Chest volume goes down, so pressure goes up and air flows out.'
      }
    >
      <svg viewBox="0 0 1000 500" role="img" aria-labelledby="dp-t" className="figure-svg">
        <title id="dp-t">
          The chest during {phase === 'in' ? 'inhalation: diaphragm down, ribs up, lungs bigger' : 'exhalation: diaphragm domed, ribs down, lungs smaller'}.
        </title>
        <Arrowheads id="dp" />
        {/* airflow */}
        {flowIn && [-22, 0, 22].map((dx) => <path key={dx} d={`M${360 + dx} 0 L${360 + dx} 56`} stroke={C.coralDeep} strokeWidth="4" markerEnd="url(#dp-coral)" />)}
        {flowOut && [-22, 0, 22].map((dx) => <path key={dx} d={`M${360 + dx} 60 L${360 + dx} 4`} stroke={C.euc} strokeWidth="4" markerEnd="url(#dp-euc)" />)}
        <rect x="348" y="56" width="24" height="90" rx="6" fill={C.cartilage} stroke={C.euc} />
        {/* ribs */}
        <g transform={`translate(360 ${240 + ribLift}) scale(${1 + 0.06 * t} 1) translate(-360 -240)`}>
          {[150, 200, 250, 300, 350].map((y, i) => (
            <g key={y} stroke={C.muted} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.55">
              <path d={`M348 ${y} C280 ${y - 28 + i * 2} 150 ${y - 10} 140 ${y + 40}`} />
              <path d={`M372 ${y} C440 ${y - 28 + i * 2} 570 ${y - 10} 580 ${y + 40}`} />
            </g>
          ))}
          {[175, 225, 275, 325].map((y) => (
            <g key={y} stroke={phase === 'in' ? C.coralDeep : C.sage} strokeWidth="3">
              <path d={`M168 ${y + 18} l18 -16 M200 ${y + 6} l18 -16`} />
              <path d={`M552 ${y + 18} l-18 -16 M520 ${y + 6} l-18 -16`} />
            </g>
          ))}
        </g>
        {/* lungs */}
        <g transform={`translate(360 150) scale(${lungSx} ${lungSy}) translate(-360 -150)`}>
          <path d="M340 160 C290 162 210 220 190 310 C180 360 186 400 200 414 C250 408 300 410 336 404 C340 330 346 240 340 160 Z" fill={C.blush} stroke={C.coralDeep} strokeWidth="2" />
          <path d="M380 160 C430 162 510 220 530 310 C540 360 534 400 520 414 C470 408 420 410 384 404 C380 330 374 240 380 160 Z" fill={C.blush} stroke={C.coralDeep} strokeWidth="2" />
          <path d="M360 146 L330 190 M360 146 L390 190" stroke={C.euc} strokeWidth="8" strokeLinecap="round" />
        </g>
        {/* diaphragm */}
        <path d={`M120 ${452 - 8 * t} C210 ${domeY - 70 + 40 * t} 320 ${domeY - 4} 360 ${domeY} C400 ${domeY - 4} 510 ${domeY - 70 + 40 * t} 600 ${452 - 8 * t}`} fill="none" stroke={C.coral} strokeWidth="14" strokeLinecap="round" />

        {/* volume + pressure meters */}
        <g transform="translate(690 120)">
          <text className="svg-label svg-label--bold">Chest volume</text>
          <rect y="14" width="240" height="18" rx="9" fill={C.mist2} />
          <rect y="14" width={240 * vol} height="18" rx="9" fill={C.coral} />
          <text y="80" className="svg-label svg-label--bold">Pressure in the lungs</text>
          <text y="108" className="svg-label">
            {flowIn ? 'lower than outside → air in' : flowOut ? 'higher than outside → air out' : 'same as outside → no airflow'}
          </text>
          <rect y="140" width="240" height="70" rx="12" fill={C.paper} stroke={C.line} />
          <text x="120" y="172" textAnchor="middle" className="figure-eq">P₁V₁ = P₂V₂</text>
          <text x="120" y="196" textAnchor="middle" className="svg-label svg-label--sm">Boyle’s law: volume ↑, pressure ↓</text>
        </g>
        <Callout at={[420, domeY - 2]} to={[690, 420]} label="Diaphragm" sub={phase === 'in' ? 'contracted: flat' : 'relaxed: dome'} />
        <Callout at={[536, 222 + ribLift]} to={[690, 370]} label="Intercostal muscles" sub="between the ribs" />
        <Callout at={[470, 330]} to={[690, 476]} label="Lungs" />
        <Label x={440} y={30} small>{flowIn ? 'air in' : flowOut ? 'air out' : ''}</Label>
      </svg>
    </Figure>
  )
}
