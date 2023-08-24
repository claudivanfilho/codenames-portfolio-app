import { DEFAULT_CORRECT_WORDS } from "@/app/_config/constants";
import BadRequestError from "@/app/api/_errors/BadRequestError";
import { Room } from "@/types";
import { MakeGuessPostType, User } from "@/types/server";
import { getExtendedRoom, updateRoomById } from "@/app/_repositories/RoomRepository";

async function validate(room: Room, user: User, req: Request) {
  const { words } = (await req.json()) as MakeGuessPostType;

  if (!words.length) throw new BadRequestError("No guess provided");

  if (room.guesser_id !== user.id)
    throw new BadRequestError("You are not able to make a guess to this room");

  if (room.rounds_left === 0) throw new Error("You have no more rounds left");

  if (words.length !== room.current_tip_number!) {
    throw new BadRequestError("You are attempting to submit more or less guesses than are allowed");
  }

  if (room.id !== user.user_metadata.room_id) {
    throw new Error("You must enter the room to make a tip");
  }

  return { words };
}

export default async function makeGuess(roomId: number, user: User, req: Request) {
  const room = await getExtendedRoom(roomId);
  const { words } = await validate(room, user, req);

  const correctGuesses = new Set(...room.correct_guesses);
  const wrongGuesses = new Set(...room.wrong_guesses);

  words.forEach((word) => {
    if (room.correctWords?.includes(word)) {
      correctGuesses.add(word);
    } else {
      wrongGuesses.add(word);
    }
  });

  const isFinished =
    wrongGuesses.size ||
    room.rounds_left - 1 === 0 ||
    correctGuesses.size === DEFAULT_CORRECT_WORDS;

  return updateRoomById(roomId, {
    correct_guesses: Array.from(correctGuesses),
    wrong_guesses: Array.from(wrongGuesses),
    game_state: isFinished ? "FINISHED" : "WAITING_TIP",
    rounds_left: room.rounds_left - 1,
  });
}
