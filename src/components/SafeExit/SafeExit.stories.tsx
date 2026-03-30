import type { Meta, StoryObj } from '@storybook/react'
import { SafeExit } from './index'

const meta: Meta<typeof SafeExit> = {
  title: 'Components/SafeExit',
  component: SafeExit,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A persistent, one-click exit to a neutral destination. Originally developed for domestic violence resource sites. Perceived entrapment activates the threat response — a visible exit path maintains neuroception of safety throughout the session.',
      },
    },
    layout: 'padded',
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'inline'],
    },
  },
}

export default meta
type Story = StoryObj<typeof SafeExit>

export const Inline: Story = {
  args: {
    position: 'inline',
    label: 'Leave this page safely',
    redirectTo: 'https://weather.com',
    showShortcutHint: true,
  },
}

export const NoHint: Story = {
  args: {
    position: 'inline',
    label: 'Leave this page safely',
    redirectTo: 'https://weather.com',
    showShortcutHint: false,
  },
}

export const CustomLabel: Story = {
  args: {
    position: 'inline',
    label: 'Exit to a safe page',
    redirectTo: 'https://weather.com',
    showShortcutHint: false,
  },
}
