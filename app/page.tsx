import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Room } from "@/models";
import App from "@/components/App";
import { User } from "@/models/server";
import { getSupabaseServer } from "@/utils/supabaseServer";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = await createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();
  const user = data.user as unknown as User;

  const { data: rooms } = await getSupabaseServer()
    .from("rooms")
    .select<string, Room>()
    .neq("game_state", "FINISHED")
    .is("guesser", "NULL");

  return <App rooms={rooms || []} user={user} />;
}
