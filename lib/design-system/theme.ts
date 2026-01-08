/**
 * Design System Theme Types & Constants
 * Type-safe access to design tokens
 */

export const colors = {
  primary: {
    DEFAULT: '#0052CC',
    dark: '#0037A3',
    light: '#4D8FFF',
    lighter: '#E8F0FF',
  },
  secondary: {
    DEFAULT: '#25D366',
    light: '#A8F5C5',
  },
  accent: {
    DEFAULT: '#FF6B35',
    light: '#FFAA7E',
  },
  success: {
    DEFAULT: '#00A651',
    light: '#D4EDDA',
  },
  warning: {
    DEFAULT: '#FFB800',
    light: '#FFF3CD',
  },
  danger: {
    DEFAULT: '#E83935',
    light: '#FFEBEE',
  },
  background: {
    dark: '#1A202C',
    light: '#F8F9FA',
    card: '#FFFFFF',
  },
  border: {
    DEFAULT: '#E0E0E0',
    dark: '#2D3748',
  },
  text: {
    primary: '#1A202C',
    secondary: '#666666',
    tertiary: '#999999',
    light: '#FFFFFF',
    lightSecondary: '#B0B8C1',
    lightTertiary: '#8A929D',
  },
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
  xxxl: '64px',
  huge: '96px',
} as const;

export const borderRadius = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  full: '9999px',
} as const;

export const fontSize = {
  h1: '48px',
  h2: '36px',
  h3: '28px',
  h4: '24px',
  h5: '20px',
  h6: '16px',
  bodyLarge: '16px',
  bodyMedium: '14px',
  bodySmall: '12px',
  caption: '12px',
  button: '14px',
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const lineHeight = {
  h1: 1.2,
  h2: 1.3,
  h3: 1.35,
  h4: 1.4,
  h5: 1.4,
  h6: 1.5,
  bodyLarge: 1.6,
  bodyMedium: 1.5,
  bodySmall: 1.4,
  caption: 1.4,
  button: 1.4,
} as const;

export const letterSpacing = {
  h1: '-0.02em',
  h2: '-0.01em',
  h3: '0',
  h4: '0',
  h5: '0',
  h6: '0',
  body: '0',
  caption: '0.08em',
} as const;

export const shadows = {
  elevation1: '0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 4px rgba(0, 0, 0, 0.05)',
  elevation2: '0 3px 6px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.12)',
  elevation3: '0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)',
  elevation4: '0 15px 30px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)',
} as const;

export const transitions = {
  fast: '200ms ease',
  normal: '300ms ease',
  slow: '400ms ease',
  easeOut: 'cubic-bezier(0.33, 1, 0.68, 1)',
  easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
} as const;

export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

export type ColorTokens = typeof colors;
export type SpacingTokens = typeof spacing;
export type BorderRadiusTokens = typeof borderRadius;
export type FontSizeTokens = typeof fontSize;
export type FontWeightTokens = typeof fontWeight;
export type LineHeightTokens = typeof lineHeight;
export type LetterSpacingTokens = typeof letterSpacing;
export type ShadowTokens = typeof shadows;
export type TransitionTokens = typeof transitions;
export type ZIndexTokens = typeof zIndex;

export type Theme = {
  colors: ColorTokens;
  spacing: SpacingTokens;
  borderRadius: BorderRadiusTokens;
  fontSize: FontSizeTokens;
  fontWeight: FontWeightTokens;
  lineHeight: LineHeightTokens;
  letterSpacing: LetterSpacingTokens;
  shadows: ShadowTokens;
  transitions: TransitionTokens;
  zIndex: ZIndexTokens;
};

export const theme: Theme = {
  colors,
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  shadows,
  transitions,
  zIndex,
};
