import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './index'

const meta: Meta<typeof Badge> = {
  title: 'Feedback/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: 'Compact status label. Colour is never the sole differentiator — the text always carries meaning.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = { args: { children: 'Draft' } }
export const Primary: Story = { args: { variant: 'primary', children: 'In progress', dot: true } }
export const Success: Story = { args: { variant: 'success', children: 'Saved' } }
export const Warning: Story = { args: { variant: 'warning', children: 'Needs review' } }
export const Danger: Story = { args: { variant: 'danger', children: 'Action needed' } }
export const Accent: Story = { args: { variant: 'accent', children: 'New' } }

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge>Default</Badge>
      <Badge variant="primary" dot>In progress</Badge>
      <Badge variant="success">Saved</Badge>
      <Badge variant="warning">Needs review</Badge>
      <Badge variant="danger">Action needed</Badge>
      <Badge variant="accent">New</Badge>
    </div>
  ),
}
