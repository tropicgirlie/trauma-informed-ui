import React, { useState } from 'react'

export type ContentWarningCategory =
  | 'violence'
  | 'sexual'
  | 'medical'
  | 'grief'
  | 'abuse'
  | 'suicide'
  | 'discrimination'
  | 'custom'

export interface ContentWarningProps {
  /**
   * The category of content — used to generate a default label if
   * warningLabel is not provided.
   */
  category?: ContentWarningCategory
  /**
   * Override the warning label entirely.
   * If omitted, a default is derived from category.
   */
  warningLabel?: string
  /**
   * Additional context shown beneath the label — plain language, warm tone.
   * Optional. Keep short: one sentence maximum.
   * Example: "This section includes clinical descriptions of self-harm."
   */
  detail?: string
  /**
   * The content to reveal when the user chooses to proceed.
   * Typically: images, video, detailed text about sensitive events.
   */
  children: React.ReactNode
  /**
   * Label on the reveal button.
   * Default: "Show this section"
   */
  revealLabel?: string
  /**
   * Whether the content is shown by default (no warning gate).
   * Use for users who have already acknowledged the warning this session.
   * Default: false
   */
  defaultRevealed?: boolean
  /**
   * Called when the user chooses to reveal the content.
   * Use to persist the acknowledgement for this session.
   */
  onReveal?: () => void
  /**
   * Optional label for a non-reveal path. If omitted, plain reassurance is shown
   * instead of a fake action.
   */
  skipLabel?: string
  /** Called when the optional skip action is selected. */
  onSkip?: () => void
  /** Additional className */
  className?: string
  /** Additional inline styles */
  style?: React.CSSProperties
}

const categoryLabels: Record<ContentWarningCategory, string> = {
  violence: 'Contains descriptions of violence',
  sexual: 'Contains sexual content',
  medical: 'Contains medical descriptions',
  grief: 'Contains content about loss and grief',
  abuse: 'Contains descriptions of abuse',
  suicide: 'Contains content about suicide and self-harm',
  discrimination: 'Contains descriptions of discrimination',
  custom: 'Contains sensitive content',
}

/**
 * ContentWarning
 *
 * Gates sensitive media or text behind an explicit acknowledgement.
 * The user sees a warm, specific warning and chooses whether to proceed.
 * The content is never shown without consent.
 *
 * SAMHSA principle: Safety; Empowerment, Voice & Choice
 *
 * Neurobiological rationale: Surprise is a primary threat signal. Involuntary
 * exposure to disturbing content — even a single image — can trigger a stress
 * response that persists throughout the session and reduces cognitive capacity.
 * Content warnings allow the user to prepare neurologically before engaging,
 * keeping them within their window of tolerance.
 *
 * Research note: The CHI 2023 paper "Click Here to Exit" found that content
 * warnings are present on 80.3% of DV support sites but implementations vary
 * widely in specificity and warmth. Vague warnings ("sensitive content") are
 * less effective than specific ones ("descriptions of physical violence").
 *
 * This component is different from DisclosureCard:
 * - ContentWarning: gates a specific piece of media or text (image, video,
 *   detailed account). The default state is hidden.
 * - DisclosureCard: progressively reveals a section of content. The default
 *   state is collapsed but the label describes what's inside.
 *
 * Anti-patterns:
 * - "Warning: this may be upsetting" — too vague to allow preparation
 * - A checkbox "I confirm I am 18+" — wrong pattern, wrong purpose
 * - Auto-revealing after 3 seconds — removes agency
 * - Hiding the reveal button — creates coercive pressure to proceed
 *
 * @example
 * <ContentWarning
 *   category="medical"
 *   detail="This section includes images of surgical wounds."
 *   onReveal={() => sessionStorage.setItem('medical-images-acknowledged', 'true')}
 * >
 *   <img src="/wound-care-guide.jpg" alt="Wound care demonstration" />
 * </ContentWarning>
 */
export function ContentWarning({
  category = 'custom',
  warningLabel,
  detail,
  children,
  revealLabel = 'Show this section',
  defaultRevealed = false,
  onReveal,
  skipLabel,
  onSkip,
  className,
  style,
}: ContentWarningProps) {
  const [revealed, setRevealed] = useState(defaultRevealed)

  const label = warningLabel ?? categoryLabels[category]

  const handleReveal = () => {
    setRevealed(true)
    onReveal?.()
  }

  if (revealed) {
    return (
      <div data-ti-content-warning data-revealed className={className} style={style} aria-live="polite">
        {children}
      </div>
    )
  }

  return (
    <div
      data-ti-content-warning
      data-revealed="false"
      className={['ti-content-warning', className].filter(Boolean).join(' ')}
      style={style}
    >
      <div className="ti-content-warning__header">
        <ShieldIcon />
        <div>
          <p className="ti-content-warning__title">
            {label}
          </p>
          {detail && (
            <p className="ti-content-warning__detail">
              {detail}
            </p>
          )}
        </div>
      </div>

      <div className="ti-content-warning__actions">
        <button
          onClick={handleReveal}
          className="ti-button ti-button--secondary"
        >
          {revealLabel}
        </button>
        {onSkip && skipLabel ? (
          <button onClick={onSkip} className="ti-button ti-button--quiet">
            {skipLabel}
          </button>
        ) : (
          <span className="ti-content-warning__skip">You can leave this section unopened.</span>
        )}
      </div>
    </div>
  )
}

function ShieldIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ color: 'var(--ti-color-dust)', flexShrink: 0, marginTop: '1px' }}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}
