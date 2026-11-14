import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AirwayArt, MAP_H, MAP_W, hotspots } from './AirwayArt'
import { numberedStops } from '../data/tour'
import { useBreath } from '../lib/useBreath'
import { rich } from '../lib/rich'
import { IconArrowRight, IconPlay, IconStop } from './Icons'
import '../styles/map.css'

/** The interactive resort map: 8 numbered stops on the airway, plus "Follow a breath". */
export function ResortMap({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const navigate = useNavigate()
  const breath = useBreath()
  const [hover, setHover] = useState<number | null>(null)
  const H = headingLevel === 1 ? 'h1' : 'h2'

  useEffect(() => () => breath.stop(), []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="map-layout on-dark">
      <div className="map-stage">
        <div className="map-canvas" style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}>
          <AirwayArt diaphragmDown={breath.diaphragmDown} trail={breath.trail} trailColor={breath.gas === 'O2' ? '#E3735E' : '#8FB3A6'} />
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
            return (
              <button
                key={s.slug}
                type="button"
                className={`hotspot${breath.lit.has(n) ? ' is-lit' : ''}${n === 7 ? ' hotspot--headline' : ''}`}
                style={{ left: `${(x / MAP_W) * 100}%`, top: `${(y / MAP_H) * 100}%` }}
                onClick={() => navigate(`/tour/${s.slug}`)}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(n)}
                onBlur={() => setHover(null)}
                aria-label={`Stop ${n}: ${s.short}, ${s.attraction}`}
              >
                <span aria-hidden="true">{n}</span>
                <span className={`hotspot__tip${hover === n ? ' is-visible' : ''}${x > 520 ? ' hotspot__tip--left' : ''}`} aria-hidden="true">
                  <span className="hotspot__tip-term">{s.short}</span>
                  <span className="hotspot__tip-name">{s.attraction}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="map-panel">
        <H className="map-panel__title">The resort map</H>
        <p className="map-panel__intro">Click a number to visit that stop. They go in the order air travels.</p>
        <ol className="map-list">
          {numberedStops.map((s) => (
            <li key={s.slug}>
              <Link to={`/tour/${s.slug}`} className="map-list__item">
                <span className="map-list__num">{s.number}</span>
                <span className="map-list__name">{s.short}</span>
                <IconArrowRight />
              </Link>
            </li>
          ))}
        </ol>
        <div className="breath-box">
          <button type="button" className="btn btn--blush breath-box__btn" onClick={breath.running ? breath.stop : breath.start}>
            {breath.running ? <IconStop /> : <IconPlay />}
            {breath.running ? 'Stop' : 'Follow one breath'}
          </button>
          <div className="breath-caption" aria-live="polite" aria-atomic="true">
            {breath.running ? (
              <>
                <span className="breath-caption__title">{breath.captionTitle}</span>
                <span className="breath-caption__text">{rich(breath.caption)}</span>
              </>
            ) : (
              <span className="breath-caption__text breath-caption__text--idle">Watch oxygen travel in, then carbon dioxide travel out.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
