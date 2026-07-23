import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Post-transform the built index.html so the main CSS bundle loads
// without blocking initial render. It converts:
//   <link rel="stylesheet" href="/assets/index-xxx.css">
// into the standard async pattern:
//   <link rel="preload" as="style" href="..."/>
//   <link rel="stylesheet" href="..." media="print" onload="this.media='all'"/>
//   <noscript><link rel="stylesheet" href="..."/></noscript>
function asyncCssPlugin() {
  return {
    name: 'async-css',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html.replace(
          /<link rel="stylesheet"([^>]*?)href="([^"]+\.css)"([^>]*?)\/?>/g,
          (_m, pre, href, post) => {
            const attrs = `${pre}${post}`.trim()
            return [
              `<link rel="preload" as="style" href="${href}" />`,
              `<link rel="stylesheet" ${attrs} href="${href}" media="print" onload="this.media='all'" />`,
              `<noscript><link rel="stylesheet" ${attrs} href="${href}" /></noscript>`,
            ].join('\n    ')
          },
        )
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), asyncCssPlugin()],
  build: {
    // Split vendor code into a separate chunk so page-specific JS stays small
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    // Smaller inline threshold so large-ish assets stay external and cacheable
    assetsInlineLimit: 2048,
    // Modern browsers only — smaller bundle
    target: 'es2020',
  },
})
