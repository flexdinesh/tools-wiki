// Records the README cover at exactly 30fps and writes the animated WebPs.
//
//   pnpm record            both themes
//   pnpm record light      one theme
//
// The page runs under stageshow's virtual clock (?record=1), so time only
// moves when this script steps it by 1/30s: every frame is rendered exactly
// once, nothing drops or doubles. One steady-state loop is captured, from
// the second loop's 'start' mark until the next loop's 'start' (after its last beat,
// 'home': the stage resets in the same tick as the script's final mark). The stage is 1040x600
// at device scale 1.5, so the WebP is 1560x900.
//
// CHROME_PATH overrides the Chrome binary (default: the installed Chrome).

import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'
import sharp from 'sharp'
import { createServer } from 'vite'

const FPS = 30
const WIDTH = 1040
const HEIGHT = 600
const SCALE = 1.5
const MAX_FRAMES = FPS * 30

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const assets = resolve(root, '..', 'assets')
const OUTPUT = { light: 'readme-cover.webp', dark: 'readme-cover-dark.webp' }

const requested = process.argv.slice(2)
const themes = requested.length ? requested : ['light', 'dark']
for (const theme of themes) {
  if (!(theme in OUTPUT)) throw new Error(`Unknown theme: ${theme} (light or dark)`)
}

/** Frame delays in ms that sum to exact 30fps time (33, 33, 34, ...). */
function delays(count) {
  return Array.from({ length: count }, (_, i) => Math.round(((i + 1) * 1000) / FPS) - Math.round((i * 1000) / FPS))
}

async function record(browser, url, theme, dir) {
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: SCALE })
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto(`${url}?record=1&theme=${theme}`)
  await page.waitForSelector('.ss-stage')
  await page.evaluate(() => document.fonts.ready)

  const step = () => page.evaluate(() => window.__stageshow.clock.step(1))
  const mark = () => page.evaluate(() => document.querySelector('.ss-stage')?.getAttribute('data-mark') ?? null)

  // Play one loop untouched, then start at the second loop's 'start'. The
  // first loop is a cold start (the cursor sits at rest in its first frame),
  // so only a steady-state loop matches its own seam.
  let frames = 0
  const until = async (name) => {
    while ((await mark()) !== name) {
      if (++frames > MAX_FRAMES * 2) throw new Error(`${theme}: never reached the '${name}' mark`)
      await step()
    }
  }
  await until('start')
  await until('home')
  await until('start')

  const paths = []
  let lastBeat = false
  for (;;) {
    const path = join(dir, `${theme}-${String(paths.length).padStart(4, '0')}.png`)
    await page.screenshot({ path, clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT } })
    paths.push(path)
    if (paths.length > MAX_FRAMES) throw new Error(`${theme}: loop longer than ${MAX_FRAMES} frames`)
    await step()
    const now = await mark()
    if (now === 'home') lastBeat = true
    if (lastBeat && now === 'start') break
  }

  // The loop seam: the next loop's first frame should match this loop's first.
  const seam = join(dir, `${theme}-seam.png`)
  await page.screenshot({ path: seam, clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT } })
  await page.close()
  if (errors.length) throw new Error(`${theme}: page errors\n${errors.join('\n')}`)
  return { paths, seam }
}

async function seamDifference(a, b) {
  const [x, y] = await Promise.all([a, b].map((p) => sharp(p).raw().toBuffer()))
  let changed = 0
  for (let i = 0; i < x.length; i++) if (x[i] !== y[i]) changed++
  return changed / x.length
}

async function encode(paths, out) {
  const frames = await Promise.all(paths.map((p) => readFile(p)))
  const info = await sharp(frames, { join: { animated: true } })
    // Lossless: flat UI compresses smaller than lossy here, with no block residue on dark flats
    .webp({ lossless: true, effort: 6, loop: 0, delay: delays(paths.length) })
    .toFile(out)
  return info
}

const server = await createServer({ root, configFile: resolve(root, 'vite.config.ts'), server: { port: 4411, strictPort: true }, logLevel: 'warn' })
await server.listen()
const url = `http://127.0.0.1:4411/`
const path = process.env.CHROME_PATH
const browser = await chromium.launch(path ? { executablePath: path } : { channel: 'chrome' })
const dir = await mkdtemp(join(tmpdir(), 'readme-cover-'))

try {
  for (const theme of themes) {
    const { paths, seam } = await record(browser, url, theme, dir)
    const diff = await seamDifference(paths[0], seam)
    const out = join(assets, OUTPUT[theme])
    const info = await encode(paths, out)
    const seconds = (paths.length / FPS).toFixed(2)
    console.log(`${theme}: ${paths.length} frames (${seconds}s @ ${FPS}fps), seam diff ${(diff * 100).toFixed(3)}%, ${(info.size / 1024 / 1024).toFixed(2)} MB -> ${out}`)
  }
} finally {
  await browser.close()
  await server.close()
  if (!process.env.KEEP_FRAMES) await rm(dir, { recursive: true, force: true })
  else console.log(`frames kept in ${dir}`)
}
