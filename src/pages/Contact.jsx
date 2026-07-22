import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import useScrollReveal from '../hooks/useScrollReveal'
import './Contact.css'

const contactInfo = [
  {
    label: 'Call Us',
    line: '+1 (402) 505-9209',
    sub: 'Takeout & party hall inquiries',
    href: 'tel:+14025059209',
    action: 'Call Now',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.65 2.63a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.45-1.22a2 2 0 0 1 2.11-.45c.85.31 1.73.53 2.63.65A2 2 0 0 1 22 16.92z" fill="currentColor" fillOpacity="0.16" />
      </svg>
    ),
    symbol: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.65 2.63a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.45-1.22a2 2 0 0 1 2.11-.45c.85.31 1.73.53 2.63.65A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: 'Email Us',
    line: 'hhbiryani.oma@gmail.com',
    sub: "We'll reply within 24 hours",
    href: 'mailto:hhbiryani.oma@gmail.com',
    action: 'Send Email',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" fill="currentColor" fillOpacity="0.16" />
        <polyline points="2,4 12,14 22,4" />
      </svg>
    ),
    symbol: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 4h20v16H2z" />
        <path d="M2 4l10 10L22 4" fillOpacity="0.55" />
      </svg>
    ),
  },
  {
    label: 'Visit Us',
    line: '2537 S 174th Plz, Omaha, NE',
    sub: 'Free parking on-site',
    href: 'https://maps.app.goo.gl/QKEtXfahv64saDYD6',
    action: 'Get Directions',
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4.5 8-13a8 8 0 0 0-16 0c0 8.5 8 13 8 13z" fill="currentColor" fillOpacity="0.16" />
        <circle cx="12" cy="9" r="3" />
      </svg>
    ),
    symbol: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 22s8-4.5 8-13a8 8 0 0 0-16 0c0 8.5 8 13 8 13z" />
        <circle cx="12" cy="9" r="3" fillOpacity="0.55" fill="#fff" />
      </svg>
    ),
  },
]

const reasons = [
  { title: 'Party Hall Bookings', desc: 'Reserve our private hall for birthdays, meetings, or celebrations of up to 60 guests.' },
  { title: 'Catering Enquiries', desc: 'Bring the flavors of Hyderabad to your event. Menus tailored to your group.' },
  { title: 'Feedback & Questions', desc: 'Share your experience or ask us anything about our menu, hours, or specials.' },
]

export default function Contact() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', topic: '', message: '' })
  const [sent, setSent] = useState(false)
  useScrollReveal()

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const submit = e => {
    e.preventDefault()
    setSent(true)
    setForm({ firstName: '', lastName: '', email: '', phone: '', topic: '', message: '' })
  }

  return (
    <main className="contact-page">
      <PageHero
        title="Let's Talk"
        subtitle="Questions, party hall bookings, catering — we'd love to hear from you."
        bgImage="/images/dishes.webp"
      />

      {/* ── Info Cards ─────────────────────── */}
      <section className="section contact-info">
        <div className="container">
          <div className="contact-head reveal">
            <span className="accent-bar center" />
            <span className="label" style={{ display: 'block', textAlign: 'center', marginBottom: 16 }}>Get in Touch</span>
            <h2 className="heading contact-title">Three Ways to Reach Us</h2>
          </div>
          <div className="contact-cards">
            {contactInfo.map((c, i) => (
              <a
                key={i}
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className={`contact-card reveal delay-${i + 1}`}
              >
                <span className="contact-card__watermark" aria-hidden="true">{c.symbol}</span>
                <div className="contact-card__icon">{c.icon}</div>
                <span className="contact-card__label">{c.label}</span>
                <p className="contact-card__line">{c.line}</p>
                <span className="contact-card__sub">{c.sub}</span>
                <span className="contact-card__cta">
                  {c.action}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Reasons ────────────────── */}
      <section className="section contact-form-section texture-dots">
        <div className="container contact-form-grid">
          <div className="contact-reasons reveal from-left">
            <span className="accent-bar" />
            <span className="label">Reach Out</span>
            <h2 className="heading contact-reasons__title">We're Here to Help</h2>
            <p className="body-lg contact-reasons__lead">Whether you're planning an event or just want to say hello, drop us a line.</p>
            <ul className="contact-reasons__list">
              {reasons.map((r, i) => (
                <li key={i}>
                  <div className="contact-reasons__num">0{i + 1}</div>
                  <div>
                    <span className="contact-reasons__t">{r.title}</span>
                    <span className="contact-reasons__d">{r.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="contact-reasons__hours">
              <span className="contact-reasons__dot" />
              <span>Open now · Mon – Sun · 11 AM – 9 PM</span>
            </div>
          </div>

          <div className="contact-form-panel reveal from-right">
            {sent ? (
              <div className="contact-success">
                <div className="contact-success__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.16" />
                    <polyline points="8,12 11,15 16,9" />
                  </svg>
                </div>
                <h3 className="heading contact-success__title">Message Sent</h3>
                <p className="body-lg">Thank you! We'll get back to you within 24 hours.</p>
                <button className="btn btn-outline" onClick={() => setSent(false)}>Send Another</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit}>
                <span className="label contact-form__lbl">Send us a message</span>
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label>First Name</label>
                    <input name="firstName" placeholder="John" value={form.firstName} onChange={handle} required />
                  </div>
                  <div className="contact-form__field">
                    <label>Last Name</label>
                    <input name="lastName" placeholder="Doe" value={form.lastName} onChange={handle} required />
                  </div>
                </div>
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label>Email</label>
                    <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handle} required />
                  </div>
                  <div className="contact-form__field">
                    <label>Phone</label>
                    <input name="phone" placeholder="(402) 000-0000" value={form.phone} onChange={handle} />
                  </div>
                </div>
                <div className="contact-form__field">
                  <label>Topic</label>
                  <select name="topic" value={form.topic} onChange={handle} required>
                    <option value="">Select a topic…</option>
                    <option value="party-hall">Party Hall Booking</option>
                    <option value="catering">Catering</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="contact-form__field">
                  <label>Message</label>
                  <textarea name="message" placeholder="Tell us more…" rows={5} value={form.message} onChange={handle} required />
                </div>
                <button type="submit" className="btn btn-primary contact-form__submit">
                  Send Message
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Location Banner ────────────────── */}
      <section className="contact-location">
        <div className="contact-location__bg" />
        <div className="contact-location__overlay" />
        <div className="container contact-location__inner reveal">
          <div>
            <span className="label on-dark">Find Us</span>
            <h2 className="heading on-dark contact-location__title">2537 S 174th Plz<br />Omaha, NE 68130</h2>
            <p className="contact-location__sub">Located in the West Omaha plaza with free on-site parking. Open daily 11 AM – 9 PM.</p>
          </div>
          <div className="contact-location__actions">
            <a href="https://maps.app.goo.gl/QKEtXfahv64saDYD6" target="_blank" rel="noreferrer" className="btn btn-primary">Get Directions</a>
            <Link to="/menu" className="btn btn-outline-light">View Menu</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
