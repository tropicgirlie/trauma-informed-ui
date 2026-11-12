import * as Progress from '@radix-ui/react-progress'
import * as RadioGroup from '@radix-ui/react-radio-group'
import React, { useCallback, useEffect, useId, useRef, useState } from 'react'

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
  /** Completion message body. Avoid promising persistence unless the host app confirms it. */
  completionBody?: string
  /** Label for back button. Default: "← Go back" */
  backLabel?: string
  /** Label for next button. Default: "Continue" */
  nextLabel?: string
  /** Custom className */
  className?: string
  /** Additional inline styles */
  style?: React.CSSProperties
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
  completionBody = 'You have reached the end of these choices.',
  backLabel = '← Go back',
  nextLabel = 'Continue',
  className,
  style,
}: ConsentStepperProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [results, setResults] = useState<(ConsentStepResult | null)[]>(
    () => new Array(steps.length).fill(null)
  )
  const [completed, setCompleted] = useState(false)
  const questionId = useId()
  const hintId = useId()
  const questionRef = useRef<HTMLParagraphElement>(null)
  const didMountRef = useRef(false)

  const currentResult = results[currentStep]
  const progress = steps.length > 0 ? ((currentStep + 1) / (steps.length + 1)) * 100 : 100

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

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }
    questionRef.current?.focus({ preventScroll: true })
  }, [currentStep])

  if (steps.length === 0) {
    return (
      <div
        data-ti-consent-stepper
        className={['ti-surface', 'ti-consent-stepper', className].filter(Boolean).join(' ')}
        style={style}
      >
        <div className="ti-consent-stepper__complete" role="status" aria-live="polite">
          <p className="ti-consent-stepper__question">No consent steps configured</p>
          <p className="ti-copy">Add at least one question so users can make a clear choice.</p>
        </div>
      </div>
    )
  }

  if (completed) {
    return (
      <div
        data-ti-consent-stepper
        className={['ti-surface', 'ti-consent-stepper', className].filter(Boolean).join(' ')}
        style={style}
      >
        <Progress.Root className="ti-consent-stepper__progress-track" value={100}>
          <Progress.Indicator className="ti-consent-stepper__progress" style={{ transform: 'scaleX(1)' }} />
        </Progress.Root>
        <div className="ti-consent-stepper__complete" role="status" aria-live="polite">
          <div className="ti-consent-stepper__check" aria-hidden="true">✓</div>
          <p className="ti-consent-stepper__question">
            {completionHeading}
          </p>
          <p className="ti-copy">{completionBody}</p>
        </div>
      </div>
    )
  }

  const step = steps[currentStep]

  return (
    <div
      data-ti-consent-stepper
      className={['ti-surface', 'ti-consent-stepper', className].filter(Boolean).join(' ')}
      style={style}
    >
      <Progress.Root
        className="ti-consent-stepper__progress-track"
        value={currentStep + 1}
        max={steps.length}
        aria-label={`Step ${currentStep + 1} of ${steps.length}`}
      >
        <Progress.Indicator
          className="ti-consent-stepper__progress"
          style={{
            transform: `scaleX(${progress / 100})`,
          }}
        />
      </Progress.Root>

      <div className="ti-consent-stepper__content">
        <p className="ti-eyebrow">
          Step {currentStep + 1} of {steps.length}
        </p>

        <p className="ti-consent-stepper__question" id={questionId} tabIndex={-1} ref={questionRef}>
          {step.question}
        </p>

        {step.hint && (
          <p className="ti-copy ti-consent-stepper__hint" id={hintId}>
            {step.hint}
          </p>
        )}

        <RadioGroup.Root
          className="ti-consent-stepper__options"
          // Empty string keeps the group controlled. Passing undefined lets Radix
          // own the value until an effect runs, so Continue stays disabled after a click.
          value={currentResult?.selectedValue ?? ''}
          onValueChange={(value) => {
            const option = step.options.find((item) => item.value === value)
            if (option) selectOption(option)
          }}
          aria-labelledby={questionId}
          aria-describedby={step.hint ? hintId : undefined}
        >
          {step.options.map((option) => {
            return (
              <RadioGroup.Item
                key={option.value}
                value={option.value}
                data-caution={option.caution || undefined}
                className="ti-consent-stepper__option"
              >
                <span className="ti-consent-stepper__radio" aria-hidden="true">
                  <RadioGroup.Indicator className="ti-consent-stepper__radio-indicator" />
                </span>
                <span>{option.label}</span>
              </RadioGroup.Item>
            )
          })}
        </RadioGroup.Root>
      </div>

      <div className="ti-consent-stepper__footer">
        {currentStep > 0 ? (
          <button
            onClick={handleBack}
            className="ti-button ti-button--quiet"
          >
            {backLabel}
          </button>
        ) : (
          <span />
        )}

        <button
          onClick={handleNext}
          disabled={!currentResult}
          className="ti-button ti-button--primary"
        >
          {nextLabel}
        </button>
      </div>
    </div>
  )
}
