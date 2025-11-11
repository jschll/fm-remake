/**
 * FRAMED SECTION EXAMPLES
 *
 * This file demonstrates all the framed section variants and usage patterns.
 * Use these examples as a reference when building your UI components.
 */

export function FramedSectionExamples() {
  return (
    <div className="container" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
      <h1 style={{ marginBottom: '3rem', fontSize: '2.5rem', fontWeight: 'bold' }}>
        Framed Section Components
      </h1>

      {/* Basic Framed Section */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: '600' }}>
          Basic Framed Section
        </h2>

        <div className="framed-section">
          <div className="framed-section__header">
            <h3 className="framed-section__title">Default Frame</h3>
            <p className="framed-section__description">
              A clean bordered container with light background and subtle border.
            </p>
          </div>
          <div className="framed-section__content">
            <p>
              This is the base framed section component. It provides a clean, bordered
              container that works great for highlighting content, creating visual
              separation, or building card-like interfaces.
            </p>
          </div>
        </div>
      </section>

      {/* Dark Variant */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: '600' }}>
          Dark Variant
        </h2>

        <div className="framed-section framed-section--dark">
          <div className="framed-section__header">
            <h3 className="framed-section__title">Dark Theme Frame</h3>
            <p className="framed-section__description">
              Perfect for creating contrast on light backgrounds.
            </p>
          </div>
          <div className="framed-section__content">
            <p>
              The dark variant uses a darker background color and adjusted border
              color to create depth and visual hierarchy. Great for highlighting
              important content or creating sections that stand out.
            </p>
          </div>
        </div>
      </section>

      {/* Emphasis Variant */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: '600' }}>
          Emphasis Variant
        </h2>

        <div className="framed-section framed-section--emphasis">
          <div className="framed-section__header">
            <h3 className="framed-section__title">Emphasized Frame</h3>
            <p className="framed-section__description">
              Thicker border and shadow for maximum visual impact.
            </p>
          </div>
          <div className="framed-section__content">
            <p>
              The emphasis variant features a thicker border and box shadow to draw
              extra attention. Use this for call-to-action sections, important
              announcements, or featured content.
            </p>
          </div>
        </div>
      </section>

      {/* Code Editor Style */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: '600' }}>
          Code Editor Style
        </h2>

        <div className="framed-section framed-section--code">
          <div>
            <pre style={{ fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.6' }}>
{`// Example TypeScript code
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

const message = greet('World');
console.log(message);`}
            </pre>
          </div>
        </div>

        <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Perfect for code snippets, terminal outputs, or any content that benefits
          from a code editor aesthetic.
        </p>
      </section>

      {/* Striped Edges */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: '600' }}>
          Striped Edge Decoration
        </h2>

        <div className="framed-section framed-section--striped">
          <div className="framed-section__header">
            <h3 className="framed-section__title">Diagonal Stripes</h3>
            <p className="framed-section__description">
              Decorative diagonal patterns on the left and right edges.
            </p>
          </div>
          <div className="framed-section__content">
            <p>
              The striped variant adds subtle diagonal stripe patterns to the left
              and right edges of the frame. This creates visual interest and helps
              guide the eye toward the content.
            </p>
          </div>
        </div>
      </section>

      {/* Striped with Inset */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: '600' }}>
          Striped with Inset Padding
        </h2>

        <div className="framed-section framed-section--dark framed-section--striped-inset">
          <div className="framed-section__header">
            <h3 className="framed-section__title">Stripes with Content Padding</h3>
            <p className="framed-section__description">
              Automatically adjusts padding to account for striped edges.
            </p>
          </div>
          <div className="framed-section__content">
            <p>
              The striped-inset variant includes automatic padding adjustments to
              ensure your content doesn't overlap with the decorative stripe patterns.
              This works great when you want clear visual separation.
            </p>
          </div>
        </div>
      </section>

      {/* Gradient Border */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: '600' }}>
          Gradient Border
        </h2>

        <div className="framed-section framed-section--gradient-border">
          <div className="framed-section__header">
            <h3 className="framed-section__title">Gradient Border Effect</h3>
            <p className="framed-section__description">
              Modern gradient border using CSS mask properties.
            </p>
          </div>
          <div className="framed-section__content">
            <p>
              The gradient border variant creates a smooth color transition around
              the frame's border. This modern effect is perfect for hero sections,
              premium features, or when you want to add a touch of sophistication.
            </p>
          </div>
        </div>
      </section>

      {/* Nested Frames */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: '600' }}>
          Nested Frames
        </h2>

        <div className="framed-section">
          <div className="framed-section__header">
            <h3 className="framed-section__title">Parent Frame</h3>
            <p className="framed-section__description">
              Frames can be nested for complex layouts.
            </p>
          </div>

          <div className="framed-section framed-section--dark">
            <h4 style={{ marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: '600' }}>
              Nested Child Frame
            </h4>
            <p>
              Nested frames automatically adjust their padding and spacing. You can
              mix and match different variants to create rich, hierarchical layouts.
            </p>
          </div>

          <div className="framed-section framed-section--subtle">
            <h4 style={{ marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: '600' }}>
              Another Nested Frame
            </h4>
            <p>
              This demonstrates how multiple nested frames work together with
              proper spacing and visual hierarchy.
            </p>
          </div>
        </div>
      </section>

      {/* Multiple Frames in a Row */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: '600' }}>
          Multiple Frames with Auto-Spacing
        </h2>

        <div className="framed-section">
          <h3 className="framed-section__title">First Section</h3>
          <p>Frames automatically space themselves when stacked.</p>
        </div>

        <div className="framed-section framed-section--dark">
          <h3 className="framed-section__title">Second Section</h3>
          <p>The spacing adapts responsively on smaller screens.</p>
        </div>

        <div className="framed-section framed-section--emphasis">
          <h3 className="framed-section__title">Third Section</h3>
          <p>Mix different variants to create visual rhythm.</p>
        </div>
      </section>

      {/* Footer Example */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: '600' }}>
          With Footer
        </h2>

        <div className="framed-section">
          <div className="framed-section__header">
            <h3 className="framed-section__title">Frame with Footer</h3>
            <p className="framed-section__description">
              Header and footer sections with automatic borders.
            </p>
          </div>

          <div className="framed-section__content">
            <p>
              This frame demonstrates the use of header, content, and footer sections
              with automatic border separators. Great for cards, panels, or any
              component that needs clear sectioning.
            </p>
          </div>

          <div className="framed-section__footer">
            <button
              style={{
                padding: '0.5rem 1rem',
                background: 'var(--text)',
                color: 'var(--bg-light)',
                borderRadius: 'var(--border-radius)',
                cursor: 'pointer'
              }}
            >
              Action Button
            </button>
          </div>
        </div>
      </section>

      {/* Custom Styling Example */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: '600' }}>
          Custom CSS Variables
        </h2>

        <div
          className="framed-section"
          style={{
            '--framed-bg': 'oklch(0.95 0.05 250)',
            '--framed-border': 'oklch(0.6 0.1 250)',
            '--framed-radius': '1.5rem',
            '--framed-padding': '3rem'
          } as React.CSSProperties}
        >
          <h3 className="framed-section__title">Custom Themed Frame</h3>
          <p>
            You can override CSS custom properties to create custom themes on a
            per-frame basis. This example uses custom colors, larger border radius,
            and increased padding.
          </p>
        </div>
      </section>

      {/* Usage Tips */}
      <div className="framed-section framed-section--dark">
        <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '600' }}>
          Usage Tips
        </h2>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>Use basic frames for general content containers</li>
          <li>Use dark variants to create contrast and visual hierarchy</li>
          <li>Use emphasis variants for CTAs and important content</li>
          <li>Use code style for code snippets and terminal outputs</li>
          <li>Use striped edges for decorative flair on hero sections</li>
          <li>Use gradient borders for premium or featured content</li>
          <li>Nest frames for complex layouts with clear sectioning</li>
          <li>Override CSS custom properties for one-off custom themes</li>
        </ul>
      </div>
    </div>
  );
}
