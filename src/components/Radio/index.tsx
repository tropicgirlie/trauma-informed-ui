import React, { createContext, useContext, useId } from 'react'

// ─── Context ───────────────────────────────────────────────────────────────

interface RadioGroupCtx {
  name: string
  value: string | undefined
  onChange: (value: string) => void
  disabled?: boolean
  error?: string
}

const RadioGroupContext = createContext<RadioGroupCtx | null>(null)

// ─── RadioGroup ─────────────────────────────────────────────────────────────

export interface RadioGroupProps {
  /** Group label rendered as a legend */
  legend: React.ReactNode
  /** Controlled selected value */
  value?: string
  /** Default value (uncontrolled) */
  defaultValue?: string
  /** Called when selection changes */
  onChange?: (value: string) => void
  /** Shared name attribute for all radios */
  name?: string
  /** Hint text */
  hint?: string
  /** Error message */
  error?: string
  /** Disabled all radios in the group */
  disabled?: boolean
  children: React.ReactNode
  /** Custom className */
  className?: string
}

/**
 * RadioGroup
 *
 * Wraps Radio items in a fieldset/legend with shared state.
 * Trauma-informed: group provides orientation ("what is this for?")
 * before each option, reducing cognitive load.
 *
 * @example
 * <RadioGroup legend="How would you like to continue?" onChange={setValue}>
 *   <Radio value="now" label="Continue now" />
 *   <Radio value="later" label="Save and come back later" />
 *   <Radio value="exit" label="Exit safely" />
 * </RadioGroup>
 */
export function RadioGroup({
  legend,
  value,
  defaultValue,
  onChange,
  name,
  hint,
  error,
  disabled,
  children,
  className,
}: RadioGroupProps) {
  const id = useId()
  const groupName = name ?? id
  const [localValue, setLocalValue] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const activeValue = isControlled ? value : localValue

  const handleChange = (v: string) => {
    if (!isControlled) setLocalValue(v)
    onChange?.(v)
  }

  return (
    <RadioGroupContext.Provider value={{ name: groupName, value: activeValue, onChange: handleChange, disabled, error }}>
      <fieldset
        className={className}
        style={{ border: 'none', padding: 0, margin: 0 }}
        aria-describedby={hint ? `${id}-hint` : undefined}
      >
        <legend
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: '#2F3134',
            marginBottom: hint ? '4px' : '12px',
            padding: 0,
            lineHeight: 1.5,
          }}
        >
          {legend}
        </legend>

        {hint && (
          <p
            id={`${id}-hint`}
            style={{ fontSize: '12px', color: '#62666D', margin: '0 0 12px', lineHeight: 1.5 }}
          >
            {hint}
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {children}
        </div>

        {error && (
          <p
            role="alert"
            style={{
              fontSize: '12px',
              color: '#8B6830',
              margin: '8px 0 0',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              lineHeight: 1.5,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </p>
        )}
      </fieldset>
    </RadioGroupContext.Provider>
  )
}

// ─── Radio ──────────────────────────────────────────────────────────────────

export interface RadioProps {
  /** The value this radio represents */
  value: string
  /** Visible label */
  label: React.ReactNode
  /** Hint text below label */
  hint?: string
  /** Override disabled from group */
  disabled?: boolean
  /** Custom className */
  className?: string
}

/**
 * Radio
 *
 * A single radio option — must be used inside RadioGroup.
 *
 * @example
 * <Radio value="yes" label="Yes, I'm ready to continue" />
 */
export function Radio({ value, label, hint, disabled: ownDisabled, className }: RadioProps) {
  const id = useId()
  const ctx = useContext(RadioGroupContext)
  if (!ctx) throw new Error('Radio must be used inside RadioGroup')

  const isDisabled = ownDisabled ?? ctx.disabled
  const isSelected = ctx.value === value

  return (
    <label
      htmlFor={id}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.45 : 1,
        minHeight: '44px',
        paddingTop: '4px',
      }}
    >
      <input
        id={id}
        type="radio"
        name={ctx.name}
        value={value}
        checked={isSelected}
        disabled={isDisabled}
        onChange={() => ctx.onChange(value)}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
      />

      {/* Visual radio */}
      <span
        aria-hidden="true"
        style={{
          flexShrink: 0,
          width: '20px',
          height: '20px',
          marginTop: '1px',
          borderRadius: '50%',
          border: `2px solid ${ctx.error ? '#C39A4A' : isSelected ? '#3C7F8C' : '#BDB8AE'}`,
          background: '#F6F4F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'border-color 150ms ease',
        }}
      >
        {isSelected && (
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#3C7F8C',
              transition: 'transform 150ms ease',
            }}
          />
        )}
      </span>

      <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span style={{ fontSize: '14px', color: '#2F3134', lineHeight: 1.5 }}>{label}</span>
        {hint && (
          <span style={{ fontSize: '12px', color: '#62666D', lineHeight: 1.5 }}>{hint}</span>
        )}
      </span>
    </label>
  )
}
