import { useState } from 'react'
import seoConfig from '../../seo.config.json'

/**
 * A contact address that spam harvesters can't scrape. Scrapers read the raw HTML (and every page here is prerendered),
 * so the address is NOT in it: it is assembled from two pieces in the browser only after someone clicks.
 * The reveal also covers visitors with no mail app configured, who couldn't use a plain mailto: link.
 */
export function ContactEmail({ label = 'Email the maintainer' }: { label?: string }) {
  const [addr, setAddr] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  if (!addr)
    return (
      <button type="button" className="contact-btn" onClick={() => setAddr(`${seoConfig.contact.user}@${seoConfig.contact.domain}`)}>
        {label}
      </button>
    )

  return (
    <span className="contact-open" role="status">
      <code>{addr}</code>
      <button type="button" className="contact-btn" onClick={() => navigator.clipboard?.writeText(addr).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }).catch(() => {})}>
        {copied ? 'Copied ✓' : 'Copy'}
      </button>
      <a className="contact-btn" href={`mailto:${addr}`}>Open in mail app</a>
    </span>
  )
}
