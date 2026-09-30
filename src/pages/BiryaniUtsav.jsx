import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import SEO from '../components/SEO'
import useScrollReveal from '../hooks/useScrollReveal'
import { WEEKLY_MENU, getAvailableDates, isOfferLive } from '../data/biryaniUtsav'
import './BiryaniUtsav.css'

const formatPhone = (raw) => {
  const d = String(raw).replace(/\D/g, '').slice(0, 10)
  if (!d) return ''
  if (d.length <= 3) return `(${d}`
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

export default function BiryaniUtsav() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    date: '', biryani: '',
  })
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  useScrollReveal()

  const live = useMemo(() => isOfferLive(), [])
  const dates = useMemo(() => getAvailableDates(), [])
  const selected = useMemo(
    () => dates.find(d => d.iso === form.date) || null,
    [dates, form.date],
  )

  const handle = e => {
    const { name, value } = e.target
    if (name === 'phone') return setForm(f => ({ ...f, phone: formatPhone(value) }))
    if (name === 'date') return setForm(f => ({ ...f, date: value, biryani: '' }))
    setForm(f => ({ ...f, [name]: value }))
  }

  const submit = async e => {
    e.preventDefault()
    const botcheck = e.target.botcheck?.value || ''

    if (form.phone.replace(/\D/g, '').length !== 10) {
      setStatus('error'); setErrorMsg('Please enter a valid 10-digit phone number.'); return
    }
    if (!form.date || !form.biryani) {
      setStatus('error'); setErrorMsg('Please pick a date and a biryani.'); return
    }

    setStatus('sending'); setErrorMsg('')
    try {
      const res = await fetch('/api/biryani-utsav', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, botcheck }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.success) {
        setStatus('sent')
        setForm({ firstName: '', lastName: '', email: '', phone: '', date: '', biryani: '' })
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong. Please try again or call us at +1 (402) 505-9209.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please check your connection and try again.')
    }
  }

  const sending = status === 'sending'
  const sent = status === 'sent'

  return (
    <main className="utsav-page">
      <SEO
        title="October Biryani Utsav | Half-Tray Feasts | Hyderabad House Omaha"
        description="Fall for biryani this October at Hyderabad House Omaha. Half-tray feasts designed for gatherings, one signature biryani every Monday through Thursday. Reserve your day and pick it up hot."
        path="/biryani-utsav"
        image="/images/biryani.webp"
        keywords="October biryani offer Omaha, biryani utsav Omaha, half tray biryani Omaha, biryani for gatherings Omaha, Chicken Dum Biryani Omaha, Thalapakatti Goat Biryani Omaha, Vijayawada Chicken Biryani Omaha, Pachimirchi Paneer Biryani Omaha"
      />
      <PageHero
        title="October Biryani Utsav"
        subtitle="Fall for biryani. Half-tray feasts designed for gatherings, Monday through Thursday."
        bgImage="/images/biryani.webp"
      />

      {/* ── Offer schedule ─────────────────────── */}
      <section className="section utsav-schedule">
        <div className="container">
          <div className="utsav-head reveal">
            <span className="accent-bar center" />
            <span className="label" style={{ display: 'block', textAlign: 'center', marginBottom: 16 }}>Share the Pot</span>
            <h2 className="heading utsav-title">A Different Biryani Every Weekday</h2>
            <p className="body-lg utsav-sub">Every half-tray is cooked fresh the day of, sealed at the pot, and ready for you to pick up. Available through October 31, 2026.</p>
          </div>

          <div className="utsav-grid">
            {Object.entries(WEEKLY_MENU).map(([dow, m], i) => (
              <article key={dow} className={`utsav-card reveal delay-${i + 1}`}>
                <div className="utsav-card__day">{m.label}</div>
                <div className="utsav-card__row">
                  <span className="utsav-card__tag utsav-card__tag--veg">Veg</span>
                  <span className="utsav-card__name">{m.veg}</span>
                </div>
                <div className="utsav-card__row">
                  <span className="utsav-card__tag utsav-card__tag--nv">Non-Veg</span>
                  <span className="utsav-card__name">{m.nonveg}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form ───────────────────────────────── */}
      <section className="section utsav-form-section texture-dots">
        <div className="container">
          <div className="utsav-form-panel reveal">
            {!live ? (
              <div className="utsav-closed">
                <div className="utsav-closed__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8" />
                  </svg>
                </div>
                <h3 className="heading">The Utsav Has Ended</h3>
                <p className="body-lg">Thanks for joining us this October. Follow us on Instagram to hear about the next one.</p>
                <Link to="/menu" className="btn btn-primary">View Full Menu</Link>
              </div>
            ) : sent ? (
              <div className="utsav-success">
                <div className="utsav-success__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.16" />
                    <polyline points="8,12 11,15 16,9" />
                  </svg>
                </div>
                <h3 className="heading utsav-success__title">Your Utsav Is Booked</h3>
                <p className="body-lg">We've got your details and will call you shortly to confirm pickup time. See you soon.</p>
                <button className="btn btn-outline" onClick={() => setStatus('idle')}>Book Another</button>
              </div>
            ) : (
              <form className="utsav-form" onSubmit={submit} noValidate>
                <div className="utsav-form__head">
                  <span className="label utsav-form__lbl">Reserve Your Half-Tray</span>
                  <h3 className="heading utsav-form__title">Pick a Day, Pick a Biryani</h3>
                  <p className="utsav-form__lead">One half-tray per booking. We'll call you to confirm pickup time.</p>
                </div>

                {/* Honeypot */}
                <input
                  type="text" name="botcheck" tabIndex="-1" autoComplete="off" aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
                />

                <div className="utsav-form__row">
                  <div className="utsav-form__field">
                    <label>First Name</label>
                    <input name="firstName" placeholder="John" value={form.firstName} onChange={handle} required />
                  </div>
                  <div className="utsav-form__field">
                    <label>Last Name</label>
                    <input name="lastName" placeholder="Doe" value={form.lastName} onChange={handle} required />
                  </div>
                </div>

                <div className="utsav-form__row">
                  <div className="utsav-form__field">
                    <label>Email</label>
                    <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handle} required />
                  </div>
                  <div className="utsav-form__field">
                    <label>Phone</label>
                    <input
                      name="phone" type="tel" inputMode="tel" autoComplete="tel-national"
                      placeholder="(402) 000-0000" value={form.phone} onChange={handle}
                      maxLength={14} required
                    />
                  </div>
                </div>

                <div className="utsav-form__field">
                  <label>Pickup Date</label>
                  <select name="date" value={form.date} onChange={handle} required>
                    <option value="">Select a date…</option>
                    {dates.map(d => (
                      <option key={d.iso} value={d.iso}>{d.display}</option>
                    ))}
                  </select>
                  {dates.length === 0 && (
                    <span className="utsav-form__note">No dates left in the Utsav window. See you next year.</span>
                  )}
                </div>

                {selected && (
                  <div className="utsav-choose">
                    <div className="utsav-choose__head">Choose your biryani for {selected.display}</div>
                    <div className="utsav-choose__opts">
                      <label className={`utsav-opt${form.biryani === selected.veg ? ' active' : ''}`}>
                        <input
                          type="radio" name="biryani" value={selected.veg}
                          checked={form.biryani === selected.veg} onChange={handle}
                        />
                        <span className="utsav-opt__tag utsav-opt__tag--veg">Veg</span>
                        <span className="utsav-opt__name">{selected.veg}</span>
                      </label>
                      <label className={`utsav-opt${form.biryani === selected.nonveg ? ' active' : ''}`}>
                        <input
                          type="radio" name="biryani" value={selected.nonveg}
                          checked={form.biryani === selected.nonveg} onChange={handle}
                        />
                        <span className="utsav-opt__tag utsav-opt__tag--nv">Non-Veg</span>
                        <span className="utsav-opt__name">{selected.nonveg}</span>
                      </label>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <p className="utsav-form__error" role="alert">{errorMsg}</p>
                )}

                <button type="submit" className="btn btn-primary utsav-form__submit" disabled={sending}>
                  {sending ? 'Reserving…' : 'Reserve My Half-Tray'}
                  {!sending && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
