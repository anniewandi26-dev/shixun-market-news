import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const assetsDir = path.join(
  process.env.USERPROFILE || '',
  '.cursor/projects/c-Users-User-Desktop/assets',
)
const pub = path.join(root, 'public')

function dataUri(file, mime) {
  const buf = fs.readFileSync(file)
  if (buf.length > 2.5e6) {
    console.warn('skip large', file, buf.length)
    return null
  }
  return `data:${mime};base64,${buf.toString('base64')}`
}

const picks = [
  ['safari', path.join(pub, 'safari-stock-rise.png'), 'image/png'],
  ['ad', path.join(pub, 'ad-jensen-return.jpg'), 'image/jpeg'],
  ['hero', path.join(pub, 'hero-market.jpg'), 'image/jpeg'],
  ['shot1', path.join(assetsDir, 'image-e3343f36-c4e2-478f-a1dc-3736bca0668f.png'), 'image/png'],
  ['shot2', path.join(assetsDir, 'image-e55667cb-164a-48a5-b7ef-7395086ba344.png'), 'image/png'],
  ['shot3', path.join(assetsDir, 'image-08dc4a3c-a9d6-4cfd-8596-21df803576ee.png'), 'image/png'],
  ['shot4', path.join(assetsDir, 'image-a129934d-ab6b-46cb-a14a-47b5c13d8be8.png'), 'image/png'],
]

const assets = {}
for (const [k, f, m] of picks) {
  if (!fs.existsSync(f)) {
    console.warn('missing', f)
    continue
  }
  const d = dataUri(f, m)
  if (d) {
    assets[k] = d
    console.log(k, Math.round(fs.statSync(f).size / 1024) + 'KB')
  }
}

const videoFile = path.join(pub, 'shixun-stock-rise.mp4')
const videoB64 = dataUri(videoFile, 'video/mp4')
console.log('video', videoB64 ? Math.round(fs.statSync(videoFile).size / 1024) + 'KB' : 'missing')

const css = `
:root{--ink:#12202a;--muted:#5a6a78;--brand:#0f3d42;--accent:#c9a227;--line:rgba(18,32,42,.12);--font:'Segoe UI','Noto Sans SC',system-ui,sans-serif}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;font-family:var(--font);color:var(--ink);background:linear-gradient(180deg,#f7fafb,#e8eef2);line-height:1.55}
.wrap{max-width:920px;margin:0 auto;padding:1.25rem 1.1rem 4rem}
.hero{position:relative;border-radius:18px;overflow:hidden;min-height:220px;margin-bottom:1.25rem;color:#eef6f8;background:#061018}
.hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.55}
.hero .veil{position:absolute;inset:0;background:linear-gradient(120deg,rgba(6,20,24,.85),rgba(6,20,24,.45))}
.hero .inner{position:relative;padding:1.6rem 1.35rem}
.hero h1{margin:0 0 .4rem;font-size:clamp(1.45rem,4vw,2rem)}
.hero p{margin:0;opacity:.9;max-width:36rem}
.badge{display:inline-block;margin-bottom:.55rem;padding:.2rem .55rem;border-radius:999px;background:rgba(201,162,39,.2);color:#e2c56a;font-size:.75rem;letter-spacing:.06em}
.toc{display:flex;flex-wrap:wrap;gap:.45rem;margin:0 0 1.4rem}
.toc a{text-decoration:none;font-size:.82rem;padding:.35rem .65rem;border-radius:999px;background:#fff;border:1px solid var(--line);color:var(--ink)}
section{background:#fff;border:1px solid var(--line);border-radius:16px;padding:1.15rem;margin:0 0 1rem;box-shadow:0 10px 30px rgba(18,40,55,.04)}
section h2{margin:0 0 .65rem;font-size:1.15rem;color:var(--brand)}
section h3{margin:1rem 0 .4rem;font-size:1rem}
ul,ol{margin:.3rem 0 .6rem;padding-left:1.2rem}li{margin:.25rem 0}
.muted{color:var(--muted);font-size:.92rem}
.grid{display:grid;gap:.75rem;grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
.shot{border-radius:12px;overflow:hidden;border:1px solid var(--line);background:#0b1520}
.shot img,.shot video{display:block;width:100%;height:auto}
.shot figcaption{padding:.45rem .6rem;font-size:.78rem;color:var(--muted);background:#fff}
.demo{position:relative;border-radius:14px;overflow:hidden;min-height:300px;border:1px solid var(--line)}
.demo-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.demo-card{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(280px,86%);padding:.85rem .9rem;border-radius:12px;border:1px solid rgba(224,184,58,.45);background:rgba(6,14,20,.28);backdrop-filter:blur(4px);color:#f3fafc}
.demo-card .y{color:#e0b83a;font-size:.82rem;margin:0 0 .35rem}
.demo-card .g{color:#86efac;font-size:.78rem;margin:0 0 .65rem}
.demo-card button{width:100%;border:0;border-radius:999px;padding:.65rem;font-weight:700;background:linear-gradient(135deg,#e2c56a,#c9a227);color:#0a1216;cursor:pointer}
.tag{display:inline-block;margin:.1rem .25rem .1rem 0;padding:.15rem .45rem;border-radius:6px;background:#eef5f6;font-size:.75rem}
table{width:100%;border-collapse:collapse;font-size:.9rem}
td,th{border-top:1px solid var(--line);padding:.45rem .35rem;text-align:left;vertical-align:top}
.foot{margin-top:1.5rem;font-size:.82rem;color:var(--muted);text-align:center}
.note{padding:.7rem .85rem;border-radius:10px;background:#fff8e8;border:1px solid rgba(201,162,39,.35);font-size:.9rem}
`

const day = new Date().toISOString().slice(0, 10)

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>市讯 · 本版本完整说明（可离线打开）</title>
<style>${css}</style>
</head>
<body>
<div class="wrap">
  <header class="hero">
    <img src="${assets.safari || ''}" alt="" />
    <div class="veil"></div>
    <div class="inner">
      <div class="badge">单文件 HTML · 可转发 · 含图/影片</div>
      <h1>市讯（Berita pasaran）完整版说明</h1>
      <p>本文件把当前版本的功能、流程、截图与演示素材打包进<strong>一个 HTML</strong>。双击即可用浏览器打开，无需 ZIP、无需安装。</p>
    </div>
  </header>

  <nav class="toc">
    <a href="#overview">概览</a>
    <a href="#flow">用户路径</a>
    <a href="#safari">Safari 门禁</a>
    <a href="#ad">广告门禁</a>
    <a href="#i18n">IP 语言</a>
    <a href="#market">行情</a>
    <a href="#content">知识/新闻</a>
    <a href="#media">照片与影片</a>
    <a href="#demo">互动演示</a>
    <a href="#tech">技术要点</a>
  </nav>

  <section id="overview">
    <h2>1. 版本概览</h2>
    <p>市讯是财经学习站：美股优先行情、知识库、站内新闻。本版本额外包含：</p>
    <ul>
      <li><strong>Safari 强制引导</strong>（非 Safari 不可进入，弹窗不可关闭）</li>
      <li><strong>进入前广告页</strong>（实时重大财经 + 点击后等待进入）</li>
      <li><strong>36 语种 / IP 自动语言</strong>（也可手动切换）</li>
      <li>行情约 30 秒刷新；新闻等内容包每日 08:00 / 20:00</li>
    </ul>
    <div class="note">开发预览：<code>http://localhost:5173/</code> · 同网以本机局域网 IP:5173 为准</div>
  </section>

  <section id="flow">
    <h2>2. 用户打开路径</h2>
    <ol>
      <li>任意 App / Chrome / 电脑浏览器打开 → <strong>Safari 门禁</strong>（已是 Safari 则跳过）</li>
      <li>本会话首次 → <strong>广告门禁</strong>（实时重大财经，点击进入，等待后进站；界面不显示秒数）</li>
      <li>进入首页：美股速览、入口、今日精选；导航：行情 / 知识 / 新闻</li>
    </ol>
  </section>

  <section id="safari">
    <h2>3. Safari 门禁</h2>
    <ul>
      <li>检测 Apple Safari（含 iPhone / iPad / Mac）；微信等内置浏览器、Chrome、电脑非 Safari 均拦截</li>
      <li>http / https 均可尝试 <code>x-safari-http(s)://</code> 唤起</li>
      <li>弹窗：股票上涨图背景、半透明卡片、居中；不可自行关闭</li>
      <li>文案跟 IP 语言；市场简称用 <strong>US</strong>（不是 AS）</li>
      <li>「Safari 打开后即可正常运行」视觉隐藏</li>
    </ul>
    <div class="grid">
      <figure class="shot"><img src="${assets.shot1 || ''}" alt="Safari 门禁截图" /><figcaption>Safari 门禁实机截图</figcaption></figure>
      <figure class="shot"><img src="${assets.safari || ''}" alt="上涨背景" /><figcaption>门禁背景：绿色上涨箭头行情图</figcaption></figure>
    </div>
  </section>

  <section id="ad">
    <h2>4. 广告门禁（进入财经前）</h2>
    <ul>
      <li>拉实时重大财经快讯，按冲击度选一条；失败用本地兜底</li>
      <li>标题摘要按 IP 语言翻译；超时回退本地化兜底，避免卡死</li>
      <li>点击后等待进入财经站（不显示秒数）</li>
      <li>本会话通过后不再拦截；清会话存储可再看</li>
    </ul>
    <div class="grid">
      <figure class="shot"><img src="${assets.shot2 || ''}" alt="广告页" /><figcaption>广告门禁（马来语示例）</figcaption></figure>
      <figure class="shot"><img src="${assets.ad || ''}" alt="广告背景素材" /><figcaption>广告视觉素材示例</figcaption></figure>
    </div>
  </section>

  <section id="i18n">
    <h2>5. IP 语言与内容本地化</h2>
    <ul>
      <li>约 36 种语言；默认跟 IP，可手动选语言</li>
      <li>导航、行情表头、广告/Safari 文案均跟语言</li>
      <li>知识/新闻：中英马来有内容包；其它语种英文化兜底</li>
      <li>图表日期轴跟站内语言，避免浏览器默认华文「7月」</li>
      <li>市场标签：US / A-shares / HK</li>
    </ul>
  </section>

  <section id="market">
    <h2>6. 行情看板</h2>
    <ul>
      <li>美股优先指数（道指 / 纳指 / 标普）+ A股 / 港股切换</li>
      <li>自选表、日 K，报价约 30 秒刷新</li>
      <li>东财 delay 源 + Yahoo 回退</li>
    </ul>
    <div class="grid">
      <figure class="shot"><img src="${assets.shot3 || ''}" alt="行情" /><figcaption>行情与自选（多语言）</figcaption></figure>
      <figure class="shot"><img src="${assets.shot4 || ''}" alt="首页指数" /><figcaption>首页美股速览</figcaption></figure>
    </div>
  </section>

  <section id="content">
    <h2>7. 知识库与新闻</h2>
    <ul>
      <li>知识长文、今日精选轮换</li>
      <li>新闻站内全文；专题含人物/财经快讯</li>
      <li>内容包每日 08:00 / 20:00 刷新两次</li>
    </ul>
  </section>

  <section id="media">
    <h2>8. 照片与影片（已内嵌）</h2>
    <p class="muted">以下素材已写入本 HTML，离线可看。发送本文件即可带走图与影片。</p>
    <div class="grid">
      ${
        videoB64
          ? `<figure class="shot"><video src="${videoB64}" controls playsinline autoplay muted loop></video><figcaption>影片：上涨行情氛围短片（可播放）</figcaption></figure>`
          : ''
      }
      <figure class="shot"><img src="${assets.hero || ''}" alt="市场英雄图" /><figcaption>照片：市场氛围图</figcaption></figure>
    </div>
  </section>

  <section id="demo">
    <h2>9. 互动演示（Safari 门禁样式）</h2>
    <p class="muted">仅样式演示，不改你的系统浏览器。</p>
    <div class="demo">
      <img class="demo-bg" src="${assets.safari || ''}" alt="" />
      <div class="demo-card">
        <p class="y">Pantau pergerakan indeks, saham panas dan momentum pasaran.</p>
        <p class="g">Petikan US · A-saham · Hong Kong serta berita kewangan dalam satu tempat.</p>
        <button type="button" id="demoBtn">Buka dengan Safari</button>
        <p id="demoHint" style="margin:.5rem 0 0;font-size:.75rem;color:#e2c56a;display:none">演示：真实站点会尝试唤起 Safari / 复制链接。</p>
      </div>
    </div>
  </section>

  <section id="tech">
    <h2>10. 技术要点（给开发）</h2>
    <table>
      <tr><th>项</th><th>说明</th></tr>
      <tr><td>栈</td><td>Vite + React + TypeScript</td></tr>
      <tr><td>Safari</td><td>SafariGate / utils/safari.ts</td></tr>
      <tr><td>广告</td><td>AdGatePage + adSpotlight</td></tr>
      <tr><td>语言</td><td>LocaleContext + catalog.json + IP 检测</td></tr>
      <tr><td>行情</td><td>useQuotes · em-push(delay) · Yahoo 回退</td></tr>
      <tr><td>规则</td><td>.cursor/rules/safari-gate.mdc</td></tr>
    </table>
    <h3>关键文件标签</h3>
    <p>
      <span class="tag">src/App.tsx</span>
      <span class="tag">SafariGate.tsx</span>
      <span class="tag">AdGatePage.tsx</span>
      <span class="tag">PriceChart.tsx</span>
      <span class="tag">catalog.json</span>
    </p>
  </section>

  <p class="foot">市讯完整版说明 · 单文件 HTML · 生成于 ${day} · 可直接发送此文件</p>
</div>
<script>
document.getElementById('demoBtn')?.addEventListener('click', function () {
  var h = document.getElementById('demoHint');
  if (h) h.style.display = 'block';
});
</script>
</body>
</html>`

const outPath = path.join(root, '市讯-完整版说明.html')
fs.writeFileSync(outPath, html)
console.log('wrote', outPath, (fs.statSync(outPath).size / 1e6).toFixed(2) + 'MB')
