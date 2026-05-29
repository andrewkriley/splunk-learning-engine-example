/**
 * Extracts https://docs.splunk.com and https://help.splunk.com URLs from src/ and verifies they load.
 *
 * Splunk often redirects docs.splunk.com → help.splunk.com?resourceId=… ; that endpoint frequently
 * returns HTTP 500 + “page not found” for programmatic GETs. Wrong-case SearchReference slugs
 * (e.g. chart vs Chart) trigger that broken redirect chain.
 *
 * Usage: node scripts/validate-splunk-doc-urls.mjs
 */
import { readFileSync, readdirSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..', 'src')

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, files)
    else if (/\.(ts|tsx)$/.test(name)) files.push(p)
  }
  return files
}

const urlSet = new Set()
const re = /https:\/\/(?:docs|help)\.splunk\.com[^\s"'<>]+/g
for (const f of walk(root)) {
  const s = readFileSync(f, 'utf8')
  let m
  while ((m = re.exec(s))) {
    urlSet.add(m[0].replace(/[),.;:]+$/g, ''))
  }
}

const urls = [...urlSet].sort()
console.error(`Checking ${urls.length} unique Splunk doc/help URLs...\n`)

function bodyLooksBroken(html) {
  return (
    html.includes("can't find the page") ||
    html.includes("can't find the page you're looking for") ||
    html.includes('find the page you')
  )
}

const failures = []
const ua =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

for (const u of urls) {
  try {
    const r = await fetch(u, {
      redirect: 'follow',
      headers: {
        'User-Agent': ua,
        Accept: 'text/html,application/xhtml+xml',
      },
      signal: AbortSignal.timeout(25000),
    })
    const chunk = await r.arrayBuffer()
    const head = new TextDecoder().decode(chunk.slice(0, Math.min(chunk.byteLength, 65536)))
    const resourceIdRedirect = r.url.includes('resourceId=')
    const soft404 = bodyLooksBroken(head)
    const ok =
      r.status === 200 &&
      !soft404 &&
      !resourceIdRedirect
    if (!ok) {
      const reason = resourceIdRedirect
        ? 'redirect_to_help_resourceId'
        : soft404
          ? 'soft_404_content'
          : `http_${r.status}`
      failures.push({
        url: u,
        status: r.status,
        finalUrl: r.url,
        reason,
      })
      process.stdout.write('x')
    } else {
      process.stdout.write('.')
    }
  } catch (e) {
    failures.push({ url: u, status: 'ERR', error: String(e.message || e) })
    process.stdout.write('x')
  }
}
console.error('\n')

if (failures.length === 0) {
  console.error('All URLs returned HTTP 200 with expected HTML (no soft 404).')
  process.exit(0)
}

console.error(`FAILED (${failures.length}):\n`)
for (const f of failures) {
  console.error(JSON.stringify(f, null, 2))
}
process.exit(1)
