'use client'

interface ChatMessageProps {
  role: 'bot' | 'user'
  text: string
}

function renderLinkedText(text: string) {
  // Parse markdown-style links: [text](url)
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/)
  return parts.map((part, i) => {
    const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/)
    if (match) {
      return (
        <a
          key={i}
          href={match[2]}
          target={match[2].startsWith('/') ? undefined : '_blank'}
          rel={match[2].startsWith('/') ? undefined : 'noopener noreferrer'}
          className="underline font-medium"
        >
          {match[1]}
        </a>
      )
    }
    return <span key={i}>{part}</span>
  })
}

export default function ChatMessage({ role, text }: ChatMessageProps) {
  const isBot = role === 'bot'

  return (
    <div className={`chat-message-row ${isBot ? 'chat-message-row--bot' : 'chat-message-row--user'}`}>
      <div
        className={`chat-bubble ${isBot ? 'chat-bubble--bot' : 'chat-bubble--user'}`}
      >
        {text.split('\n').map((line, i) => (
          <p key={i} className={i > 0 ? 'mt-2' : ''}>
            {renderLinkedText(line)}
          </p>
        ))}
      </div>
    </div>
  )
}
