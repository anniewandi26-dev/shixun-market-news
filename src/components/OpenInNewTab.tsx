import { useEffect, type ReactNode } from 'react'

function appPathFromUrl(url: URL): string {
  // HashRouter：路径在 hash 里，如 #/news/xxx
  if (url.hash && url.hash !== '#') {
    const raw = url.hash.replace(/^#/, '')
    const pathOnly = raw.split('?')[0] || '/'
    return pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`
  }

  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  let path = url.pathname
  if (base && path.startsWith(base)) {
    path = path.slice(base.length) || '/'
  }
  if (!path.startsWith('/')) path = `/${path}`
  return path
}

/**
 * 站内链接：除首页、行情外，一律新标签打开，当前页（尤其首页）保持不动。
 */
export function OpenInNewTab({ children }: { children: ReactNode }) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      const el = e.target
      if (!(el instanceof Element)) return
      const a = el.closest('a[href]') as HTMLAnchorElement | null
      if (!a || !a.href) return
      if (a.hasAttribute('download')) return
      if (a.dataset.sameTab === '1') return
      if (a.target === '_blank') return

      let url: URL
      try {
        url = new URL(a.href, window.location.href)
      } catch {
        return
      }
      if (url.origin !== window.location.origin) return

      const path = appPathFromUrl(url)

      // 首页、行情：当前标签；其它内容：新标签
      if (path === '/' || path === '') return
      if (path === '/market' || path.startsWith('/market/')) return
      if (path === '/ad') return

      e.preventDefault()
      e.stopPropagation()
      window.open(url.href, '_blank', 'noopener,noreferrer')
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return <>{children}</>
}
