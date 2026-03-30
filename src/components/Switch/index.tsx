import React, { useId } from 'react'

export interface SwitchProps {
  /** Visible label */
  label: React.ReactNode
  /** Controlled on/off state */
  checked?: boolean
  /** Default state (uncontrolled) */
  defaultChecked?: boolean
  /** Called when state changes */
  onChange?: (checked: boolean) => void
  /** Explicit on/off text for screen readers and sighted users */
  onLabel?: string
  offLabel?: string
  /** Hint text */
  hint?: string
  /** Disabled */
  disabled?: boolean
  /** name for form submission */
  name?: string
  /** Custom className */
  className?: string
}

/**
 * Switch
 *
 * A toggle control. Always shows explicit on/off text — never relies on
 * position or colour alone (WCAG 1.4.1). Trauma-informed: the user can
 * clearly see and understand what the switch will do before touching it.
 *
 * SAMHSA principle: Trustworthiness & Transparency; Empowerment
 *
 * @example
 * <Switch
 *   label="Receive follow-up messages"
 *   hint="We will only contact you about what you share today."
 *   onLabel="On"
 *   offLabel="Off"
 *   onChange={setEnabled}
 * />
 */
export function Switch({
  label,
  checked,
  defaultChecked = false,
  onChange,
  onLabel = 'On',
  offLabel = 'Off',
  hint,
  disabled = false,
  name,
  className,
}: SwitchProps) {
  const id = useId()
  const hintId = `${id}-hint`
  const [localChecked, setLocalChecked] = React.useState(defaultChecked)
  const isControlled = checked !== undefined
  const isOn = isControlled ? checked : localChecked

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setLocalChecked(e.target.checked)
    onChange?.(e.target.checked)
  }

  return (
    <div
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: '4px', opacity: disabled ? 0.45 : 1 }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          minHeight: '44px',
        }}
      >
        {/* Label side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <label
            htmlFor={id}
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#2F3134',
              lineHeight: 1.5,
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
          >
            {label}
          </label>
          {hint && (
            <span id={hintId} style={{ fontSize: '12px', color: '#62666D', lineHeight: 1.5 }}>
              {hint}
            </span>
          )}
        </div>

        {/* Switch track + thumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <span
            style={{
              fontSize: '12px',
              color: isOn ? '#62666D' : '#3C7F8C',
              fontWeight: isOn ? 400 : 500,
              minWidth: '20px',
              textAlign: 'right',
              transition: 'color 150ms ease',
            }}
            aria-hidden="true"
          >
            {offLabel}
          </span>

          <label
            htmlFor={id}
            aria-hidden="true"
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              width: '44px',
              height: '26px',
              cursor: disabled ? 'not-allowed' : 'pointer',
              flexShrink: 0,
            }}
          >
            <input
              id={id}
              type="checkbox"
              role="switch"
              name={name}
              checked={isControlled ? checked : undefined}
              defaultChecked={!isControlled ? defaultChecked : undefined}
              disabled={disabled}
              aria-checked={isOn}
              aria-describedby={hint ? hintId : undefined}
              onChange={handleChange}
              style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
            />
            {/* Track */}
            <span
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '13px',
                background: isOn ? '#3C7F8C' : '#D7D2C8',
                transition: 'background 200ms ease',
              }}
            />
            {/* Thumb */}
            <span
              style={{
                position: 'absolute',
                left: isOn ? '20px' : '3px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#FFFFFF',
                boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
                transition: 'left 200ms ease',
              }}
            />
          </label>

          <span
            style={{
              fontSize: '12px',
              color: isOn ? '#3C7F8C' : '#62666D',
              fontWeight: isOn ? 500 : 400,
              minWidth: '20px',
              transition: 'color 150ms ease',
            }}
            aria-hidden="true"
          >
            {onLabel}
          </span>
        </div>
      </div>
    </div>
  )
}
