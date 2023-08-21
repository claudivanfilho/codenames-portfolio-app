import { ExtendedRoom, Room } from "@/app/_models";
import { useEffect, useState } from "react";
import { supabase } from "@/app/_utils/supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

export default function useRealTimeRoom(remoteRoom: ExtendedRoom, userName: string) {
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

  return {
    room,
  };
}
