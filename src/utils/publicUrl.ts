/** public/ 资源路径：兼容本地 `/` 与 GitHub Pages 子目录 base */
export function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  const clean = path.replace(/^\//, '')
  return `${base}${clean}`
}
