// Post-build step: generate per-route HTML files that carry proper OG and
// Twitter metadata. Social crawlers (Facebook, Twitter, iMessage, WhatsApp,
// LinkedIn, Slack) do not execute JavaScript, so React-side <SEO> tags are
// invisible to them — they only read the raw HTML served at the URL.
//
// This script reads dist/index.html, swaps in page-specific title + OG tags,
// and writes each page out to dist/<path>/index.html. Vercel serves these
// directly for the matching routes (static files beat SPA rewrites), while
// the React bundle still boots and takes over on the client.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const SITE = 'https://www.hhoma.com'

const PAGES = [
  {
    path: '/biryani-utsav',
    title: 'October Biryani Utsav | Hyderabad House Omaha',
    description: 'A different biryani every weekday this October at Hyderabad House Omaha. Half-tray feasts for gatherings, Monday through Thursday, $50 each. Book your pickup slot.',
    image: '/images/biryani.webp',
    imageAlt: 'October Biryani Utsav at Hyderabad House Omaha, half-tray feasts of regional Indian biryanis',
    type: 'event',
    keywords: 'October Biryani Utsav, biryani festival Omaha, half tray biryani Omaha, biryani for gatherings Omaha, Hyderabadi biryani Omaha, Thalapakatti goat biryani, Pachimirchi paneer biryani, Vijayawada chicken biryani, jack fruit biryani, biryani booking Omaha',
  },
  {
    path: '/menu',
    title: 'Menu | Hyderabad House Omaha',
    description: 'Explore the full Hyderabad House Omaha menu — slow-cooked dum biryani, tandoori kebabs, Andhra curries, vegetarian specials, breads and desserts.',
    image: '/images/biryani.webp',
    imageAlt: 'Hyderabad House Omaha menu, biryani, curries, and tandoori',
    type: 'website',
  },
  {
    path: '/about-us',
    title: 'About Us | Hyderabad House Omaha',
    description: 'The story, the chefs, and the kitchen behind Hyderabad House Omaha, an authentic Hyderabadi restaurant on 174th in West Omaha.',
    image: '/images/interior.webp',
    imageAlt: 'Inside Hyderabad House Omaha',
    type: 'website',
  },
  {
    path: '/contact',
    title: 'Contact Us | Hyderabad House Omaha',
    description: 'Get in touch for catering, private party hall bookings, feedback, or a table for tonight. 2537 S 174th Plz, Omaha, NE. +1 (402) 505-9209.',
    image: '/images/storefront.webp',
    imageAlt: 'Hyderabad House Omaha storefront',
    type: 'website',
  },
]

function swapMeta(html, { title, description, image, imageAlt, type, keywords, url }) {
  const absImage = image.startsWith('http') ? image : SITE + image

  // Title tag
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)

  // name= meta tags
  const nameMetas = {
    description,
    keywords,
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': absImage,
    'twitter:image:alt': imageAlt,
  }
  for (const [name, content] of Object.entries(nameMetas)) {
    if (content == null) continue
    const re = new RegExp(`<meta name="${name}" content="[^"]*"\\s*/?>`, 'i')
    if (re.test(html)) {
      html = html.replace(re, `<meta name="${name}" content="${content}" />`)
    } else {
      // Insert before </head>
      html = html.replace('</head>', `    <meta name="${name}" content="${content}" />\n  </head>`)
    }
  }

  // property= meta tags
  const propMetas = {
    'og:type': type,
    'og:title': title,
    'og:description': description,
    'og:url': url,
    'og:image': absImage,
    'og:image:secure_url': absImage,
    'og:image:alt': imageAlt,
  }
  for (const [prop, content] of Object.entries(propMetas)) {
    if (content == null) continue
    const re = new RegExp(`<meta property="${prop}" content="[^"]*"\\s*/?>`, 'ig')
    html = html.replace(re, `<meta property="${prop}" content="${content}" />`)
  }

  // Canonical link
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${url}" />`,
  )

  return html
}

function run() {
  const base = readFileSync(join(DIST, 'index.html'), 'utf8')
  for (const page of PAGES) {
    const url = SITE + page.path
    const html = swapMeta(base, { ...page, url })
    const outDir = join(DIST, page.path)
    mkdirSync(outDir, { recursive: true })
    writeFileSync(join(outDir, 'index.html'), html, 'utf8')
    console.log(`[og] wrote ${page.path}/index.html`)
  }
}

run()
