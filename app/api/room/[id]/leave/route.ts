import { getSessionUser, leaveSessionRoom } from "@/app/_repositories/UserRepository";
import { db } from "@/app/_utils/database";
import { RoomParamsType } from "@/types";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request, reqParams: RoomParamsType) {
  const roomId = reqParams.params.id;
  const user = await getSessionUser();
  await leaveSessionRoom();

  await db
    .deleteFrom("players")
    .where("user_id", "=", user.id)
    .where("room_id", "=", +roomId)
    .where("role", "=", "GUESSER")
    .execute();

  return NextResponse.redirect(`${new URL(request.url).origin}/`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
