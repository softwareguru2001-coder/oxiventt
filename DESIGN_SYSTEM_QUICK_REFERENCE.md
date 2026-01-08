# Design System Quick Reference

Quick lookup guide for common design tokens and patterns.

## Colors

### Tailwind Classes

```jsx
// Primary
bg-primary-ds text-primary-ds border-primary-ds
bg-primary-ds-dark bg-primary-ds-light bg-primary-ds-lighter

// Secondary
bg-secondary-ds text-secondary-ds border-secondary-ds
bg-secondary-ds-light

// Accent
bg-accent-ds text-accent-ds border-accent-ds
bg-accent-ds-light

// Status
bg-success text-success border-success
bg-warning text-warning border-warning
bg-danger text-danger border-danger

// Text
text-text-primary text-text-secondary text-text-tertiary
text-text-light text-text-light-secondary

// Backgrounds
bg-bg-light bg-bg-dark bg-bg-card

// Borders
border-border-ds border-border-dark
```

## Typography

### CSS Classes (Recommended)

```jsx
className="heading-1"     // H1 - 48px bold
className="heading-2"     // H2 - 36px bold
className="heading-3"     // H3 - 28px semibold
className="heading-4"     // H4 - 24px semibold
className="heading-5"     // H5 - 20px semibold
className="heading-6"     // H6 - 16px semibold
className="body-large"    // 16px regular
className="body-medium"   // 14px regular
className="body-small"    // 12px regular
className="caption"       // 12px uppercase
```

### Tailwind Classes (Alternative)

```jsx
className="text-ds-h1"
className="text-ds-h2"
className="text-ds-h3"
className="text-ds-h4"
className="text-ds-h5"
className="text-ds-h6"
className="text-ds-body-lg"
className="text-ds-body"
className="text-ds-body-sm"
className="text-ds-caption"
```

## Spacing

```jsx
p-ds-xs    // 4px padding
p-ds-sm    // 8px
p-ds-md    // 16px ⭐ Common
p-ds-lg    // 24px ⭐ Common
p-ds-xl    // 32px
p-ds-xxl   // 48px
p-ds-xxxl  // 64px
p-ds-huge  // 96px

// Also works with: m-, gap-, space-
gap-ds-lg m-ds-md space-y-ds-sm
```

## Border Radius

```jsx
rounded-ds-none  // 0px
rounded-ds-sm    // 4px
rounded-ds-md    // 8px ⭐ Common
rounded-ds-lg    // 12px ⭐ Common
rounded-ds-xl    // 16px
rounded-ds-2xl   // 20px
rounded-ds-full  // 9999px (pills, circles)
```

## Shadows

```jsx
shadow-elevation-1  // Subtle - cards at rest
shadow-elevation-2  // Raised - hover states
shadow-elevation-3  // Floating - dropdowns
shadow-elevation-4  // Prominent - modals
```

## Common Patterns

### Card (Interactive)
```jsx
<div className="bg-bg-card border border-border-ds rounded-ds-lg shadow-elevation-1 p-ds-lg transition-all duration-normal hover:shadow-elevation-2 hover:scale-[1.02]">
  {children}
</div>
```

### Card (Static)
```jsx
<div className="bg-bg-card border border-border-ds rounded-ds-lg shadow-elevation-1 p-ds-lg">
  {children}
</div>
```

### Button (Primary)
```jsx
<button className="bg-primary-ds text-white px-5 h-10 rounded-ds-md text-ds-button transition-all duration-fast hover:bg-primary-ds-dark hover:shadow-elevation-2 active:scale-95">
  Click me
</button>
```

### Button (Secondary)
```jsx
<button className="border-2 border-primary-ds text-primary-ds px-5 h-10 rounded-ds-md text-ds-button transition-all duration-fast hover:bg-primary-ds-lighter">
  Click me
</button>
```

### Grid (4→2→1 columns)
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-ds-lg">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

### Grid (3→2→1 columns)
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-ds-lg">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

### Container with Max Width
```jsx
<div className="max-w-7xl mx-auto px-ds-md md:px-ds-lg">
  {children}
</div>
```

### Section Spacing
```jsx
<section className="py-ds-xxxl">
  {children}
</section>
```

## TypeScript Imports

```typescript
// Import everything
import { colors, spacing, theme, cardPresets, buttonSizes } from '@/lib/design-system';

// Use presets
<div className={cardPresets.interactive}>Card</div>
<button className={buttonSizes.md.className}>Button</button>

// Access token values
const primary = colors.primary.DEFAULT; // "#0052CC"
const padding = spacing.lg; // "24px"
```

## Transitions

```jsx
// Smooth transitions
className="transition-all duration-normal"  // 300ms (default)
className="transition-all duration-fast"    // 200ms (quick)
className="transition-all duration-slow"    // 400ms (deliberate)

// Common combinations
className="transition-all duration-normal hover:shadow-elevation-2"
className="transition-transform duration-fast hover:scale-105"
className="transition-colors duration-fast hover:bg-primary-ds-dark"
```

## Responsive Breakpoints

```jsx
// Mobile first approach
className="text-ds-h3 md:text-ds-h2 lg:text-ds-h1"
className="p-ds-md md:p-ds-lg lg:p-ds-xl"
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"

// Breakpoints:
// sm:  640px
// md:  768px
// lg:  1024px
// xl:  1280px
// 2xl: 1536px
```

## Z-Index

```jsx
z-dropdown         // 1000
z-sticky           // 1020
z-fixed            // 1030
z-modal-backdrop   // 1040
z-modal            // 1050
z-popover          // 1060
z-tooltip          // 1070
```

## CSS Variables (Direct Use)

When Tailwind classes aren't sufficient:

```jsx
// In inline styles
style={{
  color: 'var(--color-primary)',
  padding: 'var(--spacing-lg)',
  borderRadius: 'var(--border-radius-md)',
  boxShadow: 'var(--shadow-elevation-2)',
}}

// In CSS modules
.myComponent {
  background: var(--color-primary);
  padding: var(--spacing-lg);
  transition: var(--transition-normal);
}
```
