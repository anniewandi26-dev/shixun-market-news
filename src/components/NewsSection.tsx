import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { NEWS_FILTERS } from '../data/localNews'
import { useDailyContent } from '../context/DailyContentContext'
import { filterMessageKey, tagMessageKey } from '../i18n/contentMaps'
import { useLocale, useT } from '../i18n/LocaleContext'
import { newsCorpusForLocale } from '../i18n/newsForLocale'
import { useLocalizedNewsList } from '../i18n/useLocalizedNews'
import type { NewsItem } from '../types'
import { UpdateBanner } from './UpdateBanner'

export function NewsSection() {
  const { bundle, loading } = useDailyContent()
  const t = useT()
  const { locale } = useLocale()
  const [filter, setFilter] = useState<string>('all')
  const corpus = useMemo(
    () => newsCorpusForLocale(bundle?.news, locale),
    [bundle?.news, locale],
  )
  const { list: news, loading: localizing } = useLocalizedNewsList(corpus)

  const counts = useMemo(() => {
    const map = new Map<string, number>()
    for (const item of news) {
      if (!item.tag) continue
      map.set(item.tag, (map.get(item.tag) ?? 0) + 1)
    }
    return map
  }, [news])

  const filtered = useMemo(() => {
    if (filter === 'all') return news
    return news.filter((n) => n.tag === filter)
  }, [filter, news])

  const featured = filtered.filter((n) => n.tag === '黄仁勋' || n.tag === '马斯克')
  const finance = filtered.filter((n) => n.tag === '财经')
  const showFeatured = filter === 'all' || filter === '黄仁勋' || filter === '马斯克'
  const showFinance = filter === 'all' || filter === '财经'

  const featuredTitle =
    filter === '马斯克'
      ? t('news.block.musk')
      : filter === '黄仁勋'
        ? t('news.block.huang')
        : t('news.block.featuredBoth')

  return (
    <section className="section news">
      <div className="section-head">
        <div>
          <p className="eyebrow">{t('news.eyebrow')}</p>
          <h2>{t('news.title')}</h2>
          <p className="lede">{t('news.lede')}</p>
        </div>
      </div>

      <UpdateBanner scope="新闻" />

      {loading && news.length === 0 && <p className="muted">{t('news.loading')}</p>}
      {localizing && news.length > 0 && (
        <p className="muted" style={{ fontSize: '0.85rem' }}>
          {t('news.translating')}
        </p>
      )}

      <div className="forbes-filters" role="tablist" aria-label={t('news.filtersAria')}>
        {NEWS_FILTERS.map((f) => {
          const count = f.id === 'all' ? news.length : (counts.get(f.id) ?? 0)
          const labelKey = filterMessageKey(f.id)
          return (
            <button
              key={f.id}
              type="button"
              className={filter === f.id ? 'forbes-chip active' : 'forbes-chip'}
              onClick={() => setFilter(f.id)}
            >
              {labelKey ? t(labelKey) : f.label}
              <em>{count}</em>
            </button>
          )
        })}
      </div>

      {showFeatured && featured.length > 0 && (
        <div className="news-block">
          <h3 className="subhead">{featuredTitle}</h3>
          <div className="news-list">
            {featured.map((item, index) => (
              <NewsRow key={item.id} item={item} index={index} highlight />
            ))}
          </div>
        </div>
      )}

      {showFinance && finance.length > 0 && (
        <div className="news-block">
          <h3 className="subhead">{t('news.block.finance')}</h3>
          <div className="news-list">
            {finance.map((item, index) => (
              <NewsRow key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      )}

      {!loading && news.length === 0 && <p className="muted">{t('news.empty')}</p>}
    </section>
  )
}

function NewsRow({
  item,
  index,
  highlight = false,
}: {
  item: NewsItem
  index: number
  highlight?: boolean
}) {
  const t = useT()
  const tagKey = item.tag ? tagMessageKey(item.tag) : null
  const source = item.source === '市讯专题' ? t('news.source.local') : item.source

  return (
    <Link
      className={highlight ? 'news-row highlight' : 'news-row'}
      to={`/news/${item.id}`}
      style={{ animationDelay: `${index * 25}ms` }}
    >
      <div className="news-meta">
        {item.tag && <span className="news-tag">{tagKey ? t(tagKey) : item.tag}</span>}
        <span>{source}</span>
        {item.time && <time>{item.time}</time>}
      </div>
      <h3>{item.title}</h3>
      <p>{item.summary}</p>
      <span className="news-read-cta">{t('news.readCta')}</span>
    </Link>
  )
}
