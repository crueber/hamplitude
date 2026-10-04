import { chromium } from 'playwright-core'
const [route, sel, out, dark] = process.argv.slice(2)
const b = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] })
const p = await (await b.newContext({ viewport: { width: 1000, height: 900 }, deviceScaleFactor: 1.5, colorScheme: dark ? 'dark' : 'light' })).newPage()
await p.goto((process.env.HX_BASE ?? 'http://localhost:5173') + route); await p.waitForTimeout(1500)
await (await p.$$(sel))[0].screenshot({ path: out }); await b.close()
