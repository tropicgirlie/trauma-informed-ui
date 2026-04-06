import React from 'react'
import { FEEDBACK_TOKENS } from '../../tokens'

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger'

export interface AlertProps {
  /** Semantic variant */
  variant?: AlertVariant
  /** Short title line */
  title?: string
  /** Body content */
  children: React.ReactNode
  /** Show a dismiss button */
  onDismiss?: () => void
  /** Icon override — defaults to variant icon */
  icon?: React.ReactNode
  /** Render as a compact inline banner (no border-radius) */
  inline?: boolean
  /** Custom className */
  className?: string
}

const ALERT_CONFIG = FEEDBACK_TOKENS

const VARIANT_ICONS: Record<AlertVariant, React.ReactNode> = {
  info: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  success: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  danger: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
}

/**
 * Alert
 *
 * Inline feedback banners for info, success, warning, and critical states.
 * Trauma-informed: no alarm red, never flashing, always dismissible.
 * "Danger" uses desaturated rose — critical without triggering threat response.
 *
 * Carbon Design System-aligned anatomy:
 * - Gradient background for depth without harshness
 * - Left accent border (4px) + full surrounding border (1px)
 * - Icon always shown (never hidden)
 * - Dismiss button always fully visible (not opacity-dependent)
 * - Title and body in a column with clear hierarchy
 *
 * SAMHSA principle: Safety; Trustworthiness
 *
 * @example
 * <Alert variant="warning" title="Take a moment">
 *   The next section contains descriptions of medical procedures.
 * </Alert>
 */
export function Alert({
  variant = 'info',
  title,
  children,
  onDismiss,
  icon,
  inline = false,
  className,
}: AlertProps) {
  const { gradient, border, titleColor, bodyColor, iconColor } = ALERT_CONFIG[variant]

  return (
    <div
      role="alert"
      className={className}
      style={{
        display: 'flex',
        gap: '12px',
        padding: '16px 20px',
        background: gradient,
        border: `1px solid ${border}`,
        borderLeft: `4px solid ${border}`,
        borderTopLeftRadius: inline ? 0 : '3px',
        borderBottomLeftRadius: inline ? 0 : '3px',
        borderTopRightRadius: inline ? 0 : '12px',
        borderBottomRightRadius: inline ? 0 : '12px',
        alignItems: 'flex-start',
      }}
    >
      {/* Icon — always shown */}
      <span
        aria-hidden="true"
        style={{
          flexShrink: 0,
          color: iconColor,
          marginTop: '2px',
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        {icon ?? VARIANT_ICONS[variant]}
      </span>

      {/* Content — title and body in column for clear hierarchy */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {title && (
          <p style={{
            fontSize: '14px',
            fontWeight: 600,
            color: titleColor,
            margin: 0,
            lineHeight: 1.4,
          }}>
            {title}
          </p>
        )}
        <div style={{ fontSize: '14px', color: bodyColor, lineHeight: 1.7 }}>
          {children}
        </div>
      </div>

      {/* Dismiss — always fully visible, hover shows background tint */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss alert"
          style={{
            flexShrink: 0,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: bodyColor,
            padding: '4px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'flex-start',
            opacity: 1,
            transition: 'background 150ms ease',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.07)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'none')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  )
}
