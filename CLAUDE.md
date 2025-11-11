# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite application using React Router for navigation, Tailwind CSS for styling, and Sass/SCSS for custom styles. The project uses pnpm as the package manager.

## Planning & Collaboration

**IMPORTANT**: When planning new features or discussing architecture decisions, create detailed planning documents in the `/planning` directory. This ensures:
- Clear documentation of feature designs and architecture decisions
- Persistent knowledge that can be referenced in future sessions
- Collaboration history for complex features

**Process**:
1. When planning a new feature, create a markdown file in `/planning` (e.g., `/planning/feature-name.md`)
2. Include architecture diagrams, type definitions, component structures, and implementation strategies
3. Document optimization ideas, future enhancements, and usage patterns
4. Reference these planning documents when implementing features

**Existing Plans**:
- `/planning/block-loader-feature.md` - Block loader system for dynamic page building

## Agent Usage

**IMPORTANT**: When working on frontend styling, CSS classes, SCSS, or any frontend theming tasks, ALWAYS use the `frontend-theming-expert` agent. This includes:
- Creating or modifying SCSS files
- Adding new CSS classes or components
- Working with breakpoints and responsive design
- Theming and styling architecture decisions
- Component styling with the dual Tailwind + SCSS approach

## Common Commands

- `pnpm dev` - Start development server with HMR
- `pnpm build` - Type-check with TypeScript and build for production
- `pnpm lint` - Run ESLint on all files
- `pnpm preview` - Preview production build locally

## Architecture

### Routing Structure
- Uses React Router DOM v7 with BrowserRouter
- Routes are defined in `src/App.tsx`
- Pages live in `src/pages/`
- Currently single-route app with potential for expansion

### Styling System
The project uses a **dual styling approach**:

1. **Tailwind CSS v4** - Primary utility-first styling via `@tailwindcss/vite` plugin
2. **Sass/SCSS** - Custom styles with modular organization

#### SCSS Architecture
- Entry point: `src/styles/main.scss`
- Structure uses `@use` for module imports (not `@import`)
- Organization:
  - `_variables.scss` - CSS custom properties
  - `_global.scss` - Global styles
  - `_mixins.scss` - Reusable mixins
  - `components/` - Component-specific SCSS files (e.g., `_navigation-bar.scss`)

**Important**: When adding new component styles:
1. Create SCSS file in `src/styles/components/_component-name.scss`
2. Import in `src/styles/main.scss` using `@use "./components/component-name.scss"`

### Component Structure
- Components in `src/components/`
- Pages in `src/pages/`
- Mix of Tailwind utility classes and custom SCSS classes
- Example: NavigationBar uses custom `.navigation` classes defined in SCSS

### TypeScript Configuration
- Uses project references with separate configs
- `tsconfig.app.json` - Application code config
- `tsconfig.node.json` - Vite config files
- `tsconfig.json` - Root references both

## Tech Stack
- **React 19.1** with StrictMode enabled
- **TypeScript 5.9**
- **Vite 7** for build tooling
- **React Router DOM 7** for routing
- **Tailwind CSS 4** via Vite plugin
- **Sass** for custom styles
- **Radix UI** for accessible components
