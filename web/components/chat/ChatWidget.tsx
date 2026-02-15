'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { MessageCircle, X, RotateCcw } from 'lucide-react'
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
    { role: 'bot', text: 'Hi! I am here to help you. Before we start, I have a quick question: **Have you ever received services from America Works?**' },
  ])
  const [currentInputType, setCurrentInputType] = useState<InputType>('buttons')
  const [currentButtons, setCurrentButtons] = useState<ButtonOption[] | undefined>(INITIAL_BUTTONS)
  const [currentFormFields, setCurrentFormFields] = useState<FormField[] | undefined>()
  const [offerConnect, setOfferConnect] = useState(false)
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
      // Don't show user message for internal triggers
      const showUserMessage =
        userText !== '__connect_to_support' &&
        (chatState !== 'DONE' || userText !== 'start_over')

      setOfferConnect(false)

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
          body: JSON.stringify({ state: chatState, memory, userText, messages }),
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
          setOfferConnect(!!data.offerConnect)
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
        <span className="chat-launcher-label">Chat with us</span>
        <span className="chat-launcher-icon">
          <MessageCircle size={28} strokeWidth={2} />
        </span>
      </button>
    )
  }

  // Expanded panel
  return (
    <div className="chat-panel">
      {/* Header */}
      <div className="chat-header">
        <button
          className="chat-header-clear"
          onClick={() => {
            setChatState('ASK_SERVED_BEFORE')
            setMemory({})
            setMessages([{ role: 'bot', text: 'Hi! I am here to help you. Before we start, I have a quick question: **Have you ever received services from America Works?**' }])
            setCurrentInputType('buttons')
            setCurrentButtons(INITIAL_BUTTONS)
            setCurrentFormFields(undefined)
            setOfferConnect(false)
          }}
          aria-label="Clear chat"
          title="Clear chat"
        >
          <RotateCcw size={16} />
          <span>Clear</span>
        </button>
        <span className="chat-header-title">America Works</span>
        <button
          className="chat-header-close"
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
        {offerConnect && !isLoading && (
          <div className="chat-message-row chat-message-row--bot">
            <button
              className="chat-connect-btn"
              onClick={() => handleSend('__connect_to_support')}
            >
              Click here for live support
            </button>
          </div>
        )}
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
