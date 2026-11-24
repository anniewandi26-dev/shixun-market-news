import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useDailyContent } from '../../context/DailyContentContext'
import { categoryMessageKey, tagMessageKey } from '../../i18n/contentMaps'
import { useLocale, useT } from '../../i18n/LocaleContext'
import { newsCorpusForLocale } from '../../i18n/newsForLocale'
import { useLocalizedKnowledgeList } from '../../i18n/useLocalizedKnowledge'
import { useLocalizedNewsList } from '../../i18n/useLocalizedNews'

export function HomeTodayPicks() {
  const { bundle, knowledgeFocusId, loading } = useDailyContent()
  const t = useT()
  const { locale } = useLocale()
  const { list: knowledge } = useLocalizedKnowledgeList()
  const focus = knowledge.find((a) => a.id === knowledgeFocusId) ?? knowledge[0]
  const corpus = useMemo(
    () => newsCorpusForLocale(bundle?.news, locale).slice(0, 3),
    [bundle?.news, locale],
  )
  const { list: news } = useLocalizedNewsList(corpus)
  const catKey = focus ? categoryMessageKey(focus.category) : null

  if (!focus) return null

  return (
    <section className="home-section home-picks">
      <div className="home-section-inner">
        <div className="home-section-head">
          <div>
            <p className="eyebrow">{t('home.picks.eyebrow')}</p>
            <h2>{t('home.picks.title')}</h2>
            <p className="lede">{t('home.picks.lede')}</p>
          </div>
        </div>

        <div className="home-picks-layout">
          <article className="home-pick-knowledge">
            <p className="cat">
              {t('home.picks.knowledgeCat')} · {catKey ? t(catKey) : focus.category}
            </p>
            <h3>{focus.title}</h3>
            <p>{focus.summary}</p>
            <Link
              className="btn primary"
              to={`/knowledge/${focus.id}`}
            >
              {t('home.picks.read')}
            </Link>
          </article>

          <div className="home-pick-news">
            <div className="home-pick-news-head">
              <h3>{t('home.picks.newsTitle')}</h3>
              <Link className="home-text-link" to="/news">
                {t('home.picks.all')}
              </Link>
            </div>
            {loading && news.length === 0 && (
              <p className="muted">{t('home.picks.loadingNews')}</p>
            )}
            <ul>
              {news.map((item) => {
                const tagKey = item.tag ? tagMessageKey(item.tag) : null
                return (
                  <li key={item.id}>
                    <Link to={`/news/${item.id}`}>
                      {item.tag && (
                        <span className="news-tag">{tagKey ? t(tagKey) : item.tag}</span>
                      )}
                      <strong>{item.title}</strong>
                      <em>{item.time}</em>
                    </Link>
                  </li>
                )
              })}
            </ul>
            {!loading && news.length === 0 && (
              <p className="muted">{t('home.picks.emptyNews')}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
