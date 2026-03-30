import type { Meta, StoryObj } from '@storybook/react'
import { TextArea } from './index'

const meta: Meta<typeof TextArea> = {
  title: 'Form Controls/TextArea',
  component: TextArea,
  parameters: {
    docs: {
      description: {
        component:
          'Multi-line text input with character counter, warm validation, and optional/required labelling.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof TextArea>

export const Default: Story = {
  args: {
    label: "What would you like us to know?",
    hint: "Share only what feels right. You can skip this.",
    placeholder: "Type here…",
    optional: true,
    rows: 4,
  },
}

export const WithCharacterCount: Story = {
  args: {
    label: "Describe what support looks like to you",
    hint: "This helps us tailor your experience.",
    maxLength: 300,
    rows: 5,
  },
}

export const WithValidation: Story = {
  args: {
    label: "What brings you here today?",
    required: true,
    validate: (v) => (v.trim().length < 10 ? "Please share a little more — at least a sentence." : undefined),
    validateOn: "blur",
    rows: 4,
  },
}

export const Disabled: Story = {
  args: {
    label: "Additional notes (not editable in this view)",
    defaultValue: "Client expressed concerns about housing stability.",
    disabled: true,
    rows: 3,
  },
}
