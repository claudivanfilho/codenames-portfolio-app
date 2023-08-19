import { cookies } from "next/headers";
import BadRequestError from "@/errors/BadRequestError";
import { LoginPostType } from "@/models/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

const SYMBOLIC_PASSWORD = "12345678";

async function validate(req: Request): Promise<LoginPostType> {
  const formData = await req.formData();
  const userName = formData.get("userName");

  if (!userName) throw new BadRequestError("Missing userName");

  return { userName: String(userName) };
}

export default async function login(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  const { userName } = await validate(req);
  const { error } = await supabase.auth.signUp({
    email: `${userName.replaceAll(" ", "")}@codenames.com`,
    password: SYMBOLIC_PASSWORD,
    phone: "5583996435387",
    options: {
      data: {
        user_name: userName,
      },
    },
  });

  if (error) throw new Error(error.message);

  return { message: "Login successfully" };
}
