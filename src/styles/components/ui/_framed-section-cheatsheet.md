# Framed Section Quick Reference

## Class Names

### Base
```jsx
<div className="framed-section">...</div>
```

### Theme Variants
```jsx
<div className="framed-section framed-section--dark">...</div>
<div className="framed-section framed-section--light">...</div>
<div className="framed-section framed-section--subtle">...</div>
<div className="framed-section framed-section--emphasis">...</div>
```

### Effect Variants
```jsx
<div className="framed-section framed-section--code">...</div>
<div className="framed-section framed-section--striped">...</div>
<div className="framed-section framed-section--striped-inset">...</div>
<div className="framed-section framed-section--gradient-border">...</div>
```

### Structural Elements
```jsx
<div className="framed-section">
  <div className="framed-section__header">
    <h3 className="framed-section__title">Title</h3>
    <p className="framed-section__description">Description</p>
  </div>
  <div className="framed-section__content">Content</div>
  <div className="framed-section__footer">Footer</div>
</div>
```

## CSS Custom Properties

### Override on Instance
```jsx
<div
  className="framed-section"
  style={{
    '--framed-bg': 'oklch(0.95 0.05 250)',
    '--framed-border': 'oklch(0.6 0.1 250)',
    '--framed-radius': '1.5rem',
    '--framed-padding': '3rem'
  }}
>
  Custom themed content
</div>
```

### Available Properties
| Property | Default | Purpose |
|----------|---------|---------|
| `--framed-bg` | `var(--bg-light)` | Background color |
| `--framed-border` | `var(--border-muted)` | Border color |
| `--framed-radius` | `var(--border-radius)` | Border radius |
| `--framed-padding` | `2rem` | Padding (desktop) |
| `--framed-padding-mobile` | `1.5rem`/`1rem` | Padding (mobile) |
| `--stripe-color` | `var(--border)` | Stripe pattern color |
| `--gradient-start` | `oklch(0.6 0.1 250)` | Gradient start |
| `--gradient-end` | `oklch(0.7 0.1 320)` | Gradient end |

## Common Combinations

### Hero Section
```jsx
<div className="framed-section framed-section--dark framed-section--striped-inset">
  <h1>Hero Title</h1>
  <p>Hero content</p>
</div>
```

### Code Display
```jsx
<div className="framed-section framed-section--code">
  <pre><code>{codeString}</code></pre>
</div>
```

### Featured Card
```jsx
<div className="framed-section framed-section--emphasis">
  <div className="framed-section__header">
    <h3 className="framed-section__title">Feature</h3>
    <p className="framed-section__description">Description</p>
  </div>
  <div className="framed-section__content">Content</div>
  <div className="framed-section__footer">
    <button>Action</button>
  </div>
</div>
```

### Premium Feature
```jsx
<div className="framed-section framed-section--gradient-border">
  <h3>Premium Feature</h3>
  <p>Exclusive content</p>
</div>
```

## Responsive Behavior

| Breakpoint | Padding | Stripe Width |
|------------|---------|--------------|
| Desktop (≥768px) | 2rem | 3rem |
| Tablet (≥576px) | 1.5rem | 2rem |
| Mobile (<576px) | 1rem | 1.5rem |

## Nesting

Frames automatically adjust when nested:
```jsx
<div className="framed-section">
  <h3>Parent</h3>
  <div className="framed-section framed-section--dark">
    <h4>Child (auto-adjusted padding)</h4>
  </div>
</div>
```

## Stacking

Adjacent frames auto-space:
```jsx
<div className="framed-section">Frame 1</div>
{/* Automatic 2rem gap (1.5rem on mobile) */}
<div className="framed-section">Frame 2</div>
```
