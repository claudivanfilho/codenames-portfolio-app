import { getRoomById, updateStateAndCreatePlayer } from "@/app/_repositories/RoomRepository";
import { getSessionUser, setSessionRoom } from "@/app/_utils/session";

export const enterRoom = async (roomId: number) => {
  const user = await getSessionUser();
  const oldRoom = await getRoomById(+roomId);

  setSessionRoom(+roomId);

  if (oldRoom.created_by === user.id) return oldRoom;

  const newGameState =
    oldRoom.game_state === "WAITING_GUESSER" ? "WAITING_TIP" : oldRoom.game_state;

  const room = await updateStateAndCreatePlayer(newGameState, user, roomId);

  return room;
};
