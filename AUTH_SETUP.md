# Authentication Setup Guide

## Overview

The application now has a complete authentication system with:
- ✅ `supabaseBrowserClient()` for client components
- ✅ `supabaseServerClient()` for server components
- ✅ Middleware protection for `/admin` routes
- ✅ Admin user verification via `admin_users` table
- ✅ Beautiful login UI at `/admin/login`

## Architecture

### Client Functions

**Browser Client** (`lib/supabase/client.ts`)
```typescript
import { supabaseBrowserClient } from '@/lib/supabase/client';

// Use in client components ('use client')
const supabase = supabaseBrowserClient();
```

**Server Client** (`lib/supabase/server.ts`)
```typescript
import { supabaseServerClient } from '@/lib/supabase/server';

// Use in server components and API routes
const supabase = await supabaseServerClient();
```

### Middleware Protection (`middleware.ts`)

Automatically protects `/admin` routes:

1. **Unauthenticated users** → Redirected to `/admin/login`
2. **Authenticated non-admin users** → Signed out and redirected with error
3. **Authenticated admin users** → Allowed access
4. **Already logged in at /admin/login** → Redirected to `/admin`

### Admin Verification Flow

```
User Login → Valid Credentials? → User in admin_users? → Access Granted
     ↓              ↓                       ↓
  Error         Error                Sign Out + Error
```

## Creating Your First Admin User

### Step 1: Create Auth User

Using Supabase Dashboard:
1. Go to **Authentication** → **Users**
2. Click **Add User**
3. Enter email and password
4. Copy the user ID (UUID)

### Step 2: Add to admin_users Table

```sql
INSERT INTO admin_users (id, role)
VALUES ('YOUR_USER_ID_HERE', 'admin');
```

Replace `YOUR_USER_ID_HERE` with the user ID from Step 1.

### Step 3: Test Login

1. Navigate to `/admin/login`
2. Enter the email and password
3. You should be redirected to `/admin`

## Login Page Features

Location: `/admin/login`

**Features:**
- Clean, modern design with gradient background
- Email and password inputs with icons
- Error handling with clear messages
- Loading states during authentication
- Admin verification before allowing access
- Automatic redirect if already logged in
- URL parameter error handling (`?error=not_admin`)

**Error Messages:**
- Invalid credentials
- Not an admin user
- Network errors
- Generic fallback errors

## Using Authentication in Components

### Client Component Example

```typescript
'use client';

import { supabaseBrowserClient } from '@/lib/supabase/client';

export function MyClientComponent() {
  const handleAction = async () => {
    const supabase = supabaseBrowserClient();

    // Sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'user@example.com',
      password: 'password123',
    });

    // Sign out
    await supabase.auth.signOut();

    // Get session
    const { data: { session } } = await supabase.auth.getSession();

    // Get user
    const { data: { user } } = await supabase.auth.getUser();
  };
}
```

### Server Component Example

```typescript
import { supabaseServerClient, getSession, getUser } from '@/lib/supabase/server';

export default async function MyServerComponent() {
  // Option 1: Get session
  const { session } = await getSession();

  // Option 2: Get user
  const { user } = await getUser();

  // Option 3: Use client directly
  const supabase = await supabaseServerClient();
  const { data } = await supabase.from('products').select('*');

  return <div>Protected content</div>;
}
```

### Admin Layout Features

The admin layout (`app/admin/(protected)/layout.tsx`) includes:
- Navigation bar with links to Dashboard, Products, Leads
- Sign out button
- Sticky header
- Professional dark theme

## Security Features

### 1. Middleware Protection
- Runs on every request to `/admin/*`
- Checks authentication status
- Verifies admin role from database
- Manages session cookies properly

### 2. Admin Verification
- Login page checks `admin_users` table
- Non-admin users are signed out immediately
- Clear error messages for non-admin users

### 3. RLS Policies
The database has Row Level Security enabled:
```sql
-- Only admin users can manage products
CREATE POLICY "Admins can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );
```

## Testing Authentication

### Test Valid Admin Login
1. Create a user in Supabase Dashboard
2. Add user to `admin_users` table
3. Try logging in at `/admin/login`
4. Should redirect to `/admin`

### Test Non-Admin User
1. Create a user in Supabase Dashboard
2. Do NOT add to `admin_users` table
3. Try logging in at `/admin/login`
4. Should show error: "You do not have admin access"
5. Should be signed out automatically

### Test Direct Access
1. Without logging in, visit `/admin`
2. Should redirect to `/admin/login`

### Test Already Logged In
1. Log in as admin
2. Try visiting `/admin/login`
3. Should redirect to `/admin`

## Troubleshooting

### "You do not have admin access"

**Cause:** User exists in auth but not in `admin_users` table

**Fix:**
```sql
-- Check if user exists in admin_users
SELECT * FROM admin_users WHERE id = 'USER_ID';

-- If not, add them
INSERT INTO admin_users (id, role)
VALUES ('USER_ID', 'admin');
```

### "Invalid login credentials"

**Cause:** Wrong email or password

**Fix:** Double-check credentials or reset password in Supabase Dashboard

### Middleware not working

**Cause:** Middleware config might be incorrect

**Fix:** Check `middleware.ts` matcher:
```typescript
export const config = {
  matcher: ['/admin/:path*'],
};
```

### Session not persisting

**Cause:** Cookie settings or browser blocking cookies

**Fix:**
- Check browser cookies are enabled
- Check `@supabase/ssr` is properly installed
- Verify middleware is running on every request

## File Structure

```
project/
├── middleware.ts                        # Route protection
├── lib/
│   └── supabase/
│       ├── client.ts                    # supabaseBrowserClient()
│       └── server.ts                    # supabaseServerClient()
├── components/
│   └── auth/
│       └── sign-out-button.tsx          # Sign out component
└── app/
    ├── admin/
    │   ├── (protected)/                 # Protected routes
    │   │   ├── layout.tsx               # Admin layout with nav
    │   │   ├── page.tsx                 # Dashboard
    │   │   ├── products/                # Products management
    │   │   └── leads/                   # Leads management
    │   └── login/
    │       └── page.tsx                 # Login page
```

## Environment Variables

Required in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Quick Start Checklist

- [ ] Create user in Supabase Dashboard (Authentication → Users)
- [ ] Copy user ID
- [ ] Insert into admin_users table
- [ ] Test login at `/admin/login`
- [ ] Verify redirect to `/admin`
- [ ] Test sign out button
- [ ] Test accessing `/admin` without login

---

**Authentication is now fully implemented and ready to use!** 🎉
