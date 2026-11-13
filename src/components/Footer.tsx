import { Link } from 'react-router-dom'
import { LogoLockup } from './Logo'
import { IconAt, IconGlobe, IconMail, IconPhone, IconPin } from './Icons'

export function Footer() {
  return (
    <footer className="footer on-dark" aria-labelledby="footer-heading">
      <div className="container footer__inner">
        <div className="footer__brand">
          <LogoLockup tone="dark" />
          <p className="tagline footer__tagline">Every breath, a destination.</p>
          <p className="footer__presented">
            Presented by <strong>Beautiful Body-Works Travel Co.</strong>
          </p>
        </div>

        <div>
          <h2 id="footer-heading" className="footer__heading">
            Contact the front desk
          </h2>
          <ul className="footer__contact">
            <li>
              <IconPhone />
              <span className="footer__phone">1-800-ALVEOLI</span>
            </li>
            <li>
              <IconMail />
              <span>breathe@alveawellness.com</span>
            </li>
            <li>
              <IconGlobe />
              <span>alveawellness.com</span>
            </li>
            <li>
              <IconPin />
              <span>1 Trachea Terrace, Thoracic Cavity</span>
            </li>
            <li>
              <IconAt />
              <span>@alvea.breathes</span>
            </li>
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="footer__heading">Explore</h2>
          <ul className="footer__links">
            <li><Link to="/tour">Watch the tour</Link></li>
            <li><Link to="/tour/map">Resort map</Link></li>
            <li><Link to="/tour/nasal-cavity">Start at Stop 1</Link></li>
            <li><Link to="/tour/advisories">Travel advisories</Link></li>
            <li><Link to="/book">Book your stay</Link></li>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/sources">Sources</Link></li>
          </ul>
        </nav>
      </div>
      <div className="container footer__base">
        <p>Alvea Wellness is a fictional resort created for an SBI3U1 biology project.</p>
        <p>Alvea is a smoke- and vape-free resort.</p>
      </div>
    </footer>
  )
}
