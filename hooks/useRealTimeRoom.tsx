import { ExtendedRoom, Room } from "@/models";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { getRoom } from "@/services/api";

export default function useRealTimeRoom(roomId: number, userName: string) {
  const [room, setRoom] = useState<ExtendedRoom>();

  useEffect(() => {
    getRoom(roomId, userName).then((data) => setRoom(data));
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("realtime rooms")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "rooms",
          filter: `id=eq.${roomId}`,
        },
        (payload: RealtimePostgresChangesPayload<Room>) => setRoom(payload.new as Room)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  return {
    room,
  };
}
