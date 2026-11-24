import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const index = path.join(dist, 'index.html')
const out = path.join(dist, '404.html')

if (!fs.existsSync(index)) {
  console.error('[spa-404] missing dist/index.html')
  process.exit(1)
}

// GitHub Pages：深层路径无实体文件时回落 404.html；内容与首页相同，交给 React Router
fs.copyFileSync(index, out)
console.log('[spa-404] wrote dist/404.html')
