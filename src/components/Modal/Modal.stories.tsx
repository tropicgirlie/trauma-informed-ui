import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Modal } from './index'
import { Button } from '../Button'
import { Alert } from '../Alert'

const meta: Meta<typeof Modal> = {
  title: 'Overlays/Modal',
  component: Modal,
  parameters: {
    docs: {
      description: {
        component:
          'Focus-trapped dialog. Always escapable via Escape key and backdrop click. Users are never trapped — this is a core trauma-informed principle.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof Modal>

function ModalStory({ size }: { size?: 'sm' | 'md' | 'lg' }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Open modal ({size ?? 'md'})</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Before you continue"
        subtitle="This section discusses sensitive topics."
        size={size}
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Not right now</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Continue</Button>
          </>
        }
      >
        <p style={{ margin: '0 0 14px' }}>
          The next section covers your mental health history. There is no right or wrong answer — share only what feels safe.
        </p>
        <Alert variant="info">
          You can stop or save your progress at any point. Take your time.
        </Alert>
      </Modal>
    </>
  )
}

export const Default: Story = { render: () => <ModalStory /> }
export const Small: Story = { render: () => <ModalStory size="sm" /> }
export const Large: Story = { render: () => <ModalStory size="lg" /> }

function NoBackdropDismissStory() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Open (no backdrop dismiss)</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Important: please confirm"
        closeOnBackdrop={false}
        footer={
          <Button variant="primary" onClick={() => setOpen(false)}>I understand</Button>
        }
      >
        <p>You must use the button below or press Escape to close this dialog.</p>
      </Modal>
    </>
  )
}

export const NoBackdropDismiss: Story = {
  render: () => <NoBackdropDismissStory />,
}
