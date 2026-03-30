import React from 'react'

export interface ChipProps {
  /** Chip label */
  children: React.ReactNode
  /** Whether the chip can be removed */
  onRemove?: () => void
  /** Whether the chip is in a selected/active state */
  selected?: boolean
  /** Called when chip is clicked (for filter chips) */
  onClick?: () => void
  /** Icon before label */
  icon?: React.ReactNode
  /** Disabled */
  disabled?: boolean
  /** Custom className */
  className?: string
}

/**
 * Chip
 *
 * Filter chips (clickable) or input chips (removable) for tags,
 * categories, and applied filters. Never used for navigation.
 *
 * @example
 * <Chip onRemove={() => removeTag('anxiety')} icon={<TagIcon />}>Anxiety</Chip>
 * <Chip selected onClick={() => toggleFilter('today')}>Today</Chip>
 */
export function Chip({
  children,
  onRemove,
  selected = false,
  onClick,
  icon,
  disabled = false,
  className,
}: ChipProps) {
  const isInteractive = !!onClick || !!onRemove
  const Tag = onClick ? 'button' : 'span'

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: onRemove ? '4px 6px 4px 10px' : '4px 12px',
        borderRadius: '20px',
        fontSize: '13px',
        fontWeight: 400,
        border: `1.5px solid ${selected ? '#3C7F8C' : '#D7D2C8'}`,
        background: selected ? '#D1E5E8' : '#F6F4F0',
        color: selected ? '#2D6473' : '#2F3134',
        fontFamily: 'inherit',
        opacity: disabled ? 0.45 : 1,
        transition: 'all 150ms ease',
        cursor: disabled ? 'not-allowed' : onClick ? 'pointer' : 'default',
      }}
    >
      {icon && <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}

      {onClick ? (
        <button
          onClick={disabled ? undefined : onClick}
          disabled={disabled}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            margin: 0,
            font: 'inherit',
            color: 'inherit',
            cursor: disabled ? 'not-allowed' : 'pointer',
            lineHeight: 1,
          }}
        >
          {children}
        </button>
      ) : (
        <span>{children}</span>
      )}

      {onRemove && (
        <button
          onClick={disabled ? undefined : onRemove}
          disabled={disabled}
          aria-label={`Remove ${typeof children === 'string' ? children : 'item'}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: selected ? 'rgba(60,127,140,0.15)' : 'rgba(0,0,0,0.06)',
            border: 'none',
            color: selected ? '#2D6473' : '#62666D',
            cursor: disabled ? 'not-allowed' : 'pointer',
            padding: 0,
            flexShrink: 0,
            transition: 'background 150ms ease',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M2 2L8 8M8 2L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </span>
  )
}
