import { RoomParamsType } from "@/types";
import makeGuess from "@/app/api/_routeHandlers/makeGuess";
import { NextResponse } from "next/server";
import BadRequestError from "@/app/api/_errors/BadRequestError";
import { getSessionUser } from "@/app/_utils/session";

export const dynamic = "force-dynamic";

export async function POST(req: Request, reqParams: RoomParamsType) {
  const roomId = reqParams.params.id;
  const user = await getSessionUser();

  try {
    const data = await makeGuess(+roomId, user, req);
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof BadRequestError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
