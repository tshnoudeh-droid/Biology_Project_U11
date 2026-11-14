import { Link } from 'react-router-dom'
import { BreathingCluster } from '../components/BreathingCluster'
import { LogoMark } from '../components/Logo'
import { ResortMap } from '../components/ResortMap'
import { ExtrasGrid } from '../components/ExtrasGrid'
import { FilmPlayer } from '../film/FilmPlayer'
import { IconArrowRight } from '../components/Icons'
import { resortNumbers } from '../data/numbers'
import '../styles/home.css'
import '../styles/film.css'

const steps = [
  { n: 1, title: 'Watch the tour', text: 'A 4-minute animated walk through the resort.', href: '#watch' },
  { n: 2, title: 'Explore the stops', text: 'Click any stop on the map to try it yourself.', href: '#explore' },
  { n: 3, title: 'Book your stay', text: 'Pick a package and check in.', href: '/book' },
]

export default function Home() {
  return (
    <>
      <section className="hero on-dark" aria-labelledby="hero-title">
        <div className="container hero__inner">
          <div className="hero__copy fade-in">
            <LogoMark tone="dark" className="hero__mark" />
            <h1 id="hero-title" className="display hero__title">
              Alvea
            </h1>
            <p className="hero__sub">Wellness Retreat</p>
            <p className="tagline hero__tagline">Every breath, a destination.</p>
            <p className="hero__lede">
              A luxury resort built inside the <strong>human respiratory system</strong>. Check in at the nose, relax in the alveoli and check
              out with every breath out.
            </p>
            <div className="hero__ctas">
              <a href="#watch" className="btn btn--blush">
                Start the tour <IconArrowRight />
              </a>
              <a href="#explore" className="btn btn--ghost-dark">
                See the resort map
              </a>
            </div>
            <p className="hero__presented">Presented by Beautiful Body-Works Travel Co.</p>
          </div>
          <div className="hero__art">
            <BreathingCluster />
          </div>
        </div>
      </section>

      <nav className="howto" aria-label="How to use this site">
        <div className="container howto__inner">
          {steps.map((s) =>
            s.href.startsWith('#') ? (
              <a key={s.n} href={s.href} className="howto__step">
                <span className="howto__num">{s.n}</span>
                <span>
                  <span className="howto__title">{s.title}</span>
                  <span className="howto__text">{s.text}</span>
                </span>
              </a>
            ) : (
              <Link key={s.n} to={s.href} className="howto__step">
                <span className="howto__num">{s.n}</span>
                <span>
                  <span className="howto__title">{s.title}</span>
                  <span className="howto__text">{s.text}</span>
                </span>
              </Link>
            ),
          )}
        </div>
      </nav>

      <section id="watch" className="home-film on-dark" aria-labelledby="watch-title">
        <div className="container">
          <p className="eyebrow">Step 1</p>
          <h2 id="watch-title">Watch the tour</h2>
        </div>
        <div className="home-film__player">
          <FilmPlayer />
        </div>
      </section>

      <section id="explore" className="map-page" aria-labelledby="explore-step">
        <div className="container">
          <p className="eyebrow" id="explore-step">
            Step 2 · Explore the stops
          </p>
          <ResortMap />
          <h3 className="extras-title">More to explore</h3>
          <ExtrasGrid />
        </div>
      </section>

      <section className="section section--eucalyptus" aria-labelledby="numbers-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Resort by the numbers</p>
            <h2 id="numbers-title">Your lungs, by the numbers</h2>
          </div>
          <dl className="numbers">
            {resortNumbers.map((n) => (
              <div key={n.label} className="numbers__item">
                <dt>{n.label}</dt>
                <dd>
                  <span className="numbers__value">{n.value}</span>
                  <span className="numbers__detail">{n.detail}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section book-cta" aria-labelledby="book-title">
        <div className="container book-cta__inner">
          <div>
            <p className="eyebrow">Step 3</p>
            <h2 id="book-title">Ready to check in?</h2>
            <p className="lede">Three packages, from a quick upper-airway visit to the full spa weekend.</p>
          </div>
          <Link to="/book" className="btn btn--euc">
            Book your stay <IconArrowRight />
          </Link>
        </div>
      </section>
    </>
  )
}
