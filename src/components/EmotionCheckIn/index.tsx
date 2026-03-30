import React, { useState } from 'react'
import { Button } from '../Button'

export interface EmotionOption {
  value: string
  label: string
  emoji: string
  color: string
  textColor: string
}

export interface EmotionCheckInProps {
  /** Question displayed above the scale */
  question?: string
  /** Custom emotion options — defaults to a 5-point calm-to-overwhelmed scale */
  options?: EmotionOption[]
  /** Called when an emotion is selected */
  onChange?: (value: string, option: EmotionOption) => void
  /** Called when the user submits their check-in */
  onSubmit?: (value: string, option: EmotionOption) => void
  /** Message shown after submission */
  completionMessage?: string
  /** Label for submit button */
  submitLabel?: string
  /** Whether to show the submit button. Default: true */
  showSubmit?: boolean
  /** Custom className */
  className?: string
}

const DEFAULT_OPTIONS: EmotionOption[] = [
  { value: 'calm', label: 'Calm', emoji: '😌', color: '#D1E5E8', textColor: '#2D6473' },
  { value: 'okay', label: 'Okay', emoji: '🙂', color: '#DCE8DA', textColor: '#4a6349' },
  { value: 'unsure', label: 'Unsure', emoji: '�', color: '#E8E3F4', textColor: '#5B4D8A' },
  { value: 'struggling', label: 'Struggling', emoji: '�', color: '#F4EDDB', textColor: '#8B6830' },
  { value: 'overwhelmed', label: 'Overwhelmed', emoji: '�', color: '#F2E4E4', textColor: '#8C4C4C' },
]

/**
 * EmotionCheckIn
 *
 * A non-clinical, visually warm mood check-in. No numbers, no clinical
 * labels — just a gentle, emoji-anchored scale from calm to overwhelmed.
 *
 * SAMHSA principle: Empowerment; Peer Support
 * Neurobiological rationale: Naming an emotion activates the prefrontal cortex
 * and reduces amygdala activation ("name it to tame it"). This component
 * creates a low-stakes, non-judgmental container for affect labelling.
 *
 * Design note: Never frame any option as wrong. The selected state should feel
 * like acknowledgement, not diagnosis.
 *
 * @example
 * <EmotionCheckIn
 *   question="How are you feeling right now?"
 *   onSubmit={(value) => logCheckIn(value)}
 * />
 */
export function EmotionCheckIn({
  question = 'How are you feeling right now?',
  options = DEFAULT_OPTIONS,
  onChange,
  onSubmit,
  completionMessage = 'Thank you for checking in. That takes courage.',
  submitLabel = 'Check in',
  showSubmit = true,
  className,
}: EmotionCheckInProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const selectedOption = options.find((o) => o.value === selected)

  const handleSelect = (option: EmotionOption) => {
    setSelected(option.value)
    onChange?.(option.value, option)
  }

  const handleSubmit = () => {
    if (!selected || !selectedOption) return
    setSubmitted(true)
    onSubmit?.(selected, selectedOption)
  }

  if (submitted && selectedOption) {
    return (
      <div
        data-ti-emotion-check-in
        className={className}
        role="status"
        style={{
          background: selectedOption.color,
          borderRadius: '20px',
          padding: '24px',
          maxWidth: '420px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '32px', marginBottom: '10px' }}>{selectedOption.emoji}</div>
        <p style={{ fontSize: '15px', fontWeight: 500, color: '#2F3134', margin: 0, lineHeight: 1.5 }}>
          {selectedOption.label}
        </p>
        <p style={{ fontSize: '13px', color: selectedOption.textColor, opacity: 0.8, margin: 0, lineHeight: 1.65 }}>
          {completionMessage}
        </p>
      </div>
    )
  }

  return (
    <div
      data-ti-emotion-check-in
      className={className}
      style={{
        background: '#ECE7DF',
        border: '1px solid #D7D2C8',
        borderRadius: '20px',
        padding: '24px',
        maxWidth: '360px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <p
        style={{
          fontSize: '15px',
          fontWeight: 500,
          color: '#2F3134',
          margin: '0 0 18px',
          lineHeight: 1.5,
        }}
      >
        {question}
      </p>

      <div
        role="group"
        aria-label="Emotion options"
        style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: showSubmit ? '18px' : 0 }}
      >
        {options.map((option) => {
          const isSelected = selected === option.value
          return (
            <button
              key={option.value}
              onClick={() => handleSelect(option)}
              aria-pressed={isSelected}
              aria-label={option.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '5px',
                padding: '12px 14px',
                border: `1.5px solid ${isSelected ? option.textColor : '#D7D2C8'}`,
                borderRadius: '14px',
                background: isSelected ? option.color : '#F6F4F0',
                cursor: 'pointer',
                fontFamily: 'inherit',
                flex: 1,
                minWidth: '64px',
                transition: 'all 150ms ease',
                transform: isSelected ? 'translateY(-2px)' : 'none',
                boxShadow: isSelected ? `0 4px 12px ${option.color}` : 'none',
              }}
            >
              <p style={{ fontSize: '13px', color: '#3C7F8C', margin: 0, lineHeight: 1.6 }}>{option.emoji}</p>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: isSelected ? 500 : 400,
                  color: isSelected ? option.textColor : '#62666D',
                  whiteSpace: 'nowrap',
                }}
              >
                {option.label}
              </span>
            </button>
          )
        })}
      </div>

      {showSubmit && (
        <Button
          variant="primary"
          size="md"
          onClick={handleSubmit}
          disabled={!selected}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {submitLabel}
        </Button>
      )}
    </div>
  )
}
