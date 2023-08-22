import BadRequestError from "@/app/api/_errors/BadRequestError";
import { RoomParamsType } from "@/types/server";
import { getSessionUser } from "@/app/_repositories/UserRepository";
import makeTip from "@/app/api/_routeHandlers/makeTip";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request, reqParams: RoomParamsType) {
  const roomId = reqParams.params.id;
  const user = await getSessionUser();

  try {
    const { data } = await makeTip(+roomId, user, req);
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof BadRequestError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
