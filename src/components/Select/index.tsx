import React, { useId, useState } from 'react'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  /** Field label */
  label: string
  /** Options list */
  options: SelectOption[]
  /** Controlled value */
  value?: string
  /** Default value (uncontrolled) */
  defaultValue?: string
  /** Called when selection changes */
  onChange?: (value: string) => void
  /** Placeholder option shown when nothing selected */
  placeholder?: string
  /** Hint shown below label */
  hint?: string
  /** Validation error */
  error?: string
  /** Optional badge on label */
  optional?: boolean
  /** Required */
  required?: boolean
  /** Disabled */
  disabled?: boolean
  /** Name for form submission */
  name?: string
  /** Custom className */
  className?: string
}

/**
 * Select
 *
 * A styled native `<select>` element. Uses native browser UX for
 * maximum accessibility — screen readers, keyboard users, and touch
 * all get the correct behaviour without custom logic.
 *
 * Trauma-informed: always includes an empty/placeholder option so
 * the user is never forced into a pre-selected value they didn't choose.
 *
 * SAMHSA principle: Empowerment; Trustworthiness
 *
 * @example
 * <Select
 *   label="Preferred contact method"
 *   options={[{ value: 'email', label: 'Email' }, { value: 'phone', label: 'Phone' }]}
 *   placeholder="Choose one — or skip this field"
 *   optional
 * />
 */
export function Select({
  label,
  options,
  value,
  defaultValue = '',
  onChange,
  placeholder = 'Choose an option',
  hint,
  error,
  optional = false,
  required = false,
  disabled = false,
  name,
  className,
}: SelectProps) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const [focused, setFocused] = useState(false)
  const [touched, setTouched] = useState(false)

  const isInvalid = touched && !!error

  const borderColor = focused
    ? '#3C7F8C'
    : isInvalid
    ? '#C39A4A'
    : '#D7D2C8'

  return (
    <div
      className={className}
      data-ti-select
      style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
    >
      {/* Label row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <label
          htmlFor={id}
          style={{ fontSize: '14px', fontWeight: 500, color: disabled ? '#BDB8AE' : '#2F3134', fontFamily: 'inherit' }}
        >
          {label}
          {required && <span aria-hidden="true" style={{ color: '#C39A4A', marginLeft: '3px' }}>*</span>}
        </label>
        {optional && (
          <span style={{ fontSize: '10px', padding: '1px 7px', borderRadius: '4px', background: '#D1E5E8', color: '#2D6473' }}>
            optional
          </span>
        )}
      </div>

      {hint && !isInvalid && (
        <p id={hintId} style={{ fontSize: '13px', color: '#62666D', margin: 0, lineHeight: 1.6 }}>{hint}</p>
      )}

      {/* Select wrapper — custom chevron via CSS background */}
      <div style={{ position: 'relative' }}>
        <select
          id={id}
          name={name}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          disabled={disabled}
          required={required}
          aria-invalid={isInvalid}
          aria-describedby={[hint ? hintId : '', isInvalid ? errorId : ''].filter(Boolean).join(' ') || undefined}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); setTouched(true) }}
          style={{
            width: '100%',
            padding: '10px 40px 10px 14px',
            border: `1.5px solid ${borderColor}`,
            borderRadius: '12px',
            fontSize: '15px',
            fontFamily: 'inherit',
            color: '#2F3134',
            background: '#F6F4F0',
            outline: 'none',
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            transition: 'border-color 150ms ease',
            opacity: disabled ? 0.45 : 1,
            cursor: disabled ? 'not-allowed' : 'pointer',
            minHeight: '44px',
            boxSizing: 'border-box',
          }}
        >
          <option value="" disabled={required}>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Chevron icon */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: disabled ? '#BDB8AE' : '#62666D',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>

      {isInvalid && error && (
        <p
          id={errorId}
          role="alert"
          style={{ fontSize: '13px', color: '#8B6830', margin: 0, display: 'flex', alignItems: 'center', gap: '5px', lineHeight: 1.55 }}
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
