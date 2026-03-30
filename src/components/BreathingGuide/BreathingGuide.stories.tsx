import type { Meta, StoryObj } from '@storybook/react'
import { BreathingGuide } from './index'

const meta: Meta<typeof BreathingGuide> = {
  title: 'Components/BreathingGuide',
  component: BreathingGuide,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An animated, paced breathing exercise. Slow paced breathing activates the parasympathetic nervous system via vagal tone. Supports nervous system regulation during or between difficult content. The 4-7-8 pattern and box breathing are both evidence-based for reducing sympathetic activation within minutes.',
      },
    },
  },
  argTypes: {
    pattern: {
      control: 'select',
      options: ['4-7-8', 'box', 'custom'],
    },
    cycles: { control: { type: 'number', min: 0, max: 10 } },
  },
}

export default meta
type Story = StoryObj<typeof BreathingGuide>

export const BoxBreathing: Story = {
  args: {
    pattern: 'box',
    cycles: 0,
  },
}

export const FourSevenEight: Story = {
  name: '4-7-8 Pattern',
  args: {
    pattern: '4-7-8',
    cycles: 3,
    onComplete: () => console.log('Breathing exercise complete'),
  },
}

export const ThreeCycles: Story = {
  args: {
    pattern: 'box',
    cycles: 3,
    onComplete: () => console.log('Done'),
  },
}

export const CustomDurations: Story = {
  args: {
    pattern: 'custom',
    customDurations: [5, 2, 6, 0],
    cycles: 0,
  },
}
