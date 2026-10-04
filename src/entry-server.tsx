/** Server entry used by scripts/prerender.ts at build time to turn each route into static HTML. */
import { prerender } from 'react-dom/static'
import { StaticRouterProvider, createStaticHandler, createStaticRouter } from 'react-router-dom'
import { basename, routes } from './routes'

export { allPages, canonicalUrl, clip, headHtml, seoFor } from './lib/seo'

export async function render(path: string): Promise<{ html: string; status: number }> {
  const handler = createStaticHandler(routes, { basename })
  const context = await handler.query(new Request(`http://localhost${basename}${path === '/' ? '/' : path}`))
  if (context instanceof Response) throw new Error(`unexpected redirect while rendering ${path}`)
  const router = createStaticRouter(handler.dataRoutes, context)
  // hydrate={false}: the browser builds its own router, so we don't emit the router's state script
  const { prelude } = await prerender(<StaticRouterProvider router={router} context={context} hydrate={false} />)
  return { html: await new Response(prelude).text(), status: context.statusCode }
}
