import { getUserFromServerComponent, updateUser } from "@/utils/supabaseServer";
import { getRoomById, updateRoomById } from "@/repositories/RoomRepository";

export const enterRoom = async (roomId: number) => {
  const user = await getUserFromServerComponent();
  const userName = user?.user_metadata.user_name || "";

  const { data: oldRoom } = await getRoomById(+roomId);

  await updateUser({ room_id: +roomId });

  if (oldRoom?.helper === userName) return oldRoom;

  return updateRoomById(+roomId, {
    guesser: userName,
    game_state: "WAITING_TIP",
  });
};
