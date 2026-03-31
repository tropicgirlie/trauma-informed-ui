import type { StorybookConfig } from '@storybook/react-vite'

const isProd = process.env.NODE_ENV === 'production'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    if (isProd) {
      config.base = '/trauma-informed-ui/storybook/'
    }
    return config
  },
}

export default config
