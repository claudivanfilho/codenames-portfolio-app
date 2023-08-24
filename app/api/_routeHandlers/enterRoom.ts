import { getRoomById, updateRoomById } from "@/app/_repositories/RoomRepository";
import { getSessionUser, updateSessionUser } from "@/app/_repositories/UserRepository";

export const enterRoom = async (roomId: number) => {
  const user = await getSessionUser();

  const { data: oldRoom } = await getRoomById(+roomId);

  await updateSessionUser({ room_id: +roomId });

  if (oldRoom!.helper_id === user.id) return oldRoom;

  return updateRoomById(+roomId, {
    guesser_id: user.id,
    guesser_name: user.user_metadata.user_name,
    game_state: oldRoom!.game_state === "WAITING_GUESSER" ? "WAITING_TIP" : oldRoom!.game_state,
  });
};
