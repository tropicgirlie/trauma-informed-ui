import type { Meta, StoryObj } from '@storybook/react'
import { SafeInput } from './index'

const meta: Meta<typeof SafeInput> = {
  title: 'Components/SafeInput',
  component: SafeInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A form field with trauma-informed validation. No red borders, no "Error!" labels, no guilt-inducing language. Harsh form validation triggers threat appraisal — this component uses soft amber tones and plain, instructive language instead.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof SafeInput>

export const Default: Story = {
  args: {
    label: 'Full name',
    placeholder: 'Your name',
    hint: 'This is how we will address you in all correspondence.',
  },
}

export const WithValidation: Story = {
  args: {
    label: 'Email address',
    type: 'email',
    placeholder: 'you@example.com',
    hint: "We'll only use this to send your care plan.",
    validate: (v) =>
      !v.includes('@') ? 'Please include an @ symbol in your email address.' : undefined,
  },
}

export const Optional: Story = {
  args: {
    label: 'Phone number',
    type: 'tel',
    optional: true,
    hint: 'Only if you prefer a phone call over email.',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Assigned worker',
    value: 'Dr. Sarah Chen',
    disabled: true,
    hint: 'Contact your team to update this.',
  },
}

export const PasswordField: Story = {
  args: {
    label: 'Create a password',
    type: 'password',
    hint: 'At least 8 characters. No requirements beyond that.',
    validate: (v) =>
      v.length > 0 && v.length < 8 ? 'A little longer would be great — at least 8 characters.' : undefined,
  },
}
