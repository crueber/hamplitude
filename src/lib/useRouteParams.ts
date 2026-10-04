import { createContext, useContext } from 'react'
import { useParams } from 'react-router-dom'

/**
 * The exam routes are mounted under the three literal licence names (/technician, /general, /extra) rather than a
 * dynamic ":license" segment: a dynamic segment outranks the compendium's catch-all for URLs like
 * /compendium/emergency/practice and would swallow them. The licence therefore comes from this context.
 */
export const LicenseScope = createContext<string | undefined>(undefined)

/** Route params including the licence, whether it came from the URL or from the enclosing LicenseScope. */
export function useRouteParams(): Record<string, string | undefined> {
  const p = useParams()
  const scoped = useContext(LicenseScope)
  return { ...p, license: scoped ?? p.license }
}
