import { useState } from 'react'

export function ChemoRide() {
  const [pco2, setPco2] = useState(40)
  const [lowO2, setLowO2] = useState(false)
  // Henderson–Hasselbalch with normal bicarbonate (24 mmol/L)
  const ph = 6.1 + Math.log10(24 / (0.03 * pco2))
  // illustrative response: CO₂ is the main driver; a big O₂ drop adds a smaller push
  const rate = Math.round(Math.min(30, Math.max(8, 14 + (pco2 - 40) * 1.1 + (lowO2 ? 4 : 0))))
  const depth = Math.min(1, Math.max(0.35, 0.5 + (pco2 - 40) * 0.035 + (lowO2 ? 0.1 : 0)))
  const period = 60 / rate

  const verdict =
    pco2 > 42 || lowO2
      ? 'Sensors detect extra CO₂' + (lowO2 ? ' and low oxygen' : '') + ', so the brain speeds up your breathing to get rid of it.'
      : pco2 < 38
        ? 'CO₂ is low, so breathing slows down until it builds back up.'
        : 'CO₂ is normal, so breathing stays calm and steady.'

  return (
    <div className="ride">
      <div className="ride__stage chemo">
        <div className="chemo__lung" aria-hidden="true">
          <span
            className="chemo__breath"
            style={{ animationDuration: `${period.toFixed(2)}s`, ['--depth' as string]: `${1 + depth * 0.35}` }}
          />
          <span className="chemo__rate">{rate}</span>
          <span className="chemo__unit">breaths / min</span>
        </div>
        <ol className="chemo__loop">
          <li><strong>Sensors</strong> · chemoreceptors detect CO₂ in your blood</li>
          <li><strong>Brain</strong> · the medulla oblongata decides how fast to breathe</li>
          <li><strong>Muscles</strong> · diaphragm and rib muscles do the breathing</li>
          <li><strong>Result</strong> · extra CO₂ gets breathed out</li>
        </ol>
      </div>
      <div className="ride__controls">
        <label className="slider">
          <span className="slider__label">
            Blood CO₂ level: <strong>{pco2 < 38 ? 'low' : pco2 > 42 ? 'high' : 'normal'}</strong>
          </span>
          <input type="range" min={34} max={56} step={1} value={pco2} onChange={(e) => setPco2(+e.target.value)} />
          <span className="slider__ends" aria-hidden="true"><span>low</span><span>normal</span><span>high</span></span>
        </label>
        <label className="switch">
          <input type="checkbox" checked={lowO2} onChange={(e) => setLowO2(e.target.checked)} />
          <span className="switch__track" aria-hidden="true" />
          Low oxygen (high altitude)
        </label>
        <dl className="readout">
          <div>
            <dt>Blood pH</dt>
            <dd>{ph.toFixed(2)}</dd>
          </div>
          <div>
            <dt>Breathing</dt>
            <dd>{rate} / min · {depth > 0.6 ? 'deeper' : depth < 0.45 ? 'shallower' : 'normal depth'}</dd>
          </div>
        </dl>
        <p className="ride__caption" aria-live="polite">{verdict}</p>
        <p className="ride__hint">Breathing rates are approximate.</p>
      </div>
    </div>
  )
}
