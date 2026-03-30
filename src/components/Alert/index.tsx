import React from 'react'

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

const ALERT_CONFIG: Record<AlertVariant, {
  bg: string; border: string; titleColor: string; bodyColor: string; iconColor: string
}> = {
  info:    { bg: '#D1E5E8', border: '#3C7F8C', titleColor: '#1D4E58', bodyColor: '#2D6473', iconColor: '#3C7F8C' },
  success: { bg: '#D6EAE0', border: '#4E8563', titleColor: '#1A4A2E', bodyColor: '#2E6647', iconColor: '#4E8563' },
  warning: { bg: '#F4EDDB', border: '#C39A4A', titleColor: '#6B4E1A', bodyColor: '#8B6830', iconColor: '#C39A4A' },
  danger:  { bg: '#F2E4E4', border: '#B06565', titleColor: '#5C2A2A', bodyColor: '#8C4C4C', iconColor: '#B06565' },
}

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
  const { bg, border, titleColor, bodyColor, iconColor } = ALERT_CONFIG[variant]

  return (
    <div
      role="alert"
      className={className}
      style={{
        display: 'flex',
        gap: '12px',
        padding: '14px 16px',
        background: bg,
        border: `1px solid ${border}`,
        borderLeft: `4px solid ${border}`,
        borderRadius: inline ? 0 : '12px',
      }}
    >
      {/* Icon */}
      <span
        aria-hidden="true"
        style={{
          flexShrink: 0,
          color: iconColor,
          marginTop: '1px',
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        {icon ?? VARIANT_ICONS[variant]}
      </span>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <p style={{
            fontSize: '14px',
            fontWeight: 600,
            color: titleColor,
            margin: children ? '0 0 4px' : 0,
            lineHeight: 1.4,
          }}>
            {title}
          </p>
        )}
        <div style={{ fontSize: '14px', color: bodyColor, lineHeight: 1.7 }}>
          {children}
        </div>
      </div>

      {/* Dismiss */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          style={{
            flexShrink: 0,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: bodyColor,
            padding: '2px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'flex-start',
            opacity: 0.7,
            transition: 'opacity 150ms ease',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.7')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  )
}
