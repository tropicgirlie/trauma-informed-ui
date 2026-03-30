import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TriggerWarning } from './index'

const meta: Meta<typeof TriggerWarning> = {
  title: 'Components/TriggerWarning',
  component: TriggerWarning,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Gates sensitive content behind an explicit, warm acknowledgement step. Names the topics so users can make an informed choice. Unlike a generic confirmation dialog, this validates the user\'s autonomy over whether to engage.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof TriggerWarning>

export const WithTopics: Story = {
  args: {
    message:
      'The following section discusses experiences of loss and grief. Take a moment to check in with yourself before continuing.',
    topics: ['grief', 'loss', 'bereavement'],
    onContinue: () => console.log('Continued'),
    onSkip: () => console.log('Skipped'),
    children: (
      <div
        style={{
          padding: '20px',
          background: '#fff',
          borderRadius: '16px',
          border: '1px solid rgba(0,0,0,0.08)',
          fontSize: '14px',
          color: '#555',
          lineHeight: 1.75,
        }}
      >
        This is the sensitive content that was gated.
      </div>
    ),
  },
}

export const NoSkipOption: Story = {
  args: {
    message: 'This section includes descriptions of medical procedures. Please read at your own pace.',
    topics: ['medical', 'procedures', 'clinical'],
    onContinue: () => console.log('Continued'),
    children: (
      <div
        style={{
          padding: '20px',
          background: '#fff',
          borderRadius: '16px',
          border: '1px solid rgba(0,0,0,0.08)',
          fontSize: '14px',
          color: '#555',
        }}
      >
        Revealed content.
      </div>
    ),
  },
}

export const MinimalNoTopics: Story = {
  args: {
    heading: 'Just a heads up',
    message:
      'The next section may bring up some feelings. There is no right way to move through this.',
    onContinue: () => console.log('Continued'),
    onSkip: () => console.log('Skipped'),
    children: <div style={{ fontSize: '14px', color: '#555' }}>Revealed content.</div>,
  },
}
