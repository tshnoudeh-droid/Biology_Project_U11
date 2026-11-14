import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getStop } from '../data/tour'
import { figures } from '../figures'
import { Stepper } from '../components/Stepper'
import { Quiz } from '../components/Quiz'
import { IconArrowLeft, IconArrowRight } from '../components/Icons'
import { rich } from '../lib/rich'
import NotFound from './NotFound'
import '../styles/stop.css'

/** One template for every stop: hero → one interactive figure → key facts → quiz. */
export default function StopPage() {
  const { stop: slug } = useParams()
  const { stop, prev, next } = getStop(slug)

  useEffect(() => {
    if (stop) document.title = `${stop.term} · ${stop.attraction} · Alvea`
  }, [stop])

  if (!stop) return <NotFound />
  const Fig = figures[stop.slug]

  return (
    <article className="stop" aria-labelledby="stop-title">
      <Stepper stop={stop} />

      <header className="stop__hero container">
        <div className="stop__badge" aria-hidden="true">
          {stop.number !== null ? stop.code : '+'}
        </div>
        <div>
          <p className="eyebrow">
            {stop.number !== null ? `Stop ${stop.code} of 8` : 'Extra'} · {stop.term}
          </p>
          <h1 id="stop-title" className="stop__title">
            {stop.attraction}
          </h1>
          <p className="stop__intro">{rich(stop.intro)}</p>
        </div>
      </header>

      <section className="container stop__block" aria-label={`Interactive figure: ${stop.term}`}>
        <Fig />
      </section>

      <section className="container stop__block" aria-labelledby="facts-title">
        <h2 id="facts-title" className="stop__h2">
          Key facts
        </h2>
        <div className="facts">
          {stop.cards.map((c) => (
            <article key={c.term} className="fact">
              <h3 className="fact__term">{c.term}</h3>
              <p className="fact__resort">{c.resort}</p>
              <p className="fact__body">{rich(c.body)}</p>
            </article>
          ))}
        </div>
        <p className="stop__tip">
          <strong>{stop.glance[0].value}</strong> {stop.glance[0].label}. <span>{rich(stop.tip)}</span>
        </p>
      </section>

      <section className="container stop__block stop__quiz" aria-label="Quiz">
        <Quiz quiz={stop.quiz} id={stop.slug} />
      </section>

      <nav className="container stop__nav" aria-label="Previous and next stop">
        <Link to={prev ? `/tour/${prev.slug}` : '/#map'} className="stop__nav-link">
          <IconArrowLeft />
          <span>
            <span className="stop__nav-dir">Back</span>
            <span className="stop__nav-name">{prev ? prev.short : 'Resort map'}</span>
          </span>
        </Link>
        <Link to="/#map" className="stop__nav-map">
          All stops
        </Link>
        <Link to={next ? `/tour/${next.slug}` : '/#book'} className="stop__nav-link stop__nav-link--next">
          <span>
            <span className="stop__nav-dir">{next ? 'Next' : 'Finished!'}</span>
            <span className="stop__nav-name">{next ? next.short : 'Book your stay'}</span>
          </span>
          <IconArrowRight />
        </Link>
      </nav>
    </article>
  )
}
