import { useTranslated } from '../i18n/useTranslated'

/** 显示会随当前语言翻译的动态正文（知识/新闻标题与段落） */
export function TranslatedText({
  text,
  as: Tag = 'span',
  className,
}: {
  text: string
  as?: 'span' | 'p' | 'strong' | 'h1' | 'h2' | 'h3' | 'em'
  className?: string
}) {
  const { value } = useTranslated(text)
  return <Tag className={className}>{value}</Tag>
}
