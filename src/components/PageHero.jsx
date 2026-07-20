import './PageHero.css'

export default function PageHero({ title, subtitle, bgImage }) {
  return (
    <section className="page-hero" style={bgImage ? { '--hero-img': `url(${bgImage})` } : {}}>
      <div className="page-hero__overlay" />
      <div className="page-hero__content container">
        <span className="page-hero__eyebrow label">Hyderabad House — Omaha</span>
        <h1 className="display page-hero__title">{title}</h1>
        {subtitle && <p className="body-lg page-hero__sub">{subtitle}</p>}
      </div>
      <div className="page-hero__line" />
    </section>
  )
}
