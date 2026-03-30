import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Card } from './index'
import { Button } from '../Button'
import { Badge } from '../Badge'
import { ProgressBar } from '../ProgressBar'

const meta: Meta<typeof Card> = {
  title: 'Layout/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          'Flexible surface container with header, body, and footer slots. Supports default, outlined, elevated, and filled variants. Can be made interactive as a button or link.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    header: 'Support resources',
    children: (
      <p style={{ fontSize: '14px', color: '#62666D', margin: 0, lineHeight: 1.7 }}>
        Peer support, helplines, and local services are available whenever you are ready.
      </p>
    ),
    footer: <Button variant="secondary" size="sm">Browse all</Button>,
  },
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    header: 'Your progress',
    children: (
      <div>
        <ProgressBar value={60} label="Section 3 of 5" showValue />
        <p style={{ fontSize: '13px', color: '#8B8F96', margin: '12px 0 0', lineHeight: 1.6 }}>
          You are doing well. Take your time.
        </p>
      </div>
    ),
  },
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '15px', fontWeight: 500, color: '#2F3134', margin: '0 0 4px' }}>Crisis line</p>
          <p style={{ fontSize: '13px', color: '#62666D', margin: 0 }}>Available 24/7 · Free · Confidential</p>
        </div>
        <Badge variant="success" dot>Live</Badge>
      </div>
    ),
  },
}

export const Filled: Story = {
  args: {
    variant: 'filled',
    header: 'Session notes',
    children: (
      <p style={{ fontSize: '14px', color: '#62666D', margin: 0, lineHeight: 1.7 }}>
        Your notes are saved automatically every 30 seconds.
      </p>
    ),
  },
}

export const Clickable: Story = {
  args: {
    variant: 'elevated',
    onClick: () => alert('Card clicked'),
    header: 'View your support plan',
    children: (
      <p style={{ fontSize: '14px', color: '#62666D', margin: 0, lineHeight: 1.7 }}>
        Click to open your personalised support plan.
      </p>
    ),
  },
}
