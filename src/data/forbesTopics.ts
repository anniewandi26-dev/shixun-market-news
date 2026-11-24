/** 福布斯常客及其代表性上市公司 / 关联关键词 */
export interface ForbesTopic {
  id: string
  tag: string
  person: string
  company: string
  keywords: string[]
  match: RegExp
}

export const FORBES_TOPICS: ForbesTopic[] = [
  {
    id: 'musk',
    tag: '马斯克',
    person: '埃隆·马斯克',
    company: '特斯拉',
    keywords: ['马斯克', '特斯拉', 'TSLA'],
    match: /马斯克|特斯拉|TSLA|SpaceX|Elon\s*Musk/i,
  },
  {
    id: 'huang',
    tag: '黄仁勋',
    person: '黄仁勋',
    company: '英伟达',
    keywords: ['黄仁勋', '英伟达', 'NVDA'],
    match: /黄仁勋|英伟达|NVDA|Jensen/i,
  },
  {
    id: 'bezos',
    tag: '贝索斯',
    person: '杰夫·贝索斯',
    company: '亚马逊',
    keywords: ['贝索斯', '亚马逊', 'AMZN'],
    match: /贝索斯|亚马逊|AMZN|Bezos/i,
  },
  {
    id: 'zuck',
    tag: '扎克伯格',
    person: '马克·扎克伯格',
    company: 'Meta',
    keywords: ['扎克伯格', 'Meta', '脸书'],
    match: /扎克伯格|Meta|脸书|Facebook|Zuckerberg/i,
  },
  {
    id: 'buffett',
    tag: '巴菲特',
    person: '沃伦·巴菲特',
    company: '伯克希尔',
    keywords: ['巴菲特', '伯克希尔'],
    match: /巴菲特|伯克希尔|Buffett|Berkshire/i,
  },
  {
    id: 'ellison',
    tag: '埃里森',
    person: '拉里·埃里森',
    company: '甲骨文',
    keywords: ['埃里森', '甲骨文', 'ORCL'],
    match: /埃里森|甲骨文|ORCL|Ellison/i,
  },
  {
    id: 'gates',
    tag: '盖茨',
    person: '比尔·盖茨',
    company: '微软',
    keywords: ['盖茨', '微软', 'MSFT'],
    match: /盖茨|比尔.?盖茨|微软|MSFT|Bill\s*Gates/i,
  },
  {
    id: 'cook',
    tag: '库克',
    person: '蒂姆·库克',
    company: '苹果',
    keywords: ['库克', '苹果公司', 'AAPL'],
    match: /库克|苹果公司|苹果概念|AAPL|iPhone|Tim\s*Cook/i,
  },
  {
    id: 'mahuateng',
    tag: '马化腾',
    person: '马化腾',
    company: '腾讯',
    keywords: ['马化腾', '腾讯'],
    match: /马化腾|腾讯|Tencent/i,
  },
  {
    id: 'mayun',
    tag: '马云',
    person: '马云',
    company: '阿里巴巴',
    keywords: ['马云', '阿里巴巴'],
    match: /马云|阿里巴巴|Alibaba/i,
  },
]

export function detectForbesTag(title: string, summary: string): string | undefined {
  const text = `${title} ${summary}`
  for (const topic of FORBES_TOPICS) {
    if (topic.match.test(text)) return topic.tag
  }
  return undefined
}
