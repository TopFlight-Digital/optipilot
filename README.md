# Optipilot

Optipilot is a CRO experiment ideation tool built on top of OpenAI API encapsulated into a browser extension.

Supercharge your CRO with AI. Analyze your site and generate A/B test ideas to explore and evolve what works

OptiPilot is an Al-powered ideation extension that helps you improve your page conversion rate by recommending a series of hypotheses for A/B tests based on your page content, UI and business objectives. Whether you’re optimising for conversions, engagement, or usability, OptiPilot scans the page, considers your business goals, and delivers tailored suggestions for what to A/B test. It’s built for marketers, designers, and product teams who want faster, smarter ways to uncover what might move the needle.

To get started, first navigate to the web page you want to analyse. Then open the OptiPilot extension, describe your product and page, enter your objective (e.g. increase form submissions), and select the device type. The extension will scan the page and return a set of testable ideas you can use to fuel experimentation.

## Contribution technicals

### DX Features

- **Vue 3** for building reactive UIs.
- **Storybook** for components preview.
- **ESLint** for maintaining code quality and consistency (instead of prettier)
- **Automatic import and component registration** using `unplugin-auto-import` and `unplugin-vue-components`.

### Prerequisites

Before you begin, ensure you have the following requirements:

- **Proto**: The toolchain for managing Node.js versions. Install it from [Proto](https://moonrepo.dev/docs/proto/install).
- **Node.js**: Managed by `proto`, which enforces the latest LTS version *(v20.9.0)*.
- **pnpm**: For managing dependencies. Install it from [pnpm](https://pnpm.io/installation)

### Setup

1. Clone the repository:

   ```bash
   git clone git@github.com:TopFlight-Digital/optipilot.git
   ```

2. Navigate to the project directory:

   ```bash
   cd optipilot
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

### Available Scripts

- **`pnpm dev`**: Builds the project in a development watch mode, usable for working in an extension mode.

  ```bash
  pnpm dev
  ```

- **`pnpm serve`**: Serves the project as a frontend application, has a limitation of extension API-s not being available.

  ```bash
  pnpm serve
  ```

- **`pnpm components`**: Starts the Storybook server for developing components.

  ```bash
  pnpm components
  ```

### Manifest

The project includes a **Chrome extension manifest (v3)** configuration defined in `public/manifest.json`. Please note that any change made to is requires restarting `pnpm dev`.

### Recommended VSCode Extensions

This project includes a set of recommended VSCode extensions, which are defined in `.vscode/extensions.json`. These extensions ensure a smooth development experience and help maintain consistency.

To install the recommended extensions:

1. Open the project in VSCode.
2. You should see a prompt in the bottom right suggesting installing the recommended extensions. Click **Install All**.

Alternatively, you can manually install these extensions from the VSCode Extensions Marketplace. You can find them by copying their ids (`.vscode/extensions.json`) one by one into the extension searchbar.

### VSCode Settings

The project includes VSCode-specific settings in `.vscode/settings.json`, which configures the editor to enforce formatting and code quality. Please maintain it and add keep ading relevant settings to it over time to improve DX.

### Linting and Formatting

This project uses **ESLint** with several plugins to ensure code quality. Please disable prettier for this project if you use it because it's gonna try to take over responsibilities that ESLint has in this repository.

### EditorConfig

The `.editorconfig` file defines consistent code styles across different editors, enforcing:

- 4 spaces for indentation.
- LF for line endings.
- UTF-8 encoding.
- Trimming trailing whitespace.

### License

This project is private and its source code is not intended for public distribution.
