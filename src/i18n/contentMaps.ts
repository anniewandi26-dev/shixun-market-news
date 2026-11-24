import type { MessageKey } from './sourceMessages'

const CATEGORY_KEY: Record<string, MessageKey> = {
  入门: 'cat.intro',
  术语: 'cat.terms',
  估值: 'cat.valuation',
  市场: 'cat.market',
  风控: 'cat.risk',
  技术: 'cat.tech',
  美股: 'cat.us',
  案例: 'cat.case',
  方法: 'cat.method',
  人物: 'cat.people',
}

const TAG_KEY: Record<string, MessageKey> = {
  黄仁勋: 'news.tag.huang',
  马斯克: 'news.tag.musk',
  财经: 'news.tag.finance',
}

const FILTER_KEY: Record<string, MessageKey> = {
  all: 'news.filter.all',
  财经: 'news.filter.finance',
  黄仁勋: 'news.filter.huang',
  马斯克: 'news.filter.musk',
}

export function categoryMessageKey(category: string): MessageKey | null {
  return CATEGORY_KEY[category] ?? null
}

export function tagMessageKey(tag: string): MessageKey | null {
  return TAG_KEY[tag] ?? null
}

export function filterMessageKey(id: string): MessageKey | null {
  return FILTER_KEY[id] ?? null
}
