import ErrorPage from "@/app/_components/ErrorPage";
import GamePage from "@/app/_components/GamePage/GamePage";
import { RoomProvider } from "@/app/_context/RoomContext";
import { ToastProvider } from "@/app/_context/ToastContext";
import { UserProvider } from "@/app/_context/UserContext";
import { getExtendedRoom } from "@/app/_repositories/RoomRepository";
import { getSessionUser } from "@/app/_repositories/UserRepository";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const generateMetadata = ({ params: { id } }: { params: { id: string } }): Metadata => {
  return {
    title: `Room ${id}`,
    description:
      "Codenames board game App created with the intention of showcasing a range of software skills",
  };
};

export default async function page({ params }: { params: { id: string } }) {
  const user = await getSessionUser();

  try {
    const room = await getExtendedRoom(+params.id);
    const isHelper = user.id === room.helper_id;
    room.correctWords = isHelper ? room.correctWords : [];

    return (
      <ToastProvider>
        <UserProvider remoteUser={user}>
          <RoomProvider remoteRoom={room}>
            <GamePage />
          </RoomProvider>
        </UserProvider>
      </ToastProvider>
    );
  } catch (error) {
    return <ErrorPage message={(error as Error).message} />;
  }
}
