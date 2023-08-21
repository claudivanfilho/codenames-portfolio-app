import { getRoomById, updateRoomById } from "@/app/_repositories/RoomRepository";
import { getSessionUser, updateSessionUser } from "@/app/_repositories/UserRepository";

export const enterRoom = async (roomId: number) => {
  const user = await getSessionUser();
  const userName = user.user_metadata.user_name;

  const { data: oldRoom } = await getRoomById(+roomId);

  await updateSessionUser({ room_id: +roomId });

  if (oldRoom!.helper === userName) return oldRoom;

  return updateRoomById(+roomId, {
    guesser: userName,
    game_state: "WAITING_TIP",
  });
};
