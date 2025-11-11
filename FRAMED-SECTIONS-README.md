# Framed Sections Component System

## Overview

A comprehensive bordered container component system built with SCSS, @layer architecture, and CSS custom properties for maximum flexibility and maintainability.

## What You Get

### Component Variants

1. **Base Frame** (`.framed-section`) - Clean bordered container
2. **Dark Variant** (`.framed-section--dark`) - Dark background for contrast
3. **Subtle Variant** (`.framed-section--subtle`) - Minimal borders
4. **Emphasis Variant** (`.framed-section--emphasis`) - Thick borders + shadow
5. **Code Style** (`.framed-section--code`) - Code editor appearance
6. **Striped Edges** (`.framed-section--striped`) - Diagonal decorative patterns
7. **Gradient Border** (`.framed-section--gradient-border`) - Modern gradient borders

### Features

- **Fully Responsive** - Automatic padding/spacing adjustments for mobile
- **Theme Customization** - Override colors via CSS custom properties
- **Nested Support** - Frames automatically adjust when nested
- **Auto-spacing** - Adjacent frames maintain consistent gaps
- **@layer Architecture** - Predictable cascade behavior
- **TypeScript Ready** - Easy integration with typed block system

## Quick Start

### 1. Use in Any Component

```tsx
import React from 'react';

export function MyComponent() {
  return (
    <div className="framed-section">
      <h2>My Content</h2>
      <p>Beautiful bordered container!</p>
    </div>
  );
}
```

### 2. Add Variants

```tsx
// Dark theme
<div className="framed-section framed-section--dark">...</div>

// With emphasis (thicker border + shadow)
<div className="framed-section framed-section--emphasis">...</div>

// Code display
<div className="framed-section framed-section--code">
  <pre><code>{code}</code></pre>
</div>

// With decorative stripes
<div className="framed-section framed-section--striped">...</div>
```

### 3. Use Structural Elements

```tsx
<div className="framed-section">
  <div className="framed-section__header">
    <h3 className="framed-section__title">Title</h3>
    <p className="framed-section__description">Description</p>
  </div>

  <div className="framed-section__content">
    <p>Main content here</p>
  </div>

  <div className="framed-section__footer">
    <button>Action</button>
  </div>
</div>
```

## File Structure

```
/Users/schalli/Sites/fm-remake/
├── src/
│   ├── styles/
│   │   ├── components/
│   │   │   └── ui/
│   │   │       ├── _framed-section.scss          # Main component styles
│   │   │       └── _framed-section-cheatsheet.md # Quick reference
│   │   ├── _variables.scss                       # Updated with frame variables
│   │   └── main.scss                             # Imports framed-section
│   ├── components/
│   │   └── examples/
│   │       └── FramedSectionExamples.tsx         # Complete examples
│   └── pages/
│       └── FramedSectionsShowcase.tsx            # Visual showcase page
├── planning/
│   └── framed-sections-feature.md                # Detailed documentation
├── docs/
│   └── framed-sections-integration.md            # Integration guide
└── FRAMED-SECTIONS-README.md                     # This file
```

## Documentation

### Quick Reference
- **Cheat Sheet**: `/src/styles/components/ui/_framed-section-cheatsheet.md`
- **Quick integration guide**: `/docs/framed-sections-integration.md`

### Detailed Documentation
- **Complete feature docs**: `/planning/framed-sections-feature.md`
- **Architecture details**: Included in planning doc
- **Block system integration**: See integration guide

### Examples
- **Component examples**: `/src/components/examples/FramedSectionExamples.tsx`
- **Visual showcase page**: `/src/pages/FramedSectionsShowcase.tsx`

## Architecture

### @Layer Structure

```scss
@layer components {
  .framed-section { /* base */ }
  .framed-section--dark { /* variant */ }
  // ... more variants
}
```

Positioned in the component layer for proper cascade:
`reset → base → theme → components → utilities → overrides`

### CSS Custom Properties

#### Instance-Level Overrides
```tsx
<div
  className="framed-section"
  style={{
    '--framed-bg': 'oklch(0.95 0.05 250)',
    '--framed-border': 'oklch(0.6 0.1 250)',
    '--framed-radius': '1.5rem',
    '--framed-padding': '3rem'
  } as React.CSSProperties}
>
  Custom styled frame
</div>
```

#### Theme-Level Variables (from `_variables.scss`)
```scss
--frame-bg-base
--frame-bg-elevated
--frame-bg-dark
--frame-border-default
--frame-border-emphasis
--frame-stripe-color
```

### Responsive Design

Automatic breakpoint adjustments using project mixins:

| Screen Size | Padding | Stripe Width |
|------------|---------|--------------|
| Desktop (≥768px) | 2rem | 3rem |
| Tablet (≥576px) | 1.5rem | 2rem |
| Mobile (<576px) | 1rem | 1.5rem |

## Integration with Block System

### Create a Framed Block

```typescript
// Block data interface
interface FramedBlockData {
  variant: 'default' | 'dark' | 'emphasis' | 'code' | 'striped';
  title?: string;
  description?: string;
  content: string;
}

// Block component
export function FramedBlock({ data }: BlockComponentProps<FramedBlockData>) {
  const variantClass = data.variant !== 'default'
    ? `framed-section--${data.variant}`
    : '';

  return (
    <div className={`framed-section ${variantClass}`.trim()}>
      {/* Render content */}
    </div>
  );
}
```

### JSON Configuration

```json
{
  "type": "framed",
  "data": {
    "variant": "dark",
    "title": "Feature Title",
    "description": "Feature description",
    "content": "Main content"
  }
}
```

## Common Use Cases

### Hero Section
```tsx
<div className="framed-section framed-section--dark framed-section--striped-inset">
  <h1>Welcome</h1>
  <p>Hero content with decorative edges</p>
</div>
```

### Code Display
```tsx
<div className="framed-section framed-section--code">
  <pre><code>{codeString}</code></pre>
</div>
```

### Feature Card
```tsx
<div className="framed-section framed-section--emphasis">
  <div className="framed-section__header">
    <h3 className="framed-section__title">Premium Feature</h3>
  </div>
  <div className="framed-section__content">
    <p>Feature details...</p>
  </div>
  <div className="framed-section__footer">
    <button>Upgrade</button>
  </div>
</div>
```

### Stacked Sections
```tsx
<div className="framed-section">Section 1</div>
<div className="framed-section framed-section--dark">Section 2</div>
<div className="framed-section">Section 3</div>
```
*Auto-spacing between frames*

## Browser Support

- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **Gradient Borders**: CSS mask required (96%+ coverage)
- **Mobile**: Fully responsive on all modern devices

## Performance

- Uses pseudo-elements for decorations (no extra DOM nodes)
- CSS custom properties for dynamic theming (no JavaScript)
- Efficient cascade with @layer architecture
- Minimal specificity conflicts

## Customization Examples

### Custom Color Theme
```tsx
<div
  className="framed-section"
  style={{
    '--framed-bg': 'oklch(0.98 0.02 180)',
    '--framed-border': 'oklch(0.6 0.1 180)'
  } as React.CSSProperties}
>
  Mint-themed frame
</div>
```

### Larger Padding
```tsx
<div
  className="framed-section"
  style={{ '--framed-padding': '4rem' } as React.CSSProperties}
>
  Extra spacious content
</div>
```

### Custom Gradient
```tsx
<div
  className="framed-section framed-section--gradient-border"
  style={{
    '--gradient-start': 'oklch(0.6 0.2 250)',
    '--gradient-end': 'oklch(0.7 0.2 320)'
  } as React.CSSProperties}
>
  Custom gradient border
</div>
```

## Accessibility

- Semantic HTML structure
- WCAG AA contrast ratios maintained
- Screen reader compatible
- Keyboard navigation friendly

Use ARIA attributes when needed:
```tsx
<div
  className="framed-section"
  role="region"
  aria-labelledby="section-title"
>
  <h3 id="section-title">Section Title</h3>
  {/* content */}
</div>
```

## Testing

To verify the implementation:

1. **Start dev server**: `pnpm dev`
2. **View showcase**: Navigate to `/framed-sections-showcase` (if route added)
3. **View examples**: Check `/src/components/examples/FramedSectionExamples.tsx`
4. **Test responsive**: Resize browser to see mobile adjustments

## Troubleshooting

### Styles Not Applying?
- Ensure `main.scss` imports `framed-section.scss`
- Check that you have both base class and variant: `framed-section framed-section--dark`
- Verify no CSS specificity conflicts

### Stripes Not Visible?
- Frame needs minimum width (~300px)
- Check opacity (default 15%)
- Verify correct class: `framed-section--striped`

### Gradient Border Not Showing?
- Check browser support for CSS mask
- Verify both classes: `framed-section framed-section--gradient-border`
- Inspect with DevTools for mask property

## Next Steps

1. **Try Examples**: Copy code from examples file
2. **Create Block**: Integrate with your block system
3. **Customize**: Override CSS variables for your brand
4. **Build Layouts**: Combine variants for rich UIs

## Support

All implementation files are documented with inline comments. Key files:

- **Main Styles**: `/src/styles/components/ui/_framed-section.scss`
- **Variables**: `/src/styles/_variables.scss`
- **Mixins**: `/src/styles/_mixins.scss`

## License

Part of the fm-remake project. Use freely within this project.

---

**Created**: 2025-11-10
**Version**: 1.0.0
**Architecture**: @layer-based SCSS with CSS custom properties
**Framework**: React + TypeScript + Vite
