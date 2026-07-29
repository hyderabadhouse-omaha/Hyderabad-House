import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import liquidGlass from '../lib/liquidGlass'
import './Navbar.css'

const links = [
  { to: '/',          label: 'Home' },
  { to: '/about-us', label: 'About' },
  { to: '/menu',     label: 'Menu' },
  { to: '/blogs',    label: 'Blog' },
  { to: '/contact',  label: 'Contact Us' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const { pathname }            = useLocation()
  const navRef                  = useRef(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Apply liquid-glass refraction filter to the navbar element (Chromium only —
  // Safari/Firefox get the CSS backdrop-filter fallback automatically).
  useEffect(() => {
    if (!navRef.current) return
    // Defer the SVG-filter build until the browser is idle so it never
    // competes with the hero LCP paint on slow mobile networks.
    let glass = null
    const init = () => {
      if (!navRef.current) return
      glass = liquidGlass(navRef.current, {
        scale: -90,
        chroma: 5,
        border: 0.08,
        mapBlur: 14,
        blur: 6,
        saturate: 1.6,
        fallbackBlur: 22,
      })
    }
    const id = 'requestIdleCallback' in window
      ? requestIdleCallback(init, { timeout: 2000 })
      : setTimeout(init, 1200)
    return () => {
      if ('requestIdleCallback' in window) cancelIdleCallback(id)
      else clearTimeout(id)
      if (glass) glass.destroy()
    }
  }, [])

  useEffect(() => { setOpen(false); window.scrollTo(0, 0) }, [pathname])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header ref={navRef} className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar__inner">

          <Link to="/" className="navbar__logo">
            <img src="/images/logo.webp" alt="Hyderabad House Omaha" />
          </Link>

          <nav className="navbar__nav" aria-label="Main navigation">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'}
                className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="navbar__right">
            <a href="https://hyderabadhouse.hungerrush.com/Order/OrderType"
              target="_blank" rel="noreferrer"
              className="navbar__order btn btn-primary">
              Order Now
            </a>

            <button
              className={`navbar__burger${open ? ' open' : ''}`}
              onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Portal — escapes the navbar's transform stacking context */}
      {createPortal(
        <div className={`navbar__drawer${open ? ' open' : ''}`} aria-hidden={!open}>

          {/* Close button */}
          <button
            className="navbar__drawer-close"
            onClick={() => setOpen(false)}
            aria-label="Close menu">
            <span /><span />
          </button>

          <nav className="navbar__drawer-nav">
            {links.map((l, i) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'}
                className={({ isActive }) => `navbar__drawer-link${isActive ? ' active' : ''}`}
                style={{ '--stagger': `${i * 0.06 + 0.08}s` }}>
                <span className="navbar__drawer-num">0{i + 1}</span>
                <span className="navbar__drawer-label">{l.label}</span>
                <span className="navbar__drawer-arrow">→</span>
              </NavLink>
            ))}
          </nav>

          <a href="https://hyderabadhouse.hungerrush.com/Order/OrderType"
            target="_blank" rel="noreferrer"
            className="btn btn-primary navbar__drawer-cta">
            Order Online
          </a>
        </div>,
        document.body
      )}
    </>
  )
}
