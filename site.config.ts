/**
 * Where the site is served from. Decides the base path baked into asset URLs, and the origin used in
 * canonical URLs, the sitemap and social cards.
 *
 *   public/CNAME present  ->  custom domain at the root:  https://<cname>/
 *   otherwise             ->  GitHub project page:        https://<owner>.github.io/hamplitude/
 *
 * Adding public/CNAME (containing just the domain) is the "go live on the custom domain" switch.
 * Override for experiments with SITE_ORIGIN / SITE_BASE.
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

export interface SiteConfig {
  /** custom domain, or '' */
  cname: string
  /** e.g. https://hamplitude.net or https://crueber.github.io */
  origin: string
  /** '/' or '/hamplitude/' (always starts and ends with a slash) */
  base: string
  /** site root URL without a trailing slash */
  url: string
}

export function siteConfig(root = process.cwd()): SiteConfig {
  const f = join(root, 'public/CNAME')
  const cname = existsSync(f) ? readFileSync(f, 'utf8').trim() : ''
  const origin = process.env.SITE_ORIGIN ?? (cname ? `https://${cname}` : 'https://crueber.github.io')
  const base = process.env.SITE_BASE ?? (cname ? '/' : '/hamplitude/')
  return { cname, origin, base, url: origin + base.replace(/\/$/, '') }
}
