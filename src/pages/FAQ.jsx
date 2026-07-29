import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import SEO from '../components/SEO'
import useScrollReveal from '../hooks/useScrollReveal'
import './FAQ.css'

const faqs = [
  { cat: 'Visit', q: 'Where is Hyderabad House Omaha located?', a: "We are located at 2537 S 174th Plz, Omaha, NE 68130 in West Omaha, with easy access from Dodge and Center Street. Free parking is available in the plaza." },
  { cat: 'Visit', q: 'Do you accept walk-ins?', a: "Yes! Walk-ins are always welcome. No reservation is needed, just stop by during our operating hours and we'll be happy to seat you." },
  { cat: 'Visit', q: 'What are your opening hours?', a: 'We are open Monday through Sunday, 11:00 AM to 9:00 PM. Hours may vary on public holidays, please call ahead to confirm.' },
  { cat: 'Visit', q: 'Do you have parking available?', a: 'Yes, there is ample free parking available in our plaza with easy access from major roads in Omaha.' },
  { cat: 'Menu', q: 'Where can I find the best biryani in Omaha?', a: "Right here! Our Hyderabadi Dum Biryani is slow-cooked in the traditional dum style with fragrant basmati, marinated meats and hand-ground spices. Locals consistently rate it among the best Indian food in Omaha. Try our HH Signature Biryani for our chef's take on the classic." },
  { cat: 'Menu', q: 'Is your food halal?', a: 'Yes, all our meat and poultry are halal-certified. We take great care to ensure our food meets the highest standards of quality, making us one of the top halal Indian restaurants in Omaha.' },
  { cat: 'Menu', q: 'Do you offer vegetarian, vegan, and gluten-free options?', a: 'Absolutely. Our menu features a wide selection of vegetarian dishes including Paneer Tikka Masala, Dal Makhani, Chana Masala, Aloo Gobi, Malai Kofta and Veg Biryani. Many dishes can be prepared vegan or gluten-free on request, let your server know about any dietary preferences and our team will guide you.' },
  { cat: 'Menu', q: 'Is Hyderabad House kids and family-friendly?', a: "Yes, we're a family Indian restaurant with a warm, welcoming atmosphere. Spice levels can be adjusted for kids, and we have milder dishes like butter chicken, dal makhani, mango lassi and naan that little ones love." },
  { cat: 'Menu', q: 'Do you have a happy hour?', a: 'Yes! Happy Hour runs Monday through Friday from 3 PM to 6 PM with a flat 20% off on appetizers and drinks. Dine-in only.' },
  { cat: 'Events', q: 'Do you offer catering services in Omaha?', a: "Yes. We cater events of all sizes, from intimate family gatherings to large corporate lunches, weddings and celebrations across Omaha and surrounding areas. Contact us to build a custom menu for your event." },
  { cat: 'Events', q: 'Do you have a party hall for private events?', a: "Yes. Our private party hall in West Omaha is perfect for birthday parties, baby showers, engagement parties, corporate lunches, meetings and private events. Contact us to check availability and reserve." },
  { cat: 'Order', q: 'Can I order online for takeout or delivery in Omaha?', a: 'Yes. Place orders online through our Order Now link. We offer Indian takeout in Omaha and partner with major delivery platforms so you can enjoy authentic Hyderabadi food at home.' },
  { cat: 'Order', q: 'Do you deliver to Elkhorn, Papillion, Bellevue, Millard, La Vista, or Council Bluffs?', a: 'Yes, delivery to Elkhorn, Papillion, Bellevue, Millard, La Vista and Council Bluffs is available through our delivery partners. Delivery time and fees vary by distance. You can also pick up your order for the fastest turnaround.' },
]

const categories = ['All', 'Visit', 'Menu', 'Events', 'Order']

const catIcons = {
  Visit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4.5 8-13a8 8 0 0 0-16 0c0 8.5 8 13 8 13z" fill="currentColor" fillOpacity="0.16" />
      <circle cx="12" cy="9" r="3" />
    </svg>
  ),
  Menu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h18a9 9 0 0 1-9 9 9 9 0 0 1-9-9z" fill="currentColor" fillOpacity="0.16" />
      <path d="M2 12h20" />
    </svg>
  ),
  Events: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" fill="currentColor" fillOpacity="0.16" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Order: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" fill="currentColor" fillOpacity="0.16" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
}

export default function FAQ() {
  const [open, setOpen] = useState(0)
  const [filter, setFilter] = useState('All')
  useScrollReveal()

  const list = useMemo(
    () => filter === 'All' ? faqs : faqs.filter(f => f.cat === filter),
    [filter]
  )

  return (
    <main className="faq-page">
      <SEO
        title="FAQ | Halal, Catering, Delivery, Hyderabad House Omaha"
        description="Answers about our menu, halal certification, vegan and gluten-free options, catering, private party hall bookings, happy hour, and delivery to Omaha, Elkhorn, Papillion, Bellevue, Millard, La Vista and Council Bluffs."
        path="/faq"
        image="/images/dishes.webp"
        keywords="halal Indian restaurant Omaha FAQ, Indian catering Omaha FAQ, party hall Omaha, Indian food delivery Omaha, vegan Indian food Omaha, gluten-free Indian food, Indian happy hour Omaha, Indian restaurant open now Omaha, Indian restaurant Elkhorn, Indian restaurant Papillion, Indian restaurant Bellevue"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know before you visit, book, or order."
        bgImage="/images/dishes.webp"
      />

      <section className="section faq-section">
        <div className="container faq-layout">
          <aside className="faq-side reveal from-left">
            <span className="accent-bar" />
            <span className="label">Browse Topics</span>
            <h2 className="heading faq-side__title">Find Your Answer</h2>
            <p className="faq-side__text">
              Filter by topic to jump straight to what you need. Still stuck? Our team is a call away.
            </p>
            <div className="faq-side__filters">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`faq-chip${filter === cat ? ' active' : ''}`}
                  onClick={() => { setFilter(cat); setOpen(0) }}
                >
                  {cat}
                  <span className="faq-chip__count">
                    {cat === 'All' ? faqs.length : faqs.filter(f => f.cat === cat).length}
                  </span>
                </button>
              ))}
            </div>
            <div className="faq-side__contact">
              <div className="faq-side__contact-ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.65 2.63a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.45-1.22a2 2 0 0 1 2.11-.45c.85.31 1.73.53 2.63.65A2 2 0 0 1 22 16.92z" fill="currentColor" fillOpacity="0.16" />
                </svg>
              </div>
              <div>
                <span className="faq-side__contact-t">Prefer to talk?</span>
                <a href="tel:+14025059209" className="faq-side__contact-l">+1 (402) 505-9209</a>
              </div>
            </div>
          </aside>

          <div className="faq-list">
            {list.map((item, i) => {
              const isOpen = open === i
              return (
                <div key={`${filter}-${i}`} className={`faq-item${isOpen ? ' open' : ''}`}>
                  <button className="faq-item__q" onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span className="faq-item__cat-ic" aria-hidden="true">{catIcons[item.cat]}</span>
                    <span className="faq-item__text">
                      <span className="faq-item__cat">{item.cat}</span>
                      <span className="faq-item__title">{item.q}</span>
                    </span>
                    <span className={`faq-item__toggle${isOpen ? ' open' : ''}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="16" height="16">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </button>
                  <div className="faq-item__body">
                    <p>{item.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────── */}
      <section className="faq-cta">
        <div className="faq-cta__glow" />
        <div className="container faq-cta__inner reveal">
          <span className="accent-bar center" />
          <h2 className="heading faq-cta__title">Still Have Questions?</h2>
          <p className="body-lg faq-cta__text">We're always happy to help. Reach out and we'll get back to you as soon as possible.</p>
          <div className="faq-cta__btns">
            <Link to="/contact" className="btn btn-primary">Contact Us</Link>
            <a href="tel:+14025059209" className="btn btn-outline-light">Call Now</a>
          </div>
        </div>
      </section>
    </main>
  )
}
