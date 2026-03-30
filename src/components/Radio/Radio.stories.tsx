import type { Meta, StoryObj } from '@storybook/react'
import { Radio, RadioGroup } from './index'

const meta: Meta<typeof RadioGroup> = {
  title: 'Form Controls/RadioGroup',
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component:
          'RadioGroup + Radio with shared fieldset/legend. Keyboard navigable. Always shows group context before individual options.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => (
    <RadioGroup legend="How would you like to continue?" hint="There is no wrong answer.">
      <Radio value="now" label="Continue now" hint="Go straight to the next section." />
      <Radio value="later" label="Save and come back later" hint="Your progress will be kept for 30 days." />
      <Radio value="exit" label="Exit safely" hint="You can return any time." />
    </RadioGroup>
  ),
}

export const WithError: Story = {
  render: () => (
    <RadioGroup
      legend="Would you like to receive follow-up support resources?"
      error="Please make a selection to continue."
    >
      <Radio value="yes" label="Yes, please send resources" />
      <Radio value="no" label="No thank you" />
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup legend="Contact method (managed by your organisation)" disabled>
      <Radio value="email" label="Email" />
      <Radio value="phone" label="Phone" />
    </RadioGroup>
  ),
}

export const PreSelected: Story = {
  render: () => (
    <RadioGroup legend="Preferred session format" defaultValue="video">
      <Radio value="video" label="Video call" />
      <Radio value="phone" label="Phone call" />
      <Radio value="in-person" label="In-person" />
    </RadioGroup>
  ),
}
