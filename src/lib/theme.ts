import { useEffect } from 'react'
import { useStore, update } from './store'

/** Applies the saved theme to <html>. 'system' defers to prefers-color-scheme. */
export function useApplyTheme() {
  const theme = useStore((s) => s.settings.theme)
  useEffect(() => {
    const el = document.documentElement
    if (theme === 'system') delete el.dataset.theme
    else el.dataset.theme = theme
  }, [theme])
}

export function cycleTheme() {
  update((s) => {
    const order = ['system', 'light', 'dark'] as const
    const next = order[(order.indexOf(s.settings.theme) + 1) % order.length]
    return { ...s, settings: { ...s.settings, theme: next } }
  })
}
