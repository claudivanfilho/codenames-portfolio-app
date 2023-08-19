import { Match, Room } from "@/models";
import { MakeGuessPostType, RoomParamsType } from "@/models/server";
import { getSupabaseServer } from "@/utils/supabaseServer";
import { NextResponse } from "next/server";

export async function POST(req: Request, reqParams: RoomParamsType) {
  const roomId = reqParams.params.id;
  const { words } = (await req.json()) as MakeGuessPostType;

  const { data, error } = await getSupabaseServer()
    .from("matches")
    .select<string, Match & { rooms: Room }>(`*, rooms(*)`)
    .eq("room_id", roomId)
    .single();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  const { rooms: room, ...match } = data!;

  if (room.rounds_left === 0) {
    return NextResponse.json({ message: "You have no more rounds left" }, { status: 400 });
  }

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
    .eq("id", roomId);

  if (result.error) {
    return NextResponse.json(
      { message: result.error.message || result.statusText },
      { status: result.status }
    );
  }

  return NextResponse.json(room);
}
