import { DEFAULT_CORRECT_WORDS } from "@/app/_config/constants";
import BadRequestError from "@/app/api/_errors/BadRequestError";
import { Room } from "@/types";
import { MakeTipPostType, User } from "@/types";
import { getRoomById, updateRoomById } from "@/app/_repositories/RoomRepository";

async function validate(req: Request, room: Room, user: User) {
  const { tip, tip_number } = (await req.json()) as MakeTipPostType;

  if (!tip) throw new BadRequestError("Tip missing");

  if (!tip_number) throw new BadRequestError("Tip number missing");

  const wordsLeft = DEFAULT_CORRECT_WORDS - room.correct_guesses.length;
  if (tip_number > DEFAULT_CORRECT_WORDS - room.correct_guesses.length) {
    throw new BadRequestError(`Tip number must be lower than ${wordsLeft}`);
  }

  if (room.game_state !== "WAITING_TIP") {
    throw new Error("You cannot make a tip now");
  }

  if (room.created_by !== user.id) {
    throw new Error("You cannot make a tip to this room");
  }

  if (room.id != user.user_metadata.room_id) {
    throw new Error("You must enter the room to make a tip");
  }

  return { tip, tip_number };
}

export default async function makeTip(roomId: number, user: User, req: Request) {
  const room = await getRoomById(roomId);
  const { tip, tip_number } = await validate(req, room, user);
  return updateRoomById(+roomId, {
    current_tip: tip,
    current_tip_number: tip_number,
    game_state: "WAITING_GUESSES",
  });
}
