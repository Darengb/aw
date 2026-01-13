import fm from 'front-matter';

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
  content: string; // The markdown body content
  slug: string;
}

// Load all news articles from markdown files
export function getNewsArticles(): NewsArticle[] {
  const newsModules = import.meta.glob('/content/news/*.md', {
    eager: true,
    query: '?raw',
    import: 'default',
  }) as Record<string, string>;

  const articles: NewsArticle[] = [];

  for (const [path, content] of Object.entries(newsModules)) {
    const { attributes } = fm<Record<string, string>>(content);
    const slug = path.split('/').pop()?.replace('.md', '') || '';

    articles.push({
      title: attributes.title,
      source: attributes.source,
      excerpt: attributes.excerpt,
      url: attributes.url,
      linkText: attributes.linkText,
      slug,
    });
  }

  // Sort by filename (which starts with number)
  return articles.sort((a, b) => a.slug.localeCompare(b.slug));
}

// Load all events from markdown files
export function getEvents(): EventItem[] {
  const eventModules = import.meta.glob('/content/events/*.md', {
    eager: true,
    query: '?raw',
    import: 'default',
  }) as Record<string, string>;

  const events: EventItem[] = [];

  for (const [path, rawContent] of Object.entries(eventModules)) {
    const { attributes, body } = fm<Record<string, unknown>>(rawContent);
    const slug = path.split('/').pop()?.replace('.md', '') || '';

    events.push({
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
    });
  }

  // Sort by date
  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

// Parse markdown content to HTML-ready structure (bullet points)
export function parseEventContent(content: string): { intro: string; bullets: string[] } {
  const lines = content.split('\n').filter(line => line.trim());
  let intro = '';
  const bullets: string[] = [];

  for (const line of lines) {
    if (line.startsWith('- ')) {
      bullets.push(line.substring(2).trim());
    } else if (!bullets.length) {
      intro += (intro ? ' ' : '') + line.trim();
    }
  }

  return { intro, bullets };
}
