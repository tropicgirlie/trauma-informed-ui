import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { ToastProvider, useToast } from './index'
import { Button } from '../Button'

const meta: Meta = {
  title: 'Overlays/Toast',
  parameters: {
    docs: {
      description: {
        component:
          'Non-blocking notification messages. Auto-dismiss after 5 s with manual close. Gentle slide-in — never flashing or alarming. Wrap your app in `ToastProvider` and call `useToast()` to trigger.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
}
export default meta
type Story = StoryObj

function ToastTriggers() {
  const { toast } = useToast()
  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <Button variant="secondary" size="sm" onClick={() => toast({ variant: 'info', message: 'Your progress has been saved.' })}>
        Info
      </Button>
      <Button variant="secondary" size="sm" onClick={() => toast({ variant: 'success', title: 'Saved', message: 'Your response has been recorded securely.' })}>
        Success
      </Button>
      <Button variant="secondary" size="sm" onClick={() => toast({ variant: 'warning', title: 'Take a moment', message: 'Sensitive content follows on the next section.', duration: 8000 })}>
        Warning (8 s)
      </Button>
      <Button variant="secondary" size="sm" onClick={() => toast({ variant: 'danger', title: 'Something went wrong', message: "We couldn't save. Your work is still here — please try again." })}>
        Danger
      </Button>
    </div>
  )
}

export const Default: Story = {
  render: () => <ToastTriggers />,
}
