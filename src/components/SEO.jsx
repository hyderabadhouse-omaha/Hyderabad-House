// Per-page SEO component.
// Uses React 19's native metadata hoisting — <title> and <meta> written inside a
// component are automatically hoisted to <head> and deduplicated by name/property.
//
// Usage:
//   <SEO
//     title="Menu | Hyderabad House Omaha"
//     description="Explore our full menu..."
//     path="/menu"
//     image="/images/biryani.webp"
//     type="restaurant.menu"
//     keywords="Indian menu Omaha, biryani, curries"
//     jsonLd={{ '@context': 'https://schema.org', ... }}
//   />

import { useEffect } from 'react'

const SITE_URL = 'https://www.hhoma.com'
const SITE_NAME = 'Hyderabad House Omaha'
const DEFAULT_IMAGE = '/images/dishes.webp'

export default function SEO({
  title,
  description,
  path = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  keywords,
  noIndex = false,
  jsonLd,
}) {
  const fullUrl = SITE_URL + path
  const absImage = image?.startsWith('http') ? image : SITE_URL + image
  const fullTitle = title?.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`

  // Inject one JSON-LD block per page (React doesn't hoist <script>).
  useEffect(() => {
    if (!jsonLd) return
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.dataset.seo = 'page'
    el.textContent = JSON.stringify(jsonLd)
    document.head.appendChild(el)
    return () => {
      if (el.parentNode) el.parentNode.removeChild(el)
    }
  }, [jsonLd])

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={absImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absImage} />
      <meta name="twitter:image:alt" content={title} />
    </>
  )
}
