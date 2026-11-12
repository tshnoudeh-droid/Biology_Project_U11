import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LogoLockup } from './Logo'
import { IconMenu, IconX } from './Icons'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/tour', label: 'Tour', end: false },
  { to: '/book', label: 'Book', end: false },
  { to: '/about', label: 'About', end: false },
  { to: '/sources', label: 'Sources', end: false },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="nav on-dark">
      <div className="nav__inner container">
        <Link to="/" className="nav__brand" aria-label="Alvea Wellness Retreat, home">
          <LogoLockup tone="dark" />
        </Link>
        <button
          className="nav__menu-btn"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <IconX /> : <IconMenu />}
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
        <nav id="primary-nav" className={`nav__links${open ? ' is-open' : ''}`} aria-label="Primary">
          <ul>
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/book" className="btn btn--blush btn--sm nav__cta">
            Reserve
          </Link>
        </nav>
      </div>
    </header>
  )
}
