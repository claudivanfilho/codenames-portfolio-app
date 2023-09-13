"use client";

import useUser from "@/app/_hooks/useUser";
import { Room } from "@/types";
import { supabase } from "@/app/_utils/supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { FC, createContext, useEffect, useState } from "react";

type RoomsContextType = {
  rooms: Omit<Room, "correct_words">[];
};

export const RoomsContext = createContext<RoomsContextType>({} as RoomsContextType);

export const RoomsProvider: FC<
  React.HtmlHTMLAttributes<Element> & { remoteRooms: Omit<Room, "correct_words">[] }
> = ({ children, remoteRooms }) => {
  const [rooms, setRooms] = useState(remoteRooms);
  const {
    user: { id: userId },
  } = useUser();

  useEffect(() => {
    console.log("initiated");
    const channel = supabase
      .channel("realtime rooms")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "rooms",
          filter: "game_state=neq.FINISHED",
        },
        (payload: RealtimePostgresChangesPayload<Room>) => {
          console.log("new", payload);
          switch (payload.eventType) {
            case "INSERT":
              if (payload.new.created_by !== userId) {
                setRooms((old) => [...old, payload.new]);
              }
              break;
            case "UPDATE":
              setRooms((old) =>
                old.map((room) => (room.id === (payload.new as Room).id ? payload.new : room))
              );
              break;
            case "DELETE":
              setRooms((old) => old.filter((room) => room.id !== (payload.old as Room).id));
              break;
          }
        }
      )
      .subscribe();

    return () => {
      console.log("removed");
      supabase.removeChannel(channel);
    };
  }, []);

  return <RoomsContext.Provider value={{ rooms }}>{children}</RoomsContext.Provider>;
};
