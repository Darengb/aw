interface FeatureListProps {
  items: string[]
  className?: string
}

export function FeatureList({ items, className = '' }: FeatureListProps) {
  return (
    <ul className={`feature-list ${className}`.trim()}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}
