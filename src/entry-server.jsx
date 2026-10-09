import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'

// Used by scripts/prerender.mjs at build time only. Never shipped to browsers.
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
}
