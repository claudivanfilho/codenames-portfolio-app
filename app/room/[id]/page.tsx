import App from "@/app/_components/App";
import ErrorPage from "@/app/_components/ErrorPage";
import { getExtendedRoom } from "@/app/_repositories/RoomRepository";
import { getSessionUser } from "@/app/_repositories/UserRepository";

export const dynamic = "force-dynamic";

export default async function page({ params }: { params: { id: string } }) {
  const user = await getSessionUser();
  const userName = user.user_metadata.user_name;

  try {
    const room = await getExtendedRoom(+params.id);
    const isHelper = userName === room.helper;
    room.correctWords = isHelper ? room.correctWords : [];
    return <App room={room} user={user} />;
  } catch (error) {
    return <ErrorPage message={(error as Error).message} />;
  }
}
