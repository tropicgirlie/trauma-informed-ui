import React from 'react'

export type ProgressBarVariant = 'primary' | 'success' | 'warning' | 'danger'

export interface ProgressBarProps {
  /** 0–100 */
  value: number
  /** Max value. Default: 100 */
  max?: number
  /** Semantic variant */
  variant?: ProgressBarVariant
  /** Visible label above the bar */
  label?: string
  /** Show numeric percentage. Default: false */
  showValue?: boolean
  /** Accessible label for screen readers when no visible label */
  ariaLabel?: string
  /** Bar height. Default: '8px' */
  height?: string
  /** Animate the fill on mount */
  animate?: boolean
  /** Custom className */
  className?: string
}

const VARIANT_COLORS: Record<ProgressBarVariant, string> = {
  primary: '#3C7F8C',
  success: '#4E8563',
  warning: '#C39A4A',
  danger:  '#B06565',
}

/**
 * ProgressBar
 *
 * Linear progress indicator with accessible ARIA attributes.
 * Trauma-informed: shows orientation (how far through a process
 * someone is) without pressure — labels are informational, not
 * time-constrained ("Step 2 of 5", not "2 minutes left").
 *
 * @example
 * <ProgressBar value={40} label="Step 2 of 5" showValue />
 */
export function ProgressBar({
  value,
  max = 100,
  variant = 'primary',
  label,
  showValue = false,
  ariaLabel,
  height = '8px',
  animate = true,
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, (value / max) * 100))
  const color = VARIANT_COLORS[variant]

  return (
    <div
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
    >
      {(label || showValue) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {label && (
            <span style={{ fontSize: '13px', color: '#62666D', fontWeight: 500 }}>{label}</span>
          )}
          {showValue && (
            <span
              aria-hidden="true"
              style={{ fontSize: '12px', color: '#8B8F96', fontVariantNumeric: 'tabular-nums' }}
            >
              {Math.round(clamped)}%
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel ?? label ?? 'Progress'}
        style={{
          width: '100%',
          height,
          borderRadius: '99px',
          background: '#D7D2C8',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${clamped}%`,
            background: color,
            borderRadius: '99px',
            transition: animate ? 'width 400ms ease' : 'none',
          }}
        />
      </div>
    </div>
  )
}
