# Bodha - Public Repository

[Website](https://www.bodharesearch.in/) | [Blog](https://www.bodharesearch.in/blog) | [X/Twitter](https://x.com/BodhaResearch)

## What is Bodha

Bodha is an independent think tank and research initiative focused on contemporary issues of cultural concern in India. We seek to inform core areas of public policy with wisdom drawn from Hindu traditions, Indian Knowledge Systems (IKS), and rigorous field-based research in anthropology, sociology, and ethnography. Our core conviction: India is a living civilization whose soul resides in its practices, not just its principles. Policy recommendations for India must therefore emerge from culture-sensitive, field-tested methodology.

This public repository hosts the codebase for our website, shared for anyone looking to replicate aspects of our design or information architecture. Questions can be sent to us at contact@bodharesearch.in

> "Code is a craft. Culture is a compass."

## Tech Stack
- Framework: Sveltekit
- Build tool: Vite
- Language: Svelte, Typescript, SASS, Markdown
- Styling: custom SASS
- Package manager: Yarn
- Hosting: Vercel, pulling from Github
- Other: Supabase for db management
- MDSVex for markdown support

## Repository Structure

```
bodharesearch.in/
├── .vscode/              # VS Code editor settings
├── src/                  # Application source code
│   ├── lib/              # Reusable components and utilities
│   ├── routes/           # SvelteKit pages and endpoints
│   └── app.html          # Main HTML template
├── static/               # Static assets (images, fonts, robots.txt, etc.)
├── .gitattributes        # Git attributes for line endings
├── .gitignore            # Git ignore rules
├── .npmrc                # npm configuration
├── .prettierignore       # Prettier ignore rules
├── .prettierrc           # Prettier configuration
├── package.json          # Project dependencies and scripts
├── svelte.config.js      # SvelteKit configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite build configuration
├── yarn.lock             # Yarn lock file
└── README.md             # This file
```

## Getting Started

**Prerequisites**
- Node.js (v18 or higher recommended)
- Yarn (`npm install -g yarn`)

```bash
# Clone the repo
git clone https://github.com/bodharesearch/bodharesearch.in.git
cd bodharesearch.in

# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

The website code in this repository is licensed under [MIT License](https://mit-license.org/).
**Content on bodharesearch.in (text, images, research outputs) is © Bodha and may not be reused without permission, unless explicitly marked otherwise.**