import { cookies } from "next/headers";
import {
  SupabaseClient,
  createMiddlewareClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { User } from "@/types";
import { NextRequest, NextResponse } from "next/server";

async function getSessionUserFromSupabase(supabase: SupabaseClient) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session && (session!.user as unknown as User);
  const roomIdFromSession = cookies().get("room_id")?.value;
  if (roomIdFromSession && user) {
    user.user_metadata.room_id = +roomIdFromSession;
  }
  return user;
}

export const getSessionUser = async () => {
  const supabase = createServerComponentClient({ cookies });
  const user = await getSessionUserFromSupabase(supabase);
  return user!;
};

export const getSessionUserForMiddleware = async (req: NextRequest, res: NextResponse) => {
  const supabase = createMiddlewareClient({ req, res });
  return getSessionUserFromSupabase(supabase);
};

export const setSessionRoom = (roomId: null | number) => {
  cookies().set("room_id", String(roomId || ""));
};
