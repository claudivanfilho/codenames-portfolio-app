import { leaveSessionRoom } from "@/repositories/UserRepository";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  await leaveSessionRoom();

  return NextResponse.redirect(`${new URL(request.url).origin}/`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
