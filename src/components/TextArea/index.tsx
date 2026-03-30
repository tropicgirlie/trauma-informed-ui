import React, { useId, useState } from 'react'

export interface TextAreaProps {
  /** Field label */
  label: string
  /** Current value (controlled) */
  value?: string
  /** Default value (uncontrolled) */
  defaultValue?: string
  /** Called on every keystroke */
  onChange?: (value: string) => void
  /** Placeholder */
  placeholder?: string
  /** Hint shown below the label */
  hint?: string
  /** Validation function — return a string to show an error */
  validate?: (value: string) => string | undefined
  /** When to run validation: blur (default) or change */
  validateOn?: 'blur' | 'change'
  /** Maximum character count — shows a counter */
  maxLength?: number
  /** Number of visible rows. Default: 4 */
  rows?: number
  /** Whether the field is required */
  required?: boolean
  /** Optional badge on the label */
  optional?: boolean
  /** Disabled state */
  disabled?: boolean
  /** name for form submission */
  name?: string
  /** Custom className */
  className?: string
  /** Explicitly mark as invalid (e.g. from server) */
  invalid?: boolean
  /** Error message for server-set errors */
  errorMessage?: string
}

/**
 * TextArea
 *
 * Multi-line text input. Mirrors SafeInput trauma-informed patterns:
 * warm validation language, no aggressive real-time errors, character
 * counter so users can self-pace without surprise.
 *
 * SAMHSA principle: Empowerment; Trustworthiness
 *
 * @example
 * <TextArea
 *   label="What would you like us to know?"
 *   hint="Share only what feels right. You can skip this."
 *   maxLength={500}
 *   rows={5}
 * />
 */
export function TextArea({
  label,
  value,
  defaultValue = '',
  onChange,
  placeholder,
  hint,
  validate,
  validateOn = 'blur',
  maxLength,
  rows = 4,
  required = false,
  optional = false,
  disabled = false,
  name,
  className,
  invalid: externalInvalid,
  errorMessage: externalError,
}: TextAreaProps) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`

  const [internalValue, setInternalValue] = useState(defaultValue)
  const [validationMsg, setValidationMsg] = useState<string | undefined>()
  const [touched, setTouched] = useState(false)
  const [focused, setFocused] = useState(false)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue
  const isInvalid = externalInvalid || (touched && !!validationMsg)
  const activeError = externalError || validationMsg

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value
    if (!isControlled) setInternalValue(v)
    onChange?.(v)
    if (validateOn === 'change' && touched) setValidationMsg(validate?.(v))
  }

  const handleBlur = () => {
    setFocused(false)
    setTouched(true)
    if (validateOn === 'blur') setValidationMsg(validate?.(currentValue))
  }

  const borderColor = focused
    ? '#3C7F8C'
    : isInvalid
    ? '#C39A4A'
    : '#D7D2C8'

  const remaining = maxLength !== undefined ? maxLength - currentValue.length : undefined

  return (
    <div
      className={className}
      data-ti-textarea
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

      {/* Textarea */}
      <div style={{ position: 'relative' }}>
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={isControlled ? value : undefined}
          defaultValue={!isControlled ? defaultValue : undefined}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          aria-invalid={isInvalid}
          aria-describedby={[hint ? hintId : '', isInvalid && activeError ? errorId : ''].filter(Boolean).join(' ') || undefined}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          style={{
            width: '100%',
            padding: '10px 14px',
            border: `1.5px solid ${borderColor}`,
            borderRadius: '12px',
            fontSize: '15px',
            fontFamily: 'inherit',
            color: '#2F3134',
            background: isInvalid ? '#F4EDDB' : '#F6F4F0',
            outline: 'none',
            resize: 'vertical',
            transition: 'border-color 150ms ease, background 150ms ease',
            opacity: disabled ? 0.45 : 1,
            cursor: disabled ? 'not-allowed' : 'text',
            lineHeight: 1.7,
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Footer row: error + counter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {isInvalid && activeError ? (
          <p
            id={errorId}
            role="alert"
            style={{ fontSize: '13px', color: '#8B6830', margin: 0, display: 'flex', alignItems: 'center', gap: '5px', lineHeight: 1.55 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {activeError}
          </p>
        ) : <span />}

        {maxLength !== undefined && (
          <span
            aria-live="polite"
            style={{
              fontSize: '12px',
              color: remaining !== undefined && remaining < 20 ? '#C39A4A' : '#8B8F96',
              flexShrink: 0,
              marginLeft: '8px',
            }}
          >
            {currentValue.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  )
}
