import { createHighlighter } from 'shiki'

let highlighter: any = null

export async function useHighlight(
  code: string,
  lang = 'js',
  theme = 'github-dark'
) {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: [theme],
      langs: [lang],
    })
  }

  return highlighter.codeToHtml(code, { lang, theme })
}
