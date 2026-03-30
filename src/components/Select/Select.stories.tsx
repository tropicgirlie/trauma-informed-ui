import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './index'

const meta: Meta<typeof Select> = {
  title: 'Form Controls/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          'Native `<select>` with trauma-informed defaults: always includes an empty placeholder so no value is pre-selected without user intent.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof Select>

const contactOptions = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'post', label: 'Post (letter)' },
  { value: 'none', label: 'I prefer not to be contacted' },
]

export const Default: Story = {
  args: {
    label: 'Preferred contact method',
    options: contactOptions,
    placeholder: 'Choose one — or skip this field',
    hint: 'We only use this for essential communications.',
    optional: true,
  },
}

export const Required: Story = {
  args: {
    label: 'How did you hear about us?',
    options: [
      { value: 'gp', label: 'GP referral' },
      { value: 'social-worker', label: 'Social worker' },
      { value: 'self', label: 'Self-referral' },
      { value: 'other', label: 'Other' },
    ],
    placeholder: 'Select one',
    required: true,
  },
}

export const WithError: Story = {
  args: {
    label: 'Preferred session format',
    options: [
      { value: 'video', label: 'Video call' },
      { value: 'phone', label: 'Phone call' },
      { value: 'in-person', label: 'In person' },
    ],
    error: 'Please choose a format to continue.',
    required: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Region (auto-detected)',
    options: [{ value: 'ie', label: 'Ireland' }],
    defaultValue: 'ie',
    disabled: true,
  },
}
