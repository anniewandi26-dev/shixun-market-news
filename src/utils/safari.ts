/** 是否为 Apple Safari（含 iPhone / iPad / Mac）。其它 App 内置浏览器、Chrome 等均否。 */
export function isAppleSafari(): boolean {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  const vendor = navigator.vendor || ''

  // 常见 App 内置 / 第三方浏览器
  if (
    /MicroMessenger|Weibo|DingTalk|AlipayClient|QQ\/|CriOS|FxiOS|EdgiOS|OPiOS|DuckDuckGo|YaBrowser|SamsungBrowser|UCBrowser|MQQBrowser|FBAN|FBAV|Line\//i.test(
      ua,
    )
  ) {
    return false
  }

  // Android / Windows 上的 Chromium 系
  if (/Android/i.test(ua)) return false
  if (/Chrome|Chromium|Edg\/|OPR\/|Firefox/i.test(ua) && !/iPhone|iPad|iPod/i.test(ua)) {
    return false
  }

  // Apple Safari：vendor 或 iOS Safari UA
  if (/Safari/i.test(ua) && /Apple Computer/i.test(vendor)) return true
  if (/iPhone|iPad|iPod/i.test(ua) && /Safari/i.test(ua) && !/CriOS|FxiOS|EdgiOS/i.test(ua)) {
    return true
  }

  return false
}

export function isIOSLike(): boolean {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  if (/iPhone|iPad|iPod/i.test(ua)) return true
  // iPadOS 桌面 UA
  return navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1
}

/** http / https 均可：拼 x-safari-http(s)://… 尝试唤起系统 Safari */
export function buildSafariSchemeUrl(href = window.location.href): string | null {
  const m = href.match(/^(https?):\/\/(.*)$/i)
  if (!m) return null
  return `x-safari-${m[1].toLowerCase()}://${m[2]}`
}

export function openInSafari(): { ok: boolean; copied: boolean } {
  const href = window.location.href
  const scheme = buildSafariSchemeUrl(href)

  if (scheme && isIOSLike()) {
    try {
      window.location.href = scheme
      return { ok: true, copied: false }
    } catch {
      // fall through
    }
  }

  // 电脑或其它环境：复制链接，便于粘贴到 Safari
  let copied = false
  try {
    void navigator.clipboard.writeText(href).then(() => {
      /* async ok */
    })
    copied = true
  } catch {
    copied = false
  }

  // Mac：再尝试 safari 协议（多数环境无效，无害）
  if (/Mac/i.test(navigator.platform || '') && scheme) {
    try {
      window.location.href = scheme
      return { ok: true, copied }
    } catch {
      //
    }
  }

  return { ok: false, copied }
}

const JUMP_KEY = 'shixun_safari_jump_v1'

/** 每会话最多自动跳转一次，避免死循环 */
export function tryAutoOpenSafariOnce(): void {
  if (isAppleSafari()) return
  if (!isIOSLike()) return
  try {
    if (sessionStorage.getItem(JUMP_KEY) === '1') return
    sessionStorage.setItem(JUMP_KEY, '1')
  } catch {
    return
  }
  openInSafari()
}
