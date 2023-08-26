import { NextResponse } from "next/server";
import BadRequestError from "@/app/api/_errors/BadRequestError";
import { LoginPostType } from "@/types";
import { loginUser } from "@/app/_repositories/UserRepository";

async function validate(req: Request): Promise<LoginPostType> {
  const { userName } = (await req.json()) as LoginPostType;

  if (!userName) throw new BadRequestError("Missing userName");

  return { userName: String(userName) };
}

export async function POST(req: Request) {
  const requestUrl = new URL(req.url);
  try {
    const { userName } = await validate(req);
    await loginUser(userName);
    return NextResponse.redirect(`${requestUrl.origin}/`, {
      status: 301,
    });
  } catch (error) {
    if (error instanceof BadRequestError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
