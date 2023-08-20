import { NextResponse } from "next/server";
import login from "@/routeHandlers/login";

export async function POST(req: Request) {
  const requestUrl = new URL(req.url);
  try {
    await login(req);
    return NextResponse.redirect(`${requestUrl.origin}/`, {
      status: 301,
    });
  } catch (error) {
    return NextResponse.redirect(`${requestUrl.origin}/login?error=${(error as Error).message}`, {
      status: 301,
    });
  }
}
