// Shared TypeScript interfaces for America Works site

// Theme types
export type Theme = 'red' | 'blue'

// Navigation types
export type NavState = 'top' | 'in-hero' | 'below-hero'

export interface NavLink {
  label: string
  href: string
}

export interface SecondaryNavConfig {
  links: NavLink[]
}

// Hero types
export interface HeroProps {
  title: string
  subtitle?: string
  label?: string
  backgroundImage?: string
  backgroundVideo?: string
  theme?: Theme
  children?: React.ReactNode
}

// Section types
export interface SectionHeaderProps {
  label?: string
  headline: string
  intro?: string
  centered?: boolean
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface ProcessGridProps {
  items: ProcessStep[]
  variant?: 'cards' | 'minimal'
}

export interface SplitSectionProps {
  reverse?: boolean
  blue?: boolean
  altBg?: boolean
  image: string
  imageAlt?: string
  children: React.ReactNode
}

export interface CTAProps {
  headline: string
  description: string
  primaryCta?: {
    label: string
    href: string
  }
  secondaryCta?: {
    label: string
    href: string
  }
  children?: React.ReactNode
}

// Card types
export interface TestimonialProps {
  quote: string
  author: string
  source?: string
}

export interface ValueCardProps {
  number: string
  title: string
  description: string
}

export interface RoleItemProps {
  icon: string
  label: string
}

export interface PathCardProps {
  title: string
  description: string
  href: string
  icon: string
}

export interface MetricCardProps {
  value: string | number
  label: string
  status?: 'active' | 'pending' | 'complete'
  animated?: boolean
}

export interface ValuePropProps {
  number: string
  title: string
  description: string
}

export interface PopulationItemProps {
  icon: string
  title: string
  description: string
}

// Grid types
export interface TrustItem {
  number: string
  label: string
}

export interface ListItem {
  icon: string
  text: string
}

export interface FeatureItem {
  icon: string
  title: string
  description: string
}

export interface GlanceItem {
  icon: string
  title: string
  description: string
}

export interface EvidenceItem {
  title: string
  description: string
  source?: string
}

export interface MatrixItem {
  title: string
  description: string
}

export interface ScorecardItem {
  title: string
  items: string[]
}

// Interactive types
export interface FAQItem {
  question: string
  answer: string
}

export interface ProgramItem {
  label: string
  content: string
}

export interface CaseStudy {
  id: string
  name: string
  videoSrc?: string
  content: React.ReactNode
}

export interface TimelineItem {
  year: string
  title: string
  description: string
}

// Button types
export type ButtonVariant = 'primary' | 'secondary' | 'white' | 'outline' | 'link'

export interface ButtonProps {
  variant?: ButtonVariant
  href?: string
  onClick?: () => void
  children: React.ReactNode
  arrow?: boolean
  className?: string
}

// Content types (for markdown loading)
export interface ContentMeta {
  title: string
  date: string
  description?: string
  link?: string
}

export interface ContentItem {
  slug: string
  meta: ContentMeta
  content: string
}
