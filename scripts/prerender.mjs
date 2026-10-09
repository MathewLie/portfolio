// Runs after `vite build` and `vite build --ssr`. For every route it renders the
// React app to a string and writes a full HTML file into dist/, so the text and
// the meta/OG tags are in the file the server sends, with no JavaScript needed.
// The browser bundle then hydrates that HTML instead of building it from scratch.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const template = readFileSync(join(dist, 'index.html'), 'utf8')
for (const marker of ['<!--app-head-->', '<!--app-html-->']) {
  if (!template.includes(marker)) {
    throw new Error(`prerender: ${marker} is missing from dist/index.html`)
  }
}

const { render } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href)
// Plain data modules with no imports, so Node can load them straight from src/.
const { routes, notFoundRoute } = await import(pathToFileURL(join(root, 'src', 'routes.js')).href)
const { SITE_URL } = await import(pathToFileURL(join(root, 'src', 'data', 'site.js')).href)

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const OG_IMAGE = `${SITE_URL}/og-image.jpg`
const OG_IMAGE_ALT = 'Matthew Li, training for IRONMAN 70.3 Florida'

// Elements fade in on scroll with JavaScript. With JS off they would stay
// invisible, so this override only applies when scripts are disabled.
const NO_JS_CSS =
  '[style*="opacity:0"]{opacity:1!important;filter:none!important;transform:none!important}'

function headFor(route, urlPath) {
  const url = SITE_URL + (urlPath === '/' ? '/' : urlPath)
  const title = esc(route.title)
  const description = esc(route.description)
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
  ]
  if (route.noindex) {
    tags.push('<meta name="robots" content="noindex" />')
  } else {
    tags.push(`<link rel="canonical" href="${esc(url)}" />`)
  }
  tags.push(
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="Matthew Li" />',
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(OG_IMAGE)}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="${esc(OG_IMAGE_ALT)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${esc(OG_IMAGE)}" />`,
    `<noscript><style>${NO_JS_CSS}</style></noscript>`,
  )
  return tags.join('\n    ')
}

function writePage(file, route, urlPath, renderUrl) {
  const html = render(renderUrl)
  const page = template
    .replace('<!--app-head-->', () => headFor(route, urlPath))
    .replace('<!--app-html-->', () => html)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, page)
  return html
}

const pages = []
for (const route of routes) {
  const file = route.path === '/' ? join(dist, 'index.html') : join(dist, route.path, 'index.html')
  const html = writePage(file, route, route.path, route.path)
  pages.push({ path: route.path, bytes: html.length })
}

// Netlify serves dist/404.html, with a 404 status, for any URL that has no file.
writePage(join(dist, '404.html'), notFoundRoute, '/404', '/404')

// Fail the build rather than ship an empty shell.
const home = readFileSync(join(dist, 'index.html'), 'utf8')
if (!home.includes('From zero to IRONMAN 70.3')) {
  throw new Error('prerender: hero text is missing from dist/index.html')
}

const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  routes
    .map((r) => `  <url><loc>${esc(SITE_URL + (r.path === '/' ? '/' : r.path))}</loc></url>`)
    .join('\n') +
  '\n</urlset>\n'
writeFileSync(join(dist, 'sitemap.xml'), sitemap)
writeFileSync(
  join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
)

for (const p of pages) console.log(`prerendered ${p.path} (${p.bytes} chars of markup)`)
console.log('prerendered 404.html, sitemap.xml, robots.txt')
