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

const responsiveFallbackStyles = `
  html,
  body {
    width: 100%;
    max-width: 100%;
    overflow-x: clip !important;
  }

  .legacy-page-content {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }

  .legacy-page-content *,
  .legacy-page-content *::before,
  .legacy-page-content *::after {
    max-width: 100%;
    min-width: 0;
  }

  .legacy-page-content .float-card,
  .legacy-page-content .ph-scroll {
    display: none !important;
  }

  .legacy-page-content p,
  .legacy-page-content h1,
  .legacy-page-content h2,
  .legacy-page-content h3,
  .legacy-page-content h4,
  .legacy-page-content h5,
  .legacy-page-content h6,
  .legacy-page-content span,
  .legacy-page-content a,
  .legacy-page-content label,
  .legacy-page-content button {
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  .legacy-page-content .mobile-nav-toggle {
    display: none;
  }

  @media (max-width: 1200px) {
    .legacy-page-content nav {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 10px !important;
      padding: 12px 16px !important;
    }

    .legacy-page-content .hero,
    .legacy-page-content .page-hero {
      min-height: auto !important;
      padding-top: 132px !important;
      padding-bottom: 40px !important;
    }

    .legacy-page-content .about,
    .legacy-page-content .mission,
    .legacy-page-content .gain,
    .legacy-page-content .philosophy,
    .legacy-page-content .location,
    .legacy-page-content .concierge,
    .legacy-page-content .blends,
    .legacy-page-content .treatments,
    .legacy-page-content .anti-aging,
    .legacy-page-content .membership,
    .legacy-page-content .services,
    .legacy-page-content .trifecta,
    .legacy-page-content .facility,
    .legacy-page-content .consult,
    .legacy-page-content .cta,
    .legacy-page-content .cta-final,
    .legacy-page-content .bwell,
    .legacy-page-content .services-inc,
    .legacy-page-content .plans-sec,
    .legacy-page-content .peak,
    .legacy-page-content .custom,
    .legacy-page-content .faq,
    .legacy-page-content .integrative,
    .legacy-page-content .intro,
    .legacy-page-content .financing,
    .legacy-page-content footer {
      padding-left: 20px !important;
      padding-right: 20px !important;
      padding-top: 68px !important;
      padding-bottom: 68px !important;
    }

    .legacy-page-content .page-hero-inner,
    .legacy-page-content .hgrid,
    .legacy-page-content .ph-grid,
    .legacy-page-content .about,
    .legacy-page-content .mission,
    .legacy-page-content .gain,
    .legacy-page-content .philosophy,
    .legacy-page-content .concierge-grid,
    .legacy-page-content .location,
    .legacy-page-content .blends-grid,
    .legacy-page-content .services-head,
    .legacy-page-content .treatments-head,
    .legacy-page-content .bwell-grid,
    .legacy-page-content .wl-grid,
    .legacy-page-content .int-grid,
    .legacy-page-content .consult-inner,
    .legacy-page-content .con-grid,
    .legacy-page-content .vit-grid,
    .legacy-page-content .peak-grid,
    .legacy-page-content .custom-grid,
    .legacy-page-content .faq-grid,
    .legacy-page-content .financing {
      grid-template-columns: 1fr !important;
      gap: 24px !important;
    }

    .legacy-page-content .t-grid,
    .legacy-page-content .s-grid,
    .legacy-page-content .sgrid,
    .legacy-page-content .tri-grid,
    .legacy-page-content .si-grid,
    .legacy-page-content .aa-grid,
    .legacy-page-content .plans,
    .legacy-page-content .plans-grid,
    .legacy-page-content .blend-grid,
    .legacy-page-content .fac-grid,
    .legacy-page-content .stats,
    .legacy-page-content .stats-row,
    .legacy-page-content .wf-stat-row,
    .legacy-page-content .foot-top,
    .legacy-page-content .ft-top,
    .legacy-page-content .qs-grid {
      grid-template-columns: 1fr !important;
      gap: 10px !important;
      background: transparent !important;
    }

    .legacy-page-content .plan,
    .legacy-page-content .tc,
    .legacy-page-content .t-card,
    .legacy-page-content .s-card,
    .legacy-page-content .sc,
    .legacy-page-content .si-card,
    .legacy-page-content .tri-card,
    .legacy-page-content .consult-form,
    .legacy-page-content .form-box,
    .legacy-page-content .wl-right,
    .legacy-page-content .fit-card,
    .legacy-page-content .cust-card {
      padding: 22px 18px !important;
      border: 1px solid var(--w08) !important;
    }

    .legacy-page-content .s-card-name,
    .legacy-page-content .si-name,
    .legacy-page-content .sc-name,
    .legacy-page-content .tc-name {
      font-size: 17px !important;
      line-height: 1.2 !important;
    }

    .legacy-page-content .s-card-desc,
    .legacy-page-content .si-desc,
    .legacy-page-content .sc-desc,
    .legacy-page-content .tc-desc {
      font-size: 12.5px !important;
      line-height: 1.55 !important;
    }

    .legacy-page-about .services-head,
    .legacy-page-concierge .si-head,
    .legacy-page-regenerative .s-head,
    .legacy-page-anti-aging .t-head {
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 10px !important;
      margin-bottom: 22px !important;
    }

    .legacy-page-about .services-note,
    .legacy-page-concierge .si-note,
    .legacy-page-regenerative .s-note,
    .legacy-page-anti-aging .t-note {
      max-width: 100% !important;
      width: 100% !important;
      font-size: 13px !important;
      line-height: 1.6 !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    .legacy-page-about .page-hero-inner {
      display: grid !important;
      grid-template-columns: 1fr !important;
      gap: 14px !important;
    }

    .legacy-page-about .page-hero-inner > div:first-child {
      order: 1 !important;
    }

    .legacy-page-about .page-hero-inner .ph-right {
      order: 2 !important;
    }
  }

  @media (max-width: 768px) {
    .legacy-page-content nav {
      display: grid !important;
      grid-template-columns: 1fr auto !important;
      align-items: center !important;
      gap: 8px 12px !important;
    }

    .legacy-page-content .mobile-nav-toggle {
      display: inline-flex !important;
      width: 40px !important;
      height: 36px !important;
      border: 1px solid var(--w15) !important;
      background: rgba(255, 255, 255, 0.04) !important;
      color: var(--w) !important;
      align-items: center !important;
      justify-content: center !important;
      flex-direction: column !important;
      gap: 4px !important;
      cursor: pointer !important;
    }

    .legacy-page-content .mobile-nav-toggle span {
      display: block !important;
      width: 16px !important;
      height: 1.5px !important;
      background: currentColor !important;
    }

    .legacy-page-content .logo-sub,
    .legacy-page-content .logo-s {
      display: none !important;
    }

    .legacy-page-content .nav-links {
      grid-column: 1 / -1 !important;
      display: none !important;
      flex-direction: column !important;
      align-items: stretch !important;
      gap: 6px !important;
      padding-top: 6px !important;
      margin: 0 !important;
    }

    .legacy-page-content nav.nav-open .nav-links {
      display: flex !important;
    }

    .legacy-page-content .nav-links li,
    .legacy-page-content .nav-links a {
      width: 100% !important;
    }

    .legacy-page-content .nav-links a {
      min-height: 32px !important;
      padding: 6px 9px !important;
      font-size: 9px !important;
      letter-spacing: 0.1em !important;
      justify-content: center !important;
      border: 1px solid var(--w15) !important;
      background: rgba(255, 255, 255, 0.03) !important;
      white-space: nowrap !important;
    }

    .legacy-page-content .nav-links a.nav-btn,
    .legacy-page-content .nav-links a.n-btn {
      border: none !important;
    }
  }
`

const mobileNavScript = `
  (() => {
    const initMobileNav = () => {
      const navs = document.querySelectorAll('.legacy-page-content nav')

      navs.forEach((nav, index) => {
        if (nav.dataset.mobileNavInit === '1') return

        const links = nav.querySelector('.nav-links')
        if (!links) return

        nav.dataset.mobileNavInit = '1'

        const toggle = document.createElement('button')
        toggle.type = 'button'
        toggle.className = 'mobile-nav-toggle'
        toggle.setAttribute('aria-label', 'Toggle navigation menu')
        toggle.setAttribute('aria-expanded', 'false')

        const linksId = links.id || 'legacy-mobile-nav-links-' + index
        links.id = linksId
        toggle.setAttribute('aria-controls', linksId)
        toggle.innerHTML = '<span></span><span></span><span></span>'

        toggle.addEventListener('click', () => {
          const isOpen = nav.classList.toggle('nav-open')
          toggle.setAttribute('aria-expanded', String(isOpen))
        })

        nav.insertBefore(toggle, links)

        links.querySelectorAll('a').forEach((anchor) => {
          anchor.addEventListener('click', () => {
            if (window.matchMedia('(max-width: 768px)').matches) {
              nav.classList.remove('nav-open')
              toggle.setAttribute('aria-expanded', 'false')
            }
          })
        })
      })
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initMobileNav, { once: true })
    } else {
      initMobileNav()
    }
  })()
`

const wrapDocument = ({ title, styles, body, pageClass }) => `<!doctype html>
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
    <style>${responsiveFallbackStyles}</style>
  </head>
  <body>
    <section class="legacy-page-content legacy-page-${pageClass}">
      ${stripScripts(rewriteBasePath(body || ''))}
    </section>
    <script>${mobileNavScript}</script>
  </body>
</html>
`

await mkdir(outputDir, { recursive: true })

for (const [key, slug] of Object.entries(pageMap)) {
  const content = PURE_RENEWAL_PAGES[key]
  const dir = slug ? path.join(outputDir, slug) : outputDir
  const pageClass = slug || (key === 'antiAging' ? 'anti-aging' : key)
  await mkdir(dir, { recursive: true })
  const html = wrapDocument({ ...content, pageClass })
  await writeFile(path.join(dir, 'index.html'), html, 'utf8')
}

await writeFile(path.join(outputDir, '.nojekyll'), '', 'utf8')

console.log(`Exported static pages to ${outputDir}${basePath ? ` with base path ${basePath}` : ''}`)
