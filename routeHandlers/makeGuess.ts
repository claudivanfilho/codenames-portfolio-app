import BadRequestError from "@/errors/BadRequestError";
import { Match, Room } from "@/models";
import { MakeGuessPostType, User } from "@/models/server";
import { getSupabaseServer } from "@/utils/supabaseServer";

export default async function makeGuess(roomId: number, user: User, req: Request) {
  const { words } = (await req.json()) as MakeGuessPostType;

  const { data, error } = await getSupabaseServer()
    .from("matches")
    .select<string, Match & { rooms: Room }>(`*, rooms(*)`)
    .eq("room_id", roomId)
    .single();

  if (error) throw new BadRequestError(error.message);

  if (data.rooms.guesser !== user.user_metadata.user_name)
    throw new BadRequestError("You are not able to make a guess in this room");

  const { rooms: room, ...match } = data!;

  if (room.rounds_left === 0) throw new BadRequestError("You have no more rounds left");

  const correctWords = [...room.correct_guesses];
  const wrongWords = [...room.wrong_guesses];

  words.map((word) => {
    if (match.correct_words?.includes(word)) {
      correctWords.push(word);
    } else {
      wrongWords.push(word);
    }
  });

  const isFinished = wrongWords.length || room.rounds_left - 1 === 0;

  const result = await getSupabaseServer()
    .from("rooms")
    .update<Partial<Room>>({
      correct_guesses: correctWords,
      wrong_guesses: wrongWords,
      game_state: isFinished ? "FINISHED" : "WAITING_TIP",
      rounds_left: room.rounds_left - 1,
    })
    .eq("id", roomId)
    .select<string, Room>()
    .single();

  if (result.error) throw new Error(result.error.message || result.statusText);

  return result.data;
}
