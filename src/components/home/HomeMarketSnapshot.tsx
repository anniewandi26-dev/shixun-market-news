import { Link } from 'react-router-dom'
import { useQuotesContext } from '../../context/QuotesContext'
import { useLocale, useT } from '../../i18n/LocaleContext'
import { toBcp47 } from '../../i18n/locales'
import { localizeSymbolName } from '../../i18n/symbolNamesEn'
import type { Quote } from '../../types'

const US_IDS = ['usDJI', 'usIXIC', 'usSPX'] as const

export function HomeMarketSnapshot() {
  const { quotes, live, updatedAt, loading } = useQuotesContext()
  const t = useT()
  const { locale } = useLocale()
  const byId = new Map(quotes.map((q) => [q.id, q]))
  const hasUs = US_IDS.every((id) => byId.has(id))

  const fallbacks = [t('home.idx.dji'), t('home.idx.ndx'), t('home.idx.spx')]
  const fmt = (n: number, digits = 2) =>
    n.toLocaleString(toBcp47(locale), {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    })

  return (
    <section className="home-section home-snap">
      <div className="home-section-inner">
        <div className="home-section-head">
          <div>
            <p className="eyebrow">{t('home.snap.eyebrow')}</p>
            <h2>{t('home.snap.title')}</h2>
            <p className="lede">{t('home.snap.lede')}</p>
          </div>
          <Link className="home-text-link" to="/market">
            {t('home.snap.link')}
          </Link>
        </div>

        <Link className="home-snap-grid" to="/market" aria-label={t('home.snap.aria')}>
          {US_IDS.map((id, i) => {
            const quote = byId.get(id) as Quote | undefined
            const up = (quote?.changePercent ?? 0) >= 0
            const rawName = quote?.name ?? fallbacks[i]
            return (
              <div className="home-snap-item" key={id}>
                <span className="home-snap-label">
                  {localizeSymbolName(rawName, locale, id)}
                </span>
                <strong className="home-snap-price">
                  {quote ? fmt(quote.price) : '—'}
                </strong>
                {quote ? (
                  <span className={up ? 'up' : 'down'}>
                    {up ? '+' : ''}
                    {fmt(quote.changePercent)}%
                  </span>
                ) : (
                  <span className="muted">
                    {loading ? t('home.snap.syncing') : t('home.snap.connecting')}
                  </span>
                )}
              </div>
            )
          })}
        </Link>

        <p className="home-snap-meta muted">
          {live ? t('home.snap.live') : t('home.snap.connecting')}
          {updatedAt
            ? ` · ${updatedAt.toLocaleTimeString(toBcp47(locale), { hour12: false })}`
            : ''}
          {' · '}
          {hasUs ? t('home.snap.ready') : t('home.snap.loadingIdx')}
        </p>
      </div>
    </section>
  )
}
