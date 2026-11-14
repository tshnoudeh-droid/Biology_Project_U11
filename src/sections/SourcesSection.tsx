import { LogoMark } from '../components/Logo'
import '../styles/about.css'

const team = [
  { name: 'Tawfic', title: 'Head Guide, Upper Airway Tours', stops: 'Stops 1–3', initials: 'T' },
  { name: 'Max', title: 'Director of Gas Exchange', stops: 'Stop 7b', initials: 'M' },
  { name: 'Ben', title: 'Chief Ventilation Officer', stops: 'Stop 8', initials: 'B' },
  { name: 'Oliver', title: 'Alveoli Spa Concierge', stops: 'Stop 7', initials: 'O' },
]

/** MLA 9 Works Cited, alphabetical. */
const works = [
  <>Betts, J. Gordon, et al. “22.1 Organs and Structures of the Respiratory System.” <em>Anatomy and Physiology 2e</em>, OpenStax, 20 Apr. 2022, openstax.org/books/anatomy-and-physiology-2e/pages/22-1-organs-and-structures-of-the-respiratory-system.</>,
  <>---. “22.3 The Process of Breathing.” <em>Anatomy and Physiology 2e</em>, OpenStax, 20 Apr. 2022, openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing.</>,
  <>---. “22.5 Transport of Gases.” <em>Anatomy and Physiology 2e</em>, OpenStax, 20 Apr. 2022, openstax.org/books/anatomy-and-physiology-2e/pages/22-5-transport-of-gases.</>,
  <>“How the Lungs Work: The Respiratory System.” <em>National Heart, Lung, and Blood Institute</em>, U.S. Department of Health and Human Services, www.nhlbi.nih.gov/health/lungs/respiratory-system. Accessed 12 Nov. 2026.</>,
  <>“How Your Lungs Work.” <em>Canadian Lung Association</em>, 22 Apr. 2024, www.lung.ca/lung-health/how-your-lungs-work-0.</>,
  <>“Human Respiratory System: The Lungs.” <em>Encyclopædia Britannica</em>, www.britannica.com/science/human-respiratory-system/The-lungs. Accessed 12 Nov. 2026.</>,
  <>“Physiology, Alveolar Tension.” <em>StatPearls</em>, StatPearls Publishing, 14 Dec. 2025, www.statpearls.com/point-of-care/17420.</>,
  <>“Respiratory System.” <em>Cleveland Clinic</em>, 9 Apr. 2024, my.clevelandclinic.org/health/body/21205-respiratory-system.</>,
]

export function SourcesSection() {
  return (
    <section id="sources" className="home-section section" aria-labelledby="sources-title">
      <div className="container sources">
        <div className="about-strip">
          <LogoMark tone="light" className="about-strip__mark" />
          <div>
            <p className="eyebrow">About</p>
            <h2>Beautiful Body-Works Travel Co.</h2>
            <p>
              Alvea Wellness was created for the SBI3U1 “Beautiful Body-Works” Travel Info assignment. Every attraction is a real structure of
              the respiratory system, in anatomical order. All diagrams were drawn for this site.
            </p>
          </div>
        </div>
        <ul className="team">
          {team.map((m) => (
            <li key={m.name} className="team__card">
              <span className="team__avatar" aria-hidden="true">
                {m.initials}
              </span>
              <span className="team__name">{m.name}</span>
              <span className="team__title">{m.title}</span>
            </li>
          ))}
        </ul>
        <h2 id="sources-title">Works Cited</h2>
        <ul className="works-cited">
          {works.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
