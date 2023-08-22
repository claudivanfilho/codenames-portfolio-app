import ErrorPage from "@/app/_components/ErrorPage";
import GamePage from "@/app/_components/GamePage/GamePage";
import { RoomProvider } from "@/app/_context/RoomContext";
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
  const userName = user.user_metadata.user_name;

  try {
    const room = await getExtendedRoom(+params.id);
    const isHelper = userName === room.helper;
    room.correctWords = isHelper ? room.correctWords : [];

    return (
      <UserProvider remoteUser={user}>
        <RoomProvider remoteRoom={room}>
          <GamePage />
        </RoomProvider>
      </UserProvider>
    );
  } catch (error) {
    return <ErrorPage message={(error as Error).message} />;
  }
}
