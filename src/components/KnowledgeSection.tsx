import { Link } from 'react-router-dom'
import { useDailyContent } from '../context/DailyContentContext'
import { categoryMessageKey } from '../i18n/contentMaps'
import { useT } from '../i18n/LocaleContext'
import { useLocalizedKnowledgeList } from '../i18n/useLocalizedKnowledge'
import { ARTICLE_TAB_PROPS } from '../utils/openArticleTab'
import {
  coverForKnowledge,
  knowledgeImageFallback,
} from '../utils/knowledgeImage'
import { calendarDay } from '../utils/time'
import { UpdateBanner } from './UpdateBanner'

export function KnowledgeSection() {
  const { knowledgeFocusId, bundle } = useDailyContent()
  const t = useT()
  const { list, loading } = useLocalizedKnowledgeList()
  const focus = list.find((a) => a.id === knowledgeFocusId) ?? list[0]
  const today = bundle?.day ?? calendarDay()

  if (!focus) return null

  return (
    <section className="section knowledge">
      <div className="section-head">
        <div>
          <p className="eyebrow">{t('knowledge.eyebrow')}</p>
          <h2>{t('knowledge.title')}</h2>
          <p className="lede">{t('knowledge.lede')}</p>
        </div>
      </div>

      <UpdateBanner scope="知识" />
      {loading && <p className="muted">{t('knowledge.translating')}</p>}

      <div className="knowledge-focus">
        <div className="knowledge-focus-media">
          <img
            src={coverForKnowledge(focus.id)}
            alt=""
            loading="eager"
            decoding="async"
            onError={(e) => {
              e.currentTarget.src = knowledgeImageFallback()
            }}
          />
        </div>
        <div className="knowledge-focus-body">
          <p className="cat">
            {t('knowledge.focusCat')} · {today}
          </p>
          <h3>{focus.title}</h3>
          <p>{focus.summary}</p>
          <Link
            className="btn primary"
            to={`/knowledge/${focus.id}`}
            {...ARTICLE_TAB_PROPS}
          >
            {t('knowledge.readFocus')}
          </Link>
        </div>
      </div>

      <ul className="knowledge-cards" role="list">
        {list.map((article) => {
          const catKey = categoryMessageKey(article.category)
          return (
            <li key={article.id}>
              <Link
                className={
                  article.id === focus.id
                    ? 'knowledge-card knowledge-card-focus'
                    : 'knowledge-card'
                }
                to={`/knowledge/${article.id}`}
                {...ARTICLE_TAB_PROPS}
              >
                <div className="knowledge-card-media">
                  <img
                    src={coverForKnowledge(article.id)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.src = knowledgeImageFallback()
                    }}
                  />
                </div>
                <div className="knowledge-card-body">
                  <div className="knowledge-card-top">
                    <span className="cat">
                      {catKey ? t(catKey) : article.category}
                    </span>
                    <span className="mins">
                      {t('knowledge.mins', { n: article.readMinutes })}
                    </span>
                  </div>
                  <strong>{article.title}</strong>
                  <p>{article.summary}</p>
                  <span className="knowledge-card-cta">
                    {article.id === focus.id
                      ? t('knowledge.readFocusCta')
                      : t('knowledge.readFull')}
                  </span>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
