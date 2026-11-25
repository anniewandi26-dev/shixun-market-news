import { useCallback, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AdStockBg } from '../components/AdStockBg'
import { localizeAdSpotlight } from '../i18n/localizeAdSpotlight'
import { useLocale, useT } from '../i18n/LocaleContext'
import {
  fetchAdSpotlight,
  getDailyAdSpotlight,
  type AdSpotlight,
} from '../services/adSpotlight'
import { isAdGatePassed, markAdGatePassed } from '../utils/adGate'

const WAIT_SEC = 10

export function AdGatePage() {
  const t = useT()
  const { ready, locale, localeEpoch } = useLocale()
  const navigate = useNavigate()
  const [started, setStarted] = useState(false)
  const [left, setLeft] = useState(WAIT_SEC)
  const [spot, setSpot] = useState<AdSpotlight>(() => getDailyAdSpotlight())
  // 等语言就绪后再填文案，避免 IP=马来却先闪中文标题
  const [title, setTitle] = useState('')
  const [lede, setLede] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  // 文案跟 IP/语言走：预置包优先；失败也回 UI 词典，不露中文
  useEffect(() => {
    if (!ready || started) return
    let cancelled = false
    const daily = getDailyAdSpotlight()
    const uiFallback = { title: t('ad.headline'), summary: t('ad.lede') }

    const run = async () => {
      setRefreshing(true)
      setSpot(daily)
      try {
        const localizedDaily = await localizeAdSpotlight(daily, locale, uiFallback, 2500)
        if (cancelled) return
        setTitle(localizedDaily.title)
        setLede(localizedDaily.summary)

        const next = await fetchAdSpotlight(4000)
        if (cancelled) return
        setSpot(next)

        const copy = await localizeAdSpotlight(next, locale, uiFallback, 3500)
        if (cancelled) return
        setTitle(copy.title)
        setLede(copy.summary)
      } catch {
        if (!cancelled) {
          setSpot(daily)
          setTitle(uiFallback.title)
          setLede(uiFallback.summary)
        }
      } finally {
        if (!cancelled) setRefreshing(false)
      }
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [ready, locale, localeEpoch, started, t])

  useEffect(() => {
    if (!started) return
    if (left <= 0) {
      markAdGatePassed()
      navigate('/', { replace: true })
      return
    }
    const id = window.setTimeout(() => setLeft((n) => n - 1), 1000)
    return () => window.clearTimeout(id)
  }, [started, left, navigate])

  const onEnter = useCallback(() => {
    if (started) return
    setStarted(true)
    setLeft(WAIT_SEC)
  }, [started])

  if (typeof sessionStorage !== 'undefined' && isAdGatePassed()) {
    return <Navigate to="/" replace />
  }

  const showMain = ready && Boolean(title)

  return (
    <main className="ad-gate" data-theme={spot.theme} aria-busy={!showMain || started}>
      <div className="ad-gate-bg" aria-hidden>
        <AdStockBg photo={spot.bg} />
        <div className="ad-gate-veil" />
      </div>

      <div className="ad-gate-panel">
        <p className="ad-gate-sponsor">{t('ad.sponsor')}</p>
        {!showMain ? (
          <p className="ad-gate-loading">{t('ad.langLoading')}</p>
        ) : (
          <>
            <p className="ad-gate-kicker">
              {refreshing ? t('ad.liveLoading') : t('ad.liveKicker')}
            </p>
            <h1 className="ad-gate-title">{title}</h1>
            <p className="ad-gate-lede">{lede}</p>
            {spot.showTime ? <p className="ad-gate-time">{spot.showTime}</p> : null}

            {!started ? (
              <div className="ad-gate-actions">
                <button type="button" className="ad-gate-cta" onClick={onEnter}>
                  {t('ad.cta')}
                </button>
                <span className="ad-gate-hint">{t('ad.wait')}</span>
              </div>
            ) : (
              <div className="ad-gate-count" role="status" aria-live="polite">
                <div className="ad-gate-timer" aria-hidden>
                  <div
                    className="ad-gate-ring"
                    style={{ ['--p' as string]: String((WAIT_SEC - left) / WAIT_SEC) }}
                  />
                  <strong>{left > 0 ? left : 0}</strong>
                </div>
                <p>{left > 0 ? t('ad.countdown', { n: left }) : t('ad.entering')}</p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
