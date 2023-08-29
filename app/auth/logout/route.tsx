import { setSessionRoom } from "@/app/_utils/session";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(_: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  await supabase.auth.signOut();
  setSessionRoom(null);

  return NextResponse.json({ message: "Logout Successfully" });
}
