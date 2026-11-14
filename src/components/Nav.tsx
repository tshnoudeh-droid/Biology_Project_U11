import { useEffect, useState, type MouseEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LogoLockup } from './Logo'
import { IconMenu, IconX } from './Icons'

const links = [
  { id: 'top', label: 'Home' },
  { id: 'tour', label: 'Tour' },
  { id: 'map', label: 'Resort map' },
  { id: 'book', label: 'Book' },
  { id: 'sources', label: 'Sources' },
]

/** Nav links jump to sections of the one-page site; on stop pages they go back to the home page section. */
export function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('top')
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  useEffect(() => setOpen(false), [pathname])

  // highlight the section currently on screen
  useEffect(() => {
    if (!onHome) return
    const els = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (vis[0]) setActive(vis[0].target.id)
      },
      { rootMargin: '-80px 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [onHome])

  const jump = (id: string) => (e: MouseEvent) => {
    if (!onHome) return
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    setOpen(false)
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', id === 'top' ? '/' : `/#${id}`)
  }
  const isActive = (id: string) => (onHome ? active === id : id === 'map' && pathname.startsWith('/tour/'))

  return (
    <header className="nav on-dark">
      <div className="nav__inner container">
        <Link to="/" className="nav__brand" onClick={jump('top')}>
          <LogoLockup tone="dark" />
        </Link>
        <button className="nav__menu-btn" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen((o) => !o)}>
          {open ? <IconX /> : <IconMenu />}
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
        <nav id="primary-nav" className={`nav__links${open ? ' is-open' : ''}`} aria-label="Primary">
          <ul>
            {links.map((l) => (
              <li key={l.id}>
                <Link
                  to={l.id === 'top' ? '/' : `/#${l.id}`}
                  onClick={jump(l.id)}
                  className={`nav__link${isActive(l.id) ? ' is-active' : ''}`}
                  aria-current={isActive(l.id) ? 'location' : undefined}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/#book" onClick={jump('book')} className="btn btn--blush btn--sm nav__cta">
            Reserve
          </Link>
        </nav>
      </div>
    </header>
  )
}
