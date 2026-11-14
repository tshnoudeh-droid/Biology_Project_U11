import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Nav } from './Nav'
import { Footer } from './Footer'

export function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (pathname === '/') document.title = 'Alvea Wellness Retreat'
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }
    // wait for the page to render, then jump to the section
    const id = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'auto', block: 'start' }), 60)
    return () => window.clearTimeout(id)
  }, [pathname, hash])

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
