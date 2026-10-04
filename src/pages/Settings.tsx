import { useRef, useState } from 'react'
import { exportProgress, importProgress, resetProgress, update, useStore } from '@/lib/store'

export function SettingsPage() {
  const s = useStore((x) => x.settings)
  const [msg, setMsg] = useState('')
  const file = useRef<HTMLInputElement>(null)
  const set = (patch: Partial<typeof s>) => update((st) => ({ ...st, settings: { ...st.settings, ...patch } }))

  function download() {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([exportProgress()], { type: 'application/json' }))
    a.download = 'hamplitude-progress.json'
    a.click()
  }

  return (
    <div className="wrap" style={{ maxWidth: 720 }}>
      <div className="page-head"><h1>Settings</h1></div>
      <div className="panel">
        <h2>Studying</h2>
        <div className="setting">
          <div>Shuffle answer order<small>Stops you leaning on letter position. Recommended.</small></div>
          <input type="checkbox" checked={s.shuffle} onChange={(e) => set({ shuffle: e.target.checked })} style={{ width: 22, height: 22 }} />
        </div>
        <div className="setting">
          <div>Show FCC rule citations<small>The [97.xxx] reference after each question id.</small></div>
          <input type="checkbox" checked={s.showRefs} onChange={(e) => set({ showRefs: e.target.checked })} style={{ width: 22, height: 22 }} />
        </div>
        <div className="setting">
          <div>Theme</div>
          <div className="ctl-choice">
            {(['system', 'light', 'dark'] as const).map((t) => (
              <button key={t} role="radio" aria-checked={s.theme === t} onClick={() => set({ theme: t })}>{t}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="panel">
        <h2>Your progress</h2>
        <p style={{ color: 'var(--ink-2)' }}>Saved only in this browser. Export a backup to move it to another device.</p>
        <div className="actions">
          <button className="btn" onClick={download}>Export</button>
          <button className="btn" onClick={() => file.current?.click()}>Import</button>
          <button className="btn" style={{ color: 'var(--bad)' }} onClick={() => { if (confirm('Erase all progress on this device?')) { resetProgress(); setMsg('Progress erased.') } }}>Reset…</button>
          <input ref={file} type="file" accept="application/json" hidden onChange={async (e) => { const f = e.target.files?.[0]; if (f) setMsg(importProgress(await f.text()) ? 'Imported.' : 'That file is not a Hamplitude backup.') }} />
        </div>
        {msg && <p role="status" style={{ color: 'var(--primary)', fontWeight: 600 }}>{msg}</p>}
      </div>
    </div>
  )
}
