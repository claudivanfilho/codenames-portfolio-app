import { supabase } from "@/app/_utils/supabase";
import { useEffect, useState } from "react";
import useRoom from "./useRoom";

export default function useRealtimeCursor() {
  const { room, isHelper, selectedWords, setSelectedWords } = useRoom();
  const [cursor, setCursor] = useState<{ x: number; y: number; user: string }>();

  useEffect(() => {
    const cursorListenerCB = (event: MouseEvent) => {
      channel.send({
        type: "broadcast",
        event: "cursor-pos",
        payload: {
          x: event.clientX,
          y: event.clientY,
          user: room.guesser_name,
          words: selectedWords.join(","),
        },
      });
    };

    const channel = supabase
      .channel(`cursor-${room.id}`)
      .on("broadcast", { event: "cursor-pos" }, ({ payload }) => {
        if (isHelper) {
          setSelectedWords(payload.words.split(","));
          if (payload.x < window.innerWidth - 100 && payload.y < window.innerHeight - 30) {
            setCursor(payload);
          }
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
  }, [selectedWords, setSelectedWords]);

  return {
    cursor,
  };
}
