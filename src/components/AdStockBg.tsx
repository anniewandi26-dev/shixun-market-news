import { publicUrl } from '../utils/publicUrl'

const CANDLES = [
  { x: 28, o: 62, c: 48, h: 42, l: 70, up: false },
  { x: 56, o: 50, c: 38, h: 32, l: 58, up: true },
  { x: 84, o: 40, c: 52, h: 34, l: 58, up: false },
  { x: 112, o: 54, c: 44, h: 38, l: 60, up: true },
  { x: 140, o: 46, c: 34, h: 28, l: 52, up: true },
  { x: 168, o: 36, c: 48, h: 30, l: 56, up: false },
  { x: 196, o: 50, c: 40, h: 34, l: 58, up: true },
  { x: 224, o: 42, c: 30, h: 24, l: 50, up: true },
  { x: 252, o: 32, c: 44, h: 26, l: 52, up: false },
  { x: 280, o: 46, c: 36, h: 30, l: 54, up: true },
  { x: 308, o: 38, c: 28, h: 22, l: 46, up: true },
  { x: 336, o: 30, c: 40, h: 24, l: 48, up: false },
  { x: 364, o: 42, c: 33, h: 26, l: 50, up: true },
  { x: 392, o: 35, c: 24, h: 18, l: 42, up: true },
]

const TICKERS = [
  { sym: 'NVDA', chg: '+2.4%', up: true, top: '12%', left: '6%', delay: '0s' },
  { sym: 'AAPL', chg: '-0.8%', up: false, top: '22%', left: '72%', delay: '1.2s' },
  { sym: 'TSLA', chg: '+1.1%', up: true, top: '58%', left: '8%', delay: '2.1s' },
  { sym: 'MSFT', chg: '+0.6%', up: true, top: '68%', left: '70%', delay: '0.6s' },
  { sym: 'HSI', chg: '-1.2%', up: false, top: '38%', left: '78%', delay: '1.8s' },
  { sym: 'NDX', chg: '+0.9%', up: true, top: '78%', left: '40%', delay: '2.8s' },
]

const FALLBACK = publicUrl('ad-gate-bg-market.jpg')

type Props = {
  /** 主题 AI 实景图（已是 publicUrl） */
  photo?: string
}

/** 广告门禁：全屏实景 + 轻量 K 线 / 浮动报价 */
export function AdStockBg({ photo }: Props) {
  const src = photo?.trim() || FALLBACK

  return (
    <div className="ad-stock-bg" aria-hidden>
      <div className="ad-stock-photo">
        <img
          key={src}
          src={src}
          alt=""
          decoding="async"
          onError={(e) => {
            if (e.currentTarget.src !== FALLBACK) e.currentTarget.src = FALLBACK
          }}
        />
      </div>

      <div className="ad-stock-grid" />
      <div className="ad-stock-scan" />

      <svg
        className="ad-stock-chart"
        viewBox="0 0 420 120"
        preserveAspectRatio="none"
        focusable="false"
      >
        <defs>
          <linearGradient id="ad-line-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--ad-accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--ad-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          className="ad-stock-area"
          d="M0 78 C40 72 70 88 110 58 C150 28 180 48 220 36 C260 24 290 52 330 40 C360 32 390 48 420 30 L420 120 L0 120 Z"
        />
        <path
          className="ad-stock-line"
          d="M0 78 C40 72 70 88 110 58 C150 28 180 48 220 36 C260 24 290 52 330 40 C360 32 390 48 420 30"
          fill="none"
          stroke="var(--ad-accent)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {CANDLES.map((c, i) => {
          const bodyTop = Math.min(c.o, c.c)
          const bodyH = Math.max(2.5, Math.abs(c.o - c.c))
          return (
            <g
              key={c.x}
              className="ad-stock-candle"
              data-up={c.up ? '1' : '0'}
              style={{ animationDelay: `${0.08 + i * 0.07}s` }}
            >
              <line x1={c.x + 5} y1={c.h} x2={c.x + 5} y2={c.l} />
              <rect x={c.x} y={bodyTop} width="10" height={bodyH} rx="1" />
            </g>
          )
        })}
      </svg>

      <div className="ad-stock-pulse" />

      <ul className="ad-stock-ticks">
        {TICKERS.map((t) => (
          <li
            key={t.sym}
            className={t.up ? 'up' : 'down'}
            style={{ top: t.top, left: t.left, animationDelay: t.delay }}
          >
            <strong>{t.sym}</strong>
            <span>{t.chg}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
