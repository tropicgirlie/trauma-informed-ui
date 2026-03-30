import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './index'

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component:
          'Inline feedback banners. "Danger" uses desaturated rose — critical without triggering a threat response. Never flashing.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof Alert>

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Before you begin',
    children: 'This section covers your support preferences. You can update them at any time.',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Progress saved',
    children: 'Your responses have been saved securely.',
    onDismiss: () => {},
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Take a moment',
    children: 'The next section contains descriptions of medical procedures that some people find distressing.',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'Something went wrong',
    children: "We couldn't save your last response. Please try again — your work is still here.",
    onDismiss: () => {},
  },
}

export const NoTitle: Story = {
  args: {
    variant: 'info',
    children: 'You can stop at any time and your progress will be saved.',
  },
}

export const Inline: Story = {
  args: {
    variant: 'warning',
    inline: true,
    children: 'Sensitive content follows on this page.',
  },
}
