import fs from 'fs'

const files = [
  'src/pages/KnowledgeArticlePage.tsx',
  'src/pages/NewsArticlePage.tsx',
  'src/pages/HomePage.tsx',
  'src/components/Layout.tsx',
  'src/components/KnowledgeSection.tsx',
  'src/components/NewsSection.tsx',
  'src/components/home/HomeTodayPicks.tsx',
  'src/components/home/HomeEntrances.tsx',
]

for (const f of files) {
  let s = fs.readFileSync(f, 'utf8')
  s = s.replace(/\s*target="_blank"/g, '')
  s = s.replace(/\s*rel="noopener noreferrer"/g, '')
  s = s.replace(
    /\{\.\.\.\(item\.to === '\/market'\s*\? \{\}\s*: \{ target: '_blank', rel: 'noopener noreferrer' \}\)\}/g,
    '',
  )
  fs.writeFileSync(f, s)
  console.log('cleaned', f)
}
