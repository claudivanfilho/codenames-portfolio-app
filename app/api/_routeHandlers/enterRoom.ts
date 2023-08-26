import { getRoomById, updateStateAndCreatePlayer } from "@/app/_repositories/RoomRepository";
import { getSessionUser, updateSessionUser } from "@/app/_repositories/UserRepository";

export const enterRoom = async (roomId: number) => {
  const user = await getSessionUser();

  const oldRoom = await getRoomById(+roomId);

  await updateSessionUser({ room_id: +roomId });

  if (oldRoom.created_by === user.id) return oldRoom;

  const newGameState =
    oldRoom.game_state === "WAITING_GUESSER" ? "WAITING_TIP" : oldRoom.game_state;

  return updateStateAndCreatePlayer(newGameState, user, roomId);
};
