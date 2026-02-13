'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { MessageCircle, X, ArrowLeft } from 'lucide-react'
import type { ChatState, ChatMemory, InputType, ButtonOption, FormField } from '@/app/api/chat/types'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'

interface Message {
  role: 'bot' | 'user'
  text: string
}

interface PersistedChat {
  chatState: ChatState
  memory: ChatMemory
  messages: Message[]
  currentInputType: InputType
  currentButtons?: ButtonOption[]
  currentFormFields?: FormField[]
}

const STORAGE_KEY = 'aw-chat'

const INITIAL_BUTTONS: ButtonOption[] = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
  { label: 'Not sure', value: 'not_sure' },
]

function getPlaceholder(chatState: ChatState): string {
  if (chatState === 'ASK_STATE') return 'Type your state (e.g. New York)...'
  return 'Type your message...'
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [chatState, setChatState] = useState<ChatState>('ASK_SERVED_BEFORE')
  const [memory, setMemory] = useState<ChatMemory>({})
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Have you ever been served by America Works before?' },
  ])
  const [currentInputType, setCurrentInputType] = useState<InputType>('buttons')
  const [currentButtons, setCurrentButtons] = useState<ButtonOption[] | undefined>(INITIAL_BUTTONS)
  const [currentFormFields, setCurrentFormFields] = useState<FormField[] | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Restore from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved) {
        const data: PersistedChat = JSON.parse(saved)
        setChatState(data.chatState)
        setMemory(data.memory)
        setMessages(data.messages)
        setCurrentInputType(data.currentInputType)
        setCurrentButtons(data.currentButtons)
        setCurrentFormFields(data.currentFormFields)
      }
    } catch {
      // Ignore parse errors
    }
    setHydrated(true)
  }, [])

  // Persist to sessionStorage on state change
  useEffect(() => {
    if (!hydrated) return
    try {
      const data: PersistedChat = {
        chatState,
        memory,
        messages,
        currentInputType,
        currentButtons,
        currentFormFields,
      }
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      // Ignore storage errors
    }
  }, [hydrated, chatState, memory, messages, currentInputType, currentButtons, currentFormFields])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Lock body scroll on mobile when open
  useEffect(() => {
    if (isOpen && window.innerWidth < 640) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleSend = useCallback(
    async (userText: string) => {
      // Don't show user message for "start_over" in DONE state
      const showUserMessage = chatState !== 'DONE' || userText !== 'start_over'

      // Map button values to display labels for user messages
      let displayText = userText
      if (currentButtons) {
        const btn = currentButtons.find((b) => b.value === userText)
        if (btn) displayText = btn.label
      }

      if (showUserMessage) {
        setMessages((prev) => [...prev, { role: 'user', text: displayText }])
      }

      setIsLoading(true)

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ state: chatState, memory, userText }),
        })

        const data = await res.json()

        if (data.error) {
          setMessages((prev) => [
            ...prev,
            { role: 'bot', text: 'Something went wrong. Please try again.' },
          ])
        } else {
          setChatState(data.state)
          setMemory(data.memory)
          setMessages((prev) => [...prev, { role: 'bot', text: data.reply }])
          setCurrentInputType(data.inputType)
          setCurrentButtons(data.buttons)
          setCurrentFormFields(data.formFields)
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            text: "I'm having trouble connecting. Please try again or contact us at (212) 252-6900.",
          },
        ])
      } finally {
        setIsLoading(false)
      }
    },
    [chatState, memory, currentButtons]
  )

  if (!hydrated) return null

  // Collapsed launcher
  if (!isOpen) {
    return (
      <button
        className="chat-launcher"
        onClick={() => setIsOpen(true)}
        aria-label="Chat with us"
        title="Chat with us"
      >
        <MessageCircle size={28} strokeWidth={2} />
      </button>
    )
  }

  // Expanded panel
  return (
    <div className="chat-panel">
      {/* Header */}
      <div className="chat-header">
        <button
          className="chat-header-close sm:hidden"
          onClick={() => setIsOpen(false)}
          aria-label="Close chat"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="chat-header-title">America Works</span>
        <button
          className="chat-header-close hidden sm:flex"
          onClick={() => setIsOpen(false)}
          aria-label="Close chat"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} text={msg.text} />
        ))}
        {isLoading && (
          <div className="chat-message-row chat-message-row--bot">
            <div className="chat-bubble chat-bubble--bot">
              <div className="chat-typing">
                <span /><span /><span />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput
        inputType={currentInputType}
        buttons={currentButtons}
        formFields={currentFormFields}
        isLoading={isLoading}
        onSend={handleSend}
        placeholder={getPlaceholder(chatState)}
      />
    </div>
  )
}
