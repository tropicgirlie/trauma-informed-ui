import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './index'

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" />
  </svg>
)

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)

const meta: Meta<typeof Button> = {
  title: 'Foundation/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The foundational action element. **Never use the same variant for both Submit and Delete** — the visual distinction is the user's only safeguard against accidental irreversible action.

| Variant | Use for |
|---|---|
| \`primary\` | Submit, Save, Confirm, Continue |
| \`secondary\` | Cancel, Back, Edit, optional actions |
| \`destructive\` | Delete, Remove, Revoke — always distinct from primary |
| \`ghost\` | Tertiary actions, navigation links |
        `,
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'destructive', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { variant: 'primary', children: 'Submit response' },
}

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Cancel' },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete note',
    iconBefore: <TrashIcon />,
  },
}

export const Ghost: Story = {
  args: { variant: 'ghost', children: '← Go back' },
}

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: 'Continue',
    iconAfter: <ArrowRight />,
  },
}

export const Loading: Story = {
  args: { variant: 'primary', children: 'Submitting…', loading: true },
}

export const Disabled: Story = {
  args: { variant: 'primary', children: 'Submit response', disabled: true },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      <Button size="sm" variant="primary">Small</Button>
      <Button size="md" variant="primary">Medium</Button>
      <Button size="lg" variant="primary">Large</Button>
    </div>
  ),
}

export const SubmitVsDelete: Story = {
  name: '⚠️ Submit vs Delete — Never the Same',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '460px' }}>
      <div style={{ padding: '3px 10px', background: '#f0d2d4', borderRadius: '6px', fontSize: '12px', color: '#8a4048', display: 'inline-flex', alignSelf: 'flex-start' }}>
        ✗ Wrong — same variant for both actions
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="primary">Submit response</Button>
        <Button variant="primary">Delete note</Button>
      </div>
      <div style={{ padding: '3px 10px', background: '#D1E5E8', borderRadius: '6px', fontSize: '12px', color: '#2D6473', display: 'inline-flex', alignSelf: 'flex-start' }}>
        ✓ Correct — distinct variants, icon on destructive
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="primary">Submit response</Button>
        <Button variant="destructive" iconBefore={<TrashIcon />}>Delete note</Button>
      </div>
    </div>
  ),
}
