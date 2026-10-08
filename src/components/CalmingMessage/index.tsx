import React from 'react'

export interface CalmingMessageProps {
  /**
   * The message body. Keep it warm, non-minimising, and non-clinical.
   * Avoid: "Don't worry!", "This is easy", "Just a few quick questions"
   * Prefer: "There's no right or wrong answer", "Take it at your pace"
   * See guidelines/ux-writing.md for the full language guide.
   */
  children: React.ReactNode
  /**
   * Estimated time shown beneath the message.
   * Time estimates reduce uncertainty — a key nervous system regulator.
   * Format: plain language e.g. "Takes about 2 minutes"
   */
  timeEstimate?: string
  /**
   * Colour variant.
   * - sage (default): primary calm — green-toned, for general use
   * - dust: warm neutral — for grief-adjacent or emotionally heavy content
   */
  variant?: 'sage' | 'dust'
  /** Additional className for the wrapper element */
  className?: string
  /** Additional inline styles */
  style?: React.CSSProperties
}

/**
 * CalmingMessage
 *
 * A nervous-system-aware message that orients users before difficult content.
 * Neither minimising ("don't worry!") nor clinically cold.
 *
 * SAMHSA principle: Trustworthiness & Transparency; Safety
 *
 * Neurobiological rationale: Predictability reduces threat appraisal.
 * Knowing what is coming — and roughly how long it will take — keeps the
 * nervous system out of the threat-scanning mode that distorts attention and
 * increases cognitive load. Time estimates are particularly effective:
 * they convert open-ended uncertainty into bounded expectation.
 *
 * Language note: This component's visual design is a container. The words
 * inside it matter more than the wrapper. See guidelines/ux-writing.md.
 *
 * Anti-patterns:
 * - "Don't worry, this won't take long" — minimising and inaccurate
 * - "Please answer all questions honestly" — implies users might deceive
 * - "Almost there!" — creates false urgency and possible disappointment
 *
 * @example
 * <CalmingMessage timeEstimate="Takes about 2 minutes">
 *   This next section asks about your pregnancy history. There's no right or
 *   wrong answer here — just take it at your pace.
 * </CalmingMessage>
 *
 * @example
 * <CalmingMessage variant="dust">
 *   Some people find this section brings up feelings. That's completely
 *   normal. You can pause and return any time.
 * </CalmingMessage>
 */
export function CalmingMessage({
  children,
  timeEstimate,
  variant = 'sage',
  className,
  style,
}: CalmingMessageProps) {
  return (
    <div
      data-ti-calming-message
      data-variant={variant}
      className={['ti-calming-message', className].filter(Boolean).join(' ')}
      style={style}
    >
      <div className="ti-calming-message__body">
        {children}
      </div>

      {timeEstimate && (
        <p className="ti-calming-message__time">
          <ClockIcon />
          {timeEstimate}
        </p>
      )}
    </div>
  )
}

function ClockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
