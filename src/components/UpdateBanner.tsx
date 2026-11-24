import { calendarDay, formatDateTime } from '../utils/time'
import { useDailyContent } from '../context/DailyContentContext'
import { useT } from '../i18n/LocaleContext'
import type { MessageKey } from '../i18n/sourceMessages'

const SCOPE_KEY: Record<'行情' | '知识' | '新闻', MessageKey> = {
  行情: 'banner.scope.market',
  知识: 'banner.scope.knowledge',
  新闻: 'banner.scope.news',
}

export function UpdateBanner({ scope }: { scope: '行情' | '知识' | '新闻' }) {
  const { lastRefreshAt, refreshing, refreshNow, bundle } = useDailyContent()
  const t = useT()
  const today = calendarDay()
  const isToday = lastRefreshAt ? calendarDay(lastRefreshAt) === today : false
  const scopeLabel = t(SCOPE_KEY[scope])

  const sourceLabel =
    bundle?.source === 'live'
      ? t('banner.source.live')
      : bundle?.source === 'partial'
        ? t('banner.source.partial')
        : bundle?.source
          ? t('banner.source.local')
          : ''

  return (
    <div className="update-banner" data-fresh={isToday}>
      <div>
        <strong>
          {isToday
            ? t('banner.fresh', { scope: scopeLabel })
            : t('banner.stale', { scope: scopeLabel })}
        </strong>
        <span>
          {lastRefreshAt
            ? t('banner.meta', { time: formatDateTime(lastRefreshAt) })
            : t('banner.preparing')}
          {sourceLabel ? ` · ${t('banner.source', { source: sourceLabel })}` : ''}
        </span>
      </div>
      <button
        type="button"
        className="btn-refresh"
        onClick={() => void refreshNow()}
        disabled={refreshing}
      >
        {refreshing ? t('banner.refreshing') : t('banner.refresh')}
      </button>
    </div>
  )
}
