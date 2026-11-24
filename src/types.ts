export type MarketRegion = 'cn' | 'hk' | 'us'

export interface SymbolDef {
  id: string
  name: string
  region: MarketRegion
  /** East Money secid, e.g. 1.000001 */
  secid: string
  /** Yahoo Finance symbol for K-line fallback/primary */
  yahoo: string
}

export interface Quote {
  id: string
  name: string
  region: MarketRegion
  price: number
  change: number
  changePercent: number
  open?: number
  high?: number
  low?: number
  prevClose?: number
}

export interface KlineBar {
  time: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface NewsLocalePack {
  title: string
  summary: string
  body: string[]
}

export interface NewsItem {
  id: string
  title: string
  summary: string
  source: string
  time: string
  /** 站内详情路径，如 /news/xxx；不再跳外链 */
  url: string
  region?: MarketRegion | 'global'
  tag?: string
  /** 全文段落，植入本站阅读 */
  body: string[]
  /** 预挂多语译文（刷新脚本 / 站内包写入），按 locale 取 */
  i18n?: Partial<Record<string, NewsLocalePack>>
}

export interface KnowledgeSectionBlock {
  heading: string
  paragraphs: string[]
}

export interface KnowledgeArticle {
  id: string
  title: string
  category: string
  readMinutes: number
  summary: string
  /** @deprecated prefer sections; kept for simple lists */
  body?: string[]
  sections: KnowledgeSectionBlock[]
}
