import { NextResponse } from "next/server";
import BadRequestError from "@/app/api/_errors/BadRequestError";
import { LoginPostType } from "@/types";
import { login } from "@/app/api/_routeHandlers/login";

async function validate(req: Request): Promise<LoginPostType> {
  const { userName } = (await req.json()) as LoginPostType;

  if (!userName) throw new BadRequestError("Missing userName");

  return { userName: String(userName) };
}

export async function POST(req: Request) {
  try {
    const { userName } = await validate(req);
    await login(userName);
    return NextResponse.json({ message: "Login Successfully" });
  } catch (error) {
    if (error instanceof BadRequestError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
