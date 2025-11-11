/**
 * Blocks Demo Page - Comprehensive demonstration of the block loader system
 *
 * This page showcases all block types and demonstrates nested composition
 * patterns with realistic examples.
 */

import BlockLoader from '../components/block-loader';
import type { BaseBlock } from '../types/blocks';

export default function BlocksDemo() {
  // Example block configuration demonstrating all features
  const blocks: BaseBlock[] = [
    // Hero block at the top
    {
      id: 'hero-1',
      type: 'hero',
      data: {
        title: 'Block Loader System Demo',
        subtitle: 'A comprehensive showcase of dynamic, composable content blocks',
        alignment: 'center',
        ctaText: 'Get Started',
        ctaLink: '#features',
      },
    },

    // Container with intro text
    {
      id: 'container-intro',
      type: 'container',
      data: {
        maxWidth: 'lg',
        padding: 'lg',
      },
      children: [
        {
          id: 'intro-heading',
          type: 'text',
          data: {
            content: 'Welcome to the Block Loader System',
            variant: 'heading',
            alignment: 'center',
          },
        },
        {
          id: 'intro-text',
          type: 'text',
          data: {
            content:
              'This page demonstrates the flexible, type-safe block system that enables dynamic page building with nested composition. Each section below showcases different block types and patterns.',
            variant: 'paragraph',
            alignment: 'center',
          },
        },
      ],
    },

    // Features section with grid
    {
      id: 'features-section',
      type: 'container',
      data: {
        maxWidth: 'xl',
        padding: 'lg',
        backgroundColor: '#f8f9fa',
      },
      children: [
        {
          id: 'features-heading',
          type: 'text',
          data: {
            content: 'Key Features',
            variant: 'heading',
            alignment: 'center',
          },
        },
        {
          id: 'features-grid',
          type: 'grid',
          data: {
            columns: 3,
            gap: 'md',
            responsive: {
              mobile: 1,
              tablet: 2,
              desktop: 3,
            },
          },
          children: [
            // Feature 1
            {
              id: 'feature-1',
              type: 'container',
              data: {
                padding: 'md',
                backgroundColor: 'white',
              },
              children: [
                {
                  id: 'feature-1-title',
                  type: 'text',
                  data: {
                    content: 'Type-Safe Architecture',
                    variant: 'heading',
                  },
                },
                {
                  id: 'feature-1-desc',
                  type: 'text',
                  data: {
                    content:
                      'Full TypeScript support ensures compile-time safety and excellent developer experience with autocomplete and type checking.',
                    variant: 'paragraph',
                  },
                },
              ],
            },
            // Feature 2
            {
              id: 'feature-2',
              type: 'container',
              data: {
                padding: 'md',
                backgroundColor: 'white',
              },
              children: [
                {
                  id: 'feature-2-title',
                  type: 'text',
                  data: {
                    content: 'Nested Composition',
                    variant: 'heading',
                  },
                },
                {
                  id: 'feature-2-desc',
                  type: 'text',
                  data: {
                    content:
                      'Blocks can contain other blocks, enabling unlimited layout complexity through recursive rendering patterns.',
                    variant: 'paragraph',
                  },
                },
              ],
            },
            // Feature 3
            {
              id: 'feature-3',
              type: 'container',
              data: {
                padding: 'md',
                backgroundColor: 'white',
              },
              children: [
                {
                  id: 'feature-3-title',
                  type: 'text',
                  data: {
                    content: 'Error Resilience',
                    variant: 'heading',
                  },
                },
                {
                  id: 'feature-3-desc',
                  type: 'text',
                  data: {
                    content:
                      'Error boundaries isolate block failures, preventing a single error from breaking the entire page.',
                    variant: 'paragraph',
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    // Columns layout example
    {
      id: 'columns-section',
      type: 'container',
      data: {
        maxWidth: 'xl',
        padding: 'lg',
      },
      children: [
        {
          id: 'columns-heading',
          type: 'text',
          data: {
            content: 'Flexible Column Layouts',
            variant: 'heading',
            alignment: 'center',
          },
        },
        {
          id: 'columns-demo',
          type: 'columns',
          data: {
            distribution: [2, 1],
            gap: 'lg',
          },
          children: [
            {
              id: 'column-main',
              type: 'container',
              data: {
                padding: 'md',
                backgroundColor: '#e9ecef',
              },
              children: [
                {
                  id: 'column-main-title',
                  type: 'text',
                  data: {
                    content: 'Main Content (2/3 width)',
                    variant: 'heading',
                  },
                },
                {
                  id: 'column-main-text',
                  type: 'text',
                  data: {
                    content:
                      'This column takes up 2/3 of the available width on larger screens and stacks on mobile. The columns block supports equal distribution, auto-sizing, and custom ratios.',
                    variant: 'paragraph',
                  },
                },
              ],
            },
            {
              id: 'column-sidebar',
              type: 'container',
              data: {
                padding: 'md',
                backgroundColor: '#e9ecef',
              },
              children: [
                {
                  id: 'column-sidebar-title',
                  type: 'text',
                  data: {
                    content: 'Sidebar (1/3 width)',
                    variant: 'heading',
                  },
                },
                {
                  id: 'column-sidebar-text',
                  type: 'text',
                  data: {
                    content:
                      'This narrower column can be used for supplementary information, navigation, or calls-to-action.',
                    variant: 'paragraph',
                  },
                },
                {
                  id: 'column-sidebar-cta',
                  type: 'cta',
                  data: {
                    text: 'Learn More',
                    link: '#',
                    variant: 'outline',
                    size: 'small',
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    // Quote example
    {
      id: 'quote-section',
      type: 'container',
      data: {
        maxWidth: 'md',
        padding: 'lg',
      },
      children: [
        {
          id: 'quote',
          type: 'text',
          data: {
            content:
              'The block loader system makes it trivial to build dynamic, composable pages without sacrificing type safety or developer experience.',
            variant: 'quote',
            alignment: 'center',
          },
        },
      ],
    },

    // Form example
    {
      id: 'form-section',
      type: 'container',
      data: {
        maxWidth: 'md',
        padding: 'lg',
        backgroundColor: '#f8f9fa',
      },
      children: [
        {
          id: 'form-heading',
          type: 'text',
          data: {
            content: 'Contact Form Demo',
            variant: 'heading',
            alignment: 'center',
          },
        },
        {
          id: 'contact-form',
          type: 'form',
          data: {
            title: 'Get in Touch',
            fields: [
              {
                name: 'name',
                type: 'text',
                label: 'Name',
                placeholder: 'Your name',
                required: true,
              },
              {
                name: 'email',
                type: 'email',
                label: 'Email',
                placeholder: 'your.email@example.com',
                required: true,
              },
              {
                name: 'subject',
                type: 'select',
                label: 'Subject',
                required: true,
                options: ['General Inquiry', 'Technical Support', 'Feedback'],
              },
              {
                name: 'message',
                type: 'textarea',
                label: 'Message',
                placeholder: 'Your message here...',
                required: true,
              },
              {
                name: 'subscribe',
                type: 'checkbox',
                label: 'Subscribe to newsletter',
                required: false,
              },
            ],
            submitText: 'Send Message',
          },
        },
      ],
    },

    // Image example
    {
      id: 'image-section',
      type: 'container',
      data: {
        maxWidth: 'lg',
        padding: 'lg',
      },
      children: [
        {
          id: 'image-heading',
          type: 'text',
          data: {
            content: 'Image Block Example',
            variant: 'heading',
            alignment: 'center',
          },
        },
        {
          id: 'demo-image',
          type: 'image',
          data: {
            src: 'https://via.placeholder.com/800x400',
            alt: 'Placeholder image demonstration',
            caption: 'Image blocks support captions, lazy loading, and responsive sizing',
          },
        },
      ],
    },

    // CTA section
    {
      id: 'cta-section',
      type: 'container',
      data: {
        maxWidth: 'md',
        padding: 'lg',
      },
      children: [
        {
          id: 'cta-heading',
          type: 'text',
          data: {
            content: 'Ready to Get Started?',
            variant: 'heading',
            alignment: 'center',
          },
        },
        {
          id: 'cta-text',
          type: 'text',
          data: {
            content:
              'The block loader system is ready to use. Start building dynamic pages by defining your block configurations.',
            variant: 'paragraph',
            alignment: 'center',
          },
        },
        {
          id: 'cta-primary',
          type: 'cta',
          data: {
            text: 'View Documentation',
            link: '/planning/block-loader-feature.md',
            variant: 'primary',
            size: 'large',
          },
        },
      ],
    },
  ];

  return (
    <div className="blocks-demo-page">
      <BlockLoader blocks={blocks} />
    </div>
  );
}
