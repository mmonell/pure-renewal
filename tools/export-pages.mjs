import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { PURE_RENEWAL_PAGES } from '../src/content/pureRenewalPages.ts'

const outputDir = path.resolve(process.cwd(), 'dist')
const basePath = (process.env.BASE_PATH || '').replace(/\/$/, '')

const pageMap = {
  home: '',
  about: 'about',
  antiAging: 'anti-aging',
  concierge: 'concierge',
  memberships: 'memberships',
  regenerative: 'regenerative',
}

const rewriteBasePath = (html) => {
  if (!basePath) return html

  return html
    .replace(/(href|src)="\/(?!\/)/g, `$1="${basePath}/`)
    .replace(/(action)="\/(?!\/)/g, `$1="${basePath}/`)
}

const stripScripts = (html) => html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')

const wrapDocument = ({ title, styles, body }) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700&family=Barlow+Condensed:wght@300;400;500;600;700&family=Bebas+Neue&display=swap" rel="stylesheet" />
    <style>${styles || ''}</style>
    <style>
      .reveal,
      .rev,
      .reveal.visible,
      .rev.on {
        opacity: 1 !important;
        transform: none !important;
      }
    </style>
  </head>
  <body>
    ${stripScripts(rewriteBasePath(body || ''))}
  </body>
</html>
`

await mkdir(outputDir, { recursive: true })

for (const [key, slug] of Object.entries(pageMap)) {
  const content = PURE_RENEWAL_PAGES[key]
  const dir = slug ? path.join(outputDir, slug) : outputDir
  await mkdir(dir, { recursive: true })
  const html = wrapDocument(content)
  await writeFile(path.join(dir, 'index.html'), html, 'utf8')
}

await writeFile(path.join(outputDir, '.nojekyll'), '', 'utf8')

console.log(`Exported static pages to ${outputDir}${basePath ? ` with base path ${basePath}` : ''}`)
