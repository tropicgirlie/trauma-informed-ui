import React, { useState } from 'react'

export interface SafeInputProps {
  /** Input label */
  label: string
  /** Supporting hint text shown below the label */
  hint?: string
  /** Validation function — return a string message if invalid, undefined if valid */
  validate?: (value: string) => string | undefined
  /** Gentle message shown when validation fails — replaces harsh "Error: ..." patterns */
  validationMessage?: string
  /** Whether the field is optional. Default: false (shows "optional" badge if true) */
  optional?: boolean
  /** Input type */
  type?: 'text' | 'email' | 'tel' | 'number' | 'password' | 'url'
  /** Placeholder */
  placeholder?: string
  /** Controlled value */
  value?: string
  /** Change handler */
  onChange?: (value: string) => void
  /** Whether to validate on blur only (default) or on every change */
  validateOn?: 'blur' | 'change'
  /** Disable the input */
  disabled?: boolean
  /** Custom className */
  className?: string
  /** Name attribute */
  name?: string
}

/**
 * SafeInput
 *
 * A form field with trauma-informed validation. No red borders, no "Error!"
 * labels, no guilt-inducing language. Uses soft amber tones and plain
 * language to gently guide correction.
 *
 * SAMHSA principle: Safety; Empowerment
 * Neurobiological rationale: Harsh form validation (red borders, "Invalid!",
 * asterisks, shame-adjacent copy) triggers threat appraisal in users who
 * already carry shame about their ability to "do things right". Soft,
 * instructive feedback keeps the nervous system regulated.
 *
 * Design note: The field never turns red. Validation uses amber/dust tones
 * with language that describes what's needed, not what's wrong.
 *
 * @example
 * <SafeInput
 *   label="Email address"
 *   hint="We'll only use this to send your care plan."
 *   validate={(v) => !v.includes('@') ? 'Please include an @ in your email address.' : undefined}
 *   optional
 * />
 */
export function SafeInput({
  label,
  hint,
  validate,
  optional = false,
  type = 'text',
  placeholder,
  value: controlledValue,
  onChange,
  validateOn = 'blur',
  disabled = false,
  className,
  name,
}: SafeInputProps) {
  const [internalValue, setInternalValue] = useState('')
  const [validationMsg, setValidationMsg] = useState<string | undefined>()
  const [touched, setTouched] = useState(false)
  const [focused, setFocused] = useState(false)

  const value = controlledValue !== undefined ? controlledValue : internalValue

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    if (controlledValue === undefined) setInternalValue(v)
    onChange?.(v)
    if (validateOn === 'change' && touched) {
      setValidationMsg(validate?.(v))
    }
  }

  const handleBlur = () => {
    setFocused(false)
    setTouched(true)
    if (validateOn === 'blur') {
      setValidationMsg(validate?.(value))
    }
  }

  const isInvalid = touched && !!validationMsg
  const inputId = `safe-input-${label.toLowerCase().replace(/\s+/g, '-')}`

  const borderColor = focused
    ? '#3C7F8C'
    : isInvalid
    ? '#C39A4A'
    : '#D7D2C8'

  const bgColor = isInvalid ? '#F4EDDB' : '#F6F4F0'

  return (
    <div
      data-ti-safe-input
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: '5px', maxWidth: '380px' }}
    >
      {/* Label row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <label
          htmlFor={inputId}
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: disabled ? '#BDB8AE' : '#2F3134',
            fontFamily: 'inherit',
          }}
        >
          {label}
        </label>
        {optional && (
          <span
            style={{
              fontSize: '10px',
              padding: '1px 7px',
              borderRadius: '20px',
              background: '#D1E5E8',
              color: '#2D6473',
            }}
          >
            optional
          </span>
        )}
      </div>

      {/* Hint */}
      {hint && (
        <p
          style={{
            fontSize: '13px',
            color: '#62666D',
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          {hint}
        </p>
      )}

      {/* Input */}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={isInvalid}
        aria-describedby={isInvalid ? `${inputId}-msg` : undefined}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
        style={{
          padding: '10px 14px',
          border: `1.5px solid ${borderColor}`,
          borderRadius: '12px',
          fontSize: '15px',
          fontFamily: 'inherit',
          color: '#2F3134',
          background: bgColor,
          outline: 'none',
          transition: 'border-color 150ms ease, background 150ms ease',
          opacity: disabled ? 0.45 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
          width: '100%',
          boxSizing: 'border-box',
        }}
      />

      {/* Validation message — amber, instructive */}
      {isInvalid && validationMsg && (
        <p
          id={`${inputId}-msg`}
          role="alert"
          style={{
            fontSize: '13px',
            color: '#8B6830',
            margin: 0,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '5px',
            lineHeight: 1.55,
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ flexShrink: 0, marginTop: '1px' }}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {validationMsg}
        </p>
      )}
    </div>
  )
}
