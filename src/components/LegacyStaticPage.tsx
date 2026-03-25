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

  return (
    <section className="legacy-page-content">
      {content.styles ? <style dangerouslySetInnerHTML={{ __html: content.styles }} /> : null}
      <style dangerouslySetInnerHTML={{ __html: revealFallbackStyles }} />
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: safeBody }} />
    </section>
  )
}
