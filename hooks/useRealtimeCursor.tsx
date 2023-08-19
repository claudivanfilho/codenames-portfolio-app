import { Room } from "@/models";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

export default function useRealtimeCursor(room: Room, userName: string, isHelper: boolean) {
  const [cursor, setCursor] = useState<{ x: number; y: number; user: string }>();

  useEffect(() => {
    const cursorListenerCB = (event: MouseEvent) => {
      channel.send({
        type: "broadcast",
        event: "cursor-pos",
        payload: { x: event.clientX, y: event.clientY, user: userName },
      });
    };

    const channel = supabase
      .channel(`cursor-${room.id}`)
      .on("broadcast", { event: "cursor-pos" }, ({ payload }) => {
        if (isHelper) {
          if (payload.x < window.innerWidth - 100 && payload.y < window.innerHeight - 30)
            setCursor(payload);
        }
      });

    channel.subscribe((status) => {
      if (status === "SUBSCRIBED" && !isHelper) {
        document.addEventListener("mousemove", cursorListenerCB);
      }
    });

    return () => {
      supabase.removeChannel(channel);
      document.removeEventListener("mousemove", cursorListenerCB);
    };
  }, [room.id]);

  return {
    cursor,
  };
}
