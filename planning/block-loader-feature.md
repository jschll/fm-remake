# Block Loader Feature - Architecture & Planning

## Overview

A flexible, type-safe block loader system for building dynamic pages from composable blocks. This feature enables a page builder approach where content is fetched from an API/CMS and rendered as React components with support for nested composition.

## Use Cases

- **Dynamic page builder** - Build entire pages from API-driven block configurations
- **Content blocks** - Hero sections, text content, images, galleries
- **Interactive blocks** - Forms, CTAs, buttons
- **Layout blocks** - Containers, grids, columns for organizing other blocks

## Architecture Design

### Core Concepts

1. **Block Loader** - Main component that receives block data and renders the appropriate block components
2. **Block Registry** - Central mapping of block type strings to React components
3. **Block Components** - Individual, self-contained components for each block type
4. **Nested Composition** - Blocks can contain other blocks (recursive rendering)
5. **Type Safety** - Full TypeScript support across types, services, and components

### Design Principles

Following the existing project patterns:
- **Configuration-driven** - Like NavigationBar, use data structures to drive rendering
- **Kebab-case files** - Component files named like `hero-block.tsx`
- **Default exports** - Continue using default exports for components
- **Dual styling** - Tailwind utilities + custom SCSS for complex styles
- **Module system** - Use `@use` in SCSS, proper ES modules in TypeScript

## Directory Structure

```
src/
├── types/
│   ├── blocks.ts           # Core block interfaces
│   ├── block-data.ts       # Specific data types for each block
│   └── block-registry.ts   # Registry type definitions
│
├── services/
│   ├── blocks-api.ts       # API/CMS data fetching
│   └── block-loader-service.ts  # Block validation & resolution
│
├── components/
│   ├── block-loader.tsx    # Main loader component
│   └── blocks/
│       ├── hero-block.tsx
│       ├── text-block.tsx
│       ├── image-block.tsx
│       ├── cta-block.tsx
│       ├── form-block.tsx
│       ├── container-block.tsx
│       ├── grid-block.tsx
│       └── columns-block.tsx
│
├── utils/
│   └── block-registry.ts   # Type-to-component mapping
│
└── styles/
    └── components/
        └── blocks/
            ├── _block-loader.scss
            ├── _hero-block.scss
            ├── _text-block.scss
            ├── _image-block.scss
            ├── _cta-block.scss
            ├── _form-block.scss
            ├── _container-block.scss
            ├── _grid-block.scss
            └── _columns-block.scss
```

## Type Definitions Strategy

### Core Types (`src/types/blocks.ts`)

```typescript
/**
 * Base block interface - all blocks extend this
 */
export interface BaseBlock {
  id: string;                    // Unique identifier for the block
  type: BlockType;               // Block type for registry lookup
  data: Record<string, unknown>; // Type-specific data
  children?: BaseBlock[];        // Support for nested blocks
}

/**
 * Block type enum for type safety
 */
export type BlockType =
  | 'hero'
  | 'text'
  | 'image'
  | 'cta'
  | 'form'
  | 'container'
  | 'grid'
  | 'columns';

/**
 * Generic block interface with typed data
 */
export interface Block<T = Record<string, unknown>> extends BaseBlock {
  data: T;
}

/**
 * Block loader props
 */
export interface BlockLoaderProps {
  blocks: BaseBlock[];
  className?: string;
}

/**
 * Individual block component props
 */
export interface BlockComponentProps<T = Record<string, unknown>> {
  id: string;
  data: T;
  children?: BaseBlock[];
}
```

### Specific Block Data Types (`src/types/block-data.ts`)

```typescript
export interface HeroBlockData {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
  alignment?: 'left' | 'center' | 'right';
}

export interface TextBlockData {
  content: string;
  variant?: 'paragraph' | 'heading' | 'quote';
  alignment?: 'left' | 'center' | 'right' | 'justify';
}

export interface ImageBlockData {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface CtaBlockData {
  text: string;
  link: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

export interface FormBlockData {
  title?: string;
  fields: FormField[];
  submitText?: string;
  onSubmit?: string; // API endpoint or form handler
}

export interface FormField {
  name: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[]; // For select fields
}

export interface ContainerBlockData {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  backgroundColor?: string;
}

export interface GridBlockData {
  columns?: number;
  gap?: 'sm' | 'md' | 'lg';
  responsive?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

export interface ColumnsBlockData {
  distribution?: 'equal' | 'auto' | number[]; // e.g., [2, 1] for 2/3 - 1/3
  gap?: 'sm' | 'md' | 'lg';
}
```

### Registry Types (`src/types/block-registry.ts`)

```typescript
import type { ComponentType } from 'react';
import type { BlockType, BlockComponentProps } from './blocks';

export type BlockComponent = ComponentType<BlockComponentProps<any>>;

export type BlockRegistry = Record<BlockType, BlockComponent>;
```

## Services Strategy

### API Service (`src/services/blocks-api.ts`)

```typescript
import type { BaseBlock } from '../types/blocks';

export interface BlocksApiResponse {
  blocks: BaseBlock[];
  meta?: {
    page?: string;
    version?: string;
  };
}

export interface BlocksApiError {
  message: string;
  code?: string;
}

/**
 * Fetch blocks from API/CMS
 */
export async function fetchBlocks(pageId: string): Promise<BaseBlock[]> {
  try {
    const response = await fetch(`/api/blocks/${pageId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch blocks: ${response.statusText}`);
    }

    const data: BlocksApiResponse = await response.json();
    return data.blocks;
  } catch (error) {
    console.error('Error fetching blocks:', error);
    throw error;
  }
}

/**
 * Fetch single block by ID
 */
export async function fetchBlock(blockId: string): Promise<BaseBlock> {
  try {
    const response = await fetch(`/api/block/${blockId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch block: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching block:', error);
    throw error;
  }
}
```

### Block Loader Service (`src/services/block-loader-service.ts`)

```typescript
import type { BaseBlock, BlockType } from '../types/blocks';

/**
 * Validate block structure
 */
export function validateBlock(block: unknown): block is BaseBlock {
  if (!block || typeof block !== 'object') return false;

  const b = block as Partial<BaseBlock>;

  return (
    typeof b.id === 'string' &&
    typeof b.type === 'string' &&
    typeof b.data === 'object' &&
    b.data !== null
  );
}

/**
 * Validate array of blocks
 */
export function validateBlocks(blocks: unknown[]): BaseBlock[] {
  return blocks.filter(validateBlock);
}

/**
 * Recursively validate nested blocks
 */
export function validateNestedBlocks(block: BaseBlock): BaseBlock {
  const validated = { ...block };

  if (validated.children && Array.isArray(validated.children)) {
    validated.children = validated.children
      .filter(validateBlock)
      .map(validateNestedBlocks);
  }

  return validated;
}

/**
 * Check if block type is valid
 */
export function isValidBlockType(type: string): type is BlockType {
  const validTypes: BlockType[] = [
    'hero',
    'text',
    'image',
    'cta',
    'form',
    'container',
    'grid',
    'columns'
  ];

  return validTypes.includes(type as BlockType);
}
```

## Component Implementation

### Block Registry (`src/utils/block-registry.ts`)

```typescript
import type { BlockRegistry } from '../types/block-registry';
import HeroBlock from '../components/blocks/hero-block';
import TextBlock from '../components/blocks/text-block';
import ImageBlock from '../components/blocks/image-block';
import CtaBlock from '../components/blocks/cta-block';
import FormBlock from '../components/blocks/form-block';
import ContainerBlock from '../components/blocks/container-block';
import GridBlock from '../components/blocks/grid-block';
import ColumnsBlock from '../components/blocks/columns-block';

export const blockRegistry: BlockRegistry = {
  hero: HeroBlock,
  text: TextBlock,
  image: ImageBlock,
  cta: CtaBlock,
  form: FormBlock,
  container: ContainerBlock,
  grid: GridBlock,
  columns: ColumnsBlock,
};

export function getBlockComponent(type: string) {
  return blockRegistry[type as keyof BlockRegistry];
}
```

### Block Loader Component (`src/components/block-loader.tsx`)

```typescript
import type { BlockLoaderProps } from '../types/blocks';
import { getBlockComponent } from '../utils/block-registry';

export default function BlockLoader({ blocks, className }: BlockLoaderProps) {
  return (
    <div className={className}>
      {blocks.map((block) => {
        const Component = getBlockComponent(block.type);

        if (!Component) {
          console.warn(`Unknown block type: ${block.type}`);
          return null;
        }

        return (
          <Component
            key={block.id}
            id={block.id}
            data={block.data}
            children={block.children}
          />
        );
      })}
    </div>
  );
}
```

### Example Block Component (`src/components/blocks/hero-block.tsx`)

```typescript
import type { BlockComponentProps } from '../../types/blocks';
import type { HeroBlockData } from '../../types/block-data';

export default function HeroBlock({
  id,
  data
}: BlockComponentProps<HeroBlockData>) {
  const { title, subtitle, backgroundImage, ctaText, ctaLink, alignment = 'center' } = data;

  return (
    <section
      id={id}
      className={`hero-block hero-block--${alignment}`}
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }}
    >
      <div className="hero-block__content">
        <h1 className="hero-block__title">{title}</h1>
        {subtitle && <p className="hero-block__subtitle">{subtitle}</p>}
        {ctaText && ctaLink && (
          <a href={ctaLink} className="hero-block__cta">
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}
```

### Container Block with Nested Rendering (`src/components/blocks/container-block.tsx`)

```typescript
import type { BlockComponentProps } from '../../types/blocks';
import type { ContainerBlockData } from '../../types/block-data';
import BlockLoader from '../block-loader';

export default function ContainerBlock({
  id,
  data,
  children
}: BlockComponentProps<ContainerBlockData>) {
  const { maxWidth = 'lg', padding = 'md', backgroundColor } = data;

  return (
    <div
      id={id}
      className={`container-block container-block--${maxWidth} container-block--padding-${padding}`}
      style={{ backgroundColor }}
    >
      {children && children.length > 0 && (
        <BlockLoader blocks={children} />
      )}
    </div>
  );
}
```

## Styling Strategy

### SCSS Structure

Each block gets its own SCSS file following the BEM-like pattern used in the project:

```scss
// src/styles/components/blocks/_hero-block.scss
@use "../../variables" as *;
@use "../../mixins" as *;

@layer base {
  .hero-block {
    position: relative;
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-position: center;

    &--left {
      justify-content: flex-start;
    }

    &--right {
      justify-content: flex-end;
    }

    &--center {
      justify-content: center;
    }

    &__content {
      max-width: 800px;
      padding: var(--spacing-lg, 2rem);
      text-align: inherit;
    }

    &__title {
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: bold;
      margin-bottom: 1rem;
    }

    &__subtitle {
      font-size: clamp(1rem, 2vw, 1.5rem);
      margin-bottom: 2rem;
    }

    &__cta {
      display: inline-block;
      padding: 1rem 2rem;
      background-color: var(--color-primary, #007bff);
      color: white;
      text-decoration: none;
      border-radius: 0.5rem;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: var(--color-primary-dark, #0056b3);
      }
    }

    @include breakpoint-down(md) {
      min-height: 40vh;

      &__content {
        padding: var(--spacing-md, 1.5rem);
      }
    }
  }
}
```

### Main SCSS Import

Add to `src/styles/main.scss`:

```scss
// Block components
@use "./components/blocks/hero-block";
@use "./components/blocks/text-block";
@use "./components/blocks/image-block";
@use "./components/blocks/cta-block";
@use "./components/blocks/form-block";
@use "./components/blocks/container-block";
@use "./components/blocks/grid-block";
@use "./components/blocks/columns-block";
```

## Nested Block Strategy

### How It Works

1. **Layout blocks** (container, grid, columns) accept `children` prop
2. These blocks render a `<BlockLoader>` component for their children
3. BlockLoader recursively renders child blocks, which may themselves have children
4. This creates an unlimited nesting depth

### Example Nested Structure

```json
{
  "id": "page-1",
  "blocks": [
    {
      "id": "container-1",
      "type": "container",
      "data": {
        "maxWidth": "lg",
        "padding": "md"
      },
      "children": [
        {
          "id": "hero-1",
          "type": "hero",
          "data": {
            "title": "Welcome",
            "subtitle": "To our site"
          }
        },
        {
          "id": "grid-1",
          "type": "grid",
          "data": {
            "columns": 3,
            "gap": "md"
          },
          "children": [
            {
              "id": "text-1",
              "type": "text",
              "data": {
                "content": "Column 1 content"
              }
            },
            {
              "id": "text-2",
              "type": "text",
              "data": {
                "content": "Column 2 content"
              }
            },
            {
              "id": "text-3",
              "type": "text",
              "data": {
                "content": "Column 3 content"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

## API/CMS Integration

### Usage Pattern

```typescript
// In a page component
import { useEffect, useState } from 'react';
import BlockLoader from '../components/block-loader';
import { fetchBlocks } from '../services/blocks-api';
import type { BaseBlock } from '../types/blocks';

export default function DynamicPage() {
  const [blocks, setBlocks] = useState<BaseBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBlocks() {
      try {
        const data = await fetchBlocks('home-page');
        setBlocks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blocks');
      } finally {
        setLoading(false);
      }
    }

    loadBlocks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <BlockLoader blocks={blocks} />;
}
```

### CMS Data Format

The API/CMS should return blocks in this format:

```json
{
  "blocks": [
    {
      "id": "unique-id",
      "type": "hero",
      "data": {
        "title": "Welcome",
        "subtitle": "Subtitle here"
      },
      "children": []
    }
  ],
  "meta": {
    "page": "home",
    "version": "1.0"
  }
}
```

## Performance Optimizations

### 1. Code Splitting / Lazy Loading

```typescript
// src/utils/block-registry.ts with lazy loading
import { lazy } from 'react';
import type { BlockRegistry } from '../types/block-registry';

export const blockRegistry: BlockRegistry = {
  hero: lazy(() => import('../components/blocks/hero-block')),
  text: lazy(() => import('../components/blocks/text-block')),
  image: lazy(() => import('../components/blocks/image-block')),
  cta: lazy(() => import('../components/blocks/cta-block')),
  form: lazy(() => import('../components/blocks/form-block')),
  container: lazy(() => import('../components/blocks/container-block')),
  grid: lazy(() => import('../components/blocks/grid-block')),
  columns: lazy(() => import('../components/blocks/columns-block')),
};

// Update BlockLoader to use Suspense
import { Suspense } from 'react';

export default function BlockLoader({ blocks, className }: BlockLoaderProps) {
  return (
    <div className={className}>
      {blocks.map((block) => {
        const Component = getBlockComponent(block.type);

        if (!Component) {
          console.warn(`Unknown block type: ${block.type}`);
          return null;
        }

        return (
          <Suspense key={block.id} fallback={<div>Loading block...</div>}>
            <Component
              id={block.id}
              data={block.data}
              children={block.children}
            />
          </Suspense>
        );
      })}
    </div>
  );
}
```

### 2. Memoization

```typescript
import { memo } from 'react';

const HeroBlock = memo(function HeroBlock({ id, data }: BlockComponentProps<HeroBlockData>) {
  // Component implementation
});

export default HeroBlock;
```

### 3. Error Boundaries

```typescript
// src/components/block-error-boundary.tsx
import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  blockId: string;
}

interface State {
  hasError: boolean;
}

export class BlockErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error(`Error in block ${this.props.blockId}:`, error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="block-error">
          Failed to render block {this.props.blockId}
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage in BlockLoader
<BlockErrorBoundary key={block.id} blockId={block.id}>
  <Component {...props} />
</BlockErrorBoundary>
```

## Future Enhancements

### 1. Visual Editor Integration
- Drag-and-drop interface for arranging blocks
- Live preview while editing
- WYSIWYG editing for text blocks

### 2. Block Variants
- Multiple visual styles per block type
- Theme support (light/dark mode)
- Brand-specific styling presets

### 3. Conditional Rendering
- Show/hide blocks based on user permissions
- A/B testing support
- Scheduled content (publish/unpublish dates)

### 4. Advanced Layout Blocks
- Tab container block
- Accordion block
- Carousel/slider block
- Modal/dialog block

### 5. Animation Support
- Scroll-triggered animations
- Entrance/exit animations
- Parallax effects for hero blocks

### 6. SEO Enhancements
- Dynamic meta tags based on block content
- Structured data generation
- Open Graph image generation

### 7. Analytics Integration
- Track block impressions
- CTA click tracking
- Form submission analytics

### 8. Block Presets/Templates
- Pre-configured block combinations
- Save custom configurations
- Block library/marketplace

## Example Usage Patterns

### Simple Page

```typescript
import BlockLoader from '../components/block-loader';

const blocks = [
  {
    id: 'hero-1',
    type: 'hero',
    data: {
      title: 'Welcome to Our Site',
      subtitle: 'We build amazing things',
      backgroundImage: '/images/hero.jpg',
      ctaText: 'Get Started',
      ctaLink: '/signup'
    }
  },
  {
    id: 'text-1',
    type: 'text',
    data: {
      content: 'This is some introductory text...',
      variant: 'paragraph',
      alignment: 'center'
    }
  }
];

export default function HomePage() {
  return <BlockLoader blocks={blocks} />;
}
```

### Complex Nested Layout

```typescript
const blocks = [
  {
    id: 'container-1',
    type: 'container',
    data: { maxWidth: 'xl', padding: 'lg' },
    children: [
      {
        id: 'hero-1',
        type: 'hero',
        data: { title: 'Features' }
      },
      {
        id: 'grid-1',
        type: 'grid',
        data: {
          columns: 3,
          gap: 'md',
          responsive: {
            mobile: 1,
            tablet: 2,
            desktop: 3
          }
        },
        children: [
          {
            id: 'feature-1',
            type: 'container',
            data: { padding: 'md' },
            children: [
              {
                id: 'img-1',
                type: 'image',
                data: { src: '/feature1.jpg', alt: 'Feature 1' }
              },
              {
                id: 'text-1',
                type: 'text',
                data: { content: 'Feature 1 description' }
              },
              {
                id: 'cta-1',
                type: 'cta',
                data: { text: 'Learn More', link: '/feature1' }
              }
            ]
          },
          // ... more feature blocks
        ]
      }
    ]
  }
];
```

### With API Data

```typescript
import { useEffect, useState } from 'react';
import BlockLoader from '../components/block-loader';
import { fetchBlocks } from '../services/blocks-api';

export default function CMSPage({ pageId }: { pageId: string }) {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlocks(pageId)
      .then(setBlocks)
      .finally(() => setLoading(false));
  }, [pageId]);

  if (loading) return <div>Loading...</div>;

  return <BlockLoader blocks={blocks} className="cms-page" />;
}
```

## Implementation Checklist

- [ ] Create directory structure (types, services, components/blocks, styles/components/blocks)
- [ ] Define TypeScript types (blocks.ts, block-data.ts, block-registry.ts)
- [ ] Implement services (blocks-api.ts, block-loader-service.ts)
- [ ] Create block registry (utils/block-registry.ts)
- [ ] Build BlockLoader component
- [ ] Create individual block components (start with hero, text, image)
- [ ] Add layout blocks with nested support (container, grid, columns)
- [ ] Create SCSS files for each block
- [ ] Add error boundaries
- [ ] Add loading states
- [ ] Implement lazy loading (optional optimization)
- [ ] Create example page using BlockLoader
- [ ] Test nested block rendering
- [ ] Test API integration
- [ ] Document usage patterns

## Notes

- Start with a minimal set of blocks (hero, text, image, container) and expand
- Focus on type safety from the beginning
- Ensure nested rendering works before adding complex features
- Consider using React.memo for performance once basic implementation is complete
- Add proper error handling and validation early
