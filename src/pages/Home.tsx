import { Link } from 'react-router-dom'
import { BreathingCluster } from '../components/BreathingCluster'
import { LogoMark } from '../components/Logo'
import { IconArrowRight, IconBalance, IconExit, IconMap, IconNose, IconO2, IconWave } from '../components/Icons'
import { resortNumbers } from '../data/numbers'
import { tourStops } from '../data/tour'
import { rich } from '../lib/rich'
import '../styles/home.css'

const services = [
  {
    icon: <IconO2 />,
    eyebrow: 'Service 01',
    title: 'Oxygen delivery',
    body: '**Oxygen (O₂)** diffuses from the alveoli into the blood, where it binds to **hemoglobin** in red blood cells and is carried to every cell for **cellular respiration**.',
  },
  {
    icon: <IconExit />,
    eyebrow: 'Service 02',
    title: 'Waste check-out (CO₂)',
    body: '**Carbon dioxide (CO₂)**, a waste product of cellular respiration, diffuses out of the blood into the alveoli and leaves on every exhale.',
  },
  {
    icon: <IconBalance />,
    eyebrow: 'Service 03',
    title: 'pH balance',
    body: 'CO₂ forms **carbonic acid** in the blood. By changing how fast and deep you breathe, the body removes more or less CO₂ to keep **blood pH** near 7.4.',
  },
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
              A luxury retreat located entirely inside the <strong>human respiratory system</strong>. Check in at the
              nose, unwind in 480 million alveolar suites and check out with every exhale.
            </p>
            <div className="hero__ctas">
              <Link to="/tour" className="btn btn--blush">
                Take the tour <IconArrowRight />
              </Link>
              <Link to="/book" className="btn btn--ghost-dark">
                Book your stay
              </Link>
            </div>
            <p className="hero__presented">Presented by Beautiful Body-Works Travel Co.</p>
          </div>
          <div className="hero__art">
            <BreathingCluster />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">What we do</p>
            <h2 id="services-title">Three essential services</h2>
            <p className="lede">
              Behind the spa towels, Alvea runs the body's <strong>gas exchange</strong>: bringing oxygen in, sending
              carbon dioxide out and keeping your blood chemistry in balance.
            </p>
          </div>
          <div className="grid grid--3">
            {services.map((s) => (
              <article key={s.title} className="card service">
                <span className="service__icon">{s.icon}</span>
                <p className="eyebrow">{s.eyebrow}</p>
                <h3>{s.title}</h3>
                <p>
                  {rich(s.body)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--mist2" aria-labelledby="bonus-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Bonus amenities</p>
            <h2 id="bonus-title">Included with every stay</h2>
          </div>
          <div className="grid grid--2">
            <article className="card amenity">
              <span className="service__icon">
                <IconNose />
              </span>
              <div>
                <h3>Smell (olfaction)</h3>
                <p>
                  The <strong>olfactory epithelium</strong> in the roof of the nasal cavity holds odour receptors. Visit
                  our <Link to="/tour/nasal-cavity">Aromatherapy Suite</Link> at Stop 1.
                </p>
              </div>
            </article>
            <article className="card amenity">
              <span className="service__icon">
                <IconWave />
              </span>
              <div>
                <h3>Speech (voice production)</h3>
                <p>
                  Exhaled air makes the <strong>true vocal cords</strong> in the larynx vibrate. Catch a show at the{' '}
                  <Link to="/tour/larynx">Voice Box Concert Hall</Link>, Stop 3.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--eucalyptus" aria-labelledby="numbers-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Resort by the numbers</p>
            <h2 id="numbers-title">A destination built to scale</h2>
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

      <section className="section" aria-labelledby="itinerary-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Your itinerary</p>
            <h2 id="itinerary-title">Eight stops, in the order air travels</h2>
            <p className="lede">
              From the nostrils to the alveoli, plus the muscle that powers every trip. Stops 1 to 6 form the{' '}
              <strong>conducting zone</strong>; Stop 7 is the <strong>respiratory zone</strong>, where gas exchange
              happens.
            </p>
          </div>
          <ol className="itinerary">
            {tourStops
              .filter((s) => s.number !== null && !s.sub)
              .map((s) => (
                <li key={s.slug}>
                  <Link to={`/tour/${s.slug}`} className="itinerary__item">
                    <span className="itinerary__num">{s.number}</span>
                    <span className="itinerary__text">
                      <span className="itinerary__term">{s.term}</span>
                      <span className="itinerary__name">{s.attraction}</span>
                    </span>
                    <IconArrowRight className="itinerary__arrow" />
                  </Link>
                </li>
              ))}
          </ol>
          <div className="center" style={{ marginTop: 40 }}>
            <Link to="/tour" className="btn btn--euc">
              <IconMap /> Open the resort map
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
