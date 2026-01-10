// Content loading utilities for markdown files
// Simple implementation without external dependencies

// Event data structure
export interface EventData {
  slug: string
  title: string
  date: string
  month: string
  day: string
  year: string
  type: string
  category: 'job-fair' | 'workshop' | 'other'
  location: string
  time: string
  description: string
  details?: string[]
  featured?: boolean
}

// News data structure
export interface NewsData {
  slug: string
  title: string
  source: string
  excerpt: string
  url: string
  type: 'article' | 'video' | 'audio'
}

// Sample events data (in production, this would come from markdown files)
export const events: EventData[] = [
  {
    slug: 'nyc-winter-hiring-2025',
    title: 'NYC Winter Hiring Event',
    date: '2025-01-15',
    month: 'January',
    day: '15',
    year: '2025',
    type: 'Mega Job Fair',
    category: 'job-fair',
    location: 'Jacob Javits Center, NYC',
    time: '9:00 AM - 4:00 PM',
    description: 'Meet 50+ employers hiring across healthcare, retail, and hospitality. On-the-spot interviews available.',
    details: [
      'Bring multiple copies of your resume',
      'Professional attire required',
      'Free entry - registration recommended',
      'Interview prep available on-site',
    ],
    featured: true,
  },
  {
    slug: 'resume-masterclass-jan-2025',
    title: 'Resume Building Masterclass',
    date: '2025-01-22',
    month: 'January',
    day: '22',
    year: '2025',
    type: 'Workshop',
    category: 'workshop',
    location: 'America Works Brooklyn Office',
    time: '2:00 PM - 5:00 PM',
    description: 'Learn how to craft a resume that gets noticed. Our career specialists will work with you one-on-one.',
    details: [
      'Bring a draft resume if you have one',
      'Laptops available on-site',
      'Leave with a polished, job-ready resume',
    ],
  },
  {
    slug: 'healthcare-careers-feb-2025',
    title: 'Healthcare Careers Fair',
    date: '2025-02-03',
    month: 'February',
    day: '03',
    year: '2025',
    type: 'Hiring Event',
    category: 'job-fair',
    location: 'Baltimore Convention Center',
    time: '10:00 AM - 3:00 PM',
    description: 'Connect with hospitals, clinics, and healthcare facilities actively hiring.',
    details: [
      '20+ healthcare employers attending',
      'CNA, LPN, RN positions available',
      'Administrative and support roles',
      'Some employers hiring on the spot',
    ],
  },
  {
    slug: 'interview-bootcamp-feb-2025',
    title: 'Interview Skills Bootcamp',
    date: '2025-02-10',
    month: 'February',
    day: '10',
    year: '2025',
    type: 'Workshop',
    category: 'workshop',
    location: 'Virtual Event',
    time: '1:00 PM - 4:00 PM EST',
    description: 'Practice makes perfect. Join our intensive interview prep session with mock interviews.',
    details: [
      'Mock interview practice sessions',
      'Common question preparation',
      'Body language and presentation tips',
      'Zoom link sent after registration',
    ],
  },
  {
    slug: 'retail-hospitality-feb-2025',
    title: 'Retail & Hospitality Hiring Day',
    date: '2025-02-18',
    month: 'February',
    day: '18',
    year: '2025',
    type: 'Job Fair',
    category: 'job-fair',
    location: 'America Works Manhattan Office',
    time: '11:00 AM - 6:00 PM',
    description: 'Major retailers and hospitality brands are hiring for immediate opportunities.',
    details: [
      'Full-time and part-time positions',
      'Flexible scheduling available',
      'Entry-level friendly',
      'Same-day offers possible',
    ],
  },
  {
    slug: 'networking-night-mar-2025',
    title: 'Professional Networking Night',
    date: '2025-03-05',
    month: 'March',
    day: '05',
    year: '2025',
    type: 'Career Development',
    category: 'other',
    location: 'The Roosevelt Hotel, NYC',
    time: '6:00 PM - 9:00 PM',
    description: 'Build your professional network with industry professionals and recruiters.',
    details: [
      'Light refreshments provided',
      'Business casual attire',
      'Bring business cards if you have them',
      'Open to all career levels',
    ],
  },
]

// Sample news data
export const news: NewsData[] = [
  {
    slug: 'ticket-to-work-video',
    title: 'OPEN: Ticket to Work',
    source: 'YouTube',
    excerpt: 'Ticket To Work Representative in their Bronx Office join Bob Lee for a look at their upcoming ticket to work open house.',
    url: 'https://www.youtube.com/watch?v=C7qI0ppL_Iw&feature=youtu.be',
    type: 'video',
  },
  {
    slug: 'wsj-antipoverty-veteran',
    title: 'An Antipoverty Veteran Now Wages War on Dependency',
    source: 'Wall Street Journal',
    excerpt: 'Peter Cove dropped out of a graduate program at the University of Wisconsin-Madison more than 50 years ago...',
    url: 'https://www.wsj.com/articles/an-antipoverty-veteran-now-wages-war-on-dependency-1486512266',
    type: 'article',
  },
  {
    slug: 'american-radio-interview',
    title: "Lowman Henry's Newsmaker Interview",
    source: 'American Radio Journal',
    excerpt: 'Lowman Henry with Veronique De Rugy on Border Adjustment Tax - available in mp3 format for download.',
    url: 'http://americanradiojournal.com/commentary.php?id=1',
    type: 'audio',
  },
  {
    slug: 'nypost-foster-care',
    title: 'New hope for kids aging out of foster care',
    source: 'New York Post',
    excerpt: "'You learn things from the program. They teach you to write a resume, to talk in an interview. They teach you how to keep smiling,' says K...",
    url: 'http://nypost.com/2017/02/27/new-hope-for-kids-aging-out-of-foster-care/',
    type: 'article',
  },
  {
    slug: 'forbes-poverty-solutions',
    title: 'Progressives Need To Rethink Poverty Solutions',
    source: 'Forbes',
    excerpt: 'More than 50 years ago I entered the war on poverty as a foot soldier with all the eager enthusiasm one could muster. The attempt to eliminate p...',
    url: 'https://www.forbes.com/sites/realspin/2017/03/01/progressives-need-to-rethink-poverty-solutions/#7cab42c0797f',
    type: 'article',
  },
  {
    slug: 'pj-media-poor-no-more',
    title: "'Poor No More:' a Blueprint for Dismantling the 'Welfare Industrial Complex'",
    source: 'PJ Media',
    excerpt: "Has America lost the \"War on Poverty?\" Since 1964, the federal government has spent over $19 trillion on welfare programs, and all that money ha...",
    url: 'https://pjmedia.com/trending/2017/03/02/poor-no-more-a-blueprint-for-dismantling-the-welfare-industrial-complex/',
    type: 'article',
  },
  {
    slug: 'bloomberg-disability-work',
    title: 'U.S. Disability Programs Need a Work Requirement',
    source: 'Bloomberg',
    excerpt: 'The U.S. faces a social and fiscal crisis: Millions of Americans of prime working age do not have jobs, while the cost of federal disability pro...',
    url: 'https://www.bloomberg.com/view/articles/2017-03-10/u-s-disability-programs-need-a-work-requirement',
    type: 'article',
  },
  {
    slug: 'manhattan-institute-ticket',
    title: 'The Ticket to Work Program: Helping the Disabled to Achieve Self-Sufficiency',
    source: 'Manhattan Institute',
    excerpt: 'The Ticket to Work Program provides men and women on federal disability with a "ticket" or voucher that they can use to obtain free vocation...',
    url: 'https://www.manhattan-institute.org/html/ticket-work-program-10108.html',
    type: 'article',
  },
  {
    slug: 'pbs-ticket-to-work',
    title: 'Ticket to Work',
    source: 'PBS',
    excerpt: 'An exclusive new study says that Social Security\'s "Ticket to Work" is a winner! Find out how the program would be affected if President T...',
    url: 'http://www.pbs.org/video/2365977261/',
    type: 'video',
  },
  {
    slug: 'the-hill-disabled-employment',
    title: 'Helping the disabled to find work is next step to growing employment rate',
    source: 'The Hill',
    excerpt: 'President Trump consistently emphasizes growing employment...',
    url: 'http://thehill.com/blogs/pundits-blog/labor/325362-helping-the-disabled-to-find-work-is-next-step-to-growing-employment',
    type: 'article',
  },
]

// Helper functions to get content
export function getEvents(): EventData[] {
  return events
}

export function getEventsByCategory(category: EventData['category']): EventData[] {
  return events.filter(event => event.category === category)
}

export function getNews(): NewsData[] {
  return news
}

export function getNewsLinkLabel(type: NewsData['type']): string {
  switch (type) {
    case 'video':
      return 'Watch Video'
    case 'audio':
      return 'Listen Now'
    default:
      return 'Read Article'
  }
}
