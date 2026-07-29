import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import useScrollReveal from '../hooks/useScrollReveal'
import './Testimonials.css'

const testimonials = [
  { quote: 'Amazing flavors and generous portions!', body: 'The Dum Biryani here is incredible, perfectly spiced and packed with flavor. We also tried the Butter Chicken and everything was delicious. One of the best spots for Indian food in Omaha.', name: 'Rahul Patel', date: 'Feb 2026', face: '/images/face-1.webp' },
  { quote: 'Authentic taste, amazing hospitality.', body: "You can tell they put heart into their cooking. Hyderabad House will be our family's go-to spot for celebrations and comfort food alike.", name: 'Paul Trueman', date: 'Feb 2026', face: '/images/face-2.webp' },
  { quote: 'Feels like home every time.', body: 'From the warm welcome to the perfectly cooked curries, everything reminds me of my trips to Hyderabad. Their goat dum biryani is a must-try.', name: 'Aryaan Khan', date: 'Dec 2025', face: '/images/face-3.webp' },
  { quote: 'Best biryani in Omaha, hands down.', body: "I've tried many Indian restaurants in the area but nothing comes close. The Kodi Pulav and the Haleem are out of this world. Will definitely be back.", name: 'Samira Hussain', date: 'Jan 2026', face: null },
  { quote: "An experience you won't forget.", body: 'The decor is beautiful, the food is authentic, and the staff is incredibly friendly. My friends and I had a wonderful time.', name: 'Michael Torres', date: 'Mar 2026', face: null },
  { quote: 'Spices, aromas, and soul food.', body: 'Every dish is bursting with authentic Hyderabadi flavors. The ambiance is warm and the service is top-notch. Highly recommend the chicken haleem.', name: 'Priya Sharma', date: 'Nov 2025', face: null },
]

const stats = [
  { to: 5000, suffix: '+', label: 'Happy Guests' },
  { to: 50, suffix: '+', label: 'Menu Items' },
  { to: 98, suffix: '%', label: 'Positive Feedback' },
  { to: 4.5, suffix: '★', label: 'Google Rating', decimals: 1 },
]

function CountUp({ to, suffix = '', decimals = 0, duration = 1800 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const fired = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true
        const t0 = performance.now()
        const tick = (now) => {
          const p = Math.min((now - t0) / duration, 1)
          const eased = 1 - (1 - p) ** 3
          const cur = parseFloat((eased * to).toFixed(decimals))
          setVal(cur)
          if (p < 1) requestAnimationFrame(tick)
          else setVal(to)
        }
        requestAnimationFrame(tick)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [to, duration, decimals])

  const display = decimals > 0 ? val.toFixed(decimals) : Math.floor(val)
  return <span ref={ref} className="tp-stats__n">{display}{suffix}</span>
}

const AUTO_INTERVAL = 6000

export default function Testimonials() {
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(3)
  const timerRef = useRef(null)
  useScrollReveal()

  useEffect(() => {
    const m = window.matchMedia('(max-width: 700px)')
    const update = () => setPerPage(m.matches ? 1 : 3)
    update()
    m.addEventListener('change', update)
    return () => m.removeEventListener('change', update)
  }, [])

  const totalPages = Math.ceil(testimonials.length / perPage)

  useEffect(() => {
    if (page >= totalPages) setPage(0)
  }, [totalPages, page])

  const restart = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setPage(p => (p + 1) % totalPages)
    }, AUTO_INTERVAL)
  }

  useEffect(() => {
    restart()
    return () => timerRef.current && clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages])

  const goTo = i => { setPage(i); restart() }
  const prev = () => { setPage(p => (p - 1 + totalPages) % totalPages); restart() }
  const next = () => { setPage(p => (p + 1) % totalPages); restart() }

  const shown = testimonials.slice(page * perPage, page * perPage + perPage)

  return (
    <main className="testimonials-page">
      <PageHero
        title="What Our Guests Say"
        subtitle="Real experiences from our valued guests — straight from the heart."
        bgImage="/images/dishes.webp"
      />

      <section className="section tp-section">
        <div className="container">
          <div className="tp-head reveal">
            <span className="accent-bar center" />
            <span className="label" style={{ display: 'block', textAlign: 'center', marginBottom: 16 }}>Guest Reviews</span>
            <h2 className="heading tp-title">Words From Our Guests</h2>
            <p className="body-lg tp-sub">Every review tells a story of a meal shared and a moment remembered.</p>
          </div>

          <div className="tp-grid" data-per={perPage}>
            {shown.map((t, i) => (
              <div key={`${page}-${i}`} className="tp-card">
                <svg className="tp-card__quote" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7.17 6C4.87 6 3 7.87 3 10.17V17h6.83V10.17H6.5c0-1.29 1.04-2.33 2.33-2.33V6H7.17zm10 0c-2.3 0-4.17 1.87-4.17 4.17V17h6.83V10.17h-3.33c0-1.29 1.04-2.33 2.33-2.33V6h-1.66z" />
                </svg>
                <div className="tp-card__stars">★★★★★</div>
                <p className="tp-card__lead">&ldquo;{t.quote}&rdquo;</p>
                <p className="tp-card__body">{t.body}</p>
                <div className="tp-card__meta">
                  {t.face
                    ? <img src={t.face} alt={t.name} className="tp-card__face" />
                    : <div className="tp-card__face tp-card__face--init">{t.name[0]}</div>}
                  <div>
                    <span className="tp-card__name">{t.name}</span>
                    <span className="tp-card__date">{t.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="tp-nav">
            <button className="tp-nav__arrow" onClick={prev} aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
            </button>
            <div className="tp-nav__dots">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} className={`tp-nav__dot${i === page ? ' active' : ''}`} onClick={() => goTo(i)} aria-label={`Page ${i + 1}`}>
                  <span className="tp-nav__fill" style={{ animationDuration: `${AUTO_INTERVAL}ms` }} />
                </button>
              ))}
            </div>
            <button className="tp-nav__arrow" onClick={next} aria-label="Next">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────── */}
      <section className="tp-stats">
        <div className="tp-stats__bg" />
        <div className="container tp-stats__grid">
          {stats.map((s, i) => (
            <div key={i} className={`tp-stats__item reveal delay-${i + 1}`}>
              <CountUp to={s.to} suffix={s.suffix} decimals={s.decimals || 0} />
              <span className="tp-stats__label label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────── */}
      <section className="tp-cta">
        <div className="container tp-cta__inner reveal">
          <span className="accent-bar center" />
          <h2 className="heading tp-cta__title">Ready to Taste It Yourself?</h2>
          <p className="body-lg tp-cta__text">Join thousands of guests who've made Hyderabad House their favorite spot in Omaha.</p>
          <div className="tp-cta__btns">
            <Link to="/menu" className="btn btn-primary">View Our Menu</Link>
            <a href="https://hyderabadhouse.hungerrush.com/Order/OrderType" target="_blank" rel="noreferrer" className="btn btn-outline">Order Online</a>
          </div>
        </div>
      </section>
    </main>
  )
}
