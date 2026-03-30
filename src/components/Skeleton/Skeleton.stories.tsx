import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Skeleton, SkeletonText } from './index'

const meta: Meta<typeof Skeleton> = {
  title: 'Loaders/Skeleton',
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component:
          'Content placeholder with a gentle shimmer. Communicates loading without spinning indicators, which can be activating for some users.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  args: { width: '240px', height: '16px' },
}

export const Circle: Story = {
  args: { circle: true, width: '48px', height: '48px' },
}

export const CardSkeleton: Story = {
  render: () => (
    <div style={{ padding: '20px', background: '#ECE7DF', borderRadius: '16px', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Skeleton circle width="44px" height="44px" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <Skeleton height="14px" width="55%" />
          <Skeleton height="12px" width="35%" />
        </div>
      </div>
      <SkeletonText lines={3} />
      <Skeleton height="40px" borderRadius="12px" width="45%" />
    </div>
  ),
}

export const TextBlock: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <SkeletonText lines={5} lastLineWidth="50%" />
    </div>
  ),
}
