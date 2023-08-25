import ErrorPage from "@/app/_components/ErrorPage";
import { getVisibleRooms } from "@/app/_repositories/RoomRepository";
import { getSessionUser } from "@/app/_repositories/UserRepository";
import RoomsPage from "./_components/RoomsPage/RoomsPage";
import { UserProvider } from "./_context/UserContext";
import { Metadata } from "next";
import { RoomsProvider } from "./_context/RoomsContext";

export const dynamic = "force-dynamic";

export const generateMetadata = (): Metadata => {
  return {
    title: "Welcome to Codenames",
    description:
      "Codenames board game App created with the intention of showcasing a range of software skills",
  };
};

export default async function Index() {
  const user = await getSessionUser();

  try {
    const { data: rooms } = await getVisibleRooms(user.id);

    return (
      <UserProvider remoteUser={user}>
        <RoomsProvider remoteRooms={rooms!}>
          <RoomsPage />
        </RoomsProvider>
      </UserProvider>
    );
  } catch (error) {
    return <ErrorPage message={(error as Error).message} />;
  }
}
