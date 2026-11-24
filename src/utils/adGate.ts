export const AD_GATE_KEY = 'berita_ad_gate_v1'

export function isAdGatePassed(): boolean {
  try {
    return sessionStorage.getItem(AD_GATE_KEY) === '1'
  } catch {
    return false
  }
}

export function markAdGatePassed(): void {
  try {
    sessionStorage.setItem(AD_GATE_KEY, '1')
  } catch {
    // ignore private mode
  }
}
