import type { ReactNode } from 'react'

/** 暂时关闭：直接放行，不弹 Safari 引导 */
export function SafariGate({ children }: { children: ReactNode }) {
  return <>{children}</>
}
