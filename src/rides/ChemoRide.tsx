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
      ? 'Chemoreceptors detect rising H⁺ (from CO₂)' + (lowO2 ? ' and a large O₂ drop' : '') + ' → the medulla sends more signals → faster, deeper breathing removes extra CO₂ and pH climbs back toward 7.4.'
      : pco2 < 38
        ? 'Blood CO₂ is low and pH is high → chemoreceptors send fewer signals → breathing slows, letting CO₂ build back up.'
        : 'Blood CO₂ is normal (about 40 mm Hg) and pH is about 7.4 → steady, relaxed breathing.'

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
          <li><strong>Sensors</strong> · central chemoreceptors (brainstem) and peripheral chemoreceptors (carotid and aortic bodies)</li>
          <li><strong>Control centre</strong> · medulla oblongata (DRG integrates, VRG sets rhythm), fine-tuned by the pons</li>
          <li><strong>Effectors</strong> · diaphragm and external intercostals</li>
          <li><strong>Result</strong> · CO₂ exhaled faster or slower until blood pH is balanced</li>
        </ol>
      </div>
      <div className="ride__controls">
        <label className="slider">
          <span className="slider__label">
            Blood CO₂ (partial pressure): <strong>{pco2} mm Hg</strong>
          </span>
          <input type="range" min={34} max={56} step={1} value={pco2} onChange={(e) => setPco2(+e.target.value)} />
          <span className="slider__ends" aria-hidden="true"><span>34 · low</span><span>40 · normal</span><span>56 · high</span></span>
        </label>
        <label className="switch">
          <input type="checkbox" checked={lowO2} onChange={(e) => setLowO2(e.target.checked)} />
          <span className="switch__track" aria-hidden="true" />
          Big O₂ drop (e.g. high altitude)
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
        <p className="ride__hint">Breathing rates are illustrative; pH is calculated from CO₂ with normal bicarbonate.</p>
      </div>
    </div>
  )
}
