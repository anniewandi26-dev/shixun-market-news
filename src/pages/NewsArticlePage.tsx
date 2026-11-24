import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useDailyContent } from '../context/DailyContentContext'
import { NEWS_EN_BY_ID } from '../i18n/content/newsEn'
import { tagMessageKey } from '../i18n/contentMaps'
import { useLocale, useT } from '../i18n/LocaleContext'
import { localizeNewsItem } from '../i18n/localizedNews'
import { newsCorpusForLocale } from '../i18n/newsForLocale'
import type { NewsItem } from '../types'

function peerTitle(item: NewsItem, locale: string) {
  if (locale === 'zh-CN' || locale === 'zh-TW') return item.title
  return (
    item.i18n?.[locale]?.title ??
    item.i18n?.en?.title ??
    NEWS_EN_BY_ID[item.id]?.title ??
    item.title
  )
}

function instantArticle(raw: NewsItem, locale: string): NewsItem {
  if (locale === 'zh-CN') return raw
  const pack = raw.i18n?.[locale] ?? raw.i18n?.en ?? NEWS_EN_BY_ID[raw.id]
  if (!pack) return raw
  return { ...raw, title: pack.title, summary: pack.summary, body: pack.body }
}

export function NewsArticlePage() {
  const { id } = useParams()
  const t = useT()
  const { locale, localeEpoch, ready } = useLocale()
  const { bundle, loading } = useDailyContent()
  const corpus = useMemo(
    () => newsCorpusForLocale(bundle?.news, locale),
    [bundle?.news, locale],
  )
  const raw = id ? corpus.find((n) => n.id === id) : undefined
  const [article, setArticle] = useState<NewsItem | null | undefined>(() =>
    raw ? instantArticle(raw, locale) : undefined,
  )

  useEffect(() => {
    if (!ready) return
    if (!raw) {
      setArticle(loading ? undefined : null)
      return
    }
    // 先秒开英文/预置包，再补繁中等异步结果
    setArticle(instantArticle(raw, locale))
    let cancelled = false
    void localizeNewsItem(raw, locale).then((out) => {
      if (!cancelled) setArticle(out)
    })
    return () => {
      cancelled = true
    }
  }, [raw, locale, localeEpoch, ready, loading])

  if (article === undefined && loading && !raw) {
    return (
      <main className="page">
        <p className="section muted">{t('news.loadingArticle')}</p>
      </main>
    )
  }

  if (!article && !raw) {
    return <Navigate to="/news" replace />
  }

  const view = article ?? (raw ? instantArticle(raw, locale) : null)
  if (!view) {
    return <Navigate to="/news" replace />
  }

  const list = corpus.filter((n) => n.tag === view.tag)
  const index = list.findIndex((n) => n.id === view.id)
  const prev = index > 0 ? list[index - 1] : null
  const next = index >= 0 && index < list.length - 1 ? list[index + 1] : null
  const tagKey = view.tag ? tagMessageKey(view.tag) : null
  const source = view.source === '市讯专题' ? t('news.source.local') : view.source

  return (
    <main className="page">
      <article className="section article-page">
        <Link className="back-link" to="/news" target="_blank" rel="noopener noreferrer">
          {t('news.back')}
        </Link>

        <header className="article-hero">
          {view.tag && <p className="cat">{tagKey ? t(tagKey) : view.tag}</p>}
          <h1>{view.title}</h1>
          <p className="summary">{view.summary}</p>
          <p className="article-meta">
            {source} · {view.time}
          </p>
        </header>

        <div className="article-body">
          {view.body.map((p) => (
            <p key={p.slice(0, 36)}>{p}</p>
          ))}
        </div>

        <p className="article-disclaimer">{t('news.disclaimer')}</p>

        <nav className="article-pager">
          {prev ? (
            <Link
              to={`/news/${prev.id}`}
              className="pager-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t('news.prev')}</span>
              <strong>{peerTitle(prev, locale)}</strong>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={`/news/${next.id}`}
              className="pager-link next"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t('news.next')}</span>
              <strong>{peerTitle(next, locale)}</strong>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </main>
  )
}
