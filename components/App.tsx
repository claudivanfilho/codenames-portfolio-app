"use client";

import { ExtendedRoom, Room } from "@/models";
import RoomsPage from "./RoomsPage/RoomsPage";
import { UserProvider } from "@/context/UserContext";
import { User } from "@/models/server";
import { RoomProvider } from "@/context/RoomContext";
import GamePage from "./GamePage/GamePage";

const App: React.FC<
  React.HtmlHTMLAttributes<HTMLElement> & {
    user: User;
    rooms?: Room[];
    room?: ExtendedRoom;
  }
> = ({ rooms, user, room }) => {
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
