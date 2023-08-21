import BadRequestError from "@/errors/BadRequestError";
import { LoginPostType, User } from "@/models/server";
import { loginUser } from "@/repositories/UserRepository";

async function validate(req: Request): Promise<LoginPostType> {
  const formData = await req.formData();
  const userName = formData.get("userName");

  if (!userName) throw new BadRequestError("Missing userName");

  return { userName: String(userName) };
}

export default async function login(req: Request): Promise<User> {
  const { userName } = await validate(req);
  return loginUser(userName);
}
