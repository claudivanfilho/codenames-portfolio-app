import { cookies } from "next/headers";
import {
  DEFAULT_CORRECT_WORDS,
  DEFAULT_ROUNDS_OF_MATCH,
  DEFAULT_WORDS_NUMBER,
} from "@/config/contants";
import BadRequestError from "@/errors/BadRequestError";
import { MatchInsertType, Room, RoomInsertType } from "@/models";
import { RoomPostType, User } from "@/models/server";
import { getRandomWords } from "@/utils/gameLogic";
import { getSupabaseServer } from "@/utils/supabaseServer";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

async function validate(req: Request): Promise<RoomPostType> {
  const { roomName } = (await req.json()) as RoomPostType;

  if (!roomName) throw new BadRequestError("Missing roomName");

  return { roomName };
}

export default async function createRoom(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user as unknown as User;

  const { roomName } = await validate(req);

  const { data, error } = await getSupabaseServer()
    .from("rooms")
    .insert<RoomInsertType>({
      name: roomName,
      helper: user.user_metadata.user_name,
      wrong_guesses: [],
      correct_guesses: [],
      words: getRandomWords(DEFAULT_WORDS_NUMBER),
      rounds_left: DEFAULT_ROUNDS_OF_MATCH,
      game_state: "WAITING_GUESSER",
    })
    .select<string, Room>()
    .single();

  if (error) throw new Error(`error-${error.code}`);

  await supabase.auth.updateUser({
    data: {
      room_id: data.id,
    },
  });

  // TODO Create a supabase procedure to grants atomicity to this transaction
  await getSupabaseServer()
    .from("matches")
    .insert<MatchInsertType>({
      room_id: data!.id,
      correct_words: getRandomWords(DEFAULT_CORRECT_WORDS, data.words),
    });

  return data;
}
