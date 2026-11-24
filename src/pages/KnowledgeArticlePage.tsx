import { Link, Navigate, useParams } from 'react-router-dom'
import { categoryMessageKey } from '../i18n/contentMaps'
import { useT } from '../i18n/LocaleContext'
import {
  useLocalizedKnowledgeArticle,
  useLocalizedKnowledgeList,
} from '../i18n/useLocalizedKnowledge'

export function KnowledgeArticlePage() {
  const { id } = useParams()
  const t = useT()
  const article = useLocalizedKnowledgeArticle(id)
  const { list } = useLocalizedKnowledgeList()

  if (article === undefined) {
    return (
      <main className="page">
        <p className="section muted">{t('knowledge.translating')}</p>
      </main>
    )
  }

  if (!article) {
    return <Navigate to="/knowledge" replace />
  }

  const index = list.findIndex((a) => a.id === article.id)
  const prev = index > 0 ? list[index - 1] : null
  const next = index >= 0 && index < list.length - 1 ? list[index + 1] : null
  const catKey = categoryMessageKey(article.category)

  return (
    <main className="page">
      <article className="section article-page">
        <Link className="back-link" to="/knowledge" target="_blank" rel="noopener noreferrer">
          {t('knowledge.back')}
        </Link>

        <header className="article-hero">
          <p className="cat">{catKey ? t(catKey) : article.category}</p>
          <h1>{article.title}</h1>
          <p className="summary">{article.summary}</p>
          <p className="article-meta">
            {t('knowledge.aboutMins', { n: article.readMinutes })}
          </p>
        </header>

        <div className="article-body">
          {article.sections.map((section) => (
            <section key={section.heading} className="article-block">
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 28)}>{p}</p>
              ))}
            </section>
          ))}
        </div>

        <p className="article-disclaimer">{t('knowledge.disclaimer')}</p>

        <nav className="article-pager">
          {prev ? (
            <Link
              to={`/knowledge/${prev.id}`}
              className="pager-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t('knowledge.prev')}</span>
              <strong>{prev.title}</strong>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={`/knowledge/${next.id}`}
              className="pager-link next"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t('knowledge.next')}</span>
              <strong>{next.title}</strong>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </main>
  )
}
