import type { NewsItem } from '../types'
import { NEWS_EN_BY_ID } from './content/newsEn'
import { NEWS_MS_BY_ID } from './content/newsMs'
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

async function toTraditionalNews(item: NewsItem): Promise<NewsItem> {
  const c = await getToTrad()
  return {
    ...item,
    title: c(item.title),
    summary: c(item.summary),
    body: item.body.map((p) => c(p)),
    source: item.source === '市讯专题' ? item.source : c(item.source),
  }
}

function applyPack(
  item: NewsItem,
  pack: { title: string; summary: string; body: string[] },
): NewsItem {
  return {
    ...item,
    title: pack.title,
    summary: pack.summary,
    body: pack.body,
  }
}

/**
 * 新闻本地化（同步优先，避免 36 语种卡在外网翻译）：
 * - zh-CN 原文
 * - zh-TW 本地简繁（仅此一处异步）
 * - ms 马来预置包
 * - 其余语种（含越南语 vi）立刻用英文预置包，不阻塞页面
 */
export async function localizeNewsItem(item: NewsItem, locale: LocaleCode): Promise<NewsItem> {
  if (locale === 'zh-CN') return item
  if (locale === 'zh-TW') return toTraditionalNews(item)

  const embedded = item.i18n?.[locale] ?? item.i18n?.en
  if (embedded) return applyPack(item, embedded)

  if (locale === 'ms' && NEWS_MS_BY_ID[item.id]) {
    return applyPack(item, NEWS_MS_BY_ID[item.id])
  }

  const enPack = NEWS_EN_BY_ID[item.id]
  if (enPack) return applyPack(item, enPack)

  // 无预置包的直播稿：非中文下仍避免整页卡住，直接返回条目
  return item
}

export async function localizeNewsList(
  items: NewsItem[],
  locale: LocaleCode,
): Promise<NewsItem[]> {
  if (locale === 'zh-CN') return items
  if (locale === 'zh-TW') {
    return Promise.all(items.map((n) => toTraditionalNews(n)))
  }
  // en / ms / vi / … 全部同步映射，毫秒级完成
  return items.map((n) => {
    const embedded = n.i18n?.[locale] ?? n.i18n?.en
    if (embedded) return applyPack(n, embedded)
    if (locale === 'ms' && NEWS_MS_BY_ID[n.id]) return applyPack(n, NEWS_MS_BY_ID[n.id])
    const en = NEWS_EN_BY_ID[n.id]
    return en ? applyPack(n, en) : n
  })
}
