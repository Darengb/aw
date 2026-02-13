import fs from 'fs'
import path from 'path'
import fm from 'front-matter'

const contentDir = path.join(process.cwd(), 'content')

// Types for content
export interface NewsArticle {
  title: string;
  source: string;
  excerpt: string;
  url: string;
  linkText: string;
  slug: string;
}

export interface EventItem {
  title: string;
  type: string;
  category: string;
  featured: boolean;
  date: string;
  month: string;
  day: string;
  year: string;
  time: string;
  location: string;
  description: string;
  content: string;
  slug: string;
}

// Load all news articles from markdown files
export function getNewsArticles(): NewsArticle[] {
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
export function getEvents(): EventItem[] {
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

// Parse markdown content to HTML-ready structure (bullet points)
export function parseEventContent(content: string): { intro: string; bullets: string[] } {
  const lines = content.split('\n').filter(line => line.trim())
  let intro = ''
  const bullets: string[] = []

  for (const line of lines) {
    if (line.startsWith('- ')) {
      bullets.push(line.substring(2).trim())
    } else if (!bullets.length) {
      intro += (intro ? ' ' : '') + line.trim()
    }
  }

  return { intro, bullets }
}
