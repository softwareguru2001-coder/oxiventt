/**
 * Design System Utilities
 * Helper functions for working with design tokens
 */

export const getColorVar = (token: string): string => {
  return `var(--color-${token})`;
};

export const getSpacingVar = (token: string): string => {
  return `var(--spacing-${token})`;
};

export const getBorderRadiusVar = (token: string): string => {
  return `var(--border-radius-${token})`;
};

export const getShadowVar = (elevation: 1 | 2 | 3 | 4): string => {
  return `var(--shadow-elevation-${elevation})`;
};

export const getFontSizeVar = (token: string): string => {
  return `var(--font-size-${token})`;
};

export const getTransitionVar = (token: string): string => {
  return `var(--transition-${token})`;
};

/**
 * Typography utility class names
 * Use these classes in className prop for consistent typography
 */
export const typography = {
  h1: 'heading-1',
  h2: 'heading-2',
  h3: 'heading-3',
  h4: 'heading-4',
  h5: 'heading-5',
  h6: 'heading-6',
  bodyLarge: 'body-large',
  bodyMedium: 'body-medium',
  bodySmall: 'body-small',
  caption: 'caption',
} as const;

/**
 * Tailwind utility classes for design system tokens
 */
export const tw = {
  colors: {
    primary: {
      bg: 'bg-primary-ds',
      text: 'text-primary-ds',
      border: 'border-primary-ds',
    },
    secondary: {
      bg: 'bg-secondary-ds',
      text: 'text-secondary-ds',
      border: 'border-secondary-ds',
    },
    accent: {
      bg: 'bg-accent-ds',
      text: 'text-accent-ds',
      border: 'border-accent-ds',
    },
    success: {
      bg: 'bg-success',
      text: 'text-success',
      border: 'border-success',
    },
    warning: {
      bg: 'bg-warning',
      text: 'text-warning',
      border: 'border-warning',
    },
    danger: {
      bg: 'bg-danger',
      text: 'text-danger',
      border: 'border-danger',
    },
  },
  spacing: {
    xs: 'ds-xs',
    sm: 'ds-sm',
    md: 'ds-md',
    lg: 'ds-lg',
    xl: 'ds-xl',
    xxl: 'ds-xxl',
    xxxl: 'ds-xxxl',
    huge: 'ds-huge',
  },
  borderRadius: {
    none: 'rounded-ds-none',
    sm: 'rounded-ds-sm',
    md: 'rounded-ds-md',
    lg: 'rounded-ds-lg',
    xl: 'rounded-ds-xl',
    '2xl': 'rounded-ds-2xl',
    full: 'rounded-ds-full',
  },
  shadows: {
    elevation1: 'shadow-elevation-1',
    elevation2: 'shadow-elevation-2',
    elevation3: 'shadow-elevation-3',
    elevation4: 'shadow-elevation-4',
  },
  fontSize: {
    h1: 'text-ds-h1',
    h2: 'text-ds-h2',
    h3: 'text-ds-h3',
    h4: 'text-ds-h4',
    h5: 'text-ds-h5',
    h6: 'text-ds-h6',
    bodyLg: 'text-ds-body-lg',
    body: 'text-ds-body',
    bodySm: 'text-ds-body-sm',
    caption: 'text-ds-caption',
    button: 'text-ds-button',
  },
} as const;

/**
 * Button size presets
 */
export const buttonSizes = {
  sm: {
    height: '32px',
    padding: '8px 16px',
    className: 'h-8 px-4 text-ds-button',
  },
  md: {
    height: '40px',
    padding: '10px 20px',
    className: 'h-10 px-5 text-ds-button',
  },
  lg: {
    height: '48px',
    padding: '12px 24px',
    className: 'h-12 px-6 text-ds-button',
  },
} as const;

/**
 * Card presets
 */
export const cardPresets = {
  default: 'bg-bg-card border border-border-ds rounded-ds-lg shadow-elevation-1 p-ds-lg',
  elevated: 'bg-bg-card border border-border-ds rounded-ds-lg shadow-elevation-2 p-ds-lg',
  interactive:
    'bg-bg-card border border-border-ds rounded-ds-lg shadow-elevation-1 p-ds-lg transition-all duration-normal hover:shadow-elevation-2 hover:scale-[1.02]',
} as const;

/**
 * Responsive breakpoints matching Tailwind defaults
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;
