import React from 'react'
import type { Preview } from '@storybook/react'
import { TraumaInformedProvider } from '../src/components/TraumaInformedProvider'

const FONT_ID = 'sb-atkinson-font'
function injectFont() {
  if (typeof document !== 'undefined' && !document.getElementById(FONT_ID)) {
    const link = document.createElement('link')
    link.id = FONT_ID
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap'
    document.head.appendChild(link)
  }
}
injectFont()

const preview: Preview = {
  decorators: [
    (Story) => (
      <TraumaInformedProvider>
        <div
          style={{
            padding: '32px',
            fontFamily: "'Atkinson Hyperlegible', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            minHeight: '100vh',
            boxSizing: 'border-box',
            background: '#F6F4F0',
            color: '#2F3134',
          }}
        >
          <Story />
        </div>
      </TraumaInformedProvider>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'warm-off-white',
      values: [
        { name: 'warm-off-white', value: '#F6F4F0' },
        { name: 'parchment',      value: '#ECE7DF' },
        { name: 'reduced-stim',   value: '#15191C' },
      ],
    },
    layout: 'fullscreen',
    docs: {
      toc: true,
    },
  },
}

export default preview
