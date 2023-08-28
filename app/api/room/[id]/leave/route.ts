import { getSessionUser, setSessionRoom } from "@/app/_utils/session";
import { db } from "@/app/_utils/database";
import { RoomParamsType } from "@/types";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(_: Request, reqParams: RoomParamsType) {
  const roomId = reqParams.params.id;
  const user = await getSessionUser();

  await db
    .deleteFrom("players")
    .where("user_id", "=", user.id)
    .where("room_id", "=", +roomId)
    .where("role", "=", "GUESSER")
    .execute();

  setSessionRoom(null);

  return NextResponse.json({ message: "Room Leaved" });
}
