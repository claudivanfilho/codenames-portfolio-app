import { Room } from "@/models";
import { MakeTipPostType } from "@/models/server";
import { getSupabaseServer } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { tip, tip_number, room_id } = (await req.json()) as MakeTipPostType;

  const { data, error } = await getSupabaseServer()
    .from("rooms")
    .update<Partial<Room>>({
      current_tip: tip,
      current_tip_number: tip_number,
      game_state: "WAITING_GUESSES",
    })
    .eq("id", room_id);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "tip made successfully" });
}
