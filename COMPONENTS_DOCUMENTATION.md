# Phase 2: Component System Documentation

This document provides comprehensive documentation for all UI components built on the Oxiventt Design System.

## Table of Contents

1. [Button Component](#button-component)
2. [Card Components](#card-components)
3. [Form Components](#form-components)
   - [Input](#input)
   - [Textarea](#textarea)
   - [Select](#select)
4. [Icon System](#icon-system)

---

## Button Component

The Button component provides a consistent interface for all button interactions with multiple variants, sizes, and states.

### Import

```typescript
import { Button } from '@/components/ui/button';
```

### Variants

#### Primary (Default)
Main call-to-action buttons.

```jsx
<Button variant="primary">Primary Button</Button>
```

#### Secondary
Secondary actions using the brand's WhatsApp green.

```jsx
<Button variant="secondary">Secondary Button</Button>
```

#### Outline
Bordered buttons for secondary actions.

```jsx
<Button variant="outline">Outline Button</Button>
```

#### Ghost
Minimal styling for tertiary actions.

```jsx
<Button variant="ghost">Ghost Button</Button>
```

#### Danger
For destructive actions (delete, remove, etc.).

```jsx
<Button variant="danger">Delete</Button>
```

#### Success
For confirmation actions.

```jsx
<Button variant="success">Confirm</Button>
```

### Sizes

```jsx
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>
```

### States

#### Loading
Shows a spinner and disables the button.

```jsx
<Button loading={true}>Processing...</Button>
```

#### Disabled

```jsx
<Button disabled>Disabled Button</Button>
```

### With Icons

```jsx
import { Download } from '@/components/ui/icons';

<Button>
  <Download className="h-4 w-4" />
  Download
</Button>
```

### Full Example

```jsx
import { Button } from '@/components/ui/button';
import { Send } from '@/components/ui/icons';

function MyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Submit logic
    setIsSubmitting(false);
  };

  return (
    <div className="flex gap-ds-sm">
      <Button variant="outline" size="md">
        Cancel
      </Button>
      <Button
        variant="primary"
        size="md"
        loading={isSubmitting}
        onClick={handleSubmit}
      >
        <Send className="h-4 w-4" />
        Submit Form
      </Button>
    </div>
  );
}
```

---

## Card Components

Card components provide a flexible container system with multiple variants and sub-components.

### Import

```typescript
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
```

### Variants

#### Default
Standard card with subtle shadow.

```jsx
<Card variant="default">
  <CardContent>Content here</CardContent>
</Card>
```

#### Elevated
Card with more prominent shadow.

```jsx
<Card variant="elevated">
  <CardContent>Content here</CardContent>
</Card>
```

#### Interactive
Hover effects for clickable cards.

```jsx
<Card variant="interactive" onClick={() => navigate('/details')}>
  <CardContent>Click me</CardContent>
</Card>
```

#### Bordered
Strong border emphasis.

```jsx
<Card variant="bordered">
  <CardContent>Content here</CardContent>
</Card>
```

#### Flat
No shadow or border.

```jsx
<Card variant="flat">
  <CardContent>Content here</CardContent>
</Card>
```

### Padding

Control internal padding:

```jsx
<Card padding="none">No padding</Card>
<Card padding="sm">Small padding</Card>
<Card padding="md">Medium padding</Card>
<Card padding="lg">Large padding (default)</Card>
```

### Complete Example

```jsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function ProductCard({ product }) {
  return (
    <Card variant="interactive">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={product.image} alt={product.name} className="w-full rounded-ds-md" />
        <p className="mt-ds-md text-ds-body text-text-secondary">
          {product.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="primary" size="sm">
          Learn More
        </Button>
        <Button variant="outline" size="sm">
          Request Quote
        </Button>
      </CardFooter>
    </Card>
  );
}
```

---

## Form Components

### Input

Text input component with validation states and helper text.

#### Import

```typescript
import { Input } from '@/components/ui/input';
```

#### Basic Usage

```jsx
<Input
  type="text"
  placeholder="Enter your name"
/>
```

#### With Label

```jsx
<Input
  label="Email Address"
  type="email"
  placeholder="you@example.com"
/>
```

#### With Helper Text

```jsx
<Input
  label="Password"
  type="password"
  helperText="Must be at least 8 characters"
/>
```

#### Error State

```jsx
<Input
  label="Email"
  type="email"
  error={true}
  helperText="Please enter a valid email address"
/>
```

#### Success State

```jsx
<Input
  label="Username"
  type="text"
  success={true}
  helperText="Username is available"
/>
```

#### Complete Form Example

```jsx
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

function ContactForm() {
  const [errors, setErrors] = useState({});

  return (
    <form className="space-y-ds-lg">
      <Input
        label="Full Name"
        type="text"
        placeholder="John Doe"
        error={!!errors.name}
        helperText={errors.name}
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        error={!!errors.email}
        helperText={errors.email}
      />
      <Input
        label="Phone Number"
        type="tel"
        placeholder="+1 (555) 000-0000"
      />
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}
```

---

### Textarea

Multi-line text input component.

#### Import

```typescript
import { Textarea } from '@/components/ui/textarea';
```

#### Basic Usage

```jsx
<Textarea
  placeholder="Enter your message"
  rows={4}
/>
```

#### With Label and Helper Text

```jsx
<Textarea
  label="Message"
  placeholder="Tell us about your requirements..."
  helperText="Minimum 10 characters"
  rows={6}
/>
```

#### With Validation

```jsx
<Textarea
  label="Description"
  error={descriptionError}
  helperText={descriptionError ? "Description is required" : "Describe your product"}
  rows={5}
/>
```

---

### Select

Dropdown select component built on Radix UI.

#### Import

```typescript
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
```

#### Basic Usage

```jsx
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>
```

#### With State Management

```jsx
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function ProductFilter() {
  const [category, setCategory] = useState('');

  return (
    <div>
      <label className="block text-ds-body-sm text-text-primary mb-ds-xs font-medium">
        Category
      </label>
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="axial">Axial Fans</SelectItem>
          <SelectItem value="centrifugal">Centrifugal Fans</SelectItem>
          <SelectItem value="industrial">Industrial Fans</SelectItem>
          <SelectItem value="hvac">HVAC Fans</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
```

#### With Error State

```jsx
<Select>
  <SelectTrigger error={hasError} className="w-full">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
  </SelectContent>
</Select>
{hasError && (
  <p className="mt-ds-xs text-ds-body-sm text-danger">
    Please select an option
  </p>
)}
```

---

## Icon System

Centralized icon management using Lucide React.

### Import Icons

```typescript
// Import specific icons
import { Download, Send, User } from '@/components/ui/icons';

// Or import the Icon wrapper component
import { Icon } from '@/components/ui/icon';
```

### Available Icons

All commonly used Lucide React icons are exported from `@/components/ui/icons`:

- **Actions**: Download, Upload, Send, Save, Edit, Trash2, Plus, X
- **Navigation**: ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Home, Menu
- **Status**: Check, CheckCircle2, AlertCircle, AlertTriangle, XCircle
- **Communication**: Mail, Phone, MessageSquare
- **Business**: Building2, Factory, Package, ShoppingCart
- **User**: User, Users, LogOut
- **Utility**: Search, Filter, Settings, Eye, EyeOff, Info, HelpCircle
- And more...

### Direct Usage

```jsx
import { Download, Send } from '@/components/ui/icons';

<Button>
  <Download className="h-4 w-4" />
  Download PDF
</Button>

<Button>
  <Send className="h-4 w-4" />
  Send Message
</Button>
```

### With Icon Wrapper

For consistent sizing:

```jsx
import { Icon } from '@/components/ui/icon';
import { Download } from '@/components/ui/icons';

<Icon icon={Download} size="sm" />   // 16px
<Icon icon={Download} size="md" />   // 20px (default)
<Icon icon={Download} size="lg" />   // 24px
<Icon icon={Download} size="xl" />   // 32px
```

### In Buttons

```jsx
import { Send, Download, Trash2 } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';

<div className="flex gap-ds-sm">
  <Button variant="primary">
    <Send className="h-4 w-4" />
    Send
  </Button>
  <Button variant="outline">
    <Download className="h-4 w-4" />
    Download
  </Button>
  <Button variant="danger">
    <Trash2 className="h-4 w-4" />
    Delete
  </Button>
</div>
```

### Standalone Icon Usage

```jsx
import { AlertCircle, CheckCircle2 } from '@/components/ui/icons';

<div className="flex items-center gap-ds-sm">
  <CheckCircle2 className="h-5 w-5 text-success" />
  <span>Operation successful</span>
</div>

<div className="flex items-center gap-ds-sm">
  <AlertCircle className="h-5 w-5 text-danger" />
  <span>Error occurred</span>
</div>
```

---

## Best Practices

### Component Composition

Compose components for complex UIs:

```jsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from '@/components/ui/icons';

function ContactCard() {
  return (
    <Card variant="elevated" className="max-w-md">
      <CardHeader>
        <CardTitle>Get in Touch</CardTitle>
      </CardHeader>
      <CardContent className="space-y-ds-lg">
        <Input label="Name" placeholder="Your name" />
        <Input label="Email" type="email" placeholder="you@example.com" />
        <Textarea label="Message" placeholder="Your message..." rows={4} />
      </CardContent>
      <CardFooter>
        <Button variant="primary" className="w-full">
          <Send className="h-4 w-4" />
          Send Message
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### Consistent Spacing

Use design system spacing tokens:

```jsx
<div className="space-y-ds-lg">  {/* Vertical spacing */}
  <div className="flex gap-ds-md">  {/* Horizontal gap */}
    <Button>Cancel</Button>
    <Button variant="primary">Submit</Button>
  </div>
</div>
```

### Form Validation Pattern

```jsx
function MyForm() {
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit form
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-ds-lg">
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={!!errors.email}
        helperText={errors.email}
      />
      <Textarea
        label="Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        error={!!errors.message}
        helperText={errors.message}
      />
      <Button type="submit" variant="primary">Submit</Button>
    </form>
  );
}
```

---

## Migration from Existing Components

If you have existing button implementations, migrate them gradually:

**Before:**
```jsx
<button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
  Click me
</button>
```

**After:**
```jsx
<Button variant="primary">Click me</Button>
```

The new Button component includes:
- Consistent spacing and sizing
- Focus states for accessibility
- Loading states
- Active states with scale animation
- Disabled states
- All design system tokens
