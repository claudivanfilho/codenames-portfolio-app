import ErrorPage from "@/app/_components/ErrorPage";
import GamePage from "@/app/_components/GamePage/GamePage";
import { RoomProvider } from "@/app/_context/RoomContext";
import { ToastProvider } from "@/app/_context/ToastContext";
import { UserProvider } from "@/app/_context/UserContext";
import { getRoomById } from "@/app/_repositories/RoomRepository";
import { getSessionUser } from "@/app/_utils/session";
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
    const room = await getRoomById(+params.id);
    const isHelper = user.id === room.created_by;
    room.correct_words = isHelper ? room.correct_words : [];

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
