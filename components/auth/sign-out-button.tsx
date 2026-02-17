'use client';

import { useRouter } from 'next/navigation';
import { supabaseBrowserClient } from '@/lib/supabase/client';
import { LogOut } from 'lucide-react';

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = supabaseBrowserClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-colors w-full"
    >
      <LogOut className="w-4 h-4 flex-shrink-0" />
      Sign Out
    </button>
  );
}
