import { ResortMap } from '../components/ResortMap'
import { ExtrasGrid } from '../components/ExtrasGrid'
import { resortNumbers } from '../data/numbers'

export function MapSection() {
  return (
    <section id="map" className="home-section map-page" aria-labelledby="map-step">
      <div className="container">
        <p className="eyebrow" id="map-step">
          Step 2 · Explore the stops
        </p>
        <ResortMap />
        <h3 className="extras-title">More to explore</h3>
        <ExtrasGrid />
        <dl className="mini-numbers" aria-label="Resort by the numbers">
          {resortNumbers.map((n) => (
            <div key={n.label}>
              <dt>{n.label}</dt>
              <dd>{n.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
