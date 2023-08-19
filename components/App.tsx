"use client";

import { ExtendedRoom, Room } from "@/models";
import RoomsPage from "./RoomsPage/RoomsPage";
import { UserProvider } from "@/context/UserContext";
import { User } from "@/models/server";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { RoomProvider } from "@/context/RoomContext";
import GamePage from "./GamePage/GamePage";

const App: React.FC<
  React.HtmlHTMLAttributes<HTMLElement> & { rooms?: Room[]; user: User; room?: ExtendedRoom | null }
> = ({ rooms, user, room }) => {
  const router = useRouter();

  useLayoutEffect(() => {
    if (!user) {
      router.push("/login");
    }

    if (!room && user.user_metadata.room_id) {
      router.push(`/room/${user.user_metadata.room_id}`);
    }
  }, []);

  if (!user) return null;

  if (!room && user.user_metadata.room_id) return null;

  if (room) {
    return (
      <UserProvider remoteUser={user}>
        <RoomProvider remoteRoom={room}>
          <GamePage />
        </RoomProvider>
      </UserProvider>
    );
  }

  return (
    <UserProvider remoteUser={user}>
      <RoomsPage rooms={rooms!} />
    </UserProvider>
  );
};

export default App;
