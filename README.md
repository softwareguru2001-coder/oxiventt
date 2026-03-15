# Next.js + Supabase Industrial Fans Website

A clean Next.js App Router project with TypeScript, Tailwind CSS, and Supabase integration.

## Project Structure

```
project/
├── app/
│   ├── (public)/           # Public pages (home, products, contact)
│   │   ├── layout.tsx      # Public layout with header/footer
│   │   ├── page.tsx        # Homepage
│   │   ├── products/       # Products listing
│   │   └── contact/        # Contact page
│   ├── admin/
│   │   ├── (protected)/    # Protected admin pages
│   │   │   ├── layout.tsx  # Admin layout with auth check
│   │   │   ├── page.tsx    # Admin dashboard
│   │   │   ├── products/   # Product management
│   │   │   └── leads/      # Leads management
│   │   └── login/          # Admin login page
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
├── lib/
│   ├── supabase/
│   │   ├── client.ts       # Browser Supabase client
│   │   └── server.ts       # Server Supabase helpers
│   ├── types/
│   │   └── database.ts     # Database TypeScript types
│   └── utils.ts            # Utility functions (cn helper)
├── components/
│   └── ui/                 # UI components (will be populated)
├── .env.local              # Environment variables
└── package.json
```

## Features

### ✅ Supabase Integration
- Browser client (`lib/supabase/client.ts`)
- Server helpers (`lib/supabase/server.ts`)
- TypeScript database types
- Authentication helpers

### ✅ Folder Structure
- `/app/(public)` - Public-facing pages
- `/app/admin/(protected)` - Protected admin pages with auth
- `/components/ui` - Reusable UI components
- `/lib` - Utilities and helpers

### ✅ Pages Created
- **Public:**
  - Homepage (/)
  - Products listing (/products)
  - Contact page (/contact)

- **Admin:**
  - Login (/admin/login)
  - Dashboard (/admin)
  - Products management (/admin/products)
  - Leads management (/admin/leads)

## Environment Variables

`.env.local` is configured with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://rvkytgsnccefvnjreffj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Dependencies Installed

- `@supabase/supabase-js` - Supabase client
- `clsx` - Conditional classNames
- `tailwind-merge` - Merge Tailwind classes
- `lucide-react` - Icon library
- TypeScript, Next.js 13, Tailwind CSS

## Usage

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Start Production
```bash
npm start
```

## Supabase Client Usage

### Browser Client (Client Components)
```typescript
'use client';
import { supabase } from '@/lib/supabase/client';

// Fetch data
const { data, error } = await supabase
  .from('products')
  .select('*');

// Authentication
await supabase.auth.signInWithPassword({ email, password });
```

### Server Helpers (Server Components)
```typescript
import { getSession, getUser, createServerClient } from '@/lib/supabase/server';

// Get session
const { session, error } = await getSession();

// Get user
const { user, error } = await getUser();

// Create client
const supabase = await createServerClient();
```

## Database Schema

The project includes TypeScript types for:
- `products` table
- `leads` table
- `admin_users` table

See `lib/types/database.ts` for full schema.

## Admin Access

Admin pages are protected by authentication check in the layout. Users must:
1. Sign in at `/admin/login`
2. Have a session to access `/admin` routes

## Next Steps

1. **Add UI Components** - Populate `components/ui/` with shadcn/ui components
2. **Implement Forms** - Add product creation/editing forms
3. **Add Images** - Implement image upload to Supabase Storage
4. **Style Pages** - Enhance UI with Tailwind classes
5. **Add Validation** - Implement form validation with Zod
6. **Create API Routes** - Add API endpoints if needed

## Build Status

✅ Build successful
✅ TypeScript types verified
✅ All pages generated
✅ No critical errors

The project is ready for development!
