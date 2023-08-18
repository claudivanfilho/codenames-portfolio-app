import { RoomInsertType } from "@/models";
import { EnterPostType } from "@/models/server";
import { getSupabaseServer } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { guesser, room_id } = (await req.json()) as EnterPostType;

  if (!guesser) {
    return NextResponse.json({ error: "Missing guesser" }, { status: 400 });
  }

  const room = await getSupabaseServer()
    .from("rooms")
    .update<Partial<RoomInsertType>>({
      guesser,
      game_state: "WAITING_TIP",
    })
    .eq("id", room_id)
    .select()
    .single();

  return NextResponse.json(room);
}
