import { Room } from "@/types";
import { useEffect, useState } from "react";
import { supabase } from "@/app/_utils/supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import useUser from "./useUser";

export default function useRealTimeRooms(initialRooms: Room[]) {
  const [rooms, setRooms] = useState(initialRooms);
  const {
    user: { id: userId },
  } = useUser();

  useEffect(() => {
    const channel = supabase
      .channel("realtime rooms")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "rooms",
          filter: `game_state=eq.WAITING_GUESSER OR guesser_id=is.NULL OR helper_id=eq${userId}`,
        },
        (payload: RealtimePostgresChangesPayload<Room>) => {
          console.log("payload", payload);
          switch (payload.eventType) {
            case "INSERT":
              if (payload.new.helper_id !== userId) {
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
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    rooms,
  };
}