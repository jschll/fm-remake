# Integrating Framed Sections - Quick Start Guide

## What Are Framed Sections?

Framed sections are bordered container components that create visual structure and hierarchy in your layouts. Think of them as elevated cards or panels with customizable styles.

## Basic Usage

### 1. Import the Styles (Already Done!)

The framed section styles are automatically imported via `src/styles/main.scss`, so you can start using them immediately in any React component.

### 2. Add a Basic Frame

```tsx
// In any component
export function MyComponent() {
  return (
    <div className="framed-section">
      <h2>My Content</h2>
      <p>This content is now in a beautiful framed section!</p>
    </div>
  );
}
```

That's it! You now have a bordered, rounded container with responsive padding.

## Quick Examples

### Hero Section with Decorative Stripes

```tsx
export function HeroSection() {
  return (
    <div className="framed-section framed-section--dark framed-section--striped-inset">
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Welcome to Our Platform
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>
        Build amazing things with our tools
      </p>
    </div>
  );
}
```

### Code Example Display

```tsx
export function CodeExample() {
  const code = `function greet(name: string) {
  return \`Hello, \${name}!\`;
}`;

  return (
    <div className="framed-section framed-section--code">
      <pre style={{ margin: 0 }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
```

### Feature Card with Header and Footer

```tsx
export function FeatureCard() {
  return (
    <div className="framed-section framed-section--emphasis">
      <div className="framed-section__header">
        <h3 className="framed-section__title">Premium Feature</h3>
        <p className="framed-section__description">
          Unlock advanced capabilities
        </p>
      </div>

      <div className="framed-section__content">
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>Unlimited projects</li>
          <li>Advanced analytics</li>
          <li>Priority support</li>
        </ul>
      </div>

      <div className="framed-section__footer">
        <button className="btn btn--primary">
          Upgrade Now
        </button>
      </div>
    </div>
  );
}
```

### Stacked Content Sections

```tsx
export function ContentSections() {
  return (
    <>
      <div className="framed-section">
        <h3 className="framed-section__title">Section 1</h3>
        <p>First piece of content...</p>
      </div>

      <div className="framed-section framed-section--dark">
        <h3 className="framed-section__title">Section 2</h3>
        <p>Second piece of content with dark theme...</p>
      </div>

      <div className="framed-section">
        <h3 className="framed-section__title">Section 3</h3>
        <p>Third piece of content...</p>
      </div>
    </>
  );
}
```

Frames automatically space themselves when stacked!

## Common Variants at a Glance

| Class | Purpose | Visual Effect |
|-------|---------|---------------|
| `.framed-section` | Base frame | Light background, subtle border |
| `.framed-section--dark` | Dark theme | Dark background, stronger border |
| `.framed-section--emphasis` | Important content | Thick border + shadow |
| `.framed-section--code` | Code display | Dark code editor style |
| `.framed-section--striped` | Decorative flair | Diagonal stripes on edges |
| `.framed-section--gradient-border` | Premium feel | Gradient border effect |

## Customizing Colors

You can override colors on any frame using CSS custom properties:

```tsx
<div
  className="framed-section"
  style={{
    '--framed-bg': 'oklch(0.98 0.02 180)',      // Mint tinted background
    '--framed-border': 'oklch(0.6 0.1 180)',    // Teal border
    '--framed-radius': '1rem'                    // Slightly larger radius
  } as React.CSSProperties}
>
  Custom themed content
</div>
```

## Responsive Behavior

Framed sections automatically adjust for mobile:
- Padding reduces on smaller screens
- Font sizes scale appropriately
- Stripe decorations shrink to fit
- Spacing between stacked frames reduces

No extra work needed!

## Using with Your Block System

### Create a Framed Block Component

```tsx
// src/blocks/FramedBlock.tsx
import { BlockComponentProps } from './types';

interface FramedBlockData {
  variant?: 'default' | 'dark' | 'emphasis' | 'code' | 'striped';
  title?: string;
  description?: string;
  content: string;
}

export function FramedBlock({ data }: BlockComponentProps<FramedBlockData>) {
  const variantClass = data.variant && data.variant !== 'default'
    ? `framed-section--${data.variant}`
    : '';

  return (
    <div className={`framed-section ${variantClass}`.trim()}>
      {(data.title || data.description) && (
        <div className="framed-section__header">
          {data.title && (
            <h3 className="framed-section__title">{data.title}</h3>
          )}
          {data.description && (
            <p className="framed-section__description">{data.description}</p>
          )}
        </div>
      )}

      <div className="framed-section__content">
        <p>{data.content}</p>
      </div>
    </div>
  );
}
```

### Register in Block Registry

```typescript
// src/utils/block-registry.ts
import { FramedBlock } from '../blocks/FramedBlock';

export const blockRegistry: BlockRegistry = {
  // ... existing blocks
  framed: FramedBlock,
};
```

### Use in JSON

```json
{
  "blocks": [
    {
      "id": "hero-1",
      "type": "framed",
      "data": {
        "variant": "dark",
        "title": "Welcome",
        "description": "Start your journey here",
        "content": "This is a dynamically loaded framed section."
      }
    }
  ]
}
```

## Tips and Best Practices

1. **Don't Overuse Emphasis**: Use `--emphasis` variant sparingly for truly important content
2. **Mix Variants**: Alternate between light and dark variants for visual rhythm
3. **Use Semantic Structure**: Include header/content/footer divs even if optional for clearer code
4. **Test Responsively**: Always check how your frames look on mobile
5. **Maintain Contrast**: Ensure text remains readable in all variants
6. **Nest Carefully**: While nesting is supported, avoid going more than 2 levels deep

## Troubleshooting

### Frame Not Showing Border?

Check that you have the base `framed-section` class:
```tsx
// Wrong
<div className="framed-section--dark">...</div>

// Correct
<div className="framed-section framed-section--dark">...</div>
```

### Content Too Close to Edges?

The frame has automatic padding, but you can increase it:
```tsx
<div
  className="framed-section"
  style={{ '--framed-padding': '3rem' } as React.CSSProperties}
>
  More spacious content
</div>
```

### Stripes Not Visible?

Make sure the frame is wide enough (minimum ~300px) and using the correct variant:
```tsx
<div className="framed-section framed-section--striped">...</div>
```

## Next Steps

- Check out `/src/components/examples/FramedSectionExamples.tsx` for complete examples
- Read `/planning/framed-sections-feature.md` for detailed documentation
- See `/src/styles/components/ui/_framed-section-cheatsheet.md` for quick reference

## Need Help?

The framed section component is built using:
- **@layer components** for proper CSS cascade
- **CSS custom properties** for easy theming
- **Responsive mixins** from `_mixins.scss`
- **Theme variables** from `_variables.scss`

All styles live in `/src/styles/components/ui/_framed-section.scss`
