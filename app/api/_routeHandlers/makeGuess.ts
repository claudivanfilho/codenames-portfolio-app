import { DEFAULT_CORRECT_WORDS } from "@/app/_config/contants";
import BadRequestError from "@/app/api/_errors/BadRequestError";
import { Room } from "@/app/_models";
import { MakeGuessPostType, User } from "@/app/_models/server";
import { getExtendedRoom, updateRoomById } from "@/app/_repositories/RoomRepository";

async function validate(room: Room, user: User, req: Request) {
  const { words } = (await req.json()) as MakeGuessPostType;

  if (!words.length) throw new BadRequestError("No guess provided");

  if (room.guesser !== user.user_metadata.user_name)
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

  const correctGuesses = [...room.correct_guesses];
  const wrongGuesses = [...room.wrong_guesses];

  words.forEach((word) => {
    if (room.correctWords?.includes(word)) {
      correctGuesses.push(word);
    } else {
      wrongGuesses.push(word);
    }
  });

  const isFinished =
    wrongGuesses.length ||
    room.rounds_left - 1 === 0 ||
    correctGuesses.length === DEFAULT_CORRECT_WORDS;

  return updateRoomById(roomId, {
    correct_guesses: correctGuesses,
    wrong_guesses: wrongGuesses,
    game_state: isFinished ? "FINISHED" : "WAITING_TIP",
    rounds_left: room.rounds_left - 1,
  });
}
