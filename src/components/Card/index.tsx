import React from 'react'

export type CardVariant = 'default' | 'outlined' | 'elevated' | 'filled'

export interface CardProps {
  /** Visual variant */
  variant?: CardVariant
  /** Optional header slot */
  header?: React.ReactNode
  /** Optional footer slot */
  footer?: React.ReactNode
  /** Makes the entire card a clickable link/button area */
  onClick?: () => void
  /** href — renders a link card */
  href?: string
  /** Disable hover/active effects when onClick/href is set */
  disabled?: boolean
  /** Padding override. Default: '20px 24px' */
  padding?: string
  /** Custom className */
  className?: string
  children: React.ReactNode
}

const CARD_VARIANTS: Record<CardVariant, React.CSSProperties> = {
  default:  { background: '#ECE7DF', border: '1px solid #D7D2C8', boxShadow: 'none' },
  outlined: { background: 'transparent', border: '1.5px solid #D7D2C8', boxShadow: 'none' },
  elevated: { background: '#ECE7DF', border: '1px solid #D7D2C8', boxShadow: '0 2px 12px rgba(47,49,52,0.08)' },
  filled:   { background: '#E4DDD4', border: '1px solid #BDB8AE', boxShadow: 'none' },
}

/**
 * Card
 *
 * A flexible surface container. Supports header, body, and footer slots.
 * Can be made interactive (clickable) while maintaining clear affordance.
 *
 * @example
 * <Card
 *   variant="elevated"
 *   header={<h3>Support options</h3>}
 *   footer={<Button variant="primary">Learn more</Button>}
 * >
 *   <p>These resources are available to you at any time.</p>
 * </Card>
 */
export function Card({
  variant = 'default',
  header,
  footer,
  onClick,
  href,
  disabled = false,
  padding = '20px 24px',
  className,
  children,
}: CardProps) {
  const baseStyle = CARD_VARIANTS[variant]
  const isInteractive = (!!onClick || !!href) && !disabled

  const containerStyle: React.CSSProperties = {
    ...baseStyle,
    borderRadius: '20px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'inherit',
    color: '#2F3134',
    opacity: disabled ? 0.5 : 1,
    cursor: isInteractive ? 'pointer' : 'default',
    transition: isInteractive ? 'box-shadow 150ms ease, transform 100ms ease' : 'none',
    textDecoration: 'none',
  }

  const content = (
    <>
      {header && (
        <div
          style={{
            padding,
            borderBottom: '1px solid #D7D2C8',
            fontSize: '15px',
            fontWeight: 600,
            color: '#2F3134',
            lineHeight: 1.4,
          }}
        >
          {header}
        </div>
      )}

      <div style={{ padding, flex: 1 }}>
        {children}
      </div>

      {footer && (
        <div
          style={{
            padding,
            borderTop: '1px solid #D7D2C8',
            background: '#E4DDD4',
          }}
        >
          {footer}
        </div>
      )}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={className}
        style={containerStyle}
        onMouseEnter={(e) => isInteractive && Object.assign((e.currentTarget as HTMLElement).style, { boxShadow: '0 4px 20px rgba(47,49,52,0.12)', transform: 'translateY(-1px)' })}
        onMouseLeave={(e) => isInteractive && Object.assign((e.currentTarget as HTMLElement).style, { boxShadow: baseStyle.boxShadow, transform: 'none' })}
      >
        {content}
      </a>
    )
  }

  if (onClick) {
    return (
      <button
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={className}
        style={{ ...containerStyle, textAlign: 'left', width: '100%', border: baseStyle.border as string }}
        onMouseEnter={(e) => isInteractive && Object.assign((e.currentTarget as HTMLElement).style, { boxShadow: '0 4px 20px rgba(47,49,52,0.12)', transform: 'translateY(-1px)' })}
        onMouseLeave={(e) => isInteractive && Object.assign((e.currentTarget as HTMLElement).style, { boxShadow: typeof baseStyle.boxShadow === 'string' ? baseStyle.boxShadow : 'none', transform: 'none' })}
      >
        {content}
      </button>
    )
  }

  return (
    <div className={className} style={containerStyle}>
      {content}
    </div>
  )
}
