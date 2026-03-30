import type { Meta, StoryObj } from '@storybook/react'
import { Chip } from './index'

const meta: Meta<typeof Chip> = {
  title: 'Feedback/Chip',
  component: Chip,
  parameters: {
    docs: {
      description: {
        component: 'Filter chips (clickable) and input chips (removable). Used for tags, applied filters, and categories.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof Chip>

export const Default: Story = { args: { children: 'Mental health' } }
export const Selected: Story = { args: { children: 'Housing', selected: true, onClick: () => {} } }
export const Removable: Story = { args: { children: 'Anxiety', onRemove: () => {} } }
export const SelectedRemovable: Story = { args: { children: 'Today', selected: true, onRemove: () => {} } }
export const Disabled: Story = { args: { children: 'Unavailable', disabled: true } }

export const FilterGroup: Story = {
  render: () => {
    const topics = ['Housing', 'Mental health', 'Benefits', 'Employment', 'Relationships']
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {topics.map((t, i) => (
          <Chip key={t} selected={i === 0 || i === 2} onClick={() => {}}>
            {t}
          </Chip>
        ))}
      </div>
    )
  },
}
