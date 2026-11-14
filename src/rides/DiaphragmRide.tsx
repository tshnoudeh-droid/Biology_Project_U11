import { useEffect, useRef, useState } from 'react'
import { useTween } from '../lib/useTween'

type Phase = 'rest' | 'inhaling' | 'inhaled' | 'exhaling' | 'forced'

const MOVE_MS = 2200

export function DiaphragmRide() {
  const [phase, setPhase] = useState<Phase>('rest')
  const [auto, setAuto] = useState(false)
  const target = phase === 'inhaling' || phase === 'inhaled' ? 1 : phase === 'forced' ? -0.35 : 0
  const t = useTween(target, phase === 'forced' ? 1300 : MOVE_MS)
  const timer = useRef<number | undefined>(undefined)

  const go = (p: Phase) => {
    window.clearTimeout(timer.current)
    setPhase(p)
    const settle: Phase = p === 'inhaling' ? 'inhaled' : 'rest'
    timer.current = window.setTimeout(() => setPhase(settle), p === 'forced' ? 1400 : MOVE_MS)
  }

  useEffect(() => {
    if (!auto) return
    let inhale = phase !== 'inhaled'
    go(inhale ? 'inhaling' : 'exhaling')
    const id = window.setInterval(() => {
      inhale = !inhale
      go(inhale ? 'inhaling' : 'exhaling')
    }, MOVE_MS + 800)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const moving = phase === 'inhaling' || phase === 'exhaling' || phase === 'forced'
  const pressure = phase === 'inhaling' ? 759 : phase === 'exhaling' ? 761 : phase === 'forced' ? 763 : 760
  const volume = 2.4 + 0.5 * t // litres in lungs, quiet breathing ≈ +500 mL tidal volume
  const flow = phase === 'inhaling' ? 'in' : phase === 'exhaling' || phase === 'forced' ? 'out' : 'none'

  // geometry
  const domeY = 410 + 46 * t // dome peak drops as diaphragm contracts and flattens
  const sideY = 470 + 10 * t
  const ribLift = -14 * t
  const ribSpread = 1 + 0.06 * t
  const lungSx = 1 + 0.07 * t
  const lungSy = 1 + 0.12 * t

  const needle = ((pressure - 760) / 4) * 70 // degrees

  const contracting = phase === 'inhaling' || phase === 'inhaled'
  const status = {
    rest: 'Resting between breaths. Pressure inside equals the air outside, so nothing moves.',
    inhaling: 'BREATHE IN: the diaphragm moves down and the ribs move up and out. The chest gets bigger, pressure drops below the air outside, so air flows IN.',
    inhaled: 'Lungs full. Pressure has evened out, so air stops moving.',
    exhaling: 'BREATHE OUT: the muscles relax and the chest gets smaller. Pressure rises above the air outside, so air flows OUT.',
    forced: 'FORCED BREATH OUT (like blowing out candles): your stomach and rib muscles squeeze, pushing air out faster.',
  }[phase]

  return (
    <div className="ride">
      <div className="ride__stage">
        <svg viewBox="0 0 900 560" className="ride-svg" role="img" aria-labelledby="dp-t dp-d">
          <title id="dp-t">Diaphragm Drop Tower: the chest during breathing</title>
          <desc id="dp-d">{status}</desc>
          <defs>
            <marker id="dp-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="#F4D5CC" />
            </marker>
          </defs>
          {/* airflow arrows at the trachea */}
          {flow !== 'none' && (
            <g className="dp-flow">
              {[-26, 0, 26].map((dx) => (
                <line
                  key={dx}
                  x1={330 + dx}
                  x2={330 + dx}
                  y1={flow === 'in' ? 6 : 76}
                  y2={flow === 'in' ? 70 : 10}
                  stroke="#F4D5CC"
                  strokeWidth="3"
                  markerEnd="url(#dp-arrow)"
                />
              ))}
              <text x="380" y="40" className="svg-label svg-label--on-dark svg-label--bold">
                {flow === 'in' ? 'Air flows in' : 'Air flows out'}
              </text>
            </g>
          )}
          {/* trachea */}
          <rect x="316" y="76" width="28" height="90" rx="6" fill="#36574F" stroke="#F4D5CC" strokeOpacity="0.5" />

          {/* ribs */}
          <g transform={`translate(330 ${250 + ribLift}) scale(${ribSpread} 1) translate(-330 -250)`}>
            {[150, 200, 250, 300, 350, 400].map((y, i) => (
              <g key={y} stroke="#C9D6CF" strokeOpacity="0.55" strokeWidth="9" fill="none" strokeLinecap="round">
                <path d={`M318 ${y} C250 ${y - 30 + i * 2} 120 ${y - 10} 110 ${y + 40}`} />
                <path d={`M342 ${y} C410 ${y - 30 + i * 2} 540 ${y - 10} 550 ${y + 40}`} />
              </g>
            ))}
            {/* external intercostals hint */}
            {[175, 225, 275, 325].map((y) => (
              <g key={y} stroke={contracting ? '#E3735E' : '#8FB3A6'} strokeWidth="2" opacity="0.8">
                <path d={`M140 ${y + 18} l18 -16 M170 ${y + 4} l18 -16`} />
                <path d={`M520 ${y + 18} l-18 -16 M490 ${y + 4} l-18 -16`} />
              </g>
            ))}
          </g>

          {/* lungs */}
          <g transform={`translate(330 160) scale(${lungSx} ${lungSy}) translate(-330 -160)`}>
            <path d="M310 170 C260 172 180 230 160 320 C150 380 156 430 170 446 C220 440 270 442 306 436 C310 360 316 260 310 170 Z" fill="rgba(244,213,204,0.28)" stroke="#F4D5CC" strokeWidth="2.5" />
            <path d="M350 170 C400 172 480 230 500 320 C510 380 504 430 490 446 C440 440 390 442 354 436 C350 360 344 260 350 170 Z" fill="rgba(244,213,204,0.28)" stroke="#F4D5CC" strokeWidth="2.5" />
            <path d="M330 160 L300 200 M330 160 L360 200" stroke="#F4D5CC" strokeWidth="8" strokeLinecap="round" />
          </g>

          {/* diaphragm */}
          <path d={`M100 ${sideY} C180 ${domeY - 70} 290 ${domeY - 4} 330 ${domeY} C370 ${domeY - 4} 480 ${domeY - 70} 560 ${sideY}`} fill="none" stroke="#E3735E" strokeWidth="14" strokeLinecap="round" />
          {/* abdominal hint */}
          <path d="M100 540 L560 540" stroke="#36574F" strokeWidth="2" strokeDasharray="6 6" />

          {/* labels */}
          <text x="20" y="34" className="svg-label svg-label--on-dark"><tspan className="svg-label--bold">Ribs:</tspan> {t > 0.5 ? 'lifted up and out' : 'lowered'}</text>
          <text x="20" y="60" className="svg-label svg-label--on-dark"><tspan className="svg-label--bold">Rib muscles:</tspan> {contracting ? 'contracting' : 'relaxed'}</text>
          <text x="330" y={domeY + 52} textAnchor="middle" className="svg-label svg-label--on-dark svg-label--bold">Diaphragm</text>
          <text x="330" y={domeY + 70} textAnchor="middle" className="svg-label svg-label--sm svg-label--on-dark">
            {t > 0.5 ? 'pulled down, flat' : t < -0.1 ? 'pushed up hard' : 'relaxed, dome-shaped'}
          </text>
          <text x="236" y="320" textAnchor="middle" className="svg-label svg-label--on-dark">Lung</text>

          {/* gauges */}
          <g transform="translate(630 50)">
            <text className="svg-label svg-label--on-dark svg-label--bold">Lung volume</text>
            <rect y="16" width="220" height="16" rx="8" fill="rgba(255,255,255,0.1)" />
            <rect y="16" width={Math.max(12, ((volume - 2.0) / 1.2) * 220)} height="16" rx="8" fill="#F4D5CC" />
            <text y="56" className="svg-chem" style={{ fill: '#FBFCFB' }}>{volume.toFixed(2)} L</text>
            <text x="110" y="56" className="svg-label svg-label--sm svg-label--on-dark">{t > 0.05 ? '↑ larger' : t < -0.05 ? '↓ smaller' : ''}</text>

            <text y="100" className="svg-label svg-label--on-dark svg-label--bold">Pressure in the lungs</text>
            <g transform="translate(110 236)">
              <path d="M-90 0 A90 90 0 0 1 90 0" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="18" />
              <path d="M-90 0 A90 90 0 0 1 0 -90" fill="none" stroke="#7FA7D9" strokeOpacity="0.5" strokeWidth="18" />
              <path d="M0 -90 A90 90 0 0 1 90 0" fill="none" stroke="#E3735E" strokeOpacity="0.5" strokeWidth="18" />
              <line x1="0" y1="0" x2="0" y2="-80" stroke="#FBFCFB" strokeWidth="4" strokeLinecap="round" transform={`rotate(${needle})`} className="dp-needle" />
              <circle r="8" fill="#FBFCFB" />
              <text x="-104" y="22" className="svg-label svg-label--sm svg-label--on-dark">756</text>
              <text x="0" y="-100" textAnchor="middle" className="svg-label svg-label--sm svg-label--on-dark">760 = outside air</text>
              <text x="84" y="22" className="svg-label svg-label--sm svg-label--on-dark">764</text>
            </g>
            <text x="110" y="284" textAnchor="middle" className="svg-chem" style={{ fill: '#FBFCFB' }}>{pressure} mm Hg</text>
            <text x="110" y="308" textAnchor="middle" className="svg-label svg-label--sm svg-label--on-dark">
              {pressure < 760 ? 'lower than outside → air in' : pressure > 760 ? 'higher than outside → air out' : 'same as outside → no flow'}
            </text>

            <rect y="332" width="220" height="104" rx="16" fill="rgba(244,213,204,0.08)" stroke="rgba(244,213,204,0.3)" />
            <text x="110" y="366" textAnchor="middle" className="svg-chem" style={{ fill: '#F4D5CC' }}>P₁V₁ = P₂V₂</text>
            <text x="110" y="394" textAnchor="middle" className="svg-label svg-label--sm svg-label--on-dark">Boyle’s law</text>
            <text x="110" y="418" textAnchor="middle" className="svg-label svg-label--on-dark svg-label--bold">
              {phase === 'inhaling' ? 'V ↑  →  P ↓' : phase === 'exhaling' || phase === 'forced' ? 'V ↓  →  P ↑' : 'V steady → P steady'}
            </text>
          </g>
        </svg>
      </div>
      <div className="ride__controls">
        <div className="ride__btns">
          <button type="button" className="btn btn--blush" disabled={moving || auto} onClick={() => go('inhaling')}>
            Inhale
          </button>
          <button type="button" className="btn btn--ghost-dark" disabled={moving || auto || phase === 'rest'} onClick={() => go('exhaling')}>
            Exhale
          </button>
          <button type="button" className="btn btn--ghost-dark btn--sm" disabled={moving || auto} onClick={() => go('forced')}>
            Forced exhale
          </button>
        </div>
        <label className="switch">
          <input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} />
          <span className="switch__track" aria-hidden="true" />
          Auto-breathe
        </label>
        <p className="ride__caption" aria-live="polite">{status}</p>
      </div>
    </div>
  )
}
