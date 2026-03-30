import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './index'

const meta: Meta<typeof Checkbox> = {
  title: 'Form Controls/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          'Single checkbox with label, hint, indeterminate, and error states. 44px touch target. Never relies on colour alone.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    label: 'I understand this section may be difficult to read',
    hint: 'You can close this at any time.',
  },
}

export const Checked: Story = {
  args: { label: 'Save my responses for my next visit', defaultChecked: true },
}

export const Indeterminate: Story = {
  args: { label: 'Select all (some selected)', indeterminate: true },
}

export const WithError: Story = {
  args: {
    label: 'I confirm I have read the information above',
    error: 'Please confirm before continuing.',
  },
}

export const Disabled: Story = {
  args: { label: 'This option is not available right now', disabled: true },
}

export const DisabledChecked: Story = {
  args: { label: 'Auto-save is enabled (managed by your organisation)', disabled: true, defaultChecked: true },
}
