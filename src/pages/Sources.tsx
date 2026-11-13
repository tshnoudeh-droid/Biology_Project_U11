import '../styles/about.css'

/** MLA 9 Works Cited, alphabetical. Titles of containers in italics. */
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

export default function Sources() {
  return (
    <section className="section" aria-labelledby="sources-title">
      <div className="container sources">
        <p className="eyebrow">Sources</p>
        <h1 id="sources-title">Works Cited</h1>
        <ul className="works-cited">
          {works.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
        <p className="caption">Formatted in MLA 9. Diagrams on this site are original illustrations based on these sources.</p>
      </div>
    </section>
  )
}
