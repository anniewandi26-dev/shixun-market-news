import { useDailyContent } from '../../context/DailyContentContext'
import { useT } from '../../i18n/LocaleContext'
import { formatDateTime } from '../../utils/time'

export function HomeTrust() {
  const { lastRefreshAt, bundle } = useDailyContent()
  const t = useT()

  const sourceLabel =
    bundle?.source === 'live'
      ? t('home.trust.source.live')
      : bundle?.source === 'partial'
        ? t('home.trust.source.partial')
        : bundle?.source
          ? t('home.trust.source.local')
          : ''

  return (
    <section className="home-section home-trust">
      <div className="home-section-inner home-trust-inner">
        <p>
          {t('home.trust.body', { seconds: 30, slots: '08:00 / 20:00' })}
          {lastRefreshAt
            ? ` ${t('home.trust.last', { time: formatDateTime(lastRefreshAt) })}`
            : ''}
          {sourceLabel ? `（${sourceLabel}）` : ''}
        </p>
        <p className="muted">{t('home.trust.disclaimer')}</p>
      </div>
    </section>
  )
}
