import React, { useId } from 'react'

export interface CheckboxProps {
  /** The checkbox label */
  label: React.ReactNode
  /** Controlled checked state */
  checked?: boolean
  /** Default checked (uncontrolled) */
  defaultChecked?: boolean
  /** Called when state changes */
  onChange?: (checked: boolean) => void
  /** Indeterminate state — visually a dash, semantically "partial" */
  indeterminate?: boolean
  /** Hint text rendered below the label */
  hint?: string
  /** Error message — sets aria-invalid */
  error?: string
  /** Disabled state */
  disabled?: boolean
  /** Name for form submission */
  name?: string
  /** Value for form submission */
  value?: string
  /** Custom className on the root */
  className?: string
}

/**
 * Checkbox
 *
 * A single checkbox with label, hint, and error states.
 * Trauma-informed: unambiguous checked/unchecked affordance, never hides state
 * behind colour alone. Error messages are warm and non-blaming.
 *
 * SAMHSA principle: Trustworthiness & Transparency
 *
 * @example
 * <Checkbox
 *   label="I understand this section may be difficult to read"
 *   hint="You can close this at any time."
 *   onChange={setConsented}
 * />
 */
export function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  indeterminate = false,
  hint,
  error,
  disabled = false,
  name,
  value,
  className,
}: CheckboxProps) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`

  const ref = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate
  }, [indeterminate])

  const [localChecked, setLocalChecked] = React.useState(defaultChecked ?? false)
  const isControlled = checked !== undefined
  const isChecked = isControlled ? checked : localChecked
  const isActive = isChecked || indeterminate

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setLocalChecked(e.target.checked)
    onChange?.(e.target.checked)
  }

  return (
    <div
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: '4px', opacity: disabled ? 0.45 : 1 }}
    >
      <label
        htmlFor={id}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          minHeight: '44px',
          paddingTop: '4px',
        }}
      >
        {/* Hidden native input */}
        <input
          ref={ref}
          id={id}
          type="checkbox"
          name={name}
          value={value}
          checked={isControlled ? checked : undefined}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={[hint ? hintId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined}
          onChange={handleChange}
          style={{
            position: 'absolute',
            opacity: 0,
            width: 0,
            height: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Visual checkbox */}
        <span
          aria-hidden="true"
          style={{
            flexShrink: 0,
            width: '20px',
            height: '20px',
            marginTop: '1px',
            borderRadius: '5px',
            border: `2px solid ${error ? '#C39A4A' : isActive ? '#3C7F8C' : '#BDB8AE'}`,
            background: isActive ? '#3C7F8C' : '#F6F4F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 150ms ease',
            boxShadow: isActive ? '0 0 0 0px transparent' : 'none',
          }}
        >
          {indeterminate && !isChecked && (
            <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
              <rect width="10" height="2" rx="1" fill="white" />
            </svg>
          )}
          {isChecked && (
            <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
              <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>

        {/* Label + hint */}
        <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ fontSize: '14px', color: '#2F3134', lineHeight: 1.5 }}>{label}</span>
          {hint && !error && (
            <span id={hintId} style={{ fontSize: '12px', color: '#62666D', lineHeight: 1.5 }}>
              {hint}
            </span>
          )}
        </span>
      </label>

      {error && (
        <p
          id={errorId}
          role="alert"
          style={{ fontSize: '12px', color: '#8B6830', margin: '0 0 0 30px', lineHeight: 1.5, display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}
