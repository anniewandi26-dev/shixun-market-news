import { Link } from 'react-router-dom'
import { useT } from '../../i18n/LocaleContext'

export function HomeEntrances() {
  const t = useT()
  const items = [
    {
      to: '/market',
      kicker: t('home.entrance.market.kicker'),
      title: t('home.entrance.market.title'),
      desc: t('home.entrance.market.desc'),
    },
    {
      to: '/knowledge',
      kicker: t('home.entrance.knowledge.kicker'),
      title: t('home.entrance.knowledge.title'),
      desc: t('home.entrance.knowledge.desc'),
    },
    {
      to: '/news',
      kicker: t('home.entrance.news.kicker'),
      title: t('home.entrance.news.title'),
      desc: t('home.entrance.news.desc'),
    },
  ] as const

  return (
    <section className="home-section home-entrances">
      <div className="home-section-inner">
        <div className="home-section-head">
          <div>
            <p className="eyebrow">{t('home.entrances.eyebrow')}</p>
            <h2>{t('home.entrances.title')}</h2>
            <p className="lede">{t('home.entrances.lede')}</p>
          </div>
        </div>

        <div className="home-entrance-grid">
          {items.map((item) => (
            <Link key={item.to} className="home-entrance" to={item.to}>
              <span className="eyebrow">{item.kicker}</span>
              <strong>{item.title}</strong>
              <p>{item.desc}</p>
              <span className="home-text-link">{t('home.entrances.open')}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
