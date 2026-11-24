import type { Quote } from '../types'
import { useLocale, useT } from '../i18n/LocaleContext'
import { toBcp47 } from '../i18n/locales'
import { localizeSymbolName } from '../i18n/symbolNamesEn'

interface Props {
  quotes: Quote[]
}

export function TickerTape({ quotes }: Props) {
  const t = useT()
  const { locale } = useLocale()
  if (!quotes.length) return null

  const fmt = (n: number, digits = 2) =>
    n.toLocaleString(toBcp47(locale), {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    })

  const regionLabel = (r: Quote['region']) =>
    r === 'us' ? t('market.region.us') : r === 'cn' ? t('market.region.cn') : t('market.region.hk')

  const loop = [...quotes, ...quotes]

  return (
    <div className="ticker" aria-label={t('nav.market')}>
      <div className="ticker-track">
        {loop.map((q, i) => {
          const up = q.changePercent >= 0
          return (
            <span className="ticker-item" key={`${q.id}-${i}`}>
              <em>{regionLabel(q.region)}</em>
              <strong>{localizeSymbolName(q.name, locale, q.id)}</strong>
              <span>{fmt(q.price)}</span>
              <span className={up ? 'up' : 'down'}>
                {up ? '+' : ''}
                {fmt(q.changePercent)}%
              </span>
            </span>
          )
        })}
      </div>
    </div>
  )
}
