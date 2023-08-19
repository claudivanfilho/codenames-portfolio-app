import getRoom from "@/routeHandlers/getRoom";
import BadRequestError from "@/errors/BadRequestError";
import { RoomParamsType } from "@/models/server";
import { NextResponse } from "next/server";

export const GET = async (req: Request, reqParams: RoomParamsType) => {
  try {
    const data = await getRoom(req, reqParams);
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof BadRequestError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
};
