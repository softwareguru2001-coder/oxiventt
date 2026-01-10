# Oxiventt Design System Documentation

Complete design system implementation including design tokens (Phase 1) and component library (Phase 2).

## What's Included

### Phase 1: Design Tokens
- CSS Custom Properties for all design values
- Tailwind CSS theme extensions
- TypeScript types and constants
- Comprehensive documentation

### Phase 2: Component Library
- Button component with 6 variants
- Card component system
- Form components (Input, Textarea, Select)
- Icon system with 50+ icons
- Full documentation and examples

## Documentation Files

- **DESIGN_SYSTEM.md** (this file) - Design tokens and foundation
- **COMPONENTS_DOCUMENTATION.md** - Complete component documentation
- **COMPONENTS_QUICK_REFERENCE.md** - Quick lookup guide
- **DESIGN_SYSTEM_QUICK_REFERENCE.md** - Token reference
- **PHASE_2_SUMMARY.md** - Implementation summary

## Overview

The design system uses a hybrid approach combining:
- **CSS Custom Properties** (CSS Variables) for design tokens
- **Tailwind CSS** theme extensions for utility classes
- **TypeScript** types for type-safe token access
- **React Components** built on the token foundation

## File Structure

```
project/
├── app/
│   ├── design-system.css          # All CSS variables and utility classes
│   └── globals.css                # Imports design system
├── lib/
│   └── design-system/
│       ├── index.ts               # Main export
│       ├── theme.ts               # TypeScript constants and types
│       └── utilities.ts           # Helper functions and presets
└── tailwind.config.ts             # Extended with design tokens
```

## Design Tokens

### Colors

All colors are available as CSS variables and Tailwind utilities:

#### Primary Colors
- `--color-primary`: #0052CC
- `--color-primary-dark`: #0037A3
- `--color-primary-light`: #4D8FFF
- `--color-primary-lighter`: #E8F0FF

**Usage:**
```jsx
// CSS
.my-element { background: var(--color-primary); }

// Tailwind
<div className="bg-primary-ds text-white" />

// TypeScript
import { colors } from '@/lib/design-system';
console.log(colors.primary.DEFAULT); // #0052CC
```

#### Secondary Colors
- `--color-secondary`: #25D366
- `--color-secondary-light`: #A8F5C5

#### Accent Colors
- `--color-accent`: #FF6B35
- `--color-accent-light`: #FFAA7E

#### Status Colors
- Success: `--color-success` (#00A651)
- Warning: `--color-warning` (#FFB800)
- Danger: `--color-danger` (#E83935)

#### Text Colors
- Light background: `--color-text-primary`, `--color-text-secondary`, `--color-text-tertiary`
- Dark background: `--color-text-light`, `--color-text-light-secondary`, `--color-text-light-tertiary`

**Usage:**
```jsx
<p className="text-text-primary">Primary text</p>
<p className="text-text-secondary">Secondary text</p>
```

### Typography

#### Font Sizes

All typography tokens include font-size, line-height, letter-spacing, and font-weight:

**Headings:**
- H1: 48px, bold, line-height 1.2
- H2: 36px, bold, line-height 1.3
- H3: 28px, semibold, line-height 1.35
- H4: 24px, semibold, line-height 1.4
- H5: 20px, semibold, line-height 1.4
- H6: 16px, semibold, line-height 1.5

**Body:**
- Large: 16px, regular, line-height 1.6
- Medium: 14px, regular, line-height 1.5
- Small: 12px, regular, line-height 1.4

**Usage:**

```jsx
// CSS utility classes
<h1 className="heading-1">Main Title</h1>
<h2 className="heading-2">Subtitle</h2>
<p className="body-large">Paragraph text</p>

// Tailwind classes
<h1 className="text-ds-h1">Main Title</h1>
<h2 className="text-ds-h2">Subtitle</h2>
<p className="text-ds-body-lg">Paragraph text</p>

// Helper utilities
import { typography } from '@/lib/design-system';
<h1 className={typography.h1}>Main Title</h1>
```

**Responsive Typography:**

Font sizes automatically adjust on smaller screens:
- Mobile (≤480px): H1 = 28px, H2 = 24px, H3 = 20px
- Tablet (≤768px): H1 = 36px, H2 = 28px, H3 = 24px

### Spacing

8px-based spacing scale:

| Token | Value | Tailwind Class |
|-------|-------|----------------|
| xs    | 4px   | `p-ds-xs`, `m-ds-xs`, `gap-ds-xs` |
| sm    | 8px   | `p-ds-sm`, `m-ds-sm`, `gap-ds-sm` |
| md    | 16px  | `p-ds-md`, `m-ds-md`, `gap-ds-md` |
| lg    | 24px  | `p-ds-lg`, `m-ds-lg`, `gap-ds-lg` |
| xl    | 32px  | `p-ds-xl`, `m-ds-xl`, `gap-ds-xl` |
| xxl   | 48px  | `p-ds-xxl`, `m-ds-xxl`, `gap-ds-xxl` |
| xxxl  | 64px  | `p-ds-xxxl`, `m-ds-xxxl`, `gap-ds-xxxl` |
| huge  | 96px  | `p-ds-huge`, `m-ds-huge`, `gap-ds-huge` |

**Usage:**
```jsx
<div className="p-ds-lg gap-ds-md">
  <div className="mb-ds-sm">Content</div>
</div>
```

### Border Radius

| Token | Value | Tailwind Class |
|-------|-------|----------------|
| none  | 0px   | `rounded-ds-none` |
| sm    | 4px   | `rounded-ds-sm` |
| md    | 8px   | `rounded-ds-md` |
| lg    | 12px  | `rounded-ds-lg` |
| xl    | 16px  | `rounded-ds-xl` |
| 2xl   | 20px  | `rounded-ds-2xl` |
| full  | 9999px| `rounded-ds-full` |

**Usage:**
```jsx
<div className="rounded-ds-lg border border-border-ds">
  Card with rounded corners
</div>
```

### Shadows

Four elevation levels for depth hierarchy:

| Elevation | Tailwind Class | Use Case |
|-----------|----------------|----------|
| 1 | `shadow-elevation-1` | Cards at rest, subtle borders |
| 2 | `shadow-elevation-2` | Cards on hover, raised elements |
| 3 | `shadow-elevation-3` | Dropdowns, popovers |
| 4 | `shadow-elevation-4` | Modals, dialogs |

**Usage:**
```jsx
<div className="shadow-elevation-1 hover:shadow-elevation-2 transition-shadow">
  Interactive card
</div>
```

### Transitions

Pre-defined transition timing:

| Token | Value | Tailwind Class |
|-------|-------|----------------|
| fast  | 200ms ease | `duration-fast` |
| normal| 300ms ease | `duration-normal` |
| slow  | 400ms ease | `duration-slow` |

**Usage:**
```jsx
<button className="transition-all duration-normal hover:scale-105">
  Hover me
</button>
```

## Common Patterns

### Interactive Cards

```jsx
import { cardPresets } from '@/lib/design-system';

// Option 1: Using preset
<div className={cardPresets.interactive}>
  Card content
</div>

// Option 2: Custom composition
<div className="bg-bg-card border border-border-ds rounded-ds-lg shadow-elevation-1 p-ds-lg transition-all duration-normal hover:shadow-elevation-2 hover:scale-[1.02]">
  Card content
</div>
```

### Button Sizes

```jsx
import { buttonSizes } from '@/lib/design-system';

// Small button
<button className={buttonSizes.sm.className}>
  Small
</button>

// Medium button (default)
<button className={buttonSizes.md.className}>
  Medium
</button>

// Large button
<button className={buttonSizes.lg.className}>
  Large
</button>
```

### Consistent Grid Layouts

```jsx
// Feature grid (4 columns → 2 columns → 1 column)
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-ds-lg">
  {features.map(feature => (
    <div key={feature.id} className={cardPresets.default}>
      {feature.content}
    </div>
  ))}
</div>

// Product grid (3 columns → 2 columns → 1 column)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-ds-lg">
  {products.map(product => (
    <ProductCard key={product.id} {...product} />
  ))}
</div>
```

## TypeScript Support

All design tokens are exported as TypeScript constants with full type safety:

```typescript
import {
  colors,
  spacing,
  borderRadius,
  shadows,
  theme,
  type Theme,
  type ColorTokens
} from '@/lib/design-system';

// Access tokens
const primaryColor = colors.primary.DEFAULT; // #0052CC
const largePadding = spacing.lg; // 24px

// Use types
const myTheme: Theme = theme;
```

## Best Practices

### DO:
1. Always use design tokens - no hardcoded values
2. Use semantic color names (`text-primary-ds` not `text-blue-600`)
3. Maintain consistent spacing with the 8px scale
4. Apply proper elevation hierarchy with shadows
5. Use responsive typography classes

### DON'T:
1. Don't use arbitrary color values (`text-[#0052CC]`)
2. Don't use arbitrary spacing (`p-[23px]`)
3. Don't mix design system tokens with arbitrary values
4. Don't create custom shadows - use elevation levels

## Migration Guide

For existing components, gradually adopt design system tokens:

**Before:**
```jsx
<div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
  Content
</div>
```

**After:**
```jsx
<div className="bg-primary-ds text-white p-ds-lg rounded-ds-lg shadow-elevation-2">
  Content
</div>
```

## Next Steps (Phase 2)

Phase 2 will include:
- Button component system with all variants and states
- Card component system with standardized templates
- Icon system (replacing emojis with SVGs)
- Form input components
- Additional UI components

## Support

For questions or suggestions about the design system, refer to:
- This documentation
- TypeScript types in `lib/design-system/`
- CSS variables in `app/design-system.css`
- Tailwind config extensions in `tailwind.config.ts`
