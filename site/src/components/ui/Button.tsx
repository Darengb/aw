import { ArrowRight } from 'lucide-react'
import type { ButtonProps, ButtonVariant } from '../../lib/types'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  white: 'btn-white',
  outline: 'btn-outline-white',
  link: 'btn-link',
}

export function Button({
  variant = 'primary',
  href,
  onClick,
  children,
  arrow = false,
  className = '',
}: ButtonProps) {
  const baseClasses = variantClasses[variant]
  const combinedClasses = `${baseClasses} ${className}`.trim()

  const content = (
    <>
      {children}
      {arrow && <ArrowRight className="w-4 h-4" />}
    </>
  )

  if (href) {
    return (
      <a href={href} className={combinedClasses}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={combinedClasses}>
      {content}
    </button>
  )
}
