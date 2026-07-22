import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import useScrollReveal from '../hooks/useScrollReveal'
import { posts } from '../data/posts'
import './Blogs.css'

const ReadMore = () => (
  <span className="blog-card__btn">
    Read More
    <span className="arrow">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </span>
  </span>
)

export default function Blogs() {
  useScrollReveal()

  const [featured, ...rest] = posts

  return (
    <main className="blogs-page">
      <PageHero
        title="Tips & Recipes from Our Chefs"
        subtitle="Stories, culture, and culinary wisdom from the heart of our kitchen."
        bgImage="/images/dishes.webp"
      />

      <section className="section blogs-section">
        <div className="container">
          <div className="blogs-head reveal">
            <span className="accent-bar center" />
            <span className="label" style={{ display: 'block', textAlign: 'center', marginBottom: 16 }}>Our Blog</span>
            <h2 className="heading blogs-main-title">Latest Stories</h2>
          </div>

          {/* Featured first post */}
          <Link to={`/blogs/${featured.slug}`} className="blog-featured reveal">
            <div className="blog-featured__img-wrap">
              <img src={featured.img} alt={featured.title} className="blog-featured__img" />
              <span className="blog-card__cat label">{featured.cat}</span>
            </div>
            <div className="blog-featured__body">
              <span className="blog-card__date label">{featured.date} · {featured.readTime}</span>
              <h3 className="blog-featured__title">{featured.title}</h3>
              <p className="body-lg blog-featured__excerpt">{featured.excerpt}</p>
              <ReadMore />
            </div>
          </Link>

          {/* Remaining posts */}
          <div className="blogs-grid">
            {rest.map((p, i) => (
              <Link key={p.slug} to={`/blogs/${p.slug}`} className={`blog-card reveal delay-${(i % 3) + 1}`}>
                <div className="blog-card__img-wrap">
                  <img src={p.img} alt={p.title} className="blog-card__img" />
                  <span className="blog-card__cat label">{p.cat}</span>
                </div>
                <div className="blog-card__body">
                  <span className="blog-card__date label">{p.date} · {p.readTime}</span>
                  <h3 className="blog-card__title">{p.title}</h3>
                  <p className="body-sm blog-card__excerpt">{p.excerpt}</p>
                  <ReadMore />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────── */}
      <section className="blogs-cta">
        <div className="container blogs-cta__inner reveal">
          <span className="accent-bar center" />
          <h2 className="heading blogs-cta__title">Hungry for More?</h2>
          <p className="body-lg blogs-cta__text">Follow us on social media for the latest updates, recipes, and behind-the-scenes moments.</p>
          <div className="blogs-cta__btns">
            <Link to="/menu" className="btn btn-primary">Explore Our Menu</Link>
            <a href="https://www.toasttab.com/nawabis-hyderabad-house" target="_blank" rel="noreferrer" className="btn btn-outline-light">Order Online</a>
          </div>
        </div>
      </section>
    </main>
  )
}
