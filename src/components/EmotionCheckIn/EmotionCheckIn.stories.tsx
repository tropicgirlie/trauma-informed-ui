import type { Meta, StoryObj } from '@storybook/react'
import { EmotionCheckIn } from './index'

const meta: Meta<typeof EmotionCheckIn> = {
  title: 'Components/EmotionCheckIn',
  component: EmotionCheckIn,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A non-clinical, visually warm mood check-in. Uses emoji-anchored options instead of numerical scales. Naming an emotion activates the prefrontal cortex and reduces amygdala activation ("name it to tame it").',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof EmotionCheckIn>

export const Default: Story = {
  args: {
    question: 'How are you feeling right now?',
    onSubmit: (value, option) => console.log('Check-in:', value, option),
  },
}

export const NoSubmitButton: Story = {
  args: {
    question: 'How are you feeling right now?',
    showSubmit: false,
    onChange: (value) => console.log('Selected:', value),
  },
}

export const CustomQuestion: Story = {
  args: {
    question: 'Before we continue — how is your body feeling?',
    completionMessage: 'Thank you. We will keep this in mind as we go.',
    submitLabel: 'Continue',
    onSubmit: (value) => console.log('Checked in:', value),
  },
}

export const CustomOptions: Story = {
  args: {
    question: 'How safe do you feel right now?',
    options: [
      { value: 'very-safe', label: 'Very safe', emoji: '🟢', color: '#D1E5E8', textColor: '#2D6473' },
      { value: 'mostly-safe', label: 'Mostly safe', emoji: '🟡', color: '#F4EDDB', textColor: '#8B6830' },
      { value: 'uncertain', label: 'Uncertain', emoji: '🟠', color: '#f0d8d0', textColor: '#8a5040' },
      { value: 'unsafe', label: 'Not safe', emoji: '🔴', color: '#f0d2d4', textColor: '#8a4048' },
    ],
    submitLabel: 'Continue',
    onSubmit: (value) => console.log('Safety level:', value),
  },
}
