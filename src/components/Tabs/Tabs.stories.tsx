import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Tabs, TabList, Tab, TabPanel } from './index'
import { CalmingMessage } from '../DisclosureCard'

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component:
          'ARIA tabs with full keyboard navigation (Arrow keys, Home, End). Always shows the active tab label — users always know where they are.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: () => (
    <Tabs defaultTab="info">
      <TabList>
        <Tab id="info">Information</Tab>
        <Tab id="support">Support options</Tab>
        <Tab id="resources">Resources</Tab>
      </TabList>
      <TabPanel id="info">
        <CalmingMessage>
          This section gives you background information at your own pace. Nothing here is time-limited.
        </CalmingMessage>
      </TabPanel>
      <TabPanel id="support">
        <CalmingMessage variant="dust">
          These support options are available to you at any time, during or after this session.
        </CalmingMessage>
      </TabPanel>
      <TabPanel id="resources">
        <p style={{ fontSize: '14px', color: '#62666D', lineHeight: 1.7, margin: 0 }}>
          External resources including helplines, peer support groups, and local services.
        </p>
      </TabPanel>
    </Tabs>
  ),
}

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultTab="current">
      <TabList>
        <Tab id="current">Current session</Tab>
        <Tab id="history">History</Tab>
        <Tab id="upcoming" disabled>Upcoming (unavailable)</Tab>
      </TabList>
      <TabPanel id="current">
        <p style={{ fontSize: '14px', color: '#62666D', margin: 0 }}>Current session content.</p>
      </TabPanel>
      <TabPanel id="history">
        <p style={{ fontSize: '14px', color: '#62666D', margin: 0 }}>History content.</p>
      </TabPanel>
    </Tabs>
  ),
}
