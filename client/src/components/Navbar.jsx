import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMobileOpen(false)

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          <span className="material-icons navbar__logo-icon">delivery_dining</span>
          <span className="navbar__brand">Eddie's <strong>Delivery</strong></span>
        </Link>

        <nav className="navbar__links" aria-label="Primary">
          <Link to="/" className={loc.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/request-errand" className={loc.pathname === '/request-errand' ? 'active' : ''}>
            Request Errand
          </Link>
          <Link to="/restaurant" className={loc.pathname === '/restaurant' ? 'active' : ''}>
            Restaurants
          </Link>
        </nav>

        <div className="navbar__actions">
          <Link to="/request-errand" className="btn btn--primary btn--sm">
            <span className="material-icons icon-sm">add_circle</span>
            Request Errand
          </Link>
        </div>

        <button
          className={`navbar__hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className="material-icons">{mobileOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {mobileOpen && (
        <nav className="navbar__mobile">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/request-errand" onClick={closeMenu}>Request Errand</Link>
          <Link to="/restaurant" onClick={closeMenu}>Restaurants</Link>
          <Link to="/request-errand" className="btn btn--primary btn--sm" onClick={closeMenu}>
            Get Started
          </Link>
        </nav>
      )}
    </header>
  )
}
