import {
  DEFAULT_CORRECT_WORDS,
  DEFAULT_ROUNDS_OF_MATCH,
  DEFAULT_WORDS_NUMBER,
} from "@/config/contants";
import { MatchInsertType, Room, RoomInsertType } from "@/models";
import { RoomPostType } from "@/models/server";
import { getRandomWords } from "@/utils/gameLogic";
import { getSupabaseServer } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { helper, roomName } = (await req.json()) as RoomPostType;

  if (!helper) {
    return NextResponse.json({ message: "Missing helper" }, { status: 400 });
  }

  if (!roomName) {
    return NextResponse.json({ message: "Missing roomName" }, { status: 400 });
  }

  const { data, error } = await getSupabaseServer()
    .from("rooms")
    .insert<RoomInsertType>({
      name: roomName,
      helper,
      wrong_guesses: [],
      correct_guesses: [],
      words: getRandomWords(DEFAULT_WORDS_NUMBER),
      rounds_left: DEFAULT_ROUNDS_OF_MATCH,
      game_state: "WAITING_GUESSER",
    })
    .select<string, Room>()
    .single();

  if (error)
    return NextResponse.json({ message: error.message, code: error.code }, { status: 400 });

  // TODO Create a supabase procedure to grants atomicity to this transaction
  await getSupabaseServer()
    .from("matches")
    .insert<MatchInsertType>({
      room_id: data!.id,
      correct_words: getRandomWords(DEFAULT_CORRECT_WORDS, data.words),
    });

  return NextResponse.json(data);
}
