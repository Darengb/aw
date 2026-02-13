import fs from 'fs'
import path from 'path'
import fm from 'front-matter'

// Re-export types and pure functions from client-safe module
export type { NewsArticle, EventItem } from './content-shared'
export { parseEventContent } from './content-shared'

const contentDir = path.join(process.cwd(), 'content')

// Load all news articles from markdown files
export function getNewsArticles() {
  const dir = path.join(contentDir, 'news')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort()

  return files.map(file => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { attributes } = fm<Record<string, string>>(raw)
    const slug = file.replace('.md', '')
    return {
      title: attributes.title,
      source: attributes.source,
      excerpt: attributes.excerpt,
      url: attributes.url,
      linkText: attributes.linkText,
      slug,
    }
  })
}

// Load all events from markdown files
export function getEvents() {
  const dir = path.join(contentDir, 'events')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort()

  return files.map(file => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { attributes, body } = fm<Record<string, unknown>>(raw)
    const slug = file.replace('.md', '')
    return {
      title: attributes.title as string,
      type: attributes.type as string,
      category: attributes.category as string,
      featured: (attributes.featured as boolean) || false,
      date: attributes.date as string,
      month: attributes.month as string,
      day: attributes.day as string,
      year: attributes.year as string,
      time: attributes.time as string,
      location: attributes.location as string,
      description: attributes.description as string,
      content: body.trim(),
      slug,
    }
  })
}
