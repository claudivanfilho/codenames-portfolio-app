import { Room } from "@/models";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import useUser from "./useUser";

export default function useRealTimeRooms(initialRooms: Room[]) {
  const [rooms, setRooms] = useState(initialRooms);
  const { userName } = useUser();

  useEffect(() => {
    const channel = supabase
      .channel("realtime rooms")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "rooms",
          filter: `helper=neq.${userName} AND game_state=neq.FINISHED AND guesser=is.NULL`,
        },
        (payload: RealtimePostgresChangesPayload<Room>) => {
          switch (payload.eventType) {
            case "INSERT":
              setRooms((old) => [...old, payload.new]);
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
  });

  return {
    rooms,
  };
}
