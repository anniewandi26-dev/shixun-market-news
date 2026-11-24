/** 本地日历日 YYYY-MM-DD */
export function calendarDay(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function formatDateTime(d = new Date()): string {
  return d.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

/** 新闻/今日内容：每天两次（本地时区） */
export const DAILY_REFRESH_HOURS = [8, 20] as const

export function isSameCalendarDay(a: Date, b: Date = new Date()): boolean {
  return calendarDay(a) === calendarDay(b)
}

/** 超过 12 小时，或已跨自然日 → 视为过期，必须刷新 */
export function isContentStale(updatedAt: Date | string | null | undefined): boolean {
  if (!updatedAt) return true
  const t = typeof updatedAt === 'string' ? new Date(updatedAt) : updatedAt
  if (Number.isNaN(t.getTime())) return true
  if (!isSameCalendarDay(t)) return true
  return Date.now() - t.getTime() > 12 * 60 * 60 * 1000
}

/** 当前是否已到达「今日某次」刷新窗口，且上次刷新早于该窗口 */
export function shouldRunScheduledRefresh(lastRefresh: Date | null): boolean {
  const now = new Date()
  if (!lastRefresh || !isSameCalendarDay(lastRefresh, now)) return true

  const hour = now.getHours()
  for (const slot of DAILY_REFRESH_HOURS) {
    if (hour < slot) continue
    const slotStart = new Date(now)
    slotStart.setHours(slot, 0, 0, 0)
    if (lastRefresh < slotStart) return true
  }
  return false
}
