import { cookies } from "next/headers";
import BadRequestError from "@/errors/BadRequestError";
import { LoginPostType, User } from "@/models/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

const SYMBOLIC_PASSWORD = "12345678";

async function validate(req: Request): Promise<LoginPostType> {
  const formData = await req.formData();
  const userName = formData.get("userName");

  if (!userName) throw new BadRequestError("Missing userName");

  return { userName: String(userName) };
}

export default async function login(req: Request): Promise<User | null> {
  const supabase = createRouteHandlerClient({ cookies });
  const { userName } = await validate(req);
  const email = `${userName.replaceAll(" ", "")}@codenames.com`;

  const {
    error: signUpError,
    data: { user },
  } = await supabase.auth.signUp({
    email,
    password: SYMBOLIC_PASSWORD,
    phone: "5583996435387",
    options: {
      data: {
        user_name: userName,
      },
    },
  });

  if (signUpError?.message === "User already registered") {
    const {
      error: loginError,
      data: { user: loginUser },
    } = await supabase.auth.signInWithPassword({
      email,
      password: SYMBOLIC_PASSWORD,
    });

    if (loginError) throw new Error(loginError.message);

    return loginUser as unknown as User | null;
  } else if (signUpError) {
    throw new Error(signUpError.message);
  }

  return user as unknown as User | null;
}
