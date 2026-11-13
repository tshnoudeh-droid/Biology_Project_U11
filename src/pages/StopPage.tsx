import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getStop, zoneLabel } from '../data/tour'
import { diagrams } from '../diagrams'
import { rides, rideMeta } from '../rides'
import { ProgressBar } from '../components/ProgressBar'
import { Quiz } from '../components/Quiz'
import { IconArrowLeft, IconArrowRight, IconLeaf, IconMap } from '../components/Icons'
import { rich } from '../lib/rich'
import NotFound from './NotFound'
import '../styles/stop.css'

export default function StopPage() {
  const { stop: slug } = useParams()
  const { stop, prev, next } = getStop(slug)

  useEffect(() => {
    if (stop) document.title = `${stop.attraction} · ${stop.term} · Alvea`
  }, [stop])

  if (!stop) return <NotFound />

  const Diagram = diagrams[stop.diagram]
  const Ride = stop.ride ? rides[stop.ride] : undefined
  const meta = stop.ride ? rideMeta[stop.ride] : undefined
  const eyebrow = stop.number !== null ? `Stop ${stop.code} · ${stop.term}` : `${stop.attraction === 'Check-out' ? 'Departure' : 'Bonus'} · ${stop.term}`
  const progressLabel =
    stop.number !== null ? `Stop ${stop.code} of 8` : 'All 8 stops visited'

  return (
    <article className={`stop stop--${stop.zone}`} aria-labelledby="stop-title">
      <div className="stop__bar">
        <div className="container stop__bar-inner">
          <Link to="/tour" className="stop__map-link">
            <IconMap /> Resort map
          </Link>
          <ProgressBar current={stop.progress} label={progressLabel} />
        </div>
      </div>

      <header className="stop__hero">
        <div className="container">
          <p className="eyebrow">{eyebrow}</p>
          <h1 id="stop-title" className="stop__title">
            {stop.attraction}
          </h1>
          <p className="tagline stop__pitch">{stop.pitch}</p>
          <div className="stop__meta">
            <span className="chip">
              <span className="chip__dot" aria-hidden="true" />
              {zoneLabel[stop.zone]}
            </span>
          </div>
          <p className="lede stop__intro">{rich(stop.intro)}</p>
        </div>
      </header>

      <section className="stop__diagram" aria-label={`Diagram: ${stop.term}`}>
        <div className="container">
          <figure className="card diagram-card">
            <div className="diagram-scroll">
              <Diagram />
            </div>
            <figcaption className="caption">{stop.diagramCaption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="section--tight" aria-labelledby="attractions-title">
        <div className="container">
          <h2 id="attractions-title" className="stop__h2">
            Attractions at this stop
          </h2>
          <div className={`attractions attractions--${stop.cards.length}`}>
            {stop.cards.map((c) => (
              <article key={c.term} className="card attraction">
                <h3 className="attraction__term">{c.term}</h3>
                <p className="attraction__resort">{c.resort}</p>
                <p className="attraction__body">{rich(c.body)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {Ride && meta && (
        <section className="section section--dark on-dark ride-section" aria-labelledby="ride-title">
          <div className="container">
            <p className="eyebrow">{meta.eyebrow}</p>
            <h2 id="ride-title">{meta.title}</h2>
            <p className="lede">{meta.blurb}</p>
            <Ride />
          </div>
        </section>
      )}

      <section className="section--tight" aria-label="Stop details">
        <div className="container stop__extras">
          <div className="stop__side">
            <section className="card card--dark glance" aria-labelledby="glance-title">
              <p className="eyebrow" id="glance-title">
                At a glance
              </p>
              <dl>
                {stop.glance.map((g) => (
                  <div key={g.label} className="glance__item">
                    <dt className="glance__value">{g.value}</dt>
                    <dd>{g.label}</dd>
                  </div>
                ))}
              </dl>
            </section>
            <aside className="card tip" aria-labelledby="tip-title">
              <span className="tip__icon" aria-hidden="true">
                <IconLeaf />
              </span>
              <div>
                <p className="eyebrow" id="tip-title">
                  Guest tip
                </p>
                <p className="tip__text">{rich(stop.tip)}</p>
              </div>
            </aside>
          </div>
          <Quiz quiz={stop.quiz} id={stop.slug} />
        </div>
      </section>

      <nav className="stop__nav container" aria-label="Tour navigation">
        {prev ? (
          <Link to={`/tour/${prev.slug}`} className="stop__nav-link stop__nav-link--prev">
            <IconArrowLeft />
            <span>
              <span className="stop__nav-dir">Previous{prev.number !== null ? ` · Stop ${prev.code}` : ''}</span>
              <span className="stop__nav-name">{prev.attraction}</span>
            </span>
          </Link>
        ) : (
          <Link to="/tour" className="stop__nav-link stop__nav-link--prev">
            <IconArrowLeft />
            <span>
              <span className="stop__nav-dir">Back</span>
              <span className="stop__nav-name">Resort map</span>
            </span>
          </Link>
        )}
        {next ? (
          <Link to={`/tour/${next.slug}`} className="stop__nav-link stop__nav-link--next">
            <span>
              <span className="stop__nav-dir">Next{next.number !== null ? ` · Stop ${next.code}` : ''}</span>
              <span className="stop__nav-name">{next.attraction}</span>
            </span>
            <IconArrowRight />
          </Link>
        ) : (
          <Link to="/book" className="stop__nav-link stop__nav-link--next stop__nav-link--book">
            <span>
              <span className="stop__nav-dir">Tour complete</span>
              <span className="stop__nav-name">Book your stay</span>
            </span>
            <IconArrowRight />
          </Link>
        )}
      </nav>
    </article>
  )
}
