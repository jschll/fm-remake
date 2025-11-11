/**
 * FRAMED SECTIONS SHOWCASE PAGE
 *
 * A comprehensive visual showcase of all framed section variants.
 * Use this page to:
 * - Preview all available styles
 * - Test responsive behavior
 * - Get code examples
 * - Copy/paste working patterns
 *
 * Access at: /framed-sections-showcase
 */

export function FramedSectionsShowcase() {
  return (
    <div className="container">
      {/* Page Header */}
      <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, var(--text), var(--text-muted))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Framed Sections
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>
          Bordered containers for structured, beautiful layouts
        </p>
      </header>

      {/* Grid Layout for Variants */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          marginBottom: '2rem',
          borderBottom: '2px solid var(--border)',
          paddingBottom: '0.5rem'
        }}>
          All Variants
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Default */}
          <div className="framed-section">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Default
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Base frame with light background and subtle border
            </p>
            <code style={{
              display: 'block',
              marginTop: '1rem',
              padding: '0.5rem',
              background: 'var(--bg-dark)',
              borderRadius: '0.375rem',
              fontSize: '0.8rem',
              fontFamily: 'monospace'
            }}>
              .framed-section
            </code>
          </div>

          {/* Dark */}
          <div className="framed-section framed-section--dark">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Dark
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Dark background for contrast and depth
            </p>
            <code style={{
              display: 'block',
              marginTop: '1rem',
              padding: '0.5rem',
              background: 'var(--bg)',
              borderRadius: '0.375rem',
              fontSize: '0.8rem',
              fontFamily: 'monospace'
            }}>
              .framed-section--dark
            </code>
          </div>

          {/* Subtle */}
          <div className="framed-section framed-section--subtle">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Subtle
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Minimal border for secondary content
            </p>
            <code style={{
              display: 'block',
              marginTop: '1rem',
              padding: '0.5rem',
              background: 'var(--bg-dark)',
              borderRadius: '0.375rem',
              fontSize: '0.8rem',
              fontFamily: 'monospace'
            }}>
              .framed-section--subtle
            </code>
          </div>

          {/* Emphasis */}
          <div className="framed-section framed-section--emphasis">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Emphasis
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Thick border and shadow for impact
            </p>
            <code style={{
              display: 'block',
              marginTop: '1rem',
              padding: '0.5rem',
              background: 'var(--bg-dark)',
              borderRadius: '0.375rem',
              fontSize: '0.8rem',
              fontFamily: 'monospace'
            }}>
              .framed-section--emphasis
            </code>
          </div>

          {/* Striped */}
          <div className="framed-section framed-section--striped">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Striped
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Diagonal patterns on edges
            </p>
            <code style={{
              display: 'block',
              marginTop: '1rem',
              padding: '0.5rem',
              background: 'var(--bg-dark)',
              borderRadius: '0.375rem',
              fontSize: '0.8rem',
              fontFamily: 'monospace'
            }}>
              .framed-section--striped
            </code>
          </div>

          {/* Gradient Border */}
          <div className="framed-section framed-section--gradient-border">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Gradient Border
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Modern gradient border effect
            </p>
            <code style={{
              display: 'block',
              marginTop: '1rem',
              padding: '0.5rem',
              background: 'var(--bg-dark)',
              borderRadius: '0.375rem',
              fontSize: '0.8rem',
              fontFamily: 'monospace'
            }}>
              .framed-section--gradient-border
            </code>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          marginBottom: '2rem',
          borderBottom: '2px solid var(--border)',
          paddingBottom: '0.5rem'
        }}>
          Code Editor Style
        </h2>

        <div className="framed-section framed-section--code">
          <pre style={{ margin: 0, padding: '0 !important' }}>
            <code style={{
              fontFamily: 'Monaco, "Courier New", monospace',
              fontSize: '0.9rem',
              lineHeight: '1.6',
              color: 'oklch(0.9 0 0)'
            }}>
{`// TypeScript Example
interface User {
  id: number;
  name: string;
  email: string;
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}!\`;
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
};

console.log(greetUser(user));`}
            </code>
          </pre>
        </div>
      </section>

      {/* Structured Content Example */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          marginBottom: '2rem',
          borderBottom: '2px solid var(--border)',
          paddingBottom: '0.5rem'
        }}>
          Structured Content
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          <div className="framed-section">
            <div className="framed-section__header">
              <h3 className="framed-section__title">Header</h3>
              <p className="framed-section__description">
                With description text
              </p>
            </div>
            <div className="framed-section__content">
              <p>Main content area goes here.</p>
            </div>
          </div>

          <div className="framed-section framed-section--emphasis">
            <div className="framed-section__header">
              <h3 className="framed-section__title">With Footer</h3>
              <p className="framed-section__description">
                Header, content, and footer
              </p>
            </div>
            <div className="framed-section__content">
              <p>Content with action below.</p>
            </div>
            <div className="framed-section__footer">
              <button style={{
                padding: '0.5rem 1rem',
                background: 'var(--text)',
                color: 'var(--bg-light)',
                borderRadius: '0.375rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                Take Action
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Nested Example */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          marginBottom: '2rem',
          borderBottom: '2px solid var(--border)',
          paddingBottom: '0.5rem'
        }}>
          Nested Frames
        </h2>

        <div className="framed-section">
          <div className="framed-section__header">
            <h3 className="framed-section__title">Parent Frame</h3>
            <p className="framed-section__description">
              Contains nested child frames
            </p>
          </div>

          <div className="framed-section framed-section--dark">
            <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Child Frame 1
            </h4>
            <p style={{ fontSize: '0.9rem' }}>
              Nested frames automatically adjust padding and spacing.
            </p>
          </div>

          <div className="framed-section framed-section--subtle">
            <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Child Frame 2
            </h4>
            <p style={{ fontSize: '0.9rem' }}>
              You can mix different variants for visual hierarchy.
            </p>
          </div>
        </div>
      </section>

      {/* Custom Theming Example */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          marginBottom: '2rem',
          borderBottom: '2px solid var(--border)',
          paddingBottom: '0.5rem'
        }}>
          Custom Theming
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {/* Blue Theme */}
          <div
            className="framed-section"
            style={{
              '--framed-bg': 'oklch(0.95 0.05 250)',
              '--framed-border': 'oklch(0.6 0.1 250)'
            } as React.CSSProperties}
          >
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Blue Theme
            </h3>
            <p style={{ fontSize: '0.9rem' }}>Custom color via CSS variables</p>
          </div>

          {/* Green Theme */}
          <div
            className="framed-section"
            style={{
              '--framed-bg': 'oklch(0.95 0.05 140)',
              '--framed-border': 'oklch(0.6 0.1 140)'
            } as React.CSSProperties}
          >
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Green Theme
            </h3>
            <p style={{ fontSize: '0.9rem' }}>Easy to customize per instance</p>
          </div>

          {/* Purple Theme */}
          <div
            className="framed-section"
            style={{
              '--framed-bg': 'oklch(0.95 0.05 300)',
              '--framed-border': 'oklch(0.6 0.1 300)'
            } as React.CSSProperties}
          >
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Purple Theme
            </h3>
            <p style={{ fontSize: '0.9rem' }}>No need to create new classes</p>
          </div>
        </div>
      </section>

      {/* Real-World Examples */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          marginBottom: '2rem',
          borderBottom: '2px solid var(--border)',
          paddingBottom: '0.5rem'
        }}>
          Real-World Use Cases
        </h2>

        {/* Hero Section */}
        <div className="framed-section framed-section--dark framed-section--striped-inset" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Hero Section
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Perfect for landing page heroes with decorative striped edges
          </p>
          <button style={{
            padding: '0.75rem 2rem',
            background: 'var(--highlight)',
            color: 'var(--text)',
            borderRadius: '0.5rem',
            fontWeight: '600',
            fontSize: '1rem',
            cursor: 'pointer'
          }}>
            Get Started
          </button>
        </div>

        {/* Feature Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {[1, 2, 3].map((num) => (
            <div key={num} className="framed-section">
              <div className="framed-section__header">
                <h3 className="framed-section__title">Feature {num}</h3>
              </div>
              <div className="framed-section__content">
                <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Description of feature {num} that explains what makes it great
                  and why users should care about it.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Info */}
      <div className="framed-section framed-section--dark" style={{ textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
          Ready to Use
        </h3>
        <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
          All these components are ready to use in your project.
          Check the documentation for integration details.
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <code style={{
            padding: '0.5rem 1rem',
            background: 'var(--bg)',
            borderRadius: '0.375rem',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            /docs/framed-sections-integration.md
          </code>
          <code style={{
            padding: '0.5rem 1rem',
            background: 'var(--bg)',
            borderRadius: '0.375rem',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            /planning/framed-sections-feature.md
          </code>
        </div>
      </div>
    </div>
  );
}
