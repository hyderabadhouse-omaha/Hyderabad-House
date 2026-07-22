import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import useScrollReveal from '../hooks/useScrollReveal'
import './AboutUs.css'

const stats = [
  { value: '5000+', label: 'Happy Guests' },
  { value: '50+', label: 'Menu Items' },
  { value: '98%', label: 'Positive Feedback' },
  { value: '4.5★', label: 'Google Rating' },
]

const pillars = [
  {
    num: '01',
    title: 'Menu for Every Taste',
    desc: 'From spicy biryanis and rich curries to comforting vegetarian delights, our extensive menu caters to every craving and palate.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h18a9 9 0 0 1-9 9 9 9 0 0 1-9-9z" fill="currentColor" fillOpacity="0.18" />
        <path d="M2 12h20" />
        <path d="M8 8c0-1 1-1.5 1-2.5S8 4 8 3" strokeOpacity="0.7" />
        <path d="M12 8c0-1 1-1.5 1-2.5S12 4 12 3" strokeOpacity="0.7" />
        <path d="M16 8c0-1 1-1.5 1-2.5S16 4 16 3" strokeOpacity="0.7" />
      </svg>
    ),
    symbol: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 10.4h20a10 10 0 0 1-9 9.95V22a1 1 0 0 1-2 0v-1.65A10 10 0 0 1 2 10.4z" />
        <path d="M12 2c-2 0-3.5 1.6-3.5 3.6 0 1.3.7 2.4 1.7 3h3.6c1-.6 1.7-1.7 1.7-3C15.5 3.6 14 2 12 2z" fillOpacity="0.55" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Always Fresh Ingredients',
    desc: 'Every dish is prepared using handpicked spices, tender meats, and garden-fresh produce. Freshness is our commitment.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" fill="currentColor" fillOpacity="0.16" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        <path d="M13.6 8.4c-1.6 1.3-2.9 3-3.8 5.1" strokeOpacity="0.5" />
      </svg>
    ),
    symbol: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Experienced Chefs',
    desc: "Our chefs bring decades of culinary mastery from Hyderabad's royal kitchens, blending tradition, technique, and passion into every bite.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 14A4 4 0 0 1 7.41 6.3 5.1 5.1 0 0 1 8.46 4.76a5 5 0 0 1 7.08 0A5.1 5.1 0 0 1 16.59 6.3 4 4 0 0 1 18 14v3H6z" fill="currentColor" fillOpacity="0.16" />
        <path d="M6.5 17h11v2.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 6.5 19.5z" />
        <path d="M10 17.4v3.1M12 17.4v3.1M14 17.4v3.1" strokeOpacity="0.5" />
      </svg>
    ),
    symbol: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 14.5A4.2 4.2 0 0 1 7.5 6.4 5.3 5.3 0 0 1 8.6 4.8a5.2 5.2 0 0 1 6.8 0 5.3 5.3 0 0 1 1.1 1.6A4.2 4.2 0 0 1 18 14.5V16H6z" />
        <path d="M6.4 17.2h11.2v2.3a1.5 1.5 0 0 1-1.5 1.5H7.9a1.5 1.5 0 0 1-1.5-1.5z" fillOpacity="0.55" />
      </svg>
    ),
  },
]

export default function AboutUs() {
  useScrollReveal()

  return (
    <main className="about-page">
      <PageHero
        title="Story of Our Restaurant"
        subtitle="Discover why Hyderabad House is Omaha's favorite destination for authentic Hyderabadi flavors."
        bgImage="/images/dishes.png"
      />

      {/* ── Invite ──────────────────────── */}
      <section className="section about-invite">
        <div className="container about-invite__grid">
          <div className="about-invite__head reveal from-left">
            <span className="accent-bar" />
            <span className="label">Our Story</span>
            <h2 className="heading about-invite__heading">A Legacy of Royal Flavors,<br /><em>Reimagined in Omaha</em></h2>
            <p className="body-lg about-invite__lead">Bringing the centuries-old flavors of India's Deccan region to the heart of Omaha.</p>
          </div>

          <div className="about-invite__visual reveal from-right">
            <div className="about-invite__img-main">
              <img src="/images/storefront.png" alt="Hyderabad House Omaha storefront" />
              <div className="about-invite__img-glow" />
            </div>
            <div className="about-invite__badge">
              <div className="about-invite__badge-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l2 5h5l-4 3.5L17 16l-5-3-5 3 2-5.5L5 7h5z" fill="currentColor" fillOpacity="0.2" />
                </svg>
              </div>
              <div>
                <span className="about-invite__badge-num">Rooted in</span>
                <span className="about-invite__badge-txt">Deccan Heritage</span>
              </div>
            </div>
            <div className="about-invite__accent" aria-hidden="true">
              <svg viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="58" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" />
                <circle cx="60" cy="60" r="42" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
              </svg>
            </div>
          </div>

          <div className="about-invite__body reveal from-left">
            <p className="about-invite__para">Our cuisine blends Mughlai richness with South Indian spice. Signature dishes like slow-cooked <strong>dum biryani</strong>, smoky <strong>chicken tikka masala</strong>, and hand-charred <strong>lamb seekh kebab</strong> are prepared using recipes passed down through generations.</p>
            <p className="about-invite__para">More than a restaurant, we're a gathering place. With warm hospitality and a private party hall for events, every visit feels like coming home.</p>

            <div className="about-invite__features">
              <div className="about-invite__feat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                  <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.3l-4.8 2.5.9-5.4L4.2 7.7l5.4-.8z" fill="currentColor" fillOpacity="0.16" />
                </svg>
                <span>Authentic Recipes</span>
              </div>
              <div className="about-invite__feat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                  <path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6.5-7 11-7 11z" fill="currentColor" fillOpacity="0.14" />
                </svg>
                <span>Family Owned</span>
              </div>
            </div>

            <Link to="/contact" className="btn btn-primary about-invite__cta">Get in Touch</Link>
          </div>
        </div>
      </section>

      {/* ── Chef ──────────────────────────── */}
      <section className="section about-chef">
        <div className="container about-chef__grid">
          <div className="about-chef__head reveal from-right">
            <span className="accent-bar" />
            <span className="label">Meet Our Chef</span>
            <h2 className="heading about-chef__name">Chef Sudarsan</h2>
            <span className="about-chef__role">Head Chef</span>
          </div>

          <div className="about-chef__portrait reveal from-left">
            <div className="about-chef__frame">
              <img src="/images/chef-sudarsan.png" alt="Chef Sudarsan" />
            </div>
            <div className="about-chef__stat-badge">
              <span className="about-chef__stat-num">10<em>+</em></span>
              <span className="about-chef__stat-lbl">Years<br/>Experience</span>
            </div>
            <div className="about-chef__accent" aria-hidden="true">
              <svg viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="58" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" />
                <circle cx="60" cy="60" r="42" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
              </svg>
            </div>
          </div>

          <div className="about-chef__body reveal from-right">
            <p className="about-chef__quote">"Great food carries the soul of the person cooking it."</p>
            <p className="about-chef__para">With 10+ years leading kitchens at India's top restaurants and now in the U.S., Chef Sudarsan brings traditional Hyderabadi technique to every dish he creates. From slow-cooked biryani to hand-charred kebabs, each plate reflects the depth of his craft and the flavors he grew up loving.</p>

            <div className="about-chef__creds">
              <div className="about-chef__cred">
                <div className="about-chef__cred-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3 6 6 1-4.5 4.5 1 6-5.5-3-5.5 3 1-6L3 9l6-1z" fill="currentColor" fillOpacity="0.18" />
                  </svg>
                </div>
                <span className="about-chef__cred-t">10+ Years Experience</span>
              </div>
              <div className="about-chef__cred">
                <div className="about-chef__cred-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.18" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15 15 0 0 1 0 20" />
                    <path d="M12 2a15 15 0 0 0 0 20" />
                  </svg>
                </div>
                <span className="about-chef__cred-t">International Kitchens</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pillars ──────────────────────────── */}
      <section className="section about-pillars texture-dots">
        <div className="container">
          <div className="about-pillars__head reveal">
            <span className="accent-bar center" />
            <span className="label" style={{ display: 'block', textAlign: 'center', marginBottom: 16 }}>Our Promise</span>
            <h2 className="heading about-pillars__title">What We Stand For</h2>
          </div>
          <div className="about-pillars__grid">
            {pillars.map((p, i) => (
              <div key={i} className={`about-pillars__card reveal delay-${i + 1}`}>
                <span className="about-pillars__watermark" aria-hidden="true">{p.symbol}</span>
                <div className="about-pillars__icon">{p.icon}</div>
                <span className="about-pillars__num">{p.num}</span>
                <h3 className="about-pillars__card-title">{p.title}</h3>
                <p className="body-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────── */}
      <section className="about-stats">
        <div className="about-stats__bg" />
        <div className="container about-stats__grid">
          {stats.map((s, i) => (
            <div key={i} className={`about-stats__item reveal delay-${i + 1}`}>
              <span className="about-stats__value">{s.value}</span>
              <span className="about-stats__label label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Plan Your Visit ──────────────────────────── */}
      <section className="section about-visit">
        <div className="container">
          <div className="about-visit__panel reveal">
            <div className="about-visit__media">
              <img src="/images/flavors.png" alt="Signature Hyderabadi dishes at Hyderabad House" />
              <div className="about-visit__media-tint" />
              <div className="about-visit__pin">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4.5 8-13a8 8 0 0 0-16 0c0 8.5 8 13 8 13z" fill="currentColor" fillOpacity="0.3" />
                  <circle cx="12" cy="9" r="3" />
                </svg>
                <span>Omaha, NE</span>
              </div>
              <div className="about-visit__status-float">
                <span className="about-visit__dot" />
                <span>Open Now</span>
              </div>
            </div>

            <div className="about-visit__info">
              <span className="accent-bar" />
              <span className="label">Visit Us</span>
              <h2 className="heading about-visit__title">Come See Us</h2>

              <ul className="about-visit__facts">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                    <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.14" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <div>
                    <span className="about-visit__fact-t">11 AM – 9 PM</span>
                    <span className="about-visit__fact-s">Every day of the week</span>
                  </div>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                    <path d="M12 22s8-4.5 8-13a8 8 0 0 0-16 0c0 8.5 8 13 8 13z" fill="currentColor" fillOpacity="0.14" />
                    <circle cx="12" cy="9" r="3" />
                  </svg>
                  <div>
                    <span className="about-visit__fact-t">2537 S 174th Plz</span>
                    <span className="about-visit__fact-s">Omaha, NE 68130 · Free parking</span>
                  </div>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.65 2.63a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.45-1.22a2 2 0 0 1 2.11-.45c.85.31 1.73.53 2.63.65A2 2 0 0 1 22 16.92z" fill="currentColor" fillOpacity="0.14" />
                  </svg>
                  <div>
                    <a href="tel:+14025059209" className="about-visit__fact-t about-visit__fact-link">+1 (402) 505-9209</a>
                    <span className="about-visit__fact-s">Takeout &amp; party hall inquiries</span>
                  </div>
                </li>
              </ul>

              <div className="about-visit__chips">
                <span>Walk-ins Welcome</span>
                <span>Takeaway</span>
                <span>Party Hall</span>
              </div>

              <div className="about-visit__cta">
                <a href="https://maps.app.goo.gl/QKEtXfahv64saDYD6" target="_blank" rel="noreferrer" className="btn btn-primary">Get Directions</a>
                <a href="tel:+14025059209" className="btn btn-outline">Call Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
