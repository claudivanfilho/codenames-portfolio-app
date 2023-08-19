import { cookies } from "next/headers";
import { RoomParamsType, User } from "@/models/server";
import makeGuess from "@/routeHandlers/makeGuess";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import BadRequestError from "@/errors/BadRequestError";

export async function POST(req: Request, reqParams: RoomParamsType) {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const roomId = reqParams.params.id;
  try {
    const room = await makeGuess(+roomId, user as unknown as User, req);
    return NextResponse.json(room);
  } catch (error) {
    if (error instanceof BadRequestError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
