import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import '@fontsource-variable/inter'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/jetbrains-mono'
import './styles/tokens.css'
import './styles/app.css'
import './styles/compendium.css'
import { basename, routes } from './routes'

// Old shared links looked like /#/technician/T5D. Send them to the real URL.
if (location.hash.startsWith('#/')) history.replaceState(null, '', basename + location.hash.slice(1))

const router = createBrowserRouter(routes, { basename })
const app = (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
const root = document.getElementById('root')!
// Pages are prerendered at build time: hydrate them. Anything else (practice, exam...) renders client-side.
// A host may answer an unknown URL with a *different* prerendered page, so only hydrate when it matches the URL.
const norm = (p: string) => p.replace(/\/+$/, '') || '/'
const html = document.documentElement
if (root.hasChildNodes() && norm(html.dataset.prePath ?? '') === norm(location.pathname)) {
  hydrateRoot(root, app)
} else {
  root.replaceChildren()
  html.removeAttribute('data-prerendered')
  createRoot(root).render(app)
}
