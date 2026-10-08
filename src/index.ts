// ─────────────────────────────────────────────────────────────────────────────
// Trauma-Informed UI
// React component library for care-aware interfaces
// Created by Luana Micheau — part of the Care-Conscious Design framework
// ─────────────────────────────────────────────────────────────────────────────

// Provider (wrap your app or subtree with this first)
export { TraumaInformedProvider, useTraumaInformed } from './components/TraumaInformedProvider'
export type { TraumaInformedConfig } from './components/TraumaInformedProvider'

// Safety
export { SafeExit } from './components/SafeExit'
export type { SafeExitProps } from './components/SafeExit'

// Agency & repair
export { RegretButton } from './components/RegretButton'
export type { RegretButtonProps } from './components/RegretButton'

// Consent
export { ConsentStepper } from './components/ConsentStepper'
export type { ConsentStepperProps, ConsentStep, ConsentOption, ConsentStepResult } from './components/ConsentStepper'

// Progressive disclosure
export { DisclosureCard } from './components/DisclosureCard'
export type { DisclosureCardProps } from './components/DisclosureCard'

export { ContentWarning } from './components/ContentWarning'
export type { ContentWarningProps, ContentWarningCategory } from './components/ContentWarning'

// Regulation & pacing
export { CalmingMessage } from './components/CalmingMessage'
export type { CalmingMessageProps } from './components/CalmingMessage'

export { PauseAware } from './components/PauseAware'
export type { PauseAwareProps, PauseAwareAction } from './components/PauseAware'

// Hooks
export { useReducedMotion, useSafeExit, usePauseDetection } from './hooks/useReducedMotion'

// Existing general-purpose components remain part of the public API.
export { PALETTE, FEEDBACK_TOKENS, SURFACE_TOKENS } from './tokens'
export type { FeedbackVariant } from './tokens'
export { Button } from './components/Button'
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button'
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
export { Badge } from './components/Badge'
export type { BadgeProps, BadgeVariant } from './components/Badge'
export { Chip } from './components/Chip'
export type { ChipProps } from './components/Chip'
export { Alert } from './components/Alert'
export type { AlertProps, AlertVariant } from './components/Alert'
export { ToastProvider, useToast } from './components/Toast'
export type { ToastItem, ToastVariant } from './components/Toast'
export { Modal } from './components/Modal'
export type { ModalProps, ModalSize } from './components/Modal'
export { Tabs, TabList, Tab, TabPanel } from './components/Tabs'
export type { TabsProps, TabListProps, TabProps, TabPanelProps } from './components/Tabs'
export { Skeleton, SkeletonText } from './components/Skeleton'
export type { SkeletonProps, SkeletonTextProps } from './components/Skeleton'
export { ProgressBar } from './components/ProgressBar'
export type { ProgressBarProps, ProgressBarVariant } from './components/ProgressBar'
export { Card } from './components/Card'
export type { CardProps, CardVariant } from './components/Card'
export { TriggerWarning } from './components/TriggerWarning'
export type { TriggerWarningProps } from './components/TriggerWarning'
export { EmotionCheckIn } from './components/EmotionCheckIn'
export type { EmotionCheckInProps, EmotionOption } from './components/EmotionCheckIn'
export { BreathingGuide } from './components/BreathingGuide'
export type { BreathingGuideProps, BreathingPattern } from './components/BreathingGuide'
export { SafeInput } from './components/SafeInput'
export type { SafeInputProps } from './components/SafeInput'
