import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DisclosureCard, CalmingMessage, PauseAware } from './index'

const meta: Meta = {
  title: 'Components/DisclosureCard',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Three composable components for managing pacing and nervous-system-aware content delivery: `DisclosureCard`, `CalmingMessage`, and `PauseAware`.',
      },
    },
  },
}

export default meta

export const BasicDisclosure: StoryObj<typeof DisclosureCard> = {
  name: 'DisclosureCard — Basic',
  render: () => (
    <DisclosureCard
      label="Medication side effects"
      badge="may be distressing"
      warningText="This section includes clinical descriptions that some people find upsetting. Take a moment before reading on."
    >
      <p style={{ margin: '0 0 10px' }}>
        Some people experience nausea, dizziness, or changes in sleep during the first few weeks.
        These effects are usually temporary.
      </p>
      <p style={{ margin: 0 }}>
        If you experience severe symptoms, contact your care team right away.
      </p>
    </DisclosureCard>
  ),
}

export const DefaultOpen: StoryObj<typeof DisclosureCard> = {
  name: 'DisclosureCard — Default Open',
  render: () => (
    <DisclosureCard
      label="Your intake summary"
      badge="sensitive content"
      warningText="This is a summary of what you shared with us. It's okay to read this in parts."
      defaultOpen
    >
      <p style={{ margin: 0 }}>
        You noted experiences of childhood adversity and indicated these have had lasting effects.
        Your care team has reviewed this and it will inform your support plan.
      </p>
    </DisclosureCard>
  ),
}

export const CalmingMessageSage: StoryObj<typeof CalmingMessage> = {
  name: 'CalmingMessage — Sage',
  render: () => (
    <CalmingMessage timeEstimate="Takes about 2 minutes">
      This next section asks about your pregnancy history. There's no right or wrong answer —
      just take it at your own pace.
    </CalmingMessage>
  ),
}

export const CalmingMessageDust: StoryObj<typeof CalmingMessage> = {
  name: 'CalmingMessage — Dust',
  render: () => (
    <CalmingMessage variant="dust" timeEstimate="Takes about 5 minutes">
      We're going to ask a few questions about your housing situation. You can skip anything
      you're not ready to answer.
    </CalmingMessage>
  ),
}

export const PauseAwareDemo: StoryObj<typeof PauseAware> = {
  name: 'PauseAware — Always Visible (Demo)',
  render: () => (
    <PauseAware
      thresholdMs={0}
      message="No rush at all. Would you like to take a break, save your progress, or keep going?"
      actions={[
        { label: 'Keep going', onClick: () => {}, variant: 'primary' },
        { label: 'Save and pause', onClick: () => {} },
        { label: 'Exit safely', onClick: () => {} },
      ]}
    />
  ),
}
