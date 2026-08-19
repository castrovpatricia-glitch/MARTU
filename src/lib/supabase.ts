import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Whether cloud login/sync is configured for this build. When false, the
 * app runs fully local-first with no login gate — the original behavior. */
export const isCloudEnabled = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isCloudEnabled ? createClient(url!, anonKey!) : null;
