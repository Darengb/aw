import { useScrollProgress } from '../../hooks/useScrollProgress'
import type { Theme } from '../../lib/types'

interface ScrollProgressBarProps {
  theme?: Theme
}

export function ScrollProgressBar({ theme = 'red' }: ScrollProgressBarProps) {
  const progress = useScrollProgress()

  const themeClass = theme === 'blue' ? 'theme-blue' : 'theme-red'

  return (
    <div
      className={`scroll-progress-bar ${themeClass}`}
      style={{ transform: `scaleX(${progress})` }}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}

export default ScrollProgressBar
