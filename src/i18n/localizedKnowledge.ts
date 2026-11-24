import { KNOWLEDGE, getKnowledgeById } from '../data/knowledge'
import type { KnowledgeArticle } from '../types'
import { KNOWLEDGE_EN_BY_ID } from './content/knowledgeEn'
import { KNOWLEDGE_MS_BY_ID } from './content/knowledgeMs'
import type { LocaleCode } from './locales'

type CnConverter = (text: string) => string
let toTrad: CnConverter | null = null

async function getToTrad() {
  if (!toTrad) {
    const OpenCC = (await import('opencc-js')).default
    toTrad = OpenCC.Converter({ from: 'cn', to: 'tw' })
  }
  return toTrad
}

async function toTraditionalArticle(article: KnowledgeArticle): Promise<KnowledgeArticle> {
  const c = await getToTrad()
  return {
    ...article,
    title: c(article.title),
    summary: c(article.summary),
    sections: article.sections.map((s) => ({
      heading: c(s.heading),
      paragraphs: s.paragraphs.map((p) => c(p)),
    })),
  }
}

/**
 * 知识本地化：不走外网翻译队列，避免越南语等 36 语种卡住
 * zh-CN / zh-TW / ms 专用包；其余语种用英文包即时返回
 */
export async function localizeKnowledgeArticle(
  article: KnowledgeArticle,
  locale: LocaleCode,
): Promise<KnowledgeArticle> {
  if (locale === 'zh-CN') return article
  if (locale === 'zh-TW') return toTraditionalArticle(article)
  if (locale === 'ms' && KNOWLEDGE_MS_BY_ID[article.id]) {
    return KNOWLEDGE_MS_BY_ID[article.id]
  }
  return KNOWLEDGE_EN_BY_ID[article.id] ?? article
}

export async function localizeKnowledgeList(locale: LocaleCode): Promise<KnowledgeArticle[]> {
  if (locale === 'zh-CN') return KNOWLEDGE
  if (locale === 'zh-TW') {
    return Promise.all(KNOWLEDGE.map((a) => toTraditionalArticle(a)))
  }
  if (locale === 'ms') {
    return KNOWLEDGE.map((a) => KNOWLEDGE_MS_BY_ID[a.id] ?? KNOWLEDGE_EN_BY_ID[a.id] ?? a)
  }
  return KNOWLEDGE.map((a) => KNOWLEDGE_EN_BY_ID[a.id] ?? a)
}

export async function localizeKnowledgeById(
  id: string,
  locale: LocaleCode,
): Promise<KnowledgeArticle | undefined> {
  const base = getKnowledgeById(id)
  if (!base) return undefined
  return localizeKnowledgeArticle(base, locale)
}
