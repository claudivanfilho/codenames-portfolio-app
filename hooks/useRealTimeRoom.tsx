import { ExtendedRoom, Room } from "@/models";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

export default function useRealTimeRoom(remoteRoom: Room, userName: string) {
  const [room, setRoom] = useState<ExtendedRoom>(remoteRoom);

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
        (payload: RealtimePostgresChangesPayload<Room>) => setRoom(payload.new as Room)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [remoteRoom.id]);

  return {
    room,
  };
}
