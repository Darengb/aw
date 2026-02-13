// Types and pure functions for content — safe for client components (no fs/path)

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

export interface OfficeLocation {
  title: string;
  address: string;
  city: string;
  state: string;
  stateCode: string;
  zip: string;
  phone: string;
  fax: string;
  email: string;
  notes: string;
  lat: number;
  lng: number;
  slug: string;
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
