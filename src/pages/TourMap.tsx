import { Link } from 'react-router-dom'
import { numberedStops } from '../data/tour'

export default function TourMap() {
  return (
    <section className="section">
      <div className="container">
        <h1>Resort map</h1>
        <ol>
          {numberedStops.map((s) => (
            <li key={s.slug}>
              <Link to={`/tour/${s.slug}`}>{s.attraction}</Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
