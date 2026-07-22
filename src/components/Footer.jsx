import { Link } from 'react-router-dom'
import './Footer.css'

const navLinks = [['/', 'Home'], ['/about-us', 'About Us'], ['/menu', 'Menu'], ['/testimonials', 'Testimonials'], ['/blogs', 'Blog'], ['/faq', 'FAQ'], ['/contact', 'Contact Us']]

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/hhomaha', icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/> },
  { label: 'Instagram', href: 'https://www.instagram.com/hyderabad_house_omaha/', icon: <><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></> },
  { label: 'TikTok', href: 'https://www.tiktok.com/@hhomaha', icon: <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z"/> },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__accent-bar" />
      <div className="footer__top container">

        {/* Brand */}
        <div className="footer__brand">
          <Link to="/"><img src="/images/logo.webp" alt="Hyderabad House Omaha" /></Link>
          <p>Authentic Hyderabadi cuisine in the heart of Omaha. Every meal tells a royal story.</p>
          <span className="footer__halal">100% Halal Certified</span>
          <div className="footer__socials">
            {socials.map(({ label, href, icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="footer__social-link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">{icon}</svg>
              </a>
            ))}
          </div>
        </div>

        {/* Navigate */}
        <div className="footer__col">
          <h4 className="footer__col-title">Navigate</h4>
          <ul className="footer__nav-list">
            {navLinks.map(([to, label]) => (
              <li key={to}><Link to={to}>{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Location & Hours */}
        <div className="footer__col footer__col--info">
          <div className="footer__info-block">
            <h4 className="footer__col-title">Location</h4>
            <div className="footer__location-card">
              <a href="https://maps.app.goo.gl/QKEtXfahv64saDYD6" target="_blank" rel="noreferrer" className="footer__info-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>2537 S 174th Plz,<br/>Omaha, NE 68130</span>
              </a>
              <a href="tel:+14025059209" className="footer__info-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>
                <span>+1 (402) 505-9209</span>
              </a>
            </div>
          </div>
          <div className="footer__info-block">
            <h4 className="footer__col-title">Hours</h4>
            <div className="footer__hours-row">
              <span>Mon – Sun</span>
              <span className="footer__hours-time">11am – 9pm</span>
            </div>
            <div className="footer__hours-open">
              <span className="footer__hours-dot" />
              Open Every Day
            </div>
          </div>

          {/* Mobile-only unified contact card */}
          <div className="footer__contact-card">
            <a href="https://maps.app.goo.gl/QKEtXfahv64saDYD6" target="_blank" rel="noreferrer" className="footer__contact-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>2537 S 174th Plz, Omaha, NE 68130</span>
            </a>
            <a href="tel:+14025059209" className="footer__contact-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>
              <span>+1 (402) 505-9209</span>
            </a>
            <div className="footer__contact-row footer__contact-row--hours">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              <span className="footer__contact-hours-label">Mon – Sun</span>
              <span className="footer__contact-hours-time">11am – 9pm</span>
            </div>
            <div className="footer__contact-open">
              <span className="footer__hours-dot" />
              Open Every Day
            </div>
          </div>
        </div>

      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>© {new Date().getFullYear()} Hyderabad House. All rights reserved.</span>
          <span>Omaha, Nebraska</span>
        </div>
      </div>
    </footer>
  )
}
