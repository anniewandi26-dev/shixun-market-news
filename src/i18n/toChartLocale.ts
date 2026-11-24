import type { LocaleCode } from './locales'
import { toBcp47 } from './locales'

/** lightweight-charts 用的 locale / 日期格式（跟站内语言走，不用浏览器默认华文） */
export function chartLocalization(locale: LocaleCode): {
  locale: string
  dateFormat: string
} {
  if (locale === 'zh-CN') {
    return { locale: 'zh-CN', dateFormat: 'yyyy年MM月dd日' }
  }
  if (locale === 'zh-TW') {
    return { locale: 'zh-TW', dateFormat: 'yyyy年MM月dd日' }
  }
  // 非中文：跟站内语言走 Intl，日期用英文式刻度，避免浏览器默认华文「7月」「15日」
  return { locale: toBcp47(locale) || 'en-US', dateFormat: "dd MMM 'yy" }
}
