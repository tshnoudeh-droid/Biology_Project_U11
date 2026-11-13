import { Link } from 'react-router-dom'
import { LogoMark } from '../components/Logo'
import '../styles/about.css'

const team = [
  { name: 'Tawfic', title: 'Head Guide, Upper Airway Tours', stops: 'Stops 1–3', initials: 'T' },
  { name: 'Max', title: 'Director of Gas Exchange', stops: 'Stop 7b', initials: 'M' },
  { name: 'Ben', title: 'Chief Ventilation Officer', stops: 'Stop 8', initials: 'B' },
  { name: 'Oliver', title: 'Alveoli Spa Concierge', stops: 'Stop 7', initials: 'O' },
]

export default function About() {
  return (
    <>
      <section className="section about-hero on-dark" aria-labelledby="about-title">
        <div className="container about-hero__inner">
          <LogoMark tone="dark" className="about-hero__mark" />
          <div>
            <p className="eyebrow">About us</p>
            <h1 id="about-title">Beautiful Body-Works Travel Co.</h1>
            <p className="lede">
              We design luxury getaways inside the human body. Alvea Wellness, our flagship retreat, is built entirely within the
              respiratory system: a place where every guest arrives with an inhale and leaves with an exhale.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="team-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Meet the team</p>
            <h2 id="team-title">Your hosts at Alvea</h2>
          </div>
          <ul className="team">
            {team.map((m) => (
              <li key={m.name} className="card team__card">
                <span className="team__avatar" aria-hidden="true">
                  {m.initials}
                </span>
                <h3>{m.name}</h3>
                <p className="team__title">{m.title}</p>
                <p className="caption">{m.stops}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--mist2" aria-labelledby="project-title">
        <div className="container about-project">
          <div>
            <p className="eyebrow">The project</p>
            <h2 id="project-title">Why a resort?</h2>
          </div>
          <div>
            <p>
              Alvea Wellness was created for the SBI3U1 “Beautiful Body-Works” Travel Info assignment. Every attraction is a real
              structure of the respiratory system, presented in anatomical order with its function explained in proper terminology.
              The tourism names are just there to make the trip memorable.
            </p>
            <p>
              All diagrams were drawn by hand as SVG for this site. Facts were checked against the sources listed on our{' '}
              <Link to="/sources">Sources</Link> page.
            </p>
            <p className="caption">Alvea Wellness is a fictional resort. Please don’t try to check in.</p>
          </div>
        </div>
      </section>
    </>
  )
}
