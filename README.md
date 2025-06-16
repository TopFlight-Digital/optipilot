# OptiPilot

<div align="center">
 
  <p><a href="https://opensource.org/licenses/MPL-2.0">
      <img alt="MPL-2.0 License" src="https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg" />
  </a></p>
  
  <p><a href="https://chromewebstore.google.com/detail/optipilot/dmlphobmkbabbhpeflkgoljkojgioiai"><img src="https://developer.chrome.com/static/docs/webstore/branding/image/tbyBjqi7Zu733AAKA5n4.png" alt="Available in the Chrome Web Store" /></a></p>

</div>

---

Supercharge your CRO with AI. Analyze your site and generate A/B test ideas to explore and evolve what works

OptiPilot is an Al-powered ideation extension that helps you improve your page conversion rate by recommending a series of hypotheses for A/B tests based on your page content, UI and business objectives. Whether you’re optimising for conversions, engagement, or usability, OptiPilot scans the page, considers your business goals, and delivers tailored suggestions for what to A/B test. It’s built for marketers, designers, and product teams who want faster, smarter ways to uncover what might move the needle.

To get started, first navigate to the web page you want to analyse. Then open the OptiPilot extension, describe your product and page, enter your objective (e.g. increase form submissions), and select the device type. The extension will scan the page and return a set of testable ideas you can use to fuel experimentation.

## Features

- 🔍 **Website Analysis**: Automatically analyze any website for conversion optimization opportunities
- 🤖 **AI-Powered Hypotheses**: Generate intelligent A/B test ideas using OpenAI's GPT models
- 🎯 **Targeted Suggestions**: Get specific, actionable recommendations based on your site's content
- 📊 **Export Capabilities**: Generate professional PDF reports of your optimization ideas
- 🌐 **Browser Extension**: Works seamlessly as you browse, no separate app needed

## Roadmap

All development should contribute to the following roadmap:

https://docs.google.com/document/d/1GGhOlep1j7E2mD0awV2E8USHGhIM8HXCdAK5OepNU0M/edit?tab=t.0

## Architecture

OptiPilot consists of two main components:

- **Frontend**: Vue 3 browser extension with TypeScript
- **Backend**: Encore.ts API server for AI processing and report generation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Proto**: The toolchain for managing Node.js versions. Install from [Proto](https://moonrepo.dev/docs/proto/install)
- **Node.js**: Managed by `proto`, which enforces the latest LTS version *(v20.9.0)*
- **pnpm**: For managing dependencies. Install from [pnpm](https://pnpm.io/installation)
- **Docker**: Required for the backend database (if running backend locally)

### Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/optipilot.git
cd optipilot
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

You'll need API keys for the following services:

- **OpenAI API**: For AI-powered analysis ([Get API key](https://platform.openai.com/api-keys))
- **PDF Monkey**: For report generation ([Sign up](https://www.pdfmonkey.io/))

Create your environment configuration:

```bash
# Copy the example secrets file
cp backend/.secrets.local.cue.example backend/.secrets.local.cue

# Edit the file and add your API keys
# backend/.secrets.local.cue
OpenAIAPIKey: "your-openai-api-key"
AssistantID: "your-openai-assistant-id"
PdfMonkeyApiKey: "your-pdf-monkey-api-key"
DownloadableTemplateId: "your-template-id"
```

### 4. Development

#### Frontend (Chrome Extension)

Build the extension in development mode:

```bash
pnpm dev
```

This creates a `dist` folder with the extension files. To load it in Chrome:

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `dist` folder
4. The OptiPilot extension should now appear in your extensions

#### Backend (API Server)

Navigate to the backend directory and start the server:

```bash
cd backend
encore run
```

The API will be available at `http://localhost:4000`

#### Frontend (Web Preview)

For development without extension APIs:

```bash
pnpm serve
```

This starts a web version at `http://localhost:5173`

### Available Scripts

### Frontend
- **`pnpm dev`**: Build extension in watch mode for development
- **`pnpm serve`**: Run as web application (limited functionality)
- **`pnpm build`**: Build for production
- **`pnpm components`**: Start Storybook component library

### Backend
- **`encore run`**: Start the development server
- **`encore test`**: Run tests
- **`encore build docker`**: Build Docker image for deployment

## Component Development

OptiPilot uses Storybook for component development:

```bash
pnpm components
```

Visit `http://localhost:4321` to view and develop components in isolation.

## Development Features

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Storybook** for component development
- **ESLint** for code quality
- **Auto-imports** for Vue composables and components
- **Hot reload** for fast development

### Recommended VSCode Extensions

OptiPilot requires the following permissions:
- `activeTab`: To analyze the current tab
- `<all_urls>`: To work on any website
- `scripting`: To inject analysis scripts
- `tabs`: To manage tab information

To install the recommended extensions:

The backend provides the following main endpoints:

- `POST /prompt.analyze` - Analyze business information from a URL
- `POST /prompt.generateHypotheses` - Generate A/B test hypotheses
- `POST /prompt.generateTitle` - Generate experiment titles
- `POST /proposal.generate` - Generate PDF reports
- `GET /proposal.status` - Check report generation status

### VSCode Settings

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Linting and Formatting

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### EditorConfig

The `.editorconfig` file defines consistent code styles across different editors, enforcing:

- 4 spaces for indentation.
- LF for line endings.
- UTF-8 encoding.
- Trimming trailing whitespace.
