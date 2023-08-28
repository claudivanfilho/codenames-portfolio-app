import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@/types";

const SYMBOLIC_PASSWORD = "12345678";

export const login = async (userName: string) => {
  const supabase = createRouteHandlerClient({ cookies });
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

    return loginUser! as unknown as User;
  } else if (signUpError) {
    throw new Error(signUpError.message);
  }

  return user! as unknown as User;
};
