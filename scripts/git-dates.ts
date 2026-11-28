/**
 * Real per-file dates from git history, for the sitemap's <lastmod>, Article datePublished/dateModified and the
 * visible "Last updated" line. One `git log` pass over the whole history; nothing is guessed.
 *   first: author date of the first commit that added the file at its current path (ISO 8601 with offset)
 *   last:  committer date of the most recent commit that touched the file
 * Returns null (and the callers leave the dates out) when git is missing or the clone is shallow, because a shallow
 * clone would date every file to the newest commit. CI checks out with fetch-depth: 0 for this reason.
 */
import { spawnSync } from 'node:child_process'

export interface FileDates { first: string; last: string }

export function gitDates(root: string): Map<string, FileDates> | null {
  const git = (...args: string[]) => spawnSync('git', ['-C', root, ...args], { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 })
  const shallow = git('rev-parse', '--is-shallow-repository')
  if (shallow.status !== 0) { console.warn('git-dates: not a git work tree, so no page dates'); return null }
  if (shallow.stdout.trim() === 'true') { console.warn('git-dates: shallow clone, so no page dates (fetch the full history: git fetch --unshallow)'); return null }
  // newest first; a line "\x01<author date> <committer date>" starts each commit, then the files it touched
  const log = git('log', '--no-merges', '--format=%x01%aI %cI', '--name-only', 'HEAD')
  if (log.status !== 0) { console.warn('git-dates: git log failed, so no page dates'); return null }
  const out = new Map<string, FileDates>()
  let authored = '', committed = ''
  for (const line of log.stdout.split('\n')) {
    if (line.startsWith('\x01')) { [authored, committed] = line.slice(1).split(' '); continue }
    const f = line.trim()
    if (!f) continue
    const d = out.get(f)
    if (d) d.first = authored // walking back in time: keep overwriting until the oldest commit
    else out.set(f, { first: authored, last: committed })
  }
  return out
}

/** The newest `last` among several files (ISO strings with offsets compare by instant, not by text). */
export function newest(dates: Map<string, FileDates> | null, files: string[]): string | undefined {
  let best: string | undefined
  for (const f of files) {
    const d = dates?.get(f)?.last
    if (d && (!best || Date.parse(d) > Date.parse(best))) best = d
  }
  return best
}
