# Framed Sections Architecture

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    FRAMED SECTIONS SYSTEM                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                     CSS LAYER STRUCTURE                      │
├─────────────────────────────────────────────────────────────┤
│  @layer reset      → Browser normalization                   │
│  @layer base       → Base elements + design tokens          │
│  @layer theme      → Theme variables                         │
│  @layer components → FRAMED SECTIONS (here)                 │
│  @layer utilities  → Utility classes                         │
│  @layer overrides  → Context-specific overrides              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  COMPONENT ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  .framed-section (BASE)                                     │
│  ├── Structure: border, padding, radius, overflow           │
│  ├── Responsive: Auto-adjusting padding & spacing           │
│  └── Themeable: CSS custom property hooks                   │
│                                                              │
│  THEME VARIANTS                                             │
│  ├── .framed-section--dark                                  │
│  ├── .framed-section--light                                 │
│  ├── .framed-section--subtle                                │
│  └── .framed-section--emphasis                              │
│                                                              │
│  EFFECT VARIANTS                                            │
│  ├── .framed-section--code                                  │
│  ├── .framed-section--striped                               │
│  ├── .framed-section--striped-inset                         │
│  └── .framed-section--gradient-border                       │
│                                                              │
│  STRUCTURAL ELEMENTS                                        │
│  ├── .framed-section__header                                │
│  │   ├── .framed-section__title                            │
│  │   └── .framed-section__description                       │
│  ├── .framed-section__content                               │
│  └── .framed-section__footer                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   THEMING ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  THEME LEVEL (Global in _variables.scss)                    │
│  :root {                                                     │
│    --frame-bg-base                                          │
│    --frame-bg-elevated                                       │
│    --frame-bg-dark                                           │
│    --frame-border-default                                    │
│    --frame-border-emphasis                                   │
│    --frame-stripe-color                                      │
│  }                                                           │
│                                                              │
│  ↓ Inherited by                                             │
│                                                              │
│  COMPONENT LEVEL (Per-instance overridable)                 │
│  .framed-section {                                          │
│    --framed-bg: var(--frame-bg-base)                        │
│    --framed-border: var(--frame-border-default)             │
│    --framed-radius: var(--border-radius)                    │
│    --framed-padding: 2rem                                    │
│  }                                                           │
│                                                              │
│  ↓ Can be overridden                                        │
│                                                              │
│  INSTANCE LEVEL (Inline style overrides)                    │
│  <div                                                        │
│    className="framed-section"                               │
│    style={{                                                  │
│      '--framed-bg': 'custom-color',                         │
│      '--framed-border': 'custom-color'                      │
│    }}                                                        │
│  />                                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  RESPONSIVE ARCHITECTURE                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  DESKTOP (≥768px)                                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Padding: 2rem                                       │  │
│  │  Stripe Width: 3rem                                  │  │
│  │  Title: 1.5rem                                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  TABLET (576px - 767px)                                     │
│  ┌───────────────────────────────────────────────┐          │
│  │  Padding: 1.5rem                              │          │
│  │  Stripe Width: 2rem                           │          │
│  │  Title: 1.25rem                               │          │
│  └───────────────────────────────────────────────┘          │
│                                                              │
│  MOBILE (<576px)                                            │
│  ┌──────────────────────────────────────┐                   │
│  │  Padding: 1rem                       │                   │
│  │  Stripe Width: 1.5rem                │                   │
│  │  Title: 1.25rem                      │                   │
│  └──────────────────────────────────────┘                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   RENDERING ARCHITECTURE                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  HTML/JSX Structure                                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ <div class="framed-section framed-section--variant">  │ │
│  │                                                        │ │
│  │   [::before]  ← Decorative element (stripes, etc)    │ │
│  │                                                        │ │
│  │   <div class="framed-section__header">               │ │
│  │     <h3 class="framed-section__title">Title</h3>     │ │
│  │     <p class="framed-section__description">...</p>   │ │
│  │   </div>                                              │ │
│  │                                                        │ │
│  │   <div class="framed-section__content">              │ │
│  │     Content here                                      │ │
│  │   </div>                                              │ │
│  │                                                        │ │
│  │   <div class="framed-section__footer">               │ │
│  │     Actions here                                      │ │
│  │   </div>                                              │ │
│  │                                                        │ │
│  │   [::after]   ← Decorative element (stripes, etc)    │ │
│  │                                                        │ │
│  │ </div>                                                 │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    FILE ORGANIZATION                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  src/styles/                                                 │
│  ├── main.scss                                              │
│  │   └── @use "./components/ui/framed-section.scss"        │
│  │                                                          │
│  ├── _variables.scss                                         │
│  │   └── :root { --frame-* variables }                     │
│  │                                                          │
│  ├── _mixins.scss                                            │
│  │   ├── @mixin diagonal-stripes()                         │
│  │   ├── @mixin gradient-border()                          │
│  │   └── @mixin frame-structure()                          │
│  │                                                          │
│  └── components/ui/                                          │
│      └── _framed-section.scss                               │
│          ├── @layer components                              │
│          ├── Base styles                                     │
│          ├── Theme variants                                  │
│          ├── Effect variants                                 │
│          └── Structural elements                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  BLOCK SYSTEM INTEGRATION                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  JSON Configuration                                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ {                                                      │ │
│  │   "type": "framed",                                   │ │
│  │   "data": {                                           │ │
│  │     "variant": "dark",                                │ │
│  │     "title": "Section Title",                         │ │
│  │     "content": "Content here"                         │ │
│  │   }                                                   │ │
│  │ }                                                      │ │
│  └────────────────────────────────────────────────────────┘ │
│                   ↓                                          │
│  Block Loader                                                │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ blockRegistry['framed']                                │ │
│  └────────────────────────────────────────────────────────┘ │
│                   ↓                                          │
│  FramedBlock Component                                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ export function FramedBlock({ data }) {               │ │
│  │   return (                                             │ │
│  │     <div className={`framed-section                   │ │
│  │                      framed-section--${data.variant}`}│ │
│  │     >                                                  │ │
│  │       {/* render data */}                             │ │
│  │     </div>                                             │ │
│  │   );                                                   │ │
│  │ }                                                      │ │
│  └────────────────────────────────────────────────────────┘ │
│                   ↓                                          │
│  Rendered HTML                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ <div class="framed-section framed-section--dark">     │ │
│  │   <h3>Section Title</h3>                              │ │
│  │   <p>Content here</p>                                 │ │
│  │ </div>                                                 │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    CASCADE BEHAVIOR                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Specificity: 0-1-0 (single class)                          │
│  Layer: components                                           │
│                                                              │
│  Example: .framed-section--dark wins over .framed-section   │
│  because both are in same layer and --dark comes later       │
│                                                              │
│  Override pattern:                                           │
│  1. .framed-section         (base, components layer)        │
│  2. .framed-section--dark   (variant, components layer)     │
│  3. .custom-override        (overrides layer, if needed)    │
│  4. style={{ ... }}         (inline, highest priority)      │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   PERFORMANCE MODEL                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  CSS (No JavaScript Required)                                │
│  ├── Static styles loaded once                              │
│  ├── CSS custom properties for theming                      │
│  ├── Pseudo-elements for decorations (no extra DOM)         │
│  └── Hardware-accelerated transforms                         │
│                                                              │
│  Rendering                                                   │
│  ├── Single paint layer per frame                           │
│  ├── Overflow: hidden prevents reflow                       │
│  ├── Border-radius with will-change (if animated)           │
│  └── No layout thrashing                                     │
│                                                              │
│  Memory                                                      │
│  ├── Styles: ~15KB gzipped                                  │
│  ├── No JavaScript overhead                                 │
│  ├── Reusable across all instances                          │
│  └── CSS cached by browser                                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    EXTENSION POINTS                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. New Variants                                             │
│     Add in _framed-section.scss:                            │
│     .framed-section--custom { ... }                         │
│                                                              │
│  2. Custom Mixins                                            │
│     Create in _mixins.scss:                                 │
│     @mixin custom-pattern() { ... }                         │
│                                                              │
│  3. Theme Variables                                          │
│     Add in _variables.scss:                                 │
│     --frame-custom-prop: value;                             │
│                                                              │
│  4. Block Types                                              │
│     Create component:                                        │
│     CustomFramedBlock.tsx                                    │
│                                                              │
│  5. Animations                                               │
│     Add in utilities layer:                                 │
│     @layer utilities {                                      │
│       .framed-section--animated { ... }                     │
│     }                                                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   DEPENDENCY GRAPH                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  _framed-section.scss                                       │
│      ↓                                                       │
│      ├─→ _variables.scss (theme colors, radii)             │
│      ├─→ _mixins.scss (breakpoint mixins)                  │
│      └─→ main.scss (imported here)                          │
│                                                              │
│  _mixins.scss (new frame mixins)                            │
│      ↓                                                       │
│      └─→ _variables.scss (for defaults)                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      DATA FLOW                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Developer writes JSX                                        │
│      ↓                                                       │
│  React renders HTML with classes                             │
│      ↓                                                       │
│  Browser applies SCSS (compiled to CSS)                      │
│      ↓                                                       │
│  @layer components styles apply                              │
│      ↓                                                       │
│  CSS custom properties resolve                               │
│      ↓                                                       │
│  Responsive breakpoints trigger                              │
│      ↓                                                       │
│  Final computed styles render                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   BEST PRACTICES                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  DO:                                                         │
│  ✓ Use base class + variant: .framed-section--dark         │
│  ✓ Override with CSS custom properties                      │
│  ✓ Nest up to 2 levels deep                                │
│  ✓ Use semantic structure (header/content/footer)          │
│  ✓ Test responsive behavior                                 │
│  ✓ Maintain accessibility                                   │
│                                                              │
│  DON'T:                                                      │
│  ✗ Use variant alone without base class                    │
│  ✗ Override with !important                                 │
│  ✗ Nest more than 3 levels deep                            │
│  ✗ Mix conflicting variants                                 │
│  ✗ Rely on specific z-index values                         │
│  ✗ Modify core SCSS without documentation                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
