import { auth, currentUser, clerkClient } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';

export default async function SyncUser() {
  const { userId } = await auth();
  
  if (!userId) return null;

  const { data: existingUser } = await supabase
    .from('users')
    .select('id, role')
    .eq('id', userId)
    .single();

  if (!existingUser) {
    const user = await currentUser();
    if (user) {
      const email = user.emailAddresses[0]?.emailAddress;
      const defaultRole = 'client';

      await supabase.from('users').insert({
        id: userId,
        email: email,
        role: defaultRole
      });

      // Update Clerk user metadata with role
      const client = await clerkClient();
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          role: defaultRole
        }
      });
    }
  } else {
    // Sync existing role from Supabase to Clerk if needed
    const user = await currentUser();
    if (user && user.publicMetadata?.role !== existingUser.role) {
      const client = await clerkClient();
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          role: existingUser.role
        }
      });
    }
  }

  return null;
}