# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite application featuring a **dynamic block-based page builder system** with configuration-driven content rendering. The project uses React Router for navigation, a dual styling approach (Tailwind CSS v4 + Sass/SCSS), and pnpm as the package manager.

**Key Features**:
- Block Loader System - Configuration-driven dynamic page building
- Framed Sections UI System - Advanced theming with @layer architecture
- Type-safe block composition with recursive nesting
- Error boundary isolation per block
- Registry pattern for block type-to-component mapping

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
- `/planning/framed-sections-feature.md` - Framed sections UI component system

**Documentation**:
- `/docs/framed-sections-architecture.md` - Comprehensive framed sections architecture
- `/docs/framed-sections-integration.md` - Integration guidelines

## Agent Usage

**IMPORTANT**: When working on frontend styling, CSS classes, SCSS, or any frontend theming tasks, ALWAYS use the `frontend-theming-expert` agent. This includes:
- Creating or modifying SCSS files
- Adding new CSS classes or components
- Working with breakpoints and responsive design
- Theming and styling architecture decisions
- Component styling with the dual Tailwind + SCSS approach
- CSS @layer organization

**IMPORTANT**: When working with the block loader system, ALWAYS use the `block-loader-architect` agent. This includes:
- Creating new block types or block components
- Modifying block composition and nesting logic
- Working with block validation and type safety
- Integrating with API endpoints for block data
- Debugging block rendering issues

## Common Commands

- `pnpm dev` - Start development server with HMR
- `pnpm build` - Type-check with TypeScript and build for production
- `pnpm lint` - Run ESLint on all files
- `pnpm preview` - Preview production build locally

## Architecture

### Directory Structure

```
/src
├── components/
│   ├── block-loader.tsx           # Core block rendering engine
│   ├── block-error-boundary.tsx   # Error isolation wrapper
│   ├── blocks/                    # Individual block components (9 types)
│   │   ├── hero-block.tsx
│   │   ├── text-block.tsx
│   │   ├── image-block.tsx
│   │   ├── cta-block.tsx
│   │   ├── form-block.tsx
│   │   ├── container-block.tsx
│   │   ├── grid-block.tsx
│   │   ├── columns-block.tsx
│   │   └── navigation-block.tsx
│   ├── examples/
│   │   └── FramedSectionExamples.tsx
│   └── ui/
│       └── button.tsx
├── pages/
│   ├── starting-page.tsx
│   ├── blocks-demo.tsx
│   └── FramedSectionsShowcase.tsx
├── services/
│   ├── block-loader-service.ts    # Block validation & processing
│   └── blocks-api.ts              # API integration
├── styles/
│   ├── main.scss                  # Entry point
│   ├── _variables.scss            # Design tokens, breakpoints
│   ├── _global.scss               # Global styles
│   ├── _mixins.scss               # Breakpoint helpers, utilities
│   └── components/
│       ├── blocks/                # Block-specific styles
│       └── ui/                    # UI component styles
├── types/
│   ├── blocks.ts                  # Core block interfaces
│   ├── block-data.ts              # Data type definitions
│   └── block-registry.ts          # Registry types
└── utils/
    └── block-registry.ts          # Type-to-component mapping
```

### Block Loader System

**Core Concept**: Configuration-driven page building where pages are composed of JSON block configurations that are dynamically rendered into React components.

**Block Component Interface**:
```typescript
interface BlockComponentProps<T = Record<string, unknown>> {
  id: string;                    // Unique block identifier
  data: T;                       // Type-safe block-specific data
  children?: BaseBlock[];        // Optional nested blocks
}
```

**Available Block Types**:
1. **hero** - Large banner with title, subtitle, background image, CTA
2. **text** - Flexible text with variants (paragraph, heading, quote)
3. **image** - Responsive image with optional caption, lazy loading
4. **cta** - Call-to-action button/link with variants and sizes
5. **form** - Dynamic form builder with multiple field types
6. **container** - Wrapper with max-width and padding controls
7. **grid** - CSS grid layout for responsive content arrangement
8. **columns** - Flexible column layout with custom distribution
9. **navigation** - Navigation bar with logo, links, Lucide icons

**Key Files**:
- `src/components/block-loader.tsx` - Validates blocks, looks up components, applies error boundaries
- `src/utils/block-registry.ts` - Registry mapping block types to components
- `src/services/block-loader-service.ts` - Validation utilities, depth checking (max depth: 10)
- `src/types/blocks.ts` - Core interfaces and types
- `src/types/block-data.ts` - Data interfaces for each block type

**Adding New Block Types**:
1. Create component in `src/components/blocks/[name]-block.tsx`
2. Define data interface in `src/types/block-data.ts`
3. Add type to `BlockType` union in `src/types/blocks.ts`
4. Register in `src/utils/block-registry.ts`
5. Create SCSS in `src/styles/components/blocks/_[name]-block.scss`
6. Import SCSS in `src/styles/main.scss`

### Routing Structure
- Uses React Router DOM v7 with BrowserRouter
- Routes defined in `src/App.tsx`
- Pages live in `src/pages/`

**Current Routes**:
- `/` - Starting page (navigation + hero)
- `/blocks-demo` - Comprehensive block system demo
- `/framed-sections` - Framed sections showcase

### Styling System
The project uses a **dual styling approach**:

1. **Tailwind CSS v4** - Primary utility-first styling via `@tailwindcss/vite` plugin
2. **Sass/SCSS** - Custom styles with modular organization

#### SCSS Architecture
- Entry point: `src/styles/main.scss`
- Structure uses `@use` for module imports (not `@import`)
- Uses CSS `@layer` directive for proper cascade control

**Layers**:
```scss
@layer base       // Global resets and elements
@layer components // Block and UI component styles
@layer utilities  // Tailwind utilities (auto-generated)
```

**Organization**:
- `_variables.scss` - Design tokens, breakpoints, CSS custom properties
  - Breakpoints: xs (0), sm (576px), md (768px), lg (992px), xl (1200px), xxl (1400px)
  - Colors: `--bg-dark`, `--bg`, `--bg-light`, `--text`, `--text-muted`, `--highlight`
  - Borders, shadows, frame theming variables
- `_global.scss` - Global styles, container utilities
- `_mixins.scss` - Responsive breakpoint mixins, utility mixins
  - `breakpoint-up()`, `breakpoint-down()`, `breakpoint-between()`, `breakpoint-only()`
  - `diagonal-stripes`, `gradient-border`, `frame-structure`
- `components/blocks/` - Block-specific SCSS files
- `components/ui/` - UI component SCSS files

**BEM Naming Convention**:
```scss
.hero-block {
  &--left, &--center, &--right  // Variants
  &__content                     // Elements
  &__title
}
```

**Important**: When adding new component styles:
1. Create SCSS file in `src/styles/components/blocks/_component-name.scss` or `src/styles/components/ui/_component-name.scss`
2. Import in `src/styles/main.scss` using `@use "./components/blocks/component-name.scss"`
3. Use appropriate `@layer` directive (components for custom styles)
4. Follow BEM naming convention

### Component Patterns

**Error Boundary Pattern**:
Each block is wrapped in `BlockErrorBoundary`:
- Catches rendering errors per block
- Logs error details to console
- Renders error UI instead of breaking entire page
- Shows error details in development mode

**Composition Pattern**:
Layout blocks support recursive nesting:
```typescript
{
  id: 'container-1',
  type: 'container',
  data: { maxWidth: 'lg' },
  children: [
    { id: 'text-1', type: 'text', data: { content: '...' } },
    // ... more nested blocks
  ]
}
```

**Registry Pattern**:
```typescript
export const blockRegistry: BlockRegistry = {
  hero: HeroBlock,
  text: TextBlock,
  // ... other blocks
};

export function getBlockComponent(type: string)
```

### Type System

**Type Safety Features**:
- Full TypeScript coverage across all layers
- Generic `BlockComponentProps<T>` for typed block data
- Type guards for runtime validation
- Strict null checks and unused variable detection enabled

**Key Type Files**:
- `src/types/blocks.ts` - `BlockType`, `BaseBlock`, `Block<T>`, `BlockComponentProps<T>`
- `src/types/block-data.ts` - Data interfaces for each block (e.g., `HeroBlockData`)
- `src/types/block-registry.ts` - `BlockComponent`, `BlockRegistry`

**Validation**:
- `validateBlock()` - Type guard for block validation
- `validateBlocks()` - Array validation
- `validateNestedBlocks()` - Recursive validation
- `validateBlockDepth()` - Depth limit enforcement (MAX_BLOCK_DEPTH = 10)

### TypeScript Configuration
- Uses project references with separate configs
- `tsconfig.app.json` - Application code config (ES2022 target, strict mode)
- `tsconfig.node.json` - Vite config files
- `tsconfig.json` - Root references both

## Tech Stack
- **React 19.1** with StrictMode enabled
- **TypeScript 5.9** with strict mode
- **Vite 7.1** for build tooling with HMR
- **React Router DOM 7.9** for routing
- **Tailwind CSS 4.1** via Vite plugin
- **Sass 1.93** for custom styles
- **Radix UI 1.4** for accessible component primitives
- **Lucide React 0.548** for icons (19,000+ available)
- **Geist Mono** font family (weights 100-900)
- **ESLint 9** with flat config for linting

## Development Workflows

### Frontend Styling Work
Use the `frontend-theming-expert` agent for all SCSS and CSS tasks.

### Block Development
1. Use the `block-loader-architect` agent
2. Define types in `src/types/block-data.ts`
3. Create component in `src/components/blocks/`
4. Add SCSS in `src/styles/components/blocks/`
5. Register in `src/utils/block-registry.ts`
6. Test in `src/pages/blocks-demo.tsx`

### Feature Planning
1. Create planning doc in `/planning/feature-name.md`
2. Document architecture, types, implementation strategy
3. Reference plan during implementation

## Code Conventions

- **File Naming**: kebab-case (e.g., `hero-block.tsx`)
- **Component Exports**: Default exports for components
- **CSS Naming**: BEM convention (e.g., `.hero-block__title`)
- **SCSS Imports**: Use `@use` (not `@import`)
- **Comments**: Document types, interfaces, and complex functions
- **Error Handling**: Use error boundaries for component isolation
