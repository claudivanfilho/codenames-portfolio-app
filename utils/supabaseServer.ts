import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { User } from "@/models/server";

export const getSupabaseServer = () =>
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SERVICE_ROLE_KEY!);

export const getUserFromServerComponent = async () => {
  const supabase = await createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();
  return data.user as unknown as User | null;
};

export const updateUser = async ({
  user_name,
  room_id,
}: {
  user_name?: string;
  room_id?: number;
}) => {
  const supabase = await createServerComponentClient({ cookies });
  return supabase.auth.updateUser({
    data: {
      ...(user_name && { user_name }),
      ...(room_id && { room_id }),
    },
  });
};
