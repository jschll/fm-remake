import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content */
  children: ReactNode;
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Button size */
  size?: 'small' | 'medium' | 'large';
  /** Full width button */
  fullWidth?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const baseClasses = 'button';
  const variantClass = `button-${variant}`;
  const sizeClass = `button-${size}`;
  const fullWidthClass = fullWidth ? 'button-full-width' : '';
  const loadingClass = loading ? 'button-loading' : '';
  const disabledClass = disabled || loading ? 'button-disabled' : '';

  const classes = [
    baseClasses,
    variantClass,
    sizeClass,
    fullWidthClass,
    loadingClass,
    disabledClass,
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="button-spinner" />}{children}
    </button>
  );
}
