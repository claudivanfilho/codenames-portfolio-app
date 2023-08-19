import { ExtendedRoom, Match, Room } from "@/models";
import { RoomParamsType, User } from "@/models/server";
import { getSupabaseServer } from "@/utils/supabaseServer";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function getRoom(
  _: Request,
  { params }: RoomParamsType
): Promise<ExtendedRoom> {
  const roomId = params.id;

  const supabase = createRouteHandlerClient({ cookies });
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user as unknown as User;

  const { data, error } = await getSupabaseServer()
    .from("matches")
    .select<string, Match & { rooms: Room }>(`*, rooms(*)`)
    .eq("room_id", +roomId)
    .single();

  if (error) throw new Error(error.message);

  const { rooms: room, ...rest } = data;
  const isHelper = room.helper === user.user_metadata.user_name;

  return {
    ...room,
    correctWords: isHelper ? rest.correct_words! : [],
  };
}
