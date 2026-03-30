import type { Meta, StoryObj } from '@storybook/react'
import { ProgressBar } from './index'

const meta: Meta<typeof ProgressBar> = {
  title: 'Loaders/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component:
          'Linear progress indicator. Shows orientation within a process without time pressure. Use "Step X of Y" labels, not countdowns.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  args: { value: 40, label: 'Step 2 of 5', showValue: false },
}

export const WithPercentage: Story = {
  args: { value: 60, label: 'Section 3 of 5', showValue: true },
}

export const Success: Story = {
  args: { value: 100, variant: 'success', label: 'All done', showValue: true },
}

export const Warning: Story = {
  args: { value: 85, variant: 'warning', label: 'Storage nearly full', showValue: true },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '420px' }}>
      <ProgressBar value={25} variant="primary" label="Step 1 of 4" showValue />
      <ProgressBar value={50} variant="primary" label="Step 2 of 4" showValue />
      <ProgressBar value={100} variant="success" label="Upload complete" showValue />
      <ProgressBar value={70} variant="warning" label="Storage nearly full" showValue />
      <ProgressBar value={15} variant="danger" label="Critical: low storage" showValue />
    </div>
  ),
}
