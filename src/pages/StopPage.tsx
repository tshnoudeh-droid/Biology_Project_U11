import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getStop } from '../data/tour'
import { diagrams } from '../diagrams'
import { rides, rideMeta } from '../rides'
import { Stepper } from '../components/Stepper'
import { Quiz } from '../components/Quiz'
import { IconArrowLeft, IconArrowRight } from '../components/Icons'
import { rich } from '../lib/rich'
import NotFound from './NotFound'
import '../styles/stop.css'

export default function StopPage() {
  const { stop: slug } = useParams()
  const { stop, prev, next } = getStop(slug)

  useEffect(() => {
    if (stop) document.title = `${stop.short} · ${stop.attraction} · Alvea`
  }, [stop])

  if (!stop) return <NotFound />

  const Diagram = diagrams[stop.diagram]
  const Ride = stop.ride ? rides[stop.ride] : undefined
  const meta = stop.ride ? rideMeta[stop.ride] : undefined
  const label = stop.number !== null ? `Stop ${stop.code} of 8` : 'Extra'

  return (
    <article className="stop" aria-labelledby="stop-title">
      <Stepper stop={stop} />

      <header className="stop__hero container">
        <div className="stop__badge" aria-hidden="true">
          {stop.number !== null ? stop.code : '+'}
        </div>
        <div>
          <p className="eyebrow">
            {label} · {stop.term}
          </p>
          <h1 id="stop-title" className="stop__title">
            {stop.attraction}
          </h1>
          <p className="stop__intro">{rich(stop.intro)}</p>
        </div>
      </header>

      {Ride && meta && (
        <section className="container stop__block" aria-labelledby="try-title">
          <div className="stop__block-head">
            <h2 id="try-title" className="stop__h2">
              <span className="stop__h2-tag">Try it</span> {meta.title}
            </h2>
            <p className="stop__sub">{meta.blurb}</p>
          </div>
          <Ride />
        </section>
      )}

      <section className="container stop__block" aria-labelledby="diagram-title">
        <div className="stop__block-head">
          <h2 id="diagram-title" className="stop__h2">
            <span className="stop__h2-tag">Look closer</span> {stop.term}
          </h2>
          <p className="stop__sub">{stop.diagramCaption}</p>
        </div>
        <figure className="panel diagram-card">
          <div className="diagram-scroll">
            <Diagram />
          </div>
        </figure>
      </section>

      <section className="container stop__block" aria-labelledby="facts-title">
        <h2 id="facts-title" className="stop__h2">
          <span className="stop__h2-tag">Key facts</span> What to remember
        </h2>
        <div className="facts">
          {stop.cards.map((c, i) => (
            <article key={c.term} className="panel fact">
              <span className="fact__num">{i + 1}</span>
              <h3 className="fact__term">{c.term}</h3>
              <p className="fact__resort">{c.resort}</p>
              <p className="fact__body">{rich(c.body)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container stop__block stop__end" aria-label="Quiz and tip">
        <Quiz quiz={stop.quiz} id={stop.slug} />
        <aside className="panel panel--dark good">
          <p className="good__value">{stop.glance[0].value}</p>
          <p className="good__label">{stop.glance[0].label}</p>
          <hr />
          <p className="eyebrow">Guest tip</p>
          <p className="good__tip">{rich(stop.tip)}</p>
        </aside>
      </section>

      <nav className="container stop__nav" aria-label="Previous and next stop">
        {prev ? (
          <Link to={`/tour/${prev.slug}`} className="stop__nav-link">
            <IconArrowLeft />
            <span>
              <span className="stop__nav-dir">Back</span>
              <span className="stop__nav-name">{prev.short}</span>
            </span>
          </Link>
        ) : (
          <Link to="/stops" className="stop__nav-link">
            <IconArrowLeft />
            <span>
              <span className="stop__nav-dir">Back</span>
              <span className="stop__nav-name">Resort map</span>
            </span>
          </Link>
        )}
        <Link to="/stops" className="stop__nav-map">
          All stops
        </Link>
        {next ? (
          <Link to={`/tour/${next.slug}`} className="stop__nav-link stop__nav-link--next">
            <span>
              <span className="stop__nav-dir">Next</span>
              <span className="stop__nav-name">{next.short}</span>
            </span>
            <IconArrowRight />
          </Link>
        ) : (
          <Link to="/book" className="stop__nav-link stop__nav-link--next">
            <span>
              <span className="stop__nav-dir">Finished!</span>
              <span className="stop__nav-name">Book your stay</span>
            </span>
            <IconArrowRight />
          </Link>
        )}
      </nav>
    </article>
  )
}
