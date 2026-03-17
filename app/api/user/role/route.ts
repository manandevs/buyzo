import { auth, clerkClient } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId: requestingUserId } = await auth();

  if (!requestingUserId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Check if requesting user is admin
    const { data: requestingUser } = await supabase
      .from('users')
      .select('role')
      .eq('id', requestingUserId)
      .single();

    if (requestingUser?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { userId, role } = await req.json();

    if (!userId || !role || (role !== 'admin' && role !== 'client')) {
      return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 });
    }

    // Update in Supabase
    const { error: supabaseError } = await supabase
      .from('users')
      .update({ role })
      .eq('id', userId);

    if (supabaseError) {
      console.error('Supabase role update error:', supabaseError);
      return NextResponse.json({ error: 'Failed to update user role in database' }, { status: 500 });
    }

    // Update in Clerk metadata
    const client = await clerkClient();
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: role
      }
    });

    return NextResponse.json({ success: true, message: `User role updated to ${role}` });
  } catch (error) {
    console.error('Unhandled error in role update:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}