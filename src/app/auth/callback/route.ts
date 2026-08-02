import { NextResponse } from 'next/server';
import { supabase, isAssignedAdminEmail } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user) {
      const userEmail = data.user.email;
      if (isAssignedAdminEmail(userEmail)) {
        return NextResponse.redirect(`${origin}/admin`);
      } else {
        return NextResponse.redirect(`${origin}/client/dashboard`);
      }
    }
  }

  // Fallback to home page if code exchange fails
  return NextResponse.redirect(`${origin}/login`);
}
