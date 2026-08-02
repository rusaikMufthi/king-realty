import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bkuqqmiqreqrejpoieph.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrdXFxbWlxcmVxcmVqcG9pZXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2NjczODksImV4cCI6MjEwMTI0MzM4OX0.dgkmwmr3wX_NNGHS-ATcWbxpeHZqxjsoTnID0UehO0A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Official Admin Gmail addresses for KING Realty:
 * 1. rusaikmufthi@gmail.com
 * 2. kingrealty91@gmail.com
 */
export const PREDEFINED_ADMIN_GMAILS: string[] = process.env.NEXT_PUBLIC_ADMIN_EMAILS
  ? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(',').map(e => e.trim().toLowerCase())
  : [
      'rusaikmufthi@gmail.com',
      'kingrealty91@gmail.com'
    ];

/**
 * Checks if a given email address belongs to one of the assigned Supabase Admin accounts.
 */
export function isAssignedAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  return PREDEFINED_ADMIN_GMAILS.includes(email.trim().toLowerCase());
}
