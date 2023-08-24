import { cookies } from "next/headers";
import {
  createRouteHandlerClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { User } from "@/types/server";

const SYMBOLIC_PASSWORD = "12345678";

export const getSessionUser = async () => {
  const supabase = await createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user as unknown as User;
};

export const updateSessionUser = async ({
  user_name,
  room_id,
}: {
  user_name?: string;
  room_id?: number | null;
}) => {
  const supabase = await createServerComponentClient({ cookies });
  return supabase.auth.updateUser({
    data: {
      ...(user_name && { user_name }),
      ...(room_id && { room_id }),
    },
  });
};

export const loginUser = async (userName: string) => {
  const supabase = await createRouteHandlerClient({ cookies });
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

export const leaveSessionRoom = async () => {
  const supabase = await createRouteHandlerClient({ cookies });
  return supabase.auth.updateUser({
    data: { room_id: null },
  });
};
