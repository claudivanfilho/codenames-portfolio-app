import createRoom from "@/app/api/_routeHandlers/createRoom";
import BadRequestError from "@/app/api/_errors/BadRequestError";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const data = await createRoom(req);
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof BadRequestError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
