import { Link } from 'react-router-dom'
import { numberedStops } from '../data/tour'

/** 8 pills: current = coral, visited = sage, upcoming = pale. `current` 0–7, or 8 for "all visited". */
export function ProgressBar({ current, label }: { current: number; label: string }) {
  return (
    <nav className="progress" aria-label="Tour progress">
      <ol className="progress__pills">
        {numberedStops.map((s, i) => {
          const state = i === current ? 'current' : i < current ? 'visited' : 'upcoming'
          return (
            <li key={s.slug}>
              <Link
                to={`/tour/${s.slug}`}
                className={`progress__pill progress__pill--${state}`}
                aria-label={`Stop ${s.number}: ${s.term}${state === 'current' ? ' (current stop)' : state === 'visited' ? ' (visited)' : ''}`}
                aria-current={state === 'current' ? 'step' : undefined}
              >
                <span className="progress__tip" aria-hidden="true">
                  {s.number} · {s.term}
                </span>
              </Link>
            </li>
          )
        })}
      </ol>
      <span className="progress__label">{label}</span>
    </nav>
  )
}
