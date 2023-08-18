import { Match, Room } from "@/models";
import { getSupabaseServer } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const userName = new URL(req.url).searchParams.get("userName");
  const roomId = params.id;

  const { data, error } = await getSupabaseServer()
    .from("matches")
    .select<string, Match & { rooms: Room }>(`*, rooms(*)`)
    .eq("room_id", roomId)
    .single();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  const { rooms: room, ...rest } = data;
  const isHelper = room.helper === userName;

  return NextResponse.json({
    ...room,
    correctWords: isHelper ? rest.correct_words : [],
  });
}
