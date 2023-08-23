"use client";

import useUser from "@/app/_hooks/useUser";
import { ExtendedRoom, Room } from "@/types";
import { supabase } from "@/app/_utils/supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { FC, createContext, useEffect, useState } from "react";
import useToast from "../_hooks/useToast";

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
  const { show } = useToast();
  const { user } = useUser();
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

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
        (payload: RealtimePostgresChangesPayload<Room>) => {
          const newRoom = payload.new as Room;
          const hasLost = newRoom.wrong_guesses.length;
          setRoom((oldRoom) => ({
            ...newRoom,
            correctWords: oldRoom.correctWords,
          }));
          if (newRoom.game_state === "FINISHED") {
            show(hasLost ? "LOSS" : "WIN");
          }
          if (newRoom.game_state !== room.game_state) {
            if (isHelper && newRoom.game_state === "WAITING_TIP") {
              show("TURN");
            }
            if (!isHelper && newRoom.game_state === "WAITING_GUESSES") {
              show("TURN");
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [room.game_state]);

  return (
    <RoomContext.Provider value={{ room, isHelper, selectedWords, setSelectedWords }}>
      {children}
    </RoomContext.Provider>
  );
};
