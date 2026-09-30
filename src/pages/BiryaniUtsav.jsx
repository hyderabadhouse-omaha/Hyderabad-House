import { useState, useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import useScrollReveal from '../hooks/useScrollReveal'
import { WEEKLY_MENU, getAvailableDates, isOfferLive, UTSAV_START, UTSAV_END } from '../data/biryaniUtsav'
import './BiryaniUtsav.css'

// Pickup hour options (restaurant open 11 AM to 9 PM, last slot 8:45 PM).
const HOUR_OPTIONS = [
  { value: 11, label: '11 AM' }, { value: 12, label: '12 PM' },
  { value: 13, label: '1 PM' },  { value: 14, label: '2 PM' },
  { value: 15, label: '3 PM' },  { value: 16, label: '4 PM' },
  { value: 17, label: '5 PM' },  { value: 18, label: '6 PM' },
  { value: 19, label: '7 PM' },  { value: 20, label: '8 PM' },
]
const MINUTE_OPTIONS = [0, 15, 30, 45]

const formatTime12 = t24 => {
  if (!t24) return ''
  const [h, m] = t24.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const h12 = h === 12 ? 12 : h > 12 ? h - 12 : h
  return `${h12}:${String(m).padStart(2, '0')} ${period}`
}

// Build a full month grid (weeks of 7 cells, Sun–Sat) for the given year/month.
// availableSet is a Set of ISO date strings that should be selectable.
function buildMonthGrid(year, month, availableSet) {
  const first = new Date(year, month, 1)
  const startPad = first.getDay() // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < startPad; i++) cells.push({ blank: true })
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    cells.push({ day: d, iso, available: availableSet.has(iso) })
  }
  while (cells.length % 7 !== 0) cells.push({ blank: true })
  return cells
}

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
    date: '', pickupTime: '', biryani: '',
  })
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  useScrollReveal()

  const validate = (f = form) => {
    const errs = {}
    if (!f.firstName.trim()) errs.firstName = 'First name is required.'
    if (!f.lastName.trim()) errs.lastName = 'Last name is required.'
    if (!f.email.trim()) errs.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errs.email = 'Please enter a valid email address.'
    if (!f.phone.trim()) errs.phone = 'Phone number is required.'
    else if (f.phone.replace(/\D/g, '').length !== 10) errs.phone = 'Please enter a 10-digit phone number.'
    if (!f.date) errs.date = 'Please pick a pickup date.'
    if (!f.pickupTime) errs.pickupTime = 'Please pick a pickup time.'
    if (!f.biryani) errs.biryani = 'Please choose a biryani.'
    return errs
  }

  const clearError = name => setFieldErrors(prev => {
    if (!prev[name]) return prev
    const { [name]: _drop, ...rest } = prev
    return rest
  })

  const live = useMemo(() => isOfferLive(), [])
  const dates = useMemo(() => getAvailableDates(), [])
  const availableSet = useMemo(() => new Set(dates.map(d => d.iso)), [dates])
  const selected = useMemo(
    () => dates.find(d => d.iso === form.date) || null,
    [dates, form.date],
  )
  // Calendar is fixed to the Utsav month (October 2026).
  const utsavYear = Number(UTSAV_START.slice(0, 4))
  const utsavMonth = Number(UTSAV_START.slice(5, 7)) - 1
  const monthCells = useMemo(
    () => buildMonthGrid(utsavYear, utsavMonth, availableSet),
    [utsavYear, utsavMonth, availableSet],
  )
  const monthLabel = new Date(utsavYear, utsavMonth, 1)
    .toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const [calOpen, setCalOpen] = useState(false)
  const calRef = useRef(null)

  const [timeOpen, setTimeOpen] = useState(false)
  const [tempHour, setTempHour] = useState(null)
  const [tempMinute, setTempMinute] = useState(null)

  // Scroll the picked hour/minute into view when the picker opens.
  useEffect(() => {
    if (!timeOpen) return
    requestAnimationFrame(() => {
      document.querySelector('.utsav-time__col-list[aria-label="Hour"] .is-selected')
        ?.scrollIntoView({ block: 'center' })
      document.querySelector('.utsav-time__col-list[aria-label="Minute"] .is-selected')
        ?.scrollIntoView({ block: 'center' })
    })
  }, [timeOpen])

  const openTime = () => {
    if (form.pickupTime) {
      const [h, m] = form.pickupTime.split(':').map(Number)
      setTempHour(h); setTempMinute(m)
    } else {
      setTempHour(null); setTempMinute(null)
    }
    setTimeOpen(true)
  }
  const confirmTime = () => {
    if (tempHour == null || tempMinute == null) return
    const t24 = `${String(tempHour).padStart(2, '0')}:${String(tempMinute).padStart(2, '0')}`
    setForm(f => ({ ...f, pickupTime: t24 }))
    clearError('pickupTime')
    setTimeOpen(false)
  }

  const pickDate = iso => {
    setForm(f => ({ ...f, date: iso, biryani: '' }))
    clearError('date')
    clearError('biryani')
    setCalOpen(false)
  }

  // Close the calendar or time modal on Escape (page scroll stays enabled
  // so users can move the page around while the picker is open).
  useEffect(() => {
    if (!calOpen && !timeOpen) return
    const onKey = e => {
      if (e.key !== 'Escape') return
      if (calOpen) setCalOpen(false)
      if (timeOpen) setTimeOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [calOpen, timeOpen])

  const handle = e => {
    const { name, value } = e.target
    clearError(name)
    if (name === 'biryani') clearError('biryani')
    if (name === 'phone') return setForm(f => ({ ...f, phone: formatPhone(value) }))
    if (name === 'date') return setForm(f => ({ ...f, date: value, biryani: '' }))
    if (name === 'firstName' || name === 'lastName') {
      // Letters, spaces, hyphens, apostrophes only (blocks digits).
      const clean = value.replace(/[^A-Za-z\s'-]/g, '')
      return setForm(f => ({ ...f, [name]: clean }))
    }
    setForm(f => ({ ...f, [name]: value }))
  }

  const onBlur = e => {
    const errs = validate()
    const key = e.target.name
    if (errs[key]) setFieldErrors(prev => ({ ...prev, [key]: errs[key] }))
  }

  const submit = async e => {
    e.preventDefault()
    const botcheck = e.target.botcheck?.value || ''

    const errs = validate()
    if (Object.keys(errs).length) {
      setFieldErrors(errs)
      setStatus('error')
      setErrorMsg('Please fix the highlighted fields.')
      // Focus the first invalid field
      const order = ['firstName', 'lastName', 'email', 'phone', 'date', 'biryani']
      const firstBad = order.find(k => errs[k])
      if (firstBad) {
        const el = document.querySelector(`[name="${firstBad}"]`)
        if (el?.focus) el.focus()
      }
      return
    }

    setStatus('sending'); setErrorMsg(''); setFieldErrors({})
    try {
      const res = await fetch('/api/biryani-utsav', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, botcheck }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.success) {
        setStatus('sent')
        setForm({ firstName: '', lastName: '', email: '', phone: '', date: '', pickupTime: '', biryani: '' })
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
      {/* ── Offer schedule (landing top) ────────── */}
      <section className="section utsav-schedule utsav-schedule--top">
        <div className="container">
          <div className="utsav-head reveal">
            <span className="utsav-eyebrow">
              <span className="utsav-eyebrow__dot" aria-hidden="true" />
              October 1 – 31, 2026
            </span>
            <h1 className="heading utsav-title">October Biryani Utsav</h1>
            <p className="utsav-tagline">Fall for biryani. Half-tray feasts designed for gatherings.</p>
            <p className="body-lg utsav-sub">A different biryani every Monday through Thursday, cooked fresh the day of, sealed at the pot, and ready for you to pick up.</p>
          </div>

          <div className="utsav-grid">
            {Object.entries(WEEKLY_MENU).map(([dow, m], i) => (
              <article key={dow} className={`utsav-card reveal delay-${i + 1}`}>
                <div className="utsav-card__day">{m.label}</div>
                <div className="utsav-card__row">
                  <span className="food-mark food-mark--veg" role="img" aria-label="Vegetarian" />
                  <span className="utsav-card__name">{m.veg}</span>
                </div>
                <div className="utsav-card__row">
                  <span className="food-mark food-mark--nv" role="img" aria-label="Non-vegetarian" />
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
                  <span className="label utsav-form__lbl">Book Your Half-Tray</span>
                  <h3 className="heading utsav-form__title">Pick a Day, Pick a Biryani</h3>
                </div>

                <div className="utsav-form__note-banner" role="note">
                  <svg className="utsav-form__note-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  <span><strong>Only one half-tray can be ordered per booking.</strong></span>
                </div>

                {/* Honeypot */}
                <input
                  type="text" name="botcheck" tabIndex="-1" autoComplete="off" aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
                />

                <div className="utsav-form__row">
                  <div className={`utsav-form__field${fieldErrors.firstName ? ' has-error' : ''}`}>
                    <label htmlFor="utsav-firstName">First Name</label>
                    <input
                      id="utsav-firstName" name="firstName" placeholder="John"
                      value={form.firstName} onChange={handle} onBlur={onBlur}
                      autoComplete="given-name"
                      aria-invalid={!!fieldErrors.firstName}
                      aria-describedby={fieldErrors.firstName ? 'utsav-firstName-err' : undefined}
                    />
                    {fieldErrors.firstName && (
                      <span id="utsav-firstName-err" className="utsav-form__field-err">{fieldErrors.firstName}</span>
                    )}
                  </div>
                  <div className={`utsav-form__field${fieldErrors.lastName ? ' has-error' : ''}`}>
                    <label htmlFor="utsav-lastName">Last Name</label>
                    <input
                      id="utsav-lastName" name="lastName" placeholder="Doe"
                      value={form.lastName} onChange={handle} onBlur={onBlur}
                      autoComplete="family-name"
                      aria-invalid={!!fieldErrors.lastName}
                      aria-describedby={fieldErrors.lastName ? 'utsav-lastName-err' : undefined}
                    />
                    {fieldErrors.lastName && (
                      <span id="utsav-lastName-err" className="utsav-form__field-err">{fieldErrors.lastName}</span>
                    )}
                  </div>
                </div>

                <div className="utsav-form__row">
                  <div className={`utsav-form__field${fieldErrors.email ? ' has-error' : ''}`}>
                    <label htmlFor="utsav-email">Email</label>
                    <input
                      id="utsav-email" name="email" type="email"
                      placeholder="you@example.com" value={form.email}
                      onChange={handle} onBlur={onBlur}
                      autoComplete="email"
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={fieldErrors.email ? 'utsav-email-err' : undefined}
                    />
                    {fieldErrors.email && (
                      <span id="utsav-email-err" className="utsav-form__field-err">{fieldErrors.email}</span>
                    )}
                  </div>
                  <div className={`utsav-form__field${fieldErrors.phone ? ' has-error' : ''}`}>
                    <label htmlFor="utsav-phone">Phone</label>
                    <input
                      id="utsav-phone" name="phone" type="tel"
                      inputMode="numeric" pattern="[0-9]*"
                      autoComplete="tel-national"
                      placeholder="(402) 000-0000" value={form.phone}
                      onChange={handle} onBlur={onBlur}
                      maxLength={14}
                      aria-invalid={!!fieldErrors.phone}
                      aria-describedby={fieldErrors.phone ? 'utsav-phone-err' : undefined}
                    />
                    {fieldErrors.phone && (
                      <span id="utsav-phone-err" className="utsav-form__field-err">{fieldErrors.phone}</span>
                    )}
                  </div>
                </div>

                <div className="utsav-form__row">
                <div className={`utsav-form__field utsav-form__field--date${fieldErrors.date ? ' has-error' : ''}`} ref={calRef}>
                  <label>Pickup Date</label>
                  <button
                    type="button"
                    name="date"
                    className={`utsav-date-trigger${form.date ? ' has-value' : ''}${fieldErrors.date ? ' is-error' : ''}`}
                    onClick={() => setCalOpen(o => !o)}
                    aria-haspopup="dialog"
                    aria-expanded={calOpen}
                    aria-invalid={!!fieldErrors.date}
                  >
                    <span className="utsav-date-trigger__text">
                      {selected ? selected.display : 'Select a date…'}
                    </span>
                    <svg className="utsav-date-trigger__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="5" width="18" height="16" rx="2" />
                      <path d="M3 10h18M8 3v4M16 3v4" />
                    </svg>
                  </button>
                  {dates.length === 0 && (
                    <span className="utsav-form__note">No dates left in the Utsav window. See you next year.</span>
                  )}
                  {fieldErrors.date && (
                    <span className="utsav-form__field-err">{fieldErrors.date}</span>
                  )}
                  {calOpen && (
                    <>
                      <div
                        className="utsav-cal__backdrop"
                        onClick={() => setCalOpen(false)}
                        aria-hidden="true"
                      />
                      <div className="utsav-cal" role="dialog" aria-label="Pickup date calendar">
                        <div className="utsav-cal__head">
                          <span className="utsav-cal__month">{monthLabel}</span>
                          <button
                            type="button"
                            className="utsav-cal__close"
                            onClick={() => setCalOpen(false)}
                            aria-label="Close calendar"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <path d="M6 6l12 12M18 6L6 18" />
                            </svg>
                          </button>
                        </div>
                        <div className="utsav-cal__legend-row">
                          <span className="utsav-cal__legend">
                            <span className="utsav-cal__legend-dot" /> Mon – Thu only
                          </span>
                        </div>
                        <div className="utsav-cal__grid" role="grid">
                          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                            <div key={`h${i}`} className="utsav-cal__dow" aria-hidden="true">{d}</div>
                          ))}
                          {monthCells.map((c, i) => {
                            if (c.blank) return <div key={`b${i}`} className="utsav-cal__cell utsav-cal__cell--blank" />
                            const isSel = form.date === c.iso
                            return (
                              <button
                                key={c.iso}
                                type="button"
                                className={`utsav-cal__cell${c.available ? '' : ' is-disabled'}${isSel ? ' is-selected' : ''}`}
                                onClick={() => c.available && pickDate(c.iso)}
                                disabled={!c.available}
                                aria-pressed={isSel}
                                aria-label={c.iso}
                              >
                                {c.day}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className={`utsav-form__field utsav-form__field--time${fieldErrors.pickupTime ? ' has-error' : ''}`}>
                  <label>Pickup Time</label>
                  <button
                    type="button"
                    name="pickupTime"
                    className={`utsav-date-trigger${form.pickupTime ? ' has-value' : ''}${fieldErrors.pickupTime ? ' is-error' : ''}`}
                    onClick={openTime}
                    aria-haspopup="dialog"
                    aria-expanded={timeOpen}
                    aria-invalid={!!fieldErrors.pickupTime}
                  >
                    <span className="utsav-date-trigger__text">
                      {form.pickupTime ? formatTime12(form.pickupTime) : 'Select a time…'}
                    </span>
                    <svg className="utsav-date-trigger__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                  </button>
                  {fieldErrors.pickupTime && (
                    <span className="utsav-form__field-err">{fieldErrors.pickupTime}</span>
                  )}
                  {timeOpen && (
                    <>
                      <div
                        className="utsav-cal__backdrop"
                        onClick={() => setTimeOpen(false)}
                        aria-hidden="true"
                      />
                      <div className="utsav-time" role="dialog" aria-label="Pickup time picker">
                        <div className="utsav-cal__head">
                          <span className="utsav-cal__month">Pickup Time</span>
                          <button
                            type="button"
                            className="utsav-cal__close"
                            onClick={() => setTimeOpen(false)}
                            aria-label="Close time picker"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <path d="M6 6l12 12M18 6L6 18" />
                            </svg>
                          </button>
                        </div>
                        <div className="utsav-time__cols">
                          <div className="utsav-time__col">
                            <div className="utsav-time__col-head">Hour</div>
                            <div className="utsav-time__col-list" role="listbox" aria-label="Hour">
                              {HOUR_OPTIONS.map(h => (
                                <button
                                  key={h.value}
                                  type="button"
                                  className={`utsav-time__opt${tempHour === h.value ? ' is-selected' : ''}`}
                                  onClick={() => setTempHour(h.value)}
                                  aria-selected={tempHour === h.value}
                                >
                                  {h.label}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="utsav-time__col">
                            <div className="utsav-time__col-head">Minute</div>
                            <div className="utsav-time__col-list" role="listbox" aria-label="Minute">
                              {MINUTE_OPTIONS.map(m => (
                                <button
                                  key={m}
                                  type="button"
                                  className={`utsav-time__opt${tempMinute === m ? ' is-selected' : ''}`}
                                  onClick={() => setTempMinute(m)}
                                  aria-selected={tempMinute === m}
                                >
                                  {String(m).padStart(2, '0')}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="utsav-time__actions">
                          <button type="button" className="utsav-time__cancel" onClick={() => setTimeOpen(false)}>
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="utsav-time__ok"
                            onClick={confirmTime}
                            disabled={tempHour == null || tempMinute == null}
                          >
                            OK
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                </div>

                {selected && (
                  <div className={`utsav-choose${fieldErrors.biryani ? ' has-error' : ''}`}>
                    <div className="utsav-choose__head">Choose your biryani for {selected.display}</div>
                    <div className="utsav-choose__opts">
                      <label className={`utsav-opt${form.biryani === selected.veg ? ' active' : ''}`}>
                        <input
                          type="radio" name="biryani" value={selected.veg}
                          checked={form.biryani === selected.veg} onChange={handle}
                        />
                        <span className="food-mark food-mark--veg" role="img" aria-label="Vegetarian" />
                        <span className="utsav-opt__name">{selected.veg}</span>
                      </label>
                      <label className={`utsav-opt${form.biryani === selected.nonveg ? ' active' : ''}`}>
                        <input
                          type="radio" name="biryani" value={selected.nonveg}
                          checked={form.biryani === selected.nonveg} onChange={handle}
                        />
                        <span className="food-mark food-mark--nv" role="img" aria-label="Non-vegetarian" />
                        <span className="utsav-opt__name">{selected.nonveg}</span>
                      </label>
                    </div>
                    {fieldErrors.biryani && (
                      <span className="utsav-form__field-err">{fieldErrors.biryani}</span>
                    )}
                  </div>
                )}

                {status === 'error' && (
                  <p className="utsav-form__error" role="alert">{errorMsg}</p>
                )}

                <button type="submit" className="btn btn-primary utsav-form__submit" disabled={sending}>
                  {sending ? 'Booking…' : 'Book My Half-Tray'}
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
