import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'
import { getPostBySlug, getRelatedPosts } from '../data/posts'
import './BlogPost.css'

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="post-h2">{block.text}</h2>
    case 'quote':
      return (
        <blockquote className="post-quote">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M7.17 6C4.87 6 3 7.87 3 10.17V14h4.83V10.17H5.5c0-1.29 1.04-2.33 2.33-2.33V6H7.17zm10 0c-2.3 0-4.17 1.87-4.17 4.17V14h4.83V10.17h-2.33c0-1.29 1.04-2.33 2.33-2.33V6h-1.66z"/>
          </svg>
          <p>{block.text}</p>
        </blockquote>
      )
    case 'list':
      return (
        <ul className="post-list">
          {block.items.map((it, i) => <li key={i}>{it}</li>)}
        </ul>
      )
    case 'p':
    default:
      return <p className="post-p">{block.text}</p>
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)
  useScrollReveal()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) return <Navigate to="/blogs" replace />

  const related = getRelatedPosts(slug, 3)

  return (
    <main className="post-page">
      {/* ── Hero ── */}
      <header className="post-hero">
        <div className="post-hero__img" style={{ backgroundImage: `url(${post.img})` }} />
        <div className="post-hero__overlay" />
        <div className="container post-hero__inner">
          <Link to="/blogs" className="post-back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            All stories
          </Link>
          <span className="post-cat">{post.cat}</span>
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            <span className="post-meta__author">{post.author}</span>
            <span className="post-meta__dot" />
            <span>{post.date}</span>
            <span className="post-meta__dot" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <article className="post-article">
        <div className="container post-article__inner">
          <div className="post-body reveal">
            {post.body.map((b, i) => <Block key={i} block={b} />)}
          </div>

          <div className="post-share reveal">
            <span className="post-share__lbl">Share this story</span>
            <div className="post-share__btns">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on X"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18.244 2H21l-6.53 7.46L22 22h-6.828l-4.77-6.246L4.9 22H2l7.05-8.048L2 2h6.914l4.32 5.708zm-2.395 18h1.85L7.19 4H5.212z"/></svg>
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(post.excerpt + '\n\n' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                aria-label="Share by email"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,14 22,4"/></svg>
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* ── Related ── */}
      <section className="post-related">
        <div className="container">
          <div className="post-related__head reveal">
            <span className="accent-bar center" />
            <h2 className="heading post-related__title">More Stories</h2>
          </div>
          <div className="post-related__grid">
            {related.map(p => (
              <Link key={p.slug} to={`/blogs/${p.slug}`} className="post-related__card">
                <div className="post-related__img" style={{ backgroundImage: `url(${p.img})` }}>
                  <span className="post-related__cat">{p.cat}</span>
                </div>
                <div className="post-related__body">
                  <span className="post-related__date">{p.date}</span>
                  <h3 className="post-related__t">{p.title}</h3>
                  <span className="post-related__cta">
                    Read more
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="post-cta">
        <div className="post-cta__glow" />
        <div className="container post-cta__inner reveal">
          <span className="accent-bar center" />
          <h2 className="heading post-cta__title">Come taste the story</h2>
          <p className="post-cta__text">Walk in any day of the week or reserve our private hall for your next gathering.</p>
          <div className="post-cta__btns">
            <Link to="/menu" className="btn btn-primary">See the Menu</Link>
            <Link to="/contact" className="btn btn-outline-light">Contact Us</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
