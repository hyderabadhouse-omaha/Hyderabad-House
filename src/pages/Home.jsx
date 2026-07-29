import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'
import SEO from '../components/SEO'
import './Home.css'

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Dum Biryani', url: 'https://www.hhoma.com/menu#biryani' },
    { '@type': 'ListItem', position: 2, name: 'Tandoori Grill', url: 'https://www.hhoma.com/menu#tandoori' },
    { '@type': 'ListItem', position: 3, name: 'Andhra Specials', url: 'https://www.hhoma.com/menu#andhra' },
    { '@type': 'ListItem', position: 4, name: 'Vegetarian', url: 'https://www.hhoma.com/menu#vegetarian' },
  ],
}

const slides = [
  {
    eyebrow: 'Royal Experience',
    title: 'Rich Flavors,\nRoyal Tradition',
    desc: 'From smoky Chicken Tikka Masala to earthy Dal Tadka — paired with warm naan & fragrant basmati rice for the perfect Hyderabadi meal.',
    bg: '/images/dishes.webp',
    bgPos: 'center center',
  },
  {
    eyebrow: 'Flavors of Heritage',
    title: 'Authentic\nHyderabadi\nCuisine',
    desc: "Discover the bold, aromatic flavors of authentic Hyderabadi cuisine — a royal culinary tradition now served in the heart of Omaha.",
    bg: '/images/biryani.webp',
    bgPos: 'right center',
  },
  {
    eyebrow: 'Family & Friends',
    title: 'A Meal Worth\nCelebrating',
    desc: 'Fresh ingredients, generous portions, and warm hospitality — gather family for an unforgettable Indian dining experience at Hyderabad House, Omaha.',
    bg: '/images/flavors.webp',
    bgPos: 'center center',
  },
]

const testimonials = [
  { quote: 'Amazing flavors and generous portions!', body: 'The Dum Biryani here is incredible — perfectly spiced. Definitely one of the best spots for Indian food in Omaha!', name: 'Rahul Patel', date: 'Feb 2026', face: '/images/face-1.webp' },
  { quote: 'Authentic taste, amazing hospitality.', body: "You can tell they put heart into their cooking. Hyderabad House will be our family's go-to spot for celebrations.", name: 'Paul Trueman', date: 'Feb 2026', face: '/images/face-2.webp' },
  { quote: 'Feels like home every time.', body: 'From the warm welcome to the perfectly cooked curries, everything reminds me of my trips to Hyderabad.', name: 'Aryaan Khan', date: 'Dec 2025', face: '/images/face-3.webp' },
  { quote: 'Best biryani in Omaha, hands down.', body: "I've tried many Indian restaurants in the area but nothing comes close. The Kodi Pulav and the Haleem are out of this world.", name: 'Samira Hussain', date: 'Jan 2026', face: null },
  { quote: "An experience you won't forget.", body: 'The decor is beautiful, the food is authentic, and the staff is incredibly friendly. My friends and I had a wonderful time.', name: 'Michael Torres', date: 'Mar 2026', face: null },
  { quote: 'Perfect for family celebrations!', body: 'We celebrated a special occasion here and the staff made it memorable. Every dish was fresh and bursting with authentic Hyderabadi flavour.', name: 'Priya Sharma', date: 'Apr 2026', face: null },
]

const features = [
  {
    num: '01',
    title: 'Menu for Every Taste',
    desc: 'From spicy biryanis and rich curries to comforting vegetarian delights — our extensive menu caters to every craving.',
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
    desc: 'Every dish is prepared using handpicked spices, tender meats, and garden-fresh produce. Freshness is our promise.',
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
    desc: "Our chefs bring decades of culinary mastery from Hyderabad's royal kitchens, blending tradition and passion into every bite.",
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

const gallery = [
  '/images/gallery1.webp',
  '/images/gallery6.webp',
  '/images/gallery2.webp',
  '/images/gallery3.webp',
  '/images/gallery4.webp',
  '/images/gallery5.webp',
  '/images/gallery7.webp',
]

function CountUp({ to, suffix = '', decimals = 0, duration = 1600 }) {
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
          const current = parseFloat((eased * to).toFixed(decimals))
          setVal(current)
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
  return <span ref={ref} className="home-stats__n">{display}{suffix}</span>
}

function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  // (Re)start the auto-advance clock — called on mount and after every manual action
  const startTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % slides.length), 7000)
  }

  const go = (idx) => {
    setCurrent((idx + slides.length) % slides.length)
    startTimer()
  }

  useEffect(() => {
    startTimer()
    // Pause autoplay in background tabs — animations can't run on hidden pages
    const onVis = () => document.hidden ? clearInterval(timerRef.current) : startTimer()
    document.addEventListener('visibilitychange', onVis)
    return () => {
      clearInterval(timerRef.current)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <section className="hero">
      {/* All slides stay mounted — active one crossfades in */}
      {slides.map((s, i) => (
        <div key={i}
          className={`hero__bg${i === current ? ' active' : ''}`}
          style={{ backgroundImage: `url(${s.bg})`, backgroundPosition: s.bgPos }} />
      ))}
      <div className="hero__overlay" />

      {/* All slide contents stacked & crossfaded — the active one animates in
          over the outgoing one, matching the background crossfade */}
      <div className="container hero__content-wrap">
        {slides.map((s, i) => (
          <div key={i} className={`hero__content${i === current ? ' active' : ''}`} aria-hidden={i !== current}>
            <span className="label hero__eyebrow">{s.eyebrow}</span>
            <h1 className="display on-dark hero__title">
              {s.title.split('\n').map((l, j) => (
                <span key={j} className="hero__title-line" style={{ '--i': j }}>
                  <span className="hero__title-inner">{l}</span>
                </span>
              ))}
            </h1>
            <p className="body-lg on-dark hero__desc">{s.desc}</p>
            <div className="hero__cta">
              <Link to="/menu" className="btn btn-primary">Explore Menu</Link>
              <a href="https://hyderabadhouse.hungerrush.com/Order/OrderType" target="_blank" rel="noreferrer"
                className="btn btn-outline-light">Order Online</a>
            </div>
          </div>
        ))}
      </div>

      <div className="hero__ui container">
        <div className="hero__dots">
          {slides.map((_, i) => (
            <button key={i} className={`hero__dot${i === current ? ' active' : ''}`}
              onClick={() => go(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <div className="hero__arrows">
          <button className="hero__arrow" onClick={() => go(current - 1)} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <button className="hero__arrow" onClick={() => go(current + 1)} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const [email, setEmail] = useState('')
  const [tPage, setTPage] = useState(0)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 640px)').matches)
  const tTimerRef = useRef(null)
  const totalPagesRef = useRef(1)
  const statsRef = useRef(null)
  const statsBgRef = useRef(null)
  useScrollReveal()

  useEffect(() => {
    const section = statsRef.current
    const bg = statsBgRef.current
    if (!section || !bg) return
    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const ratio = rect.top / window.innerHeight
      bg.style.transform = `translateY(${ratio * 30}%)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Testimonials: detect mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const update = () => { setIsMobile(mq.matches); setTPage(0) }
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Testimonials: auto-advance every 5s
  const perPage = isMobile ? 1 : 3
  const totalPages = Math.ceil(testimonials.length / perPage)
  totalPagesRef.current = totalPages

  const startTTimer = () => {
    clearInterval(tTimerRef.current)
    tTimerRef.current = setInterval(() => {
      setTPage(p => (p + 1) % totalPagesRef.current)
    }, 5000)
  }

  useEffect(() => {
    startTTimer()
    return () => clearInterval(tTimerRef.current)
  }, [totalPages])

  const goTPage = (idx) => {
    setTPage(((idx % totalPages) + totalPages) % totalPages)
    startTTimer()
  }

  const visibleCards = testimonials.slice(tPage * perPage, tPage * perPage + perPage)

  return (
    <main className="home">
      <SEO
        title="Hyderabad House Omaha | Authentic Hyderabadi Biryani, Curries & Kebabs"
        description="Slow-cooked dum biryani, tandoori kebabs, and Andhra specials in the heart of Omaha, NE. Happy Hour 3–6 PM Mon–Fri. Open daily 11 AM – 9 PM. Dine-in, takeout & private party hall."
        path="/"
        image="/images/dishes.webp"
        type="restaurant.restaurant"
        keywords="Indian restaurant Omaha, Hyderabadi biryani Omaha, dum biryani, tandoori kebab, chicken tikka masala, halal Indian food Omaha, Andhra curry, party hall Omaha, Indian catering Omaha"
        jsonLd={homeJsonLd}
      />
      <HeroSlider />

      {/* ── About ─────────────────────────── */}
      <section className="section home-about">
        <div className="container home-about__grid">
          <div className="home-about__img-wrap reveal from-left">
            <div className="home-about__img-frame">
              <img src="/images/interior.webp" alt="Hyderabad House Omaha restaurant interior" className="home-about__img" />
            </div>
          </div>
          <div className="home-about__text reveal from-right">
            <span className="accent-bar" />
            <span className="label">About Us</span>
            <h2 className="heading home-about__heading">Taste of Hyderabad<br />in the Heart of Omaha</h2>
            <p className="body-lg">Step into Hyderabad House, where every meal tells a royal story. From fragrant biryanis to sizzling kebabs, we bring the timeless flavors of Hyderabad to your table.</p>
            <p className="home-about__sub">Crafted with tradition, passion, and genuine hospitality — whether you're craving a comforting family dinner or planning a grand feast.</p>
            <div className="home-about__highlights">
              {[
                {
                  label: 'Dine-In & Takeout',
                  sub: 'Your way, every time',
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="20" height="20"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>,
                },
                {
                  label: 'Online Delivery',
                  sub: 'Delivered to your door',
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="20" height="20"><path d="M5 12H3l9-9 9 9h-2"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/><path d="M10 12v5h4v-5"/></svg>,
                },
                {
                  label: 'Party Hall',
                  sub: 'Meetings & events',
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="20" height="20"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
                },
                {
                  label: 'Catering Available',
                  sub: 'Events & celebrations',
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="20" height="20"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
                },
              ].map((item, i) => (
                <div key={i} className="home-about__highlight" style={{ '--hi': i }}>
                  <div className="home-about__highlight-icon">{item.icon}</div>
                  <div>
                    <span className="home-about__highlight-label">{item.label}</span>
                    <span className="home-about__highlight-sub">{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/about-us" className="btn btn-primary">Our Story</Link>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────── */}
      <section className="section home-features texture-dots">
        <div className="container">
          <div className="section-label-group reveal">
            <span className="accent-bar center" />
            <span className="label">Why Choose Us</span>
            <h2 className="heading">What Makes Us Different</h2>
          </div>
          <div className="home-features__grid">
            {features.map((f, i) => (
              <div key={i} className={`home-features__card reveal delay-${i + 1}`}>
                <span className="home-features__watermark" aria-hidden="true">{f.symbol}</span>
                <div className="home-features__icon">{f.icon}</div>
                <span className="home-features__num">{f.num}</span>
                <h3 className="home-features__title">{f.title}</h3>
                <p className="body-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Happy Hours ─────────────────────── */}
      <section className="home-happy">
        <div className="home-happy__glow" aria-hidden="true" />
        <div className="home-happy__confetti" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className={`home-happy__spark home-happy__spark--${i % 4}`} style={{ left: `${(i * 7 + 4) % 100}%`, animationDelay: `${(i * 0.35) % 6}s` }} />
          ))}
        </div>
        <div className="container home-happy__grid reveal">
          <div className="home-happy__head">
            <span className="home-happy__eyebrow">
              <span className="home-happy__pulse" />
              Limited Time · Dine-in Only
            </span>
            <h2 className="heading home-happy__title">
              Happy Hours are<br /><em>Here.</em>
            </h2>
          </div>

          <div className="home-happy__body">
            <p className="home-happy__lead">
              Flat <strong>20% off</strong> on all appetizers &amp; drinks. Every weekday from <strong>3 – 6 PM</strong>.
            </p>
            <div className="home-happy__meta">
              <span className="home-happy__meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Mon – Fri
              </span>
              <span className="home-happy__meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                3 – 6 PM
              </span>
              <span className="home-happy__meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                </svg>
                Dine-in Only
              </span>
            </div>
            <div className="home-happy__actions">
              <Link to="/menu" className="btn btn-primary">See What's on the Menu</Link>
            </div>
          </div>

          <div className="home-happy__visual">
            <div className="home-happy__photo">
              <img src="/images/flavors.webp" alt="Signature appetizers and drinks at Hyderabad House" />
              <div className="home-happy__photo-tint" />
            </div>

            <div className="home-happy__burst" aria-hidden="true">
              <svg viewBox="0 0 100 100" fill="none">
                <g stroke="rgba(255,255,255,0.4)" strokeWidth="1">
                  {Array.from({ length: 16 }).map((_, i) => {
                    const a = (i / 16) * Math.PI * 2
                    const x1 = 50 + Math.cos(a) * 44, y1 = 50 + Math.sin(a) * 44
                    const x2 = 50 + Math.cos(a) * 50, y2 = 50 + Math.sin(a) * 50
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
                  })}
                </g>
              </svg>
              <div className="home-happy__burst-inner">
                <span className="home-happy__burst-num">20<em>%</em></span>
                <span className="home-happy__burst-off">OFF</span>
              </div>
            </div>

            <div className="home-happy__ico home-happy__ico--drink" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 3h14l-2 8a5 5 0 0 1-10 0z" fill="currentColor" fillOpacity="0.25" />
                <line x1="12" y1="11" x2="12" y2="20" />
                <line x1="8" y1="20" x2="16" y2="20" />
                <path d="M8 7l3-3 3 2 3-2" strokeOpacity="0.6" />
              </svg>
            </div>
            <div className="home-happy__ico home-happy__ico--chili" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 20c4-2 8-4 12-9 2-2.5 4-4 4-8-3 0-5 1-7 3-4 4-6 8-9 12z" fill="currentColor" fillOpacity="0.25" />
                <path d="M17 3c1 1 2 2 3 3" />
              </svg>
            </div>
            <div className="home-happy__ico home-happy__ico--star" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.4 6.2 6.6.6-5 4.5 1.5 6.5L12 16.6 6.5 19.8 8 13.3l-5-4.5 6.6-.6z" fillOpacity="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ────────────────────── */}
      <div className="home-stats" ref={statsRef}>
        <div className="home-stats__bg" ref={statsBgRef} />
        <div className="container home-stats__inner">
          {[
            { to: 5000, suffix: '+', decimals: 0, label: 'Happy Guests' },
            { to: 50,   suffix: '+', decimals: 0, label: 'Menu Items' },
            { to: 4.5,  suffix: '★', decimals: 1, label: 'Google Rating' },
            { to: 15,   suffix: '+', decimals: 0, label: 'Years of Flavor' },
          ].map((s, i) => (
            <div key={i} className="home-stats__item">
              <CountUp to={s.to} suffix={s.suffix} decimals={s.decimals} />
              <span className="label home-stats__l">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Gallery ───────────────────────── */}
      <section className="home-gallery">
        <div className="home-gallery__head container reveal">
          <span className="accent-bar center" />
          <span className="label">Gallery</span>
          <h2 className="heading">A Feast for the Eyes</h2>
        </div>
        <div className="home-gallery__grid">
          {gallery.map((src, i) => (
            <div key={i} className={`home-gallery__cell reveal delay-${(i % 3) + 1}`}>
              <img src={src} alt={`Gallery ${i + 1}`} />
              <div className="home-gallery__overlay" />
            </div>
          ))}
        </div>
      </section>

      {/* ── Hours ─────────────────────────── */}
      <section className="home-hours">
        <div className="home-hours__bg" />
        <div className="home-hours__bg-overlay" />
        <div className="container home-hours__inner">
          <div className="home-hours__left reveal from-left">
            <span className="accent-bar" />
            <span className="label on-dark">Visit Us</span>
            <h2 className="heading on-dark home-hours__heading">Come Dine With Us</h2>
            <p className="body-lg on-dark">Walk in any day of the week or call ahead to let us know you're coming — we'd love to have you.</p>
            <div className="home-hours__visit-list">
              {[
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>, text: 'Walk-ins Always Welcome' },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, text: 'Free Parking Available' },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>, text: 'Takeaway Orders Available' },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, text: 'Private Party Hall Available' },
              ].map((item, i) => (
                <div key={i} className="home-hours__visit-item">
                  <span className="home-hours__visit-icon">{item.icon}</span>
                  <span className="home-hours__visit-text">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="home-hours__actions">
              <a href="tel:+14025059209" className="btn btn-primary">Call to Reserve</a>
              <a href="https://hyderabadhouse.hungerrush.com/Order/OrderType" target="_blank" rel="noreferrer"
                className="btn btn-outline-light">Order Online</a>
            </div>
          </div>
          <div className="home-hours__right reveal from-right">
            <div className="home-hours__card glass on-dark">
              <h4 className="home-hours__card-title label on-dark">Our Schedule</h4>
              <div className="home-hours__row">
                <div className="home-hours__pills">
                  <span className="home-hours__day">Monday – Sunday</span>
                  <span className="home-hours__status open">
                    <span className="home-hours__status-dot" />
                    Open Daily
                  </span>
                </div>
                <span className="home-hours__time">11:00 AM – 9:00 PM</span>
              </div>
              <div className="home-hours__divider" />
              <div className="home-hours__info-row">
                <span className="home-hours__info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>
                </span>
                <a href="tel:+14025059209" className="home-hours__info-text">+1 (402) 505-9209</a>
              </div>
              <div className="home-hours__info-row">
                <span className="home-hours__info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <a href="https://maps.app.goo.gl/QKEtXfahv64saDYD6" target="_blank" rel="noreferrer" className="home-hours__info-text">2537 S 174th Plz, Omaha, NE 68130</a>
              </div>
              <p className="home-hours__note">Walk-ins welcome. Call us to reserve your table.</p>
            </div>
          </div>
        </div>

        {/* ── Mobile-only layout ── */}
        <div className="home-hours__m">
          <span className="accent-bar" />
          <span className="label on-dark">Visit Us</span>
          <h2 className="heading on-dark home-hours__m-heading">Come Dine With Us</h2>

          {/* Hours banner */}
          <div className="home-hours__m-banner">
            <div className="home-hours__m-banner-left">
              <span className="home-hours__m-dot" />
              <span className="home-hours__m-open">Open Daily</span>
            </div>
            <div className="home-hours__m-banner-right">
              <span className="home-hours__m-days">Mon – Sun</span>
              <span className="home-hours__m-time">11 AM – 9 PM</span>
            </div>
          </div>

          {/* Pills */}
          <div className="home-hours__m-pills">
            {['Walk-ins Welcome', 'Free Parking', 'Takeaway', 'Party Hall'].map(p => (
              <span key={p} className="home-hours__m-pill">{p}</span>
            ))}
          </div>

          {/* Contact */}
          <div className="home-hours__m-contact">
            <a href="tel:+14025059209" className="home-hours__m-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>
              +1 (402) 505-9209
            </a>
            <a href="https://maps.app.goo.gl/QKEtXfahv64saDYD6" target="_blank" rel="noreferrer" className="home-hours__m-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              2537 S 174th Plz, Omaha, NE 68130
            </a>
          </div>

          {/* Buttons */}
          <div className="home-hours__m-btns">
            <a href="tel:+14025059209" className="btn btn-primary">Call to Reserve</a>
            <a href="https://hyderabadhouse.hungerrush.com/Order/OrderType" target="_blank" rel="noreferrer" className="btn btn-outline-light">Order Online</a>
          </div>
        </div>

      </section>

      {/* ── Testimonials ──────────────────── */}
      <section className="section home-testimonials texture-grid">
        <div className="container">
          <div className="section-label-group reveal">
            <span className="accent-bar center" />
            <span className="label">Testimonials</span>
            <h2 className="heading">What Our Guests Say</h2>
          </div>
          <div key={tPage} className="home-testimonials__grid">
            {visibleCards.map((t, i) => (
              <div key={i} className={`home-testimonials__card reveal delay-${i + 1}`}>
                <div className="home-testimonials__stars">★★★★★</div>
                <p className="home-testimonials__quote">&ldquo;{t.quote}&rdquo;</p>
                <p className="body-sm home-testimonials__body">{t.body}</p>
                <div className="home-testimonials__meta">
                  <div className="home-testimonials__person">
                    <div>
                      <span className="home-testimonials__name">{t.name}</span>
                      <span className="home-testimonials__date">{t.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="home-testimonials__foot">
            <div className="home-testimonials__nav">
              <button className="home-testimonials__arrow" onClick={() => goTPage(tPage - 1)} aria-label="Previous">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} className={`home-testimonials__dot${i === tPage ? ' active' : ''}`} onClick={() => goTPage(i)} />
              ))}
              <button className="home-testimonials__arrow" onClick={() => goTPage(tPage + 1)} aria-label="Next">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
            <div className="home-testimonials__cta">
              <Link to="/testimonials" className="btn btn-outline">Read All Reviews</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter ────────────────────── */}
      <section className="home-social">
        <div className="home-social__bg" />
        <div className="container home-social__inner reveal">
          <div className="home-social__text">
            <span className="accent-bar" />
            <span className="label on-dark">Stay Connected</span>
            <h2 className="heading on-dark">Follow Us Online</h2>
            <p className="body-lg on-dark">Stay up to date with our latest dishes, offers, and behind-the-scenes moments.</p>
          </div>
          {/* Desktop: card list */}
          <div className="home-social__cards">
            {[
              { name: 'Instagram', handle: '@hyderabad_house_omaha', href: 'https://www.instagram.com/hyderabad_house_omaha/', color: '#E1306C', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
              { name: 'Facebook', handle: 'Hyderabad House Omaha', href: 'https://www.facebook.com/hhomaha', color: '#1877F2', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg> },
              { name: 'TikTok', handle: '@hhomaha', href: 'https://www.tiktok.com/@hhomaha', color: '#fff', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z"/></svg> },
            ].map(s => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="home-social__card">
                <span className="home-social__card-icon" style={{ color: s.color }}>{s.icon}</span>
                <div className="home-social__card-info">
                  <span className="home-social__card-name">{s.name}</span>
                  <span className="home-social__card-handle">{s.handle}</span>
                </div>
                <span className="home-social__card-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </a>
            ))}
          </div>

          {/* Mobile: icon squares */}
          <div className="home-social__icons">
            {[
              { name: 'Instagram', href: 'https://www.instagram.com/hyderabad_house_omaha/', color: '#E1306C', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
              { name: 'Facebook', href: 'https://www.facebook.com/hhomaha', color: '#1877F2', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg> },
              { name: 'TikTok', href: 'https://www.tiktok.com/@hhomaha', color: '#fff', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z"/></svg> },
            ].map(s => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer"
                className="home-social__icon-box" aria-label={s.name}>
                <span className="home-social__icon-box-icon" style={{ color: s.color }}>{s.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
