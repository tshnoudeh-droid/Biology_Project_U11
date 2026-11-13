import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AirwayArt, MAP_H, MAP_W, hotspots } from '../components/AirwayArt'
import { numberedStops, tourStops } from '../data/tour'
import { useBreath } from '../lib/useBreath'
import { rich } from '../lib/rich'
import { IconArrowRight, IconPlay, IconStop } from '../components/Icons'
import '../styles/map.css'

type ZoneKey = 'conducting' | 'respiratory' | 'ventilation'

const zones: { key: ZoneKey; label: string; stops: number[]; note: string }[] = [
  { key: 'conducting', label: 'Conducting zone', stops: [1, 2, 3, 4, 5, 6], note: 'Stops 1–6 · moves, cleans and warms air. No gas exchange.' },
  { key: 'respiratory', label: 'Respiratory zone', stops: [7], note: 'Stop 7 · alveoli, where gas exchange happens.' },
  { key: 'ventilation', label: 'Ventilation', stops: [8], note: 'Stop 8 · the diaphragm powers every breath.' },
]

const bonus = tourStops.filter((s) => s.number === null || s.sub)

export default function TourMap() {
  const navigate = useNavigate()
  const breath = useBreath()
  const [zone, setZone] = useState<ZoneKey | null>(null)
  const [hover, setHover] = useState<number | null>(null)
  const activeZone = zones.find((z) => z.key === zone)

  useEffect(() => {
    // stop the animation if the user leaves the page
    return () => breath.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="map-page on-dark" aria-labelledby="map-title">
      <div className="container map-page__inner">
        <div className="map-stage">
          <div className="map-canvas" style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}>
            <AirwayArt zone={zone} diaphragmDown={breath.diaphragmDown} trail={breath.trail} trailColor={breath.gas === 'O2' ? '#E3735E' : '#8FB3A6'} />

            {breath.particle && (
              <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="map-particle-layer" aria-hidden="true">
                <g transform={`translate(${breath.particle[0]} ${breath.particle[1]})`}>
                  <circle r="34" fill={breath.gas === 'O2' ? '#E3735E' : '#8FB3A6'} opacity="0.3" className="map-particle-glow" />
                  <circle r="21" fill={breath.gas === 'O2' ? '#E3735E' : '#8FB3A6'} stroke="#FBFCFB" strokeWidth="2" />
                  <text y="5" textAnchor="middle" className="map-particle-text">
                    {breath.gas === 'O2' ? 'O₂' : 'CO₂'}
                  </text>
                </g>
              </svg>
            )}

            {numberedStops.map((s) => {
              const n = s.number as number
              const [x, y] = hotspots[n]
              const inZone = !activeZone || activeZone.stops.includes(n)
              const lit = breath.lit.has(n)
              return (
                <button
                  key={s.slug}
                  type="button"
                  className={`hotspot${lit ? ' is-lit' : ''}${inZone ? '' : ' is-dim'}${activeZone && inZone ? ' is-zone' : ''}${n === 7 ? ' hotspot--headline' : ''}`}
                  style={{ left: `${(x / MAP_W) * 100}%`, top: `${(y / MAP_H) * 100}%` }}
                  onClick={() => navigate(`/tour/${s.slug}`)}
                  onMouseEnter={() => setHover(n)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(n)}
                  onBlur={() => setHover(null)}
                  aria-label={`Stop ${n}: ${s.term}, ${s.attraction}. Open stop page.`}
                >
                  <span aria-hidden="true">{n}</span>
                  <span className={`hotspot__tip${hover === n ? ' is-visible' : ''}${x > 520 ? ' hotspot__tip--left' : ''}`} aria-hidden="true">
                    <span className="hotspot__tip-term">{s.term}</span>
                    <span className="hotspot__tip-name">{s.attraction}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="map-panel">
          <p className="eyebrow">Interactive resort map</p>
          <h1 id="map-title" className="map-panel__title">
            Follow the route of every breath
          </h1>
          <p className="map-panel__intro">
            Eight stops in anatomical order, from the nostrils to the alveoli, plus the diaphragm that powers the trip.
            Click a numbered stop to visit it.
          </p>

          <div className="breath-box">
            <button type="button" className="btn btn--blush breath-box__btn" onClick={breath.running ? breath.stop : breath.start}>
              {breath.running ? <IconStop /> : <IconPlay />}
              {breath.running ? 'Stop the breath' : 'Follow a breath'}
            </button>
            <div className="breath-caption" aria-live="polite" aria-atomic="true">
              {breath.running ? (
                <>
                  <span className="breath-caption__title">{breath.captionTitle}</span>
                  <span className="breath-caption__text">{rich(breath.caption)}</span>
                </>
              ) : (
                <span className="breath-caption__text breath-caption__text--idle">
                  Press <strong>Follow a breath</strong> to send an oxygen molecule from the nose to the alveoli, then
                  watch carbon dioxide travel back out.
                </span>
              )}
            </div>
            <div className="breath-key" aria-hidden="true">
              <span><i className="dot dot--o2" /> O₂ in (inhale)</span>
              <span><i className="dot dot--co2" /> CO₂ out (exhale)</span>
            </div>
          </div>

          <div className="zone-legend" role="group" aria-label="Highlight a zone on the map">
            <p className="eyebrow">Zone legend</p>
            {zones.map((z) => (
              <button
                key={z.key}
                type="button"
                className={`zone-btn zone-btn--${z.key}`}
                aria-pressed={zone === z.key}
                onClick={() => setZone((cur) => (cur === z.key ? null : z.key))}
                onMouseEnter={() => setZone(z.key)}
                onMouseLeave={() => setZone(null)}
              >
                <span className="zone-btn__swatch" aria-hidden="true" />
                <span>
                  <span className="zone-btn__label">{z.label}</span>
                  <span className="zone-btn__note">{z.note}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="map-bonus">
            <p className="eyebrow">Also on the grounds</p>
            <ul>
              {bonus.map((b) => (
                <li key={b.slug}>
                  <Link to={`/tour/${b.slug}`}>
                    {b.attraction} <IconArrowRight />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link to="/tour/nasal-cavity" className="btn btn--ghost-dark map-start">
            Start at Stop 1 <IconArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}
