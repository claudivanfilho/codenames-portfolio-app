import { cookies } from "next/headers";
import { User } from "@/models/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import BadRequestError from "@/errors/BadRequestError";
import { getSupabaseServer } from "@/utils/supabaseServer";
import { RoomInsertType } from "@/models";

export const enterRoom = async (roomId: number) => {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();
  const guesser = (await data.user) as unknown as User;

  await supabase.auth.updateUser({ user_metadata: { room_id: +roomId } } as any);

  if (!guesser) throw new BadRequestError("Missing guesser");

  const { data: room, error } = await getSupabaseServer()
    .from("rooms")
    .update<Partial<RoomInsertType>>({
      guesser: guesser.user_metadata.user_name,
      game_state: "WAITING_TIP",
    })
    .eq("id", roomId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return room;
};
