import ErrorPage from "@/app/_components/ErrorPage";
import { getVisibleRooms } from "@/app/_repositories/RoomRepository";
import { getSessionUser } from "@/app/_repositories/UserRepository";
import RoomsPage from "./_components/RoomsPage/RoomsPage";
import { UserProvider } from "./_context/UserContext";
import { Metadata } from "next";

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
  const userName = user.user_metadata.user_name;

  try {
    const { data } = await getVisibleRooms(userName);
    return (
      <UserProvider remoteUser={user}>
        <RoomsPage rooms={data!} />
      </UserProvider>
    );
  } catch (error) {
    return <ErrorPage message={(error as Error).message} />;
  }
}
