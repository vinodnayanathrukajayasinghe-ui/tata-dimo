import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Service-role client used ONLY for managing admin auth users (list/create/delete).
// This is the one legitimate runtime use of the service role key: Supabase Auth's
// admin API has no RLS-based equivalent reachable from a normal user session.
// Never import this from a client component or any public-facing code path.
export function createAdminAuthClient() {
  return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
