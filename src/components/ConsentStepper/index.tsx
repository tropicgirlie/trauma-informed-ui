import React, { useCallback, useState } from 'react'
import { Button } from '../Button'

export interface ConsentStep {
  /** The question asked at this step */
  question: string
  /** Contextual hint — plain language, no legal jargon */
  hint?: string
  /** Array of choices. User selects exactly one. */
  options: ConsentOption[]
}

export interface ConsentOption {
  /** The label displayed to the user */
  label: string
  /** The semantic value stored on selection */
  value: string
  /** Whether this option should be styled as a warning/cautionary choice */
  caution?: boolean
}

export interface ConsentStepResult {
  stepIndex: number
  question: string
  selectedValue: string
  selectedLabel: string
}

export interface ConsentStepperProps {
  /** Array of consent steps to present in sequence */
  steps: ConsentStep[]
  /** Called when all steps are completed with all results */
  onComplete: (results: ConsentStepResult[]) => void
  /** Called when the user changes their answer on a previous step */
  onStepChange?: (stepIndex: number, result: ConsentStepResult) => void
  /** Completion message heading. Default: "All done" */
  completionHeading?: string
  /** Completion message body. Default: "Your choices are saved." */
  completionBody?: string
  /** Label for back button. Default: "← Go back" */
  backLabel?: string
  /** Label for next button. Default: "Continue" */
  nextLabel?: string
  /** Custom className */
  className?: string
}

/**
 * ConsentStepper
 *
 * Presents granular consent decisions one at a time. Never bundles choices.
 * Every step is reversible — back is always available.
 *
 * SAMHSA principle: Voice & Choice; Empowerment
 * Neurobiological rationale: Bundled consent collapses agency into a single
 * moment of overwhelm. Sequential, isolated decisions keep the user in their
 * window of tolerance by reducing cognitive and emotional load per interaction.
 *
 * Design note: Language in hints should be plain, warm, and free of legal
 * framing. See guidelines/ux-writing.md for the full language guide.
 *
 * @example
 * <ConsentStepper
 *   steps={[
 *     {
 *       question: 'Can we store your responses securely?',
 *       hint: 'Your data stays on our servers and is never sold.',
 *       options: [
 *         { label: 'Yes, that\'s fine', value: 'yes' },
 *         { label: 'No, session only please', value: 'no' },
 *       ]
 *     }
 *   ]}
 *   onComplete={(results) => saveConsentChoices(results)}
 * />
 */
export function ConsentStepper({
  steps,
  onComplete,
  onStepChange,
  completionHeading = 'All done',
  completionBody = 'Your choices are saved. You can update them any time in your account settings.',
  backLabel = '← Go back',
  nextLabel = 'Continue',
  className,
}: ConsentStepperProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [results, setResults] = useState<(ConsentStepResult | null)[]>(
    () => new Array(steps.length).fill(null)
  )
  const [completed, setCompleted] = useState(false)

  const currentResult = results[currentStep]
  const progress = ((currentStep + 1) / (steps.length + 1)) * 100

  const selectOption = useCallback(
    (option: ConsentOption) => {
      const result: ConsentStepResult = {
        stepIndex: currentStep,
        question: steps[currentStep].question,
        selectedValue: option.value,
        selectedLabel: option.label,
      }
      setResults((prev) => {
        const next = [...prev]
        next[currentStep] = result
        return next
      })
      onStepChange?.(currentStep, result)
    },
    [currentStep, steps, onStepChange]
  )

  const handleNext = useCallback(() => {
    if (!currentResult) return
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1)
    } else {
      setCompleted(true)
      onComplete(results.filter(Boolean) as ConsentStepResult[])
    }
  }, [currentResult, currentStep, steps.length, results, onComplete])

  const handleBack = useCallback(() => {
    if (currentStep > 0) setCurrentStep((s) => s - 1)
  }, [currentStep])

  if (completed) {
    return (
      <div
        data-ti-consent-stepper
        className={className}
        style={{
          background: '#ECE7DF',
          border: '1px solid #D7D2C8',
          borderRadius: '20px',
          overflow: 'hidden',
          maxWidth: '440px',
        }}
      >
        <div style={{ height: '3px', background: '#3C7F8C' }} />
        <div style={{ padding: '32px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>✓</div>
          <p style={{ fontSize: '15px', fontWeight: 500, color: '#2D6473', marginBottom: '6px' }}>
            {completionHeading}
          </p>
          <p style={{ fontSize: '13px', color: '#62666D', lineHeight: 1.65 }}>{completionBody}</p>
        </div>
      </div>
    )
  }

  const step = steps[currentStep]

  return (
    <div
      data-ti-consent-stepper
      className={className}
      style={{
        background: '#ECE7DF',
        border: '1px solid #D7D2C8',
        borderRadius: '20px',
        overflow: 'hidden',
        maxWidth: '440px',
      }}
    >
      {/* Progress bar */}
      <div style={{ height: '3px', background: '#D7D2C8' }}>
        <div
          style={{
            height: '100%',
            background: '#3C7F8C',
            width: `${progress}%`,
            transition: 'width 300ms ease',
          }}
          role="progressbar"
          aria-valuenow={currentStep + 1}
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-label={`Step ${currentStep + 1} of ${steps.length}`}
        />
      </div>

      {/* Step content */}
      <div style={{ padding: '24px' }}>
        <p style={{ fontSize: '12px', color: '#8B8F96', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
          Step {currentStep + 1} of {steps.length}
        </p>

        <p style={{ fontSize: '16px', fontWeight: 500, color: '#2F3134', marginBottom: '8px', lineHeight: 1.45 }}>
          {step.question}
        </p>

        {step.hint && (
          <p
            style={{
              fontSize: '14px',
              color: '#62666D',
              marginBottom: '18px',
              lineHeight: 1.7,
            }}
          >
            {step.hint}
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {step.options.map((option) => {
            const isSelected = currentResult?.selectedValue === option.value
            return (
              <button
                key={option.value}
                onClick={() => selectOption(option)}
                aria-pressed={isSelected}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  border: `1.5px solid ${isSelected ? '#3C7F8C' : '#D7D2C8'}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  background: isSelected ? '#D1E5E8' : '#F6F4F0',
                  color: isSelected ? '#2D6473' : '#2F3134',
                  fontFamily: 'inherit',
                  fontSize: '13px',
                  textAlign: 'left',
                  transition: 'all 150ms ease',
                }}
              >
                {/* Radio indicator */}
                <span
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    border: `1.5px solid ${isSelected ? '#3C7F8C' : '#BDB8AE'}`,
                    background: isSelected ? '#3C7F8C' : 'transparent',
                    flexShrink: 0,
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-hidden="true"
                >
                  {isSelected && (
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#fff',
                      }}
                    />
                  )}
                </span>
                {option.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          borderTop: '1px solid #D7D2C8',
        }}
      >
        {currentStep > 0 ? (
          <Button variant="ghost" size="sm" onClick={handleBack}>
            {backLabel}
          </Button>
        ) : (
          <span />
        )}

        <Button
          variant="primary"
          size="sm"
          onClick={handleNext}
          disabled={!currentResult}
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  )
}
