import { Link } from 'react-router-dom'
import { numberedStops, type Stop } from '../data/tour'

/** Big, labelled journey stepper: 1 Nose → 8 Diaphragm. Current stop is highlighted. */
export function Stepper({ stop }: { stop: Stop }) {
  const current = stop.progress
  return (
    <nav className="stepper" aria-label="Tour stops">
      <ol className="stepper__list">
        {numberedStops.map((s, i) => {
          const state = i === current ? 'current' : i < current ? 'done' : 'todo'
          return (
            <li key={s.slug} className={`stepper__item stepper__item--${state}`}>
              <Link to={`/tour/${s.slug}`} className="stepper__link" aria-current={state === 'current' ? 'step' : undefined}>
                <span className="stepper__num">{s.number}</span>
                <span className="stepper__name">{s.short}</span>
              </Link>
            </li>
          )
        })}
      </ol>
      {stop.number === null && <span className="stepper__extra">Extra · {stop.short}</span>}
    </nav>
  )
}
