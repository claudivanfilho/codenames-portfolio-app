import { DEFAULT_CORRECT_WORDS } from "@/config/contants";
import BadRequestError from "@/errors/BadRequestError";
import { MakeGuessPostType, User } from "@/models/server";
import { getExtendedRoom, updateRoomById } from "@/repositories/RoomRepository";

export default async function makeGuess(roomId: number, user: User, req: Request) {
  const { words } = (await req.json()) as MakeGuessPostType;
  const room = await getExtendedRoom(roomId);
  const correctGuesses = [...room.correct_guesses];
  const wrongGuesses = [...room.wrong_guesses];

  if (room.guesser !== user.user_metadata.user_name)
    throw new BadRequestError("You are not able to make a guess in this room");

  if (room.rounds_left === 0) throw new BadRequestError("You have no more rounds left");

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
