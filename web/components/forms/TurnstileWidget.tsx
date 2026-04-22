'use client'

import { forwardRef } from 'react'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'

interface TurnstileWidgetProps {
  onToken: (token: string | null) => void
}

export const TurnstileWidget = forwardRef<TurnstileInstance | null, TurnstileWidgetProps>(
  function TurnstileWidget({ onToken }, ref) {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    if (!siteKey) {
      console.error('[turnstile] NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set')
      return null
    }

    return (
      <Turnstile
        ref={ref}
        siteKey={siteKey}
        options={{ theme: 'light', size: 'normal' }}
        onSuccess={(token) => onToken(token)}
        onExpire={() => onToken(null)}
        onError={() => onToken(null)}
      />
    )
  }
)
