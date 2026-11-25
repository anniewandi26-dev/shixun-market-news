import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useDailyContent } from '../../context/DailyContentContext'
import { categoryMessageKey, tagMessageKey } from '../../i18n/contentMaps'
import { useLocale, useT } from '../../i18n/LocaleContext'
import { newsCorpusForLocale } from '../../i18n/newsForLocale'
import { useLocalizedKnowledgeList } from '../../i18n/useLocalizedKnowledge'
import { useLocalizedNewsList } from '../../i18n/useLocalizedNews'
import { ARTICLE_TAB_PROPS } from '../../utils/openArticleTab'
import {
  coverForKnowledge,
  knowledgeImageFallback,
} from '../../utils/knowledgeImage'
import { coverForNews, newsImageFallback } from '../../utils/newsImage'

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
            <div className="home-pick-knowledge-media" aria-hidden>
              <img
                src={coverForKnowledge(focus.id)}
                alt=""
                onError={(e) => {
                  e.currentTarget.src = knowledgeImageFallback()
                }}
              />
            </div>
            <div className="home-pick-knowledge-body">
              <p className="cat">
                {t('home.picks.knowledgeCat')} · {catKey ? t(catKey) : focus.category}
              </p>
              <h3>{focus.title}</h3>
              <p>{focus.summary}</p>
              <Link
                className="btn primary"
                to={`/knowledge/${focus.id}`}
                {...ARTICLE_TAB_PROPS}
              >
                {t('home.picks.read')}
              </Link>
            </div>
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
                    <Link to={`/news/${item.id}`} {...ARTICLE_TAB_PROPS}>
                      <span className="home-pick-news-thumb" aria-hidden>
                        <img
                          src={coverForNews(item)}
                          alt=""
                          onError={(e) => {
                            e.currentTarget.src = newsImageFallback()
                          }}
                        />
                      </span>
                      <span className="home-pick-news-copy">
                        {item.tag && (
                          <span className="news-tag">{tagKey ? t(tagKey) : item.tag}</span>
                        )}
                        <strong>{item.title}</strong>
                        <em>{item.time}</em>
                      </span>
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
