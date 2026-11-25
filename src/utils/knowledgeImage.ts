import { publicUrl } from './publicUrl'

/** 话题配图：public/knowledge-covers/{id}.jpg */
const COVERS: Record<string, string> = {
  'what-is-stock': 'knowledge-covers/what-is-stock.jpg',
  'bull-bear': 'knowledge-covers/bull-bear.jpg',
  'pe-pb': 'knowledge-covers/pe-pb.jpg',
  'a-hk-us': 'knowledge-covers/a-hk-us.jpg',
  risk: 'knowledge-covers/risk.jpg',
  'read-kline': 'knowledge-covers/read-kline.jpg',
  'us-market-guide': 'knowledge-covers/us-market-guide.jpg',
  'nvidia-huang': 'knowledge-covers/nvidia-huang.jpg',
  'musk-tesla': 'knowledge-covers/musk-tesla.jpg',
  'how-to-read-news': 'knowledge-covers/how-to-read-news.jpg',
}

const FALLBACK =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0f3d42"/><stop offset="1" stop-color="#1a6b5c"/></linearGradient></defs><rect width="640" height="360" fill="url(#g)"/><path d="M70 250 L160 170 L240 210 L360 120 L560 250 Z" fill="none" stroke="#9ad41a" stroke-width="8"/></svg>`,
  )

export function coverForKnowledge(id: string): string {
  const path = COVERS[id]
  return path ? publicUrl(path) : FALLBACK
}

export function knowledgeImageFallback(): string {
  return FALLBACK
}
