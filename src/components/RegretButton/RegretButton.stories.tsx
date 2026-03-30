import type { Meta, StoryObj } from '@storybook/react'
import { RegretButton } from './index'

const meta: Meta<typeof RegretButton> = {
  title: 'Components/RegretButton',
  component: RegretButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'destructive'] },
    windowMs: { control: { type: 'range', min: 2000, max: 15000, step: 500 } },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Wraps any action in a generous undo window. **Always use `variant="destructive"` for delete/remove actions** — never the same style as a submit or save action.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof RegretButton>

export const Default: Story = {
  args: {
    variant: 'primary',
    label: 'Submit response',
    toastMessage: 'Response queued…',
    undoLabel: 'Undo',
    undoneMessage: 'Undone — no harm done',
    windowMs: 7000,
    onAction: () => console.log('Action committed'),
    onUndo: () => console.log('Undone'),
  },
}

export const Destructive: Story = {
  name: 'Destructive — Delete',
  args: {
    variant: 'destructive',
    label: 'Delete note',
    toastMessage: 'Note will be deleted…',
    undoLabel: 'Keep it',
    undoneMessage: 'Note kept — no harm done',
    windowMs: 5000,
    onAction: () => console.log('Deleted'),
    onUndo: () => console.log('Kept'),
  },
}

export const LongWindow: Story = {
  args: {
    label: 'Send message',
    toastMessage: 'Message sending…',
    undoLabel: 'Cancel send',
    windowMs: 12000,
    onAction: () => console.log('Sent'),
    onUndo: () => console.log('Cancelled'),
  },
}

export const Disabled: Story = {
  args: {
    label: 'Submit response',
    onAction: () => {},
    disabled: true,
  },
}
