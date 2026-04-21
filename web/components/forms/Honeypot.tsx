'use client'

import { useCallback, useRef } from 'react'

const hiddenStyle: React.CSSProperties = {
  position: 'absolute',
  left: '-5000px',
  top: 'auto',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
}

interface HoneypotFieldProps {
  inputRef: React.RefObject<HTMLInputElement | null>
}

export function HoneypotField({ inputRef }: HoneypotFieldProps) {
  return (
    <div style={hiddenStyle} aria-hidden="true">
      <label htmlFor="hp-website">Website</label>
      <input
        ref={inputRef}
        id="hp-website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  )
}

export function useHoneypot() {
  const trapRef = useRef<HTMLInputElement | null>(null)
  const renderedAt = useRef<number>(Date.now())

  const isLikelyBot = useCallback(() => {
    if (trapRef.current?.value?.trim()) return true
    if (Date.now() - renderedAt.current < 2000) return true
    return false
  }, [])

  return { trapRef, isLikelyBot }
}
