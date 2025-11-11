/**
 * Data type definitions for each specific block type
 */

/**
 * Hero block data structure
 */
export interface HeroBlockData {
  /** Main title text */
  title: string;
  /** Optional subtitle/tagline */
  subtitle?: string;
  /** Background image URL */
  backgroundImage?: string;
  /** Call-to-action button text */
  ctaText?: string;
  /** Call-to-action link URL */
  ctaLink?: string;
  /** Text alignment */
  alignment?: 'left' | 'center' | 'right';
}

/**
 * Text block data structure
 */
export interface TextBlockData {
  /** Text content (supports markdown/HTML) */
  content: string;
  /** Visual variant */
  variant?: 'paragraph' | 'heading' | 'quote';
  /** Text alignment */
  alignment?: 'left' | 'center' | 'right' | 'justify';
}

/**
 * Image block data structure
 */
export interface ImageBlockData {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional caption */
  caption?: string;
  /** Optional width */
  width?: number;
  /** Optional height */
  height?: number;
}

/**
 * Call-to-action block data structure
 */
export interface CtaBlockData {
  /** Button text */
  text: string;
  /** Link URL */
  link: string;
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Button size */
  size?: 'small' | 'medium' | 'large';
}

/**
 * Form field configuration
 */
export interface FormField {
  /** Field name/ID */
  name: string;
  /** Input type */
  type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox';
  /** Field label */
  label: string;
  /** Placeholder text */
  placeholder?: string;
  /** Whether field is required */
  required?: boolean;
  /** Options for select fields */
  options?: string[];
}

/**
 * Form block data structure
 */
export interface FormBlockData {
  /** Optional form title */
  title?: string;
  /** Array of form fields */
  fields: FormField[];
  /** Submit button text */
  submitText?: string;
  /** API endpoint or form handler */
  onSubmit?: string;
}

/**
 * Container block data structure
 */
export interface ContainerBlockData {
  /** Maximum width constraint */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Background color */
  backgroundColor?: string;
}

/**
 * Grid block data structure
 */
export interface GridBlockData {
  /** Number of columns */
  columns?: number;
  /** Gap between items */
  gap?: 'sm' | 'md' | 'lg';
  /** Responsive column configuration */
  responsive?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

/**
 * Columns block data structure
 */
export interface ColumnsBlockData {
  /** Column distribution pattern */
  distribution?: 'equal' | 'auto' | number[];
  /** Gap between columns */
  gap?: 'sm' | 'md' | 'lg';
}

/**
 * Navigation link configuration
 */
export interface NavigationLink {
  /** Link display text */
  text: string;
  /** Link URL */
  url: string;
  /** Optional icon identifier or URL */
  icon?: string;
  /** Optional dropdown sub-links */
  subLinks?: NavigationLink[];
}

/**
 * Navigation block data structure
 */
export interface NavigationBlockData {
  /** Array of navigation links */
  links: NavigationLink[];
  /** Logo icon name (Lucide icon) */
  logoIcon?: string;
  /** Logo text */
  logoText?: string;
}
