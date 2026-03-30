import type { Meta, StoryObj } from '@storybook/react'
import { ConsentStepper } from './index'

const meta: Meta<typeof ConsentStepper> = {
  title: 'Components/ConsentStepper',
  component: ConsentStepper,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Presents granular consent decisions one at a time. Never bundles choices. Every step is fully reversible. Bundled consent collapses agency into a single moment of overwhelm — sequential decisions keep users in their window of tolerance.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ConsentStepper>

const dataSteps = [
  {
    question: 'Can we store your responses securely?',
    hint: 'Your data stays on our servers and is never sold or shared with third parties.',
    options: [
      { label: "Yes, that's fine", value: 'yes' },
      { label: 'No, session only please', value: 'no' },
    ],
  },
  {
    question: 'Would you like to receive follow-up support resources?',
    hint: "We'll only send information directly relevant to what you share today.",
    options: [
      { label: 'Yes, please send resources', value: 'yes' },
      { label: 'No thank you', value: 'no' },
    ],
  },
  {
    question: 'Can a care coordinator reach out to check in?',
    hint: 'This is always optional. You can change this at any time in settings.',
    options: [
      { label: 'Yes, that would be helpful', value: 'yes' },
      { label: 'Not right now', value: 'no' },
    ],
  },
]

export const ThreeSteps: Story = {
  args: {
    steps: dataSteps,
    onComplete: (results) => console.log('Consent results:', results),
  },
}

export const SingleStep: Story = {
  args: {
    steps: [dataSteps[0]],
    onComplete: (results) => console.log('Consent results:', results),
    completionHeading: 'Preference saved',
    completionBody: 'You can update this any time in your account settings.',
  },
}

export const WithCautionOption: Story = {
  args: {
    steps: [
      {
        question: 'Are you currently in a safe environment?',
        hint: 'Your answer helps us tailor the support we offer.',
        options: [
          { label: 'Yes, I feel safe', value: 'safe' },
          { label: "I'm not sure", value: 'unsure' },
          { label: 'No, I need help now', value: 'unsafe', caution: true },
        ],
      },
    ],
    onComplete: (results) => console.log('Safety check:', results),
  },
}
