"use client";

import GamePage from "./GamePage/GamePage";
import { Room } from "@/models";
import RoomsPage from "./RoomsPage/RoomsPage";
import InitialPage from "./InitialPage/InitialPage";
import { UserProvider } from "@/context/UserContext";
import { RoomProvider } from "@/context/RoomContext";
import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import useRoom from "@/hooks/useRoom";

function App({ rooms }: { rooms: Room[] }) {
  const { userName } = useUser();
  const { roomId } = useRoom();
  const [isServer, setIsServer] = useState(true);

  /** Caveat: removing this will cause hydration warnning */
  useEffect(() => {
    setIsServer(false);
  }, []);

  if (isServer) return null;

  if (userName && roomId) return <GamePage />;

  if (userName) return <RoomsPage rooms={rooms} />;

  return <InitialPage />;
}

export default ({ rooms }: { rooms: Room[] }) => (
  <UserProvider>
    <RoomProvider>
      <App rooms={rooms} />
    </RoomProvider>
  </UserProvider>
);
