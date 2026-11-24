import {
  CandlestickSeries,
  ColorType,
  createChart,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  type Time,
} from 'lightweight-charts'
import { useEffect, useRef, useState } from 'react'
import { useLocale, useT } from '../i18n/LocaleContext'
import { localizeSymbolName } from '../i18n/symbolNamesEn'
import { chartLocalization } from '../i18n/toChartLocale'
import { fetchKline } from '../services/market'
import type { SymbolDef } from '../types'

interface Props {
  symbol: SymbolDef
}

export function PriceChart({ symbol }: Props) {
  const t = useT()
  const { locale } = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let cancelled = false
    let chart: IChartApi | null = null
    let series: ISeriesApi<'Candlestick'> | null = null
    const locOpts = chartLocalization(locale)

    setStatus('loading')
    setError(null)
    el.replaceChildren()

    chart = createChart(el, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#5a6578',
        fontFamily: "'Noto Sans SC', 'Segoe UI', sans-serif",
      },
      localization: {
        locale: locOpts.locale,
        dateFormat: locOpts.dateFormat,
      },
      grid: {
        vertLines: { color: 'rgba(15, 35, 55, 0.06)' },
        horzLines: { color: 'rgba(15, 35, 55, 0.06)' },
      },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false, timeVisible: false },
      crosshair: {
        vertLine: { color: 'rgba(15, 90, 95, 0.35)', width: 1, style: 2 },
        horzLine: { color: 'rgba(15, 90, 95, 0.35)', width: 1, style: 2 },
      },
      width: el.clientWidth || 640,
      height: 360,
    })

    series = chart.addSeries(CandlestickSeries, {
      upColor: '#c23b3b',
      downColor: '#1f8a5b',
      borderUpColor: '#c23b3b',
      borderDownColor: '#1f8a5b',
      wickUpColor: '#c23b3b',
      wickDownColor: '#1f8a5b',
    })

    const onResize = () => {
      if (containerRef.current && chart) {
        chart.applyOptions({ width: containerRef.current.clientWidth })
      }
    }
    window.addEventListener('resize', onResize)

    ;(async () => {
      try {
        const bars = await fetchKline(symbol, 150)
        if (cancelled || !series || !chart) return
        if (!bars.length) throw new Error('empty')
        const data: CandlestickData[] = bars.map((b) => ({
          time: b.time as Time,
          open: b.open,
          high: b.high,
          low: b.low,
          close: b.close,
        }))
        series.setData(data)
        chart.timeScale().fitContent()
        setStatus('ready')
      } catch (e) {
        if (!cancelled) {
          setStatus('error')
          setError(e instanceof Error ? e.message : 'error')
        }
      }
    })()

    return () => {
      cancelled = true
      window.removeEventListener('resize', onResize)
      chart?.remove()
    }
  }, [symbol.id, symbol.secid, symbol.yahoo, locale])

  return (
    <div className="chart-wrap">
      <div className="chart-head">
        <h3>{localizeSymbolName(symbol.name, locale, symbol.id)}</h3>
        <span>{t('market.chartHalf')}</span>
      </div>
      {status === 'loading' && <p className="chart-status">{t('market.chartLoading')}</p>}
      {status === 'error' && (
        <p className="chart-status error">
          {t('market.chartError', { error: error ?? '' })}
        </p>
      )}
      <div
        ref={containerRef}
        className="chart-canvas"
        style={{ opacity: status === 'ready' ? 1 : 0.35 }}
      />
    </div>
  )
}
