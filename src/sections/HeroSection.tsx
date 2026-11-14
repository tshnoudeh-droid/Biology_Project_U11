import { BreathingCluster } from '../components/BreathingCluster'
import { LogoMark } from '../components/Logo'
import { IconArrowRight } from '../components/Icons'

const steps = [
  { n: 1, title: 'Watch the tour', text: 'A 4-minute animated walk through the resort.', href: '#tour' },
  { n: 2, title: 'Explore the stops', text: 'Click a stop on the map to try it yourself.', href: '#map' },
  { n: 3, title: 'Book your stay', text: 'Pick a package and check in.', href: '#book' },
]

export function HeroSection() {
  return (
    <section id="top" className="home-section" aria-labelledby="hero-title">
      <div className="hero on-dark">
        <div className="container hero__inner">
          <div className="hero__copy fade-in">
            <LogoMark tone="dark" className="hero__mark" />
            <h1 id="hero-title" className="display hero__title">
              Alvea
            </h1>
            <p className="hero__sub">Wellness Retreat</p>
            <p className="tagline hero__tagline">Every breath, a destination.</p>
            <p className="hero__lede">
              A luxury resort built inside the <strong>human respiratory system</strong>. Check in at the nasal cavity, relax in the alveoli
              and check out with every exhalation.
            </p>
            <div className="hero__ctas">
              <a href="#tour" className="btn btn--blush">
                Start the tour <IconArrowRight />
              </a>
              <a href="#map" className="btn btn--ghost-dark">
                See the resort map
              </a>
            </div>
            <p className="hero__presented">Presented by Beautiful Body-Works Travel Co.</p>
          </div>
          <div className="hero__art">
            <BreathingCluster />
          </div>
        </div>
      </div>
      <nav className="howto" aria-label="How to use this site">
        <div className="container howto__inner">
          {steps.map((s) => (
            <a key={s.n} href={s.href} className="howto__step">
              <span className="howto__num">{s.n}</span>
              <span>
                <span className="howto__title">{s.title}</span>
                <span className="howto__text">{s.text}</span>
              </span>
            </a>
          ))}
        </div>
      </nav>
    </section>
  )
}
