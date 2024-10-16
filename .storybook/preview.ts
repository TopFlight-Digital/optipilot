import type { Preview } from "@storybook/vue3";
import './index.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
        default: 'dark',
        // “Any color the customer wants, as long as it’s black.”
        values: [
            { name: 'dark', value: '#090B0E' },
        ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
