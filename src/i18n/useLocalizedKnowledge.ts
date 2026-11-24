import { useEffect, useState } from 'react'
import { KNOWLEDGE } from '../data/knowledge'
import type { KnowledgeArticle } from '../types'
import { useLocale } from './LocaleContext'
import { localizeKnowledgeById, localizeKnowledgeList } from './localizedKnowledge'

export function useLocalizedKnowledgeList() {
  const { locale, localeEpoch, ready } = useLocale()
  const [list, setList] = useState<KnowledgeArticle[]>(KNOWLEDGE)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!ready) return
    let cancelled = false
    setLoading(true)
    void localizeKnowledgeList(locale).then((out) => {
      if (!cancelled) {
        setList(out)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [locale, localeEpoch, ready])

  return { list, loading }
}

export function useLocalizedKnowledgeArticle(id: string | undefined) {
  const { locale, localeEpoch, ready } = useLocale()
  const [article, setArticle] = useState<KnowledgeArticle | null | undefined>(undefined)

  useEffect(() => {
    if (!id || !ready) return
    let cancelled = false
    setArticle(undefined)
    void localizeKnowledgeById(id, locale).then((out) => {
      if (!cancelled) setArticle(out ?? null)
    })
    return () => {
      cancelled = true
    }
  }, [id, locale, localeEpoch, ready])

  return article
}
