import { cookies } from "next/headers";
import { User } from "@/models/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getSupabaseServer } from "@/utils/supabaseServer";
import { Room, RoomInsertType } from "@/models";

export const enterRoom = async (roomId: number) => {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();
  const user = (await data.user) as unknown as User;

  await supabase.auth.updateUser({ user_metadata: { room_id: +roomId } } as any);

  const { data: oldRoom } = await getSupabaseServer()
    .from("rooms")
    .select<string, Room>()
    .eq("id", roomId)
    .single();

  if (oldRoom?.helper === user.user_metadata.user_name) return oldRoom;

  const { data: room, error } = await getSupabaseServer()
    .from("rooms")
    .update<Partial<RoomInsertType>>({
      guesser: user.user_metadata.user_name,
      game_state: "WAITING_TIP",
    })
    .eq("id", roomId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return room;
};
