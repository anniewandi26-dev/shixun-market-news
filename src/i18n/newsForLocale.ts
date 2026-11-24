import { LOCAL_NEWS } from '../data/localNews'
import type { NewsItem } from '../types'
import type { LocaleCode } from './locales'
import { calendarDay, formatDateTime } from '../utils/time'

/**
 * 中文用户看直播稿；其它语言用户看可本地化的站内新闻包。
 * （直播中文稿没有稳定外网翻译额度时，避免整页停在华语。）
 */
export function newsCorpusForLocale(
  bundleNews: NewsItem[] | undefined,
  locale: LocaleCode,
): NewsItem[] {
  const live = bundleNews ?? []
  if (locale === 'zh-CN' || locale === 'zh-TW') {
    return live.length > 0 ? live : LOCAL_NEWS
  }

  // 非中文：优先站内 LOCAL_NEWS（有完整英文包）；若直播条目已带 i18n 则合并进去
  const withI18n = live.filter((n) => n.i18n && (n.i18n[locale] || n.i18n.en))
  if (withI18n.length >= 10) return withI18n

  const when = new Date()
  const time = live[0]?.time || formatDateTime(when)
  const day = calendarDay(when)
  return LOCAL_NEWS.map((n) => ({
    ...n,
    time,
    url: `/news/${n.id}`,
    body: n.body[0]?.startsWith('【')
      ? n.body
      : [`【${day}】${n.title}`, ...n.body],
  }))
}
