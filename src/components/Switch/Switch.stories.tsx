import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './index'

const meta: Meta<typeof Switch> = {
  title: 'Form Controls/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component:
          'Toggle control with explicit on/off text labels — never relies on position or colour alone (WCAG 1.4.1).',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: {
    label: 'Receive follow-up messages',
    hint: 'We will only contact you about what you share today.',
  },
}

export const On: Story = {
  args: { label: 'Save session progress', defaultChecked: true },
}

export const CustomLabels: Story = {
  args: {
    label: 'Allow care coordinator access',
    onLabel: 'Allowed',
    offLabel: 'Not allowed',
    hint: 'Your coordinator can view your session notes.',
  },
}

export const Disabled: Story = {
  args: { label: 'Auto-save (managed by your organisation)', disabled: true, defaultChecked: true },
}
