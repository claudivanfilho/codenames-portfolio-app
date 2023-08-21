import App from "@/components/App";
import ErrorPage from "@/components/ErrorPage";
import { getVisibleRooms } from "@/repositories/RoomRepository";
import { getSessionUser } from "@/repositories/UserRepository";

export const dynamic = "force-dynamic";

export default async function Index() {
  const user = await getSessionUser();
  const userName = user.user_metadata.user_name;

  try {
    const { data } = await getVisibleRooms(userName);
    return <App rooms={data!} user={user} />;
  } catch (error) {
    return <ErrorPage message={(error as Error).message} />;
  }
}
