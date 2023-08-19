import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { User } from "@/models/server";
import { Match, Room } from "@/models";
import App from "@/components/App";
import ErrorPage from "@/components/ErrorPage";
import { getSupabaseServer } from "@/utils/supabaseServer";

export default async function page({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user as unknown as User;

  const { data, error } = await getSupabaseServer()
    .from("matches")
    .select<string, Match & { rooms: Room }>(`*, rooms(*)`)
    .eq("room_id", params.id)
    .single();

  if (error) return <ErrorPage message={error.message} />;

  const { rooms: room, ...rest } = data;
  const isHelper = room.helper === user.user_metadata.user_name;

  return (
    <App
      room={{
        ...room,
        correctWords: isHelper ? rest.correct_words! : [],
      }}
      user={user}
    />
  );
}
