import { MakeTipPostType, RoomParamsType } from "@/models/server";
import { updateRoomById } from "@/repositories/RoomRepository";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request, reqParams: RoomParamsType) {
  const roomId = reqParams.params.id;
  // TODO validate
  const { tip, tip_number } = (await req.json()) as MakeTipPostType;

  try {
    const { data } = await updateRoomById(+roomId, {
      current_tip: tip,
      current_tip_number: tip_number,
      game_state: "WAITING_GUESSES",
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 400 });
  }
}
