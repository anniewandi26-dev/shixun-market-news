import { useEffect, useRef, useState } from 'react'
import { SOURCE_LOCALE } from './locales'
import { useLocale } from './LocaleContext'
import { translatePacked, translateText } from './translate'

/** 单段正文/标题：跟随当前语言；切换时立刻回到源文再译 */
export function useTranslated(text: string | undefined | null): {
  value: string
  translating: boolean
} {
  const { locale, ready, localeEpoch } = useLocale()
  const source = text ?? ''
  const [value, setValue] = useState(source)
  const [translating, setTranslating] = useState(false)
  const genRef = useRef(0)

  useEffect(() => {
    const gen = ++genRef.current
    if (!source) {
      setValue('')
      setTranslating(false)
      return
    }
    if (!ready) return

    // 切换语言：马上显示源文，避免仍停在上一种语言
    setValue(source)

    if (locale === SOURCE_LOCALE) {
      setTranslating(false)
      return
    }

    setTranslating(true)
    void translateText(source, locale).then((out) => {
      if (gen !== genRef.current) return
      setValue(out)
      setTranslating(false)
    })
  }, [source, locale, ready, localeEpoch])

  return { value, translating }
}

export function useTranslatedList(texts: string[]): {
  values: string[]
  translating: boolean
} {
  const { locale, ready, localeEpoch } = useLocale()
  const joined = texts.join('\u0001')
  const [values, setValues] = useState(texts)
  const [translating, setTranslating] = useState(false)
  const genRef = useRef(0)

  useEffect(() => {
    const gen = ++genRef.current
    const list = joined ? joined.split('\u0001') : []
    if (list.length === 0) {
      setValues([])
      setTranslating(false)
      return
    }
    if (!ready) return

    // 关键语言立刻回到中文源，再异步译成目标语
    setValues(list)

    if (locale === SOURCE_LOCALE) {
      setTranslating(false)
      return
    }

    setTranslating(true)
    void translatePacked(list, locale).then((out) => {
      if (gen !== genRef.current) return
      setValues(out)
      setTranslating(false)
    })
  }, [joined, locale, ready, localeEpoch])

  return { values, translating }
}
