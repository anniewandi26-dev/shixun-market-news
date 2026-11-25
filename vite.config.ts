import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const browserHeaders = {
  Referer: 'https://quote.eastmoney.com/',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
}

export default defineConfig({
  plugins: [react()],
  // GitHub Pages 子路径；本地 / 隧道仍用 /
  // npm run build:pages 或 GITHUB_PAGES=1
  base:
    process.env.GITHUB_PAGES === '1' ||
    process.env.npm_lifecycle_event === 'build:pages'
      ? '/shixun-market-news/'
      : '/',
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    proxy: {
      '/api/em-his': {
        target: 'https://push2his.eastmoney.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/em-his/, ''),
        headers: browserHeaders,
      },
      '/api/em-news': {
        target: 'https://np-weblist.eastmoney.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/em-news/, ''),
        headers: {
          ...browserHeaders,
          Referer: 'https://kuaixun.eastmoney.com/',
        },
      },
      '/api/em-search': {
        target: 'https://search-api-web.eastmoney.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/em-search/, ''),
        headers: {
          ...browserHeaders,
          Referer: 'https://so.eastmoney.com/',
        },
      },
      // push2 会 302 到 push2delay；协议相对 Location 在 http 开发域下会走 http 失败
      '/api/em-push': {
        target: 'https://push2delay.eastmoney.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/em-push/, ''),
        headers: browserHeaders,
      },
      '/api/yahoo': {
        target: 'https://query1.finance.yahoo.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/yahoo/, ''),
        headers: {
          'User-Agent': browserHeaders['User-Agent'],
        },
      },
      '/api/sina': {
        target: 'https://money.finance.sina.com.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/sina/, ''),
        headers: {
          Referer: 'https://finance.sina.com.cn/',
          'User-Agent': browserHeaders['User-Agent'],
        },
      },
      '/api/gtx': {
        target: 'https://translate.googleapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/gtx/, ''),
      },
      '/api/mymemory': {
        target: 'https://api.mymemory.translated.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/mymemory/, ''),
      },
      '/api/lingva': {
        target: 'https://lingva.ml',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/lingva/, ''),
      },
      '/api/geo/ipapi': {
        target: 'https://ipapi.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/geo\/ipapi/, ''),
      },
    },
  },
})
