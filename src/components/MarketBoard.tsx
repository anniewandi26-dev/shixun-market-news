import { useMemo, useState } from 'react'
import { INDEX_SYMBOLS, WATCHLIST } from '../data/symbols'
import { useLocale, useT } from '../i18n/LocaleContext'
import { toBcp47 } from '../i18n/locales'
import { localizeSymbolName } from '../i18n/symbolNamesEn'
import type { MarketRegion, Quote, SymbolDef } from '../types'
import { PriceChart } from './PriceChart'

interface Props {
  quotes: Quote[]
  loading: boolean
  error: string | null
  live: boolean
  updatedAt: Date | null
}

const REGION_ORDER: Record<MarketRegion, number> = { us: 0, cn: 1, hk: 2 }

function byUsFirst(a: SymbolDef, b: SymbolDef) {
  return REGION_ORDER[a.region] - REGION_ORDER[b.region]
}

const DEFAULT_SYMBOL =
  INDEX_SYMBOLS.find((s) => s.region === 'us') ?? INDEX_SYMBOLS[0]

export function MarketBoard({ quotes, loading, error, live, updatedAt }: Props) {
  const t = useT()
  const { locale } = useLocale()
  const [region, setRegion] = useState<MarketRegion | 'all'>('us')
  const [selected, setSelected] = useState<SymbolDef>(DEFAULT_SYMBOL)

  const fmt = (n: number, digits = 2) =>
    n.toLocaleString(toBcp47(locale), {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    })

  const tabs = [
    { id: 'us' as const, label: t('market.tab.us') },
    { id: 'cn' as const, label: t('market.tab.cn') },
    { id: 'hk' as const, label: t('market.tab.hk') },
    { id: 'all' as const, label: t('market.tab.all') },
  ]

  const regionLabel = (r: MarketRegion) =>
    r === 'us' ? t('market.region.us') : r === 'cn' ? t('market.region.cn') : t('market.region.hk')

  const quoteMap = useMemo(() => {
    const m = new Map<string, Quote>()
    quotes.forEach((q) => m.set(q.id, q))
    return m
  }, [quotes])

  const indexes = INDEX_SYMBOLS.filter((s) => region === 'all' || s.region === region).sort(
    byUsFirst,
  )
  const stocks = WATCHLIST.filter((s) => region === 'all' || s.region === region).sort(byUsFirst)

  const nameOf = (sym: { id: string; name: string }) =>
    localizeSymbolName(sym.name, locale, sym.id)

  return (
    <section className="section market" id="market">
      <div className="section-head">
        <div>
          <p className="eyebrow">{t('market.eyebrow')}</p>
          <h2>{t('market.title')}</h2>
          <p className="lede">{t('market.lede')}</p>
        </div>
        <div className="status-pill" data-live={live}>
          <span className="dot" />
          {live ? t('market.live') : loading ? t('market.connecting') : t('market.offline')}
          {updatedAt && (
            <time dateTime={updatedAt.toISOString()}>
              {updatedAt.toLocaleTimeString(toBcp47(locale), { hour12: false })}
            </time>
          )}
        </div>
      </div>

      <div className="tabs" role="tablist" aria-label={t('market.tabsAria')}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={region === tab.id}
            className={region === tab.id ? 'tab active' : 'tab'}
            onClick={() => setRegion(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {error && <p className="banner-warn">{t('market.error', { error })}</p>}

      <div className="index-grid">
        {indexes.map((sym) => {
          const q = quoteMap.get(sym.id)
          const up = (q?.changePercent ?? 0) >= 0
          const active = selected.id === sym.id
          return (
            <button
              type="button"
              key={sym.id}
              className={active ? 'quote-tile active' : 'quote-tile'}
              onClick={() => setSelected(sym)}
            >
              <div className="quote-meta">
                <span className="region">{regionLabel(sym.region)}</span>
                <strong>{nameOf(sym)}</strong>
              </div>
              {q ? (
                <>
                  <div className="quote-price">{fmt(q.price)}</div>
                  <div className={up ? 'quote-chg up' : 'quote-chg down'}>
                    {up ? '+' : ''}
                    {fmt(q.change)} · {up ? '+' : ''}
                    {fmt(q.changePercent)}%
                  </div>
                </>
              ) : (
                <div className="quote-price muted">{loading ? '…' : '--'}</div>
              )}
            </button>
          )
        })}
      </div>

      <PriceChart symbol={selected} />

      <div className="subhead-row">
        <h3 className="subhead">{t('market.watchTitle')}</h3>
        <span className="muted">
          {t('market.watchMeta', {
            total: stocks.length,
            quoted: stocks.filter((s) => quoteMap.has(s.id)).length,
          })}
        </span>
      </div>
      <div className="stock-table-wrap">
        <table className="stock-table">
          <thead>
            <tr>
              <th>{t('market.th.region')}</th>
              <th>{t('market.th.name')}</th>
              <th>{t('market.th.price')}</th>
              <th>{t('market.th.change')}</th>
              <th>{t('market.th.pct')}</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((sym) => {
              const q = quoteMap.get(sym.id)
              const up = (q?.changePercent ?? 0) >= 0
              const name = nameOf(sym)
              return (
                <tr
                  key={sym.id}
                  className={selected.id === sym.id ? 'selected' : undefined}
                  onClick={() => setSelected(sym)}
                >
                  <td>{regionLabel(sym.region)}</td>
                  <td>{name}</td>
                  <td>{q ? fmt(q.price) : loading ? '…' : '—'}</td>
                  <td className={q ? (up ? 'up' : 'down') : undefined}>
                    {q ? `${up ? '+' : ''}${fmt(q.change)}` : loading ? '…' : '—'}
                  </td>
                  <td className={q ? (up ? 'up' : 'down') : undefined}>
                    {q
                      ? `${up ? '+' : ''}${fmt(q.changePercent)}%`
                      : loading
                        ? '…'
                        : '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
