import { Link } from 'react-router-dom'
import { HomeEntrances } from '../components/home/HomeEntrances'
import { HomeMarketSnapshot } from '../components/home/HomeMarketSnapshot'
import { HomeTodayPicks } from '../components/home/HomeTodayPicks'
import { HomeTrust } from '../components/home/HomeTrust'
import { useT } from '../i18n/LocaleContext'
import { publicUrl } from '../utils/publicUrl'

export function HomePage() {
  const t = useT()

  return (
    <main>
      <section className="hero hero-page">
        <div className="hero-media" aria-hidden="true">
          <img src={publicUrl('hero-market.jpg')} alt="" />
          <div className="hero-veil" />
        </div>
        <div className="hero-copy">
          <p className="brand-mark">{t('brand')}</p>
          <h1>{t('hero.title')}</h1>
          <p className="hero-sub">{t('hero.sub')}</p>
          <div className="hero-cta">
            <Link className="btn primary" to="/market">
              {t('hero.ctaMarket')}
            </Link>
            <Link className="btn ghost" to="/knowledge">
              {t('hero.ctaKnowledge')}
            </Link>
            <Link className="btn ghost" to="/news">
              {t('hero.ctaNews')}
            </Link>
          </div>
        </div>
      </section>

      <HomeMarketSnapshot />
      <HomeEntrances />
      <HomeTodayPicks />
      <HomeTrust />
    </main>
  )
}
