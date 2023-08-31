import { createClient } from "@supabase/supabase-js";

console.log("keyy", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, process.env);

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const getSupabaseServer = () =>
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SERVICE_ROLE_KEY!);
