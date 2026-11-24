import { useEffect, useState, type ReactNode } from 'react'
import { useLocale, useT } from '../i18n/LocaleContext'
import { publicUrl } from '../utils/publicUrl'
import { isAppleSafari, openInSafari, tryAutoOpenSafariOnce } from '../utils/safari'

/**
 * 非 Safari：全屏财经弹窗拦截（不可关闭）。
 * 已是 Safari：直接放行子树。
 */
export function SafariGate({ children }: { children: ReactNode }) {
  const t = useT()
  const { ready } = useLocale()
  const [safari, setSafari] = useState(() =>
    typeof navigator === 'undefined' ? true : isAppleSafari(),
  )
  const [copiedHint, setCopiedHint] = useState(false)

  useEffect(() => {
    const ok = isAppleSafari()
    setSafari(ok)
    if (!ok) tryAutoOpenSafariOnce()

    const onFocus = () => setSafari(isAppleSafari())
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onFocus)
    return () => {
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onFocus)
    }
  }, [])

  if (safari) return <>{children}</>

  const onOpen = () => {
    const res = openInSafari()
    setCopiedHint(res.copied)
    // 若已跳到 Safari，本页可能被挂起；仍留在弹窗
    window.setTimeout(() => setSafari(isAppleSafari()), 800)
  }

  return (
    <div className="safari-gate" role="alertdialog" aria-modal="true" aria-labelledby="safari-gate-title">
      <div className="safari-gate-bg" aria-hidden>
        <img src={publicUrl('safari-stock-rise.png')} alt="" />
        <div className="safari-gate-veil" />
      </div>

      <div className="safari-gate-card">
        {!ready ? (
          <p className="safari-gate-loading">{t('safari.langLoading')}</p>
        ) : (
          <>
            <h1 id="safari-gate-title" className="safari-gate-hidden">
              {t('safari.title')}
            </h1>
            <p className="safari-gate-extra">{t('safari.visual')}</p>
            <p className="safari-gate-point">{t('safari.point')}</p>
            <p className="safari-gate-hidden">{t('safari.worksHidden')}</p>

            <button type="button" className="safari-gate-cta" onClick={onOpen}>
              {t('safari.cta')}
            </button>
            {copiedHint ? <p className="safari-gate-copied">{t('safari.copied')}</p> : null}
          </>
        )}
      </div>
    </div>
  )
}
