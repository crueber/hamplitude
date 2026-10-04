// End-to-end smoke test of the learner flow. Needs the dev server on :5173.
import { chromium } from 'playwright-core'
const b = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] })
const p = await (await b.newContext({ viewport: { width: 1000, height: 900 } })).newPage()
const errs: string[] = []
p.on('pageerror', (e) => errs.push(String(e)))
const ok = (c: boolean, m: string) => { console.log(c ? '✓' : '✗', m); if (!c) process.exitCode = 1 }
await p.goto('http://localhost:5173/#/technician/T5D/practice'); await p.waitForTimeout(600)
ok((await p.locator('.choice').count()) === 4, 'practice shows 4 choices')
const qid = await p.locator('.qid').first().innerText()
await p.keyboard.press('1'); await p.waitForTimeout(300)
ok((await p.locator('.feedback').count()) === 1, `feedback appears after answering ${qid}`)
ok((await p.locator('.choice.correct').count()) === 1, 'exactly one choice marked correct')
ok((await p.locator('.feedback .why').innerText()).length > 5, 'why text present')
await p.keyboard.press('Enter'); await p.waitForTimeout(300)
ok((await p.locator('.quiz-count').innerText()).startsWith('2/'), 'advances to question 2')
const card = await p.evaluate(() => JSON.parse(localStorage.getItem('hamplitude:v1')!).cards)
ok(Object.keys(card).length === 1, 'progress persisted to localStorage')
// exam
await p.goto('http://localhost:5173/#/technician/exam'); await p.waitForTimeout(600)
ok((await p.locator('.exam-nav button').count()) === 35, 'exam has 35 questions (one per group)')
await p.goto('http://localhost:5173/#/extra/exam'); await p.waitForTimeout(600)
ok((await p.locator('.exam-nav button').count()) === 50, 'extra exam has 50 questions')
// figure question renders
await p.goto('http://localhost:5173/#/technician/T6C/practice'); await p.waitForTimeout(600)
let sawFig = false
for (let i = 0; i < 12 && !sawFig; i++) {
  if (await p.locator('.qfig img').count()) { sawFig = true; break }
  await p.keyboard.press('1'); await p.keyboard.press('Enter'); await p.waitForTimeout(150)
}
ok(sawFig, 'figure image rendered on T6C question')
if (sawFig) ok(await p.evaluate(() => (document.querySelector('.qfig img') as HTMLImageElement).naturalWidth > 0), 'figure image loaded')
ok(errs.length === 0, `no page errors ${errs.join('; ')}`)
await b.close()
