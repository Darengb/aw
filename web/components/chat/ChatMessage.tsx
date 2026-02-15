'use client'

interface ChatMessageProps {
  role: 'bot' | 'user'
  text: string
}

function renderInlineMarkdown(text: string) {
  // Parse markdown links [text](url) and bold **text**
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/)
  return parts.map((part, i) => {
    const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/)
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target={linkMatch[2].startsWith('/') ? undefined : '_blank'}
          rel={linkMatch[2].startsWith('/') ? undefined : 'noopener noreferrer'}
          className="underline font-medium"
        >
          {linkMatch[1]}
        </a>
      )
    }
    const boldMatch = part.match(/^\*\*(.+)\*\*$/)
    if (boldMatch) {
      return <strong key={i}>{boldMatch[1]}</strong>
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
            {renderInlineMarkdown(line)}
          </p>
        ))}
      </div>
    </div>
  )
}
