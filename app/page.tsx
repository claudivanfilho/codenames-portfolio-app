import App from "@/components/App";
import { getUserFromServerComponent } from "@/utils/supabaseServer";
import ErrorPage from "@/components/ErrorPage";
import { getVisibleRooms } from "@/repositories/RoomRepository";

export const dynamic = "force-dynamic";

export default async function Index() {
  const user = await getUserFromServerComponent();
  const userName = user?.user_metadata?.user_name || "";

  try {
    const { data } = await getVisibleRooms(userName);
    return <App rooms={data!} user={user} />;
  } catch (error) {
    return <ErrorPage message={(error as Error).message} />;
  }
}
