import { supabase } from "@/utils/supabase";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function useRealtimeCursor(
  roomId: number | undefined,
  userName: string,
  isHelper: boolean
) {
  const [cursor, setCursor] = useState<{ x: number; y: number; user: string }>();

  useEffect(() => {
    let channel: RealtimeChannel;

    const cursorListenerCB = (event: MouseEvent) => {
      channel.send({
        type: "broadcast",
        event: "cursor-pos",
        payload: { x: event.clientX, y: event.clientY, user: userName },
      });
    };

    if (roomId) {
      channel = supabase
        .channel(`cursor-${roomId}`)
        .on("broadcast", { event: "cursor-pos" }, ({ payload }) => {
          if (isHelper) {
            setCursor(payload);
          }
        });

      channel.subscribe((status) => {
        if (status === "SUBSCRIBED" && !isHelper) {
          document.addEventListener("mousemove", cursorListenerCB);
        }
      });
    }

    return () => {
      channel && supabase.removeChannel(channel);
      document.removeEventListener("mousemove", cursorListenerCB);
    };
  }, [roomId]);

  return {
    cursor,
  };
}
