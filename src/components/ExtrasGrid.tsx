import { Link } from 'react-router-dom'
import { extraStops } from '../data/tour'
import { IconArrowRight } from './Icons'

const blurb: Record<string, string> = {
  'gas-exchange': 'How oxygen gets into your blood',
  concierge: 'How your brain controls breathing',
  'check-out': 'The route air takes on the way out',
  advisories: 'Asthma, emphysema and more',
}

/** Bonus pages, shown as clear cards so nothing is hidden. */
export function ExtrasGrid() {
  return (
    <div className="extras">
      {extraStops.map((s) => (
        <Link key={s.slug} to={`/tour/${s.slug}`} className="extra">
          <span className="extra__tag">{s.sub ? 'After Stop 7' : 'Extra'}</span>
          <span className="extra__name">{s.short}</span>
          <span className="extra__blurb">{blurb[s.slug]}</span>
          <IconArrowRight className="extra__arrow" />
        </Link>
      ))}
    </div>
  )
}
