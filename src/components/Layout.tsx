import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Nav } from './Nav'
import { Footer } from './Footer'

const titles: Record<string, string> = {
  '/': 'Alvea Wellness Retreat',
  '/tour/map': 'Resort Map · Alvea',
  '/book': 'Book Your Stay · Alvea',
  '/about': 'About · Alvea',
  '/sources': 'Sources · Alvea',
}

export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    if (titles[pathname]) document.title = titles[pathname]
  }, [pathname])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
