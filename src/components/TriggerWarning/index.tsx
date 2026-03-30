import React, { useState } from 'react'

export interface TriggerWarningProps {
  /** Short heading displayed in the warning gate */
  heading?: string
  /** The warning message body — warm, plain language, not clinical */
  message: string
  /** Tags/topics listed so user knows what to expect */
  topics?: string[]
  /** Label for the "continue" button */
  continueLabel?: string
  /** Label for the "skip" / exit option */
  skipLabel?: string
  /** Called when the user chooses to proceed */
  onContinue?: () => void
  /** Called when the user chooses to skip — handle navigation yourself */
  onSkip?: () => void
  /** The content revealed after acknowledgement */
  children: React.ReactNode
  /** Custom className for the gate card */
  className?: string
}

/**
 * TriggerWarning
 *
 * Gates sensitive content behind an explicit, warm acknowledgement step.
 * Unlike a generic "are you sure?" modal, it names the topics and
 * validates the user's autonomy over whether to continue.
 *
 * SAMHSA principle: Safety; Trustworthiness & Transparency
 * Neurobiological rationale: Named forewarning keeps prefrontal processing
 * online. The user can prepare or opt out — maintaining their window of
 * tolerance before encountering difficult material.
 *
 * @example
 * <TriggerWarning
 *   message="The following section discusses experiences of loss and grief."
 *   topics={['grief', 'loss', 'bereavement']}
 *   onSkip={() => router.push('/next-section')}
 * >
 *   <GriefContent />
 * </TriggerWarning>
 */
export function TriggerWarning({
  heading = 'A note before you continue',
  message,
  topics = [],
  continueLabel = 'I\'m ready to continue',
  skipLabel = 'Skip this section',
  onContinue,
  onSkip,
  children,
  className,
}: TriggerWarningProps) {
  const [acknowledged, setAcknowledged] = useState(false)

  const handleContinue = () => {
    setAcknowledged(true)
    onContinue?.()
  }

  if (acknowledged) {
    return <>{children}</>
  }

  return (
    <div
      data-ti-trigger-warning
      className={className}
      role="region"
      aria-label="Content warning"
      style={{
        background: '#ECE7DF',
        border: '1px solid #D7D2C8',
        borderRadius: '20px',
        padding: '28px 28px 24px',
        maxWidth: '460px',
      }}
    >
      {/* Icon */}
      <div
        aria-hidden="true"
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: '#D7D2C8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '14px',
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#62666D"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      <p
        style={{
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#C39A4A',
          marginBottom: '8px',
        }}
      >
        {heading}
      </p>

      <p
        style={{
          fontSize: '15px',
          fontWeight: 500,
          color: '#2F3134',
          marginBottom: '10px',
          lineHeight: 1.5,
        }}
      >
        {message}
      </p>

      {topics.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '20px',
          }}
        >
          {topics.map((topic) => (
            <span
              key={topic}
              style={{
                fontSize: '12px',
                padding: '3px 10px',
                borderRadius: '4px',
                background: '#D1E5E8',
                color: '#2D6473',
                border: '1px solid #D1E5E8',
              }}
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={handleContinue}
          style={{
            padding: '10px 20px',
            background: '#3C7F8C',
            color: '#FFFFFF',
            border: '1.5px solid #3C7F8C',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'inherit',
            minHeight: '44px',
            letterSpacing: '0.01em',
            transition: 'opacity 150ms ease',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.85')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
        >
          {continueLabel}
        </button>

        {onSkip && (
          <button
            onClick={onSkip}
            style={{
              padding: '10px 20px',
              background: 'transparent',
              color: '#3C7F8C',
              border: '1.5px solid #3C7F8C',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 400,
              cursor: 'pointer',
              fontFamily: 'inherit',
              minHeight: '44px',
              letterSpacing: '0.01em',
              transition: 'all 150ms ease',
            }}
          >
            {skipLabel}
          </button>
        )}
      </div>
    </div>
  )
}
