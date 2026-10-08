import * as Collapsible from '@radix-ui/react-collapsible'
import React, { useCallback, useState } from 'react'

export interface DisclosureCardProps {
  /** Label on the collapsed header. Be specific — vague labels reduce protective value. */
  label: string
  /** Warning shown before the content reveals. Warm, specific, non-clinical. 1-2 sentences. */
  warningText: string
  /** Short badge pill on the header e.g. "may be distressing", "clinical language" */
  badge?: string
  /** The sensitive content to reveal */
  children: React.ReactNode
  /** Whether the card starts expanded. Default: false */
  defaultOpen?: boolean
  /** Label for revealing the sensitive content after the warning is read. */
  revealLabel?: string
  /** Called when the user opens the card */
  onOpen?: () => void
  /** Called when the user closes the card */
  onClose?: () => void
  /** Additional className */
  className?: string
  /** Additional inline styles */
  style?: React.CSSProperties
}

/**
 * DisclosureCard
 *
 * Progressively reveals sensitive content within a section.
 * The user sees a specific, warm content warning before anything is shown.
 *
 * SAMHSA principle: Safety; Trustworthiness & Transparency
 *
 * Neurobiological rationale: Involuntary exposure to distressing content is
 * a threat signal that elevates cortisol and narrows attentional bandwidth.
 * Layered disclosure preserves the user's sense of control — which is itself
 * a nervous system regulator. The warning allows neurological preparation
 * before engagement, analogous to a therapist saying "I'm going to ask you
 * something difficult" before doing so.
 *
 * Different from ContentWarning:
 * - DisclosureCard: reveals a text section within a larger page
 * - ContentWarning: gates specific media (image, video) — fully hidden by default
 *
 * @example
 * <DisclosureCard
 *   label="Medication side effects"
 *   badge="may be distressing"
 *   warningText="This includes clinical descriptions. Take a moment if you need one."
 * >
 *   <p>Some people experience nausea during the first few weeks...</p>
 * </DisclosureCard>
 */
export function DisclosureCard({
  label,
  warningText,
  badge,
  children,
  defaultOpen = false,
  revealLabel = 'Show this section',
  onOpen,
  onClose,
  className,
  style,
}: DisclosureCardProps) {
  const [open, setOpen] = useState(defaultOpen)
  const [acknowledged, setAcknowledged] = useState(defaultOpen)

  const handleOpenChange = useCallback((next: boolean) => {
    setOpen(next)
    next ? onOpen?.() : onClose?.()
  }, [onOpen, onClose])

  return (
    <Collapsible.Root
      data-ti-disclosure-card
      data-open={open}
      open={open}
      onOpenChange={handleOpenChange}
      className={['ti-surface', 'ti-disclosure', className].filter(Boolean).join(' ')}
      style={style}
    >
      <Collapsible.Trigger className="ti-disclosure__trigger">
        <span className="ti-disclosure__label">
          {label}
          {badge && (
            <span className="ti-disclosure__badge">
              {badge}
            </span>
          )}
        </span>
        <ChevronIcon />
      </Collapsible.Trigger>

      <Collapsible.Content className="ti-disclosure__content">
        <p className="ti-disclosure__warning">{warningText}</p>
        {acknowledged ? (
          <div className="ti-disclosure__body">
            {children}
          </div>
        ) : (
          <div className="ti-disclosure__actions">
            <button
              className="ti-button ti-button--secondary"
              onClick={() => setAcknowledged(true)}
            >
              {revealLabel}
            </button>
          </div>
        )}
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

function ChevronIcon() {
  return (
    <svg
      className="ti-disclosure__chevron"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

// Preserve the earlier component-path imports used by existing consumers.
export { CalmingMessage } from '../CalmingMessage'
export type { CalmingMessageProps } from '../CalmingMessage'
export { PauseAware } from '../PauseAware'
export type { PauseAwareProps, PauseAwareAction } from '../PauseAware'
