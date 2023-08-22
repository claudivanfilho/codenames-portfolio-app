"use client";

import useUser from "@/app/_hooks/useUser";
import { ExtendedRoom, Room } from "@/types";
import { supabase } from "@/app/_utils/supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { FC, createContext, useEffect, useState } from "react";

type RoomContextType = {
  room: Room;
  isHelper: boolean;
  selectedWords: string[];
  setSelectedWords: (words: string[]) => void;
};

export const RoomContext = createContext<RoomContextType>({} as RoomContextType);

export const RoomProvider: FC<React.HtmlHTMLAttributes<Element> & { remoteRoom: ExtendedRoom }> = ({
  children,
  remoteRoom,
}) => {
  const [room, setRoom] = useState(remoteRoom);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const { user } = useUser();

  const isHelper = user.user_metadata.user_name === room.helper;

  useEffect(() => {
    const channel = supabase
      .channel("realtime rooms")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "rooms",
          filter: `id=eq.${room.id}`,
        },
        (payload: RealtimePostgresChangesPayload<Room>) =>
          setRoom((oldRoom) => ({
            ...(payload.new as Room),
            correctWords: oldRoom.correctWords,
          }))
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [remoteRoom.id]);

  return (
    <RoomContext.Provider value={{ room, isHelper, selectedWords, setSelectedWords }}>
      {children}
    </RoomContext.Provider>
  );
};
