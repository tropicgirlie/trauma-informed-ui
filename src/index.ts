// ─── Foundations / Core ──────────────────────────────────────────────────────

export { Button } from './components/Button'
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button'

// ─── Form controls ───────────────────────────────────────────────────────────

export { Checkbox } from './components/Checkbox'
export type { CheckboxProps } from './components/Checkbox'

export { Radio, RadioGroup } from './components/Radio'
export type { RadioProps, RadioGroupProps } from './components/Radio'

export { Switch } from './components/Switch'
export type { SwitchProps } from './components/Switch'

export { TextArea } from './components/TextArea'
export type { TextAreaProps } from './components/TextArea'

export { Select } from './components/Select'
export type { SelectProps, SelectOption } from './components/Select'

// ─── Feedback & status ───────────────────────────────────────────────────────

export { Badge } from './components/Badge'
export type { BadgeProps, BadgeVariant } from './components/Badge'

export { Chip } from './components/Chip'
export type { ChipProps } from './components/Chip'

export { Alert } from './components/Alert'
export type { AlertProps, AlertVariant } from './components/Alert'

export { ToastProvider, useToast } from './components/Toast'
export type { ToastItem, ToastVariant } from './components/Toast'

// ─── Overlays ────────────────────────────────────────────────────────────────

export { Modal } from './components/Modal'
export type { ModalProps, ModalSize } from './components/Modal'

// ─── Navigation ──────────────────────────────────────────────────────────────

export { Tabs, TabList, Tab, TabPanel } from './components/Tabs'
export type { TabsProps, TabListProps, TabProps, TabPanelProps } from './components/Tabs'

// ─── Loaders ─────────────────────────────────────────────────────────────────

export { Skeleton, SkeletonText } from './components/Skeleton'
export type { SkeletonProps, SkeletonTextProps } from './components/Skeleton'

export { ProgressBar } from './components/ProgressBar'
export type { ProgressBarProps, ProgressBarVariant } from './components/ProgressBar'

// ─── Layout ──────────────────────────────────────────────────────────────────

export { Card } from './components/Card'
export type { CardProps, CardVariant } from './components/Card'

export { TraumaInformedProvider, useTraumaInformed } from './components/TraumaInformedProvider'
export type { TraumaInformedConfig } from './components/TraumaInformedProvider'

export { RegretButton } from './components/RegretButton'
export type { RegretButtonProps } from './components/RegretButton'

export { SafeExit } from './components/SafeExit'
export type { SafeExitProps } from './components/SafeExit'

export { ConsentStepper } from './components/ConsentStepper'
export type { ConsentStepperProps, ConsentStep, ConsentOption, ConsentStepResult } from './components/ConsentStepper'

export { DisclosureCard, CalmingMessage, PauseAware } from './components/DisclosureCard'
export type { DisclosureCardProps, CalmingMessageProps, PauseAwareProps, PauseAwareAction } from './components/DisclosureCard'

export { TriggerWarning } from './components/TriggerWarning'
export type { TriggerWarningProps } from './components/TriggerWarning'

export { EmotionCheckIn } from './components/EmotionCheckIn'
export type { EmotionCheckInProps, EmotionOption } from './components/EmotionCheckIn'

export { BreathingGuide } from './components/BreathingGuide'
export type { BreathingGuideProps, BreathingPattern } from './components/BreathingGuide'

export { SafeInput } from './components/SafeInput'
export type { SafeInputProps } from './components/SafeInput'

// Hooks (stubs — implementations in src/hooks/)
export { useReducedMotion } from './hooks/useReducedMotion'
export { useSafeExit } from './hooks/useSafeExit'
export { usePauseDetection } from './hooks/usePauseDetection'
