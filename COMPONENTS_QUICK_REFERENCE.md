# Components Quick Reference

Fast lookup guide for component usage patterns.

## Button

```jsx
import { Button } from '@/components/ui/button';

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button loading={true}>Loading...</Button>
<Button disabled>Disabled</Button>

// With Icon
import { Download } from '@/components/ui/icons';
<Button><Download className="h-4 w-4" />Download</Button>
```

## Card

```jsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

// Basic
<Card>
  <CardContent>Content</CardContent>
</Card>

// Full Structure
<Card variant="interactive">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Main content
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Variants
<Card variant="default">Default</Card>
<Card variant="elevated">Elevated</Card>
<Card variant="interactive">Interactive</Card>
<Card variant="bordered">Bordered</Card>
<Card variant="flat">Flat</Card>

// Padding
<Card padding="none">No padding</Card>
<Card padding="sm">Small</Card>
<Card padding="md">Medium</Card>
<Card padding="lg">Large</Card>
```

## Input

```jsx
import { Input } from '@/components/ui/input';

// Basic
<Input placeholder="Enter text" />

// With Label
<Input label="Email" type="email" />

// With Helper Text
<Input label="Name" helperText="Enter your full name" />

// Error State
<Input label="Email" error={true} helperText="Invalid email" />

// Success State
<Input label="Username" success={true} helperText="Available" />

// Disabled
<Input disabled placeholder="Disabled" />
```

## Textarea

```jsx
import { Textarea } from '@/components/ui/textarea';

// Basic
<Textarea placeholder="Enter message" rows={4} />

// With Label
<Textarea label="Message" rows={6} />

// With Validation
<Textarea
  label="Description"
  error={hasError}
  helperText={errorMessage}
  rows={5}
/>
```

## Select

```jsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Basic
<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>

// Controlled
const [value, setValue] = useState('');
<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Choose option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="opt1">Option 1</SelectItem>
    <SelectItem value="opt2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

## Icons

```jsx
// Import specific icons
import { Download, Send, User, Mail } from '@/components/ui/icons';

// Use directly
<Download className="h-4 w-4" />
<Send className="h-5 w-5 text-primary-ds" />

// In buttons
<Button>
  <Download className="h-4 w-4" />
  Download
</Button>

// With Icon wrapper
import { Icon } from '@/components/ui/icon';
<Icon icon={Download} size="md" />
```

## Common Patterns

### Form Layout

```jsx
<div className="space-y-ds-lg">
  <Input label="Name" />
  <Input label="Email" type="email" />
  <Textarea label="Message" rows={4} />
  <div className="flex gap-ds-sm">
    <Button variant="outline">Cancel</Button>
    <Button variant="primary">Submit</Button>
  </div>
</div>
```

### Card Grid

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-ds-lg">
  {items.map(item => (
    <Card key={item.id} variant="interactive">
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>{item.content}</CardContent>
    </Card>
  ))}
</div>
```

### Button Group

```jsx
<div className="flex gap-ds-sm">
  <Button variant="primary">Save</Button>
  <Button variant="outline">Cancel</Button>
  <Button variant="ghost">Reset</Button>
</div>
```

### Action Buttons

```jsx
import { Edit, Trash2, Eye } from '@/components/ui/icons';

<div className="flex gap-ds-xs">
  <Button size="sm" variant="ghost">
    <Eye className="h-4 w-4" />
  </Button>
  <Button size="sm" variant="ghost">
    <Edit className="h-4 w-4" />
  </Button>
  <Button size="sm" variant="ghost">
    <Trash2 className="h-4 w-4" />
  </Button>
</div>
```

### Status Messages

```jsx
import { CheckCircle2, AlertCircle } from '@/components/ui/icons';

// Success
<div className="flex items-center gap-ds-sm text-success">
  <CheckCircle2 className="h-5 w-5" />
  <span>Success message</span>
</div>

// Error
<div className="flex items-center gap-ds-sm text-danger">
  <AlertCircle className="h-5 w-5" />
  <span>Error message</span>
</div>
```

### Loading Button

```jsx
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  await api.submit();
  setLoading(false);
};

<Button loading={loading} onClick={handleSubmit}>
  Submit
</Button>
```

### Form Validation

```jsx
const [errors, setErrors] = useState({});

<Input
  label="Email"
  type="email"
  error={!!errors.email}
  helperText={errors.email || "We'll never share your email"}
/>
```

## Import Cheatsheet

```jsx
// Components
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Icons - Import what you need
import { Download, Send, User, Mail, Phone } from '@/components/ui/icons';
import { Icon } from '@/components/ui/icon';

// Design System
import { colors, spacing, theme } from '@/lib/design-system';
```
