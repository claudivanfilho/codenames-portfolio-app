import { RoomParamsType } from "@/models/server";
import { NextResponse } from "next/server";
import { enterRoom } from "@/routeHandlers/enterRoom";
import BadRequestError from "@/errors/BadRequestError";

export const dynamic = "force-dynamic";

export const POST = async (_: Request, reqParams: RoomParamsType) => {
  const roomId = reqParams.params.id;

  try {
    const data = await enterRoom(+roomId);
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof BadRequestError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
};
