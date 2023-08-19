import { cookies } from "next/headers";
import LoginPage from "@/components/LoginPage/LoginPage";
import { User } from "@/models/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";

export default async function page() {
  const supabase = await createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();
  const user = data.user as unknown as User;

  return <LoginPage user={user} />;
}
