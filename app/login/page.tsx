import LoginPage from "@/components/LoginPage/LoginPage";
import { getUserFromServerComponent } from "@/utils/supabaseServer";

export const dynamic = "force-dynamic";

export default async function page() {
  const user = await getUserFromServerComponent();

  return <LoginPage user={user} />;
}
