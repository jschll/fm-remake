# Framed Sections Feature

## Overview

The Framed Sections feature provides a comprehensive system of bordered, container-style components inspired by modern design systems (Tailwind UI, Vercel, etc.). These components create clean, visually distinct sections with optional decorative elements like diagonal stripes and gradient borders.

## Architecture

### File Structure

```
src/styles/
├── components/
│   └── ui/
│       └── _framed-section.scss    # Main component styles
├── _variables.scss                  # Theme variables (updated)
└── main.scss                        # Imports framed-section

src/components/
└── examples/
    └── FramedSectionExamples.tsx    # Usage examples
```

### CSS @Layer Architecture

The framed section styles are organized within the `@layer components` directive, ensuring proper cascade behavior:

```scss
@layer components {
  .framed-section { /* base styles */ }
  .framed-section--dark { /* variant */ }
  .framed-section--code { /* variant */ }
  // ... more variants
}
```

This follows the project's layer order:
1. `@layer reset` - Browser resets
2. `@layer base` - Base elements and design tokens
3. `@layer theme` - Theme variables
4. `@layer components` - Component styles (framed sections live here)
5. `@layer utilities` - Utility classes
6. `@layer overrides` - Context-specific overrides

## Component Variants

### Base Classes

#### `.framed-section`
The foundation class that provides:
- Bordered container with rounded corners
- Responsive padding (adjusts on mobile)
- Overflow containment for decorative elements
- CSS custom property support for theming

**Default Styles:**
- Background: `var(--bg-light)`
- Border: `1px solid var(--border-muted)`
- Border radius: `var(--border-radius)`
- Padding: `2rem` (desktop), `1.5rem` (tablet), `1rem` (mobile)

### Theme Variants

#### `.framed-section--dark`
- Darker background color for contrast
- Adjusted border color
- Perfect for creating visual hierarchy

#### `.framed-section--light`
- Explicitly sets light theme (useful for nested frames)
- Maintains readability on dark backgrounds

#### `.framed-section--subtle`
- Minimal border with reduced opacity
- Use for secondary content that shouldn't dominate

#### `.framed-section--emphasis`
- Thicker 2px border
- Box shadow for elevation
- Ideal for CTAs and featured content

### Special Effect Variants

#### `.framed-section--code`
Mimics a code editor window:
- Dark background (`oklch(0.15 0 0)`)
- Header bar with traffic light dots (macOS style)
- Perfect for code snippets and terminal outputs
- Removes outer padding, adds padding to children

**Usage:**
```jsx
<div className="framed-section framed-section--code">
  <pre>
    <code>// Your code here</code>
  </pre>
</div>
```

#### `.framed-section--striped`
Adds diagonal stripe patterns to edges:
- Stripes on left and right edges (3rem wide)
- Responsive width reduction on mobile
- Configurable stripe color via `--stripe-color`
- Creates decorative flair without content overlap

**Pattern Details:**
- 45-degree diagonal stripes
- 2px stripe width
- 8px spacing between stripes
- 15% opacity for subtlety

#### `.framed-section--striped-inset`
Extends striped variant with automatic content padding:
- Adds padding to prevent content overlap
- Responsive padding adjustments
- Use when content shouldn't touch stripe edges

#### `.framed-section--gradient-border`
Modern gradient border effect:
- Uses CSS mask composition for border gradient
- Customizable gradient colors via CSS custom properties
- No standard border (uses pseudo-element technique)

**Gradient Customization:**
```jsx
<div
  className="framed-section framed-section--gradient-border"
  style={{
    '--gradient-start': 'oklch(0.6 0.2 250)',
    '--gradient-end': 'oklch(0.7 0.2 320)'
  }}
>
  Content
</div>
```

### Structural Classes

#### `.framed-section__header`
Section header with automatic bottom border:
- Bottom margin and border
- Border removes automatically if last child

#### `.framed-section__title`
Title within header:
- 1.5rem font size (desktop)
- 1.25rem font size (mobile)
- Bold weight (600)

#### `.framed-section__description`
Descriptive text within header:
- Muted color
- Smaller font size (0.95rem)
- Increased line height (1.6)

#### `.framed-section__content`
Optional semantic wrapper for main content area.

#### `.framed-section__footer`
Footer section with automatic top border:
- Top margin and border
- Border removes automatically if first child

## CSS Custom Properties

### Component-Level Variables

These can be overridden on individual instances:

```scss
--framed-bg          // Background color
--framed-border      // Border color
--framed-radius      // Border radius
--framed-padding     // Padding (desktop)
--framed-padding-mobile  // Padding (mobile)
--stripe-color       // Stripe pattern color
--gradient-start     // Gradient border start color
--gradient-end       // Gradient border end color
```

### Theme-Level Variables

Defined in `_variables.scss`:

```scss
--frame-bg-base          // Base frame background
--frame-bg-elevated      // Elevated frame background
--frame-bg-dark          // Dark frame background
--frame-border-default   // Default border color
--frame-border-emphasis  // Emphasis border color
--frame-stripe-color     // Default stripe color
```

## Responsive Behavior

### Breakpoint Strategy

The framed sections use the project's breakpoint mixins:

```scss
// Mobile (< 768px)
@include breakpoint-down(md) {
  padding: 1.5rem;
}

// Small mobile (< 576px)
@include breakpoint-down(sm) {
  padding: 1rem;
}
```

### Responsive Adjustments

1. **Padding**: Reduces progressively on smaller screens
2. **Stripe Width**: Decreases from 3rem → 2rem → 1.5rem
3. **Font Sizes**: Title and text sizes scale down
4. **Spacing**: Margin between stacked frames reduces

## Integration with Block System

### Creating a Framed Block

To integrate framed sections with your block loader system:

```typescript
// src/blocks/types.ts
export interface FramedBlockData {
  variant: 'default' | 'dark' | 'emphasis' | 'code' | 'striped' | 'gradient';
  title?: string;
  description?: string;
  content: string | BlockData[]; // Can contain nested blocks
  hasHeader?: boolean;
  hasFooter?: boolean;
  customStyles?: Record<string, string>;
}

// src/blocks/FramedBlock.tsx
import { FramedBlockData } from './types';

export function FramedBlock({ data }: { data: FramedBlockData }) {
  const variantClass = data.variant !== 'default'
    ? `framed-section--${data.variant}`
    : '';

  return (
    <div
      className={`framed-section ${variantClass}`}
      style={data.customStyles}
    >
      {data.hasHeader && (
        <div className="framed-section__header">
          {data.title && <h3 className="framed-section__title">{data.title}</h3>}
          {data.description && (
            <p className="framed-section__description">{data.description}</p>
          )}
        </div>
      )}

      <div className="framed-section__content">
        {typeof data.content === 'string'
          ? <p>{data.content}</p>
          : <BlockRenderer blocks={data.content} />
        }
      </div>

      {data.hasFooter && (
        <div className="framed-section__footer">
          {/* Footer content */}
        </div>
      )}
    </div>
  );
}
```

### Block Loader JSON Example

```json
{
  "type": "framed",
  "data": {
    "variant": "dark",
    "title": "Featured Section",
    "description": "This is a dynamically loaded framed section",
    "content": "Your content here",
    "hasHeader": true,
    "hasFooter": false
  }
}
```

### Nested Blocks Example

```json
{
  "type": "framed",
  "data": {
    "variant": "default",
    "title": "Complex Layout",
    "hasHeader": true,
    "content": [
      {
        "type": "text",
        "data": { "text": "Introduction paragraph" }
      },
      {
        "type": "framed",
        "data": {
          "variant": "code",
          "content": "const example = 'nested frame';"
        }
      },
      {
        "type": "cta",
        "data": { "text": "Learn More", "url": "/docs" }
      }
    ]
  }
}
```

## Usage Patterns

### 1. Hero Section with Stripes

```jsx
<div className="framed-section framed-section--dark framed-section--striped-inset">
  <h1 className="framed-section__title">Welcome</h1>
  <p>Your hero content with decorative striped edges</p>
</div>
```

### 2. Code Example

```jsx
<div className="framed-section framed-section--code">
  <pre><code>{codeString}</code></pre>
</div>
```

### 3. Feature Card

```jsx
<div className="framed-section framed-section--emphasis">
  <div className="framed-section__header">
    <h3 className="framed-section__title">Premium Feature</h3>
    <p className="framed-section__description">Available on Pro plan</p>
  </div>
  <div className="framed-section__content">
    <p>Feature description...</p>
  </div>
  <div className="framed-section__footer">
    <button>Upgrade Now</button>
  </div>
</div>
```

### 4. Stacked Sections

```jsx
<>
  <div className="framed-section">Section 1</div>
  <div className="framed-section framed-section--dark">Section 2</div>
  <div className="framed-section">Section 3</div>
</>
```
*Auto-spacing applies between adjacent frames*

### 5. Custom Theme

```jsx
<div
  className="framed-section"
  style={{
    '--framed-bg': 'oklch(0.95 0.05 180)',
    '--framed-border': 'oklch(0.6 0.1 180)',
    '--framed-radius': '1.5rem'
  }}
>
  Custom themed content
</div>
```

## Accessibility Considerations

1. **Semantic HTML**: Use proper heading hierarchy within frames
2. **Color Contrast**: All variants maintain WCAG AA contrast ratios
3. **Focus States**: Ensure interactive elements have visible focus
4. **Screen Readers**: Use ARIA labels when frames serve specific purposes

```jsx
<div
  className="framed-section framed-section--emphasis"
  role="region"
  aria-labelledby="feature-title"
>
  <h3 id="feature-title" className="framed-section__title">
    Featured Content
  </h3>
  {/* ... */}
</div>
```

## Performance Considerations

1. **Pseudo-elements**: Striped and gradient borders use `::before`/`::after`
2. **CSS Mask**: Gradient borders use CSS mask (check browser support)
3. **Repaints**: Frames use `overflow: hidden` to contain decorations
4. **Mobile**: Reduced stripe widths and padding improve mobile performance

## Browser Support

- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **Gradient Borders**: Requires CSS mask support (96%+ browser coverage)
- **Fallback**: Standard borders display if CSS mask unavailable
- **Mobile**: Fully responsive on all modern mobile browsers

## Future Enhancements

1. **Animation Variants**: Add entrance/exit animations
2. **Hover Effects**: Interactive frame transitions
3. **Dark Mode**: Automatic theme switching based on system preferences
4. **More Patterns**: Dotted, dashed, and other decorative patterns
5. **Icon Headers**: Built-in support for icons in header sections
6. **Collapsible Frames**: Expandable/collapsible content sections

## Migration Guide

### Converting Existing Containers

**Before:**
```jsx
<div style={{
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '2rem'
}}>
  Content
</div>
```

**After:**
```jsx
<div className="framed-section">
  Content
</div>
```

### Benefits of Migration

1. Consistent styling across application
2. Automatic responsive behavior
3. Easy theming via CSS custom properties
4. Reduced inline styles
5. Better maintainability
6. Built-in variants for common patterns

## Troubleshooting

### Issue: Stripes Not Visible

**Solution:** Ensure parent has sufficient width and frame isn't collapsed:
```scss
.parent-container {
  min-width: 300px; // Ensure enough width for stripes
}
```

### Issue: Gradient Border Not Showing

**Solution:** Check browser support for CSS mask. Fallback to standard border:
```scss
.framed-section--gradient-border {
  border: 1px solid var(--border); // Fallback

  @supports (mask-composite: exclude) {
    border: none; // Use gradient if supported
  }
}
```

### Issue: Content Overlapping Stripes

**Solution:** Use `--striped-inset` variant or add custom padding:
```jsx
<div
  className="framed-section framed-section--striped"
  style={{ paddingLeft: '5rem', paddingRight: '5rem' }}
>
  Content
</div>
```

## Code References

- **Main Component**: `/src/styles/components/ui/_framed-section.scss`
- **Variables**: `/src/styles/_variables.scss` (lines 37-44)
- **Import**: `/src/styles/main.scss` (line 19)
- **Examples**: `/src/components/examples/FramedSectionExamples.tsx`
- **This Documentation**: `/planning/framed-sections-feature.md`
