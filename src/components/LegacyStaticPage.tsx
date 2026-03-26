import { PURE_RENEWAL_PAGES } from '@/content/pureRenewalPages'

type LegacyPageKey = 'home' | 'about' | 'anti-aging' | 'concierge' | 'memberships' | 'regenerative'

type LegacyStaticPageProps = {
  page: LegacyPageKey
}

export default async function LegacyStaticPage({ page }: LegacyStaticPageProps) {
  const contentKey = page === 'anti-aging' ? 'antiAging' : page
  const content = PURE_RENEWAL_PAGES[contentKey]
  const safeBody = content.body.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
  const revealFallbackStyles = `
    .reveal,
    .rev,
    .reveal.visible,
    .rev.on {
      opacity: 1 !important;
      transform: none !important;
    }
  `
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

    .legacy-page-content img,
    .legacy-page-content svg,
    .legacy-page-content video,
    .legacy-page-content canvas,
    .legacy-page-content iframe {
      max-width: 100%;
      height: auto;
    }

    .legacy-page-content .float-card,
    .legacy-page-content .ph-scroll {
      display: none !important;
    }

    .legacy-page-content section,
    .legacy-page-content div,
    .legacy-page-content nav,
    .legacy-page-content ul,
    .legacy-page-content ol,
    .legacy-page-content li,
    .legacy-page-content form,
    .legacy-page-content article,
    .legacy-page-content aside,
    .legacy-page-content main,
    .legacy-page-content header,
    .legacy-page-content footer {
      min-width: 0;
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
      .legacy-page-content {
        overflow-x: clip !important;
      }

      .legacy-page-content nav {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 10px !important;
        padding: 12px 16px !important;
      }

      .legacy-page-content .nav-links {
        width: 100% !important;
        display: flex !important;
        flex-wrap: nowrap !important;
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch !important;
        scrollbar-width: none !important;
        gap: 8px !important;
        padding: 2px 0 4px !important;
        margin: 0 !important;
      }

      .legacy-page-content .nav-links::-webkit-scrollbar {
        display: none !important;
      }

      .legacy-page-content .nav-links li {
        flex: 0 0 auto !important;
      }

      .legacy-page-content .nav-links a {
        display: inline-flex !important;
        align-items: center !important;
        min-height: 34px !important;
        padding: 7px 10px !important;
        white-space: nowrap !important;
        border: 1px solid var(--w15) !important;
        background: rgba(255, 255, 255, 0.03) !important;
        font-size: 10px !important;
        letter-spacing: 0.12em !important;
      }

      .legacy-page-content .nav-links a.nav-btn,
      .legacy-page-content .nav-links a.n-btn {
        border: none !important;
      }

      .legacy-page-content .nav-links a.nav-phone,
      .legacy-page-content .nav-links a.n-ph {
        border-color: rgba(167, 139, 250, 0.45) !important;
      }

      .legacy-page-content .hero,
      .legacy-page-content .page-hero {
        min-height: auto !important;
        padding-top: 196px !important;
      }

      .legacy-page-content .blob,
      .legacy-page-content .blob-1,
      .legacy-page-content .blob-2,
      .legacy-page-content .hb1,
      .legacy-page-content .hb2,
      .legacy-page-content .ph-blob,
      .legacy-page-content .ph-blob-1,
      .legacy-page-content .ph-blob-2,
      .legacy-page-content .wf-blob {
        max-width: none !important;
      }

      .legacy-page-content .hero-left,
      .legacy-page-content .hero-right,
      .legacy-page-content .ph-right,
      .legacy-page-content .mission-right,
      .legacy-page-content .gain-right,
      .legacy-page-content .int-right,
      .legacy-page-content .peak-right,
      .legacy-page-content .custom-right,
      .legacy-page-content .consult-form,
      .legacy-page-content .form-box {
        padding-top: 0 !important;
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
      .legacy-page-content .brochure,
      .legacy-page-content .consult,
      .legacy-page-content .cta,
      .legacy-page-content .cta-final,
      .legacy-page-content .phi-strip,
      .legacy-page-content .qstrip,
      .legacy-page-content .bwell,
      .legacy-page-content .services-inc,
      .legacy-page-content .weight-feature,
      .legacy-page-content .vitamins,
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
      }

      .legacy-page-content .hero,
      .legacy-page-content .page-hero,
      .legacy-page-content .about,
      .legacy-page-content .mission,
      .legacy-page-content .gain,
      .legacy-page-content .philosophy,
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
      .legacy-page-content .weight-feature,
      .legacy-page-content .vitamins,
      .legacy-page-content .plans-sec,
      .legacy-page-content .peak,
      .legacy-page-content .custom,
      .legacy-page-content .faq,
      .legacy-page-content .integrative,
      .legacy-page-content .intro {
        padding-top: 72px !important;
        padding-bottom: 72px !important;
      }

      .legacy-page-content .hero,
      .legacy-page-content .page-hero {
        padding-bottom: 48px !important;
      }

      .legacy-page-content .hero,
      .legacy-page-content .page-hero,
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
      .legacy-page-content .consult-inner,
      .legacy-page-content .con-grid,
      .legacy-page-content .vit-grid,
      .legacy-page-content .peak-grid,
      .legacy-page-content .custom-grid,
      .legacy-page-content .faq-grid,
      .legacy-page-content .financing {
        grid-template-columns: 1fr !important;
        gap: 28px !important;
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
      }

      .legacy-page-content .mission-vals,
      .legacy-page-content .fac-spec-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      }

      .legacy-page-content .hero-h1,
      .legacy-page-content .hero-h1-grad,
      .legacy-page-content .ph-h1,
      .legacy-page-content .hh1,
      .legacy-page-content .s-h2,
      .legacy-page-content .h2,
      .legacy-page-content .cta-h,
      .legacy-page-content .ctaf-h,
      .legacy-page-content .cf-h {
        font-size: clamp(42px, 13vw, 68px) !important;
      }

      .legacy-page-content .hero-tagline,
      .legacy-page-content .ph-tagline,
      .legacy-page-content .ph-tag,
      .legacy-page-content .htag,
      .legacy-page-content .logo-sub,
      .legacy-page-content .cta-contact,
      .legacy-page-content .ctaf-contact,
      .legacy-page-content .cf-contact {
        letter-spacing: 0.16em !important;
      }

      .legacy-page-content .ph-lead,
      .legacy-page-content .hlead,
      .legacy-page-content .about-intro,
      .legacy-page-content .mission-intro,
      .legacy-page-content .gain-intro,
      .legacy-page-content .intro-quote,
      .legacy-page-content .int-r-intro,
      .legacy-page-content .blends-intro {
        font-size: 17px !important;
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
        padding: 28px 22px !important;
      }

      .legacy-page-content .cta-btns,
      .legacy-page-content .ctaf-btns,
      .legacy-page-content .cf-btns,
      .legacy-page-content .hbtns,
      .legacy-page-content .ph-btns {
        flex-direction: column !important;
        align-items: stretch !important;
        gap: 10px !important;
      }

      .legacy-page-content .btn-g,
      .legacy-page-content .btn-o,
      .legacy-page-content .btn-grad,
      .legacy-page-content .btn-ghost,
      .legacy-page-content .btn-pg,
      .legacy-page-content .btn-pf,
      .legacy-page-content .btn-p-grad,
      .legacy-page-content .btn-p-ghost {
        justify-content: center !important;
        width: 100% !important;
        text-align: center !important;
      }

      .legacy-page-content .frow,
      .legacy-page-content .form-row {
        grid-template-columns: 1fr !important;
      }

      .legacy-page-content .foot-bottom,
      .legacy-page-content .ft-bot {
        flex-direction: column !important;
        gap: 10px !important;
      }
    }

    @media (max-width: 768px) {
      html,
      body,
      .legacy-page-content {
        width: 100vw !important;
        max-width: 100vw !important;
        overflow-x: clip !important;
      }

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
        padding: 0 !important;
        margin: 0 !important;
        cursor: pointer !important;
      }

      .legacy-page-content .mobile-nav-toggle span {
        display: block !important;
        width: 16px !important;
        height: 1.5px !important;
        background: currentColor !important;
      }

      .legacy-page-content .nav-links {
        grid-column: 1 / -1 !important;
        display: none !important;
        overflow-x: visible !important;
        flex-direction: column !important;
        align-items: stretch !important;
        gap: 6px !important;
        padding: 6px 0 0 !important;
      }

      .legacy-page-content nav.nav-open .nav-links {
        display: flex !important;
      }

      .legacy-page-content .nav-links li {
        width: 100% !important;
      }

      .legacy-page-content .nav-links a {
        width: 100% !important;
        justify-content: center !important;
      }

      .legacy-page-content .logo-name,
      .legacy-page-content .logo-n {
        font-size: 18px !important;
      }

      .legacy-page-content .logo-sub,
      .legacy-page-content .logo-s {
        display: none !important;
      }

      .legacy-page-content .nav-links a {
        min-height: 32px !important;
        padding: 6px 9px !important;
        font-size: 9px !important;
        letter-spacing: 0.1em !important;
      }

      .legacy-page-content .hero,
      .legacy-page-content .page-hero {
        padding-top: 132px !important;
      }

      .legacy-page-content .page-hero {
        padding-bottom: 36px !important;
      }

      .legacy-page-content .ph-crumb,
      .legacy-page-content .ph-breadcrumb {
        margin-bottom: 14px !important;
        font-size: 8px !important;
        letter-spacing: 0.16em !important;
        gap: 8px !important;
      }

      .legacy-page-content .page-hero-inner {
        gap: 16px !important;
      }

      .legacy-page-content .ph-h1 {
        font-size: clamp(44px, 16vw, 64px) !important;
      }

      .legacy-page-content .ph-tagline {
        font-size: 10px !important;
        letter-spacing: 0.14em !important;
        margin-bottom: 10px !important;
      }

      .legacy-page-content .ph-lead {
        font-size: 15px !important;
        line-height: 1.55 !important;
        margin-bottom: 14px !important;
      }

      .legacy-page-content .ph-btns {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 8px !important;
      }

      .legacy-page-content .services-inc .si-head {
        margin-bottom: 24px !important;
      }

      .legacy-page-content .services-inc .si-note {
        max-width: 100% !important;
        font-size: 13px !important;
      }

      .legacy-page-content .services-inc .si-grid {
        grid-template-columns: 1fr !important;
        gap: 10px !important;
        background: transparent !important;
      }

      .legacy-page-content .services-inc .si-card {
        padding: 22px 18px !important;
        border: 1px solid var(--w08) !important;
      }

      .legacy-page-content .services-inc .si-icon {
        margin-bottom: 14px !important;
      }

      .legacy-page-content .services-inc .si-name {
        font-size: 16px !important;
        line-height: 1.2 !important;
        margin-bottom: 8px !important;
      }

      .legacy-page-content .services-inc .si-desc {
        font-size: 12.5px !important;
        line-height: 1.55 !important;
      }

      .legacy-page-content .intro {
        gap: 20px !important;
      }

      .legacy-page-content .intro .intro-quote {
        font-size: 17px !important;
        line-height: 1.55 !important;
        margin-bottom: 18px !important;
      }

      .legacy-page-content .intro .intro-body {
        font-size: 13.5px !important;
        line-height: 1.72 !important;
      }

      .legacy-page-content .intro .tri-blocks {
        gap: 10px !important;
        margin-top: 16px !important;
      }

      .legacy-page-content .intro .tri-block {
        gap: 12px !important;
        padding: 18px 16px !important;
      }

      .legacy-page-content .intro .tb-icon {
        width: 30px !important;
        height: 30px !important;
      }

      .legacy-page-content .intro .tb-title {
        font-size: 13px !important;
        margin-bottom: 4px !important;
      }

      .legacy-page-content .intro .tb-desc {
        font-size: 12px !important;
        line-height: 1.5 !important;
      }

      .legacy-page-content .services .s-head {
        margin-bottom: 22px !important;
      }

      .legacy-page-content .services .s-note {
        max-width: 100% !important;
        font-size: 13px !important;
      }

      .legacy-page-content .services .sgrid {
        grid-template-columns: 1fr !important;
        gap: 10px !important;
        background: transparent !important;
      }

      .legacy-page-content .services .sc {
        padding: 22px 18px !important;
        border: 1px solid var(--w08) !important;
      }

      .legacy-page-content .services .sc-n {
        font-size: 42px !important;
        top: 14px !important;
        right: 14px !important;
      }

      .legacy-page-content .services .sc-tag {
        margin-bottom: 12px !important;
      }

      .legacy-page-content .services .sc-name {
        font-size: 17px !important;
        margin-bottom: 8px !important;
      }

      .legacy-page-content .services .sc-desc {
        font-size: 12.5px !important;
        line-height: 1.55 !important;
      }

      .legacy-page-about .page-hero {
        min-height: auto !important;
      }

      .legacy-page-about .page-hero-inner {
        display: grid !important;
        grid-template-columns: 1fr !important;
        align-items: start !important;
        gap: 14px !important;
      }

      .legacy-page-about .page-hero-inner > div:first-child {
        order: 1 !important;
      }

      .legacy-page-about .page-hero-inner .ph-right {
        order: 2 !important;
      }

      .legacy-page-about .ph-h1 {
        font-size: clamp(46px, 17vw, 68px) !important;
        line-height: 0.9 !important;
        margin: 0 !important;
      }

      .legacy-page-about .ph-right {
        padding-bottom: 0 !important;
      }

      .legacy-page-about .ph-btns a {
        width: 100% !important;
      }

      .legacy-page-concierge .services-inc .si-grid {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 10px !important;
      }

      .legacy-page-about .services-head,
      .legacy-page-concierge .si-head,
      .legacy-page-regenerative .s-head,
      .legacy-page-anti-aging .t-head {
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-start !important;
        justify-content: flex-start !important;
        gap: 10px !important;
        margin-bottom: 22px !important;
      }

      .legacy-page-about .services-note,
      .legacy-page-concierge .si-note,
      .legacy-page-regenerative .s-note,
      .legacy-page-anti-aging .t-note {
        max-width: 100% !important;
        width: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
        font-size: 13px !important;
        line-height: 1.6 !important;
      }

      .legacy-page-about .s-grid,
      .legacy-page-concierge .si-grid,
      .legacy-page-regenerative .sgrid,
      .legacy-page-anti-aging .t-grid {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 10px !important;
        background: transparent !important;
      }

      .legacy-page-about .s-card,
      .legacy-page-concierge .si-card,
      .legacy-page-regenerative .sc,
      .legacy-page-anti-aging .tc {
        padding: 22px 18px !important;
        border: 1px solid var(--w08) !important;
      }

      .legacy-page-about .s-card-num,
      .legacy-page-regenerative .sc-n,
      .legacy-page-anti-aging .tc-n {
        font-size: 42px !important;
        top: 14px !important;
        right: 14px !important;
      }

      .legacy-page-about .s-card-name,
      .legacy-page-concierge .si-name,
      .legacy-page-regenerative .sc-name,
      .legacy-page-anti-aging .tc-name {
        font-size: 17px !important;
        line-height: 1.2 !important;
        margin-bottom: 8px !important;
      }

      .legacy-page-about .s-card-desc,
      .legacy-page-concierge .si-desc,
      .legacy-page-regenerative .sc-desc,
      .legacy-page-anti-aging .tc-desc {
        font-size: 12.5px !important;
        line-height: 1.55 !important;
      }

      .legacy-page-anti-aging .tc-tag,
      .legacy-page-regenerative .sc-tag,
      .legacy-page-about .s-card-tag {
        margin-bottom: 12px !important;
      }

      .legacy-page-anti-aging .tc-link {
        margin-top: 14px !important;
      }

      .legacy-page-concierge .services-inc .si-card {
        border: 1px solid var(--w08) !important;
        border-radius: 0 !important;
      }

      .legacy-page-regenerative .intro {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 20px !important;
      }

      .legacy-page-regenerative .intro .tri-blocks {
        gap: 10px !important;
        margin-top: 16px !important;
      }

      .legacy-page-regenerative .services .sgrid {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 10px !important;
      }

      .legacy-page-regenerative .services .sc {
        border: 1px solid var(--w08) !important;
      }

      .legacy-page-content .mission-vals,
      .legacy-page-content .fac-spec-grid {
        grid-template-columns: 1fr !important;
      }

      .legacy-page-content .stat-v,
      .legacy-page-content .sv,
      .legacy-page-content .stat-val,
      .legacy-page-content .wf-stat-val {
        font-size: 42px !important;
      }

      .legacy-page-content .p-price,
      .legacy-page-content .wl-price,
      .legacy-page-content .wlc-price,
      .legacy-page-content .bpb-price,
      .legacy-page-content .fin-stat-v {
        font-size: 52px !important;
      }
    }
  `
  const mobileNavScript = `
    (() => {
      const initMobileNav = () => {
        const navs = document.querySelectorAll('.legacy-page-content nav')

        navs.forEach((nav, index) => {
          if (nav.dataset.mobileNavInit === '1') {
            return
          }

          const links = nav.querySelector('.nav-links')
          if (!links) {
            return
          }

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

  return (
    <section className={`legacy-page-content legacy-page-${page}`}>
      {content.styles ? <style dangerouslySetInnerHTML={{ __html: content.styles }} /> : null}
      <style dangerouslySetInnerHTML={{ __html: revealFallbackStyles }} />
      <style dangerouslySetInnerHTML={{ __html: responsiveFallbackStyles }} />
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: safeBody }} />
      <script dangerouslySetInnerHTML={{ __html: mobileNavScript }} />
    </section>
  )
}
