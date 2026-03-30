import React from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant. Use `destructive` for delete/remove/irreversible actions — never the same style as `primary`. */
  variant?: ButtonVariant
  /** Size. All sizes meet the 44px minimum touch target. */
  size?: ButtonSize
  /** Icon rendered before the label */
  iconBefore?: React.ReactNode
  /** Icon rendered after the label */
  iconAfter?: React.ReactNode
  /** Replaces content with a spinner and marks aria-busy */
  loading?: boolean
  children: React.ReactNode
}

const VARIANT_STYLES: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: '#3C7F8C',
    color: '#FFFFFF',
    border: '1.5px solid #3C7F8C',
  },
  secondary: {
    background: 'transparent',
    color: '#3C7F8C',
    border: '1.5px solid #3C7F8C',
  },
  destructive: {
    background: '#B06565',
    color: '#FFFFFF',
    border: '1.5px solid #B06565',
  },
  ghost: {
    background: 'transparent',
    color: '#62666D',
    border: '1.5px solid transparent',
  },
}

const VARIANT_HOVER: Record<ButtonVariant, React.CSSProperties> = {
  primary:     { background: '#2D6473', borderColor: '#2D6473' },
  secondary:   { background: '#D1E5E8', borderColor: '#3C7F8C' },
  destructive: { background: '#8C4C4C', borderColor: '#8C4C4C' },
  ghost:       { background: 'rgba(0,0,0,0.04)', borderColor: 'transparent' },
}

const SIZE_STYLES: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: '8px 14px', fontSize: '12px', minHeight: '36px', gap: '5px' },
  md: { padding: '10px 20px', fontSize: '14px', minHeight: '44px', gap: '7px' },
  lg: { padding: '13px 26px', fontSize: '15px', minHeight: '52px', gap: '8px' },
}

const Spinner = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    aria-hidden="true"
    style={{ animation: 'ti-spin 0.7s linear infinite' }}
  >
    <path d="M12 2a10 10 0 1 0 10 10" />
    <style>{`@keyframes ti-spin { to { transform: rotate(360deg); } }`}</style>
  </svg>
)

/**
 * Button
 *
 * The foundational interactive element. Four variants cover every action type:
 *
 * - `primary`     — positive, confirmatory, forward-moving actions (Submit, Save, Continue)
 * - `secondary`   — neutral alternatives (Cancel, Back, Edit)
 * - `destructive` — irreversible, removing, or high-consequence actions (Delete, Remove, Revoke)
 * - `ghost`       — low-priority tertiary actions
 *
 * ⚠️  Never use `primary` and `destructive` for both Submit and Delete in the same context.
 * The visual distinction is the user's only protection against accidental irreversible action.
 *
 * WCAG 2.5.3: Touch targets meet the 44px minimum height at `md` and `lg`.
 * WCAG 1.4.1: Variant is never communicated by colour alone — shape, label, and icon all differ.
 *
 * @example
 * <Button variant="primary" onClick={handleSubmit}>Submit response</Button>
 * <Button variant="destructive" iconBefore={<TrashIcon />} onClick={handleDelete}>Delete note</Button>
 */
export function Button({
  variant = 'primary',
  size = 'md',
  iconBefore,
  iconAfter,
  loading = false,
  disabled,
  children,
  style,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: ButtonProps) {
  const [hovered, setHovered] = React.useState(false)

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    fontFamily: 'inherit',
    fontWeight: 500,
    letterSpacing: '0.01em',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'background 150ms ease, border-color 150ms ease, opacity 150ms ease',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    outline: 'none',
    boxSizing: 'border-box',
    ...VARIANT_STYLES[variant],
    ...SIZE_STYLES[size],
    ...(hovered && !disabled && !loading ? VARIANT_HOVER[variant] : {}),
    ...style,
  }

  return (
    <button
      {...rest}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled}
      style={baseStyle}
      onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e) }}
      onMouseLeave={(e) => { setHovered(false); onMouseLeave?.(e) }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {iconBefore && <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>{iconBefore}</span>}
          {children}
          {iconAfter && <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>{iconAfter}</span>}
        </>
      )}
    </button>
  )
}
