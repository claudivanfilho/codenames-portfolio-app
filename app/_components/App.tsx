"use client";

import { ExtendedRoom, Room } from "@/app/_models";
import RoomsPage from "./RoomsPage/RoomsPage";
import { UserProvider } from "@/app/_context/UserContext";
import { User } from "@/app/_models/server";
import { RoomProvider } from "@/app/_context/RoomContext";
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
