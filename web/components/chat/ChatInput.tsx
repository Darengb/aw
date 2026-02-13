'use client'

import { useState } from 'react'
import type { InputType, ButtonOption, FormField } from '@/app/api/chat/types'
import { Send, Check } from 'lucide-react'

interface ChatInputProps {
  inputType: InputType
  buttons?: ButtonOption[]
  formFields?: FormField[]
  isLoading: boolean
  onSend: (value: string) => void
  placeholder?: string
}

export default function ChatInput({
  inputType,
  buttons,
  formFields,
  isLoading,
  onSend,
  placeholder,
}: ChatInputProps) {
  const [textValue, setTextValue] = useState('')
  const [formValues, setFormValues] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set())
  const [otherText, setOtherText] = useState('')

  if (inputType === 'none') {
    return (
      <div className="chat-input-area">
        <button
          className="chat-option-btn"
          onClick={() => onSend('start_over')}
          disabled={isLoading}
        >
          Start over
        </button>
      </div>
    )
  }

  if (inputType === 'buttons' && buttons) {
    return (
      <div className="chat-input-area">
        <div className="chat-buttons-group">
          {buttons.map((btn) => (
            <button
              key={btn.value}
              className="chat-option-btn"
              onClick={() => onSend(btn.value)}
              disabled={isLoading}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (inputType === 'multi-select' && buttons) {
    const toggle = (value: string) => {
      setSelectedOptions((prev) => {
        const next = new Set(prev)
        if (next.has(value)) next.delete(value)
        else next.add(value)
        return next
      })
    }

    const handleSubmit = () => {
      const values = Array.from(selectedOptions).map((v) =>
        v === 'Other' && otherText.trim() ? `Other: ${otherText.trim()}` : v
      )
      if (values.length > 0) {
        onSend(values.join(','))
        setSelectedOptions(new Set())
        setOtherText('')
      }
    }

    return (
      <div className="chat-input-area">
        <div className="chat-multiselect-group">
          {buttons.map((btn) => (
            <button
              key={btn.value}
              className={`chat-toggle-btn ${selectedOptions.has(btn.value) ? 'active' : ''}`}
              onClick={() => toggle(btn.value)}
              disabled={isLoading}
            >
              {selectedOptions.has(btn.value) && <Check size={14} className="mr-1.5" />}
              {btn.label}
            </button>
          ))}
        </div>
        {selectedOptions.has('Other') && (
          <input
            type="text"
            className="chat-text-field mt-2"
            placeholder="Please specify..."
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            disabled={isLoading}
          />
        )}
        <button
          className="chat-send-btn mt-2"
          onClick={handleSubmit}
          disabled={isLoading || selectedOptions.size === 0}
        >
          Submit
        </button>
      </div>
    )
  }

  if (inputType === 'text') {
    const handleSend = () => {
      if (textValue.trim()) {
        onSend(textValue.trim())
        setTextValue('')
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    }

    return (
      <div className="chat-input-area">
        <div className="chat-text-input-row">
          <textarea
            className="chat-text-field"
            rows={1}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder ?? 'Type your message...'}
            disabled={isLoading}
          />
          <button
            className="chat-send-icon"
            onClick={handleSend}
            disabled={isLoading || !textValue.trim()}
            aria-label="Send"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    )
  }

  if (inputType === 'form' && formFields) {
    const handleFormSubmit = () => {
      setFormError('')
      const missing = formFields.filter(
        (f) => f.required && !formValues[f.name]?.trim()
      )
      if (missing.length > 0) {
        setFormError('Please fill in all required fields.')
        return
      }
      // Phone validation
      const phoneField = formFields.find((f) => f.type === 'tel')
      if (phoneField) {
        const digits = (formValues[phoneField.name] ?? '').replace(/\D/g, '')
        if (digits.length < 10) {
          setFormError('Please enter a valid phone number (10 digits).')
          return
        }
      }
      // Send as pipe-separated: "fullName|phone"
      const values = formFields.map((f) => formValues[f.name]?.trim() ?? '')
      onSend(values.join('|'))
      setFormValues({})
    }

    return (
      <div className="chat-input-area">
        <div className="chat-form-group">
          {formFields.map((field) => (
            <div key={field.name} className="chat-form-field">
              <label className="chat-form-label">
                {field.label} {field.required && '*'}
              </label>
              <input
                type={field.type}
                className="chat-text-field"
                value={formValues[field.name] ?? ''}
                onChange={(e) =>
                  setFormValues((prev) => ({ ...prev, [field.name]: e.target.value }))
                }
                disabled={isLoading}
                placeholder={field.type === 'tel' ? '(555) 555-5555' : ''}
              />
            </div>
          ))}
          {formError && <p className="chat-form-error">{formError}</p>}
          <button
            className="chat-send-btn"
            onClick={handleFormSubmit}
            disabled={isLoading}
          >
            Submit
          </button>
        </div>
      </div>
    )
  }

  return null
}
