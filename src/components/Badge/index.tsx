import React from 'react'

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'accent'

export interface BadgeProps {
  /** Badge text */
  children: React.ReactNode
  /** Visual variant */
  variant?: BadgeVariant
  /** Show a dot indicator instead of text */
  dot?: boolean
  /** Icon before the label */
  icon?: React.ReactNode
  /** Custom className */
  className?: string
}

const BADGE_STYLES: Record<BadgeVariant, { bg: string; color: string; border: string }> = {
  default:  { bg: '#ECE7DF', color: '#62666D',  border: '#D7D2C8' },
  primary:  { bg: '#D1E5E8', color: '#2D6473',  border: '#3C7F8C' },
  success:  { bg: '#D6EAE0', color: '#2E6647',  border: '#4E8563' },
  warning:  { bg: '#F4EDDB', color: '#8B6830',  border: '#C39A4A' },
  danger:   { bg: '#F2E4E4', color: '#8C4C4C',  border: '#B06565' },
  accent:   { bg: '#E8E3F4', color: '#5B4D8A',  border: '#8C7BAF' },
}

/**
 * Badge
 *
 * A compact label for status, counts, or semantic categorisation.
 * Colour is never used as the sole differentiator — label text always
 * carries the meaning (WCAG 1.4.1).
 *
 * @example
 * <Badge variant="success">Saved</Badge>
 * <Badge variant="warning">Requires attention</Badge>
 */
export function Badge({ children, variant = 'default', dot = false, icon, className }: BadgeProps) {
  const { bg, color, border } = BADGE_STYLES[variant]

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: dot ? '3px 8px 3px 6px' : '2px 8px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 500,
        letterSpacing: '0.01em',
        background: bg,
        color: color,
        border: `1px solid ${border}`,
        lineHeight: 1.4,
        fontFamily: 'inherit',
      }}
    >
      {dot && (
        <span
          aria-hidden="true"
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: color,
            flexShrink: 0,
          }}
        />
      )}
      {icon && <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </span>
  )
}
